import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { sendEmail } from '@/lib/email'

// Get user's team
export async function GET() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user with team info
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        team: {
          include: {
            owner: {
              select: { id: true, name: true, email: true },
            },
            members: {
              select: { id: true, name: true, email: true, image: true },
            },
            invitations: {
              where: { status: 'PENDING' },
              select: { id: true, email: true, createdAt: true, expiresAt: true },
            },
          },
        },
        ownedTeams: {
          include: {
            members: {
              select: { id: true, name: true, email: true, image: true },
            },
            invitations: {
              where: { status: 'PENDING' },
              select: { id: true, email: true, createdAt: true, expiresAt: true },
            },
          },
        },
      },
    })

    // Return owned team or member team
    const team = user?.ownedTeams[0] || user?.team

    return NextResponse.json({
      team,
      isOwner: team ? team.ownerId === session.user.id : false,
    })
  } catch (error) {
    console.error('Error fetching team:', error)
    return NextResponse.json(
      { error: 'Failed to fetch team' },
      { status: 500 }
    )
  }
}

// Create a new team
export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name } = body

    if (!name) {
      return NextResponse.json(
        { error: 'Team name is required' },
        { status: 400 }
      )
    }

    // Check if user already owns a team
    const existingTeam = await prisma.team.findFirst({
      where: { ownerId: session.user.id },
    })

    if (existingTeam) {
      return NextResponse.json(
        { error: 'You already have a team' },
        { status: 400 }
      )
    }

    // Create team and update user
    const team = await prisma.team.create({
      data: {
        name,
        ownerId: session.user.id,
        members: {
          connect: { id: session.user.id },
        },
      },
      include: {
        members: {
          select: { id: true, name: true, email: true, image: true },
        },
        invitations: {
          where: { status: 'PENDING' },
          select: { id: true, email: true, createdAt: true, expiresAt: true },
        },
      },
    })

    return NextResponse.json({ team })
  } catch (error) {
    console.error('Error creating team:', error)
    return NextResponse.json(
      { error: 'Failed to create team' },
      { status: 500 }
    )
  }
}

// Invite a member
export async function PUT(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { email, teamId } = body

    if (!email || !teamId) {
      return NextResponse.json(
        { error: 'Email and team ID required' },
        { status: 400 }
      )
    }

    // Verify user owns the team
    const team = await prisma.team.findFirst({
      where: {
        id: teamId,
        ownerId: session.user.id,
      },
      include: { members: true },
    })

    if (!team) {
      return NextResponse.json(
        { error: 'Team not found or unauthorized' },
        { status: 404 }
      )
    }

    // Check member limit (5 members including owner)
    if (team.members.length >= 5) {
      return NextResponse.json(
        { error: 'Team member limit reached (5 max)' },
        { status: 400 }
      )
    }

    // Check if already a member
    const existingMember = team.members.find(m => m.email === email)
    if (existingMember) {
      return NextResponse.json(
        { error: 'User is already a team member' },
        { status: 400 }
      )
    }

    // Check for existing pending invitation
    const existingInvite = await prisma.teamInvitation.findFirst({
      where: {
        teamId,
        email,
        status: 'PENDING',
      },
    })

    if (existingInvite) {
      return NextResponse.json(
        { error: 'Invitation already sent to this email' },
        { status: 400 }
      )
    }

    // Create invitation (expires in 7 days)
    const invitation = await prisma.teamInvitation.create({
      data: {
        email,
        teamId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    })

    // Send invitation email
    const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/join-team?invite=${invitation.id}`

    await sendEmail({
      to: email,
      subject: `You've been invited to join ${team.name} on RoamSIM`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Team Invitation</h1>
          <p>You've been invited to join <strong>${team.name}</strong> on RoamSIM.</p>
          <p>As a team member, you'll be able to share eSIM plans with your group.</p>
          <a href="${inviteUrl}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #00f0ff 0%, #a855f7 100%); color: white; text-decoration: none; border-radius: 8px; margin: 20px 0;">
            Accept Invitation
          </a>
          <p style="color: #666; font-size: 14px;">This invitation expires in 7 days.</p>
        </div>
      `,
    })

    return NextResponse.json({ invitation })
  } catch (error) {
    console.error('Error inviting member:', error)
    return NextResponse.json(
      { error: 'Failed to send invitation' },
      { status: 500 }
    )
  }
}

// Leave team or remove member
export async function DELETE(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const memberId = searchParams.get('memberId')
    const teamId = searchParams.get('teamId')

    if (!teamId) {
      return NextResponse.json(
        { error: 'Team ID required' },
        { status: 400 }
      )
    }

    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: { members: true },
    })

    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 })
    }

    const isOwner = team.ownerId === session.user.id

    // If member ID provided, owner is removing someone
    if (memberId) {
      if (!isOwner) {
        return NextResponse.json(
          { error: 'Only team owner can remove members' },
          { status: 403 }
        )
      }

      if (memberId === session.user.id) {
        return NextResponse.json(
          { error: 'Cannot remove yourself as owner' },
          { status: 400 }
        )
      }

      await prisma.user.update({
        where: { id: memberId },
        data: { teamId: null },
      })

      return NextResponse.json({ success: true, action: 'member_removed' })
    }

    // User is leaving the team
    if (isOwner) {
      // If owner leaves, delete the team
      await prisma.team.delete({
        where: { id: teamId },
      })
      return NextResponse.json({ success: true, action: 'team_deleted' })
    }

    // Regular member leaving
    await prisma.user.update({
      where: { id: session.user.id },
      data: { teamId: null },
    })

    return NextResponse.json({ success: true, action: 'left_team' })
  } catch (error) {
    console.error('Error with team operation:', error)
    return NextResponse.json(
      { error: 'Operation failed' },
      { status: 500 }
    )
  }
}
