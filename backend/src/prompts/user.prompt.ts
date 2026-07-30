/**
 * Converts questionnaire responses into structured user-context prompt text.
 * Includes only fields the user supplied — no instructions or inferred data.
 */

export interface QuestionnaireResponses {
  careerGoal?: string
  country?: string
  educationLevel?: string
  currentKnowledge?: string
  studyHoursPerWeek?: string
  learningStyle?: string
  timeline?: string
  additionalInfo?: string
}

interface UserContextField {
  label: string
  value: string | undefined
}

const USER_CONTEXT_HEADER = '## User Questionnaire Responses'

const FIELD_DEFINITIONS: ReadonlyArray<{
  key: keyof QuestionnaireResponses
  label: string
}> = [
  { key: 'careerGoal', label: 'Career goal' },
  { key: 'country', label: 'Country or region' },
  { key: 'educationLevel', label: 'Education level' },
  { key: 'currentKnowledge', label: 'Current knowledge in target domain' },
  { key: 'studyHoursPerWeek', label: 'Weekly study hours' },
  { key: 'learningStyle', label: 'Preferred learning style' },
  { key: 'timeline', label: 'Target completion timeline' },
  { key: 'additionalInfo', label: 'Additional context' },
]

function isNonEmpty(value: string | undefined): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function collectSuppliedFields(
  responses: QuestionnaireResponses,
): UserContextField[] {
  return FIELD_DEFINITIONS.flatMap(({ key, label }) => {
    const value = responses[key]
    if (!isNonEmpty(value)) {
      return []
    }
    return [{ label, value: value.trim() }]
  })
}

/**
 * Builds the user-context section from questionnaire responses.
 * Omits empty or whitespace-only fields.
 */
export function buildUserContextPrompt(
  responses: QuestionnaireResponses,
): string {
  const suppliedFields = collectSuppliedFields(responses)

  if (suppliedFields.length === 0) {
    return [USER_CONTEXT_HEADER, '', '_No questionnaire responses were provided._'].join(
      '\n',
    )
  }

  const lines = suppliedFields.map(({ label, value }) => `- **${label}:** ${value}`)

  return [USER_CONTEXT_HEADER, '', ...lines].join('\n')
}
