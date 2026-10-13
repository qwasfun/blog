'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { SiteSearch, SearchEntry } from './site-search'

const primaryLinks = [
  ['/', '首页'],
  ['/blog', '文章'],
  ['/travel', '旅行'],
  ['/reader', '阅读'],
]
const toolLinks = [
  ['/excalidraws', 'Excalidraw'],
  ['/settings', '设置'],
  ['/changelog', '更新记录'],
]

export function Navbar({ entries }: { entries: SearchEntry[] }) {
  const pathname = usePathname()
  const tools = useRef<HTMLDetailsElement>(null)
  const active = (path: string) =>
    path === '/'
      ? pathname === path
      : pathname === path || pathname.startsWith(path + '/')
  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <Link href="/" className="site-wordmark" aria-label="Qwas 首页">
          Qwas
        </Link>
        <nav id="nav" className="primary-nav" aria-label="主导航">
          {primaryLinks.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={active(href) ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
          <details
            className="tools-menu"
            ref={tools}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node))
                event.currentTarget.open = false
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                event.currentTarget.open = false
                event.currentTarget.querySelector('summary')?.focus()
              }
            }}
          >
            <summary
              className={
                toolLinks.some(([href]) => active(href))
                  ? 'tools-active'
                  : undefined
              }
            >
              工具
              <ChevronDown size={13} aria-hidden="true" />
            </summary>
            <div className="tools-links">
              {toolLinks.map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={active(href) ? 'page' : undefined}
                  onClick={() => {
                    if (tools.current) tools.current.open = false
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </details>
        </nav>
        <div className="header-controls">
          <SiteSearch entries={entries} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
