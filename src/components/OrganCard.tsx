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
    imageSrc: '/assets/lungs_anatomical.svg',
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
    imageSrc: '/assets/blood_vessels_diagram.svg',
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
                    src="/assets/lungs_anatomical.svg"
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
                    src="/assets/blood_vessels_diagram.svg"
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
                        src={heartModalView === 'surface' ? '/assets/heart_anatomical.jpg' : '/assets/heart_internal_clean.svg'}
                        alt="Anatomi Jantung Manusia"
                        className="max-h-52 object-contain filter drop-shadow-md rounded-xl transition-all"
                      />
                    </div>
                  )}
                  {selectedOrgan.anatomicalType === 'lungs' && (
                    <div className="flex flex-col items-center justify-center w-full">
                      <img
                        src="/assets/lungs_anatomical.svg"
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
                        src="/assets/blood_vessels_diagram.svg"
                        alt="Mikrosirkulasi Pembuluh Darah (Arteri, Kapiler, Vena)"
                        className="max-h-64 object-contain filter drop-shadow-md rounded-xl"
                      />
                      <span className="text-[10px] font-mono text-slate-400 mt-2">
                        Arteri • Arteriol • Jaringan Anyaman Kapiler • Venula • Vena
                      </span>
                    </div>
                  )}
                  {selectedOrgan.anatomicalType === 'perfusion' && (
                    <div className="flex flex-col items-center justify-center w-full">
                      <div className="grid grid-cols-2 gap-4 w-full max-w-lg items-center">
                        <div className="flex flex-col items-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                          <img
                            src="/assets/brain_anatomy_optimized.jpg"
                            alt="Anatomi Otak Manusia (Encephalon)"
                            className="max-h-36 object-contain rounded-xl filter drop-shadow-sm"
                          />
                          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mt-2">
                            Encephalon (Otak)
                          </span>
                          <span className="text-[9px] text-slate-400">Girus, Sulkus & Batang Otak</span>
                        </div>
                        <div className="flex flex-col items-center p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                          <img
                            src="/assets/kidney_structures.svg"
                            alt="Anatomi Potongan Ginjal (Ren)"
                            className="max-h-36 object-contain filter drop-shadow-sm"
                          />
                          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mt-2">
                            Ren (Ginjal)
                          </span>
                          <span className="text-[9px] text-slate-400">Korteks & Piramida Medula</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 mt-3">
                        Perfusi Darah Kritis Otak (~15%) & Filtrasi Ginjal (~20%)
                      </span>
                    </div>
                  )}
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
        {/* Real 3D Vascular Gradients */}
        <linearGradient id="brain-tube-artery" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7F1D1D" />
          <stop offset="25%" stopColor="#DC2626" />
          <stop offset="55%" stopColor="#F87171" />
          <stop offset="80%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
        <linearGradient id="brain-tube-vein" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0C4A6E" />
          <stop offset="25%" stopColor="#0284C7" />
          <stop offset="55%" stopColor="#38BDF8" />
          <stop offset="80%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>

        {/* Real Human Brain Hemispheric Parenchyma - Warm Grayish-Pinkish-Tan Living Cortex */}
        <radialGradient id="brain-hemi-left" cx="42%" cy="36%" r="68%">
          <stop offset="0%" stopColor="#FFF5F5" />
          <stop offset="20%" stopColor="#FCE4DE" />
          <stop offset="50%" stopColor="#EBB8AC" />
          <stop offset="78%" stopColor="#C98475" />
          <stop offset="92%" stopColor="#9E5345" />
          <stop offset="100%" stopColor="#68291F" />
        </radialGradient>
        <radialGradient id="brain-hemi-right" cx="58%" cy="36%" r="68%">
          <stop offset="0%" stopColor="#FFF5F5" />
          <stop offset="20%" stopColor="#FCE4DE" />
          <stop offset="50%" stopColor="#EBB8AC" />
          <stop offset="78%" stopColor="#C98475" />
          <stop offset="92%" stopColor="#9E5345" />
          <stop offset="100%" stopColor="#68291F" />
        </radialGradient>

        {/* Brainstem & Spinal Cord Pearly Column Gradient */}
        <linearGradient id="brainstem-cylindrical" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="20%" stopColor="#E2E8F0" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="80%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>

        {/* Cerebellar Foliar Shading */}
        <radialGradient id="cerebellum-grad" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FCE4DE" />
          <stop offset="40%" stopColor="#D98A7B" />
          <stop offset="80%" stopColor="#A85244" />
          <stop offset="100%" stopColor="#68291F" />
        </radialGradient>

        {/* Realistic Human Kidney Parenchyma (Capsula Fibrosa & Cortex) */}
        <radialGradient id="kidney-volumetric" cx="60%" cy="42%" r="68%">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="25%" stopColor="#DC2626" />
          <stop offset="55%" stopColor="#991B1B" />
          <stop offset="80%" stopColor="#7F1D1D" />
          <stop offset="95%" stopColor="#450A0A" />
          <stop offset="100%" stopColor="#2A0505" />
        </radialGradient>

        {/* Kidney Convex Sheen Highlight (Fibrous Capsule Specular Sheen) */}
        <linearGradient id="kidney-capsule-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="40%" stopColor="#FCA5A5" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#7F1D1D" stopOpacity="0" />
        </linearGradient>

        {/* Kidney Hilum Vessels Gradients */}
        <linearGradient id="kidney-tube-artery" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="40%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </linearGradient>
        <linearGradient id="kidney-tube-vein" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="40%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0C4A6E" />
        </linearGradient>

        {/* Ureter Muscular Duct 3D Gradient */}
        <linearGradient id="ureter-tube-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A16207" />
          <stop offset="25%" stopColor="#EAB308" />
          <stop offset="55%" stopColor="#FEF08A" />
          <stop offset="80%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#854D0E" />
        </linearGradient>

        <filter id="organ-shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#450A0A" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* ========================================================================= */}
      {/* LEFT: ENCEPHALON (HUMAN BRAIN - ANATOMICAL REALISTIC TEXTURE & HUES)      */}
      {/* ========================================================================= */}
      <g transform="translate(10, 8)" filter="url(#organ-shadow)">
        {/* 1. Truncus Encephali (Brainstem: Pons, Medulla Oblongata) & Medulla Spinalis (Spinal Cord) */}
        <g id="brainstem-complex">
          {/* Spinal Cord (Cylindrical smooth column with natural tapering) */}
          <path
            d="M 64.5 125 C 65 138 65 152 65.5 165 C 65.5 167 74.5 167 74.5 165 C 75 152 75 138 75.5 125 Z"
            fill="url(#brainstem-cylindrical)"
            stroke="#94A3B8"
            strokeWidth="0.8"
          />
          {/* Subtle anterior median fissure of spinal cord */}
          <line x1="70" y1="126" x2="70" y2="164" stroke="#94A3B8" strokeWidth="0.6" strokeDasharray="1.5 1" opacity="0.6" />

          {/* Brainstem (Pons bulb & Medulla oblongata) */}
          <path
            d="M 59 104 
               C 58 111 61 116 64 122 
               C 64.5 124 75.5 124 76 122 
               C 79 116 82 111 81 104 
               C 74 102 66 102 59 104 Z"
            fill="url(#brainstem-cylindrical)"
            stroke="#64748B"
            strokeWidth="0.8"
          />
          {/* Horizontal pontine transverse fibers (Sulcus basilaris) */}
          <path d="M 62 109 Q 70 107 78 109" stroke="#94A3B8" strokeWidth="0.7" fill="none" opacity="0.7" />
          <path d="M 63 114 Q 70 112 77 114" stroke="#94A3B8" strokeWidth="0.7" fill="none" opacity="0.7" />
          <path d="M 65 119 Q 70 117 75 119" stroke="#94A3B8" strokeWidth="0.7" fill="none" opacity="0.7" />
        </g>

        {/* 2. Cerebellum Bilateral (Otak Kecil dengan Folia Cerebelli Horizontal) */}
        <g id="cerebellum-complex">
          {/* Left Cerebellar Hemisphere */}
          <path
            d="M 36 94 
               C 27 101 29 115 44 118 
               C 54 119 60 112 62 102 
               C 51 97 42 94 36 94 Z"
            fill="url(#cerebellum-grad)"
            stroke="#68291F"
            strokeWidth="0.9"
          />
          {/* Left Folia Cerebelli (Fine horizontal laminar grooves) */}
          <path d="M 31 104 Q 45 107 59 105" stroke="#4A1D15" strokeWidth="0.8" fill="none" opacity="0.7" />
          <path d="M 34 109 Q 47 112 57 110" stroke="#4A1D15" strokeWidth="0.8" fill="none" opacity="0.7" />
          <path d="M 38 114 Q 48 116 54 114" stroke="#4A1D15" strokeWidth="0.7" fill="none" opacity="0.6" />

          {/* Right Cerebellar Hemisphere */}
          <path
            d="M 104 94 
               C 113 101 111 115 96 118 
               C 86 119 80 112 78 102 
               C 89 97 98 94 104 94 Z"
            fill="url(#cerebellum-grad)"
            stroke="#68291F"
            strokeWidth="0.9"
          />
          {/* Right Folia Cerebelli */}
          <path d="M 109 104 Q 95 107 81 105" stroke="#4A1D15" strokeWidth="0.8" fill="none" opacity="0.7" />
          <path d="M 106 109 Q 93 112 83 110" stroke="#4A1D15" strokeWidth="0.8" fill="none" opacity="0.7" />
          <path d="M 102 114 Q 92 116 86 114" stroke="#4A1D15" strokeWidth="0.7" fill="none" opacity="0.6" />
        </g>

        {/* 3. Cerebrum - Bilateral Hemispheres with Natural Cortical Contours & Longitudinal Fissure */}
        <g id="cerebrum-complex">
          {/* Left Cerebral Hemisphere Base */}
          <path
            d="M 69.5 20 
               C 52 20 34 26 23 40 
               C 16 52 17 68 20 80 
               C 22 88 28 97 40 101 
               C 52 103 62 98 67 92 
               C 69 88 69.5 82 69.5 75 Z"
            fill="url(#brain-hemi-left)"
            stroke="#5A231A"
            strokeWidth="1.2"
          />

          {/* Right Cerebral Hemisphere Base */}
          <path
            d="M 70.5 20 
               C 88 20 106 26 117 40 
               C 124 52 123 68 120 80 
               C 118 88 112 97 100 101 
               C 88 103 78 98 73 92 
               C 71 88 70.5 82 70.5 75 Z"
            fill="url(#brain-hemi-right)"
            stroke="#5A231A"
            strokeWidth="1.2"
          />

          {/* 4. DENSE GYRI & SULCI CONVOLUTIONS (Pola Berkelok Padat Menyerupai Sidik Jari Asli) */}
          <g id="gyri-sulci-dense" strokeLinecap="round" strokeLinejoin="round">
            {/* Left Hemisphere Sulcal Grooves (Deep Crevices + 3D Specular Relief) */}
            <path d="M 32 32 C 40 28 50 33 63 30" stroke="#5A231A" strokeWidth="1.4" fill="none" />
            <path d="M 32 31.3 C 40 27.3 50 32.3 63 29.3" stroke="#FFFFFF" strokeWidth="0.6" fill="none" opacity="0.5" />

            <path d="M 26 44 C 36 39 46 46 64 41" stroke="#5A231A" strokeWidth="1.3" fill="none" />
            <path d="M 26 43.3 C 36 38.3 46 45.3 64 40.3" stroke="#FFFFFF" strokeWidth="0.6" fill="none" opacity="0.45" />

            <path d="M 46 25 C 42 38 48 50 44 64" stroke="#68291F" strokeWidth="1.4" fill="none" />
            <path d="M 46.8 25 C 42.8 38 48.8 50 44.8 64" stroke="#FFFFFF" strokeWidth="0.6" fill="none" opacity="0.4" />

            <path d="M 58 29 C 55 42 59 55 56 68" stroke="#68291F" strokeWidth="1.3" fill="none" />
            <path d="M 58.7 29 C 55.7 42 59.7 55 56.7 68" stroke="#FFFFFF" strokeWidth="0.6" fill="none" opacity="0.4" />

            <path d="M 21 56 C 29 52 38 58 50 53 C 56 50 62 55 67 52" stroke="#5A231A" strokeWidth="1.4" fill="none" />
            <path d="M 21 55.3 C 29 51.3 38 57.3 50 52.3 C 56 49.3 62 54.3 67 51.3" stroke="#FFFFFF" strokeWidth="0.6" fill="none" opacity="0.5" />

            <path d="M 33 49 C 37 60 31 71 36 82" stroke="#68291F" strokeWidth="1.3" fill="none" />
            <path d="M 33.7 49 C 37.7 60 31.7 71 36.7 82" stroke="#FFFFFF" strokeWidth="0.6" fill="none" opacity="0.4" />

            <path d="M 19 68 C 29 64 41 72 58 66" stroke="#5A231A" strokeWidth="1.3" fill="none" />
            <path d="M 19 67.3 C 29 63.3 41 71.3 58 65.3" stroke="#FFFFFF" strokeWidth="0.6" fill="none" opacity="0.45" />

            <path d="M 48 64 C 52 75 46 84 50 94" stroke="#68291F" strokeWidth="1.3" fill="none" />
            <path d="M 48.7 64 C 52.7 75 46.7 84 50.7 94" stroke="#FFFFFF" strokeWidth="0.6" fill="none" opacity="0.4" />

            <path d="M 22 79 C 32 75 44 83 62 77" stroke="#5A231A" strokeWidth="1.3" fill="none" />
            <path d="M 22 78.3 C 32 74.3 44 82.3 62 76.3" stroke="#FFFFFF" strokeWidth="0.6" fill="none" opacity="0.45" />

            <path d="M 27 89 C 37 85 49 92 63 87" stroke="#5A231A" strokeWidth="1.3" fill="none" />
            <path d="M 27 88.3 C 37 84.3 49 91.3 63 86.3" stroke="#FFFFFF" strokeWidth="0.6" fill="none" opacity="0.4" />

            {/* Right Hemisphere Sulcal Grooves */}
            <path d="M 108 32 C 100 28 90 33 77 30" stroke="#5A231A" strokeWidth="1.4" fill="none" />
            <path d="M 108 31.3 C 100 27.3 90 32.3 77 29.3" stroke="#FFFFFF" strokeWidth="0.6" fill="none" opacity="0.5" />

            <path d="M 114 44 C 104 39 94 46 76 41" stroke="#5A231A" strokeWidth="1.3" fill="none" />
            <path d="M 114 43.3 C 104 38.3 94 45.3 76 40.3" stroke="#FFFFFF" strokeWidth="0.6" fill="none" opacity="0.45" />

            <path d="M 94 25 C 98 38 92 50 96 64" stroke="#68291F" strokeWidth="1.4" fill="none" />
            <path d="M 94.8 25 C 98.8 38 92.8 50 96.8 64" stroke="#FFFFFF" strokeWidth="0.6" fill="none" opacity="0.4" />

            <path d="M 82 29 C 85 42 81 55 84 68" stroke="#68291F" strokeWidth="1.3" fill="none" />
            <path d="M 82.7 29 C 85.7 42 81.7 55 84.7 68" stroke="#FFFFFF" strokeWidth="0.6" fill="none" opacity="0.4" />

            <path d="M 119 56 C 111 52 102 58 90 53 C 84 50 78 55 73 52" stroke="#5A231A" strokeWidth="1.4" fill="none" />
            <path d="M 119 55.3 C 111 51.3 102 57.3 90 52.3 C 84 49.3 78 54.3 73 51.3" stroke="#FFFFFF" strokeWidth="0.6" fill="none" opacity="0.5" />

            <path d="M 107 49 C 103 60 109 71 104 82" stroke="#68291F" strokeWidth="1.3" fill="none" />
            <path d="M 107.7 49 C 103.7 60 109.7 71 104.7 82" stroke="#FFFFFF" strokeWidth="0.6" fill="none" opacity="0.4" />

            <path d="M 121 68 C 111 64 99 72 82 66" stroke="#5A231A" strokeWidth="1.3" fill="none" />
            <path d="M 121 67.3 C 111 63.3 99 71.3 82 65.3" stroke="#FFFFFF" strokeWidth="0.6" fill="none" opacity="0.45" />

            <path d="M 92 64 C 88 75 94 84 90 94" stroke="#68291F" strokeWidth="1.3" fill="none" />
            <path d="M 92.7 64 C 88.7 75 94.7 84 90.7 94" stroke="#FFFFFF" strokeWidth="0.6" fill="none" opacity="0.4" />

            <path d="M 118 79 C 108 75 96 83 78 77" stroke="#5A231A" strokeWidth="1.3" fill="none" />
            <path d="M 118 78.3 C 108 74.3 96 82.3 78 76.3" stroke="#FFFFFF" strokeWidth="0.6" fill="none" opacity="0.45" />

            <path d="M 113 89 C 103 85 91 92 77 87" stroke="#5A231A" strokeWidth="1.3" fill="none" />
            <path d="M 113 88.3 C 103 84.3 91 91.3 77 86.3" stroke="#FFFFFF" strokeWidth="0.6" fill="none" opacity="0.4" />
          </g>

          {/* 5. Deep Central Fissura Longitudinalis Cerebri */}
          <path
            d="M 70 20 
               C 68.8 32 71.2 46 69.4 60 
               C 68.2 72 71 82 70 94"
            stroke="#3B120B"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Subtle light edge along fissure */}
          <path
            d="M 71.2 22 
               C 70 33 72.4 47 70.6 61 
               C 69.4 73 72.2 82 71.2 92"
            stroke="#FFFFFF"
            strokeWidth="0.7"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
          />
        </g>

        {/* 6. Arterial & Venous Vascular Supply (Arteria Carotis & Vena Jugularis 3D) */}
        <g id="brain-vessels">
          {/* Arteria Carotis Interna (Red, Oxygenated - Shaded Cylindrical Tube with Natural Curve) */}
          <path
            d="M 64 165 C 64 150 65 138 67 125"
            stroke="url(#brain-tube-artery)"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Vena Jugularis Interna (Blue, Deoxygenated - Shaded Cylindrical Tube with Accompanying Curve) */}
          <path
            d="M 76 165 C 76 150 75 138 73 125"
            stroke="url(#brain-tube-vein)"
            strokeWidth="3.4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Circulus Arteriosus Willisi (Anastomotic Arterial Circle at Base of Brain) */}
          <ellipse
            cx="70"
            cy="118"
            rx="8.5"
            ry="5.5"
            fill="none"
            stroke="#DC2626"
            strokeWidth="1.8"
            filter="drop-shadow(0 1px 2px rgba(127,29,29,0.3))"
          />

          {/* Cerebral Arterial Branches */}
          <path d="M 64 117 C 56 112 45 106 38 96" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M 76 117 C 84 112 95 106 102 96" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M 70 113 C 69 105 69.5 98 70 92" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round" fill="none" />

          {/* Cerebral Venous Tributaries */}
          <path d="M 74 122 C 80 120 88 116 93 108" stroke="#0284C7" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.85" />
          <path d="M 66 122 C 60 120 52 116 47 108" stroke="#0284C7" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.85" />
        </g>

        {/* Anatomical Label */}
        <text
          x="70"
          y="180"
          textAnchor="middle"
          fontSize="10.5"
          fontWeight="bold"
          fill="#881337"
          className="dark:fill-rose-300"
        >
          Encephalon (Otak)
        </text>
      </g>

      {/* ========================================================================= */}
      {/* RIGHT: REN (HUMAN KIDNEY - ANATOMICAL REALISTIC SHAPE, HILUM & VESSELS)   */}
      {/* ========================================================================= */}
      <g transform="translate(150, 8)" filter="url(#organ-shadow)">
        {/* 1. Pelvis Renalis & Ureter (Posterior/Inferior structure emerging from Hilum) */}
        <g id="kidney-ureter">
          {/* Funnel-shaped Renal Pelvis */}
          <path
            d="M 46 95 C 44 104 39 114 36 122 L 40 123 C 44 116 49 106 50 96 Z"
            fill="#EAB308"
            stroke="#A16207"
            strokeWidth="0.6"
          />
          {/* Ureter Muscular Flexible Tube descending with natural peristaltic waves */}
          <path
            d="M 37.5 122 C 34.5 135 37.5 148 33 162 C 30.5 168 29.5 174 28 178"
            stroke="url(#ureter-tube-grad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* 2. Kidney Parenchyma & Fibrous Capsule (True Anatomical Reniform Contour with Deep Medial Hilum) */}
        <g id="kidney-parenchyma-group">
          {/* Main Kidney Body (Authentic Bean Shape with Deep Concave Hilum) */}
          <path
            d="M 65 22 
               C 85 22 104 35 110 65 
               C 114 95 112 125 96 148 
               C 82 162 65 162 55 158 
               C 42 152 36 138 35 122 
               C 35 112 45 98 45 88 
               C 45 78 34 68 36 50 
               C 38 34 48 22 65 22 Z"
            fill="url(#kidney-volumetric)"
            stroke="#2A0505"
            strokeWidth="1.4"
          />

          {/* Glistening Fibrous Capsule (Capsula Fibrosa) Specular Highlight Curve */}
          <path
            d="M 65 25 
               C 83 25 101 37 106 65 
               C 110 93 108 122 93 144"
            stroke="url(#kidney-capsule-sheen)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 72 27 
               C 86 28 100 39 104 62"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />

          {/* Subtle Organic Anatomical Lobular Undulations (Replacing rigid triangles with natural surface contours) */}
          <path d="M 94 62 C 86 70 82 82 84 96" stroke="#450A0A" strokeWidth="1.2" fill="none" opacity="0.35" />
          <path d="M 94 61 C 86 69 82 81 84 95" stroke="#FCA5A5" strokeWidth="0.6" fill="none" opacity="0.25" />

          <path d="M 88 104 C 82 114 74 124 64 132" stroke="#450A0A" strokeWidth="1.2" fill="none" opacity="0.35" />
          <path d="M 88 103 C 82 113 74 123 64 131" stroke="#FCA5A5" strokeWidth="0.6" fill="none" opacity="0.25" />

          <path d="M 72 40 C 66 50 64 62 68 74" stroke="#450A0A" strokeWidth="1" fill="none" opacity="0.25" />
        </g>

        {/* 3. Renal Vessels at the Hilum (Arteria Renalis & Vena Renalis Bercabang 3D) */}
        <g id="kidney-vessels">
          {/* Arteria Renalis (Red Oxygenated - Posterior/Superior to Vein entering Hilum) */}
          {/* Segmental arterial branches spreading into parenchyma */}
          <path d="M 40 82 C 50 74 62 66 74 60" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M 40 82 C 52 86 64 96 72 106" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          {/* Main Arteria Renalis Trunk (Curved cylindrical 3D tube entering from medial) */}
          <path
            d="M 5 82 C 16 81 28 82 42 82"
            stroke="url(#kidney-tube-artery)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Vena Renalis (Blue Deoxygenated - Anterior structure emerging from Hilum) */}
          {/* Segmental venous branches emerging from parenchyma */}
          <path d="M 42 94 C 52 88 64 82 72 76" stroke="#0284C7" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.9" />
          <path d="M 42 94 C 52 100 62 112 68 122" stroke="#0284C7" strokeWidth="2.4" strokeLinecap="round" fill="none" opacity="0.9" />
          {/* Main Vena Renalis Trunk (Curved cylindrical 3D tube exiting toward vena cava) */}
          <path
            d="M 5 95 C 18 96 30 95 44 94"
            stroke="url(#kidney-tube-vein)"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Anatomical Label */}
        <text
          x="65"
          y="180"
          textAnchor="middle"
          fontSize="10.5"
          fontWeight="bold"
          fill="#881337"
          className="dark:fill-rose-300"
        >
          Ren (Ginjal)
        </text>
      </g>
    </svg>
  )
}
