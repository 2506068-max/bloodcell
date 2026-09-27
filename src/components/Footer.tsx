import { motion } from 'framer-motion'
import { Heart, Mail, Github, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 border-t border-slate-200/80 bg-[color:var(--surface)] py-16 dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-secondary text-white">❤️</span>
              <div>
                <p className="font-semibold text-lg">BloodCell Edu</p>
                <p className="mt-2 text-sm text-[color:var(--muted)]">Platform edukasi interaktif dengan sentuhan visual modern.</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h3 className="mb-4 font-semibold">Menu Cepat</h3>
            <ul className="space-y-3 text-sm text-[color:var(--muted)]">
              <li><a href="#hero" className="transition hover:text-primary">Beranda</a></li>
              <li><a href="#organ" className="transition hover:text-primary">Organ</a></li>
              <li><a href="#diagram" className="transition hover:text-primary">Diagram</a></li>
              <li><a href="#kuis" className="transition hover:text-primary">Kuis</a></li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h3 className="mb-4 font-semibold">Kontak</h3>
            <div className="space-y-3 text-sm text-[color:var(--muted)]">
              <div className="flex items-center gap-2"><Mail size={16} /><span>info@bloodcelledu.com</span></div>
              <div className="flex items-center gap-2"><Github size={16} /><span>github.com/bloodcelledu</span></div>
              <div className="flex items-center gap-2"><Linkedin size={16} /><span>linkedin.com/company/bloodcelledu</span></div>
            </div>
          </motion.div>
        </div>

        <div className="mt-10 rounded-2xl bg-slate-100/70 p-4 text-xs text-slate-500 dark:bg-slate-900/60 dark:text-slate-400 border border-slate-200/60 dark:border-slate-800">
          <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Atribusi & Lisensi Visual Atlas Anatomi:
          </p>
          <p className="leading-relaxed">
            Ilustrasi anatomi organ (jantung, paru-paru, pembuluh darah, otak, ginjal, dan sel darah) pada platform ini bersumber dan diadaptasi secara legal berdasarkan lisensi terbuka dari OpenStax College (CC BY 4.0), Servier Medical Art oleh Les Laboratoires Servier (CC BY 4.0), Patrick J. Lynch (CC BY 2.5/3.0), Kelvinsong (CC BY-SA 3.0), Piotr Michał Jaworski (CC BY-SA 3.0), Blausen Medical Communications (CC BY 3.0), serta repositori domain publik Wikimedia Commons (Gray's Anatomy 1918 & Mariana Ruiz Villarreal).
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-slate-200/80 pt-6 text-sm text-[color:var(--muted)] dark:border-slate-800">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p>© {currentYear} BloodCell Edu. Dibuat dengan <Heart className="inline-block text-primary" size={16} /> untuk edukasi.</p>
            <div className="flex gap-4">
              <a href="#" className="transition hover:text-primary">Privacy</a>
              <a href="#" className="transition hover:text-primary">Terms</a>
              <a href="#" className="transition hover:text-primary">Tentang</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
