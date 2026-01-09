'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Globe, Mail } from 'lucide-react'

const footerLinks = {
  Product: [
    { label: 'Destinations', href: '/destinations' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Travel Guides', href: '/guides' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
  ],
  Support: [
    { label: 'Help Center', href: '/support' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Compatibility', href: '/compatibility' },
    { label: 'FAQs', href: '/faqs' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Refund Policy', href: '/refund' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1629]/50 to-transparent pointer-events-none" />

      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff] to-[#a855f7] rounded-xl rotate-45" />
                <div className="absolute inset-[3px] bg-[#030712] rounded-[10px] rotate-45" />
                <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">
                  R
                </span>
              </div>
              <span className="text-xl font-semibold tracking-tight">
                Roam<span className="text-[#00f0ff]">SIM</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              Global eSIM data plans for travelers. Stay connected in 190+ countries with instant
              activation and no roaming fees.
            </p>
            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">We accept:</span>
              <div className="flex items-center gap-2">
                <div className="bg-white rounded px-2 py-1">
                  <Image
                    src="/images/visa.png"
                    alt="Visa"
                    width={40}
                    height={24}
                    className="h-5 w-auto object-contain"
                  />
                </div>
                <div className="bg-white rounded px-2 py-1">
                  <Image
                    src="/images/master-card.png"
                    alt="Mastercard"
                    width={40}
                    height={24}
                    className="h-5 w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-sm text-white mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-[#00f0ff] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="font-semibold text-white mb-1">Stay updated</h3>
              <p className="text-sm text-slate-400">
                Get travel tips and exclusive deals straight to your inbox.
              </p>
            </div>
            <form className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input flex-1 md:w-64"
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                <Mail className="w-4 h-4" />
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} RoamSIM. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Globe className="w-4 h-4" />
            <span>Connecting travelers worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
