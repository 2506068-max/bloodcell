import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Droplets, Eye, Activity, Heart, Layers, Sparkles } from 'lucide-react'

interface AnatomicalNode {
  id: string
  name: string
  latin: string
  system: 'pulmonary' | 'systemic' | 'both'
  oxygenated: boolean
  description: string
  clinicalNote: string
}

const anatomicalData: Record<string, AnatomicalNode> = {
  heart: {
    id: 'heart',
    name: 'Jantung (Cor)',
    latin: 'Cor Humanum',
    system: 'both',
    oxygenated: true,
    description: 'Pompa sentral muskular berongga di mediastinum media yang menggerakkan seluruh sirkulasi pulmonalis dan sistemik manusia.',
    clinicalNote: 'Denyut normal 60-100 kali per menit dengan curah jantung istirahat sekitar 5 liter darah per menit yang dipompakan ke seluruh tubuh.',
  },
  aorta: {
    id: 'aorta',
    name: 'Aorta Sistemik',
    latin: 'Aorta Thoracica & Abdominalis',
    system: 'systemic',
    oxygenated: true,
    description: 'Batang arteri terbesar tubuh, berpangkal di ventrikel kiri, melengkung membentuk arkus aorta, lalu turun menyuplai organ toraks, abdomen, dan tungkai.',
    clinicalNote: 'Dinding tebal kaya serat elastin untuk meredam lonjakan tekanan sistolik denyut jantung (efek Windkessel fisiologis).',
  },
  vena_cava: {
    id: 'vena_cava',
    name: 'Vena Kava (Superior & Inferior)',
    latin: 'Vena Cava Superior & Inferior',
    system: 'systemic',
    oxygenated: false,
    description: 'Dua pembuluh vena utama pengumpul darah deoksigenasi dari tubuh bagian atas dan bawah yang bermuara langsung ke atrium kanan jantung.',
    clinicalNote: 'Tekanan darah normal sangat rendah (0-5 mmHg) dan dipengaruhi oleh fase inspirasi rongga dada serta kerja katup vena perifer.',
  },
  pulmonary_artery: {
    id: 'pulmonary_artery',
    name: 'Arteri Pulmonalis',
    latin: 'Truncus & Arteria Pulmonalis',
    system: 'pulmonary',
    oxygenated: false,
    description: 'Menyalurkan darah kaya CO₂ dari bilik kanan (ventrikel kanan) jantung naik menuju anyaman kapiler alveolus di paru-paru.',
    clinicalNote: 'Satu-satunya arteri dalam tubuh orang dewasa yang membawa darah deoksigenasi miskin O₂.',
  },
  pulmonary_veins: {
    id: 'pulmonary_veins',
    name: 'Vena Pulmonalis',
    latin: 'Venae Pulmonales',
    system: 'pulmonary',
    oxygenated: true,
    description: 'Empat pembuluh vena (dua dari tiap paru) yang membawa darah kaya O₂ segar hasil respirasi alveolar kembali ke atrium kiri jantung.',
    clinicalNote: 'Membawa darah dengan tekanan parsial O₂ tertinggi dalam tubuh (sekitar 100 mmHg).',
  },
  lungs: {
    id: 'lungs',
    name: 'Paru-Paru (Pulmones)',
    latin: 'Pulmo Dexter & Pulmo Sinister',
    system: 'pulmonary',
    oxygenated: true,
    description: 'Organ respirasi bilateral tempat eritrosit mengikat molekul oksigen dan melepaskan karbon dioksida melalui membran kapiler alveolus.',
    clinicalNote: 'Paru kanan memiliki 3 lobus, sedangkan paru kiri memiliki 2 lobus dan incisura cardiaca tempat jantung bersandar. Luas permukaan kapiler mencapai 70-100 m².',
  },
  carotid_vessels: {
    id: 'carotid_vessels',
    name: 'Pembuluh Karotis & Jugularis (Kepala/Otak)',
    latin: 'Arteria Carotis & Vena Jugularis',
    system: 'systemic',
    oxygenated: true,
    description: 'Arteri karotis menghantarkan darah kaya oksigen dan glukosa ke otak, sedangkan vena jugularis mengalirkan darah balik menuju vena kava.',
    clinicalNote: 'Otak manusia mengonsumsi sekitar 20% dari seluruh suplai oksigen dan energi tubuh meskipun hanya menyumbang 2% dari berat badan.',
  },
  iliac_vessels: {
    id: 'iliac_vessels',
    name: 'Pembuluh Iliaka & Femoralis (Ekstremitas Bawah)',
    latin: 'Vasa Iliaca & Femoralia',
    system: 'systemic',
    oxygenated: true,
    description: 'Percabangan aorta abdominalis dan vena kava inferior yang memperdarahi panggul serta kedua tungkai kaki manusia.',
    clinicalNote: 'Denyut arteri femoralis pada lipatan paha adalah titik palpasi klinis penting saat evaluasi sirkulasi perifer dan akses kateterisasi vaskular.',
  },
}

