/**
 * Broad career domains supported by ALTAIR.
 * Domains group careers for journey mapping — this file defines domains only, not individual careers.
 */

export interface CareerDomain {
  /** Stable slug, e.g. "technology" */
  id: string
  /** Display name */
  name: string
  /** Brief description of the domain scope */
  description: string
}

/**
 * Registry of career domains.
 * Add new domains by appending — do not modify existing domain definitions.
 */
export const CAREER_DOMAINS: readonly CareerDomain[] = [
  {
    id: 'technology',
    name: 'Technology',
    description: 'Software, IT, data, cybersecurity, cloud, and related digital fields.',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Medicine, nursing, allied health, public health, and clinical support roles.',
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Management, operations, consulting, human resources, and general business roles.',
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Accounting, banking, investment, insurance, and financial analysis.',
  },
  {
    id: 'law',
    name: 'Law',
    description: 'Legal practice, paralegal work, compliance, and judicial pathways.',
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Teaching, academic administration, tutoring, and educational leadership.',
  },
  {
    id: 'arts-design',
    name: 'Arts & Design',
    description: 'Visual arts, graphic design, UX/UI, fashion, and creative industries.',
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Pure and applied sciences, laboratory work, and scientific research support.',
  },
  {
    id: 'engineering',
    name: 'Engineering',
    description: 'Mechanical, civil, electrical, chemical, and other engineering disciplines.',
  },
  {
    id: 'architecture',
    name: 'Architecture',
    description: 'Architectural design, urban planning, and built-environment professions.',
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    description: 'Hotels, restaurants, event management, and guest services.',
  },
  {
    id: 'tourism',
    name: 'Tourism',
    description: 'Travel, tour operations, destination management, and tourism services.',
  },
  {
    id: 'government',
    name: 'Government',
    description: 'Public administration, civil service, policy, and regulatory roles.',
  },
  {
    id: 'media-communication',
    name: 'Media & Communication',
    description: 'Journalism, broadcasting, public relations, and content creation.',
  },
  {
    id: 'sports',
    name: 'Sports',
    description: 'Athletics, coaching, sports management, and fitness professions.',
  },
  {
    id: 'defence',
    name: 'Defence',
    description: 'Military, paramilitary, and national security career pathways.',
  },
  {
    id: 'research',
    name: 'Research',
    description: 'Academic and industry research across disciplines.',
  },
  {
    id: 'entrepreneurship',
    name: 'Entrepreneurship',
    description: 'Starting and scaling ventures, startups, and independent business ownership.',
  },
  {
    id: 'skilled-trades',
    name: 'Skilled Trades',
    description: 'Electrician, plumbing, carpentry, welding, and other vocational trades.',
  },
]

/**
 * Resolves a domain by ID or name (case-insensitive).
 */
export function getCareerDomain(domainIdOrName: string): CareerDomain | undefined {
  const normalised = domainIdOrName.trim().toLowerCase()

  return CAREER_DOMAINS.find(
    (domain) =>
      domain.id === normalised ||
      domain.name.toLowerCase() === normalised,
  )
}

/**
 * Returns all registered domain IDs.
 */
export function listCareerDomainIds(): readonly string[] {
  return CAREER_DOMAINS.map((domain) => domain.id)
}
