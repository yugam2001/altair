import { motion, useReducedMotion } from 'framer-motion'
import {
  Route,
  UserRound,
  Brain,
  MapPinned,
  ArrowRight,
  Layers,
  Flag,
  FolderKanban,
  BookOpen,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import HowItWorksBackground from './HowItWorksBackground'

const glassCard =
  'rounded-2xl border border-white/80 bg-white/70 shadow-[0_8px_40px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-md transition-[transform,box-shadow,border-color] duration-300'

const steps = [
  {
    icon: UserRound,
    number: '01',
    title: 'Tell us about yourself',
    description:
      'Share your career goal, current stage, and how much time you can dedicate each week.',
  },
  {
    icon: Brain,
    number: '02',
    title: 'ALTAIR analyzes your current stage',
    description:
      'Our AI evaluates your inputs to understand where you are and where you want to go.',
  },
  {
    icon: MapPinned,
    number: '03',
    title: 'Receive your personalized roadmap',
    description:
      'Get a structured plan with phases, milestones, projects, and curated resources.',
  },
] as const

const deliverables = [
  { icon: Layers, label: 'Phases matched to your stage' },
  { icon: Flag, label: 'Clear milestones along the way' },
  { icon: FolderKanban, label: 'Projects to build real skills' },
  { icon: BookOpen, label: 'Curated resources for each step' },
] as const

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 } as const,
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true, margin: '-60px' } as const,
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  }
}

function StepCard({
  icon: Icon,
  number,
  title,
  description,
  index,
}: {
  icon: LucideIcon
  number: string
  title: string
  description: string
  index: number
}) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.article
      {...fadeUp(index * 0.08)}
      whileHover={{ y: -4 }}
      className={`relative flex flex-1 flex-col items-center overflow-hidden px-5 py-7 text-center sm:px-6 sm:py-8 ${glassCard} hover:border-nebula-teal/20 hover:shadow-[0_16px_48px_rgba(15,23,42,0.09)]`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-4 select-none font-heading text-7xl font-bold leading-none text-gray-100"
      >
        {number}
      </span>

      <motion.div
        animate={prefersReducedMotion ? undefined : { y: [0, -3, 0] }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 5 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }
        }
        className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-100/90 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.05)]"
      >
        <Icon className="h-6 w-6 text-nebula-teal" strokeWidth={1.75} aria-hidden="true" />
      </motion.div>

      <span className="relative text-[11px] font-bold uppercase tracking-[0.16em] text-nebula-teal">
        Step {number}
      </span>
      <h3 className="relative mt-2 font-heading text-base font-semibold text-deep-space sm:text-lg">
        {title}
      </h3>
      <p className="relative mt-2 max-w-[15rem] text-sm leading-relaxed text-secondary-text">
        {description}
      </p>
    </motion.article>
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

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-gradient-to-b from-white via-surface/70 to-white px-6 py-24 md:py-32"
    >
      <HowItWorksBackground />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div {...fadeUp()} className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-nebula-teal shadow-sm backdrop-blur-sm">
            <Route className="h-3.5 w-3.5" aria-hidden="true" />
            How It Works
          </span>
          <h2 className="mt-7 font-heading text-3xl font-semibold leading-tight tracking-tight text-deep-space sm:text-4xl md:text-[2.65rem] md:leading-[1.12]">
            From uncertainty to a clear path forward.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-secondary-text sm:text-lg sm:leading-8">
            Three simple steps. Answer a short questionnaire, let ALTAIR understand
            where you are, and receive a personalized roadmap built around your
            goals and schedule.
          </p>
        </motion.div>

        {/* Steps flow */}
        <div className="mt-16 md:mt-20">
          <motion.p
            {...fadeUp(0.05)}
            className="mb-8 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-secondary-text"
          >
            Your path in three steps
          </motion.p>

          <div className="hidden items-stretch gap-3 md:flex lg:gap-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex min-w-0 flex-1 items-center">
                <StepCard {...step} index={index} />
                {index < steps.length - 1 && <FlowArrow className="mx-1 lg:mx-2" />}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 md:hidden">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-col items-stretch gap-3">
                <StepCard {...step} index={index} />
                {index < steps.length - 1 && <FlowArrow className="rotate-90 py-1" />}
              </div>
            ))}
          </div>
        </div>

        {/* What you receive */}
        <motion.article
          {...fadeUp(0.15)}
          whileHover={{ y: -2 }}
          className={`mx-auto mt-16 max-w-4xl border-nebula-teal/15 px-7 py-8 sm:px-9 sm:py-10 md:mt-20 ${glassCard} hover:border-nebula-teal/25 hover:shadow-[0_18px_52px_rgba(15,23,42,0.08)]`}
        >
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-nebula-teal">
            What you&apos;ll receive
          </p>
          <h3 className="mt-3 text-center font-heading text-xl font-semibold text-deep-space sm:text-2xl">
            A roadmap designed around you—not a generic checklist.
          </h3>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4">
            {deliverables.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.06 }}
                className="flex items-center gap-3 rounded-xl border border-gray-100/80 bg-white/60 px-4 py-3.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-nebula-teal/10">
                  <item.icon
                    className="h-4 w-4 text-nebula-teal"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </span>
                <span className="text-sm font-medium text-deep-space sm:text-[15px]">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.article>

        {/* Closing */}
        <motion.p
          {...fadeUp(0.2)}
          className="mx-auto mt-12 max-w-xl text-center font-heading text-lg font-semibold leading-snug text-deep-space/80 sm:text-xl md:mt-14"
        >
          Answer a few questions. Get a plan in minutes.
        </motion.p>
      </div>
    </section>
  )
}
