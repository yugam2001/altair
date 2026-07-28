import { motion } from 'framer-motion'
import { HERO_META_CHIPS } from './roadmapSections'

export default function RoadmapHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-[90%] max-w-[1400px] px-1 pt-14 sm:pt-16 md:pt-20 lg:pt-24"
    >
      <div className="flex items-center gap-2.5 text-[12px] font-medium tracking-[0.14em] text-blue-300/80 uppercase sm:text-[13px]">
        <span
          className="inline-block h-1.5 w-1.5 rotate-45 border border-blue-400/50 bg-blue-500/20"
          aria-hidden="true"
        />
        Learning Guide
      </div>

      <p className="mt-5 text-lg font-medium text-white sm:text-xl">
        Good evening, Yugam
      </p>

      <h1 className="mt-4 max-w-4xl text-[1.75rem] font-semibold leading-[1.2] tracking-tight text-white sm:text-4xl md:text-[2.65rem] md:leading-[1.15]">
        Your plotted course to{' '}
        <span className="text-blue-200">Software Engineer</span>
      </h1>

      <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-blue-100/65 sm:text-base sm:leading-7">
        ALTAIR has charted a personal route from your goals, education,
        experience and preferred learning style — a steady bearing toward where
        you want to go.
      </p>

      <ul className="mt-8 flex flex-wrap gap-2 sm:mt-10 sm:gap-2.5">
        {HERO_META_CHIPS.map((chip) => (
          <li key={chip}>
            <span className="inline-flex rounded-full border border-blue-400/25 bg-blue-950/40 px-3 py-1.5 text-[11px] font-medium tracking-wide text-blue-100/90 sm:px-3.5 sm:text-[12px]">
              {chip}
            </span>
          </li>
        ))}
      </ul>
    </motion.section>
  )
}
