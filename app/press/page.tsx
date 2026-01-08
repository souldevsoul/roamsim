import Link from 'next/link'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import { Newspaper, Download, Mail, ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'Press - RoamSIM',
  description: 'RoamSIM press resources, media kit, and company news',
}

const pressReleases = [
  {
    title: 'RoamSIM Expands Coverage to 190+ Countries',
    date: 'January 2, 2026',
    excerpt: 'RoamSIM announces expanded coverage with new network partnerships across Asia and South America.',
  },
  {
    title: 'RoamSIM Raises $15M Series A to Expand Global eSIM Platform',
    date: 'November 15, 2025',
    excerpt: 'Funding round led by Accel Partners will accelerate product development and market expansion.',
  },
  {
    title: 'RoamSIM Launches Instant eSIM Delivery for Travelers',
    date: 'September 1, 2025',
    excerpt: 'New technology enables travelers to get connected within seconds of purchase.',
  },
  {
    title: 'RoamSIM Partners with Major Airlines for In-Flight eSIM Purchases',
    date: 'July 20, 2025',
    excerpt: 'Travelers can now purchase and install eSIMs before landing at their destination.',
  },
]

const mediaFeatures = [
  { outlet: 'TechCrunch', title: 'RoamSIM is solving travel connectivity' },
  { outlet: 'Wired', title: 'The eSIM revolution for travelers' },
  { outlet: 'The Verge', title: 'Best travel eSIM services in 2026' },
  { outlet: 'Forbes', title: 'Startups changing how we travel' },
]

const stats = [
  { value: '500K+', label: 'Active Users' },
  { value: '190+', label: 'Countries' },
  { value: '$15M', label: 'Funding Raised' },
  { value: '2022', label: 'Founded' },
]

export default function PressPage() {
  return (
    <>
      <Navbar />

      <main className="pt-20 min-h-screen">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/10 via-transparent to-[#a855f7]/10" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00f0ff] to-[#a855f7] flex items-center justify-center mx-auto mb-6">
                <Newspaper className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Press & Media</h1>
              <p className="text-xl text-slate-400 mb-8">
                Resources for journalists and media professionals covering RoamSIM.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="btn-primary">
                  <Download className="w-5 h-5" />
                  Download Media Kit
                </button>
                <a href="mailto:press@roamsim.com" className="btn-secondary">
                  <Mail className="w-5 h-5" />
                  Press Inquiries
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-bold text-gradient mb-1">{stat.value}</p>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">About RoamSIM</h2>
              <div className="glass p-8">
                <p className="text-slate-400 mb-4">
                  RoamSIM is a global eSIM platform that provides instant mobile data connectivity
                  for travelers in 190+ countries. Founded in 2022 and headquartered in San Francisco,
                  RoamSIM has helped over 500,000 travelers stay connected while eliminating expensive
                  roaming fees and the hassle of physical SIM cards.
                </p>
                <p className="text-slate-400">
                  The company is backed by leading investors including Y Combinator and Accel Partners,
                  and has raised $15M to date. RoamSIM&apos;s mission is to make global connectivity as
                  simple as booking a flight.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Press Releases */}
        <section className="py-16 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Press Releases</h2>
              <div className="space-y-4">
                {pressReleases.map((release, i) => (
                  <div
                    key={i}
                    className="glass p-6 group cursor-pointer hover:border-[#00f0ff]/30 transition-all"
                  >
                    <p className="text-sm text-slate-500 mb-2">{release.date}</p>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-[#00f0ff] transition-colors">
                      {release.title}
                    </h3>
                    <p className="text-slate-400 text-sm">{release.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Media Coverage */}
        <section className="py-16 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Media Coverage</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {mediaFeatures.map((feature, i) => (
                  <div
                    key={i}
                    className="glass p-6 group cursor-pointer hover:border-[#00f0ff]/30 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[#00f0ff] font-medium mb-1">
                          {feature.outlet}
                        </p>
                        <p className="text-slate-300 group-hover:text-white transition-colors">
                          {feature.title}
                        </p>
                      </div>
                      <ExternalLink className="w-5 h-5 text-slate-500 group-hover:text-[#00f0ff] transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Brand Assets */}
        <section className="py-16 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Brand Assets</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass p-8">
                  <h3 className="font-semibold mb-4">Logo Package</h3>
                  <p className="text-slate-400 text-sm mb-4">
                    Download our logo in various formats (PNG, SVG, EPS) for light and dark backgrounds.
                  </p>
                  <button className="btn-secondary w-full">
                    <Download className="w-4 h-4" />
                    Download Logos
                  </button>
                </div>
                <div className="glass p-8">
                  <h3 className="font-semibold mb-4">Brand Guidelines</h3>
                  <p className="text-slate-400 text-sm mb-4">
                    Our brand guidelines including colors, typography, and usage rules.
                  </p>
                  <button className="btn-secondary w-full">
                    <Download className="w-4 h-4" />
                    Download Guidelines
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto glass p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Media Inquiries</h2>
              <p className="text-slate-400 mb-8">
                For press inquiries, interviews, or additional information, please contact our
                communications team.
              </p>
              <a href="mailto:press@roamsim.com" className="btn-primary">
                <Mail className="w-5 h-5" />
                press@roamsim.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
