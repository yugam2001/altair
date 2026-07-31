import { motion } from 'framer-motion'
import { Search, Shuffle, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import WhyAltairBackground from './WhyAltairBackground'
import WhyAltairPathVisual from './WhyAltairPathVisual'

const painPoints: ReadonlyArray<{
  icon: LucideIcon
  step: string
  title: string
  description: string
}> = [
  {
    icon: Search,
    step: '01',
    title: 'Scattered Information',
    description:
      'Educational guidance is spread across videos, blogs, university websites, and community forums, making it difficult to know where to begin.',
  },
  {
    icon: Shuffle,
    step: '02',
    title: 'Conflicting Advice',
    description:
      'Different people recommend different paths. ALTAIR helps organize those possibilities into a clear and structured direction.',
  },
  {
    icon: Sparkles,
    step: '03',
    title: 'Personalized Roadmap',
    description:
      'Receive an AI-generated roadmap based on your education level, career goal, country, learning preferences, and available study time.',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' as const },
}

export default function WhyAltair() {
  return (
    <section
      id="why-altair"
      className="relative overflow-hidden bg-gradient-to-b from-white via-surface/80 to-white px-6 py-28 md:py-32"
    >
      <WhyAltairBackground />

      <div className="relative mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center rounded-full border border-gray-200/80 bg-white/80 px-3.5 py-1.5 text-[12px] font-medium text-secondary-text shadow-sm backdrop-blur-sm sm:text-[13px]">
            Built for learners
          </span>
          <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-nebula-teal sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Why choose ALTAIR?
          </h2>
          <p className="mt-5 font-heading text-base leading-relaxed text-midnight-blue/85 sm:text-lg sm:leading-8">
            Every learner deserves a clear path. ALTAIR transforms scattered educational
            information into one personalized AI-powered roadmap.
          </p>
        </motion.div>

        <div className="mt-16 grid items-start gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Left — story */}
          <div className="flex flex-col gap-8">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <h3 className="font-heading text-xl font-semibold leading-snug text-deep-space sm:text-2xl">
                Finding the right path shouldn&apos;t be this difficult.
              </h3>
              <p className="font-heading text-base leading-[1.75] text-midnight-blue/80 sm:text-lg">
                Students spend countless hours searching YouTube, blogs, university
                websites, and forums to understand how to achieve their career goals.
                Valuable information exists—but it&apos;s spread across dozens of
                sources.
              </p>
              <p className="font-heading text-base leading-[1.75] text-midnight-blue/80 sm:text-lg">
                Instead of spending hours deciding what to learn next, ALTAIR
                organizes everything into a structured roadmap tailored to your
                current stage, goals, and preferred learning style.
              </p>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              <WhyAltairPathVisual />
            </motion.div>

            <motion.blockquote
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-2xl border border-nebula-teal/20 bg-gradient-to-br from-nebula-teal/[0.08] via-white to-white px-6 py-5 shadow-[0_8px_32px_rgba(20,184,166,0.08)]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-nebula-teal/80 to-nebula-teal/30"
              />
              <p className="font-heading text-lg font-semibold leading-snug text-deep-space sm:text-xl">
                One goal. One personalized roadmap. One clear direction.
              </p>
            </motion.blockquote>
          </div>

          {/* Right — pain point cards */}
          <div className="flex flex-col gap-4">
            {painPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -3, scale: 1.01 }}
                className="group relative overflow-hidden rounded-2xl border border-blue-400/15 bg-[#0a1224]/90 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-nebula-teal/30 hover:shadow-[0_16px_48px_rgba(15,23,42,0.24),0_0_0_1px_rgba(20,184,166,0.1)] sm:p-7"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-nebula-teal/60 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div
                  aria-hidden="true"
                  className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-nebula-teal/8 blur-2xl transition-all duration-300 group-hover:bg-nebula-teal/15"
                />

                <div className="relative flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border border-blue-400/20 bg-blue-950/50">
                    <point.icon className="h-5 w-5 text-nebula-teal" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[11px] font-semibold tracking-[0.14em] text-nebula-teal/70">
                        {point.step}
                      </span>
                      <h3 className="font-heading text-base font-semibold leading-snug text-white/95 sm:text-lg">
                        {point.title}
                      </h3>
                    </div>
                    <p className="mt-2.5 text-sm leading-7 text-blue-100/60 sm:text-[15px]">
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
