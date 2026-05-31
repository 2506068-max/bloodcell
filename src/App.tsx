import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Brain,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Gauge,
  HeartCrack,
  HeartPulse,
  Info,
  Landmark,
  Microscope,
  Milestone,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from 'lucide-react'
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

import { Badge } from './components/ui/badge'
import { buttonVariants } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog'
import { Progress } from './components/ui/progress'
import { cn } from './lib/utils'

type NavItem = {
  id: string
  label: string
}

type StatItem = {
  title: string
  value: string
  detail: string
  icon: LucideIcon
}

type OrganItem = {
  id: string
  title: string
  summary: string
  description: string
  icon: LucideIcon
  accentClass: string
  fact: string
  points: string[]
}

type DiseaseItem = {
  title: string
  subtitle: string
  icon: LucideIcon
  accentClass: string
  risks: string[]
  prevention: string
}

type GallerySlide = {
  title: string
  category: string
  description: string
  accentClass: string
  labels: string[]
}

type QuizQuestion = {
  prompt: string
  options: string[]
  answer: number
  explanation: string
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'pengertian', label: 'Pengertian' },
  { id: 'organ', label: 'Organ' },
  { id: 'jenis', label: 'Jenis' },
  { id: 'gangguan', label: 'Gangguan' },
  { id: 'galeri', label: 'Galeri' },
  { id: 'kuis', label: 'Kuis' },
  { id: 'tentang', label: 'Tentang' },
]

const stats: StatItem[] = [
  {
    title: 'Detak Jantung',
    value: '100.000+',
    detail: 'Rata-rata jantung berdetak sekitar seratus ribu kali setiap hari.',
    icon: HeartPulse,
  },
  {
    title: 'Sel Darah Merah',
    value: '25 Juta/detik',
    detail: 'Tubuh terus memproduksi sel darah merah baru agar oksigen tetap terdistribusi.',
    icon: Droplets,
  },
  {
    title: 'Panjang Pembuluh',
    value: '100.000 km',
    detail: 'Jika disusun, pembuluh darah manusia dapat mengelilingi bumi lebih dari dua kali.',
    icon: Milestone,
  },
  {
    title: 'Siklus Lengkap',
    value: '< 1 Menit',
    detail: 'Darah dapat beredar ke seluruh tubuh dan kembali lagi dengan sangat cepat.',
    icon: Activity,
  },
]

const oxygenFlowData = [
  { name: 'Paru-paru', level: 98 },
  { name: 'Jantung', level: 94 },
  { name: 'Otak', level: 92 },
  { name: 'Otot', level: 88 },
  { name: 'Tubuh', level: 86 },
]

const bloodCompositionData = [
  { name: 'Plasma', value: 55, color: '#4ECDC4' },
  { name: 'Sel Darah Merah', value: 38, color: '#FF4D6D' },
  { name: 'Sel Darah Putih', value: 4, color: '#FFE66D' },
  { name: 'Trombosit', value: 3, color: '#FF8FA3' },
]

const circulationTimeline = [
  'Darah kaya karbon dioksida kembali ke jantung melalui vena kava.',
  'Jantung memompa darah ke paru-paru untuk mengambil oksigen segar.',
  'Darah kaya oksigen kembali ke jantung melalui vena pulmonalis.',
  'Jantung memompa darah kaya oksigen ke seluruh tubuh lewat aorta.',
  'Seluruh organ menerima nutrisi dan oksigen, lalu darah kembali lagi ke jantung.',
]

const organItems: OrganItem[] = [
  {
    id: 'jantung',
    title: 'Jantung',
    summary: 'Pompa utama yang menjaga aliran darah tetap bergerak.',
    description:
      'Jantung adalah organ berotot seukuran kepalan tangan yang bekerja tanpa henti untuk memompa darah ke paru-paru dan ke seluruh tubuh.',
    icon: HeartPulse,
    accentClass: 'from-primary/20 via-primary/10 to-white',
    fact: 'Terdiri dari 4 ruang: 2 serambi dan 2 bilik.',
    points: [
      'Memompa darah kaya oksigen ke seluruh tubuh.',
      'Mengirim darah ke paru-paru untuk pertukaran gas.',
      'Menjaga tekanan darah agar sirkulasi stabil.',
    ],
  },
  {
    id: 'darah',
    title: 'Darah',
    summary: 'Pengantar oksigen, nutrisi, hormon, dan perlindungan tubuh.',
    description:
      'Darah tersusun dari plasma, sel darah merah, sel darah putih, dan trombosit. Semuanya bekerja bersama agar tubuh tetap sehat.',
    icon: Droplets,
    accentClass: 'from-secondary/20 via-secondary/10 to-white',
    fact: 'Volume darah orang dewasa sekitar 4,5 sampai 5,5 liter.',
    points: [
      'Sel darah merah membawa oksigen dan karbon dioksida.',
      'Sel darah putih membantu melawan infeksi.',
      'Trombosit berperan penting dalam pembekuan darah.',
    ],
  },
  {
    id: 'pembuluh',
    title: 'Pembuluh Darah',
    summary: 'Jalur transportasi darah ke seluruh tubuh.',
    description:
      'Arteri membawa darah keluar dari jantung, vena membawa darah kembali ke jantung, dan kapiler menjadi tempat pertukaran zat di jaringan.',
    icon: Gauge,
    accentClass: 'from-accent/60 via-accent/20 to-white',
    fact: 'Kapiler adalah pembuluh darah terkecil dan sangat tipis.',
    points: [
      'Arteri berdinding tebal dan kuat untuk menahan tekanan tinggi.',
      'Vena memiliki katup agar aliran darah tidak berbalik arah.',
      'Kapiler menghubungkan arteriol dan venula di jaringan tubuh.',
    ],
  },
]

const circulationTypes = [
  {
    title: 'Peredaran Darah Kecil',
    description:
      'Darah bergerak dari jantung ke paru-paru untuk mengambil oksigen lalu kembali ke jantung.',
    bullets: ['Mulai dari bilik kanan', 'Berakhir di serambi kiri', 'Fokus pada pertukaran gas'],
    accent: 'secondary' as const,
  },
  {
    title: 'Peredaran Darah Besar',
    description:
      'Darah kaya oksigen dipompa dari jantung ke seluruh tubuh lalu kembali lagi membawa karbon dioksida.',
    bullets: ['Mulai dari bilik kiri', 'Berakhir di serambi kanan', 'Mengantar oksigen dan nutrisi'],
    accent: 'primary' as const,
  },
]

