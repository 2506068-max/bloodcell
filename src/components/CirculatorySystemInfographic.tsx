import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface CirculationState {
  activeSystem: 'all' | 'pulmonary' | 'systemic'
  hoveredOrgan: string | null
  modalDetail: { title: string; subtitle: string; description: string; role: string; type: 'oxygenated' | 'deoxygenated' | 'neutral' } | null
}

export default function CirculatorySystemInfographic() {
  const [state, setState] = useState<CirculationState>({
    activeSystem: 'all',
    hoveredOrgan: null,
    modalDetail: null,
  })

  const isPulmonaryActive = state.activeSystem === 'all' || state.activeSystem === 'pulmonary'
  const isSystemicActive = state.activeSystem === 'all' || state.activeSystem === 'systemic'

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#FFF5F8] to-[#E8F3FF] overflow-hidden flex items-center justify-center p-4 lg:p-8">
      <div className="relative w-full max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-8 lg:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/80 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            Infografis Alur Sirkulasi Ganda
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Sirkulasi Pulmonal & Sistemik
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Alur horizontal satu arah: Darah terdeoksigenasi (biru) dioksigenasi di paru-paru, kemudian dipompa ke jaringan tubuh dan kembali lagi ke jantung.
          </p>
        </motion.div>

        {/* Main infographic container */}
        <div className="relative bg-white/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/60 shadow-[0_30px_90px_-20px_rgba(15,23,42,0.12)] p-4 sm:p-8 lg:p-10 overflow-hidden">
          {/* Mobile swipe helper hint */}
          <div className="flex sm:hidden items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-100/90 border border-slate-200/60 rounded-full py-1 px-3.5 mb-3 mx-auto w-fit shadow-xs">
            <span className="text-rose-500 font-bold">⇄</span> Geser horizontal untuk melihat seluruh alur (Paru ⇄ Jantung ⇄ Tubuh)
          </div>

          {/* SVG Unfolded Horizontal Dual-Loop Diagram */}
          <div className="w-full overflow-x-auto pb-2">
            <svg
              viewBox="0 0 1200 620"
              className="w-full min-w-[850px] max-w-5xl mx-auto select-none"
              style={{ filter: 'drop-shadow(0 10px 30px rgba(15,23,42,0.06))' }}
            >
              <defs>
                {/* 3D Cylindrical Tube Gradients for Realistic Blood Vessels */}
                <linearGradient id="tube-artery" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#9F1239" />
                  <stop offset="25%" stopColor="#E11D48" />
                  <stop offset="50%" stopColor="#FB7185" />
                  <stop offset="75%" stopColor="#E11D48" />
                  <stop offset="100%" stopColor="#881337" />
                </linearGradient>

                <linearGradient id="tube-vein" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0369A1" />
                  <stop offset="25%" stopColor="#0284C7" />
                  <stop offset="50%" stopColor="#38BDF8" />
                  <stop offset="75%" stopColor="#0284C7" />
                  <stop offset="100%" stopColor="#0C4A6E" />
                </linearGradient>

                {/* Organ Gradients */}
                <radialGradient id="lung-mesh-grad" cx="40%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#FDA4AF" />
                  <stop offset="50%" stopColor="#F43F5E" />
                  <stop offset="85%" stopColor="#BE123C" />
                  <stop offset="100%" stopColor="#881337" />
                </radialGradient>

                <radialGradient id="heart-muscle-grad" cx="45%" cy="38%" r="65%">
                  <stop offset="0%" stopColor="#E11D48" />
                  <stop offset="45%" stopColor="#BE123C" />
                  <stop offset="80%" stopColor="#881337" />
                  <stop offset="100%" stopColor="#4C0519" />
                </radialGradient>

                <radialGradient id="body-tissue-grad" cx="50%" cy="40%" r="70%">
                  <stop offset="0%" stopColor="#F8FAFC" />
                  <stop offset="60%" stopColor="#E2E8F0" />
                  <stop offset="100%" stopColor="#CBD5E1" />
                </radialGradient>

                {/* Filters */}
                <filter id="organ-drop-shadow" x="-10%" y="-10%" width="125%" height="125%">
                  <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.15" />
                </filter>
                <filter id="glow-badge" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0284C7" floodOpacity="0.25" />
                </filter>
              </defs>

              {/* ============================================================== */}
              {/* ZONE 1: SIRKULASI KECIL / PULMONAL (SISI KIRI: X 40 - 450)     */}
              {/* ============================================================== */}
              <g
                id="pulmonary-zone"
                style={{
                  opacity: isPulmonaryActive ? 1 : 0.25,
                  transition: 'opacity 0.4s ease',
                }}
              >
                {/* Background Zone Card */}
                <rect
                  x="30"
                  y="30"
                  width="440"
                  height="550"
                  rx="28"
                  fill="#F0F9FF"
                  fillOpacity="0.65"
                  stroke="#BAE6FD"
                  strokeWidth="1.5"
                />

                {/* Zone Header Plaque */}
                <g transform="translate(250, 65)">
                  <rect x="-140" y="-18" width="280" height="36" rx="18" fill="#0284C7" fillOpacity="0.95" />
                  <text x="0" y="4" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle" letterSpacing="0.4">
                    Sirkulasi Kecil (Pulmonal)
                  </text>
                  <text x="0" y="32" fill="#0369A1" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                    Ventrikel Kanan (RV) ➔ Paru-Paru ➔ Atrium Kiri (LA)
                  </text>
                </g>

                {/* Organ: Paru-Paru (Pulmones & Alveoli) */}
                <g
                  id="pulmo-organ"
                  transform="translate(170, 310)"
                  className="cursor-pointer"
                  onClick={() =>
                    setState(s => ({
                      ...s,
                      modalDetail: {
                        title: 'Paru-Paru & Mikrosirkulasi Alveolar',
                        subtitle: 'Sirkulasi Pulmonal (Hematosis)',
                        description:
                          'Tempat terjadinya difusi gas hematosis: Darah dari arteri pulmonalis yang kaya CO₂ melepaskan gas karbon dioksida ke rongga alveolus untuk diekspirasi, dan menyerap molekul oksigen segar dari udara pernapasan untuk diikat oleh hemoglobin eritrosit.',
                        role: 'Pertukaran Gas Alveolar: CO₂ Dilepas ➔ O₂ Diikat',
                        type: 'deoxygenated',
                      },
                    }))
                  }
                  filter="url(#organ-drop-shadow)"
                >
                  {/* Trachea & Bronchi Tree */}
                  <path d="M 0 -95 L 0 -50 M 0 -50 Q -25 -35 -45 -10 M 0 -50 Q 25 -35 45 -10" stroke="#94A3B8" strokeWidth="5" strokeLinecap="round" fill="none" />
                  {[ -85, -75, -65, -55 ].map(y => (
                    <line key={y} x1="-6" y1={y} x2="6" y2={y} stroke="#CBD5E1" strokeWidth="1.8" strokeLinecap="round" />
                  ))}

                  {/* Right Lung (Viewer's Left) */}
                  <path
                    d="M -20 -40 C -45 -38 -80 -10 -85 30 C -90 70 -75 105 -50 115 C -25 125 -10 100 -12 70 C -15 30 -5 -20 -20 -40 Z"
                    fill="url(#lung-mesh-grad)"
                    stroke="#881337"
                    strokeWidth="2"
                  />
                  {/* Left Lung (Viewer's Right) */}
                  <path
                    d="M 20 -40 C 45 -38 80 -10 85 30 C 90 70 75 105 50 115 C 25 125 10 100 12 70 C 15 30 5 -20 20 -40 Z"
                    fill="url(#lung-mesh-grad)"
                    stroke="#881337"
                    strokeWidth="2"
                  />

                  {/* Alveolar Capillary Mesh Texture */}
                  <g stroke="#F8FAFC" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" fill="none">
                    <path d="M -60 10 Q -35 30 -50 70" />
                    <path d="M -75 40 Q -40 50 -30 85" />
                    <path d="M 60 10 Q 35 30 50 70" />
                    <path d="M 75 40 Q 40 50 30 85" />
                  </g>

                  {/* Organ Label Plaque */}
                  <rect x="-85" y="125" width="170" height="34" rx="10" fill="#FFFFFF" fillOpacity="0.95" stroke="#0284C7" strokeWidth="1.4" />
                  <text x="0" y="140" fill="#0C4A6E" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Paru-Paru (Pulmo)
                  </text>
                  <text x="0" y="152" fill="#0284C7" fontSize="8" fontWeight="bold" textAnchor="middle">
                    Alveolus: CO₂ Lepas ↑ • O₂ Masuk ↓
                  </text>
                </g>

                {/* ===== PIPELINE 1 (ATAS): ARTERI PULMONALIS (RV ➔ PARU-PARU) ===== */}
                {/* Horizontal Directional 3D Tube (Darah Biru Kaya CO₂) */}
                <g id="pipeline-arteri-pulmonalis">
                  {/* Outer Glow */}
                  <path d="M 520 220 L 255 220" stroke="#0284C7" strokeWidth="16" strokeLinecap="round" opacity="0.25" />
                  {/* 3D Cylindrical Vessel Tube */}
                  <path d="M 520 220 L 255 220" stroke="url(#tube-vein)" strokeWidth="12" strokeLinecap="round" />
                  {/* Repeated Directional Chevrons (<<< Flow Leftwards) */}
                  <g fill="none" stroke="#E0F2FE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    {[ 470, 420, 370, 320, 275 ].map(x => (
                      <path key={`chev-pulm-art-${x}`} d={`M ${x + 6} 214 L ${x} 220 L ${x + 6} 226`} />
                    ))}
                  </g>

                  {/* Informational Vessel Label Badge */}
                  <g transform="translate(385, 190)">
                    <rect x="-80" y="-12" width="160" height="24" rx="12" fill="#0C4A6E" fillOpacity="0.95" stroke="#38BDF8" strokeWidth="1" />
                    <text x="0" y="4" fill="#E0F2FE" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                      Arteri Pulmonalis (Kaya CO₂)
                    </text>
                  </g>
                </g>

                {/* ===== PIPELINE 2 (BAWAH): VENA PULMONALIS (PARU-PARU ➔ LA) ===== */}
                {/* Horizontal Directional 3D Tube (Darah Merah Kaya O₂) */}
                <g id="pipeline-vena-pulmonalis">
                  {/* Outer Glow */}
                  <path d="M 255 420 L 520 420" stroke="#E11D48" strokeWidth="16" strokeLinecap="round" opacity="0.25" />
                  {/* 3D Cylindrical Vessel Tube */}
                  <path d="M 255 420 L 520 420" stroke="url(#tube-artery)" strokeWidth="12" strokeLinecap="round" />
                  {/* Repeated Directional Chevrons (>>> Flow Rightwards) */}
                  <g fill="none" stroke="#FFE4E6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    {[ 285, 335, 385, 435, 485 ].map(x => (
                      <path key={`chev-pulm-vein-${x}`} d={`M ${x - 6} 414 L ${x} 420 L ${x - 6} 426`} />
                    ))}
                  </g>

                  {/* Informational Vessel Label Badge */}
                  <g transform="translate(385, 450)">
                    <rect x="-80" y="-12" width="160" height="24" rx="12" fill="#881337" fillOpacity="0.95" stroke="#FB7185" strokeWidth="1" />
                    <text x="0" y="4" fill="#FFE4E6" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                      Vena Pulmonalis (Kaya O₂)
                    </text>
                  </g>
                </g>
              </g>

              {/* ============================================================== */}
              {/* ZONE 2: COR HUMANUM / JANTUNG 4 RUANG (TENGAH: X 480 - 720)     */}
              {/* ============================================================== */}
              <g
                id="heart-center-zone"
                className="cursor-pointer"
                onClick={() =>
                  setState(s => ({
                    ...s,
                    modalDetail: {
                      title: 'Jantung (Cor Humanum) - Pompa Ganda',
                      subtitle: 'Pusat Hemodinamika 4 Ruang',
                      description:
                        'Jantung bekerja sebagai pompa ganda terintegrasi. Sisi kanan (RA & RV) memompa darah miskin oksigen ke paru-paru dalam Sirkulasi Kecil. Sisi kiri (LA & LV) menerima darah beroksigen dan memompakannya ke seluruh tubuh dalam Sirkulasi Besar.',
                      role: 'Pompa Sinkron: RA➔RV (Pulmonal) & LA➔LV (Sistemik)',
                      type: 'neutral',
                    },
                  }))
                }
                filter="url(#organ-drop-shadow)"
              >
                {/* Anatomical Heart Silhouette Container */}
                <path
                  d="M 500 210 C 475 250 480 380 520 440 C 560 500 600 520 600 520 C 600 520 640 500 680 440 C 720 380 725 250 700 210 C 680 180 620 180 600 200 C 580 180 520 180 500 210 Z"
                  fill="url(#heart-muscle-grad)"
                  stroke="#4C0519"
                  strokeWidth="2.5"
                />

                {/* Septum Interventriculare (Central Dividing Wall) */}
                <path d="M 600 200 L 600 515" stroke="#4C0519" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
                <path d="M 600 200 L 600 515" stroke="#BE123C" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

                {/* Internal Flow Pathways inside Heart */}
                {/* Right Heart Flow (RA to RV) */}
                <path d="M 545 390 L 545 250" stroke="#38BDF8" strokeWidth="3" strokeDasharray="4 3" strokeLinecap="round" />
                <polygon points="545,242 541,250 549,250" fill="#38BDF8" />

                {/* Left Heart Flow (LA to LV) */}
                <path d="M 655 390 L 655 250" stroke="#FB7185" strokeWidth="3" strokeDasharray="4 3" strokeLinecap="round" />
                <polygon points="655,242 651,250 659,250" fill="#FB7185" />

                {/* ===== 4 ANATOMICAL CHAMBER BADGES (SPACIOUS & INTERACTIVE) ===== */}
                {/* 1. RV: Ventrikel Kanan (Kiri Atas Jantung Diagram) */}
                <g transform="translate(545, 220)">
                  <rect x="-24" y="-14" width="48" height="28" rx="8" fill="#0C4A6E" fillOpacity="0.95" stroke="#38BDF8" strokeWidth="1.2" />
                  <text x="0" y="4" fill="#E0F2FE" fontSize="12" fontWeight="extrabold" textAnchor="middle">RV</text>
                  <text x="0" y="24" fill="#BAE6FD" fontSize="7" fontWeight="bold" textAnchor="middle">Ventrikel Knn</text>
                </g>

                {/* 2. RA: Atrium Kanan (Kiri Bawah Jantung Diagram) */}
                <g transform="translate(545, 420)">
                  <rect x="-24" y="-14" width="48" height="28" rx="8" fill="#075985" fillOpacity="0.95" stroke="#38BDF8" strokeWidth="1.2" />
                  <text x="0" y="4" fill="#E0F2FE" fontSize="12" fontWeight="extrabold" textAnchor="middle">RA</text>
                  <text x="0" y="24" fill="#BAE6FD" fontSize="7" fontWeight="bold" textAnchor="middle">Atrium Knn</text>
                </g>

                {/* 3. LV: Ventrikel Kiri (Kanan Atas Jantung Diagram) */}
                <g transform="translate(655, 220)">
                  <rect x="-24" y="-14" width="48" height="28" rx="8" fill="#9F1239" fillOpacity="0.95" stroke="#FB7185" strokeWidth="1.2" />
                  <text x="0" y="4" fill="#FFE4E6" fontSize="12" fontWeight="extrabold" textAnchor="middle">LV</text>
                  <text x="0" y="24" fill="#FECDD3" fontSize="7" fontWeight="bold" textAnchor="middle">Ventrikel Kiri</text>
                </g>

                {/* 4. LA: Atrium Kiri (Kanan Bawah Jantung Diagram) */}
                <g transform="translate(655, 420)">
                  <rect x="-24" y="-14" width="48" height="28" rx="8" fill="#881337" fillOpacity="0.95" stroke="#FB7185" strokeWidth="1.2" />
                  <text x="0" y="4" fill="#FFE4E6" fontSize="12" fontWeight="extrabold" textAnchor="middle">LA</text>
                  <text x="0" y="24" fill="#FECDD3" fontSize="7" fontWeight="bold" textAnchor="middle">Atrium Kiri</text>
                </g>

                {/* Central Title Plaque */}
                <g transform="translate(600, 320)">
                  <rect x="-65" y="-14" width="130" height="28" rx="14" fill="#0F172A" fillOpacity="0.95" stroke="#FFFFFF" strokeWidth="1.2" />
                  <text x="0" y="4" fill="#FFFFFF" fontSize="10.5" fontWeight="extrabold" textAnchor="middle" letterSpacing="0.5">
                    COR HUMANUM
                  </text>
                </g>
              </g>

              {/* ============================================================== */}
              {/* ZONE 3: SIRKULASI BESAR / SISTEMIK (SISI KANAN: X 730 - 1170)  */}
              {/* ============================================================== */}
              <g
                id="systemic-zone"
                style={{
                  opacity: isSystemicActive ? 1 : 0.25,
                  transition: 'opacity 0.4s ease',
                }}
              >
                {/* Background Zone Card */}
                <rect
                  x="730"
                  y="30"
                  width="440"
                  height="550"
                  rx="28"
                  fill="#FFF1F2"
                  fillOpacity="0.65"
                  stroke="#FECDD3"
                  strokeWidth="1.5"
                />

                {/* Zone Header Plaque */}
                <g transform="translate(950, 65)">
                  <rect x="-140" y="-18" width="280" height="36" rx="18" fill="#E11D48" fillOpacity="0.95" />
                  <text x="0" y="4" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle" letterSpacing="0.4">
                    Sirkulasi Besar (Sistemik)
                  </text>
                  <text x="0" y="32" fill="#BE123C" fontSize="9.5" fontWeight="bold" textAnchor="middle">
                    Ventrikel Kiri (LV) ➔ Seluruh Tubuh ➔ Atrium Kanan (RA)
                  </text>
                </g>

                {/* Organ: Jaringan Tubuh / Sistemik (Systemic Microcirculation) */}
                <g
                  id="body-organ"
                  transform="translate(1030, 310)"
                  className="cursor-pointer"
                  onClick={() =>
                    setState(s => ({
                      ...s,
                      modalDetail: {
                        title: 'Jaringan Tubuh & Mikrosirkulasi Sistemik',
                        subtitle: 'Sirkulasi Sistemik (Respirasi Internal)',
                        description:
                          'Darah kaya oksigen dan glukosa dari ventrikel kiri dipompakan melalui Aorta menuju anyaman kapiler mikrosirkulasi di otak, ginjal, saluran cerna, dan otot. Di sini oksigen berdifusi ke sel untuk produksi energi (ATP), dan sisa metabolisme (CO₂) diangkut kembali oleh vena kava ke jantung.',
                        role: 'Respirasi Seluler: O₂ Diberikan ke Sel ➔ CO₂ Diambil Vena',
                        type: 'oxygenated',
                      },
                    }))
                  }
                  filter="url(#organ-drop-shadow)"
                >
                  {/* Systemic Organ Capsule Body */}
                  <rect x="-90" y="-75" width="180" height="180" rx="36" fill="url(#body-tissue-grad)" stroke="#94A3B8" strokeWidth="2" />

                  {/* Peripheral Organs Mini Vector Motifs */}
                  {/* Brain Silhouette Motif */}
                  <g transform="translate(-45, -35)" stroke="#64748B" strokeWidth="1.4" fill="none">
                    <path d="M -15 0 C -20 -15 0 -20 0 -5 C 0 -20 20 -15 15 0 C 18 10 5 15 0 10 C -5 15 -18 10 -15 0 Z" />
                    <text x="0" y="20" fill="#475569" fontSize="7" fontWeight="bold" textAnchor="middle">Otak</text>
                  </g>
                  {/* Kidney Motif */}
                  <g transform="translate(45, -35)" stroke="#64748B" strokeWidth="1.4" fill="none">
                    <path d="M 0 -12 C 12 -12 16 0 12 12 C 8 20 -4 16 -8 8 C -12 0 -8 -12 0 -12 Z" />
                    <text x="0" y="20" fill="#475569" fontSize="7" fontWeight="bold" textAnchor="middle">Ginjal</text>
                  </g>
                  {/* Systemic Capillary Bed Grid */}
                  <g stroke="#E11D48" strokeWidth="1" strokeDasharray="3 2" opacity="0.75" fill="none">
                    <path d="M -65 40 Q 0 25 65 40" />
                    <path d="M -70 55 Q 0 40 70 55" />
                    <path d="M -60 70 Q 0 55 60 70" />
                  </g>

                  {/* Organ Label Plaque */}
                  <rect x="-85" y="125" width="170" height="34" rx="10" fill="#FFFFFF" fillOpacity="0.95" stroke="#E11D48" strokeWidth="1.4" />
                  <text x="0" y="140" fill="#881337" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Jaringan Tubuh (Sistemik)
                  </text>
                  <text x="0" y="152" fill="#E11D48" fontSize="8" fontWeight="bold" textAnchor="middle">
                    Metabolisme: O₂ Dilepas ↓ • CO₂ Diserap ↑
                  </text>
                </g>

                {/* ===== PIPELINE 3 (ATAS): AORTA SISTEMIK (LV ➔ JARINGAN TUBUH) ===== */}
                {/* Horizontal Directional 3D Tube (Darah Merah Kaya O₂) */}
                <g id="pipeline-aorta">
                  {/* Outer Glow */}
                  <path d="M 680 220 L 945 220" stroke="#E11D48" strokeWidth="16" strokeLinecap="round" opacity="0.25" />
                  {/* 3D Cylindrical Vessel Tube */}
                  <path d="M 680 220 L 945 220" stroke="url(#tube-artery)" strokeWidth="12" strokeLinecap="round" />
                  {/* Repeated Directional Chevrons (>>> Flow Rightwards) */}
                  <g fill="none" stroke="#FFE4E6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    {[ 715, 765, 815, 865, 915 ].map(x => (
                      <path key={`chev-aorta-${x}`} d={`M ${x - 6} 214 L ${x} 220 L ${x - 6} 226`} />
                    ))}
                  </g>

                  {/* Informational Vessel Label Badge */}
                  <g transform="translate(815, 190)">
                    <rect x="-80" y="-12" width="160" height="24" rx="12" fill="#881337" fillOpacity="0.95" stroke="#FB7185" strokeWidth="1" />
                    <text x="0" y="4" fill="#FFE4E6" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                      Aorta Sistemik (Kaya O₂)
                    </text>
                  </g>
                </g>

                {/* ===== PIPELINE 4 (BAWAH): VENA KAVA SISTEMIK (JARINGAN TUBUH ➔ RA) ===== */}
                {/* Horizontal Directional 3D Tube (Darah Biru Kaya CO₂) */}
                <g id="pipeline-vena-kava">
                  {/* Outer Glow */}
                  <path d="M 945 420 L 680 420" stroke="#0284C7" strokeWidth="16" strokeLinecap="round" opacity="0.25" />
                  {/* 3D Cylindrical Vessel Tube */}
                  <path d="M 945 420 L 680 420" stroke="url(#tube-vein)" strokeWidth="12" strokeLinecap="round" />
                  {/* Repeated Directional Chevrons (<<< Flow Leftwards) */}
                  <g fill="none" stroke="#E0F2FE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    {[ 915, 865, 815, 765, 715 ].map(x => (
                      <path key={`chev-cava-${x}`} d={`M ${x + 6} 414 L ${x} 420 L ${x + 6} 426`} />
                    ))}
                  </g>

                  {/* Informational Vessel Label Badge */}
                  <g transform="translate(815, 450)">
                    <rect x="-80" y="-12" width="160" height="24" rx="12" fill="#0C4A6E" fillOpacity="0.95" stroke="#38BDF8" strokeWidth="1" />
                    <text x="0" y="4" fill="#E0F2FE" fontSize="8.5" fontWeight="bold" textAnchor="middle">
                      Vena Kava Sistemik (Kaya CO₂)
                    </text>
                  </g>
                </g>
              </g>

              {/* ============================================================== */}
              {/* DYNAMIC BLOOD CELL FLOW PARTICLES (ERYTHROCYTES ON TRACKS)     */}
              {/* ============================================================== */}
              {/* Pipeline 1: RV ➔ Paru-Paru (Blue, X: 520 ➔ 255) */}
              {isPulmonaryActive && [0, 1, 2].map(i => (
                <motion.circle
                  key={`erythro-pulm-art-${i}`}
                  cy={220}
                  r="5.5"
                  fill="#38BDF8"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  animate={{ cx: [520, 255] }}
                  transition={{ duration: 3.5, delay: i * 1.15, repeat: Infinity, ease: 'linear' }}
                />
              ))}

              {/* Pipeline 2: Paru-Paru ➔ LA (Red, X: 255 ➔ 520) */}
              {isPulmonaryActive && [0, 1, 2].map(i => (
                <motion.circle
                  key={`erythro-pulm-vein-${i}`}
                  cy={420}
                  r="5.5"
                  fill="#FB7185"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  animate={{ cx: [255, 520] }}
                  transition={{ duration: 3.5, delay: i * 1.15, repeat: Infinity, ease: 'linear' }}
                />
              ))}

              {/* Pipeline 3: LV ➔ Jaringan Tubuh (Red, X: 680 ➔ 945) */}
              {isSystemicActive && [0, 1, 2].map(i => (
                <motion.circle
                  key={`erythro-aorta-${i}`}
                  cy={220}
                  r="5.5"
                  fill="#FB7185"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  animate={{ cx: [680, 945] }}
                  transition={{ duration: 3.5, delay: i * 1.15, repeat: Infinity, ease: 'linear' }}
                />
              ))}

              {/* Pipeline 4: Jaringan Tubuh ➔ RA (Blue, X: 945 ➔ 680) */}
              {isSystemicActive && [0, 1, 2].map(i => (
                <motion.circle
                  key={`erythro-cava-${i}`}
                  cy={420}
                  r="5.5"
                  fill="#38BDF8"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  animate={{ cx: [945, 680] }}
                  transition={{ duration: 3.5, delay: i * 1.15, repeat: Infinity, ease: 'linear' }}
                />
              ))}
            </svg>
          </div>

          {/* Interactive Flow Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 pt-6 border-t border-slate-200/60">
            {[
              { label: 'Semua Sirkulasi (Ganda)', value: 'all' as const },
              { label: 'Sirkulasi Kecil (Pulmonal)', value: 'pulmonary' as const },
              { label: 'Sirkulasi Besar (Sistemik)', value: 'systemic' as const },
            ].map(btn => (
              <motion.button
                key={btn.value}
                onClick={() => setState(s => ({ ...s, activeSystem: btn.value }))}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-xs ${
                  state.activeSystem === btn.value
                    ? 'bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-md shadow-rose-500/25 scale-105'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                {btn.label}
              </motion.button>
            ))}
          </div>

          {/* Educational Legend Footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-sky-50/70 border border-sky-100">
              <span className="flex h-3 w-3 rounded-full bg-sky-500 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-sm text-sky-950">Darah Miskin Oksigen (Kaya CO₂)</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Mengalir dari jaringan tubuh melalui Vena Kava ke atrium & ventrikel kanan, lalu diteruskan via Arteri Pulmonalis menuju paru-paru.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-rose-50/70 border border-rose-100">
              <span className="flex h-3 w-3 rounded-full bg-rose-500 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-sm text-rose-950">Darah Kaya Oksigen (Kaya O₂)</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Kembali dari alveoli paru melalui Vena Pulmonalis ke atrium & ventrikel kiri, lalu dipompa bertekanan tinggi via Aorta ke seluruh organ tubuh.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Detail Organ Dialog */}
        <AnimatePresence>
          {state.modalDetail && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setState(s => ({ ...s, modalDetail: null }))}
            >
              <motion.div
                className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100 text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-white"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-4 mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 mb-1.5">
                      {state.modalDetail.subtitle}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                      {state.modalDetail.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setState(s => ({ ...s, modalDetail: null }))}
                    className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 mb-5">
                  {state.modalDetail.description}
                </p>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span className="text-slate-400 mr-2 font-bold">Fungsi Fisiologis:</span>
                  {state.modalDetail.role}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setState(s => ({ ...s, modalDetail: null }))}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition dark:bg-white dark:text-slate-900"
                  >
                    Tutup Telaah
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
