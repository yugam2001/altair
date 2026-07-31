import type { RoadmapMetadata } from '../../types/roadmap'

/** Main content section labels — navigation-themed UI copy. */
export const ROADMAP_CONTENT_SECTIONS = [
  {
    id: 'overview',
    title: 'Learning Overview',
    description: 'Your plotted destination and the shape of the journey ahead.',
  },
  {
    id: 'timeline',
    title: 'Timeline',
    description: 'Waypoints across time — a steady course from here to your goal.',
  },
  {
    id: 'learning-phases',
    title: 'Learning Phases',
    description: 'Sequential stages charted like legs of a longer navigation route.',
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'Hands-on checkpoints to confirm progress along the way.',
  },
  {
    id: 'resources',
    title: 'Resources',
    description: 'Reference signals matched to where you are on the chart.',
  },
  {
    id: 'career-advice',
    title: 'Career Advice',
    description: 'Guidance to keep your bearing as conditions change.',
  },
  {
    id: 'responsible-ai',
    title: 'Responsible AI',
    description: 'How ALTAIR navigates recommendations with clarity and care.',
  },
] as const

export type RoadmapSectionId = (typeof ROADMAP_CONTENT_SECTIONS)[number]['id']

export function buildHeroMetaChips(metadata: RoadmapMetadata) {
  return [
    { label: 'Country', value: metadata.country },
    { label: 'Current Level', value: metadata.currentKnowledge },
    { label: 'Timeline', value: metadata.timeline },
    { label: 'Study Time', value: metadata.studyHoursPerWeek },
    { label: 'Created', value: formatGeneratedAt(metadata.generatedAt) },
  ]
}

function formatGeneratedAt(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return 'Recently'

  const diffMs = Date.now() - date.getTime()
  if (diffMs < 60_000) return 'Just Now'

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function getTimeGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 17) return 'Good Afternoon'
  return 'Good Evening'
}

export function getInitialFromCareerGoal(careerGoal: string): string {
  const trimmed = careerGoal.trim()
  return trimmed ? trimmed.charAt(0).toUpperCase() : 'A'
}
