import { motion, useReducedMotion } from 'framer-motion'

const strokeProps = {
  fill: 'none' as const,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  strokeWidth: 1.5,
}

function drawProps(reduced: boolean, duration: number, delay = 0) {
  return {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: {
      duration: reduced ? 0 : duration,
      delay: reduced ? 0 : delay,
      ease: 'easeOut' as const,
    },
  }
}

function MapDraw({ accent }: { accent: string }) {
  const reduced = useReducedMotion() ?? false

  return (
    <svg viewBox="0 0 24 24" className="h-28 w-28 sm:h-32 sm:w-32" fill="none">
      <motion.path
        d="M14.5 5.5 19 3.5v13l-4.5 2.2M14.5 5.5 9.5 3.5 5 5.5v13l4.5 2.2 5-2.5 5 2.5V3.5l-4.5 2"
        stroke={accent}
        {...strokeProps}
        {...drawProps(reduced, 1.2)}
      />
      <motion.path
        d="M9.5 3.5v13M14.5 5.5v13"
        stroke={accent}
        strokeOpacity={0.45}
        {...strokeProps}
        {...drawProps(reduced, 0.7, 0.5)}
      />
      <motion.circle
        cx="12"
        cy="10"
        r="1.5"
        fill={accent}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: reduced ? 0 : 1.1, duration: reduced ? 0 : 0.35, type: 'spring', stiffness: 320 }}
      />
      <motion.path
        d="M12 10.5v3"
        stroke={accent}
        strokeOpacity={0.6}
        {...strokeProps}
        {...drawProps(reduced, 0.3, 1.2)}
      />
    </svg>
  )
}

function LayersDraw({ accent }: { accent: string }) {
  const reduced = useReducedMotion() ?? false
  const layers = [
    'M12.8 3.2 20 6.8v.1l-7.2 3.3-7.2-3.3V6.8z',
    'M4.5 10.2 12 13.8l7.5-3.6',
    'M4.5 15.2 12 18.8l7.5-3.6',
  ]

  return (
    <svg viewBox="0 0 24 24" className="h-28 w-28 sm:h-32 sm:w-32" fill="none">
      {layers.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke={accent}
          strokeOpacity={0.55 + i * 0.15}
          {...strokeProps}
          initial={{ pathLength: 0, opacity: 0, y: 6 }}
          animate={{ pathLength: 1, opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : 0.65,
            delay: reduced ? 0 : i * 0.22,
            ease: 'easeOut',
          }}
        />
      ))}
    </svg>
  )
}

function CompassDraw({ accent }: { accent: string }) {
  const reduced = useReducedMotion() ?? false

  return (
    <svg viewBox="0 0 24 24" className="h-28 w-28 sm:h-32 sm:w-32" fill="none">
      <motion.circle cx="12" cy="12" r="8.5" stroke={accent} {...strokeProps} {...drawProps(reduced, 1)} />
      <motion.circle
        cx="12"
        cy="12"
        r="1.2"
        fill={accent}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: reduced ? 0 : 0.6, duration: reduced ? 0 : 0.3 }}
      />
      <motion.g
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ delay: reduced ? 0 : 0.75, duration: reduced ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: '12px 12px' }}
      >
        <path d="M12 5.5v2M12 16.5v2M5.5 12h2M16.5 12h2" stroke={accent} strokeOpacity={0.35} {...strokeProps} />
        <path
          d="M12 8.5 14.5 12 12 15.5 9.5 12z"
          stroke={accent}
          fill={accent}
          fillOpacity={0.2}
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
        <path d="M12 8.5v7M9.5 12h5" stroke={accent} {...strokeProps} />
      </motion.g>
    </svg>
  )
}

