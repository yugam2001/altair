import { memo, useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

// ─── Types ───────────────────────────────────────────────────────────────────

interface Star {
  id: number
  x: number
  y: number
  size: number
  baseOpacity: number
  delay: number
  duration: number
  animType: 'fade' | 'scale' | 'glow'
  tint: 'teal' | 'gold' | 'blue'
}

interface ConstellationLine {
  id: string
  x1: number
  y1: number
  x2: number
  y2: number
  order: number
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  dx: number
  dy: number
  duration: number
  delay: number
}

interface BrightDot {
  id: number
  x: number
  y: number
  size: number
  baseOpacity: number
  delay: number
  duration: number
  tint: 'teal' | 'gold' | 'white'
}

interface BackgroundConstellationProps {
  step?: number
}

// ─── Seeded random (stable layout across renders) ────────────────────────────

function createRng(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const rng = createRng(42)
const brightRng = createRng(137)

function rand(min: number, max: number) {
  return min + rng() * (max - min)
}

function brightRand(min: number, max: number) {
  return min + brightRng() * (max - min)
}

// ─── Generators ──────────────────────────────────────────────────────────────

const STAR_COUNT = 30
const PARTICLE_COUNT = 18
const BRIGHT_DOT_COUNT = 16

function generateStars(): Star[] {
  return Array.from({ length: STAR_COUNT }, (_, id) => {
    const animTypes: Star['animType'][] = ['fade', 'scale', 'glow']
    const tints: Star['tint'][] = ['teal', 'gold', 'blue']
    return {
      id,
      x: rand(3, 97),
      y: rand(3, 97),
      size: rand(3, 5.5),
      baseOpacity: rand(0.35, 0.65),
      delay: rand(0, 8),
      duration: rand(3.5, 8),
      animType: animTypes[id % 3],
      tint: tints[id % 5 === 0 ? 1 : id % 7 === 0 ? 2 : 0],
    }
  })
}

function generateLines(stars: Star[]): ConstellationLine[] {
  const lines: ConstellationLine[] = []
  const used = new Set<string>()

  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const dx = stars[i].x - stars[j].x
      const dy = stars[i].y - stars[j].y
      const distance = Math.hypot(dx, dy)

      if (distance < 20 && distance > 6) {
        const key = `${Math.min(i, j)}-${Math.max(i, j)}`
        if (!used.has(key)) {
          used.add(key)
          lines.push({
            id: key,
            x1: stars[i].x,
            y1: stars[i].y,
            x2: stars[j].x,
            y2: stars[j].y,
            order: lines.length,
          })
        }
      }
    }
  }

  return lines
}

function generateBrightDots(): BrightDot[] {
  const tints: BrightDot['tint'][] = ['teal', 'gold', 'white']
  return Array.from({ length: BRIGHT_DOT_COUNT }, (_, id) => ({
    id,
    x: brightRand(4, 96),
    y: brightRand(4, 96),
    size: brightRand(4, 7),
    baseOpacity: brightRand(0.45, 0.75),
    delay: brightRand(0, 10),
    duration: brightRand(4, 9),
    tint: tints[id % 3],
  }))
}

function generateParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, id) => ({
    id,
    x: rand(0, 100),
    y: rand(0, 100),
    size: rand(1.5, 3),
    opacity: rand(0.12, 0.28),
    dx: rand(-30, 30),
    dy: rand(-40, 40),
    duration: rand(40, 80),
    delay: rand(0, 20),
  }))
}

const STARS = generateStars()
const BRIGHT_DOTS = generateBrightDots()
const LINES = generateLines(STARS)
const PARTICLES = generateParticles()

const STAR_COLORS: Record<Star['tint'], string> = {
  teal: '#14b8a6',
  gold: '#facc15',
  blue: '#3b6ea5',
}

const BRIGHT_DOT_COLORS: Record<BrightDot['tint'], string> = {
  teal: '#14b8a6',
  gold: '#facc15',
  white: '#ffffff',
}

const STEP_LINE_RATIO: Record<number, number> = { 1: 0.32, 2: 0.68, 3: 1 }
const STEP_GLOW_OPACITY: Record<number, number> = { 1: 0.08, 2: 0.09, 3: 0.1 }
const STEP_STAR_BRIGHTNESS: Record<number, number> = { 1: 0.9, 2: 1, 3: 1.1 }

function getStarAnimate(
  star: Star,
  reduceMotion: boolean,
  brightness: number,
) {
  const base = star.baseOpacity * brightness
  const peak = Math.min(base * 1.35, 0.95)

  if (reduceMotion) return { opacity: base }

  switch (star.animType) {
    case 'fade':
      return {
        opacity: [base * 0.65, peak, base * 0.8, peak * 0.9, base * 0.65],
      }
    case 'scale':
      return {
        opacity: [base, peak, base],
        scale: [1, 1.25, 1],
      }
    case 'glow':
      return {
        opacity: [base, peak, base],
        boxShadow: [
          '0 0 0px rgba(20,184,166,0)',
          '0 0 8px rgba(20,184,166,0.45)',
          '0 0 0px rgba(20,184,166,0)',
        ],
      }
  }
}

