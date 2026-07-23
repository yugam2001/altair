import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'

interface NavigationButtonsProps {
  step: number
  totalSteps: number
  onPrevious: () => void
  onNext: () => void
  isSubmitting?: boolean
}

export default function NavigationButtons({
  step,
  totalSteps,
  onPrevious,
  onNext,
  isSubmitting = false,
}: NavigationButtonsProps) {
  const isFirst = step === 1
  const isLast = step === totalSteps

  return (
    <div className="mt-14 flex items-center justify-between gap-6 border-t border-deep-space/[0.06] pt-10">
      <motion.button
        type="button"
        onClick={onPrevious}
        disabled={isFirst}
        whileHover={isFirst ? undefined : { x: -2 }}
        whileTap={isFirst ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className={`
          inline-flex items-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-medium
          transition-all duration-300
          focus:outline-none focus-visible:ring-2 focus-visible:ring-nebula-teal/30 focus-visible:ring-offset-2
          ${
            isFirst
              ? 'cursor-not-allowed text-secondary-text/30'
              : 'text-secondary-text hover:bg-deep-space/[0.03] hover:text-primary-text'
          }
        `}
        aria-disabled={isFirst}
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Previous
      </motion.button>

      {isLast ? (
        <motion.button
          type="button"
          onClick={onNext}
          disabled={isSubmitting}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-2xl bg-nebula-teal px-7 py-4 text-sm font-semibold text-white shadow-[0_4px_20px_-4px_rgba(20,184,166,0.5)] transition-shadow duration-300 hover:bg-nebula-teal/95 hover:shadow-[0_8px_28px_-4px_rgba(20,184,166,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-nebula-teal/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:px-9"
        >
          <span
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />
          <Sparkles className="relative h-4 w-4" aria-hidden="true" />
          <span className="relative">Generate My Roadmap</span>
        </motion.button>
      ) : (
        <motion.button
          type="button"
          onClick={onNext}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="group inline-flex items-center gap-2.5 rounded-2xl bg-nebula-teal px-7 py-4 text-sm font-semibold text-white shadow-[0_4px_16px_-4px_rgba(20,184,166,0.45)] transition-shadow duration-300 hover:bg-nebula-teal/95 hover:shadow-[0_6px_24px_-4px_rgba(20,184,166,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-nebula-teal/50 focus-visible:ring-offset-2 sm:px-9"
        >
          Next
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </motion.button>
      )}
    </div>
  )
}
