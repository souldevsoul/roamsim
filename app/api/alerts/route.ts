import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

// Get user's alerts
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const alerts = await prisma.usageAlert.findMany({
      where: { userId: session.user.id },
      include: {
        esim: {
          select: {
            id: true,
            packageName: true,
            location: true,
            totalVolume: true,
            usedVolume: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    // Serialize BigInt values
    const serializedAlerts = alerts.map((alert) => ({
      ...alert,
      esim: alert.esim
        ? {
            ...alert.esim,
            totalVolume: alert.esim.totalVolume.toString(),
            usedVolume: alert.esim.usedVolume.toString(),
          }
        : null,
    }))

    return NextResponse.json({ alerts: serializedAlerts })
  } catch (error) {
    console.error('Error fetching alerts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch alerts' },
      { status: 500 }
    )
  }
}

// Create new alert
export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { esimId, threshold, emailNotify = true, smsNotify = false } = body

    if (!esimId || !threshold) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify eSIM belongs to user
    const esim = await prisma.eSim.findFirst({
      where: {
        id: esimId,
        userId: session.user.id,
      },
    })

    if (!esim) {
      return NextResponse.json(
        { error: 'eSIM not found' },
        { status: 404 }
      )
    }

    // Check if alert already exists for this threshold
    const existing = await prisma.usageAlert.findFirst({
      where: {
        userId: session.user.id,
        esimId,
        threshold,
      },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Alert already exists for this threshold' },
        { status: 400 }
      )
    }

    const alert = await prisma.usageAlert.create({
      data: {
        userId: session.user.id,
        esimId,
        threshold,
        emailNotify,
        smsNotify,
      },
    })

    return NextResponse.json({ alert })
  } catch (error) {
    console.error('Error creating alert:', error)
    return NextResponse.json(
      { error: 'Failed to create alert' },
      { status: 500 }
    )
  }
}

// Delete alert
export async function DELETE(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const alertId = searchParams.get('id')

    if (!alertId) {
      return NextResponse.json(
        { error: 'Alert ID required' },
        { status: 400 }
      )
    }

    // Verify alert belongs to user
    const alert = await prisma.usageAlert.findFirst({
      where: {
        id: alertId,
        userId: session.user.id,
      },
    })

    if (!alert) {
      return NextResponse.json(
        { error: 'Alert not found' },
        { status: 404 }
      )
    }

    await prisma.usageAlert.delete({
      where: { id: alertId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting alert:', error)
    return NextResponse.json(
      { error: 'Failed to delete alert' },
      { status: 500 }
    )
  }
}
