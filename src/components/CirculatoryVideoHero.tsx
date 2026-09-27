import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Maximize2, ArrowDown, Activity, Heart, Wind } from 'lucide-react'

export default function CirculatoryVideoHero() {
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const restartVideo = () => {
    if (!videoRef.current) return
    videoRef.current.currentTime = 0
    videoRef.current.play()
    setIsPlaying(true)
  }

  const handleFullscreen = () => {
    if (!videoRef.current) return
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen()
    }
  }

  const scrollToInteractive = () => {
    document.getElementById('sirkulasi-animasi')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="video-sirkulasi" className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-gradient-to-b from-[#FBF8F3] via-[#F6F0E8] to-[#FAF7F2] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-t border-amber-200/40 dark:border-slate-800 overflow-hidden">
      {/* Warm ambient medical glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 dark:bg-rose-500/10 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-amber-300/80 bg-amber-100/60 dark:border-amber-900/60 dark:bg-amber-950/40 px-3.5 py-1.5 text-xs font-bold text-amber-900 dark:text-amber-200 shadow-sm backdrop-blur-md mb-3"
          >
            <span className="flex h-2 w-2 rounded-full bg-rose-600 animate-pulse" />
            <span>Simulasi Sinematik 3D • Loop Sirkulasi Tertutup</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Dinamika Sirkulasi Tertutup{' '}
            <span className="bg-gradient-to-r from-rose-700 via-rose-600 to-sky-700 bg-clip-text text-transparent">
              Paru, Jantung & Jaringan
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed"
          >
            Visualisasi gerak kontinu aliran hemodinamik satu arah: darah terdeoksigenasi dialirkan menuju paru untuk oksigenasi, lalu dipompa ke sirkulasi sistemik hingga anyaman kapiler jaringan tubuh.
          </motion.p>
        </div>

        {/* Video Player Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden border border-amber-200/90 dark:border-slate-800 bg-stone-900 shadow-2xl shadow-stone-900/20 group"
        >
          {/* Native HTML5 Video Player */}
          <div className="relative aspect-video w-full bg-[#F5EFE6] flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src="/referensi_sirkulasi.mp4"
              poster="/assets/sirkulasi_poster.png"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-contain"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Custom Floating Control Bar */}
            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-stone-950/80 via-stone-950/40 to-transparent flex items-center justify-between opacity-90 transition-opacity group-hover:opacity-100">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-600 text-white shadow-lg shadow-rose-900/30 hover:bg-rose-500 transition-all hover:scale-105"
                  title={isPlaying ? 'Jeda video' : 'Putar video'}
                  aria-label={isPlaying ? 'Jeda video' : 'Putar video'}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>

                <button
                  onClick={restartVideo}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/30 transition-all"
                  title="Ulangi video dari awal"
                  aria-label="Ulangi"
                >
                  <RotateCcw size={16} />
                </button>

                <span className="hidden sm:inline-flex text-xs font-semibold text-white/90 bg-stone-900/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                  Putaran Sinematik ~10s (Zoom & Pan)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleFullscreen}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md hover:bg-white/30 transition-all"
                  title="Mode Layar Penuh"
                  aria-label="Layar Penuh"
                >
                  <Maximize2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Clinical Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-8">
          <div className="rounded-2xl border border-amber-200/80 bg-white/80 dark:border-slate-800 dark:bg-slate-900/80 p-4 shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                <Wind size={18} />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Alveolus Paru-Paru</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Arteri pulmonalis mengalirkan darah deoksigenasi (biru) ke anyaman kapiler paru untuk melepaskan CO₂ dan mengikat O₂.
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200/80 bg-white/80 dark:border-slate-800 dark:bg-slate-900/80 p-4 shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                <Heart size={18} />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Cor Humanum 4 Ruang</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Potongan melintang memperlihatkan katup, trabekula miokardium, serta pemisahan sempurna sisi kanan (RV/RA) dan sisi kiri (LV/LA).
            </p>
          </div>

          <div className="rounded-2xl border border-amber-200/80 bg-white/80 dark:border-slate-800 dark:bg-slate-900/80 p-4 shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                <Activity size={18} />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Jaring Kapiler Sistemik</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Loop oval di bagian bawah mendistribusikan oksigen ke sel tubuh dengan gradasi transisi dari merah (arteri) ke ungu hingga biru (vena).
            </p>
          </div>
        </div>

        {/* Link to Interactive Diagram Below */}
        <div className="text-center mt-8">
          <button
            onClick={scrollToInteractive}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 px-5 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-all hover:scale-105"
          >
            <span>Buka Diagram Interaktif Berseri (8 Tahap Alur)</span>
            <ArrowDown size={14} className="animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  )
}
