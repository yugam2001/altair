import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { submitQuestionnaire } from '../../services/roadmapApi'
import type { QuestionnaireState } from '../../types/questionnaire'
import type { RoadmapData } from '../../types/roadmap'
import ConstellationLoader from './ConstellationLoader'
import { OPENING_SCREEN_IMAGE } from './constants'

export { OPENING_SCREEN_IMAGE }

interface LaunchLocationState {
  questionnaire?: QuestionnaireState
}

type ApiStatus = 'idle' | 'pending' | 'success' | 'error'

interface ApiResult {
  status: ApiStatus
  roadmap?: RoadmapData
  errorMessage?: string
}

export default function OpeningScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const hasCompletedRef = useRef(false)
  const animationDoneRef = useRef(false)
  const apiResultRef = useRef<ApiResult>({ status: 'idle' })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isWaitingForApi, setIsWaitingForApi] = useState(false)

  const questionnaire = (location.state as LaunchLocationState | null)?.questionnaire

  const tryFinish = useCallback(() => {
    if (hasCompletedRef.current) return
    if (!animationDoneRef.current) return

    const result = apiResultRef.current

    if (result.status === 'pending') {
      setIsWaitingForApi(true)
      return
    }

    if (result.status === 'success' && result.roadmap) {
      hasCompletedRef.current = true
      navigate('/roadmap', { state: { roadmap: result.roadmap }, replace: true })
      return
    }

    if (result.status === 'error') {
      setIsWaitingForApi(false)
      setErrorMessage(result.errorMessage ?? 'Something went wrong while generating your roadmap.')
    }
  }, [navigate])

  useEffect(() => {
    if (!questionnaire) return

    apiResultRef.current = { status: 'pending' }

    void submitQuestionnaire(questionnaire)
      .then((response) => {
        if (response.success && response.roadmap) {
          apiResultRef.current = { status: 'success', roadmap: response.roadmap }
        } else if (!response.success) {
          apiResultRef.current = {
            status: 'error',
            errorMessage: response.message || 'Roadmap generation failed. Please try again.',
          }
        } else {
          apiResultRef.current = {
            status: 'error',
            errorMessage: 'Roadmap generation failed. Please try again.',
          }
        }
        tryFinish()
      })
      .catch((error: unknown) => {
        const message =
          error instanceof Error
            ? error.message
            : 'Unable to reach the server. Please check your connection and try again.'
        apiResultRef.current = { status: 'error', errorMessage: message }
        tryFinish()
      })
  }, [questionnaire, tryFinish])

  const handleSequenceComplete = useCallback(() => {
    animationDoneRef.current = true
    tryFinish()
  }, [tryFinish])

  if (!questionnaire) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#020617] px-6">
        <div className="max-w-md text-center">
          <p className="text-sm text-blue-100/70">
            No questionnaire data found. Please complete the questionnaire first.
          </p>
          <Link
            to="/questionnaire"
            className="mt-6 inline-flex items-center justify-center rounded-xl border border-blue-400/25 bg-blue-600/25 px-6 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-600/35"
          >
            Go to Questionnaire
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 h-screen w-screen overflow-hidden bg-[#020617]">
      <img
        src={OPENING_SCREEN_IMAGE}
        alt="ALTAIR — Find your way forward."
        className="h-full w-full object-cover object-center"
        draggable={false}
      />

      {!errorMessage && <ConstellationLoader onComplete={handleSequenceComplete} />}

      {isWaitingForApi && !errorMessage && (
        <div className="absolute inset-x-0 bottom-16 z-20 flex justify-center px-6">
          <p className="rounded-full border border-blue-400/20 bg-[#0a1224]/80 px-5 py-2.5 text-sm text-blue-100/75 backdrop-blur-sm">
            Finalising your roadmap…
          </p>
        </div>
      )}

      {errorMessage && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#020617]/75 px-6 backdrop-blur-sm">
          <div className="max-w-md rounded-[1.75rem] border border-blue-400/15 bg-[#0a1224]/90 p-8 text-center shadow-[0_16px_48px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-10">
            <h2 className="text-xl font-semibold text-white">Roadmap generation failed</h2>
            <p className="mt-3 text-sm leading-relaxed text-blue-100/65">{errorMessage}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/questionnaire"
                state={{ questionnaire }}
                className="inline-flex items-center justify-center rounded-xl border border-blue-400/25 bg-blue-600/25 px-6 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-600/35"
              >
                Try Again
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
