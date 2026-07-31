import { memo, useMemo } from 'react'

function createRng(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const DOTS = (() => {
  const rng = createRng(41)
  return Array.from({ length: 10 }, (_, id) => ({
    id,
    x: 6 + rng() * 88,
    y: 8 + rng() * 84,
    r: 1 + rng() * 1.2,
    opacity: 0.12 + rng() * 0.18,
  }))
})()

const LINES = [
  { x1: 14, y1: 18, x2: 28, y2: 24 },
  { x1: 52, y1: 12, x2: 68, y2: 20 },
  { x1: 78, y1: 32, x2: 90, y2: 28 },
  { x1: 22, y1: 72, x2: 38, y2: 65 },
  { x1: 58, y1: 78, x2: 72, y2: 70 },
] as const

const VisionBackground = memo(function VisionBackground() {
  const dots = useMemo(() => DOTS, [])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(20,184,166,0.07),transparent_68%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_85%_75%,rgba(15,23,42,0.04),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_12%_60%,rgba(250,204,21,0.04),transparent_55%)]" />

      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {LINES.map((line, index) => (
          <line
            key={index}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke="rgba(20,184,166,0.12)"
            strokeWidth="0.75"
          />
        ))}
        {dots.map((dot) => (
          <circle
            key={dot.id}
            cx={`${dot.x}%`}
            cy={`${dot.y}%`}
            r={dot.r}
            fill={`rgba(20,184,166,${dot.opacity})`}
          />
        ))}
      </svg>
    </div>
  )
})

export default VisionBackground
