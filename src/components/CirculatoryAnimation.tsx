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
  description: string
  position: { x: number; y: number }
}

const bloodParticles: BloodParticle[] = [
  // Deoxygenated (blue) - Vena kava ke jantung dan paru-paru
  {
    id: 'blue-1',
    type: 'deoxygenated',
    path: 'M 50 400 Q 150 350 200 250 Q 250 150 300 100',
    duration: 12,
    delay: 0,
  },
  {
    id: 'blue-2',
    type: 'deoxygenated',
    path: 'M 50 420 Q 150 370 200 270 Q 250 170 300 100',
    duration: 12,
    delay: 2,
  },
  {
    id: 'blue-3',
    type: 'deoxygenated',
    path: 'M 50 440 Q 150 390 200 290 Q 250 190 300 100',
    duration: 12,
    delay: 4,
  },
  // Oxygenated (red) - Paru-paru ke jantung dan tubuh
  {
    id: 'red-1',
    type: 'oxygenated',
    path: 'M 300 100 Q 250 150 200 250 Q 150 350 50 400',
    duration: 12,
    delay: 6,
  },
  {
    id: 'red-2',
    type: 'oxygenated',
    path: 'M 300 100 Q 250 170 200 270 Q 150 370 50 420',
    duration: 12,
    delay: 8,
  },
  {
    id: 'red-3',
    type: 'oxygenated',
    path: 'M 300 100 Q 250 190 200 290 Q 150 390 50 440',
    duration: 12,
    delay: 10,
  },
]

const heartbeatSteps = [
  {
    number: 1,
    title: 'Darah Miskin Oksigen Masuk',
    description: 'Darah dari tubuh yang kaya CO₂ masuk ke atrium kanan melalui vena kava',
    color: '#1E88E5',
  },
  {
    number: 2,
    title: 'Pompa ke Ventrikel Kanan',
    description: 'Atrium kanan berkontraksi, mendorong darah ke ventrikel kanan',
    color: '#0D47A1',
  },
  {
    number: 3,
    title: 'Menuju Paru-Paru',
    description: 'Ventrikel kanan berkontraksi, darah dipompa ke paru-paru via arteri pulmonari',
    color: '#1E88E5',
  },
  {
    number: 4,
    title: 'Pertukaran Gas',
    description: 'Di paru-paru, CO₂ dilepas dan O₂ diserap. Darah menjadi kaya oksigen',
    color: '#FF6B6B',
  },
  {
    number: 5,
    title: 'Kembali dari Paru-Paru',
    description: 'Darah kaya oksigen kembali ke atrium kiri melalui vena pulmonari',
    color: '#E53935',
  },
  {
    number: 6,
    title: 'Pompa ke Ventrikel Kiri',
    description: 'Atrium kiri berkontraksi, mendorong darah ke ventrikel kiri',
    color: '#E53935',
  },
  {
    number: 7,
    title: 'Distribusi ke Seluruh Tubuh',
    description: 'Ventrikel kiri berkontraksi dengan kuat, darah keluar via aorta ke seluruh tubuh',
    color: '#E53935',
  },
  {
    number: 8,
    title: 'Sirkulasi Selesai',
    description: 'Di jaringan tubuh, O₂ dilepas ke sel dan darah mengumpulkan CO₂ lagi',
    color: '#1E88E5',
  },
]

