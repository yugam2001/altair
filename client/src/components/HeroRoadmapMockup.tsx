import { motion, useReducedMotion } from 'framer-motion'
import AltairSignatureBadge from './roadmap/AltairSignatureBadge'
import { CheckCircle2 } from 'lucide-react'

const CARD_SHELL =
  'overflow-hidden rounded-[1.75rem] border border-blue-400/20 bg-[#0a1224]/90 shadow-[0_24px_64px_rgba(15,23,42,0.28),0_8px_24px_rgba(20,184,166,0.08),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl'

interface RoadmapCardData {
  career: string
  country: string
  timeline: string
  style: string
  progress: number
  milestones: ReadonlyArray<{ title: string; month: string }>
  phases: ReadonlyArray<{ phase: number; title: string; duration: string }>
  checklist: readonly string[]
  projects: readonly string[]
}

const SOFTWARE_ENGINEER: RoadmapCardData = {
  career: 'Software Engineer',
  country: 'India',
  timeline: '8 months',
  style: 'Visual',
  progress: 38,
  milestones: [
    { title: 'Foundations', month: '1–2' },
    { title: 'Core Skills', month: '3–5' },
    { title: 'Portfolio', month: '6–8' },
  ],
  phases: [
    { phase: 1, title: 'Programming Basics', duration: '8 weeks' },
    { phase: 2, title: 'Full-Stack Development', duration: '12 weeks' },
  ],
  checklist: [
    'Complete Python fundamentals',
    'Build REST API project',
    'Deploy first application',
  ],
  projects: ['Task Manager API', 'Portfolio Site', 'Capstone App'],
}

const DATA_SCIENTIST: RoadmapCardData = {
  career: 'Data Scientist',
  country: 'Canada',
  timeline: '10 months',
  style: 'Hands-on',
  progress: 52,
  milestones: [
    { title: 'Statistics & Python', month: '1–3' },
    { title: 'Machine Learning', month: '4–7' },
    { title: 'Capstone Project', month: '8–10' },
  ],
  phases: [
    { phase: 1, title: 'Data Foundations', duration: '10 weeks' },
    { phase: 2, title: 'ML & Deployment', duration: '14 weeks' },
  ],
  checklist: [
    'Master pandas & visualization',
    'Train classification models',
    'Publish Kaggle portfolio',
  ],
  projects: ['EDA Dashboard', 'Churn Predictor', 'ML Pipeline'],
}

const PRODUCT_DESIGNER: RoadmapCardData = {
  career: 'Product Designer',
  country: 'UK',
  timeline: '6 months',
  style: 'Project-based',
  progress: 64,
  milestones: [
    { title: 'Design Fundamentals', month: '1–2' },
    { title: 'UX Research', month: '3–4' },
    { title: 'Portfolio Build', month: '5–6' },
  ],
  phases: [
    { phase: 1, title: 'Visual & UI Systems', duration: '6 weeks' },
    { phase: 2, title: 'Product Thinking', duration: '8 weeks' },
  ],
  checklist: [
    'Complete Figma mastery',
    'Run user research sprint',
    'Ship case study portfolio',
  ],
  projects: ['Mobile Banking App', 'SaaS Dashboard', 'Design System'],
}

