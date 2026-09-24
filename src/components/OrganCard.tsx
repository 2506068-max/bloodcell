import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Activity } from 'lucide-react'

export interface OrganDetailItem {
  id: string
  title: string
  latin: string
  subtitle: string
  imageSrc?: string
  anatomicalType: 'heart' | 'lungs' | 'vessels' | 'perfusion'
  stats: { label: string; value: string }[]
  keyStructures: string[]
  description: string
  clinicalRelevance: string
}

export const medicalOrgans: OrganDetailItem[] = [
  {
    id: 'heart',
    title: 'Jantung (Cor)',
    latin: 'Cor Humanum',
    subtitle: 'Pompa Muskular Berongga 4 Ruang',
    imageSrc: '/assets/heart_anatomical.jpg',
    anatomicalType: 'heart',
    stats: [
      { label: 'Denyut Normal', value: '60 – 100 bpm' },
      { label: 'Curah Jantung', value: '~5.0 L / menit' },
      { label: 'Kerja Kontraksi', value: '100.000 x / hari' },
    ],
    keyStructures: [
      'Atrium Dextrum & Sinistrum',
      'Ventriculus Dexter & Sinister',
      'Valvula Mitralis & Tricuspidalis',
      'Arteria Coronaria (Nutrisi Miokard)',
    ],
    description:
      'Organ berotot berukuran kepalan tangan di rongga mediastinum tengah. Bertindak sebagai dua pompa terkoordinasi: jantung kanan menggerakkan sirkulasi pulmonalis bertekanan rendah, dan jantung kiri menggerakkan sirkulasi sistemik bertekanan tinggi.',
    clinicalRelevance:
      'Iskemia miokard akibat stenosis arteri koroner memicu angina pektoris dan infark miokard akut (serangan jantung).',
  },
  {
    id: 'lungs',
    title: 'Paru-Paru (Pulmo)',
    latin: 'Pulmones',
    subtitle: 'Organ Respirasi & Oksigenasi Darah',
    imageSrc: '/assets/lungs_anatomical.png',
    anatomicalType: 'lungs',
    stats: [
      { label: 'Luas Difusi Alveoli', value: '70 – 100 m²' },
      { label: 'Jumlah Alveolus', value: '~480 Juta' },
      { label: 'Saturasi Oksigen', value: '95 – 100% SpO₂' },
    ],
    keyStructures: [
      'Arbor Bronchialis & Bronkiolus',
      'Lobus Superior, Medius, Inferior',
      'Membrana Alveolocapillaris',
      'Pleura Visceralis & Parietalis',
    ],
    description:
      'Pasangan organ berbentuk kerucut spons di rongga toraks. Tempat pertemuan langsung antara udara pernapasan dan eritrosit dalam kapiler alveolus untuk pertukaran gas hematik (oksigenasi Hb dan pembuangan CO₂).',
    clinicalRelevance:
      'Edema paru terjadi ketika tekanan kapiler paru meningkat, menyebabkan cairan transudat merembes ke alveoli dan menghambat difusi oksigen.',
  },
  {
    id: 'vessels',
    title: 'Sistem Pembuluh Darah',
    latin: 'Systema Vasorum',
    subtitle: 'Jaringan Konduksi & Mikrosirkulasi',
    anatomicalType: 'vessels',
    stats: [
      { label: 'Panjang Total', value: '~100.000 km' },
      { label: 'Resistensi Sistemik', value: 'Arteriol Perifer' },
      { label: 'Distribusi Volume', value: '65% di Sistem Vena' },
    ],
    keyStructures: [
      'Arteri Elastis (Aorta) & Muskular',
      'Arteriol (Regulator Tekanan)',
      'Anyaman Kapiler Pertukaran Nutrisi',
      'Vena & Katup Antirefluks',
    ],
    description:
      'Jalur sirkuit tertutup tubuh manusia yang terbagi menjadi arteri berotot tebal, arteriol pengatur resistensi perifer, kapiler berpori halus tempat transfer molekular, dan vena berkapasitansi tinggi dengan katup satu arah.',
    clinicalRelevance:
      'Aterosklerosis (penumpukan plak kolesterol dan kalsifikasi pada tunika intima arteri) membatasi perfusi organ vital.',
  },
  {
    id: 'perfusion',
    title: 'Organ Perfusi Utama',
    latin: 'Organa Perfusionis (Encephalon & Ren)',
    subtitle: 'Otak & Ginjal Penerima Curah Darah Kritis',
    anatomicalType: 'perfusion',
    stats: [
      { label: 'Aliran Darah Otak', value: '15% Curah Jantung' },
      { label: 'Filtrasi Ginjal', value: '~180 Liter / hari' },
      { label: 'Toleransi Anoksia', value: '< 4 – 5 Menit' },
    ],
    keyStructures: [
      'Circulus Arteriosus Willisi (Otak)',
      'Blood-Brain Barrier (Sawar Darah Otak)',
      'Glomerulus & Nefron Renal',
      'Sistem Renin-Angiotensin-Aldosteron',
    ],
    description:
      'Otak membutuhkan suplai glukosa dan oksigen tanpa henti untuk mempertahankan aktivitas neuron, sementara ginjal memfiltrasi seluruh volume plasma berulang kali setiap hari untuk membuang zat toksik dan mengatur tekanan darah sistemik.',
    clinicalRelevance:
      'Hipotensi berat yang berkepanjangan memicu iskemia serebral dan gagal ginjal akut akibat penurunan laju filtrasi glomerulus.',
  },
]

