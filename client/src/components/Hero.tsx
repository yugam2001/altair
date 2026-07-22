import { motion } from 'framer-motion'
import Logo from './Logo'
import PrimaryButton from './PrimaryButton'

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-6 pt-10 pb-16 text-center md:pt-14 md:pb-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(20,184,166,0.07),transparent)]"
      />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative mx-auto flex max-w-4xl flex-col items-center"
      >
        <Logo size="hero" className="mb-8 md:mb-10" />

        <h1 className="text-5xl font-bold tracking-tight text-deep-space sm:text-6xl md:text-7xl">
          Find your way forward.
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-secondary-text sm:text-xl">
          AI-powered education and career roadmaps tailored to your current
          stage, goals, and learning journey.
        </p>

        <div
          id="generate"
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
        >
          <PrimaryButton>Generate My Personalized Roadmap</PrimaryButton>

          <a
            href="#why-altair"
            className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-8 py-4 text-sm font-semibold text-primary-text transition-all duration-300 hover:border-gray-300 hover:bg-gray-50"
          >
            Learn More
          </a>
        </div>
      </motion.div>
    </section>
  )
}
