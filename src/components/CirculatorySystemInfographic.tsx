import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

interface CirculationState {
  activeSystem: 'all' | 'pulmonary' | 'systemic'
  hoveredOrgan: string | null
}

export default function CirculatorySystemInfographic() {
  const [state, setState] = useState<CirculationState>({
    activeSystem: 'all',
    hoveredOrgan: null,
  })
  const svgRef = useRef<SVGSVGElement>(null)

  // Animation variants
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
    },
  }

  const flowVariants = {
    flow: {
      strokeDashoffset: [0, -20],
      transition: { duration: 2, repeat: Infinity, ease: 'linear' },
    },
  }

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#FFF5F8] to-[#E8F3FF] overflow-hidden flex items-center justify-center p-4 lg:p-8">
      {/* Background floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`bg-particle-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${30 + i * 15}px`,
              height: `${30 + i * 15}px`,
              left: `${10 + i * 11}%`,
              top: `${15 + i * 10}%`,
              background: `radial-gradient(circle, ${
                i % 3 === 0
                  ? 'rgba(255,77,109,0.08)'
                  : i % 3 === 1
                    ? 'rgba(78,205,196,0.08)'
                    : 'rgba(205,180,219,0.08)'
              }, transparent)`,
            }}
            animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-8 lg:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-3">
            Sistem Peredaran Darah
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Jelajahi perjalanan menakjubkan darah melalui jantung, paru-paru, dan seluruh tubuh Anda
          </p>
        </motion.div>

        {/* Main infographic container */}
        <div className="relative bg-white/70 backdrop-blur-2xl rounded-[3rem] border border-white/40 shadow-[0_50px_100px_-30px_rgba(15,23,42,0.2)] p-8 lg:p-12">
          {/* SVG Infographic */}
          <svg
            ref={svgRef}
            viewBox="0 0 1200 800"
            className="w-full max-w-5xl mx-auto"
            style={{ filter: 'drop-shadow(0 0 20px rgba(255,77,109,0.1))' }}
          >
            {/* Define filters */}
            <defs>
              <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <linearGradient id="blood-rich" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FF4D6D', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#FF8FA3', stopOpacity: 1 }} />
              </linearGradient>

              <linearGradient id="blood-poor" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#4ECDC4', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#A0E7E5', stopOpacity: 1 }} />
              </linearGradient>

              <linearGradient id="heart-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#FF4D6D', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#FF8FA3', stopOpacity: 0.9 }} />
                <stop offset="100%" style={{ stopColor: '#FF4D6D', stopOpacity: 1 }} />
              </linearGradient>

              {/* Realistic Anatomical Organ Gradients */}
              <radialGradient id="info-lung-grad" cx="45%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FDA4AF" />
                <stop offset="45%" stopColor="#F43F5E" />
                <stop offset="85%" stopColor="#BE123C" />
                <stop offset="100%" stopColor="#881337" />
              </radialGradient>

              <radialGradient id="info-myo-grad" cx="45%" cy="38%" r="65%">
                <stop offset="0%" stopColor="#E11D48" />
                <stop offset="45%" stopColor="#BE123C" />
                <stop offset="80%" stopColor="#881337" />
                <stop offset="100%" stopColor="#4C0519" />
              </radialGradient>

              <pattern id="alveoli" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="6" fill="#4ECDC4" opacity="0.6" />
              </pattern>
            </defs>

            {/* Background grid */}
            <rect width="1200" height="800" fill="none" opacity="0.02" />

            {/* ===== MAJOR VESSELS ===== */}

            {/* Superior Vena Cava (Blue) */}
            <motion.path
              d="M 600 120 L 600 220"
              stroke="url(#blood-poor)"
              strokeWidth="18"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="100"
              variants={flowVariants}
              animate="flow"
              filter="url(#glow-cyan)"
            />

            {/* Aorta (Red) */}
            <motion.path
              d="M 600 320 L 600 680"
              stroke="url(#blood-rich)"
              strokeWidth="16"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="100"
              variants={flowVariants}
              animate="flow"
              filter="url(#glow-red)"
            />

            {/* Left carotid artery (Red) */}
            <motion.path
              d="M 600 320 Q 450 280 380 180"
              stroke="url(#blood-rich)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="80"
              variants={flowVariants}
              animate="flow"
              filter="url(#glow-red)"
            />

            {/* Right carotid artery (Red) */}
            <motion.path
              d="M 600 320 Q 750 280 820 180"
              stroke="url(#blood-rich)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="80"
              variants={flowVariants}
              animate="flow"
              filter="url(#glow-red)"
            />

            {/* Left subclavian artery (Red) */}
            <motion.path
              d="M 600 340 Q 450 380 320 420"
              stroke="url(#blood-rich)"
              strokeWidth="11"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="80"
              variants={flowVariants}
              animate="flow"
              filter="url(#glow-red)"
            />

            {/* Right subclavian artery (Red) */}
            <motion.path
              d="M 600 340 Q 750 380 880 420"
              stroke="url(#blood-rich)"
              strokeWidth="11"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="80"
              variants={flowVariants}
              animate="flow"
              filter="url(#glow-red)"
            />

            {/* Left iliac artery (Red) */}
            <motion.path
              d="M 600 680 Q 480 720 400 760"
              stroke="url(#blood-rich)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="70"
              variants={flowVariants}
              animate="flow"
              filter="url(#glow-red)"
            />

            {/* Right iliac artery (Red) */}
            <motion.path
              d="M 600 680 Q 720 720 800 760"
              stroke="url(#blood-rich)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="70"
              variants={flowVariants}
              animate="flow"
              filter="url(#glow-red)"
            />

            {/* Return vessels (Blue) */}
            <motion.path
              d="M 380 180 Q 450 240 500 280"
              stroke="url(#blood-poor)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="70"
              variants={flowVariants}
              animate="flow"
              filter="url(#glow-cyan)"
            />

            <motion.path
              d="M 820 180 Q 750 240 700 280"
              stroke="url(#blood-poor)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="70"
              variants={flowVariants}
              animate="flow"
              filter="url(#glow-cyan)"
            />

            {/* ===== LUNGS (Anatomical Respiratory Organs) ===== */}

            {/* Right Lung (Pulmo Dexter - 3 Lobes, located on Patient's Right / Viewer's Left) */}
            <g
              onMouseEnter={() => setState(s => ({ ...s, hoveredOrgan: 'right-lung' }))}
              onMouseLeave={() => setState(s => ({ ...s, hoveredOrgan: null }))}
              className="cursor-pointer"
            >
              <motion.g
                animate={state.hoveredOrgan === 'right-lung' ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  d="M 330 260 
                     C 300 262 278 286 270 320 
                     C 262 355 266 395 280 422 
                     C 298 438 335 432 355 410 
                     C 358 385 352 355 355 330 
                     C 358 300 355 265 330 260 Z"
                  fill="url(#info-lung-grad)"
                  stroke="#881337"
                  strokeWidth="2.2"
                  filter="url(#glow-red)"
                />

                {/* Fissura Horizontalis & Fissura Obliqua (3 lobes) */}
                <path d="M 272 335 Q 310 338 354 345" stroke="#4C0519" strokeWidth="1.6" fill="none" opacity="0.6" />
                <path d="M 278 385 Q 315 400 352 418" stroke="#4C0519" strokeWidth="1.6" fill="none" opacity="0.6" />

                {/* Bronchial Tree Arborization */}
                <path d="M 350 310 Q 320 325 295 345" stroke="#F1F5F9" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.85" />
                <path d="M 320 328 Q 305 305 295 285" stroke="#F1F5F9" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.8" />
                <path d="M 315 340 Q 295 380 288 410" stroke="#F1F5F9" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.8" />

                {/* Pulmonary microvascular branch (Cyan venous / Red arterial) */}
                <path d="M 345 320 Q 315 338 290 360" stroke="#38BDF8" strokeWidth="2" fill="none" opacity="0.8" />
                <path d="M 292 365 Q 320 350 348 330" stroke="#FFE4E6" strokeWidth="1.6" fill="none" opacity="0.8" />

                <g transform="translate(315, 455)">
                  <rect x="-65" y="-12" width="130" height="24" rx="6" fill="#FFFFFF" stroke="#FECDD3" strokeWidth="1" className="dark:fill-slate-900 dark:stroke-slate-700" />
                  <text x="0" y="4" textAnchor="middle" className="text-xs font-bold font-sans" fill="#881337">
                    Paru Kanan (3 Lobus)
                  </text>
                </g>
              </motion.g>
            </g>

            {/* Left Lung (Pulmo Sinister - 2 Lobes & Incisura Cardiaca, located on Patient's Left / Viewer's Right) */}
            <g
              onMouseEnter={() => setState(s => ({ ...s, hoveredOrgan: 'left-lung' }))}
              onMouseLeave={() => setState(s => ({ ...s, hoveredOrgan: null }))}
              className="cursor-pointer"
            >
              <motion.g
                animate={state.hoveredOrgan === 'left-lung' ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  d="M 870 260 
                     C 900 262 922 286 930 320 
                     C 938 355 934 395 920 422 
                     C 902 438 865 432 845 410 
                     C 842 385 848 355 845 330 
                     C 842 300 845 265 870 260 Z"
                  fill="url(#info-lung-grad)"
                  stroke="#881337"
                  strokeWidth="2.2"
                  filter="url(#glow-red)"
                />

                {/* Fissura Obliqua (2 lobes) */}
                <path d="M 924 345 Q 885 375 846 405" stroke="#4C0519" strokeWidth="1.6" fill="none" opacity="0.6" />

                {/* Bronchial Tree Arborization */}
                <path d="M 850 310 Q 880 325 905 345" stroke="#F1F5F9" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.85" />
                <path d="M 880 328 Q 895 305 905 285" stroke="#F1F5F9" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.8" />
                <path d="M 885 340 Q 905 380 912 410" stroke="#F1F5F9" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.8" />

                {/* Pulmonary microvascular branch */}
                <path d="M 855 320 Q 885 338 910 360" stroke="#38BDF8" strokeWidth="2" fill="none" opacity="0.8" />
                <path d="M 908 365 Q 880 350 852 330" stroke="#FFE4E6" strokeWidth="1.6" fill="none" opacity="0.8" />

                <g transform="translate(885, 455)">
                  <rect x="-65" y="-12" width="130" height="24" rx="6" fill="#FFFFFF" stroke="#FECDD3" strokeWidth="1" className="dark:fill-slate-900 dark:stroke-slate-700" />
                  <text x="0" y="4" textAnchor="middle" className="text-xs font-bold font-sans" fill="#881337">
                    Paru Kiri (2 Lobus)
                  </text>
                </g>
              </motion.g>
            </g>

            {/* ===== HEART (Cor Humanum) ===== */}
            <g
              onMouseEnter={() => setState(s => ({ ...s, hoveredOrgan: 'heart' }))}
              onMouseLeave={() => setState(s => ({ ...s, hoveredOrgan: null }))}
              className="cursor-pointer"
            >
              {/* Anatomical Heart Structure */}
              <motion.g
                variants={pulseVariants}
                animate={state.hoveredOrgan === 'heart' ? ['pulse'] : 'pulse'}
              >
                {/* Aorta Arch atop heart with 3 branches */}
                <path
                  d="M 578 270 C 578 230 600 215 620 215 C 640 215 646 235 646 270"
                  fill="none"
                  stroke="#BE123C"
                  strokeWidth="11"
                  strokeLinecap="round"
                />
                <path d="M 602 222 L 598 198" stroke="#E11D48" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M 618 217 L 618 195" stroke="#E11D48" strokeWidth="4" strokeLinecap="round" />
                <path d="M 632 220 L 636 198" stroke="#E11D48" strokeWidth="3.5" strokeLinecap="round" />

                {/* Vena cava superior root */}
                <path d="M 562 230 L 562 270" stroke="#0284C7" strokeWidth="9" strokeLinecap="round" fill="none" />

                {/* Anatomical Heart Body Profile */}
                <path
                  d="M 552 270 
                     C 525 292 525 340 550 378 
                     C 572 414 602 442 622 452 
                     C 648 426 680 372 680 312 
                     C 674 272 642 268 612 274 
                     C 588 268 565 264 552 270 Z"
                  fill="url(#info-myo-grad)"
                  stroke="#4C0519"
                  strokeWidth="2.5"
                  filter="url(#glow-red)"
                />

                {/* Internal chambers cutaway tint */}
                {/* Right Atrium & Ventricle */}
                <path d="M 548 280 C 538 300 542 330 558 350 C 568 335 568 300 558 280 Z" fill="#0284C7" opacity="0.35" />
                {/* Left Atrium & Ventricle */}
                <path d="M 615 280 C 625 305 625 345 615 365 C 645 350 658 320 652 280 Z" fill="#E11D48" opacity="0.4" />

                {/* Interventricular Septum */}
                <path d="M 598 280 Q 604 360 618 446" stroke="#4C0519" strokeWidth="4" fill="none" opacity="0.5" />

                {/* Coronary Vessels (Arteria Coronaria) */}
                <path d="M 602 285 Q 608 350 620 442" stroke="#450A0A" strokeWidth="2.5" fill="none" opacity="0.5" />
                <path d="M 604 290 Q 612 345 618 435" stroke="#F43F5E" strokeWidth="2" fill="none" />
                <path d="M 608 312 Q 624 330 638 348" stroke="#F43F5E" strokeWidth="1.5" fill="none" />
                <path d="M 605 355 Q 594 374 582 390" stroke="#F43F5E" strokeWidth="1.5" fill="none" />
                <path d="M 606 300 Q 614 365 620 440" stroke="#38BDF8" strokeWidth="1.5" fill="none" opacity="0.85" />

                {/* Latin Medical Label */}
                <g transform="translate(614, 475)">
                  <rect x="-55" y="-12" width="110" height="24" rx="6" fill="#FFFFFF" stroke="#FECDD3" strokeWidth="1" className="dark:fill-slate-900 dark:stroke-slate-700" />
                  <text x="0" y="4" textAnchor="middle" className="text-xs font-bold font-sans" fill="#881337">
                    Cor Humanum
                  </text>
                </g>
              </motion.g>
            </g>

            {/* ===== BLOOD CELLS & EDUCATIONAL ELEMENTS ===== */}

            {/* Red blood cells (along arteries) */}
            {[...Array(12)].map((_, i) => {
              const progress = (i + performance?.now?.() / 1000 || 0) % 12
              const angle = (progress / 12) * Math.PI * 2
              const x = 600 + Math.cos(angle) * 200
              const y = 400 + Math.sin(angle) * 200
              return (
                <motion.circle
                  key={`rbc-${i}`}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#FF4D6D"
                  opacity="0.7"
                  filter="url(#glow-red)"
                  animate={{
                    opacity: [0.5, 0.9, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.15,
                    repeat: Infinity,
                  }}
                />
              )
            })}

            {/* Oxygen molecules at right lung (pulmonary gas exchange) */}
            {[...Array(5)].map((_, i) => (
              <motion.g
                key={`o2-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.circle
                  cx={290 + i * 16}
                  cy={370 + Math.sin(i) * 15}
                  r="5"
                  fill="#FF4D6D"
                  opacity="0.65"
                  animate={{
                    x: [0, Math.cos(i) * 10, 0],
                    y: [0, Math.sin(i) * 10, 0],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                />
                <text
                  x={290 + i * 16}
                  y={374 + Math.sin(i) * 15}
                  fill="#FFFFFF"
                  fontSize="7.5"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  O₂
                </text>
              </motion.g>
            ))}

            {/* Carbon dioxide molecules at left lung */}
            {[...Array(5)].map((_, i) => (
              <motion.g
                key={`co2-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.circle
                  cx={860 + i * 16}
                  cy={370 + Math.sin(i + 1) * 15}
                  r="5"
                  fill="#0284C7"
                  opacity="0.65"
                  animate={{
                    x: [0, Math.cos(i + 1) * 10, 0],
                    y: [0, Math.sin(i + 1) * 10, 0],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                />
                <text
                  x={860 + i * 16}
                  y={374 + Math.sin(i + 1) * 15}
                  fill="#FFFFFF"
                  fontSize="7"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  CO₂
                </text>
              </motion.g>
            ))}

            {/* ===== NON-OVERLAPPING CLEAR LABELS ===== */}

            {/* Header labels with dedicated stylish badges */}
            <g transform="translate(315, 220)">
              <rect x="-75" y="-14" width="150" height="28" rx="8" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.2" className="dark:fill-slate-900 dark:stroke-slate-700 filter drop-shadow-sm" />
              <text
                x="0"
                y="4"
                fill="#0284C7"
                fontSize="12.5"
                fontWeight="bold"
                textAnchor="middle"
              >
                Paru-Paru Kanan
              </text>
            </g>

            <g transform="translate(885, 220)">
              <rect x="-75" y="-14" width="150" height="28" rx="8" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.2" className="dark:fill-slate-900 dark:stroke-slate-700" />
              <text
                x="0"
                y="4"
                fill="#0284C7"
                fontSize="12.5"
                fontWeight="bold"
                textAnchor="middle"
              >
                Paru-Paru Kiri
              </text>
            </g>

            {/* Circulation labels positioned away from vessels */}
            <g transform="translate(420, 110)">
              <rect x="-65" y="-16" width="130" height="36" rx="10" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.2" className="dark:fill-slate-900 dark:stroke-slate-700 filter drop-shadow-md" />
              <text
                x="0"
                y="-1"
                fill="#0284C7"
                fontSize="11.5"
                fontWeight="bold"
                textAnchor="middle"
              >
                Sirkulasi Kecil
              </text>
              <text
                x="0"
                y="12"
                fill="#64748B"
                fontSize="9.5"
                textAnchor="middle"
              >
                (Pulmonal)
              </text>
            </g>

            <g transform="translate(780, 110)">
              <rect x="-65" y="-16" width="130" height="36" rx="10" fill="#FFFFFF" stroke="#E11D48" strokeWidth="1.2" className="dark:fill-slate-900 dark:stroke-slate-700 filter drop-shadow-md" />
              <text
                x="0"
                y="-1"
                fill="#BE123C"
                fontSize="11.5"
                fontWeight="bold"
                textAnchor="middle"
              >
                Sirkulasi Besar
              </text>
              <text
                x="0"
                y="12"
                fill="#64748B"
                fontSize="9.5"
                textAnchor="middle"
              >
                (Sistemik)
              </text>
            </g>
          </svg>

          {/* Legend and info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/20">
            {/* Legend item 1 */}
            <motion.div
              className="p-4 rounded-2xl bg-gradient-to-br from-[#FF4D6D]/10 to-[#FF8FA3]/10 border border-[#FF4D6D]/30 backdrop-blur-sm hover:border-[#FF4D6D]/60 transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#FF4D6D] to-[#FF8FA3]" />
                <h4 className="font-semibold text-slate-900">Darah Kaya Oksigen</h4>
              </div>
              <p className="text-sm text-slate-600">Darah merah segar dari paru-paru</p>
            </motion.div>

            {/* Legend item 2 */}
            <motion.div
              className="p-4 rounded-2xl bg-gradient-to-br from-[#4ECDC4]/10 to-[#A0E7E5]/10 border border-[#4ECDC4]/30 backdrop-blur-sm hover:border-[#4ECDC4]/60 transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#4ECDC4] to-[#A0E7E5]" />
                <h4 className="font-semibold text-slate-900">Darah Miskin Oksigen</h4>
              </div>
              <p className="text-sm text-slate-600">Darah biru ke paru-paru untuk oksigenasi</p>
            </motion.div>

            {/* Legend item 3 */}
            <motion.div
              className="p-4 rounded-2xl bg-gradient-to-br from-[#CDB4DB]/10 to-[#E8D5F2]/10 border border-[#CDB4DB]/30 backdrop-blur-sm hover:border-[#CDB4DB]/60 transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  className="w-3 h-3 rounded-full bg-gradient-to-r from-[#FF4D6D] to-[#4ECDC4]"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <h4 className="font-semibold text-slate-900">Jantung & Sirkulasi</h4>
              </div>
              <p className="text-sm text-slate-600">Pompa utama dan aliran darah</p>
            </motion.div>
          </div>

          {/* Educational info box */}
          <motion.div
            className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100/50 border border-slate-200/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="text-xl">🫀</span> Bagaimana Sistem Peredaran Darah Bekerja?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-slate-700 text-sm leading-relaxed">
                  <strong className="text-[#FF4D6D]">Sirkulasi Besar:</strong> Jantung memompa darah kaya oksigen melalui aorta ke seluruh tubuh, mengirimkan oksigen ke jaringan dan mengambil karbon dioksida.
                </p>
              </div>
              <div>
                <p className="text-slate-700 text-sm leading-relaxed">
                  <strong className="text-[#4ECDC4]">Sirkulasi Kecil:</strong> Darah yang miskin oksigen kembali ke jantung melalui vena cava dan dipompa ke paru-paru untuk dioksigenasi kembali.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interactive buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {[
            { label: 'Semua Sistem', value: 'all' as const },
            { label: 'Sirkulasi Pulmonal', value: 'pulmonary' as const },
            { label: 'Sirkulasi Sistemik', value: 'systemic' as const },
          ].map(btn => (
            <motion.button
              key={btn.value}
              onClick={() => setState(s => ({ ...s, activeSystem: btn.value }))}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                state.activeSystem === btn.value
                  ? 'bg-gradient-to-r from-[#FF4D6D] to-[#FF8FA3] text-white shadow-lg shadow-[#FF4D6D]/40'
                  : 'bg-white/50 text-slate-700 border border-white/40 hover:border-[#FF4D6D]/30 hover:bg-white/70'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {btn.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
