import { motion } from 'framer-motion'

export default function EnhancedBloodFlowDiagram() {
  return (
    <div className="w-full bg-white/80 dark:bg-slate-950/80 rounded-[2rem] p-8 shadow-glow backdrop-blur-xl border border-white/50 dark:border-slate-800/50 overflow-hidden">
      <svg viewBox="0 0 1000 300" className="w-full h-auto">
        <defs>
          {/* Arterial gradient - bright red */}
          <linearGradient id="arterialGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF4D6D" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFB3C1" stopOpacity="1" />
            <stop offset="100%" stopColor="#FF4D6D" stopOpacity="0.8" />
          </linearGradient>

          {/* Venous gradient - cool teal */}
          <linearGradient id="venousGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#A0E7E5" stopOpacity="1" />
            <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0.8" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Paru-paru Kiri */}
        <g>
          <circle cx="100" cy="150" r="45" fill="rgba(160, 231, 229, 0.2)" stroke="#A0E7E5" strokeWidth="2" />
          <text x="100" y="155" textAnchor="middle" fontSize="24" fill="#4ECDC4">🫁</text>
          <text x="100" y="210" textAnchor="middle" fontSize="14" fontWeight="bold" fill="currentColor">Paru-paru</text>
        </g>

        {/* Jantung */}
        <g filter="url(#glow)">
          <circle cx="500" cy="150" r="50" fill="rgba(255, 77, 109, 0.15)" stroke="#FF4D6D" strokeWidth="3" />
          <motion.text
            x="500"
            y="160"
            textAnchor="middle"
            fontSize="36"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            ❤️
          </motion.text>
          <text x="500" y="230" textAnchor="middle" fontSize="14" fontWeight="bold" fill="currentColor">Jantung</text>
        </g>

        {/* Paru-paru Kanan */}
        <g>
          <circle cx="900" cy="150" r="45" fill="rgba(160, 231, 229, 0.2)" stroke="#A0E7E5" strokeWidth="2" />
          <text x="900" y="155" textAnchor="middle" fontSize="24" fill="#4ECDC4">🫁</text>
          <text x="900" y="210" textAnchor="middle" fontSize="14" fontWeight="bold" fill="currentColor">Paru-paru</text>
        </g>

        {/* Arteri - aliran ke tubuh */}
        <g filter="url(#glow)">
          {/* Main arterial path */}
          <path
            d="M 550 150 L 650 150"
            stroke="url(#arterialGradient)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Animated flow indicator */}
          <motion.circle
            cx="550"
            cy="150"
            r="6"
            fill="#FF4D6D"
            animate={{ cx: [550, 650] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.circle
            cx="550"
            cy="150"
            r="6"
            fill="#FF4D6D"
            animate={{ cx: [480, 580] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />

          <text x="600" y="125" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#FF4D6D">
            Arteri
          </text>
        </g>

        {/* Vena - kembali ke jantung */}
        <g filter="url(#glow)">
          {/* Main venous path */}
          <path
            d="M 650 150 L 550 150"
            stroke="url(#venousGradient)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            opacity="0.9"
            strokeDasharray="20,10"
          />

          {/* Animated flow */}
          <motion.circle
            cx="650"
            cy="150"
            r="6"
            fill="#4ECDC4"
            animate={{ cx: [650, 550] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />

          <text x="600" y="180" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4ECDC4">
            Vena
          </text>
        </g>

        {/* Capillary network representation */}
        <g opacity="0.6">
          <circle cx="750" cy="100" r="30" fill="none" stroke="#FF8FA3" strokeWidth="1" strokeDasharray="5,5" />
          <circle cx="750" cy="200" r="30" fill="none" stroke="#A0E7E5" strokeWidth="1" strokeDasharray="5,5" />
          <text x="750" y="105" textAnchor="middle" fontSize="11" fill="currentColor" fontWeight="bold">Kapiler</text>
          <text x="750" y="210" textAnchor="middle" fontSize="11" fill="currentColor" fontWeight="bold">Kapiler</text>
        </g>

        {/* Flow description */}
        <g opacity="0.7">
          <text x="100" y="270" fontSize="12" fill="currentColor" fontWeight="bold">1. Oksigen masuk</text>
          <text x="400" y="270" fontSize="12" fill="currentColor" fontWeight="bold">2. Dipompa jantung</text>
          <text x="700" y="270" fontSize="12" fill="currentColor" fontWeight="bold">3. Ke seluruh tubuh</text>
          <text x="850" y="270" fontSize="12" fill="currentColor" fontWeight="bold">4. Kembali</text>
        </g>
      </svg>

      {/* Interactive legend */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 p-4 rounded-2xl bg-primary/10 border border-primary/20"
        >
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary" />
          <div className="text-sm">
            <p className="font-semibold">Arteri (Keluar)</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Darah kaya oksigen</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 p-4 rounded-2xl bg-secondary/10 border border-secondary/20"
        >
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-secondary to-accent" />
          <div className="text-sm">
            <p className="font-semibold">Vena (Masuk)</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Darah untuk oksigenasi ulang</p>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 p-4 rounded-2xl bg-lavender/10 border border-lavender/20"
        >
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-lavender to-primary" />
          <div className="text-sm">
            <p className="font-semibold">Siklus Terus</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Tanpa henti 24/7</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
