import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, Activity, Droplet } from 'lucide-react'

export interface HeartStructure {
  id: string
  name: string
  latin: string
  type: 'artery' | 'vein' | 'chamber' | 'muscle'
  oxygenated: boolean
  x: number // percentage
  y: number // percentage
  description: string
  clinicalNote: string
}

export const heartStructures: HeartStructure[] = [
  {
    id: 'aorta',
    name: 'Aorta (Arkus Aorta)',
    latin: 'Arcus Aortae',
    type: 'artery',
    oxygenated: true,
    x: 55,
    y: 20,
    description: 'Arteri terbesar tubuh yang menerima darah kaya oksigen dari ventrikel kiri dan mendistribusikannya ke sirkulasi sistemik.',
    clinicalNote: 'Tekanan puncak sistolik normal berkisar 100-120 mmHg.',
  },
  {
    id: 'superior_vena_cava',
    name: 'Vena Kava Superior',
    latin: 'Vena Cava Superior',
    type: 'vein',
    oxygenated: false,
    x: 33,
    y: 28,
    description: 'Pembuluh vena besar yang membawa darah deoksigenasi dari kepala, leher, dada, dan ekstremitas atas ke atrium kanan.',
    clinicalNote: 'Aliran darah pasif menuju atrium kanan dengan tekanan rendah (0-5 mmHg).',
  },
  {
    id: 'pulmonary_trunk',
    name: 'Batang Pulmonalis',
    latin: 'Truncus Pulmonalis',
    type: 'artery',
    oxygenated: false,
    x: 62,
    y: 33,
    description: 'Menerima darah deoksigenasi dari ventrikel kanan dan bercabang menjadi arteri pulmonalis kanan dan kiri menuju paru-paru.',
    clinicalNote: 'Satu-satunya arteri dalam tubuh yang membawa darah deoksigenasi (miskin O2).',
  },
  {
    id: 'right_atrium',
    name: 'Atrium Kanan',
    latin: 'Atrium Dextrum',
    type: 'chamber',
    oxygenated: false,
    x: 32,
    y: 50,
    description: 'Ruang penerima darah kaya CO₂ dari vena kava superior, vena kava inferior, dan sinus koronarius.',
    clinicalNote: 'Terdapat nodus sinoatrial (SA node) sebagai pacu jantung alami tubuh.',
  },
  {
    id: 'left_atrium',
    name: 'Atrium Kiri',
    latin: 'Atrium Sinistrum',
    type: 'chamber',
    oxygenated: true,
    x: 68,
    y: 45,
    description: 'Menerima darah yang baru saja dioksigenasi dari paru-paru melalui empat vena pulmonalis.',
    clinicalNote: 'Dinding lebih tebal dibanding atrium kanan karena beban pengisian ventrikel kiri.',
  },
  {
    id: 'right_ventricle',
    name: 'Ventrikel Kanan',
    latin: 'Ventriculus Dexter',
    type: 'chamber',
    oxygenated: false,
    x: 43,
    y: 68,
    description: 'Memompa darah bertekanan rendah ke sirkulasi paru (pulmonal) melalui katup pulmonalis.',
    clinicalNote: 'Dinding ototnya sekitar 4-5 mm, cukup untuk mengatasi resistensi vaskular paru yang rendah.',
  },
  {
    id: 'left_ventricle',
    name: 'Ventrikel Kiri',
    latin: 'Ventriculus Sinister',
    type: 'chamber',
    oxygenated: true,
    x: 62,
    y: 72,
    description: 'Ruang pompa utama bertekanan tinggi yang memompa darah beroksigen ke seluruh jaringan organ tubuh.',
    clinicalNote: 'Miokardium ventrikel kiri paling tebal (10-15 mm) untuk menghasilkan tekanan sistemik.',
  },
  {
    id: 'coronary_arteries',
    name: 'Pembuluh Koroner',
    latin: 'Arteriae Coronariae',
    type: 'artery',
    oxygenated: true,
    x: 52,
    y: 57,
    description: 'Jaringan pembuluh darah halus yang menyuplai oksigen dan nutrisi langsung ke otot jantung (miokardium).',
    clinicalNote: 'Penyumbatan di cabang ini (LAD/RCA) menyebabkan infark miokard (serangan jantung).',
  },
]

