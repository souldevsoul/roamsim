'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Wifi,
  Phone,
  Shield,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Globe,
  Zap,
  ChevronRight
} from 'lucide-react'

interface TravelGuide {
  id: string
  countryCode: string
  countryName: string
  overview: string
  tips: Array<{ title: string; content: string }>
  emergency: {
    police: string
    ambulance: string
    fire: string
    embassy?: string
  }
  connectivity: {
    coverage: string
    carriers: string[]
    wifi: string
  }
  attractions: Array<{ name: string; description: string }>
  heroImage: string | null
  flagImage: string | null
}

// Sample data for demo
const sampleGuides: Record<string, TravelGuide> = {
  jp: {
    id: '1',
    countryCode: 'JP',
    countryName: 'Japan',
    overview: 'Japan offers excellent mobile connectivity with widespread 4G LTE and growing 5G coverage. Major cities have near-perfect coverage, while rural areas may have occasional dead spots. Free WiFi is available in many convenience stores, train stations, and public areas.',
    tips: [
      { title: 'Airport SIM', content: 'Pickup counters at major airports offer temporary SIM cards, but eSIM is more convenient.' },
      { title: 'Train Connectivity', content: 'Shinkansen (bullet trains) have WiFi but cellular coverage can be spotty in tunnels.' },
      { title: 'Pocket WiFi', content: 'Popular option but eSIM eliminates the need to carry and charge an extra device.' },
    ],
    emergency: {
      police: '110',
      ambulance: '119',
      fire: '119',
      embassy: '+81-3-3224-5000 (US Embassy)',
    },
    connectivity: {
      coverage: 'Excellent in urban areas (99%+), good in rural areas (95%+)',
      carriers: ['NTT Docomo', 'au (KDDI)', 'SoftBank', 'Rakuten Mobile'],
      wifi: 'Free WiFi at 7-Eleven, Starbucks, train stations, and many hotels',
    },
    attractions: [
      { name: 'Tokyo', description: 'Capital city with excellent connectivity everywhere' },
      { name: 'Kyoto', description: 'Historic temples with good mobile coverage' },
      { name: 'Mount Fuji', description: 'Coverage available at base stations' },
    ],
    heroImage: null,
    flagImage: '🇯🇵',
  },
  th: {
    id: '2',
    countryCode: 'TH',
    countryName: 'Thailand',
    overview: 'Thailand has excellent mobile coverage in tourist areas and major cities. 4G LTE is widely available, with 5G rolling out in Bangkok and other urban centers. Data is affordable and speeds are generally good.',
    tips: [
      { title: 'Island Coverage', content: 'Popular islands like Phuket and Koh Samui have good coverage. Remote islands may have limited connectivity.' },
      { title: 'Data Usage', content: 'Video calls and streaming work well in urban areas. Download content for offline use when traveling to remote areas.' },
      { title: 'VPN Recommended', content: 'Some websites may be blocked. A VPN can help access restricted content.' },
    ],
    emergency: {
      police: '191',
      ambulance: '1669',
      fire: '199',
      embassy: '+66-2-205-4000 (US Embassy)',
    },
    connectivity: {
      coverage: 'Excellent in Bangkok and tourist areas, variable in remote regions',
      carriers: ['AIS', 'True Move H', 'dtac'],
      wifi: 'Free WiFi common in hotels, cafes, and shopping malls',
    },
    attractions: [
      { name: 'Bangkok', description: 'Excellent 4G/5G coverage throughout the city' },
      { name: 'Chiang Mai', description: 'Strong coverage in city center and tourist areas' },
      { name: 'Thai Islands', description: 'Coverage varies by island, main tourist islands have good service' },
    ],
    heroImage: null,
    flagImage: '🇹🇭',
  },
}