export default function OrganCards() {
  const [selectedOrgan, setSelectedOrgan] = useState<OrganDetailItem | null>(null)
  const [heartModalView, setHeartModalView] = useState<'surface' | 'internal'>('surface')

  return (
    <div className="w-full">
      {/* Editorial Large Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {medicalOrgans.map((organ) => (
          <div
            key={organ.id}
            onClick={() => setSelectedOrgan(organ)}
            className="group relative cursor-pointer rounded-3xl border border-slate-200/90 bg-white/90 p-7 shadow-sm transition-all duration-300 hover:border-rose-300 hover:shadow-xl hover:shadow-rose-900/5 dark:border-slate-800 dark:bg-slate-900/90 dark:hover:border-rose-900/60"
          >
            {/* Top Bar: Latin & Badge */}
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4 mb-5">
              <div>
                <span className="text-[11px] font-serif italic text-slate-500 dark:text-slate-400">
                  {organ.latin}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  {organ.title}
                </h3>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {organ.subtitle.split(' ')[0]}
              </span>
            </div>

            {/* Visual Centerpiece (Large anatomical illustration) */}
            <div className="relative my-4 flex h-52 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 via-white to-rose-50/20 p-4 border border-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:border-slate-800/60 overflow-hidden">
              {organ.anatomicalType === 'heart' && (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src="/assets/heart_anatomical.jpg"
                    alt="Anatomi Jantung Manusia"
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_20px_rgba(190,18,60,0.15)] group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute right-3 bottom-2 text-[10px] font-mono text-slate-400 bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-sm">
                    Netter Atlas Standard
                  </div>
                </div>
              )}

              {organ.anatomicalType === 'lungs' && (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src="/assets/lungs_anatomical.png"
                    alt="Anatomi Paru-Paru Manusia"
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_20px_rgba(2,132,199,0.15)] group-hover:scale-105 transition-transform duration-500 rounded-xl"
                  />
                  <div className="absolute right-3 bottom-2 text-[10px] font-mono text-slate-400 bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-sm">
                    Arbor Bronchialis & Pulmo
                  </div>
                </div>
              )}

              {organ.anatomicalType === 'vessels' && (
                <div className="relative w-full h-full flex items-center justify-center">
                  <VascularNetworkSVG />
                  <div className="absolute right-3 bottom-2 text-[10px] font-mono text-slate-400 bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-sm">
                    Arteri • Vena • Kapiler
                  </div>
                </div>
              )}

              {organ.anatomicalType === 'perfusion' && (
                <div className="relative w-full h-full flex items-center justify-center">
                  <PerfusionOrgansSVG />
                  <div className="absolute right-3 bottom-2 text-[10px] font-mono text-slate-400 bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-sm">
                    Perfusi Kritis Encephalon
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
              {organ.description}
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-5 grid grid-cols-3 gap-2 border-t border-slate-100 dark:border-slate-800/80 pt-4">
              {organ.stats.map((st, i) => (
                <div key={i} className="text-left">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    {st.label}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                    {st.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="mt-5 flex items-center justify-between text-xs font-semibold text-rose-700 dark:text-rose-400">
              <span className="flex items-center gap-1.5">
                <Activity size={14} />
                Buka Telaah Anatomi Lengkap
              </span>
              <ArrowRight
                size={16}
                className="transform group-hover:translate-x-1.5 transition-transform"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Full Anatomical Modal Dialog */}
      <AnimatePresence>
        {selectedOrgan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-6 sm:p-9 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedOrgan(null)}
                className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
                <span className="text-xs italic text-rose-600 dark:text-rose-400 font-serif">
                  {selectedOrgan.latin}
                </span>
                <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {selectedOrgan.title}
                </h3>
                <p className="text-sm text-slate-500">{selectedOrgan.subtitle}</p>
              </div>

              {/* Modal Body */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
                <div className="flex items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 min-h-[220px]">
                  {selectedOrgan.anatomicalType === 'heart' && (
                    <div className="flex flex-col items-center gap-2.5 w-full">
                      <div className="inline-flex rounded-full bg-slate-200/80 dark:bg-slate-800 p-1 text-xs font-semibold">
                        <button
                          type="button"
                          onClick={() => setHeartModalView('surface')}
                          className={`px-3 py-1 rounded-full transition-all ${
                            heartModalView === 'surface'
                              ? 'bg-white dark:bg-slate-700 shadow-sm text-rose-600 dark:text-rose-300 font-bold'
                              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                          }`}
                        >
                          Anterior (Luar)
                        </button>
                        <button
                          type="button"
                          onClick={() => setHeartModalView('internal')}
                          className={`px-3 py-1 rounded-full transition-all ${
                            heartModalView === 'internal'
                              ? 'bg-white dark:bg-slate-700 shadow-sm text-rose-600 dark:text-rose-300 font-bold'
                              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                          }`}
                        >
                          Potongan Ruang
                        </button>
                      </div>
                      <img
                        src={heartModalView === 'surface' ? '/assets/heart_anatomical.jpg' : '/assets/heart_internal.png'}
                        alt="Anatomi Jantung"
                        className="max-h-52 object-contain filter drop-shadow-md rounded-xl transition-all"
                      />
                    </div>
                  )}
                  {selectedOrgan.anatomicalType === 'lungs' && (
                    <div className="flex flex-col items-center justify-center w-full">
                      <img
                        src="/assets/lungs_anatomical.png"
                        alt="Anatomi Paru-Paru Manusia"
                        className="max-h-56 object-contain filter drop-shadow-md rounded-xl"
                      />
                      <span className="text-[10px] font-mono text-slate-400 mt-2">
                        Trakea • Percabangan Bronkus • Lobus Pulmonalis
                      </span>
                    </div>
                  )}
                  {selectedOrgan.anatomicalType === 'vessels' && <VascularNetworkSVG />}
                  {selectedOrgan.anatomicalType === 'perfusion' && <PerfusionOrgansSVG />}
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Struktur Anatomi Kunci:
                  </h4>
                  <ul className="space-y-2">
                    {selectedOrgan.keyStructures.map((struct, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-200">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-600" />
                        {struct}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Parameter Fisiologis:
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedOrgan.stats.map((st, i) => (
                        <div key={i} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-center">
                          <p className="text-[10px] text-slate-400">{st.label}</p>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-0.5">{st.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-5">
                <p>{selectedOrgan.description}</p>

                <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/50 text-rose-900 dark:text-rose-200 text-xs">
                  <p className="font-bold flex items-center gap-1.5 mb-1">
                    <Activity size={14} className="text-rose-600" />
                    Signifikansi Klinis & Patologi:
                  </p>
                  <p>{selectedOrgan.clinicalRelevance}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

function LungsVignetteSVG() {
  return (
    <svg viewBox="0 0 240 180" className="w-48 h-36">
      <defs>
        <radialGradient id="vignette-lung" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FDA4AF" />
          <stop offset="50%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#9F1239" />
        </radialGradient>
      </defs>
      {/* Trachea */}
      <path d="M 115 15 L 115 55 Q 120 60 125 55 L 125 15 Z" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />
      <path d="M 115 25 Q 120 22 125 25" stroke="#94A3B8" strokeWidth="1.5" fill="none" />
      <path d="M 115 35 Q 120 32 125 35" stroke="#94A3B8" strokeWidth="1.5" fill="none" />
      <path d="M 115 45 Q 120 42 125 45" stroke="#94A3B8" strokeWidth="1.5" fill="none" />

      {/* Right Lung (3 lobes) */}
      <path
        d="M 105 60 C 85 60 55 75 45 100 C 35 125 35 155 45 170 C 55 180 85 180 110 165 C 115 145 115 100 105 60 Z"
        fill="url(#vignette-lung)"
        stroke="#881337"
        strokeWidth="1.5"
      />
      {/* Left Lung (2 lobes + notch) */}
      <path
        d="M 135 60 C 155 60 185 75 195 100 C 205 125 205 155 195 170 C 185 180 155 180 130 165 C 128 145 138 125 138 115 C 138 100 130 85 135 60 Z"
        fill="url(#vignette-lung)"
        stroke="#881337"
        strokeWidth="1.5"
      />
      {/* Pulmonary Vascular Branching */}
      <path d="M 115 65 Q 90 75 65 110" stroke="#0284C7" strokeWidth="1.8" fill="none" />
      <path d="M 125 65 Q 150 75 175 110" stroke="#0284C7" strokeWidth="1.8" fill="none" />
      <path d="M 70 120 Q 95 105 115 95" stroke="#E11D48" strokeWidth="1.8" fill="none" />
      <path d="M 170 120 Q 145 105 125 95" stroke="#E11D48" strokeWidth="1.8" fill="none" />
    </svg>
  )
}

function VascularNetworkSVG() {
  return (
    <svg viewBox="0 0 240 180" className="w-48 h-36">
      {/* Artery & Vein Pairing with Capillary Mesh */}
      <path d="M 40 40 Q 90 35 120 70 Q 150 105 200 100" stroke="#BE123C" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M 40 140 Q 90 145 120 110 Q 150 75 200 80" stroke="#0284C7" strokeWidth="7" fill="none" strokeLinecap="round" />
      {/* Capillary anastomoses */}
      <g stroke="#9333EA" strokeWidth="1.5" opacity="0.75" fill="none">
        <path d="M 105 50 Q 115 90 110 130" />
        <path d="M 120 70 Q 130 90 125 110" />
        <path d="M 135 90 Q 140 85 145 95" />
      </g>
      <circle cx="120" cy="70" r="4" fill="#BE123C" />
      <circle cx="120" cy="110" r="4" fill="#0284C7" />
    </svg>
  )
}

function PerfusionOrgansSVG() {
  return (
    <svg viewBox="0 0 240 180" className="w-48 h-36">
      {/* Brain Hemispheres with Circle of Willis */}
      <path
        d="M 120 30 
           C 90 30 70 50 70 75 
           C 70 95 90 110 115 110 
           L 125 110 
           C 150 110 170 95 170 75 
           C 170 50 150 30 120 30 Z"
        fill="#FFE4E6"
        stroke="#E11D48"
        strokeWidth="1.5"
      />
      {/* Sulci (Brain Folds) */}
      <path d="M 85 55 Q 105 65 115 50" stroke="#FB7185" strokeWidth="1.2" fill="none" />
      <path d="M 155 55 Q 135 65 125 50" stroke="#FB7185" strokeWidth="1.2" fill="none" />
      <path d="M 80 80 Q 100 85 110 75" stroke="#FB7185" strokeWidth="1.2" fill="none" />
      <path d="M 160 80 Q 140 85 130 75" stroke="#FB7185" strokeWidth="1.2" fill="none" />
      {/* Carotid Arterial Supply */}
      <path d="M 105 160 L 105 110" stroke="#BE123C" strokeWidth="3" />
      <path d="M 135 160 L 135 110" stroke="#BE123C" strokeWidth="3" />
      {/* Basilar & Circle of Willis ring */}
      <ellipse cx="120" cy="100" rx="14" ry="8" fill="none" stroke="#E11D48" strokeWidth="2" />
    </svg>
  )
}
