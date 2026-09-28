import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

interface BloodParticle {
  id: string
  type: 'oxygenated' | 'deoxygenated'
  path: string
  duration: number
  delay: number
}

interface PopupDetail {
  title: string
  subtitle: string
  description: string
  role: string
  oxygenStatus: 'oxygenated' | 'deoxygenated' | 'mixed'
}

// Particle paths scaled to match the SVG geometry
const bloodParticles: BloodParticle[] = [
  // 1. Pulmonary Loop (RV -> A. Pulmonalis -> Lungs -> V. Pulmonalis -> LA)
  {
    id: 'pulm-1',
    type: 'deoxygenated',
    path: 'M 405 270 C 400 230 405 180 420 100 C 370 70 330 110 380 140 C 420 150 460 140 480 140 C 510 170 510 220 465 270',
    duration: 5.5,
    delay: 0,
  },
  {
    id: 'pulm-2',
    type: 'deoxygenated',
    path: 'M 405 270 C 400 230 405 180 420 100 C 370 70 330 110 380 140 C 420 150 460 140 480 140 C 510 170 510 220 465 270',
    duration: 5.5,
    delay: 2.7,
  },
  // 2. Systemic Loop (LV -> Aorta -> Body Tissues -> Vena Cava -> RA)
  {
    id: 'sys-1',
    type: 'oxygenated',
    path: 'M 465 300 C 475 250 510 230 550 240 L 550 480 C 550 540 490 555 440 555 C 390 555 330 540 330 480 L 330 250 C 330 230 365 250 390 270',
    duration: 7,
    delay: 1,
  },
  {
    id: 'sys-2',
    type: 'oxygenated',
    path: 'M 465 300 C 475 250 510 230 550 240 L 550 480 C 550 540 490 555 440 555 C 390 555 330 540 330 480 L 330 250 C 330 230 365 250 390 270',
    duration: 7,
    delay: 4.5,
  },
]

const heartbeatSteps = [
  {
    number: 1,
    title: 'Darah Masuk via Vena Kava',
    description: 'Darah dari seluruh tubuh yang kaya CO₂ (jalur biru di sisi kiri) kembali melalui Vena Kava Superior dan Inferior menuju Atrium Dextrum (RA).',
    color: '#0284C7',
  },
  {
    number: 2,
    title: 'Pengisian Ventriculus Dexter',
    description: 'Atrium Dextrum berkontraksi, mendorong darah menembus Katup Trikuspid mengikuti panah putih internal ke Ventriculus Dexter (RV).',
    color: '#0369A1',
  },
  {
    number: 3,
    title: 'Loop Pulmonal: Naik ke Paru-Paru',
    description: 'Ventriculus Dexter berkontraksi, memompa darah ke atas melalui Arteri Pulmonalis menuju anyaman kapiler alveoli kedua paru.',
    color: '#0284C7',
  },
  {
    number: 4,
    title: 'Pertukaran Gas Alveolus',
    description: 'Di anyaman kapiler alveoli (atas), CO₂ dilepas ke udara dan O₂ diserap hemoglobin. Darah bertransisi dari biru menjadi merah cerah.',
    color: '#E11D48',
  },
  {
    number: 5,
    title: 'Kembali via Vena Pulmonalis',
    description: 'Darah teroksigenasi mengalir turun melalui Vena Pulmonalis membentuk loop tertutup atas dan memasuki Atrium Sinistrum (LA).',
    color: '#BE123C',
  },
  {
    number: 6,
    title: 'Pengisian Ventriculus Sinister',
    description: 'Atrium Sinistrum berkontraksi, mendorong darah melalui Katup Mitral (Bikuspid) mengisi rongga tebal Ventriculus Sinister (LV).',
    color: '#E11D48',
  },
  {
    number: 7,
    title: 'Loop Sistemik: Ejeksi ke Aorta',
    description: 'Ventriculus Sinister berkontraksi kuat, memompa darah ke Arkus Aorta lalu turun kontinu di sisi kanan sebagai Aorta Descendens.',
    color: '#9F1239',
  },
  {
    number: 8,
    title: 'Respirasi di Seluruh Tubuh',
    description: 'Di anyaman kapiler mikrosirkulasi sistemik (bawah), O₂ diserahkan ke sel-sel tubuh dan CO₂ diserap untuk kembali ke Vena Kava.',
    color: '#0284C7',
  },
]

