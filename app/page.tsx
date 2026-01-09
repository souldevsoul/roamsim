'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe,
  Zap,
  Shield,
  Clock,
  ArrowRight,
  Check,
  Star,
  ChevronRight,
  Wifi,
  Sparkles,
  Signal,
} from 'lucide-react'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'

// Popular destinations with flags
const popularDestinations = [
  { code: 'JP', name: 'Japan', flag: '🇯🇵', from: 4.99 },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', from: 3.99 },
  { code: 'US', name: 'United States', flag: '🇺🇸', from: 5.99 },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', from: 4.49 },
  { code: 'FR', name: 'France', flag: '🇫🇷', from: 4.49 },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', from: 4.49 },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', from: 4.49 },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', from: 4.49 },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', from: 5.99 },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', from: 4.99 },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', from: 3.99 },
  { code: 'AE', name: 'UAE', flag: '🇦🇪', from: 6.99 },
]

const features = [
  {
    icon: Zap,
    title: 'Instant Activation',
    description: 'Get connected in seconds. Scan, install, and go. No waiting for physical SIMs.',
    gradient: 'from-[#00f0ff] to-[#00a8ff]',
  },
  {
    icon: Globe,
    title: '190+ Countries',
    description: 'One app, global coverage. Travel anywhere without swapping SIMs.',
    gradient: 'from-[#a855f7] to-[#7c3aed]',
  },
  {
    icon: Shield,
    title: 'No Hidden Fees',
    description: 'What you see is what you pay. No roaming charges, no surprises.',
    gradient: 'from-[#ff00ff] to-[#d946ef]',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Help when you need it, wherever you are. Real humans, real fast.',
    gradient: 'from-[#ff6b00] to-[#f59e0b]',
  },
]

const steps = [
  {
    num: '01',
    title: 'Choose Your Plan',
    description: 'Select your destination and data package. Options for every trip.',
  },
  {
    num: '02',
    title: 'Install eSIM',
    description: 'Scan the QR code with your phone. Takes less than 2 minutes.',
  },
  {
    num: '03',
    title: 'Stay Connected',
    description: 'Activate when you land. Enjoy seamless data anywhere.',
  },
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Digital Nomad',
    avatar: 'SC',
    content:
      'RoamSIM changed how I travel. No more hunting for local SIMs at airports. Just land and connect.',
    rating: 5,
  },
  {
    name: 'Marcus Johnson',
    role: 'Business Traveler',
    avatar: 'MJ',
    content:
      'The reliability is incredible. Never missed an important call or email while traveling internationally.',
    rating: 5,
  },
  {
    name: 'Emma Williams',
    role: 'Travel Blogger',
    avatar: 'EW',
    content:
      'I recommend RoamSIM to all my followers. The app is beautiful and the service is flawless.',
    rating: 5,
  },
]

const stats = [
  { value: '2M+', label: 'Active Users' },
  { value: '190+', label: 'Countries' },
  { value: '4.9', label: 'App Rating' },
  { value: '99.9%', label: 'Uptime' },
]

// Animated counter component
function AnimatedCounter({ value }: { value: string }) {
  return (
    <span className="text-4xl md:text-5xl font-bold text-gradient">
      {value}
    </span>
  )
}

// Floating particles background
function ParticleField() {
  const particles = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    })), []
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#00f0ff]/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Animated connection lines
function ConnectionLines() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00f0ff" stopOpacity="0" />
          <stop offset="50%" stopColor="#00f0ff" stopOpacity="1" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0,50 Q25,30 50,50 T100,50"
        fill="none"
        stroke="url(#lineGrad)"
        strokeWidth="0.1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
      />
      <motion.path
        d="M0,30 Q35,50 50,30 T100,30"
        fill="none"
        stroke="url(#lineGrad)"
        strokeWidth="0.1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.5, repeat: Infinity, repeatType: "loop" }}
      />
      <motion.path
        d="M0,70 Q40,50 60,70 T100,70"
        fill="none"
        stroke="url(#lineGrad)"
        strokeWidth="0.1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, delay: 1, repeat: Infinity, repeatType: "loop" }}
      />
    </svg>
  )
}

