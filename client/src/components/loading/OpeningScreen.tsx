import { useCallback, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { submitQuestionnaire } from '../../services/roadmapApi'
import type { QuestionnaireState } from '../../types/questionnaire'
import ConstellationLoader from './ConstellationLoader'
import { OPENING_SCREEN_IMAGE } from './constants'

export { OPENING_SCREEN_IMAGE }

interface LaunchLocationState {
  questionnaire?: QuestionnaireState
}

export default function OpeningScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const hasCompletedRef = useRef(false)
  const questionnaire = (location.state as LaunchLocationState | null)?.questionnaire

  useEffect(() => {
    if (!questionnaire) return

    void submitQuestionnaire(questionnaire)
      .then((response) => {
        console.log('Backend response:', response)
      })
      .catch((error: unknown) => {
        console.error('Failed to submit questionnaire:', error)
      })
  }, [questionnaire])

  const handleSequenceComplete = useCallback(() => {
    if (hasCompletedRef.current) return
    hasCompletedRef.current = true
    navigate('/roadmap')
  }, [navigate])

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#020617]">
      <img
        src={OPENING_SCREEN_IMAGE}
        alt="ALTAIR — Find your way forward."
        className="h-full w-full object-cover object-center"
        draggable={false}
      />

      <ConstellationLoader onComplete={handleSequenceComplete} />
    </div>
  )
}
