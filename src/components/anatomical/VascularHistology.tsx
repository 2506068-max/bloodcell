import { useState } from 'react'
import { Layers, Eye } from 'lucide-react'

export type VesselKind = 'artery' | 'vein' | 'capillary'

export default function VascularHistology() {
  const [activeVessel, setActiveVessel] = useState<VesselKind>('artery')
  const [inspectedLayer, setInspectedLayer] = useState<string | null>(null)

  const vesselData = {
    artery: {
      name: 'Arteri Sistemik (Muskular & Elastis)',
      latin: 'Arteria Systemica',
      pressure: 'Tinggi (120 / 80 mmHg)',
      velocity: 'Cepat (40 – 50 cm/detik di Aorta)',
      wallThickness: 'Tebal & Sangat Elastis (~1.0 mm)',
      description: 'Menyalurkan darah bertekanan tinggi dari jantung ke jaringan perifer. Dindingnya yang berotot tebal mampu menahan lonjakan denyut sistolik.',
      layers: [
        {
          id: 'adventitia',
          name: 'Tunika Adventisia (Lapisan Luar)',
          detail: 'Serat kolagen tipe I dan elastin yang menyatu dengan jaringan ikat sekitar, dilengkapi vasa vasorum (pembuluh mikro penyuplai dinding pembuluh).',
        },
        {
          id: 'media',
          name: 'Tunika Media (Otot Polos & Serat Elastis)',
          detail: 'Lapisan paling dominan pada arteri, tersusun dari berlapis-lapis sel otot polos sirkular dan membran elastika interna/eksterna untuk vasokonstriksi & vasodilatasi.',
        },
        {
          id: 'intima',
          name: 'Tunika Intima (Endotelium Vaskular)',
          detail: 'Selapis sel endotel pipih yang sangat licin di atas membran basal tipis, mencegah turbulensi darah dan mensekresikan Nitrit Oksida (NO).',
        },
      ],
    },
    vein: {
      name: 'Vena Sistemik (Pembuluh Balik dengan Katup)',
      latin: 'Vena Systemica cum Valvulis',
      pressure: 'Sangat Rendah (2 – 8 mmHg)',
      velocity: 'Lambat (10 – 15 cm/detik)',
      wallThickness: 'Tipis & Mudah Regang (~0.5 mm)',
      description: 'Menampung sekitar 65% dari total volume darah tubuh (reservoir kapasitansi). Alirannya dibantu oleh pompa otot rangka dan katup vena satu arah.',
      layers: [
        {
          id: 'valves',
          name: 'Katup Vena (Valvula Venosa)',
          detail: 'Lipatan semilunar tunika intima yang hanya mengizinkan aliran darah satu arah menuju jantung dan mencegah refluks akibat gravitasi bumi.',
        },
        {
          id: 'adventitia',
          name: 'Tunika Adventisia',
          detail: 'Lapisan paling tebal pada vena, terdiri dari serat kolagen longitudinal yang memberikan kekuatan struktural terhadap tarikan mekanik.',
        },
        {
          id: 'media',
          name: 'Tunika Media Tipis',
          detail: 'Hanya memiliki sedikit lapisan otot polos dibanding arteri, membuat lumen vena tampak lebar dan berbentuk oval kolaps saat kosong.',
        },
      ],
    },
    capillary: {
      name: 'Mikrosirkulasi Kapiler (Tempat Pertukaran Zat)',
      latin: 'Vasa Capillaria',
      pressure: 'Rendah (15 – 35 mmHg)',
      velocity: 'Paling Lambat (< 0.1 cm/detik)',
      wallThickness: 'Ultra-Tipis (~0.5 – 1.0 µm, 1 lapis sel)',
      description: 'Anyaman mikroskopis berdiameter 5-9 µm di mana sel darah merah lewat satu per satu (single file) sehingga difusi oksigen, nutrisi, dan CO₂ berjalan sempurna.',
      layers: [
        {
          id: 'endothelium',
          name: 'Sel Endotel Tunggal',
          detail: 'Dinding tipis tanpa otot polos atau jaringan adventisia. Celah antar-sel (intercellular clefts) memungkinkan filtrasi cairan plasma dan leukosit.',
        },
        {
          id: 'basement',
          name: 'Membran Basal (Lamina Basalis)',
          detail: 'Matriks ekstraseluler protein dan glikoprotein tipis yang menopang sel endotel kapiler.',
        },
      ],
    },
  }

  const current = vesselData[activeVessel]

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      {/* Vessel Type Switcher */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {(['artery', 'vein', 'capillary'] as const).map((key) => {
          const isAct = activeVessel === key
          return (
            <button
              key={key}
              onClick={() => {
                setActiveVessel(key)
                setInspectedLayer(null)
              }}
              className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-3 ${
                isAct
                  ? key === 'artery'
                    ? 'bg-rose-700 text-white shadow-lg shadow-rose-900/20 ring-2 ring-rose-500/40'
                    : key === 'vein'
                      ? 'bg-sky-700 text-white shadow-lg shadow-sky-900/20 ring-2 ring-sky-500/40'
                      : 'bg-purple-700 text-white shadow-lg shadow-purple-900/20 ring-2 ring-purple-500/40'
                  : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              <span
                className={`w-3.5 h-3.5 rounded-full ${
                  key === 'artery'
                    ? 'bg-rose-500'
                    : key === 'vein'
                      ? 'bg-sky-400'
                      : 'bg-purple-400'
                }`}
              />
              <div className="text-left">
                <p className="leading-tight font-extrabold">
                  {key === 'artery' ? 'Arteri' : key === 'vein' ? 'Vena' : 'Kapiler'}
                </p>
                <p className="text-[10px] font-normal opacity-85">
                  {key === 'artery' ? 'Dinding Tebal & Berotot' : key === 'vein' ? 'Lumen Lebar + Katup' : 'Dinding 1 Sel Mikro'}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Main Histology Card */}
      <div className="w-full bg-white/95 dark:bg-slate-900/95 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl backdrop-blur-xl p-6 sm:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Histological Cross Section SVG */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 border border-slate-200/60 dark:border-slate-800 shadow-inner">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Eye size={12} className="text-rose-500" />
              Penampang Melintang Histologi
            </span>

            <div className="relative w-full max-w-[320px] h-[320px] flex items-center justify-center">
              {activeVessel === 'artery' && <ArteryCrossSection inspectedLayer={inspectedLayer} />}
              {activeVessel === 'vein' && <VeinCrossSection inspectedLayer={inspectedLayer} />}
              {activeVessel === 'capillary' && <CapillaryCrossSection inspectedLayer={inspectedLayer} />}
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3 text-center">
              Arahkan kursor pada lapisan tunika untuk mempelajari arsitektur jaringannya
            </p>
          </div>

          {/* Clinical & Histological Data */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    activeVessel === 'artery'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : activeVessel === 'vein'
                        ? 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300'
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                  }`}
                >
                  Histologi Vaskular
                </span>
                <span className="text-xs italic text-slate-400 font-serif">{current.latin}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {current.name}
              </h3>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {current.description}
            </p>

            {/* Quick Biological Metrics */}
            <div className="grid grid-cols-3 gap-2.5 py-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Tekanan Darah</p>
                <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{current.pressure}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Kecepatan Aliran</p>
                <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{current.velocity}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] text-slate-400 font-semibold uppercase">Tebal Dinding</p>
                <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{current.wallThickness}</p>
              </div>
            </div>

            {/* Layers List */}
            <div className="space-y-2 pt-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers size={13} className="text-slate-500" />
                Lapisan Dinding Pembuluh:
              </p>
              {current.layers.map((layer) => (
                <div
                  key={layer.id}
                  onMouseEnter={() => setInspectedLayer(layer.id)}
                  onMouseLeave={() => setInspectedLayer(null)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    inspectedLayer === layer.id
                      ? 'border-rose-400 bg-rose-50/60 dark:border-rose-800 dark:bg-rose-950/40 shadow-sm'
                      : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                    {layer.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {layer.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ArteryCrossSection({ inspectedLayer }: { inspectedLayer: string | null }) {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full filter drop-shadow-md">
      <defs>
        <radialGradient id="art-adventitia" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="#FDA4AF" />
          <stop offset="100%" stopColor="#F43F5E" />
        </radialGradient>
        <radialGradient id="art-media" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#BE123C" />
          <stop offset="100%" stopColor="#881337" />
        </radialGradient>
        <radialGradient id="art-lumen" cx="40%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FFF1F2" />
          <stop offset="100%" stopColor="#FFE4E6" />
        </radialGradient>
      </defs>

      {/* Tunica Adventitia (Outer connective layer) */}
      <circle
        cx="150"
        cy="150"
        r="135"
        fill="url(#art-adventitia)"
        stroke="#E11D48"
        strokeWidth={inspectedLayer === 'adventitia' ? 4 : 1.5}
        opacity={inspectedLayer === 'adventitia' ? 1 : 0.85}
      />
      {/* Collagen fiber texture */}
      <circle cx="150" cy="150" r="128" fill="none" stroke="#FB7185" strokeWidth="1" strokeDasharray="3,3" />

      {/* Tunica Media (Thick concentric smooth muscle) */}
      <circle
        cx="150"
        cy="150"
        r="115"
        fill="url(#art-media)"
        stroke="#4C0519"
        strokeWidth={inspectedLayer === 'media' ? 4 : 2}
        opacity={inspectedLayer === 'media' ? 1 : 0.95}
      />
      {/* Internal Elastic Lamina ripple */}
      <circle cx="150" cy="150" r="68" fill="none" stroke="#FDE047" strokeWidth="2" strokeDasharray="4,2" />

      {/* Tunica Intima (Smooth Endothelium) */}
      <circle
        cx="150"
        cy="150"
        r="65"
        fill="url(#art-lumen)"
        stroke="#F43F5E"
        strokeWidth={inspectedLayer === 'intima' ? 4 : 1.5}
      />

      {/* Lumen containing flowing erythrocytes in cross-section */}
      <circle cx="135" cy="140" r="14" fill="#E11D48" stroke="#9F1239" strokeWidth="1.5" />
      <circle cx="135" cy="140" r="6" fill="#881337" opacity="0.6" />

      <circle cx="165" cy="155" r="13" fill="#E11D48" stroke="#9F1239" strokeWidth="1.5" />
      <circle cx="165" cy="155" r="5" fill="#881337" opacity="0.6" />

      <circle cx="150" cy="170" r="12" fill="#E11D48" stroke="#9F1239" strokeWidth="1.5" />
      <circle cx="150" cy="170" r="5" fill="#881337" opacity="0.6" />

      <text x="150" y="105" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">
        Tunika Media (Otot Tebal)
      </text>
    </svg>
  )
}

function VeinCrossSection({ inspectedLayer }: { inspectedLayer: string | null }) {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full filter drop-shadow-md">
      <defs>
        <radialGradient id="vein-adventitia" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="#BAE6FD" />
          <stop offset="100%" stopColor="#38BDF8" />
        </radialGradient>
        <radialGradient id="vein-media" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </radialGradient>
        <radialGradient id="vein-lumen" cx="40%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#F0F9FF" />
          <stop offset="100%" stopColor="#E0F2FE" />
        </radialGradient>
      </defs>

      {/* Tunica Adventitia (Irregular, compressible shape) */}
      <path
        d="M 150 15 C 240 20 285 70 280 150 C 275 230 230 280 150 285 C 70 280 20 230 25 150 C 30 70 70 18 150 15 Z"
        fill="url(#vein-adventitia)"
        stroke="#0284C7"
        strokeWidth={inspectedLayer === 'adventitia' ? 4 : 1.5}
      />

      {/* Tunica Media (Much thinner than artery) */}
      <path
        d="M 150 35 C 225 40 260 80 255 150 C 250 215 210 260 150 265 C 85 260 45 215 50 150 C 55 80 85 38 150 35 Z"
        fill="url(#vein-media)"
        stroke="#0C4A6E"
        strokeWidth={inspectedLayer === 'media' ? 4 : 1.5}
      />

      {/* Wide Lumen */}
      <path
        d="M 150 50 C 210 55 240 90 235 150 C 230 205 195 245 150 250 C 100 245 65 205 70 150 C 75 90 100 52 150 50 Z"
        fill="url(#vein-lumen)"
        stroke="#38BDF8"
        strokeWidth="1.5"
      />

      {/* Bicuspid Venous Valve Flaps (Katup Vena) */}
      <g stroke="#0369A1" strokeWidth={inspectedLayer === 'valves' ? 4 : 2.5} fill="#E0F2FE">
        <path d="M 72 150 Q 120 165 148 150" />
        <path d="M 233 150 Q 185 165 152 150" />
      </g>
      <text x="150" y="175" textAnchor="middle" fill="#0369A1" fontSize="10" fontWeight="bold">
        Katup Vena Satu Arah
      </text>

      {/* Passing blood cells */}
      <circle cx="120" cy="115" r="11" fill="#BE123C" opacity="0.8" />
      <circle cx="170" cy="105" r="10" fill="#BE123C" opacity="0.8" />
      <circle cx="150" cy="85" r="12" fill="#BE123C" opacity="0.8" />
    </svg>
  )
}

function CapillaryCrossSection({ inspectedLayer }: { inspectedLayer: string | null }) {
  return (
    <svg viewBox="0 0 300 300" className="w-full h-full filter drop-shadow-md">
      <defs>
        <radialGradient id="cap-cell" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#F3E8FF" />
          <stop offset="70%" stopColor="#D8B4FE" />
          <stop offset="100%" stopColor="#9333EA" />
        </radialGradient>
      </defs>

      {/* Basement membrane */}
      <circle
        cx="150"
        cy="150"
        r="110"
        fill="none"
        stroke="#A855F7"
        strokeWidth={inspectedLayer === 'basement' ? 4 : 2}
        strokeDasharray="4,3"
      />

      {/* Single Endothelial Cell Layer wrapping around */}
      <circle
        cx="150"
        cy="150"
        r="100"
        fill="#FAF5FF"
        stroke="#7E22CE"
        strokeWidth={inspectedLayer === 'endothelium' ? 5 : 3}
      />

      {/* Endothelial Cell Nucleus bulging into lumen */}
      <ellipse cx="150" cy="55" rx="35" ry="16" fill="url(#cap-cell)" stroke="#6B21A8" strokeWidth="2" />
      <ellipse cx="150" cy="55" rx="16" ry="8" fill="#581C87" />

      {/* Intercellular Cleft (Permeability slit) */}
      <line x1="245" y1="120" x2="252" y2="125" stroke="#FFFFFF" strokeWidth="4" />

      {/* Single Erythrocyte squeezing through (Single file capillary transit) */}
      <ellipse cx="150" cy="150" rx="65" ry="50" fill="#E11D48" stroke="#9F1239" strokeWidth="2" />
      <ellipse cx="150" cy="150" rx="30" ry="22" fill="#881337" opacity="0.65" />

      <text x="150" y="215" textAnchor="middle" fill="#7E22CE" fontSize="10" fontWeight="bold">
        Eritrosit Lewat Satu per Satu (Single File)
      </text>
    </svg>
  )
}
