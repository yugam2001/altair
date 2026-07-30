/**
 * Country-specific education stage definitions.
 * Stages are generic — not tied to any career domain.
 * Maps to ALTAIR questionnaire values for journey mapping.
 */

export interface EducationStage {
  /** Stable identifier, e.g. "in-class-8-10" */
  id: string
  /** Display label */
  label: string
  /** Sequential order within the country's system (lower = earlier) */
  order: number
  /** Brief description of this stage */
  description: string
  /**
   * ALTAIR questionnaire values that map to this stage.
   * Aligns with: Class 8–10, Class 11–12, Undergraduate, Postgraduate, Working Professional
   */
  questionnaireValues: readonly string[]
}

export interface CountryEducationSystem {
  /** ISO-style country code, e.g. "IN" */
  countryCode: string
  /** Human-readable country name */
  countryName: string
  /** Ordered education stages from earliest to latest */
  stages: readonly EducationStage[]
}

/** Stages shared across all countries — appended after country-specific stages. */
export const UNIVERSAL_STAGES: readonly EducationStage[] = [
  {
    id: 'working-professional',
    label: 'Working Professional',
    order: 900,
    description: 'Currently employed; may be learning alongside or beyond formal education.',
    questionnaireValues: ['Working Professional'],
  },
  {
    id: 'career-changer',
    label: 'Career Changer',
    order: 910,
    description: 'Transitioning from a different field into a new career path.',
    questionnaireValues: ['Working Professional'],
  },
]

const INDIA_STAGES: readonly EducationStage[] = [
  {
    id: 'in-class-8-10',
    label: 'Class 8–12 (School)',
    order: 10,
    description: 'School education from middle school through senior secondary, including board examinations.',
    questionnaireValues: ['Class 8–10', 'Class 11–12'],
  },
  {
    id: 'in-diploma',
    label: 'Diploma',
    order: 20,
    description: 'Polytechnic, vocational, or professional diploma programmes.',
    questionnaireValues: ['Class 11–12', 'Undergraduate'],
  },
  {
    id: 'in-bachelors',
    label: "Bachelor's",
    order: 30,
    description: 'Undergraduate degree (BA, BSc, BCom, B.Tech, B.Ed., etc.).',
    questionnaireValues: ['Undergraduate'],
  },
  {
    id: 'in-masters',
    label: "Master's",
    order: 40,
    description: 'Postgraduate degree (MA, MSc, M.Tech, MBA, etc.).',
    questionnaireValues: ['Postgraduate'],
  },
]

const AUSTRALIA_STAGES: readonly EducationStage[] = [
  {
    id: 'au-year-10-12',
    label: 'Year 10–12 (School)',
    order: 10,
    description: 'Senior secondary schooling through Year 12 certification.',
    questionnaireValues: ['Class 8–10', 'Class 11–12'],
  },
  {
    id: 'au-tafe',
    label: 'TAFE / Vocational',
    order: 20,
    description: 'Technical and Further Education — certificates and diplomas.',
    questionnaireValues: ['Class 11–12', 'Undergraduate'],
  },
  {
    id: 'au-bachelors',
    label: "Bachelor's",
    order: 30,
    description: 'Undergraduate university degree.',
    questionnaireValues: ['Undergraduate'],
  },
  {
    id: 'au-masters',
    label: "Master's",
    order: 40,
    description: 'Postgraduate university degree.',
    questionnaireValues: ['Postgraduate'],
  },
]

/**
 * Registry of country education systems.
 * Add new countries by appending — do not modify existing country definitions.
 */
export const EDUCATION_SYSTEMS: readonly CountryEducationSystem[] = [
  { countryCode: 'IN', countryName: 'India', stages: INDIA_STAGES },
  { countryCode: 'AU', countryName: 'Australia', stages: AUSTRALIA_STAGES },
]

const COUNTRY_ALIASES: Readonly<Record<string, string>> = {
  india: 'IN',
  in: 'IN',
  australia: 'AU',
  au: 'AU',
}

/**
 * Resolves a country input (name or code) to a registered education system.
 */
export function getEducationSystem(
  country: string,
): CountryEducationSystem | undefined {
  const normalised = country.trim().toLowerCase()
  const code =
    COUNTRY_ALIASES[normalised] ??
    EDUCATION_SYSTEMS.find(
      (system) =>
        system.countryCode.toLowerCase() === normalised ||
        system.countryName.toLowerCase() === normalised,
    )?.countryCode

  if (!code) {
    return undefined
  }

  return EDUCATION_SYSTEMS.find((system) => system.countryCode === code)
}

/**
 * Returns all stages for a country, including universal stages.
 */
export function getStagesForCountry(country: string): readonly EducationStage[] {
  const system = getEducationSystem(country)
  if (!system) {
    return UNIVERSAL_STAGES
  }
  return [...system.stages, ...UNIVERSAL_STAGES]
}

/**
 * Finds education stages matching a questionnaire education level value.
 */
export function findStagesByQuestionnaireValue(
  country: string,
  questionnaireValue: string,
): readonly EducationStage[] {
  return getStagesForCountry(country).filter((stage) =>
    stage.questionnaireValues.includes(questionnaireValue),
  )
}

/**
 * Finds a single stage by ID within a country's system.
 */
export function findStageById(
  country: string,
  stageId: string,
): EducationStage | undefined {
  return getStagesForCountry(country).find((stage) => stage.id === stageId)
}
