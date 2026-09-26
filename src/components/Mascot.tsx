import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

type MascotMood = 'idle' | 'happy' | 'sad' | 'celebrate'

type MascotProps = {
  section: string
  mood?: MascotMood
}

const sectionGuidance: Record<string, { title: string; description: string }> = {
  hero: {
    title: 'Hai, aku AI-cope!',
    description: 'Scroll ke bawah dan temukan rahasia sistem peredaran darah dengan visual anatomi medis presisi.'
  },
  organ: {
    title: 'Organ Tubuh',
    description: 'Organ-organ ini bekerja sama menjaga darah tetap teroksigenasi dan terdistribusi sempurna ke seluruh tubuh.'
  },
  anatomy: {
    title: 'Anatomi Interaktif',
    description: 'Sentuh organ untuk mengamati struktur mikroskopis dan sirkulasi hemodinamika tubuh manusia.'
  },
  diagram: {
    title: 'Diagram Aliran Darah',
    description: 'Lihat siklus sirkulasi darah sistemik dan pulmonal dengan detail kapiler dan katup.'
  },
  badges: {
    title: 'Pencapaian',
    description: 'Kumpulkan lencana eksplorasi medis seiring kamu menyelesaikan materi pembelajaran!'
  },
  kuis: {
    title: 'Kuis Interaktif',
    description: 'Uji pemahaman biologis dan diagnosis klinis sistem kardiovaskularmu di sini.'
  }
}

const heroFacts = [
  'Jantung manusia memompa sekitar 5 liter darah setiap menit!',
  'Eritrosit berbentuk cakram bikonkaf fleksibel agar dapat melewati kapiler sempit.',
  'AI-cope mengamati jutaan sel darah dengan resolusi mikroskopis digital.',
  'Dinding ventrikel kiri 3x lebih tebal untuk memompa darah ke seluruh tubuh!'
]

