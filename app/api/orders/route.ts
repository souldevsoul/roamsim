import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { getESIMAccessAPI } from '@/lib/esim-access'
import { generateTransactionId, apiPriceToCents, applyMarkup } from '@/lib/utils'
import Stripe from 'stripe'

// Lazy-load Stripe to avoid build-time errors when env vars aren't available
let stripe: Stripe | null = null

function getStripe(): Stripe {
  if (!stripe) {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY not configured')
    }
    stripe = new Stripe(secretKey, {
      apiVersion: '2025-12-15.clover',
    })
  }
  return stripe
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { items, useCredits = false } = body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items in order' }, { status: 400 })
    }

    // Fetch package details and calculate total
    const api = getESIMAccessAPI()
    const packagesResult = await api.getPackages({})
    const packageMap = new Map(
      packagesResult.packageList.map((p) => [p.packageCode, p])
    )

    let totalAmount = 0
    const orderItems = []

    for (const item of items) {
      const pkg = packageMap.get(item.packageCode)
      if (!pkg) {
        return NextResponse.json(
          { error: `Package ${item.packageCode} not found` },
          { status: 400 }
        )
      }

      const priceInCents = applyMarkup(apiPriceToCents(pkg.price), 30)
      const quantity = item.quantity || 1

      orderItems.push({
        packageCode: pkg.packageCode,
        slug: pkg.slug,
        name: pkg.name,
        price: priceInCents,
        quantity,
        volume: BigInt(pkg.volume),
        duration: pkg.duration,
        durationUnit: pkg.durationUnit,
        location: pkg.location,
        periodNum: item.periodNum,
      })

      totalAmount += priceInCents * quantity
    }

    // Apply credits if requested
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { credits: true },
    })

    let creditsUsed = 0
    if (useCredits && user?.credits && user.credits > 0) {
      creditsUsed = Math.min(user.credits, totalAmount)
      totalAmount -= creditsUsed
    }

    // Generate transaction ID
    const transactionId = generateTransactionId()

    // Create order in database
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        transactionId,
        amount: totalAmount + creditsUsed, // Store original amount
        currency: 'USD',
        status: totalAmount === 0 ? 'PAID' : 'PENDING',
        items: {
          create: orderItems.map((item) => ({
            packageCode: item.packageCode,
            slug: item.slug,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            volume: item.volume,
            duration: item.duration,
            durationUnit: item.durationUnit,
            location: item.location,
            periodNum: item.periodNum,
          })),
        },
      },
      include: {
        items: true,
      },
    })

    // If fully covered by credits, process immediately
    if (totalAmount === 0) {
      // Deduct credits
      await prisma.user.update({
        where: { id: session.user.id },
        data: { credits: { decrement: creditsUsed } },
      })

      // Process the order with eSIM Access API
      const result = await processOrder(order.id, session.user.id, transactionId, orderItems)

      return NextResponse.json({
        success: true,
        orderId: order.id,
        status: 'completed',
        message: 'Order completed with credits',
        esims: result.esimProfiles?.map((e) => ({
          iccid: e.iccid,
          qrCodeUrl: e.qrCodeUrl,
          activationCode: e.ac,
        })),
      })
    }

    // Create Stripe checkout session
    const stripeSession = await getStripe().checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: session.user.email!,
      line_items: orderItems.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: `${item.duration} ${item.durationUnit.toLowerCase()}s - ${item.location}`,
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      ...(creditsUsed > 0 && {
        discounts: [
          {
            coupon: await getOrCreateCreditsCoupon(creditsUsed),
          },
        ],
      }),
      metadata: {
        orderId: order.id,
        userId: session.user.id,
        creditsUsed: creditsUsed.toString(),
      },
      success_url: `${process.env.NEXTAUTH_URL}/checkout/success?order=${order.id}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/checkout/cancel?order=${order.id}`,
    })

    return NextResponse.json({
      success: true,
      orderId: order.id,
      checkoutUrl: stripeSession.url,
      status: 'pending_payment',
    })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