export default function HomePage() {
  const [activeDestination, setActiveDestination] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDestination((prev) => (prev + 1) % popularDestinations.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Navbar />

      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          {/* Particle Field Background */}
          <ParticleField />
          <ConnectionLines />

          {/* Animated Orbs - More dramatic */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00f0ff]/25 rounded-full blur-[150px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.35, 0.2],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#a855f7]/25 rounded-full blur-[120px]"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-[#ff00ff]/15 rounded-full blur-[100px]"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="container mx-auto px-6 py-20 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Badge with sparkle effect */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-8 border border-[#00f0ff]/30 relative overflow-hidden group"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00f0ff]/10 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                  <Sparkles className="w-4 h-4 text-[#00f0ff]" />
                  <span className="text-sm text-slate-200 font-medium">Now available in 190+ countries</span>
                  <motion.span
                    className="w-2 h-2 rounded-full bg-[#00f0ff]"
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="block"
                  >
                    Global Data.
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="block text-gradient relative"
                  >
                    Zero Hassle.
                    <motion.span
                      className="absolute -right-8 -top-2"
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      <Signal className="w-6 h-6 text-[#00f0ff]" />
                    </motion.span>
                  </motion.span>
                </h1>

                <p className="text-lg text-slate-400 max-w-xl mb-8 leading-relaxed">
                  Instant eSIM data plans for travelers. Stay connected anywhere in the world with
                  one tap. No physical SIM needed.
                </p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-col sm:flex-row gap-4 mb-12"
                >
                  <Link href="/destinations" className="btn-primary text-lg py-4 px-8 group relative overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                      Browse Plans
                      <motion.span
                        className="inline-block"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.span>
                    </span>
                  </Link>
                  <Link href="/how-it-works" className="btn-secondary text-lg py-4 px-8 group">
                    <span className="group-hover:text-[#00f0ff] transition-colors">How It Works</span>
                  </Link>
                </motion.div>

                {/* Trust Badges - Enhanced */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="flex flex-wrap items-center gap-4 md:gap-6 text-sm"
                >
                  {[
                    { text: 'No contracts', delay: 0 },
                    { text: 'Instant delivery', delay: 0.1 },
                    { text: 'Money-back guarantee', delay: 0.2 },
                  ].map((item, i) => (
                    <motion.div
                      key={item.text}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + item.delay }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.2 + item.delay, type: "spring", stiffness: 400 }}
                      >
                        <Check className="w-4 h-4 text-[#00f0ff]" />
                      </motion.div>
                      <span className="text-slate-300">{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right - Phone Mockup */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative hidden lg:block"
              >
                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-8 -left-8 glass p-4 rounded-2xl shadow-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00f0ff] to-[#a855f7] flex items-center justify-center">
                      <Wifi className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Connected</p>
                      <p className="text-xs text-slate-400">4G LTE • Japan</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -right-4 glass p-4 rounded-2xl shadow-2xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{popularDestinations[activeDestination].flag}</div>
                    <div>
                      <p className="text-sm font-medium">
                        {popularDestinations[activeDestination].name}
                      </p>
                      <p className="text-xs text-[#00f0ff]">
                        From ${popularDestinations[activeDestination].from}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Phone Frame */}
                <div className="relative mx-auto w-[320px]">
                  <div className="relative rounded-[3rem] border-[8px] border-slate-800 bg-[#0f1629] overflow-hidden shadow-2xl">
                    {/* Phone Screen */}
                    <div className="aspect-[9/19] p-4">
                      {/* Status Bar */}
                      <div className="flex justify-between items-center mb-6 px-2">
                        <span className="text-xs">9:41</span>
                        <div className="flex items-center gap-1">
                          <Wifi className="w-4 h-4" />
                          <div className="w-6 h-3 rounded-sm border border-white/50 relative">
                            <div className="absolute inset-0.5 right-1 bg-[#00f0ff] rounded-sm" />
                          </div>
                        </div>
                      </div>

                      {/* App Content */}
                      <div className="space-y-4">
                        <div className="text-center mb-6">
                          <h3 className="text-lg font-semibold">My eSIMs</h3>
                        </div>

                        {/* Active eSIM Card */}
                        <div className="bg-gradient-to-br from-[#00f0ff]/20 to-[#a855f7]/20 rounded-2xl p-4 border border-[#00f0ff]/30">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-2xl">🇯🇵</span>
                            <span className="text-xs px-2 py-1 rounded-full bg-[#00f0ff]/20 text-[#00f0ff]">
                              Active
                            </span>
                          </div>
                          <p className="font-medium mb-1">Japan 5GB</p>
                          <p className="text-xs text-slate-400 mb-3">30 days • 3.2GB remaining</p>
                          <div className="h-2 rounded-full bg-white/10">
                            <div className="h-full w-[64%] rounded-full bg-gradient-to-r from-[#00f0ff] to-[#a855f7]" />
                          </div>
                        </div>

                        {/* Other Plans */}
                        <div className="space-y-2">
                          {['🇹🇭 Thailand 3GB', '🇬🇧 UK 2GB'].map((plan, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between p-3 rounded-xl bg-white/5"
                            >
                              <span className="text-sm">{plan}</span>
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            </div>
                          ))}
                        </div>

                        {/* Add New */}
                        <button className="w-full py-3 rounded-xl border border-dashed border-white/20 text-sm text-slate-400 hover:border-[#00f0ff]/50 hover:text-[#00f0ff] transition-all">
                          + Add New eSIM
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Phone Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section - Enhanced with glow effects */}
        <section className="py-20 border-y border-white/5 relative overflow-hidden">
          {/* Subtle animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff]/5 via-transparent to-[#a855f7]/5" />

          <div className="container mx-auto px-6 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                  className="text-center group"
                >
                  <motion.div
                    className="relative inline-block"
                    whileHover={{ scale: 1.05 }}
                  >
                    <AnimatedCounter value={stat.value} />
                    <motion.div
                      className="absolute -inset-4 rounded-full bg-[#00f0ff]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </motion.div>
                  <p className="text-slate-400 mt-3 text-sm md:text-base font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="section relative">
          {/* Section background accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#00f0ff]/5 rounded-full blur-[150px] pointer-events-none" />

          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
              >
                <Globe className="w-4 h-4 text-[#a855f7]" />
                <span className="text-sm text-slate-300">Worldwide Coverage</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Popular <span className="text-gradient">Destinations</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                Get instant data in the world&apos;s most visited countries. Plans starting from
                just $2.99.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {popularDestinations.map((dest, i) => (
                <motion.div
                  key={dest.code}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -6 }}
                >
                  <Link
                    href={`/destinations/${dest.code.toLowerCase()}`}
                    className="block glass p-6 group relative overflow-hidden transition-all duration-300 hover:border-[#00f0ff]/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.1)]"
                  >
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/0 to-[#a855f7]/0 group-hover:from-[#00f0ff]/5 group-hover:to-[#a855f7]/5 transition-all duration-300" />

                    <div className="relative flex items-center gap-4 mb-4">
                      <motion.span
                        className="text-4xl"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {dest.flag}
                      </motion.span>
                      <div>
                        <h3 className="font-semibold group-hover:text-[#00f0ff] transition-colors">
                          {dest.name}
                        </h3>
                        <p className="text-sm text-slate-400">
                          From <span className="text-[#00f0ff] font-medium">${dest.from}</span>
                        </p>
                      </div>
                    </div>
                    <div className="relative flex items-center text-sm text-[#00f0ff] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span>View plans</span>
                      <motion.span
                        className="ml-1"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link href="/destinations" className="btn-secondary">
                View All Destinations
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1629]/50 to-transparent pointer-events-none" />

          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Why Choose <span className="text-gradient">RoamSIM</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                We&apos;ve reimagined travel connectivity. Here&apos;s what makes us different.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-8 group hover:border-[#00f0ff]/20 transition-all duration-300"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Get Started in <span className="text-gradient">3 Steps</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                From purchase to connection in under 5 minutes. It&apos;s that simple.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative"
                >
                  {/* Connector Line */}
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-1/2 w-full h-px bg-gradient-to-r from-[#00f0ff]/50 to-transparent" />
                  )}

                  <div className="glass p-8 text-center relative">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[#00f0ff]/20 to-[#a855f7]/20 flex items-center justify-center border border-[#00f0ff]/20">
                      <span className="text-3xl font-bold text-gradient">{step.num}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-slate-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link href="/how-it-works" className="btn-primary">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f1629]/50 to-transparent pointer-events-none" />

          <div className="container mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Loved by <span className="text-gradient">Travelers</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Join millions of satisfied customers who trust RoamSIM for their travel
                connectivity.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-8"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} className="w-5 h-5 fill-[#f59e0b] text-[#f59e0b]" />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-6 leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#a855f7] flex items-center justify-center text-sm font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-slate-400">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Premium Enhancement */}
        <section className="section">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border border-white/10"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/20 via-[#a855f7]/20 to-[#ff00ff]/20" />
              <div className="absolute inset-0 bg-[#0f1629]/80 backdrop-blur-xl" />

              {/* Animated Orbs */}
              <motion.div
                className="absolute top-0 left-0 w-80 h-80 bg-[#00f0ff]/30 rounded-full blur-[100px]"
                animate={{
                  scale: [1, 1.2, 1],
                  x: [0, 20, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-80 h-80 bg-[#a855f7]/30 rounded-full blur-[100px]"
                animate={{
                  scale: [1.2, 1, 1.2],
                  x: [0, -20, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Grid pattern overlay */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }} />

              <div className="relative px-8 py-20 md:px-16 md:py-28 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8"
                >
                  <Sparkles className="w-4 h-4 text-[#00f0ff]" />
                  <span className="text-sm font-medium">Limited Time: 20% off your first plan</span>
                </motion.div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Ready to <span className="text-gradient">Travel Connected?</span>
                </h2>
                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                  Join 2 million+ travelers who stay connected with RoamSIM. Get your first eSIM
                  today and experience seamless global connectivity.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link href="/destinations" className="btn-primary text-lg py-4 px-10 shadow-[0_0_30px_rgba(0,240,255,0.3)]">
                      Get Started
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link href="/contact" className="btn-secondary text-lg py-4 px-10">
                      Contact Sales
                    </Link>
                  </motion.div>
                </div>

                {/* Trust indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-500"
                >
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Secure payments
                  </span>
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Instant activation
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    24/7 support
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
