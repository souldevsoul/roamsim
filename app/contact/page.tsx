'use client'

import { useState } from 'react'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import {
  Mail,
  MessageSquare,
  Clock,
  MapPin,
  Send,
  CheckCircle,
  Loader2,
} from 'lucide-react'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Get a response within 24 hours',
    value: 'support@roamsim.com',
    href: 'mailto:support@roamsim.com',
  },
  {
    icon: Clock,
    title: 'Support Hours',
    description: 'We are here for you',
    value: '24/7 Available',
    href: null,
  },
  {
    icon: MapPin,
    title: 'Headquarters',
    description: 'Our main office',
    value: 'San Francisco, CA',
    href: null,
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSubmitting(false)
    setSubmitted(true)
  }

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
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
              <p className="text-xl text-slate-400">
                Have a question or need help? We&apos;re here for you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {contactInfo.map((info, i) => (
                <div key={i} className="glass p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-6 h-6 text-[#00f0ff]" />
                  </div>
                  <h3 className="font-semibold mb-1">{info.title}</h3>
                  <p className="text-sm text-slate-500 mb-2">{info.description}</p>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-[#00f0ff] hover:underline"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-slate-300">{info.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto">
              <div className="glass p-8 md:p-12">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">Message Sent!</h2>
                    <p className="text-slate-400 mb-6">
                      Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false)
                        setFormData({ name: '', email: '', subject: '', message: '' })
                      }}
                      className="btn-secondary"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Your Name
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="input w-full"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            className="input w-full"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Subject
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({ ...formData, subject: e.target.value })
                          }
                          className="input w-full"
                          placeholder="How can we help?"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Message
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          className="input w-full resize-none"
                          placeholder="Tell us more about your inquiry..."
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-primary w-full justify-center"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