const diseaseItems: DiseaseItem[] = [
  {
    title: 'Hipertensi',
    subtitle: 'Tekanan darah terlalu tinggi.',
    icon: Stethoscope,
    accentClass: 'from-primary to-primary-light',
    risks: ['Pola makan tinggi garam', 'Kurang gerak', 'Stres berkepanjangan'],
    prevention: 'Perbanyak aktivitas fisik, batasi garam, dan cek tekanan darah rutin.',
  },
  {
    title: 'Anemia',
    subtitle: 'Kadar hemoglobin atau sel darah merah rendah.',
    icon: Microscope,
    accentClass: 'from-secondary to-secondary-light',
    risks: ['Kurang zat besi', 'Perdarahan', 'Gangguan pembentukan sel darah'],
    prevention: 'Konsumsi makanan kaya zat besi, vitamin B12, dan folat.',
  },
  {
    title: 'Penyakit Jantung',
    subtitle: 'Gangguan pada struktur atau fungsi jantung.',
    icon: HeartCrack,
    accentClass: 'from-accent-dark to-accent',
    risks: ['Kolesterol tinggi', 'Merokok', 'Riwayat keluarga'],
    prevention: 'Jaga pola makan, tidur cukup, dan hindari rokok.',
  },
  {
    title: 'Stroke',
    subtitle: 'Aliran darah ke otak terganggu.',
    icon: Brain,
    accentClass: 'from-slate-700 to-slate-500',
    risks: ['Hipertensi', 'Diabetes', 'Gaya hidup tidak aktif'],
    prevention: 'Kontrol faktor risiko sejak dini dan kenali gejala FAST.',
  },
]

const gallerySlides: GallerySlide[] = [
  {
    title: 'Poster Jantung Ceria',
    category: 'Carousel Gambar',
    description: 'Visual ramah anak yang memperkenalkan bagian utama jantung dengan warna cerah.',
    accentClass: 'from-primary/25 via-white to-secondary/20',
    labels: ['Atrium', 'Ventrikel', 'Katup', 'Aorta'],
  },
  {
    title: 'Rute Sel Darah Merah',
    category: 'Infografis Interaktif',
    description: 'Menggambarkan perjalanan sel darah merah saat membawa oksigen dan nutrisi.',
    accentClass: 'from-secondary/25 via-white to-accent/30',
    labels: ['Paru-paru', 'Jantung', 'Tubuh', 'Kembali lagi'],
  },
  {
    title: 'Misi Oksigen',
    category: 'Galeri Edukasi',
    description: 'Cerita visual gamified tentang bagaimana oksigen mencapai organ-organ penting.',
    accentClass: 'from-accent/40 via-white to-primary/20',
    labels: ['Otak', 'Otot', 'Kulit', 'Sel tubuh'],
  },
]

const quizQuestions: QuizQuestion[] = [
  {
    prompt: 'Apa fungsi utama sel darah merah?',
    options: [
      'Membekukan darah',
      'Membawa oksigen ke seluruh tubuh',
      'Membunuh bakteri secara langsung',
      'Mengatur suhu udara',
    ],
    answer: 1,
    explanation: 'Sel darah merah mengandung hemoglobin yang berfungsi membawa oksigen.',
  },
  {
    prompt: 'Peredaran darah kecil terjadi antara jantung dan organ apa?',
    options: ['Hati', 'Ginjal', 'Paru-paru', 'Lambung'],
    answer: 2,
    explanation: 'Peredaran darah kecil menghubungkan jantung dengan paru-paru untuk pertukaran gas.',
  },
  {
    prompt: 'Pembuluh darah yang membawa darah keluar dari jantung adalah...',
    options: ['Vena', 'Arteri', 'Kapiler', 'Venula'],
    answer: 1,
    explanation: 'Arteri membawa darah keluar dari jantung menuju paru-paru atau seluruh tubuh.',
  },
  {
    prompt: 'Kebiasaan yang membantu menjaga kesehatan sistem peredaran darah adalah...',
    options: ['Kurang tidur', 'Jarang minum air', 'Olahraga teratur', 'Terlalu banyak makanan asin'],
    answer: 2,
    explanation: 'Olahraga teratur membantu jantung bekerja lebih efisien dan menjaga pembuluh darah tetap sehat.',
  },
]

const sectionTips: Record<string, string> = {
  home: 'Halo, aku Rori si sel darah merah. Yuk mulai petualangan seru menjelajahi tubuh manusia.',
  pengertian:
    'Sistem peredaran darah itu seperti jaringan jalan raya yang mengantar oksigen, nutrisi, dan pesan penting ke seluruh tubuh.',
  organ: 'Setiap organ punya tugas khusus. Klik kartunya untuk melihat detail yang lebih lengkap.',
  jenis: 'Ingat ya, ada jalur pendek ke paru-paru dan jalur besar ke seluruh tubuh.',
  gangguan: 'Tubuh butuh perawatan. Kenali gangguannya agar kita bisa mencegah sejak awal.',
  galeri: 'Belajar lewat visual membantu otak lebih cepat memahami alur yang kompleks.',
  kuis: 'Saatnya uji pengetahuanmu. Kalau selesai, ada badge dan konfeti spesial.',
  tentang: 'Website ini dibuat agar topik sains terasa ringan, modern, dan menyenangkan untuk semua usia.',
}

