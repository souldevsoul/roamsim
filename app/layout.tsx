import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Providers } from '@/components/providers/Providers'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'RoamSIM - Global eSIM Data Plans | Stay Connected Anywhere',
  description:
    'Get instant mobile data in 190+ countries. No physical SIM, no roaming fees. Premium eSIM plans with seamless activation.',
  keywords: ['eSIM', 'travel data', 'international roaming', 'mobile data', 'global connectivity'],
  openGraph: {
    title: 'RoamSIM - Global eSIM Data Plans',
    description: 'Instant mobile data in 190+ countries. No physical SIM needed.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
