'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  Globe,
  Zap,
  CreditCard,
  HelpCircle,
  User,
  LogOut,
  ChevronDown,
  BookOpen,
} from 'lucide-react'

export function Navbar() {
  const { data: session, status } = useSession()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/destinations', label: 'Destinations', icon: Globe },
    { href: '/guides', label: 'Travel Guides', icon: BookOpen },
    { href: '/how-it-works', label: 'How It Works', icon: Zap },
    { href: '/support', label: 'Support', icon: HelpCircle },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#030712]/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff] to-[#a855f7] rounded-xl rotate-45 group-hover:rotate-[135deg] transition-transform duration-500" />
                <div className="absolute inset-[3px] bg-[#030712] rounded-[10px] rotate-45" />
                <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">
                  R
                </span>
              </div>
              <span className="text-xl font-semibold tracking-tight">
                Roam<span className="text-[#00f0ff]">SIM</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="hidden md:flex items-center gap-4">
              {status === 'loading' ? (
                <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
              ) : session ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#a855f7] flex items-center justify-center text-sm font-medium">
                      {session.user?.name?.[0] || session.user?.email?.[0]}
                    </div>
                    <span className="text-sm text-slate-300">{session.user?.name || 'Account'}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 w-56 py-2 glass rounded-xl shadow-2xl"
                      >
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <User className="w-4 h-4" />
                          Dashboard
                        </Link>
                        <Link
                          href="/dashboard/esims"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                        >
                          <Zap className="w-4 h-4" />
                          My eSIMs
                        </Link>
                        <div className="my-2 border-t border-white/5" />
                        <button
                          onClick={() => signOut()}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm text-slate-300 hover:text-white transition-all"
                  >
                    Sign In
                  </Link>
                  <Link href="/register" className="btn-primary text-sm py-2.5 px-5">
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-all"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-[#0f1629] border-l border-white/5"
            >
              <div className="p-6 pt-24 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white rounded-xl hover:bg-white/5 transition-all"
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-white/5 mt-4">
                  {session ? (
                    <>
                      <Link
                        href="/dashboard"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white rounded-xl hover:bg-white/5 transition-all"
                      >
                        <User className="w-5 h-5" />
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          signOut()
                          setMobileOpen(false)
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300 rounded-xl hover:bg-red-500/10 transition-all"
                      >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-center py-3 text-slate-300 hover:text-white transition-all"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setMobileOpen(false)}
                        className="btn-primary w-full mt-3"
                      >
                        Get Started
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
