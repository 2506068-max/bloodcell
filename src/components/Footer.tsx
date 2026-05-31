import { motion } from 'framer-motion'
import { Heart, Mail, Github, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 bg-text-dark text-white py-12 border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">❤️</span>
              <span className="font-display text-xl font-bold">BloodCell Edu</span>
            </div>
            <p className="text-gray-300 text-sm">
              Platform edukasi interaktif untuk memahami sistem peredaran darah manusia dengan cara yang menyenangkan.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-bold text-lg mb-4">Menu</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/" className="hover:text-accent transition">Beranda</a></li>
              <li><a href="/pengertian" className="hover:text-accent transition">Pengertian</a></li>
              <li><a href="/organ" className="hover:text-accent transition">Organ</a></li>
              <li><a href="/kuis" className="hover:text-accent transition">Kuis</a></li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-bold text-lg mb-4">Kontak</h3>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="mailto:info@bloodcelledu.com"
                className="hover:text-accent transition"
                title="Email"
              >
                <Mail size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="hover:text-accent transition"
                title="GitHub"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.2 }}
                href="#"
                className="hover:text-accent transition"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary/20 mb-6" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-300">
          <p>
            &copy; {currentYear} BloodCell Edu. Dibuat dengan{' '}
            <Heart size={16} className="inline text-primary animate-heartbeat" /> untuk pendidikan.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent transition">Privacy</a>
            <a href="#" className="hover:text-accent transition">Terms</a>
            <a href="/tentang" className="hover:text-accent transition">About</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
