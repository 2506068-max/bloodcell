import { useEffect, useState } from 'react'
import { motion, useSpring, AnimatePresence } from 'framer-motion'

type MascotMood = 'idle' | 'happy' | 'sad' | 'celebrate'

type MascotProps = {
  section: string
  mood?: MascotMood
}

const sectionGuidance: Record<string, { title: string; description: string }> = {
  hero: {
    title: 'Hai, aku AI-cope!',
    description: 'Jelajahi anatomi kardiologis & hemodinamika medis presisi di bawah ini.'
  },
  organ: {
    title: 'Organ Tubuh',
    description: 'Amati pompa jantung, ventilasi pulmo, dan jejaring vaskular perifer.'
  },
  anatomy: {
    title: 'Anatomi Interaktif',
    description: 'Klik arteri atau organ untuk membaca parameter sirkulasi klinis.'
  },
  diagram: {
    title: 'Diagram Aliran Darah',
    description: 'Siklus sirkulasi darah besar (sistemik) & kecil (pulmonal).'
  },
  badges: {
    title: 'Pencapaian',
    description: 'Kumpulkan lencana eksplorasi medis seiring belajarmu!'
  },
  kuis: {
    title: 'Kuis Interaktif',
    description: 'Uji pemahaman biologis & diagnosis sistem kardiovaskularmu.'
  }
}

const heroFacts = [
  'Jantung manusia memompa ~5 liter darah per menit!',
  'Eritrosit bikonkaf fleksibel melewati kapiler sempit 5-8 μm.',
  'Dinding ventrikel kiri 3x lebih tebal dari ventrikel kanan.',
  'AI-cope mengamati jutaan sel darah dengan resolusi digital.'
]

