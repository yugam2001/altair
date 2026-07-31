import {
  generateJourneyMap,
  type LearnerContext,
} from "../domain/journeyMapping";
import { buildRoadmapPrompt } from "../prompts/promptBuilder";
import type { QuestionnaireResponses } from "../prompts/user.prompt";
import { generateContent } from "../providers/gemini.provider";
import { parseAiJson } from "../utils/parseAiJson";
import { normalizeRoadmapResponse } from "../utils/normalizeRoadmapResponse";
import { prepareRoadmapSchemaForGemini } from "../utils/prepareGeminiSchema";
import {
  validateRoadmap,
  type RoadmapData,
} from "../utils/validateRoadmap";

export type RoadmapSuccessResponse = {
  success: true;
  roadmap: RoadmapData;
};

export type RoadmapFailureResponse = {
  success: false;
  message: string;
};

export type RoadmapResponse = RoadmapSuccessResponse | RoadmapFailureResponse;

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
 *   Receive questionnaire
 *           ↓
 *   Journey Mapping
 *           ↓
 *   Prompt Builder
 *           ↓
 *   Gemini Provider
 *           ↓
 *   Structured JSON
 *           ↓
 *   Schema Validation
 *           ↓
 *   Return Roadmap
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
    aiResponse = await generateContent(prompt, {
      responseJsonSchema: prepareRoadmapSchemaForGemini(),
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }

  console.log("Gemini response received. Parsing JSON...");

  let parsedResponse: unknown;

  try {
    parsedResponse = parseAiJson(aiResponse);
  } catch (error) {
    console.error("Failed to parse AI response as JSON:", error);
    console.error("Raw AI response:", aiResponse);
    return {
      success: false,
      message: "Invalid AI response.",
    };
  }

  console.log("JSON parsed. Validating against roadmap schema...");

  const normalizedResponse = normalizeRoadmapResponse(parsedResponse);
  const validation = validateRoadmap(normalizedResponse);

  if (!validation.valid) {
    console.error("Roadmap validation failed:", validation.errors);
    return {
      success: false,
      message: "Roadmap validation failed.",
    };
  }

  console.log("Roadmap validated successfully.");

  return {
    success: true,
    roadmap: validation.roadmap,
  };
}
