import OptionCard from './OptionCard'
import type { SelectOption } from '../../types/questionnaire'

interface OptionGroupProps {
  label: string
  name: string
  options: readonly SelectOption[]
  value: string
  onChange: (value: string) => void
  error?: string
  columns?: 2 | 3
}

export default function OptionGroup({
  label,
  name,
  options,
  value,
  onChange,
  error,
  columns = 2,
}: OptionGroupProps) {
  const hasError = Boolean(error)

  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="text-[15px] font-medium leading-snug text-primary-text">
        {label}
      </legend>

      <div
        role="radiogroup"
        aria-label={label}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
        className={`grid gap-3 p-1 ${
          columns === 3
            ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-2'
        }`}
      >
        {options.map((option) => (
          <OptionCard
            key={option.value}
            option={option}
            name={name}
            selected={value === option.value}
            onSelect={() => onChange(option.value)}
            hasError={hasError}
          />
        ))}
      </div>

      {hasError && (
        <p id={`${name}-error`} className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  )
}
