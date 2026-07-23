import { memo, useEffect, useMemo, useState } from 'react'
import {
  motion,
  useReducedMotion,
  type Transition,
} from 'framer-motion'

// ─── Timing & tuning constants ───────────────────────────────────────────────

export const INTRO_TRANSITION_TIMINGS = {
  contentFade: 650,
  canvasFade: 650,
  logoMoveDelay: 280,
  logoMove: 750,
  settlePause: 220,
  rippleDuration: 2800,
  logoHold: 350,
  exitFade: 380,
  reducedMotionTotal: 550,
} as const

const LOGO_SCALE = 1.1

// Dot grid
const DOT_GRID_SPACING = 48
const DOT_SIZE = 4.5
const DOT_SIZE_JITTER = 1
const DOT_PULSE_DURATION_S = 0.55
const DOT_BASE_OPACITY = 0.32
const DOT_PEAK_OPACITY = 0.72
const DOT_EDGE_FADE_START = 0.82

// Ripple wave rings (visual water-ripple guides)
const RIPPLE_RING_COUNT = 3
const RIPPLE_RING_DURATION_S = 2.4
const RIPPLE_RING_STAGGER_S = 0.85
const RIPPLE_RING_BORDER = 'rgba(15, 23, 42, 0.14)'

// Colors — predominantly Deep Space
const DOT_COLOR_DEEP_SPACE = '#0F172A'
const DOT_COLOR_TEAL = '#14B8A6'
const DOT_COLOR_GOLD = '#FACC15'
const DOT_ACCENT_TEAL_CHANCE = 0.07
const DOT_ACCENT_GOLD_CHANCE = 0.03

const EASE_IN_OUT: Transition['ease'] = 'easeInOut'
const EASE_OUT: Transition['ease'] = [0.22, 1, 0.36, 1]

// ─── Types ───────────────────────────────────────────────────────────────────

type Phase = 'intro' | 'ripple' | 'hold' | 'exit'

interface GridDot {
  id: number
  x: number
  y: number
  distance: number
  size: number
  color: string
  peakOpacity: number
  finalOpacity: number
  waveDelay: number
}

interface IntroTransitionProps {
  sourceRect: DOMRect
  onComplete: () => void
}

