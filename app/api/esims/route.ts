import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { EsimStatus, Prisma } from '@prisma/client'

export async function GET(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '20')
    const page = parseInt(searchParams.get('page') || '1')

    const where: Prisma.ESimWhereInput = { userId: session.user.id }

    if (status === 'active') {
      where.esimStatus = { in: [EsimStatus.IN_USE, EsimStatus.GOT_RESOURCE] }
    } else if (status === 'expired') {
      where.esimStatus = { in: [EsimStatus.USED_UP, EsimStatus.UNUSED_EXPIRED, EsimStatus.USED_EXPIRED] }
    }

    const esims = await prisma.eSim.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: (page - 1) * limit,
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
        expiresAt: true,
        activatedAt: true,
        createdAt: true,
        qrCodeUrl: true,
      },
    })

    const total = await prisma.eSim.count({ where })

    // Convert BigInt to string for JSON serialization
    const serializedEsims = esims.map((esim: typeof esims[number]) => ({
      ...esim,
      totalVolume: esim.totalVolume.toString(),
      usedVolume: esim.usedVolume.toString(),
    }))

    return NextResponse.json({
      esims: serializedEsims,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching eSIMs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch eSIMs' },
      { status: 500 }
    )
  }
}
