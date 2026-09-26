import { useState } from 'react'
import { motion } from 'framer-motion'
import { Droplets, Eye, Activity } from 'lucide-react'

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
    description: 'Pompa sentral muskular berongga di mediastinum media yang menggerakkan seluruh sirkulasi pulmonalis dan sistemik.',
    clinicalNote: 'Denyut normal 60-100 kali per menit dengan curah jantung istirahat 5 liter per menit.',
  },
  aorta: {
    id: 'aorta',
    name: 'Aorta Sistemik',
    latin: 'Aorta Thoracica & Abdominalis',
    system: 'systemic',
    oxygenated: true,
    description: 'Batang arteri terbesar tubuh, berpangkal di ventrikel kiri, melengkung membentuk arkus aorta, dan turun menyuplai seluruh organ.',
    clinicalNote: 'Dinding tebal kaya elastin untuk meredam gelombang tekanan denyut (efek Windkessel).',
  },
  vena_cava: {
    id: 'vena_cava',
    name: 'Vena Kava (Superior & Inferior)',
    latin: 'Vena Cava Superior & Inferior',
    system: 'systemic',
    oxygenated: false,
    description: 'Dua pembuluh vena utama pengumpul darah deoksigenasi dari tubuh bagian atas dan bawah yang bermuara ke atrium kanan.',
    clinicalNote: 'Tekanan darah normal sangat rendah (0-5 mmHg) dan dipengaruhi oleh fase inspirasi rongga dada.',
  },
  pulmonary_artery: {
    id: 'pulmonary_artery',
    name: 'Arteri Pulmonalis',
    latin: 'Truncus & Arteria Pulmonalis',
    system: 'pulmonary',
    oxygenated: false,
    description: 'Menyalurkan darah kaya CO₂ dari ventrikel kanan menuju kapiler alveolus di paru-paru kanan dan kiri.',
    clinicalNote: 'Satu-satunya arteri dalam tubuh orang dewasa yang membawa darah deoksigenasi.',
  },
  pulmonary_veins: {
    id: 'pulmonary_veins',
    name: 'Vena Pulmonalis',
    latin: 'Venae Pulmonales',
    system: 'pulmonary',
    oxygenated: true,
    description: 'Empat pembuluh vena (dua dari tiap paru) yang membawa darah kaya O₂ kembali ke atrium kiri jantung.',
    clinicalNote: 'Membawa darah dengan tekanan parsial O₂ tertinggi dalam tubuh (sekitar 100 mmHg).',
  },
  lungs: {
    id: 'lungs',
    name: 'Paru-Paru (Pulmo)',
    latin: 'Pulmones',
    system: 'pulmonary',
    oxygenated: true,
    description: 'Organ respirasi tempat eritrosit mengikat molekul oksigen dan membuang karbon dioksida melalui membran kapiler alveolus.',
    clinicalNote: 'Luas permukaan pertukaran gas mencapai 70-100 meter persegi dengan 480 juta alveoli.',
  },
  carotid_vessels: {
    id: 'carotid_vessels',
    name: 'Pembuluh Karotis & Jugularis (Kepala/Otak)',
    latin: 'Arteria Carotis & Vena Jugularis',
    system: 'systemic',
    oxygenated: true,
    description: 'Arteri karotis komunis menghantarkan darah beroksigen ke otak, sedangkan vena jugularis internalis mengalirkan darah balik.',
    clinicalNote: 'Otak mengonsumsi 20% suplai oksigen tubuh meskipun hanya menyumbang 2% dari berat badan.',
  },
  iliac_vessels: {
    id: 'iliac_vessels',
    name: 'Pembuluh Iliaka & Femoralis (Ekstremitas Bawah)',
    latin: 'Vasa Iliaca & Femoralia',
    system: 'systemic',
    oxygenated: true,
    description: 'Percabangan aorta abdominalis dan vena kava inferior yang memperdarahi pelvis serta kedua tungkai kaki.',
    clinicalNote: 'Denyut arteri femoralis pada lipatan paha adalah titik palpasi klinis penting saat evaluasi sirkulasi perifer.',
  },
}