const sectionAnimation = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65 },
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const [readingProgress, setReadingProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('home')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>(() => quizQuestions.map(() => -1))
  const [quizFinished, setQuizFinished] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const floatingCells = useMemo(
    () =>
      Array.from({ length: 16 }, (_, index) => ({
        id: index,
        left: 5 + ((index * 17) % 90),
        top: 4 + ((index * 13) % 88),
        size: 26 + (index % 5) * 12,
        duration: 7 + (index % 4) * 2,
        delay: (index % 6) * 0.5,
      })),
    [],
  )

  const confettiPieces = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => ({
        id: index,
        left: 8 + ((index * 11) % 84),
        x: -100 + ((index * 37) % 200),
        y: 240 + ((index * 17) % 140),
        rotate: 220 + index * 16,
        delay: (index % 7) * 0.05,
        color: ['#FF4D6D', '#4ECDC4', '#FFE66D', '#FF8FA3'][index % 4],
      })),
    [],
  )

  const currentAnswer = answers[currentQuestion]
  const heroOffset = Math.min(scrollY * 0.08, 54)
  const navElevated = scrollY > 24

  const score = useMemo(
    () => answers.reduce((total, answer, index) => total + (answer === quizQuestions[index].answer ? 1 : 0), 0),
    [answers],
  )

  const achievement = useMemo(() => {
    if (score === quizQuestions.length) {
      return {
        title: 'Master Sirkulasi',
        description: 'Kamu memahami materi dengan sangat baik.',
        variant: 'default' as const,
      }
    }

    if (score >= Math.ceil(quizQuestions.length * 0.75)) {
      return {
        title: 'Penjaga Jantung',
        description: 'Pemahamanmu sudah kuat. Tinggal sedikit lagi untuk sempurna.',
        variant: 'secondary' as const,
      }
    }

    return {
      title: 'Petualang Darah',
      description: 'Awalan yang bagus. Coba ulangi lagi agar makin mantap.',
      variant: 'accent' as const,
    }
  }, [score])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setIsLoading(false), 1800)
    return () => window.clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setScrollY(scrollTop)
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0
      setReadingProgress(progress)

      let currentId = 'home'
      for (const item of navItems) {
        const section = document.getElementById(item.id)
        if (section && scrollTop + 180 >= section.offsetTop) {
          currentId = item.id
        }
      }
      setActiveSection(currentId)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % gallerySlides.length)
    }, 4500)

    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (!showConfetti) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => setShowConfetti(false), 2600)
    return () => window.clearTimeout(timeoutId)
  }, [showConfetti])

  const handleSelectAnswer = (optionIndex: number) => {
    if (quizFinished) {
      return
    }

    setAnswers((previous) => {
      const next = [...previous]
      next[currentQuestion] = optionIndex
      return next
    })
  }

  const handleNextQuestion = () => {
    if (currentAnswer === -1) {
      return
    }

    if (currentQuestion === quizQuestions.length - 1) {
      setQuizFinished(true)
      setShowConfetti(true)
      return
    }

    setCurrentQuestion((previous) => previous + 1)
  }

  const handleRestartQuiz = () => {
    setAnswers(quizQuestions.map(() => -1))
    setCurrentQuestion(0)
    setQuizFinished(false)
    setShowConfetti(false)
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="relative overflow-x-hidden bg-bg-light text-text-dark">
      <BackgroundBlobs scrollY={scrollY} />
      <FloatingCells cells={floatingCells} />

      <div className="fixed inset-x-0 top-0 z-50">
        <Progress
          value={readingProgress}
          className="h-1 rounded-none bg-white/10"
          indicatorClassName="bg-gradient-to-r from-primary via-secondary to-accent"
        />
      </div>

      <header className="fixed inset-x-0 top-3 z-40 px-3 sm:px-6">
        <div
          className={cn(
            'mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border px-4 py-3 backdrop-blur-xl transition-all duration-500',
            navElevated
              ? 'border-white/80 bg-white/78 shadow-[0_18px_48px_rgba(30,41,59,0.12)]'
              : 'border-white/65 bg-white/62 shadow-[0_12px_36px_rgba(255,77,109,0.12)]',
          )}
        >
          <a href="#home" className="flex items-center gap-3">
            <div className="animated-gradient flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#FF4D6D_0%,#FF8FA3_38%,#BDB2FF_70%,#4ECDC4_100%)]">
              <HeartPulse className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500">Edukasi Interaktif</p>
              <p className="font-display text-lg font-bold">Sistem Peredaran Darah</p>
            </div>
          </a>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
                  activeSection === item.id
                    ? 'animated-gradient bg-[linear-gradient(135deg,#FF4D6D_0%,#FF8FA3_40%,#4ECDC4_100%)] text-white shadow-glow'
                    : 'text-slate-600 hover:bg-white/80',
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a href="#kuis" className={buttonVariants({ variant: 'secondary', size: 'sm' })}>
            Mulai Kuis
          </a>
        </div>
      </header>

      <MascotGuide message={sectionTips[activeSection]} />

      <main className="relative z-10">
        <section id="home" className="relative px-4 pb-14 pt-32 sm:px-6 lg:px-8">
          <div className="mx-auto grid min-h-[92vh] max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div {...sectionAnimation} className="parallax-soft space-y-8" style={{ y: heroOffset * 0.45 }}>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="default" className="gap-2 px-4 py-2 text-sm shadow-playful">
                  <Sparkles className="h-4 w-4" />
                  Modern, fun, dan ramah semua usia
                </Badge>
                <Badge variant="secondary" className="gap-2 px-4 py-2 text-sm shadow-mint">
                  <ShieldCheck className="h-4 w-4" />
                  Belajar sains dengan gaya gamification
                </Badge>
              </div>

              <div className="space-y-4">
                <h1 className="max-w-4xl font-display text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
                  Jelajahi{' '}
                  <span className="animated-gradient bg-[linear-gradient(120deg,#FF4D6D_0%,#FF8FA3_22%,#BDB2FF_48%,#4ECDC4_75%,#FFE66D_100%)] bg-clip-text text-transparent">
                    Sistem Peredaran Darah Manusia
                  </span>
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
                  Website edukasi interaktif yang mengajak anak-anak, remaja, mahasiswa, dan umum
                  memahami perjalanan darah melalui visual menarik, animasi ringan, kuis seru, dan
                  penjelasan yang mudah dipahami.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a href="#pengertian" className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'group')}>
                  Mulai Belajar
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a href="#galeri" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
                  Lihat Galeri Edukasi
                </a>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                <div className="rounded-full border border-white/70 bg-white/70 px-4 py-2 shadow-soft">
                  Animasi ringan
                </div>
                <div className="rounded-full border border-white/70 bg-white/70 px-4 py-2 shadow-soft">
                  Visual ramah anak hingga umum
                </div>
                <div className="rounded-full border border-white/70 bg-white/70 px-4 py-2 shadow-soft">
                  Belajar sambil bermain
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    whileHover={{ y: -8, scale: 1.01 }}
                  >
                    <Card className="h-full border-white/70 bg-white/72 shadow-playful">
                      <CardHeader className="pb-3">
                        <div className="animated-gradient mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#FF8FA3_0%,#FFE66D_45%,#4ECDC4_100%)]">
                          <item.icon className="h-6 w-6 text-white" />
                        </div>
                        <CardDescription>{item.title}</CardDescription>
                        <CardTitle className="text-3xl font-bold">{item.value}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm leading-6 text-slate-500">{item.detail}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...sectionAnimation}
              transition={{ duration: 0.75, delay: 0.1 }}
              className="parallax-soft relative flex items-center justify-center"
              style={{ y: -heroOffset * 0.28 }}
            >
              <div className="absolute inset-0 -z-10 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -left-5 top-8 h-20 w-20 rounded-full bg-purple-soft/50 blur-2xl" />
              <div className="absolute bottom-8 right-0 h-24 w-24 rounded-full bg-blue-soft/50 blur-2xl" />
              <Card className="w-full max-w-xl overflow-hidden border-white/60 bg-white/70 p-6 shadow-[0_28px_90px_rgba(255,77,109,0.2)]">
                <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                  <HeartShowcase />
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">
                        Ilustrasi Hero
                      </p>
                      <h2 className="mt-2 font-display text-3xl font-bold text-text-dark">
                        Jantung animasi berdetak sebagai pusat perjalanan darah
                      </h2>
                    </div>

                    <div className="grid gap-3">
                      <InfoPill title="Oksigen" description="Dibawa ke seluruh tubuh oleh sel darah merah." />
                      <InfoPill title="Nutrisi" description="Disalurkan ke sel agar tubuh tetap berenergi." />
                      <InfoPill title="Perlindungan" description="Sel darah putih membantu tubuh melawan infeksi." />
                    </div>

                    <div className="rounded-[24px] bg-slate-900/95 p-4 text-white shadow-soft">
                      <p className="text-sm font-semibold text-accent">Fakta cepat dari Rori</p>
                      <p className="mt-2 text-sm leading-6 text-slate-200">
                        Saat kamu berlari, jantung memompa lebih cepat agar otot mendapatkan lebih
                        banyak oksigen.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        <section id="pengertian" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-10">
            <SectionHeading
              badge="Pengertian Sistem Peredaran Darah"
              title="Sistem transportasi super sibuk di dalam tubuh manusia"
              description="Bayangkan tubuh seperti kota besar. Sistem peredaran darah adalah jaringan transportasi yang mengantar oksigen, nutrisi, hormon, dan perlindungan ke seluruh sudut kota tubuh."
            />

            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <motion.div {...sectionAnimation}>
                <Card className="h-full border-white/70 bg-white/72 shadow-playful">
                  <CardHeader>
                    <Badge variant="outline" className="w-fit">
                      Ilustrasi Interaktif
                    </Badge>
                    <CardTitle className="text-3xl">Apa yang terjadi saat darah beredar?</CardTitle>
                    <CardDescription className="max-w-2xl text-base">
                      Darah bergerak karena dorongan jantung. Di paru-paru, darah mengambil oksigen.
                      Setelah itu, darah mengantarkannya ke organ tubuh melalui pembuluh darah.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-[28px] bg-gradient-to-br from-primary/15 via-white to-secondary/15 p-5">
                      <div className="relative mx-auto flex h-64 max-w-[18rem] items-center justify-center">
                        <motion.div
                          animate={{ scale: [1, 1.08, 1] }}
                          transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY }}
                          className="absolute h-32 w-32 rounded-full bg-primary/20 blur-2xl"
                        />
                        <svg viewBox="0 0 320 320" className="h-full w-full">
                          <motion.circle
                            cx="160"
                            cy="160"
                            r="108"
                            fill="none"
                            stroke="#4ECDC4"
                            strokeWidth="10"
                            strokeDasharray="14 18"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                            style={{ transformOrigin: 'center' }}
                          />
                          <motion.path
                            d="M160 232c-46-28-82-58-82-106 0-33 23-57 53-57 18 0 31 9 38 21 7-12 20-21 38-21 30 0 53 24 53 57 0 48-36 78-82 106l-18 11-18-11z"
                            fill="#FF4D6D"
                            animate={{ scale: [1, 1.06, 1] }}
                            transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY }}
                          />
                          <motion.circle
                            cx="75"
                            cy="116"
                            r="14"
                            fill="#FFE66D"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY }}
                          />
                          <motion.circle
                            cx="246"
                            cy="214"
                            r="18"
                            fill="#4ECDC4"
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 3.6, repeat: Number.POSITIVE_INFINITY }}
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-[24px] border border-primary/10 bg-primary/5 p-5">
                        <h3 className="text-lg font-semibold">Peran utama</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          Mengangkut oksigen, nutrisi, hormon, serta membantu tubuh membuang sisa
                          metabolisme seperti karbon dioksida.
                        </p>
                      </div>
                      <div className="rounded-[24px] border border-secondary/10 bg-secondary/5 p-5">
                        <h3 className="text-lg font-semibold">Tim kerja utama</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          Jantung sebagai pompa, darah sebagai pengangkut, dan pembuluh darah sebagai
                          jalurnya.
                        </p>
                      </div>
                      <div className="rounded-[24px] border border-accent/20 bg-accent/20 p-5">
                        <h3 className="text-lg font-semibold">Kenapa penting?</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          Tanpa sirkulasi darah yang baik, organ tidak akan mendapat oksigen dan
                          nutrisi yang dibutuhkan untuk bekerja optimal.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div {...sectionAnimation} transition={{ duration: 0.7, delay: 0.1 }}>
                <Card className="h-full border-white/70 bg-white/72 shadow-mint">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit">
                      Statistik Tubuh
                    </Badge>
                    <CardTitle className="text-3xl">Visual data yang mudah dibaca</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="h-64 rounded-[24px] bg-slate-50/80 p-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={oxygenFlowData}>
                          <defs>
                            <linearGradient id="oxygenGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#FF4D6D" stopOpacity={0.65} />
                              <stop offset="95%" stopColor="#4ECDC4" stopOpacity={0.1} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid stroke="#E2E8F0" vertical={false} />
                          <XAxis dataKey="name" tickLine={false} axisLine={false} />
                          <Tooltip />
                          <Area
                            type="monotone"
                            dataKey="level"
                            stroke="#FF4D6D"
                            strokeWidth={3}
                            fill="url(#oxygenGradient)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid gap-4 md:grid-cols-[0.85fr_1.15fr]">
                      <div className="h-48 rounded-[24px] bg-slate-50/80 p-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={bloodCompositionData}
                              dataKey="value"
                              nameKey="name"
                              innerRadius={38}
                              outerRadius={62}
                              paddingAngle={4}
                            >
                              {bloodCompositionData.map((entry) => (
                                <Cell key={entry.name} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="grid gap-3">
                        {bloodCompositionData.map((item) => (
                          <div key={item.name} className="rounded-[22px] border border-slate-200 bg-white p-4">
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="font-medium">{item.name}</span>
                              </div>
                              <span className="text-sm font-semibold text-slate-500">{item.value}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div {...sectionAnimation}>
              <Card className="border-white/70 bg-white/72 shadow-playful">
                <CardHeader>
                  <Badge variant="accent" className="w-fit">
                    Timeline Proses Sirkulasi Darah
                  </Badge>
                  <CardTitle className="text-3xl">Perjalanan darah dari jantung, paru-paru, lalu ke seluruh tubuh</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-5 lg:grid-cols-5">
                    {circulationTimeline.map((step, index) => (
                      <TimelineCard key={step} index={index} description={step} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section id="organ" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-10">
            <SectionHeading
              badge="Organ Peredaran Darah"
              title="Klik tiap card untuk membuka detail organ dan fungsinya"
              description="Bagian ini membantu semua usia mengenali komponen utama sistem peredaran darah lewat card interaktif dan modal penjelasan."
            />

            <div className="grid gap-6 lg:grid-cols-3">
              {organItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -10, rotate: index % 2 === 0 ? -0.5 : 0.5 }}
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="group block w-full text-left">
                        <Card className="h-full overflow-hidden border-white/70 bg-white/78 transition-all duration-300 hover:shadow-[0_28px_70px_rgba(15,23,42,0.14)]">
                          <CardContent className="p-0">
                            <div className={cn('p-6', 'bg-gradient-to-br', item.accentClass)}>
                              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[22px] bg-white/75 shadow-soft">
                                <item.icon className="h-8 w-8 text-primary" />
                              </div>
                              <div className="space-y-3">
                                <h3 className="text-2xl font-bold">{item.title}</h3>
                                <p className="text-sm leading-7 text-slate-600">{item.summary}</p>
                                <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-slate-600">
                                  <Info className="h-4 w-4 text-primary" />
                                  Klik untuk detail
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <Badge variant="default" className="w-fit">
                          {item.fact}
                        </Badge>
                        <DialogTitle>{item.title}</DialogTitle>
                        <DialogDescription>{item.description}</DialogDescription>
                      </DialogHeader>

                      <div className="mt-6 grid gap-4">
                        {item.points.map((point) => (
                          <div key={point} className="rounded-[22px] border border-slate-200 bg-slate-50/80 p-4">
                            <p className="text-sm leading-7 text-slate-600">{point}</p>
                          </div>
                        ))}
                      </div>

                      <DialogFooter>
                        <a href="#jenis" className={buttonVariants({ variant: 'secondary' })}>
                          Lanjut ke Jenis Peredaran
                        </a>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="jenis" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-10">
            <SectionHeading
              badge="Jenis Peredaran Darah"
              title="Dua jalur utama yang bekerja terus menerus"
              description="Peredaran darah besar dan kecil bekerja bergantian dalam sistem tertutup yang sangat efisien."
            />

            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <motion.div {...sectionAnimation}>
                <Card className="h-full overflow-hidden border-white/70 bg-white/78 shadow-playful">
                  <CardHeader>
                    <Badge variant="outline" className="w-fit">
                      Diagram Animasi
                    </Badge>
                    <CardTitle className="text-3xl">Animasi aliran darah dengan SVG path</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-[28px] bg-[radial-gradient(circle_at_top,#334155_0%,#0f172a_54%,#020617_100%)] px-4 py-8 text-white shadow-[0_20px_60px_rgba(2,6,23,0.35)]">
                      <svg viewBox="0 0 620 320" className="w-full">
                        <defs>
                          <linearGradient id="bigFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#FF4D6D" />
                            <stop offset="100%" stopColor="#FFE66D" />
                          </linearGradient>
                          <linearGradient id="smallFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#4ECDC4" />
                            <stop offset="100%" stopColor="#9AE6E2" />
                          </linearGradient>
                        </defs>

                        <motion.path
                          d="M165 160c0-58 42-108 92-108h124c50 0 92 50 92 108s-42 108-92 108H257c-50 0-92-50-92-108z"
                          fill="none"
                          stroke="url(#bigFlow)"
                          strokeWidth="16"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 2.4 }}
                        />
                        <motion.path
                          d="M242 159c0-33 28-61 62-61h31c34 0 62 28 62 61s-28 61-62 61h-31c-34 0-62-28-62-61z"
                          fill="none"
                          stroke="url(#smallFlow)"
                          strokeWidth="12"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.8, delay: 0.3 }}
                        />

                        <circle cx="310" cy="160" r="22" fill="#FF4D6D" />
                        <text x="310" y="165" fill="white" textAnchor="middle" className="text-xs font-semibold">
                          Jantung
                        </text>
                        <text x="310" y="40" fill="#FFE66D" textAnchor="middle" className="text-sm">
                          Peredaran darah besar
                        </text>
                        <text x="310" y="287" fill="#4ECDC4" textAnchor="middle" className="text-sm">
                          Peredaran darah kecil
                        </text>
                      </svg>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="grid gap-6">
                {circulationTypes.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: index * 0.1 }}
                    whileHover={{ y: -6 }}
                  >
                    <Card className="h-full border-white/70 bg-white/78 shadow-playful">
                      <CardHeader>
                        <Badge variant={item.accent === 'primary' ? 'default' : 'secondary'} className="w-fit">
                          {item.title}
                        </Badge>
                        <CardTitle className="text-2xl">{item.title}</CardTitle>
                        <CardDescription className="text-base">{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {item.bullets.map((bullet) => (
                          <div key={bullet} className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3">
                            <p className="text-sm leading-6 text-slate-600">{bullet}</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="gangguan" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-10">
            <SectionHeading
              badge="Gangguan dan Penyakit"
              title="Kenali penyakit yang bisa memengaruhi sistem peredaran darah"
              description="Hover pada card untuk melihat risiko utama dan langkah pencegahan sederhana yang bisa dipelajari semua usia."
            />

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {diseaseItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <DiseaseCard item={item} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="galeri" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-10">
            <SectionHeading
              badge="Galeri Edukasi"
              title="Visual belajar yang memadukan carousel, video, dan infografis"
              description="Dirancang agar materi terasa dekat, ringan, dan mudah diingat seperti aplikasi belajar modern."
            />

            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <motion.div {...sectionAnimation}>
                  <Card className="overflow-hidden border-white/70 bg-white/80 shadow-playful">
                  <CardHeader className="flex-row items-center justify-between space-y-0">
                    <div>
                      <Badge variant="outline" className="mb-3 w-fit">
                        Carousel Gambar
                      </Badge>
                      <CardTitle className="text-3xl">Geser visual edukasi favoritmu</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentSlide((previous) => (previous - 1 + gallerySlides.length) % gallerySlides.length)
                        }
                        className="rounded-full border border-slate-200 p-2 transition-colors hover:bg-slate-100"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrentSlide((previous) => (previous + 1) % gallerySlides.length)}
                        className="rounded-full border border-slate-200 p-2 transition-colors hover:bg-slate-100"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={gallerySlides[currentSlide].title}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.45 }}
                        className={cn(
                          'rounded-[28px] bg-gradient-to-br p-6',
                          gallerySlides[currentSlide].accentClass,
                        )}
                      >
                        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                          <CarouselArtwork labels={gallerySlides[currentSlide].labels} />
                          <div className="space-y-4">
                            <Badge variant="secondary" className="w-fit">
                              {gallerySlides[currentSlide].category}
                            </Badge>
                            <h3 className="text-3xl font-bold">{gallerySlides[currentSlide].title}</h3>
                            <p className="text-base leading-7 text-slate-600">
                              {gallerySlides[currentSlide].description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {gallerySlides[currentSlide].labels.map((label) => (
                                <Badge key={label} variant="outline">
                                  {label}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    <div className="flex justify-center gap-2">
                      {gallerySlides.map((slide, index) => (
                        <button
                          key={slide.title}
                          type="button"
                          onClick={() => setCurrentSlide(index)}
                          className={cn(
                            'h-3 rounded-full transition-all duration-300',
                            currentSlide === index ? 'w-10 bg-primary' : 'w-3 bg-slate-300',
                          )}
                          aria-label={`Buka slide ${slide.title}`}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <div className="grid gap-6">
                <motion.div {...sectionAnimation}>
                  <Card className="border-white/70 bg-white/80 shadow-playful">
                    <CardHeader>
                      <Badge variant="default" className="w-fit">
                        Video Edukasi
                      </Badge>
                      <CardTitle className="text-2xl">Belajar sambil menonton</CardTitle>
                      <CardDescription className="text-base">
                        Gunakan video sebagai pendamping untuk menguatkan pemahaman visual tentang aliran darah.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-900 shadow-soft">
                        <div className="aspect-video">
                          <iframe
                            className="h-full w-full"
                            src="https://www.youtube-nocookie.com/embed/GFXJv3-L4vQ"
                            title="Video edukasi sistem peredaran darah manusia"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div {...sectionAnimation} transition={{ duration: 0.7, delay: 0.12 }}>
                  <Card className="border-white/70 bg-white/80 shadow-playful">
                    <CardHeader>
                      <Badge variant="accent" className="w-fit">
                        Infografis Ringkas
                      </Badge>
                      <CardTitle className="text-2xl">3 pesan yang wajib diingat</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <InfographicRow icon={Landmark} title="Jantung adalah pompa" description="Ia menggerakkan seluruh sistem agar tetap hidup." />
                      <InfographicRow icon={Droplets} title="Darah adalah kurir" description="Membawa oksigen, nutrisi, dan perlindungan." />
                      <InfographicRow icon={BookOpen} title="Belajar itu penting" description="Memahami tubuh membantu kita menjaga kesehatan sejak dini." />
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section id="kuis" className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div {...sectionAnimation} className="relative overflow-hidden">
              <Card className="relative overflow-hidden border-white/70 bg-white/85 shadow-[0_30px_80px_rgba(255,77,109,0.14)]">
                <AnimatePresence>
                  {showConfetti && (
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-80 overflow-hidden">
                      {confettiPieces.map((piece) => (
                        <motion.span
                          key={piece.id}
                          className="absolute top-0 h-3 w-3 rounded-sm"
                          style={{ left: `${piece.left}%`, backgroundColor: piece.color }}
                          initial={{ opacity: 1, x: 0, y: -20, rotate: 0 }}
                          animate={{ opacity: 0, x: piece.x, y: piece.y, rotate: piece.rotate }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 2.2, delay: piece.delay, ease: 'easeOut' }}
                        />
                      ))}
                    </div>
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {quizFinished && showConfetti && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6"
                    >
                      <div className="animated-gradient rounded-[32px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,77,109,0.92)_0%,rgba(255,143,163,0.92)_30%,rgba(189,178,255,0.92)_62%,rgba(78,205,196,0.92)_100%)] px-7 py-6 text-center text-white shadow-[0_30px_90px_rgba(255,77,109,0.3)] backdrop-blur-xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">Score Popup</p>
                        <h3 className="mt-2 font-display text-4xl font-bold">
                          {score} / {quizQuestions.length}
                        </h3>
                        <p className="mt-2 text-sm text-white/90">Keren! Kamu berhasil menyelesaikan kuis interaktif.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <CardHeader className="space-y-5">
                  <SectionHeading
                    badge="Kuis Interaktif"
                    title="Jawab pertanyaan dan dapatkan badge pencapaian"
                    description="Kuis ini dirancang singkat, ramah, dan menyenangkan. Cocok untuk cek pemahaman setelah membaca materi."
                    align="left"
                  />
                  <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                      <p className="mb-2 text-sm font-medium text-slate-500">
                        Progress kuis: {quizFinished ? 'Selesai' : `${currentQuestion + 1} / ${quizQuestions.length}`}
                      </p>
                      <Progress value={quizFinished ? 100 : ((currentQuestion + 1) / quizQuestions.length) * 100} />
                    </div>
                    <Badge variant="outline" className="justify-center px-4 py-2 text-sm">
                      Skor saat ini: {score} / {quizQuestions.length}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  {!quizFinished ? (
                    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                      <div className="rounded-[28px] bg-[linear-gradient(135deg,rgba(255,77,109,0.15)_0%,rgba(255,143,163,0.15)_28%,rgba(189,178,255,0.18)_62%,rgba(78,205,196,0.18)_100%)] p-6 shadow-playful">
                        <div className="mb-5 inline-flex rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-slate-600">
                          Pertanyaan {currentQuestion + 1}
                        </div>
                        <h3 className="text-3xl font-bold leading-tight">
                          {quizQuestions[currentQuestion].prompt}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-slate-600">
                          Pilih satu jawaban terbaik. Setelah memilih, kamu bisa lanjut ke pertanyaan berikutnya.
                        </p>
                        <div className="mt-8 rounded-[24px] bg-slate-950 p-5 text-white">
                          <p className="text-sm font-semibold text-accent">Tips dari Rori</p>
                          <p className="mt-2 text-sm leading-6 text-slate-300">
                            Baca kata kunci seperti jantung, paru-paru, arteri, dan oksigen untuk membantu menentukan jawaban.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {quizQuestions[currentQuestion].options.map((option, index) => {
                          const isSelected = currentAnswer === index
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleSelectAnswer(index)}
                              className={cn(
                                'w-full rounded-[24px] border p-5 text-left transition-all duration-300 hover:-translate-y-1',
                                isSelected
                                  ? 'border-primary bg-[linear-gradient(135deg,rgba(255,77,109,0.12)_0%,rgba(255,143,163,0.16)_45%,rgba(255,230,109,0.14)_100%)] shadow-[0_20px_50px_rgba(255,77,109,0.18)]'
                                  : 'border-slate-200 bg-white/90 hover:border-primary/30 hover:bg-white',
                              )}
                            >
                              <div className="flex items-start gap-4">
                                <div
                                  className={cn(
                                    'mt-1 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold',
                                    isSelected ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600',
                                  )}
                                >
                                  {String.fromCharCode(65 + index)}
                                </div>
                                <div>
                                  <p className="text-base font-medium">{option}</p>
                                </div>
                              </div>
                            </button>
                          )
                        })}

                        <div className="flex flex-wrap items-center gap-3 pt-2">
                          <button
                            type="button"
                            onClick={handleNextQuestion}
                            disabled={currentAnswer === -1}
                            className={buttonVariants({ variant: 'default' })}
                          >
                            {currentQuestion === quizQuestions.length - 1 ? 'Selesaikan Kuis' : 'Pertanyaan Berikutnya'}
                          </button>
                          <span className="text-sm text-slate-500">
                            {currentAnswer === -1 ? 'Pilih jawaban dulu untuk lanjut.' : quizQuestions[currentQuestion].explanation}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                      <div className="rounded-[28px] bg-[linear-gradient(135deg,rgba(255,77,109,0.16)_0%,rgba(255,143,163,0.16)_28%,rgba(189,178,255,0.18)_60%,rgba(78,205,196,0.16)_100%)] p-7 shadow-playful">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white shadow-glow">
                          <BadgeCheck className="h-8 w-8" />
                        </div>
                        <h3 className="text-4xl font-bold">Skor Akhir: {score} / {quizQuestions.length}</h3>
                        <p className="mt-3 text-base leading-7 text-slate-600">{achievement.description}</p>
                        <div className="mt-6">
                          <Badge variant={achievement.variant} className="px-4 py-2 text-sm">
                            Badge: {achievement.title}
                          </Badge>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-3">
                          <button type="button" onClick={handleRestartQuiz} className={buttonVariants({ variant: 'secondary' })}>
                            Ulangi Kuis
                          </button>
                          <a href="#tentang" className={buttonVariants({ variant: 'outline' })}>
                            Lanjut ke Tentang
                          </a>
                        </div>
                      </div>

                      <div className="grid gap-4">
                        {quizQuestions.map((question, index) => {
                          const isCorrect = answers[index] === question.answer
                          return (
                            <div key={question.prompt} className="rounded-[24px] border border-slate-200 bg-white/90 p-5 shadow-soft">
                              <div className="flex items-start gap-4">
                                <div
                                  className={cn(
                                    'mt-1 flex h-10 w-10 items-center justify-center rounded-full',
                                    isCorrect ? 'bg-secondary/15 text-secondary-dark' : 'bg-primary/15 text-primary',
                                  )}
                                >
                                  {isCorrect ? <BadgeCheck className="h-5 w-5" /> : <ScrollText className="h-5 w-5" />}
                                </div>
                                <div>
                                  <p className="font-semibold">{question.prompt}</p>
                                  <p className="mt-2 text-sm leading-6 text-slate-600">
                                    Jawabanmu: {question.options[answers[index]]}
                                  </p>
                                  <p className="text-sm leading-6 text-slate-500">
                                    {isCorrect ? 'Benar.' : `Jawaban tepat: ${question.options[question.answer]}.`} {question.explanation}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section id="tentang" className="px-4 pb-20 pt-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl space-y-10">
            <SectionHeading
              badge="Tentang Website"
              title="Dibuat untuk menjembatani sains, visual modern, dan rasa ingin tahu"
              description="Website ini menggabungkan pendekatan edukasi, kesehatan, dan gamification agar pembelajaran terasa ringan namun tetap informatif."
            />

            <div className="grid gap-6 lg:grid-cols-[1fr_1fr_0.9fr]">
              <InfoCard
                icon={Users}
                title="Tim Pengembang"
                description="Desainer UI, pengembang frontend React, dan penulis materi edukasi berkolaborasi untuk membuat pengalaman belajar yang inklusif."
              />
              <InfoCard
                icon={BookOpen}
                title="Tujuan Website"
                description="Membantu pengguna dari berbagai usia memahami sistem peredaran darah secara visual, interaktif, dan mudah diingat."
              />
              <InfoCard
                icon={Sparkles}
                title="Gaya Visual"
                description="Perpaduan ceria ala aplikasi belajar modern dengan nuansa kesehatan yang bersih, lembut, dan profesional."
              />
            </div>

            <motion.div {...sectionAnimation}>
              <Card className="border-white/70 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white">
                <CardContent className="flex flex-col gap-6 p-8 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-3xl">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
                      Penutup
                    </p>
                    <h3 className="mt-3 font-display text-3xl font-bold">
                      Terus jaga jantungmu, karena ia bekerja untukmu setiap detik.
                    </h3>
                    <p className="mt-3 text-base leading-7 text-slate-300">
                      Mulailah dari kebiasaan kecil: aktif bergerak, makan seimbang, cukup minum
                      air, tidur cukup, dan lakukan pemeriksaan kesehatan secara berkala.
                    </p>
                  </div>
                  <a href="#home" className={buttonVariants({ variant: 'accent', size: 'lg' })}>
                    Kembali ke Atas
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/70 bg-white/60 px-4 py-8 backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>Website edukasi interaktif tentang Sistem Peredaran Darah Manusia.</p>
          <p>Dibangun dengan React, Tailwind CSS, Framer Motion, Lucide React, Recharts, dan komponen bergaya shadcn/ui.</p>
        </div>
      </footer>
    </div>
  )
}

function LoadingScreen() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg-light px-6">
      <div className="absolute -left-16 top-8 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute -right-10 bottom-10 h-56 w-56 rounded-full bg-secondary/20 blur-3xl" />
      <div className="relative text-center">
        <div className="mx-auto max-w-md rounded-[32px] border border-white/70 bg-white/75 p-8 shadow-playful backdrop-blur-xl">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.1, repeat: Number.POSITIVE_INFINITY }}
            className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(255,77,109,0.16)_0%,rgba(255,143,163,0.18)_36%,rgba(78,205,196,0.16)_100%)] shadow-[0_0_80px_rgba(255,77,109,0.18)]"
          >
            <HeartPulse className="heart-beat h-14 w-14 text-primary" />
          </motion.div>
          <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-slate-950/95 p-4">
            <svg viewBox="0 0 320 70" className="h-16 w-full">
              <path
                d="M0 38h52l18-18 20 32 24-42 18 28h44l18-12 16 12h110"
                fill="none"
                stroke="#4ECDC4"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="monitor-line"
              />
            </svg>
          </div>
          <h1 className="mt-7 font-display text-4xl font-bold">Menyiapkan petualangan sirkulasi darah...</h1>
          <p className="mt-3 text-slate-500">Rori sedang mengatur jantung, pembuluh, dan kuis interaktif untukmu.</p>
        </div>
      </div>
    </div>
  )
}

function BackgroundBlobs({ scrollY }: { scrollY: number }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="blob absolute -left-24 top-16 h-72 w-72 rounded-full bg-primary/18 blur-3xl"
        style={{ y: scrollY * 0.08 }}
      />
      <motion.div
        className="blob absolute right-[-5rem] top-32 h-80 w-80 rounded-full bg-purple-soft/25 blur-3xl"
        style={{ y: -scrollY * 0.05 }}
      />
      <motion.div
        className="blob absolute left-[22%] top-[42%] h-60 w-60 rounded-full bg-blue-soft/25 blur-3xl"
        style={{ y: scrollY * 0.04 }}
      />
      <motion.div
        className="blob absolute bottom-[-5rem] right-[18%] h-72 w-72 rounded-full bg-secondary/20 blur-3xl"
        style={{ y: -scrollY * 0.06 }}
      />
      <motion.div
        className="blob absolute bottom-20 left-[8%] h-52 w-52 rounded-full bg-accent/20 blur-3xl"
        style={{ y: scrollY * 0.03 }}
      />
    </div>
  )
}

function FloatingCells({
  cells,
}: {
  cells: Array<{ id: number; left: number; top: number; size: number; duration: number; delay: number }>
}) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {cells.map((cell) => (
        <motion.div
          key={cell.id}
          className="absolute rounded-full border border-primary/10 bg-[linear-gradient(135deg,rgba(255,77,109,0.18)_0%,rgba(255,143,163,0.2)_60%,rgba(255,255,255,0.28)_100%)] shadow-[0_8px_24px_rgba(255,77,109,0.1)]"
          style={{ left: `${cell.left}%`, top: `${cell.top}%`, width: cell.size * 1.4, height: cell.size }}
          animate={{ x: [0, 20, -14, 0], y: [0, -18, 14, 0], rotate: [0, 6, -8, 0] }}
          transition={{
            duration: cell.duration,
            delay: cell.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: 'easeInOut',
          }}
        >
          <div className="absolute inset-[18%] rounded-full border border-white/30 bg-primary/25" />
        </motion.div>
      ))}
    </div>
  )
}

function MascotGuide({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-30 flex max-w-[20rem] items-end gap-3 sm:bottom-6 sm:right-6"
    >
      <div className="hidden rounded-[24px] border border-white/70 bg-white/92 p-4 text-sm leading-6 text-slate-600 shadow-playful backdrop-blur md:block">
        <p className="font-semibold text-primary">Fakta dari Rori</p>
        <p>{message}</p>
      </div>
      <div className="animated-gradient relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#FF4D6D_0%,#FF8FA3_38%,#BDB2FF_72%,#4ECDC4_100%)] shadow-glow">
        <div className="absolute h-16 w-16 rounded-full border border-white/25 bg-primary-light/70" />
        <div className="relative z-10">
          <div className="mb-2 flex items-center justify-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white" />
            <span className="h-2.5 w-2.5 rounded-full bg-white" />
          </div>
          <div className="mx-auto h-1.5 w-8 rounded-full bg-white/90" />
        </div>
      </div>
    </motion.div>
  )
}

function SectionHeading({
  badge,
  title,
  description,
  align = 'center',
}: {
  badge: string
  title: string
  description: string
  align?: 'center' | 'left'
}) {
  return (
    <motion.div
      {...sectionAnimation}
      className={cn('space-y-4', align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl text-left')}
    >
      <Badge variant="outline" className="w-fit border-primary/15 bg-white/85 px-4 py-2 text-sm shadow-soft">
        {badge}
      </Badge>
      <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">{title}</h2>
      <p className="text-lg leading-8 text-slate-600">{description}</p>
    </motion.div>
  )
}

function HeartShowcase() {
  return (
    <div className="relative flex min-h-[22rem] items-center justify-center overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top,#334155_0%,#1e293b_24%,#0f172a_58%,#020617_100%)] p-6">
      <div className="absolute inset-4 rounded-[24px] border border-white/10" />
      <div className="absolute left-6 top-10 h-20 w-20 rounded-full bg-purple-soft/25 blur-2xl" />
      <div className="absolute bottom-8 right-8 h-24 w-24 rounded-full bg-secondary/20 blur-2xl" />
      <motion.div
        animate={{ scale: [1, 1.07, 1] }}
        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        className="relative z-10"
      >
        <svg viewBox="0 0 260 260" className="h-60 w-60">
          <defs>
            <linearGradient id="heartFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF8FA3" />
              <stop offset="100%" stopColor="#FF4D6D" />
            </linearGradient>
          </defs>
          <motion.path
            d="M130 208c-42-26-75-53-75-96 0-30 20-52 47-52 17 0 29 8 38 20 9-12 21-20 38-20 27 0 47 22 47 52 0 43-33 70-75 96l-20 12-20-12z"
            fill="url(#heartFill)"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY }}
            style={{ transformOrigin: 'center' }}
          />
          <motion.path
            d="M74 136c22 6 42-10 56-30 8 13 20 27 42 30"
            fill="none"
            stroke="#FFE66D"
            strokeWidth="9"
            strokeLinecap="round"
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY }}
          />
        </svg>
      </motion.div>
      <motion.div
        className="absolute left-6 top-8 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-white shadow-mint"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY }}
      >
        Oksigen masuk
      </motion.div>
      <motion.div
        className="absolute bottom-8 right-5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-text-dark shadow-soft"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      >
        Darah dipompa
      </motion.div>
    </div>
  )
}

function InfoPill({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[22px] border border-white/80 bg-white/85 p-4 shadow-soft backdrop-blur">
      <p className="text-sm font-semibold text-slate-500">{title}</p>
      <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  )
}

function TimelineCard({ index, description }: { index: number; description: string }) {
  return (
    <div className="relative">
      <Card className="h-full border-white/70 bg-white/82 shadow-soft">
        <CardContent className="space-y-4 p-5">
          <div className="animated-gradient flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#FF4D6D_0%,#FF8FA3_40%,#4ECDC4_100%)] text-lg font-bold text-white">
            {index + 1}
          </div>
          <p className="text-sm leading-7 text-slate-600">{description}</p>
        </CardContent>
      </Card>
    </div>
  )
}

function DiseaseCard({ item }: { item: DiseaseItem }) {
  return (
    <div className="flip-card h-[22rem]">
      <div className="flip-card-inner h-full">
        <div className={cn('flip-card-face flex h-full flex-col rounded-[28px] bg-gradient-to-br p-6 text-white shadow-playful', item.accentClass)}>
          <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-white/20">
            <item.icon className="h-8 w-8" />
          </div>
          <div className="mt-8 space-y-3">
            <h3 className="text-2xl font-bold">{item.title}</h3>
            <p className="text-sm leading-7 text-white/90">{item.subtitle}</p>
          </div>
          <div className="mt-auto rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
            Hover untuk detail
          </div>
        </div>

        <div className="flip-card-back flip-card-face flex h-full flex-col rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-playful backdrop-blur">
          <h3 className="text-2xl font-bold text-text-dark">{item.title}</h3>
          <p className="mt-3 text-sm font-semibold text-slate-500">Faktor risiko</p>
          <div className="mt-3 space-y-3">
            {item.risks.map((risk) => (
              <div key={risk} className="rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                {risk}
              </div>
            ))}
          </div>
          <div className="mt-auto rounded-[22px] bg-secondary/10 p-4 text-sm leading-6 text-slate-600">
            <span className="font-semibold text-secondary-dark">Pencegahan:</span> {item.prevention}
          </div>
        </div>
      </div>
    </div>
  )
}

function CarouselArtwork({ labels }: { labels: string[] }) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/72 p-5 shadow-playful">
      <div className="absolute right-4 top-4 h-20 w-20 rounded-full bg-secondary/20 blur-2xl" />
      <div className="absolute bottom-4 left-4 h-16 w-16 rounded-full bg-primary/20 blur-xl" />
      <div className="relative grid min-h-[18rem] place-items-center">
        <div className="relative h-52 w-52">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
          />
          <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white shadow-glow">
            <Droplets className="h-10 w-10" />
          </div>
          {labels.map((label, index) => {
            const angle = (Math.PI * 2 * index) / labels.length
            const x = 76 * Math.cos(angle)
            const y = 76 * Math.sin(angle)
            return (
              <div
                key={label}
                className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
              >
                <div className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-600 shadow-soft backdrop-blur">
                  {label}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function InfographicRow({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <div className="flex items-start gap-4 rounded-[22px] border border-white/80 bg-slate-50/90 p-4 shadow-soft">
      <div className="animated-gradient flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#FF8FA3_0%,#FFE66D_40%,#4ECDC4_100%)]">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </div>
  )
}

function InfoCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon
  title: string
  description: string
}) {
  return (
    <motion.div {...sectionAnimation}>
      <Card className="h-full border-white/70 bg-white/82 shadow-playful">
        <CardContent className="p-6">
          <div className="animated-gradient mb-5 flex h-14 w-14 items-center justify-center rounded-[20px] bg-[linear-gradient(135deg,#FF4D6D_0%,#FF8FA3_36%,#4ECDC4_100%)]">
            <Icon className="h-7 w-7 text-white" />
          </div>
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
