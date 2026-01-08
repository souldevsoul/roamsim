'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Lock,
  ShieldCheck,
  Loader2,
  Tag,
  Gift,
  AlertCircle,
  Mail,
  User,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react'
import { Navbar } from '@/components/shared/Navbar'
import { Stepper, Step } from '@/components/ui'

interface Package {
  id: string
  slug: string
  data: string
  days: number
  price: number
  speed: string
  dataType: number
}

const CHECKOUT_STEPS: Step[] = [
  { id: 'review', title: 'Review', description: 'Plan details' },
  { id: 'account', title: 'Account', description: 'Sign in' },
  { id: 'payment', title: 'Payment', description: 'Complete order' },
]

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session, status: sessionStatus } = useSession()

  const packageCode = searchParams.get('package') || ''
  const countryCode = searchParams.get('country') || ''

  // State
  const [pkg, setPkg] = useState<Package | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)

  // Promo state
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [promoError, setPromoError] = useState<string | null>(null)
  const [promoLoading, setPromoLoading] = useState(false)

  // Credits state
  const [useCredits, setUseCredits] = useState(false)
  const [userCredits, setUserCredits] = useState(0)

  // Auth state (for step 2)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  // Payment state
  const [processing, setProcessing] = useState(false)
  const [orderError, setOrderError] = useState<string | null>(null)

  // Card state
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [cardName, setCardName] = useState('')

  // Fetch package details
  useEffect(() => {
    async function fetchPackage() {
      if (!packageCode) {
        setError('No package selected')
        setLoading(false)
        return
      }

      try {
        const res = await fetch(`/api/packages?country=${countryCode}`)
        if (!res.ok) throw new Error('Failed to fetch packages')

        const data = await res.json()
        const foundPkg = data.plans?.find(
          (p: Package) => p.id === packageCode
        )

        if (!foundPkg) {
          setError('Package not found')
        } else {
          setPkg(foundPkg)
        }
      } catch (err) {
        setError('Failed to load package details')
      } finally {
        setLoading(false)
      }
    }

    fetchPackage()
  }, [packageCode, countryCode])

  // Fetch user credits if logged in
  useEffect(() => {
    if (session?.user) {
      fetch('/api/user/stats')
        .then((res) => res.json())
        .then((data) => setUserCredits(data.credits || 0))
        .catch(() => {})
    }
  }, [session])

  // Auto-advance to step 2 if authenticated
  useEffect(() => {
    if (sessionStatus === 'authenticated' && currentStep === 1) {
      setCurrentStep(2)
    }
  }, [sessionStatus, currentStep])

  // Apply promo code
  const applyPromo = async () => {
    if (!promoCode.trim()) return

    setPromoError(null)
    setPromoLoading(true)

    try {
      const res = await fetch('/api/promo/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoCode }),
      })

      const data = await res.json()

      if (!res.ok) {
        setPromoError(data.error || 'Invalid promo code')
        return
      }

      setPromoApplied(true)
      setPromoDiscount(data.discount)
    } catch {
      setPromoError('Failed to validate promo code')
    } finally {
      setPromoLoading(false)
    }
  }

  // Handle authentication
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthLoading(true)
    setAuthError(null)

    try {
      if (authMode === 'register') {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name }),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'Registration failed')
        }
      }

      // Sign in
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error('Invalid credentials')
      }

      // Move to payment step
      setCurrentStep(2)
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setAuthLoading(false)
    }
  }

  // Calculate totals
  const subtotal = pkg ? pkg.price : 0
  const discount = promoApplied ? subtotal * (promoDiscount / 100) : 0
  const creditsDiscount = useCredits
    ? Math.min(userCredits / 100, subtotal - discount)
    : 0
  const total = Math.max(0, subtotal - discount - creditsDiscount)

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(' ') : value
  }

  // Format expiry date
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  // Validate card form
  const isCardValid = () => {
    return (
      cardNumber.replace(/\s/g, '').length >= 15 &&
      cardExpiry.length === 5 &&
      cardCvc.length >= 3 &&
      cardName.trim().length > 0
    )
  }

  // Handle checkout with mock payment
  const handleCheckout = async () => {
    if (!session) {
      setCurrentStep(1)
      return
    }

    if (!pkg) return

    // Validate card
    if (!isCardValid()) {
      setOrderError('Please fill in all card details')
      return
    }

    setProcessing(true)
    setOrderError(null)

    try {
      // Mock payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create order via API (mock payment)
      const res = await fetch('/api/orders/mock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageCode: pkg.id,
          countryCode,
          amount: total,
          useCredits,
          promoCode: promoApplied ? promoCode : undefined,
          // Don't send actual card data - this is just a mock
          paymentMethod: 'card',
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Payment failed')
      }

      // Redirect to success page
      router.push(`/checkout/success?order=${data.orderId}`)
    } catch (err) {
      setOrderError(
        err instanceof Error ? err.message : 'Payment failed. Please try again.'
      )
      setProcessing(false)
    }
  }

  // Navigation handlers
  const goToNextStep = () => {
    if (currentStep === 0) {
      if (sessionStatus === 'authenticated') {
        setCurrentStep(2)
      } else {
        setCurrentStep(1)
      }
    } else if (currentStep === 1 && sessionStatus === 'authenticated') {
      setCurrentStep(2)
    }
  }

  const goToPrevStep = () => {
    if (currentStep === 2 && sessionStatus === 'authenticated') {
      // Skip account step for authenticated users
      setCurrentStep(0)
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (loading) {
    return (
      <main className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-[#00f0ff] mx-auto mb-4" />
          <p className="text-slate-400">Loading your plan...</p>
        </div>
      </main>
    )
  }

  if (error || !pkg) {
    return (
      <main className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">{error || 'Package not found'}</h1>
          <p className="text-slate-400 mb-8">Please select a plan first.</p>
          <Link href="/destinations" className="btn-primary">
            <ArrowLeft className="w-5 h-5" />
            Browse Plans
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link
            href={`/destinations/${countryCode}`}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Plans
          </Link>

          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          {/* Progress Stepper */}
          <Stepper steps={CHECKOUT_STEPS} currentStep={currentStep} className="mb-12" />

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {/* Step 1: Review */}
                {currentStep === 0 && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Plan Details */}
                    <div className="glass p-6">
                      <h2 className="text-lg font-semibold mb-4">Your Plan</h2>

                      <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5">
                        <span className="text-4xl">{getCountryFlag(countryCode)}</span>
                        <div className="flex-1">
                          <h3 className="font-semibold">{countryCode.toUpperCase()} eSIM</h3>
                          <p className="text-sm text-slate-400">{pkg.data} Data Plan</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                            <span>{pkg.data}</span>
                            <span>•</span>
                            <span>
                              {pkg.days} day{pkg.days > 1 ? 's' : ''}
                            </span>
                            {pkg.speed && (
                              <>
                                <span>•</span>
                                <span>{pkg.speed}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gradient">
                            ${subtotal.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            '4G/LTE speed',
                            'Instant activation',
                            'Hotspot enabled',
                            '24/7 support',
                          ].map((feature) => (
                            <span
                              key={feature}
                              className="inline-flex items-center gap-2 text-sm text-slate-300"
                            >
                              <Check className="w-4 h-4 text-[#00f0ff]" />
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Promo Code */}
                    <div className="glass p-6">
                      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Tag className="w-5 h-5 text-[#a855f7]" />
                        Have a promo code?
                      </h2>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                          placeholder="Enter code"
                          className="input flex-1"
                          disabled={promoApplied}
                        />
                        <button
                          onClick={applyPromo}
                          disabled={promoApplied || !promoCode || promoLoading}
                          className="btn-secondary disabled:opacity-50 min-w-[100px]"
                        >
                          {promoLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : promoApplied ? (
                            <>
                              <Check className="w-4 h-4" />
                              Applied
                            </>
                          ) : (
                            'Apply'
                          )}
                        </button>
                      </div>
                      {promoApplied && (
                        <p className="text-sm text-green-400 mt-2 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          {promoDiscount}% discount applied!
                        </p>
                      )}
                      {promoError && (
                        <p className="text-sm text-red-400 mt-2">{promoError}</p>
                      )}
                    </div>

                    {/* Continue Button */}
                    <button
                      onClick={goToNextStep}
                      className="btn-primary w-full justify-center"
                    >
                      Continue
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </motion.div>
                )}

                {/* Step 2: Account */}
                {currentStep === 1 && sessionStatus !== 'authenticated' && (
                  <motion.div
                    key="account"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="glass p-6">
                      <div className="flex items-center justify-center gap-4 mb-6">
                        <button
                          onClick={() => setAuthMode('login')}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            authMode === 'login'
                              ? 'bg-white/10 text-white'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          Sign In
                        </button>
                        <button
                          onClick={() => setAuthMode('register')}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            authMode === 'register'
                              ? 'bg-white/10 text-white'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          Create Account
                        </button>
                      </div>

                      <form onSubmit={handleAuth} className="space-y-4">
                        {authMode === 'register' && (
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                              Full Name
                            </label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                              <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                className="input pl-10 w-full"
                                required
                              />
                            </div>
                          </div>
                        )}

                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Email
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@example.com"
                              className="input pl-10 w-full"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Password
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••••"
                              className="input pl-10 pr-10 w-full"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>

                        {authError && (
                          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <p className="text-sm text-red-400">{authError}</p>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={authLoading}
                          className="btn-primary w-full justify-center"
                        >
                          {authLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : authMode === 'login' ? (
                            'Sign In & Continue'
                          ) : (
                            'Create Account & Continue'
                          )}
                        </button>
                      </form>
                    </div>

                    {/* Back Button */}
                    <button
                      onClick={goToPrevStep}
                      className="btn-secondary w-full justify-center"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Back
                    </button>
                  </motion.div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 2 && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Credits */}
                    {session && userCredits > 0 && (
                      <div className="glass p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#a855f7]/20 flex items-center justify-center">
                              <Gift className="w-5 h-5 text-[#a855f7]" />
                            </div>
                            <div>
                              <h2 className="font-semibold">Account Credits</h2>
                              <p className="text-sm text-slate-400">
                                Available: ${(userCredits / 100).toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={useCredits}
                              onChange={(e) => setUseCredits(e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#a855f7]"></div>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Payment Form */}
                    <div className="glass p-6">
                      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Payment Details
                      </h2>

                      <div className="space-y-4">
                        {/* Card Number */}
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Card Number
                          </label>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                            <input
                              type="text"
                              value={cardNumber}
                              onChange={(e) =>
                                setCardNumber(formatCardNumber(e.target.value))
                              }
                              placeholder="1234 5678 9012 3456"
                              maxLength={19}
                              className="input pl-10 w-full font-mono"
                            />
                          </div>
                        </div>

                        {/* Cardholder Name */}
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="John Doe"
                            className="input w-full"
                          />
                        </div>

                        {/* Expiry and CVC */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) =>
                                setCardExpiry(formatExpiry(e.target.value))
                              }
                              placeholder="MM/YY"
                              maxLength={5}
                              className="input w-full font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                              CVC
                            </label>
                            <input
                              type="text"
                              value={cardCvc}
                              onChange={(e) =>
                                setCardCvc(
                                  e.target.value.replace(/\D/g, '').slice(0, 4)
                                )
                              }
                              placeholder="123"
                              maxLength={4}
                              className="input w-full font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Security Notice */}
                      <div className="flex items-center gap-3 mt-6 p-4 rounded-xl bg-white/5">
                        <ShieldCheck className="w-6 h-6 text-[#00f0ff] flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Secure Checkout</p>
                          <p className="text-xs text-slate-400">
                            256-bit SSL encryption. Your payment info is never stored.
                          </p>
                        </div>
                      </div>

                      {/* Test Card Notice */}
                      <div className="mt-4 p-3 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/20">
                        <p className="text-xs text-[#00f0ff]">
                          <strong>Test Mode:</strong> Use card 4242 4242 4242 4242, any future date, any CVC
                        </p>
                      </div>
                    </div>

                    {orderError && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                        <p className="text-sm text-red-400">{orderError}</p>
                      </div>
                    )}

                    {/* Payment Button */}
                    <button
                      onClick={handleCheckout}
                      disabled={processing}
                      className="btn-primary w-full justify-center text-lg py-4"
                    >
                      {processing ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5" />
                          Pay ${total.toFixed(2)} Securely
                        </>
                      )}
                    </button>

                    {/* Back Button */}
                    <button
                      onClick={goToPrevStep}
                      disabled={processing}
                      className="btn-secondary w-full justify-center"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Back
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-2">
              <div className="glass p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                {/* Plan Mini Card */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 mb-6">
                  <span className="text-2xl">{getCountryFlag(countryCode)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{pkg.data}</p>
                    <p className="text-xs text-slate-400">
                      {pkg.days} day{pkg.days > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-400">
                      <span>Promo ({promoDiscount}%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  {creditsDiscount > 0 && (
                    <div className="flex justify-between text-sm text-[#a855f7]">
                      <span>Credits</span>
                      <span>-${creditsDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-white/10 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-gradient">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="pt-4 border-t border-white/5 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Lock className="w-3 h-3" />
                    <span>Secure payment with Stripe</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <ShieldCheck className="w-3 h-3" />
                    <span>7-day money-back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

function getCountryFlag(code: string): string {
  if (!code || code.length !== 2) return '🌍'

  const codePoints = code
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0))

  return String.fromCodePoint(...codePoints)
}

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <main className="pt-24 pb-20 min-h-screen flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-10 h-10 animate-spin text-[#00f0ff] mx-auto mb-4" />
              <p className="text-slate-400">Loading checkout...</p>
            </div>
          </main>
        }
      >
        <CheckoutContent />
      </Suspense>
    </>
  )
}