export const heartStructuresInternal: HeartStructure[] = [
  {
    id: 'aorta_internal',
    name: 'Arkus Aorta',
    latin: 'Arcus Aortae',
    type: 'artery',
    oxygenated: true,
    x: 60,
    y: 13,
    description: 'Lengkung arteri utama berotot elastis yang menerima semburan darah kaya O₂ bertekanan tinggi (~120 mmHg) dari ventrikel kiri untuk didistribusikan ke seluruh tubuh.',
    clinicalNote: 'Mempercabangkan arteri brakiosefalika, karotis komunis sinistra, dan subklavia sinistra untuk perfusi tubuh atas dan ensefalon (otak).',
  },
  {
    id: 'superior_vena_cava_internal',
    name: 'Vena Kava Superior',
    latin: 'Vena Cava Superior',
    type: 'vein',
    oxygenated: false,
    x: 33.4,
    y: 20,
    description: 'Pembuluh balik besar yang mengalirkan darah deoksigenasi dari kepala, leher, rongga dada, dan ekstremitas atas langsung ke atrium kanan.',
    clinicalNote: 'Muara vena tanpa katup, mengalir pasif berdasarkan gradien tekanan intratoraks.',
  },
  {
    id: 'pulmonary_trunk_internal',
    name: 'Batang Pulmonalis',
    latin: 'Truncus Pulmonalis',
    type: 'artery',
    oxygenated: false,
    x: 52,
    y: 31,
    description: 'Pangkal pembuluh darah yang mengalirkan darah kaya CO₂ dari ventrikel kanan menuju kapiler alveolus kedua paru-paru.',
    clinicalNote: 'Dilengkapi katup semilunaris pulmonalis dengan 3 kuspis berbentuk bulan sabit.',
  },
  {
    id: 'right_atrium_internal',
    name: 'Atrium Kanan (Ruang)',
    latin: 'Cavitas Atrii Dextri',
    type: 'chamber',
    oxygenated: false,
    x: 34,
    y: 41,
    description: 'Ruang penerima darah vena sistemik. Dinding interiornya dihiasi otot pektinati dan menampung darah sebelum diteruskan ke ventrikel kanan.',
    clinicalNote: 'Terdapat nodus SA (pacu jantung) dan fossa ovalis sisa sirkulasi janin.',
  },
  {
    id: 'tricuspid_valve_internal',
    name: 'Katup Trikuspid & Korda',
    latin: 'Valvula Tricuspidalis & Chordae Tendineae',
    type: 'chamber',
    oxygenated: false,
    x: 42,
    y: 55,
    description: 'Katup tiga daun dengan tali-tali fibrosa kuat (korda tendinea) yang tertambat pada muskulus papilaris ventrikel kanan.',
    clinicalNote: 'Mencegah regurgitasi atau pembalikan arah aliran darah ke atrium kanan saat ventrikel berkontraksi (sistol).',
  },
  {
    id: 'right_ventricle_internal',
    name: 'Ventrikel Kanan (Kavitas)',
    latin: 'Cavitas Ventriculi Dextri',
    type: 'chamber',
    oxygenated: false,
    x: 39,
    y: 68,
    description: 'Rongga berdinding otot trabekula yang memompa darah bertekanan rendah ke dalam sirkuit mikrovaskular paru-paru.',
    clinicalNote: 'Ketebalan dinding miokardium sekitar 4-5 mm, cukup untuk menaklukkan resistensi vaskular paru yang rendah.',
  },
  {
    id: 'interventricular_septum',
    name: 'Septum Interventrikular',
    latin: 'Septum Interventriculare',
    type: 'muscle',
    oxygenated: true,
    x: 55,
    y: 78,
    description: 'Partisi tebal berotot yang memisahkan rongga ventrikel kanan dan kiri, menjaga pemisahan mutlak darah kaya O₂ dan kaya CO₂.',
    clinicalNote: 'Defek septum ventrikel (VSD) memicu percampuran darah dan beban volume sirkulasi berlebih.',
  },
  {
    id: 'left_atrium_internal',
    name: 'Atrium Kiri (Ruang)',
    latin: 'Cavitas Atrii Sinistri',
    type: 'chamber',
    oxygenated: true,
    x: 74,
    y: 41,
    description: 'Rongga bertekanan sedang yang menerima darah yang baru saja dioksigenasi dari paru-paru lewat empat muara vena pulmonalis.',
    clinicalNote: 'Stasis akibat gangguan irama (seperti fibrilasi atrium) rentan membentuk trombus bekuan darah.',
  },
  {
    id: 'mitral_valve_internal',
    name: 'Katup Mitral (Bikuspid)',
    latin: 'Valvula Mitralis (Bicuspidalis)',
    type: 'chamber',
    oxygenated: true,
    x: 64,
    y: 55,
    description: 'Katup dua daun berkekuatan mekanik tinggi yang menahan tekanan ejeksi masif ventrikel kiri dibantu korda tendinea kokoh.',
    clinicalNote: 'Insufisiensi katup mitral menyebabkan darah terdorong balik ke atrium kiri dan memicu kongesti paru.',
  },
  {
    id: 'left_ventricle_internal',
    name: 'Ventrikel Kiri & Miokardium',
    latin: 'Cavitas Ventriculi Sinistri & Myocardium',
    type: 'chamber',
    oxygenated: true,
    x: 70,
    y: 68,
    description: 'Kavitas pompa utama sirkulasi sistemik tubuh yang dikelilingi lapisan miokardium sangat tebal (10-15 mm) untuk memompa darah ke seluruh organ vital.',
    clinicalNote: 'Kekuatan ejeksi diukur dengan LVEF (normal 55-70%). Hipertensi kronis memicu hipertrofi ventrikel kiri (LVH).',
  },
]

interface AnatomicalHeartProps {
  interactive?: boolean
  showLabels?: boolean
  activeStructureId?: string | null
  onStructureSelect?: (structure: HeartStructure | null) => void
  size?: 'sm' | 'md' | 'lg'
}

