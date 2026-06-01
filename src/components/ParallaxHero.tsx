import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MousePosition {
  x: number
  y: number
}

export default function ParallaxHero() {
  const [offset, setOffset] = useState<MousePosition>({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height

      setOffset({ x: x * 20, y: y * 16 })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-[420px] overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#FFF5F8] via-[#FCF8FF] to-[#E8FDFF] shadow-[0_40px_90px_-45px_rgba(15,23,42,0.35)]"
    >
      <motion.div
        className="absolute left-10 top-10 h-24 w-24 rounded-full bg-[#FF4D6D]/20 blur-3xl"
        animate={{ x: [0, 8, 0], y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute right-10 top-24 h-20 w-20 rounded-full bg-[#4ECDC4]/20 blur-3xl"
        animate={{ x: [0, -8, 0], y: [0, 8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />

      <motion.div
        className="absolute left-16 bottom-16 h-24 w-24 rounded-full bg-[#BDB2FF]/20 blur-3xl"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
      />

      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,_rgba(255,77,109,0.16),_transparent_18%),radial-gradient(circle_at_80%_25%,_rgba(78,205,196,0.12),_transparent_18%),radial-gradient(circle_at_50%_75%,_rgba(189,178,255,0.1),_transparent_20%)]"
        animate={{ x: offset.x * 0.02, y: offset.y * 0.02 }}
      />

      <motion.div
        className="absolute inset-0"
        animate={{ x: offset.x * 0.03, y: offset.y * 0.03 }}
      >
        {[...Array(5)].map((_, index) => (
          <motion.span
            key={index}
            className="absolute block rounded-full bg-white/70 shadow-soft"
            style={{
              width: `${10 + index * 4}px`,
              height: `${10 + index * 4}px`,
              left: `${8 + index * 16}%`,
              top: `${12 + index * 12}%`,
            }}
            animate={{ opacity: [0.3, 0.85, 0.3], y: [0, -6, 0] }}
            transition={{ duration: 5 + index * 0.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <motion.div
          className="relative flex h-full w-full max-w-[340px] flex-col items-center justify-center"
          style={{ x: offset.x * 0.12, y: offset.y * 0.12 }}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="relative flex h-80 w-80 items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-[#FF4D6D] via-[#FF8FA3] to-[#4ECDC4] shadow-[0_24px_80px_-32px_rgba(255,77,109,0.65)]"
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              className="absolute h-64 w-64 rounded-[2rem] bg-gradient-to-br from-[#ffffffcc] via-[#ffe5eecc] to-[#d9f9ffcc] shadow-inner"
              animate={{ scale: [0.98, 1.02, 0.98] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="absolute inset-8 rounded-[1.75rem] bg-[#ffffffee] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5)]"
              animate={{ opacity: [0.92, 1, 0.94] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="relative flex h-full w-full items-center justify-center"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="absolute inset-x-12 top-10 h-24 rounded-[1.5rem] bg-gradient-to-br from-[#FF4D6D] to-[#FF9AA8] opacity-90" />
              <div className="absolute left-14 top-20 h-16 w-16 rounded-full bg-white/80 shadow-soft" />
              <div className="absolute right-14 top-24 h-14 w-14 rounded-full bg-[#4ECDC4]/80 shadow-soft" />
              <div className="absolute top-32 h-20 w-20 rounded-full bg-[#BDB2FF]/80 shadow-soft" />
              <div className="absolute bottom-14 h-24 w-24 rounded-full bg-[#ffffffee] shadow-[0_0_0_24px_rgba(255,255,255,0.18)]" />
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-6 left-4 flex items-center gap-2 rounded-full border border-white/60 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-900 shadow-soft backdrop-blur-xl"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="h-2 w-2 rounded-full bg-[#FF4D6D]" />
            Heartbeat active
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute right-6 top-14 flex h-16 w-16 items-center justify-center rounded-full bg-white/75 text-2xl shadow-soft"
        animate={{ y: [0, 6, 0], x: [0, -6, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        🧬
      </motion.div>

      <motion.div
        className="pointer-events-none absolute left-6 bottom-16 flex h-14 w-14 items-center justify-center rounded-full bg-white/75 text-xl shadow-soft"
        animate={{ y: [0, -8, 0], x: [0, 6, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      >
        🩺
      </motion.div>
    </div>
  )
}
