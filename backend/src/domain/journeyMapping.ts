/**
 * Journey mapping — ALTAIR's domain model for reasoning from current position to target career.
 *
 * This module defines the architecture and function signatures.
 * Business logic is intentionally placeholder-level; implementations will deepen over time.
 *
 * Pipeline:
 *   1. Understand current educational stage
 *   2. Identify target career
 *   3. Identify relevant career domain
 *   4. Apply country-specific education rules
 *   5. Build logical educational journey
 *   6. (Downstream) Generate personalised roadmap via prompt layer
 */

import type { CareerDomain } from './careerDomains'
import { getCareerDomain } from './careerDomains'
import type { CareerPathway } from './careerPathways'
import { getCareerPathway } from './careerPathways'
import type { CountryRules } from './countryRules'
import { getCountryRules } from './countryRules'
import type { EducationStage } from './educationStages'
import { findStagesByQuestionnaireValue, getEducationSystem } from './educationStages'

// ---------------------------------------------------------------------------
// Input and output types
// ---------------------------------------------------------------------------

/** Learner context derived from the ALTAIR questionnaire. */
export interface LearnerContext {
  careerGoal: string
  country: string
  educationLevel: string
  currentKnowledge: string
  studyHoursPerWeek?: string
  learningStyle?: string
  timeline?: string
  additionalInfo?: string
}

export type MilestoneCategory =
  | 'education'
  | 'qualification'
  | 'skill'
  | 'experience'
  | 'licensing'
  | 'career'

export type MilestoneStatus = 'completed' | 'current' | 'upcoming'

/** A single milestone in the learner's journey. */
export interface JourneyMilestone {
  id: string
  title: string
  description: string
  category: MilestoneCategory
  order: number
  status: MilestoneStatus
  /** Which layer produced this milestone */
  source: 'education-stage' | 'country-framework' | 'career-pathway'
}

/** Complete journey map — output of the domain reasoning layer. */
export interface JourneyMap {
  learnerContext: LearnerContext
  currentStage: EducationStage | null
  targetCareer: CareerPathway | null
  careerDomain: CareerDomain | null
  countryRules: CountryRules | null
  missingMilestones: readonly JourneyMilestone[]
  fullJourney: readonly JourneyMilestone[]
  reasoningNotes: readonly string[]
}

// ---------------------------------------------------------------------------
// Stage identification
// ---------------------------------------------------------------------------

/**
 * Maps questionnaire inputs to the learner's current education stage.
 *
 * When multiple stages match the same questionnaire bucket, returns the most
 * advanced stage — e.g. "Undergraduate" resolves to Bachelor's, not Diploma.
 *
 * @future Parse additionalInfo for finer resolution; support unlisted countries gracefully.
 */
export function identifyCurrentStage(context: LearnerContext): EducationStage | null {
  const matchingStages = findStagesByQuestionnaireValue(
    context.country,
    context.educationLevel,
  )

  if (matchingStages.length === 0) {
    return null
  }

  return [...matchingStages].sort((a, b) => b.order - a.order)[0] ?? null
}

// ---------------------------------------------------------------------------
// Career and domain identification
// ---------------------------------------------------------------------------

/**
 * Resolves the learner's stated career goal to a registered career pathway.
 *
 * @placeholder Exact and alias matching against the career registry.
 * @future Fuzzy matching, external career databases, and AI-assisted resolution for unlisted careers.
 */
export function identifyTargetCareer(context: LearnerContext): CareerPathway | null {
  return getCareerPathway(context.careerGoal) ?? null
}

/**
 * Identifies the career domain for a target career or raw career goal string.
 *
 * @placeholder Looks up domain from registered pathway, or attempts domain inference from goal text.
 * @future Domain classification for careers not yet in the registry.
 */
export function identifyCareerDomain(
  context: LearnerContext,
  targetCareer?: CareerPathway | null,
): CareerDomain | null {
  const career = targetCareer ?? identifyTargetCareer(context)

  if (career) {
    return getCareerDomain(career.domain) ?? null
  }

  // Placeholder: no inference for unregistered careers yet
  return null
}