export default function AnatomicalHeart({
  interactive = true,
  showLabels = true,
  activeStructureId,
  onStructureSelect,
  size = 'lg',
}: AnatomicalHeartProps) {
  const [selected, setSelected] = useState<HeartStructure | null>(null)
  const [viewMode, setViewMode] = useState<'surface' | 'cutaway'>('surface')
  const [imageError, setImageError] = useState(false)
  const [internalImageError, setInternalImageError] = useState(false)

  const activeStructures = viewMode === 'surface' ? heartStructures : heartStructuresInternal
  const active =
    activeStructures.find((s) => s.id === activeStructureId) ||
    (selected && activeStructures.some((s) => s.id === selected.id) ? selected : null)

  const handlePinClick = (structure: HeartStructure) => {
    const next = active?.id === structure.id ? null : structure
    setSelected(next)
    onStructureSelect?.(next)
  }

  const handleViewModeChange = (mode: 'surface' | 'cutaway') => {
    setViewMode(mode)
    setSelected(null)
    onStructureSelect?.(null)
  }

  const containerSizes = {
    sm: 'max-w-[280px] h-[300px]',
    md: 'max-w-[400px] h-[420px]',
    lg: 'max-w-[520px] h-[540px]',
  }

  return (
    <div className="relative flex flex-col items-center w-full">
      {/* View Mode Switcher */}
      <div className="mb-4 inline-flex items-center gap-1 rounded-full border border-slate-200/80 bg-white/90 p-1 text-xs font-semibold shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
        <button
          onClick={() => handleViewModeChange('surface')}
          className={`rounded-full px-3.5 py-1.5 transition-all ${
            viewMode === 'surface'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          Anatomi Luar (Anterior)
        </button>
        <button
          onClick={() => handleViewModeChange('cutaway')}
          className={`rounded-full px-3.5 py-1.5 transition-all ${
            viewMode === 'cutaway'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
          }`}
        >
          Potongan Ruang (Internal)
        </button>
      </div>

      {/* Main Heart Canvas Container */}
      <div className={`relative w-full ${containerSizes[size]} flex items-center justify-center select-none`}>
        {/* Subtle biological heartbeat pulsation */}
        <motion.div
          className="relative aspect-[500/550] h-full max-h-full max-w-full flex items-center justify-center"
          animate={{
            scale: [1, 1.025, 0.995, 1.015, 1],
          }}
          transition={{
            duration: 1.0,
            repeat: Infinity,
            times: [0, 0.15, 0.3, 0.45, 1],
            ease: 'easeInOut',
          }}
        >
          {viewMode === 'surface' ? (
            <div className="relative w-full h-full flex items-center justify-center">
              {!imageError ? (
                <img
                  src="/assets/heart_anatomical.jpg"
                  alt="Realistic Anatomical Human Heart - Cor Humanum"
                  onError={() => setImageError(true)}
                  className="w-auto h-[92%] max-w-full object-contain filter drop-shadow-[0_20px_35px_rgba(190,18,60,0.18)] rounded-3xl"
                />
              ) : (
                <RealisticHeartSVG activeId={active?.id} />
              )}
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <CutawayHeartSVG activeId={active?.id} />
            </div>
          )}

          {/* Interactive Anatomical Callout Pins */}
          {interactive &&
            activeStructures.map((structure) => {
              const isSelected = active?.id === structure.id
              return (
                <div
                  key={structure.id}
                  style={{
                    left: `${structure.x}%`,
                    top: `${structure.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                >
                  <button
                    onClick={() => handlePinClick(structure)}
                    className="relative flex items-center justify-center p-2 focus:outline-none"
                    aria-label={structure.name}
                  >
                    {/* Pulsing ring indicator */}
                    <span
                      className={`absolute inline-flex h-7 w-7 rounded-full opacity-60 animate-ping ${
                        structure.oxygenated ? 'bg-rose-500' : 'bg-sky-500'
                      }`}
                    />
                    {/* Pin dot */}
                    <span
                      className={`relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-white shadow-md transition-all duration-300 ${
                        isSelected
                          ? 'scale-125 ring-4 ring-rose-500/30'
                          : 'group-hover:scale-115'
                      } ${
                        structure.oxygenated
                          ? 'bg-gradient-to-br from-rose-500 to-red-700'
                          : 'bg-gradient-to-br from-sky-500 to-blue-700'
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                  </button>

                  {/* Desktop Hover Label */}
                  {showLabels && (
                    <div
                      className={`pointer-events-none absolute left-1/2 top-full -translate-x-1/2 pt-1 transition-all duration-200 ${
                        isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                      }`}
                    >
                      <div className="whitespace-nowrap rounded-md bg-slate-900/90 px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg backdrop-blur-sm">
                        {structure.name}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
        </motion.div>
      </div>

      {/* Floating Medical Inspection Panel */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            className="mt-4 w-full max-w-xl rounded-2xl border border-slate-200/90 bg-white/95 p-5 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95 text-left"
          >
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase ${
                      active.oxygenated
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                        : 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300'
                    }`}
                  >
                    <Droplet size={10} className="fill-current" />
                    {active.oxygenated ? 'Darah Beroksigen (O₂)' : 'Darah Deoksigenasi (CO₂)'}
                  </span>
                  <span className="text-[11px] italic text-slate-400 font-serif">
                    {active.latin}
                  </span>
                </div>
                <h4 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                  {active.name}
                </h4>
              </div>
              <button
                onClick={() => {
                  setSelected(null)
                  onStructureSelect?.(null)
                }}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕ Tutup
              </button>
            </div>

            <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {active.description}
            </p>

            <div className="mt-3 flex items-start gap-2 rounded-xl bg-slate-50 p-2.5 text-xs text-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
              <Activity size={14} className="mt-0.5 flex-shrink-0 text-rose-500" />
              <span>
                <strong className="text-slate-800 dark:text-slate-200">Relevansi Klinis: </strong>
                {active.clinicalNote}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!active && interactive && (
        <p className="mt-3 text-xs text-slate-400 flex items-center gap-1.5">
          <Info size={13} className="text-rose-500" />
          Klik pada pin anatomi untuk membaca struktur & fungsi sirkulasi darah
        </p>
      )}
    </div>
  )
}

// Highly realistic anatomical heart SVG representation (anterior) for fallback / custom rendering
function RealisticHeartSVG({ activeId }: { activeId?: string }) {
  return (
    <svg
      viewBox="0 0 500 550"
      className="w-full h-full max-h-[480px] object-contain"
      aria-label="Anatomical Heart Vector"
    >
      <defs>
        <radialGradient id="aorta-grad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#E11D48" />
          <stop offset="65%" stopColor="#BE123C" />
          <stop offset="100%" stopColor="#881337" />
        </radialGradient>
        <radialGradient id="vena-grad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="65%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </radialGradient>
        <radialGradient id="myo-grad" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#D9244A" />
          <stop offset="50%" stopColor="#B91C1C" />
          <stop offset="85%" stopColor="#7F1D1D" />
          <stop offset="100%" stopColor="#450A0A" />
        </radialGradient>
        <filter id="fleshy-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#881337" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Superior Vena Cava */}
      <path
        d="M 175 90 L 175 190 Q 185 220 205 230 L 225 210 L 225 90 Q 200 80 175 90 Z"
        fill="url(#vena-grad)"
        stroke="#0369A1"
        strokeWidth="2"
        opacity={activeId === 'superior_vena_cava' ? 1 : 0.92}
      />
      {/* Vena Cava Rim */}
      <ellipse cx="200" cy="90" rx="25" ry="8" fill="#38BDF8" opacity="0.8" />

      {/* Aorta Arch */}
      <path
        d="M 235 220 C 230 140 250 85 300 80 C 350 75 375 120 375 180 L 350 200 C 345 155 335 110 300 115 C 270 120 265 160 265 220 Z"
        fill="url(#aorta-grad)"
        stroke="#881337"
        strokeWidth="2.5"
        filter="url(#fleshy-shadow)"
      />
      {/* Brachiocephalic, Carotid, Subclavian Branches */}
      <path d="M 270 105 L 260 45 L 280 40 L 290 98 Z" fill="url(#aorta-grad)" />
      <path d="M 305 92 L 305 40 L 322 38 L 322 93 Z" fill="url(#aorta-grad)" />
      <path d="M 335 96 L 345 45 L 362 48 L 350 105 Z" fill="url(#aorta-grad)" />

      {/* Pulmonary Trunk */}
      <path
        d="M 260 230 C 265 170 295 150 350 160 L 360 190 C 315 180 295 200 290 250 Z"
        fill="url(#vena-grad)"
        stroke="#0284C7"
        strokeWidth="2"
      />

      {/* Main Myocardium Body (Ventricles & Atria) */}
      <path
        d="M 170 220 
           C 140 250 135 320 165 370 
           C 195 420 250 490 320 520 
           C 355 500 410 430 430 360 
           C 445 300 425 230 380 210 
           C 340 195 300 210 270 220 
           C 240 210 190 200 170 220 Z"
        fill="url(#myo-grad)"
        stroke="#7F1D1D"
        strokeWidth="3"
        filter="url(#fleshy-shadow)"
      />

      {/* Sulcus Interventricularis Anterior (Groove) */}
      <path
        d="M 290 240 Q 305 340 320 515"
        stroke="#450A0A"
        strokeWidth="3.5"
        fill="none"
        opacity="0.65"
      />

      {/* Coronary Arteries (Left Anterior Descending & Circumflex) */}
      <g stroke="#F43F5E" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path d="M 292 245 Q 300 310 305 370 Q 312 430 318 505" />
        <path d="M 298 290 Q 275 320 260 345" strokeWidth="1.8" />
        <path d="M 302 335 Q 285 365 275 400" strokeWidth="1.8" />
        <path d="M 308 385 Q 330 410 345 435" strokeWidth="1.8" />
        <path d="M 314 440 Q 330 460 338 480" strokeWidth="1.5" />
      </g>

      {/* Cardiac Veins (Cyan/Blue branching) */}
      <g stroke="#38BDF8" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.85">
        <path d="M 297 250 Q 308 320 312 380 Q 318 440 322 510" />
        <path d="M 304 315 Q 325 335 340 360" strokeWidth="1.5" />
        <path d="M 310 370 Q 295 400 288 425" strokeWidth="1.5" />
      </g>

      {/* Muscle Fiber Striations (Subtle biological texture) */}
      <path d="M 180 300 Q 230 330 280 340" stroke="#FFE4E6" strokeWidth="0.8" opacity="0.25" fill="none" />
      <path d="M 195 340 Q 240 370 290 380" stroke="#FFE4E6" strokeWidth="0.8" opacity="0.25" fill="none" />
      <path d="M 330 320 Q 380 340 415 360" stroke="#FFE4E6" strokeWidth="0.8" opacity="0.25" fill="none" />
      <path d="M 325 380 Q 365 400 395 420" stroke="#FFE4E6" strokeWidth="0.8" opacity="0.25" fill="none" />
    </svg>
  )
}

