import type { QuestionnaireState } from '../types/questionnaire'
import type { RoadmapData } from '../types/roadmap'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export interface RoadmapSubmitSuccess {
  success: true
  roadmap: RoadmapData
}

export interface RoadmapSubmitFailure {
  success: false
  message: string
}

export type RoadmapSubmitResponse = RoadmapSubmitSuccess | RoadmapSubmitFailure

export async function submitQuestionnaire(
  questionnaire: QuestionnaireState,
): Promise<RoadmapSubmitResponse> {
  const response = await fetch(`${API_BASE_URL}/roadmap`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(questionnaire),
  })

  const data = (await response.json()) as RoadmapSubmitResponse

  if (!response.ok) {
    const message =
      !data.success ? data.message : `Request failed with status ${response.status}`
    throw new Error(message)
  }

  return data
}
