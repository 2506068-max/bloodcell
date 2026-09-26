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
    imageSrc: '/assets/vessels_system.png',
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
                  <img
                    src="/assets/vessels_microcirculation.jpg"
                    alt="Sistem Pembuluh Darah & Mikrosirkulasi Hemodinamik"
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_20px_rgba(2,132,199,0.15)] group-hover:scale-105 transition-transform duration-500 rounded-xl"
                  />
                  <div className="absolute right-3 bottom-2 text-[10px] font-mono text-slate-400 bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 rounded backdrop-blur-sm">
                    Arteri • Kapiler • Vena
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
                  {selectedOrgan.anatomicalType === 'vessels' && (
                    <div className="flex flex-col items-center justify-center w-full">
                      <img
                        src="/assets/vessels_microcirculation.jpg"
                        alt="Mikrosirkulasi Pembuluh Darah (Arteri, Kapiler, Vena)"
                        className="max-h-64 object-contain filter drop-shadow-md rounded-xl"
                      />
                      <span className="text-[10px] font-mono text-slate-400 mt-2">
                        Arteri • Arteriol • Jaringan Anyaman Kapiler • Venula • Vena
                      </span>
                    </div>
                  )}
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
    <div className="relative w-full h-full flex items-center justify-center">
      <img
        src="/assets/vessels_microcirculation.jpg"
        alt="Mikrosirkulasi Pembuluh Darah: Arteri, Arteriol, Anyaman Kapiler, Venula, Vena"
        className="max-h-full max-w-full object-contain filter drop-shadow-md rounded-xl"
      />
    </div>
  )
}

