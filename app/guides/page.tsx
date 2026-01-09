'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, MapPin, Wifi, Phone, Shield, ChevronRight, Globe } from 'lucide-react'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'

interface TravelGuide {
  id: string
  countryCode: string
  countryName: string
  overview: string
  heroImage: string | null
  flagImage: string | null
}

// Sample data for demo - will be loaded from API
const sampleGuides: TravelGuide[] = [
  {
    id: '1',
    countryCode: 'JP',
    countryName: 'Japan',
    overview: 'Japan offers excellent mobile connectivity with widespread 4G/5G coverage.',
    heroImage: null,
    flagImage: '🇯🇵',
  },
  {
    id: '2',
    countryCode: 'TH',
    countryName: 'Thailand',
    overview: 'Thailand has good mobile coverage in tourist areas with affordable data plans.',
    heroImage: null,
    flagImage: '🇹🇭',
  },
  {
    id: '3',
    countryCode: 'ES',
    countryName: 'Spain',
    overview: 'Spain offers comprehensive coverage across the country with EU roaming options.',
    heroImage: null,
    flagImage: '🇪🇸',
  },
  {
    id: '4',
    countryCode: 'US',
    countryName: 'United States',
    overview: 'Wide coverage in urban areas, variable in rural regions. Multiple carrier options.',
    heroImage: null,
    flagImage: '🇺🇸',
  },
  {
    id: '5',
    countryCode: 'FR',
    countryName: 'France',
    overview: 'Excellent coverage nationwide with strong 4G networks and growing 5G.',
    heroImage: null,
    flagImage: '🇫🇷',
  },
  {
    id: '6',
    countryCode: 'IT',
    countryName: 'Italy',
    overview: 'Good coverage in cities and tourist destinations. EU roaming included.',
    heroImage: null,
    flagImage: '🇮🇹',
  },
]

export default function GuidesPage() {
  const [guides, setGuides] = useState<TravelGuide[]>(sampleGuides)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchGuides() {
      setLoading(true)
      try {
        const res = await fetch('/api/guides')
        if (res.ok) {
          const data = await res.json()
          if (data.guides && data.guides.length > 0) {
            setGuides(data.guides)
          }
        }
      } catch {
        // Use sample data on error
      } finally {
        setLoading(false)
      }
    }
    fetchGuides()
  }, [])

  const filteredGuides = guides.filter(
    (guide) =>
      guide.countryName.toLowerCase().includes(search.toLowerCase()) ||
      guide.countryCode.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#00f0ff]/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#a855f7]/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-400 mb-6">
              <Globe className="w-4 h-4" />
              Travel Guides
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Stay Connected{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#a855f7]">
                Anywhere
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Essential connectivity guides for travelers. Learn about network coverage,
              tips for staying online, and emergency information for your destination.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by country name..."
                className="input pl-14 py-4 text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Wifi, label: 'Coverage Maps', desc: 'Network availability' },
              { icon: Phone, label: 'Emergency Info', desc: 'Local numbers' },
              { icon: Shield, label: 'Security Tips', desc: 'Stay safe online' },
              { icon: MapPin, label: 'Hotspots', desc: 'WiFi locations' },
            ].map((feature, i) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5"
              >
                <div className="p-3 rounded-lg bg-[#00f0ff]/10">
                  <feature.icon className="w-5 h-5 text-[#00f0ff]" />
                </div>
                <div>
                  <div className="font-medium">{feature.label}</div>
                  <div className="text-sm text-slate-400">{feature.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-[#00f0ff] border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : filteredGuides.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-400">No guides found for &quot;{search}&quot;</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuides.map((guide, i) => (
                <motion.div
                  key={guide.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={`/guides/${guide.countryCode.toLowerCase()}`}
                    className="block glass hover:bg-white/10 transition-colors group"
                  >
                    {/* Header with flag */}
                    <div className="relative h-32 flex items-center justify-center bg-gradient-to-br from-[#00f0ff]/10 to-[#a855f7]/10 rounded-t-2xl">
                      <span className="text-6xl">{guide.flagImage}</span>
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 text-xs font-medium">
                        {guide.countryCode}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-[#00f0ff] transition-colors">
                        {guide.countryName}
                      </h3>
                      <p className="text-sm text-slate-400 line-clamp-2 mb-4">
                        {guide.overview}
                      </p>
                      <div className="flex items-center text-[#00f0ff] text-sm font-medium">
                        View Guide
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff]/5 to-[#a855f7]/5" />
            <div className="relative">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Travel Connected?
              </h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Get your eSIM before you go. Instant activation, no physical SIM needed.
              </p>
              <Link href="/destinations" className="btn-primary">
                Browse eSIM Plans
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  )
}
