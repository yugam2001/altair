import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import WhyAltair from '../components/WhyAltair'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import ResponsibleAI from '../components/ResponsibleAI'
import OurVision from '../components/OurVision'
import CallToAction from '../components/CallToAction'
import Footer from '../components/Footer'
import IntroTransition, {
  INTRO_TRANSITION_TIMINGS,
} from '../components/IntroTransition'

export default function LandingPage() {
  const navigate = useNavigate()
  const logoImageRef = useRef<HTMLImageElement>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [sourceRect, setSourceRect] = useState<DOMRect | null>(null)

  const handleGenerateClick = useCallback(() => {
    if (isTransitioning) return

    const rect = logoImageRef.current?.getBoundingClientRect()
    if (!rect) return

    setSourceRect(rect)
    setIsTransitioning(true)
  }, [isTransitioning])

  const handleTransitionComplete = useCallback(() => {
    navigate('/questionnaire')
  }, [navigate])

  return (
    <>
      <motion.div
        animate={{ opacity: isTransitioning ? 0 : 1 }}
        transition={{
          duration: INTRO_TRANSITION_TIMINGS.contentFade / 1000,
          ease: 'easeInOut',
        }}
        className={isTransitioning ? 'pointer-events-none' : undefined}
      >
        <div className="min-h-svh">
          <Navbar />
          <main>
            <Hero
              logoImageRef={logoImageRef}
              onGenerateClick={handleGenerateClick}
              generateDisabled={isTransitioning}
            />
            <WhyAltair />
            <Features />
            <HowItWorks />
            <ResponsibleAI />
            <OurVision />
            <CallToAction
              onGenerateClick={handleGenerateClick}
              generateDisabled={isTransitioning}
            />
          </main>
          <Footer />
        </div>
      </motion.div>

      {isTransitioning && sourceRect && (
        <IntroTransition
          sourceRect={sourceRect}
          onComplete={handleTransitionComplete}
        />
      )}
    </>
  )
}
