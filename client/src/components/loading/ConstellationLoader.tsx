import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import CelestialNode from './CelestialNode'
import LoadingMessageCard from './LoadingMessageCard'
import {
  LOADING_MESSAGES,
  randomStepDuration,
  SEQUENCE_START_DELAY_MS,
  STEP_FADE_OUT_MS,
  STEP_INTERVAL_GAP_MS,
  type LoadingMessage,
} from './messages'
import {
  NODE_POSITIONS,
  cardSide,
  pickRandomColor,
  pickRandomSize,
  type NodeColor,
  type NodePosition,
} from './nodeConfig'

interface ActiveStep {
  id: number
  position: NodePosition
  color: NodeColor
  message: LoadingMessage
  size: number
}

interface ConstellationLoaderProps {
  onComplete?: () => void
}

function sleep(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(resolve, ms)
    signal.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timer)
        reject(new DOMException('Aborted', 'AbortError'))
      },
      { once: true },
    )
  })
}

export default function ConstellationLoader({ onComplete }: ConstellationLoaderProps) {
  const [activeStep, setActiveStep] = useState<ActiveStep | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function runSequence() {
      try {
        await sleep(SEQUENCE_START_DELAY_MS, controller.signal)

        for (let i = 0; i < LOADING_MESSAGES.length; i++) {
          if (controller.signal.aborted) return

          setActiveStep({
            id: i,
            position: NODE_POSITIONS[i],
            color: pickRandomColor(),
            message: LOADING_MESSAGES[i],
            size: pickRandomSize(),
          })

          await sleep(randomStepDuration(), controller.signal)

          setActiveStep(null)

          await sleep(STEP_FADE_OUT_MS + STEP_INTERVAL_GAP_MS, controller.signal)
        }

        onComplete?.()
      } catch {
        /* sequence aborted */
      }
    }

    void runSequence()

    return () => controller.abort()
  }, [onComplete])

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      aria-label="Loading constellation"
    >
      <AnimatePresence mode="wait">
        {activeStep && (
          <motion.div
            key={activeStep.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: activeStep.position.left,
              top: activeStep.position.top,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.94, filter: 'blur(4px)' }}
            transition={{
              duration: STEP_FADE_OUT_MS / 1000,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <CelestialNode color={activeStep.color} size={activeStep.size} />
            <LoadingMessageCard
              message={activeStep.message}
              side={cardSide(activeStep.position.left)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
