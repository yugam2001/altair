import type { RoadmapData } from '../../types/roadmap'
import type { RoadmapSectionId } from './roadmapSections'

interface RoadmapSectionContentProps {
  sectionId: RoadmapSectionId
  roadmap: RoadmapData
}

function ListItems({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li
          key={`${item.slice(0, 24)}-${index}`}
          className="flex gap-2.5 text-sm leading-relaxed text-blue-100/75 sm:text-[15px]"
        >
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400/60" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function TagList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <span className="inline-block rounded-full border border-blue-400/20 bg-blue-950/40 px-2.5 py-1 text-[11px] text-blue-100/80 sm:text-xs">
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}

function OverviewSection({ roadmap }: { roadmap: RoadmapData }) {
  const { overview } = roadmap

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-blue-400/12 bg-[#081020]/60 p-4 sm:p-5">
        <p className="text-sm leading-relaxed text-blue-100/80 sm:text-[15px] sm:leading-7">
          {overview.summary}
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-blue-400/12 bg-[#081020]/60 p-4">
          <p className="text-[11px] font-medium tracking-wide text-blue-200/55 uppercase">Estimated Completion</p>
          <p className="mt-1.5 text-sm font-medium text-white sm:text-[15px]">{overview.estimatedCompletion}</p>
        </div>
        <div className="rounded-xl border border-blue-400/12 bg-[#081020]/60 p-4">
          <p className="text-[11px] font-medium tracking-wide text-blue-200/55 uppercase">Difficulty</p>
          <p className="mt-1.5 text-sm font-medium text-white sm:text-[15px]">{overview.difficulty}</p>
        </div>
      </div>
      {overview.keyHighlights.length > 0 && (
        <div>
          <p className="mb-2 text-[11px] font-medium tracking-wide text-blue-200/55 uppercase">Key Highlights</p>
          <ListItems items={overview.keyHighlights} />
        </div>
      )}
    </div>
  )
}

function TimelineSection({ roadmap }: { roadmap: RoadmapData }) {
  const { timeline } = roadmap

  return (
    <div className="space-y-5">
      <p className="text-sm text-blue-100/70 sm:text-[15px]">
        Total duration: <span className="font-medium text-white">{timeline.duration}</span>
      </p>
      {timeline.milestones.map((milestone, index) => (
        <div key={milestone.id ?? `${milestone.title}-${index}`} className="flex gap-4">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-400/25 bg-blue-950/50 text-xs font-semibold text-blue-200"
            aria-hidden="true"
          >
            {index + 1}
          </div>
          <div className="flex-1 pt-0.5">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <h3 className="text-sm font-medium text-white sm:text-[15px]">{milestone.title}</h3>
              <span className="text-xs text-blue-200/55">
                Month {milestone.startMonth}
                {milestone.endMonth !== milestone.startMonth && `–${milestone.endMonth}`}
              </span>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-blue-100/70 sm:text-[15px]">
              {milestone.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

function LearningPhasesSection({ roadmap }: { roadmap: RoadmapData }) {
  return (
    <div className="space-y-3">
      {roadmap.learningPhases.map((phase) => (
        <div
          key={phase.id ?? phase.phaseNumber}
          className="rounded-xl border border-blue-400/12 bg-[#081020]/60 p-4 sm:p-5"
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-xs font-medium text-blue-300/70">Phase {phase.phaseNumber}</span>
            <h3 className="text-sm font-medium text-white sm:text-[15px]">{phase.title}</h3>
            <span className="text-xs text-blue-200/55">{phase.duration}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-blue-100/70 sm:text-[15px]">{phase.goal}</p>
          {phase.topics.length > 0 && (
            <div className="mt-3">
              <p className="mb-2 text-[11px] font-medium tracking-wide text-blue-200/55 uppercase">Topics</p>
              <TagList items={phase.topics} />
            </div>
          )}
          {phase.deliverables.length > 0 && (
            <div className="mt-3">
              <p className="mb-2 text-[11px] font-medium tracking-wide text-blue-200/55 uppercase">Deliverables</p>
              <ListItems items={phase.deliverables} />
            </div>
          )}
          {phase.successCriteria.length > 0 && (
            <div className="mt-3">
              <p className="mb-2 text-[11px] font-medium tracking-wide text-blue-200/55 uppercase">Success Criteria</p>
              <ListItems items={phase.successCriteria} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function ProjectsSection({ roadmap }: { roadmap: RoadmapData }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {roadmap.projects.map((project, index) => (
        <div
          key={project.id ?? `${project.title}-${index}`}
          className="rounded-xl border border-blue-400/12 bg-[#081020]/60 p-4 sm:p-5"
        >
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <h3 className="text-sm font-medium text-white sm:text-[15px]">{project.title}</h3>
            <span className="text-xs text-blue-200/55">{project.difficulty}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-blue-100/70 sm:text-[15px]">{project.description}</p>
          {project.skills.length > 0 && (
            <div className="mt-3">
              <TagList items={project.skills} />
            </div>
          )}
          <p className="mt-3 text-xs text-blue-200/55">{project.estimatedTime}</p>
        </div>
      ))}
    </div>
  )
}

function ResourcesSection({ roadmap }: { roadmap: RoadmapData }) {
  return (
    <div className="space-y-3">
      {roadmap.resources.map((resource, index) => (
        <div
          key={resource.id ?? `${resource.title}-${index}`}
          className="rounded-xl border border-blue-400/12 bg-[#081020]/60 px-4 py-3 sm:px-5 sm:py-4"
        >
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <h3 className="text-sm font-medium text-white sm:text-[15px]">{resource.title}</h3>
            <span className="text-xs text-blue-200/55">{resource.type}</span>
            {resource.isFree && (
              <span className="rounded-full border border-emerald-400/25 bg-emerald-950/30 px-2 py-0.5 text-[10px] text-emerald-300/80">
                Free
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-blue-300/60">{resource.category}</p>
          <p className="mt-2 text-sm leading-relaxed text-blue-100/70 sm:text-[15px]">{resource.reason}</p>
        </div>
      ))}
    </div>
  )
}

function CareerAdviceSection({ roadmap }: { roadmap: RoadmapData }) {
  const { careerAdvice } = roadmap

  return (
    <div className="space-y-5">
      {careerAdvice.tips.length > 0 && (
        <div>
          <p className="mb-2 text-[11px] font-medium tracking-wide text-blue-200/55 uppercase">Tips</p>
          <ListItems items={careerAdvice.tips} />
        </div>
      )}
      {careerAdvice.commonMistakes.length > 0 && (
        <div className="rounded-xl border border-blue-400/12 bg-[#081020]/60 p-4 sm:p-5">
          <p className="mb-2 text-[11px] font-medium tracking-wide text-blue-200/55 uppercase">Common Mistakes</p>
          <ListItems items={careerAdvice.commonMistakes} />
        </div>
      )}
      {careerAdvice.interviewPreparation.length > 0 && (
        <div>
          <p className="mb-2 text-[11px] font-medium tracking-wide text-blue-200/55 uppercase">Interview Preparation</p>
          <ListItems items={careerAdvice.interviewPreparation} />
        </div>
      )}
    </div>
  )
}

function ResponsibleAISection({ roadmap }: { roadmap: RoadmapData }) {
  const { responsibleAI } = roadmap

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-blue-400/12 bg-[#081020]/60 p-4 sm:p-5">
        <p className="text-sm leading-relaxed text-blue-100/75 sm:text-[15px] sm:leading-7">
          {responsibleAI.disclaimer}
        </p>
      </div>
      {responsibleAI.limitations.length > 0 && (
        <div>
          <p className="mb-2 text-[11px] font-medium tracking-wide text-blue-200/55 uppercase">Limitations</p>
          <ListItems items={responsibleAI.limitations} />
        </div>
      )}
      {responsibleAI.recommendations.length > 0 && (
        <div>
          <p className="mb-2 text-[11px] font-medium tracking-wide text-blue-200/55 uppercase">Recommendations</p>
          <ListItems items={responsibleAI.recommendations} />
        </div>
      )}
    </div>
  )
}

export default function RoadmapSectionContent({ sectionId, roadmap }: RoadmapSectionContentProps) {
  switch (sectionId) {
    case 'overview':
      return <OverviewSection roadmap={roadmap} />
    case 'timeline':
      return <TimelineSection roadmap={roadmap} />
    case 'learning-phases':
      return <LearningPhasesSection roadmap={roadmap} />
    case 'projects':
      return <ProjectsSection roadmap={roadmap} />
    case 'resources':
      return <ResourcesSection roadmap={roadmap} />
    case 'career-advice':
      return <CareerAdviceSection roadmap={roadmap} />
    case 'responsible-ai':
      return <ResponsibleAISection roadmap={roadmap} />
    default:
      return null
  }
}
