'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
  CheckCircle,
  Download,
  Copy,
  Smartphone,
  ArrowRight,
  Loader2,
  QrCode,
  X,
} from 'lucide-react'
import { Navbar } from '@/components/shared/Navbar'

interface OrderData {
  id: string
  status: string
  esims: Array<{
    id: string
    iccid: string
    qrCodeUrl: string
    activationCode: string
    packageName: string
    location: string
    totalVolume: string
    totalDuration: number
    durationUnit: string
  }>
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session, status } = useSession()

  const orderId = searchParams.get('order')
  const [order, setOrder] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showQrModal, setShowQrModal] = useState(false)
  const [selectedEsim, setSelectedEsim] = useState<OrderData['esims'][0] | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    if (orderId && session) {
      fetchOrder()
    }
  }, [orderId, session, status])

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}`)
      if (res.ok) {
        const data = await res.json()
        setOrder(data)
      }
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyActivationCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openQrModal = (esim: OrderData['esims'][0]) => {
    setSelectedEsim(esim)
    setShowQrModal(true)
  }

  if (loading) {
    return (
      <main className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#00f0ff] mx-auto mb-4" />
          <p className="text-slate-400">Loading your order...</p>
        </div>
      </main>
    )
  }

  if (!order) {
    return (
      <main className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order not found</h1>
          <Link href="/dashboard" className="btn-primary">
            Go to Dashboard
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-slate-400">
            Your eSIM is ready to activate. Follow the steps below to get connected.
          </p>
        </motion.div>

        {/* eSIM Cards */}
        <div className="space-y-6 mb-12">
          {order.esims?.map((esim, index) => (
            <motion.div
              key={esim.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold mb-1">{esim.packageName}</h2>
                  <p className="text-sm text-slate-400">
                    {formatBytes(parseInt(esim.totalVolume))} • {esim.totalDuration}{' '}
                    {esim.durationUnit.toLowerCase()}s
                  </p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400">
                  Ready to Activate
                </span>
              </div>

              {/* QR Code Section */}
              <div className="flex flex-col md:flex-row gap-6">
                <div
                  className="flex-shrink-0 cursor-pointer group"
                  onClick={() => openQrModal(esim)}
                >
                  <div className="w-40 h-40 mx-auto md:mx-0 bg-white rounded-xl p-2 relative">
                    {esim.qrCodeUrl ? (
                      <Image
                        src={esim.qrCodeUrl}
                        alt="eSIM QR Code"
                        width={144}
                        height={144}
                        className="w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100">
                        <QrCode className="w-12 h-12 text-slate-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                      <span className="text-white text-sm">Click to enlarge</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold mb-3">Activation Code</h3>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 mb-4">
                    <code className="flex-1 text-xs text-[#00f0ff] font-mono break-all">
                      {esim.activationCode}
                    </code>
                    <button
                      onClick={() => copyActivationCode(esim.activationCode)}
                      className="flex-shrink-0 text-xs px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>

                  <p className="text-xs text-slate-500">
                    ICCID: {esim.iccid}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Activation Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-6">How to Activate</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#00f0ff]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#00f0ff] font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Open Camera</h3>
                <p className="text-sm text-slate-400">
                  Open your phone&apos;s camera app and point it at the QR code above.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#00f0ff]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#00f0ff] font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Follow Prompts</h3>
                <p className="text-sm text-slate-400">
                  Tap the notification that appears and follow the on-screen instructions to add the eSIM.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[#00f0ff]/20 flex items-center justify-center flex-shrink-0">
                <span className="text-[#00f0ff] font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Enable Data Roaming</h3>
                <p className="text-sm text-slate-400">
                  Go to Settings → Cellular → Select your eSIM → Enable Data Roaming.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <p className="text-sm text-yellow-200">
              <strong>Tip:</strong> We recommend activating your eSIM before you travel. You can turn it on when you arrive at your destination.
            </p>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard" className="btn-primary flex-1 justify-center">
            <Smartphone className="w-5 h-5" />
            View in Dashboard
          </Link>
          <Link href="/destinations" className="btn-secondary flex-1 justify-center">
            Browse More Plans
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQrModal && selectedEsim && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={() => setShowQrModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Scan to Activate</h3>
              <button
                onClick={() => setShowQrModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-square w-full mb-4">
              {selectedEsim.qrCodeUrl ? (
                <Image
                  src={selectedEsim.qrCodeUrl}
                  alt="eSIM QR Code"
                  width={300}
                  height={300}
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 rounded-xl">
                  <QrCode className="w-20 h-20 text-slate-400" />
                </div>
              )}
            </div>

            <p className="text-sm text-slate-600 text-center">
              Point your phone&apos;s camera at this QR code to install the eSIM.
            </p>
          </motion.div>
        </div>
      )}
    </main>
  )
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export default function CheckoutSuccessPage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <main className="pt-24 pb-20 min-h-screen flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#00f0ff]" />
          </main>
        }
      >
        <CheckoutSuccessContent />
      </Suspense>
    </>
  )
}
