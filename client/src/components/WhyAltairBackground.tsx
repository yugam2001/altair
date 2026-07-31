import { memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const WhyAltairBackground = memo(function WhyAltairBackground() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_0%_30%,rgba(20,184,166,0.06),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_100%_70%,rgba(15,23,42,0.04),transparent_60%)]" />
      <motion.div
        className="absolute left-[8%] top-[18%] h-32 w-32 rounded-full bg-nebula-teal/5 blur-3xl"
        animate={prefersReducedMotion ? undefined : { opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
})

export default WhyAltairBackground
