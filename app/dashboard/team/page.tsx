'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import {
  Users,
  UserPlus,
  Mail,
  Crown,
  X,
  Loader2,
  CheckCircle,
  Clock,
  Trash2,
  LogOut,
} from 'lucide-react'

interface TeamMember {
  id: string
  name: string | null
  email: string
  image: string | null
}

interface TeamInvitation {
  id: string
  email: string
  createdAt: string
  expiresAt: string
}

interface Team {
  id: string
  name: string
  ownerId: string
  members: TeamMember[]
  invitations: TeamInvitation[]
}

export default function TeamPage() {
  const { data: session } = useSession()
  const [team, setTeam] = useState<Team | null>(null)
  const [isOwner, setIsOwner] = useState(false)
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [inviting, setInviting] = useState(false)
  const [teamName, setTeamName] = useState('')
  const [inviteEmail, setInviteEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchTeam()
  }, [])

  async function fetchTeam() {
    setLoading(true)
    try {
      const res = await fetch('/api/teams')
      if (res.ok) {
        const data = await res.json()
        setTeam(data.team)
        setIsOwner(data.isOwner)
      }
    } catch {
      setError('Failed to fetch team')
    } finally {
      setLoading(false)
    }
  }

  async function createTeam() {
    if (!teamName.trim()) return

    setCreating(true)
    setError('')
    try {
      const res = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: teamName }),
      })

      if (res.ok) {
        const data = await res.json()
        setTeam(data.team)
        setIsOwner(true)
        setSuccess('Team created successfully!')
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to create team')
      }
    } catch {
      setError('Failed to create team')
    } finally {
      setCreating(false)
    }
  }

  async function inviteMember() {
    if (!inviteEmail.trim() || !team) return

    setInviting(true)
    setError('')
    try {
      const res = await fetch('/api/teams', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail, teamId: team.id }),
      })

      if (res.ok) {
        setInviteEmail('')
        setSuccess('Invitation sent!')
        fetchTeam()
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to send invitation')
      }
    } catch {
      setError('Failed to send invitation')
    } finally {
      setInviting(false)
    }
  }

  async function removeMember(memberId: string) {
    if (!team) return

    try {
      const res = await fetch(`/api/teams?teamId=${team.id}&memberId=${memberId}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setSuccess('Member removed')
        fetchTeam()
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to remove member')
      }
    } catch {
      setError('Failed to remove member')
    }
  }

  async function leaveTeam() {
    if (!team) return

    if (!confirm(isOwner
      ? 'This will delete the team. Are you sure?'
      : 'Are you sure you want to leave this team?'
    )) return

    try {
      const res = await fetch(`/api/teams?teamId=${team.id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        setTeam(null)
        setIsOwner(false)
        setSuccess(isOwner ? 'Team deleted' : 'Left team successfully')
      }
    } catch {
      setError('Operation failed')
    }
  }

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#00f0ff]" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 rounded-xl bg-[#00f0ff]/10">
            <Users className="w-8 h-8 text-[#00f0ff]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Team Management</h1>
            <p className="text-slate-400">Manage your family or travel group</p>
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400"
          >
            {error}
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            {success}
          </motion.div>
        )}

        {!team ? (
          // Create Team
          <div className="glass p-8">
            <h2 className="text-xl font-semibold mb-4">Create a Team</h2>
            <p className="text-slate-400 mb-6">
              Create a team to share eSIM plans with family or travel companions.
              You can invite up to 4 additional members.
            </p>

            <div className="flex gap-4">
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Team name (e.g., Smith Family)"
                className="input flex-1"
              />
              <button
                onClick={createTeam}
                disabled={creating || !teamName.trim()}
                className="btn-primary disabled:opacity-50"
              >
                {creating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Users className="w-5 h-5" />
                    Create Team
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          // Team Dashboard
          <div className="space-y-6">
            {/* Team Header */}
            <div className="glass p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{team.name}</h2>
                  <p className="text-sm text-slate-400">
                    {team.members.length} of 5 members
                  </p>
                </div>
                <button
                  onClick={leaveTeam}
                  className="btn-secondary text-red-400 hover:text-red-300 hover:border-red-500/30"
                >
                  {isOwner ? (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete Team
                    </>
                  ) : (
                    <>
                      <LogOut className="w-4 h-4" />
                      Leave Team
                    </>
                  )}
                </button>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#00f0ff] to-[#a855f7] transition-all"
                  style={{ width: `${(team.members.length / 5) * 100}%` }}
                />
              </div>
            </div>

            {/* Members List */}
            <div className="glass p-6">
              <h3 className="font-semibold mb-4">Team Members</h3>
              <div className="space-y-3">
                {team.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#a855f7] flex items-center justify-center text-sm font-medium">
                        {member.name?.[0] || member.email[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {member.name || member.email}
                          {member.id === team.ownerId && (
                            <Crown className="w-4 h-4 text-yellow-400" />
                          )}
                          {member.id === session?.user?.id && (
                            <span className="text-xs text-slate-400">(you)</span>
                          )}
                        </div>
                        <div className="text-sm text-slate-400">{member.email}</div>
                      </div>
                    </div>
                    {isOwner && member.id !== session?.user?.id && (
                      <button
                        onClick={() => removeMember(member.id)}
                        className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Invitations */}
            {team.invitations.length > 0 && (
              <div className="glass p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-slate-400" />
                  Pending Invitations
                </h3>
                <div className="space-y-3">
                  {team.invitations.map((invite) => (
                    <div
                      key={invite.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-slate-400" />
                        </div>
                        <div>
                          <div className="font-medium">{invite.email}</div>
                          <div className="text-sm text-slate-400">
                            Expires {new Date(invite.expiresAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Invite Form */}
            {isOwner && team.members.length < 5 && (
              <div className="glass p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Invite Member
                </h3>
                <div className="flex gap-4">
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="Email address"
                    className="input flex-1"
                  />
                  <button
                    onClick={inviteMember}
                    disabled={inviting || !inviteEmail.trim()}
                    className="btn-primary disabled:opacity-50"
                  >
                    {inviting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        Send Invite
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}