const BackgroundConstellation = memo(function BackgroundConstellation({
  step = 1,
}: BackgroundConstellationProps) {
  const reduceMotion = useReducedMotion() ?? false
  const clampedStep = Math.min(Math.max(step, 1), 3)

  const lineRatio = STEP_LINE_RATIO[clampedStep] ?? 1
  const glowOpacity = STEP_GLOW_OPACITY[clampedStep] ?? 0.08
  const starBrightness = STEP_STAR_BRIGHTNESS[clampedStep] ?? 1

  const visibleLines = useMemo(
    () =>
      LINES.filter(
        (line) => (line.order + 1) / Math.max(LINES.length, 1) <= lineRatio,
      ),
    [lineRatio],
  )

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Layer 1 — Animated gradient */}
      <div className="absolute inset-0 altair-bg-gradient" />

      {/* Layer 2 — Ambient glow (behind decorative elements) */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 'min(90vw, 900px)',
          height: 'min(70vh, 700px)',
          background: `radial-gradient(ellipse, rgba(20,184,166,${glowOpacity}) 0%, rgba(20,184,166,${glowOpacity * 0.4}) 40%, transparent 70%)`,
          willChange: 'transform',
        }}
        animate={reduceMotion ? undefined : { scale: [1, 1.08, 1] }}
        transition={
          reduceMotion
            ? undefined
            : { duration: 12, repeat: Infinity, ease: 'easeInOut' }
        }
      />

      {/* Layer 3 — Orbital curves */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <ellipse
          cx="50"
          cy="55"
          rx="62"
          ry="38"
          fill="none"
          stroke="rgba(15, 23, 42, 0.07)"
          strokeWidth="0.18"
        />
        <ellipse
          cx="50"
          cy="50"
          rx="48"
          ry="28"
          fill="none"
          stroke="rgba(15, 23, 42, 0.06)"
          strokeWidth="0.14"
          transform="rotate(-12 50 50)"
        />
        <path
          d="M -15 72 Q 50 18 115 72"
          fill="none"
          stroke="rgba(20, 184, 166, 0.08)"
          strokeWidth="0.16"
        />
      </svg>

      {/* Layer 4 — Constellation lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {visibleLines.map((line) => (
          <line
            key={line.id}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="rgba(20, 184, 166, 0.14)"
            strokeWidth="0.12"
          />
        ))}
      </svg>

      {/* Layer 5 — Floating particles */}
      {PARTICLES.map((p) => (
        <motion.span
          key={`particle-${p.id}`}
          className="absolute rounded-full bg-nebula-teal"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            marginLeft: -p.size / 2,
            marginTop: -p.size / 2,
            opacity: p.opacity,
            willChange: 'transform',
          }}
          animate={
            reduceMotion
              ? undefined
              : { x: [0, p.dx, p.dx * 0.5, 0], y: [0, p.dy, p.dy * 0.6, 0] }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: 'linear',
                }
          }
        />
      ))}

      {/* Layer 6 — Twinkling stars */}
      {STARS.map((star) => (
        <motion.span
          key={`star-${star.id}`}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            marginLeft: -star.size / 2,
            marginTop: -star.size / 2,
            backgroundColor: STAR_COLORS[star.tint],
            willChange: 'transform, opacity',
          }}
          initial={{ opacity: star.baseOpacity * starBrightness }}
          animate={getStarAnimate(star, reduceMotion, starBrightness)}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: star.duration,
                  delay: star.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
        />
      ))}

      {/* Layer 7 — Bright shining dots over gradient */}
      {BRIGHT_DOTS.map((dot) => {
        const color = BRIGHT_DOT_COLORS[dot.tint]
        const dim = dot.baseOpacity * starBrightness * 0.7
        const peak = Math.min(dot.baseOpacity * starBrightness, 0.85)
        const isWhite = dot.tint === 'white'

        return (
          <motion.span
            key={`bright-${dot.id}`}
            className="absolute rounded-full"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: dot.size,
              height: dot.size,
              marginLeft: -dot.size / 2,
              marginTop: -dot.size / 2,
              backgroundColor: color,
              boxShadow: isWhite
                ? '0 0 6px rgba(20,184,166,0.25), 0 0 2px rgba(15,23,42,0.08)'
                : `0 0 6px ${color}55`,
              willChange: 'transform, opacity',
            }}
            initial={{ opacity: dim }}
            animate={
              reduceMotion
                ? { opacity: dim }
                : {
                    opacity: [dim, peak, dim * 0.85, peak * 0.92, dim],
                    scale: [1, 1.2, 1, 1.1, 1],
                    boxShadow: isWhite
                      ? [
                          '0 0 4px rgba(20,184,166,0.15)',
                          '0 0 10px rgba(20,184,166,0.35)',
                          '0 0 4px rgba(20,184,166,0.15)',
                          '0 0 8px rgba(20,184,166,0.28)',
                          '0 0 4px rgba(20,184,166,0.15)',
                        ]
                      : [
                          `0 0 4px ${color}33`,
                          `0 0 10px ${color}66`,
                          `0 0 4px ${color}33`,
                          `0 0 8px ${color}55`,
                          `0 0 4px ${color}33`,
                        ],
                  }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: dot.duration,
                    delay: dot.delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
            }
          />
        )
      })}
    </div>
  )
})

export default BackgroundConstellation
