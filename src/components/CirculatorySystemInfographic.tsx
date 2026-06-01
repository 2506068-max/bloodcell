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

  const glowVariants = {
    glow: {
      opacity: [0.4, 0.8, 0.4],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
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

            {/* ===== LUNGS ===== */}

            {/* Left Lung */}
            <g onMouseEnter={() => setState(s => ({ ...s, hoveredOrgan: 'left-lung' }))}
               onMouseLeave={() => setState(s => ({ ...s, hoveredOrgan: null }))}>
              <motion.path
                d="M 300 280 Q 280 300 285 360 Q 290 400 310 420 Q 340 410 350 360 Q 355 320 340 280 Z"
                fill="url(#blood-poor)"
                opacity="0.4"
                stroke="#4ECDC4"
                strokeWidth="2"
                animate={state.hoveredOrgan === 'left-lung' ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Bronchus detail */}
              <g opacity="0.7">
                <line x1="315" y1="300" x2="310" y2="330" stroke="#4ECDC4" strokeWidth="1.5" />
                <line x1="315" y1="300" x2="320" y2="330" stroke="#4ECDC4" strokeWidth="1.5" />
                <line x1="310" y1="330" x2="305" y2="360" stroke="#4ECDC4" strokeWidth="1" />
                <line x1="310" y1="330" x2="315" y2="360" stroke="#4ECDC4" strokeWidth="1" />
                <line x1="320" y1="330" x2="320" y2="360" stroke="#4ECDC4" strokeWidth="1" />
              </g>
            </g>

            {/* Right Lung */}
            <g onMouseEnter={() => setState(s => ({ ...s, hoveredOrgan: 'right-lung' }))}
               onMouseLeave={() => setState(s => ({ ...s, hoveredOrgan: null }))}>
              <motion.path
                d="M 900 280 Q 920 300 915 360 Q 910 400 890 420 Q 860 410 850 360 Q 845 320 860 280 Z"
                fill="url(#blood-poor)"
                opacity="0.4"
                stroke="#4ECDC4"
                strokeWidth="2"
                animate={state.hoveredOrgan === 'right-lung' ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Bronchus detail */}
              <g opacity="0.7">
                <line x1="885" y1="300" x2="890" y2="330" stroke="#4ECDC4" strokeWidth="1.5" />
                <line x1="885" y1="300" x2="880" y2="330" stroke="#4ECDC4" strokeWidth="1.5" />
                <line x1="890" y1="330" x2="895" y2="360" stroke="#4ECDC4" strokeWidth="1" />
                <line x1="890" y1="330" x2="885" y2="360" stroke="#4ECDC4" strokeWidth="1" />
                <line x1="880" y1="330" x2="880" y2="360" stroke="#4ECDC4" strokeWidth="1" />
              </g>
            </g>

            {/* ===== HEART ===== */}

            <g onMouseEnter={() => setState(s => ({ ...s, hoveredOrgan: 'heart' }))}
               onMouseLeave={() => setState(s => ({ ...s, hoveredOrgan: null }))}>
              {/* Heart glow */}
              <motion.circle
                cx="600"
                cy="340"
                r="95"
                fill="none"
                stroke="#FF4D6D"
                strokeWidth="1"
                opacity="0.3"
                animate={state.hoveredOrgan === 'heart' ? glowVariants.glow : {}}
              />

              {/* Heart shape */}
              <motion.path
                d="M 600 280 C 580 260 540 260 530 290 C 520 310 530 340 600 400 C 670 340 680 310 670 290 C 660 260 620 260 600 280 Z"
                fill="url(#heart-gradient)"
                stroke="#FF4D6D"
                strokeWidth="1.5"
                filter="url(#glow-red)"
                variants={pulseVariants}
                animate={state.hoveredOrgan === 'heart' ? ['pulse'] : 'pulse'}
              />

              {/* Heart chambers detail */}
              <g opacity="0.6">
                {/* Left ventricle */}
                <ellipse cx="580" cy="360" rx="18" ry="25" fill="none" stroke="#FF8FA3" strokeWidth="1" />
                {/* Right ventricle */}
                <ellipse cx="620" cy="360" rx="18" ry="25" fill="none" stroke="#FF8FA3" strokeWidth="1" />
              </g>

              {/* Heart valves indicator */}
              <circle cx="580" cy="340" r="3" fill="#FF8FA3" opacity="0.7" />
              <circle cx="620" cy="340" r="3" fill="#FF8FA3" opacity="0.7" />
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

            {/* Oxygen molecules at lungs */}
            {[...Array(6)].map((_, i) => (
              <motion.g
                key={`o2-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.circle
                  cx={300 + i * 20}
                  cy={250 + Math.sin(i) * 30}
                  r="5"
                  fill="#FF4D6D"
                  opacity="0.6"
                  animate={{
                    x: [0, Math.cos(i) * 20, 0],
                    y: [0, Math.sin(i) * 20, 0],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                />
                <text
                  x={300 + i * 20}
                  y={256}
                  fill="#FF4D6D"
                  fontSize="8"
                  textAnchor="middle"
                  opacity="0.5"
                  fontWeight="bold"
                >
                  O₂
                </text>
              </motion.g>
            ))}

            {/* Carbon dioxide molecules */}
            {[...Array(5)].map((_, i) => (
              <motion.g
                key={`co2-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.circle
                  cx={900 + i * 20}
                  cy={250 + Math.sin(i + 1) * 30}
                  r="5"
                  fill="#4ECDC4"
                  opacity="0.6"
                  animate={{
                    x: [0, Math.cos(i + 1) * 20, 0],
                    y: [0, Math.sin(i + 1) * 20, 0],
                  }}
                  transition={{
                    duration: 3,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                />
                <text
                  x={900 + i * 20}
                  y={256}
                  fill="#4ECDC4"
                  fontSize="8"
                  textAnchor="middle"
                  opacity="0.5"
                  fontWeight="bold"
                >
                  CO₂
                </text>
              </motion.g>
            ))}

            {/* ===== LABELS ===== */}

            {/* Header labels */}
            <text
              x="300"
              y="240"
              fill="#4ECDC4"
              fontSize="16"
              fontWeight="bold"
              textAnchor="middle"
              className="font-semibold"
            >
              Paru-Paru Kiri
            </text>

            <text
              x="900"
              y="240"
              fill="#4ECDC4"
              fontSize="16"
              fontWeight="bold"
              textAnchor="middle"
              className="font-semibold"
            >
              Paru-Paru Kanan
            </text>

            <text
              x="600"
              y="480"
              fill="#FF4D6D"
              fontSize="18"
              fontWeight="bold"
              textAnchor="middle"
              className="font-semibold"
            >
              Jantung
            </text>

            {/* Circulation labels */}
            <g opacity="0.7">
              <rect x="420" y="320" width="140" height="60" fill="white" opacity="0.8" rx="8" />
              <text
                x="490"
                y="345"
                fill="#4ECDC4"
                fontSize="13"
                fontWeight="bold"
                textAnchor="middle"
              >
                Sirkulasi Kecil
              </text>
              <text
                x="490"
                y="365"
                fill="#6B7280"
                fontSize="11"
                textAnchor="middle"
              >
                (Pulmonal)
              </text>
            </g>

            <g opacity="0.7">
              <rect x="640" y="540" width="140" height="60" fill="white" opacity="0.8" rx="8" />
              <text
                x="710"
                y="565"
                fill="#FF4D6D"
                fontSize="13"
                fontWeight="bold"
                textAnchor="middle"
              >
                Sirkulasi Besar
              </text>
              <text
                x="710"
                y="585"
                fill="#6B7280"
                fontSize="11"
                textAnchor="middle"
              >
                (Sistemik)
              </text>
            </g>

            {/* Artery/Vein labels */}
            <text
              x="350"
              y="150"
              fill="#FF4D6D"
              fontSize="12"
              fontWeight="600"
              opacity="0.8"
            >
              Arteri
            </text>

            <text
              x="550"
              y="150"
              fill="#4ECDC4"
              fontSize="12"
              fontWeight="600"
              opacity="0.8"
            >
              Vena
            </text>
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