// ---------------------------------------------------------------------------
// Milestone calculation
// ---------------------------------------------------------------------------

function createMilestone(
  id: string,
  title: string,
  description: string,
  category: MilestoneCategory,
  order: number,
  source: JourneyMilestone['source'],
  status: MilestoneStatus = 'upcoming',
): JourneyMilestone {
  return { id, title, description, category, order, status, source }
}

function isEarlyEducationStage(label: string): boolean {
  return /secondary|school|class|year 10|year 11|year 12/i.test(label)
}

const TECHNOLOGY_PRACTICAL_MILESTONES = [
  {
    title: 'Programming Fundamentals',
    description: 'Core programming concepts, data structures, and problem-solving skills.',
  },
  {
    title: 'Projects',
    description: 'Build portfolio projects demonstrating practical software development ability.',
  },
  {
    title: 'Internship',
    description: 'Gain industry experience through internships or work placements.',
  },
  {
    title: 'Interview Preparation',
    description: 'Prepare for technical interviews and hiring assessments.',
  },
] as const

/**
 * Calculates milestones the learner has not yet reached on the path to their target career.
 *
 * Combines career pathway stages, domain-specific practical steps, skills or
 * certifications, and country framework steps where still relevant.
 *
 * @future Apply knowledge-level and timeline-aware filtering; deduplicate overlapping steps.
 */
export function calculateMissingMilestones(
  _context: LearnerContext,
  currentStage: EducationStage | null,
  targetCareer: CareerPathway | null,
  countryRules: CountryRules | null,
): JourneyMilestone[] {
  const milestones: JourneyMilestone[] = []
  let order = 1
  const currentOrder = currentStage?.order ?? 0

  if (!targetCareer) {
    return milestones
  }

  for (const stage of targetCareer.typicalEducationStages) {
    if (isEarlyEducationStage(stage.label) && currentOrder >= 20) {
      continue
    }

    milestones.push(
      createMilestone(
        `${targetCareer.id}-typical-${stage.order}`,
        stage.label,
        stage.notes ?? `Step toward becoming a ${targetCareer.careerName}`,
        stage.required ? 'qualification' : 'education',
        order++,
        'career-pathway',
      ),
    )
  }

  if (targetCareer.domain === 'technology' && currentOrder >= 20) {
    for (const step of TECHNOLOGY_PRACTICAL_MILESTONES) {
      milestones.push(
        createMilestone(
          `${targetCareer.id}-practical-${step.title.toLowerCase().replace(/\s+/g, '-')}`,
          step.title,
          step.description,
          'experience',
          order++,
          'career-pathway',
        ),
      )
    }
  } else {
    for (const skill of targetCareer.commonSkills) {
      milestones.push(
        createMilestone(
          `${targetCareer.id}-skill-${skill.toLowerCase().replace(/\s+/g, '-')}`,
          skill,
          `Build ${skill.toLowerCase()} capability for ${targetCareer.careerName}`,
          'skill',
          order++,
          'career-pathway',
        ),
      )
    }
  }

  for (const certification of targetCareer.recommendedCertifications) {
    milestones.push(
      createMilestone(
        `${targetCareer.id}-cert-${certification.toLowerCase().replace(/\s+/g, '-')}`,
        certification,
        `Obtain required certification for ${targetCareer.careerName}`,
        'licensing',
        order++,
        'career-pathway',
      ),
    )
  }

  if (countryRules && currentOrder < 30) {
    const primaryFramework = countryRules.frameworks[0]

    for (const step of primaryFramework?.steps ?? []) {
      if (step.optional) {
        continue
      }

      const estimatedOrder = step.order * 10
      if (estimatedOrder <= currentOrder) {
        continue
      }

      milestones.push(
        createMilestone(
          `country-${countryRules.countryCode}-${step.order}`,
          step.title,
          step.description,
          'education',
          order++,
          'country-framework',
        ),
      )
    }
  }

  return milestones
}

// ---------------------------------------------------------------------------
// Journey map generation
// ---------------------------------------------------------------------------

