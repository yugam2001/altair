import TextInput from './TextInput'
import OptionGroup from './OptionGroup'
import QuestionSection from './QuestionSection'
import { TIMELINE_SELECT_OPTIONS } from '../../types/questionnaire'
import type { QuestionnaireState, ValidationErrors } from '../../types/questionnaire'

interface StepThreeProps {
  data: QuestionnaireState
  errors: ValidationErrors
  onChange: (field: keyof QuestionnaireState, value: string) => void
}

export default function StepThree({ data, errors, onChange }: StepThreeProps) {
  return (
    <div className="flex flex-col gap-10">
      <QuestionSection grouped>
        <OptionGroup
          label="When would you like to achieve this goal?"
          name="timeline"
          options={TIMELINE_SELECT_OPTIONS}
          value={data.timeline}
          onChange={(v) => onChange('timeline', v)}
          error={errors.timeline}
          columns={3}
        />
      </QuestionSection>

      <QuestionSection>
        <TextInput
          id="additionalInfo"
          label="Anything else you'd like us to know?"
          value={data.additionalInfo}
          onChange={(v) => onChange('additionalInfo', v)}
          placeholder={`"I'm preparing for JEE."\n"I work full-time."\n"I have a limited budget."`}
          multiline
          optional
        />
      </QuestionSection>
    </div>
  )
}
