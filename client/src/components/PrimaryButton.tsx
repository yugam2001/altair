import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface PrimaryButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export default function PrimaryButton({
  children,
  className = '',
  onClick,
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.03, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.98, y: 0 }}
      transition={{ type: 'spring', stiffness: 420, damping: 22 }}
      className={`group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-nebula-teal px-8 py-4 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(20,184,166,0.28)] transition-[box-shadow,background-color] duration-300 hover:bg-nebula-teal/95 hover:shadow-[0_8px_28px_rgba(20,184,166,0.38)] disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      <span className="relative">{children}</span>
      <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </motion.button>
  )
}
