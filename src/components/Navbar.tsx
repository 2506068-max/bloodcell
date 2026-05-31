import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import DarkModeToggle from './DarkModeToggle'

const navLinks = [
  { label: 'Beranda', href: '#hero' },
  { label: 'Organ', href: '#organ' },
  { label: 'Diagram', href: '#diagram' },
  { label: 'Gangguan', href: '#penyakit' },
  { label: 'Kuis', href: '#kuis' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition duration-500 ${scrolled ? 'backdrop-blur-2xl bg-white/75 shadow-soft dark:bg-slate-950/80' : 'bg-transparent'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <a href="#hero" className="inline-flex items-center gap-3 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold shadow-sm shadow-slate-200/40 dark:bg-slate-900/90 dark:shadow-black/10">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white">❤️</span>
            <span className="hidden sm:inline">BloodCell Edu</span>
          </a>

          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <DarkModeToggle />
            <button type="button" className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/90 p-2 text-slate-700 shadow-sm shadow-slate-200/40 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:bg-slate-800 lg:hidden" onClick={() => setOpen((prev) => !prev)}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="lg:hidden border-t border-slate-200 bg-white/95 py-4 shadow-soft dark:border-slate-700 dark:bg-slate-950/95">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 sm:px-6 pb-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  )
}
