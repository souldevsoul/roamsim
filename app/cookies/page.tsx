import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import { Cookie } from 'lucide-react'

export const metadata = {
  title: 'Cookie Policy - RoamSIM',
  description: 'Cookie Policy for RoamSIM eSIM services',
}

export default function CookiesPage() {
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
                <Cookie className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">Cookie Policy</h1>
            </div>
            <p className="text-slate-400">Last updated: January 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto glass p-8 md:p-12">
              <div className="prose prose-invert prose-slate max-w-none">
                <h2>1. What Are Cookies</h2>
                <p>
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.
                </p>
                <p>
                  This Cookie Policy explains how RoamSIM (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) uses cookies and similar technologies on our website and services.
                </p>

                <h2>2. How We Use Cookies</h2>
                <p>We use cookies for the following purposes:</p>

                <h3>2.1 Essential Cookies</h3>
                <p>
                  These cookies are necessary for the website to function properly. They enable basic features like page navigation, access to secure areas, and shopping cart functionality. The website cannot function properly without these cookies.
                </p>
                <ul>
                  <li>Authentication and login status</li>
                  <li>Shopping cart contents</li>
                  <li>Security features</li>
                  <li>Load balancing</li>
                </ul>

                <h3>2.2 Performance Cookies</h3>
                <p>
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve the website&apos;s performance and user experience.
                </p>
                <ul>
                  <li>Pages visited and time spent</li>
                  <li>Error messages encountered</li>
                  <li>Page load times</li>
                </ul>

                <h3>2.3 Functionality Cookies</h3>
                <p>
                  These cookies allow the website to remember choices you make (such as your language preference or region) and provide enhanced, personalized features.
                </p>
                <ul>
                  <li>Language preferences</li>
                  <li>Region/country selection</li>
                  <li>Customized settings</li>
                </ul>

                <h3>2.4 Marketing Cookies</h3>
                <p>
                  These cookies track your browsing habits to enable us to show advertising which is more likely to be of interest to you. They also limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns.
                </p>
                <ul>
                  <li>Ad targeting and retargeting</li>
                  <li>Campaign effectiveness measurement</li>
                  <li>Cross-site tracking for personalization</li>
                </ul>

                <h2>3. Third-Party Cookies</h2>
                <p>
                  Some cookies are placed by third-party services that appear on our pages. We use the following third-party services:
                </p>
                <ul>
                  <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                  <li><strong>Stripe:</strong> For secure payment processing</li>
                  <li><strong>Intercom:</strong> For customer support chat functionality</li>
                </ul>
                <p>
                  We do not control the setting of these third-party cookies. Please check the third-party websites for more information about their cookies and how to manage them.
                </p>

                <h2>4. Cookie Duration</h2>
                <p>Cookies can be either &quot;session&quot; or &quot;persistent&quot; cookies:</p>
                <ul>
                  <li><strong>Session cookies:</strong> These are temporary and expire when you close your browser</li>
                  <li><strong>Persistent cookies:</strong> These remain on your device until they expire or you delete them</li>
                </ul>

                <h2>5. Managing Cookies</h2>
                <p>
                  Most web browsers allow you to control cookies through their settings. You can typically:
                </p>
                <ul>
                  <li>See what cookies are stored and delete them individually</li>
                  <li>Block third-party cookies</li>
                  <li>Block all cookies</li>
                  <li>Delete all cookies when you close your browser</li>
                </ul>
                <p>
                  Please note that blocking or deleting cookies may impact your experience on our website. Some features may not function properly without certain cookies.
                </p>

                <h3>Browser-Specific Instructions:</h3>
                <ul>
                  <li><strong>Chrome:</strong> Settings &gt; Privacy and Security &gt; Cookies and other site data</li>
                  <li><strong>Firefox:</strong> Options &gt; Privacy &amp; Security &gt; Cookies and Site Data</li>
                  <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Manage Website Data</li>
                  <li><strong>Edge:</strong> Settings &gt; Cookies and site permissions</li>
                </ul>

                <h2>6. Do Not Track</h2>
                <p>
                  Some browsers have a &quot;Do Not Track&quot; feature that signals to websites that you do not want to be tracked. Our website does not currently respond to Do Not Track signals.
                </p>

                <h2>7. Updates to This Policy</h2>
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our practices. We will post any changes on this page with an updated &quot;Last updated&quot; date.
                </p>

                <h2>8. Contact Us</h2>
                <p>
                  If you have any questions about our use of cookies, please contact us at:
                </p>
                <ul>
                  <li>Email: privacy@roamsim.com</li>
                  <li>Address: RoamSIM Inc., San Francisco, CA, USA</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
