import { motion } from 'framer-motion'
import { useState } from 'react'

interface OrganInfo {
  id: string
  label: string
  description: string
  x: number
  y: number
}

const organs: OrganInfo[] = [
  { id: 'heart', label: 'Jantung', description: 'Pompa darah ke seluruh tubuh (70-100 bpm)', x: 50, y: 35 },
  { id: 'lungLeft', label: 'Paru Kiri', description: 'Oksigenasi darah', x: 30, y: 40 },
  { id: 'lungRight', label: 'Paru Kanan', description: 'Pertukaran gas', x: 70, y: 40 },
  { id: 'artery', label: 'Arteri', description: 'Membawa darah kaya oksigen', x: 50, y: 60 },
  { id: 'vein', label: 'Vena', description: 'Membawa darah kembali ke jantung', x: 50, y: 75 },
]

export default function InteractiveAnatomy() {
  const [hoveredOrgan, setHoveredOrgan] = useState<string | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  const handleOrganHover = (id: string, e: React.MouseEvent) => {
    const rect = (e.currentTarget as SVGElement).getBoundingClientRect()
    setTooltipPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
    setHoveredOrgan(id)
  }

  return (
    <div className="w-full bg-white/80 dark:bg-slate-950/80 rounded-[2rem] p-8 shadow-glow backdrop-blur-xl border border-white/50 dark:border-slate-800/50 overflow-hidden">
      <svg
        viewBox="0 0 200 300"
        className="w-full h-auto max-w-2xl mx-auto"
        onMouseLeave={() => setHoveredOrgan(null)}
      >
        <defs>
          <linearGradient id="arterial" x1="0" x2="1">
            <stop offset="0%" stopColor="#FF4D6D" />
            <stop offset="100%" stopColor="#FF8FA3" />
          </linearGradient>
          <linearGradient id="venous" x1="0" x2="1">
            <stop offset="0%" stopColor="#4ECDC4" />
            <stop offset="100%" stopColor="#A0E7E5" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background body outline */}
        <ellipse cx="100" cy="150" rx="50" ry="120" fill="rgba(189, 178, 255, 0.05)" stroke="rgba(189, 178, 255, 0.2)" strokeWidth="1" />

        {/* Arteries - animated glowing lines */}
        <g filter="url(#glow)">
          <path d="M 100 80 L 100 120" stroke="url(#arterial)" strokeWidth="4" fill="none" className={`transition-all duration-300 ${hoveredOrgan === 'artery' ? 'stroke-width:6 opacity-100' : 'opacity-70'}`} />
          <path d="M 100 120 L 60 180" stroke="url(#arterial)" strokeWidth="3" fill="none" opacity="0.6" />
          <path d="M 100 120 L 140 180" stroke="url(#arterial)" strokeWidth="3" fill="none" opacity="0.6" />
          
          {/* Animated flowing particles */}
          <circle cx="100" cy="80" r="2" fill="#FF4D6D">
            <animate attributeName="cy" values="80;120" dur="3s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Veins - animated glowing lines */}
        <g filter="url(#glow)" opacity={hoveredOrgan === 'vein' ? 1 : 0.7}>
          <path d="M 60 180 L 100 140" stroke="url(#venous)" strokeWidth="3" fill="none" />
          <path d="M 140 180 L 100 140" stroke="url(#venous)" strokeWidth="3" fill="none" />
          <path d="M 100 140 L 100 80" stroke="url(#venous)" strokeWidth="4" fill="none" className="transition-all duration-300" />
          
          {/* Animated flowing particles */}
          <circle cx="100" cy="140" r="2" fill="#4ECDC4">
            <animate attributeName="cy" values="140;80" dur="3s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Heart - interactive */}
        <g
          className="cursor-pointer"
          onMouseEnter={(e) => handleOrganHover('heart', e)}
        >
          <motion.ellipse
            cx="100"
            cy="80"
            rx="12"
            ry="14"
            fill={hoveredOrgan === 'heart' ? '#FF4D6D' : '#FFB3C1'}
            animate={{
              scale: hoveredOrgan === 'heart' ? 1.3 : 1,
              filter: hoveredOrgan === 'heart' ? 'drop-shadow(0 0 12px #FF4D6D)' : 'drop-shadow(0 0 4px rgba(0,0,0,0.1))',
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
          <motion.text
            x="100"
            y="82"
            textAnchor="middle"
            fontSize="16"
            fill="white"
            fontWeight="bold"
            animate={{ scale: hoveredOrgan === 'heart' ? 1.2 : 1 }}
          >
            ❤️
          </motion.text>
        </g>

        {/* Left Lung */}
        <g
          className="cursor-pointer"
          onMouseEnter={(e) => handleOrganHover('lungLeft', e)}
        >
          <motion.ellipse
            cx="60"
            cy="100"
            rx="15"
            ry="25"
            fill={hoveredOrgan === 'lungLeft' ? '#A0E7E5' : '#D5F4F1'}
            animate={{
              scale: hoveredOrgan === 'lungLeft' ? 1.15 : 1,
              filter: hoveredOrgan === 'lungLeft' ? 'drop-shadow(0 0 12px #4ECDC4)' : 'drop-shadow(0 0 2px rgba(0,0,0,0.05))',
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
          <motion.text
            x="60"
            y="105"
            textAnchor="middle"
            fontSize="14"
            fill="white"
            fontWeight="bold"
            animate={{ scale: hoveredOrgan === 'lungLeft' ? 1.15 : 1 }}
          >
            🫁
          </motion.text>
        </g>

        {/* Right Lung */}
        <g
          className="cursor-pointer"
          onMouseEnter={(e) => handleOrganHover('lungRight', e)}
        >
          <motion.ellipse
            cx="140"
            cy="100"
            rx="15"
            ry="25"
            fill={hoveredOrgan === 'lungRight' ? '#A0E7E5' : '#D5F4F1'}
            animate={{
              scale: hoveredOrgan === 'lungRight' ? 1.15 : 1,
              filter: hoveredOrgan === 'lungRight' ? 'drop-shadow(0 0 12px #4ECDC4)' : 'drop-shadow(0 0 2px rgba(0,0,0,0.05))',
            }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
          <motion.text
            x="140"
            y="105"
            textAnchor="middle"
            fontSize="14"
            fill="white"
            fontWeight="bold"
            animate={{ scale: hoveredOrgan === 'lungRight' ? 1.15 : 1 }}
          >
            🫁
          </motion.text>
        </g>

        {/* Tooltip */}
        {hoveredOrgan && (
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <foreignObject
              x={tooltipPos.x - 50}
              y={tooltipPos.y - 60}
              width="120"
              height="60"
            >
              <div className="bg-gradient-to-r from-primary to-secondary text-white text-xs rounded-2xl p-3 shadow-lg">
                <p className="font-bold">{organs.find(o => o.id === hoveredOrgan)?.label}</p>
                <p className="text-[10px] opacity-90">{organs.find(o => o.id === hoveredOrgan)?.description}</p>
              </div>
            </foreignObject>
          </motion.g>
        )}
      </svg>

      {/* Legend */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {organs.map((organ) => (
          <motion.button
            key={organ.id}
            onClick={() => setHoveredOrgan(organ.id)}
            whileHover={{ scale: 1.05 }}
            className={`rounded-2xl px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
              hoveredOrgan === organ.id
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {organ.label}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
