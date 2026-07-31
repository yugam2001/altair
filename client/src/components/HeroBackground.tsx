import { memo, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

function createRng(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const DOTS = (() => {
  const rng = createRng(17)
  return Array.from({ length: 16 }, (_, id) => ({
    id,
    x: 8 + rng() * 84,
    y: 10 + rng() * 80,
    size: 1.5 + rng() * 2,
    opacity: 0.18 + rng() * 0.22,
    delay: rng() * 4,
    duration: 4 + rng() * 4,
    tint: id % 3 === 0 ? 'teal' : id % 5 === 0 ? 'navy' : 'gold',
  }))
})()

const LINES = [
  { x1: 12, y1: 22, x2: 28, y2: 18 },
  { x1: 72, y1: 35, x2: 88, y2: 28 },
  { x1: 45, y1: 78, x2: 62, y2: 68 },
  { x1: 18, y1: 55, x2: 34, y2: 48 },
] as const

const PARTICLES = (() => {
  const rng = createRng(91)
  return Array.from({ length: 8 }, (_, id) => ({
    id,
    x: 10 + rng() * 80,
    y: 15 + rng() * 70,
    size: 2 + rng() * 2.5,
    dx: (rng() - 0.5) * 14,
    dy: (rng() - 0.5) * 12,
    duration: 8 + rng() * 6,
    delay: rng() * 3,
  }))
})()

const DOT_COLORS = {
  teal: 'bg-nebula-teal/35',
  navy: 'bg-midnight-blue/25',
  gold: 'bg-star-gold/30',
} as const

const HeroBackground = memo(function HeroBackground() {
  const prefersReducedMotion = useReducedMotion()
  const dots = useMemo(() => DOTS, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Teal wash — left / headline area */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_20%,rgba(20,184,166,0.14),transparent_65%)]" />

      {/* Navy wash — right / mockup area */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_88%_45%,rgba(15,23,42,0.07),transparent_60%)]" />

      {/* Soft center bridge */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,rgba(20,184,166,0.06),transparent_70%)]" />

      {/* Top highlight */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/50 to-transparent" />

      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {LINES.map((line, index) => (
          <line
            key={index}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke="rgba(20,184,166,0.12)"
            strokeWidth="0.5"
          />
        ))}
      </svg>

      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className={`absolute rounded-full ${DOT_COLORS[dot.tint as keyof typeof DOT_COLORS]}`}
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
          }}
          animate={
            prefersReducedMotion
              ? { opacity: dot.opacity }
              : { opacity: [dot.opacity * 0.55, dot.opacity, dot.opacity * 0.55] }
          }
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {PARTICLES.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-nebula-teal/25"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [0, particle.dx, 0],
                  y: [0, particle.dy, 0],
                  opacity: [0.2, 0.45, 0.2],
                }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
})

export default HeroBackground
