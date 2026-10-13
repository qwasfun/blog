import './global.css'
import type { Metadata } from 'next'
import { SiteShell } from './components/site-shell'
import { getPostFiles } from './utils/utils'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { appFolders, baseUrl } from './config'
import { ReactNode } from 'react'
import Script from 'next/script'

const themeScript = `(()=>{try{const t=localStorage.getItem('qwas-theme');document.documentElement.classList.toggle('dark',t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches))}catch{document.documentElement.classList.toggle('dark',matchMedia('(prefers-color-scheme: dark)').matches)}})()`

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Qwas',
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
export default function RootLayout({ children }: { children: ReactNode }) {
  const entries = getPostFiles(appFolders).map((post) => ({
    title: post.metadata.title || post.slug,
    href: `/${post.folder}/${post.slug}`,
  }))

  return (
    <html lang="zh" suppressHydrationWarning>
      <Script
        defer
        src="https://um.qwas.fun/script.js"
        data-website-id="7c35ddc6-cc59-497e-be6a-5b2c0fea8937"
      />
      <body className="antialiased site-body">
        <Script id="qwas-theme" strategy="beforeInteractive">
          {themeScript}
        </Script>
        <SiteShell entries={entries}>{children}</SiteShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
