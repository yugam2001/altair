import { motion } from 'framer-motion'
import RoadmapSectionPlaceholder from './RoadmapSectionPlaceholder'
import { ROADMAP_CONTENT_SECTIONS } from './roadmapSections'

export default function RoadmapMainContent() {
  return (
    <motion.div
      id="roadmap-content"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mt-14 w-[90%] max-w-[1400px] sm:mt-16 md:mt-20"
    >
      <p className="mb-5 text-[12px] font-medium tracking-[0.12em] text-blue-300/70 uppercase sm:mb-6">
        Route Sections
      </p>

      <div className="rounded-[1.75rem] border border-blue-400/15 bg-[#0a1224]/65 p-6 shadow-[0_16px_48px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl sm:rounded-[2rem] sm:p-8 md:p-10 lg:p-12">
        {ROADMAP_CONTENT_SECTIONS.map((section, index) => (
          <div key={section.id}>
            <RoadmapSectionPlaceholder
              title={section.title}
              description={section.description}
            />
            {index < ROADMAP_CONTENT_SECTIONS.length - 1 && (
              <div className="h-px w-full bg-blue-400/10" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
