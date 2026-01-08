import Link from 'next/link'
import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import {
  Smartphone,
  Check,
  X,
  AlertCircle,
  ArrowRight,
  HelpCircle,
} from 'lucide-react'

export const metadata = {
  title: 'Device Compatibility - RoamSIM',
  description: 'Check if your device is compatible with RoamSIM eSIM',
}

const appleDevices = [
  { name: 'iPhone 16 Pro Max', compatible: true },
  { name: 'iPhone 16 Pro', compatible: true },
  { name: 'iPhone 16 Plus', compatible: true },
  { name: 'iPhone 16', compatible: true },
  { name: 'iPhone 15 Pro Max', compatible: true },
  { name: 'iPhone 15 Pro', compatible: true },
  { name: 'iPhone 15 Plus', compatible: true },
  { name: 'iPhone 15', compatible: true },
  { name: 'iPhone 14 Pro Max', compatible: true },
  { name: 'iPhone 14 Pro', compatible: true },
  { name: 'iPhone 14 Plus', compatible: true },
  { name: 'iPhone 14', compatible: true },
  { name: 'iPhone SE (3rd gen)', compatible: true },
  { name: 'iPhone 13 series', compatible: true },
  { name: 'iPhone 12 series', compatible: true },
  { name: 'iPhone 11 series', compatible: true },
  { name: 'iPhone XS / XS Max', compatible: true },
  { name: 'iPhone XR', compatible: true },
  { name: 'iPhone X', compatible: false },
  { name: 'iPhone 8 and earlier', compatible: false },
  { name: 'iPad Pro (2018+)', compatible: true },
  { name: 'iPad Air (3rd gen+)', compatible: true },
  { name: 'iPad (7th gen+)', compatible: true },
  { name: 'iPad mini (5th gen+)', compatible: true },
]

const samsungDevices = [
  { name: 'Galaxy S24 series', compatible: true },
  { name: 'Galaxy S23 series', compatible: true },
  { name: 'Galaxy S22 series', compatible: true },
  { name: 'Galaxy S21 series', compatible: true },
  { name: 'Galaxy S20 series', compatible: true },
  { name: 'Galaxy Z Fold 5', compatible: true },
  { name: 'Galaxy Z Fold 4', compatible: true },
  { name: 'Galaxy Z Fold 3', compatible: true },
  { name: 'Galaxy Z Flip 5', compatible: true },
  { name: 'Galaxy Z Flip 4', compatible: true },
  { name: 'Galaxy Z Flip 3', compatible: true },
  { name: 'Galaxy Note 20 series', compatible: true },
  { name: 'Galaxy A54 5G', compatible: true },
  { name: 'Galaxy S10 and earlier', compatible: false },
]

const googleDevices = [
  { name: 'Pixel 9 series', compatible: true },
  { name: 'Pixel 8 series', compatible: true },
  { name: 'Pixel 7 series', compatible: true },
  { name: 'Pixel 6 series', compatible: true },
  { name: 'Pixel 5 series', compatible: true },
  { name: 'Pixel 4 series', compatible: true },
  { name: 'Pixel 3 / 3 XL', compatible: true },
  { name: 'Pixel 3a / 3a XL', compatible: true },
  { name: 'Pixel 2 and earlier', compatible: false },
]

const otherDevices = [
  { name: 'OnePlus 12', compatible: true },
  { name: 'OnePlus 11', compatible: true },
  { name: 'Motorola Razr (2023)', compatible: true },
  { name: 'Motorola Edge series', compatible: true },
  { name: 'Xiaomi 14 series', compatible: true },
  { name: 'Xiaomi 13 series', compatible: true },
  { name: 'OPPO Find X series', compatible: true },
  { name: 'Surface Pro X', compatible: true },
  { name: 'Surface Duo 2', compatible: true },
]

