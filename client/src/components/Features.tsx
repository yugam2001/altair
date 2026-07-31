import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Map,
  Layers,
  Compass,
  GraduationCap,
  Route,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import FeaturesBackground from './FeaturesBackground'
import FeatureIconVisual from './FeatureIconVisual'

const AUTO_INTERVAL_MS = 6000

const features = [
  {
    icon: Map,
    title: 'Personalized Roadmaps',
    tagline: 'Plans that start from you',
    description:
      'AI adapts recommendations based on your education level and career goal—so every plan starts from where you actually are.',
    accent: '#14b8a6',
  },
  {
    icon: Layers,
    title: 'Stage-Aware Guidance',
    tagline: 'Right advice for right now',
    description:
      'Recommendations change depending on where you are in your journey today, not where a generic template assumes you should be.',
    accent: '#facc15',
  },
  {
    icon: Compass,
    title: 'Career Navigation',
    tagline: 'Direction you can follow',
    description:
      'Clear direction from your current position to your target role or field, with milestones that make the path feel achievable.',
    accent: '#1e293b',
  },
  {
    icon: GraduationCap,
    title: 'Education Planning',
    tagline: 'Structure for every goal',
    description:
      'Structured pathways for exams, degrees, and specializations that fit your goals—organized into phases you can follow week by week.',
    accent: '#14b8a6',
  },
  {
    icon: Route,
    title: 'Practical Learning Paths',
    tagline: 'Skills you can act on',
    description:
      'Projects, skills, and resources organized into actionable phases, so you always know what to work on next.',
    accent: '#facc15',
  },
  {
    icon: ShieldCheck,
    title: 'Responsible AI Recommendations',
    tagline: 'Guidance, not guarantees',
    description:
      'Transparent guidance that assists your decisions without replacing them—you stay in control of every major choice.',
    accent: '#1e293b',
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

function FeatureDetail({
  feature,
  index,
  onSelect,
  isPaused,
  autoPlayEnabled,
}: {
  feature: (typeof features)[number]
  index: number
  onSelect: (index: number) => void
  isPaused: boolean
  autoPlayEnabled: boolean
}) {
  const Icon = feature.icon

  return (
    <motion.div
      key={feature.title}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-full flex-col overflow-hidden px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl"
        style={{ background: `${feature.accent}14` }}
      />

      <div className="relative flex flex-1 flex-col lg:flex-row lg:items-center lg:gap-10 xl:gap-14">
        <div className="min-w-0 flex-1">
          <div
            className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-100/90 bg-white"
            style={{ boxShadow: `0 4px 28px ${feature.accent}22` }}
          >
            <Icon className="h-6 w-6" style={{ color: feature.accent }} strokeWidth={1.75} />
          </div>

          <p
            className="text-[11px] font-bold uppercase tracking-[0.16em]"
            style={{ color: feature.accent }}
          >
            {feature.tagline}
          </p>
          <h3 className="mt-2 font-heading text-2xl font-semibold leading-snug text-deep-space sm:text-3xl">
            {feature.title}
          </h3>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-secondary-text sm:text-lg sm:leading-8">
            {feature.description}
          </p>
        </div>

        <FeatureIconVisual index={index} accent={feature.accent} />
      </div>

      <div className="relative mt-8 flex items-center gap-3 lg:mt-auto lg:pt-4">
        {features.map((f, dotIndex) => (
          <button
            key={f.title}
            type="button"
            aria-label={`View ${f.title}`}
            aria-current={dotIndex === index ? 'true' : undefined}
            onClick={() => onSelect(dotIndex)}
            className="group relative h-1.5 overflow-hidden rounded-full bg-gray-200 transition-all duration-300 hover:bg-gray-300"
            style={{ width: dotIndex === index ? '2rem' : '0.5rem' }}
          >
            {dotIndex === index && autoPlayEnabled && !isPaused && (
              <motion.span
                key={`dot-progress-${index}`}
                className="absolute inset-0 origin-left rounded-full bg-nebula-teal"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: AUTO_INTERVAL_MS / 1000,
                  ease: 'linear',
                }}
              />
            )}
            {dotIndex === index && (!autoPlayEnabled || isPaused) && (
              <span className="absolute inset-0 rounded-full bg-nebula-teal" />
            )}
          </button>
        ))}
        {autoPlayEnabled && (
          <span className="ml-auto hidden text-[10px] font-medium uppercase tracking-[0.14em] text-secondary-text/70 sm:inline">
            {isPaused ? 'Paused' : 'Auto'}
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default function Features() {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([])
  const prefersReducedMotion = useReducedMotion()
  const autoPlayEnabled = !prefersReducedMotion

  const selectFeature = useCallback((index: number) => {
    setActive(index)
  }, [])

  const goNext = useCallback(() => {
    setActive((prev) => (prev + 1) % features.length)
  }, [])

  useEffect(() => {
    if (!autoPlayEnabled || isPaused) return

    const timer = window.setInterval(goNext, AUTO_INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [active, autoPlayEnabled, isPaused, goNext])

  useEffect(() => {
    chipRefs.current[active]?.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [active, prefersReducedMotion])

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-gradient-to-b from-white via-surface/70 to-white px-6 py-24 md:py-32"
    >
      <FeaturesBackground />

      <div className="relative mx-auto max-w-6xl">
        <motion.div {...fadeUp()} className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-nebula-teal shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Key Features
          </span>
          <h2 className="mt-7 font-heading text-3xl font-semibold leading-tight tracking-tight text-deep-space sm:text-4xl md:text-[2.65rem] md:leading-[1.12]">
            Everything you need to plan with confidence.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-secondary-text sm:text-lg sm:leading-8">
            Six capabilities built around how learners actually decide what to do
            next—from personalized roadmaps to responsible AI guidance.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp(0.08)}
          className="mt-12 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Key features"
        >
          {features.map((feature, index) => (
            <button
              key={feature.title}
              ref={(el) => {
                chipRefs.current[index] = el
              }}
              type="button"
              role="tab"
              aria-selected={active === index}
              onClick={() => selectFeature(index)}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                active === index
                  ? 'border-nebula-teal/30 bg-nebula-teal text-white shadow-sm'
                  : 'border-gray-200 bg-white text-secondary-text hover:border-gray-300'
              }`}
            >
              {feature.title}
            </button>
          ))}
        </motion.div>

        <motion.div
          {...fadeUp(0.1)}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setIsPaused(false)
            }
          }}
          className="mt-8 overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_8px_40px_rgba(15,23,42,0.08)] md:mt-16 lg:grid lg:min-h-[27rem] lg:grid-cols-[minmax(0,18rem)_1fr]"
        >
          <nav
            className="hidden border-r border-gray-100 bg-surface/50 p-3 lg:block"
            role="tablist"
            aria-label="Key features"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              const isActive = active === index

              return (
                <button
                  key={feature.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => selectFeature(index)}
                  className={`group relative mb-1 flex w-full items-center gap-3 overflow-hidden rounded-xl px-3.5 py-3.5 text-left transition-all duration-200 last:mb-0 ${
                    isActive
                      ? 'bg-white shadow-[0_2px_16px_rgba(15,23,42,0.08)]'
                      : 'hover:bg-white/80'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="feature-active-bar"
                      className="absolute bottom-2.5 left-0 top-2.5 w-[3px] rounded-full bg-nebula-teal"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}

                  {isActive && autoPlayEnabled && !isPaused && (
                    <motion.span
                      key={`nav-progress-${active}`}
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-nebula-teal/30"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: AUTO_INTERVAL_MS / 1000,
                        ease: 'linear',
                      }}
                    />
                  )}

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-200 ${
                      isActive
                        ? 'border-nebula-teal/20 bg-nebula-teal/10 text-nebula-teal'
                        : 'border-gray-100 bg-white text-gray-400 group-hover:border-nebula-teal/15 group-hover:text-nebula-teal'
                    }`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block text-[10px] font-semibold uppercase tracking-[0.12em] ${
                        isActive ? 'text-nebula-teal/80' : 'text-gray-400'
                      }`}
                    >
                      {feature.tagline}
                    </span>
                    <span
                      className={`block text-sm font-semibold leading-snug ${
                        isActive ? 'text-deep-space' : 'text-secondary-text group-hover:text-deep-space'
                      }`}
                    >
                      {feature.title}
                    </span>
                  </span>
                </button>
              )
            })}
          </nav>

          <div role="tabpanel" className="relative min-h-[22rem] bg-white lg:min-h-0">
            <AnimatePresence mode="wait">
              <FeatureDetail
                feature={features[active]}
                index={active}
                onSelect={selectFeature}
                isPaused={isPaused}
                autoPlayEnabled={autoPlayEnabled}
              />
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
