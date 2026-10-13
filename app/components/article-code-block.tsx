'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

export function ArticleCodeBlock({
  children,
  language,
}: {
  children: ReactNode
  language: string
}) {
  const pre = useRef<HTMLPreElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle')
  const [ready, setReady] = useState(false)
  useEffect(() => {
    setReady(true)
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])
  async function copy() {
    if (timer.current) clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(pre.current?.textContent || '')
      setStatus('copied')
      timer.current = setTimeout(() => setStatus('idle'), 2000)
    } catch {
      setStatus('failed')
    }
  }
  return (
    <div className="article-code-block">
      <div className="article-code-toolbar">
        <span>{language}</span>
        <button
          type="button"
          disabled={!ready}
          onClick={copy}
          aria-label={`复制 ${language} 代码`}
        >
          {status === 'copied' ? '已复制' : '复制'}
        </button>
      </div>
      <pre ref={pre} tabIndex={0} aria-label={`${language} 代码`}>
        {children}
      </pre>
      <span
        role="status"
        className={status === 'failed' ? 'copy-error' : 'sr-only'}
      >
        {status === 'copied'
          ? '代码已复制'
          : status === 'failed'
            ? '复制失败，请选中代码手动复制。'
            : ''}
      </span>
    </div>
  )
}
