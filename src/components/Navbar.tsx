import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { label: 'Beranda', path: '/' },
  { label: 'Pengertian', path: '/pengertian' },
  { label: 'Organ', path: '/organ' },
  { label: 'Jenis Peredaran', path: '/jenis' },
  { label: 'Gangguan & Penyakit', path: '/gangguan' },
  { label: 'Galeri', path: '/galeri' },
  { label: 'Kuis', path: '/kuis' },
  { label: 'Tentang', path: '/tentang' },
]

export default function Navbar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-lg bg-white/80 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-4xl"
            >
              ❤️
            </motion.div>
            <div className="font-display text-xl font-bold text-gradient hidden sm:block">
              BloodCell Edu
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative group"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    location.pathname === link.path
                      ? 'text-primary font-bold'
                      : 'text-text-muted hover:text-text-dark'
                  }`}
                >
                  {link.label}
                </motion.div>
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-1 gradient-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-text-dark p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden pb-4 border-t border-primary/20"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg font-medium transition-all ${
                  location.pathname === link.path
                    ? 'text-primary bg-primary/10 font-bold'
                    : 'text-text-muted hover:text-text-dark'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  )
}