export default function InteractiveAnatomy() {
  const [activeId, setActiveId] = useState<string | null>('heart')
  const [systemFilter, setSystemFilter] = useState<'all' | 'pulmonary' | 'systemic'>('all')
  const [displayMode, setDisplayMode] = useState<'interactive' | 'thorax3d' | 'atlas'>('interactive')

  const currentNode = activeId ? anatomicalData[activeId] : null

  // Hotspot definitions on the 550x830 authentic human canvas
  const hotspots = [
    {
      id: 'carotid_vessels',
      x: 295,
      y: 110,
      label: 'A. Carotis & V. Jugularis',
      sub: 'Kepala & Leher',
      side: 'left' as const,
      boxX: 14,
      boxY: 78,
      boxW: 150,
      boxH: 30,
      color: '#E11D48',
      type: 'arterial',
    },
    {
      id: 'lungs',
      x: 250,
      y: 215,
      label: 'Paru Kanan',
      sub: '(Pulmo Dexter - 3 Lobus)',
      side: 'left' as const,
      boxX: 14,
      boxY: 198,
      boxW: 150,
      boxH: 34,
      color: '#E11D48',
      type: 'pulmonary',
    },
    {
      id: 'vena_cava',
      x: 290,
      y: 282,
      label: 'Vena Kava',
      sub: 'Superior & Inferior',
      side: 'left' as const,
      boxX: 14,
      boxY: 318,
      boxW: 150,
      boxH: 30,
      color: '#0284C7',
      type: 'venous',
    },
    {
      id: 'iliac_vessels',
      x: 270,
      y: 508,
      label: 'V. Femoralis',
      sub: 'Tungkai Kanan (Ekstremitas)',
      side: 'left' as const,
      boxX: 14,
      boxY: 498,
      boxW: 150,
      boxH: 32,
      color: '#0284C7',
      type: 'venous',
    },
    {
      id: 'heart',
      x: 312,
      y: 230,
      label: 'Jantung',
      sub: '(Cor Humanum)',
      side: 'right' as const,
      boxX: 386,
      boxY: 148,
      boxW: 150,
      boxH: 34,
      color: '#BE123C',
      type: 'both',
    },
    {
      id: 'lungs',
      x: 345,
      y: 215,
      label: 'Paru Kiri',
      sub: '(Pulmo Sinister - 2 Lobus)',
      side: 'right' as const,
      boxX: 386,
      boxY: 218,
      boxW: 150,
      boxH: 34,
      color: '#E11D48',
      type: 'pulmonary',
    },
    {
      id: 'aorta',
      x: 306,
      y: 295,
      label: 'Aorta Sistemik',
      sub: 'Torasika & Abdominalis',
      side: 'right' as const,
      boxX: 386,
      boxY: 318,
      boxW: 150,
      boxH: 30,
      color: '#E11D48',
      type: 'arterial',
    },
    {
      id: 'iliac_vessels',
      x: 326,
      y: 508,
      label: 'A. Femoralis',
      sub: 'Tungkai Kiri (Ekstremitas)',
      side: 'right' as const,
      boxX: 386,
      boxY: 498,
      boxW: 150,
      boxH: 32,
      color: '#E11D48',
      type: 'arterial',
    },
  ]

  return (
    <div className="w-full rounded-3xl border border-slate-200/90 bg-white/95 p-5 sm:p-8 lg:p-10 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95 transition-all">
      {/* Top Header & View Modes */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 text-[11px] font-bold uppercase tracking-wider mb-1.5">
            <Sparkles size={12} className="text-rose-600 animate-pulse" />
            Atlas Anatomi Manusia Asli
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Peta Distribusi Vaskular Tubuh Manusia
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Model anatomi proporsional berbasis ilustrasi medis autentik tubuh manusia dengan penanda titik palpasi dan sirkulasi darah ganda.
          </p>
        </div>

        {/* View & Mode Switchers */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Mode Selector */}
          <div className="flex rounded-full border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
            <button
              onClick={() => setDisplayMode('interactive')}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                displayMode === 'interactive'
                  ? 'bg-white text-rose-700 dark:bg-slate-700 dark:text-rose-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Eye size={13} />
              Tubuh Manusia Interaktif
            </button>
            <button
              onClick={() => setDisplayMode('thorax3d')}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                displayMode === 'thorax3d'
                  ? 'bg-white text-rose-700 dark:bg-slate-700 dark:text-rose-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Heart size={13} />
              Toraks & Jantung 3D
            </button>
            <button
              onClick={() => setDisplayMode('atlas')}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                displayMode === 'atlas'
                  ? 'bg-white text-rose-700 dark:bg-slate-700 dark:text-rose-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              <Layers size={13} />
              Atlas Gray's
            </button>
          </div>

          {/* System Filters */}
          {displayMode === 'interactive' && (
            <div className="flex rounded-full border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
              <button
                onClick={() => setSystemFilter('all')}
                className={`px-3 py-1 rounded-full transition-all ${
                  systemFilter === 'all'
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setSystemFilter('pulmonary')}
                className={`px-3 py-1 rounded-full transition-all ${
                  systemFilter === 'pulmonary'
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                Pulmonal
              </button>
              <button
                onClick={() => setSystemFilter('systemic')}
                className={`px-3 py-1 rounded-full transition-all ${
                  systemFilter === 'systemic'
                    ? 'bg-rose-700 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                Sistemik
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid: Left Anatomy Body Viewer, Right Medical Information */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Anatomical Body Canvas */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center p-3 sm:p-5 rounded-3xl bg-gradient-to-b from-slate-50/90 via-rose-50/20 to-sky-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border border-slate-200/80 dark:border-slate-800 shadow-inner overflow-hidden min-h-[560px]">
          {displayMode === 'atlas' ? (
            <div className="relative w-full flex flex-col items-center justify-center py-2 animate-fadeIn">
              <div className="relative group max-w-[420px] w-full rounded-2xl overflow-hidden bg-white/95 dark:bg-slate-900/95 p-3 shadow-md border border-slate-200/80 dark:border-slate-800 flex flex-col items-center">
                <img
                  src="/assets/circulatory_system_fullbody.svg"
                  alt="Atlas Sistem Peredaran Darah Tubuh Manusia - Gray's & Sobotta"
                  className="w-full h-auto max-h-[580px] object-contain drop-shadow-md select-none transition-transform duration-300 hover:scale-[1.02]"
                />
                <div className="mt-3 w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-center">
                  <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                    Sistem Sirkulasi Utuh Manusia (Standar Anatomi Sobotta & Gray's)
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Ilustrasi vektor anatomi autentik &bull; Domain Publik Edukasi Kedokteran
                  </p>
                </div>
              </div>

              {/* Quick selector buttons */}
              <div className="mt-4 flex flex-wrap justify-center gap-1.5 max-w-sm">
                {[
                  { id: 'carotid_vessels', label: 'Kepala & Leher' },
                  { id: 'heart', label: 'Cor / Jantung' },
                  { id: 'lungs', label: 'Paru (Pulmo)' },
                  { id: 'aorta', label: 'Arkus Aorta' },
                  { id: 'vena_cava', label: 'Vena Kava' },
                  { id: 'iliac_vessels', label: 'A. Femoralis' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveId(item.id)}
                    className={`text-[11px] font-medium px-2.5 py-1 rounded-full border transition-all ${
                      activeId === item.id
                        ? 'bg-rose-700 text-white border-rose-700 shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-rose-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ) : displayMode === 'thorax3d' ? (
            /* Close-up 3D Realistic Thoracic Cavity */
            <div className="relative w-full max-w-md flex flex-col items-center justify-center p-3 animate-fadeIn">
              <div className="relative w-full rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-slate-800 p-4 shadow-lg text-center">
                <div className="grid grid-cols-2 gap-3 items-center mb-3">
                  <div
                    onClick={() => setActiveId('heart')}
                    className={`cursor-pointer p-2.5 rounded-xl border transition-all ${
                      activeId === 'heart'
                        ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/40 shadow-sm'
                        : 'border-slate-100 hover:border-slate-300 dark:border-slate-800'
                    }`}
                  >
                    <img
                      src="/assets/heart_anatomical.jpg"
                      alt="Anatomi Jantung Netter"
                      className="max-h-48 w-auto mx-auto object-contain rounded-lg filter drop-shadow-md"
                    />
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-2">
                      Cor Humanum (Jantung)
                    </p>
                    <p className="text-[10px] text-slate-500">Miokardium, Aorta & Vena Kava</p>
                  </div>

                  <div
                    onClick={() => setActiveId('lungs')}
                    className={`cursor-pointer p-2.5 rounded-xl border transition-all ${
                      activeId === 'lungs'
                        ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/40 shadow-sm'
                        : 'border-slate-100 hover:border-slate-300 dark:border-slate-800'
                    }`}
                  >
                    <img
                      src="/assets/lungs_anatomical_transparent.png"
                      alt="Anatomi Paru-Paru Bilateral"
                      className="max-h-48 w-auto mx-auto object-contain rounded-lg filter drop-shadow-md"
                    />
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-2">
                      Pulmones (Paru-Paru)
                    </p>
                    <p className="text-[10px] text-slate-500">Trakea, Bronkus & 5 Lobus</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-left text-xs">
                  <span className="font-bold text-rose-700 dark:text-rose-400 block mb-0.5">
                    Hubungan Kardiopulmonal di Rongga Dada (Cavitas Thoracis):
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                    Jantung terletak di mediastinum media, sedikit miring ke sisi kiri di antara pulmo dexter (3 lobus) dan pulmo sinister (2 lobus dengan incisura cardiaca).
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* ========================================================================= */
            /* AUTHENTIC MEDICAL HUMAN BODY INTERACTIVE MAP                              */
            /* ========================================================================= */
            <div className="relative w-full max-w-[480px] aspect-[550/830] select-none mx-auto flex items-center justify-center">
              {/* Layer 1: Authentic Human Body & Full Vascular Illustration */}
              <img
                src="/assets/circulatory_system_human_clean.svg"
                alt="Ilustrasi Anatomi Tubuh Manusia Asli dan Sistem Sirkulasi Darah"
                className="absolute inset-0 w-full h-full object-contain filter drop-shadow-md pointer-events-none transition-opacity duration-300"
                style={{
                  opacity: systemFilter === 'all' ? 1 : 0.85,
                }}
              />

              {/* Layer 2: Translucent Pulmonary Lobes Realistic Highlight */}
              <svg
                viewBox="0 0 550 830"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                <defs>
                  {/* Lung respiratory radial gradients */}
                  <radialGradient id="human-lung-r" cx="55%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#FDA4AF" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#FB7185" stopOpacity="0.65" />
                    <stop offset="90%" stopColor="#E11D48" stopOpacity="0.5" />
                  </radialGradient>
                  <radialGradient id="human-lung-l" cx="45%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#FDA4AF" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#FB7185" stopOpacity="0.65" />
                    <stop offset="90%" stopColor="#E11D48" stopOpacity="0.5" />
                  </radialGradient>
                  {/* Heart glowing pulse filter */}
                  <filter id="glow-selected" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#E11D48" floodOpacity="0.6" />
                  </filter>
                </defs>

                {/* Right Lung (Pulmo Dexter) Translucent Overlay */}
                <path
                  d="M 276 175 C 260 174 240 188 234 212 C 228 236 230 258 240 270 C 250 276 268 274 278 264 C 278 245 277 215 277 192 C 277 183 278 178 276 175 Z"
                  fill="url(#human-lung-r)"
                  stroke="#BE123C"
                  strokeWidth="0.8"
                  opacity={activeId === 'lungs' ? 0.9 : 0.45}
                  className="transition-all duration-300"
                />

                {/* Left Lung (Pulmo Sinister) Translucent Overlay */}
                <path
                  d="M 318 175 C 334 174 354 188 360 212 C 366 236 362 258 352 270 C 342 276 324 274 316 264 C 320 250 322 235 318 222 C 316 210 316 192 318 183 Z"
                  fill="url(#human-lung-l)"
                  stroke="#BE123C"
                  strokeWidth="0.8"
                  opacity={activeId === 'lungs' ? 0.9 : 0.45}
                  className="transition-all duration-300"
                />

                {/* Heart Soft Myocardium Silhouette Glow */}
                <circle
                  cx="312"
                  cy="230"
                  r="24"
                  fill="#E11D48"
                  opacity={activeId === 'heart' ? 0.25 : 0.08}
                  className="transition-all duration-300"
                />
              </svg>

              {/* Layer 3: Interactive SVG with Leader Lines, Pins & Callout Badges */}
              <svg
                viewBox="0 0 550 830"
                className="absolute inset-0 w-full h-full pointer-events-auto"
                aria-label="Peta Interaktif Anatomi Vaskular Tubuh Manusia"
              >
                {/* 1. Leader Lines Connecting Callout Badges to Hotspots */}
                <g className="transition-all">
                  {hotspots.map((hs, i) => {
                    const isSelected = activeId === hs.id
                    const isLeft = hs.side === 'left'

                    // Calculate polyline points
                    const startX = isLeft ? hs.boxX + hs.boxW : hs.boxX
                    const startY = hs.boxY + hs.boxH / 2
                    const elbowX = isLeft ? startX + 55 : startX - 55
                    const points = `${startX},${startY} ${elbowX},${startY} ${hs.x},${hs.y}`

                    return (
                      <g key={i} className="pointer-events-none transition-all">
                        {/* Connecting Leader Line */}
                        <polyline
                          points={points}
                          fill="none"
                          stroke={isSelected ? hs.color : '#94A3B8'}
                          strokeWidth={isSelected ? 2 : 1.2}
                          strokeDasharray={isSelected ? 'none' : '3 2'}
                          strokeOpacity={isSelected ? 1 : 0.75}
                          className="transition-all duration-300"
                        />
                      </g>
                    )
                  })}
                </g>

                {/* 2. Hotspots On Body (Pulsating Rings & Centers) */}
                <g>
                  {hotspots.map((hs, i) => {
                    const isSelected = activeId === hs.id
                    return (
                      <g
                        key={`hotspot-${i}`}
                        onClick={() => setActiveId(hs.id)}
                        className="cursor-pointer group"
                      >
                        {/* Animated Pulsing Ring when Selected */}
                        {isSelected && (
                          <circle
                            cx={hs.x}
                            cy={hs.y}
                            r="11"
                            fill="none"
                            stroke={hs.color}
                            strokeWidth="2"
                            opacity="0.8"
                            className="animate-ping"
                          />
                        )}

                        {/* Outer Glow Halo */}
                        <circle
                          cx={hs.x}
                          cy={hs.y}
                          r={isSelected ? 8.5 : 5.5}
                          fill={hs.color}
                          opacity={isSelected ? 0.3 : 0.15}
                          className="transition-all duration-300 group-hover:scale-125"
                        />

                        {/* Inner Core Dot */}
                        <circle
                          cx={hs.x}
                          cy={hs.y}
                          r={isSelected ? 4.5 : 3.5}
                          fill={hs.color}
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                          className="filter drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
                        />
                      </g>
                    )
                  })}
                </g>

                {/* 3. Callout Badges Styled like High-End Medical Software */}
                <g>
                  {hotspots.map((hs, i) => {
                    const isSelected = activeId === hs.id

                    return (
                      <g
                        key={`callout-${i}`}
                        onClick={() => setActiveId(hs.id)}
                        className="cursor-pointer group transition-all"
                      >
                        {/* Shadow & Background Card */}
                        <rect
                          x={hs.boxX}
                          y={hs.boxY}
                          width={hs.boxW}
                          height={hs.boxH}
                          rx="8"
                          fill={isSelected ? (hs.color === '#0284C7' ? '#0369A1' : '#BE123C') : '#FFFFFF'}
                          stroke={isSelected ? hs.color : '#E2E8F0'}
                          strokeWidth={isSelected ? '1.8' : '1'}
                          className="filter drop-shadow-sm transition-all duration-200 dark:fill-slate-900 dark:stroke-slate-700"
                        />

                        {/* Text Line 1: Main Anatomical Structure */}
                        <text
                          x={hs.boxX + hs.boxW / 2}
                          y={hs.boxY + (hs.boxH === 34 ? 14 : 14)}
                          textAnchor="middle"
                          fill={isSelected ? '#FFFFFF' : '#0F172A'}
                          fontSize="9.5"
                          fontWeight="bold"
                          className="dark:fill-white select-none transition-colors"
                        >
                          {hs.label}
                        </text>

                        {/* Text Line 2: Latin/Clinical Subtitle */}
                        {hs.sub && (
                          <text
                            x={hs.boxX + hs.boxW / 2}
                            y={hs.boxY + (hs.boxH === 34 ? 26 : 24)}
                            textAnchor="middle"
                            fill={isSelected ? (hs.color === '#0284C7' ? '#BAE6FD' : '#FECDD3') : '#64748B'}
                            fontSize="7.5"
                            fontWeight="semibold"
                            className="dark:fill-slate-400 select-none transition-colors"
                          >
                            {hs.sub}
                          </text>
                        )}
                      </g>
                    )
                  })}
                </g>
              </svg>
            </div>
          )}

          {/* Bottom Caption */}
          <div className="mt-3 text-center">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-white/70 dark:bg-slate-800/70 px-3 py-1 rounded-full border border-slate-200/60 dark:border-slate-700/60">
              💡 Klik pada label atau penanda tubuh untuk menelaah anatomi klinis
            </span>
          </div>
        </div>

        {/* Right: Anatomical & Clinical Information Card */}
        <div className="lg:col-span-6 space-y-5">
          <AnimatePresence mode="wait">
            {currentNode ? (
              <motion.div
                key={currentNode.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
                        currentNode.oxygenated
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300'
                          : 'bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300'
                      }`}
                    >
                      <Droplets size={11} />
                      {currentNode.oxygenated ? 'Kaya Oksigen (O₂)' : 'Deoksigenasi (Kaya CO₂)'}
                    </span>
                    <span className="text-xs italic text-slate-500 dark:text-slate-400 font-serif">
                      {currentNode.latin}
                    </span>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
                    {currentNode.name}
                  </h4>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentNode.description}
                </p>

                {/* Clinical Note Highlight Box */}
                <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-100/90 dark:border-rose-900/40 text-xs text-slate-700 dark:text-slate-300">
                  <p className="font-bold text-rose-900 dark:text-rose-300 flex items-center gap-1.5 mb-1.5">
                    <Activity size={15} className="text-rose-600" />
                    Keterangan Klinis & Fisiologis:
                  </p>
                  <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                    {currentNode.clinicalNote}
                  </p>
                </div>

                {/* Quick Organ Navigation Buttons */}
                <div className="pt-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Pilih Struktur Anatomi:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.values(anatomicalData).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveId(item.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                          activeId === item.id
                            ? 'bg-rose-700 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        {item.name.split('(')[0].trim()}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-12 text-slate-400">
                <Eye size={32} className="mx-auto mb-2 opacity-50" />
                <p>Pilih organ atau pembuluh darah pada diagram untuk melihat data anatomi</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
