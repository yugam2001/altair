/**
 * Country-specific education system rules.
 * Describes how education generally progresses in a country — no career-specific logic.
 */

export interface EducationProgressionStep {
  order: number
  title: string
  description: string
  /** Whether this step is optional or varies by learner choice or institution */
  optional?: boolean
}

export interface CountryEducationFramework {
  /** Stable identifier, e.g. "in-formal-education" */
  id: string
  name: string
  description: string
  steps: readonly EducationProgressionStep[]
}

export interface CountryRules {
  countryCode: string
  countryName: string
  /** General education frameworks applicable in this country */
  frameworks: readonly CountryEducationFramework[]
  /** Country-wide notes for journey mapping — not career-specific */
  generalNotes: readonly string[]
}

const INDIA_FORMAL_EDUCATION: CountryEducationFramework = {
  id: 'in-formal-education',
  name: 'Formal Education System',
  description:
    'Standard progression through the Indian school and higher education system.',
  steps: [
    {
      order: 1,
      title: 'School education (Class 1–12)',
      description:
        'Primary, middle, and senior secondary education. Class 10 and Class 12 board examinations are major transition points.',
    },
    {
      order: 2,
      title: 'Stream selection after Class 10',
      description:
        'Learners choose academic streams (Science, Commerce, Arts, vocational) for Classes 11–12.',
    },
    {
      order: 3,
      title: 'Higher secondary completion (Class 12)',
      description:
        'Final school board examinations. Gateway to undergraduate study, diplomas, or professional entry routes.',
    },
    {
      order: 4,
      title: 'Entrance examinations (where applicable)',
      description:
        'National or state-level entrance tests for professional programmes (engineering, medicine, law, etc.). Institution-dependent.',
      optional: true,
    },
    {
      order: 5,
      title: 'Undergraduate study or diploma',
      description:
        'Three- to four-year bachelor\'s degrees, or diploma programmes through polytechnics and vocational institutes.',
    },
    {
      order: 6,
      title: 'Postgraduate study (optional)',
      description:
        'Master\'s degrees, professional programmes, or research-oriented study.',
      optional: true,
    },
    {
      order: 7,
      title: 'Professional registration or licensing (where applicable)',
      description:
        'Many regulated professions require board registration or licensing after formal qualifications.',
      optional: true,
    },
  ],
}

const INDIA_ALTERNATIVE_PATHWAYS: CountryEducationFramework = {
  id: 'in-alternative-pathways',
  name: 'Alternative and Vocational Pathways',
  description:
    'Non-traditional routes including diplomas, open learning, and skill-based entry.',
  steps: [
    {
      order: 1,
      title: 'Minimum secondary completion',
      description: 'Most pathways require Class 10 or Class 12 completion as a baseline.',
    },
    {
      order: 2,
      title: 'Diploma or certificate programme',
      description: 'ITI, polytechnic, NSDC skill programmes, or sector-specific certifications.',
    },
    {
      order: 3,
      title: 'Lateral entry or bridge programmes',
      description: 'Pathways into degree programmes or direct workforce entry depending on field.',
      optional: true,
    },
  ],
}

const INDIA_RULES: CountryRules = {
  countryCode: 'IN',
  countryName: 'India',
  frameworks: [INDIA_FORMAL_EDUCATION, INDIA_ALTERNATIVE_PATHWAYS],
  generalNotes: [
    'Board exam years (Class 10 and 12) are critical milestones — roadmaps should not skip them for school-age learners.',
    'Central (CBSE/ICSE) and state boards follow similar structures but may differ in pacing and subjects.',
    'Regulated professions (medicine, law, nursing, etc.) have statutory qualification requirements that override generic pathways.',
    'Open university and distance learning (e.g. IGNOU) provide flexible alternatives to full-time study.',
  ],
}

const AUSTRALIA_FORMAL_EDUCATION: CountryEducationFramework = {
  id: 'au-formal-education',
  name: 'Formal Education System',
  description:
    'Standard progression through the Australian school and university system.',
  steps: [
    {
      order: 1,
      title: 'Compulsory schooling through Year 10',
      description: 'Foundation education; subject selection for senior years begins around Year 10.',
    },
    {
      order: 2,
      title: 'Senior secondary (Years 11–12)',
      description: 'Completion of Year 12 certificate — prerequisite for most university entry.',
    },
    {
      order: 3,
      title: 'ATAR or equivalent ranking',
      description: 'Australian Tertiary Admission Rank for university selection. Alternative entry pathways exist.',
      optional: true,
    },
    {
      order: 4,
      title: 'Undergraduate university degree',
      description: 'Bachelor-level study — typically three to four years depending on discipline.',
    },
    {
      order: 5,
      title: 'Postgraduate study (optional)',
      description: 'Honours, master\'s, or doctoral programmes for advanced qualifications.',
      optional: true,
    },
    {
      order: 6,
      title: 'Professional registration (where applicable)',
      description: 'Regulated professions require registration with relevant Australian boards or authorities.',
      optional: true,
    },
  ],
}

const AUSTRALIA_VET_PATHWAY: CountryEducationFramework = {
  id: 'au-vet',
  name: 'Vocational Education and Training (VET)',
  description: 'TAFE and registered training organisation pathways into skilled employment.',
  steps: [
    {
      order: 1,
      title: 'Year 10 or equivalent',
      description: 'Minimum entry for many Certificate-level VET programmes.',
    },
    {
      order: 2,
      title: 'Certificate or Diploma (TAFE/RTO)',
      description: 'Nationally recognised vocational qualifications across trades and services.',
    },
    {
      order: 3,
      title: 'Pathway to higher education (optional)',
      description: 'Credit transfer into bachelor programmes available for some qualifications.',
      optional: true,
    },
    {
      order: 4,
      title: 'Trade licensing or industry certification',
      description: 'Some trades require additional licensing beyond the VET qualification.',
      optional: true,
    },
  ],
}

const AUSTRALIA_RULES: CountryRules = {
  countryCode: 'AU',
  countryName: 'Australia',
  frameworks: [AUSTRALIA_FORMAL_EDUCATION, AUSTRALIA_VET_PATHWAY],
  generalNotes: [
    'ATAR is one entry route — mature-age entry, bridging courses, and VET pathways are valid alternatives.',
    'Professional accreditation bodies (e.g. AHPRA for health, state teaching boards) govern regulated careers.',
    'State and territory variations exist in school certification naming but follow a consistent national framework.',
    'International students should verify visa and qualification recognition requirements independently.',
  ],
}

/**
 * Registry of country education rules.
 * Add new countries by appending — existing country objects remain unchanged.
 */
export const COUNTRY_RULES: readonly CountryRules[] = [INDIA_RULES, AUSTRALIA_RULES]

const COUNTRY_ALIASES: Readonly<Record<string, string>> = {
  india: 'IN',
  in: 'IN',
  australia: 'AU',
  au: 'AU',
}

/**
 * Resolves country input to registered rules.
 */
export function getCountryRules(country: string): CountryRules | undefined {
  const normalised = country.trim().toLowerCase()
  const code =
    COUNTRY_ALIASES[normalised] ??
    COUNTRY_RULES.find(
      (rules) =>
        rules.countryCode.toLowerCase() === normalised ||
        rules.countryName.toLowerCase() === normalised,
    )?.countryCode

  if (!code) {
    return undefined
  }

  return COUNTRY_RULES.find((rules) => rules.countryCode === code)
}

/**
 * Returns all education frameworks for a country.
 */
export function getFrameworksForCountry(
  country: string,
): readonly CountryEducationFramework[] {
  return getCountryRules(country)?.frameworks ?? []
}
