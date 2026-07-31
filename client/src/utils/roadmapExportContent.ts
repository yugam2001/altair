import type { RoadmapData } from '../types/roadmap'

export type ExportBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'keyValue'; label: string; value: string }

export interface ExportSection {
  title: string
  blocks: ExportBlock[]
}

function bulletItems(items: string[]): ExportBlock {
  return { type: 'list', items }
}

export function buildRoadmapExportSections(roadmap: RoadmapData): ExportSection[] {
  const { metadata, overview, timeline, learningPhases, projects, resources, careerAdvice, responsibleAI } =
    roadmap

  return [
    {
      title: 'Career Goal',
      blocks: [
        { type: 'paragraph', text: metadata.careerGoal },
        {
          type: 'keyValue',
          label: 'Country',
          value: metadata.country,
        },
        {
          type: 'keyValue',
          label: 'Education Level',
          value: metadata.educationLevel,
        },
        {
          type: 'keyValue',
          label: 'Current Knowledge',
          value: metadata.currentKnowledge,
        },
        {
          type: 'keyValue',
          label: 'Study Hours / Week',
          value: metadata.studyHoursPerWeek,
        },
        {
          type: 'keyValue',
          label: 'Learning Style',
          value: metadata.learningStyle,
        },
        {
          type: 'keyValue',
          label: 'Timeline',
          value: metadata.timeline,
        },
        ...(metadata.additionalInfo
          ? [{ type: 'paragraph' as const, text: metadata.additionalInfo }]
          : []),
      ],
    },
    {
      title: 'Overview',
      blocks: [
        { type: 'subheading', text: overview.title },
        { type: 'paragraph', text: overview.summary },
        {
          type: 'keyValue',
          label: 'Estimated Completion',
          value: overview.estimatedCompletion,
        },
        {
          type: 'keyValue',
          label: 'Difficulty',
          value: overview.difficulty,
        },
        ...(overview.keyHighlights.length > 0
          ? [{ type: 'subheading' as const, text: 'Key Highlights' }, bulletItems(overview.keyHighlights)]
          : []),
      ],
    },
    {
      title: 'Timeline',
      blocks: [
        {
          type: 'keyValue',
          label: 'Total Duration',
          value: timeline.duration,
        },
        ...timeline.milestones.flatMap((milestone, index) => [
          {
            type: 'subheading' as const,
            text: `${index + 1}. ${milestone.title} (Month ${milestone.startMonth}${
              milestone.endMonth !== milestone.startMonth ? `–${milestone.endMonth}` : ''
            })`,
          },
          { type: 'paragraph' as const, text: milestone.description },
        ]),
      ],
    },
    {
      title: 'Learning Phases',
      blocks: learningPhases.flatMap((phase) => [
        {
          type: 'subheading' as const,
          text: `Phase ${phase.phaseNumber}: ${phase.title} (${phase.duration})`,
        },
        { type: 'paragraph' as const, text: phase.goal },
        ...(phase.topics.length > 0
          ? [{ type: 'subheading' as const, text: 'Topics' }, bulletItems(phase.topics)]
          : []),
        ...(phase.deliverables.length > 0
          ? [{ type: 'subheading' as const, text: 'Deliverables' }, bulletItems(phase.deliverables)]
          : []),
        ...(phase.successCriteria.length > 0
          ? [{ type: 'subheading' as const, text: 'Success Criteria' }, bulletItems(phase.successCriteria)]
          : []),
      ]),
    },
    {
      title: 'Projects',
      blocks: projects.flatMap((project) => [
        {
          type: 'subheading' as const,
          text: `${project.title} (${project.difficulty})`,
        },
        { type: 'paragraph' as const, text: project.description },
        ...(project.skills.length > 0
          ? [{ type: 'subheading' as const, text: 'Skills' }, bulletItems(project.skills)]
          : []),
        {
          type: 'keyValue',
          label: 'Estimated Time',
          value: project.estimatedTime,
        },
      ]),
    },
    {
      title: 'Resources',
      blocks: resources.flatMap((resource) => [
        {
          type: 'subheading' as const,
          text: `${resource.title} (${resource.type}${resource.isFree ? ', Free' : ''})`,
        },
        {
          type: 'keyValue',
          label: 'Category',
          value: resource.category,
        },
        { type: 'paragraph' as const, text: resource.reason },
      ]),
    },
    {
      title: 'Career Advice',
      blocks: [
        ...(careerAdvice.tips.length > 0
          ? [{ type: 'subheading' as const, text: 'Tips' }, bulletItems(careerAdvice.tips)]
          : []),
        ...(careerAdvice.commonMistakes.length > 0
          ? [
              { type: 'subheading' as const, text: 'Common Mistakes' },
              bulletItems(careerAdvice.commonMistakes),
            ]
          : []),
        ...(careerAdvice.interviewPreparation.length > 0
          ? [
              { type: 'subheading' as const, text: 'Interview Preparation' },
              bulletItems(careerAdvice.interviewPreparation),
            ]
          : []),
      ],
    },
    {
      title: 'Responsible AI Notice',
      blocks: [
        { type: 'paragraph', text: responsibleAI.disclaimer },
        ...(responsibleAI.limitations.length > 0
          ? [{ type: 'subheading' as const, text: 'Limitations' }, bulletItems(responsibleAI.limitations)]
          : []),
        ...(responsibleAI.recommendations.length > 0
          ? [
              { type: 'subheading' as const, text: 'Recommendations' },
              bulletItems(responsibleAI.recommendations),
            ]
          : []),
      ],
    },
  ]
}

export function buildRoadmapPlainText(roadmap: RoadmapData): string {
  const sections = buildRoadmapExportSections(roadmap)
  const lines: string[] = ['ALTAIR — Personalised Learning Roadmap', '']

  for (const section of sections) {
    lines.push(section.title.toUpperCase())
    lines.push('='.repeat(section.title.length))
    lines.push('')

    for (const block of section.blocks) {
      switch (block.type) {
        case 'paragraph':
          lines.push(block.text)
          lines.push('')
          break
        case 'subheading':
          lines.push(block.text)
          lines.push('')
          break
        case 'keyValue':
          lines.push(`${block.label}: ${block.value}`)
          lines.push('')
          break
        case 'list':
          for (const item of block.items) {
            lines.push(`• ${item}`)
          }
          lines.push('')
          break
      }
    }

    lines.push('')
  }

  lines.push('Generated by ALTAIR — Find your way forward.')
  return lines.join('\n').trim()
}
