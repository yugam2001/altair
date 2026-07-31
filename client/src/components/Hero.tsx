import type { RefObject } from 'react'
import { motion } from 'framer-motion'
import PrimaryButton from './PrimaryButton'
import HeroBackground from './HeroBackground'
import HeroRoadmapMockup from './HeroRoadmapMockup'
import AltairGuidanceStar from './AltairGuidanceStar'

interface HeroProps {
  logoImageRef?: RefObject<HTMLImageElement | null>
  onGenerateClick?: () => void
  generateDisabled?: boolean
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export default function Hero({
  logoImageRef,
  onGenerateClick,
  generateDisabled = false,
}: HeroProps) {
  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-nebula-teal/[0.07] via-surface to-deep-space/[0.04] px-6 pt-12 pb-20 md:pt-16 md:pb-28 lg:pt-20 lg:pb-32"
    >
      <HeroBackground />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        {/* Left column */}
        <div className="relative z-40 flex flex-col justify-center text-left">
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/70 px-3.5 py-1.5 text-[12px] font-medium text-secondary-text shadow-sm backdrop-blur-sm sm:text-[13px]">
              <span aria-hidden="true">✨</span>
              AI Powered Career Guidance
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-heading text-[2.75rem] font-semibold leading-[1.15] tracking-tight text-nebula-teal sm:text-6xl lg:text-[4rem] xl:text-[4.25rem]"
            aria-label="Find your way forward."
          >
            F
            <AltairGuidanceStar className="mx-[0.04em]" />
            nd your way forward.
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl font-heading text-[1.2rem] font-normal leading-[1.72] tracking-[0.015em] text-midnight-blue/90 sm:text-[1.35rem] sm:leading-[1.78]"
          >
            Generate a personalized education and career roadmap tailored to your
            current stage, goals, country, and learning style.
          </motion.p>

          <motion.div
            id="generate"
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <img
              ref={logoImageRef}
              src="/logo.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1/2 h-10 w-10 -translate-y-1/2 opacity-0"
            />
            <PrimaryButton onClick={onGenerateClick} disabled={generateDisabled}>
              Generate My Personalized Roadmap
            </PrimaryButton>

            <motion.a
              href="#why-altair"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98, y: 0 }}
              transition={{ type: 'spring', stiffness: 420, damping: 22 }}
              className="group inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white/80 px-8 py-4 text-sm font-semibold text-primary-text shadow-[0_2px_10px_rgba(15,23,42,0.06)] backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-300 hover:border-nebula-teal/25 hover:bg-white hover:shadow-[0_8px_24px_rgba(15,23,42,0.1)]"
            >
              Learn More
            </motion.a>
          </motion.div>
        </div>

        {/* Right column — product showcase */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-visible lg:-mr-8 lg:pl-0 xl:-mr-12"
        >
          <HeroRoadmapMockup />
        </motion.div>
      </div>
    </section>
  )
}
