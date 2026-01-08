import Link from 'next/link'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import { RefreshCw, CheckCircle, XCircle, Clock, Mail } from 'lucide-react'

export const metadata = {
  title: 'Refund Policy - RoamSIM',
  description: 'Refund Policy for RoamSIM eSIM services',
}

export default function RefundPage() {
  return (
    <>
      <Navbar />

      <main className="pt-20 min-h-screen">
        {/* Hero */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00f0ff]/10 via-transparent to-[#a855f7]/10" />
          <div className="container mx-auto px-6 relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00f0ff] to-[#a855f7] flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">Refund Policy</h1>
            </div>
            <p className="text-slate-400">Last updated: January 2026</p>
          </div>
        </section>

        {/* Quick Summary */}
        <section className="py-12 border-b border-white/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Quick Summary</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="glass p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Eligible for Refund</h3>
                      <p className="text-sm text-slate-400">Uninstalled eSIMs that have not been activated</p>
                    </div>
                  </div>
                </div>
                <div className="glass p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <XCircle className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Not Eligible</h3>
                      <p className="text-sm text-slate-400">Installed or activated eSIMs, or those with data usage</p>
                    </div>
                  </div>
                </div>
                <div className="glass p-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#00f0ff]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-[#00f0ff]" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Processing Time</h3>
                      <p className="text-sm text-slate-400">5-10 business days after approval</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto glass p-8 md:p-12">
              <div className="prose prose-invert prose-slate max-w-none">
                <h2>1. Overview</h2>
                <p>
                  At RoamSIM, we strive to provide high-quality eSIM products and excellent customer service. This Refund Policy outlines the conditions under which refunds may be granted for eSIM purchases.
                </p>
                <p>
                  Due to the digital nature of eSIM products, refunds are subject to specific conditions detailed below.
                </p>

                <h2>2. Refund Eligibility</h2>

                <h3>2.1 Eligible for Full Refund</h3>
                <p>You may be eligible for a full refund if:</p>
                <ul>
                  <li>The eSIM has not been installed on any device</li>
                  <li>The eSIM has not been activated</li>
                  <li>No data has been consumed</li>
                  <li>The refund request is made within 30 days of purchase</li>
                  <li>Technical issues on our end prevented delivery of the eSIM</li>
                </ul>

                <h3>2.2 Not Eligible for Refund</h3>
                <p>Refunds cannot be provided if:</p>
                <ul>
                  <li>The eSIM has been installed on a device (QR code scanned or activation code entered)</li>
                  <li>The eSIM has been activated on a network</li>
                  <li>Any data has been used from the plan</li>
                  <li>The validity period of the eSIM has begun</li>
                  <li>The purchase was made more than 30 days ago</li>
                  <li>The eSIM does not work due to device incompatibility (user responsibility to verify before purchase)</li>
                </ul>

                <h2>3. Special Circumstances</h2>

                <h3>3.1 Technical Issues</h3>
                <p>
                  If you experience technical issues with your eSIM that prevent it from working properly, please contact our support team first. We will work to resolve the issue or provide a replacement eSIM before considering a refund.
                </p>

                <h3>3.2 Network Coverage Issues</h3>
                <p>
                  While we partner with reputable carriers, network coverage can vary by location. If you experience persistent coverage issues in an area where coverage was advertised, please contact support with details of your location and issue. Partial refunds may be considered on a case-by-case basis.
                </p>

                <h3>3.3 Duplicate Purchases</h3>
                <p>
                  If you accidentally made a duplicate purchase, please contact us immediately. We will refund the duplicate purchase provided the second eSIM has not been installed or activated.
                </p>

                <h2>4. How to Request a Refund</h2>
                <p>To request a refund, please follow these steps:</p>
                <ol>
                  <li>Log in to your RoamSIM account</li>
                  <li>Navigate to your Order History</li>
                  <li>Select the order you wish to refund</li>
                  <li>Click &quot;Request Refund&quot; and provide the reason</li>
                </ol>
                <p>Alternatively, you can email us at support@roamsim.com with:</p>
                <ul>
                  <li>Your order number</li>
                  <li>Email address used for the purchase</li>
                  <li>Reason for the refund request</li>
                </ul>

                <h2>5. Refund Processing</h2>
                <p>
                  Once your refund request is approved:
                </p>
                <ul>
                  <li>Credit/Debit Card: 5-10 business days for the refund to appear</li>
                  <li>The refund will be issued to the original payment method</li>
                  <li>You will receive an email confirmation when the refund is processed</li>
                </ul>
                <p>
                  Processing times may vary depending on your bank or payment provider.
                </p>

                <h2>6. Account Credit Option</h2>
                <p>
                  As an alternative to a refund, we may offer account credit that can be used for future eSIM purchases. Account credits:
                </p>
                <ul>
                  <li>Are processed immediately</li>
                  <li>Never expire</li>
                  <li>Can be used for any destination</li>
                </ul>

                <h2>7. Chargebacks</h2>
                <p>
                  We encourage customers to contact us directly before initiating a chargeback with their bank or credit card company. We are committed to resolving issues fairly and promptly.
                </p>
                <p>
                  Filing a chargeback for a legitimate purchase that does not meet our refund criteria may result in account suspension.
                </p>

                <h2>8. Changes to This Policy</h2>
                <p>
                  We reserve the right to modify this Refund Policy at any time. Changes will be posted on this page with an updated &quot;Last updated&quot; date. Continued use of our services after changes constitutes acceptance of the modified policy.
                </p>

                <h2>9. Contact Us</h2>
                <p>
                  If you have questions about our Refund Policy or need assistance with a refund request, please contact us:
                </p>
                <ul>
                  <li>Email: support@roamsim.com</li>
                  <li>Address: RoamSIM Inc., San Francisco, CA, USA</li>
                </ul>
              </div>

              {/* Contact CTA */}
              <div className="mt-12 p-6 rounded-xl bg-gradient-to-br from-[#00f0ff]/10 to-[#a855f7]/10 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#00f0ff]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Need Help?</h3>
                    <p className="text-slate-400 mb-3">
                      Our support team is available 24/7 to assist you with refund requests or any other questions.
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-[#00f0ff] font-medium hover:underline"
                    >
                      Contact Support
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