/**
 * Assembles the complete journey map from learner context.
 *
 * @placeholder Orchestrates identification functions and returns structured output with reasoning notes.
 * @future Primary input to prompt assembly via formatJourneyMapForPrompt().
 */
export function generateJourneyMap(context: LearnerContext): JourneyMap {
  const currentStage = identifyCurrentStage(context)
  const targetCareer = identifyTargetCareer(context)
  const careerDomain = identifyCareerDomain(context, targetCareer)
  const countryRules = getCountryRules(context.country) ?? null
  const missingMilestones = calculateMissingMilestones(
    context,
    currentStage,
    targetCareer,
    countryRules,
  )

  const reasoningNotes: string[] = []

  if (!getEducationSystem(context.country)) {
    reasoningNotes.push(
      `No registered education system for "${context.country}". Country-agnostic journey mapping applied.`,
    )
  }

  if (!targetCareer) {
    reasoningNotes.push(
      `Career goal "${context.careerGoal}" is not in the career registry. Domain and milestones require future resolution.`,
    )
  }

  if (targetCareer && !careerDomain) {
    reasoningNotes.push(
      `Career "${targetCareer.careerName}" references an unregistered domain "${targetCareer.domain}".`,
    )
  }

  if (currentStage) {
    reasoningNotes.push(`Current position mapped to "${currentStage.label}".`)
  }

  if (careerDomain) {
    reasoningNotes.push(`Career domain identified as "${careerDomain.name}".`)
  }

  if (missingMilestones.length > 0) {
    reasoningNotes.push(
      `${missingMilestones.length} upcoming milestone(s) identified toward the target career.`,
    )
  }

  const fullJourney: JourneyMilestone[] = []

  if (currentStage) {
    fullJourney.push({
      id: currentStage.id,
      title: currentStage.label,
      description: currentStage.description,
      category: 'education',
      order: 0,
      status: 'current',
      source: 'education-stage',
    })
  }

  fullJourney.push(
    ...missingMilestones.map((milestone) => ({
      ...milestone,
      status: 'upcoming' as const,
    })),
  )

  return {
    learnerContext: context,
    currentStage,
    targetCareer,
    careerDomain,
    countryRules,
    missingMilestones,
    fullJourney,
    reasoningNotes,
  }
}

/**
 * Serialises a journey map into structured text for consumption by the prompt layer.
 *
 * @placeholder Formats available identification results and reasoning notes.
 * @future Include full milestone list once calculateMissingMilestones is implemented.
 */
export function formatJourneyMapForPrompt(journeyMap: JourneyMap): string {
  const sections: string[] = ['## Journey Map (Domain Layer)']

  if (journeyMap.currentStage) {
    sections.push(
      '',
      '### Current Educational Stage',
      `- **Stage:** ${journeyMap.currentStage.label}`,
      `- **Description:** ${journeyMap.currentStage.description}`,
    )
  }

  if (journeyMap.targetCareer) {
    sections.push(
      '',
      '### Target Career',
      `- **Career:** ${journeyMap.targetCareer.careerName}`,
      `- **Domain:** ${journeyMap.careerDomain?.name ?? journeyMap.targetCareer.domain}`,
    )
  }

  if (journeyMap.countryRules) {
    sections.push(
      '',
      '### Country Education Context',
      `- **Country:** ${journeyMap.countryRules.countryName}`,
      `- **Frameworks:** ${journeyMap.countryRules.frameworks.map((f) => f.name).join(', ')}`,
    )
  }

  if (journeyMap.missingMilestones.length > 0) {
    sections.push('', '### Missing Milestones')
    for (const milestone of journeyMap.missingMilestones) {
      sections.push(
        `${milestone.order}. **${milestone.title}** (${milestone.category}) — ${milestone.description}`,
      )
    }
  }

  if (journeyMap.reasoningNotes.length > 0) {
    sections.push('', '### Reasoning Notes')
    for (const note of journeyMap.reasoningNotes) {
      sections.push(`- ${note}`)
    }
  }

  return sections.join('\n')
}
