import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const guides = await prisma.travelGuide.findMany({
      where: { published: true },
      select: {
        id: true,
        countryCode: true,
        countryName: true,
        overview: true,
        heroImage: true,
        flagImage: true,
      },
      orderBy: { countryName: 'asc' },
    })

    return NextResponse.json({ guides })
  } catch (error) {
    console.error('Error fetching guides:', error)
    return NextResponse.json(
      { error: 'Failed to fetch guides' },
      { status: 500 }
    )
  }
}
