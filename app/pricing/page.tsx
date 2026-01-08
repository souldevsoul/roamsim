import Link from 'next/link'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import {
  Globe,
  Check,
  Zap,
  Shield,
  Headphones,
  ArrowRight,
} from 'lucide-react'

export const metadata = {
  title: 'Pricing - RoamSIM',
  description: 'Simple, transparent eSIM pricing for travelers. No hidden fees.',
}

const popularPlans = [
  {
    destination: 'Europe',
    flag: '🇪🇺',
    plans: [
      { data: '1GB', days: 7, price: 4.50 },
      { data: '3GB', days: 15, price: 9.00 },
      { data: '5GB', days: 30, price: 14.00 },
      { data: '10GB', days: 30, price: 22.00 },
    ],
  },
  {
    destination: 'USA',
    flag: '🇺🇸',
    plans: [
      { data: '1GB', days: 7, price: 5.00 },
      { data: '3GB', days: 15, price: 11.00 },
      { data: '5GB', days: 30, price: 16.00 },
      { data: '10GB', days: 30, price: 26.00 },
    ],
  },
  {
    destination: 'Asia',
    flag: '🌏',
    plans: [
      { data: '1GB', days: 7, price: 4.00 },
      { data: '3GB', days: 15, price: 8.00 },
      { data: '5GB', days: 30, price: 13.00 },
      { data: '10GB', days: 30, price: 20.00 },
    ],
  },
]

const features = [
  {
    icon: Zap,
    title: 'Instant Delivery',
    description: 'Get your eSIM QR code within seconds of purchase',
  },
  {
    icon: Shield,
    title: 'No Hidden Fees',
    description: 'The price you see is the price you pay. Period.',
  },
  {
    icon: Globe,
    title: '190+ Countries',
    description: 'Coverage in virtually every destination worldwide',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Our team is always here to help you',
  },
]

export default function PricingPage() {
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
                Simple,{' '}
                <span className="text-gradient">Transparent Pricing</span>
              </h1>
              <p className="text-xl text-slate-400 mb-8">
                No contracts, no hidden fees, no surprises. Just affordable data plans
                for wherever your travels take you.
              </p>
              <Link href="/destinations" className="btn-primary text-lg py-4 px-8">
                <Globe className="w-5 h-5" />
                View All Destinations
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-[#00f0ff]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-slate-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Plans */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Popular Destinations</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Check out our most popular eSIM plans. All plans include 4G/LTE speeds
                and instant activation.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {popularPlans.map((region, i) => (
                <div key={i} className="glass p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{region.flag}</span>
                    <h3 className="text-xl font-bold">{region.destination}</h3>
                  </div>
                  <div className="space-y-3">
                    {region.plans.map((plan, j) => (
                      <div
                        key={j}
                        className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <div>
                          <p className="font-semibold">{plan.data}</p>
                          <p className="text-sm text-slate-400">{plan.days} days</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gradient">${plan.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/destinations"
                    className="mt-6 w-full btn-secondary justify-center"
                  >
                    View All Plans
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-20 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">What&apos;s Included</h2>
                <p className="text-slate-400">
                  Every RoamSIM plan comes with these features at no extra cost.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass p-6">
                  <h3 className="font-semibold mb-4">All Plans Include:</h3>
                  <ul className="space-y-3">
                    {[
                      '4G/LTE data speeds',
                      'Instant eSIM delivery',
                      'QR code & manual activation',
                      'Data-only plan',
                      'Hotspot/tethering enabled',
                      'Works with your existing number',
                      '24/7 customer support',
                      'No contract or commitment',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-300">
                        <Check className="w-5 h-5 text-[#00f0ff] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="glass p-6">
                  <h3 className="font-semibold mb-4">How Pricing Works:</h3>
                  <div className="space-y-4 text-slate-400">
                    <p>
                      <strong className="text-white">Data Amount:</strong> Choose from 1GB to
                      unlimited based on your usage needs.
                    </p>
                    <p>
                      <strong className="text-white">Validity Period:</strong> Plans range from
                      7 to 30 days. Your plan starts when you first connect to a network.
                    </p>
                    <p>
                      <strong className="text-white">Regional Plans:</strong> Cover multiple
                      countries in a region (e.g., all of Europe) at a single price.
                    </p>
                    <p>
                      <strong className="text-white">Top-ups:</strong> Running low? Add more
                      data without getting a new eSIM.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Pricing FAQ</h2>
              <div className="space-y-4">
                {[
                  {
                    q: 'Are there any hidden fees?',
                    a: 'No. The price you see is exactly what you pay. No activation fees, no service charges, no surprises.',
                  },
                  {
                    q: 'What currency are prices in?',
                    a: 'All prices are displayed in USD. Your bank may apply currency conversion fees if paying in a different currency.',
                  },
                  {
                    q: 'Can I get a refund?',
                    a: 'Yes, if your eSIM has not been installed or activated. See our refund policy for full details.',
                  },
                  {
                    q: 'Do you offer business/bulk pricing?',
                    a: 'Yes! Contact our team at business@roamsim.com for custom pricing for teams and businesses.',
                  },
                ].map((faq, i) => (
                  <div key={i} className="glass p-6">
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-slate-400">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto glass p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Save on Roaming?</h2>
              <p className="text-slate-400 mb-8">
                Browse all destinations and find the perfect plan for your trip.
              </p>
              <Link href="/destinations" className="btn-primary text-lg py-4 px-8">
                <Globe className="w-5 h-5" />
                Browse All Destinations
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
