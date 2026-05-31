import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MousePosition {
  x: number
  y: number
}

export default function ParallaxHero() {
  const [offset, setOffset] = useState<MousePosition>({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height

      setOffset({
        x: x * 20,
        y: y * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div ref={containerRef} className="relative h-96 overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary/10 via-transparent to-secondary/10">
      {/* Parallax background layers */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(255, 77, 109, 0.2), transparent 50%)',
          x: offset.x * 0.5,
          y: offset.y * 0.5,
        }}
      />

      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 80% 50%, rgba(78, 205, 196, 0.2), transparent 50%)',
          x: offset.x * 0.8,
          y: offset.y * 0.8,
        }}
      />

      {/* Floating medical icons */}
      <motion.div
        className="absolute top-10 left-10 text-4xl"
        animate={{
          y: [0, -20, 0],
          x: offset.x * 0.3,
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        💉
      </motion.div>

      <motion.div
        className="absolute top-20 right-20 text-3xl"
        animate={{
          y: [0, 15, 0],
          x: offset.x * 0.4,
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
      >
        🩺
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-16 text-2xl"
        animate={{
          y: [0, -12, 0],
          x: offset.x * 0.35,
        }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
      >
        🧬
      </motion.div>

      {/* Main content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="text-center"
          style={{
            x: offset.x * 0.2,
            y: offset.y * 0.2,
          }}
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ❤️
          </motion.div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Rasakan aliran darah Anda
          </h2>
        </motion.div>
      </div>

      {/* Animated particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/30"
          animate={{
            x: Math.sin(i) * 100 + offset.x * 0.2,
            y: Math.cos(i) * 100 + offset.y * 0.2,
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
          }}
        />
      ))}
    </div>
  )
}
