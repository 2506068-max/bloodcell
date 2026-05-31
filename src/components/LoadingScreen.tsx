import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="flex flex-col items-center gap-8">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-8xl"
        >
          ❤️
        </motion.div>
        
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-2xl font-bold text-gradient"
        >
          Memuat Sistem Peredaran Darah...
        </motion.div>
        
        <motion.div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
              className="w-4 h-4 rounded-full gradient-primary"
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