function GraduationCapDraw({ accent }: { accent: string }) {
  const reduced = useReducedMotion() ?? false

  return (
    <svg viewBox="0 0 24 24" className="h-28 w-28 sm:h-32 sm:w-32" fill="none">
      <motion.path d="M3 9.5 12 5l9 4.5-9 4.5z" stroke={accent} {...strokeProps} {...drawProps(reduced, 0.9)} />
      <motion.path
        d="M7 12.5V16a5 5 0 0 0 10 0v-3.5"
        stroke={accent}
        strokeOpacity={0.7}
        {...strokeProps}
        {...drawProps(reduced, 0.8, 0.45)}
      />
      <motion.path d="M21 10v4" stroke={accent} {...strokeProps} {...drawProps(reduced, 0.4, 0.9)} />
      <motion.circle
        cx="21"
        cy="15"
        r="0.8"
        fill={accent}
        initial={{ scale: 0 }}
        animate={{ scale: reduced ? 1 : [0, 1.3, 1] }}
        transition={{ delay: reduced ? 0 : 1.15, duration: reduced ? 0 : 0.45 }}
      />
    </svg>
  )
}

function RouteDraw({ accent }: { accent: string }) {
  const reduced = useReducedMotion() ?? false
  const nodes = [
    { cx: 5.5, cy: 16.5 },
    { cx: 12, cy: 8.5 },
    { cx: 18.5, cy: 14.5 },
  ]

  return (
    <svg viewBox="0 0 24 24" className="h-28 w-28 sm:h-32 sm:w-32" fill="none">
      {nodes.map((node, i) => (
        <motion.circle
          key={`${node.cx}-${node.cy}`}
          cx={node.cx}
          cy={node.cy}
          r="2"
          fill={accent}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: reduced ? 0 : 0.35,
            delay: reduced ? 0 : i * 0.25,
            type: 'spring',
            stiffness: 380,
          }}
        />
      ))}
      <motion.path
        d="M5.5 16.5C8 13 10 11.5 12 8.5c2 3 4.5 4.5 6.5 6"
        stroke={accent}
        {...strokeProps}
        {...drawProps(reduced, 0.9, 0.55)}
      />
      <motion.path
        d="M12 8.5v2.5M5.5 16.5H8"
        stroke={accent}
        strokeOpacity={0.4}
        {...strokeProps}
        {...drawProps(reduced, 0.4, 1.2)}
      />
    </svg>
  )
}

function ShieldCheckDraw({ accent }: { accent: string }) {
  const reduced = useReducedMotion() ?? false

  return (
    <svg viewBox="0 0 24 24" className="h-28 w-28 sm:h-32 sm:w-32" fill="none">
      <motion.path
        d="M12 3.5 19 6.5v5.2c0 4.2-3 6.8-7 8.3-4-1.5-7-4.1-7-8.3V6.5z"
        stroke={accent}
        {...strokeProps}
        {...drawProps(reduced, 1.1)}
      />
      <motion.path
        d="M8.5 12.2 10.8 14.5 15.8 9.5"
        stroke={accent}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        {...drawProps(reduced, 0.55, 0.95)}
      />
      {!reduced && (
        <motion.path
          d="M12 6.5v1.5"
          stroke={accent}
          strokeOpacity={0.35}
          {...strokeProps}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ delay: 1.4, duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
        />
      )}
    </svg>
  )
}

const visuals = [
  MapDraw,
  LayersDraw,
  CompassDraw,
  GraduationCapDraw,
  RouteDraw,
  ShieldCheckDraw,
] as const

export default function FeatureIconVisual({
  index,
  accent,
}: {
  index: number
  accent: string
}) {
  const Visual = visuals[index] ?? MapDraw

  return (
    <div
      aria-hidden="true"
      className="relative flex h-44 w-full max-w-[17rem] shrink-0 items-center justify-center sm:h-48 sm:max-w-xs"
    >
      <div
        className="absolute inset-6 rounded-full blur-2xl"
        style={{ background: `${accent}16` }}
      />
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex items-center justify-center rounded-3xl border border-gray-100/80 bg-white/80 p-6 shadow-[0_8px_32px_rgba(15,23,42,0.06)]"
      >
        <Visual accent={accent} />
      </motion.div>
    </div>
  )
}
