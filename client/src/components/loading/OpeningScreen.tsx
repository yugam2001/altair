import { useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ConstellationLoader from './ConstellationLoader'
import { OPENING_SCREEN_IMAGE } from './constants'

export { OPENING_SCREEN_IMAGE }

export default function OpeningScreen() {
  const navigate = useNavigate()
  const hasCompletedRef = useRef(false)

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