export default function CompatibilityPage() {
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
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Device Compatibility
              </h1>
              <p className="text-xl text-slate-400 mb-8">
                Check if your device supports eSIM technology. Your device must be
                eSIM-enabled and carrier-unlocked to use RoamSIM.
              </p>
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="glass p-6 border-l-4 border-[#00f0ff]">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-[#00f0ff] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Important Requirements</h3>
                    <ul className="text-slate-400 space-y-1">
                      <li>• Your device must be <strong className="text-white">carrier-unlocked</strong> (not tied to a specific carrier)</li>
                      <li>• Devices purchased directly from manufacturers are usually unlocked</li>
                      <li>• Carrier-purchased devices may need to be unlocked first</li>
                      <li>• Some carriers in certain regions may have eSIM restrictions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Check */}
        <section className="py-12 border-b border-white/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">How to Check Your Device</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <span className="text-2xl">🍎</span> iPhone / iPad
                  </h3>
                  <ol className="space-y-3 text-slate-400">
                    <li className="flex gap-2">
                      <span className="text-[#00f0ff]">1.</span>
                      Go to Settings &gt; General &gt; About
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#00f0ff]">2.</span>
                      Scroll down to find &quot;EID&quot;
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#00f0ff]">3.</span>
                      If you see an EID number, your device supports eSIM
                    </li>
                  </ol>
                </div>
                <div className="glass p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <span className="text-2xl">🤖</span> Android
                  </h3>
                  <ol className="space-y-3 text-slate-400">
                    <li className="flex gap-2">
                      <span className="text-[#00f0ff]">1.</span>
                      Go to Settings &gt; About Phone
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#00f0ff]">2.</span>
                      Look for &quot;SIM Status&quot; or &quot;EID&quot;
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#00f0ff]">3.</span>
                      Or dial *#06# to see EID info
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Device Lists */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Apple */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-3xl">🍎</span> Apple Devices
                </h2>
                <div className="glass p-6">
                  <div className="grid md:grid-cols-2 gap-3">
                    {appleDevices.map((device, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          device.compatible ? 'bg-green-500/10' : 'bg-red-500/10'
                        }`}
                      >
                        <span className="text-slate-300">{device.name}</span>
                        {device.compatible ? (
                          <Check className="w-5 h-5 text-green-400" />
                        ) : (
                          <X className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Samsung */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-3xl">📱</span> Samsung Devices
                </h2>
                <div className="glass p-6">
                  <div className="grid md:grid-cols-2 gap-3">
                    {samsungDevices.map((device, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          device.compatible ? 'bg-green-500/10' : 'bg-red-500/10'
                        }`}
                      >
                        <span className="text-slate-300">{device.name}</span>
                        {device.compatible ? (
                          <Check className="w-5 h-5 text-green-400" />
                        ) : (
                          <X className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Google */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-3xl">🔵</span> Google Pixel
                </h2>
                <div className="glass p-6">
                  <div className="grid md:grid-cols-2 gap-3">
                    {googleDevices.map((device, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          device.compatible ? 'bg-green-500/10' : 'bg-red-500/10'
                        }`}
                      >
                        <span className="text-slate-300">{device.name}</span>
                        {device.compatible ? (
                          <Check className="w-5 h-5 text-green-400" />
                        ) : (
                          <X className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Other */}
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-3xl">📲</span> Other Devices
                </h2>
                <div className="glass p-6">
                  <div className="grid md:grid-cols-2 gap-3">
                    {otherDevices.map((device, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          device.compatible ? 'bg-green-500/10' : 'bg-red-500/10'
                        }`}
                      >
                        <span className="text-slate-300">{device.name}</span>
                        {device.compatible ? (
                          <Check className="w-5 h-5 text-green-400" />
                        ) : (
                          <X className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto glass p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Device Compatible?</h2>
              <p className="text-slate-400 mb-8">
                Great! Browse our destinations and get your eSIM today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/destinations" className="btn-primary">
                  Browse Destinations
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/support" className="btn-secondary">
                  <HelpCircle className="w-5 h-5" />
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
