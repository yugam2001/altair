import { motion, useReducedMotion } from 'framer-motion'
import {
  Sparkles,
  Sprout,
  Compass,
  BookOpen,
  Rocket,
  Brain,
  Target,
  Globe,
  Shield,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import OurVisionBackground from './OurVisionBackground'

const glassCard =
  'rounded-2xl border border-white/80 bg-white/65 shadow-[0_8px_40px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-md transition-[transform,box-shadow,border-color] duration-300'

const journeySteps = [
  {
    icon: Sprout,
    title: 'Discover Yourself',
    description: 'Understand your strengths, interests, and starting point.',
  },
  {
    icon: Compass,
    title: 'Understand Your Path',
    description: 'See where you are today and where you want to go.',
  },
  {
    icon: BookOpen,
    title: 'Build Your Skills',
    description: 'Learn what matters at each stage of your journey.',
  },
  {
    icon: Rocket,
    title: 'Achieve Your Goal',
    description: 'Reach your target with confidence and clarity.',
  },
] as const

const principles = [
  {
    icon: Brain,
    title: 'Human-Centered',
    lines: ['AI supports people.', 'It never replaces human judgement.'],
  },
  {
    icon: Target,
    title: 'Personalized',
    lines: [
      "Every roadmap is tailored to the learner's current stage, goals, and learning preferences.",
    ],
  },
  {
    icon: Globe,
    title: 'Accessible',
    lines: [
      'Career guidance should be available to everyone regardless of location or background.',
    ],
  },
  {
    icon: Shield,
    title: 'Responsible',
    lines: [
      'Recommendations remain transparent, explainable, and encourage users to verify important decisions.',
    ],
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

function JourneyConnector({ horizontal }: { horizontal: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={
        horizontal
          ? 'relative hidden min-w-[2.5rem] flex-1 items-center md:flex'
          : 'relative flex h-10 items-center justify-center md:hidden'
      }
    >
      {horizontal ? (
        <>
          <div className="h-px w-full bg-gradient-to-r from-nebula-teal/10 via-nebula-teal/35 to-nebula-teal/10" />
          <div className="absolute inset-x-4 h-px bg-nebula-teal/20 blur-[3px]" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-nebula-teal/45">
            →
          </span>
        </>
      ) : (
        <>
          <div className="h-full w-px bg-gradient-to-b from-nebula-teal/10 via-nebula-teal/35 to-nebula-teal/10" />
          <div className="absolute inset-y-1 w-px bg-nebula-teal/20 blur-[2px]" />
        </>
      )}
    </div>
  )
}

function JourneyStepCard({
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
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.article
      {...fadeUp(index * 0.08)}
      whileHover={{ y: -4 }}
      className={`group relative flex flex-1 flex-col items-center text-center ${glassCard} px-5 py-7 hover:border-nebula-teal/20 hover:shadow-[0_16px_48px_rgba(15,23,42,0.09),0_0_0_1px_rgba(20,184,166,0.08)] sm:px-6 sm:py-8`}
    >
      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : { y: [0, -3, 0] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 5 + index * 0.6, repeat: Infinity, ease: 'easeInOut' }
        }
        className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-100/90 bg-white shadow-[0_4px_16px_rgba(15,23,42,0.05)] transition-shadow duration-300 group-hover:shadow-[0_8px_24px_rgba(20,184,166,0.12)]"
      >
        <Icon className="h-6 w-6 text-nebula-teal" strokeWidth={1.75} aria-hidden="true" />
      </motion.div>
      <h3 className="font-heading text-base font-semibold text-deep-space sm:text-lg">
        {title}
      </h3>
      <p className="mt-2 max-w-[13rem] text-sm leading-relaxed text-secondary-text">
        {description}
      </p>
    </motion.article>
  )
}

function QuoteStar() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.span
      aria-hidden="true"
      className="relative mx-auto mb-6 flex h-8 w-8 items-center justify-center"
      animate={
        prefersReducedMotion
          ? undefined
          : { opacity: [0.7, 1, 0.7], scale: [0.96, 1, 0.96] }
      }
      transition={
        prefersReducedMotion
          ? undefined
          : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
      }
    >
      <span className="absolute inset-0 rounded-full bg-nebula-teal/20 blur-md" />
      <svg viewBox="0 0 24 24" className="relative h-5 w-5" fill="none">
        <path
          d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.8L12 15.6 6.4 19.6l2.1-6.8L3 8.8h6.8L12 2z"
          fill="#14b8a6"
          fillOpacity="0.9"
        />
      </svg>
    </motion.span>
  )
}