export default function InteractiveAnatomy() {
  const [activeId, setActiveId] = useState<string | null>('heart')
  const [systemFilter, setSystemFilter] = useState<'all' | 'pulmonary' | 'systemic'>('all')

  const currentNode = activeId ? anatomicalData[activeId] : null

  return (
    <div className="w-full rounded-3xl border border-slate-200/90 bg-white/95 p-6 sm:p-10 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95">
      {/* Top Filter & Legend Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5 mb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Atlas Anatomi Vaskular
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Peta Distribusi Vaskular Tubuh Manusia
          </h3>
        </div>

        {/* System Filter Tabs */}
        <div className="flex rounded-full border border-slate-200 dark:border-slate-700 p-1 bg-slate-50 dark:bg-slate-800 text-xs font-semibold">
          <button
            onClick={() => setSystemFilter('all')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              systemFilter === 'all'
                ? 'bg-rose-700 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Semua Sistem
          </button>
          <button
            onClick={() => setSystemFilter('pulmonary')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              systemFilter === 'pulmonary'
                ? 'bg-rose-700 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Sirkulasi Pulmonal
          </button>
          <button
            onClick={() => setSystemFilter('systemic')}
            className={`px-4 py-1.5 rounded-full transition-all ${
              systemFilter === 'systemic'
                ? 'bg-rose-700 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Sirkulasi Sistemik
          </button>
        </div>
      </div>

      {/* Main Grid: Left Anatomy Body Viewer, Right Medical Information */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Anatomical Body Canvas */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center p-4 rounded-3xl bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border border-slate-200/70 dark:border-slate-800 shadow-inner min-h-[460px]">
          <svg
            viewBox="0 0 400 620"
            className="w-full max-w-sm h-auto select-none"
            aria-label="Anatomi Sistem Peredaran Darah Tubuh"
          >
            <defs>
              <linearGradient id="artery-stroke" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FB7185" />
                <stop offset="50%" stopColor="#BE123C" />
                <stop offset="100%" stopColor="#881337" />
              </linearGradient>
              <linearGradient id="vein-stroke" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0369A1" />
              </linearGradient>
              {/* Realistic Organ Gradients for Torso Atlas */}
              <radialGradient id="torso-heart-grad" cx="45%" cy="38%" r="65%">
                <stop offset="0%" stopColor="#E11D48" />
                <stop offset="45%" stopColor="#BE123C" />
                <stop offset="85%" stopColor="#881337" />
                <stop offset="100%" stopColor="#4C0519" />
              </radialGradient>
              <radialGradient id="torso-lung-r" cx="60%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FDA4AF" />
                <stop offset="40%" stopColor="#F43F5E" />
                <stop offset="75%" stopColor="#BE123C" />
                <stop offset="100%" stopColor="#881337" />
              </radialGradient>
              <radialGradient id="torso-lung-l" cx="40%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FDA4AF" />
                <stop offset="40%" stopColor="#F43F5E" />
                <stop offset="75%" stopColor="#BE123C" />
                <stop offset="100%" stopColor="#881337" />
              </radialGradient>
            </defs>

            {/* Realistic Human Torso Silhouette Outline */}
            <path
              d="M 200 40 
                 C 225 40 240 55 240 80 
                 C 240 105 220 120 200 120 
                 C 180 120 160 105 160 80 
                 C 160 55 175 40 200 40 Z
                 M 180 120 L 180 145 C 130 155 110 175 90 220 L 70 340 L 95 350 L 115 250 L 135 240
                 L 140 370 C 140 430 160 450 170 470 L 155 580 L 185 585 L 195 480 L 205 480 L 215 585 L 245 580 L 230 470
                 C 240 450 260 430 260 370 L 265 240 L 285 250 L 305 350 L 330 340 L 310 220 C 290 175 270 155 220 145 L 220 120 Z"
              fill="rgba(148, 163, 184, 0.05)"
              stroke="rgba(148, 163, 184, 0.25)"
              strokeWidth="1.5"
            />

            {/* Bilateral Lungs Anatomical Lobes */}
            <g
              id="node-lungs"
              onClick={() => setActiveId('lungs')}
              className="cursor-pointer group"
              opacity={systemFilter === 'systemic' ? 0.35 : 1}
            >
              {/* Trachea & Bronchi Bifurcation */}
              <path d="M 197 165 L 197 195 M 203 165 L 203 195" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="1.5 2" />
              <path d="M 200 195 Q 185 202 165 210 M 200 195 Q 215 202 235 210" stroke="#94A3B8" strokeWidth="2" fill="none" opacity="0.7" />

              {/* Right Lung (Pulmo Dexter - 3 Lobes) */}
              <g className="transition-all duration-300">
                <path
                  d="M 175 185 
                     C 152 184 132 200 126 226 
                     C 120 252 124 278 134 294 
                     C 146 302 166 300 178 288 
                     C 178 266 176 230 176 205 
                     C 176 195 178 188 175 185 Z"
                  fill="url(#torso-lung-r)"
                  opacity={activeId === 'lungs' ? 0.95 : 0.65}
                  stroke={activeId === 'lungs' ? '#FFFFFF' : '#881337'}
                  strokeWidth={activeId === 'lungs' ? 2.2 : 1}
                  className="filter drop-shadow-sm transition-all duration-300"
                />
                {/* Horizontal fissure & Oblique fissure */}
                <path d="M 128 238 Q 150 236 176 242" stroke="#4C0519" strokeWidth="1" fill="none" opacity="0.6" />
                <path d="M 132 268 Q 155 264 176 255" stroke="#4C0519" strokeWidth="1" fill="none" opacity="0.6" />
                {/* Bronchial arborization */}
                <path d="M 170 215 Q 152 225 140 245" stroke="#FFE4E6" strokeWidth="1" fill="none" opacity="0.5" />
                <path d="M 155 230 Q 148 215 142 205" stroke="#FFE4E6" strokeWidth="0.8" fill="none" opacity="0.5" />
              </g>

              {/* Left Lung with Incisura Cardiaca (Pulmo Sinister - 2 Lobes) */}
              <g className="transition-all duration-300">
                <path
                  d="M 225 185 
                     C 248 184 268 200 274 226 
                     C 280 252 276 278 266 294 
                     C 254 302 234 300 222 288 
                     C 226 272 230 256 226 240 
                     C 222 225 222 205 224 195 
                     C 225 190 224 186 225 185 Z"
                  fill="url(#torso-lung-l)"
                  opacity={activeId === 'lungs' ? 0.95 : 0.65}
                  stroke={activeId === 'lungs' ? '#FFFFFF' : '#881337'}
                  strokeWidth={activeId === 'lungs' ? 2.2 : 1}
                  className="filter drop-shadow-sm transition-all duration-300"
                />
                {/* Oblique fissure */}
                <path d="M 272 242 Q 250 258 224 274" stroke="#4C0519" strokeWidth="1" fill="none" opacity="0.6" />
                {/* Bronchial arborization */}
                <path d="M 230 215 Q 248 225 260 245" stroke="#FFE4E6" strokeWidth="1" fill="none" opacity="0.5" />
                <path d="M 245 230 Q 252 215 258 205" stroke="#FFE4E6" strokeWidth="0.8" fill="none" opacity="0.5" />
              </g>
            </g>

            {/* Major Arteries (Red / Crimson) */}
            <g
              stroke="url(#artery-stroke)"
              fill="none"
              strokeLinecap="round"
              opacity={systemFilter === 'pulmonary' ? 0.35 : 1}
            >
              {/* Carotid Arteries */}
              <path
                d="M 195 200 L 190 120 M 190 120 L 175 90 M 190 120 L 195 85"
                strokeWidth={activeId === 'carotid_vessels' ? 4 : 2.5}
                onClick={() => setActiveId('carotid_vessels')}
                className="cursor-pointer"
              />
              <path
                d="M 205 200 L 210 120 M 210 120 L 225 90 M 210 120 L 205 85"
                strokeWidth={activeId === 'carotid_vessels' ? 4 : 2.5}
                onClick={() => setActiveId('carotid_vessels')}
                className="cursor-pointer"
              />

              {/* Subclavian to Arms */}
              <path d="M 195 200 Q 150 190 100 240 L 80 320" strokeWidth="2.2" />
              <path d="M 205 200 Q 250 190 300 240 L 320 320" strokeWidth="2.2" />

              {/* Descending Abdominal Aorta */}
              <path
                d="M 202 245 L 202 380"
                strokeWidth={activeId === 'aorta' ? 5 : 3.5}
                onClick={() => setActiveId('aorta')}
                className="cursor-pointer"
              />
              {/* Renal Arteries */}
              <path d="M 202 320 L 170 330 M 202 320 L 234 330" strokeWidth="2" />

              {/* Iliac & Femoral Arteries */}
              <path
                d="M 202 380 Q 185 410 175 460 L 170 560"
                strokeWidth={activeId === 'iliac_vessels' ? 4 : 2.5}
                onClick={() => setActiveId('iliac_vessels')}
                className="cursor-pointer"
              />
              <path
                d="M 202 380 Q 215 410 225 460 L 230 560"
                strokeWidth={activeId === 'iliac_vessels' ? 4 : 2.5}
                onClick={() => setActiveId('iliac_vessels')}
                className="cursor-pointer"
              />
            </g>

            {/* Major Veins (Blue) */}
            <g
              stroke="url(#vein-stroke)"
              fill="none"
              strokeLinecap="round"
              opacity={systemFilter === 'pulmonary' ? 0.35 : 1}
            >
              {/* Jugular Veins */}
              <path d="M 183 120 L 183 190" strokeWidth="2.5" />
              <path d="M 217 120 L 217 190" strokeWidth="2.5" />

              {/* Superior & Inferior Vena Cava */}
              <path
                d="M 188 160 L 188 235"
                strokeWidth={activeId === 'vena_cava' ? 5 : 3.5}
                onClick={() => setActiveId('vena_cava')}
                className="cursor-pointer"
              />
              <path
                d="M 193 250 L 193 385"
                strokeWidth={activeId === 'vena_cava' ? 5 : 3.5}
                onClick={() => setActiveId('vena_cava')}
                className="cursor-pointer"
              />

              {/* Iliac & Femoral Veins */}
              <path d="M 193 385 Q 178 415 168 460 L 163 560" strokeWidth="2.5" />
              <path d="M 193 385 Q 208 415 218 460 L 223 560" strokeWidth="2.5" />
            </g>

            {/* Pulmonary Trunk & Veins */}
            <g opacity={systemFilter === 'systemic' ? 0.35 : 1}>
              {/* Pulmonary Artery (Blue to lungs) */}
              <path
                d="M 195 220 Q 170 215 145 230 M 195 220 Q 220 215 255 230"
                stroke="#0284C7"
                strokeWidth={activeId === 'pulmonary_artery' ? 4 : 2.5}
                fill="none"
                onClick={() => setActiveId('pulmonary_artery')}
                className="cursor-pointer"
              />
              {/* Pulmonary Veins (Red from lungs) */}
              <path
                d="M 150 245 Q 175 240 195 235 M 250 245 Q 225 240 205 235"
                stroke="#E11D48"
                strokeWidth={activeId === 'pulmonary_veins' ? 4 : 2.5}
                fill="none"
                onClick={() => setActiveId('pulmonary_veins')}
                className="cursor-pointer"
              />
            </g>

            {/* Heart Focal Center (Cor Humanum - Mediastinum) */}
            <g
              id="node-heart"
              onClick={() => setActiveId('heart')}
              className="cursor-pointer group"
            >
              {/* Aortic root & Pulmonary trunk stump */}
              <path d="M 194 212 C 194 198 206 195 214 204" stroke="#BE123C" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M 190 212 L 188 200" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" fill="none" />

              {/* Anatomical Heart Body with natural apex pointing to anatomical left */}
              <path
                d="M 188 214 
                   C 174 222 172 242 182 258 
                   C 192 274 204 282 214 286 
                   C 224 276 235 252 232 232 
                   C 230 216 214 212 202 214 
                   C 196 212 190 212 188 214 Z"
                fill="url(#torso-heart-grad)"
                stroke={activeId === 'heart' ? '#FFFFFF' : '#4C0519'}
                strokeWidth={activeId === 'heart' ? 2.5 : 1.2}
                className="transition-all duration-300 filter drop-shadow-md"
              />

              {/* Coronary sulcus and anterior descending artery (LAD) */}
              <path
                d="M 198 216 Q 204 246 213 284"
                stroke="#F43F5E"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M 201 234 Q 212 244 222 252" stroke="#F43F5E" strokeWidth="1" fill="none" />
              <path d="M 200 248 Q 192 258 186 266" stroke="#F43F5E" strokeWidth="1" fill="none" />
              <path d="M 199 224 Q 205 252 212 284" stroke="#38BDF8" strokeWidth="1" fill="none" opacity="0.8" />

              {/* Active selection pulse animation */}
              {activeId === 'heart' && (
                <circle cx="204" cy="246" r="38" stroke="#F43F5E" strokeWidth="1.5" fill="none" opacity="0.7">
                  <animate attributeName="r" values="30;46;30" dur="1.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.8;0;0.8" dur="1.4s" repeatCount="indefinite" />
                </circle>
              )}
            </g>

            {/* Anatomical Callout Badges with Precise Leader Lines (No Overlap with Body Silhouette) */}
            <g className="select-none font-sans">
              {/* 1. A. Carotis (Kepala & Leher) */}
              <g
                onClick={() => setActiveId('carotid_vessels')}
                className="cursor-pointer group transition-all"
              >
                <polyline
                  points="104,86 145,86 188,105"
                  fill="none"
                  stroke={activeId === 'carotid_vessels' ? '#E11D48' : '#94A3B8'}
                  strokeWidth={activeId === 'carotid_vessels' ? 1.8 : 1.2}
                  strokeDasharray={activeId === 'carotid_vessels' ? 'none' : '2.5 2'}
                />
                <circle cx="188" cy="105" r="3" fill="#E11D48" />
                <rect
                  x="12"
                  y="75"
                  width="92"
                  height="22"
                  rx="6"
                  fill={activeId === 'carotid_vessels' ? '#BE123C' : '#FFFFFF'}
                  stroke={activeId === 'carotid_vessels' ? '#881337' : '#E2E8F0'}
                  strokeWidth="1"
                  className="filter drop-shadow-xs dark:fill-slate-800 dark:stroke-slate-700"
                />
                <text
                  x="58"
                  y="89.5"
                  textAnchor="middle"
                  fill={activeId === 'carotid_vessels' ? '#FFFFFF' : '#0F172A'}
                  fontSize="9.5"
                  fontWeight="bold"
                  className="dark:fill-white"
                >
                  A. Carotis
                </text>
              </g>

              {/* 2. Paru Kanan (Pulmo Dexter - 3 Lobus) */}
              <g
                onClick={() => setActiveId('lungs')}
                className="cursor-pointer group transition-all"
              >
                <polyline
                  points="106,227 125,227 150,240"
                  fill="none"
                  stroke={activeId === 'lungs' ? '#E11D48' : '#94A3B8'}
                  strokeWidth={activeId === 'lungs' ? 1.8 : 1.2}
                  strokeDasharray={activeId === 'lungs' ? 'none' : '2.5 2'}
                />
                <circle cx="150" cy="240" r="3" fill="#BE123C" />
                <rect
                  x="12"
                  y="215"
                  width="94"
                  height="24"
                  rx="6"
                  fill={activeId === 'lungs' ? '#BE123C' : '#FFFFFF'}
                  stroke={activeId === 'lungs' ? '#881337' : '#E2E8F0'}
                  strokeWidth="1"
                  className="filter drop-shadow-xs dark:fill-slate-800 dark:stroke-slate-700"
                />
                <text
                  x="59"
                  y="227"
                  textAnchor="middle"
                  fill={activeId === 'lungs' ? '#FFFFFF' : '#0F172A'}
                  fontSize="9"
                  fontWeight="bold"
                  className="dark:fill-white"
                >
                  Paru Kanan
                </text>
                <text
                  x="59"
                  y="236"
                  textAnchor="middle"
                  fill={activeId === 'lungs' ? '#FECDD3' : '#64748B'}
                  fontSize="7.5"
                  fontWeight="medium"
                  className="dark:fill-slate-400"
                >
                  (3 Lobus)
                </text>
              </g>

              {/* 3. Vena Kava (V. Kava) */}
              <g
                onClick={() => setActiveId('vena_cava')}
                className="cursor-pointer group transition-all"
              >
                <polyline
                  points="102,349 145,349 191,335"
                  fill="none"
                  stroke={activeId === 'vena_cava' ? '#0284C7' : '#94A3B8'}
                  strokeWidth={activeId === 'vena_cava' ? 1.8 : 1.2}
                  strokeDasharray={activeId === 'vena_cava' ? 'none' : '2.5 2'}
                />
                <circle cx="191" cy="335" r="3" fill="#0284C7" />
                <rect
                  x="12"
                  y="338"
                  width="90"
                  height="22"
                  rx="6"
                  fill={activeId === 'vena_cava' ? '#0369A1' : '#FFFFFF'}
                  stroke={activeId === 'vena_cava' ? '#075985' : '#E2E8F0'}
                  strokeWidth="1"
                  className="filter drop-shadow-xs dark:fill-slate-800 dark:stroke-slate-700"
                />
                <text
                  x="57"
                  y="352.5"
                  textAnchor="middle"
                  fill={activeId === 'vena_cava' ? '#FFFFFF' : '#0F172A'}
                  fontSize="9.5"
                  fontWeight="bold"
                  className="dark:fill-white"
                >
                  Vena Kava
                </text>
              </g>

              {/* 4. V. Femoralis (Kaki Kanan / Tungkai) */}
              <g
                onClick={() => setActiveId('iliac_vessels')}
                className="cursor-pointer group transition-all"
              >
                <polyline
                  points="104,519 135,519 168,505"
                  fill="none"
                  stroke={activeId === 'iliac_vessels' ? '#0284C7' : '#94A3B8'}
                  strokeWidth={activeId === 'iliac_vessels' ? 1.8 : 1.2}
                  strokeDasharray={activeId === 'iliac_vessels' ? 'none' : '2.5 2'}
                />
                <circle cx="168" cy="505" r="3" fill="#0284C7" />
                <rect
                  x="12"
                  y="508"
                  width="92"
                  height="22"
                  rx="6"
                  fill={activeId === 'iliac_vessels' ? '#0369A1' : '#FFFFFF'}
                  stroke={activeId === 'iliac_vessels' ? '#075985' : '#E2E8F0'}
                  strokeWidth="1"
                  className="filter drop-shadow-xs dark:fill-slate-800 dark:stroke-slate-700"
                />
                <text
                  x="58"
                  y="522.5"
                  textAnchor="middle"
                  fill={activeId === 'iliac_vessels' ? '#FFFFFF' : '#0F172A'}
                  fontSize="9.5"
                  fontWeight="bold"
                  className="dark:fill-white"
                >
                  V. Femoralis
                </text>
              </g>

              {/* 5. Jantung (Cor Humanum - Mediastinum) */}
              <g
                onClick={() => setActiveId('heart')}
                className="cursor-pointer group transition-all"
              >
                <polyline
                  points="296,187 255,187 214,235"
                  fill="none"
                  stroke={activeId === 'heart' ? '#E11D48' : '#94A3B8'}
                  strokeWidth={activeId === 'heart' ? 1.8 : 1.2}
                  strokeDasharray={activeId === 'heart' ? 'none' : '2.5 2'}
                />
                <circle cx="214" cy="235" r="3" fill="#BE123C" />
                <rect
                  x="296"
                  y="175"
                  width="92"
                  height="24"
                  rx="6"
                  fill={activeId === 'heart' ? '#BE123C' : '#FFFFFF'}
                  stroke={activeId === 'heart' ? '#881337' : '#E2E8F0'}
                  strokeWidth="1"
                  className="filter drop-shadow-xs dark:fill-slate-800 dark:stroke-slate-700"
                />
                <text
                  x="342"
                  y="187"
                  textAnchor="middle"
                  fill={activeId === 'heart' ? '#FFFFFF' : '#0F172A'}
                  fontSize="9"
                  fontWeight="bold"
                  className="dark:fill-white"
                >
                  Jantung
                </text>
                <text
                  x="342"
                  y="196"
                  textAnchor="middle"
                  fill={activeId === 'heart' ? '#FECDD3' : '#64748B'}
                  fontSize="7.5"
                  fontWeight="medium"
                  className="dark:fill-slate-400"
                >
                  (Cor Humanum)
                </text>
              </g>

              {/* 6. Paru Kiri (Pulmo Sinister - 2 Lobus) */}
              <g
                onClick={() => setActiveId('lungs')}
                className="cursor-pointer group transition-all"
              >
                <polyline
                  points="296,257 275,257 250,240"
                  fill="none"
                  stroke={activeId === 'lungs' ? '#E11D48' : '#94A3B8'}
                  strokeWidth={activeId === 'lungs' ? 1.8 : 1.2}
                  strokeDasharray={activeId === 'lungs' ? 'none' : '2.5 2'}
                />
                <circle cx="250" cy="240" r="3" fill="#BE123C" />
                <rect
                  x="296"
                  y="245"
                  width="92"
                  height="24"
                  rx="6"
                  fill={activeId === 'lungs' ? '#BE123C' : '#FFFFFF'}
                  stroke={activeId === 'lungs' ? '#881337' : '#E2E8F0'}
                  strokeWidth="1"
                  className="filter drop-shadow-xs dark:fill-slate-800 dark:stroke-slate-700"
                />
                <text
                  x="342"
                  y="257"
                  textAnchor="middle"
                  fill={activeId === 'lungs' ? '#FFFFFF' : '#0F172A'}
                  fontSize="9"
                  fontWeight="bold"
                  className="dark:fill-white"
                >
                  Paru Kiri
                </text>
                <text
                  x="342"
                  y="266"
                  textAnchor="middle"
                  fill={activeId === 'lungs' ? '#FECDD3' : '#64748B'}
                  fontSize="7.5"
                  fontWeight="medium"
                  className="dark:fill-slate-400"
                >
                  (2 Lobus)
                </text>
              </g>

              {/* 7. Aorta Sistemik */}
              <g
                onClick={() => setActiveId('aorta')}
                className="cursor-pointer group transition-all"
              >
                <polyline
                  points="296,339 250,339 204,328"
                  fill="none"
                  stroke={activeId === 'aorta' ? '#E11D48' : '#94A3B8'}
                  strokeWidth={activeId === 'aorta' ? 1.8 : 1.2}
                  strokeDasharray={activeId === 'aorta' ? 'none' : '2.5 2'}
                />
                <circle cx="204" cy="328" r="3" fill="#BE123C" />
                <rect
                  x="296"
                  y="328"
                  width="92"
                  height="22"
                  rx="6"
                  fill={activeId === 'aorta' ? '#BE123C' : '#FFFFFF'}
                  stroke={activeId === 'aorta' ? '#881337' : '#E2E8F0'}
                  strokeWidth="1"
                  className="filter drop-shadow-xs dark:fill-slate-800 dark:stroke-slate-700"
                />
                <text
                  x="342"
                  y="342.5"
                  textAnchor="middle"
                  fill={activeId === 'aorta' ? '#FFFFFF' : '#0F172A'}
                  fontSize="9.5"
                  fontWeight="bold"
                  className="dark:fill-white"
                >
                  Aorta Sistemik
                </text>
              </g>

              {/* 8. A. Femoralis (Kaki Kiri / Tungkai) */}
              <g
                onClick={() => setActiveId('iliac_vessels')}
                className="cursor-pointer group transition-all"
              >
                <polyline
                  points="296,519 265,519 228,505"
                  fill="none"
                  stroke={activeId === 'iliac_vessels' ? '#E11D48' : '#94A3B8'}
                  strokeWidth={activeId === 'iliac_vessels' ? 1.8 : 1.2}
                  strokeDasharray={activeId === 'iliac_vessels' ? 'none' : '2.5 2'}
                />
                <circle cx="228" cy="505" r="3" fill="#BE123C" />
                <rect
                  x="296"
                  y="508"
                  width="92"
                  height="22"
                  rx="6"
                  fill={activeId === 'iliac_vessels' ? '#BE123C' : '#FFFFFF'}
                  stroke={activeId === 'iliac_vessels' ? '#881337' : '#E2E8F0'}
                  strokeWidth="1"
                  className="filter drop-shadow-xs dark:fill-slate-800 dark:stroke-slate-700"
                />
                <text
                  x="342"
                  y="522.5"
                  textAnchor="middle"
                  fill={activeId === 'iliac_vessels' ? '#FFFFFF' : '#0F172A'}
                  fontSize="9.5"
                  fontWeight="bold"
                  className="dark:fill-white"
                >
                  A. Femoralis
                </text>
              </g>
            </g>
          </svg>
        </div>

        {/* Right: Anatomical & Clinical Information Card */}
        <div className="lg:col-span-6 space-y-5">
          {currentNode ? (
            <motion.div
              key={currentNode.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      currentNode.oxygenated
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                    }`}
                  >
                    <Droplets size={11} className="inline mr-1" />
                    {currentNode.oxygenated ? 'Kaya Oksigen (O₂)' : 'Deoksigenasi (Kaya CO₂)'}
                  </span>
                  <span className="text-xs italic text-slate-400 font-serif">
                    {currentNode.latin}
                  </span>
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                  {currentNode.name}
                </h4>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentNode.description}
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-1">
                  <Activity size={14} className="text-rose-600" />
                  Keterangan Klinis & Fisiologis:
                </p>
                <p className="leading-relaxed">{currentNode.clinicalNote}</p>
              </div>

              {/* Quick organ navigation buttons */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Pilih Organ / Pembuluh Lain:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {Object.values(anatomicalData).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveId(item.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
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
        </div>
      </div>
    </div>
  )
}
