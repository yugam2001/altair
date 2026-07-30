import {
  generateJourneyMap,
  type JourneyMap,
  type LearnerContext,
} from "../domain/journeyMapping";
import { buildRoadmapPrompt } from "../prompts/promptBuilder";
import type { QuestionnaireResponses } from "../prompts/user.prompt";
import { generateContent } from "../providers/gemini.provider";

export interface RoadmapResponse {
  success: boolean;
  journeyMap: JourneyMap;
  aiResponse: string;
}

function toLearnerContext(questionnaire: Record<string, unknown>): LearnerContext {
  return {
    careerGoal: String(questionnaire.careerGoal ?? ""),
    country: String(questionnaire.country ?? ""),
    educationLevel: String(questionnaire.educationLevel ?? ""),
    currentKnowledge: String(questionnaire.knowledgeLevel ?? ""),
    studyHoursPerWeek: questionnaire.studyHours
      ? String(questionnaire.studyHours)
      : undefined,
    learningStyle: questionnaire.learningStyle
      ? String(questionnaire.learningStyle)
      : undefined,
    timeline: questionnaire.timeline ? String(questionnaire.timeline) : undefined,
    additionalInfo: questionnaire.additionalInfo
      ? String(questionnaire.additionalInfo)
      : undefined,
  };
}

function toQuestionnaireResponses(context: LearnerContext): QuestionnaireResponses {
  return {
    careerGoal: context.careerGoal,
    country: context.country,
    educationLevel: context.educationLevel,
    currentKnowledge: context.currentKnowledge,
    studyHoursPerWeek: context.studyHoursPerWeek,
    learningStyle: context.learningStyle,
    timeline: context.timeline,
    additionalInfo: context.additionalInfo,
  };
}

/**
 * Orchestrates the full roadmap generation pipeline.
 *
 * Current flow:
 *
 *   Receive questionnaire
 *           ↓
 *   Journey Mapping
 *           ↓
 *   Prompt Builder
 *           ↓
 *   Gemini Provider
 *           ↓
 *   Return AI Response (raw)
 *
 * Future:
 *           ↓
 *   Schema Validation
 *           ↓
 *   Return Final Roadmap
 */
export async function generateRoadmap(
  questionnaire: unknown,
): Promise<RoadmapResponse> {
  console.log("Roadmap generation started.");

  const context = toLearnerContext(
    (questionnaire ?? {}) as Record<string, unknown>,
  );

  console.log("Received questionnaire:", context);

  const journeyMap = generateJourneyMap(context);

  console.log("Journey map generated:", {
    currentStage: journeyMap.currentStage?.label ?? null,
    targetCareer: journeyMap.targetCareer?.careerName ?? null,
    careerDomain: journeyMap.careerDomain?.name ?? null,
    missingMilestones: journeyMap.missingMilestones.map(
      (milestone) => milestone.title,
    ),
  });

  const prompt = buildRoadmapPrompt({
    responses: toQuestionnaireResponses(context),
    journeyMap,
  });

  console.log("Prompt built. Sending to Gemini...");

  let aiResponse: string;

  try {
    aiResponse = await generateContent(prompt);
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }

  console.log("Gemini response received.");

  return {
    success: true,
    journeyMap,
    aiResponse,
  };
}
