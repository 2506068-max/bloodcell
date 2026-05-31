import Hero from '../components/Hero'
import StatCard from '../components/StatCard'
import MenuCard from '../components/MenuCard'
import { motion } from 'framer-motion'

export default function Home() {
  const stats = [
    {
      icon: '❤️',
      title: 'Jantung',
      value: '100,000',
      description: 'Detak jantung per hari',
    },
    {
      icon: '🔴',
      title: 'Sel Darah Merah',
      value: '25 Juta',
      description: 'Diproduksi setiap detik',
    },
    {
      icon: '🩸',
      title: 'Pembuluh Darah',
      value: '100,000 km',
      description: 'Total panjang di tubuh',
    },
    {
      icon: '⚡',
      title: 'Siklus Darah',
      value: '60 Detik',
      description: 'Waktu darah mengedar 1 putaran',
    },
  ]

  const categories = [
    {
      icon: '📚',
      title: 'Pengertian',
      description: 'Pelajari konsep dasar sistem peredaran darah manusia',
      link: '/pengertian',
      color: 'primary' as const,
    },
    {
      icon: '🫀',
      title: 'Organ & Fungsi',
      description: 'Kenali jantung, pembuluh darah, dan sel darah',
      link: '/organ',
      color: 'primary' as const,
    },
    {
      icon: '🔄',
      title: 'Jenis Peredaran',
      description: 'Pahami peredaran kecil dan peredaran besar',
      link: '/jenis',
      color: 'secondary' as const,
    },
    {
      icon: '🏥',
      title: 'Gangguan & Penyakit',
      description: 'Pelajari penyakit yang menyerang sistem peredaran',
      link: '/gangguan',
      color: 'secondary' as const,
    },
    {
      icon: '🖼️',
      title: 'Galeri & Infografis',
      description: 'Lihat visualisasi menarik tentang peredaran darah',
      link: '/galeri',
      color: 'accent' as const,
    },
    {
      icon: '🧪',
      title: 'Kuis & Evaluasi',
      description: 'Uji pengetahuanmu dengan kuis interaktif',
      link: '/kuis',
      color: 'accent' as const,
    },
    {
      icon: 'ℹ️',
      title: 'Tentang',
      description: 'Pelajari lebih lanjut tentang website ini',
      link: '/tentang',
      color: 'primary' as const,
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Statistics Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-background to-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-4">
              Fakta Menarik Tentang
              <span className="text-gradient ml-2">Tubuh Kita</span>
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Sistem peredaran darah adalah salah satu sistem terpenting dalam tubuh kita. Mari pelajari beberapa fakta mengagumkan!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-4">
              Mulai Belajar Sekarang
              <span className="text-gradient ml-2">🚀</span>
            </h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Pilih topik yang ingin kamu pelajari dan mulai petualangan edukasimu!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, i) => (
              <MenuCard key={i} {...category} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl mx-4 md:mx-8 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-display font-bold mb-6 text-gradient"
          >
            Siap untuk Belajar? 🎓
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-text-muted mb-8"
          >
            Jangan khawatir! Website ini dirancang untuk semua usia dengan cara yang menyenangkan dan mudah dipahami.
            Mari kita jelajahi dunia luar biasa dari sistem peredaran darah bersama-sama!
          </motion.p>
        </div>
      </section>
    </main>
  )
}
