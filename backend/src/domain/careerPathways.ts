/**
 * Career pathway model — reusable structure for any career in any domain.
 * Only a small set of example careers is included to demonstrate the pattern.
 * New careers are added by appending to the registry; the interfaces remain stable.
 */

import type { CareerDomain } from './careerDomains'
import { getCareerDomain } from './careerDomains'

/**
 * Describes a stage in a career's typical education or qualification path.
 * References generic stage labels — country-specific resolution happens in journey mapping.
 */
export interface PathwayEducationStage {
  /** Order in the typical path (lower = earlier) */
  order: number
  /** Human-readable stage label, e.g. "Bachelor's degree in relevant field" */
  label: string
  /** Whether this stage is commonly required vs. optional or alternative */
  required: boolean
  /** Additional context for journey mapping */
  notes?: string
}

/**
 * A career pathway definition — domain-agnostic structure applicable to any field.
 */
export interface CareerPathway {
  /** Stable slug, e.g. "software-engineer" */
  id: string
  /** Domain this career belongs to — references careerDomains.ts */
  domain: CareerDomain['id']
  /** Primary career name as users might enter it */
  careerName: string
  /** Alternate names for lookup matching */
  aliases?: readonly string[]
  /** Typical education and qualification stages toward this career */
  typicalEducationStages: readonly PathwayEducationStage[]
  /** Stages that may apply depending on country, institution, or learner choice */
  optionalStages: readonly PathwayEducationStage[]
  /** Certifications, licences, or registrations commonly associated with this career */
  recommendedCertifications: readonly string[]
  /** Transferable or domain-specific skills commonly expected */
  commonSkills: readonly string[]
  /** Free-form notes for journey mapping and future AI context injection */
  notes: readonly string[]
}

// ---------------------------------------------------------------------------
// Example careers — demonstrate structure across different domains
// ---------------------------------------------------------------------------

const SOFTWARE_ENGINEER: CareerPathway = {
  id: 'software-engineer',
  domain: 'technology',
  careerName: 'Software Engineer',
  aliases: ['Software Developer', 'Programmer'],
  typicalEducationStages: [
    { order: 1, label: 'Secondary education with mathematics or computing', required: true },
    { order: 2, label: "Bachelor's degree in Computer Science or related field", required: false, notes: 'Alternative routes include diplomas and intensive self-study with portfolio' },
    { order: 3, label: 'Practical programming and project experience', required: true },
  ],
  optionalStages: [
    { order: 1, label: 'Industry certifications (cloud, security, etc.)', required: false },
    { order: 2, label: "Master's degree for specialisation", required: false },
  ],
  recommendedCertifications: [],
  commonSkills: ['Programming', 'Problem solving', 'Collaboration', 'Version control'],
  notes: ['Portfolio projects often substitute for formal credentials in some markets.'],
}

const REGISTERED_NURSE: CareerPathway = {
  id: 'registered-nurse',
  domain: 'healthcare',
  careerName: 'Registered Nurse',
  aliases: ['RN', 'Staff Nurse'],
  typicalEducationStages: [
    { order: 1, label: 'Secondary education with science subjects', required: true },
    { order: 2, label: 'Nursing diploma or Bachelor of Nursing (BSN)', required: true },
    { order: 3, label: 'Clinical placements and licensing examination', required: true },
  ],
  optionalStages: [
    { order: 1, label: 'Specialisation certification (e.g. ICU, paediatrics)', required: false },
    { order: 2, label: "Master's in Nursing for advanced practice", required: false },
  ],
  recommendedCertifications: ['National nursing licence or registration'],
  commonSkills: ['Patient care', 'Clinical assessment', 'Communication', 'Emergency response'],
  notes: ['Licensing requirements vary significantly by country — country rules take precedence.'],
}

const CHARTERED_ACCOUNTANT: CareerPathway = {
  id: 'chartered-accountant',
  domain: 'finance',
  careerName: 'Chartered Accountant',
  aliases: ['CA', 'CPA'],
  typicalEducationStages: [
    { order: 1, label: 'Secondary education with commerce or mathematics', required: true },
    { order: 2, label: "Bachelor's degree in Accounting, Commerce, or related field", required: true },
    { order: 3, label: 'Professional accounting qualification programme', required: true },
    { order: 4, label: 'Articleship / practical training period', required: true },
  ],
  optionalStages: [
    { order: 1, label: "Master's in Finance or Taxation", required: false },
  ],
  recommendedCertifications: ['Chartered Accountant (CA)', 'Certified Public Accountant (CPA)'],
  commonSkills: ['Financial reporting', 'Taxation', 'Auditing', 'Regulatory compliance'],
  notes: ['CA and CPA are jurisdiction-specific — map to country rules during journey mapping.'],
}

const PRIMARY_SCHOOL_TEACHER: CareerPathway = {
  id: 'primary-school-teacher',
  domain: 'education',
  careerName: 'Primary School Teacher',
  aliases: ['Elementary Teacher', 'Primary Teacher'],
  typicalEducationStages: [
    { order: 1, label: 'Secondary education completion', required: true },
    { order: 2, label: 'Teaching qualification or Bachelor of Education (B.Ed.)', required: true },
    { order: 3, label: 'Student teaching / practicum', required: true },
    { order: 4, label: 'Teaching licence or registration', required: true },
  ],
  optionalStages: [
    { order: 1, label: 'Subject specialisation or postgraduate education', required: false },
  ],
  recommendedCertifications: ['National or state teaching licence'],
  commonSkills: ['Curriculum delivery', 'Classroom management', 'Child development', 'Communication'],
  notes: ['Credential requirements differ by country and school system type (public vs private).'],
}

/**
 * Registry of example and registered career pathways.
 * Production expansion: append new CareerPathway objects — do not change the interface.
 */
export const CAREER_PATHWAYS: readonly CareerPathway[] = [
  SOFTWARE_ENGINEER,
  REGISTERED_NURSE,
  CHARTERED_ACCOUNTANT,
  PRIMARY_SCHOOL_TEACHER,
]

/**
 * Resolves a career goal string to a registered pathway (case-insensitive, alias-aware).
 * Placeholder matching — future: fuzzy search, external registry, or AI-assisted resolution.
 */
export function getCareerPathway(careerGoal: string): CareerPathway | undefined {
  const normalised = careerGoal.trim().toLowerCase()

  return CAREER_PATHWAYS.find(
    (pathway) =>
      pathway.careerName.toLowerCase() === normalised ||
      pathway.id === normalised.replace(/\s+/g, '-') ||
      pathway.aliases?.some((alias) => alias.toLowerCase() === normalised),
  )
}

/**
 * Returns all pathways belonging to a given domain.
 */
export function getPathwaysByDomain(domainId: string): readonly CareerPathway[] {
  return CAREER_PATHWAYS.filter((pathway) => pathway.domain === domainId)
}

/**
 * Validates that a pathway's domain reference exists in the domain registry.
 */
export function isPathwayDomainValid(pathway: CareerPathway): boolean {
  return getCareerDomain(pathway.domain) !== undefined
}
