import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { prisma } from '@/lib/db'
import { getESIMAccessAPI } from '@/lib/esim-access'

// Lazy-load Stripe to avoid build-time errors when env vars aren't available
let stripeInstance: Stripe | null = null

function getStripe(): Stripe {
  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey) {
      throw new Error('STRIPE_SECRET_KEY not configured')
    }
    stripeInstance = new Stripe(secretKey, {
      apiVersion: '2025-12-15.clover',
    })
  }
  return stripeInstance
}

function getWebhookSecret(): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    throw new Error('STRIPE_WEBHOOK_SECRET not configured')
  }
  return secret
}

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const sig = headersList.get('stripe-signature')

    if (!sig) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    let event: Stripe.Event

    try {
      event = getStripe().webhooks.constructEvent(body, sig, getWebhookSecret())
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutComplete(session)
        break
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutExpired(session)
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        await handlePaymentFailed(paymentIntent)
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Stripe webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.orderId
  const userId = session.metadata?.userId
  const creditsUsed = parseInt(session.metadata?.creditsUsed || '0')

  if (!orderId || !userId) {
    console.error('Missing order or user ID in session metadata')
    return
  }

  // Get the order with items
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  })

  if (!order) {
    console.error('Order not found:', orderId)
    return
  }

  // Update order status to PAID
  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: 'PAID',
      stripePaymentId: session.payment_intent as string,
    },
  })

  // Deduct credits if used
  if (creditsUsed > 0) {
    await prisma.user.update({
      where: { id: userId },
      data: { credits: { decrement: creditsUsed } },
    })
  }

  // Process the order with eSIM Access API
  try {
    const api = getESIMAccessAPI()

    // Place order with eSIM Access
    const orderResult = await api.orderProfiles({
      transactionId: order.transactionId,
      packageInfoList: order.items.map((item) => ({
        packageCode: item.packageCode,
        count: item.quantity,
        periodNum: item.periodNum || undefined,
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

    // Poll for eSIM profiles
    let esimProfiles = null
    let attempts = 0
    const maxAttempts = 10

    while (!esimProfiles && attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 3000))
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
      }
    }

    // Create eSIM records
    if (esimProfiles && esimProfiles.length > 0) {
      for (const esimData of esimProfiles) {
        const matchingItem = order.items.find(
          (item) => item.packageCode === esimData.packageList?.[0]?.packageCode
        ) || order.items[0]

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

      // TODO: Send confirmation email with QR code
    }
  } catch (error) {
    console.error('eSIM Access API error:', error)
    // Order stays in PAID status, will be retried or handled manually
  }
}

async function handleCheckoutExpired(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.orderId

  if (!orderId) return

  await prisma.order.update({
    where: { id: orderId },
    data: { status: 'CANCELLED' },
  })
}

async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
  // Find order by payment intent
  const order = await prisma.order.findFirst({
    where: { stripePaymentId: paymentIntent.id },
  })

  if (order) {
    await prisma.order.update({
      where: { id: order.id },
      data: { status: 'FAILED' },
    })
  }
}
