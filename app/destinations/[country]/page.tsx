'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Check,
  Clock,
  Globe,
  Signal,
  Shield,
  Wifi,
  Zap,
  ShoppingCart,
  ChevronRight,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'

// Destination metadata
const destinationMeta: Record<string, { name: string; flag: string; region: string }> = {
  jp: { name: 'Japan', flag: '🇯🇵', region: 'Asia' },
  th: { name: 'Thailand', flag: '🇹🇭', region: 'Asia' },
  kr: { name: 'South Korea', flag: '🇰🇷', region: 'Asia' },
  sg: { name: 'Singapore', flag: '🇸🇬', region: 'Asia' },
  cn: { name: 'China', flag: '🇨🇳', region: 'Asia' },
  hk: { name: 'Hong Kong', flag: '🇭🇰', region: 'Asia' },
  tw: { name: 'Taiwan', flag: '🇹🇼', region: 'Asia' },
  vn: { name: 'Vietnam', flag: '🇻🇳', region: 'Asia' },
  my: { name: 'Malaysia', flag: '🇲🇾', region: 'Asia' },
  id: { name: 'Indonesia', flag: '🇮🇩', region: 'Asia' },
  ph: { name: 'Philippines', flag: '🇵🇭', region: 'Asia' },
  in: { name: 'India', flag: '🇮🇳', region: 'Asia' },
  gb: { name: 'United Kingdom', flag: '🇬🇧', region: 'Europe' },
  fr: { name: 'France', flag: '🇫🇷', region: 'Europe' },
  de: { name: 'Germany', flag: '🇩🇪', region: 'Europe' },
  it: { name: 'Italy', flag: '🇮🇹', region: 'Europe' },
  es: { name: 'Spain', flag: '🇪🇸', region: 'Europe' },
  pt: { name: 'Portugal', flag: '🇵🇹', region: 'Europe' },
  nl: { name: 'Netherlands', flag: '🇳🇱', region: 'Europe' },
  be: { name: 'Belgium', flag: '🇧🇪', region: 'Europe' },
  ch: { name: 'Switzerland', flag: '🇨🇭', region: 'Europe' },
  at: { name: 'Austria', flag: '🇦🇹', region: 'Europe' },
  se: { name: 'Sweden', flag: '🇸🇪', region: 'Europe' },
  no: { name: 'Norway', flag: '🇳🇴', region: 'Europe' },
  dk: { name: 'Denmark', flag: '🇩🇰', region: 'Europe' },
  fi: { name: 'Finland', flag: '🇫🇮', region: 'Europe' },
  ie: { name: 'Ireland', flag: '🇮🇪', region: 'Europe' },
  gr: { name: 'Greece', flag: '🇬🇷', region: 'Europe' },
  cz: { name: 'Czech Republic', flag: '🇨🇿', region: 'Europe' },
  pl: { name: 'Poland', flag: '🇵🇱', region: 'Europe' },
  tr: { name: 'Turkey', flag: '🇹🇷', region: 'Europe' },
  us: { name: 'United States', flag: '🇺🇸', region: 'Americas' },
  ca: { name: 'Canada', flag: '🇨🇦', region: 'Americas' },
  mx: { name: 'Mexico', flag: '🇲🇽', region: 'Americas' },
  br: { name: 'Brazil', flag: '🇧🇷', region: 'Americas' },
  ar: { name: 'Argentina', flag: '🇦🇷', region: 'Americas' },
  cl: { name: 'Chile', flag: '🇨🇱', region: 'Americas' },
  co: { name: 'Colombia', flag: '🇨🇴', region: 'Americas' },
  pe: { name: 'Peru', flag: '🇵🇪', region: 'Americas' },
  au: { name: 'Australia', flag: '🇦🇺', region: 'Oceania' },
  nz: { name: 'New Zealand', flag: '🇳🇿', region: 'Oceania' },
  ae: { name: 'UAE', flag: '🇦🇪', region: 'Middle East' },
  sa: { name: 'Saudi Arabia', flag: '🇸🇦', region: 'Middle East' },
  eg: { name: 'Egypt', flag: '🇪🇬', region: 'Africa' },
  za: { name: 'South Africa', flag: '🇿🇦', region: 'Africa' },
  ma: { name: 'Morocco', flag: '🇲🇦', region: 'Africa' },
}

interface Package {
  id: string
  slug: string
  data: string
  days: number
  price: number
  speed: string
  dataType: number
}

