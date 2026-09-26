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

            {/* Interactive Anatomical Callout Labels On Diagram */}
            <g className="text-[10px] font-bold font-sans select-none">
              <text
                x="90"
                y="110"
                fill="#0F172A"
                className="cursor-pointer dark:fill-white"
                onClick={() => setActiveId('carotid_vessels')}
              >
                A. Carotis →
              </text>
              <text
                x="65"
                y="235"
                fill="#0F172A"
                className="cursor-pointer dark:fill-white"
                onClick={() => setActiveId('lungs')}
              >
                Paru Kanan →
              </text>
              <text
                x="285"
                y="235"
                fill="#0F172A"
                className="cursor-pointer dark:fill-white"
                onClick={() => setActiveId('heart')}
              >
                ← Jantung
              </text>
              <text
                x="285"
                y="330"
                fill="#0F172A"
                className="cursor-pointer dark:fill-white"
                onClick={() => setActiveId('aorta')}
              >
                ← Aorta
              </text>
              <text
                x="70"
                y="350"
                fill="#0F172A"
                className="cursor-pointer dark:fill-white"
                onClick={() => setActiveId('vena_cava')}
              >
                V. Kava →
              </text>
              <text
                x="240"
                y="520"
                fill="#0F172A"
                className="cursor-pointer dark:fill-white"
                onClick={() => setActiveId('iliac_vessels')}
              >
                ← A. Femoralis
              </text>
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
