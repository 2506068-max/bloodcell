import { motion } from 'framer-motion'
import RippleButton from './RippleButton'
import AnatomicalHeart from './anatomical/AnatomicalHeart'
import { ArrowRight, BookOpen, Heart, Activity, Microscope } from 'lucide-react'

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pb-28">
      {/* Subtle clinical background gradients */}
      <div className="pointer-events-none absolute inset-0 h-full bg-[radial-gradient(circle_at_15%_20%,_rgba(190,18,60,0.06),_transparent_35%),radial-gradient(circle_at_85%_25%,_rgba(2,132,199,0.06),_transparent_35%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />

      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
        {/* Left Column: Scientific & Educational Copy */}
        <div className="relative z-10 flex flex-col justify-center gap-7">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-rose-200/80 bg-rose-50/70 px-4 py-1.5 text-xs font-bold text-rose-900 shadow-sm backdrop-blur-md dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200 w-fit"
          >
            <span className="flex h-2 w-2 rounded-full bg-rose-600 animate-pulse" />
            Atlas Anatomi Medis Interaktif • Edisi Pembelajaran Klinis
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="space-y-2"
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white leading-[1.08]">
              Pelajari Sistem <br />
              <span className="bg-gradient-to-r from-rose-700 via-rose-600 to-sky-700 bg-clip-text text-transparent">
                Peredaran Darah
              </span> <br />
              Secara Anatomi Nyata.
            </h1>
            <p className="max-w-xl text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
              Jelajahi arsitektur jantung biologis, sirkulasi pulmonalis-sistemik, penampang histologi pembuluh darah, dan sel darah mikroskopis dengan visual ilmiah standar buku anatomi modern.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex flex-col gap-3.5 sm:flex-row sm:items-center pt-1"
          >
            <RippleButton
              variant="primary"
              size="lg"
              onClick={() => {
                document.getElementById('organ')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-rose-700 hover:bg-rose-800 text-white font-semibold shadow-md shadow-rose-900/15"
            >
              <Heart size={18} className="mr-1 fill-current" />
              <span>Eksplorasi Organ Anatomi</span>
              <ArrowRight size={18} />
            </RippleButton>

            <RippleButton
              variant="outline"
              size="lg"
              onClick={() => {
                document.getElementById('diagram')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 font-semibold"
            >
              <Activity size={18} className="mr-1 text-sky-600" />
              <span>Simulasi Hemodinamik</span>
            </RippleButton>
          </motion.div>

          {/* Clinical Pillars Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="grid gap-3 sm:grid-cols-3 pt-2"
          >
            <div className="rounded-2xl border border-slate-200/90 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                  <Activity size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Hemodinamika</p>
                  <p className="text-[11px] text-slate-500">Sistol & Diastol</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                  <BookOpen size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Atlas Anatomi</p>
                  <p className="text-[11px] text-slate-500">Nomenklatur Latin</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-white/80 p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                  <Microscope size={18} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Histologi Sel</p>
                  <p className="text-[11px] text-slate-500">Resolusi Mikroskopis</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Grand Realistic Anatomical Heart Focal Point */}
        <div className="relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="relative w-full rounded-3xl border border-slate-200/80 bg-gradient-to-b from-white via-slate-50/50 to-white p-4 sm:p-6 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80"
          >
            {/* Subtle radial glow */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-rose-500/10 blur-3xl" />
            <div className="pointer-events-none absolute right-4 top-8 h-36 w-36 rounded-full bg-sky-500/10 blur-2xl" />

            {/* Interactive Anatomical Heart Viewer */}
            <AnatomicalHeart interactive={true} showLabels={true} size="lg" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
