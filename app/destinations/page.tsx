'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Globe, MapPin, ArrowRight, Wifi, Sparkles, TrendingUp, Zap, X } from 'lucide-react'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { SkeletonDestination } from '@/components/ui/Skeleton'

// All destinations data
const allDestinations = [
  // Asia
  { code: 'JP', name: 'Japan', flag: '🇯🇵', region: 'Asia', from: 4.99, popular: true, speed: '5G' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', region: 'Asia', from: 3.99, popular: true, speed: '4G' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', region: 'Asia', from: 4.99, popular: true, speed: '5G' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', region: 'Asia', from: 3.99, popular: true, speed: '5G' },
  { code: 'CN', name: 'China', flag: '🇨🇳', region: 'Asia', from: 5.99, popular: false, speed: '5G' },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰', region: 'Asia', from: 3.99, popular: true, speed: '5G' },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼', region: 'Asia', from: 4.49, popular: false, speed: '5G' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', region: 'Asia', from: 3.49, popular: true, speed: '4G' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', region: 'Asia', from: 3.99, popular: false, speed: '5G' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', region: 'Asia', from: 4.49, popular: false, speed: '4G' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', region: 'Asia', from: 3.99, popular: false, speed: '4G' },
  { code: 'IN', name: 'India', flag: '🇮🇳', region: 'Asia', from: 4.99, popular: false, speed: '5G' },

  // Europe
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', region: 'Europe', from: 4.49, popular: true, speed: '5G' },
  { code: 'FR', name: 'France', flag: '🇫🇷', region: 'Europe', from: 4.49, popular: true, speed: '5G' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', region: 'Europe', from: 4.49, popular: true, speed: '5G' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', region: 'Europe', from: 4.49, popular: true, speed: '5G' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', region: 'Europe', from: 4.49, popular: true, speed: '5G' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', region: 'Europe', from: 4.49, popular: false, speed: '5G' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', region: 'Europe', from: 4.49, popular: false, speed: '5G' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', region: 'Europe', from: 4.49, popular: false, speed: '5G' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', region: 'Europe', from: 5.99, popular: false, speed: '5G' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', region: 'Europe', from: 4.49, popular: false, speed: '5G' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', region: 'Europe', from: 4.99, popular: false, speed: '5G' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', region: 'Europe', from: 5.49, popular: false, speed: '5G' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', region: 'Europe', from: 4.99, popular: false, speed: '5G' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', region: 'Europe', from: 4.99, popular: false, speed: '5G' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', region: 'Europe', from: 4.49, popular: false, speed: '5G' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', region: 'Europe', from: 4.49, popular: true, speed: '5G' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿', region: 'Europe', from: 4.49, popular: false, speed: '5G' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', region: 'Europe', from: 3.99, popular: false, speed: '5G' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', region: 'Europe', from: 4.49, popular: true, speed: '5G' },

  // Americas
  { code: 'US', name: 'United States', flag: '🇺🇸', region: 'Americas', from: 5.99, popular: true, speed: '5G' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', region: 'Americas', from: 5.99, popular: true, speed: '5G' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', region: 'Americas', from: 4.99, popular: true, speed: '4G' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', region: 'Americas', from: 5.99, popular: false, speed: '5G' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', region: 'Americas', from: 5.99, popular: false, speed: '4G' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', region: 'Americas', from: 5.99, popular: false, speed: '5G' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', region: 'Americas', from: 5.49, popular: false, speed: '4G' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪', region: 'Americas', from: 5.49, popular: false, speed: '4G' },

  // Oceania
  { code: 'AU', name: 'Australia', flag: '🇦🇺', region: 'Oceania', from: 5.99, popular: true, speed: '5G' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', region: 'Oceania', from: 5.99, popular: true, speed: '5G' },

  // Middle East & Africa
  { code: 'AE', name: 'UAE', flag: '🇦🇪', region: 'Middle East', from: 6.99, popular: true, speed: '5G' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', region: 'Middle East', from: 6.99, popular: false, speed: '5G' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', region: 'Africa', from: 5.99, popular: false, speed: '4G' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', region: 'Africa', from: 5.99, popular: false, speed: '5G' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦', region: 'Africa', from: 5.49, popular: false, speed: '4G' },

  // Regional Plans
  { code: 'EU', name: 'Europe (39 countries)', flag: '🇪🇺', region: 'Regional', from: 9.99, popular: true, speed: '5G' },
  { code: 'ASIA', name: 'Asia Pacific (15 countries)', flag: '🌏', region: 'Regional', from: 11.99, popular: true, speed: '5G' },
  { code: 'GLOBAL', name: 'Global (100+ countries)', flag: '🌍', region: 'Regional', from: 19.99, popular: true, speed: '5G' },
]

const regions = [
  { id: 'All', label: 'All', icon: Globe },
  { id: 'Popular', label: 'Popular', icon: TrendingUp },
  { id: 'Asia', label: 'Asia', icon: null },
  { id: 'Europe', label: 'Europe', icon: null },
  { id: 'Americas', label: 'Americas', icon: null },
  { id: 'Oceania', label: 'Oceania', icon: null },
  { id: 'Middle East', label: 'Middle East', icon: null },
  { id: 'Africa', label: 'Africa', icon: null },
  { id: 'Regional', label: 'Multi-Country', icon: Sparkles },
]

const sortOptions = [
  { id: 'popular', label: 'Most Popular' },
  { id: 'name', label: 'Name (A-Z)' },
  { id: 'price-low', label: 'Price: Low to High' },
  { id: 'price-high', label: 'Price: High to Low' },
]

export default function DestinationsPage() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [sortBy, setSortBy] = useState('popular')
  const [isLoading, setIsLoading] = useState(true)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const filteredDestinations = useMemo(() => {
    let filtered = allDestinations

    // Filter by search
    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase()
      filtered = filtered.filter(
        (d) =>
          d.name.toLowerCase().includes(searchLower) ||
          d.code.toLowerCase().includes(searchLower) ||
          d.region.toLowerCase().includes(searchLower)
      )
    }

    // Filter by region
    if (selectedRegion === 'Popular') {
      filtered = filtered.filter((d) => d.popular)
    } else if (selectedRegion !== 'All') {
      filtered = filtered.filter((d) => d.region === selectedRegion)
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.from - b.from)
        break
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.from - a.from)
        break
      case 'name':
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'popular':
      default:
        // Popular first, then by name
        filtered = [...filtered].sort((a, b) => {
          if (a.popular && !b.popular) return -1
          if (!a.popular && b.popular) return 1
          return a.name.localeCompare(b.name)
        })
    }

    return filtered
  }, [debouncedSearch, selectedRegion, sortBy])

  const clearFilters = useCallback(() => {
    setSearch('')
    setDebouncedSearch('')
    setSelectedRegion('All')
    setSortBy('popular')
  }, [])

  const hasActiveFilters = search || selectedRegion !== 'All' || sortBy !== 'popular'

  return (
    <>
      <Navbar />

      <main className="pt-24 pb-20 min-h-screen">
        {/* Hero */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00f0ff]" />
                </span>
                <span className="text-sm text-slate-300">190+ destinations available</span>
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Choose Your <span className="text-gradient">Destination</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-xl mx-auto">
                Instant data plans for travelers. Select your destination and get connected in
                minutes with premium 4G/5G speeds.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="py-6 sticky top-20 z-30 bg-[#030712]/80 backdrop-blur-xl border-b border-white/5">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col lg:flex-row gap-4"
            >
              {/* Search */}
              <div className="relative flex-1 max-w-xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-10 py-3 rounded-xl bg-[#0f1629] border border-white/[0.08] text-white placeholder:text-slate-500 focus:border-[#00f0ff] focus:ring-2 focus:ring-[#00f0ff]/20 outline-none transition-all"
                    placeholder="Search countries or regions..."
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-[#0f1629] border border-white/[0.08] text-white cursor-pointer focus:border-[#00f0ff] focus:ring-2 focus:ring-[#00f0ff]/20 outline-none transition-all appearance-none pr-10 min-w-[180px]"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2394a3b8' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>

                {/* Clear Filters */}
                <AnimatePresence>
                  {hasActiveFilters && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Button variant="ghost" size="sm" onClick={clearFilters}>
                        Clear all
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Region Tabs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2 mt-4"
            >
              {regions.map((region) => {
                const Icon = region.icon
                return (
                  <motion.button
                    key={region.id}
                    onClick={() => setSelectedRegion(region.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2
                      ${selectedRegion === region.id
                        ? 'bg-[#00f0ff] text-[#030712] shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5'
                      }
                    `}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {region.label}
                  </motion.button>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Results Count & Grid */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <motion.p
                key={filteredDestinations.length}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-slate-400"
              >
                {isLoading ? (
                  <span className="animate-pulse">Loading destinations...</span>
                ) : (
                  <>
                    Showing <span className="text-white font-medium">{filteredDestinations.length}</span>{' '}
                    destination{filteredDestinations.length !== 1 ? 's' : ''}
                    {selectedRegion !== 'All' && (
                      <> in <span className="text-[#00f0ff]">{selectedRegion}</span></>
                    )}
                  </>
                )}
              </motion.p>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonDestination key={i} />
                ))}
              </div>
            ) : filteredDestinations.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                <AnimatePresence mode="popLayout">
                  {filteredDestinations.map((dest, i) => (
                    <motion.div
                      key={dest.code}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: Math.min(i * 0.02, 0.3) }}
                    >
                      <Link
                        href={`/destinations/${dest.code.toLowerCase()}`}
                        className="block h-full"
                      >
                        <Card
                          hover="glow"
                          padding="md"
                          className="h-full group cursor-pointer"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <motion.span
                                className="text-4xl"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                              >
                                {dest.flag}
                              </motion.span>
                              <div>
                                <h3 className="font-semibold text-lg group-hover:text-[#00f0ff] transition-colors">
                                  {dest.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-sm text-slate-500">{dest.region}</span>
                                  <Badge variant="info" size="sm">
                                    {dest.speed}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            {dest.popular && (
                              <Badge variant="premium" size="sm" dot pulse>
                                Popular
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                            <div>
                              <p className="text-xs text-slate-500">Starting from</p>
                              <p className="text-2xl font-bold text-gradient">${dest.from}</p>
                            </div>
                            <motion.div
                              className="flex items-center gap-2 text-sm text-[#00f0ff]"
                              initial={{ opacity: 0, x: -10 }}
                              whileHover={{ opacity: 1, x: 0 }}
                              animate={{ opacity: 0.5 }}
                            >
                              <span>View plans</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.div>
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              /* Empty State */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center"
                >
                  <MapPin className="w-12 h-12 text-slate-500" />
                </motion.div>
                <h3 className="text-2xl font-semibold mb-2">No destinations found</h3>
                <p className="text-slate-400 mb-8 max-w-md mx-auto">
                  We couldn&apos;t find any destinations matching your search.
                  Try adjusting your filters or search terms.
                </p>
                <Button onClick={clearFilters}>
                  <X className="w-4 h-4" />
                  Clear all filters
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Features Banner */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card variant="gradient" padding="lg">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00f0ff] to-[#00f0ff]/50 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                      <Wifi className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">4G/5G Speeds</h3>
                      <p className="text-sm text-slate-400">
                        Premium high-speed data on local carrier networks worldwide
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#a855f7] to-[#a855f7]/50 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                      <Zap className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Instant Activation</h3>
                      <p className="text-sm text-slate-400">
                        Scan QR code and connect in under 2 minutes
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff00ff] to-[#ff00ff]/50 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(255,0,255,0.3)]">
                      <Sparkles className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Flexible Plans</h3>
                      <p className="text-sm text-slate-400">
                        Choose from 1GB to unlimited data for 1-30 days
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
