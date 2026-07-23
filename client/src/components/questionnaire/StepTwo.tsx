import OptionGroup from './OptionGroup'
import QuestionSection from './QuestionSection'
import {
  KNOWLEDGE_SELECT_OPTIONS,
  STUDY_HOURS_SELECT_OPTIONS,
  LEARNING_STYLE_SELECT_OPTIONS,
} from '../../types/questionnaire'
import type { QuestionnaireState, ValidationErrors } from '../../types/questionnaire'

interface StepTwoProps {
  data: QuestionnaireState
  errors: ValidationErrors
  onChange: (field: keyof QuestionnaireState, value: string) => void
}

export default function StepTwo({ data, errors, onChange }: StepTwoProps) {
  return (
    <div className="flex flex-col gap-10">
      <QuestionSection grouped>
        <OptionGroup
          label="How would you describe your current experience?"
          name="knowledgeLevel"
          options={KNOWLEDGE_SELECT_OPTIONS}
          value={data.knowledgeLevel}
          onChange={(v) => onChange('knowledgeLevel', v)}
          error={errors.knowledgeLevel}
          columns={3}
        />
      </QuestionSection>

      <QuestionSection>
        <OptionGroup
          label="How much time can you dedicate each week?"
          name="studyHours"
          options={STUDY_HOURS_SELECT_OPTIONS}
          value={data.studyHours}
          onChange={(v) => onChange('studyHours', v)}
          error={errors.studyHours}
        />
      </QuestionSection>

      <QuestionSection>
        <OptionGroup
          label="How do you learn best?"
          name="learningStyle"
          options={LEARNING_STYLE_SELECT_OPTIONS}
          value={data.learningStyle}
          onChange={(v) => onChange('learningStyle', v)}
          error={errors.learningStyle}
          columns={3}
        />
      </QuestionSection>
    </div>
  )
}
