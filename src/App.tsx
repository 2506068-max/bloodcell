import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FloatingCells from './components/FloatingCells'
import EnhancedBloodFlowDiagram from './components/EnhancedBloodFlowDiagram'
import CirculatoryAnimation from './components/CirculatoryAnimation'
import CirculatorySystemInfographic from './components/CirculatorySystemInfographic'
import BloodCellDetail from './components/BloodCellDetail'
import VesselAnatomy from './components/VesselAnatomy'
import OrganCards from './components/OrganCard'
import Quiz from './components/Quiz'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import Fab from './components/Fab'
import BottomNav from './components/BottomNav'
import LoadingScreen from './components/LoadingScreen'
import InteractiveAnatomy from './components/InteractiveAnatomy'
import BadgeSystem from './components/BadgeSystem'
import Mascot from './components/Mascot' // Tambahan: komponen Mascot perlu diimpor

function App() {
  const [loading, setLoading] = useState(true)
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([])
  const [activeSection, setActiveSection] = useState('hero')
  const [quizMood, setQuizMood] = useState<'idle' | 'happy' | 'sad' | 'celebrate'>('idle')

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200) // Tidak perlu window.setTimeout
    return () => clearTimeout(timer) // Langsung panggil clearTimeout
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem('badges')
    if (stored) setUnlockedBadges(JSON.parse(stored))
  }, [])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined

    if (quizMood === 'happy' || quizMood === 'sad' || quizMood === 'celebrate') {
      timer = window.setTimeout(() => setQuizMood('idle'), 2200)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [quizMood])

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
    return () => {
      sections.forEach((section) => observer.unobserve(section))
      observer.disconnect() // Penting: disconnect observer saat cleanup
    }
  }, [])

  const handleBadgeUnlock = (badgeId: string) => {
    if (unlockedBadges.includes(badgeId)) return // Mencegah duplikasi badge
    
    const updated = [...unlockedBadges, badgeId]
    setUnlockedBadges(updated)
    localStorage.setItem('badges', JSON.stringify(updated))
  }

  // Style untuk flip card (sebaiknya dipindahkan ke file CSS terpisah)
  const flipCardStyles = `
    .flip-card {
      background-color: transparent;
      perspective: 1000px;
      cursor: pointer;
    }
    
    .flip-card-inner {
      position: relative;
      width: 100%;
      min-height: 240px;
      text-align: center;
      transition: transform 0.6s;
      transform-style: preserve-3d;
    }
    
    .flip-card:hover .flip-card-inner {
      transform: rotateY(180deg);
    }
    
    .flip-card-face, .flip-card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      backface-visibility: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .flip-card-back {
      transform: rotateY(180deg);
    }
  `

  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)] transition-colors duration-500 overflow-x-hidden pb-24 lg:pb-0">
      <style>{flipCardStyles}</style> {/* Tambahan: inject styles untuk flip card */}
      <ScrollProgress />
      <FloatingCells />
      <Navbar />
      <Mascot section={activeSection} mood={quizMood} />

      <main className="relative z-10">
        <Hero />

        <section id="organ" className="px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between gap-4 flex-col sm:flex-row mb-12">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-rose-600 font-bold dark:text-rose-400">
                  Atlas Organ Utama
                </p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                  Organ Anatomi Sistem Kardiovaskular
                </h2>
              </div>
              <p className="max-w-xl text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Telaah komprehensif struktur makroskopis dan mikroskopis organ pemompa, oksigenasi pernapasan, serta jejaring vaskular perifer tubuh manusia.
              </p>
            </div>
            <OrganCards />
          </div>
        </section>

        <section id="anatomy" className="px-4 sm:px-6 lg:px-8 py-20 bg-slate-50/70 dark:bg-slate-950/60 border-y border-slate-200/60 dark:border-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-rose-600 font-bold dark:text-rose-400">
                Eksplorasi Vaskular Interaktif
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                Peta Anatomi Distribusi Darah Sistemik & Pulmonal
              </h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl text-sm leading-relaxed">
                Klik atau arahkan kursor pada struktur jantung, aorta, vena kava, atau arteri organ untuk mempelajari fisiologi dan signifikansi klinisnya.
              </p>
            </div>
            <InteractiveAnatomy />
          </div>
        </section>

        <section id="diagram" className="px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-sky-600 font-bold dark:text-sky-400">
                Hemodinamika Sirkulasi
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                Siklus Peredaran Darah Besar dan Kecil
              </h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl text-sm leading-relaxed">
                Animasi aliran darah beroksigen dan terdeoksigenasi dari ruang pompa jantung melalui kapiler alveoli paru hingga ke mikrosirkulasi organ tubuh.
              </p>
            </div>
            <EnhancedBloodFlowDiagram />
          </div>
        </section>

        <section id="sirkulasi-animasi" className="px-4 sm:px-6 lg:px-8 py-20 bg-slate-50/70 dark:bg-slate-950/60 border-y border-slate-200/60 dark:border-slate-800">
          <CirculatoryAnimation />
        </section>

        <section id="infografis" className="px-4 sm:px-6 lg:px-8 py-20">
          <CirculatorySystemInfographic />
        </section>

        <section id="sel-darah" className="px-4 sm:px-6 lg:px-8 py-20 bg-slate-50/70 dark:bg-slate-950/60 border-y border-slate-200/60 dark:border-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 space-y-3 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-rose-600 font-bold dark:text-rose-400">
                Hematologi Mikroskopis
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                Visualisasi Mikroskopi Sel Darah Manusia
              </h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-sm leading-relaxed">
                Pengamatan morfologi cakram bikonkaf eritrosit, diferensiasi leukosit polimorfonuklear, dan aktivasi trombosit hemostasis.
              </p>
            </div>
            <BloodCellDetail cellType="rbc" />
          </div>
        </section>

        <section id="pembuluh-darah" className="px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 space-y-3 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-sky-600 font-bold dark:text-sky-400">
                Histologi Vaskular
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                Struktur Penampang Melintang Pembuluh Darah
              </h2>
              <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto text-sm leading-relaxed">
                Perbandingan ketebalan tunika adventisia, tunika media berotot, tunika intima endotel, katup vena semilunar, dan dinding endotel sel tunggal kapiler.
              </p>
            </div>
            <VesselAnatomy />
          </div>
        </section>

        <section id="penyakit" className="px-4 sm:px-6 lg:px-8 py-20 bg-slate-50/70 dark:bg-slate-950/60 border-t border-slate-200/60 dark:border-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-12">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-rose-600 font-bold dark:text-rose-400">
                  Patofisiologi Klinis
                </p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                  Gangguan & Patologi Sistem Kardiovaskular
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 max-w-xl text-sm leading-relaxed">
                Kenali mekanisme etiologi, manifestasi klinis, dan langkah pencegahan penyakit sirkulasi yang sering ditemui dalam praktik kedokteran.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Anemia Card */}
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-face rounded-3xl border border-slate-200/90 bg-white/95 p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900/95 flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-600 mb-4 border border-rose-100 dark:border-rose-900/40">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none stroke-[2]">
                          <circle cx="12" cy="12" r="9" />
                          <circle cx="12" cy="12" r="4" strokeDasharray="3,2" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">Hematologi</span>
                      <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">Anemia Defisiensi & Hemolitik</h3>
                      <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Penurunan konsentrasi hemoglobin atau massa eritrosit, menyebabkan kapasitas pengangkutan oksigen ke jaringan berkurang drastis.
                      </p>
                    </div>
                    <p className="text-[11px] font-semibold text-rose-600 mt-4 flex items-center gap-1">
                      Arahkan kursor untuk melihat gejala klinis →
                    </p>
                  </div>
                  <div className="flip-card-back rounded-3xl border border-rose-200 bg-rose-50/95 p-7 flex flex-col justify-center dark:border-rose-900 dark:bg-slate-900/95">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Manifestasi Klinis & Patologi</h3>
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      <li>• Hipoksia jaringan perifer & kelelahan kronis</li>
                      <li>• Pucat pada konjungtiva dan bantalan kuku</li>
                      <li>• Takikardia kompensasi (jantung berdetak lebih cepat)</li>
                      <li>• Penurunan Hb: &lt;13 g/dL (pria) atau &lt;12 g/dL (wanita)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Hipertensi Card */}
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-face rounded-3xl border border-slate-200/90 bg-white/95 p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900/95 flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/50 flex items-center justify-center text-sky-600 mb-4 border border-sky-100 dark:border-sky-900/40">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none stroke-[2]">
                          <path d="M4 12h16M12 4v16" strokeLinecap="round" />
                          <circle cx="12" cy="12" r="9" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">Vaskular Sistemik</span>
                      <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">Hipertensi Arterial Esensial</h3>
                      <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Peningkatan resistensi vaskular perifer persisten yang memaksa miokardium ventrikel kiri bekerja lebih keras melawan afterload.
                      </p>
                    </div>
                    <p className="text-[11px] font-semibold text-sky-600 mt-4 flex items-center gap-1">
                      Arahkan kursor untuk strategi klinis →
                    </p>
                  </div>
                  <div className="flip-card-back rounded-3xl border border-sky-200 bg-sky-50/95 p-7 flex flex-col justify-center dark:border-sky-900 dark:bg-slate-900/95">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Parameter & Manajemen Klinis</h3>
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      <li>• Kriteria: Sistolik ≥140 mmHg atau Diastolik ≥90 mmHg</li>
                      <li>• Komplikasi: Hipertrofi ventrikel kiri (LVH) & nefrosklerosis</li>
                      <li>• Restriksi asupan natrium (&lt;2 g garam per hari)</li>
                      <li>• Menghambat remodeling vaskular via aktivitas aerobik</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Stroke Card */}
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-face rounded-3xl border border-slate-200/90 bg-white/95 p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900/95 flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 mb-4 border border-amber-100 dark:border-amber-900/40">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current fill-none stroke-[2]">
                          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Serebrovaskular</span>
                      <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">Stroke Iskemik & Hemoragik</h3>
                      <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        Oklusi tromboemboli atau ruptur pembuluh darah serebral (arteri serebri media), menyebabkan iskemia neuron dalam hitungan menit.
                      </p>
                    </div>
                    <p className="text-[11px] font-semibold text-amber-600 mt-4 flex items-center gap-1">
                      Arahkan kursor untuk tanda peringatan →
                    </p>
                  </div>
                  <div className="flip-card-back rounded-3xl border border-amber-200 bg-amber-50/95 p-7 flex flex-col justify-center dark:border-amber-900 dark:bg-slate-900/95">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Protokol Deteksi Cepat (FAST)</h3>
                    <ul className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      <li>• <strong>Face:</strong> Kelumpuhan wajah asimetris saat tersenyum</li>
                      <li>• <strong>Arms:</strong> Kelemahan motorik unilateral pada lengan</li>
                      <li>• <strong>Speech:</strong> Disartria (bicara pelo/cadel) atau afasia</li>
                      <li>• <strong>Time:</strong> Golden period terapi trombolisis (&lt;4.5 jam)</li>
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
            <Quiz
              onComplete={() => {
                handleBadgeUnlock('first_quiz')
                setQuizMood('celebrate')
              }}
              onAnswer={(correct) => setQuizMood(correct ? 'happy' : 'sad')}
            />
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