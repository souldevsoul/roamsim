import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const order = await prisma.order.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        items: true,
        esims: {
          select: {
            id: true,
            esimTranNo: true,
            iccid: true,
            packageCode: true,
            packageName: true,
            location: true,
            totalVolume: true,
            usedVolume: true,
            totalDuration: true,
            durationUnit: true,
            esimStatus: true,
            smdpStatus: true,
            qrCodeUrl: true,
            activationCode: true,
            expiresAt: true,
            activatedAt: true,
            createdAt: true,
          },
        },
      },
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Serialize BigInt values
    const serializedOrder = {
      ...order,
      esims: order.esims.map((esim) => ({
        ...esim,
        totalVolume: esim.totalVolume.toString(),
        usedVolume: esim.usedVolume.toString(),
      })),
      items: order.items.map((item) => ({
        ...item,
        volume: item.volume.toString(),
      })),
    }

    return NextResponse.json(serializedOrder)
  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    )
  }
}
