import { useState } from 'react'
import { Wind, Droplet, Play, Pause, ListOrdered, Activity, CheckCircle2 } from 'lucide-react'

export interface CirculationStep {
  number: number
  title: string
  latin: string
  circuit: 'pulmonary' | 'systemic'
  oxygenated: boolean
  description: string
  clinicalNote: string
}

export const circulationSteps: CirculationStep[] = [
  {
    number: 1,
    title: 'Bilik Kanan (Ventrikel Kanan)',
    latin: 'Ventriculus Dexter',
    circuit: 'pulmonary',
    oxygenated: false,
    description: 'Titik awal sirkulasi pulmonalis (peredaran darah kecil). Ruang jantung yang memompa darah miskin O₂ (kaya CO₂) menuju truncus pulmonalis.',
    clinicalNote: 'Tekanan sistolik ventrikel kanan normalnya hanya ~25 mmHg karena resistensi pembuluh paru rendah.',
  },
  {
    number: 2,
    title: 'Arteri Pulmonalis (Kanan & Kiri)',
    latin: 'Arteria Pulmonalis (Dextra & Sinistra)',
    circuit: 'pulmonary',
    oxygenated: false,
    description: 'Satu-satunya arteri dalam tubuh yang membawa darah deoksigenasi (miskin O₂), mengalirkan darah dari ventrikel kanan menuju paru-paru.',
    clinicalNote: 'Emboli paru (thrombus yang menyumbat arteri ini) adalah kondisi gawat darurat yang menghalangi oksigenasi darah.',
  },
  {
    number: 3,
    title: 'Kapiler Paru-Paru (Alveolus)',
    latin: 'Plexus Capillaris Pulmonalis',
    circuit: 'pulmonary',
    oxygenated: true,
    description: 'Anyaman mikroskopis di dinding alveolus paru tempat terjadinya difusi respirasi: melepaskan CO₂ dan mengikat oksigen segar (O₂) ke hemoglobin.',
    clinicalNote: 'Ketebalan membran difusi hanya 0.5 mikrometer dengan luas total seukuran lapangan tenis (~70-100 m²).',
  },
  {
    number: 4,
    title: 'Vena Pulmonalis',
    latin: 'Vena Pulmonalis',
    circuit: 'pulmonary',
    oxygenated: true,
    description: 'Empat saluran vena yang membawa darah yang baru saja dioksigenasi (merah terang, kaya O₂) dari paru-paru kembali ke serambi kiri jantung.',
    clinicalNote: 'Satu-satunya vena dalam tubuh yang mengangkut darah kaya oksigen.',
  },
  {
    number: 5,
    title: 'Serambi Kiri (Atrium Kiri)',
    latin: 'Atrium Sinistrum',
    circuit: 'pulmonary',
    oxygenated: true,
    description: 'Ruang penerima darah kaya oksigen dari paru-paru. Darah kemudian mengalir melalui katup mitral (bikuspid) ke bilik kiri.',
    clinicalNote: 'Mengakhiri sirkuit peredaran darah kecil dan menyiapkan darah untuk sirkuit sistemik besar.',
  },
  {
    number: 6,
    title: 'Bilik Kiri (Ventrikel Kiri)',
    latin: 'Ventriculus Sinister',
    circuit: 'systemic',
    oxygenated: true,
    description: 'Titik awal sirkulasi sistemik (peredaran darah besar). Ruang pompa paling bertenaga dengan dinding miokardium paling tebal (10-15 mm).',
    clinicalNote: 'Menghasilkan tekanan sistolik masif (~120 mmHg) untuk mendorong darah ke seluruh organ dan ujung jari tubuh.',
  },
  {
    number: 7,
    title: 'Aorta (Arteri Utama)',
    latin: 'Aorta Ascendens & Arcus Aortae',
    circuit: 'systemic',
    oxygenated: true,
    description: 'Pembuluh nadi terbesar tubuh yang bercabang menyuplai darah beroksigen ke otak, leher, lengan, organ dada, rongga perut, dan tungkai.',
    clinicalNote: 'Dinding aorta kaya serat elastin sehingga mampu meregang saat sistol dan berkontraksi kembali saat diastol (Windkessel effect).',
  },
  {
    number: 8,
    title: 'Kapiler Daerah Kepala, Dada, Perut, & Kaki',
    latin: 'Capillaria Systemica (Kranial & Kaudal)',
    circuit: 'systemic',
    oxygenated: false,
    description: 'Jejaring pembuluh mikroskopis tempat molekul O₂, glukosa, dan elektrolit diserahkan ke sel-sel tubuh, sementara limbah metabolik CO₂ diserap.',
    clinicalNote: 'Eritrosit harus berbaris satu per satu saat melintasi lumen kapiler yang diameternya hanya 5-8 mikron.',
  },
  {
    number: 9,
    title: 'Vena & Vena Kava (Superior & Inferior)',
    latin: 'Vena Cava Superior & Inferior',
    circuit: 'systemic',
    oxygenated: false,
    description: 'Pembuluh balik besar bertekanan rendah yang membawa darah yang telah digunakan (miskin O₂, kaya CO₂) dari seluruh bagian tubuh kembali ke jantung.',
    clinicalNote: 'Dilengkapi katup-katup satu arah di ekstremitas bawah untuk melawan gaya gravitasi dan mencegah refluks darah.',
  },
  {
    number: 10,
    title: 'Serambi Kanan (Atrium Kanan)',
    latin: 'Atrium Dextrum',
    circuit: 'systemic',
    oxygenated: false,
    description: 'Muara penampung darah vena deoksigenasi dari vena kava superior, vena kava inferior, dan sinus koronarius sebelum dialirkan kembali ke nomor 1.',
    clinicalNote: 'Terdapat nodus sinoatrial (SA node) yang mencetuskan impuls listrik detak jantung manusia.',
  },
]

