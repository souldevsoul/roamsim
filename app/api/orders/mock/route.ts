import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

function generateId(prefix: string, length: number = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return `${prefix}-${result}`
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { packageCode, countryCode, amount } = body

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Generate IDs
    const transactionId = generateId('TXN')
    const esimTranNo = generateId('ESIM')
    const iccid = `89${Date.now()}${Math.floor(Math.random() * 10000)}`

    // Create order in database
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        transactionId,
        amount: Math.round(amount * 100), // Store in cents
        currency: 'USD',
        status: 'COMPLETED',
        items: {
          create: {
            packageCode,
            name: `${countryCode?.toUpperCase() || 'XX'} eSIM Plan`,
            price: Math.round(amount * 100),
            quantity: 1,
            volume: BigInt(5 * 1024 * 1024 * 1024), // 5GB in bytes
            duration: 30,
            durationUnit: 'DAY',
            location: countryCode?.toUpperCase() || 'XX',
          },
        },
      },
    })

    // Create a mock eSIM for the user
    await prisma.eSim.create({
      data: {
        userId: user.id,
        orderId: order.id,
        esimTranNo,
        iccid,
        activationCode: `LPA:1$RSP.ESIM.COM$${esimTranNo}`,
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=LPA:1$RSP.ESIM.COM$${esimTranNo}`,
        packageCode,
        packageName: `${countryCode?.toUpperCase() || 'XX'} Data Plan`,
        location: countryCode?.toUpperCase() || 'XX',
        totalVolume: BigInt(5 * 1024 * 1024 * 1024), // 5GB
        usedVolume: BigInt(0),
        totalDuration: 30,
        durationUnit: 'DAY',
        smdpStatus: 'RELEASED',
        esimStatus: 'GOT_RESOURCE',
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    })

    return NextResponse.json({
      success: true,
      orderId: order.id,
      status: 'completed',
      message: 'Payment successful! Your eSIM is ready.',
    })
  } catch (error) {
    console.error('Mock order error:', error)
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    )
  }
}
