import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Header from '@/components/layout/Header'
import { ScrollProgressProvider } from '@/contexts/scroll-progress'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-geist',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Wei Xu — Product Designer & Creative Technologist',
  description:
    'Portfolio of Wei Xu — product designer and creative technologist crafting interfaces at the intersection of cultural memory and digital precision.',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: 'Wei Xu',
    description: 'Product Designer & Creative Technologist',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning>
        <ScrollProgressProvider>
          <Header />
          {children}
        </ScrollProgressProvider>
      </body>
    </html>
  )
}
