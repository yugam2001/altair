import { motion } from 'framer-motion'
import SectionHeader from './SectionHeader'

const painPoints = [
  {
    num: '01',
    title: 'Scattered Information',
    description:
      'Guidance spread across videos, blogs, university sites, and forums—hard to know where to begin.',
    accent: 'bg-nebula-teal',
  },
  {
    num: '02',
    title: 'Conflicting Advice',
    description:
      'Different people recommend different paths. ALTAIR organizes them into one clear direction.',
    accent: 'bg-star-gold',
  },
  {
    num: '03',
    title: 'Personalized Roadmap',
    description:
      'An AI roadmap built from your education level, career goal, country, and study schedule.',
    accent: 'bg-midnight-blue',
  },
] as const

const withoutItems = [
  'Dozens of tabs open, no clear order',
  'Conflicting advice from every source',
  'No idea what to learn next',
]

const withItems = [
  'One structured roadmap',
  'Phases matched to your stage',
  'Clear next steps every week',
]

export default function WhyAltair() {
  return (
    <section
      id="why-altair"
      className="relative border-t-[3px] border-nebula-teal bg-gradient-to-b from-teal-50/40 via-white to-white px-6 py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-16 hidden h-64 w-64 rounded-full bg-nebula-teal/[0.04] blur-3xl lg:block"
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeader
          align="left"
          title="Why choose ALTAIR?"
          subtitle="Every learner deserves a clear path. ALTAIR transforms scattered educational information into one personalized AI-powered roadmap."
        />

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 overflow-hidden rounded-2xl border-2 border-gray-200/90 shadow-[0_12px_48px_rgba(15,23,42,0.07)] md:grid md:grid-cols-2"
        >
          <div className="bg-gray-100/90 px-7 py-8 sm:px-9 sm:py-10">
            <p className="inline-block rounded-md bg-gray-200/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-gray-600">
              Without ALTAIR
            </p>
            <ul className="mt-5 space-y-4">
              {withoutItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-gray-600">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-gray-300/60 text-xs font-bold text-gray-600">
                    ✕
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t-2 border-gray-200/90 bg-teal-50/50 px-7 py-8 sm:px-9 sm:py-10 md:border-t-0 md:border-l-2">
            <p className="inline-block rounded-md bg-nebula-teal/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-nebula-teal">
              With ALTAIR
            </p>
            <ul className="mt-5 space-y-4">
              {withItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] font-medium text-deep-space">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-nebula-teal text-xs font-bold text-white">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-lg space-y-6"
          >
            <h3 className="font-heading text-2xl font-semibold leading-snug text-deep-space sm:text-[1.75rem]">
              Finding the right path shouldn&apos;t be this difficult.
            </h3>
            <p className="text-base leading-7 text-secondary-text sm:text-lg">
              Students spend countless hours searching YouTube, blogs, university
              websites, and forums. Valuable information exists—it&apos;s just
              spread across dozens of sources.
            </p>
            <p className="rounded-xl border border-nebula-teal/20 bg-white/80 px-5 py-4 font-heading text-lg font-semibold leading-snug text-nebula-teal shadow-sm sm:text-xl">
              One goal. One personalized roadmap. One clear direction.
            </p>
          </motion.div>

          <div className="flex flex-col gap-4">
            {painPoints.map((point, index) => (
              <motion.article
                key={point.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
                whileHover={{ x: 4 }}
                className="group relative overflow-hidden rounded-xl border border-gray-200/80 bg-white py-5 pl-6 pr-5 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md sm:py-6 sm:pl-7"
              >
                <div
                  aria-hidden="true"
                  className={`absolute bottom-0 left-0 top-0 w-1.5 ${point.accent}`}
                />
                <div className="flex items-baseline gap-4">
                  <span className="text-2xl font-bold tabular-nums text-gray-200 transition-colors duration-300 group-hover:text-nebula-teal/50">
                    {point.num}
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-deep-space sm:text-lg">
                      {point.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-secondary-text">
                      {point.description}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