function MicroscopeSVG({ hovered }: { hovered: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-10 h-10 sm:w-11 sm:h-11 filter drop-shadow-[0_4px_8px_rgba(6,182,212,0.4)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Metal Body Gradients */}
        <linearGradient id="scope-metal-arm" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="30%" stopColor="#94a3b8" />
          <stop offset="70%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="scope-base-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="50%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="scope-beam" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity={hovered ? 0.95 : 0.75} />
          <stop offset="50%" stopColor="#22d3ee" stopOpacity={hovered ? 0.65 : 0.4} />
          <stop offset="100%" stopColor="#a5f3fc" stopOpacity={0.1} />
        </linearGradient>
        <linearGradient id="scope-lens-glass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="60%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <radialGradient id="stage-cell-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f43f5e" stopOpacity="1" />
          <stop offset="60%" stopColor="#e11d48" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#be123c" stopOpacity="0" />
        </radialGradient>
        <filter id="ai-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" mode="over" />
        </filter>
      </defs>

      {/* Substage Illuminator Cone */}
      <polygon
        points="46,74 54,74 59,58 41,58"
        fill="url(#scope-beam)"
        className={hovered ? 'animate-pulse' : ''}
      />

      {/* Microscope Heavy Stable Base */}
      <path
        d="M 22 84 C 22 80, 78 80, 78 84 L 81 89 C 81 91, 19 91, 19 89 Z"
        fill="url(#scope-base-grad)"
        stroke="#0284c7"
        strokeWidth="0.8"
      />
      <path
        d="M 24 83 C 27 81.5, 73 81.5, 76 83"
        stroke="#94a3b8"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
      {/* AI Status Core Indicator on Base */}
      <circle cx="50" cy="86.5" r="2" fill="#06b6d4" filter="url(#ai-glow-sm)" />
      <circle cx="50" cy="86.5" r="1" fill="#ffffff" />

      {/* Substage Condenser & Light Housing */}
      <rect x="44" y="72" width="12" height="6" rx="1.5" fill="#334155" stroke="#64748b" strokeWidth="0.6" />
      <ellipse cx="50" cy="73" rx="4.5" ry="1.2" fill="#38bdf8" />

      {/* Stative / Curved Ergonomic Arm */}
      <path
        d="M 28 84 C 23 72, 23 46, 31 35 C 37 25, 48 21, 56 21 C 60 21, 62 24, 60 27 C 54 27, 43 30, 39 41 C 34 52, 35 73, 39 84 Z"
        fill="url(#scope-metal-arm)"
        stroke="#334155"
        strokeWidth="0.9"
      />
      <path
        d="M 29 76 C 26 63, 26 44, 34 35 C 38 30, 46 26, 53 25"
        stroke="#06b6d4"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Focus Adjustment Knobs */}
      <circle cx="33" cy="65" r="5" fill="#1e293b" stroke="#64748b" strokeWidth="0.8" />
      <circle cx="33" cy="65" r="3" fill="#334155" stroke="#38bdf8" strokeWidth="0.5" />

      {/* Mechanical Stage */}
      <rect x="35" y="59" width="8" height="4" rx="1" fill="#1e293b" />
      <path
        d="M 36 58 L 68 58 L 65 62 L 33 62 Z"
        fill="#0f172a"
        stroke="#475569"
        strokeWidth="0.6"
      />

      {/* Glass Specimen Slide & Sample */}
      <rect
        x="40"
        y="56.5"
        width="22"
        height="2"
        rx="0.5"
        fill="#e0f2fe"
        fillOpacity="0.9"
        stroke="#38bdf8"
        strokeWidth="0.5"
      />
      <ellipse cx="50" cy="57.5" rx="3.5" ry="1.2" fill="url(#stage-cell-glow)" />
      <circle cx="50" cy="57.5" r="1.1" fill="#e11d48" />

      {/* Revolving Nosepiece / Turret */}
      <ellipse cx="51" cy="35" rx="7" ry="3.5" fill="#1e293b" stroke="#64748b" strokeWidth="0.8" />
      <path d="M 45 35 L 40 44 L 43 45 L 48 36 Z" fill="#334155" stroke="#1e293b" strokeWidth="0.5" />
      <path d="M 56 35 L 62 42 L 60 43 L 54 36 Z" fill="#334155" stroke="#1e293b" strokeWidth="0.5" />

      {/* Active Objective Lens */}
      <path
        d="M 48 35 L 48 47 L 49 52 L 52 52 L 53 47 L 53 35 Z"
        fill="url(#scope-metal-arm)"
        stroke="#1e293b"
        strokeWidth="0.6"
      />
      <rect x="48" y="43" width="5" height="2" fill="#06b6d4" />

      {/* Optical Head & Eyepiece */}
      <path d="M 48 23 L 57 23 L 59 30 L 46 30 Z" fill="#1e293b" stroke="#475569" strokeWidth="0.6" />
      <path d="M 55 23 L 70 10 L 75 15 L 58 27 Z" fill="url(#scope-metal-arm)" stroke="#334155" strokeWidth="0.6" />
      <path d="M 69 9 L 74 5 L 78 9 L 74 14 Z" fill="#0f172a" stroke="#0284c7" strokeWidth="0.6" />
      <ellipse
        cx="75"
        cy="8"
        rx="3.2"
        ry="2.2"
        transform="rotate(-40 75 8)"
        fill="url(#scope-lens-glass)"
        filter="url(#ai-glow-sm)"
      />

      {/* AI Reticle Scan Crosshair */}
      <g opacity={hovered ? 0.95 : 0.75}>
        <circle cx="50" cy="57.5" r="4.5" stroke="#22d3ee" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
        <line x1="50" y1="51" x2="50" y2="54" stroke="#22d3ee" strokeWidth="0.6" />
        <line x1="50" y1="61" x2="50" y2="64" stroke="#22d3ee" strokeWidth="0.6" />
      </g>
    </svg>
  )
}

