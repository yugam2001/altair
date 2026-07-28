import RoadmapGuidanceOverlay from './RoadmapGuidanceOverlay'
import RoadmapStarfield from './RoadmapStarfield'

export default function RoadmapBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[#010208]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1833] via-[#040816] to-[#000000]" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_-8%,rgba(30,64,175,0.2)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_100%_0%,rgba(37,99,235,0.08)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,rgba(0,0,0,0.75)_0%,transparent_70%)]" />

      <RoadmapStarfield />
      <RoadmapGuidanceOverlay />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_48%,transparent_0%,rgba(0,0,0,0.28)_100%)]" />
    </div>
  )
}