function RoadmapPreviewCard({ data }: { data: RoadmapCardData }) {
  return (
    <div className={CARD_SHELL}>
      <div className="h-[2px] bg-blue-950/60">
        <div
          className="h-full bg-gradient-to-r from-nebula-teal/80 via-blue-400/70 to-blue-200/60"
          style={{ width: `${data.progress}%` }}
        />
      </div>

      <div className="p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="font-display text-[11px] font-semibold tracking-[0.16em] text-white/90 uppercase">
              ALTAIR
            </p>
            <p className="mt-0.5 text-[10px] text-blue-200/50">Find your way forward.</p>
          </div>
          <AltairSignatureBadge label="AI Crafted" />
        </div>

        <h3 className="text-base font-semibold leading-snug tracking-tight text-white sm:text-[17px]">
          Your path to becoming a{' '}
          <span className="text-blue-200">{data.career}</span>
        </h3>

        <ul className="mt-3.5 flex flex-wrap gap-1.5">
          {[
            { label: 'Country', value: data.country },
            { label: 'Timeline', value: data.timeline },
            { label: 'Style', value: data.style },
          ].map((chip) => (
            <li key={chip.label}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/20 bg-blue-950/40 px-2 py-0.5 text-[10px]">
                <span className="text-blue-200/50">{chip.label}</span>
                <span className="font-medium text-blue-100/85">{chip.value}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-5 rounded-xl border border-blue-400/12 bg-[#081020]/70 p-3.5">
          <p className="text-[10px] font-medium tracking-wide text-blue-200/50 uppercase">
            Timeline
          </p>
          <p className="mt-1 text-[11px] text-blue-100/60">
            Total duration:{' '}
            <span className="font-medium text-white">{data.timeline}</span>
          </p>
          <div className="mt-3 space-y-2.5">
            {data.milestones.map((milestone, index) => (
              <div key={milestone.title} className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-400/25 bg-blue-950/50 text-[10px] font-semibold text-blue-200">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-medium text-white">
                    {milestone.title}
                  </p>
                  <p className="text-[10px] text-blue-200/45">Month {milestone.month}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 space-y-2">
          {data.phases.map((phase) => (
            <div
              key={phase.phase}
              className="rounded-lg border border-blue-400/10 bg-[#060d1f]/50 px-3 py-2.5"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-medium text-blue-300/60">
                  Phase {phase.phase}
                </span>
                <span className="text-[11px] font-medium text-white">{phase.title}</span>
                <span className="ml-auto text-[10px] text-blue-200/45">{phase.duration}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 rounded-xl border border-blue-400/10 bg-[#060d1f]/40 p-3">
          <p className="text-[10px] font-medium tracking-wide text-blue-200/50 uppercase">
            Milestones
          </p>
          <ul className="mt-2 space-y-1.5">
            {data.checklist.map((item) => (
              <li key={item} className="flex items-center gap-2 text-[11px] text-blue-100/75">
                <CheckCircle2 className="h-3 w-3 shrink-0 text-nebula-teal/80" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-3">
          <p className="mb-1.5 text-[10px] font-medium tracking-wide text-blue-200/50 uppercase">
            Projects
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {data.projects.map((project) => (
              <li key={project}>
                <span className="inline-block rounded-full border border-blue-400/18 bg-blue-950/40 px-2 py-0.5 text-[10px] text-blue-100/75">
                  {project}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

interface FloatingCardProps {
  data: RoadmapCardData
  className: string
  floatOffset?: number
  floatDelay?: number
  dimmed?: boolean
}

function FloatingCard({
  data,
  className,
  floatOffset = 0,
  floatDelay = 0,
  dimmed = false,
}: FloatingCardProps) {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      className={`absolute inset-x-0 top-0 w-full ${className}`}
      animate={
        prefersReducedMotion
          ? undefined
          : {
              y: [floatOffset, floatOffset - 12, floatOffset],
            }
      }
      transition={{
        duration: 5.5 + floatDelay,
        delay: floatDelay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={dimmed ? { filter: 'brightness(0.88) saturate(0.95)' } : undefined}
    >
      <RoadmapPreviewCard data={data} />
    </motion.div>
  )
}

export default function HeroRoadmapMockup() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="relative mx-auto w-full max-w-[640px] px-4 sm:px-8 lg:mx-0 lg:max-w-none lg:px-0">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 rounded-[2.5rem] bg-nebula-teal/10 blur-3xl"
        animate={
          prefersReducedMotion ? { opacity: 0.5 } : { opacity: [0.35, 0.55, 0.35] }
        }
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Stack container — tall enough for full cards + side peek */}
      <div className="relative mx-auto w-full max-w-[480px] pb-2 pt-2">
        {/* Spacer matches card height so layout doesn't collapse */}
        <div className="invisible pointer-events-none" aria-hidden="true">
          <RoadmapPreviewCard data={SOFTWARE_ENGINEER} />
        </div>

        {/* Left card — full size, shifted left, peeks out prominently */}
        <FloatingCard
          data={DATA_SCIENTIST}
          className="z-10 -translate-x-[38%] -rotate-[10deg] sm:-translate-x-[42%]"
          floatOffset={-4}
          floatDelay={0.3}
          dimmed
        />

        {/* Right card — full size, shifted right, peeks out prominently */}
        <FloatingCard
          data={PRODUCT_DESIGNER}
          className="z-10 translate-x-[38%] rotate-[10deg] sm:translate-x-[42%]"
          floatOffset={4}
          floatDelay={0.8}
          dimmed
        />

        {/* Front card */}
        <motion.div
          className="absolute inset-x-0 top-0 z-30 w-full rotate-[2deg]"
          animate={
            prefersReducedMotion
              ? undefined
              : { y: [0, -14, 0], rotate: [2, 1.5, 2] }
          }
          transition={{
            y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <RoadmapPreviewCard data={SOFTWARE_ENGINEER} />
        </motion.div>
      </div>
    </div>
  )
}
