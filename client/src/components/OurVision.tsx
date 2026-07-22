import { motion } from 'framer-motion'

export default function OurVision() {
  return (
    <section id="vision" className="bg-white px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-deep-space sm:text-4xl">
          Our Vision
        </h2>

        <p className="mt-8 text-lg leading-relaxed text-secondary-text sm:text-xl sm:leading-relaxed">
          We believe every learner deserves a clear path toward their goals.
        </p>

        <p className="mt-6 text-lg leading-relaxed text-secondary-text sm:text-xl sm:leading-relaxed">
          ALTAIR exists to reduce confusion, simplify decision-making, and help
          learners confidently find their way forward using responsible
          Artificial Intelligence.
        </p>
      </motion.div>
    </section>
  )
}