export default function Mascot({ section, mood = 'idle' }: MascotProps) {
  const [hovered, setHovered] = useState(false)
  const [factIndex, setFactIndex] = useState(0)
  const [isBubbleOpen, setIsBubbleOpen] = useState(true)

  const headX = useSpring(0, { stiffness: 140, damping: 18 })
  const headY = useSpring(0, { stiffness: 140, damping: 18 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = Math.max(-1, Math.min(1, (event.clientX / window.innerWidth - 0.5) * 2))
      const y = Math.max(-1, Math.min(1, (event.clientY / window.innerHeight - 0.5) * 2))

      headX.set(x * 4)
      headY.set(y * 3)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [headX, headY])

  useEffect(() => {
    if (section !== 'hero') return

    const heroTimer = window.setInterval(() => {
      setFactIndex((prev) => (prev + 1) % heroFacts.length)
    }, 7000)

    return () => window.clearInterval(heroTimer)
  }, [section])

  const guidance = sectionGuidance[section] ?? {
    title: 'AI-cope Siap',
    description: 'Lihat rekomendasi dan parameter hemodinamika sistem peredaran darah.'
  }

  const bubbleText = section === 'hero' && hovered ? heroFacts[factIndex] : guidance.description
  const feedbackText = mood === 'happy'
    ? 'Tepat! Diagnosis sel darahmu akurat.'
    : mood === 'sad'
      ? 'Fokuskan lensa, coba telaah lagi!'
      : mood === 'celebrate'
        ? 'Sempurna! Skor mikroskopik maksimal!'
        : ''

  const bubbleTitle = guidance.title
  const moodEmoji = mood === 'happy' ? '✨' : mood === 'sad' ? '💡' : mood === 'celebrate' ? '🎉' : '🔬'

  return (
    <div className="fixed right-3 bottom-24 z-50 flex max-w-[13.5rem] sm:max-w-[15rem] flex-col items-end gap-2 sm:right-6 sm:bottom-24">
      {/* Speech / Guidance Bubble (Compact & Dismissible) */}
      <AnimatePresence>
        {isBubbleOpen && (
          <motion.div
            className="pointer-events-auto relative w-full rounded-2xl border border-white/80 bg-white/95 p-3 text-xs shadow-xl shadow-slate-900/10 backdrop-blur-xl text-slate-900 dark:border-slate-800 dark:bg-slate-950/90 dark:text-slate-100"
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 8 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-ping shrink-0" />
                  <p className="font-bold text-xs truncate text-slate-900 dark:text-slate-100">{bubbleTitle}</p>
                </div>
                <p className="mt-1 leading-snug text-[11px] text-slate-600 dark:text-slate-300">
                  {feedbackText || bubbleText}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-600 text-xs text-white shadow-xs">
                  {moodEmoji}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsBubbleOpen(false)
                  }}
                  className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-0.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title="Tutup balon pesan"
                  aria-label="Tutup"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
            <span className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 rounded-xs bg-white/95 border-l border-t border-slate-200/80 dark:bg-slate-950/90 dark:border-slate-800" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI-cope Interactive Microscope Avatar (Compact Size) */}
      <motion.div
        className="relative flex items-center justify-center cursor-pointer select-none"
        style={{ x: headX, y: headY }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => {
          setIsBubbleOpen((prev) => !prev)
          setFactIndex((prev) => (prev + 1) % heroFacts.length)
        }}
        title="Klik untuk membuka/menutup panduan AI-cope"
      >
        {/* Subtle glow halo */}
        <motion.div
          className="absolute -inset-1.5 rounded-full bg-cyan-400/20 blur-md pointer-events-none"
          animate={{ opacity: hovered ? [0.3, 0.6, 0.3] : [0.15, 0.35, 0.15] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Podium Glassmorphic Circle (Compact 56px-64px) */}
        <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-slate-900/95 via-indigo-950/95 to-slate-950/95 border border-cyan-400/50 shadow-[0_8px_20px_rgba(6,182,212,0.3)] backdrop-blur-xl group overflow-visible transition-all duration-300 hover:border-cyan-300 hover:scale-105">
          {/* Microscope SVG */}
          <MicroscopeSVG hovered={hovered} />

          {/* Mini name badge */}
          <div className="absolute -bottom-1.5 px-1.5 py-0.2 rounded-full bg-slate-900/95 border border-cyan-400/70 shadow-xs flex items-center gap-1 text-[8px] font-extrabold tracking-wider text-cyan-300 uppercase">
            <span className="h-1 w-1 rounded-full bg-cyan-400 animate-pulse" />
            AI-cope
          </div>
        </div>
      </motion.div>
    </div>
  )
}
