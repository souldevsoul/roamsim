import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  referralCode: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name, referralCode } = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }

    // Find referrer if code provided
    let referrerId: string | null = null
    if (referralCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode },
      })
      if (referrer) {
        referrerId = referrer.id
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        referredBy: referrerId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        referralCode: true,
      },
    })

    // If referred, create pending reward
    if (referrerId) {
      await prisma.referralReward.create({
        data: {
          referrerId,
          referredId: user.id,
          rewardAmount: 500, // $5.00 credit
          status: 'PENDING',
        },
      })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const zodError = error as z.ZodError<typeof registerSchema>
      return NextResponse.json(
        { error: zodError.issues[0].message },
        { status: 400 }
      )
    }

    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
