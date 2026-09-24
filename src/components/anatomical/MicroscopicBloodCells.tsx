import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Microscope, ZoomIn, Shield, Flame, Activity } from 'lucide-react'

export type CellCategory = 'erythrocyte' | 'leukocyte' | 'platelet'

export default function MicroscopicBloodCells() {
  const [activeCategory, setActiveCategory] = useState<CellCategory>('erythrocyte')
  const [wbcType, setWbcType] = useState<'neutrophil' | 'lymphocyte' | 'monocyte'>('neutrophil')
  const [plateletState, setPlateletState] = useState<'resting' | 'activated'>('resting')
  const [magnification, setMagnification] = useState<number>(2500)

  return (
    <div className="w-full flex flex-col items-center">
      {/* Category selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        <button
          onClick={() => setActiveCategory('erythrocyte')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
            activeCategory === 'erythrocyte'
              ? 'bg-rose-700 text-white shadow-md shadow-rose-900/20'
              : 'bg-white/80 text-slate-700 hover:bg-slate-100 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
          }`}
        >
          <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-sm" />
          Eritrosit (Sel Darah Merah)
        </button>

        <button
          onClick={() => setActiveCategory('leukocyte')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
            activeCategory === 'leukocyte'
              ? 'bg-sky-700 text-white shadow-md shadow-sky-900/20'
              : 'bg-white/80 text-slate-700 hover:bg-slate-100 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
          }`}
        >
          <span className="w-3 h-3 rounded-full bg-sky-400 inline-block shadow-sm" />
          Leukosit (Sel Darah Putih)
        </button>

        <button
          onClick={() => setActiveCategory('platelet')}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
            activeCategory === 'platelet'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-900/20'
              : 'bg-white/80 text-slate-700 hover:bg-slate-100 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
          }`}
        >
          <span className="w-3 h-3 rounded-full bg-amber-400 inline-block shadow-sm" />
          Trombosit (Platelet Pembeku)
        </button>
      </div>

      {/* Main Microscopy Chamber Card */}
      <div className="w-full max-w-4xl bg-white/90 dark:bg-slate-900/90 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl backdrop-blur-xl p-6 sm:p-8">
        {/* Microscopy Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <Microscope size={20} className="text-rose-600 dark:text-rose-400" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Visualisasi Mikroskopi Elektron (SEM)</p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {activeCategory === 'erythrocyte' && 'Morfologi Eritrosit: Biconcave Disc'}
                {activeCategory === 'leukocyte' && `Morfologi Leukosit: ${wbcType.toUpperCase()}`}
                {activeCategory === 'platelet' && `Fragmen Sitoplasma Megakariosit (${plateletState === 'resting' ? 'Istirahat' : 'Aktif / Teragregasi'})`}
              </h3>
            </div>
          </div>

          {/* Sub-selectors */}
          {activeCategory === 'leukocyte' && (
            <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-50 dark:bg-slate-800/80 text-xs">
              {(['neutrophil', 'lymphocyte', 'monocyte'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setWbcType(type)}
                  className={`px-3 py-1.5 rounded-md font-semibold capitalize transition-all ${
                    wbcType === type
                      ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-300 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {type === 'neutrophil' ? 'Neutrofil' : type === 'lymphocyte' ? 'Limfosit' : 'Monosit'}
                </button>
              ))}
            </div>
          )}

          {activeCategory === 'platelet' && (
            <div className="flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-50 dark:bg-slate-800/80 text-xs">
              <button
                onClick={() => setPlateletState('resting')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                  plateletState === 'resting'
                    ? 'bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-300 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Inaktif (Darah Normal)
              </button>
              <button
                onClick={() => setPlateletState('activated')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                  plateletState === 'activated'
                    ? 'bg-white dark:bg-slate-900 text-amber-700 dark:text-amber-300 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Teraktivasi (Luka Pembuluh)
              </button>
            </div>
          )}
        </div>

        {/* Viewer Grid: Left Realistic Render, Right Histological Facts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* SEM Simulation Viewport */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 shadow-inner overflow-hidden min-h-[360px]">
            {/* Ambient microscope grid overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
            <div className="pointer-events-none absolute left-4 top-4 text-[10px] font-mono text-emerald-400/80">
              HV: 15.0 kV | MAG: {magnification}x | WD: 8.2 mm
            </div>
            <div className="pointer-events-none absolute right-4 top-4 text-[10px] font-mono text-slate-500">
              SEM DETECTOR: ETD
            </div>

            {/* Scale Bar */}
            <div className="pointer-events-none absolute right-4 bottom-4 flex flex-col items-end gap-0.5 font-mono text-[9px] text-slate-400">
              <span>2.0 µm</span>
              <div className="w-16 h-1 bg-white/90 rounded-sm" />
            </div>

            {/* Dynamic Rendering Based on Category */}
            <AnimatePresence mode="wait">
              {activeCategory === 'erythrocyte' && (
                <motion.div
                  key="rbc"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative flex items-center justify-center"
                >
                  <ErythrocyteSEM />
                </motion.div>
              )}

              {activeCategory === 'leukocyte' && (
                <motion.div
                  key={`wbc-${wbcType}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative flex items-center justify-center"
                >
                  <LeukocyteSEM type={wbcType} />
                </motion.div>
              )}

              {activeCategory === 'platelet' && (
                <motion.div
                  key={`platelet-${plateletState}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative flex items-center justify-center"
                >
                  <PlateletSEM state={plateletState} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Magnification slider */}
            <div className="absolute left-4 bottom-3 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700/60 text-slate-300 text-[10px]">
              <ZoomIn size={12} className="text-slate-400" />
              <span>Perbesaran:</span>
              <button
                onClick={() => setMagnification(1500)}
                className={`px-1.5 py-0.5 rounded ${magnification === 1500 ? 'bg-rose-600 text-white font-bold' : 'text-slate-400'}`}
              >
                1500x
              </button>
              <button
                onClick={() => setMagnification(2500)}
                className={`px-1.5 py-0.5 rounded ${magnification === 2500 ? 'bg-rose-600 text-white font-bold' : 'text-slate-400'}`}
              >
                2500x
              </button>
              <button
                onClick={() => setMagnification(5000)}
                className={`px-1.5 py-0.5 rounded ${magnification === 5000 ? 'bg-rose-600 text-white font-bold' : 'text-slate-400'}`}
              >
                5000x
              </button>
            </div>
          </div>

          {/* Right: Scientific Breakdown & Histology Data */}
          <div className="lg:col-span-6 space-y-4">
            {activeCategory === 'erythrocyte' && (
              <>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 text-xs font-bold">
                  <Activity size={14} />
                  Karakteristik Anatomi & Fisiologi
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  Cakram Bikonkaf (Central Pallor)
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Eritrosit matang tidak memiliki nukleus maupun mitokondria untuk memaksimalkan ruang bagi 270 juta molekul hemoglobin. Bentuk bikonkaf memberikan rasio luas permukaan terhadap volume yang optimal untuk pertukaran gas O₂ dan CO₂ secara cepat.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <p className="text-[11px] text-slate-400 font-semibold uppercase">Diameter Rata-Rata</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white">7.5 – 8.5 µm</p>
                    <p className="text-[11px] text-slate-500">Tebal tepi: 2.5 µm | pusat: 1.0 µm</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <p className="text-[11px] text-slate-400 font-semibold uppercase">Masa Hidup di Sirkulasi</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white">120 Hari</p>
                    <p className="text-[11px] text-slate-500">Didaur ulang di limpa & hati</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 text-xs text-rose-800 dark:text-rose-200">
                  <strong>Fleksibilitas Mikrosirkulasi: </strong>
                  Membran eritrosit dilapisi protein spektrin elastis yang memungkinkannya melipat dan melewati kapiler sekecil 4 µm tanpa pecah.
                </div>
              </>
            )}

            {activeCategory === 'leukocyte' && (
              <>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 text-xs font-bold">
                  <Shield size={14} />
                  Sistem Pertahanan Imunologis
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  {wbcType === 'neutrophil' && 'Neutrofil: Garis Depan Fagositosis'}
                  {wbcType === 'lymphocyte' && 'Limfosit: Sel T & B Imunitas Spesifik'}
                  {wbcType === 'monocyte' && 'Monosit: Prekursor Makrofag Jaringan'}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {wbcType === 'neutrophil' &&
                    'Leukosit paling melimpah (60-70% total sel darah putih). Memiliki nukleus berlobus 3-5 yang khas. Merespons sinyal kemotaktik untuk bermigrasi menembus endotel pembuluh (diapedesis) dan memakan bakteri patogen.'}
                  {wbcType === 'lymphocyte' &&
                    'Memiliki nukleus bulat besar padat kromatin yang mengisi 90% sitoplasma. Memediasi imunitas adaptif: Sel B memproduksi antibodi, sementara Sel T menghancurkan sel terinfeksi virus dan sel kanker.'}
                  {wbcType === 'monocyte' &&
                    'Sel darah putih terbesar (15-20 µm) dengan nukleus berbentuk ginjal / tapal kuda. Beredar dalam aliran darah selama 1-3 hari sebelum bermigrasi ke jaringan untuk berdiferensiasi menjadi makrofag.'}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <p className="text-[11px] text-slate-400 font-semibold uppercase">Populasi Normal</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white">4.500 – 11.000 /µL</p>
                    <p className="text-[11px] text-slate-500">Meningkat saat infeksi (leukositosis)</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <p className="text-[11px] text-slate-400 font-semibold uppercase">Ciri Morfologi Inti</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white">
                      {wbcType === 'neutrophil' && 'Polimorfonuklear (3-5 Lobus)'}
                      {wbcType === 'lymphocyte' && 'Bulat Tunggal Sangat Padat'}
                      {wbcType === 'monocyte' && 'Tapal Kuda / Lekukan Ginjal'}
                    </p>
                  </div>
                </div>
              </>
            )}

            {activeCategory === 'platelet' && (
              <>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 text-xs font-bold">
                  <Flame size={14} />
                  Mekanisme Hemostasis & Pembekuan
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  {plateletState === 'resting' ? 'Trombosit Inaktif (Sirkulasi Bebas)' : 'Aktivasi: Pembentukan Pseudopodia'}
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Trombosit bukan sel utuh melainkan fragmen sitoplasma kecil tanpa inti dari megakariosit sumsum tulang. Ketika dinding endotel pembuluh darah robek dan kolagen terpapar, trombosit teraktivasi seketika, membentuk penjuluran kaki semu (pseudopodia) dan melepaskan granula pembeku untuk menutup luka.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <p className="text-[11px] text-slate-400 font-semibold uppercase">Ukuran Fragmen</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white">2.0 – 4.0 µm</p>
                    <p className="text-[11px] text-slate-500">Paling kecil di antara sel darah</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <p className="text-[11px] text-slate-400 font-semibold uppercase">Rentang Hitung Normal</p>
                    <p className="text-base font-bold text-slate-900 dark:text-white">150K – 450K /µL</p>
                    <p className="text-[11px] text-slate-500">Masa sirkulasi: 7-10 hari</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Scanning Electron Microscopy (SEM) realistic rendering of Erythrocyte (biconcave disc)
function ErythrocyteSEM() {
  return (
    <svg viewBox="0 0 280 280" className="w-56 h-56 filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)]">
      <defs>
        {/* Outer rim gradient: deep organic blood red */}
        <radialGradient id="rbc-outer-grad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FB7185" />
          <stop offset="35%" stopColor="#E11D48" />
          <stop offset="70%" stopColor="#BE123C" />
          <stop offset="100%" stopColor="#67051C" />
        </radialGradient>

        {/* Central pallor depression gradient: shadowed concavity */}
        <radialGradient id="rbc-pallor-grad" cx="45%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#7F1D1D" />
          <stop offset="45%" stopColor="#991B1B" />
          <stop offset="85%" stopColor="#BE123C" />
          <stop offset="100%" stopColor="#E11D48" />
        </radialGradient>

        <linearGradient id="specular-glint" x1="20%" y1="10%" x2="50%" y2="40%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Main outer disc */}
      <circle cx="140" cy="140" r="105" fill="url(#rbc-outer-grad)" />

      {/* 3D Torus highlight on the outer thick rim */}
      <circle cx="138" cy="136" r="88" fill="none" stroke="url(#specular-glint)" strokeWidth="18" opacity="0.6" />

      {/* Deep Central Pallor (Biconcave Inversion) */}
      <ellipse cx="140" cy="140" rx="55" ry="50" fill="url(#rbc-pallor-grad)" opacity="0.95" />

      {/* Inner shadow for biological depth */}
      <ellipse cx="143" cy="144" rx="42" ry="38" fill="#450A0A" opacity="0.75" />
      <ellipse cx="138" cy="138" rx="35" ry="30" fill="#7F1D1D" opacity="0.5" />

      {/* Secondary mini-erythrocytes in background (depth of field simulation) */}
      <g opacity="0.3" filter="blur(2px)">
        <circle cx="35" cy="45" r="22" fill="#BE123C" />
        <ellipse cx="35" cy="45" rx="10" ry="8" fill="#7F1D1D" />
      </g>
      <g opacity="0.25" filter="blur(3px)">
        <circle cx="235" cy="225" r="28" fill="#9F1239" />
        <ellipse cx="235" cy="225" rx="12" ry="10" fill="#450A0A" />
      </g>
    </svg>
  )
}

// Scanning Electron Microscopy (SEM) rendering of Leukocyte with distinct morphology
function LeukocyteSEM({ type }: { type: 'neutrophil' | 'lymphocyte' | 'monocyte' }) {
  return (
    <svg viewBox="0 0 280 280" className="w-56 h-56 filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)]">
      <defs>
        <radialGradient id="wbc-membrane" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="40%" stopColor="#BAE6FD" />
          <stop offset="75%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0369A1" />
        </radialGradient>
        <radialGradient id="nucleus-grad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#6B21A8" />
          <stop offset="60%" stopColor="#4C1D95" />
          <stop offset="100%" stopColor="#2E1065" />
        </radialGradient>
      </defs>

      {/* Spherical membrane base */}
      <circle cx="140" cy="140" r="100" fill="url(#wbc-membrane)" opacity="0.85" />

      {/* Membrane surface microvilli & folds (SEM textured look) */}
      <g stroke="#E0F2FE" strokeWidth="2.5" fill="none" opacity="0.5" strokeLinecap="round">
        <path d="M 60 120 Q 75 110 90 125" />
        <path d="M 80 160 Q 95 180 115 170" />
        <path d="M 170 80 Q 185 70 200 85" />
        <path d="M 180 160 Q 200 170 215 150" />
        <path d="M 110 75 Q 130 65 145 80" />
        <path d="M 120 205 Q 140 220 160 205" />
      </g>

      {/* Nucleus projection viewable through semi-translucent cell body */}
      {type === 'neutrophil' && (
        <g id="segmented-nucleus">
          {/* Multi-lobed nucleus connected by chromatin strands */}
          <ellipse cx="110" cy="115" rx="26" ry="24" fill="url(#nucleus-grad)" />
          <ellipse cx="165" cy="110" rx="24" ry="22" fill="url(#nucleus-grad)" />
          <ellipse cx="145" cy="170" rx="28" ry="25" fill="url(#nucleus-grad)" />
          {/* Chromatin connects */}
          <path d="M 128 115 Q 145 105 150 112" stroke="#4C1D95" strokeWidth="9" fill="none" />
          <path d="M 160 128 Q 165 148 152 160" stroke="#4C1D95" strokeWidth="8" fill="none" />
          <path d="M 120 135 Q 125 155 135 165" stroke="#4C1D95" strokeWidth="8" fill="none" />
        </g>
      )}

      {type === 'lymphocyte' && (
        <g id="round-dense-nucleus">
          {/* Giant single spherical nucleus filling almost entire volume */}
          <circle cx="140" cy="140" r="76" fill="url(#nucleus-grad)" />
          <circle cx="130" cy="130" r="62" fill="#581C87" opacity="0.6" />
        </g>
      )}

      {type === 'monocyte' && (
        <g id="kidney-nucleus">
          {/* Indented kidney/horseshoe nucleus */}
          <path
            d="M 110 80 
               C 165 75 195 110 190 160 
               C 185 200 145 210 115 195 
               C 95 185 90 155 110 140 
               C 130 125 135 105 110 80 Z"
            fill="url(#nucleus-grad)"
          />
        </g>
      )}
    </svg>
  )
}

// Scanning Electron Microscopy (SEM) rendering of Platelets
function PlateletSEM({ state }: { state: 'resting' | 'activated' }) {
  return (
    <svg viewBox="0 0 280 280" className="w-56 h-56 filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)]">
      <defs>
        <radialGradient id="platelet-grad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="45%" stopColor="#F59E0B" />
          <stop offset="85%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </radialGradient>
      </defs>

      {state === 'resting' ? (
        <g>
          {/* Smooth small discoid resting platelet */}
          <ellipse cx="140" cy="140" rx="60" ry="42" fill="url(#platelet-grad)" />
          <ellipse cx="135" cy="135" rx="45" ry="28" fill="#FBBF24" opacity="0.5" />
          {/* Granule storage sites (alpha & dense granules) */}
          <circle cx="120" cy="135" r="4" fill="#78350F" opacity="0.7" />
          <circle cx="135" cy="145" r="3.5" fill="#78350F" opacity="0.7" />
          <circle cx="155" cy="138" r="4.5" fill="#78350F" opacity="0.7" />
        </g>
      ) : (
        <g>
          {/* Activated platelet with branching pseudopodia (tentacles) */}
          <path
            d="M 140 100 
               Q 145 60 150 40 Q 155 60 155 100
               Q 180 85 210 65 Q 195 95 180 115
               Q 220 125 245 135 Q 215 145 180 145
               Q 205 180 220 215 Q 185 190 165 165
               Q 155 205 150 240 Q 140 205 135 165
               Q 105 190 75 220 Q 95 180 115 155
               Q 70 145 40 135 Q 75 125 110 120
               Q 90 90 70 65 Q 105 85 130 105 Z"
            fill="url(#platelet-grad)"
          />
          <circle cx="140" cy="140" r="35" fill="#F59E0B" opacity="0.8" />
          {/* Exocytosis granules release */}
          <circle cx="155" cy="130" r="3" fill="#FEF3C7" />
          <circle cx="130" cy="145" r="2.5" fill="#FEF3C7" />
        </g>
      )}
    </svg>
  )
}
