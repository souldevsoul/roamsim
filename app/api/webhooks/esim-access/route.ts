import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getESIMAccessAPI } from '@/lib/esim-access'
import { sendEmail, getUsageAlertEmail } from '@/lib/email'
import { formatBytes } from '@/lib/utils'
import crypto from 'crypto'

// Webhook payload types
interface WebhookPayload {
  notifyType: 'ORDER_STATUS' | 'DATA_USAGE' | 'BALANCE_ALERT' | 'SMDP_EVENT'
  orderNo?: string
  iccid?: string
  esimTranNo?: string
  status?: string
  usage?: number
  balance?: number
  event?: string
  timestamp: string
}

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get('RT-Signature')
    const timestamp = request.headers.get('RT-Timestamp')
    const requestId = request.headers.get('RT-RequestID')

    // Verify webhook signature if secret key is configured
    if (process.env.ESIM_SECRET_KEY && signature && timestamp && requestId) {
      const expectedSignature = crypto
        .createHmac('sha256', process.env.ESIM_SECRET_KEY)
        .update(timestamp + requestId + process.env.ESIM_ACCESS_CODE + body)
        .digest('hex')
        .toLowerCase()

      if (signature.toLowerCase() !== expectedSignature) {
        console.error('Invalid webhook signature')
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const payload: WebhookPayload = JSON.parse(body)

    // Log webhook
    await prisma.webhookLog.create({
      data: {
        type: payload.notifyType,
        payload: payload as object,
        processed: false,
      },
    })

    // Process based on notification type
    switch (payload.notifyType) {
      case 'ORDER_STATUS':
        await handleOrderStatus(payload)
        break

      case 'DATA_USAGE':
        await handleDataUsage(payload)
        break

      case 'BALANCE_ALERT':
        await handleBalanceAlert(payload)
        break

      case 'SMDP_EVENT':
        await handleSmdpEvent(payload)
        break

      default:
        console.log('Unknown webhook type:', payload.notifyType)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handleOrderStatus(payload: WebhookPayload) {
  if (!payload.orderNo) return

  const order = await prisma.order.findFirst({
    where: { orderNo: payload.orderNo },
    include: { user: true },
  })

  if (!order) {
    console.error('Order not found for webhook:', payload.orderNo)
    return
  }

  // Fetch eSIM profiles from API
  const api = getESIMAccessAPI()
  const result = await api.queryProfiles({
    orderNo: payload.orderNo,
    pager: { pageNum: 1, pageSize: 50 },
  })

  // Create eSIM records in database
  for (const esimData of result.esimList) {
    await prisma.eSim.upsert({
      where: { esimTranNo: esimData.esimTranNo },
      create: {
        userId: order.userId,
        orderId: order.id,
        esimTranNo: esimData.esimTranNo,
        iccid: esimData.iccid,
        imsi: esimData.imsi,
        msisdn: esimData.msisdn,
        activationCode: esimData.ac,
        qrCodeUrl: esimData.qrCodeUrl,
        shortUrl: esimData.shortUrl,
        smdpStatus: esimData.smdpStatus as 'RELEASED' | 'DOWNLOAD' | 'INSTALLATION' | 'ENABLED' | 'DISABLED' | 'DELETED',
        esimStatus: esimData.esimStatus as 'CREATE' | 'PAYING' | 'PAID' | 'GETTING_RESOURCE' | 'GOT_RESOURCE' | 'IN_USE' | 'USED_UP' | 'UNUSED_EXPIRED' | 'USED_EXPIRED' | 'CANCEL' | 'SUSPENDED' | 'REVOKE',
        packageCode: esimData.packageList[0]?.packageCode || '',
        packageName: esimData.packageList[0]?.packageName || '',
        location: esimData.packageList[0]?.locationCode || '',
        totalVolume: BigInt(esimData.totalVolume),
        usedVolume: BigInt(esimData.orderUsage),
        totalDuration: esimData.totalDuration,
        durationUnit: esimData.durationUnit,
        expiresAt: esimData.expiredTime ? new Date(esimData.expiredTime) : null,
        activatedAt: esimData.activateTime ? new Date(esimData.activateTime) : null,
        pin: esimData.pin,
        puk: esimData.puk,
        apn: esimData.apn,
        smsStatus: esimData.smsStatus,
        dataType: esimData.dataType,
      },
      update: {
        smdpStatus: esimData.smdpStatus as 'RELEASED' | 'DOWNLOAD' | 'INSTALLATION' | 'ENABLED' | 'DISABLED' | 'DELETED',
        esimStatus: esimData.esimStatus as 'CREATE' | 'PAYING' | 'PAID' | 'GETTING_RESOURCE' | 'GOT_RESOURCE' | 'IN_USE' | 'USED_UP' | 'UNUSED_EXPIRED' | 'USED_EXPIRED' | 'CANCEL' | 'SUSPENDED' | 'REVOKE',
        usedVolume: BigInt(esimData.orderUsage),
        expiresAt: esimData.expiredTime ? new Date(esimData.expiredTime) : null,
        activatedAt: esimData.activateTime ? new Date(esimData.activateTime) : null,
      },
    })
  }

  // Update order status
  await prisma.order.update({
    where: { id: order.id },
    data: { status: 'COMPLETED' },
  })

  // Handle referral rewards if this is the user's first completed order
  const previousOrders = await prisma.order.count({
    where: {
      userId: order.userId,
      status: 'COMPLETED',
      id: { not: order.id },
    },
  })

  if (previousOrders === 0 && order.user.referredBy) {
    // Credit referrer
    const pendingReward = await prisma.referralReward.findFirst({
      where: {
        referredId: order.userId,
        status: 'PENDING',
      },
    })

    if (pendingReward) {
      await prisma.$transaction([
        // Credit the referrer
        prisma.user.update({
          where: { id: pendingReward.referrerId },
          data: { credits: { increment: pendingReward.rewardAmount } },
        }),
        // Credit the referred user (welcome bonus)
        prisma.user.update({
          where: { id: order.userId },
          data: { credits: { increment: 500 } }, // $5 welcome bonus
        }),
        // Update reward status
        prisma.referralReward.update({
          where: { id: pendingReward.id },
          data: {
            status: 'CREDITED',
            orderId: order.id,
            processedAt: new Date(),
          },
        }),
      ])
    }
  }

  // Mark webhook as processed
  await prisma.webhookLog.updateMany({
    where: {
      type: 'ORDER_STATUS',
      processed: false,
    },
    data: { processed: true },
  })
}

async function handleDataUsage(payload: WebhookPayload) {
  if (!payload.esimTranNo || payload.usage === undefined) return

  const esim = await prisma.eSim.findUnique({
    where: { esimTranNo: payload.esimTranNo },
    include: { usageAlerts: true, user: true },
  })

  if (!esim) return

  // Update usage
  await prisma.eSim.update({
    where: { id: esim.id },
    data: { usedVolume: BigInt(payload.usage) },
  })

  // Check usage alerts
  const usagePercent = (payload.usage / Number(esim.totalVolume)) * 100

  for (const alert of esim.usageAlerts) {
    if (!alert.triggered && usagePercent >= alert.threshold) {
      // Trigger alert
      await prisma.usageAlert.update({
        where: { id: alert.id },
        data: {
          triggered: true,
          triggeredAt: new Date(),
        },
      })

      // Send notification (email)
      if (alert.emailNotify && esim.user.email) {
        const emailContent = getUsageAlertEmail({
          userName: esim.user.name || 'Traveler',
          esimName: esim.packageName,
          usagePercent: Math.round(usagePercent),
          usedData: formatBytes(payload.usage),
          totalData: formatBytes(Number(esim.totalVolume)),
        })

        await sendEmail({
          to: esim.user.email,
          subject: `Data Alert: ${Math.round(usagePercent)}% used on your ${esim.packageName} eSIM`,
          html: emailContent.html,
          text: emailContent.text,
        })
      }
    }
  }
}

async function handleBalanceAlert(payload: WebhookPayload) {
  // Log balance alert - typically this means our API account balance is low
  console.log('Balance alert received:', payload)

  // TODO: Send admin notification about low balance
}

async function handleSmdpEvent(payload: WebhookPayload) {
  if (!payload.esimTranNo || !payload.event) return

  const esim = await prisma.eSim.findUnique({
    where: { esimTranNo: payload.esimTranNo },
  })

  if (!esim) return

  // Map SMDP events to status
  const statusMap: Record<string, 'RELEASED' | 'DOWNLOAD' | 'INSTALLATION' | 'ENABLED' | 'DISABLED' | 'DELETED'> = {
    DOWNLOAD: 'DOWNLOAD',
    INSTALL: 'INSTALLATION',
    ENABLE: 'ENABLED',
    DISABLE: 'DISABLED',
    DELETE: 'DELETED',
  }

  const newStatus = statusMap[payload.event]
  if (newStatus) {
    await prisma.eSim.update({
      where: { id: esim.id },
      data: { smdpStatus: newStatus },
    })
  }
}