export default function CirculatoryAnimation() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [popup, setPopup] = useState<PopupDetail | null>(null)
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!isPlaying) return

    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % heartbeatSteps.length)
    }, 2400)

    return () => clearInterval(stepInterval)
  }, [isPlaying])

  const handleReset = () => {
    setActiveStep(0)
    setIsPlaying(true)
  }

  const showPopup = (detail: PopupDetail) => {
    setPopup(detail)
  }

  const tooltips: Record<string, string> = {
    heart: 'Cor Humanum: Jantung 4 ruang dengan sirkulasi ganda (Loop Pulmonal di atas & Loop Sistemik di bawah).',
    'pulmo-dexter': 'Pulmo Dexter: Paru-paru kanan dengan 3 lobus tempat pertukaran gas hematik alveoli.',
    'pulmo-sinister': 'Pulmo Sinister: Paru-paru kiri dengan 2 lobus dan Incisura Cardiaca.',
    'capillary-pulmonary': 'Anyaman Kapiler Alveoli: Tempat pertukaran gas O₂ dan CO₂ di paru-paru.',
    'capillary-systemic': 'Anyaman Kapiler Sistemik: Mikrosirkulasi tempat sel tubuh menyerap O₂ dan melepas CO₂.',
    'vena-cava': 'Vena Kava: Jalur vena biru kontinu di sisi kiri dari tubuh menuju jantung.',
    aorta: 'Aorta: Jalur arteri merah kontinu di sisi kanan dari jantung menuju tubuh.',
    'arteri-pulmonalis': 'Arteri Pulmonalis: Membawa darah kaya CO₂ dari bilik kanan naik ke paru-paru.',
    'vena-pulmonalis': 'Vena Pulmonalis: Membawa darah kaya O₂ dari paru-paru turun ke serambi kiri.',
  }

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-slate-50 via-rose-50/20 to-sky-50/30 py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100/90 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
            Model Loop Tertutup Fisiologis (Closed-Loop Figure-8)
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Sirkulasi Darah Ganda (Cor Humanum • Pulmones • Jaringan)
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Format alur loop kontinu dari sumber referensi medis: <strong className="text-sky-700 font-semibold">Jalur Vena Biru (Kiri)</strong> dan{' '}
            <strong className="text-rose-700 font-semibold">Jalur Arteri Merah (Kanan)</strong> tanpa celah terputus, dilengkapi anyaman kapiler mikrovaskular dan panah intrakardial.
          </p>
        </motion.div>

        {/* Playback Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-xs ${
                isPlaying
                  ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-rose-200'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200'
              }`}
            >
              <span>{isPlaying ? '⏸ Jeda Siklus' : '▶ Lanjutkan Siklus'}</span>
            </button>
            <button
              onClick={handleReset}
              className="px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              ↺ Reset Tahap 1
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100/90 border border-slate-200/70 text-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <span>Fase Aktif: <strong className="text-rose-700 font-bold">Tahap {activeStep + 1} dari 8</strong> — {heartbeatSteps[activeStep].title}</span>
          </div>
        </div>

        {/* Main Anatomical Canvas Container */}
        <div className="relative bg-white/95 backdrop-blur-xl rounded-[2.5rem] border border-white/90 shadow-[0_25px_70px_-15px_rgba(15,23,42,0.08)] p-3 sm:p-6 lg:p-8 mb-6 overflow-hidden">
          <div className="flex sm:hidden items-center justify-center gap-1.5 text-[11px] font-medium text-slate-500 bg-slate-100/90 rounded-full py-1 px-3 mb-2 mx-auto w-fit">
            <span>⇄</span> Geser horizontal jika layar menyempit
          </div>

          <div className="w-full overflow-x-auto pb-2 flex justify-center">
            <svg
              ref={svgRef}
              viewBox="0 0 880 630"
              className="w-full min-w-[760px] max-w-4xl max-h-[630px] mx-auto select-none"
              style={{ filter: 'drop-shadow(0 15px 35px rgba(15,23,42,0.06))' }}
            >
              <defs>
                {/* Real 3D Vascular Gradients */}
                <linearGradient id="real-tube-artery" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9F1239" />
                  <stop offset="25%" stopColor="#E11D48" />
                  <stop offset="50%" stopColor="#FB7185" />
                  <stop offset="75%" stopColor="#E11D48" />
                  <stop offset="100%" stopColor="#881337" />
                </linearGradient>

                <linearGradient id="real-tube-vein" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#075985" />
                  <stop offset="25%" stopColor="#0284C7" />
                  <stop offset="50%" stopColor="#38BDF8" />
                  <stop offset="75%" stopColor="#0284C7" />
                  <stop offset="100%" stopColor="#0C4A6E" />
                </linearGradient>

                {/* Real Organ Gradients */}
                <radialGradient id="real-lung-grad" cx="50%" cy="40%" r="65%">
                  <stop offset="0%" stopColor="#FDA4AF" />
                  <stop offset="45%" stopColor="#FB7185" />
                  <stop offset="80%" stopColor="#E11D48" />
                  <stop offset="100%" stopColor="#9F1239" />
                </radialGradient>

                <radialGradient id="real-heart-myo" cx="48%" cy="45%" r="65%">
                  <stop offset="0%" stopColor="#BE123C" />
                  <stop offset="40%" stopColor="#9F1239" />
                  <stop offset="75%" stopColor="#881337" />
                  <stop offset="100%" stopColor="#4C0519" />
                </radialGradient>

                {/* Capillary Gas Exchange Gradients */}
                <linearGradient id="real-capillary-pulmonary" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0284C7" />
                  <stop offset="25%" stopColor="#38BDF8" />
                  <stop offset="50%" stopColor="#A855F7" />
                  <stop offset="75%" stopColor="#FB7185" />
                  <stop offset="100%" stopColor="#E11D48" />
                </linearGradient>

                <linearGradient id="real-capillary-systemic" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0284C7" />
                  <stop offset="25%" stopColor="#38BDF8" />
                  <stop offset="50%" stopColor="#A855F7" />
                  <stop offset="75%" stopColor="#FB7185" />
                  <stop offset="100%" stopColor="#E11D48" />
                </linearGradient>

                {/* ClipPaths for Capillaries from Wikimedia Reference */}
                <clipPath id="clippath">
                  <path d="M246.05,93.44h-39.14c-6.46,0-17.26,0-21.01,11.92-2.4,7.63-2.05,16.64,1.75,23.81-.13-.27,2.65-3.59,3.03-4.03.9-1.05,1.8-2.1,2.68-3.16,1.21-1.42,2.27-2.68,2.42-4.63.14-1.78-.47-3.52-.92-5.25-.79-3.05-.4-6.51,2.53-8.24,2.72-1.61,6.47-1.47,9.52-1.47h39.14c7.4,0,13.41,6.02,13.41,13.42v173.29c0,7.41-6.02,13.42-13.41,13.42h-10.92c-.37-.85-.79-1.76-1.24-2.69.06-4.1-2.27-9.82-6.06-14.72-4.25-5.5-9.45-8.92-14.33-9.47-3.22-2.88-7.24-4.62-11.76-5.03-.24-.1-.53-.12-.81-.06-.14,0-.29-.02-.43-.03-6.36-.19-12.33,2.24-16.85,6.61-10.34,2.77-17.81,11.01-19.59,21.61-.73,1.23-1.36,2.49-1.88,3.77h-8.22c-7.39,0-13.41-6.02-13.41-13.42v-126.97l1.2-5.49c2.49-5.01,6.16-7.07,12.56-7.07h3.36c3.18,0,5.28.57,7.27,1.98l5.02,3.57,5.18-7.29-5.03-3.57c-3.53-2.51-7.37-3.63-12.44-3.63h-3.36c-5.55,0-10.12,1.28-13.76,3.84v-9.61c0-7.41,6.02-13.42,13.41-13.42h5.53c4.45-.02,9.04,0,12.89,4.29,3.66,4.09,5.93,6.86,5.95,6.88l6.94-5.64c-.1-.12-2.41-2.95-6.23-7.21-6.45-7.19-14.49-7.26-19.39-7.26h-5.68c-12.33,0-22.36,10.03-22.36,22.36v154.24c0,12.33,10.03,22.36,22.36,22.36h9.06c.97,1.94,2.19,4.08,3.35,5.47,3.02,3.59,6.21,6.26,9.78,8.19,2.17,1.17,4.62,2.13,7.38,2.9h.01c1.54.43,3.17.8,4.92,1.1,3.47.61,6.95.91,10.35.91,1.38,0,2.74-.06,4.1-.15h.02s.06-.01.09-.01c3.79-.29,7.46-.95,10.89-2,.08-.02.16-.04.23-.07,1.25-.39,2.48-.82,3.67-1.31,7.56-3.1,13.81-8.72,17.03-15.02h11.2c12.33,0,22.36-10.03,22.36-22.36V115.81c0-12.33-10.03-22.37-22.36-22.37Z" />
                </clipPath>
                <clipPath id="clippath-1">
                  <path d="M246.05,93.44h-39.14c-6.46,0-17.26,0-21.01,11.92-2.4,7.63-2.05,16.64,1.75,23.81-.13-.27,2.65-3.59,3.03-4.03.9-1.05,1.8-2.1,2.68-3.16,1.21-1.42,2.27-2.68,2.42-4.63.14-1.78-.47-3.52-.92-5.25-.79-3.05-.4-6.51,2.53-8.24,2.72-1.61,6.47-1.47,9.52-1.47h39.14c7.4,0,13.41,6.02,13.41,13.42v173.29c0,7.41-6.02,13.42-13.41,13.42h-10.92c-.37-.85-.79-1.76-1.24-2.69.06-4.1-2.27-9.82-6.06-14.72-4.25-5.5-9.45-8.92-14.33-9.47-3.22-2.88-7.24-4.62-11.76-5.03-.24-.1-.53-.12-.81-.06-.14,0-.29-.02-.43-.03-6.36-.19-12.33,2.24-16.85,6.61-10.34,2.77-17.81,11.01-19.59,21.61-.73,1.23-1.36,2.49-1.88,3.77h-8.22c-7.39,0-13.41-6.02-13.41-13.42v-126.97l1.2-5.49c2.49-5.01,6.16-7.07,12.56-7.07l3.65.93c3.18,0,3.85,1.23,5.84,2.64l5.84,3.32,5.51-8.63-5.03-3.57c-3.53-2.51-7.37-3.63-12.44-3.63h-3.36c-5.55,0-10.12,1.28-13.76,3.84v-9.61c0-7.41,6.02-13.42,13.41-13.42h5.53c4.45-.02,9.04,0,12.89,4.29,3.66,4.09,5.93,6.86,5.95,6.88l6.94-5.64c-.1-.12-2.41-2.95-6.23-7.21-6.45-7.19-14.49-7.26-19.39-7.26h-5.68c-12.33,0-22.36,10.03-22.36,22.36v154.24c0,12.33,10.03,22.36,22.36,22.36h9.06c.97,1.94,2.19,4.08,3.35,5.47,3.02,3.59,6.21,6.26,9.78,8.19,2.17,1.17,4.62,2.13,7.38,2.9h.01c1.54.43,3.17.8,4.92,1.1,3.47.61,6.95.91,10.35.91,1.38,0,2.74-.06,4.1-.15h.02s.06-.01.09-.01c3.79-.29,7.46-.95,10.89-2,.08-.02.16-.04.23-.07,1.25-.39,2.48-.82,3.67-1.31,7.56-3.1,13.81-8.72,17.03-15.02h11.2c12.33,0,22.36-10.03,22.36-22.36V115.81c0-12.33-10.03-22.37-22.36-22.37Z" />
                </clipPath>
                <clipPath id="clippath-2">
                  <path d="M235.12,302.52c-.37-.85-.79-1.76-1.24-2.69.06-4.1-2.27-9.82-6.06-14.72-4.25-5.5-9.45-8.92-14.33-9.47-3.22-2.88-7.24-4.62-11.76-5.03-.24-.1-.53-.12-.81-.06-.14,0-.29-.02-.43-.03-6.36-.19-12.33,2.24-16.85,6.61-10.34,2.77-17.81,11.01-19.59,21.61-.73,1.23-1.36,2.49-1.88,3.77h-8.22v8.94h9.06c.97,1.94,2.19,4.08,3.35,5.47,3.02,3.59,6.21,6.26,9.78,8.19,2.17,1.17,4.62,2.13,7.38,2.9h.01c1.54.43,3.17.8,4.92,1.1,3.47.61,6.95.91,10.35.91,1.38,0,2.74-.06,4.1-.15h.02s.06-.01.09-.01c3.79-.29,7.46-.95,10.89-2,.08-.02.16-.04.23-.07,1.25-.39,2.48-.82,3.67-1.31,7.56-3.1,13.81-8.72,17.03-15.02h11.2v-8.94h-10.92Z" />
                </clipPath>
                <clipPath id="clippath-3">
                  <path d="M217.38,68.11v-4.04c.68-.64.98-.84,1.55-1.32,1.77-1.49,2.78-3.13,3.73-4.88.9-1.67,1.54-3.65,1.96-6.05.42-2.39.54-4.79.37-7.09,0-.01,0-.02,0-.04-.14-1.87-.47-3.67-.98-5.37,0-.02-.01-.05-.02-.06-.19-.63-.4-1.24-.65-1.83-1.44-3.51-3.3-6.29-5.95-8.1v-4.34s-7.01,0-7.01,0v4c-1.09.68-1.58,1.19-2.42,1.84-1.93,1.48-3.38,3.05-4.41,4.8-.99,1.67-1.69,3.65-2.16,6.06-.33,1.7-.49,3.41-.49,5.08,0,.68.04,1.35.09,2.01h0s0,.04,0,.06c.15,1.85.5,3.66,1.06,5.34.01.05.03.11.06.16.2.61.43,1.21.69,1.78.78,1.73,3.15,4.77,3.18,4.8.99,1.24,2.56,3.28,4.38,4.05l.02,3.13h7.01Z" />
                </clipPath>
                <clipPath id="clippath-4">
                  <path d="M170.03,68.11v-3.44c1.83-.77,3.42-2.75,4.41-3.98.03-.03,2.39-3.07,3.18-4.8.26-.57.49-1.18.69-1.78.03-.05.05-.11.06-.16.56-1.69.91-3.49,1.06-5.34,0-.02,0-.03,0-.05h0c.05-.67.09-1.34.09-2.02,0-1.67-.16-3.38-.49-5.08-.47-2.41-1.17-4.39-2.16-6.06-1.04-1.76-2.48-3.32-4.41-4.8-.85-.65-1.55-1.05-2.41-1.71l-.07-3.89h-6.96v4.1c-2.65,2.04-4.51,4.59-5.95,8.1-.25.59-.46,1.21-.65,1.83-.01.02-.02.04-.02.06-.51,1.7-.84,3.5-.98,5.37,0,.01,0,.02,0,.04-.16,2.31-.05,4.7.37,7.09.42,2.4,1.06,4.38,1.96,6.05.95,1.76,2,3.33,3.77,4.81.57.47,1.5,1.44,1.5,1.44v4.22h7Z" />
                </clipPath>

                {/* Filters */}
                <filter id="organ-shadow" x="-10%" y="-10%" width="125%" height="125%">
                  <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#0F172A" floodOpacity="0.14" />
                </filter>
                <filter id="badge-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.15" />
                </filter>
              </defs>

              {/* ========================================================================= */}
              {/* 1. SCALED ANATOMICAL CIRCULATION FIGURE (AUTHENTIC WIKIMEDIA GEOMETRY)    */}
              {/* ========================================================================= */}

              <g transform="translate(115, 20) scale(1.62)">
                {/* Lungs (Pulmones) with Realistic Shading */}
                <g id="wiki-lungs" className="cursor-pointer" onClick={() => showPopup({
                  title: 'Paru-paru (Pulmones)',
                  subtitle: 'Pulmo Dexter & Pulmo Sinister',
                  description: 'Organ respirasi bilateral tempat bertemunya sirkulasi darah dan udara pernapasan. Di anyaman kapiler alveoli, CO₂ dilepas dan O₂ diikat hemoglobin.',
                  role: 'Pertukaran gas pulmonal',
                  oxygenStatus: 'mixed',
                })}>
                  <path fill="url(#real-lung-grad)" stroke="#881337" strokeWidth="0.8" d="M150.92,43.88c-2.55,11.23-2.75,22.85-2.53,34.36.02,1.01.23,2.27,1.2,2.55.41.12.85,0,1.27-.12,5.33-1.6,10.04-4.85,15.33-6.58,2.7-.88,5.52-1.36,8.21-2.27,5.38-1.82,11.74-5.73,13.21-11.66.33-1.33.36-2.72.39-4.09.11-5.14.3-10.28.3-15.41.05-2.24.1-4.49-.17-6.71-.36-2.9-1.25-5.71-1.87-8.57-.91-4.2-1.21-8.51-1.29-12.81-.05-2.43-.25-5.29-2.3-6.59-.78-.49-1.71-.67-2.63-.74-7.87-.61-13.37,8.26-17.49,13.62-3.2,4.16-6,8.61-8,13.47-1.53,3.73-2.73,7.61-3.62,11.54Z" />
                  <path fill="url(#real-lung-grad)" stroke="#881337" strokeWidth="0.8" d="M196.05,16.49c-.58,5.44-2.27,10.71-2.79,16.16-.81,8.47,1.68,18.35,8.3,24.03,1.44,1.23,3.08,2.34,3.98,4.01,1.88,3.51-1.56,7.59.74,10.51s7.54,2.69,10.71,3.06c3.48.4,6.84,1.82,9.56,4.03,1.97,1.6,3.41,2.05,4.43-.54.83-2.09.97-4.4,1.05-6.63.49-13.38-1.02-26.05-6.17-38.46-2.39-5.77-5.52-11.25-9.44-16.12-3.13-3.89-8.73-10.92-14.15-11.26-6.59-.4-5.75,6.73-6.23,11.21Z" />
                  {/* Subtle Lobar Shading */}
                  <path fill="#BE123C" opacity="0.35" d="M149.78,50.01c2.03,8.35,6.22,16.47,13.26,21.64.98.75,2.04,1.41,3.13,2.03-1.18-.41-2.31-.99-3.4-1.61-7.63-4.61-12.23-13.31-12.99-22.06h0Z" />
                  <path fill="#BE123C" opacity="0.35" d="M151.9,40.64c3.99,9.26,23.37,8.15,31.83,6.98,1.61-.27,3.19-.8,4.57-1.75-1.23,1.13-2.85,1.79-4.46,2.23-8.72,1.93-28.4,2.97-31.94-7.47h0Z" />
                  <path fill="#BE123C" opacity="0.35" d="M230.51,48.23c-.11,9.62-5.45,19.12-13.68,24.13-1.21.65-2.53,1.17-3.89,1.31,1.32-.36,2.53-.96,3.63-1.73,7.63-5.56,12.54-14.42,13.94-23.7h0Z" />
                </g>

                {/* Human Body Context Silhouette */}
                <path fill="#F8FAFC" fillOpacity="0.8" stroke="#CBD5E1" strokeWidth="0.8" d="M199.88,216.4c1.82.11,3.54,1.11,4.64,2.56.77,1.01,1.25,2.22,1.45,3.47.09.56.1,1.13.18,1.69.06.39.24,1.41,0,1.75.47-.67,1.59-1.17,1.61.07.02,1.01-.37,1.97-.75,2.9-.12.29-.25.59-.46.82s-.54.39-.85.32c0,0-.38,1.73-.42,1.88-.17.63-.4,1.26-.82,1.77-.09.11-.19.22-.24.35-.04.09-.04.19-.05.29-.09,1.1-.22,2.2-.16,3.3.05.86.21,1.73.56,2.52s.93,1.26,1.63,1.73c1.81,1.21,3.64,2.43,5.69,3.15.99.35,2.01.57,3.02.85.87.24,1.99.46,2.56,1.2.63.81,1.19,1.57,1.55,2.54.65,1.73.78,3.57.57,5.4-.08.73-.22,1.45-.25,2.18-.02.62.03,1.23.06,1.85.05,1.12.02,2.24,0,3.36-.03,2.03,0,4.06.08,6.09.04.93,0,1.92.21,2.82.22.99.58,1.96.92,2.91.14.4.27.83.45,1.22.14.31.34.57.47.89.34.82.67,1.65,1,2.47.57,1.46,1.1,2.93,1.6,4.41.2.59.4,1.19.56,1.79.68,2.56,1.31,5.13,1.97,7.69s1.16,5.05,2.31,7.34c.38.75.79,1.47,1.26,2.17s.94,1.41,1.55,1.94c.57.49.99,1.12,1.58,1.61.37.31.77.59,1.06.98.22.31.36.67.53,1.02.87,1.76,2.63,2.93,3.63,4.61.15.26.22.61-.11.77-.18.09-.39.07-.59.04-1.18-.17-2.12-.54-2.96-1.39.31,2.36.52,4.73.66,7.1.03.45.01.98-.35,1.24-.11.08-.24.13-.37.09-.22-.05-.32-.29-.39-.51-.57-1.81-.62-3.79-1.39-5.53.19,2.2.27,4.41.24,6.61,0,.3-.08.66-.39.79-.2.08-.44.05-.6-.09-.37-.31-.32-1.02-.47-1.45-.21-.6-.21-1.26-.32-1.88l-.63-3.61c.04.21-.1.57-.12.79-.04.31-.07.63-.09.94-.04.62-.04,1.25-.03,1.88.02.89.12,1.72.03,2.62-.02.18-.04.36-.13.52s-.27.28-.44.25c-.17-.03-.29-.19-.36-.35-.39-.97-.5-2.02-.69-3.05l-.62-3.45c-.15.93-.23,1.86-.24,2.8,0,.57,0,1.19-.34,1.66-.11.16-.29.3-.48.26-.2-.04-.31-.26-.37-.45-.41-1.26-.26-2.55-.35-3.84-.09-1.42-.15-2.85-.29-4.27-.17-1.85-.59-3.55-1.08-5.33-.47-1.7-1.14-3.35-2.09-4.84-2.16-3.36-3.97-6.94-5.91-10.43-.42-.77-.85-1.54-1.2-2.34-.2-.48-.38-.96-.57-1.45-.67-1.73-1.51-3.42-1.9-5.25s-.89-3.69-1.03-5.6c-.41,5.2.58,10.3,2.01,15.27.33,1.16.69,2.31,1.05,3.46.75,2.37.97,4.88,1.22,7.34s.39,5,.43,7.51c.08,5-.26,10.01-1.06,14.95-.66,4.04-1.63,8.04-2.96,11.92-.75,2.18-1.65,4.32-2.12,6.57-.3,1.44-.42,2.9-.5,4.37-.3,5.92.15,11.9-.83,17.75-.47,2.82-1.08,5.61-1.65,8.41-.54,2.65-1.46,5.65-1,8.36.12.71.19,1.34.12,2.06-.08.77-.34,1.54-.26,2.32.09.91.48,1.77.97,2.53.36.57.82,1.05,1.21,1.59.49.67.84,1.5,1.25,2.22.24.44.43,1.09-.27,1.22-.3.05-.6-.09-.78-.32.14.29-.01.65-.29.8-.39.21-.85-.07-1.11-.36.15.8-1.13,1.25-1.56.56-.42.9-1.99.84-2.34-.09-.58.89-2.15.91-2.84.17-.42-.45-.61-1.08-.65-1.69s.04-1.23.08-1.84c.15-1.98-.05-4.07-.25-6.04-.08-.75-.18-1.52-.04-2.26.11-.59.41-1.07.57-1.62.19-.65.25-1.38.31-2.05.13-1.34.14-2.7.06-4.04-.15-2.63-.62-5.27-1.08-7.83-.29-1.62-.66-3.23-.8-4.88-.13-1.53.04-3.11.17-4.62.27-2.96,1.39-5.83,1.35-8.8-.03-2.35-.79-4.63-1.06-6.96-.28-2.4-.05-4.82.02-7.23.26-8.64-1.49-17.52.96-25.81-.55.26-2.96.26-3.5,0,2.45,8.29.7,17.17.96,25.81.07,2.41.3,4.83.02,7.23-.27,2.33-1.03,4.61-1.06,6.96-.04,2.97,1.08,5.84,1.35,8.8.14,1.52.3,3.09.17,4.62-.14,1.64-.51,3.25-.8,4.88-.46,2.56-.93,5.2-1.08,7.83-.08,1.35-.07,2.7.06,4.04.07.67.12,1.41.31,2.05.16.55.46,1.03.57,1.62.14.74.03,1.51-.04,2.26-.2,1.97-.4,4.07-.25,6.04.05.61.13,1.23.08,1.84s-.23,1.24-.65,1.69c-.69.74-2.26.72-2.84-.17-.35.93-1.92.99-2.34.09-.42.69-1.71.24-1.56-.56-.26.29-.73.56-1.11.36-.28-.15-.43-.51-.29-.8-.18.23-.49.37-.78.32-.71-.13-.52-.79-.27-1.22.41-.72.76-1.55,1.25-2.22.39-.53.84-1.02,1.21-1.59.49-.76.89-1.62.97-2.53.08-.79-.19-1.55-.26-2.32-.07-.72,0-1.35.12-2.06.46-2.72-.46-5.71-1-8.36-.57-2.8-1.18-5.59-1.65-8.41-.98-5.85-.53-11.83-.83-17.75-.07-1.47-.2-2.93-.5-4.37-.47-2.25-1.37-4.39-2.12-6.57-1.33-3.88-2.3-7.87-2.96-11.92-.8-4.94-1.14-9.95-1.06-14.95.04-2.51.18-5.01.43-7.51s.47-4.98,1.22-7.34c.36-1.15.72-2.3,1.05-3.46,1.44-4.97,2.42-10.08,2.01-15.27-.14,1.91-.63,3.74-1.03,5.6s-1.23,3.52-1.9,5.25c-.19.48-.36.97-.57,1.45-.35.81-.77,1.57-1.2,2.34-1.93,3.49-3.75,7.07-5.91,10.43-.96,1.49-1.63,3.14-2.09,4.84-.49,1.78-.91,3.49-1.08,5.33-.13,1.42-.19,2.84-.29,4.27-.08,1.3.07,2.58-.35,3.84-.06.19-.17.41-.37.45-.19.04-.37-.1-.48-.26-.33-.47-.33-1.09-.34-1.66-.01-.94-.1-1.87-.24-2.8l-.62,3.45c-.19,1.03-.29,2.08-.69,3.05-.07.16-.19.32-.36.35-.18.03-.35-.09-.44-.25s-.11-.34-.13-.52c-.09-.9.01-1.72.03-2.62.01-.63.01-1.25-.03-1.88-.02-.31-.05-.63-.09-.94-.03-.22-.16-.57-.12-.79l-.63,3.61c-.11.63-.11,1.28-.32,1.88-.15.43-.1,1.13-.47,1.45-.16.14-.41.18-.6.09-.31-.13-.39-.49-.39-.79-.04-2.21.04-4.42.24-6.61-.77,1.74-.82,3.71-1.39,5.53-.07.21-.17.46-.39.51-.13.03-.27-.02-.37-.09-.36-.27-.38-.79-.35-1.24.13-2.38.35-4.75.66-7.1-.84.85-1.78,1.22-2.96,1.39-.2.03-.41.05-.59-.04-.32-.15-.26-.51-.11-.77,1-1.69,2.76-2.85,3.63-4.61.17-.34.3-.71.53-1.02.28-.39.69-.67,1.06-.98.58-.49,1.01-1.12,1.58-1.61.61-.52,1.11-1.27,1.55-1.94s.88-1.42,1.26-2.17c1.15-2.28,1.68-4.86,2.31-7.34s1.28-5.13,1.97-7.69c.16-.61.36-1.2.56-1.79.5-1.48,1.04-2.95,1.6-4.41.32-.83.65-1.65,1-2.47.13-.32.34-.58.47-.89.17-.39.3-.81.45-1.22.34-.95.69-1.92.92-2.91.2-.9.17-1.9.21-2.82.09-2.03.11-4.06.08-6.09-.02-1.12-.05-2.24,0-3.36.03-.62.09-1.23.06-1.85-.03-.73-.17-1.46-.25-2.18-.21-1.83-.08-3.67.57-5.4.37-.97.93-1.73,1.55-2.54.57-.74,1.7-.96,2.56-1.2,1.01-.28,2.03-.51,3.02-.85,2.05-.72,3.88-1.94,5.69-3.15.7-.47,1.28-.95,1.63-1.73s.52-1.66.56-2.52c.06-1.1-.07-2.21-.16-3.3,0-.1-.02-.2-.05-.29-.05-.13-.15-.24-.24-.35-.42-.51-.65-1.14-.82-1.77-.04-.15-.43-1.88-.42-1.88-.31.07-.63-.09-.85-.32s-.34-.53-.46-.82c-.38-.93-.77-1.89-.75-2.9.02-1.24,1.14-.74,1.61-.07-.24-.34-.06-1.36,0-1.75.08-.56.09-1.13.18-1.69.2-1.25.68-2.46,1.45-3.47,1.11-1.45,2.82-2.45,4.64-2.56h1.37Z" />

                {/* Right Heart & Venous Vessels (Rich Deoxygenated Blue) */}
                <path fill="url(#real-tube-vein)" d="M184.89,124.78c-.27-.78-.58-1.53-1.03-2.24-2.37-3.78-9.18-2.86-12.71-1.67-5.03,1.69-10.75,5.9-12.38,11.19-1.11,3.61-1.04,7.32-.21,10.98.36,1.59.84,3.14,1.3,4.71.38,1.32.5,2.75.8,4.1.97,4.42,1.43,8.88,2.13,13.33.67,4.28,1.82,8.55,4.14,12.26,3.4,5.43,8.99,9.17,14.83,11.79s12.07,4.3,18.04,6.64c5.36,2.1,11.22,4.77,16.61,2.77.71-.26,1.41-.62,1.86-1.23.89-1.21.46-2.91-.04-4.33-2.75-7.81-6.54-15.24-11.25-22.05-4.27-6.17-9.5-12.36-9.91-19.85-.57-10.29,8.15-18.97,9.26-29.22.7-6.48-1.93-13.24-6.84-17.53-.5-.43-1.1-.87-1.75-.76-.5.08-.9.47-1.22.86-1.58,1.89-2.47,3.81-2,6.37.39,2.16,1.69,4.2,1.39,6.37-.15,1.05-.67,2-1.21,2.91-1.17,1.94-2.51,3.76-3.92,5.53-.72.91-1.51,1.77-2.21,2.69-.39.51-.85,1.67-1.7,1.36-.33-.12-.51-.47-.64-.8-.56-1.36-.88-2.8-1.35-4.18Z" />
                <polygon fill="url(#real-tube-vein)" points="186.72 105.35 193.72 103.13 193.72 91.81 186.72 91.81 186.72 105.35" />

                {/* Left Heart & Arterial Vessels (Rich Oxygenated Red) */}
                <path fill="url(#real-tube-artery)" d="M201.45,136.58c-1.81,3.95-4.14,7.65-4.41,12.1-.25,4.12,1.09,8.21,3.01,11.86,1.92,3.66,4.42,6.97,6.71,10.41,4.82,7.24,8.75,15.07,11.68,23.26.39,1.08.8,2.23,1.71,2.92,1.02.77,2.48.78,3.66.28s2.13-1.42,2.95-2.41c4.98-5.97,6.07-14.23,6.38-22,.39-9.7-.11-19.43-1.49-29.04-.6-4.16-1.36-8.29-2.15-12.41-.54-2.78-1.11-5.6-2.4-8.12-1.27-2.48-3.29-4.64-5.84-5.76-2.57-1.13-5.77-1.13-8.37-.07-.26.11-.52.23-.77.36-1.41.74-2.6,1.85-3.6,3.08-1.11,1.36-1.81,2.86-2.52,4.47-1.49,3.38-2.73,6.87-4.2,10.27-.12.27-.23.53-.36.8Z" />

                {/* Descending Aorta and Pulmonary Trunk Branches */}
                <g clipPath="url(#clippath)">
                  <polygon fill="url(#real-tube-artery)" points="273.12 336.43 199.93 336.43 188.37 133.31 185.98 128.28 174.31 89.17 273.12 89.17 273.12 336.43" />
                </g>
                <path fill="url(#real-tube-artery)" d="M233.29,74.44h-17.75c1.17-2.03,1.84-4.38,1.84-6.88h-7c0,3.8-3.09,6.88-6.88,6.88h-28.74c-2.61,0-4.73-2.12-4.73-4.73v-2.4h-7v2.4c0,6.47,5.26,11.73,11.73,11.73h58.53c2.61,0,4.73,2.12,4.73,4.73v31.14c0,1.5-.72,2.92-1.93,3.81l-11.92,8.78,4.15,5.64,11.92-8.78c2.99-2.2,4.78-5.73,4.78-9.44v-31.14c0-6.47-5.26-11.73-11.73-11.73Z" />

                {/* Ascending Vena Cava and Pulmonary Trunk Bifurcation */}
                <path fill="url(#real-tube-vein)" d="M203.5,11.43h-2.9c-4.14,0-7.85,1.83-10.39,4.71-2.55-2.88-6.26-4.71-10.39-4.71h-2.9c-7.66,0-13.88,6.23-13.88,13.88v1.64h7v-1.64c0-3.8,3.09-6.88,6.88-6.88h2.9c3.8,0,6.88,3.09,6.88,6.88h.02v66.5h7V25.31c0-3.8,3.09-6.88,6.88-6.88h2.9c3.8,0,6.88,3.09,6.88,6.88v1.88h7v-1.88c0-7.66-6.23-13.88-13.88-13.88Z" />
                <g clipPath="url(#clippath-1)">
                  <polygon fill="url(#real-tube-vein)" points="200.07 336.43 126.88 336.43 126.88 89.17 174.31 89.17 185.77 127.55 188.37 133.75 200.07 336.43" />
                </g>

                {/* Heart Muscle Septum & Wall (Realistic Myocardium Texture) */}
                <g>
                  <path fill="url(#real-heart-myo)" d="M159.26,141.03c.4-.61.41-1.09.43-1.4-.08-1.93-.35-3.92.12-5.72,1.12-4.03,4.62-7.03,8.04-9.34,1.16-.67,1.78-2.42.7-3.59-1.46-1.31-3.27-1.46-5.1-1.38,0,0,.32,3.51.32,3.53-5.12,3.91-8.41,8.68-7.76,15.44-1.14.07-2.82.18-2.88.18l.06,3.58s3.91-.24,3.91-.24c.68.02,1.74-.33,2.16-1.04Z" />
                  <path fill="url(#real-heart-myo)" stroke="#4C0519" strokeWidth="0.8" d="M234.95,147.31l-2.27-9.81c-.05-.19-.08-.33-.1-.4.17-.16.37-.33.48-.44,1.57-1.5,3.16-2.97,4.62-4.67l-2.48-2.57c-1.16,1.07-2.45,2.06-3.8,3.06l-1.02.75s-.52.38-.52.38c-.5.37-.98.7-1.4,1.36-.63.88-.67,2.41-.53,3.19.17,1.69.36,3.37.56,5.05-.18.04-.37.08-.54.14-4.4,1.67-4.78,7.33-2.77,10.87.05-2.81.63-7.37,3.66-8.02.48,4.06.96,8.12,1.31,12.19.98,9.01.28,18.06-3.02,26.24-1.6,3.97-7.25,3.96-8.89,0l-.02-.04c-2.81-6.76-4.24-8.63-8.79-14.34-3.6-4.49-7.79-9.23-9.78-14.64.13-.17.25-.33.38-.51.94-1.31,2.52-1.86,3.5-3.37,1.31-1.98,1.34-4.43.84-6.63-.11,2.02-.64,3.76-2.03,5.32-.87,1.07-2.41,1.36-3.48,2.45-.53-2.01-.52-3.22-.26-5.43,1.08-5.21,4.02-9.63,5.99-14.62.14-.36.28-.72.42-1.08.23,1.87.66,3.69,1.25,5.33,1.29,3.57,3.51,5.57,5.81,8.49,0,0,0,0,0,0-1.93.69-3.44.83-4.97-.68.52,1.69,2.76,3.09,4.7,3.12.62.02,1.33-.05,1.93-.29,1.4,2.01,2.43,4.18,2.51,6.85,1.67-5.49-2.22-11.05-4.36-15.66-1.03-2.26-1.95-4.44-2.36-6.88-.49-3.28-.53-7.26,1.47-10,1.95-2.52,5.69-3.59,8.72-2.71,2.1.58,3.84,2.09,5.37,4.07,1.22,1.52,2.22,4.13,4.82,3.23,1.12-.45,1.4-.91,2.18-1.5l1.55-1.3s-2.2-2.72-2.2-2.72c-.48.37-1.57,1.23-2.19,1.7-3.69-6.52-10.63-10.05-17.78-6.51-1.35.67-2.46,1.55-3.36,2.57h0c-.14-5.72-2.95-11.45-7.62-14.73-.74-.93-2.04-1.49-3.27-1.13-1.46.55-1.97,1.71-2.41,2.63-.84,1.93-1.66,4.08-1.03,6.28,0,0,.05-.01.05-.01,1.34,4.28,1.51,6.87-2.04,10.16-1.19,1.23-2.41,2.63-3.43,4.11-.48-1.36-1.17-2.61-2.03-3.76-.74-3.68-.96-7.43-.66-11.19l-1.78-.15c-.28,2.87-.26,5.79.05,8.67-2.1-1.96-4.69-3.66-7.47-5.2,0,0-1.92,2.96-1.92,2.96,3.13,2.51,6.55,4.71,8.7,8.2,2.27,4.08,1.36,8.82-.88,12.81-2.53,4.8-7.47,12.61-1.86,17.11.1-2.11.4-3.74.91-5.35,1.01-4.18,3.51-7.13,5.44-10.87,3.08.04,5.53-2.89,6.43-5.64,0,0-2.02,1.59-2.02,1.59-1.02.77-2.11,1.41-3.31,1.63.27-.7.52-1.43.72-2.21.21-.91.34-1.79.41-2.64.5-.94.87-1.95,1.51-2.93,4.34-7.04,9.84-9.08,4.68-18.13-.33-1.59.37-3.28,1.02-4.77.3-.65.74-1.53,1.38-1.69.35-.05.72.14,1.09.42,1.75,1.95,3.15,4.1,4.14,6.41,1.6,3.36,1.69,7.04,1.7,10.74-.98,6.18-4.08,11.75-6.53,17.58-.61-1.35-.82-2.86-.91-4.42-.86,1.78-1.45,5.2-.18,7.08-1.32,3.35-1.86,7.07-1.26,10.62.99,7.6,5.74,14.23,9.52,20.43,1.81,2.96,3.41,5.97,4.94,9,1.33,2.68,2.19,4.42,3.4,7.21,0,.01.01.03.02.04,1.56,3.24-1.39,6.83-4.88,5.98-.59-.14-1.13-.27-1.57-.37-4.38-1-9.39-3.55-13.66-5.41-9.64-4.53-23.2-7.13-27.19-17.96-1.47-4.23-2.12-9-2.4-13.7-.07-1.12,1.07-1.9,2.1-1.48,0,0,0,0,0,0,.93.38,2.47,1.19,3.3,1.72,1.68,1.06,2.61,2.15,5.01,3.55-.41-2.88-2.45-5.23-4.56-7.13-.42-.37-1.26-1.01-1.73-1.32-2.53-1.72-5.39-3.26-7.66-3.69-.41-.08-1.78-.2-2.41-.28-1.38-.18-2.65-.23-3.78-.15l.27,3.57c.88-.07,1.91-.02,3.04.13.85.11,1.46.26,1.98.44-.1,3.18-.07,6.38.23,9.51.57,7.19,2.57,14.85,8.46,19.73,6.66,5.95,15.29,8.1,22.97,11.99,0,0,4.48,2.36,4.48,2.36,6.25,3.37,13.43,6.33,20.82,6.18,4.19.11,9.15-1.13,12.26-4.36,5.68-5.11,9.34-12.62,10.33-20.18,1.59-10.82-1.72-21.22-4.02-31.52ZM228.69,123.18s0,0,0,0c-.03.01-.04.02,0,0ZM232.25,137.44s.11-.12.19-.19c-.03.04-.05.09-.09.14-.09.12-.14.12-.1.06Z" />
                </g>

                {/* Systemic Capillary Bed (Bottom Meshwork) */}
                <g clipPath="url(#clippath-2)" className="cursor-pointer" onClick={() => showPopup({
                  title: 'Mikrosirkulasi Sistemik (Jaringan Tubuh)',
                  subtitle: 'Plexus Capillaris Systemicus',
                  description: 'Anyaman kapiler di seluruh jaringan tubuh perifer tempat darah melepaskan O₂ untuk metabolisme sel dan mengikat CO₂ buangan metabolik.',
                  role: 'Respirasi internal seluler',
                  oxygenStatus: 'mixed',
                })}>
                  <rect fill="url(#real-capillary-systemic)" x="157.97" y="266.64" width="78.99" height="65.72" />
                </g>

                {/* Pulmonary Capillary Beds (Top Meshworks) */}
                <g clipPath="url(#clippath-3)" className="cursor-pointer" onClick={() => showPopup({
                  title: 'Kapiler Alveoli Paru',
                  subtitle: 'Pertukaran Gas Alveolar',
                  description: 'Anyaman kapiler halus yang membalut kantung-kantung alveolus paru-paru tempat pelepasan CO₂ dan pengikatan O₂.',
                  role: 'Oksigenasi hematik',
                  oxygenStatus: 'mixed',
                })}>
                  <rect fill="url(#real-capillary-pulmonary)" x="191.28" y="29.12" width="45.2" height="34.71" transform="translate(260.36 -167.4) rotate(90)" />
                </g>
                <g clipPath="url(#clippath-4)" className="cursor-pointer" onClick={() => showPopup({
                  title: 'Kapiler Alveoli Paru',
                  subtitle: 'Pertukaran Gas Alveolar',
                  description: 'Anyaman kapiler halus yang membalut kantung-kantung alveolus paru-paru tempat pelepasan CO₂ dan pengikatan O₂.',
                  role: 'Oksigenasi hematik',
                  oxygenStatus: 'mixed',
                })}>
                  <rect fill="url(#real-capillary-pulmonary)" x="143.57" y="29.12" width="45.2" height="34.71" transform="translate(212.65 -119.69) rotate(90)" />
                </g>

                {/* Crisp White Intracardiac & Vessel Directional Arrows */}
                <g id="wiki-arrows" fill="#FFFFFF" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.5))">
                  {/* Upward into pulmonary trunk */}
                  <g>
                    <rect x="188.88" y="40.48" width="2" height="47.38" />
                    <polygon points="186.39 41.5 189.88 35.46 193.37 41.5 186.39 41.5" />
                  </g>
                  {/* Into Right Atrium from Vena Cava */}
                  <g>
                    <path d="M136.81,139.34h-2v-4.28c0-10.51,8.94-19.05,19.93-19.05h1.35v2h-1.35c-9.89,0-17.93,7.65-17.93,17.05v4.28Z" />
                    <polygon points="155.07 120.5 161.12 117.01 155.07 113.52 155.07 120.5" />
                  </g>
                  {/* Downward from RA into RV */}
                  <g>
                    <path d="M189.57,116.81h-2v-5.87c0-8.01,6.4-14.06,14.9-14.06h6.39v2h-6.39c-7.35,0-12.9,5.18-12.9,12.06v5.87Z" />
                    <polygon points="207.83 101.37 213.88 97.88 207.83 94.39 207.83 101.37" />
                  </g>
                  {/* Upward in Left Vena Cava */}
                  <g>
                    <path d="M136.81,193.97h-2v-30.62c0-10.51,8.94-19.05,19.93-19.05h1.35v2h-1.35c-9.89,0-17.93,7.65-17.93,17.05v30.62Z" />
                    <polygon points="155.07 148.78 161.12 145.29 155.07 141.8 155.07 148.78" />
                  </g>
                  {/* Ascending Vena Cava lower arrow */}
                  <g>
                    <path d="M161.12,308.29h-6.37c-10.99,0-19.93-8.55-19.93-19.05v-54.12h2v54.12c0,9.4,8.04,17.05,17.93,17.05h6.37v2Z" />
                    <polygon points="132.32 236.14 135.81 230.09 139.3 236.14 132.32 236.14" />
                  </g>
                  {/* Upper Pulmonary Loop Arrows */}
                  <g>
                    <path d="M175.78,78.91h-1.02c-4.92,0-8.93-4-8.93-8.93v-5.84h2v5.84c0,3.82,3.11,6.93,6.93,6.93h1.02v2Z" />
                    <polygon points="174.76 81.4 180.8 77.91 174.76 74.42 174.76 81.4" />
                  </g>
                  <g>
                    <path d="M167.83,24.08h-2v-.82c0-4.92,4-8.93,8.93-8.93h6.04v2h-6.04c-3.82,0-6.93,3.11-6.93,6.93v.82Z" />
                    <polygon points="170.32 23.06 166.83 29.1 163.34 23.06 170.32 23.06" />
                  </g>
                  <g>
                    <path d="M220.98,78.91h-4.68c-2.9,0-5.27-2.36-5.27-5.27v-5.54h2v5.54c0,1.8,1.47,3.27,3.27,3.27h4.68v2Z" />
                    <polygon points="219.96 81.4 226 77.91 219.96 74.42 219.96 81.4" />
                  </g>
                  <g>
                    <path d="M213.92,24.08h-2v-.82c0-3.82-3.11-6.93-6.93-6.93h-6.04v-2h6.04c4.92,0,8.93,4,8.93,8.93v.82Z" />
                    <polygon points="216.42 23.06 212.93 29.1 209.43 23.06 216.42 23.06" />
                  </g>
                  {/* Descending Aorta lower arrow */}
                  <g>
                    <path d="M246.27,308.08h-1.86v-2h1.86c9.4,0,17.05-8.04,17.05-17.93v-61.94h2v61.94c0,10.99-8.55,19.93-19.05,19.93Z" />
                    <polygon points="245.43 310.57 239.38 307.08 245.43 303.59 245.43 310.57" />
                  </g>
                  {/* Descending Aorta upper arrow */}
                  <g>
                    <path d="M264.85,147.07h-2v-30.25c0-9.89-7.65-17.93-17.05-17.93h-21.69v-2h21.69c10.51,0,19.05,8.94,19.05,19.93v30.25Z" />
                    <polygon points="260.36 146.05 263.85 152.09 267.34 146.05 260.36 146.05" />
                  </g>
                  {/* Downward from LA into LV */}
                  <g>
                    <path d="M223.03,140.68l-1.9-.62c1.4-4.28,4.03-7.97,7.61-10.68l9.02-6.56c3.1-2.35,3.05-6.36,3-10.61,0-.56-.01-1.12-.01-1.69v-20.39h2v20.39c0,.55,0,1.11.01,1.66.06,4.56.12,9.27-3.8,12.24l-9.02,6.56c-3.24,2.45-5.63,5.81-6.9,9.7Z" />
                    <polygon points="218.99 138.62 221.05 145.29 225.8 140.17 218.99 138.62" />
                  </g>
                  {/* Curved Intracardiac Arrow inside RV */}
                  <g>
                    <path d="M187.3,173.45c-3.38,0-6.89-3.31-8.58-6.61-2.92-5.12-4.29-11.21-5.62-17.09-.22-.98-.44-1.95-.66-2.91l1.95-.46c.23.96.45,1.94.67,2.93,1.29,5.74,2.63,11.68,5.42,16.58,1.7,3.31,4.89,5.78,7.14,5.54,1.38-.15,2.38-1.34,2.97-3.54.76-2.61.55-6.47.34-10.21-.09-1.61-.18-3.28-.19-4.82-.09-5.34.95-10.92,3.28-17.55l1.89.66c-2.25,6.4-3.26,11.76-3.17,16.87,0,1.5.09,3.07.19,4.74.21,3.9.43,7.94-.41,10.86-1.02,3.82-3.11,4.82-4.68,4.99-.18.02-.35.03-.53.03Z" />
                    <polygon points="197.9 137.83 196.76 130.95 191.37 135.38 197.9 137.83" />
                  </g>
                  {/* Curved Intracardiac Arrow inside LV */}
                  <g>
                    <path d="M218.2,166.08c-2.46,0-5.01-1.46-6.17-3.78l-.58-1.15c-2.42-4.85-4.71-9.43-6.95-16.9l1.92-.57c2.19,7.31,4.44,11.81,6.82,16.58l.58,1.16c1.15,2.31,4.03,3.17,5.83,2.39,2.24-.97,2.63-4.13,1.03-8.46l1.88-.69c2.98,8.06-.86,10.45-2.11,10.99-.71.31-1.47.45-2.24.45Z" />
                    <polygon points="202.45 145.88 204.12 139.11 209.16 143.95 202.45 145.88" />
                  </g>
                </g>
              </g>

              {/* ========================================================================= */}
              {/* 2. LEADER LINES & LABELS (POLA REFERENSI: RAPI DI LUAR ORGAN)             */}
              {/* ========================================================================= */}

              {/* SISI KIRI (Jalur Vena Biru & Sisi Kanan Pasien) */}
              <g id="labels-left" className="select-none">
                {/* Pulmo Dexter */}
                <g
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredLabel('pulmo-dexter')}
                  onMouseLeave={() => setHoveredLabel(null)}
                >
                  <text x="175" y="85" textAnchor="end" fontSize="11" fontWeight="bold" fill="#0F172A">Pulmo Dexter</text>
                  <text x="175" y="99" textAnchor="end" fontSize="9" fontWeight="semibold" fill="#64748B">(Paru Kanan - 3 Lobus)</text>
                  <line x1="185" y1="92" x2="360" y2="92" stroke="#94A3B8" strokeWidth="1.2" />
                  <circle cx="360" cy="92" r="2.8" fill="#E11D48" />
                </g>

                {/* Arteri Pulmonalis */}
                <g
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredLabel('arteri-pulmonalis')}
                  onMouseLeave={() => setHoveredLabel(null)}
                >
                  <text x="175" y="150" textAnchor="end" fontSize="11" fontWeight="bold" fill="#0284C7">Arteri Pulmonalis</text>
                  <text x="175" y="164" textAnchor="end" fontSize="9" fontWeight="semibold" fill="#0369A1">(Darah kaya CO₂)</text>
                  <line x1="185" y1="157" x2="418" y2="135" stroke="#0284C7" strokeWidth="1.2" />
                  <circle cx="418" cy="135" r="2.8" fill="#0284C7" />
                </g>

                {/* Vena Kava Superior/Inferior */}
                <g
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredLabel('vena-cava')}
                  onMouseLeave={() => setHoveredLabel(null)}
                >
                  <text x="175" y="235" textAnchor="end" fontSize="11" fontWeight="bold" fill="#0284C7">Vena Kava</text>
                  <text x="175" y="249" textAnchor="end" fontSize="9" fontWeight="semibold" fill="#64748B">Superior & Inferior</text>
                  <line x1="185" y1="242" x2="336" y2="242" stroke="#0284C7" strokeWidth="1.2" />
                  <circle cx="336" cy="242" r="2.8" fill="#0284C7" />
                </g>

                {/* Atrium Dextrum (RA) */}
                <g
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredLabel('heart')}
                  onMouseLeave={() => setHoveredLabel(null)}
                >
                  <text x="175" y="300" textAnchor="end" fontSize="11" fontWeight="bold" fill="#0C4A6E">Atrium Dextrum</text>
                  <text x="175" y="314" textAnchor="end" fontSize="9" fontWeight="semibold" fill="#0284C7">(Serambi Kanan / RA)</text>
                  <line x1="185" y1="307" x2="385" y2="250" stroke="#0284C7" strokeWidth="1.2" strokeDasharray="3 2" />
                  <circle cx="385" cy="250" r="2.8" fill="#0284C7" />
                </g>

                {/* Ventriculus Dexter (RV) */}
                <g
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredLabel('heart')}
                  onMouseLeave={() => setHoveredLabel(null)}
                >
                  <text x="175" y="365" textAnchor="end" fontSize="11" fontWeight="bold" fill="#075985">Ventriculus Dexter</text>
                  <text x="175" y="379" textAnchor="end" fontSize="9" fontWeight="semibold" fill="#0284C7">(Bilik Kanan / RV)</text>
                  <line x1="185" y1="372" x2="395" y2="305" stroke="#0284C7" strokeWidth="1.2" strokeDasharray="3 2" />
                  <circle cx="395" cy="305" r="2.8" fill="#0284C7" />
                </g>

                {/* Vena Sistemik */}
                <g
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredLabel('capillary-systemic')}
                  onMouseLeave={() => setHoveredLabel(null)}
                >
                  <text x="175" y="470" textAnchor="end" fontSize="11" fontWeight="bold" fill="#0284C7">Vena Sistemik</text>
                  <text x="175" y="484" textAnchor="end" fontSize="9" fontWeight="semibold" fill="#0369A1">(Biru - Darah miskin O₂)</text>
                  <line x1="185" y1="477" x2="336" y2="477" stroke="#0284C7" strokeWidth="1.2" />
                  <circle cx="336" cy="477" r="2.8" fill="#0284C7" />
                </g>
              </g>

              {/* SISI KANAN (Jalur Arteri Merah & Sisi Kiri Pasien) */}
              <g id="labels-right" className="select-none">
                {/* Pulmo Sinister */}
                <g
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredLabel('pulmo-sinister')}
                  onMouseLeave={() => setHoveredLabel(null)}
                >
                  <text x="705" y="85" textAnchor="start" fontSize="11" fontWeight="bold" fill="#0F172A">Pulmo Sinister</text>
                  <text x="705" y="99" textAnchor="start" fontSize="9" fontWeight="semibold" fill="#64748B">(Paru Kiri - 2 Lobus)</text>
                  <line x1="695" y1="92" x2="520" y2="92" stroke="#94A3B8" strokeWidth="1.2" />
                  <circle cx="520" cy="92" r="2.8" fill="#E11D48" />
                </g>

                {/* Arkus Aorta */}
                <g
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredLabel('aorta')}
                  onMouseLeave={() => setHoveredLabel(null)}
                >
                  <text x="705" y="150" textAnchor="start" fontSize="11" fontWeight="bold" fill="#E11D48">Arkus Aorta</text>
                  <text x="705" y="164" textAnchor="start" fontSize="9" fontWeight="semibold" fill="#64748B">(Lengkung Aorta)</text>
                  <line x1="695" y1="157" x2="488" y2="142" stroke="#E11D48" strokeWidth="1.2" />
                  <circle cx="488" cy="142" r="2.8" fill="#E11D48" />
                </g>

                {/* Vena Pulmonalis */}
                <g
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredLabel('vena-pulmonalis')}
                  onMouseLeave={() => setHoveredLabel(null)}
                >
                  <text x="705" y="210" textAnchor="start" fontSize="11" fontWeight="bold" fill="#E11D48">Vena Pulmonalis</text>
                  <text x="705" y="224" textAnchor="start" fontSize="9" fontWeight="semibold" fill="#BE123C">(Darah kaya O₂)</text>
                  <line x1="695" y1="217" x2="475" y2="185" stroke="#E11D48" strokeWidth="1.2" />
                  <circle cx="475" cy="185" r="2.8" fill="#E11D48" />
                </g>

                {/* Atrium Sinistrum (LA) */}
                <g
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredLabel('heart')}
                  onMouseLeave={() => setHoveredLabel(null)}
                >
                  <text x="705" y="300" textAnchor="start" fontSize="11" fontWeight="bold" fill="#881337">Atrium Sinistrum</text>
                  <text x="705" y="314" textAnchor="start" fontSize="9" fontWeight="semibold" fill="#E11D48">(Serambi Kiri / LA)</text>
                  <line x1="695" y1="307" x2="480" y2="250" stroke="#E11D48" strokeWidth="1.2" strokeDasharray="3 2" />
                  <circle cx="480" cy="250" r="2.8" fill="#E11D48" />
                </g>

                {/* Ventriculus Sinister (LV) */}
                <g
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredLabel('heart')}
                  onMouseLeave={() => setHoveredLabel(null)}
                >
                  <text x="705" y="365" textAnchor="start" fontSize="11" fontWeight="bold" fill="#9F1239">Ventriculus Sinister</text>
                  <text x="705" y="379" textAnchor="start" fontSize="9" fontWeight="semibold" fill="#E11D48">(Bilik Kiri / LV)</text>
                  <line x1="695" y1="372" x2="475" y2="305" stroke="#E11D48" strokeWidth="1.2" strokeDasharray="3 2" />
                  <circle cx="475" cy="305" r="2.8" fill="#E11D48" />
                </g>

                {/* Aorta Descendens */}
                <g
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredLabel('aorta')}
                  onMouseLeave={() => setHoveredLabel(null)}
                >
                  <text x="705" y="470" textAnchor="start" fontSize="11" fontWeight="bold" fill="#E11D48">Aorta Descendens</text>
                  <text x="705" y="484" textAnchor="start" fontSize="9" fontWeight="semibold" fill="#9F1239">(Merah - Darah kaya O₂)</text>
                  <line x1="695" y1="477" x2="545" y2="477" stroke="#E11D48" strokeWidth="1.2" />
                  <circle cx="545" cy="477" r="2.8" fill="#E11D48" />
                </g>
              </g>

              {/* Label Tengah & Header */}
              <g className="select-none">
                <text x="440" y="24" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#0F172A">
                  Paru-paru (Pulmones) • Anyaman Kapiler Alveoli
                </text>
                <line x1="440" y1="28" x2="440" y2="38" stroke="#94A3B8" strokeWidth="1.2" />
                <circle cx="440" cy="38" r="2.5" fill="#E11D48" />

                <text x="440" y="598" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#0F172A">
                  Kapiler Jaringan Tubuh (Respirasi Seluler Sistemik)
                </text>
                <line x1="440" y1="586" x2="440" y2="560" stroke="#94A3B8" strokeWidth="1.2" />
                <circle cx="440" cy="560" r="2.5" fill="#0284C7" />
              </g>

              {/* Animated Erythrocytes Gliding in Closed-Loop Figure-8 */}
              {isPlaying &&
                bloodParticles.map((particle) => (
                  <motion.g
                    key={particle.id}
                    initial={{ offsetDistance: '0%' }}
                    animate={{ offsetDistance: '100%' }}
                    transition={{
                      duration: particle.duration,
                      delay: particle.delay,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{
                      offsetPath: `path('${particle.path}')`,
                    } as any}
                  >
                    <circle
                      r="4.8"
                      fill={particle.type === 'oxygenated' ? '#E11D48' : '#0284C7'}
                      stroke={particle.type === 'oxygenated' ? '#FDA4AF' : '#BAE6FD'}
                      strokeWidth="1.2"
                      opacity="0.95"
                    />
                    <circle
                      r="2"
                      fill={particle.type === 'oxygenated' ? '#9F1239' : '#0C4A6E'}
                      opacity="0.8"
                    />
                  </motion.g>
                ))}
            </svg>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 mb-6 bg-white/70 backdrop-blur-md p-3 rounded-2xl border border-slate-200/70">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 shadow-xs flex items-center justify-center text-[9px] text-white font-bold">
              O₂
            </div>
            <span className="text-xs font-semibold text-slate-800">Darah Kaya Oksigen (Arteri / Vena Pulmonalis)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-sky-500 to-sky-700 shadow-xs flex items-center justify-center text-[9px] text-white font-bold">
              CO₂
            </div>
            <span className="text-xs font-semibold text-slate-800">Darah Deoksigenasi (Vena / Arteri Pulmonalis)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 shadow-xs flex items-center justify-center text-[9px] text-white font-bold">
              ⇄
            </div>
            <span className="text-xs font-semibold text-slate-800">Anyaman Kapiler (Pertukaran Gas)</span>
          </div>
        </div>

        {/* 8-Step Cardiac Circulation Cycle Stepper */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/70 p-5 sm:p-6 shadow-xs">
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-1.5 text-center">
            8 Tahapan Alur Sirkulasi Fisiologis
          </h3>
          <p className="text-xs text-slate-500 text-center mb-5 max-w-xl mx-auto">
            Klik tahap di bawah ini untuk mempelajari urutan kronologis hemodinamika perjalanan darah:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {heartbeatSteps.map((step, idx) => (
              <motion.div
                key={step.number}
                className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                  activeStep === idx
                    ? 'border-rose-600 bg-rose-50/50 shadow-md ring-2 ring-rose-300/40'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
                onClick={() => {
                  setActiveStep(idx)
                  setIsPlaying(false)
                }}
                whileHover={{ y: -2 }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-black shadow-xs shrink-0"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.number}
                  </div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-tight line-clamp-1">{step.title}</h4>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Detail Modal Dialog */}
      <AnimatePresence>
        {popup && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPopup(null)}
          >
            <motion.div
              className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 text-slate-900"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`flex h-3 w-3 rounded-full ${
                      popup.oxygenStatus === 'oxygenated'
                        ? 'bg-rose-500'
                        : popup.oxygenStatus === 'deoxygenated'
                        ? 'bg-sky-500'
                        : 'bg-purple-500'
                    } animate-ping`}
                  />
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 leading-tight">{popup.title}</h3>
                    <p className="text-xs text-slate-500 font-medium italic">{popup.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={() => setPopup(null)}
                  className="rounded-full p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="mb-4">
                <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 mb-2">
                  Fungsi Fisiologis: {popup.role}
                </span>
                <p className="text-sm leading-relaxed text-slate-600">{popup.description}</p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setPopup(null)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
                >
                  Tutup Informasi
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Tooltip Hover */}
      {hoveredLabel && tooltips[hoveredLabel] && (
        <motion.div
          className="fixed bottom-4 left-4 bg-slate-900/95 text-white rounded-xl px-4 py-2.5 text-xs shadow-xl backdrop-blur-md max-w-xs z-40 border border-slate-800 pointer-events-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          {tooltips[hoveredLabel]}
        </motion.div>
      )}
    </div>
  )
}
