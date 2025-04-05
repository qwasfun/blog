'use client'

import './global.css'
import type { Metadata } from 'next'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './config'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Qwas Portfolio',
    template: '%s | Qwas',
  },
  openGraph: {
    title: 'Qwas',
    url: baseUrl,
    siteName: 'Qwas',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://qwas.fun',
    types: {
      'application/rss+xml': [{ url: '/rss.xml', title: 'rss' }],
    },
  },
}
const cx = (...classes: string[]) => classes.filter(Boolean).join(' ')

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  // 根据是否为“独立页面”，设置不同样式
  const isStandalonePage =
    pathname.startsWith('/excalidraw') && !pathname.startsWith('/excalidraws')

  const mainClass = cx(
    'flex-auto min-w-0 flex flex-col px-2 md:px-0',
    isStandalonePage ? '' : 'lg:mx-auto max-w-3xl' // 只在不是独立页时添加
  )

  return (
    <html
      lang="zh"
      className={cx('text-black bg-white dark:text-white dark:bg-black')}
    >
      <body className="antialiased mx-4">
        <Navbar />
        <main className={mainClass}>{children}</main>
        {!isStandalonePage && <Footer />}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
