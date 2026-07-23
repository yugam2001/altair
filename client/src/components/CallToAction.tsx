import { motion } from 'framer-motion'
import PrimaryButton from './PrimaryButton'

interface CallToActionProps {
  onGenerateClick?: () => void
  generateDisabled?: boolean
}

export default function CallToAction({
  onGenerateClick,
  generateDisabled = false,
}: CallToActionProps) {
  return (
    <section className="px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="mx-auto max-w-4xl rounded-3xl bg-deep-space px-8 py-16 text-center sm:px-12 sm:py-20"
      >
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to find your way forward?
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-base text-gray-300 sm:text-lg">
          Generate your personalized roadmap in just a few minutes.
        </p>

        <div className="mt-10 flex justify-center">
          <PrimaryButton
            className="bg-nebula-teal hover:bg-nebula-teal/90"
            onClick={onGenerateClick}
            disabled={generateDisabled}
          >
            Generate My Personalized Roadmap
          </PrimaryButton>
        </div>
      </motion.div>
    </section>
  )
}
