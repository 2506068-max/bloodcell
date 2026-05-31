export default function BloodFlowDiagram() {
  return (
    <div className="w-full bg-white/80 rounded-3xl p-6 shadow-lg">
      <svg viewBox="0 0 800 240" className="w-full h-60">
        <defs>
          <linearGradient id="glow" x1="0" x2="1">
            <stop offset="0%" stopColor="#FF8FA3" />
            <stop offset="50%" stopColor="#4ECDC4" />
            <stop offset="100%" stopColor="#BDB2FF" />
          </linearGradient>
        </defs>

        <path d="M20 120 C150 10, 300 10, 420 120 S650 230, 780 120" stroke="url(#glow)" strokeWidth="6" fill="none" strokeLinecap="round" className="opacity-90" />

        <circle r="8" fill="#FF4D6D">
          <animateMotion dur="6s" repeatCount="indefinite">
            <mpath xlinkHref="#path1" />
          </animateMotion>
        </circle>

        <path id="path1" d="M20 120 C150 10, 300 10, 420 120 S650 230, 780 120" fill="none" />

        <g className="text-sm text-slate-700">
          <text x="40" y="40">Paru-paru</text>
          <text x="360" y="40">Jantung</text>
          <text x="700" y="40">Seluruh Tubuh</text>
        </g>
      </svg>
    </div>
  )
}
