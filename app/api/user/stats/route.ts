import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user with stats
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        credits: true,
        referralCode: true,
        _count: {
          select: {
            referrals: true,
            esims: true,
            orders: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Calculate total data used across all eSIMs
    const esims = await prisma.eSim.findMany({
      where: { userId: session.user.id },
      select: {
        usedVolume: true,
        esimStatus: true,
      },
    })

    const totalDataUsed = esims.reduce(
      (sum: number, esim: typeof esims[number]) => sum + Number(esim.usedVolume),
      0
    )

    const activeEsims = esims.filter(
      (e: typeof esims[number]) => e.esimStatus === 'IN_USE' || e.esimStatus === 'GOT_RESOURCE'
    ).length

    return NextResponse.json({
      totalEsims: user._count.esims,
      activeEsims,
      totalOrders: user._count.orders,
      totalDataUsed,
      credits: user.credits,
      referralCode: user.referralCode,
      referralCount: user._count.referrals,
    })
  } catch (error) {
    console.error('Error fetching user stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
