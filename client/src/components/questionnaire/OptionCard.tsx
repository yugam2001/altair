import { motion } from 'framer-motion'
import type { SelectOption } from '../../types/questionnaire'

interface OptionCardProps {
  option: SelectOption
  selected: boolean
  onSelect: () => void
  name: string
  hasError?: boolean
}

const shakeVariants = {
  shake: {
    x: [0, -4, 4, -3, 3, -1, 1, 0],
    transition: { duration: 0.4, ease: 'easeInOut' as const },
  },
}

export default function OptionCard({
  option,
  selected,
  onSelect,
  name,
  hasError = false,
}: OptionCardProps) {
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={`${option.title}: ${option.description}`}
      name={name}
      onClick={onSelect}
      whileHover={selected ? undefined : { y: -2 }}
      whileTap={{ scale: 0.99 }}
      animate={
        hasError && !selected
          ? 'shake'
          : selected
            ? { scale: 1.02, y: -2 }
            : { scale: 1, y: 0 }
      }
      variants={shakeVariants}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`
        group relative w-full min-w-0 rounded-2xl border px-5 py-5 text-left
        transition-all duration-300 ease-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-nebula-teal/30 focus-visible:ring-offset-2
        ${
          selected
            ? 'border-nebula-teal/70 bg-nebula-teal/[0.07] shadow-[0_4px_20px_-4px_rgba(20,184,166,0.25),0_0_0_1px_rgba(20,184,166,0.1)]'
            : hasError
              ? 'border-red-300 bg-white hover:border-red-400'
              : 'border-deep-space/[0.08] bg-white/70 shadow-[0_1px_3px_rgba(15,23,42,0.04)] hover:border-deep-space/[0.14] hover:bg-white hover:shadow-[0_4px_16px_-6px_rgba(15,23,42,0.08)]'
        }
      `}
    >
      <div className="relative z-10 flex flex-col gap-1.5">
        <span
          className="text-lg leading-none opacity-80 transition-transform duration-300 group-hover:scale-105"
          aria-hidden="true"
        >
          {option.emoji}
        </span>
        <span className="text-[15px] font-semibold leading-snug text-primary-text">
          {option.title}
        </span>
        <span className="text-[13px] leading-snug text-secondary-text/80">
          {option.description}
        </span>
      </div>
    </motion.button>
  )
}
