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
  // Deoxygenated (blue) - Vena Kava (Tubuh ke RA) & Arteri Pulmonalis (ke kedua Paru)
  {
    id: 'blue-1',
    type: 'deoxygenated',
    path: 'M 240 385 Q 240 330 255 270',
    duration: 5,
    delay: 0,
  },
  {
    id: 'blue-2',
    type: 'deoxygenated',
    path: 'M 285 175 Q 250 140 210 115',
    duration: 5,
    delay: 1.5,
  },
  {
    id: 'blue-3',
    type: 'deoxygenated',
    path: 'M 315 175 Q 350 140 390 115',
    duration: 5,
    delay: 3,
  },
  // Oxygenated (red) - Vena Pulmonalis (Paru ke LA) & Aorta (ke Tubuh)
  {
    id: 'red-1',
    type: 'oxygenated',
    path: 'M 210 115 Q 260 145 310 168',
    duration: 5,
    delay: 0.8,
  },
  {
    id: 'red-2',
    type: 'oxygenated',
    path: 'M 390 115 Q 340 145 320 168',
    duration: 5,
    delay: 2.2,
  },
  {
    id: 'red-3',
    type: 'oxygenated',
    path: 'M 345 270 Q 360 330 360 385',
    duration: 5,
    delay: 3.8,
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

              {/* Realistic Myocardium & Cardiac Gradients */}
              <radialGradient id="myo-base" cx="45%" cy="40%" r="65%">
                <stop offset="0%" stopColor="#BE123C" />
                <stop offset="45%" stopColor="#9F1239" />
                <stop offset="80%" stopColor="#881337" />
                <stop offset="100%" stopColor="#4C0519" />
              </radialGradient>

              <radialGradient id="rv-cavity" cx="40%" cy="45%" r="60%">
                <stop offset="0%" stopColor="#0369A1" stopOpacity="0.45" />
                <stop offset="70%" stopColor="#075985" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#0C4A6E" stopOpacity="0.85" />
              </radialGradient>

              <radialGradient id="lv-cavity" cx="45%" cy="45%" r="60%">
                <stop offset="0%" stopColor="#9F1239" stopOpacity="0.45" />
                <stop offset="70%" stopColor="#881337" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#4C0519" stopOpacity="0.85" />
              </radialGradient>

              <linearGradient id="aorta-arch-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E11D48" />
                <stop offset="50%" stopColor="#BE123C" />
                <stop offset="100%" stopColor="#9F1239" />
              </linearGradient>

              <linearGradient id="cava-stem-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0369A1" />
              </linearGradient>

              {/* Realistic Lung Parenchyma (Atlas Standard) */}
              <radialGradient id="lung-grad-left" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FDA4AF" />
                <stop offset="35%" stopColor="#FB7185" />
                <stop offset="70%" stopColor="#E11D48" />
                <stop offset="100%" stopColor="#9F1239" />
              </radialGradient>

              <radialGradient id="lung-grad-right" cx="65%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FDA4AF" />
                <stop offset="35%" stopColor="#FB7185" />
                <stop offset="70%" stopColor="#E11D48" />
                <stop offset="100%" stopColor="#9F1239" />
              </radialGradient>

              <linearGradient id="trachea-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94A3B8" />
                <stop offset="50%" stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#64748B" />
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

              <filter id="shadow-organ" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#0F172A" floodOpacity="0.2" />
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
              d="M 240 385 Q 240 330 255 270"
              stroke="#1E88E5"
              strokeWidth="6"
              fill="none"
              opacity="0.6"
              strokeLinecap="round"
            />

            {/* Aorta (red) - from left ventricle to body */}
            <path
              d="M 345 270 Q 360 330 360 385"
              stroke="#E53935"
              strokeWidth="6"
              fill="none"
              opacity="0.6"
              strokeLinecap="round"
            />

            {/* Arteri Pulmonalis (blue) - from right ventricle to lungs hilum */}
            <path
              d="M 285 175 Q 250 140 210 115"
              stroke="#1E88E5"
              strokeWidth="5"
              fill="none"
              opacity="0.6"
              strokeLinecap="round"
              markerEnd="url(#arrowhead-blue)"
            />

            <path
              d="M 315 175 Q 350 140 390 115"
              stroke="#1E88E5"
              strokeWidth="5"
              fill="none"
              opacity="0.6"
              strokeLinecap="round"
              markerEnd="url(#arrowhead-blue)"
            />

            {/* Vena Pulmonalis (red) - from lungs hilum to left atrium */}
            <path
              d="M 210 115 Q 260 145 310 168"
              stroke="#E53935"
              strokeWidth="5"
              fill="none"
              opacity="0.6"
              strokeLinecap="round"
              markerEnd="url(#arrowhead-red)"
            />

            <path
              d="M 390 115 Q 340 145 320 168"
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
              d="M 240 385 Q 240 330 255 270"
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
              d="M 285 175 Q 250 140 210 115"
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
              d="M 315 175 Q 350 140 390 115"
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
              d="M 210 115 Q 260 145 310 168"
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
              d="M 390 115 Q 340 145 320 168"
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
              d="M 345 270 Q 360 330 360 385"
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

            {/* Heart - Center Anatomical Organ */}
            <g
              id="heart"
              onClick={() =>
                showPopup(
                  'Jantung (Cor Humanum)',
                  'Organ pemompa hemodinamik utama dengan 4 ruang: Atrium Dextrum & Sinistrum, serta Ventriculus Dexter & Sinister. Dilengkapi septum interventriculare tebal, katup atrioventrikular, dan vaskularisasi koroner.',
                  300,
                  200
                )
              }
              onMouseEnter={() => setHoveredLabel('heart')}
              onMouseLeave={() => setHoveredLabel(null)}
              style={{ cursor: 'pointer' }}
            >
              <motion.g
                animate={isPlaying ? { scale: [1, 1.025, 0.995, 1.018, 1] } : {}}
                transition={{ duration: 1.0, repeat: Infinity, times: [0, 0.15, 0.3, 0.45, 1], ease: 'easeInOut' }}
                filter="url(#shadow-organ)"
              >
                {/* Great Vessels Behind Heart */}
                {/* Superior Vena Cava entering Right Atrium */}
                <path
                  d="M 264 130 L 264 185"
                  fill="none"
                  stroke="url(#cava-stem-grad)"
                  strokeWidth="11"
                  strokeLinecap="round"
                />
                <ellipse cx="264" cy="132" rx="5.5" ry="2" fill="#38BDF8" opacity="0.8" />

                {/* Arch of Aorta with 3 classic branches */}
                {/* Truncus Brachiocephalicus, A. Carotis Sinistra, A. Subclavia Sinistra */}
                <path
                  d="M 288 178 C 286 135 304 120 324 120 C 344 120 352 142 352 178"
                  fill="none"
                  stroke="url(#aorta-arch-grad)"
                  strokeWidth="13"
                  strokeLinecap="round"
                />
                {/* 3 Supra-aortic arterial branches */}
                <path d="M 302 128 L 297 108" stroke="#E11D48" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M 318 122 L 318 105" stroke="#E11D48" strokeWidth="4" strokeLinecap="round" />
                <path d="M 334 125 L 338 108" stroke="#E11D48" strokeWidth="3.5" strokeLinecap="round" />

                {/* Pulmonary Trunk bifurcation */}
                <path
                  d="M 298 190 Q 292 165 272 152 M 298 190 Q 306 165 328 155"
                  stroke="#0284C7"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Main Ventricular & Atrial Silhouette - Anatomical Muscular Profile */}
                <path
                  d="M 252 178 
                     C 232 195 230 238 248 274 
                     C 268 312 296 338 318 348 
                     C 342 330 372 278 372 218 
                     C 368 178 335 174 308 180 
                     C 285 174 262 172 252 178 Z"
                  fill="url(#myo-base)"
                  stroke="#4C0519"
                  strokeWidth="2"
                />

                {/* Muscular Cutaway & Internal Chamber Cavities */}
                {/* Right Atrium (Atrium Dextrum) internal fossa */}
                <path
                  d="M 248 186 C 240 200 242 222 252 232 C 265 234 278 226 284 212 C 286 196 274 186 258 186 Z"
                  fill="url(#rv-cavity)"
                  stroke="#0284C7"
                  strokeWidth="1.2"
                  opacity="0.85"
                />
                
                {/* Left Atrium (Atrium Sinistrum) internal cavity */}
                <path
                  d="M 314 186 C 326 186 348 194 352 212 C 354 226 342 234 328 232 C 320 220 318 200 314 186 Z"
                  fill="url(#lv-cavity)"
                  stroke="#E11D48"
                  strokeWidth="1.2"
                  opacity="0.85"
                />

                {/* Right Ventricle (Ventriculus Dexter) */}
                <path
                  d="M 252 238 C 248 260 258 288 274 304 C 288 318 296 322 298 322 C 298 300 294 270 290 242 C 276 240 262 236 252 238 Z"
                  fill="url(#rv-cavity)"
                  stroke="#0284C7"
                  strokeWidth="1.2"
                  opacity="0.9"
                />

                {/* Left Ventricle (Ventriculus Sinister) - Thick conical myocardium to apex */}
                <path
                  d="M 304 242 C 308 270 312 300 316 336 C 330 324 354 286 354 242 C 338 238 318 238 304 242 Z"
                  fill="url(#lv-cavity)"
                  stroke="#BE123C"
                  strokeWidth="1.2"
                  opacity="0.9"
                />

                {/* Septum Interventriculare (Thick muscular dividing wall) */}
                <path
                  d="M 292 238 Q 296 282 306 338"
                  stroke="#7F1D1D"
                  strokeWidth="7"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M 293 242 Q 297 282 306 334"
                  stroke="#BE123C"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.7"
                />

                {/* Heart Valves & Chordae Tendineae Details */}
                {/* Tricuspid Valve in Right Heart */}
                <path d="M 254 236 Q 268 244 282 238" stroke="#E2E8F0" strokeWidth="2" fill="none" opacity="0.9" />
                <path d="M 264 241 L 262 258 M 272 241 L 274 258" stroke="#F8FAFC" strokeWidth="1" strokeDasharray="1 1.5" opacity="0.8" />
                <circle cx="262" cy="260" r="2.2" fill="#7F1D1D" />
                <circle cx="274" cy="260" r="2.2" fill="#7F1D1D" />

                {/* Mitral / Bicuspid Valve in Left Heart */}
                <path d="M 312 238 Q 328 245 346 238" stroke="#E2E8F0" strokeWidth="2" fill="none" opacity="0.9" />
                <path d="M 322 242 L 324 262 M 336 242 L 334 262" stroke="#F8FAFC" strokeWidth="1" strokeDasharray="1 1.5" opacity="0.8" />
                <circle cx="324" cy="264" r="2.5" fill="#7F1D1D" />
                <circle cx="334" cy="264" r="2.5" fill="#7F1D1D" />

                {/* Anterior Interventricular Sulcus & Coronary Vessels */}
                <path d="M 302 188 Q 306 250 318 344" stroke="#450A0A" strokeWidth="2.5" fill="none" opacity="0.4" />
                <path d="M 304 192 Q 308 246 317 338" stroke="#F43F5E" strokeWidth="2" fill="none" />
                <path d="M 308 215 Q 324 232 342 248" stroke="#F43F5E" strokeWidth="1.4" fill="none" />
                <path d="M 304 256 Q 288 274 274 290" stroke="#F43F5E" strokeWidth="1.4" fill="none" />
                <path d="M 306 200 Q 312 262 319 338" stroke="#38BDF8" strokeWidth="1.4" fill="none" opacity="0.85" />

                {/* Elegant Anatomical Chamber Tags */}
                {/* RA */}
                <g transform="translate(254, 202)">
                  <rect x="-14" y="-9" width="28" height="18" rx="5" fill="#0C4A6E" fillOpacity="0.85" stroke="#38BDF8" strokeWidth="0.8" />
                  <text x="0" y="3.5" fontSize="9" fill="#E0F2FE" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">RA</text>
                </g>
                {/* LA */}
                <g transform="translate(334, 202)">
                  <rect x="-14" y="-9" width="28" height="18" rx="5" fill="#881337" fillOpacity="0.85" stroke="#FB7185" strokeWidth="0.8" />
                  <text x="0" y="3.5" fontSize="9" fill="#FFE4E6" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">LA</text>
                </g>
                {/* RV */}
                <g transform="translate(272, 276)">
                  <rect x="-14" y="-9" width="28" height="18" rx="5" fill="#075985" fillOpacity="0.85" stroke="#38BDF8" strokeWidth="0.8" />
                  <text x="0" y="3.5" fontSize="9" fill="#E0F2FE" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">RV</text>
                </g>
                {/* LV */}
                <g transform="translate(332, 278)">
                  <rect x="-14" y="-9" width="28" height="18" rx="5" fill="#9F1239" fillOpacity="0.85" stroke="#FB7185" strokeWidth="0.8" />
                  <text x="0" y="3.5" fontSize="9" fill="#FFE4E6" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">LV</text>
                </g>

                {/* Latin Medical Subtitle */}
                <text x="310" y="365" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#881337" className="dark:fill-rose-300">
                  Cor Humanum
                </text>
              </motion.g>
            </g>

            {/* Lungs (Pulmones) - Anatomical Multilobar Respiratory Organs */}
            <g id="lungs">
              {/* Midline Trachea & Main Bronchi Bifurcation */}
              <g id="airway-tree" opacity="0.95">
                {/* Trachea tube */}
                <path
                  d="M 294 15 L 294 56 Q 300 62 306 56 L 306 15 Z"
                  fill="url(#trachea-grad)"
                  stroke="#475569"
                  strokeWidth="1"
                />
                {/* Cartilage C-rings */}
                {[20, 26, 32, 38, 44, 50].map((y) => (
                  <path
                    key={y}
                    d={`M 293 ${y} Q 300 ${y - 2} 307 ${y}`}
                    stroke="#F1F5F9"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                ))}
                {/* Left & Right Main Bronchus */}
                {/* Bronchus Principalis Dexter (to x: 410, y: 75) */}
                <path
                  d="M 304 56 Q 330 65 375 75"
                  stroke="#94A3B8"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Bronchus Principalis Sinister (to x: 190, y: 75) */}
                <path
                  d="M 296 56 Q 270 65 225 75"
                  stroke="#94A3B8"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>

              {/* Right Lung (Pulmo Dexter - 3 Anatomical Lobes: Superior, Medius, Inferior) - Patient's Right / Viewer's Left */}
              <g
                id="lungs-left"
                onClick={() =>
                  showPopup(
                    'Paru-paru Kanan (Pulmo Dexter)',
                    'Memiliki 3 lobus: Lobus Superior, Medius, dan Inferior yang dipisahkan oleh Fissura Horizontalis dan Fissura Obliqua. Volume paru kanan sekitar 10% lebih besar daripada paru kiri.',
                    200,
                    80
                  )
                }
                onMouseEnter={() => setHoveredLabel('lungs-left')}
                onMouseLeave={() => setHoveredLabel(null)}
                style={{ cursor: 'pointer' }}
              >
                <motion.g
                  animate={isPlaying ? { scale: [1, 1.025, 1] } : {}}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  filter="url(#shadow-organ)"
                >
                  {/* Anatomical Right Lung Parenchyma (3 Lobes) */}
                  <path
                    d="M 185 24 
                       C 160 25 138 46 132 75 
                       C 126 105 128 135 138 155 
                       C 150 170 178 168 206 154 
                       C 214 142 214 128 206 114 
                       C 198 100 198 84 204 65 
                       C 208 45 204 28 185 24 Z"
                    fill="url(#lung-grad-left)"
                    stroke="#881337"
                    strokeWidth="1.8"
                  />

                  {/* Fissura Horizontalis & Fissura Obliqua (3 lobes) */}
                  <path
                    d="M 134 85 Q 165 90 204 95"
                    stroke="#4C0519"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.65"
                  />
                  <path
                    d="M 136 120 Q 170 135 204 145"
                    stroke="#4C0519"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.65"
                  />

                  {/* Internal Bronchial Tree & Microvascular Arborization */}
                  <path d="M 215 75 Q 185 82 155 95" stroke="#CBD5E1" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.8" />
                  <path d="M 185 85 Q 170 65 160 48" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
                  <path d="M 175 90 Q 155 120 148 142" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
                  {/* Alveolar capillary branching */}
                  <path d="M 210 80 Q 180 95 150 115" stroke="#0284C7" strokeWidth="1.6" fill="none" opacity="0.75" />
                  <path d="M 152 118 Q 175 108 204 94" stroke="#FFE4E6" strokeWidth="1.4" fill="none" opacity="0.75" />

                  {/* Anatomical Label Plaque */}
                  <g transform="translate(170, 96)">
                    <rect x="-38" y="-12" width="76" height="24" rx="6" fill="#1E293B" fillOpacity="0.88" stroke="#FB7185" strokeWidth="0.8" />
                    <text x="0" y="-1" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#FFE4E6">
                      Pulmo Dexter
                    </text>
                    <text x="0" y="9" textAnchor="middle" fontSize="7.5" fill="#FCA5A5">
                      3 Lobus • Fissura
                    </text>
                  </g>
                </motion.g>
              </g>

              {/* Left Lung (Pulmo Sinister - 2 Anatomical Lobes & Incisura Cardiaca) - Patient's Left / Viewer's Right */}
              <g
                id="lungs-right"
                onClick={() =>
                  showPopup(
                    'Paru-paru Kiri (Pulmo Sinister)',
                    'Memiliki 2 lobus (Lobus Superior & Inferior) dipisahkan oleh Fissura Obliqua. Memiliki Incisura Cardiaca dan Lingula yang mengakomodasi letak apeks jantung.',
                    400,
                    80
                  )
                }
                onMouseEnter={() => setHoveredLabel('lungs-right')}
                onMouseLeave={() => setHoveredLabel(null)}
                style={{ cursor: 'pointer' }}
              >
                <motion.g
                  animate={isPlaying ? { scale: [1, 1.025, 1] } : {}}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  filter="url(#shadow-organ)"
                >
                  {/* Anatomical Left Lung Parenchyma (2 Lobes & Cardiac Notch) */}
                  <path
                    d="M 415 24 
                       C 440 25 462 46 468 75 
                       C 474 105 472 135 462 155 
                       C 450 170 422 168 394 154 
                       C 386 138 386 110 392 85 
                       C 396 60 396 35 415 24 Z"
                    fill="url(#lung-grad-right)"
                    stroke="#881337"
                    strokeWidth="1.8"
                  />

                  {/* Fissura Obliqua (separates Superior and Inferior lobes) */}
                  <path
                    d="M 464 85 Q 425 110 396 142"
                    stroke="#4C0519"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.65"
                  />

                  {/* Internal Bronchial Tree & Microvascular Arborization */}
                  <path d="M 385 75 Q 415 82 445 95" stroke="#CBD5E1" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.8" />
                  <path d="M 415 85 Q 430 65 440 48" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
                  <path d="M 425 90 Q 445 120 452 142" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
                  <path d="M 390 80 Q 420 95 450 115" stroke="#0284C7" strokeWidth="1.6" fill="none" opacity="0.75" />
                  <path d="M 448 118 Q 425 108 396 94" stroke="#FFE4E6" strokeWidth="1.4" fill="none" opacity="0.75" />

                  {/* Anatomical Label Plaque */}
                  <g transform="translate(430, 96)">
                    <rect x="-38" y="-12" width="76" height="24" rx="6" fill="#1E293B" fillOpacity="0.88" stroke="#FB7185" strokeWidth="0.8" />
                    <text x="0" y="-1" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#FFE4E6">
                      Pulmo Sinister
                    </text>
                    <text x="0" y="9" textAnchor="middle" fontSize="7.5" fill="#FCA5A5">
                      2 Lobus • Incisura
                    </text>
                  </g>
                </motion.g>
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
