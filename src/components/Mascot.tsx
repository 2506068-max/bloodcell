import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

type MascotMood = 'idle' | 'happy' | 'sad' | 'celebrate'

type MascotProps = {
  section: string
  mood?: MascotMood
}

const sectionGuidance: Record<string, { title: string; description: string }> = {
  hero: {
    title: 'Hai, aku Miko!',
    description: 'Scroll ke bawah dan temukan rahasia sistem peredaran darah dengan cara yang seru.'
  },
  organ: {
    title: 'Organ Tubuh',
    description: 'Organ-organ ini bekerja sama menjaga darah tetap sehat dan mengalir ke seluruh tubuh.'
  },
  anatomy: {
    title: 'Anatomi Interaktif',
    description: 'Sentuh organ untuk melihat bagaimana tiap bagian membantu peredaran darahmu.'
  },
  diagram: {
    title: 'Diagram Aliran Darah',
    description: 'Lihat perjalanan darah dari jantung ke paru-paru dan kembali lagi.'
  },
  badges: {
    title: 'Pencapaian',
    description: 'Kumpulkan lencana saat kamu menyelesaikan aktivitas belajar. Ayo teruskan!'
  },
  kuis: {
    title: 'Kuis Interaktif',
    description: 'Jawab pertanyaan dan buktikan seberapa paham kamu tentang sistem peredaran darah.'
  }
}

const heroFacts = [
  'Jantung manusia berdetak sekitar 100.000 kali per hari!',
  'Darah membawa oksigen, nutrisi, dan sinyal penting ke seluruh tubuh.',
  'Sel darah merah berkeliling tubuh hingga 120 hari sebelum diganti.'
]

export default function Mascot({ section, mood = 'idle' }: MascotProps) {
  const [hovered, setHovered] = useState(false)
  const [factIndex, setFactIndex] = useState(0)
  const [blinking, setBlinking] = useState(false)

  const headX = useSpring(0, { stiffness: 140, damping: 18 })
  const headY = useSpring(0, { stiffness: 140, damping: 18 })
  const eyeX = useSpring(0, { stiffness: 180, damping: 16 })
  const eyeY = useSpring(0, { stiffness: 180, damping: 16 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = Math.max(-1, Math.min(1, (event.clientX / window.innerWidth - 0.5) * 2))
      const y = Math.max(-1, Math.min(1, (event.clientY / window.innerHeight - 0.5) * 2))

      headX.set(x * 8)
      headY.set(y * 6)
      eyeX.set(x * 2.2)
      eyeY.set(y * 1.8)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [headX, headY, eyeX, eyeY])

  useEffect(() => {
    const blinkInterval = window.setInterval(() => {
      setBlinking(true)
      window.setTimeout(() => setBlinking(false), 120)
    }, 4200 + Math.random() * 2200)

    return () => window.clearInterval(blinkInterval)
  }, [])

  useEffect(() => {
    if (section !== 'hero') return

    const heroTimer = window.setInterval(() => {
      setFactIndex((prev) => (prev + 1) % heroFacts.length)
    }, 6000)

    return () => window.clearInterval(heroTimer)
  }, [section])

  const guidance = sectionGuidance[section] ?? {
    title: 'Selamat datang!',
    description: 'Ayo jelajahi area pembelajaran dan lihat saran dari Miko si sel darah.'
  }

  const bubbleText = section === 'hero' && hovered ? heroFacts[factIndex] : guidance.description
  const feedbackText = mood === 'happy'
    ? 'Betul! Kamu makin paham.'
    : mood === 'sad'
      ? 'Wah, coba lagi, kamu pasti bisa!'
      : mood === 'celebrate'
        ? 'Luar biasa! Kamu mendapat skor tinggi!'
        : ''

  const showWave = section === 'hero'
  const bubbleTitle = guidance.title
  const moodEmoji = mood === 'happy' ? '✨' : mood === 'sad' ? '💧' : mood === 'celebrate' ? '🎉' : '🩸'

  return (
    <motion.div
      className="fixed right-4 bottom-20 z-50 flex max-w-[22rem] flex-col items-end gap-4 sm:right-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      layout
    >
      <motion.div
        className="pointer-events-auto relative w-full rounded-[1.75rem] border border-white/80 bg-white/95 px-4 py-3 text-sm shadow-2xl shadow-slate-900/10 backdrop-blur-xl text-slate-900 dark:border-slate-700 dark:bg-slate-950/90 dark:text-slate-100"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-slate-900 dark:text-slate-100">{bubbleTitle}</p>
            <p className="mt-2 leading-6 text-[0.95rem] text-slate-700 dark:text-slate-300">
              {feedbackText || bubbleText}
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 via-fuchsia-500 to-cyan-400 text-base text-white shadow-soft">
            {moodEmoji}
          </div>
        </div>
        <span className="absolute -bottom-2 right-5 h-4 w-4 rotate-45 rounded-sm bg-white/95 border-l border-t border-slate-200/80 dark:bg-slate-950/90 dark:border-slate-700" />
      </motion.div>

      <motion.div
        className="relative flex items-center justify-center"
        style={{ x: headX, y: headY }}
        animate={{ y: [0, -8, 0], rotate: [0, 1, -1, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="absolute -right-4 top-8 h-10 w-10 rounded-full bg-cyan-300/25 blur-2xl"
          animate={{ opacity: [0.35, 0.8, 0.35] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -left-4 bottom-0 h-8 w-8 rounded-full bg-pink-300/40 blur-2xl"
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 via-red-500 to-pink-500 border border-white/70 shadow-[0_35px_90px_-45px_rgba(255,77,109,0.85)]"
          animate={showWave ? { rotate: [0, 6, -4, 6, 0] } : { rotate: 0 }}
          transition={{ duration: 1.6, repeat: showWave ? Infinity : 0, ease: 'easeInOut', delay: 0.3 }}
        >
          <motion.div
            className="absolute left-[-8px] top-6 h-10 w-10 rounded-full bg-white/80 shadow-soft"
            animate={showWave ? { rotate: [35, 10, 35, 10] } : { rotate: 15 }}
            transition={{ duration: 1.2, repeat: showWave ? Infinity : 0, ease: 'easeInOut' }}
          />

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-rose-500 via-red-600 to-fuchsia-500 border-2 border-white/80 shadow-soft">
              <motion.div
                className="absolute left-1/3 top-1/3 h-3 w-3 rounded-full bg-white"
                style={{ x: eyeX, y: eyeY }}
                animate={{ scaleY: blinking ? 0.24 : 1 }}
                transition={{ duration: 0.08 }}
              />
              <motion.div
                className="absolute right-1/3 top-1/3 h-3 w-3 rounded-full bg-white"
                style={{ x: eyeX, y: eyeY }}
                animate={{ scaleY: blinking ? 0.24 : 1 }}
                transition={{ duration: 0.08 }}
              />
              <motion.div
                className="absolute left-1/2 top-3/4 h-2 w-10 -translate-x-1/2 rounded-full bg-white/90"
                animate={{ scaleX: hovered ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.span
          className="absolute right-8 bottom-0 block h-2 w-2 rounded-full bg-white/80 shadow-glow"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />
        <motion.span
          className="absolute left-6 bottom-2 block h-3 w-3 rounded-full bg-pink-200/80 shadow-glow"
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
        />
        <motion.span
          className="absolute -bottom-2 left-14 block h-3 w-3 rounded-full bg-cyan-300/80 shadow-glow"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
        />
      </motion.div>
    </motion.div>
  )
}
