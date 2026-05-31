import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const active = stored ? stored === 'dark' : prefersDark
    document.documentElement.classList.toggle('dark', active)
    setIsDark(active)
  }, [])

  const toggleTheme = () => {
    const next = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', next)
    window.localStorage.setItem('theme', next ? 'dark' : 'light')
    setIsDark(next)
  }

  return (
    <button type="button" onClick={toggleTheme} className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white/90 text-slate-700 shadow-sm shadow-slate-200/40 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:bg-slate-800">
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
