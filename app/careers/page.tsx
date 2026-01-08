import Link from 'next/link'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  Heart,
  Globe,
  Zap,
  Coffee,
  ArrowRight,
} from 'lucide-react'

export const metadata = {
  title: 'Careers - RoamSIM',
  description: 'Join the RoamSIM team and help travelers stay connected worldwide',
}

const benefits = [
  {
    icon: Globe,
    title: 'Remote First',
    description: 'Work from anywhere in the world. We practice what we preach.',
  },
  {
    icon: Heart,
    title: 'Health & Wellness',
    description: 'Comprehensive health insurance and wellness stipend.',
  },
  {
    icon: Zap,
    title: 'Learning Budget',
    description: '$2,000 annual learning and development budget.',
  },
  {
    icon: Coffee,
    title: 'Flexible Hours',
    description: 'Work when you\'re most productive. Results matter most.',
  },
  {
    icon: Users,
    title: 'Team Retreats',
    description: 'Annual company retreats in exciting destinations.',
  },
  {
    icon: Clock,
    title: 'Unlimited PTO',
    description: 'Take the time you need to recharge and explore.',
  },
]

const openings = [
  {
    title: 'Senior Backend Engineer',
    department: 'Engineering',
    location: 'Remote (US/EU)',
    type: 'Full-time',
    description: 'Build scalable APIs and services that power our eSIM platform.',
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote (Worldwide)',
    type: 'Full-time',
    description: 'Design beautiful, intuitive experiences for travelers worldwide.',
  },
  {
    title: 'Customer Success Manager',
    department: 'Support',
    location: 'Remote (US/EU)',
    type: 'Full-time',
    description: 'Help our customers have amazing experiences with RoamSIM.',
  },
  {
    title: 'Growth Marketing Manager',
    department: 'Marketing',
    location: 'Remote (US)',
    type: 'Full-time',
    description: 'Drive user acquisition and growth through data-driven marketing.',
  },
  {
    title: 'Mobile Engineer (iOS)',
    department: 'Engineering',
    location: 'Remote (Worldwide)',
    type: 'Full-time',
    description: 'Build our iOS app to make eSIM management seamless.',
  },
]

const values = [
  {
    title: 'Customer Obsessed',
    description: 'Every decision starts with "How does this help our travelers?"',
  },
  {
    title: 'Move Fast',
    description: 'Ship quickly, learn faster. Perfection is the enemy of progress.',
  },
  {
    title: 'Stay Curious',
    description: 'Question assumptions. There\'s always a better way.',
  },
  {
    title: 'Own It',
    description: 'Take initiative, take responsibility, take pride in your work.',
  },
]

export default function CareersPage() {
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
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Join Our <span className="text-gradient">Mission</span>
              </h1>
              <p className="text-xl text-slate-400 mb-8">
                Help us keep travelers connected worldwide. We&apos;re building the future
                of global connectivity, and we want you on our team.
              </p>
              <a href="#openings" className="btn-primary text-lg py-4 px-8">
                View Open Positions
              </a>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                These principles guide how we work and who we hire.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {values.map((value, i) => (
                <div key={i} className="glass p-6 text-center">
                  <h3 className="font-semibold mb-2 text-[#00f0ff]">{value.title}</h3>
                  <p className="text-sm text-slate-400">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Work With Us</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                We believe in taking care of our team so they can do their best work.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {benefits.map((benefit, i) => (
                <div key={i} className="glass p-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-[#00f0ff]" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-slate-400">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section id="openings" className="py-20 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Find your next opportunity at RoamSIM.
              </p>
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
              {openings.map((job, i) => (
                <div
                  key={i}
                  className="glass p-6 group cursor-pointer hover:border-[#00f0ff]/30 transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold group-hover:text-[#00f0ff] transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-slate-400 text-sm mb-2">{job.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <button className="btn-secondary self-start md:self-center flex-shrink-0">
                      Apply Now
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* No Position */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto glass p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Don&apos;t See Your Role?</h2>
              <p className="text-slate-400 mb-8">
                We&apos;re always looking for talented people. Send us your resume and
                tell us how you&apos;d contribute to RoamSIM.
              </p>
              <a href="mailto:careers@roamsim.com" className="btn-primary">
                Send Your Resume
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
