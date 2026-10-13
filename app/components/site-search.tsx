'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'

export type SearchEntry = { title: string; href: string }

export function SiteSearch({ entries }: { entries: SearchEntry[] }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [ready, setReady] = useState(false)
  const open = () => {
    dialog.current?.showModal()
    input.current?.focus()
  }
  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        if (dialog.current?.open) dialog.current.close()
        else open()
      }
    }
    window.addEventListener('keydown', shortcut)
    setReady(true)
    return () => window.removeEventListener('keydown', shortcut)
  }, [])
  const term = query.trim().toLocaleLowerCase()
  const results = term
    ? entries.filter((entry) => entry.title.toLocaleLowerCase().includes(term))
    : []
  return (
    <>
      <button
        ref={trigger}
        type="button"
        className="search-trigger"
        aria-label="搜索文章"
        disabled={!ready}
        onClick={open}
      >
        <Search size={16} aria-hidden="true" />
        <span>搜索…</span>
        <kbd>Ctrl / ⌘ K</kbd>
      </button>
      <dialog
        ref={dialog}
        className="search-dialog"
        aria-labelledby="search-title"
        onClose={() => trigger.current?.focus()}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.preventDefault()
            dialog.current?.close()
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            const rect = event.currentTarget.getBoundingClientRect()
            if (
              event.clientX < rect.left ||
              event.clientX > rect.right ||
              event.clientY < rect.top ||
              event.clientY > rect.bottom
            )
              dialog.current?.close()
          }
        }}
      >
        <div className="search-dialog-heading">
          <h2 id="search-title">搜索文章</h2>
          <button
            type="button"
            className="icon-button"
            aria-label="关闭搜索"
            onClick={() => dialog.current?.close()}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <label htmlFor="site-search" className="sr-only">
          文章标题
        </label>
        <input
          ref={input}
          id="site-search"
          type="search"
          placeholder="输入文章标题关键词"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <p className="search-hint" role="status">
          {!term
            ? '搜索技术文章、旅行与更新记录。'
            : results.length
              ? `找到 ${results.length} 篇内容`
              : '没有找到相关文章，请换一个关键词。'}
        </p>
        <ul className="search-results">
          {results.map((entry) => (
            <li key={entry.href}>
              <Link href={entry.href} onClick={() => dialog.current?.close()}>
                {entry.title}
              </Link>
            </li>
          ))}
        </ul>
      </dialog>
    </>
  )
}
