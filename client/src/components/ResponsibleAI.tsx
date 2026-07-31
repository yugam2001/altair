import { motion, useReducedMotion } from 'framer-motion'
import {
  Shield,
  Eye,
  Heart,
  Lightbulb,
  Users,
  Sparkles,
  UserCheck,
  UserRound,
  ArrowRight,
  Scale,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import ResponsibleAIBackground from './ResponsibleAIBackground'

const glassCard =
  'rounded-2xl border border-white/80 bg-white/70 shadow-[0_8px_40px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-md transition-[transform,box-shadow,border-color] duration-300'

const trustFlow = [
  {
    icon: UserRound,
    title: 'You share your context',
    description: 'Goals, stage, and preferences stay at the center.',
  },
  {
    icon: Sparkles,
    title: 'ALTAIR provides guidance',
    description: 'Structured pathways tailored to where you are today.',
  },
  {
    icon: UserCheck,
    title: 'You make the decision',
    description: 'Every important choice remains yours to make.',
  },
] as const

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

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 } as const,
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true, margin: '-60px' } as const,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  }
}

function TrustStep({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: LucideIcon
  title: string
  description: string
  index: number
}) {
  return (
    <motion.div
      {...fadeUp(index * 0.08)}
      whileHover={{ y: -3 }}
      className={`relative flex flex-1 flex-col items-center px-4 py-6 text-center sm:px-5 sm:py-7 ${glassCard} hover:border-nebula-teal/20 hover:shadow-[0_14px_44px_rgba(15,23,42,0.08)]`}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-gray-100/90 bg-white shadow-sm">
        <Icon className="h-5 w-5 text-nebula-teal" strokeWidth={1.75} aria-hidden="true" />
      </div>
      <h3 className="font-heading text-base font-semibold text-deep-space sm:text-lg">
        {title}
      </h3>
      <p className="mt-2 max-w-[14rem] text-sm leading-relaxed text-secondary-text">
        {description}
      </p>
    </motion.div>
  )
}

function FlowArrow({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center text-nebula-teal/40 ${className}`}
    >
      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
    </div>
  )
}

export default function ResponsibleAI() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section
      id="responsible-ai"
      className="relative overflow-hidden bg-gradient-to-b from-white via-surface/80 to-white px-6 py-24 md:py-32"
    >
      <ResponsibleAIBackground />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div {...fadeUp()} className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-nebula-teal shadow-sm backdrop-blur-sm">
            <Shield className="h-3.5 w-3.5" aria-hidden="true" />
            Responsible AI
          </span>
          <h2 className="mt-7 font-heading text-3xl font-semibold leading-tight tracking-tight text-deep-space sm:text-4xl md:text-[2.65rem] md:leading-[1.12]">
            Intelligent guidance that puts people first.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-secondary-text sm:text-lg sm:leading-8">
            Education and career decisions are too important for black-box
            answers. ALTAIR is built on transparency, fairness, and
            human-centered design—so AI assists your journey without taking
            control of it.
          </p>
        </motion.div>

        {/* Human-in-the-loop flow */}
        <div className="mt-16 md:mt-20">
          <motion.p
            {...fadeUp(0.05)}
            className="mb-8 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-secondary-text"
          >
            How responsibility works in practice
          </motion.p>

          <div className="hidden items-stretch gap-3 md:flex lg:gap-4">
            {trustFlow.map((step, index) => (
              <div key={step.title} className="flex min-w-0 flex-1 items-center">
                <TrustStep {...step} index={index} />
                {index < trustFlow.length - 1 && <FlowArrow className="mx-1 lg:mx-2" />}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 md:hidden">
            {trustFlow.map((step, index) => (
              <div key={step.title} className="flex flex-col items-stretch gap-3">
                <TrustStep {...step} index={index} />
                {index < trustFlow.length - 1 && (
                  <FlowArrow className="rotate-90 py-1" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* What / Why / How */}
        <div className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-[1fr_1fr_1.15fr] lg:gap-7">
          <motion.article
            {...fadeUp(0.1)}
            whileHover={{ y: -3 }}
            className={`${glassCard} px-7 py-8 hover:border-nebula-teal/15 sm:px-8 sm:py-9`}
          >
            <div className="mb-5 inline-flex rounded-xl border border-nebula-teal/15 bg-nebula-teal/10 p-2.5">
              <Eye className="h-5 w-5 text-nebula-teal" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-nebula-teal">
              What
            </p>
            <h3 className="mt-2 font-heading text-xl font-semibold text-deep-space">
              What is Responsible AI?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-secondary-text sm:text-[15px]">
              Responsible AI means designing intelligent systems that are
              transparent, fair, human-centered, and assist users instead of
              replacing human decision making.
            </p>
          </motion.article>

          <motion.article
            {...fadeUp(0.14)}
            whileHover={{ y: -3 }}
            className={`${glassCard} px-7 py-8 hover:border-star-gold/25 sm:px-8 sm:py-9`}
          >
            <div className="mb-5 inline-flex rounded-xl border border-star-gold/20 bg-star-gold/10 p-2.5">
              <Heart className="h-5 w-5 text-star-gold" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-star-gold">
              Why
            </p>
            <h3 className="mt-2 font-heading text-xl font-semibold text-deep-space">
              Why it matters
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-secondary-text sm:text-[15px]">
              Because education and career decisions are important. AI should
              guide users responsibly rather than pretending to always be
              correct.
            </p>
          </motion.article>

          <motion.article
            {...fadeUp(0.18)}
            whileHover={{ y: -2 }}
            className={`${glassCard} border-nebula-teal/15 px-7 py-8 lg:row-span-1 sm:px-8 sm:py-9`}
          >
            <div className="mb-5 inline-flex rounded-xl border border-deep-space/10 bg-deep-space/5 p-2.5">
              <Scale className="h-5 w-5 text-deep-space" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-deep-space/70">
              How
            </p>
            <h3 className="mt-2 font-heading text-xl font-semibold text-deep-space">
              How ALTAIR implements it
            </h3>
            <ul className="mt-5 space-y-3.5">
              {principles.map((item, index) => (
                <motion.li
                  key={item.text}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.22 + index * 0.06 }}
                  className="flex items-start gap-3 rounded-xl border border-gray-100/80 bg-white/60 px-3.5 py-3"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-nebula-teal/10">
                    <item.icon
                      className="h-3.5 w-3.5 text-nebula-teal"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-sm leading-relaxed text-secondary-text sm:text-[15px]">
                    {item.text}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.article>
        </div>

        {/* Closing commitment */}
        <motion.div
          {...fadeUp(0.22)}
          animate={
            prefersReducedMotion
              ? undefined
              : { boxShadow: ['0 8px 32px rgba(15,23,42,0.05)', '0 12px 40px rgba(20,184,166,0.08)', '0 8px 32px rgba(15,23,42,0.05)'] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
          }
          className={`mx-auto mt-16 max-w-3xl border-nebula-teal/20 px-8 py-8 text-center sm:px-10 sm:py-9 md:mt-20 ${glassCard}`}
        >
          <p className="font-heading text-lg font-semibold leading-snug text-deep-space sm:text-xl">
            ALTAIR assists. You decide.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-secondary-text sm:text-base">
            We encourage every learner to verify official requirements and speak
            with trusted advisors before making major education or career
            choices.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
