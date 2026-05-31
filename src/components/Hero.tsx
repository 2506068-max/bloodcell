import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative min-h-[600px] flex items-center py-20 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-primary opacity-10 blur-3xl rounded-full w-96 h-96 -top-48 -left-48" />
      <div className="absolute inset-0 gradient-secondary opacity-10 blur-3xl rounded-full w-96 h-96 -bottom-48 -right-48" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Jelajahi Sistem
              <span className="text-gradient ml-2">Peredaran Darah</span>
            </motion.h1>

            <motion.p
              className="text-xl text-text-muted mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Pelajari tentang jantung, pembuluh darah, dan sel darah dengan cara yang menyenangkan dan interaktif!
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link to="/pengertian">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary w-full sm:w-auto"
                >
                  Mulai Belajar
                </motion.button>
              </Link>
              <Link to="/galeri">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline w-full sm:w-auto"
                >
                  Lihat Galeri
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Animation */}
          <motion.div
            className="relative h-96 hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Animated Heart */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-9xl absolute inset-0 flex items-center justify-center"
            >
              ❤️
            </motion.div>

            {/* Orbiting cells */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, delay: i * 0.3 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  className="absolute text-3xl"
                  style={{
                    top: '50%',
                    left: '50%',
                    x: 80,
                    y: -12,
                  }}
                >
                  🔴
                </motion.div>
              </motion.div>
            ))}

            {/* Pulsing circles */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={`circle-${i}`}
                animate={{
                  scale: [0.5, 1.2, 0.5],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className={`absolute rounded-full border-2 ${
                  i === 1 ? 'border-primary' : i === 2 ? 'border-secondary' : 'border-accent'
                }`}
                style={{
                  width: `${100 + i * 80}px`,
                  height: `${100 + i * 80}px`,
                  top: '50%',
                  left: '50%',
                  marginTop: `${-50 - (i * 40)}px`,
                  marginLeft: `${-50 - (i * 40)}px`,
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
