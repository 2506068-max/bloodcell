import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="flex flex-col items-center gap-8 rounded-[2rem] bg-white/95 p-8 shadow-glow dark:bg-slate-950/95">
        <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-8xl">
          ❤️
        </motion.div>
        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Memuat sistem peredaran darah...
        </motion.div>
        <div className="flex gap-2">
          {[0, 1, 2].map((index) => (
            <motion.span key={index} animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.8, delay: index * 0.2, repeat: Infinity }} className="inline-block h-3 w-3 rounded-full bg-gradient-to-r from-primary to-secondary" />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
