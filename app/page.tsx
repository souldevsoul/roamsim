'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
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
        <section className="relative min-h-screen flex items-center pt-20">
          {/* Animated Orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f0ff]/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#a855f7]/20 rounded-full blur-[120px] animate-pulse delay-1000" />

          <div className="container mx-auto px-6 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
                >
                  <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
                  <span className="text-sm text-slate-300">Now available in 190+ countries</span>
                </motion.div>

                <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                  Global Data.
                  <br />
                  <span className="text-gradient">Zero Hassle.</span>
                </h1>

                <p className="text-lg text-slate-400 max-w-xl mb-8 leading-relaxed">
                  Instant eSIM data plans for travelers. Stay connected anywhere in the world with
                  one tap. No physical SIM needed.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Link href="/destinations" className="btn-primary text-lg py-4 px-8">
                    Browse Plans
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="/how-it-works" className="btn-secondary text-lg py-4 px-8">
                    How It Works
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center gap-6 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-[#00f0ff]" />
                    <span>No contracts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-[#00f0ff]" />
                    <span>Instant delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-[#00f0ff]" />
                    <span>Money-back guarantee</span>
                  </div>
                </div>
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

        {/* Stats Section */}
        <section className="py-16 border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <AnimatedCounter value={stat.value} />
                  <p className="text-slate-400 mt-2">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="section">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Popular <span className="text-gradient">Destinations</span>
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
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
                >
                  <Link
                    href={`/destinations/${dest.code.toLowerCase()}`}
                    className="block glass glass-hover p-6 group"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl">{dest.flag}</span>
                      <div>
                        <h3 className="font-semibold group-hover:text-[#00f0ff] transition-colors">
                          {dest.name}
                        </h3>
                        <p className="text-sm text-slate-400">From ${dest.from}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View plans</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
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

        {/* CTA Section */}
        <section className="section">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/20 via-[#a855f7]/20 to-[#ff00ff]/20" />
              <div className="absolute inset-0 bg-[#0f1629]/80 backdrop-blur-xl" />

              {/* Animated Orbs */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-[#00f0ff]/30 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#a855f7]/30 rounded-full blur-[80px]" />

              <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to <span className="text-gradient">Travel Connected?</span>
                </h2>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
                  Join 2 million+ travelers who stay connected with RoamSIM. Get your first eSIM
                  today and experience seamless global connectivity.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/destinations" className="btn-primary text-lg py-4 px-10">
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="/contact" className="btn-secondary text-lg py-4 px-10">
                    Contact Sales
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
