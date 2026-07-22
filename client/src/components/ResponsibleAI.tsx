import { motion } from 'framer-motion'
import {
  Eye,
  Heart,
  CheckCircle2,
  Lightbulb,
  Shield,
  Users,
  Sparkles,
  UserCheck,
} from 'lucide-react'
import SectionHeader from './SectionHeader'

const principles = [
  {
    icon: Lightbulb,
    text: 'Generates guidance instead of guarantees.',
  },
  {
    icon: Shield,
    text: 'Encourages users to verify official admission requirements.',
  },
  {
    icon: Users,
    text: 'Does not replace teachers or career counselors.',
  },
  {
    icon: Sparkles,
    text: 'Uses AI to simplify complex educational journeys.',
  },
  {
    icon: UserCheck,
    text: 'Keeps humans in control of final decisions.',
  },
] as const

export default function ResponsibleAI() {
  return (
    <section id="responsible-ai" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Responsible AI at ALTAIR"
          subtitle="Intelligent guidance built on transparency, fairness, and human-centered design."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
          >
            <div className="mb-5 inline-flex rounded-xl bg-nebula-teal/10 p-3">
              <Eye className="h-6 w-6 text-nebula-teal" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-deep-space">
              What is Responsible AI?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-secondary-text">
              Responsible AI means designing intelligent systems that are
              transparent, fair, human-centered, and assist users instead of
              replacing human decision making.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
          >
            <div className="mb-5 inline-flex rounded-xl bg-star-gold/15 p-3">
              <Heart className="h-6 w-6 text-star-gold" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold text-deep-space">
              Why do we follow Responsible AI?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-secondary-text">
              Because education and career decisions are important. AI should
              guide users responsibly rather than pretending to always be
              correct.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm lg:col-span-1"
          >
            <div className="mb-5 inline-flex rounded-xl bg-deep-space/5 p-3">
              <CheckCircle2
                className="h-6 w-6 text-deep-space"
                aria-hidden="true"
              />
            </div>
            <h3 className="text-lg font-semibold text-deep-space">
              How does ALTAIR implement Responsible AI?
            </h3>
            <ul className="mt-4 space-y-3">
              {principles.map((item, index) => (
                <motion.li
                  key={item.text}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                  className="flex items-start gap-3 text-sm leading-relaxed text-secondary-text"
                >
                  <item.icon
                    className="mt-0.5 h-4 w-4 shrink-0 text-nebula-teal"
                    aria-hidden="true"
                  />
                  {item.text}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
