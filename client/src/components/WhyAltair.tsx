import { motion } from 'framer-motion'
import { Search, Shuffle, Sparkles } from 'lucide-react'
import SectionHeader from './SectionHeader'

const painPoints = [
  {
    icon: Search,
    title: 'Scattered information',
    description:
      'Students spend countless hours searching YouTube, blogs, websites, and forums.',
  },
  {
    icon: Shuffle,
    title: 'Conflicting advice',
    description:
      'Every source says something different, making it hard to know what actually matters.',
  },
  {
    icon: Sparkles,
    title: 'One clear path',
    description:
      'ALTAIR brings everything together into one personalized AI-generated roadmap.',
  },
] as const

export default function WhyAltair() {
  return (
    <section id="why-altair" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Why ALTAIR?"
          subtitle="The path to your dream career shouldn't feel like a maze."
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="space-y-5 text-secondary-text"
          >
            <p className="text-base leading-relaxed sm:text-lg">
              Students spend countless hours searching YouTube, blogs, websites,
              and forums trying to understand the path toward their dream career.
            </p>
            <p className="text-base leading-relaxed sm:text-lg">
              Information is scattered. Advice is often conflicting. What should
              be an exciting journey becomes overwhelming uncertainty.
            </p>
            <p className="text-base font-medium leading-relaxed text-primary-text sm:text-lg">
              ALTAIR brings everything together into one personalized
              AI-generated roadmap designed around the learner&apos;s current
              stage.
            </p>
          </motion.div>

          <div className="flex flex-col gap-4">
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
                className="flex gap-4 rounded-2xl border border-gray-100 bg-surface p-6 transition-shadow duration-300 hover:shadow-sm"
              >
                <div className="shrink-0 rounded-xl bg-nebula-teal/10 p-3">
                  <point.icon
                    className="h-5 w-5 text-nebula-teal"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-deep-space">{point.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-secondary-text">
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
