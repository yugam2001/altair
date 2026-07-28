interface RoadmapSectionPlaceholderProps {
  title: string
  description: string
}

export default function RoadmapSectionPlaceholder({
  title,
  description,
}: RoadmapSectionPlaceholderProps) {
  return (
    <section className="py-10 sm:py-12 md:py-14" aria-label={`${title} section`}>
      <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
        {title}
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-blue-100/60 sm:text-[15px]">
        {description}
      </p>

      <div className="mt-6 h-px w-full bg-blue-400/15" aria-hidden="true" />

      <div
        className="mt-8 min-h-[120px] rounded-xl border border-dashed border-blue-400/12 bg-[#060d1f]/40 sm:min-h-[140px] md:min-h-[160px]"
        aria-hidden="true"
      />
    </section>
  )
}
