import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FloatingCells from './components/FloatingCells'
import EnhancedBloodFlowDiagram from './components/EnhancedBloodFlowDiagram'
import OrganCards from './components/OrganCard'
import Quiz from './components/Quiz'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import Fab from './components/Fab'
import BottomNav from './components/BottomNav'
import LoadingScreen from './components/LoadingScreen'
import InteractiveAnatomy from './components/InteractiveAnatomy'
import BadgeSystem from './components/BadgeSystem'

function App() {
  const [loading, setLoading] = useState(true)
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([])
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1200)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem('badges')
    if (stored) setUnlockedBadges(JSON.parse(stored))
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0.25 }
    )
    sections.forEach((section) => observer.observe(section))
    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  const handleBadgeUnlock = (badgeId: string) => {
    const updated = [...unlockedBadges, badgeId]
    setUnlockedBadges(updated)
    localStorage.setItem('badges', JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)] transition-colors duration-500 overflow-x-hidden pb-24 lg:pb-0">
      <ScrollProgress />
      <FloatingCells />
      <Navbar />
      <Mascot section={activeSection} />

      <main className="relative z-10">
        <Hero />

        <section id="organ" className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between gap-4 flex-col sm:flex-row mb-8">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-secondary font-bold">Organ Tubuh</p>
                <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold">Ikuti organ utama yang menjaga darahmu tetap sehat.</h2>
              </div>
              <p className="max-w-xl text-sm text-[color:var(--muted)]">Desain kartu yang ramah untuk anak dan dewasa, dengan efek hover lembut dan modal detail yang mudah diakses.</p>
            </div>
            <OrganCards />
          </div>
        </section>

        <section id="anatomy" className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-secondary font-bold">Anatomi Interaktif</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold">Jelajahi Sistem Peredaran Darah Secara Detail</h2>
              <p className="text-[color:var(--muted)] max-w-2xl">Hover pada bagian organ untuk melihat informasi lengkap tentang fungsinya dalam sistem peredaran darah Anda.</p>
            </div>
            <InteractiveAnatomy />
          </div>
        </section>

        <section id="diagram" className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-secondary font-bold">Diagram Aliran Darah</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold">Lihat perjalanan darah melalui jantung dan paru-paru</h2>
              <p className="text-[color:var(--muted)] max-w-2xl">Animasi interaktif menunjukkan bagaimana darah bergerak dari paru-paru melalui jantung ke seluruh tubuh dan kembali lagi.</p>
            </div>
            <EnhancedBloodFlowDiagram />
          </div>
        </section>

        <section id="penyakit" className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-8">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-secondary font-bold">Penyakit & Gangguan</p>
                <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold">Kenali gangguan peredaran darah dengan cepat.</h2>
              </div>
              <p className="text-[color:var(--muted)] max-w-2xl">Flip card memberikan pengalaman belajar yang interaktif untuk memahami gejala dan pencegahan secara menyenangkan.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flip-card">
                <div className="flip-card-inner glass-card rounded-[2rem] p-6 min-h-[240px] shadow-soft hover:shadow-glow transition-all duration-500">
                  <div className="flip-card-face">
                    <div className="text-5xl">🤒</div>
                    <h3 className="mt-5 text-xl font-bold">Anemia</h3>
                    <p className="mt-3 text-[color:var(--muted)]">Darah kekurangan sel darah merah atau hemoglobin.</p>
                  </div>
                  <div className="flip-card-back glass-card rounded-[2rem] p-6 flex flex-col justify-center">
                    <h3 className="text-xl font-bold">Gejala</h3>
                    <ul className="mt-4 space-y-2 text-sm text-[color:var(--muted)]">
                      <li>• Lelah cepat</li>
                      <li>• Pucat</li>
                      <li>• Detak jantung cepat</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flip-card">
                <div className="flip-card-inner glass-card rounded-[2rem] p-6 min-h-[240px] shadow-soft hover:shadow-glow transition-all duration-500">
                  <div className="flip-card-face">
                    <div className="text-5xl">🩸</div>
                    <h3 className="mt-5 text-xl font-bold">Hipertensi</h3>
                    <p className="mt-3 text-[color:var(--muted)]">Tekanan darah tinggi membuat pembuluh darah bekerja lebih keras.</p>
                  </div>
                  <div className="flip-card-back glass-card rounded-[2rem] p-6 flex flex-col justify-center">
                    <h3 className="text-xl font-bold">Tips</h3>
                    <ul className="mt-4 space-y-2 text-sm text-[color:var(--muted)]">
                      <li>• Kurangi garam</li>
                      <li>• Olahraga teratur</li>
                      <li>• Minum air cukup</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flip-card">
                <div className="flip-card-inner glass-card rounded-[2rem] p-6 min-h-[240px] shadow-soft hover:shadow-glow transition-all duration-500">
                  <div className="flip-card-face">
                    <div className="text-5xl">⚡</div>
                    <h3 className="mt-5 text-xl font-bold">Stroke</h3>
                    <p className="mt-3 text-[color:var(--muted)]">Aliran darah ke otak terganggu, butuh penanganan cepat.</p>
                  </div>
                  <div className="flip-card-back glass-card rounded-[2rem] p-6 flex flex-col justify-center">
                    <h3 className="text-xl font-bold">Ciri</h3>
                    <ul className="mt-4 space-y-2 text-sm text-[color:var(--muted)]">
                      <li>• Bicara cadel</li>
                      <li>• Wajah miring</li>
                      <li>• Mati rasa</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="badges" className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.3em] text-secondary font-bold">Pencapaian</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">Kumpulkan Lencana Pembelajaran</h2>
              <p className="text-[color:var(--muted)] max-w-2xl mt-4">Setiap aktivitas belajar membuka lencana baru. Kumpulkan semuanya untuk membuka konten eksklusif!</p>
            </div>
            <BadgeSystem unlockedBadges={unlockedBadges} onBadgeUnlock={handleBadgeUnlock} />
          </div>
        </section>

        <section id="kuis" className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-[0.9fr_0.75fr] items-start">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-secondary font-bold">Kuis Interaktif</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold">Tantang pemahamanmu dengan soal yang mudah disentuh.</h2>
              <p className="text-[color:var(--muted)] max-w-xl">Setiap jawaban dibuat responsive untuk ukuran layar kecil, sehingga kuis tetap nyaman bagi semua usia.</p>
            </div>
            <Quiz onComplete={() => handleBadgeUnlock('first_quiz')} />
          </div>
        </section>
      </main>

      <Footer />
      <Fab />
      <BottomNav />
      {loading && <LoadingScreen />}
    </div>
  )
}

export default App
