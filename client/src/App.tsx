import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoadingSequence from './pages/LoadingSequence'
import QuestionnairePage from './pages/QuestionnairePage'
import RoadmapPage from './pages/RoadmapPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/launch" element={<LoadingSequence />} />
        <Route path="/questionnaire" element={<QuestionnairePage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
      </Routes>
    </BrowserRouter>
  )
}
