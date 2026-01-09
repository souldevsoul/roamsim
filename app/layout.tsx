import type { Metadata } from 'next'
import { Geist_Mono } from 'next/font/google'
import { Providers } from '@/components/providers/Providers'
import './globals.css'

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;600;700&family=Google+Sans+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistMono.variable} antialiased font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
