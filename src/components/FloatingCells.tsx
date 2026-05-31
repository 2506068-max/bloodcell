import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface CellItem {
  id: number
  x: number
  y: number
  delay: number
  size: number
  color: string
}

export default function FloatingCells() {
  const [cells, setCells] = useState<CellItem[]>([])

  useEffect(() => {
    const colors = ['#FF4D6D', '#FF8FA3', '#4ECDC4', '#A0E7E5']
    setCells(
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: Math.random() * 95,
        y: Math.random() * 95,
        delay: Math.random() * 8,
        size: 10 + Math.random() * 24,
        color: colors[i % colors.length],
      })),
    )
  }, [])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {cells.map((cell) => (
        <motion.div
          key={cell.id}
          initial={{ x: cell.x, y: cell.y, opacity: 0 }}
          animate={{ x: [cell.x, cell.x + 10, cell.x], y: [cell.y, cell.y - 20, cell.y], opacity: [0, 0.9, 0.4] }}
          transition={{ delay: cell.delay, duration: 10 + (cell.id % 4) * 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute rounded-full blur-sm"
          style={{
            width: `${cell.size}px`,
            height: `${cell.size}px`,
            background: `radial-gradient(circle at 35% 35%, ${cell.color}, transparent 45%)`,
          }}
        />
      ))}
    </div>
  )
}