function MicroscopeSVG({ hovered }: { hovered: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-20 h-20 filter drop-shadow-[0_6px_14px_rgba(6,182,212,0.45)]"
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
        <filter id="ai-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" mode="over" />
        </filter>
      </defs>

      {/* Substage Illuminator Cone (Transmitted Light Beam through Specimen) */}
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
      {/* Base metallic bevel highlight */}
      <path
        d="M 24 83 C 27 81.5, 73 81.5, 76 83"
        stroke="#94a3b8"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
      {/* AI Status Core Indicator on Base */}
      <circle cx="50" cy="86.5" r="2.2" fill="#06b6d4" filter="url(#ai-glow)" />
      <circle cx="50" cy="86.5" r="1.1" fill="#ffffff" />

      {/* Substage Condenser & Light Source Housing */}
      <rect x="44" y="72" width="12" height="6" rx="1.5" fill="#334155" stroke="#64748b" strokeWidth="0.6" />
      <ellipse cx="50" cy="73" rx="4.5" ry="1.2" fill="#38bdf8" />

      {/* Stative / Curved Ergonomic Arm (Struktur Lengkung Kokoh) */}
      <path
        d="M 28 84 C 23 72, 23 46, 31 35 C 37 25, 48 21, 56 21 C 60 21, 62 24, 60 27 C 54 27, 43 30, 39 41 C 34 52, 35 73, 39 84 Z"
        fill="url(#scope-metal-arm)"
        stroke="#334155"
        strokeWidth="0.9"
      />
      {/* AI Cyan Contour Racing Line on Arm */}
      <path
        d="M 29 76 C 26 63, 26 44, 34 35 C 38 30, 46 26, 53 25"
        stroke="#06b6d4"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* Coarse & Fine Focus Adjustment Knobs (Makrometer & Mikrometer) */}
      <circle cx="33" cy="65" r="5.5" fill="#1e293b" stroke="#64748b" strokeWidth="0.8" />
      <circle cx="33" cy="65" r="3.5" fill="#334155" stroke="#38bdf8" strokeWidth="0.5" />
      <circle cx="33" cy="65" r="1.5" fill="#94a3b8" />

      {/* Mechanical Stage (Meja Preparat) */}
      <rect x="35" y="59" width="8" height="4" rx="1" fill="#1e293b" />
      <path
        d="M 36 58 L 68 58 L 65 62 L 33 62 Z"
        fill="#0f172a"
        stroke="#475569"
        strokeWidth="0.6"
      />

      {/* Glass Specimen Slide */}
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
      {/* Blood Cell Sample on Slide */}
      <ellipse cx="50" cy="57.5" rx="3.5" ry="1.2" fill="url(#stage-cell-glow)" />
      <circle cx="50" cy="57.5" r="1.2" fill="#e11d48" />

      {/* Slide Clips */}
      <path d="M 41 56.5 L 43 55.5 L 46 56.5" stroke="#cbd5e1" strokeWidth="0.6" fill="none" />
      <path d="M 61 56.5 L 59 55.5 L 56 56.5" stroke="#cbd5e1" strokeWidth="0.6" fill="none" />

      {/* Revolving Nosepiece / Turret (Revolver) */}
      <ellipse cx="51" cy="35" rx="7" ry="3.5" fill="#1e293b" stroke="#64748b" strokeWidth="0.8" />
      <ellipse cx="51" cy="34" rx="5.2" ry="2.2" fill="#475569" />

      {/* Inactive Objective Lenses (Angled) */}
      <path d="M 45 35 L 40 44 L 43 45 L 48 36 Z" fill="#334155" stroke="#1e293b" strokeWidth="0.5" />
      <path d="M 56 35 L 62 42 L 60 43 L 54 36 Z" fill="#334155" stroke="#1e293b" strokeWidth="0.5" />

      {/* Active Objective Lens (Center, Vertical to Slide) */}
      <path
        d="M 48 35 L 48 47 L 49 52 L 52 52 L 53 47 L 53 35 Z"
        fill="url(#scope-metal-arm)"
        stroke="#1e293b"
        strokeWidth="0.6"
      />
      {/* 40x Cyan Magnification Ring */}
      <rect x="48" y="43" width="5" height="2" fill="#06b6d4" />
      <rect x="49" y="51" width="3" height="1.2" fill="#f8fafc" />

      {/* Optical Head & Inclined Eyepiece Tube (Tabung Okuler) */}
      <path
        d="M 48 23 L 57 23 L 59 30 L 46 30 Z"
        fill="#1e293b"
        stroke="#475569"
        strokeWidth="0.6"
      />
      {/* Ocular tube inclined ~40 deg */}
      <path
        d="M 55 23 L 70 10 L 75 15 L 58 27 Z"
        fill="url(#scope-metal-arm)"
        stroke="#334155"
        strokeWidth="0.6"
      />
      {/* Eyepiece Rubber/Metal Ring */}
      <path
        d="M 69 9 L 74 5 L 78 9 L 74 14 Z"
        fill="#0f172a"
        stroke="#0284c7"
        strokeWidth="0.6"
      />
      {/* Ocular Lens Glass (Glowing Cyan Lens Pupil) */}
      <ellipse
        cx="75"
        cy="8"
        rx="3.2"
        ry="2.2"
        transform="rotate(-40 75 8)"
        fill="url(#scope-lens-glass)"
        filter="url(#ai-glow)"
      />
      <ellipse
        cx="75.5"
        cy="7.5"
        rx="1.4"
        ry="0.9"
        transform="rotate(-40 75.5 7.5)"
        fill="#ffffff"
      />

      {/* AI Reticle Scan Crosshair on Specimen */}
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

  const headX = useSpring(0, { stiffness: 140, damping: 18 })
  const headY = useSpring(0, { stiffness: 140, damping: 18 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = Math.max(-1, Math.min(1, (event.clientX / window.innerWidth - 0.5) * 2))
      const y = Math.max(-1, Math.min(1, (event.clientY / window.innerHeight - 0.5) * 2))

      headX.set(x * 6)
      headY.set(y * 4)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [headX, headY])

  useEffect(() => {
    if (section !== 'hero') return

    const heroTimer = window.setInterval(() => {
      setFactIndex((prev) => (prev + 1) % heroFacts.length)
    }, 6000)

    return () => window.clearInterval(heroTimer)
  }, [section])

  const guidance = sectionGuidance[section] ?? {
    title: 'Selamat datang!',
    description: 'Ayo jelajahi area pembelajaran dan lihat saran dari AI-cope si asisten mikroskop cerdas.'
  }

  const bubbleText = section === 'hero' && hovered ? heroFacts[factIndex] : guidance.description
  const feedbackText = mood === 'happy'
    ? 'Betul! Analisis sel darahmu tepat sekali.'
    : mood === 'sad'
      ? 'Fokus kembali lensamu, coba lagi pasti bisa!'
      : mood === 'celebrate'
        ? 'Luar biasa! Skor analisis mikroskopikmu sempurna!'
        : ''

  const bubbleTitle = guidance.title
  const moodEmoji = mood === 'happy' ? '✨' : mood === 'sad' ? '💡' : mood === 'celebrate' ? '🎉' : '🔬'

  return (
    <motion.div
      className="fixed right-4 bottom-20 z-50 flex max-w-[18rem] flex-col items-end gap-3 sm:right-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      layout
    >
      {/* Speech / Guidance Bubble */}
      <motion.div
        className="pointer-events-auto relative w-full rounded-[1.75rem] border border-white/80 bg-white/95 px-4 py-3 text-sm shadow-2xl shadow-slate-900/10 backdrop-blur-xl text-slate-900 dark:border-slate-700 dark:bg-slate-950/90 dark:text-slate-100"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-cyan-500 animate-ping" />
              <p className="font-bold text-slate-900 dark:text-slate-100">{bubbleTitle}</p>
            </div>
            <p className="mt-2 leading-6 text-[0.92rem] text-slate-700 dark:text-slate-300">
              {feedbackText || bubbleText}
            </p>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-sky-600 to-indigo-600 text-lg text-white shadow-soft">
            {moodEmoji}
          </div>
        </div>
        <span className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 rounded-sm bg-white/95 border-l border-t border-slate-200/80 dark:bg-slate-950/90 dark:border-slate-700" />
      </motion.div>

      {/* AI-cope Interactive Microscope Avatar */}
      <motion.div
        className="relative flex items-center justify-center cursor-pointer select-none"
        style={{ x: headX, y: headY }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setFactIndex((prev) => (prev + 1) % heroFacts.length)}
      >
        {/* Glow halo */}
        <motion.div
          className="absolute -inset-2 rounded-full bg-cyan-400/25 blur-xl pointer-events-none"
          animate={{ opacity: hovered ? [0.4, 0.8, 0.4] : [0.25, 0.5, 0.25] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Podium Glassmorphic Circle */}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-slate-900/95 via-indigo-950/95 to-slate-950/95 border-2 border-cyan-400/50 shadow-[0_15px_35px_rgba(6,182,212,0.35)] backdrop-blur-xl group overflow-visible transition-all duration-300 hover:border-cyan-300 hover:shadow-[0_20px_45px_rgba(6,182,212,0.5)]">
          {/* Microscope SVG */}
          <MicroscopeSVG hovered={hovered} />

          {/* Mini name badge */}
          <div className="absolute -bottom-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/95 border border-cyan-400/70 shadow-lg flex items-center gap-1.5 text-[10px] font-extrabold tracking-wider text-cyan-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            AI-cope
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
