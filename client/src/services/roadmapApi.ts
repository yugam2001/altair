import type { QuestionnaireState } from '../types/questionnaire'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export interface RoadmapSubmitResponse {
  success: boolean
  message: string
}

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

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json() as Promise<RoadmapSubmitResponse>
}
