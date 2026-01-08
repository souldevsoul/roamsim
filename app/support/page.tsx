import Link from 'next/link'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import {
  HelpCircle,
  Smartphone,
  Globe,
  CreditCard,
  RefreshCw,
  MessageCircle,
  ChevronRight,
  Search,
  Mail,
  Clock,
} from 'lucide-react'

export const metadata = {
  title: 'Help Center - RoamSIM',
  description: 'Get help with RoamSIM eSIM services',
}

const categories = [
  {
    icon: Smartphone,
    title: 'Installation',
    description: 'How to install and activate your eSIM',
    href: '/how-it-works',
    articles: ['Installation guide', 'QR code scanning', 'Manual activation'],
  },
  {
    icon: Globe,
    title: 'Coverage & Networks',
    description: 'Check coverage and network information',
    href: '/destinations',
    articles: ['Coverage map', 'Network partners', 'Data speeds'],
  },
  {
    icon: CreditCard,
    title: 'Payments & Billing',
    description: 'Payment methods and billing questions',
    href: '/faqs',
    articles: ['Payment methods', 'Invoices', 'Promo codes'],
  },
  {
    icon: RefreshCw,
    title: 'Refunds',
    description: 'Refund policy and how to request one',
    href: '/refund',
    articles: ['Refund eligibility', 'How to request', 'Processing time'],
  },
]

const faqs = [
  {
    question: 'What is an eSIM?',
    answer: 'An eSIM (embedded SIM) is a digital SIM that allows you to activate a cellular plan without having to use a physical SIM card. It\'s built into your phone and can be programmed with your carrier information.',
  },
  {
    question: 'Is my phone compatible with eSIM?',
    answer: 'Most modern smartphones support eSIM, including iPhone XS and later, Google Pixel 3 and later, Samsung Galaxy S20 and later, and many other devices. Your phone must also be carrier unlocked.',
  },
  {
    question: 'How do I install my eSIM?',
    answer: 'After purchase, you\'ll receive a QR code. Simply go to Settings > Cellular > Add eSIM, then scan the QR code. The eSIM will be installed within seconds.',
  },
  {
    question: 'When does my data plan start?',
    answer: 'Your data plan starts when you first connect to a network in your destination country. The validity period begins from that moment.',
  },
  {
    question: 'Can I use my eSIM in multiple countries?',
    answer: 'Regional and global plans work across multiple countries. Single-country plans only work in the specified destination.',
  },
  {
    question: 'What happens when I run out of data?',
    answer: 'You can purchase a top-up plan from your dashboard. If your plan supports top-ups, you\'ll be able to add more data without getting a new eSIM.',
  },
  {
    question: 'Can I get a refund?',
    answer: 'Refunds are available for eSIMs that have not been installed or activated. Once an eSIM is installed on a device, it cannot be refunded. See our refund policy for details.',
  },
  {
    question: 'Do I need to remove my physical SIM?',
    answer: 'No, you can use both your physical SIM and eSIM at the same time on most devices. This allows you to keep your regular number for calls while using the eSIM for data.',
  },
]

export default function SupportPage() {
  return (
    <>
      <Navbar />

      <main className="pt-20 min-h-screen">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/10 via-transparent to-[#a855f7]/10" />
          <div className="container mx-auto px-6 relative text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00f0ff] to-[#a855f7] flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">How can we help?</h1>
            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              Find answers to common questions or get in touch with our support team.
            </p>

            {/* Search */}
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search for help..."
                className="input w-full pl-12"
              />
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">Browse by Topic</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, i) => (
                <Link
                  key={i}
                  href={category.href}
                  className="group glass p-6 hover:border-[#00f0ff]/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-[#00f0ff]/20 transition-colors">
                    <category.icon className="w-6 h-6 text-[#00f0ff]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-[#00f0ff] transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-4">{category.description}</p>
                  <ul className="space-y-1">
                    {category.articles.map((article, j) => (
                      <li key={j} className="text-sm text-slate-400">
                        {article}
                      </li>
                    ))}
                  </ul>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 border-t border-white/5">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group glass overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="font-semibold pr-4">{faq.question}</span>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="px-6 pb-6 text-slate-400">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto glass p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00f0ff] to-[#a855f7] flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
              <p className="text-slate-400 mb-6">
                Our support team is available 24/7 to assist you with any questions.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-slate-400 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>24/7 Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>Quick Response</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="mailto:support@roamsim.com"
                  className="btn-primary"
                >
                  <Mail className="w-5 h-5" />
                  Email Support
                </a>
                <Link href="/contact" className="btn-secondary">
                  Contact Us
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