function PerfusionOrgansSVG() {
  return (
    <svg viewBox="0 0 280 200" className="w-56 h-40 select-none">
      <defs>
        <radialGradient id="brain-parenchyma" cx="45%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFE4E6" />
          <stop offset="45%" stopColor="#FDA4AF" />
          <stop offset="85%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#9F1239" />
        </radialGradient>
        <radialGradient id="kidney-parenchyma" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#FDA4AF" />
          <stop offset="40%" stopColor="#BE123C" />
          <stop offset="85%" stopColor="#881337" />
          <stop offset="100%" stopColor="#4C0519" />
        </radialGradient>
        <filter id="organ-shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#9F1239" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* LEFT: Encephalon (Human Brain) */}
      <g transform="translate(10, 8)" filter="url(#organ-shadow)">
        {/* Brainstem (Pons & Medulla) */}
        <path
          d="M 68 120 C 66 135 68 155 72 165 L 82 165 C 84 155 84 135 80 120 Z"
          fill="#E2E8F0"
          stroke="#94A3B8"
          strokeWidth="1.2"
        />

        {/* Cerebellum (with folia) */}
        <path
          d="M 40 100 C 35 115 45 138 68 135 C 72 125 70 110 65 102 Z"
          fill="#FECDD3"
          stroke="#BE123C"
          strokeWidth="1.2"
        />
        <path d="M 42 110 Q 55 116 68 114" stroke="#BE123C" strokeWidth="0.8" fill="none" opacity="0.6" />
        <path d="M 46 122 Q 58 126 66 124" stroke="#BE123C" strokeWidth="0.8" fill="none" opacity="0.6" />

        {/* Cerebrum - Convoluted gyri & sulci */}
        <path
          d="M 62 25 
             C 45 26 28 42 22 62 
             C 16 82 22 102 38 112 
             C 52 118 72 115 85 106 
             C 98 114 114 105 118 88 
             C 122 70 118 52 108 38 
             C 96 24 78 24 62 25 Z"
          fill="url(#brain-parenchyma)"
          stroke="#881337"
          strokeWidth="1.5"
        />

        {/* Anatomical Sulcal Folds */}
        {/* Sulcus Lateralis Sylvii */}
        <path d="M 32 82 Q 58 84 88 72" stroke="#881337" strokeWidth="1.4" fill="none" />
        {/* Sulcus Centralis */}
        <path d="M 65 26 Q 60 52 74 74" stroke="#881337" strokeWidth="1.3" fill="none" />
        {/* Frontal & Parietal Sulci */}
        <path d="M 42 42 Q 52 56 46 70" stroke="#9F1239" strokeWidth="1.1" fill="none" />
        <path d="M 85 34 Q 92 50 86 64" stroke="#9F1239" strokeWidth="1.1" fill="none" />
        <path d="M 98 52 Q 108 65 102 82" stroke="#9F1239" strokeWidth="1.1" fill="none" />
        <path d="M 36 62 Q 26 72 32 82" stroke="#9F1239" strokeWidth="1.1" fill="none" />
        <path d="M 64 88 Q 78 96 74 108" stroke="#9F1239" strokeWidth="1.1" fill="none" />

        {/* Arterial Supply (Circulus Willisi & Carotids) */}
        <path d="M 72 165 L 72 125" stroke="#E11D48" strokeWidth="2.5" />
        <path d="M 78 165 L 78 125" stroke="#E11D48" strokeWidth="2.5" />
        <ellipse cx="75" cy="116" rx="9" ry="5.5" fill="none" stroke="#E11D48" strokeWidth="1.8" />
        {/* Cerebral artery branches */}
        <path d="M 66 116 Q 52 105 45 88" stroke="#E11D48" strokeWidth="1.5" fill="none" />
        <path d="M 84 116 Q 98 105 105 88" stroke="#E11D48" strokeWidth="1.5" fill="none" />

        <text x="70" y="180" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#881337" className="dark:fill-rose-300">
          Encephalon (Otak)
        </text>
      </g>

      {/* RIGHT: Ren (Human Kidney - Longitudinal Cutaway) */}
      <g transform="translate(150, 8)" filter="url(#organ-shadow)">
        {/* Kidney Capsule & Parenchyma */}
        <path
          d="M 55 25 
             C 80 25 105 45 108 85 
             C 112 125 90 155 65 160 
             C 45 162 25 148 24 125 
             C 24 108 34 100 34 88 
             C 34 76 22 66 25 48 
             C 28 32 40 25 55 25 Z"
          fill="url(#kidney-parenchyma)"
          stroke="#4C0519"
          strokeWidth="1.6"
        />

        {/* Medullary Pyramids (Pyramides Renales) */}
        {[
          { x: 74, y: 50, rot: -20 },
          { x: 84, y: 75, rot: 0 },
          { x: 84, y: 105, rot: 15 },
          { x: 68, y: 132, rot: 35 },
          { x: 44, y: 138, rot: 60 },
        ].map((p, idx) => (
          <path
            key={idx}
            d={`M ${p.x} ${p.y} l -14 -6 l -4 14 z`}
            fill="#4C0519"
            opacity="0.75"
            transform={`rotate(${p.rot}, ${p.x}, ${p.y})`}
          />
        ))}

        {/* Renal Pelvis & Calyces */}
        <path
          d="M 28 88 Q 48 90 56 94 Q 52 108 26 114"
          fill="#CBD5E1"
          stroke="#94A3B8"
          strokeWidth="1.2"
        />
        {/* Ureter descending */}
        <path d="M 26 108 C 22 130 18 152 16 170" stroke="#F59E0B" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Renal Artery (Red) */}
        <path d="M 5 86 L 36 90" stroke="#E11D48" strokeWidth="4" strokeLinecap="round" />
        <path d="M 36 90 Q 52 82 66 70 M 36 90 Q 56 98 68 112" stroke="#E11D48" strokeWidth="2" fill="none" />

        {/* Renal Vein (Blue) */}
        <path d="M 5 98 L 34 98" stroke="#0284C7" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M 34 98 Q 50 102 62 118 M 34 98 Q 50 88 64 78" stroke="#0284C7" strokeWidth="2" fill="none" />

        <text x="65" y="180" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#881337" className="dark:fill-rose-300">
          Ren (Ginjal)
        </text>
      </g>
    </svg>
  )
}