// Get user's orders
export async function GET(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const page = parseInt(searchParams.get('page') || '1')

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        items: true,
        esims: {
          select: {
            id: true,
            iccid: true,
            esimStatus: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: (page - 1) * limit,
    })

    const total = await prisma.order.count({
      where: { userId: session.user.id },
    })

    return NextResponse.json({
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

// Helper function to process order with eSIM Access API
async function processOrder(
  orderId: string,
  userId: string,
  transactionId: string,
  items: Array<{
    packageCode: string
    name: string
    quantity: number
    periodNum?: number
    volume: bigint
    duration: number
    durationUnit: string
    location: string
  }>
) {
  const api = getESIMAccessAPI()

  // Place order with eSIM Access
  const orderResult = await api.orderProfiles({
    transactionId,
    packageInfoList: items.map((item) => ({
      packageCode: item.packageCode,
      count: item.quantity,
      periodNum: item.periodNum,
    })),
  })

  // Update order with API order number
  await prisma.order.update({
    where: { id: orderId },
    data: {
      orderNo: orderResult.orderNo,
      status: 'PROCESSING',
    },
  })

  // Poll for eSIM profiles (can take up to 30 seconds)
  let esimProfiles = null
  let attempts = 0
  const maxAttempts = 10 // 30 seconds total (3s * 10)

  while (!esimProfiles && attempts < maxAttempts) {
    await new Promise((resolve) => setTimeout(resolve, 3000)) // 3s interval
    attempts++

    try {
      const queryResult = await api.queryProfiles({
        orderNo: orderResult.orderNo,
        pager: { pageNum: 1, pageSize: 50 },
      })

      if (queryResult.esimList && queryResult.esimList.length > 0) {
        esimProfiles = queryResult.esimList
        break
      }
    } catch (error) {
      console.error(`Polling attempt ${attempts} failed:`, error)
      // Continue polling
    }
  }

  // Create eSIM records if profiles were returned
  if (esimProfiles && esimProfiles.length > 0) {
    for (const esimData of esimProfiles) {
      const matchingItem = items.find(
        (item) => item.packageCode === esimData.packageList?.[0]?.packageCode
      ) || items[0]

      await prisma.eSim.create({
        data: {
          userId,
          orderId,
          esimTranNo: esimData.esimTranNo,
          iccid: esimData.iccid,
          imsi: esimData.imsi || null,
          msisdn: esimData.msisdn || null,
          activationCode: esimData.ac,
          qrCodeUrl: esimData.qrCodeUrl,
          shortUrl: esimData.shortUrl || null,
          smdpStatus: (esimData.smdpStatus as 'RELEASED' | 'DOWNLOAD' | 'INSTALLATION' | 'ENABLED' | 'DISABLED' | 'DELETED') || 'RELEASED',
          esimStatus: (esimData.esimStatus as 'CREATE' | 'PAYING' | 'PAID' | 'GETTING_RESOURCE' | 'GOT_RESOURCE' | 'IN_USE' | 'USED_UP' | 'UNUSED_EXPIRED' | 'USED_EXPIRED' | 'CANCEL' | 'SUSPENDED' | 'REVOKE') || 'GOT_RESOURCE',
          packageCode: esimData.packageList?.[0]?.packageCode || matchingItem.packageCode,
          packageName: esimData.packageList?.[0]?.packageName || matchingItem.name,
          location: esimData.packageList?.[0]?.locationCode || matchingItem.location,
          totalVolume: BigInt(esimData.totalVolume),
          usedVolume: BigInt(esimData.orderUsage || 0),
          totalDuration: esimData.totalDuration,
          durationUnit: esimData.durationUnit || 'DAY',
          expiresAt: esimData.expiredTime ? new Date(esimData.expiredTime) : null,
          activatedAt: esimData.activateTime ? new Date(esimData.activateTime) : null,
          pin: esimData.pin || null,
          puk: esimData.puk || null,
          apn: esimData.apn || null,
          smsStatus: esimData.smsStatus || 0,
          dataType: esimData.dataType || 1,
        },
      })
    }

    // Update order to COMPLETED
    await prisma.order.update({
      where: { id: orderId },
      data: { status: 'COMPLETED' },
    })

    return { orderResult, esimProfiles }
  }

  // eSIM not ready yet, will be handled by webhook
  return { orderResult, esimProfiles: null }
}

// Helper to create/get credits coupon
async function getOrCreateCreditsCoupon(amount: number): Promise<string> {
  const couponId = `credits_${amount}`
  const stripeClient = getStripe()

  try {
    await stripeClient.coupons.retrieve(couponId)
    return couponId
  } catch {
    // Create the coupon if it doesn't exist
    const coupon = await stripeClient.coupons.create({
      id: couponId,
      amount_off: amount,
      currency: 'usd',
      name: `Account Credits ($${(amount / 100).toFixed(2)})`,
      duration: 'once',
    })
    return coupon.id
  }
}
