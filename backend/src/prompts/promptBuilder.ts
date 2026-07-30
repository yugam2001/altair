/**
 * Assembles the complete ALTAIR roadmap generation prompt.
 * Order: System → AI Principles → User Context → Output Instructions.
 */

import {
  formatJourneyMapForPrompt,
  type JourneyMap,
} from '../domain/journeyMapping'
import { formatAiPrinciples } from './aiPrinciples'
import { OUTPUT_INSTRUCTIONS } from './output.prompt'
import { SYSTEM_PROMPT } from './system.prompt'
import {
  buildUserContextPrompt,
  type QuestionnaireResponses,
} from './user.prompt'

const SECTION_SEPARATOR = '\n\n---\n\n'

export interface BuildRoadmapPromptOptions {
  /** Questionnaire responses supplied by the user. */
  responses: QuestionnaireResponses
  /** Domain-layer journey map derived from questionnaire responses. */
  journeyMap?: JourneyMap
}

/**
 * Assembles a single prompt string ready to send to any AI provider.
 */
export function buildRoadmapPrompt(options: BuildRoadmapPromptOptions): string {
  const { responses, journeyMap } = options

  const sections = [
    SYSTEM_PROMPT,
    formatAiPrinciples(),
    buildUserContextPrompt(responses),
  ]

  if (journeyMap) {
    sections.push(formatJourneyMapForPrompt(journeyMap))
  }

  sections.push(OUTPUT_INSTRUCTIONS)

  return sections.join(SECTION_SEPARATOR)
}

export type { QuestionnaireResponses } from './user.prompt'
