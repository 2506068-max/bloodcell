import { useState } from 'react'
import { Wind, Droplet, Play, Pause } from 'lucide-react'

export default function EnhancedBloodFlowDiagram() {
  const [activeCircuit, setActiveCircuit] = useState<'both' | 'pulmonary' | 'systemic'>('both')
  const [isPlaying, setIsPlaying] = useState<boolean>(true)

  return (
    <div className="w-full rounded-3xl border border-slate-200/90 bg-white/95 p-6 sm:p-10 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95 overflow-hidden">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5 mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Fisiologi Hemodinamika
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Sirkuit Aliran Darah Pulmonal & Sistemik
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Circuit Tabs */}
          <div className="flex rounded-full border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-50 dark:bg-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveCircuit('both')}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                activeCircuit === 'both'
                  ? 'bg-rose-700 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Kedua Sirkuit
            </button>
            <button
              onClick={() => setActiveCircuit('pulmonary')}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                activeCircuit === 'pulmonary'
                  ? 'bg-rose-700 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Peredaran Darah Kecil
            </button>
            <button
              onClick={() => setActiveCircuit('systemic')}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                activeCircuit === 'systemic'
                  ? 'bg-rose-700 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Peredaran Darah Besar
            </button>
          </div>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium flex items-center gap-1"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
        </div>
      </div>

      {/* Main Flow SVG Viewport */}
      <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border border-slate-200/60 dark:border-slate-800/80 p-4">
        <svg viewBox="0 0 1000 480" className="w-full h-auto select-none">
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
              d="M 380 40 C 440 20 560 20 620 40 C 650 60 650 110 610 130 C 550 145 450 145 390 130 C 350 110 350 60 380 40 Z"
              fill="rgba(244, 114, 182, 0.12)"
              stroke="#F472B6"
              strokeWidth="1.5"
            />
            {/* Alveolar capillary mesh */}
            <g stroke="#9333EA" strokeWidth="1" opacity="0.35" fill="none">
              <path d="M 420 50 Q 500 80 580 50" />
              <path d="M 400 85 Q 500 115 600 85" />
              <path d="M 440 70 Q 500 60 560 70" />
            </g>

            <text x="500" y="75" textAnchor="middle" fill="#BE123C" fontSize="13" fontWeight="bold">
              Kapiler Alveolus Paru-Paru (Pulmo)
            </text>
            <text x="500" y="95" textAnchor="middle" fill="#64748B" fontSize="10">
              Pertukaran Gas: O₂ Masuk ke Darah • CO₂ Dikeluarkan ke Udara
            </text>

            {/* Pulmonary Arteries (Blue - Upward from Right Ventricle to Lungs) */}
            <path
              d="M 460 210 C 460 160 440 140 440 130"
              stroke="url(#pulmonary-artery-grad)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            {/* Flow particle */}
            {isPlaying && (
              <circle cx="450" cy="170" r="4.5" fill="#38BDF8">
                <animate attributeName="cy" values="210;130" dur="2s" repeatCount="indefinite" />
              </circle>
            )}

            {/* Pulmonary Veins (Red - Downward from Lungs to Left Atrium) */}
            <path
              d="M 560 130 C 560 140 540 160 540 210"
              stroke="url(#pulmonary-vein-grad)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            {/* Flow particle */}
            {isPlaying && (
              <circle cx="550" cy="170" r="4.5" fill="#FDA4AF">
                <animate attributeName="cy" values="130;210" dur="2s" repeatCount="indefinite" />
              </circle>
            )}

            <text x="375" y="175" fill="#0284C7" fontSize="10" fontWeight="bold">
              A. Pulmonalis (Miskin O₂) ↑
            </text>
            <text x="565" y="175" fill="#BE123C" fontSize="10" fontWeight="bold">
              ↓ V. Pulmonalis (Kaya O₂)
            </text>
          </g>

          {/* ===== 2. MIDDLE SECTION: CENTRAL 4-CHAMBER ANATOMICAL HEART ===== */}
          <g transform="translate(375, 190)">
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
            <text x="62" y="32" textAnchor="middle" fill="#0369A1" fontSize="11" fontWeight="bold">
              Atrium Kanan (RA)
            </text>
            <text x="62" y="47" textAnchor="middle" fill="#0284C7" fontSize="9">
              Terima CO₂ dari Tubuh
            </text>

            {/* Left Atrium (Kaya O2) */}
            <rect x="131" y="6" width="113" height="60" rx="18" fill="#FFE4E6" opacity="0.6" />
            <text x="187" y="32" textAnchor="middle" fill="#9F1239" fontSize="11" fontWeight="bold">
              Atrium Kiri (LA)
            </text>
            <text x="187" y="47" textAnchor="middle" fill="#BE123C" fontSize="9">
              Terima O₂ dari Paru
            </text>

            {/* Right Ventricle (Pompa ke Paru) */}
            <rect x="6" y="74" width="113" height="60" rx="18" fill="#BAE6FD" opacity="0.6" />
            <text x="62" y="100" textAnchor="middle" fill="#0369A1" fontSize="11" fontWeight="bold">
              Ventrikel Kanan (RV)
            </text>
            <text x="62" y="115" textAnchor="middle" fill="#0284C7" fontSize="9">
              Pompa ke Paru-Paru
            </text>

            {/* Left Ventricle (Pompa ke Seluruh Tubuh) */}
            <rect x="131" y="74" width="113" height="60" rx="18" fill="#FDA4AF" opacity="0.6" />
            <text x="187" y="100" textAnchor="middle" fill="#9F1239" fontSize="11" fontWeight="bold">
              Ventrikel Kiri (LV)
            </text>
            <text x="187" y="115" textAnchor="middle" fill="#BE123C" fontSize="9">
              Pompa Sistemik (Aorta)
            </text>
          </g>

          {/* ===== 3. LOWER SECTION: SYSTEMIC CAPILLARY BED (ORGAN & JARINGAN TUBUH) ===== */}
          <g opacity={activeCircuit === 'pulmonary' ? 0.25 : 1} className="transition-opacity duration-300">
            {/* Aorta Downward (Red - Ventricle Left to Systemic Organs) */}
            <path
              d="M 560 330 C 560 370 540 390 540 400"
              stroke="url(#systemic-aorta-grad)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            {/* Flow particle */}
            {isPlaying && (
              <circle cx="550" cy="365" r="4.5" fill="#FDA4AF">
                <animate attributeName="cy" values="330;400" dur="2s" repeatCount="indefinite" />
              </circle>
            )}

            {/* Vena Cava Upward (Blue - Systemic Organs to Right Atrium) */}
            <path
              d="M 440 400 C 440 390 460 370 460 330"
              stroke="url(#systemic-vena-grad)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            {/* Flow particle */}
            {isPlaying && (
              <circle cx="450" cy="365" r="4.5" fill="#38BDF8">
                <animate attributeName="cy" values="400;330" dur="2s" repeatCount="indefinite" />
              </circle>
            )}

            <text x="565" y="370" fill="#BE123C" fontSize="10" fontWeight="bold">
              ↓ Aorta (Kaya O₂ ke Tubuh)
            </text>
            <text x="360" y="370" fill="#0284C7" fontSize="10" fontWeight="bold">
              Vena Kava (Miskin O₂) ↑
            </text>

            {/* Systemic Capillary Bed (Tissue Organs) */}
            <path
              d="M 380 400 C 440 380 560 380 620 400 C 650 420 650 460 610 470 C 550 480 450 480 390 470 C 350 460 350 420 380 400 Z"
              fill="rgba(147, 51, 234, 0.08)"
              stroke="#A855F7"
              strokeWidth="1.5"
            />
            <text x="500" y="430" textAnchor="middle" fill="#7E22CE" fontSize="13" fontWeight="bold">
              Jaringan Tubuh & Mikrosirkulasi Sistemik
            </text>
            <text x="500" y="448" textAnchor="middle" fill="#64748B" fontSize="10">
              O₂ & Nutrisi Diterima Sel • CO₂ & Limbah Metabolisme Diangkut Vena
            </text>
          </g>

          {/* Legend Details in SVG corners */}
          <g transform="translate(40, 40)" className="text-[11px]">
            <rect width="180" height="90" rx="12" fill="rgba(255,255,255,0.9)" stroke="#E2E8F0" className="dark:fill-slate-900/90 dark:stroke-slate-800" />
            <text x="15" y="24" fontWeight="bold" fill="#0F172A" className="dark:fill-white">
              Sirkulasi Pulmonal:
            </text>
            <text x="15" y="44" fill="#0284C7">1. RV memompa darah CO₂</text>
            <text x="15" y="60" fill="#0284C7">2. Paru mengoksigenasi</text>
            <text x="15" y="76" fill="#BE123C">3. Darah O₂ masuk LA</text>
          </g>

          <g transform="translate(780, 40)" className="text-[11px]">
            <rect width="180" height="90" rx="12" fill="rgba(255,255,255,0.9)" stroke="#E2E8F0" className="dark:fill-slate-900/90 dark:stroke-slate-800" />
            <text x="15" y="24" fontWeight="bold" fill="#0F172A" className="dark:fill-white">
              Sirkulasi Sistemik:
            </text>
            <text x="15" y="44" fill="#BE123C">1. LV memompa ke Aorta</text>
            <text x="15" y="60" fill="#BE123C">2. Sel jaringan ambil O₂</text>
            <text x="15" y="76" fill="#0284C7">3. Vena Kava bawa CO₂ ke RA</text>
          </g>
        </svg>
      </div>

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