export default function EnhancedBloodFlowDiagram() {
  const [viewMode, setViewMode] = useState<'diagram' | 'simulation'>('diagram')
  const [activeCircuit, setActiveCircuit] = useState<'both' | 'pulmonary' | 'systemic'>('both')
  const [selectedStep, setSelectedStep] = useState<number>(1)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)

  const filteredSteps = circulationSteps.filter((s) => {
    if (activeCircuit === 'pulmonary') return s.circuit === 'pulmonary'
    if (activeCircuit === 'systemic') return s.circuit === 'systemic'
    return true
  })

  const currentStepData = circulationSteps.find((s) => s.number === selectedStep) || circulationSteps[0]

  return (
    <div className="w-full rounded-3xl border border-slate-200/90 bg-white/95 p-6 sm:p-10 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95 overflow-hidden">
      {/* Top Controls & Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5 mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-rose-600 dark:text-rose-400 font-bold">
            Fisiologi Hemodinamika Medis
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Sistem Sirkulasi & Pembuluh Darah (1–10)
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Main Mode Toggle */}
          <div className="flex rounded-full border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
            <button
              onClick={() => setViewMode('diagram')}
              className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                viewMode === 'diagram'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ListOrdered size={14} />
              Diagram Skematik Bernomor
            </button>
            <button
              onClick={() => setViewMode('simulation')}
              className={`px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                viewMode === 'simulation'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Activity size={14} />
              Simulasi Dinamis
            </button>
          </div>

          {/* Circuit Filter Tabs */}
          <div className="flex rounded-full border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-50 dark:bg-slate-800/80 text-xs font-semibold">
            <button
              onClick={() => setActiveCircuit('both')}
              className={`px-3 py-1 rounded-full transition-all ${
                activeCircuit === 'both'
                  ? 'bg-white dark:bg-slate-700 text-rose-700 dark:text-rose-300 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Semua (1–10)
            </button>
            <button
              onClick={() => setActiveCircuit('pulmonary')}
              className={`px-3 py-1 rounded-full transition-all ${
                activeCircuit === 'pulmonary'
                  ? 'bg-white dark:bg-slate-700 text-sky-700 dark:text-sky-300 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Peredaran Kecil (1–5)
            </button>
            <button
              onClick={() => setActiveCircuit('systemic')}
              className={`px-3 py-1 rounded-full transition-all ${
                activeCircuit === 'systemic'
                  ? 'bg-white dark:bg-slate-700 text-rose-700 dark:text-rose-300 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Peredaran Besar (6–10)
            </button>
          </div>

          {viewMode === 'simulation' && (
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium flex items-center gap-1"
              title={isPlaying ? 'Jeda Aliran' : 'Jalankan Aliran'}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            </button>
          )}
        </div>
      </div>

      {/* VIEW MODE 1: Interactive Numbered Diagram (1-10) */}
      {viewMode === 'diagram' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-6">
          {/* Diagram Image Container */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-5 rounded-2xl bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-inner">
            <div className="relative w-full max-w-sm flex items-center justify-center">
              <img
                src="/assets/vessels_system.png"
                alt="Diagram Anatomi Sistem Pembuluh Darah Bernomor 1-10"
                className="w-full h-auto max-h-[500px] object-contain filter drop-shadow-[0_12px_24px_rgba(2,132,199,0.12)] rounded-xl"
              />
            </div>
            <div className="mt-4 flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-sky-700 dark:text-sky-400">
                <span className="w-3 h-3 rounded-full bg-sky-500 inline-block" />
                Darah Deoksigenasi (Kaya CO₂)
              </span>
              <span className="flex items-center gap-1.5 text-rose-700 dark:text-rose-400">
                <span className="w-3 h-3 rounded-full bg-rose-600 inline-block" />
                Darah Beroksigen (Kaya O₂)
              </span>
            </div>
          </div>

          {/* Interactive Checkpoint List (1-10) & Detail Card */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Pilih Titik Sirkulasi (Klik Angka):
              </h4>
              <span className="text-xs text-slate-400 font-mono">
                {currentStepData.circuit === 'pulmonary' ? 'Sirkulasi Pulmonal' : 'Sirkulasi Sistemik'}
              </span>
            </div>

            {/* Quick Numbers Bar */}
            <div className="flex flex-wrap gap-1.5">
              {filteredSteps.map((step) => {
                const isSelected = selectedStep === step.number
                return (
                  <button
                    key={step.number}
                    onClick={() => setSelectedStep(step.number)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isSelected
                        ? step.oxygenated
                          ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30 scale-105'
                          : 'bg-sky-600 text-white shadow-md shadow-sky-600/30 scale-105'
                        : step.oxygenated
                        ? 'bg-rose-50 text-rose-800 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300'
                        : 'bg-sky-50 text-sky-800 hover:bg-sky-100 dark:bg-sky-950/40 dark:text-sky-300'
                    }`}
                  >
                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-white/20 text-[10px]">
                      {step.number}
                    </span>
                    <span className="truncate max-w-[110px]">{step.title.split(' ')[0]}</span>
                  </button>
                )
              })}
            </div>

            {/* Detail Focus Panel */}
            {currentStepData && (
              <div className="p-5 rounded-2xl border border-slate-200 bg-white/90 shadow-lg dark:border-slate-800 dark:bg-slate-900/90 text-left transition-all">
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-extrabold text-white ${
                          currentStepData.oxygenated ? 'bg-rose-600' : 'bg-sky-600'
                        }`}
                      >
                        {currentStepData.number}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          currentStepData.oxygenated
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                            : 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300'
                        }`}
                      >
                        {currentStepData.oxygenated ? 'Darah Bersih (O₂)' : 'Darah Kotor (CO₂)'}
                      </span>
                      <span className="text-xs italic text-slate-400 font-serif">
                        {currentStepData.latin}
                      </span>
                    </div>
                    <h5 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                      {currentStepData.title}
                    </h5>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {currentStepData.description}
                </p>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                  <Activity size={15} className="text-rose-500 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-slate-900 dark:text-white">Signifikansi Hemodinamik: </strong>
                    {currentStepData.clinicalNote}
                  </span>
                </div>
              </div>
            )}

            {/* Quick Sequence Navigation */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-sky-50/50 to-rose-50/50 dark:from-sky-950/20 dark:to-rose-950/20 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
              <p className="font-bold flex items-center gap-1.5 text-slate-900 dark:text-white">
                <CheckCircle2 size={14} className="text-rose-600" />
                Alur Lengkap Sirkulasi Tubuh Manusia:
              </p>
              <p className="font-mono text-[11px] text-sky-700 dark:text-sky-300">
                • <strong>Peredaran Kecil:</strong> 1 (Bilik Kanan) → 2 (Arteri Pulmonalis) → 3 (Kapiler Paru) → 4 (Vena Pulmonalis) → 5 (Serambi Kiri)
              </p>
              <p className="font-mono text-[11px] text-rose-700 dark:text-rose-300">
                • <strong>Peredaran Besar:</strong> 6 (Bilik Kiri) → 7 (Aorta) → 8 (Kapiler Tubuh) → 9 (Vena Kava) → 10 (Serambi Kanan)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: Animated SVG Simulation Viewport */}
      {viewMode === 'simulation' && (
      <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border border-slate-200/60 dark:border-slate-800/80 p-4">
        <svg viewBox="0 0 1000 520" className="w-full h-auto select-none">
          <defs>
            <linearGradient id="pulmonary-artery-grad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#0369A1" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>

            <linearGradient id="pulmonary-vein-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#BE123C" />
            </linearGradient>

            <linearGradient id="systemic-aorta-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E11D48" />
              <stop offset="100%" stopColor="#9F1239" />
            </linearGradient>

            <linearGradient id="systemic-vena-grad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#0369A1" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>

          {/* ===== 1. UPPER SECTION: PULMONARY CAPILLARY BED (PARU-PARU) ===== */}
          <g opacity={activeCircuit === 'systemic' ? 0.25 : 1} className="transition-opacity duration-300">
            {/* Lungs Background Silhouette with Alveolar Texture */}
            <path
              d="M 370 25 C 430 10 570 10 630 25 C 670 45 670 95 630 115 C 570 125 430 125 370 115 C 330 95 330 45 370 25 Z"
              fill="rgba(244, 114, 182, 0.12)"
              stroke="#F472B6"
              strokeWidth="1.5"
            />
            {/* Alveolar capillary mesh */}
            <g stroke="#9333EA" strokeWidth="1" opacity="0.3" fill="none">
              <path d="M 420 40 Q 500 65 580 40" />
              <path d="M 400 70 Q 500 95 600 70" />
              <path d="M 440 55 Q 500 45 560 55" />
            </g>

            <text x="500" y="58" textAnchor="middle" fill="#BE123C" fontSize="13" fontWeight="bold">
              Kapiler Alveolus Paru-Paru (Pulmo)
            </text>
            <text x="500" y="78" textAnchor="middle" fill="#64748B" fontSize="10">
              Pertukaran Gas: O₂ Masuk ke Darah • CO₂ Dikeluarkan ke Udara
            </text>

            {/* Pulmonary Arteries (Blue - Upward from Right Ventricle conus to Lungs) */}
            <path
              d="M 445 258 C 445 210 455 160 455 118"
              stroke="url(#pulmonary-artery-grad)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            {/* Flow particle */}
            {isPlaying && (
              <circle cx="450" cy="180" r="4.5" fill="#38BDF8">
                <animate attributeName="cy" values="258;118" dur="1.8s" repeatCount="indefinite" />
              </circle>
            )}

            {/* Pulmonary Veins (Red - Downward from Lungs to Left Atrium) */}
            <path
              d="M 550 118 C 550 142 555 165 555 188"
              stroke="url(#pulmonary-vein-grad)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            {/* Flow particle */}
            {isPlaying && (
              <circle cx="552" cy="150" r="4.5" fill="#FDA4AF">
                <animate attributeName="cy" values="118;188" dur="1.8s" repeatCount="indefinite" />
              </circle>
            )}

            {/* Non-overlapping Upper Vessel Labels with Background Plaques */}
            <g transform="translate(255, 142)">
              <rect x="-95" y="-14" width="190" height="28" rx="8" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="1.2" className="dark:fill-slate-900 dark:stroke-slate-700 filter drop-shadow-xs" />
              <text x="0" y="4" textAnchor="middle" fill="#0284C7" fontSize="11" fontWeight="bold">
                A. Pulmonalis (Miskin O₂) ↑
              </text>
            </g>

            <g transform="translate(745, 142)">
              <rect x="-95" y="-14" width="190" height="28" rx="8" fill="#FFF1F2" stroke="#FECDD3" strokeWidth="1.2" className="dark:fill-slate-900 dark:stroke-slate-700 filter drop-shadow-xs" />
              <text x="0" y="4" textAnchor="middle" fill="#BE123C" fontSize="11" fontWeight="bold">
                ↓ V. Pulmonalis (Kaya O₂)
              </text>
            </g>
          </g>

          {/* ===== 2. MIDDLE SECTION: CENTRAL 4-CHAMBER ANATOMICAL HEART ===== */}
          <g transform="translate(375, 188)">
            {/* Heart Muscle Body */}
            <rect
              x="0"
              y="0"
              width="250"
              height="140"
              rx="24"
              fill="#FFFFFF"
              stroke="#BE123C"
              strokeWidth="2.5"
              className="dark:fill-slate-900"
              filter="drop-shadow(0 8px 16px rgba(190, 18, 60, 0.12))"
            />

            {/* Interatrial & Interventricular Septum lines */}
            <line x1="125" y1="0" x2="125" y2="140" stroke="#E2E8F0" strokeWidth="2.5" className="dark:stroke-slate-800" />
            <line x1="0" y1="70" x2="250" y2="70" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="4,2" className="dark:stroke-slate-800" />

            {/* 4 Chamber Divisions */}
            {/* Right Atrium (Miskin O2) */}
            <rect x="6" y="6" width="113" height="60" rx="18" fill="#E0F2FE" opacity="0.6" />
            <text x="62" y="28" textAnchor="middle" fill="#0369A1" fontSize="11" fontWeight="bold">
              Atrium Kanan (RA)
            </text>
            <text x="62" y="44" textAnchor="middle" fill="#0284C7" fontSize="8.5">
              Terima CO₂ dari Tubuh
            </text>

            {/* Left Atrium (Kaya O2) */}
            <rect x="131" y="6" width="113" height="60" rx="18" fill="#FFE4E6" opacity="0.6" />
            <text x="187" y="28" textAnchor="middle" fill="#9F1239" fontSize="11" fontWeight="bold">
              Atrium Kiri (LA)
            </text>
            <text x="187" y="44" textAnchor="middle" fill="#BE123C" fontSize="8.5">
              Terima O₂ dari Paru
            </text>

            {/* Atrioventricular Flow Arrows with Valve Labels */}
            {/* Tricuspid Flow (RA -> RV) */}
            <g opacity={isPlaying ? 0.9 : 0.6}>
              <path d="M 62 55 L 62 76" stroke="#0284C7" strokeWidth="2.5" markerEnd="url(#arrow-blue)" fill="none" />
              <text x="62" y="70" textAnchor="middle" fill="#0369A1" fontSize="7" fontWeight="bold" opacity="0.8">
                Katup Trikuspid
              </text>
            </g>

            {/* Mitral Flow (LA -> LV) */}
            <g opacity={isPlaying ? 0.9 : 0.6}>
              <path d="M 187 55 L 187 76" stroke="#E11D48" strokeWidth="2.5" markerEnd="url(#arrow-red)" fill="none" />
              <text x="187" y="70" textAnchor="middle" fill="#9F1239" fontSize="7" fontWeight="bold" opacity="0.8">
                Katup Mitral
              </text>
            </g>

            {/* Right Ventricle (Pompa ke Paru) */}
            <rect x="6" y="80" width="113" height="54" rx="16" fill="#BAE6FD" opacity="0.6" />
            <text x="62" y="103" textAnchor="middle" fill="#0369A1" fontSize="11" fontWeight="bold">
              Ventrikel Kanan (RV)
            </text>
            <text x="62" y="119" textAnchor="middle" fill="#0284C7" fontSize="8.5">
              Pompa ke A. Pulmonalis
            </text>

            {/* Left Ventricle (Pompa ke Seluruh Tubuh) */}
            <rect x="131" y="80" width="113" height="54" rx="16" fill="#FDA4AF" opacity="0.6" />
            <text x="187" y="103" textAnchor="middle" fill="#9F1239" fontSize="11" fontWeight="bold">
              Ventrikel Kiri (LV)
            </text>
            <text x="187" y="119" textAnchor="middle" fill="#BE123C" fontSize="8.5">
              Pompa ke Aorta
            </text>
          </g>

          {/* ===== 3. LOWER SECTION: SYSTEMIC CAPILLARY BED (ORGAN & JARINGAN TUBUH) ===== */}
          <g opacity={activeCircuit === 'pulmonary' ? 0.25 : 1} className="transition-opacity duration-300">
            {/* Aorta Downward (Red - Ventricle Left to Systemic Organs) */}
            <path
              d="M 562 328 C 562 360 565 390 565 415"
              stroke="url(#systemic-aorta-grad)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            {/* Flow particle */}
            {isPlaying && (
              <circle cx="563" cy="370" r="4.5" fill="#FDA4AF">
                <animate attributeName="cy" values="328;415" dur="1.8s" repeatCount="indefinite" />
              </circle>
            )}

            {/* Vena Cava Upward (Blue - Systemic Organs to Right Atrium lateral wall) */}
            <path
              d="M 380 415 C 330 375 320 270 375 218"
              stroke="url(#systemic-vena-grad)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            {/* Flow particle moving from body up along curve to RA */}
            {isPlaying && (
              <circle cx="340" cy="310" r="4.5" fill="#38BDF8">
                <animate attributeName="cx" values="380;335;375" dur="2.2s" repeatCount="indefinite" />
                <animate attributeName="cy" values="415;310;218" dur="2.2s" repeatCount="indefinite" />
              </circle>
            )}

            {/* Non-overlapping Lower Vessel Labels with Background Plaques */}
            <g transform="translate(205, 330)">
              <rect x="-95" y="-14" width="190" height="28" rx="8" fill="#F0F9FF" stroke="#BAE6FD" strokeWidth="1.2" className="dark:fill-slate-900 dark:stroke-slate-700 filter drop-shadow-xs" />
              <text x="0" y="4" textAnchor="middle" fill="#0284C7" fontSize="11" fontWeight="bold">
                Vena Kava (Miskin O₂) ↑
              </text>
            </g>

            <g transform="translate(745, 370)">
              <rect x="-95" y="-14" width="190" height="28" rx="8" fill="#FFF1F2" stroke="#FECDD3" strokeWidth="1.2" className="dark:fill-slate-900 dark:stroke-slate-700 filter drop-shadow-xs" />
              <text x="0" y="4" textAnchor="middle" fill="#BE123C" fontSize="11" fontWeight="bold">
                ↓ Aorta (Kaya O₂ ke Tubuh)
              </text>
            </g>

            {/* Systemic Capillary Bed (Tissue Organs) */}
            <path
              d="M 370 415 C 430 398 570 398 630 415 C 670 435 670 480 630 495 C 570 508 430 508 370 495 C 330 480 330 435 370 415 Z"
              fill="rgba(147, 51, 234, 0.08)"
              stroke="#A855F7"
              strokeWidth="1.5"
            />
            <text x="500" y="448" textAnchor="middle" fill="#7E22CE" fontSize="13" fontWeight="bold">
              Jaringan Tubuh & Mikrosirkulasi Sistemik
            </text>
            <text x="500" y="468" textAnchor="middle" fill="#64748B" fontSize="10">
              O₂ & Nutrisi Diterima Sel • CO₂ & Limbah Metabolisme Diangkut Vena
            </text>
          </g>

          {/* Legend Details in SVG corners */}
          <g transform="translate(35, 35)" className="text-[11px]">
            <rect width="180" height="90" rx="12" fill="rgba(255,255,255,0.92)" stroke="#E2E8F0" className="dark:fill-slate-900/90 dark:stroke-slate-800" />
            <text x="15" y="24" fontWeight="bold" fill="#0F172A" className="dark:fill-white">
              Sirkulasi Pulmonal:
            </text>
            <text x="15" y="44" fill="#0284C7">1. RV memompa darah CO₂</text>
            <text x="15" y="60" fill="#0284C7">2. Paru mengoksigenasi</text>
            <text x="15" y="76" fill="#BE123C">3. Darah O₂ masuk LA</text>
          </g>

          <g transform="translate(785, 35)" className="text-[11px]">
            <rect width="180" height="90" rx="12" fill="rgba(255,255,255,0.92)" stroke="#E2E8F0" className="dark:fill-slate-900/90 dark:stroke-slate-800" />
            <text x="15" y="24" fontWeight="bold" fill="#0F172A" className="dark:fill-white">
              Sirkulasi Sistemik:
            </text>
            <text x="15" y="44" fill="#BE123C">1. LV memompa ke Aorta</text>
            <text x="15" y="60" fill="#BE123C">2. Sel jaringan ambil O₂</text>
            <text x="15" y="76" fill="#0284C7">3. Vena Kava bawa CO₂ ke RA</text>
          </g>
        </svg>
      </div>
      )}

      {/* Hemodynamic Circuit Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 dark:bg-sky-950/30 dark:border-sky-900/50">
          <p className="text-xs font-bold text-sky-900 dark:text-sky-200 uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <Wind size={14} className="text-sky-600" />
            Peredaran Darah Kecil (Pulmonal)
          </p>
          <p className="text-xs text-sky-800 dark:text-sky-300 leading-relaxed font-mono">
            Ventrikel Kanan → Arteri Pulmonalis → Paru-Paru (Alveolus) → Vena Pulmonalis → Atrium Kiri
          </p>
          <p className="text-[11px] text-slate-500 mt-2">
            Tujuan: Mengeluarkan gas buang CO₂ dan mengisi kembali cadangan O₂ ke dalam molekul hemoglobin.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 dark:bg-rose-950/30 dark:border-rose-900/50">
          <p className="text-xs font-bold text-rose-900 dark:text-rose-200 uppercase tracking-wider flex items-center gap-1.5 mb-1">
            <Droplet size={14} className="text-rose-600" />
            Peredaran Darah Besar (Sistemik)
          </p>
          <p className="text-xs text-rose-800 dark:text-rose-300 leading-relaxed font-mono">
            Ventrikel Kiri → Aorta → Seluruh Jaringan Tubuh (Kapiler) → Vena Kava → Atrium Kanan
          </p>
          <p className="text-[11px] text-slate-500 mt-2">
            Tujuan: Mendistribusikan oksigen, glukosa, elektrolit, dan nutrisi vital ke otak, ginjal, dan otot.
          </p>
        </div>
      </div>
    </div>
  )
}
