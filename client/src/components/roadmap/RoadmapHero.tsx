import type { RoadmapData } from '../../types/roadmap'
import { buildHeroMetaChips, getTimeGreeting } from './roadmapSections'
import AltairSignatureBadge from './AltairSignatureBadge'

interface RoadmapHeroProps {
  roadmap: RoadmapData
}

export default function RoadmapHero({ roadmap }: RoadmapHeroProps) {
  const { metadata, overview } = roadmap
  const metaChips = buildHeroMetaChips(metadata)

  return (
    <section className="mx-auto w-[90%] max-w-[1400px] px-1 pt-14 sm:pt-16 md:pt-20 lg:pt-24">
      <div className="flex flex-wrap items-center gap-3">
        <AltairSignatureBadge />
      </div>

      <p className="mt-5 text-lg font-medium text-white sm:text-xl">
        {getTimeGreeting()} <span aria-hidden="true">👋</span>
      </p>

      <h1 className="mt-4 max-w-4xl text-[1.75rem] font-semibold leading-[1.2] tracking-tight text-white sm:text-4xl md:text-[2.65rem] md:leading-[1.15]">
        {overview.title.includes(metadata.careerGoal) ? (
          overview.title
        ) : (
          <>
            Your personalised roadmap
            <br />
            to becoming a{' '}
            <span className="text-blue-200">{metadata.careerGoal}</span>
          </>
        )}
      </h1>

      <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-blue-100/65 sm:text-base sm:leading-7">
        Built from your goals, experience, learning style and study schedule.
      </p>

      <ul className="mt-8 flex flex-wrap gap-2 sm:mt-10 sm:gap-2.5">
        {metaChips.map((chip) => (
          <li key={chip.label}>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-950/40 px-3 py-1.5 text-[11px] tracking-wide sm:px-3.5 sm:text-[12px]">
              <span className="font-medium text-blue-200/55">{chip.label}</span>
              <span className="font-medium text-blue-100/90">{chip.value}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
