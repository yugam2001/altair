import { motion } from 'framer-motion'
import { UserRound, Brain, MapPinned } from 'lucide-react'
import SectionHeader from './SectionHeader'

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

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="How It Works"
          subtitle="Three simple steps from uncertainty to a clear path forward."
        />

        <div className="relative mt-20">
          <div
            className="absolute top-14 right-[16.67%] left-[16.67%] hidden h-px md:block"
            aria-hidden="true"
          >
            <div className="h-full w-full bg-gradient-to-r from-transparent via-nebula-teal/30 to-transparent" />
          </div>

          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.15,
                  ease: 'easeOut',
                }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 mb-6">
                  <div className="flex h-28 w-28 flex-col items-center justify-center rounded-2xl border border-gray-100 bg-surface shadow-sm transition-shadow duration-300 hover:shadow-md">
                    <step.icon
                      className="h-8 w-8 text-nebula-teal"
                      aria-hidden="true"
                    />
                    <span className="mt-2 text-xs font-bold tracking-wider text-nebula-teal">
                      {step.number}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className="absolute top-1/2 -right-6 hidden h-px w-12 -translate-y-1/2 bg-nebula-teal/20 md:block lg:hidden"
                      aria-hidden="true"
                    />
                  )}
                </div>

                <h3 className="text-lg font-semibold text-deep-space">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-secondary-text">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
