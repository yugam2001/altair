import { motion } from 'framer-motion'
import { Search, Shuffle, Sparkles } from 'lucide-react'
import SectionHeader from './SectionHeader'

const painPoints = [
  {
    icon: Search,
    title: 'Scattered Information',
    description:
      'Educational guidance is spread across videos, blogs, university websites, and community forums, making it difficult to know where to begin.',
  },
  {
    icon: Shuffle,
    title: 'Conflicting Advice',
    description:
      'Different people recommend different paths. ALTAIR helps organize those possibilities into a clear and structured direction.',
  },
  {
    icon: Sparkles,
    title: 'Personalized Roadmap',
    description:
      'Receive an AI-generated roadmap based on your education level, career goal, country, learning preferences, and available study time.',
  },
] as const

export default function WhyAltair() {
  return (
    <section id="why-altair" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Why choose ALTAIR?"
          subtitle="Every learner deserves a clear path. ALTAIR transforms scattered educational information into one personalized AI-powered roadmap."
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-lg space-y-6 text-secondary-text"
          >
            <h3 className="text-xl font-semibold leading-snug text-deep-space sm:text-2xl">
              Finding the right path shouldn&apos;t be this difficult.
            </h3>
            <p className="text-base leading-7 sm:text-lg">
              Students spend countless hours searching YouTube, blogs, university
              websites, and forums to understand how to achieve their career goals.
              Valuable information exists—but it&apos;s spread across dozens of
              sources.
            </p>
            <p className="text-base leading-7 sm:text-lg">
              Instead of spending hours deciding what to learn next, ALTAIR
              organizes everything into a structured roadmap tailored to your
              current stage, goals, and preferred learning style.
            </p>
            <p className="text-lg font-bold leading-snug text-deep-space sm:text-xl">
              One goal. One personalized roadmap. One clear direction.
            </p>
          </motion.div>

          <div className="flex flex-col gap-5">
            {painPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }}
                whileHover={{ y: -2.5 }}
                className="group flex items-start gap-5 rounded-[20px] border border-gray-100/80 bg-surface p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_4px_12px_rgba(15,23,42,0.03)] transition-all duration-300 hover:border-nebula-teal/20 hover:shadow-[0_4px_16px_rgba(15,23,42,0.06),0_8px_24px_rgba(20,184,166,0.06)]"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-nebula-teal/10">
                  <point.icon
                    className="h-6 w-6 text-nebula-teal"
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold leading-snug text-deep-space">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-secondary-text">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
