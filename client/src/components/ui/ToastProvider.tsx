import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface ToastContextValue {
  showToast: (message: string) => void
  showErrorToast: (message?: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const DEFAULT_ERROR_MESSAGE = 'Unable to complete this action. Please try again.'
const TOAST_DURATION_MS = 3200

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)

  const showToast = useCallback((nextMessage: string) => {
    setMessage(nextMessage)
    window.setTimeout(() => {
      setMessage((current) => (current === nextMessage ? null : current))
    }, TOAST_DURATION_MS)
  }, [])

  const showErrorToast = useCallback(
    (nextMessage = DEFAULT_ERROR_MESSAGE) => {
      showToast(nextMessage)
    },
    [showToast],
  )

  const value = useMemo(
    () => ({
      showToast,
      showErrorToast,
    }),
    [showToast, showErrorToast],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {message && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="pointer-events-none fixed bottom-6 left-1/2 z-[100] w-[min(92vw,380px)] -translate-x-1/2 rounded-xl border border-blue-400/18 bg-[#0a1224]/90 px-4 py-3 text-center text-sm text-blue-100/90 shadow-[0_16px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }

  return context
}