export default function CirculatoryAnimation() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [popup, setPopup] = useState<PopupDetail | null>(null)
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const svgRef = useRef<SVGSVGElement>(null)

  // Auto-cycle through steps when animation plays
  useEffect(() => {
    if (!isPlaying) return
    
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % heartbeatSteps.length)
    }, 1500)

    return () => clearInterval(stepInterval)
  }, [isPlaying])

  const handleReset = () => {
    setActiveStep(0)
    setIsPlaying(true)
  }

  const showPopup = (title: string, description: string, x: number, y: number) => {
    setPopup({ title, description, position: { x, y } })
  }

  const tooltips: Record<string, string> = {
    heart: 'Jantung: Organ utama yang memompa darah ke seluruh tubuh',
    'right-atrium': 'Atrium Kanan: Menerima darah dari tubuh',
    'left-atrium': 'Atrium Kiri: Menerima darah dari paru-paru',
    'right-ventricle': 'Ventrikel Kanan: Memompa darah ke paru-paru',
    'left-ventricle': 'Ventrikel Kiri: Memompa darah ke seluruh tubuh',
    'lungs-left': 'Paru-paru Kiri: Tempat pertukaran gas (O₂ dan CO₂)',
    'lungs-right': 'Paru-paru Kanan: Tempat pertukaran gas (O₂ dan CO₂)',
    'vena-cava': 'Vena Kava: Membawa darah miskin oksigen dari tubuh',
    'aorta': 'Aorta: Membawa darah kaya oksigen ke seluruh tubuh',
    'pulmonary-artery': 'Arteri Pulmonari: Membawa darah miskin oksigen ke paru-paru',
    'pulmonary-vein': 'Vena Pulmonari: Membawa darah kaya oksigen dari paru-paru',
    'systemic-artery': 'Arteri Sistemik: Membawa oksigen ke jaringan tubuh',
    'systemic-vein': 'Vena Sistemik: Mengumpulkan karbon dioksida dari jaringan',
  }

  const animationControls = [
    {
      icon: isPlaying ? '⏸' : '▶',
      label: isPlaying ? 'Pause' : 'Play',
      onClick: () => setIsPlaying(!isPlaying),
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: '⟲',
      label: 'Reset',
      onClick: handleReset,
      color: 'from-slate-500 to-slate-600',
    },
  ]

  return (
    <motion.div
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
          Sistem Peredaran Darah Manusia
        </h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Animasi interaktif yang menunjukkan perjalanan darah melalui jantung, paru-paru, dan seluruh
          tubuh Anda. Klik elemen untuk detail lebih lanjut.
        </p>
      </div>

      {/* Main Animation Card */}
      <motion.div
        className="relative bg-gradient-to-br from-white to-slate-50 rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.15)] border border-slate-100 p-6 sm:p-8 mb-8 overflow-hidden"
        whileHover={{ shadow: '0 30px 80px rgba(15,23,42,0.25)' }}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-100/20 rounded-full blur-3xl -z-10" />

        {/* Control Buttons */}
        <div className="flex gap-3 mb-6 justify-center sm:justify-start">
          {animationControls.map((control) => (
            <motion.button
              key={control.label}
              onClick={control.onClick}
              className={`px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r ${control.color} hover:shadow-lg transition-all`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">{control.icon}</span> {control.label}
            </motion.button>
          ))}
        </div>

        {/* SVG Diagram */}
        <div className="flex justify-center mb-8 overflow-x-auto">
          <svg
            ref={svgRef}
            viewBox="0 0 600 500"
            className="w-full max-w-2xl h-auto min-h-96"
            style={{ minWidth: '300px' }}
          >
            {/* Define gradients and filters */}
            <defs>
              <linearGradient id="red-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FF6B6B', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#E53935', stopOpacity: 1 }} />
              </linearGradient>

              <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#1E88E5', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#0D47A1', stopOpacity: 1 }} />
              </linearGradient>

              <filter id="glow-red">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="glow-blue">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="glow-heart">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Body/Tissue (bottom) */}
            <g id="body">
              <ellipse cx="300" cy="430" rx="120" ry="50" fill="#F0F0F0" stroke="#9E9E9E" strokeWidth="2" />
              <text
                x="300"
                y="435"
                textAnchor="middle"
                className="text-sm font-bold"
                fill="#263238"
              >
                Jaringan Tubuh
              </text>
            </g>

            {/* Blood vessels - Background (non-glowing) */}

            {/* Vena Kava (blue) - from body to right atrium */}
            <path
              d="M 220 380 Q 240 340 260 280 Q 270 250 280 220"
              stroke="#1E88E5"
              strokeWidth="6"
              fill="none"
              opacity="0.6"
              strokeLinecap="round"
            />

            {/* Aorta (red) - from left ventricle to body */}
            <path
              d="M 320 220 Q 330 250 350 300 Q 370 360 380 390"
              stroke="#E53935"
              strokeWidth="6"
              fill="none"
              opacity="0.6"
              strokeLinecap="round"
            />

            {/* Arteri Pulmonari (blue) - from right ventricle to lungs */}
            <path
              d="M 300 180 Q 250 130 200 80"
              stroke="#1E88E5"
              strokeWidth="5"
              fill="none"
              opacity="0.6"
              strokeLinecap="round"
              markerEnd="url(#arrowhead-blue)"
            />

            <path
              d="M 300 180 Q 350 130 400 80"
              stroke="#1E88E5"
              strokeWidth="5"
              fill="none"
              opacity="0.6"
              strokeLinecap="round"
              markerEnd="url(#arrowhead-blue)"
            />

            {/* Vena Pulmonari (red) - from lungs to left atrium */}
            <path
              d="M 200 80 Q 250 120 310 160"
              stroke="#E53935"
              strokeWidth="5"
              fill="none"
              opacity="0.6"
              strokeLinecap="round"
              markerEnd="url(#arrowhead-red)"
            />

            <path
              d="M 400 80 Q 350 120 310 160"
              stroke="#E53935"
              strokeWidth="5"
              fill="none"
              opacity="0.6"
              strokeLinecap="round"
              markerEnd="url(#arrowhead-red)"
            />

            {/* Glowing vessel paths for animation */}

            {/* Blue paths with glow */}
            <path
              d="M 220 380 Q 240 340 260 280 Q 270 250 280 220"
              stroke="#1E88E5"
              strokeWidth="6"
              fill="none"
              opacity="1"
              filter="url(#glow-blue)"
              strokeLinecap="round"
              className="active-vessel-blue"
              style={{
                opacity: activeStep <= 2 ? 1 : 0.4,
                transition: 'opacity 0.5s ease',
              }}
            />

            <path
              d="M 300 180 Q 250 130 200 80"
              stroke="#1E88E5"
              strokeWidth="5"
              fill="none"
              opacity="1"
              filter="url(#glow-blue)"
              strokeLinecap="round"
              style={{
                opacity: activeStep <= 3 && activeStep >= 2 ? 1 : 0.4,
                transition: 'opacity 0.5s ease',
              }}
            />

            <path
              d="M 300 180 Q 350 130 400 80"
              stroke="#1E88E5"
              strokeWidth="5"
              fill="none"
              opacity="1"
              filter="url(#glow-blue)"
              strokeLinecap="round"
              style={{
                opacity: activeStep <= 3 && activeStep >= 2 ? 1 : 0.4,
                transition: 'opacity 0.5s ease',
              }}
            />

            {/* Red paths with glow */}
            <path
              d="M 200 80 Q 250 120 310 160"
              stroke="#E53935"
              strokeWidth="5"
              fill="none"
              opacity="1"
              filter="url(#glow-red)"
              strokeLinecap="round"
              style={{
                opacity: activeStep >= 4 && activeStep <= 6 ? 1 : 0.4,
                transition: 'opacity 0.5s ease',
              }}
            />

            <path
              d="M 400 80 Q 350 120 310 160"
              stroke="#E53935"
              strokeWidth="5"
              fill="none"
              opacity="1"
              filter="url(#glow-red)"
              strokeLinecap="round"
              style={{
                opacity: activeStep >= 4 && activeStep <= 6 ? 1 : 0.4,
                transition: 'opacity 0.5s ease',
              }}
            />

            <path
              d="M 320 220 Q 330 250 350 300 Q 370 360 380 390"
              stroke="#E53935"
              strokeWidth="6"
              fill="none"
              opacity="1"
              filter="url(#glow-red)"
              strokeLinecap="round"
              style={{
                opacity: activeStep === 6 || activeStep === 7 ? 1 : 0.4,
                transition: 'opacity 0.5s ease',
              }}
            />

            {/* Arrow markers */}
            <defs>
              <marker id="arrowhead-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#E53935" />
              </marker>
              <marker id="arrowhead-blue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#1E88E5" />
              </marker>
            </defs>

            {/* Heart - Center */}
            <g
              id="heart"
              onClick={() =>
                showPopup(
                  'Jantung',
                  'Organ utama yang memompa darah. Terdiri dari 4 ruang: 2 atrium dan 2 ventrikel.',
                  300,
                  200
                )
              }
              onMouseEnter={() => setHoveredLabel('heart')}
              onMouseLeave={() => setHoveredLabel(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Anatomical Heart - Muscular myocardium, chambers, and great vessels */}
              <motion.g
                animate={isPlaying ? { scale: [1, 1.025, 0.995, 1.015, 1] } : {}}
                transition={{ duration: 1.0, repeat: Infinity, times: [0, 0.15, 0.3, 0.45, 1], ease: 'easeInOut' }}
              >
                {/* Aorta Arch */}
                <path
                  d="M 285 180 C 285 140 300 130 320 130 C 340 130 345 150 345 175"
                  fill="none"
                  stroke="#BE123C"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                {/* Superior Vena Cava */}
                <path
                  d="M 265 135 L 265 180"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="8"
                  strokeLinecap="round"
                />

                {/* Main Ventricular Myocardium (Anatomical asymmetrical shape) */}
                <path
                  d="M 255 180 
                     C 235 200 235 240 255 270 
                     C 275 300 300 325 320 335 
                     C 340 315 365 270 365 220 
                     C 360 185 330 180 305 185 
                     C 285 180 265 175 255 180 Z"
                  fill="#991B1B"
                  stroke="#7F1D1D"
                  strokeWidth="2.5"
                  filter="url(#glow-heart)"
                />

                {/* Sulcus groove & Coronary vessels */}
                <path d="M 295 190 Q 302 250 318 330" stroke="#450A0A" strokeWidth="2.5" fill="none" opacity="0.6" />
                <path d="M 297 195 Q 305 240 315 320" stroke="#F43F5E" strokeWidth="1.8" fill="none" />
                <path d="M 302 210 Q 315 225 330 240" stroke="#F43F5E" strokeWidth="1.2" fill="none" />
                <path d="M 298 250 Q 285 270 275 285" stroke="#F43F5E" strokeWidth="1.2" fill="none" />
                <path d="M 300 205 Q 308 260 317 325" stroke="#38BDF8" strokeWidth="1.2" fill="none" opacity="0.8" />

                {/* 4 Chamber Divisions */}
                <rect x="252" y="195" width="38" height="32" rx="10" fill="#0284C7" opacity="0.35" />
                <text x="271" y="215" fontSize="10" fill="#E0F2FE" fontWeight="bold" textAnchor="middle">
                  RA
                </text>

                <rect x="312" y="195" width="38" height="32" rx="10" fill="#E11D48" opacity="0.35" />
                <text x="331" y="215" fontSize="10" fill="#FFE4E6" fontWeight="bold" textAnchor="middle">
                  LA
                </text>

                <rect x="258" y="235" width="40" height="42" rx="12" fill="#0284C7" opacity="0.45" />
                <text x="278" y="260" fontSize="10" fill="#E0F2FE" fontWeight="bold" textAnchor="middle">
                  RV
                </text>

                <rect x="306" y="235" width="45" height="52" rx="12" fill="#BE123C" opacity="0.5" />
                <text x="328" y="262" fontSize="10" fill="#FFE4E6" fontWeight="bold" textAnchor="middle">
                  LV
                </text>
              </motion.g>
            </g>

            {/* Lungs (Anatomical Lobes) */}
            <g id="lungs">
              {/* Left Lung (Pulmo Sinister - 2 Lobes with cardiac notch) */}
              <g
                id="lungs-left"
                onClick={() =>
                  showPopup(
                    'Paru-paru Kiri',
                    'Organ respirasi dengan 2 lobus dan incisura cardiaca tempat jantung berada. Darah menyerap O₂ dan membuang CO₂.',
                    200,
                    80
                  )
                }
                onMouseEnter={() => setHoveredLabel('lungs-left')}
                onMouseLeave={() => setHoveredLabel(null)}
                style={{ cursor: 'pointer' }}
              >
                <motion.path
                  d="M 180 30 
                     C 155 30 140 50 135 80 
                     C 130 110 135 140 145 155 
                     C 160 165 190 160 215 145 
                     C 215 130 205 110 205 90 
                     C 205 65 200 40 180 30 Z"
                  fill="#FCE7F3"
                  stroke="#DB2777"
                  strokeWidth="2"
                  animate={isPlaying ? { scale: [1, 1.025, 1] } : {}}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Bronchial branches inside lung */}
                <path d="M 195 55 Q 170 75 150 110" stroke="#0284C7" strokeWidth="1.5" fill="none" opacity="0.7" />
                <path d="M 155 115 Q 175 105 190 90" stroke="#E11D48" strokeWidth="1.5" fill="none" opacity="0.7" />
                <text x="175" y="100" textAnchor="middle" className="text-xs font-bold" fill="#831843">
                  Paru Kiri
                </text>
                <text x="175" y="115" textAnchor="middle" className="text-[10px]" fill="#9D174D">
                  2 Lobus
                </text>
              </g>

              {/* Right Lung (Pulmo Dexter - 3 Lobes) */}
              <g
                id="lungs-right"
                onClick={() =>
                  showPopup(
                    'Paru-paru Kanan',
                    'Organ respirasi dengan 3 lobus (superior, medius, inferior). Tempat terjadinya difusi gas darah dalam kapiler alveolus.',
                    400,
                    80
                  )
                }
                onMouseEnter={() => setHoveredLabel('lungs-right')}
                onMouseLeave={() => setHoveredLabel(null)}
                style={{ cursor: 'pointer' }}
              >
                <motion.path
                  d="M 420 30 
                     C 445 30 460 50 465 80 
                     C 470 110 465 140 455 155 
                     C 440 165 410 160 385 145 
                     C 385 125 395 100 395 80 
                     C 395 55 400 40 420 30 Z"
                  fill="#FCE7F3"
                  stroke="#DB2777"
                  strokeWidth="2"
                  animate={isPlaying ? { scale: [1, 1.025, 1] } : {}}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Horizontal fissure */}
                <path d="M 465 85 Q 430 80 395 90" stroke="#BE185D" strokeWidth="1" fill="none" opacity="0.5" />
                {/* Bronchial branches inside lung */}
                <path d="M 405 55 Q 430 75 450 110" stroke="#0284C7" strokeWidth="1.5" fill="none" opacity="0.7" />
                <path d="M 445 115 Q 425 105 410 90" stroke="#E11D48" strokeWidth="1.5" fill="none" opacity="0.7" />
                <text x="425" y="100" textAnchor="middle" className="text-xs font-bold" fill="#831843">
                  Paru Kanan
                </text>
                <text x="425" y="115" textAnchor="middle" className="text-[10px]" fill="#9D174D">
                  3 Lobus
                </text>
              </g>
            </g>

            {/* Blood particle animations */}
            {isPlaying &&
              bloodParticles.map((particle) => (
                <motion.circle
                  key={particle.id}
                  r="5"
                  fill={particle.type === 'oxygenated' ? '#FF6B6B' : '#1E88E5'}
                  opacity="0.8"
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
                  filter={particle.type === 'oxygenated' ? 'url(#glow-red)' : 'url(#glow-blue)'}
                />
              ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-400 to-red-600 shadow-lg" />
            <span className="text-sm font-medium text-slate-700">Darah Kaya Oksigen</span>
          </motion.div>
          <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg" />
            <span className="text-sm font-medium text-slate-700">Darah Kaya CO₂</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Popup Detail */}
      <AnimatePresence>
        {popup && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPopup(null)}
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl max-w-sm p-6 z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPopup(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-2xl"
              >
                ✕
              </button>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">{popup.title}</h3>
              <p className="text-slate-600 leading-relaxed">{popup.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heartbeat Steps */}
      <motion.div className="mt-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 text-center">
          Siklus Sirkulasi Darah
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {heartbeatSteps.map((step, idx) => (
            <motion.div
              key={step.number}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                activeStep === idx
                  ? 'border-slate-900 bg-slate-50 shadow-lg scale-105'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
              onClick={() => {
                setActiveStep(idx)
                setIsPlaying(false)
              }}
              whileHover={{ y: -4 }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-3"
                style={{ backgroundColor: step.color }}
              >
                {step.number}
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-2">{step.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tooltip Info */}
      {hoveredLabel && tooltips[hoveredLabel] && (
        <motion.div
          className="fixed bottom-4 left-4 bg-slate-900 text-white rounded-lg px-4 py-2 text-sm max-w-xs z-40"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          {tooltips[hoveredLabel]}
        </motion.div>
      )}
    </motion.div>
  )
}
