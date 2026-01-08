import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params

    const guide = await prisma.travelGuide.findUnique({
      where: { countryCode: code.toUpperCase() },
    })

    if (!guide || !guide.published) {
      return NextResponse.json(
        { error: 'Guide not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ guide })
  } catch (error) {
    console.error('Error fetching guide:', error)
    return NextResponse.json(
      { error: 'Failed to fetch guide' },
      { status: 500 }
    )
  }
}
