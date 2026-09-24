import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wind, Activity, Info } from 'lucide-react'

export interface LungStructure {
  id: string
  name: string
  latin: string
  x: number
  y: number
  description: string
  clinicalNote: string
}

export const lungStructures: LungStructure[] = [
  {
    id: 'trachea',
    name: 'Trakea (Batang Tenggorokan)',
    latin: 'Trachea',
    x: 50,
    y: 16,
    description: 'Saluran udara tulang rawan fleksibel dengan cincin hialin berbentuk C yang menghubungkan laring ke bronkus primer.',
    clinicalNote: 'Silia pada epitel trakea menyaring dan menyapu partikel debu ke atas menuju faring.',
  },
  {
    id: 'right_bronchus',
    name: 'Bronkus Utama Kanan',
    latin: 'Bronchus Principalis Dexter',
    x: 42,
    y: 32,
    description: 'Bercabang lebih pendek, lebih lebar, dan lebih vertikal dibanding bronkus kiri.',
    clinicalNote: 'Benda asing yang terhirup lebih sering tersangkut di bronkus kanan karena posisinya yang lebih vertikal.',
  },
  {
    id: 'left_bronchus',
    name: 'Bronkus Utama Kiri',
    latin: 'Bronchus Principalis Sinister',
    x: 58,
    y: 33,
    description: 'Bercabang lebih panjang dan melengkung di bawah arkus aorta menuju hilus paru kiri.',
    clinicalNote: 'Membawa oksigen ke dua lobus paru kiri.',
  },
  {
    id: 'right_lung_lobes',
    name: 'Lobus Paru Kanan (3 Lobus)',
    latin: 'Pulmo Dexter (Superior, Medius, Inferior)',
    x: 28,
    y: 54,
    description: 'Paru kanan memiliki 3 lobus yang dipisahkan oleh fisura horizontalis dan fisura obliqua. Kapasitasnya sekitar 55% dari total volume paru.',
    clinicalNote: 'Dikelilingi pleura viseralis untuk mencegah gesekan saat inspirasi-ekspirasi.',
  },
  {
    id: 'cardiac_notch',
    name: 'Incisura Cardiaca & Paru Kiri (2 Lobus)',
    latin: 'Incisura Cardiaca Pulmonis Sinistri',
    x: 72,
    y: 56,
    description: 'Lekukan khusus pada batas anterior paru kiri yang menyediakan ruang bagi apeks jantung manusia.',
    clinicalNote: 'Hanya memiliki 2 lobus (superior dan inferior) untuk mengakomodasi posisi jantung.',
  },
  {
    id: 'pulmonary_capillaries',
    name: 'Anyaman Kapiler Alveolus',
    latin: 'Plexus Capillaris Alveolaris',
    x: 50,
    y: 78,
    description: 'Tempat terjadinya difusi respirasi: hemoglobin dalam eritrosit mengikat molekul O₂ dan melepaskan CO₂ melalui membran alveolar-kapiler tipis (0.5 mikron).',
    clinicalNote: 'Luas permukaan difusi alveolus manusia mencapai sekitar 70-100 meter persegi!',
  },
]

