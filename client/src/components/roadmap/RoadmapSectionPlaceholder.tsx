import AltairSignatureBadge from './AltairSignatureBadge'
import RoadmapContentSkeleton from './RoadmapContentSkeleton'
import ScrollReveal from './ScrollReveal'

interface RoadmapSectionPlaceholderProps {
  sectionId: string
  title: string
  description: string
}

export default function RoadmapSectionPlaceholder({
  sectionId,
  title,
  description,
}: RoadmapSectionPlaceholderProps) {
  return (
    <ScrollReveal>
      <section className="py-10 sm:py-12 md:py-14" aria-label={`${title} section`}>
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            {title}
          </h2>
          <AltairSignatureBadge label="AI Crafted" />
        </div>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-blue-100/60 sm:text-[15px]">
          {description}
        </p>

        <div className="mt-6 h-px w-full bg-blue-400/15" aria-hidden="true" />

        <div
          className="mt-8 min-h-[120px] rounded-xl border border-blue-400/10 bg-[#060d1f]/40 p-4 sm:min-h-[140px] sm:p-5 md:min-h-[160px]"
          aria-busy="true"
          aria-label={`${title} loading`}
        >
          <RoadmapContentSkeleton sectionId={sectionId} />
        </div>
      </section>
    </ScrollReveal>
  )
}
