export interface QuestionnaireState {
  careerGoal: string
  country: string
  educationLevel: string
  knowledgeLevel: string
  studyHours: string
  learningStyle: string
  timeline: string
  additionalInfo: string
}

export type QuestionnaireField = keyof QuestionnaireState

export const INITIAL_QUESTIONNAIRE_STATE: QuestionnaireState = {
  careerGoal: '',
  country: '',
  educationLevel: '',
  knowledgeLevel: '',
  studyHours: '',
  learningStyle: '',
  timeline: '',
  additionalInfo: '',
}

export type ValidationErrors = Partial<Record<QuestionnaireField, string>>

export const STEP_META = [
  {
    emoji: '🎯',
    label: 'Your Destination',
    subtitle: "Let's understand where you want to go.",
  },
  {
    emoji: '🧠',
    label: 'Your Learning Style',
    subtitle: 'Help us personalize your roadmap.',
  },
  {
    emoji: '✨',
    label: 'Final Details',
    subtitle: 'Almost there—just a few more details.',
  },
] as const

export interface SelectOption {
  value: string
  emoji: string
  title: string
  description: string
}

export const EDUCATION_SELECT_OPTIONS: readonly SelectOption[] = [
  { value: 'Class 8–10', emoji: '📖', title: 'Class 8–10', description: 'Middle school years' },
  { value: 'Class 11–12', emoji: '📝', title: 'Class 11–12', description: 'Pre-university / high school' },
  { value: 'Undergraduate', emoji: '🎓', title: 'Undergraduate', description: "Bachelor's degree" },
  { value: 'Postgraduate', emoji: '🏛️', title: 'Postgraduate', description: "Master's or beyond" },
  { value: 'Working Professional', emoji: '💼', title: 'Working Professional', description: 'Already in the workforce' },
]

export const KNOWLEDGE_SELECT_OPTIONS: readonly SelectOption[] = [
  { value: 'Beginner', emoji: '🌱', title: 'Beginner', description: 'Just getting started' },
  { value: 'Intermediate', emoji: '📈', title: 'Intermediate', description: 'Some experience' },
  { value: 'Advanced', emoji: '⚡', title: 'Advanced', description: 'Strong foundation' },
]

export const STUDY_HOURS_SELECT_OPTIONS: readonly SelectOption[] = [
  { value: '5 hrs', emoji: '☕', title: '5 hrs', description: 'Light commitment' },
  { value: '10 hrs', emoji: '📅', title: '10 hrs', description: 'Steady pace' },
  { value: '15 hrs', emoji: '🔥', title: '15 hrs', description: 'Dedicated learner' },
  { value: '20+ hrs', emoji: '⭐', title: '20+ hrs', description: 'Full immersion' },
]

export const LEARNING_STYLE_SELECT_OPTIONS: readonly SelectOption[] = [
  { value: 'Videos', emoji: '▶️', title: 'Videos', description: 'Watch and learn' },
  { value: 'Reading', emoji: '📚', title: 'Reading', description: 'Books and articles' },
  { value: 'Hands-on Projects', emoji: '🛠️', title: 'Hands-on Projects', description: 'Learn by building' },
  { value: 'Interactive Courses', emoji: '💻', title: 'Interactive Courses', description: 'Structured online learning' },
  { value: 'No Preference', emoji: '✨', title: 'No Preference', description: 'Open to anything' },
]

export const TIMELINE_SELECT_OPTIONS: readonly SelectOption[] = [
  { value: '6 Months', emoji: '⏱️', title: '6 Months', description: 'Quick sprint' },
  { value: '1 Year', emoji: '📆', title: '1 Year', description: 'One full cycle' },
  { value: '2 Years', emoji: '🗓️', title: '2 Years', description: 'Steady progression' },
  { value: '3+ Years', emoji: '🌅', title: '3+ Years', description: 'Long-term journey' },
  { value: 'Flexible', emoji: '🧭', title: 'Flexible', description: 'No fixed deadline' },
]

// Legacy value arrays — state & validation still use these strings
export const EDUCATION_OPTIONS = EDUCATION_SELECT_OPTIONS.map((o) => o.value)
export const KNOWLEDGE_OPTIONS = KNOWLEDGE_SELECT_OPTIONS.map((o) => o.value)
export const STUDY_HOURS_OPTIONS = STUDY_HOURS_SELECT_OPTIONS.map((o) => o.value)
export const LEARNING_STYLE_OPTIONS = LEARNING_STYLE_SELECT_OPTIONS.map((o) => o.value)
export const TIMELINE_OPTIONS = TIMELINE_SELECT_OPTIONS.map((o) => o.value)
