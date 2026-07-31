import { motion, useReducedMotion } from 'framer-motion'

interface AltairGuidanceStarProps {
  className?: string
}

/** Star + 3 falling guidance rays — reads as the letter "i" in Find */
export default function AltairGuidanceStar({ className = '' }: AltairGuidanceStarProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.span
      aria-hidden="true"
      className={`relative inline-block align-[-0.05em] ${className}`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg
        viewBox="0 0 24 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative h-[0.78em] w-[0.32em] min-h-[1.35rem] min-w-[0.6rem] sm:min-h-[1.65rem] sm:min-w-[0.7rem]"
      >
        <defs>
          <linearGradient id="ray-center" x1="12" y1="16" x2="12" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#14b8a6" stopOpacity="0.95" />
            <stop offset="0.55" stopColor="#14b8a6" stopOpacity="0.45" />
            <stop offset="1" stopColor="#14b8a6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ray-left" x1="12" y1="16" x2="7" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#14b8a6" stopOpacity="0.7" />
            <stop offset="0.6" stopColor="#14b8a6" stopOpacity="0.25" />
            <stop offset="1" stopColor="#14b8a6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ray-right" x1="12" y1="16" x2="17" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#14b8a6" stopOpacity="0.7" />
            <stop offset="0.6" stopColor="#14b8a6" stopOpacity="0.25" />
            <stop offset="1" stopColor="#14b8a6" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Falling guidance rays — stem of the "i" */}
        <motion.path
          d="M10.2 16 L7.5 50"
          stroke="url(#ray-left)"
          strokeWidth="1.6"
          strokeLinecap="round"
          animate={
            prefersReducedMotion
              ? undefined
              : { opacity: [0.55, 0.9, 0.55] }
          }
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        />
        <motion.path
          d="M12 15 L12 50"
          stroke="url(#ray-center)"
          strokeWidth="2.2"
          strokeLinecap="round"
          animate={
            prefersReducedMotion
              ? undefined
              : { opacity: [0.7, 1, 0.7] }
          }
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M13.8 16 L16.5 50"
          stroke="url(#ray-right)"
          strokeWidth="1.6"
          strokeLinecap="round"
          animate={
            prefersReducedMotion
              ? undefined
              : { opacity: [0.55, 0.9, 0.55] }
          }
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />

        {/* Top star — dot of the "i" */}
        <motion.g
          animate={
            prefersReducedMotion
              ? undefined
              : { scale: [1, 1.08, 1], opacity: [0.9, 1, 0.9] }
          }
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '12px 8px' }}
        >
          <motion.path
            d="M12 1.5 L13.1 6.2 L17.5 7.8 L13.1 9.4 L12 14.2 L10.9 9.4 L6.5 7.8 L10.9 6.2 Z"
            fill="#14b8a6"
            stroke="#0d9488"
            strokeWidth="0.35"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="7.8" r="1.1" fill="white" fillOpacity="0.92" />
        </motion.g>
      </svg>
    </motion.span>
  )
}
