import Link from 'next/link'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import {
  Globe,
  Users,
  Zap,
  Shield,
  Heart,
  Target,
  Award,
  MapPin,
} from 'lucide-react'

export const metadata = {
  title: 'About Us - RoamSIM',
  description: 'Learn about RoamSIM and our mission to keep travelers connected worldwide',
}

const stats = [
  { value: '190+', label: 'Countries Covered' },
  { value: '500K+', label: 'Happy Travelers' },
  { value: '99.9%', label: 'Uptime' },
  { value: '24/7', label: 'Support' },
]

const values = [
  {
    icon: Globe,
    title: 'Global Connectivity',
    description: 'We believe everyone deserves seamless internet access, no matter where they travel.',
  },
  {
    icon: Shield,
    title: 'Trust & Security',
    description: 'Your data and privacy are protected with enterprise-grade security measures.',
  },
  {
    icon: Zap,
    title: 'Instant Access',
    description: 'No waiting for delivery. Get connected within minutes of purchase.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'We are here 24/7 to ensure your travel connectivity is never compromised.',
  },
]

const team = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Co-founder',
    description: 'Former Google engineer with a passion for travel tech',
  },
  {
    name: 'Michael Torres',
    role: 'CTO & Co-founder',
    description: 'Ex-Stripe, building the future of mobile connectivity',
  },
  {
    name: 'Emma Williams',
    role: 'Head of Operations',
    description: 'Scaling global eSIM partnerships across 190+ countries',
  },
  {
    name: 'David Park',
    role: 'Head of Customer Success',
    description: 'Ensuring every traveler has an amazing experience',
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="pt-20 min-h-screen">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/10 via-transparent to-[#a855f7]/10" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Keeping the World{' '}
                <span className="text-gradient">Connected</span>
              </h1>
              <p className="text-xl text-slate-400 mb-8">
                RoamSIM was founded with a simple mission: eliminate the hassle of staying
                connected while traveling. No more expensive roaming bills, no more hunting
                for local SIM cards.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-4xl font-bold text-gradient mb-2">{stat.value}</p>
                  <p className="text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                  <div className="space-y-4 text-slate-400">
                    <p>
                      It started in 2022 when our founders, seasoned travelers themselves,
                      found themselves frustrated with the complexity of staying connected abroad.
                      Airport SIM kiosks, confusing carrier plans, and outrageous roaming fees
                      were the norm.
                    </p>
                    <p>
                      We knew there had to be a better way. With eSIM technology becoming
                      mainstream, we saw an opportunity to revolutionize how travelers connect.
                    </p>
                    <p>
                      Today, RoamSIM serves hundreds of thousands of travelers across 190+
                      countries, providing instant, affordable connectivity at the tap of a button.
                    </p>
                  </div>
                </div>
                <div className="glass p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00f0ff] to-[#a855f7] flex items-center justify-center">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Our Mission</h3>
                  </div>
                  <p className="text-slate-400">
                    To make global connectivity as simple as booking a flight. We envision a
                    world where staying connected abroad is instant, affordable, and worry-free
                    for every traveler.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                The principles that guide everything we do at RoamSIM.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {values.map((value, i) => (
                <div key={i} className="glass p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-[#00f0ff]" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                The people behind RoamSIM working to keep you connected.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {team.map((member, i) => (
                <div key={i} className="glass p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#a855f7] flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-[#00f0ff] mb-2">{member.role}</p>
                  <p className="text-sm text-slate-400">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Office */}
        <section className="py-20 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto glass p-12 text-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#00f0ff] to-[#a855f7] flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Headquarters</h2>
              <p className="text-slate-400 mb-6">
                We are based in San Francisco, California, with team members working remotely
                across the globe - practicing what we preach about staying connected anywhere.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Award className="w-5 h-5 text-[#00f0ff]" />
                <span className="text-slate-300">Y Combinator Backed</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Connected?</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Join hundreds of thousands of happy travelers who trust RoamSIM for their
              global connectivity needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/destinations" className="btn-primary">
                <Globe className="w-5 h-5" />
                Browse Destinations
              </Link>
              <Link href="/contact" className="btn-secondary">
                <Users className="w-5 h-5" />
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
