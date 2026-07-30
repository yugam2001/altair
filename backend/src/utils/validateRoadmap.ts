import Ajv2020 from "ajv/dist/2020";
import addFormats from "ajv-formats";
import type { ErrorObject, ValidateFunction } from "ajv";
import roadmapSchema from "../schemas/roadmap.schema.json";

const ajv = new Ajv2020({
  allErrors: true,
  strict: false,
});

addFormats(ajv);

const validateRoadmapSchema: ValidateFunction = ajv.compile(roadmapSchema);

export type RoadmapData = Record<string, unknown>;

export interface RoadmapValidationSuccess {
  valid: true;
  roadmap: RoadmapData;
}

export interface RoadmapValidationFailure {
  valid: false;
  errors: ErrorObject[];
}

export type RoadmapValidationResult =
  | RoadmapValidationSuccess
  | RoadmapValidationFailure;

export function validateRoadmap(data: unknown): RoadmapValidationResult {
  const isValid = validateRoadmapSchema(data);

  if (!isValid) {
    return {
      valid: false,
      errors: validateRoadmapSchema.errors ?? [],
    };
  }

  return {
    valid: true,
    roadmap: data as RoadmapData,
  };
}
