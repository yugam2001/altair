import TextInput from './TextInput'
import OptionGroup from './OptionGroup'
import QuestionSection from './QuestionSection'
import { EDUCATION_SELECT_OPTIONS } from '../../types/questionnaire'
import type { QuestionnaireState, ValidationErrors } from '../../types/questionnaire'

interface StepOneProps {
  data: QuestionnaireState
  errors: ValidationErrors
  onChange: (field: keyof QuestionnaireState, value: string) => void
}

export default function StepOne({ data, errors, onChange }: StepOneProps) {
  return (
    <div className="flex flex-col gap-10">
      <QuestionSection grouped>
        <TextInput
          id="careerGoal"
          label="What career are you aiming for?"
          value={data.careerGoal}
          onChange={(v) => onChange('careerGoal', v)}
          placeholder="Software Engineer"
          error={errors.careerGoal}
        />

        <TextInput
          id="country"
          label="Where do you want to build your career?"
          value={data.country}
          onChange={(v) => onChange('country', v)}
          placeholder="India"
          error={errors.country}
        />
      </QuestionSection>

      <QuestionSection>
        <OptionGroup
          label="What's your current education level?"
          name="educationLevel"
          options={EDUCATION_SELECT_OPTIONS}
          value={data.educationLevel}
          onChange={(v) => onChange('educationLevel', v)}
          error={errors.educationLevel}
        />
      </QuestionSection>
    </div>
  )
}
