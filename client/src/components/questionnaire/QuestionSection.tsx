import type { ReactNode } from 'react'

interface QuestionSectionProps {
  children: ReactNode
  grouped?: boolean
}

export default function QuestionSection({
  children,
  grouped = false,
}: QuestionSectionProps) {
  return (
    <div
      className={
        grouped
          ? 'flex flex-col gap-6 rounded-2xl bg-deep-space/[0.02] p-6 sm:p-7'
          : 'flex flex-col gap-6'
      }
    >
      {children}
    </div>
  )
}
