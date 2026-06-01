import { motion } from 'framer-motion'
import { useState } from 'react'

interface BloodCellDetailProps {
  cellType?: 'rbc' | 'wbc' | 'platelet' | 'oxygen' | 'co2' | 'glucose'
}

export default function BloodCellDetail({ cellType = 'rbc' }: BloodCellDetailProps) {
  const [selectedCell, setSelectedCell] = useState<string | null>(null)

  const cellDetails = {
    rbc: {
      name: 'Sel Darah Merah (Eritrosit)',
      icon: '🔴',
      color: '#FF4D6D',
      description: 'Mengangkut oksigen dari paru-paru ke seluruh tubuh',
      facts: [
        'Berdiameter 6-8 mikron',
        'Tanpa inti sel untuk kapasitas oksigen maksimal',
        'Umur 120 hari',
        '25-30 triliun dalam tubuh manusia',
        'Diproduksi di sumsum tulang',
      ],
    },
    wbc: {
      name: 'Sel Darah Putih (Leukosit)',
      icon: '⚪',
      color: '#A0E7E5',
      description: 'Melindungi tubuh dari infeksi dan penyakit',
      facts: [
        'Berdiameter 12-17 mikron',
        'Memiliki inti sel besar',
        'Umur 5-90 hari tergantung jenis',
        '4.500-11.000 per mikroliter darah',
        'Bergerak aktif melalui dinding pembuluh',
      ],
    },
    platelet: {
      name: 'Trombosit (Platelet)',
      icon: '⭐',
      color: '#CDB4DB',
      description: 'Membantu pembekuan darah untuk menghentikan pendarahan',
      facts: [
        'Berdiameter 2-4 mikron',
        'Fragmen sitoplasma megakariosit',
        'Umur 7-10 hari',
        '150.000-400.000 per mikroliter darah',
        'Berkumpul saat pembuluh darah cedera',
      ],
    },
    oxygen: {
      name: 'Molekul Oksigen (O₂)',
      icon: '🌫️',
      color: '#FF4D6D',
      description: 'Diperlukan untuk respirasi sel dan produksi energi',
      facts: [
        'Terikat pada hemoglobin dalam RBC',
        'Dibutuhkan untuk metabolisme aerobik',
        'Diambil dari udara yang dihirup',
        'Dilepaskan di jaringan tubuh',
        '98% dalam RBC, 1.5% terlarut, 0.3% dalam plasma',
      ],
    },
    co2: {
      name: 'Karbon Dioksida (CO₂)',
      icon: '💨',
      color: '#4ECDC4',
      description: 'Hasil limbah metabolisme yang dibuang melalui paru-paru',
      facts: [
        'Produk sampingan respirasi sel',
        '70% diangkut sebagai bikarbonat',
        '23% terikat hemoglobin',
        '7% terlarut dalam plasma',
        'Dikeluarkan saat menghembuskan napas',
      ],
    },
    glucose: {
      name: 'Glukosa',
      icon: '🍬',
      color: '#FFB347',
      description: 'Sumber energi utama untuk semua sel tubuh',
      facts: [
        'Kadar normal 70-100 mg/dL saat puasa',
        'Diangkut oleh protein carrier',
        'Disimpan sebagai glikogen di hati',
        'Diatur oleh hormon insulin',
        'Penting untuk fungsi otak dan otot',
      ],
    },
  }

  const getActiveCell = () => selectedCell || cellType
  const active = cellDetails[getActiveCell() as keyof typeof cellDetails]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const cellVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { type: 'spring', stiffness: 300 },
    },
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <motion.div
      className="relative w-full max-w-5xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Main visualization grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {Object.entries(cellDetails).map(([key, detail]) => (
          <motion.button
            key={key}
            onClick={() => setSelectedCell(key)}
            className={`p-4 rounded-2xl transition-all ${
              getActiveCell() === key
                ? 'bg-gradient-to-br from-[#FF4D6D]/20 to-[#4ECDC4]/20 border-2 border-[#FF4D6D] shadow-lg'
                : 'bg-white/50 border border-white/30 hover:bg-white/70 hover:border-[#FF4D6D]/30'
            }`}
            whileHover="hover"
            variants={cellVariants}
          >
            <div className="text-4xl mb-2 text-center">{detail.icon}</div>
            <p className="text-xs font-semibold text-slate-700 text-center leading-tight">
              {detail.name.split(' (')[0]}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Detail card */}
      <motion.div
        key={getActiveCell()}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="relative bg-gradient-to-br from-white/80 via-white/70 to-slate-50/50 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-[0_30px_60px_-15px_rgba(15,23,42,0.15)]"
      >
        {/* Decorative glow */}
        <div
          className="absolute inset-0 rounded-3xl opacity-20 blur-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at top right, ${active.color}, transparent)`,
          }}
        />

        <div className="relative z-10">
          {/* Header */}
          <motion.div className="text-center mb-8" variants={itemVariants}>
            <motion.div
              className="text-8xl mb-4 inline-block"
              animate="animate"
              variants={pulseVariants}
            >
              {active.icon}
            </motion.div>
            <h3
              className="text-3xl md:text-4xl font-bold mb-3"
              style={{ color: active.color }}
            >
              {active.name}
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              {active.description}
            </p>
          </motion.div>

          {/* Facts grid */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8" variants={itemVariants}>
            {active.facts.map((fact, idx) => (
              <motion.div
                key={idx}
                className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/50 hover:border-slate-300 transition-all hover:shadow-md"
                whileHover={{ y: -2 }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: active.color }}
                  />
                  <p className="text-slate-700 text-sm leading-relaxed">{fact}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* 3D visualization representation */}
          <motion.div className="mt-8" variants={itemVariants}>
            <h4 className="font-semibold text-slate-800 mb-4">Visualisasi Sel</h4>
            <div className="flex items-center justify-center gap-8 p-8 bg-gradient-to-r from-slate-50/50 to-slate-100/50 rounded-2xl border border-slate-200/30">
              {/* Cell illustration */}
              <svg viewBox="0 0 200 200" className="w-32 h-32 flex-shrink-0">
                {/* Main cell body */}
                {getActiveCell() === 'rbc' && (
                  <g>
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill="none"
                      stroke={active.color}
                      strokeWidth="2"
                      animate={{ r: [70, 75, 70] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.ellipse
                      cx="100"
                      cy="100"
                      rx="65"
                      ry="50"
                      fill={active.color}
                      opacity="0.3"
                      animate={{
                        rx: [65, 70, 65],
                        ry: [50, 55, 50],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <circle cx="100" cy="100" r="30" fill={active.color} opacity="0.5" />
                  </g>
                )}

                {getActiveCell() === 'wbc' && (
                  <g>
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      fill={active.color}
                      opacity="0.2"
                      stroke={active.color}
                      strokeWidth="2"
                    />
                    <circle cx="100" cy="100" r="45" fill={active.color} opacity="0.5" />
                    <circle cx="100" cy="100" r="25" fill="white" stroke={active.color} strokeWidth="1.5" />
                    {[0, 120, 240].map(angle => (
                      <line
                        key={angle}
                        x1="100"
                        y1="100"
                        x2={
                          100 +
                          65 * Math.cos(((angle - 90) * Math.PI) / 180)
                        }
                        y2={
                          100 +
                          65 * Math.sin(((angle - 90) * Math.PI) / 180)
                        }
                        stroke={active.color}
                        strokeWidth="2"
                        opacity="0.4"
                      />
                    ))}
                  </g>
                )}

                {getActiveCell() === 'platelet' && (
                  <g>
                    <motion.path
                      d="M 100 40 L 130 70 L 120 100 L 130 130 L 100 160 L 70 130 L 60 100 L 70 70 Z"
                      fill={active.color}
                      opacity="0.3"
                      stroke={active.color}
                      strokeWidth="2"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                      style={{ transformOrigin: '100px 100px' }}
                    />
                    <circle cx="100" cy="100" r="25" fill={active.color} opacity="0.6" />
                  </g>
                )}

                {getActiveCell() === 'oxygen' && (
                  <g>
                    {[0, 120, 240].map(angle => (
                      <motion.circle
                        key={angle}
                        cx={100 + 40 * Math.cos(((angle - 90) * Math.PI) / 180)}
                        cy={100 + 40 * Math.sin(((angle - 90) * Math.PI) / 180)}
                        r="15"
                        fill={active.color}
                        opacity="0.7"
                        animate={{
                          y: [0, -5, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: angle / 120 * 0.5,
                          repeat: Infinity,
                        }}
                      />
                    ))}
                    <circle cx="100" cy="100" r="20" fill={active.color} opacity="0.3" />
                  </g>
                )}

                {getActiveCell() === 'co2' && (
                  <g>
                    <circle cx="100" cy="100" r="65" fill="none" stroke={active.color} strokeWidth="2" opacity="0.5" />
                    <motion.circle
                      cx="100"
                      cy="100"
                      r="50"
                      fill={active.color}
                      opacity="0.3"
                      animate={{
                        r: [50, 60, 50],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <circle cx="100" cy="100" r="30" fill={active.color} opacity="0.6" />
                    <text
                      x="100"
                      y="110"
                      textAnchor="middle"
                      fontSize="24"
                      fill={active.color}
                      opacity="0.5"
                      fontWeight="bold"
                    >
                      CO₂
                    </text>
                  </g>
                )}

                {getActiveCell() === 'glucose' && (
                  <g>
                    <circle cx="100" cy="100" r="70" fill={active.color} opacity="0.15" />
                    {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
                      <motion.circle
                        key={angle}
                        cx={100 + 45 * Math.cos(((angle - 90) * Math.PI) / 180)}
                        cy={100 + 45 * Math.sin(((angle - 90) * Math.PI) / 180)}
                        r="10"
                        fill={active.color}
                        opacity="0.5"
                        animate={{
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          duration: 2,
                          delay: idx * 0.15,
                          repeat: Infinity,
                        }}
                      />
                    ))}
                    <circle cx="100" cy="100" r="25" fill={active.color} opacity="0.6" />
                  </g>
                )}
              </svg>

              {/* Information */}
              <div className="flex-1">
                <h5 className="font-semibold text-slate-800 mb-2">Karakteristik Utama</h5>
                <ul className="space-y-1 text-sm text-slate-600">
                  <li>✓ Fungsi: {active.description}</li>
                  <li>✓ Jenis: {getActiveCell().toUpperCase()}</li>
                  <li>✓ Warna: {active.color}</li>
                  <li>✓ Interaktif dan responsif</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer info */}
      <motion.p
        className="text-center text-sm text-slate-500 mt-8"
        variants={itemVariants}
      >
        💡 Klik pada elemen lain di atas untuk mempelajari lebih lanjut tentang komponen darah yang berbeda
      </motion.p>
    </motion.div>
  )
}
