import type { CSSProperties } from 'react'
import type { RoadmapStar, StarColor } from './generateStarfield'
import { STARS_BY_LAYER } from './generateStarfield'

const COLOR_GLOW: Record<StarColor, { core: string; bloom: string }> = {
  white: {
    core: 'rgba(255, 255, 255, 0.95)',
    bloom: 'rgba(255, 255, 255, 0.35)',
  },
  'blue-white': {
    core: 'rgba(219, 234, 254, 0.9)',
    bloom: 'rgba(147, 197, 253, 0.3)',
  },
  'deep-blue': {
    core: 'rgba(147, 197, 253, 0.85)',
    bloom: 'rgba(59, 130, 246, 0.28)',
  },
}

function StarElement({ star }: { star: RoadmapStar }) {
  const palette = COLOR_GLOW[star.color]
  const twinkleClass = star.twinkle ? 'roadmap-star--twinkle' : ''
  const layerClass = `roadmap-star--layer-${star.layer}`

  const style = {
    left: `${star.x}%`,
    top: `${star.y}%`,
    width: star.size,
    height: star.size,
    ['--star-opacity' as string]: star.opacity,
    ['--star-opacity-min' as string]: Math.max(0.08, star.opacity * 0.35),
    ['--star-opacity-max' as string]: Math.min(1, star.opacity * 1.5),
    ['--star-core' as string]: palette.core,
    ['--star-bloom' as string]: palette.bloom,
    ['--twinkle-delay' as string]: `${star.twinkleDelay}s`,
    ['--twinkle-duration' as string]: `${star.twinkleDuration}s`,
  } as CSSProperties

  return (
    <span
      className={`roadmap-star ${layerClass} ${twinkleClass}`}
      style={style}
    >
      <span className="roadmap-star__bloom" aria-hidden="true" />
      <span className="roadmap-star__core" aria-hidden="true" />
    </span>
  )
}

function StarLayer({
  stars,
  className,
}: {
  stars: readonly RoadmapStar[]
  className?: string
}) {
  return (
    <div className={`roadmap-starfield__layer ${className ?? ''}`}>
      {stars.map((star) => (
        <StarElement key={star.id} star={star} />
      ))}
    </div>
  )
}

export default function RoadmapStarfield() {
  return (
    <div className="roadmap-starfield absolute inset-0" aria-hidden="true">
      <StarLayer stars={STARS_BY_LAYER[1]} className="roadmap-starfield__layer--distant" />
      <StarLayer stars={STARS_BY_LAYER[2]} className="roadmap-starfield__layer--mid" />
      <StarLayer stars={STARS_BY_LAYER[3]} className="roadmap-starfield__layer--near" />
    </div>
  )
}