export default function OurVision() {
  return (
    <section
      id="vision"
      className="relative overflow-hidden border-t-[3px] border-midnight-blue/30 bg-gradient-to-b from-surface via-white to-surface px-6 py-24 md:py-32"
    >
      <OurVisionBackground />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          {...fadeUp()}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-nebula-teal shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Our Vision
          </span>
          <h2 className="mt-7 font-heading text-3xl font-semibold leading-tight tracking-tight text-deep-space sm:text-4xl md:text-[2.65rem] md:leading-[1.12]">
            Helping every learner find their way forward.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-secondary-text sm:text-lg sm:leading-8">
            Choosing an education or career path shouldn&apos;t feel overwhelming.
            ALTAIR exists to transform uncertainty into clarity by providing
            personalized AI-powered guidance that respects human decision-making
            and helps learners confidently navigate their future.
          </p>
        </motion.div>

        {/* Journey visualization */}
        <div className="mt-20 md:mt-24">
          <motion.p
            {...fadeUp(0.05)}
            className="mb-10 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-secondary-text"
          >
            The journey we guide you through
          </motion.p>

          <div className="hidden items-stretch gap-0 md:flex">
            {journeySteps.map((step, index) => (
              <div key={step.title} className="flex min-w-0 flex-1 items-stretch">
                <JourneyStepCard {...step} index={index} />
                {index < journeySteps.length - 1 && (
                  <JourneyConnector horizontal />
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col items-stretch gap-0 md:hidden">
            {journeySteps.map((step, index) => (
              <div key={step.title} className="flex flex-col items-stretch">
                <JourneyStepCard {...step} index={index} />
                {index < journeySteps.length - 1 && (
                  <JourneyConnector horizontal={false} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mission card */}
        <motion.article
          {...fadeUp(0.1)}
          whileHover={{ y: -2 }}
          className={`mx-auto mt-20 max-w-3xl border-nebula-teal/20 px-8 py-10 sm:px-10 sm:py-12 md:mt-24 ${glassCard} hover:border-nebula-teal/30 hover:shadow-[0_20px_56px_rgba(15,23,42,0.08),0_0_0_1px_rgba(20,184,166,0.06)]`}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-nebula-teal">
            Our Mission
          </p>
          <p className="mt-4 font-heading text-xl font-semibold leading-snug text-deep-space sm:text-2xl">
            We believe guidance should be accessible to everyone—not only those
            who can afford expensive counselling.
          </p>
          <p className="mt-4 text-base leading-relaxed text-secondary-text sm:text-lg sm:leading-8">
            ALTAIR combines structured education pathways with Responsible AI to
            help learners make informed decisions with confidence.
          </p>
        </motion.article>

        {/* Guiding principles */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:gap-6">
          {principles.map((principle, index) => (
            <motion.article
              key={principle.title}
              {...fadeUp(0.12 + index * 0.06)}
              whileHover={{ y: -4 }}
              className={`${glassCard} px-6 py-7 hover:border-nebula-teal/15 hover:shadow-[0_16px_48px_rgba(15,23,42,0.08)] sm:px-7 sm:py-8`}
            >
              <div className="mb-4 inline-flex rounded-xl border border-gray-100/90 bg-white/90 p-2.5 shadow-sm">
                <principle.icon
                  className="h-5 w-5 text-nebula-teal"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </div>
              <h3 className="font-heading text-lg font-semibold text-deep-space">
                {principle.title}
              </h3>
              <div className="mt-2 space-y-1">
                {principle.lines.map((line) => (
                  <p key={line} className="text-sm leading-relaxed text-secondary-text sm:text-[15px]">
                    {line}
                  </p>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Closing quote */}
        <motion.blockquote
          {...fadeUp(0.2)}
          className="mx-auto mt-20 max-w-2xl text-center md:mt-24"
        >
          <QuoteStar />
          <p className="font-heading text-xl font-semibold leading-relaxed text-deep-space sm:text-2xl sm:leading-snug">
            &ldquo;Every learner deserves a clear direction.
            <br className="hidden sm:block" />
            {' '}
            ALTAIR simply helps illuminate the path.&rdquo;
          </p>
        </motion.blockquote>
      </div>
    </section>
  )
}