export default function GuidePage({ params }: { params: Promise<{ code: string }> }) {
  const resolvedParams = use(params)
  const [guide, setGuide] = useState<TravelGuide | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGuide() {
      setLoading(true)
      try {
        const res = await fetch(`/api/guides/${resolvedParams.code}`)
        if (res.ok) {
          const data = await res.json()
          setGuide(data.guide)
        } else {
          // Fall back to sample data
          const sampleGuide = sampleGuides[resolvedParams.code.toLowerCase()]
          if (sampleGuide) {
            setGuide(sampleGuide)
          }
        }
      } catch {
        // Fall back to sample data
        const sampleGuide = sampleGuides[resolvedParams.code.toLowerCase()]
        if (sampleGuide) {
          setGuide(sampleGuide)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchGuide()
  }, [resolvedParams.code])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#00f0ff] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Guide Not Found</h1>
          <p className="text-slate-400 mb-8">We don&apos;t have a guide for this destination yet.</p>
          <Link href="/guides" className="btn-primary">
            <ArrowLeft className="w-5 h-5" />
            Back to Guides
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#00f0ff]/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#a855f7]/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Guides
            </Link>

            <div className="flex items-center gap-6 mb-8">
              <span className="text-7xl">{guide.flagImage}</span>
              <div>
                <div className="text-sm text-slate-400 mb-1">{guide.countryCode}</div>
                <h1 className="text-4xl md:text-5xl font-bold">{guide.countryName}</h1>
              </div>
            </div>

            <p className="text-lg text-slate-300 leading-relaxed">
              {guide.overview}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Wifi, label: 'Coverage', value: 'Excellent' },
              { icon: Zap, label: 'Speed', value: '4G/5G' },
              { icon: Shield, label: 'Security', value: 'Safe' },
              { icon: Globe, label: 'WiFi', value: 'Widespread' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-4"
              >
                <stat.icon className="w-6 h-6 text-[#00f0ff] mx-auto mb-2" />
                <div className="text-sm text-slate-400">{stat.label}</div>
                <div className="font-semibold">{stat.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Connectivity Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[#00f0ff]/10">
                <Wifi className="w-6 h-6 text-[#00f0ff]" />
              </div>
              <h2 className="text-2xl font-bold">Connectivity</h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Coverage</h3>
                <p className="text-slate-400">{guide.connectivity.coverage}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Major Carriers</h3>
                <div className="flex flex-wrap gap-2">
                  {guide.connectivity.carriers.map((carrier) => (
                    <span
                      key={carrier}
                      className="px-3 py-1 rounded-full bg-white/5 text-sm"
                    >
                      {carrier}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Free WiFi</h3>
                <p className="text-slate-400">{guide.connectivity.wifi}</p>
              </div>
            </div>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[#a855f7]/10">
                <CheckCircle className="w-6 h-6 text-[#a855f7]" />
              </div>
              <h2 className="text-2xl font-bold">Travel Tips</h2>
            </div>

            <div className="space-y-4">
              {guide.tips.map((tip, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white/5 border border-white/5"
                >
                  <h3 className="font-medium mb-1">{tip.title}</h3>
                  <p className="text-sm text-slate-400">{tip.content}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Emergency Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-red-500/10">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold">Emergency Numbers</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5">
                <div className="text-sm text-slate-400 mb-1">Police</div>
                <div className="text-xl font-bold font-mono">{guide.emergency.police}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <div className="text-sm text-slate-400 mb-1">Ambulance</div>
                <div className="text-xl font-bold font-mono">{guide.emergency.ambulance}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <div className="text-sm text-slate-400 mb-1">Fire</div>
                <div className="text-xl font-bold font-mono">{guide.emergency.fire}</div>
              </div>
              {guide.emergency.embassy && (
                <div className="p-4 rounded-xl bg-white/5">
                  <div className="text-sm text-slate-400 mb-1">Embassy</div>
                  <div className="text-sm font-mono">{guide.emergency.embassy}</div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Popular Destinations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-green-500/10">
                <MapPin className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold">Popular Destinations</h2>
            </div>

            <div className="space-y-4">
              {guide.attractions.map((attraction, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white/5 border border-white/5"
                >
                  <h3 className="font-medium mb-1">{attraction.name}</h3>
                  <p className="text-sm text-slate-400">{attraction.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff]/5 to-[#a855f7]/5" />
            <div className="relative">
              <h2 className="text-3xl font-bold mb-4">
                Get Connected in {guide.countryName}
              </h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Get your eSIM now and be ready to connect the moment you land.
                Instant activation, no physical SIM needed.
              </p>
              <Link
                href={`/destinations?country=${guide.countryCode}`}
                className="btn-primary"
              >
                View {guide.countryName} Plans
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
