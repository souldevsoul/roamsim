'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Wifi,
  Clock,
  Signal,
  MapPin,
  Copy,
  Check,
  RefreshCw,
  QrCode,
  Smartphone,
  AlertCircle,
  Bell,
  Loader2,
  Download,
} from 'lucide-react'
import { Navbar } from '@/components/shared/Navbar'
import { formatBytes, calculateUsagePercent, formatDuration, getStatusColor } from '@/lib/utils'

interface ESim {
  id: string
  esimTranNo: string
  iccid: string
  imsi: string
  msisdn: string
  packageCode: string
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
  qrCodeUrl: string
  activationCode: string
  shortUrl: string
  pin: string
  puk: string
  apn: string
  smsStatus: number
  dataType: number
  usageAlerts: Array<{
    id: string
    threshold: number
    triggered: boolean
  }>
}

export default function ESimDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { status } = useSession()
  const [esim, setEsim] = useState<ESim | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [showQR, setShowQR] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/dashboard')
    }
  }, [status, router])

  useEffect(() => {
    if (params.id) {
      fetchEsimDetails()
    }
  }, [params.id])

  const fetchEsimDetails = async () => {
    try {
      const res = await fetch(`/api/esims/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setEsim(data.esim)
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error fetching eSIM:', error)
    } finally {
      setLoading(false)
    }
  }

  const refreshUsage = async () => {
    setRefreshing(true)
    try {
      await fetch(`/api/esims/${params.id}/refresh`, { method: 'POST' })
      await fetchEsimDetails()
    } catch (error) {
      console.error('Error refreshing:', error)
    } finally {
      setRefreshing(false)
    }
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#00f0ff]" />
        </div>
      </>
    )
  }

  if (!esim) return null

  const usagePercent = calculateUsagePercent(
    parseInt(esim.usedVolume),
    parseInt(esim.totalVolume)
  )
  const isActive = esim.esimStatus === 'IN_USE' || esim.esimStatus === 'GOT_RESOURCE'
  const isNew = esim.smdpStatus === 'RELEASED'

  return (
    <>
      <Navbar />

      <main className="pt-24 pb-20 min-h-screen">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start justify-between mb-8"
          >
            <div className="flex items-center gap-4">
              <div className="text-5xl">{getCountryFlag(esim.location)}</div>
              <div>
                <h1 className="text-2xl font-bold mb-1">{esim.packageName}</h1>
                <div className="flex items-center gap-3 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {esim.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {formatDuration(esim.totalDuration, esim.durationUnit)}
                  </span>
                </div>
              </div>
            </div>
            <span
              className={`text-sm px-4 py-2 rounded-full ${
                isActive
                  ? 'bg-[#00f0ff]/20 text-[#00f0ff]'
                  : 'bg-slate-500/20 text-slate-400'
              }`}
            >
              {isNew ? 'Ready to Install' : esim.esimStatus.replace('_', ' ')}
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - QR Code & Activation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {/* QR Code Card */}
              <div className="glass p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-[#00f0ff]" />
                    Activation QR Code
                  </h2>
                  <button
                    onClick={() => setShowQR(!showQR)}
                    className="text-sm text-[#00f0ff]"
                  >
                    {showQR ? 'Hide' : 'Show'}
                  </button>
                </div>

                {showQR && (
                  <div className="flex flex-col items-center">
                    <div className="bg-white p-4 rounded-xl mb-4">
                      {esim.qrCodeUrl ? (
                        <Image
                          src={esim.qrCodeUrl}
                          alt="eSIM QR Code"
                          width={200}
                          height={200}
                          className="w-48 h-48"
                        />
                      ) : (
                        <div className="w-48 h-48 flex items-center justify-center text-gray-400">
                          QR Code Unavailable
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 text-center mb-4">
                      Scan this QR code in your phone&apos;s Settings &gt; Cellular &gt; Add eSIM
                    </p>
                    {esim.shortUrl && (
                      <a
                        href={esim.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-sm"
                      >
                        <Download className="w-4 h-4" />
                        Download QR
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Manual Activation */}
              <div className="glass p-6">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-[#a855f7]" />
                  Manual Activation
                </h2>
                <p className="text-sm text-slate-400 mb-4">
                  Enter this code manually if QR scanning doesn&apos;t work:
                </p>
                <div className="relative">
                  <div className="p-4 rounded-xl bg-white/5 font-mono text-sm break-all">
                    {esim.activationCode}
                  </div>
                  <button
                    onClick={() => copyToClipboard(esim.activationCode, 'code')}
                    className="absolute top-2 right-2 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {copied === 'code' ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Technical Details */}
              <div className="glass p-6">
                <h2 className="font-semibold mb-4">Technical Details</h2>
                <div className="space-y-3 text-sm">
                  <DetailRow
                    label="ICCID"
                    value={esim.iccid}
                    copyable
                    onCopy={() => copyToClipboard(esim.iccid, 'iccid')}
                    copied={copied === 'iccid'}
                  />
                  {esim.apn && (
                    <DetailRow
                      label="APN"
                      value={esim.apn}
                      copyable
                      onCopy={() => copyToClipboard(esim.apn, 'apn')}
                      copied={copied === 'apn'}
                    />
                  )}
                  {esim.pin && <DetailRow label="PIN" value={esim.pin} />}
                  {esim.puk && <DetailRow label="PUK" value={esim.puk} />}
                  <DetailRow
                    label="SM-DP+ Status"
                    value={esim.smdpStatus}
                    className={getStatusColor(esim.smdpStatus)}
                  />
                </div>
              </div>
            </motion.div>

            {/* Right Column - Usage & Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Usage Card */}
              <div className="glass p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold flex items-center gap-2">
                    <Signal className="w-5 h-5 text-[#00f0ff]" />
                    Data Usage
                  </h2>
                  <button
                    onClick={refreshUsage}
                    disabled={refreshing}
                    className="text-sm text-[#00f0ff] flex items-center gap-1 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                    Refresh
                  </button>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <p className="text-4xl font-bold text-gradient">
                        {formatBytes(parseInt(esim.usedVolume))}
                      </p>
                      <p className="text-sm text-slate-400">
                        of {formatBytes(parseInt(esim.totalVolume))} used
                      </p>
                    </div>
                    <span className="text-2xl font-bold text-slate-400">{usagePercent}%</span>
                  </div>
                  <div className="h-4 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${usagePercent}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-[#00f0ff] to-[#a855f7]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5">
                    <p className="text-sm text-slate-400 mb-1">Remaining</p>
                    <p className="text-xl font-semibold">
                      {formatBytes(parseInt(esim.totalVolume) - parseInt(esim.usedVolume))}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <p className="text-sm text-slate-400 mb-1">Data Type</p>
                    <p className="text-xl font-semibold">
                      {esim.dataType === 1 ? 'Fixed' : 'Daily'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Validity */}
              <div className="glass p-6">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#a855f7]" />
                  Validity Period
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Plan Duration</span>
                    <span>{formatDuration(esim.totalDuration, esim.durationUnit)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Activated</span>
                    <span>
                      {esim.activatedAt
                        ? new Date(esim.activatedAt).toLocaleDateString()
                        : 'Not yet activated'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Expires</span>
                    <span className={esim.expiresAt && new Date(esim.expiresAt) < new Date() ? 'text-red-400' : ''}>
                      {esim.expiresAt
                        ? new Date(esim.expiresAt).toLocaleDateString()
                        : 'After activation'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Usage Alerts */}
              <div className="glass p-6">
                <h2 className="font-semibold mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#ff00ff]" />
                  Usage Alerts
                </h2>

                {esim.usageAlerts && esim.usageAlerts.length > 0 ? (
                  <div className="space-y-3">
                    {esim.usageAlerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/5"
                      >
                        <span>At {alert.threshold}% usage</span>
                        {alert.triggered ? (
                          <span className="text-xs px-2 py-1 rounded-full bg-[#00f0ff]/20 text-[#00f0ff]">
                            Triggered
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-slate-400">
                            Pending
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-slate-400 text-sm mb-3">No alerts configured</p>
                    <button className="text-sm text-[#00f0ff]">+ Add Alert</button>
                  </div>
                )}
              </div>

              {/* Help */}
              <div className="glass p-6 border-[#ff6b00]/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#ff6b00]/20 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-[#ff6b00]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Need help?</h3>
                    <p className="text-sm text-slate-400 mb-3">
                      Having trouble activating your eSIM? Our support team is here 24/7.
                    </p>
                    <Link href="/support" className="text-sm text-[#00f0ff] hover:underline">
                      Contact Support
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  )
}

// Helper Components
function DetailRow({
  label,
  value,
  copyable,
  onCopy,
  copied,
  className,
}: {
  label: string
  value: string
  copyable?: boolean
  onCopy?: () => void
  copied?: boolean
  className?: string
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-slate-400">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`font-mono ${className || ''}`}>{value}</span>
        {copyable && onCopy && (
          <button
            onClick={onCopy}
            className="p-1 rounded hover:bg-white/10 transition-colors"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

function getCountryFlag(location: string): string {
  const code = location.split(',')[0].trim()
  if (code.length !== 2) return '🌍'

  const codePoints = code
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0))

  return String.fromCodePoint(...codePoints)
}
