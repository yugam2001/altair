import RoadmapBackground from './RoadmapBackground'
import RoadmapContinuePlanning from './RoadmapContinuePlanning'
import RoadmapFooter from './RoadmapFooter'
import RoadmapHero from './RoadmapHero'
import RoadmapMainContent from './RoadmapMainContent'
import RoadmapTopNav from './RoadmapTopNav'

export default function RoadmapLayout() {
  return (
    <div className="relative min-h-svh text-white">
      <RoadmapBackground />

      <div className="relative z-10 flex min-h-svh flex-col">
        <RoadmapTopNav />
        <RoadmapHero />
        <RoadmapMainContent />
        <RoadmapContinuePlanning />
        <RoadmapFooter />
      </div>
    </div>
  )
}
