import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { getESIMAccessAPI } from '@/lib/esim-access'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    // Find the eSIM
    const esim = await prisma.eSim.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    })

    if (!esim) {
      return NextResponse.json({ error: 'eSIM not found' }, { status: 404 })
    }

    // Fetch latest data from ESIMAccess API
    const api = getESIMAccessAPI()

    try {
      const result = await api.queryProfiles({
        esimTranNo: esim.esimTranNo,
        pager: { pageNum: 1, pageSize: 1 },
      })

      if (result.esimList && result.esimList.length > 0) {
        const latestData = result.esimList[0]

        // Update the eSIM record
        await prisma.eSim.update({
          where: { id: esim.id },
          data: {
            usedVolume: BigInt(latestData.orderUsage || 0),
            smdpStatus: (latestData.smdpStatus as 'RELEASED' | 'DOWNLOAD' | 'INSTALLATION' | 'ENABLED' | 'DISABLED' | 'DELETED') || esim.smdpStatus,
            esimStatus: (latestData.esimStatus as 'CREATE' | 'PAYING' | 'PAID' | 'GETTING_RESOURCE' | 'GOT_RESOURCE' | 'IN_USE' | 'USED_UP' | 'UNUSED_EXPIRED' | 'USED_EXPIRED' | 'CANCEL' | 'SUSPENDED' | 'REVOKE') || esim.esimStatus,
            activatedAt: latestData.activateTime
              ? new Date(latestData.activateTime)
              : esim.activatedAt,
            expiresAt: latestData.expiredTime
              ? new Date(latestData.expiredTime)
              : esim.expiresAt,
          },
        })

        return NextResponse.json({
          success: true,
          message: 'Usage data refreshed',
        })
      }

      return NextResponse.json({
        success: true,
        message: 'No updates available',
      })
    } catch (apiError) {
      console.error('ESIMAccess API error:', apiError)
      return NextResponse.json(
        { error: 'Failed to fetch latest data from provider' },
        { status: 503 }
      )
    }
  } catch (error) {
    console.error('Error refreshing eSIM:', error)
    return NextResponse.json(
      { error: 'Failed to refresh eSIM' },
      { status: 500 }
    )
  }
}