export default function AnatomicalLungs() {
  const [selected, setSelected] = useState<LungStructure | null>(null)
  const [isBreathing, setIsBreathing] = useState(true)

  return (
    <div className="relative flex flex-col items-center w-full">
      {/* Controls */}
      <div className="mb-4 flex items-center justify-between w-full max-w-lg px-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
          <Wind size={14} className="text-sky-500" />
          Anatomi Paru & Sirkulasi Pulmonalis
        </span>
        <button
          onClick={() => setIsBreathing(!isBreathing)}
          className="text-xs px-3 py-1 rounded-full border border-slate-200 bg-white/90 text-slate-700 hover:bg-slate-50 font-medium dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          {isBreathing ? 'Jeda Ritme Nafas' : 'Mulai Ritme Nafas'}
        </button>
      </div>

      {/* SVG Scientific Illustration */}
      <div className="relative w-full max-w-xl h-[420px] flex items-center justify-center">
        <motion.div
          className="w-full h-full"
          animate={
            isBreathing
              ? {
                  scale: [1, 1.035, 1],
                  y: [0, -3, 0],
                }
              : {}
          }
          transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            viewBox="0 0 600 500"
            className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(2,132,199,0.12)]"
          >
            <defs>
              <linearGradient id="lung-right-grad" x1="20%" y1="20%" x2="80%" y2="80%">
                <stop offset="0%" stopColor="#FBCFE8" />
                <stop offset="40%" stopColor="#F472B6" />
                <stop offset="85%" stopColor="#DB2777" />
                <stop offset="100%" stopColor="#9D174D" />
              </linearGradient>
              <linearGradient id="lung-left-grad" x1="20%" y1="20%" x2="80%" y2="80%">
                <stop offset="0%" stopColor="#FBCFE8" />
                <stop offset="40%" stopColor="#F472B6" />
                <stop offset="85%" stopColor="#DB2777" />
                <stop offset="100%" stopColor="#9D174D" />
              </linearGradient>
              <linearGradient id="trachea-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E2E8F0" />
                <stop offset="50%" stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>
            </defs>

            {/* Trachea with Cartilage Rings */}
            <g id="trachea-group">
              <path
                d="M 285 40 L 285 150 Q 285 165 300 170 Q 315 165 315 150 L 315 40 Z"
                fill="url(#trachea-grad)"
                stroke="#64748B"
                strokeWidth="1.5"
              />
              {/* Cartilage C-rings */}
              {[60, 80, 100, 120, 140].map((y) => (
                <path
                  key={y}
                  d={`M 285 ${y} Q 300 ${y - 4} 315 ${y}`}
                  stroke="#475569"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.8"
                />
              ))}
            </g>

            {/* Carina & Bronchi */}
            <path
              d="M 285 150 Q 260 170 230 200 L 245 210 Q 275 180 300 170 Z"
              fill="#CBD5E1"
              stroke="#64748B"
              strokeWidth="1.5"
            />
            <path
              d="M 315 150 Q 340 170 370 200 L 355 210 Q 325 180 300 170 Z"
              fill="#CBD5E1"
              stroke="#64748B"
              strokeWidth="1.5"
            />

            {/* Right Lung (Pulmo Dexter - 3 Lobes) */}
            <path
              d="M 260 160 
                 C 220 160 160 190 140 240 
                 C 120 290 120 370 140 420 
                 C 160 450 220 460 270 430 
                 C 280 390 280 270 260 160 Z"
              fill="url(#lung-right-grad)"
              stroke="#831843"
              strokeWidth="2.5"
              opacity="0.94"
            />
            {/* Horizontal Fissure */}
            <path d="M 130 290 Q 200 280 275 295" stroke="#701A75" strokeWidth="2" fill="none" opacity="0.6" />
            {/* Oblique Fissure */}
            <path d="M 170 230 Q 210 340 250 435" stroke="#701A75" strokeWidth="2" fill="none" opacity="0.6" />

            {/* Left Lung (Pulmo Sinister - 2 Lobes + Cardiac Notch) */}
            <path
              d="M 340 160 
                 C 380 160 440 190 460 240 
                 C 480 290 480 370 460 420 
                 C 440 450 380 460 330 430 
                 C 320 370 340 330 345 300 
                 C 350 270 330 250 320 240 
                 C 320 200 330 170 340 160 Z"
              fill="url(#lung-left-grad)"
              stroke="#831843"
              strokeWidth="2.5"
              opacity="0.94"
            />
            {/* Left Oblique Fissure */}
            <path d="M 430 230 Q 390 330 350 435" stroke="#701A75" strokeWidth="2" fill="none" opacity="0.6" />

            {/* Pulmonary Arteries (Blue deoxygenated branches into lungs) */}
            <g stroke="#0284C7" strokeWidth="2.5" fill="none" strokeLinecap="round">
              {/* Right branches */}
              <path d="M 285 200 Q 230 215 180 260" />
              <path d="M 230 215 Q 190 270 170 330" />
              <path d="M 210 240 Q 230 310 230 380" />
              {/* Left branches */}
              <path d="M 315 200 Q 370 215 420 260" />
              <path d="M 370 215 Q 410 270 430 330" />
              <path d="M 390 240 Q 370 310 370 380" />
            </g>

            {/* Pulmonary Veins (Red oxygenated branches returning) */}
            <g stroke="#E11D48" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.9">
              {/* Right return */}
              <path d="M 190 280 Q 235 250 285 235" />
              <path d="M 180 350 Q 230 310 280 250" />
              {/* Left return */}
              <path d="M 410 280 Q 365 250 315 235" />
              <path d="M 420 350 Q 370 310 320 250" />
            </g>

            {/* Fine Alveolar Capillary Mesh highlights */}
            <g stroke="#FDE047" strokeWidth="1" opacity="0.4" fill="none">
              <circle cx="170" cy="270" r="12" strokeDasharray="2,2" />
              <circle cx="160" cy="340" r="14" strokeDasharray="2,2" />
              <circle cx="430" cy="270" r="12" strokeDasharray="2,2" />
              <circle cx="440" cy="340" r="14" strokeDasharray="2,2" />
            </g>

            {/* Heart Silhouette Space in Mediastinum */}
            <path
              d="M 280 240 Q 300 220 320 240 Q 340 280 300 350 Q 270 280 280 240 Z"
              fill="#BE123C"
              opacity="0.18"
              stroke="#BE123C"
              strokeWidth="1.5"
              strokeDasharray="4,4"
            />
            <text x="300" y="285" fill="#BE123C" fontSize="10" fontWeight="bold" textAnchor="middle" opacity="0.7">
              Posisi Jantung
            </text>
            <text x="300" y="298" fill="#BE123C" fontSize="8" textAnchor="middle" opacity="0.6">
              (Mediastinum)
            </text>
          </svg>
        </motion.div>

        {/* Anatomical Pins */}
        {lungStructures.map((s) => {
          const isSelected = selected?.id === s.id
          return (
            <div
              key={s.id}
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
            >
              <button
                onClick={() => setSelected(isSelected ? null : s)}
                className="relative flex items-center justify-center p-2 focus:outline-none"
              >
                <span className="absolute inline-flex h-6 w-6 rounded-full bg-sky-400 opacity-60 animate-ping" />
                <span
                  className={`relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-white shadow-md transition-all ${
                    isSelected ? 'scale-125 ring-4 ring-sky-500/30 bg-sky-600' : 'bg-sky-500 group-hover:scale-110'
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                </span>
              </button>

              <div
                className={`pointer-events-none absolute left-1/2 top-full -translate-x-1/2 pt-1 transition-all duration-200 ${
                  isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                }`}
              >
                <div className="whitespace-nowrap rounded-md bg-slate-900/90 px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg backdrop-blur-sm">
                  {s.name}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected Information Card */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="mt-4 w-full max-w-xl rounded-2xl border border-slate-200/90 bg-white/95 p-5 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95 text-left"
          >
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3 dark:border-slate-800">
              <div>
                <span className="text-[11px] italic text-sky-600 dark:text-sky-400 font-serif">
                  {selected.latin}
                </span>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                  {selected.name}
                </h4>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕ Tutup
              </button>
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {selected.description}
            </p>
            <div className="mt-3 flex items-start gap-2 rounded-xl bg-sky-50/70 p-2.5 text-xs text-slate-700 dark:bg-sky-950/40 dark:text-slate-300">
              <Activity size={14} className="mt-0.5 flex-shrink-0 text-sky-600" />
              <span>
                <strong className="text-sky-900 dark:text-sky-200">Klinis & Fisiologi: </strong>
                {selected.clinicalNote}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!selected && (
        <p className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
          <Info size={13} className="text-sky-500" />
          Klik pada penanda untuk melihat struktur trakea, bronkus, lobus, dan difusi kapiler alveolus
        </p>
      )}
    </div>
  )
}
