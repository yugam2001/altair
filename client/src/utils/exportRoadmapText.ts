import type { RoadmapData } from '../types/roadmap'
import { buildRoadmapPlainText } from './roadmapExportContent'

export async function copyRoadmapToClipboard(roadmap: RoadmapData): Promise<void> {
  const text = buildRoadmapPlainText(roadmap)
  await navigator.clipboard.writeText(text)
}