// Cutaway View showing internal chambers, septum, and valves
function CutawayHeartSVG({ activeId }: { activeId?: string }) {
  return (
    <svg
      viewBox="0 0 500 550"
      className="w-full h-full max-h-[480px] object-contain select-none"
      aria-label="Cutaway Anatomical Heart"
    >
      <defs>
        {/* Rich Myocardial Tissue Gradients */}
        <radialGradient id="cutaway-myo" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#BE123C" />
          <stop offset="45%" stopColor="#9F1239" />
          <stop offset="80%" stopColor="#881337" />
          <stop offset="100%" stopColor="#4C0519" />
        </radialGradient>

        <radialGradient id="cutaway-rv-cavity" cx="35%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#0284C7" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#075985" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#0C4A6E" stopOpacity="0.95" />
        </radialGradient>

        <radialGradient id="cutaway-lv-cavity" cx="45%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#9F1239" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#881337" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#4C0519" stopOpacity="0.95" />
        </radialGradient>

        <radialGradient id="cutaway-ra-cavity" cx="35%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#0284C7" stopOpacity="0.45" />
          <stop offset="75%" stopColor="#0369A1" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#075985" stopOpacity="0.9" />
        </radialGradient>

        <radialGradient id="cutaway-la-cavity" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#E11D48" stopOpacity="0.45" />
          <stop offset="75%" stopColor="#BE123C" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#881337" stopOpacity="0.9" />
        </radialGradient>

        {/* 3D Cylindrical Vessel Gradients */}
        <linearGradient id="aorta-arch-tube" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#881337" />
          <stop offset="25%" stopColor="#BE123C" />
          <stop offset="48%" stopColor="#FB7185" />
          <stop offset="68%" stopColor="#E11D48" />
          <stop offset="100%" stopColor="#4C0519" />
        </linearGradient>

        <linearGradient id="aorta-descending-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4C0519" />
          <stop offset="40%" stopColor="#881337" />
          <stop offset="70%" stopColor="#BE123C" />
          <stop offset="100%" stopColor="#4C0519" />
        </linearGradient>

        <linearGradient id="branch-artery-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#881337" />
          <stop offset="35%" stopColor="#E11D48" />
          <stop offset="65%" stopColor="#FDA4AF" />
          <stop offset="100%" stopColor="#4C0519" />
        </linearGradient>

        <linearGradient id="cava-cylindrical-vol" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#075985" />
          <stop offset="30%" stopColor="#0284C7" />
          <stop offset="55%" stopColor="#7DD3FC" />
          <stop offset="80%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0C4A6E" />
        </linearGradient>

        <linearGradient id="pulmonary-stem-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#075985" />
          <stop offset="30%" stopColor="#0284C7" />
          <stop offset="55%" stopColor="#38BDF8" />
          <stop offset="85%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#0C4A6E" />
        </linearGradient>

        <linearGradient id="pulmonary-branch-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="50%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>

        <linearGradient id="myo-outer-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDA4AF" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#F43F5E" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#9F1239" stopOpacity="0.1" />
        </linearGradient>

        <filter id="aorta-glow-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" mode="over" />
        </filter>

        <linearGradient id="cutaway-aorta-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E11D48" />
          <stop offset="50%" stopColor="#BE123C" />
          <stop offset="100%" stopColor="#881337" />
        </linearGradient>

        <linearGradient id="cutaway-cava-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>

        {/* Anatomical Muscle Texture & Depth Filter */}
        <filter id="myo-depth" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.3" />
        </filter>

        <filter id="chamber-inner-shadow">
          <feOffset dx="0" dy="3" />
          <feGaussianBlur stdDeviation="3" result="offset-blur" />
          <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
          <feFlood floodColor="#000000" floodOpacity="0.45" result="color" />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
          <feComposite operator="over" in="shadow" in2="SourceGraphic" />
        </filter>

        <marker id="arrow-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#38BDF8" />
        </marker>
        <marker id="arrow-red" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#FDA4AF" />
        </marker>
      </defs>

      {/* ===== 1. GREAT VESSELS AT THE BASE OF THE HEART (ORGANIC 3D TUBES) ===== */}
      <g id="great-vessels-cutaway">
        {/* Superior Vena Cava (Vena Kava Superior) - 3D Anatomical Cylindrical Tube */}
        <g id="vessel-svc">
          <path
            d="M 152 75 
               C 152 115 150 155 148 195 
               L 178 195 
               C 180 155 182 115 182 75 Z"
            fill="url(#cava-cylindrical-vol)"
            stroke="#0369A1"
            strokeWidth="1.5"
          />
          {/* Specular Cylindrical Ridge */}
          <path
            d="M 163 77 L 160 192"
            stroke="#BAE6FD"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.8"
          />
          {/* Cut Lumen Orifice at Top */}
          <ellipse cx="167" cy="75" rx="15" ry="5.5" fill="#0C4A6E" stroke="#38BDF8" strokeWidth="1.2" />
          <ellipse cx="167" cy="75" rx="11" ry="3.5" fill="#0369A1" opacity="0.85" />
        </g>

        {/* Descending Thoracic Aorta (Posterior to left atrium & arch) */}
        <path
          d="M 360 88 
             C 375 110 395 150 395 210 
             L 364 210 
             C 364 165 348 125 334 95 Z"
          fill="url(#aorta-descending-grad)"
          stroke="#4C0519"
          strokeWidth="1.2"
          opacity="0.95"
        />

        {/* Main Arch of Aorta (Arkus Aorta) - 3D Tubular Muscle Architecture */}
        <g id="vessel-aorta-arch">
          <path
            d="M 226 195 
               C 222 135 240 85 272 65 
               C 310 42 355 52 382 92 
               C 392 108 396 130 395 155
               L 364 150 
               C 365 132 360 115 352 102 
               C 334 76 302 70 278 86 
               C 258 100 252 135 254 195 Z"
            fill="url(#aorta-arch-tube)"
            stroke="#4C0519"
            strokeWidth="1.8"
          />
          {/* Specular Ridge Highlight */}
          <path
            d="M 240 160 C 238 125 250 88 278 72 C 308 55 342 62 366 94"
            fill="none"
            stroke="#FDA4AF"
            strokeWidth="3.2"
            strokeLinecap="round"
            opacity="0.75"
            filter="url(#aorta-glow-soft)"
          />

          {/* 3 Supra-Aortic Branches (Branching Arteries with Natural Curvature) */}
          {/* 1. Truncus Brachiocephalicus */}
          <g id="branch-brachiocephalic">
            <path
              d="M 264 78 
                 C 264 68 258 55 252 38 
                 L 267 36 
                 C 274 54 280 66 282 72 Z"
              fill="url(#branch-artery-grad)"
              stroke="#4C0519"
              strokeWidth="1.2"
            />
            <path d="M 260 72 C 260 58 257 48 254 39" stroke="#FECDD3" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <ellipse cx="259.5" cy="37" rx="7.5" ry="3" fill="#881337" stroke="#FDA4AF" strokeWidth="1" />
            <ellipse cx="259.5" cy="37" rx="5" ry="1.8" fill="#4C0519" />
          </g>

          {/* 2. Arteria Carotis Communis Sinistra */}
          <g id="branch-carotid">
            <path
              d="M 302 65 
                 C 303 55 304 48 304 35 
                 L 316 35 
                 C 316 48 316 56 317 62 Z"
              fill="url(#branch-artery-grad)"
              stroke="#4C0519"
              strokeWidth="1.2"
            />
            <path d="M 308 61 L 308 37" stroke="#FECDD3" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
            <ellipse cx="310" cy="35" rx="6" ry="2.6" fill="#881337" stroke="#FDA4AF" strokeWidth="1" />
            <ellipse cx="310" cy="35" rx="4" ry="1.6" fill="#4C0519" />
          </g>

          {/* 3. Arteria Subclavia Sinistra */}
          <g id="branch-subclavian">
            <path
              d="M 338 68 
                 C 342 56 348 48 355 38 
                 L 367 42 
                 C 359 52 353 62 349 74 Z"
              fill="url(#branch-artery-grad)"
              stroke="#4C0519"
              strokeWidth="1.2"
            />
            <path d="M 345 68 C 348 57 353 50 358 42" stroke="#FECDD3" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
            <ellipse cx="361" cy="40" rx="6.5" ry="2.8" transform="rotate(18 361 40)" fill="#881337" stroke="#FDA4AF" strokeWidth="1" />
            <ellipse cx="361" cy="40" rx="4.2" ry="1.7" transform="rotate(18 361 40)" fill="#4C0519" />
          </g>
        </g>

        {/* Pulmonary Trunk Bifurcation & Main Stem (Batang Pulmonalis) */}
        <g id="vessel-pulmonary-trunk">
          {/* Right & Left Pulmonary Artery Branches */}
          <path
            d="M 235 152 
               C 215 142 195 132 178 130 
               L 178 148 
               C 194 148 212 155 228 165 Z"
            fill="url(#pulmonary-branch-grad)"
            stroke="#0C4A6E"
            strokeWidth="1.2"
          />
          <path
            d="M 275 162 
               C 292 150 315 138 335 136 
               L 335 154 
               C 318 155 300 162 284 172 Z"
            fill="url(#pulmonary-branch-grad)"
            stroke="#0C4A6E"
            strokeWidth="1.2"
          />
          {/* Main Anterior Pulmonary Trunk Stem */}
          <path
            d="M 238 208 
               C 236 178 245 158 260 152 
               C 275 158 284 178 282 208 Z"
            fill="url(#pulmonary-stem-grad)"
            stroke="#0369A1"
            strokeWidth="1.5"
          />
          {/* Pulmonary Specular Light */}
          <path
            d="M 258 158 C 256 175 256 195 258 205"
            stroke="#7DD3FC"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />
        </g>
      </g>

      {/* ===== 2. REALISTIC MUSCULAR MYOCARDIUM PROFILE (COR HUMANUM CROSS-SECTION) ===== */}
      <g filter="url(#myo-depth)">
        {/* Outer Myocardial Shell - True Anatomical Cardiac Silhouette */}
        {/* Features: Asymmetrical contours, anatomical apex pointing to lower-left (viewer's right),
            wider muscular base without the cartoon love-heart cleft, subtle muscular wavy undulations */}
        <path
          d="M 140 188 
             C 120 205 112 240 115 272 
             C 118 296 126 312 128 328 
             C 130 352 136 382 150 412 
             C 168 448 198 480 236 502 
             C 272 522 308 532 334 532 
             C 348 532 358 526 364 515 
             C 388 478 424 435 442 388 
             C 455 352 458 318 452 285 
             C 446 250 432 222 414 202 
             C 392 178 358 178 325 180 
             C 285 182 245 184 210 185 
             C 175 186 152 182 140 188 Z"
          fill="url(#cutaway-myo)"
          stroke="#4C0519"
          strokeWidth="3.2"
        />

        {/* Anatomical Muscle Layer Shading: Epicardium Rim & Muscular Bulk Highlight */}
        <path
          d="M 142 195 
             C 125 212 118 245 120 274 
             C 124 308 135 348 152 388 
             C 172 430 208 472 248 496 
             C 285 518 318 526 335 526 
             C 346 526 354 520 360 510 
             C 382 472 418 428 435 382 
             C 448 346 450 314 445 282 
             C 440 252 426 226 410 208"
          fill="none"
          stroke="url(#myo-outer-sheen)"
          strokeWidth="2.5"
          opacity="0.6"
        />

        {/* Trabeculae Carneae & Muscular Wall Texturing */}
        <g stroke="#7F1D1D" strokeWidth="2.2" fill="none" opacity="0.45" strokeLinecap="round">
          <path d="M 132 335 C 145 355 160 378 175 402" />
          <path d="M 146 385 C 165 410 190 438 215 460" />
          <path d="M 438 315 C 420 355 402 400 384 442" />
          <path d="M 418 385 C 395 432 368 475 338 510" />
          <path d="M 235 488 C 265 510 295 522 325 525" stroke="#9F1239" strokeWidth="1.8" />
        </g>
      </g>

      {/* ===== 3. INTERNAL CHAMBERS (4 RUANG JANTUNG ANATOMIS) ===== */}

      {/* Right Atrium (Atrium Dextrum) */}
      <g id="chamber-ra">
        <path
          d="M 145 200 
             C 130 225 132 265 155 285 
             C 180 295 215 290 230 270 
             C 238 245 230 215 210 200 
             C 185 192 160 192 145 200 Z"
          fill="url(#cutaway-ra-cavity)"
          stroke={activeId === 'right_atrium' ? '#FFFFFF' : '#38BDF8'}
          strokeWidth={activeId === 'right_atrium' ? '3' : '1.5'}
          filter="url(#chamber-inner-shadow)"
        />
        {/* Fossa Ovalis Impression */}
        <ellipse cx="205" cy="245" rx="8" ry="12" fill="#0C4A6E" opacity="0.6" stroke="#0284C7" strokeWidth="1" />
        {/* Chamber Label Plaque (positioned cleanly below pin) */}
        <g transform="translate(182, 268)">
          <rect x="-42" y="-10" width="84" height="20" rx="6" fill="#075985" fillOpacity="0.88" stroke="#38BDF8" strokeWidth="0.8" />
          <text x="0" y="4" fill="#F0F9FF" fontSize="11" fontWeight="bold" textAnchor="middle">
            Atrium Kanan
          </text>
        </g>
      </g>

      {/* Left Atrium (Atrium Sinistrum) */}
      <g id="chamber-la">
        <path
          d="M 310 198 
             C 300 225 305 255 320 275 
             C 345 292 385 290 405 268 
             C 418 245 415 220 395 202 
             C 370 190 335 190 310 198 Z"
          fill="url(#cutaway-la-cavity)"
          stroke={activeId === 'left_atrium' ? '#FFFFFF' : '#FB7185'}
          strokeWidth={activeId === 'left_atrium' ? '3' : '1.5'}
          filter="url(#chamber-inner-shadow)"
        />
        {/* Pulmonary veins inlet orifices */}
        <circle cx="390" cy="225" r="5" fill="#4C0519" stroke="#E11D48" strokeWidth="1" />
        <circle cx="395" cy="245" r="5" fill="#4C0519" stroke="#E11D48" strokeWidth="1" />
        {/* Chamber Label Plaque (positioned cleanly below pin) */}
        <g transform="translate(358, 268)">
          <rect x="-38" y="-10" width="76" height="20" rx="6" fill="#881337" fillOpacity="0.88" stroke="#FDA4AF" strokeWidth="0.8" />
          <text x="0" y="4" fill="#FFF1F2" fontSize="11" fontWeight="bold" textAnchor="middle">
            Atrium Kiri
          </text>
        </g>
      </g>

      {/* Right Ventricle (Ventriculus Dexter) */}
      <g id="chamber-rv">
        <path
          d="M 152 305 
             C 140 345 150 400 185 435 
             C 215 460 245 470 252 470 
             C 255 425 252 365 242 305 
             C 210 300 178 298 152 305 Z"
          fill="url(#cutaway-rv-cavity)"
          stroke={activeId === 'right_ventricle' ? '#FFFFFF' : '#38BDF8'}
          strokeWidth={activeId === 'right_ventricle' ? '3' : '2'}
          filter="url(#chamber-inner-shadow)"
        />
        {/* Label Plaque placed at lower apex cavity away from pin at y:374 */}
        <g transform="translate(195, 424)">
          <rect x="-48" y="-11" width="96" height="22" rx="6" fill="#0C4A6E" fillOpacity="0.9" stroke="#38BDF8" strokeWidth="0.8" />
          <text x="0" y="4.5" fill="#F0F9FF" fontSize="11.5" fontWeight="bold" textAnchor="middle">
            Ventrikel Kanan
          </text>
        </g>
      </g>

      {/* Left Ventricle (Ventriculus Sinister - Conical Thick Cavity) */}
      <g id="chamber-lv">
        <path
          d="M 285 305 
             C 292 360 298 425 320 495 
             C 345 480 395 425 405 365 
             C 410 325 398 305 375 305 
             C 345 302 315 302 285 305 Z"
          fill="url(#cutaway-lv-cavity)"
          stroke={activeId === 'left_ventricle' ? '#FFFFFF' : '#F43F5E'}
          strokeWidth={activeId === 'left_ventricle' ? '3' : '2'}
          filter="url(#chamber-inner-shadow)"
        />
        {/* Label Plaque placed at lower cavity away from pin at y:374 */}
        <g transform="translate(352, 420)">
          <rect x="-56" y="-16" width="112" height="32" rx="7" fill="#4C0519" fillOpacity="0.92" stroke="#FB7185" strokeWidth="0.8" />
          <text x="0" y="-1" fill="#FFF1F2" fontSize="11.5" fontWeight="bold" textAnchor="middle">
            Ventrikel Kiri
          </text>
          <text x="0" y="11" fill="#FDA4AF" fontSize="8" fontWeight="medium" textAnchor="middle">
            (Dinding Otot 3x Tebal)
          </text>
        </g>
      </g>

      {/* ===== 4. SEPTUM INTERVENTRIKULAR (MUSCULAR DIVIDING WALL) ===== */}
      <g id="septum-interventrikulare">
        {/* Anatomical curved muscular septum separating RV and LV */}
        <path
          d="M 248 300 
             Q 256 385 278 480 
             L 305 485 
             Q 288 385 280 300 Z"
          fill="#881337"
          stroke="#4C0519"
          strokeWidth="2"
        />
        {/* Muscular fiber striations */}
        <path d="M 258 335 Q 268 340 274 338" stroke="#BE123C" strokeWidth="1.5" fill="none" opacity="0.7" />
        <path d="M 262 385 Q 272 390 278 388" stroke="#BE123C" strokeWidth="1.5" fill="none" opacity="0.7" />
        <path d="M 268 435 Q 278 440 286 438" stroke="#BE123C" strokeWidth="1.5" fill="none" opacity="0.7" />

        {/* Septum Label positioned at upper/mid septum away from pin at y:430 */}
        <text
          x="272"
          y="355"
          fill="#FFE4E6"
          fontSize="9.5"
          fontWeight="bold"
          transform="rotate(-82 272 355)"
          textAnchor="middle"
          letterSpacing="0.4"
        >
          Septum Interventrikular
        </text>
      </g>

      {/* ===== 5. HEART VALVES & CHORDAE TENDINEAE ===== */}

      {/* Tricuspid Valve (Katup Trikuspid - Antara RA dan RV) */}
      <g id="valva-tricuspidalis">
        {/* Fibrous Annulus & Valve Leaflets */}
        <path d="M 165 298 Q 192 308 225 298" stroke="#FFFFFF" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* Delicate Chordae Tendineae (Tali Tendon Halus) */}
        <path d="M 178 304 L 175 330 M 188 306 L 190 334 M 205 306 L 210 334" stroke="#F8FAFC" strokeWidth="1.2" strokeDasharray="2 1.5" opacity="0.9" />
        {/* Papillary Muscles (Mm. Papillares) */}
        <ellipse cx="175" cy="334" rx="4.5" ry="7" fill="#7F1D1D" stroke="#4C0519" strokeWidth="1" />
        <ellipse cx="208" cy="336" rx="4.5" ry="7" fill="#7F1D1D" stroke="#4C0519" strokeWidth="1" />
        
        {/* Label Plaque placed to lateral side */}
        <g transform="translate(170, 318)">
          <rect x="-38" y="-9" width="76" height="18" rx="5" fill="#0C4A6E" fillOpacity="0.88" stroke="#7DD3FC" strokeWidth="0.8" />
          <text x="0" y="3.5" fill="#E0F2FE" fontSize="9" fontWeight="bold" textAnchor="middle">
            Katup Trikuspid
          </text>
        </g>
      </g>

      {/* Bicuspid / Mitral Valve (Katup Mitral - Antara LA dan LV) */}
      <g id="valva-mitralis">
        {/* Fibrous Annulus & Valve Leaflets */}
        <path d="M 315 298 Q 345 308 380 298" stroke="#FFFFFF" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* Delicate Chordae Tendineae */}
        <path d="M 330 305 L 332 335 M 345 307 L 348 338 M 365 305 L 362 335" stroke="#F8FAFC" strokeWidth="1.2" strokeDasharray="2 1.5" opacity="0.9" />
        {/* Robust Left Ventricle Papillary Muscles */}
        <ellipse cx="333" cy="338" rx="5.5" ry="8" fill="#7F1D1D" stroke="#4C0519" strokeWidth="1" />
        <ellipse cx="362" cy="338" rx="5.5" ry="8" fill="#7F1D1D" stroke="#4C0519" strokeWidth="1" />

        {/* Label Plaque placed to lateral side */}
        <g transform="translate(372, 318)">
          <rect x="-34" y="-9" width="68" height="18" rx="5" fill="#881337" fillOpacity="0.88" stroke="#FDA4AF" strokeWidth="0.8" />
          <text x="0" y="3.5" fill="#FFE4E6" fontSize="9" fontWeight="bold" textAnchor="middle">
            Katup Mitral
          </text>
        </g>
      </g>

      {/* ===== 6. HEMODYNAMIC FLOW ARROWS (Curved around labels) ===== */}
      <g stroke="#38BDF8" strokeWidth="2.5" fill="none" markerEnd="url(#arrow-blue)" opacity="0.85">
        <path d="M 216 248 Q 225 285 218 340" />
      </g>
      <g stroke="#FDA4AF" strokeWidth="2.5" fill="none" markerEnd="url(#arrow-red)" opacity="0.85">
        <path d="M 326 248 Q 318 285 324 340" />
      </g>
    </svg>
  )
}
