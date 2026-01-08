import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { code } = body

    if (!code) {
      return NextResponse.json({ error: 'Promo code required' }, { status: 400 })
    }

    const promo = await prisma.promoCode.findUnique({
      where: { code: code.toUpperCase() },
    })

    if (!promo) {
      return NextResponse.json({ error: 'Invalid promo code' }, { status: 404 })
    }

    // Check if active
    if (!promo.active) {
      return NextResponse.json({ error: 'This promo code is no longer active' }, { status: 400 })
    }

    // Check validity period
    const now = new Date()
    if (promo.validFrom > now) {
      return NextResponse.json({ error: 'This promo code is not yet valid' }, { status: 400 })
    }

    if (promo.validUntil && promo.validUntil < now) {
      return NextResponse.json({ error: 'This promo code has expired' }, { status: 400 })
    }

    // Check usage limit
    if (promo.maxUses !== null && promo.usedCount >= promo.maxUses) {
      return NextResponse.json({ error: 'This promo code has reached its usage limit' }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      code: promo.code,
      discount: promo.discount,
    })
  } catch (error) {
    console.error('Error validating promo code:', error)
    return NextResponse.json(
      { error: 'Failed to validate promo code' },
      { status: 500 }
    )
  }
}
