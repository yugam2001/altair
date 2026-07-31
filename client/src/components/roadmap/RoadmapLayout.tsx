import { useState } from 'react'
import type { RoadmapData } from '../../types/roadmap'
import { ToastProvider } from '../ui/ToastProvider'
import RoadmapBackground from './RoadmapBackground'
import RoadmapFooter from './RoadmapFooter'
import RoadmapHero from './RoadmapHero'
import RoadmapMainContent from './RoadmapMainContent'
import RoadmapRefineSection from './RoadmapRefineSection'
import RoadmapScrollProgress from './RoadmapScrollProgress'
import RoadmapTopNav from './RoadmapTopNav'

interface RoadmapLayoutProps {
  roadmap: RoadmapData
}

export default function RoadmapLayout({ roadmap }: RoadmapLayoutProps) {
  const [isRefining, setIsRefining] = useState(false)

  function handleRefine() {
    setIsRefining(true)
    requestAnimationFrame(() => {
      document.getElementById('continue-planning')?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  return (
    <ToastProvider>
      <div className="relative min-h-svh text-white">
        <RoadmapScrollProgress />
        <RoadmapBackground />

        <div className="relative z-10 flex min-h-svh flex-col">
          <RoadmapTopNav
            roadmap={roadmap}
            isRefining={isRefining}
            onRefine={handleRefine}
            avatarInitial={roadmap.metadata.careerGoal}
          />
          <RoadmapHero roadmap={roadmap} />
          <RoadmapMainContent roadmap={roadmap} />
          <RoadmapRefineSection
            isRefining={isRefining}
            onRefine={handleRefine}
            nextSteps={roadmap.nextSteps}
          />
          <RoadmapFooter />
        </div>
      </div>
    </ToastProvider>
  )
}
