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
      whileHover={disabled ? undefined : { scale: 1.02, y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`group inline-flex items-center gap-2.5 rounded-xl bg-nebula-teal px-8 py-4 text-sm font-semibold text-white shadow-sm transition-shadow duration-300 hover:bg-nebula-teal/90 hover:shadow-lg hover:shadow-nebula-teal/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </motion.button>
  )
}
