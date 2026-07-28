import { motion } from 'framer-motion'
import type { LoadingMessage } from './messages'

interface LoadingMessageCardProps {
  message: LoadingMessage
  side: 'left' | 'right'
}

export default function LoadingMessageCard({
  message,
  side,
}: LoadingMessageCardProps) {
  const positionClass =
    side === 'right'
      ? 'left-[calc(100%+1.25rem)] top-1/2 -translate-y-1/2'
      : 'right-[calc(100%+1.25rem)] top-1/2 -translate-y-1/2'

  return (
    <motion.aside
      initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute ${positionClass} z-20 w-[min(calc(100vw-3rem),320px)] rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-4 shadow-[0_12px_40px_rgba(0,0,0,0.38),0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-xl`}
      aria-live="polite"
    >
      <h2 className="text-[15px] font-semibold leading-snug tracking-tight text-white">
        {message.title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-white/58">
        {message.description}
      </p>
    </motion.aside>
  )
}
