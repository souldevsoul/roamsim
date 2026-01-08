'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Wifi,
  Plus,
  ArrowRight,
  CreditCard,
  Gift,
  Users,
  Settings,
  ChevronRight,
  Loader2,
  Signal,
  Clock,
  BarChart3,
} from 'lucide-react'
import { Navbar } from '@/components/shared/Navbar'
import { formatBytes, formatPrice, calculateUsagePercent } from '@/lib/utils'

interface ESim {
  id: string
  packageName: string
  location: string
  totalVolume: string
  usedVolume: string
  totalDuration: number
  durationUnit: string
  esimStatus: string
  smdpStatus: string
  expiresAt: string | null
  activatedAt: string | null
  createdAt: string
}

interface DashboardStats {
  totalEsims: number
  activeEsims: number
  totalDataUsed: number
  credits: number
  referralCode: string
  referralCount: number
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [esims, setEsims] = useState<ESim[]>([])
  const [stats, setStats] = useState<DashboardStats | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/dashboard')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user) {
      fetchDashboardData()
    }
  }, [session])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [esimsRes, statsRes] = await Promise.all([
        fetch('/api/esims'),
        fetch('/api/user/stats'),
      ])

      if (esimsRes.ok) {
        const data = await esimsRes.json()
        setEsims(data.esims || [])
      }

      if (statsRes.ok) {
        const data = await statsRes.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#00f0ff]" />
        </div>
      </>
    )
  }

  if (!session) return null

  const activeEsims = esims.filter((e) => e.esimStatus === 'IN_USE' || e.esimStatus === 'GOT_RESOURCE')
  const expiredEsims = esims.filter((e) => e.esimStatus === 'USED_UP' || e.esimStatus.includes('EXPIRED'))

  return (
    <>
      <Navbar />

      <main className="pt-24 pb-20 min-h-screen">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, <span className="text-gradient">{session.user?.name?.split(' ')[0] || 'Traveler'}</span>
            </h1>
            <p className="text-slate-400">Manage your eSIMs and stay connected worldwide.</p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <div className="glass p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/20 flex items-center justify-center">
                  <Wifi className="w-5 h-5 text-[#00f0ff]" />
                </div>
                <span className="text-sm text-slate-400">Active eSIMs</span>
              </div>
              <p className="text-3xl font-bold">{activeEsims.length}</p>
            </div>

            <div className="glass p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#a855f7]/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-[#a855f7]" />
                </div>
                <span className="text-sm text-slate-400">Data Used</span>
              </div>
              <p className="text-3xl font-bold">{formatBytes(stats?.totalDataUsed || 0)}</p>
            </div>

            <div className="glass p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#ff00ff]/20 flex items-center justify-center">
                  <Gift className="w-5 h-5 text-[#ff00ff]" />
                </div>
                <span className="text-sm text-slate-400">Credits</span>
              </div>
              <p className="text-3xl font-bold">{formatPrice(stats?.credits || 0)}</p>
            </div>

            <div className="glass p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#ff6b00]/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#ff6b00]" />
                </div>
                <span className="text-sm text-slate-400">Referrals</span>
              </div>
              <p className="text-3xl font-bold">{stats?.referralCount || 0}</p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Active eSIMs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Your eSIMs</h2>
                  <Link href="/destinations" className="btn-primary text-sm py-2 px-4">
                    <Plus className="w-4 h-4" />
                    New eSIM
                  </Link>
                </div>

                {esims.length > 0 ? (
                  <div className="space-y-4">
                    {esims.slice(0, 5).map((esim, i) => {
                      const usagePercent = calculateUsagePercent(
                        parseInt(esim.usedVolume),
                        parseInt(esim.totalVolume)
                      )
                      const isActive = esim.esimStatus === 'IN_USE' || esim.esimStatus === 'GOT_RESOURCE'

                      return (
                        <motion.div
                          key={esim.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Link
                            href={`/dashboard/esims/${esim.id}`}
                            className="block glass glass-hover p-6 group"
                          >
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <div className="text-4xl">
                                  {getCountryFlag(esim.location)}
                                </div>
                                <div>
                                  <h3 className="font-semibold group-hover:text-[#00f0ff] transition-colors">
                                    {esim.packageName}
                                  </h3>
                                  <p className="text-sm text-slate-400">
                                    {esim.totalDuration} {esim.durationUnit.toLowerCase()}s
                                  </p>
                                </div>
                              </div>
                              <span
                                className={`text-xs px-3 py-1 rounded-full ${
                                  isActive
                                    ? 'bg-[#00f0ff]/20 text-[#00f0ff]'
                                    : 'bg-slate-500/20 text-slate-400'
                                }`}
                              >
                                {isActive ? 'Active' : esim.esimStatus.replace('_', ' ')}
                              </span>
                            </div>

                            <div className="mb-3">
                              <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-400">Data Usage</span>
                                <span>
                                  {formatBytes(parseInt(esim.usedVolume))} /{' '}
                                  {formatBytes(parseInt(esim.totalVolume))}
                                </span>
                              </div>
                              <div className="h-2 rounded-full bg-white/10">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-[#00f0ff] to-[#a855f7] transition-all"
                                  style={{ width: `${usagePercent}%` }}
                                />
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-white/5">
                              <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Clock className="w-4 h-4" />
                                {esim.expiresAt
                                  ? `Expires ${new Date(esim.expiresAt).toLocaleDateString()}`
                                  : 'Not activated'}
                              </div>
                              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-[#00f0ff] transition-colors" />
                            </div>
                          </Link>
                        </motion.div>
                      )
                    })}

                    {esims.length > 5 && (
                      <Link
                        href="/dashboard/esims"
                        className="block text-center py-4 text-[#00f0ff] hover:underline"
                      >
                        View all {esims.length} eSIMs
                      </Link>
                    )}
                  </div>
                ) : (
                  <div className="glass p-12 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                      <Wifi className="w-10 h-10 text-slate-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No eSIMs yet</h3>
                    <p className="text-slate-400 mb-6">
                      Get your first eSIM and start traveling connected.
                    </p>
                    <Link href="/destinations" className="btn-primary">
                      Browse Destinations
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Referral Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00f0ff] to-[#a855f7] flex items-center justify-center">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold">Refer & Earn</h3>
                </div>
                <p className="text-sm text-slate-400 mb-4">
                  Share your code and earn $5 credit for each friend who makes a purchase.
                </p>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 mb-4">
                  <code className="flex-1 text-[#00f0ff] font-mono">
                    {stats?.referralCode || 'Loading...'}
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/register?ref=${stats?.referralCode}`
                      )
                    }}
                    className="text-xs px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-xs text-slate-500">
                  {stats?.referralCount || 0} friends referred • {formatPrice(stats?.credits || 0)} earned
                </p>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass p-6"
              >
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Link
                    href="/dashboard/orders"
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-slate-400" />
                      <span>Order History</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>
                  <Link
                    href="/dashboard/team"
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-slate-400" />
                      <span>Family/Team</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Settings className="w-5 h-5 text-slate-400" />
                      <span>Settings</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </Link>
                </div>
              </motion.div>

              {/* Need Help */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass p-6"
              >
                <h3 className="font-semibold mb-2">Need help?</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Our support team is available 24/7 to assist you.
                </p>
                <Link href="/support" className="btn-secondary w-full text-sm">
                  Contact Support
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

// Helper function to get country flag from location code
function getCountryFlag(location: string): string {
  const code = location.split(',')[0].trim()
  if (code.length !== 2) return '🌍'

  const codePoints = code
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0))

  return String.fromCodePoint(...codePoints)
}
