import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface FloatingMicroscopicCell {
  id: number
  x: number
  y: number
  delay: number
  size: number
  opacity: number
  type: 'rbc' | 'platelet'
  duration: number
}

export default function FloatingCells() {
  const [cells, setCells] = useState<FloatingMicroscopicCell[]>([])

  useEffect(() => {
    // Generate gentle realistic microscopic cells in background
    setCells(
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 92,
        y: Math.random() * 92,
        delay: Math.random() * 6,
        size: i % 2 === 0 ? 18 + Math.random() * 16 : 8 + Math.random() * 8,
        opacity: 0.12 + Math.random() * 0.16,
        type: i % 3 === 0 ? 'platelet' : 'rbc',
        duration: 12 + Math.random() * 8,
      }))
    )
  }, [])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none">
      {cells.map((cell) => (
        <motion.div
          key={cell.id}
          initial={{ x: `${cell.x}vw`, y: `${cell.y}vh`, opacity: 0 }}
          animate={{
            x: [`${cell.x}vw`, `${(cell.x + 3) % 95}vw`, `${cell.x}vw`],
            y: [`${cell.y}vh`, `${(cell.y - 6) % 95}vh`, `${cell.y}vh`],
            opacity: [0, cell.opacity, cell.opacity * 0.7, 0],
            rotate: [0, 45, -30, 0],
          }}
          transition={{
            delay: cell.delay,
            duration: cell.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute"
        >
          {cell.type === 'rbc' ? (
            // Realistic biconcave erythrocyte silhouette
            <svg
              width={cell.size}
              height={cell.size}
              viewBox="0 0 40 40"
              className="filter blur-[0.6px]"
            >
              <defs>
                <radialGradient id={`rbc-ambient-${cell.id}`} cx="40%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="#BE123C" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#9F1239" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#881337" stopOpacity="0.6" />
                </radialGradient>
              </defs>
              <circle cx="20" cy="20" r="18" fill={`url(#rbc-ambient-${cell.id})`} />
              {/* Central pallor depression */}
              <ellipse cx="20" cy="20" rx="9" ry="8" fill="#4C0519" opacity="0.75" />
            </svg>
          ) : (
            // Tiny irregular platelet fragment
            <svg
              width={cell.size}
              height={cell.size}
              viewBox="0 0 20 20"
              className="filter blur-[0.4px]"
            >
              <path
                d="M 10 3 Q 15 2 17 8 Q 18 14 13 17 Q 6 18 3 13 Q 2 6 10 3 Z"
                fill="#D97706"
                opacity="0.65"
              />
            </svg>
          )}
        </motion.div>
      ))}
    </div>
  )
}
