export interface RoadmapMetadata {
  roadmapId: string
  careerGoal: string
  country: string
  educationLevel: string
  currentKnowledge: string
  studyHoursPerWeek: string
  learningStyle: string
  timeline: string
  additionalInfo?: string
  generatedAt: string
  lastUpdated: string
  version: number
}

export interface RoadmapOverview {
  title: string
  summary: string
  estimatedCompletion: string
  difficulty: string
  keyHighlights: string[]
}

export interface RoadmapMilestone {
  id?: string
  title: string
  startMonth: number
  endMonth: number
  description: string
}

export interface RoadmapTimeline {
  duration: string
  durationMonths?: number
  milestones: RoadmapMilestone[]
}

export interface RoadmapLearningPhase {
  id?: string
  phaseNumber: number
  title: string
  duration: string
  goal: string
  topics: string[]
  deliverables: string[]
  successCriteria: string[]
}

export interface RoadmapProject {
  id?: string
  title: string
  difficulty: string
  description: string
  skills: string[]
  estimatedTime: string
  relatedPhaseNumber?: number
}

export interface RoadmapResource {
  id?: string
  category: string
  title: string
  type: string
  isFree: boolean
  reason: string
  relatedPhaseNumber?: number
}

export interface RoadmapCareerAdvice {
  tips: string[]
  commonMistakes: string[]
  interviewPreparation: string[]
}

export interface RoadmapResponsibleAI {
  disclaimer: string
  limitations: string[]
  recommendations: string[]
}

export interface RoadmapNextSteps {
  recommendedAction: string
  suggestions: string[]
}

export interface RoadmapConfidence {
  score: number
  reason: string
  factors?: Array<{ factor: string; impact: string }>
}

export interface RoadmapData {
  schemaVersion: string
  metadata: RoadmapMetadata
  overview: RoadmapOverview
  timeline: RoadmapTimeline
  learningPhases: RoadmapLearningPhase[]
  projects: RoadmapProject[]
  resources: RoadmapResource[]
  careerAdvice: RoadmapCareerAdvice
  responsibleAI: RoadmapResponsibleAI
  nextSteps: RoadmapNextSteps
  confidence: RoadmapConfidence
}

export interface RoadmapLocationState {
  roadmap?: RoadmapData
}
