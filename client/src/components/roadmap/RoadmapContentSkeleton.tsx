interface RoadmapContentSkeletonProps {
  sectionId: string
}

function Shimmer({ className }: { className?: string }) {
  return <div className={`roadmap-skeleton-shimmer rounded-lg ${className ?? ''}`} aria-hidden="true" />
}

export default function RoadmapContentSkeleton({ sectionId }: RoadmapContentSkeletonProps) {
  switch (sectionId) {
    case 'overview':
      return (
        <div className="space-y-4" aria-hidden="true">
          <Shimmer className="h-24 w-full rounded-xl" />
          <div className="grid gap-3 sm:grid-cols-2">
            <Shimmer className="h-14" />
            <Shimmer className="h-14" />
          </div>
          <Shimmer className="h-3 w-4/5" />
          <Shimmer className="h-3 w-3/5" />
        </div>
      )

    case 'timeline':
      return (
        <div className="space-y-5" aria-hidden="true">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex gap-4">
              <Shimmer className="h-10 w-10 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2 pt-1">
                <Shimmer className="h-3 w-1/3" />
                <Shimmer className="h-3 w-full" />
                <Shimmer className="h-3 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      )

    case 'learning-phases':
      return (
        <div className="space-y-3" aria-hidden="true">
          {Array.from({ length: 3 }).map((_, index) => (
            <Shimmer key={index} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      )

    case 'projects':
      return (
        <div className="grid gap-3 sm:grid-cols-2" aria-hidden="true">
          {Array.from({ length: 4 }).map((_, index) => (
            <Shimmer key={index} className="h-28 rounded-xl" />
          ))}
        </div>
      )

    case 'resources':
      return (
        <div className="space-y-3" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, index) => (
            <Shimmer key={index} className={`h-10 ${index % 2 === 0 ? 'w-full' : 'w-11/12'}`} />
          ))}
        </div>
      )

    case 'career-advice':
      return (
        <div className="space-y-3" aria-hidden="true">
          <Shimmer className="h-3 w-full" />
          <Shimmer className="h-3 w-full" />
          <Shimmer className="h-3 w-5/6" />
          <Shimmer className="mt-2 h-20 w-full rounded-xl" />
        </div>
      )

    case 'responsible-ai':
      return (
        <div className="space-y-3" aria-hidden="true">
          <Shimmer className="h-16 w-full rounded-xl" />
          <Shimmer className="h-3 w-full" />
          <Shimmer className="h-3 w-4/5" />
        </div>
      )

    default:
      return (
        <div aria-hidden="true">
          <Shimmer className="min-h-[120px] w-full rounded-xl sm:min-h-[140px] md:min-h-[160px]" />
        </div>
      )
  }
}
