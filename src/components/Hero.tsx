import { motion } from 'framer-motion'
import RippleButton from './RippleButton'
import ParallaxHero from './ParallaxHero'
import { ArrowRight, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(255,_77,_109,_0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(78,_205,_196,_0.16),_transparent_24%)]" />
      <div className="pointer-events-none absolute right-0 top-24 h-56 w-56 rounded-full bg-[#FFE66D]/30 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/90 px-4 py-2 text-sm font-semibold text-primary shadow-sm shadow-primary/10 backdrop-blur-xl dark:bg-slate-900/75 dark:border-primary/30">
            Edukasi Sistem Darah
          </div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }} className="mt-8 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-slate-100">
            Pelajari Sistem Peredaran Darah dengan Cara yang <span className="text-gradient">Colorful</span> dan Menyenangkan.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.75 }} className="mt-6 max-w-2xl text-base leading-8 text-[color:var(--muted)] sm:text-lg">
            Tampilan edukatif untuk semua usia — responsif, interaktif, dan nyaman digunakan di ponsel, tablet, maupun desktop.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.75 }} className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <RippleButton variant="primary" size="md" onClick={() => window.location.hash = '#kuis'}>
              <span>Mulai Kuis Sekarang</span>
              <ArrowRight size={18} />
            </RippleButton>
            <RippleButton variant="outline" size="md" onClick={() => window.location.hash = '#diagram'}>
              <Play size={18} />
              <span>Lihat Diagram</span>
            </RippleButton>
          </motion.div>

          <div className="grid gap-4 pt-12 sm:grid-cols-2">
            {[
              { label: 'Animasi denyut jantung', icon: '❤️' },
              { label: 'Alur darah interaktif', icon: '🩸' },
              { label: 'Kuis touch friendly', icon: '🖐️' },
              { label: 'Mode gelap & responsif', icon: '🌙' },
            ].map((item) => (
              <div key={item.label} className="glass-card rounded-3xl border border-white/70 p-5 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/70">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-secondary/15 text-2xl">{item.icon}</div>
                  <p className="font-medium text-slate-800 dark:text-slate-100">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <ParallaxHero />
        </div>
      </div>
    </section>
  )
}
