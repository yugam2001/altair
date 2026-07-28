import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const shakeVariants = {
  shake: {
    x: [0, -6, 6, -4, 4, -2, 2, 0],
    transition: { duration: 0.45, ease: 'easeInOut' as const },
  },
}

const EMPTY_FIELD_ERROR = 'Please describe your refinement before sending.'

interface RoadmapRefineSectionProps {
  isRefining: boolean
  onRefine: () => void
}

export default function RoadmapRefineSection({
  isRefining,
  onRefine,
}: RoadmapRefineSectionProps) {
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const hasError = Boolean(error)

  function handleChange(nextValue: string) {
    setValue(nextValue)
    if (error && nextValue.trim()) {
      setError(null)
    }
  }

  function handleSend() {
    if (!value.trim()) {
      setError(EMPTY_FIELD_ERROR)
      return
    }

    setError(null)
  }

  return (
    <ScrollReveal className="mx-auto w-[90%] max-w-[1400px] py-16 sm:py-20 md:py-24">
      <section id="continue-planning">
        <div className="rounded-[1.75rem] border border-blue-400/18 bg-[#0a1224]/70 p-6 shadow-[0_20px_56px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl sm:rounded-[2rem] sm:p-8 md:p-10">
          <AnimatePresence mode="wait" initial={false}>
            {!isRefining ? (
              <motion.div
                key="ready"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="py-6 text-center sm:py-8"
              >
                <p className="mx-auto max-w-lg text-sm leading-relaxed text-blue-100/65 sm:text-[15px] sm:leading-7">
                  Your roadmap is ready to guide you forward.
                </p>
                <button
                  type="button"
                  onClick={onRefine}
                  className="mt-8 inline-flex items-center justify-center rounded-xl border border-blue-400/25 bg-blue-600/25 px-6 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-600/35"
                >
                  Refine Roadmap
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="refine"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Refine Roadmap
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-blue-100/65 sm:text-[15px] sm:leading-7">
                  Request a course correction from ALTAIR — refine your route while
                  keeping the overall journey aligned with your destination.
                </p>

                <div className="relative mt-8">
                  <label htmlFor="roadmap-refinement" className="sr-only">
                    Refine your roadmap
                  </label>

                  <motion.div animate={hasError ? 'shake' : undefined} variants={shakeVariants}>
                    <textarea
                      id="roadmap-refinement"
                      rows={5}
                      value={value}
                      onChange={(event) => handleChange(event.target.value)}
                      placeholder="Describe a course adjustment — e.g. shift timeline, focus area, or pace…"
                      aria-invalid={hasError}
                      aria-describedby={hasError ? 'roadmap-refinement-error' : undefined}
                      className={`w-full resize-none rounded-2xl border bg-[#040816]/80 px-4 py-4 text-sm leading-relaxed text-white placeholder:text-blue-200/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm transition-colors duration-200 focus:border-blue-400/30 focus:outline-none sm:px-5 sm:py-5 sm:text-[15px] ${
                        hasError
                          ? 'border-red-400/70 shadow-[0_0_0_3px_rgba(248,113,113,0.15)] focus:border-red-400/70'
                          : 'border-blue-400/15'
                      }`}
                    />
                  </motion.div>

                  {hasError && (
                    <p
                      id="roadmap-refinement-error"
                      className="mt-2 text-sm text-red-400"
                      role="alert"
                    >
                      {error}
                    </p>
                  )}

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      aria-label="Send refinement request"
                      onClick={handleSend}
                      className="inline-flex items-center gap-2 rounded-xl border border-blue-400/25 bg-blue-600/25 px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-600/35"
                    >
                      Send
                      <ArrowUp className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </ScrollReveal>
  )
}
