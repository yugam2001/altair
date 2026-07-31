import { Link } from 'react-router-dom'
import RoadmapBackground from './RoadmapBackground'

interface RoadmapErrorStateProps {
  message: string
  showQuestionnaireLink?: boolean
}

export default function RoadmapErrorState({
  message,
  showQuestionnaireLink = true,
}: RoadmapErrorStateProps) {
  return (
    <div className="relative min-h-svh text-white">
      <RoadmapBackground />

      <div className="relative z-10 flex min-h-svh flex-col items-center justify-center px-6">
        <div className="max-w-md rounded-[1.75rem] border border-blue-400/15 bg-[#0a1224]/70 p-8 text-center shadow-[0_16px_48px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl sm:p-10">
          <p className="font-display text-sm font-semibold tracking-[0.18em] text-white uppercase">
            ALTAIR
          </p>
          <h1 className="mt-6 text-xl font-semibold text-white sm:text-2xl">
            Unable to load your roadmap
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-blue-100/65 sm:text-[15px]">{message}</p>
          {showQuestionnaireLink && (
            <Link
              to="/questionnaire"
              className="mt-8 inline-flex items-center justify-center rounded-xl border border-blue-400/25 bg-blue-600/25 px-6 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-600/35"
            >
              Back to Questionnaire
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
