'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Navbar } from './nav'
import Footer from './footer'
import { SearchEntry } from './site-search'

export function SiteShell({
  children,
  entries,
}: {
  children: ReactNode
  entries: SearchEntry[]
}) {
  const pathname = usePathname()
  const standalone =
    pathname.startsWith('/excalidraw') && !pathname.startsWith('/excalidraws')
  const designed =
    pathname === '/' ||
    ['/blog', '/travel', '/changelog'].some(
      (route) => pathname === route || pathname.startsWith(route + '/')
    ) ||
    pathname === '/reader' ||
    pathname === '/excalidraws'
  return (
    <>
      <a href="#main-content" className="skip-link">
        跳到正文
      </a>
      <Navbar entries={entries} />
      <main
        id="main-content"
        className={
          standalone
            ? 'flex-auto min-w-0'
            : designed
              ? 'site-container editorial-main'
              : 'legacy-main flex-auto min-w-0 flex flex-col pt-6 px-2 md:px-0 md:mx-auto max-w-2xl'
        }
      >
        {children}
      </main>
      {!standalone && <Footer />}
    </>
  )
}