export default function CountryPage() {
  const params = useParams()
  const country = (params.country as string)?.toUpperCase()
  const countryLower = country?.toLowerCase()
  const destination = destinationMeta[countryLower]

  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch(`/api/packages?country=${country}`)
        if (!res.ok) throw new Error('Failed to fetch packages')

        const data = await res.json()
        setPackages(data.plans || [])
      } catch (err) {
        setError('Failed to load packages')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (country) {
      fetchPackages()
    }
  }, [country])

  if (!destination) {
    return (
      <>
        <Navbar />
        <main className="pt-24 pb-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Destination Not Found</h1>
            <p className="text-slate-400 mb-8">The destination you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/destinations" className="btn-primary">
              <ArrowLeft className="w-5 h-5" />
              Back to Destinations
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const selectedPackage = packages.find((p) => p.id === selectedPlan)

  return (
    <>
      <Navbar />

      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link
                href="/destinations"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Destinations
              </Link>

              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <span className="text-7xl">{destination.flag}</span>
                <div>
                  <p className="text-sm text-[#00f0ff] mb-1">{destination.region}</p>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">{destination.name}</h1>
                  <p className="text-slate-400">
                    Choose from our range of eSIM data plans for {destination.name}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Bar */}
        <section className="py-6">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-6 justify-center"
            >
              {[
                { icon: Signal, label: '4G/LTE' },
                { icon: Zap, label: 'Instant Setup' },
                { icon: Shield, label: 'Secure' },
                { icon: Wifi, label: 'Hotspot OK' },
                { icon: Globe, label: 'Coverage' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl glass"
                >
                  <Icon className="w-4 h-4 text-[#00f0ff]" />
                  <span className="text-sm text-slate-300">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Plans Grid */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-center mb-8"
            >
              Select Your Plan
            </motion.h2>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[#00f0ff]" />
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20">
                <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
                <p className="text-red-400">{error}</p>
              </div>
            ) : packages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <p className="text-slate-400">No packages available for this destination.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {packages.map((pkg, i) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    onClick={() => setSelectedPlan(pkg.id)}
                    className={`relative p-6 rounded-2xl cursor-pointer transition-all ${
                      selectedPlan === pkg.id
                        ? 'glass border-2 border-[#00f0ff] scale-[1.02]'
                        : 'glass glass-hover'
                    }`}
                  >
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold mb-1">{pkg.data}</h3>
                      <p className="text-3xl font-bold text-gradient">
                        ${pkg.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Data</span>
                        <span className="font-medium">{pkg.data}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Validity</span>
                        <span className="font-medium">
                          {pkg.days} day{pkg.days > 1 ? 's' : ''}
                        </span>
                      </div>
                      {pkg.speed && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Speed</span>
                          <span className="font-medium">{pkg.speed}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      {['4G/LTE speed', 'Instant activation', 'Hotspot enabled', '24/7 support'].map(
                        (feature) => (
                          <div key={feature} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-[#00f0ff]" />
                            <span className="text-slate-300">{feature}</span>
                          </div>
                        )
                      )}
                    </div>

                    {selectedPlan === pkg.id && (
                      <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#00f0ff] flex items-center justify-center">
                        <Check className="w-4 h-4 text-[#030712]" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Checkout CTA */}
        {selectedPlan && selectedPackage && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#030712]/90 backdrop-blur-xl border-t border-white/10"
          >
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Selected Plan</p>
                  <p className="font-semibold">
                    {selectedPackage.data} / {selectedPackage.days} days -{' '}
                    <span className="text-gradient">
                      ${selectedPackage.price.toFixed(2)}
                    </span>
                  </p>
                </div>
                <Link
                  href={`/checkout?package=${selectedPlan}&country=${countryLower}`}
                  className="btn-primary"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Proceed to Checkout
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.section>
        )}

        {/* Info Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-8 md:p-12"
            >
              <h2 className="text-2xl font-bold mb-6">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00f0ff]/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-[#00f0ff]">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Purchase</h3>
                    <p className="text-sm text-slate-400">
                      Select your plan and complete the checkout. Payment is secure and instant.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#a855f7]/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-[#a855f7]">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Install</h3>
                    <p className="text-sm text-slate-400">
                      Receive your eSIM QR code instantly. Scan it with your phone to install.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#ff00ff]/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-[#ff00ff]">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Connect</h3>
                    <p className="text-sm text-slate-400">
                      Activate when you arrive. You&apos;ll be online in seconds with local coverage.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Spacer for fixed bottom bar */}
        {selectedPlan && <div className="h-24" />}
      </main>

      <Footer />
    </>
  )
}
