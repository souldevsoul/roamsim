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

    const esim = await prisma.eSim.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        usageAlerts: {
          select: {
            id: true,
            threshold: true,
            triggered: true,
            triggeredAt: true,
          },
        },
      },
    })

    if (!esim) {
      return NextResponse.json({ error: 'eSIM not found' }, { status: 404 })
    }

    // Serialize BigInt values
    const serializedEsim = {
      ...esim,
      totalVolume: esim.totalVolume.toString(),
      usedVolume: esim.usedVolume.toString(),
    }

    return NextResponse.json({ esim: serializedEsim })
  } catch (error) {
    console.error('Error fetching eSIM:', error)
    return NextResponse.json(
      { error: 'Failed to fetch eSIM' },
      { status: 500 }
    )
  }
}