interface Viewport {
  width: number
  height: number
  centerX: number
  centerY: number
  maxRadius: number
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getViewport(): Viewport {
  const width = window.innerWidth
  const height = window.innerHeight
  const centerX = width / 2
  const centerY = height / 2
  const maxRadius = Math.hypot(
    Math.max(centerX, width - centerX),
    Math.max(centerY, height - centerY),
  )

  return { width, height, centerX, centerY, maxRadius }
}

function pickDotColor(): string {
  const roll = Math.random()
  if (roll < DOT_ACCENT_TEAL_CHANCE) return DOT_COLOR_TEAL
  if (roll < DOT_ACCENT_TEAL_CHANCE + DOT_ACCENT_GOLD_CHANCE) {
    return DOT_COLOR_GOLD
  }
  return DOT_COLOR_DEEP_SPACE
}

function buildDotGrid(viewport: Viewport): GridDot[] {
  const { width, height, centerX, centerY, maxRadius } = viewport
  const dots: GridDot[] = []
  const rippleDurationS = INTRO_TRANSITION_TIMINGS.rippleDuration / 1000
  let id = 0

  for (let x = DOT_GRID_SPACING / 2; x < width; x += DOT_GRID_SPACING) {
    for (let y = DOT_GRID_SPACING / 2; y < height; y += DOT_GRID_SPACING) {
      const dx = x - centerX
      const dy = y - centerY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const normalized = distance / maxRadius

      const jitter = (Math.random() - 0.5) * 6
      const waveDelay =
        (distance / maxRadius) * rippleDurationS + (jitter / maxRadius) * 0.04

      const edgeFade =
        normalized > DOT_EDGE_FADE_START
          ? 1 - (normalized - DOT_EDGE_FADE_START) / (1 - DOT_EDGE_FADE_START)
          : 1

      dots.push({
        id: id++,
        x,
        y,
        distance,
        size: DOT_SIZE + (Math.random() - 0.5) * DOT_SIZE_JITTER,
        color: pickDotColor(),
        peakOpacity: DOT_PEAK_OPACITY * edgeFade,
        finalOpacity: DOT_BASE_OPACITY * edgeFade,
        waveDelay: Math.max(0, waveDelay),
      })
    }
  }

  return dots
}

// ─── Full-screen dot ripple ──────────────────────────────────────────────────

interface DotRippleFieldProps {
  viewport: Viewport
}

const DotRippleField = memo(function DotRippleField({
  viewport,
}: DotRippleFieldProps) {
  const dots = useMemo(
    () => buildDotGrid(viewport),
    [viewport.width, viewport.height, viewport.centerX, viewport.centerY, viewport.maxRadius],
  )

  const { centerX, centerY, maxRadius } = viewport

  return (
    <div className="pointer-events-none fixed inset-0 z-[55]" aria-hidden="true">
      {/* Expanding water-ripple rings */}
      {Array.from({ length: RIPPLE_RING_COUNT }, (_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full"
          style={{
            left: centerX,
            top: centerY,
            x: '-50%',
            y: '-50%',
            border: `1px solid ${RIPPLE_RING_BORDER}`,
          }}
          initial={{ width: 0, height: 0, opacity: 0.35 }}
          animate={{
            width: maxRadius * 2.1,
            height: maxRadius * 2.1,
            opacity: 0,
          }}
          transition={{
            duration: RIPPLE_RING_DURATION_S,
            delay: i * RIPPLE_RING_STAGGER_S,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Full-viewport dot grid — wave activates each dot as the ripple reaches it */}
      {dots.map((dot) => (
        <motion.span
          key={dot.id}
          className="absolute rounded-full will-change-[opacity,transform]"
          style={{
            left: dot.x,
            top: dot.y,
            width: dot.size,
            height: dot.size,
            marginLeft: -dot.size / 2,
            marginTop: -dot.size / 2,
            backgroundColor: dot.color,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, dot.peakOpacity, dot.finalOpacity],
            scale: [0.5, 1.2, 1],
          }}
          transition={{
            duration: DOT_PULSE_DURATION_S,
            delay: dot.waveDelay,
            ease: 'easeOut',
            times: [0, 0.35, 1],
          }}
        />
      ))}
    </div>
  )
})

// ─── Main component ──────────────────────────────────────────────────────────

export default function IntroTransition({
  sourceRect,
  onComplete,
}: IntroTransitionProps) {
  const reduceMotion = useReducedMotion() ?? false
  const [phase, setPhase] = useState<Phase>('intro')

  const viewport = useMemo(() => getViewport(), [])
  const { centerX, centerY } = viewport

  const targetWidth = sourceRect.width * LOGO_SCALE
  const targetHeight = sourceRect.height * LOGO_SCALE
  const targetLeft = centerX - targetWidth / 2
  const targetTop = centerY - targetHeight / 2

  const rippleStartMs =
    INTRO_TRANSITION_TIMINGS.logoMoveDelay +
    INTRO_TRANSITION_TIMINGS.logoMove +
    INTRO_TRANSITION_TIMINGS.settlePause

  const holdStartMs = rippleStartMs + INTRO_TRANSITION_TIMINGS.rippleDuration
  const exitStartMs = holdStartMs + INTRO_TRANSITION_TIMINGS.logoHold

  useEffect(() => {
    if (reduceMotion) {
      const timer = setTimeout(
        onComplete,
        INTRO_TRANSITION_TIMINGS.reducedMotionTotal,
      )
      return () => clearTimeout(timer)
    }

    const timers = [
      setTimeout(() => setPhase('ripple'), rippleStartMs),
      setTimeout(() => setPhase('hold'), holdStartMs),
      setTimeout(() => setPhase('exit'), exitStartMs),
    ]

    return () => timers.forEach(clearTimeout)
  }, [reduceMotion, onComplete, rippleStartMs, holdStartMs, exitStartMs])

  if (reduceMotion) {
    return (
      <motion.div
        className="fixed inset-0 z-[100] h-screen w-screen bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: INTRO_TRANSITION_TIMINGS.canvasFade / 1000,
          ease: EASE_IN_OUT,
        }}
        aria-hidden="true"
      />
    )
  }

  const showRipple = phase === 'ripple' || phase === 'hold' || phase === 'exit'

  return (
    <div
      className="fixed inset-0 z-[100] h-screen w-screen overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'exit' ? 0 : 1 }}
        transition={{
          duration:
            phase === 'exit'
              ? INTRO_TRANSITION_TIMINGS.exitFade / 1000
              : INTRO_TRANSITION_TIMINGS.canvasFade / 1000,
          ease: EASE_IN_OUT,
        }}
        onAnimationComplete={() => {
          if (phase === 'exit') onComplete()
        }}
      />

      {showRipple && <DotRippleField viewport={viewport} />}

      <motion.img
        src="/logo.png"
        alt=""
        draggable={false}
        className="pointer-events-none fixed z-[60] object-contain will-change-transform"
        initial={{
          left: sourceRect.left,
          top: sourceRect.top,
          width: sourceRect.width,
          height: sourceRect.height,
          opacity: 1,
        }}
        animate={{
          left: targetLeft,
          top: targetTop,
          width: targetWidth,
          height: targetHeight,
          opacity: phase === 'exit' ? 0 : 1,
        }}
        transition={{
          left: {
            delay: INTRO_TRANSITION_TIMINGS.logoMoveDelay / 1000,
            duration: INTRO_TRANSITION_TIMINGS.logoMove / 1000,
            ease: EASE_OUT,
          },
          top: {
            delay: INTRO_TRANSITION_TIMINGS.logoMoveDelay / 1000,
            duration: INTRO_TRANSITION_TIMINGS.logoMove / 1000,
            ease: EASE_OUT,
          },
          width: {
            delay: INTRO_TRANSITION_TIMINGS.logoMoveDelay / 1000,
            duration: INTRO_TRANSITION_TIMINGS.logoMove / 1000,
            ease: EASE_OUT,
          },
          height: {
            delay: INTRO_TRANSITION_TIMINGS.logoMoveDelay / 1000,
            duration: INTRO_TRANSITION_TIMINGS.logoMove / 1000,
            ease: EASE_OUT,
          },
          opacity: {
            duration: INTRO_TRANSITION_TIMINGS.exitFade / 1000,
            ease: EASE_IN_OUT,
          },
        }}
      />
    </div>
  )
}
