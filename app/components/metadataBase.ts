import { baseUrl } from 'app/config'
import type { Metadata } from 'next'

export const metadataBase: Metadata = {
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
