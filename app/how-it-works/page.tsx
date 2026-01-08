import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import Link from 'next/link'
import {
  Smartphone,
  QrCode,
  Wifi,
  Globe,
  CreditCard,
  Download,
  CheckCircle,
  ArrowRight,
  Zap,
} from 'lucide-react'

export const metadata = {
  title: 'How It Works - RoamSIM',
  description: 'Learn how to get connected with RoamSIM eSIM in 3 simple steps',
}

const steps = [
  {
    step: 1,
    icon: Globe,
    title: 'Choose Your Destination',
    description: 'Browse our coverage in 190+ countries and select the data plan that fits your travel needs.',
    details: [
      'Single country or regional plans available',
      'Various data sizes from 1GB to unlimited',
      'Validity from 7 to 30 days',
    ],
  },
  {
    step: 2,
    icon: CreditCard,
    title: 'Purchase Instantly',
    description: 'Complete your secure checkout and receive your eSIM QR code immediately via email.',
    details: [
      'Instant delivery to your email',
      'Secure payment processing',
      'No hidden fees or contracts',
    ],
  },
  {
    step: 3,
    icon: QrCode,
    title: 'Scan & Connect',
    description: 'Scan the QR code with your phone to install the eSIM. Activate when you arrive at your destination.',
    details: [
      'Takes less than 2 minutes',
      'Keep your regular number',
      'Works alongside your physical SIM',
    ],
  },
]

const features = [
  {
    icon: Zap,
    title: 'Instant Activation',
    description: 'Get connected within minutes of purchase. No waiting for physical SIM delivery.',
  },
  {
    icon: Wifi,
    title: '4G/5G Speeds',
    description: 'Enjoy fast data speeds on premium local networks wherever you travel.',
  },
  {
    icon: Smartphone,
    title: 'Dual SIM Support',
    description: 'Keep your regular number active while using RoamSIM for data.',
  },
  {
    icon: Download,
    title: 'No Physical SIM',
    description: 'Everything is digital. No need to swap or store tiny SIM cards.',
  },
]

const compatibleDevices = [
  'iPhone XS, XR, and all newer models',
  'Samsung Galaxy S20 and newer',
  'Google Pixel 3 and newer',
  'iPad Pro (2018 and later)',
  'Most eSIM-enabled Android devices',
]

export default function HowItWorksPage() {
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
                Stay Connected in{' '}
                <span className="text-gradient">3 Simple Steps</span>
              </h1>
              <p className="text-xl text-slate-400 mb-8">
                No more hunting for local SIM cards or paying expensive roaming fees.
                Get online anywhere in the world within minutes.
              </p>
              <Link href="/destinations" className="btn-primary text-lg py-4 px-8">
                <Globe className="w-5 h-5" />
                Browse Destinations
              </Link>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="relative">
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-[#00f0ff]/50 to-[#a855f7]/50" />
                  )}
                  <div className="glass p-8 relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00f0ff] to-[#a855f7] flex items-center justify-center mb-6">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-slate-400 mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-slate-300">
                          <CheckCircle className="w-4 h-4 text-[#00f0ff] flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose eSIM?</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                eSIM technology eliminates the hassle of physical SIM cards and provides
                a seamless way to stay connected while traveling.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <div key={i} className="glass p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-[#00f0ff]" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compatibility */}
        <section className="py-20 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Device Compatibility</h2>
                  <p className="text-slate-400 mb-6">
                    eSIM is supported on most modern smartphones and tablets. Make sure your
                    device is carrier-unlocked before purchasing.
                  </p>
                  <ul className="space-y-3 mb-6">
                    {compatibleDevices.map((device, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-300">
                        <CheckCircle className="w-5 h-5 text-[#00f0ff] flex-shrink-0" />
                        {device}
                      </li>
                    ))}
                  </ul>
                  <Link href="/compatibility" className="text-[#00f0ff] hover:underline inline-flex items-center gap-1">
                    View full compatibility list
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="glass p-8">
                  <h3 className="font-semibold mb-4">How to check compatibility</h3>
                  <ol className="space-y-4 text-sm text-slate-400">
                    <li className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                      <span>Go to Settings &gt; General &gt; About on iPhone, or Settings &gt; About Phone on Android</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                      <span>Look for &quot;EID&quot; or &quot;eSIM&quot; in the device info</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                      <span>Ensure your device is carrier-unlocked (not tied to a specific carrier)</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto glass p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-slate-400 mb-8">
                Browse our destinations and find the perfect data plan for your next trip.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/destinations" className="btn-primary">
                  <Globe className="w-5 h-5" />
                  View All Destinations
                </Link>
                <Link href="/support" className="btn-secondary">
                  Need Help?
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
