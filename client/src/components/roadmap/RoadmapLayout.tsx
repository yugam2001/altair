import { useState } from 'react'
import RoadmapBackground from './RoadmapBackground'
import RoadmapFooter from './RoadmapFooter'
import RoadmapHero from './RoadmapHero'
import RoadmapMainContent from './RoadmapMainContent'
import RoadmapRefineSection from './RoadmapRefineSection'
import RoadmapScrollProgress from './RoadmapScrollProgress'
import RoadmapTopNav from './RoadmapTopNav'

export default function RoadmapLayout() {
  const [isRefining, setIsRefining] = useState(false)

  function handleRefine() {
    setIsRefining(true)
    requestAnimationFrame(() => {
      document.getElementById('continue-planning')?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  return (
    <div className="relative min-h-svh text-white">
      <RoadmapScrollProgress />
      <RoadmapBackground />

      <div className="relative z-10 flex min-h-svh flex-col">
        <RoadmapTopNav isRefining={isRefining} onRefine={handleRefine} />
        <RoadmapHero />
        <RoadmapMainContent />
        <RoadmapRefineSection isRefining={isRefining} onRefine={handleRefine} />
        <RoadmapFooter />
      </div>
    </div>
  )
}
