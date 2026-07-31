import { useLocation } from 'react-router-dom'
import { RoadmapErrorState, RoadmapLayout } from '../components/roadmap'
import type { RoadmapLocationState } from '../types/roadmap'

export default function RoadmapPage() {
  const location = useLocation()
  const roadmap = (location.state as RoadmapLocationState | null)?.roadmap

  if (!roadmap) {
    return (
      <RoadmapErrorState message="No roadmap data found. Please complete the questionnaire to generate your personalised roadmap." />
    )
  }

  return <RoadmapLayout roadmap={roadmap} />
}
