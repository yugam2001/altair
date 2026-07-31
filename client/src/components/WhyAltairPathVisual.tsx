/** Scattered sources converging into one guided path */
export default function WhyAltairPathVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden rounded-2xl border border-blue-400/12 bg-[#0a1224]/88 p-6 shadow-[0_16px_48px_rgba(15,23,42,0.16),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl sm:p-7"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nebula-teal/50 to-transparent" />
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-nebula-teal/70">
        From chaos to clarity
      </p>

      <svg viewBox="0 0 360 140" fill="none" className="mt-5 w-full" aria-hidden="true">
        {/* Scattered source nodes */}
        {[
          [36, 28], [78, 52], [54, 88], [96, 24], [24, 72], [108, 68], [66, 108],
        ].map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="5" fill="#334155" fillOpacity="0.55" />
            <circle cx={cx} cy={cy} r="2" fill="#64748b" fillOpacity="0.8" />
          </g>
        ))}

        {/* Converging paths */}
        <path
          d="M36 28 C120 40, 180 55, 280 70"
          stroke="url(#pathGrad1)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
        <path
          d="M78 52 C150 58, 210 62, 280 70"
          stroke="url(#pathGrad2)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
        <path
          d="M54 88 C140 78, 210 72, 280 70"
          stroke="url(#pathGrad3)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
        <path
          d="M96 24 C170 42, 230 58, 280 70"
          stroke="#14b8a6"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.35"
        />

        {/* Destination — ALTAIR star */}
        <path
          d="M280 62 L283.5 70 L292 72 L283.5 74 L280 82 L276.5 74 L268 72 L276.5 70 Z"
          fill="#14b8a6"
        />
        <circle cx="280" cy="72" r="1.5" fill="white" fillOpacity="0.9" />

        {/* Roadmap card hint */}
        <rect
          x="300"
          y="52"
          width="48"
          height="40"
          rx="6"
          fill="#081020"
          stroke="#14b8a6"
          strokeOpacity="0.25"
          strokeWidth="0.8"
        />
        <line x1="308" y1="62" x2="340" y2="62" stroke="#14b8a6" strokeOpacity="0.5" strokeWidth="1.2" />
        <line x1="308" y1="70" x2="332" y2="70" stroke="#64748b" strokeOpacity="0.5" strokeWidth="1" />
        <line x1="308" y1="78" x2="336" y2="78" stroke="#64748b" strokeOpacity="0.4" strokeWidth="1" />

        <defs>
          <linearGradient id="pathGrad1" x1="36" y1="28" x2="280" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor="#64748b" stopOpacity="0.4" />
            <stop offset="1" stopColor="#14b8a6" />
          </linearGradient>
          <linearGradient id="pathGrad2" x1="78" y1="52" x2="280" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor="#64748b" stopOpacity="0.4" />
            <stop offset="1" stopColor="#14b8a6" />
          </linearGradient>
          <linearGradient id="pathGrad3" x1="54" y1="88" x2="280" y2="70" gradientUnits="userSpaceOnUse">
            <stop stopColor="#64748b" stopOpacity="0.4" />
            <stop offset="1" stopColor="#14b8a6" />
          </linearGradient>
        </defs>
      </svg>

      <div className="mt-4 flex items-center justify-between gap-4 text-[11px]">
        <span className="text-blue-200/45">Scattered sources</span>
        <span className="text-nebula-teal/80">One clear roadmap</span>
      </div>
    </div>
  )
}
