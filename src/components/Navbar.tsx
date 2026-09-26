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
          <a href="#hero" className="inline-flex items-center gap-3 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold shadow-sm shadow-slate-200/40 dark:bg-slate-900/90 dark:shadow-black/10">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-600 via-rose-700 to-rose-900 text-white shadow-md shadow-rose-900/25 ring-1 ring-white/20">
              <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
                {/* Aortic Arch with branches */}
                <path d="M 14 10 C 14 6 18 5 21 7 C 23 8.5 23 11 23 13" stroke="#FFE4E6" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M 17 6 L 16 4 M 19 6 L 19 4 M 21 7 L 22 5" stroke="#FFE4E6" strokeWidth="1.2" strokeLinecap="round" />
                {/* Anatomical Cardiac Body */}
                <path
                  d="M 11 12 
                     C 7 14 7 18 10 22 
                     C 13 26 16 28 17 28 
                     C 19 28 25 24 25 18 
                     C 25 14 22 12 18 13 
                     C 15 12 12 11 11 12 Z"
                  fill="#FFFFFF"
                />
                {/* Coronary Arterial Sulcus */}
                <path d="M 17 14 Q 18 20 20 27" stroke="#BE123C" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M 18 18 Q 22 20 23 22" stroke="#BE123C" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </span>
            <span className="hidden sm:inline font-bold text-slate-900 dark:text-white">BloodCell Edu</span>
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
