import Link from 'next/link'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import { HelpCircle, ChevronRight, Mail } from 'lucide-react'

export const metadata = {
  title: 'FAQs - RoamSIM',
  description: 'Frequently asked questions about RoamSIM eSIM services',
}

const faqCategories = [
  {
    category: 'Getting Started',
    faqs: [
      {
        question: 'What is an eSIM?',
        answer: 'An eSIM (embedded SIM) is a digital SIM that allows you to activate a cellular plan without having to use a physical SIM card. It\'s built into your phone and can be programmed with carrier information digitally.',
      },
      {
        question: 'How do I know if my phone supports eSIM?',
        answer: 'Most modern smartphones support eSIM, including iPhone XS and later, Google Pixel 3 and later, Samsung Galaxy S20 and later. You can check in Settings > Cellular/Mobile > Add eSIM. Your phone must also be carrier unlocked.',
      },
      {
        question: 'Do I need to remove my physical SIM?',
        answer: 'No! You can use both your physical SIM and eSIM at the same time. This is called Dual SIM mode. Keep your regular number for calls and texts while using RoamSIM for data.',
      },
    ],
  },
  {
    category: 'Purchasing & Delivery',
    faqs: [
      {
        question: 'How quickly will I receive my eSIM?',
        answer: 'Instantly! As soon as your payment is confirmed, you\'ll receive your eSIM QR code via email and it will also be available in your account dashboard.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit and debit cards (Visa, Mastercard, American Express) through our secure payment processor. We also accept Apple Pay and Google Pay.',
      },
      {
        question: 'Can I buy an eSIM for someone else?',
        answer: 'Yes! You can purchase an eSIM and forward the QR code email to anyone. Just make sure they have a compatible, unlocked device.',
      },
    ],
  },
  {
    category: 'Installation & Activation',
    faqs: [
      {
        question: 'How do I install my eSIM?',
        answer: 'After purchase, open your phone\'s Settings > Cellular/Mobile > Add eSIM, then scan the QR code we sent you. The eSIM will be installed in seconds. Detailed instructions are included with your purchase.',
      },
      {
        question: 'When does my data plan start?',
        answer: 'Your data plan starts when you first connect to a mobile network in your destination country. Install the eSIM before you travel, and it will activate automatically when you arrive.',
      },
      {
        question: 'Can I install the eSIM before my trip?',
        answer: 'Yes, and we recommend it! Install your eSIM at home with WiFi, then your plan will activate when you arrive at your destination and connect to a network.',
      },
      {
        question: 'What if I have trouble installing?',
        answer: 'Our 24/7 support team is here to help. Contact us via email or chat and we\'ll guide you through the installation process.',
      },
    ],
  },
  {
    category: 'Usage & Coverage',
    faqs: [
      {
        question: 'What speeds can I expect?',
        answer: 'RoamSIM provides 4G/LTE speeds on local networks. Actual speeds depend on network conditions and coverage in your specific location.',
      },
      {
        question: 'Can I make calls and send texts with RoamSIM?',
        answer: 'RoamSIM is a data-only service. However, you can use apps like WhatsApp, FaceTime, or Skype to make calls and send messages over data.',
      },
      {
        question: 'Can I use hotspot/tethering?',
        answer: 'Yes! All our eSIM plans support hotspot/tethering, so you can share your connection with other devices.',
      },
      {
        question: 'What happens if I run out of data?',
        answer: 'You can purchase a top-up plan from your dashboard. If your current plan supports it, you can add more data without getting a new eSIM.',
      },
      {
        question: 'Does unused data roll over?',
        answer: 'No, unused data expires at the end of your plan\'s validity period and does not roll over to a new plan.',
      },
    ],
  },
  {
    category: 'Refunds & Support',
    faqs: [
      {
        question: 'Can I get a refund?',
        answer: 'Refunds are available for eSIMs that have not been installed or activated. Once an eSIM is installed on a device, it cannot be refunded. See our refund policy for full details.',
      },
      {
        question: 'What if the eSIM doesn\'t work?',
        answer: 'Contact our 24/7 support team immediately. We\'ll troubleshoot the issue and if it\'s a technical problem on our end, we\'ll provide a replacement or refund.',
      },
      {
        question: 'How do I contact support?',
        answer: 'You can reach us via email at support@roamsim.com or through the contact form on our website. We respond to all inquiries within 24 hours, usually much faster.',
      },
    ],
  },
]

export default function FAQsPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Everything you need to know about RoamSIM and how to stay connected
              while traveling.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-12">
              {faqCategories.map((category, i) => (
                <div key={i}>
                  <h2 className="text-2xl font-bold mb-6 text-gradient">
                    {category.category}
                  </h2>
                  <div className="space-y-4">
                    {category.faqs.map((faq, j) => (
                      <details key={j} className="group glass overflow-hidden">
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
              ))}
            </div>
          </div>
        </section>

        {/* Still have questions */}
        <section className="py-16 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto glass p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
              <p className="text-slate-400 mb-8">
                Can&apos;t find the answer you&apos;re looking for? Our support team is here to
                help 24/7.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="mailto:support@roamsim.com" className="btn-primary">
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
