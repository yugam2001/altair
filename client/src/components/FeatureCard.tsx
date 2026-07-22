import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  index: number
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
}: FeatureCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      <div className="mb-5 inline-flex rounded-xl bg-nebula-teal/10 p-3">
        <Icon className="h-6 w-6 text-nebula-teal" aria-hidden="true" />
      </div>

      <h3 className="text-lg font-semibold text-deep-space">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-secondary-text">
        {description}
      </p>
    </motion.article>
  )
}
