import { motion } from 'framer-motion'

interface ProgressHeaderProps {
  step: number
  totalSteps: number
  emoji: string
  label: string
  subtitle: string
}

/** Minimal four-point ALTAIR navigation star — custom geometry */
function AltairMarker() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="drop-shadow-[0_0_4px_rgba(20,184,166,0.6)]"
    >
      <path
        d="M7 0.5 L8.1 5.4 L13 7 L8.1 8.6 L7 13.5 L5.9 8.6 L1 7 L5.9 5.4 Z"
        fill="#14b8a6"
        stroke="#14b8a6"
        strokeWidth="0.4"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="7" r="1.2" fill="white" fillOpacity="0.9" />
    </svg>
  )
}

export default function ProgressHeader({
  step,
  totalSteps,
  emoji,
  label,
  subtitle,
}: ProgressHeaderProps) {
  const progress = (step / totalSteps) * 100

  return (
    <div className="mb-12 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary-text/70">
          Step {step} of {totalSteps}
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-primary-text sm:text-[1.75rem] sm:leading-tight">
          <span className="mr-2.5" aria-hidden="true">
            {emoji}
          </span>
          {label}
        </h2>
        <p className="max-w-lg text-[15px] leading-relaxed text-secondary-text/90 sm:text-base">
          {subtitle}
        </p>
      </div>

      {/* Journey progress track */}
      <div className="relative">
        <div
          className="relative h-[3px] w-full overflow-visible rounded-full bg-deep-space/[0.06]"
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-label={`Step ${step} of ${totalSteps}`}
        >
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-nebula-teal/80 to-nebula-teal"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* ALTAIR navigation marker */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2"
            initial={false}
            animate={{ left: `calc(${progress}% - 7px)` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{
                filter: [
                  'drop-shadow(0 0 3px rgba(20,184,166,0.4))',
                  'drop-shadow(0 0 6px rgba(20,184,166,0.65))',
                  'drop-shadow(0 0 3px rgba(20,184,166,0.4))',
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <AltairMarker />
            </motion.div>
          </motion.div>
        </div>

        {/* Destination marker */}
        <div
          className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-deep-space/15"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
