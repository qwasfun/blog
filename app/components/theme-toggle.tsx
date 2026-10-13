'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = () => {
      let preference: string | null = null
      try {
        preference = localStorage.getItem('qwas-theme')
      } catch {}
      document.documentElement.classList.toggle(
        'dark',
        preference === 'dark' || (preference !== 'light' && media.matches)
      )
    }
    sync()
    setReady(true)
    media.addEventListener('change', sync)
    window.addEventListener('storage', sync)
    return () => {
      media.removeEventListener('change', sync)
      window.removeEventListener('storage', sync)
    }
  }, [])
  return (
    <button
      type="button"
      className="icon-button"
      aria-label="切换明暗主题"
      title="切换明暗主题"
      disabled={!ready}
      onClick={() => {
        const dark = document.documentElement.classList.toggle('dark')
        try {
          localStorage.setItem('qwas-theme', dark ? 'dark' : 'light')
        } catch {}
      }}
    >
      <Moon size={18} className="theme-moon" aria-hidden="true" />
      <Sun size={18} className="theme-sun" aria-hidden="true" />
    </button>
  )
}
