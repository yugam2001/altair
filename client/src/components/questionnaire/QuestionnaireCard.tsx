import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import BackgroundConstellation from './BackgroundConstellation'
import ProgressHeader from './ProgressHeader'
import NavigationButtons from './NavigationButtons'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import {
  INITIAL_QUESTIONNAIRE_STATE,
  STEP_META,
} from '../../types/questionnaire'
import type {
  QuestionnaireState,
  ValidationErrors,
  QuestionnaireField,
} from '../../types/questionnaire'

const TOTAL_STEPS = 3

const CARD_CLASS =
  'relative z-10 w-full max-w-[840px] rounded-[30px] border border-white/60 bg-white/95 px-7 py-9 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_40px_-12px_rgba(15,23,42,0.1),0_24px_64px_-16px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:px-11 sm:py-12'

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
  }),
}

const STEP_FIELDS: Record<number, QuestionnaireField[]> = {
  1: ['careerGoal', 'country', 'educationLevel'],
  2: ['knowledgeLevel', 'studyHours', 'learningStyle'],
  3: ['timeline'],
}

const FIELD_MESSAGES: Record<QuestionnaireField, string> = {
  careerGoal: 'Please enter your career goal.',
  country: 'Please enter your country.',
  educationLevel: 'Please select your education level.',
  knowledgeLevel: 'Please select your current knowledge level.',
  studyHours: 'Please select your weekly study hours.',
  learningStyle: 'Please select your preferred learning style.',
  timeline: 'Please select your target timeline.',
  additionalInfo: '',
}

function validateStep(
  step: number,
  data: QuestionnaireState,
): ValidationErrors {
  const fields = STEP_FIELDS[step] ?? []
  const errors: ValidationErrors = {}

  for (const field of fields) {
    if (!data[field]?.trim()) {
      errors[field] = FIELD_MESSAGES[field]
    }
  }

  return errors
}

export default function QuestionnaireCard() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [data, setData] = useState<QuestionnaireState>(INITIAL_QUESTIONNAIRE_STATE)
  const [errors, setErrors] = useState<ValidationErrors>({})

  const meta = STEP_META[step - 1]

  const handleChange = useCallback((field: QuestionnaireField, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }, [])

  const goToStep = useCallback(
    (nextStep: number, nextDirection: number) => {
      setDirection(nextDirection)
      setStep(nextStep)
      setErrors({})
    },
    [],
  )

  const handleNext = useCallback(() => {
    const stepErrors = validateStep(step, data)
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      return
    }

    if (step < TOTAL_STEPS) {
      goToStep(step + 1, 1)
    } else {
      navigate('/launch', { state: { questionnaire: data } })
    }
  }, [step, data, goToStep, navigate])

  const handlePrevious = useCallback(() => {
    if (step > 1) {
      goToStep(step - 1, -1)
    }
  }, [step, goToStep])

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepOne data={data} errors={errors} onChange={handleChange} />
      case 2:
        return <StepTwo data={data} errors={errors} onChange={handleChange} />
      case 3:
        return <StepThree data={data} errors={errors} onChange={handleChange} />
      default:
        return null
    }
  }

  return (
    <div className="relative flex min-h-svh w-full items-center justify-center px-4 py-10 sm:px-6">
      <BackgroundConstellation step={step} />

      <div className="relative w-full max-w-[840px]">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className={CARD_CLASS}
        >
          <ProgressHeader
            step={step}
            totalSteps={TOTAL_STEPS}
            emoji={meta.emoji}
            label={meta.label}
            subtitle={meta.subtitle}
          />

          <div className="relative -mx-2 overflow-visible px-2 py-1">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          <NavigationButtons
            step={step}
            totalSteps={TOTAL_STEPS}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </motion.div>
      </div>
    </div>
  )
}