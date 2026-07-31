import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import QuestionnaireCard from '../components/questionnaire/QuestionnaireCard'

export default function QuestionnairePage() {
  return (
    <main className="min-h-svh overflow-x-hidden">
      <Link
        to="/"
        className="fixed left-4 top-4 z-50 inline-flex items-center gap-2 rounded-2xl border border-white/60 bg-white/90 px-3.5 py-2.5 text-sm font-medium text-secondary-text shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-primary-text focus:outline-none focus-visible:ring-2 focus-visible:ring-nebula-teal/30 sm:left-6 sm:top-6 sm:px-4"
        aria-label="Back to home"
      >
        <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline">Back to Home</span>
      </Link>
      <QuestionnaireCard />
    </main>
  )
}
