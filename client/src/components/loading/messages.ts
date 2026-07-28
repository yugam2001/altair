export interface LoadingMessage {
  title: string
  description: string
}

export const LOADING_MESSAGES: LoadingMessage[] = [
  {
    title: 'Understanding your goals',
    description:
      'Reviewing your career destination, education and preferred country.',
  },
  {
    title: 'Analysing your learning profile',
    description:
      'Understanding your current knowledge, learning style and weekly study availability.',
  },
  {
    title: 'Designing your learning journey',
    description: 'Creating a personalised roadmap tailored to your goals.',
  },
  {
    title: 'Selecting practical projects',
    description:
      'Choosing projects that reinforce your learning through real-world practice.',
  },
  {
    title: 'Curating learning resources',
    description:
      'Finding high-quality resources that match your experience level.',
  },
  {
    title: 'Finalising your roadmap',
    description: 'Preparing your personalised learning plan.',
  },
]

/** How long each step stays visible — temporary timing for visual testing. */
export const STEP_VISIBLE_MS = {
  min: 4800,
  max: 5800,
} as const

export const STEP_FADE_OUT_MS = 550
export const STEP_INTERVAL_GAP_MS = 450
export const SEQUENCE_START_DELAY_MS = 800

export function randomStepDuration(): number {
  return (
    STEP_VISIBLE_MS.min +
    Math.random() * (STEP_VISIBLE_MS.max - STEP_VISIBLE_MS.min)
  )
}

/** Per-step duration excluding the final fade (approximate upper bound for planning). */
export const STEP_CYCLE_MS =
  STEP_VISIBLE_MS.max + STEP_FADE_OUT_MS + STEP_INTERVAL_GAP_MS

export function estimateSequenceDurationMs(): number {
  return (
    SEQUENCE_START_DELAY_MS +
    LOADING_MESSAGES.length * STEP_CYCLE_MS
  )
}
