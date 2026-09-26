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
    x: 48,
    y: 15,
    description: 'Lengkung arteri utama berotot elastis yang menerima semburan darah kaya O₂ bertekanan tinggi (~120 mmHg) dari ventrikel kiri untuk didistribusikan ke seluruh tubuh.',
    clinicalNote: 'Mempercabangkan arteri brakiosefalika, karotis komunis sinistra, dan subklavia sinistra untuk perfusi tubuh atas dan ensefalon (otak).',
  },
  {
    id: 'superior_vena_cava_internal',
    name: 'Vena Kava Superior',
    latin: 'Vena Cava Superior',
    type: 'vein',
    oxygenated: false,
    x: 32,
    y: 18,
    description: 'Pembuluh balik besar yang mengalirkan darah deoksigenasi dari kepala, leher, rongga dada, dan ekstremitas atas langsung ke atrium kanan.',
    clinicalNote: 'Muara vena tanpa katup, mengalir pasif berdasarkan gradien tekanan intratoraks.',
  },
  {
    id: 'pulmonary_trunk_internal',
    name: 'Batang Pulmonalis',
    latin: 'Truncus Pulmonalis',
    type: 'artery',
    oxygenated: false,
    x: 62,
    y: 29,
    description: 'Pangkal pembuluh darah yang mengalirkan darah kaya CO₂ dari ventrikel kanan menuju kapiler alveolus kedua paru-paru.',
    clinicalNote: 'Dilengkapi katup semilunaris pulmonalis dengan 3 kuspis berbentuk bulan sabit.',
  },
  {
    id: 'right_atrium_internal',
    name: 'Atrium Kanan (Ruang)',
    latin: 'Cavitas Atrii Dextri',
    type: 'chamber',
    oxygenated: false,
    x: 30,
    y: 46,
    description: 'Ruang penerima darah vena sistemik. Dinding interiornya dihiasi otot pektinati dan menampung darah sebelum diteruskan ke ventrikel kanan.',
    clinicalNote: 'Terdapat nodus SA (pacu jantung) dan fossa ovalis sisa sirkulasi janin.',
  },
  {
    id: 'tricuspid_valve_internal',
    name: 'Katup Trikuspid & Korda',
    latin: 'Valvula Tricuspidalis & Chordae Tendineae',
    type: 'chamber',
    oxygenated: false,
    x: 37,
    y: 56,
    description: 'Katup tiga daun dengan tali-tali fibrosa kuat (korda tendinea) yang tertambat pada muskulus papilaris ventrikel kanan.',
    clinicalNote: 'Mencegah regurgitasi atau pembalikan arah aliran darah ke atrium kanan saat ventrikel berkontraksi (sistol).',
  },
  {
    id: 'right_ventricle_internal',
    name: 'Ventrikel Kanan (Kavitas)',
    latin: 'Cavitas Ventriculi Dextri',
    type: 'chamber',
    oxygenated: false,
    x: 42,
    y: 69,
    description: 'Rongga berdinding otot trabekula yang memompa darah bertekanan rendah ke dalam sirkuit mikrovaskular paru-paru.',
    clinicalNote: 'Ketebalan dinding miokardium sekitar 4-5 mm, cukup untuk menaklukkan resistensi vaskular paru yang rendah.',
  },
  {
    id: 'interventricular_septum',
    name: 'Septum Interventrikular',
    latin: 'Septum Interventriculare',
    type: 'muscle',
    oxygenated: true,
    x: 53,
    y: 71,
    description: 'Partisi tebal berotot yang memisahkan rongga ventrikel kanan dan kiri, menjaga pemisahan mutlak darah kaya O₂ dan kaya CO₂.',
    clinicalNote: 'Defek septum ventrikel (VSD) memicu percampuran darah dan beban volume sirkulasi berlebih.',
  },
  {
    id: 'left_atrium_internal',
    name: 'Atrium Kiri (Ruang)',
    latin: 'Cavitas Atrii Sinistri',
    type: 'chamber',
    oxygenated: true,
    x: 64,
    y: 45,
    description: 'Rongga bertekanan sedang yang menerima darah yang baru saja dioksigenasi dari paru-paru lewat empat muara vena pulmonalis.',
    clinicalNote: 'Stasis akibat gangguan irama (seperti fibrilasi atrium) rentan membentuk trombus bekuan darah.',
  },
  {
    id: 'mitral_valve_internal',
    name: 'Katup Mitral (Bikuspid)',
    latin: 'Valvula Mitralis (Bicuspidalis)',
    type: 'chamber',
    oxygenated: true,
    x: 60,
    y: 54,
    description: 'Katup dua daun berkekuatan mekanik tinggi yang menahan tekanan ejeksi masif ventrikel kiri dibantu korda tendinea kokoh.',
    clinicalNote: 'Insufisiensi katup mitral menyebabkan darah terdorong balik ke atrium kiri dan memicu kongesti paru.',
  },
  {
    id: 'left_ventricle_internal',
    name: 'Ventrikel Kiri & Miokardium',
    latin: 'Cavitas Ventriculi Sinistri & Myocardium',
    type: 'chamber',
    oxygenated: true,
    x: 66,
    y: 73,
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
          className="relative w-full h-full flex items-center justify-center"
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

      {/* ===== 1. GREAT VESSELS AT THE BASE OF THE HEART ===== */}
      <g id="great-vessels-cutaway">
        {/* Superior Vena Cava entering Right Atrium */}
        <path
          d="M 168 85 L 168 185"
          fill="none"
          stroke="url(#cutaway-cava-grad)"
          strokeWidth="24"
          strokeLinecap="round"
        />
        <ellipse cx="168" cy="88" rx="12" ry="4.5" fill="#38BDF8" opacity="0.75" />

        {/* Arch of Aorta with 3 classic branches */}
        <path
          d="M 235 180 C 230 95 275 75 325 75 C 375 75 390 120 390 190"
          fill="none"
          stroke="url(#cutaway-aorta-grad)"
          strokeWidth="32"
          strokeLinecap="round"
        />
        {/* 3 Supra-aortic arterial branches: Brachiocephalic, Left Common Carotid, Left Subclavian */}
        <path d="M 270 85 L 260 48" stroke="#BE123C" strokeWidth="10" strokeLinecap="round" />
        <path d="M 305 76 L 305 45" stroke="#BE123C" strokeWidth="9" strokeLinecap="round" />
        <path d="M 345 82 L 355 48" stroke="#BE123C" strokeWidth="8" strokeLinecap="round" />

        {/* Pulmonary Trunk bifurcation root */}
        <path
          d="M 260 195 Q 248 145 205 125 M 260 195 Q 275 145 320 135"
          stroke="#0284C7"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* ===== 2. REALISTIC MUSCULAR MYOCARDIUM PROFILE (COR HUMANUM CROSS-SECTION) ===== */}
      <g filter="url(#myo-depth)">
        {/* Outer Myocardial Shell - True Anatomical Cardiac Silhouette (Apex at lower left of organ = viewer's right) */}
        <path
          d="M 150 185 
             C 115 210 110 270 125 330 
             C 142 395 185 450 240 485 
             C 285 515 325 530 348 528 
             C 382 505 435 440 448 360 
             C 458 290 425 215 385 190 
             C 335 178 280 185 240 192 
             C 195 182 165 175 150 185 Z"
          fill="url(#cutaway-myo)"
          stroke="#4C0519"
          strokeWidth="3"
        />

        {/* Trabeculae Carneae & Muscular Wall Texturing */}
        <g stroke="#7F1D1D" strokeWidth="2.5" fill="none" opacity="0.4">
          <path d="M 135 340 Q 155 365 170 395" />
          <path d="M 148 385 Q 170 415 195 440" />
          <path d="M 430 330 Q 405 375 390 425" />
          <path d="M 415 390 Q 385 445 355 490" />
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
        <text x="185" y="248" fill="#E0F2FE" fontSize="13" fontWeight="bold" textAnchor="middle">
          Atrium Kanan
        </text>
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
        <text x="355" y="248" fill="#FFE4E6" fontSize="13" fontWeight="bold" textAnchor="middle">
          Atrium Kiri
        </text>
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
        <text x="200" y="395" fill="#E0F2FE" fontSize="14" fontWeight="bold" textAnchor="middle">
          Ventrikel Kanan
        </text>
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
        <text x="345" y="390" fill="#FFF1F2" fontSize="14" fontWeight="bold" textAnchor="middle">
          Ventrikel Kiri
        </text>
        <text x="345" y="412" fill="#FDA4AF" fontSize="10.5" fontWeight="semibold" textAnchor="middle">
          (Dinding Otot 3x Lebih Tebal)
        </text>
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

        <text
          x="272"
          y="405"
          fill="#FECDD3"
          fontSize="10"
          fontWeight="bold"
          transform="rotate(-82 272 405)"
          textAnchor="middle"
          letterSpacing="0.5"
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
        
        <text x="195" y="322" fill="#E2E8F0" fontSize="10.5" fontWeight="bold" textAnchor="middle" className="drop-shadow">
          Katup Trikuspid
        </text>
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

        <text x="350" y="322" fill="#E2E8F0" fontSize="10.5" fontWeight="bold" textAnchor="middle" className="drop-shadow">
          Katup Mitral
        </text>
      </g>

      {/* ===== 6. HEMODYNAMIC FLOW ARROWS ===== */}
      <g stroke="#38BDF8" strokeWidth="3" fill="none" markerEnd="url(#arrow-blue)">
        <path d="M 195 262 Q 200 288 200 348" />
      </g>
      <g stroke="#FDA4AF" strokeWidth="3" fill="none" markerEnd="url(#arrow-red)">
        <path d="M 355 262 Q 350 288 348 348" />
      </g>
    </svg>
  )
}
