import { randomUUID } from "node:crypto";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isValidUuid(value: unknown): value is string {
  return typeof value === "string" && UUID_REGEX.test(value);
}

function sanitizeOptionalId(record: Record<string, unknown>): void {
  if ("id" in record && !isValidUuid(record.id)) {
    delete record.id;
  }
}

function sanitizeOptionalIds(items: unknown): void {
  if (!Array.isArray(items)) {
    return;
  }

  for (const item of items) {
    if (item && typeof item === "object" && !Array.isArray(item)) {
      sanitizeOptionalId(item as Record<string, unknown>);
    }
  }
}

/**
 * Normalizes common AI response quirks before schema validation.
 */
export function normalizeRoadmapResponse(data: unknown): unknown {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return data;
  }

  const roadmap = data as Record<string, unknown>;

  if (roadmap.metadata && typeof roadmap.metadata === "object") {
    const metadata = roadmap.metadata as Record<string, unknown>;

    if (typeof metadata.studyHoursPerWeek === "number") {
      metadata.studyHoursPerWeek = String(metadata.studyHoursPerWeek);
    }

    if (!isValidUuid(metadata.roadmapId)) {
      metadata.roadmapId = randomUUID();
    }
  }

  if (roadmap.confidence && typeof roadmap.confidence === "object") {
    const confidence = roadmap.confidence as Record<string, unknown>;

    if (typeof confidence.score === "number") {
      confidence.score = Math.round(confidence.score);
    }
  }

  sanitizeOptionalIds(roadmap.learningPhases);
  sanitizeOptionalIds(roadmap.projects);
  sanitizeOptionalIds(roadmap.resources);

  if (roadmap.timeline && typeof roadmap.timeline === "object") {
    const timeline = roadmap.timeline as Record<string, unknown>;
    sanitizeOptionalIds(timeline.milestones);
  }

  return roadmap;
}
