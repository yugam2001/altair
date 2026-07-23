import { forwardRef, type Ref } from 'react'
import { motion } from 'framer-motion'

interface TextInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  multiline?: boolean
  optional?: boolean
}

const shakeVariants = {
  shake: {
    x: [0, -6, 6, -4, 4, -2, 2, 0],
    transition: { duration: 0.45, ease: 'easeInOut' as const },
  },
}

const TextInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, TextInputProps>(
  function TextInput(
    {
      id,
      label,
      value,
      onChange,
      placeholder,
      error,
      multiline = false,
      optional = false,
    },
    ref,
  ) {
    const hasError = Boolean(error)

    const sharedClasses = `
      w-full rounded-2xl border bg-white/80 px-6 py-[18px] text-[15px] leading-relaxed text-primary-text
      placeholder:text-secondary-text/40 placeholder:font-normal
      transition-all duration-300 ease-out
      focus:outline-none
      ${
        hasError
          ? 'border-red-400 shadow-[0_0_0_3px_rgba(248,113,113,0.12)]'
          : 'border-deep-space/[0.08] shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:border-deep-space/[0.12] focus:border-nebula-teal/60 focus:bg-white focus:shadow-[0_0_0_4px_rgba(20,184,166,0.1),0_2px_8px_rgba(20,184,166,0.08)]'
      }
    `

    return (
      <motion.div
        className="flex flex-col gap-2.5"
        animate={hasError ? 'shake' : undefined}
        variants={shakeVariants}
      >
        <label
          htmlFor={id}
          className="text-[15px] font-medium leading-snug text-primary-text"
        >
          {label}
          {optional && (
            <span className="ml-2 text-sm font-normal text-secondary-text/70">
              optional
            </span>
          )}
        </label>

        {multiline ? (
          <textarea
            ref={ref as Ref<HTMLTextAreaElement>}
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={4}
            className={`${sharedClasses} resize-none`}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${id}-error` : undefined}
          />
        ) : (
          <input
            ref={ref as Ref<HTMLInputElement>}
            id={id}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={sharedClasses}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${id}-error` : undefined}
          />
        )}

        {hasError && (
          <p
            id={`${id}-error`}
            className="text-sm text-red-500"
            role="alert"
          >
            {error}
          </p>
        )}
      </motion.div>
    )
  },
)

export default TextInput
