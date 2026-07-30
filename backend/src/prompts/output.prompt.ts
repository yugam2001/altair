/**
 * Strict output instructions for roadmap generation.
 * Aligned with backend/src/schemas/roadmap.schema.json (schema version 1.0.0).
 */

import roadmapSchema from '../schemas/roadmap.schema.json'

const SCHEMA_VERSION = roadmapSchema.properties.schemaVersion.const
const REQUIRED_ROOT_FIELDS = roadmapSchema.required as readonly string[]

const METADATA_REQUIRED = (
  roadmapSchema.$defs.metadata as { required: readonly string[] }
).required

const OVERVIEW_REQUIRED = (
  roadmapSchema.$defs.overview as { required: readonly string[] }
).required

function formatFieldList(fields: readonly string[]): string {
  return fields.map((field) => `\`${field}\``).join(', ')
}

/**
 * Builds output instructions derived from the roadmap JSON Schema.
 */
export function buildOutputInstructions(): string {
  return `# Output Instructions

Your response MUST conform to the ALTAIR Roadmap JSON Schema (version ${SCHEMA_VERSION}).

## Format rules

- Return **valid JSON only** — a single JSON object, no surrounding text
- Do **not** return Markdown, HTML, or plain prose outside the JSON structure
- Do **not** wrap the response in code fences or any other delimiter
- Do **not** invent properties not defined in the schema
- Do **not** include \`additionalProperties\` at the root level or within defined objects
- Populate **every required field** with meaningful, non-empty values

## Required root properties

${formatFieldList(REQUIRED_ROOT_FIELDS)}

## Required metadata properties

The \`metadata\` object MUST include: ${formatFieldList(METADATA_REQUIRED)}.

- Set \`schemaVersion\` to \`"${SCHEMA_VERSION}"\`
- Generate a new UUID for \`roadmapId\`
- Copy questionnaire values into the corresponding \`metadata\` fields where applicable
- Set \`generatedAt\` and \`lastUpdated\` to the current UTC ISO 8601 timestamp
- Set \`version\` to \`1\` for initial generation

## Required overview properties

The \`overview\` object MUST include: ${formatFieldList(OVERVIEW_REQUIRED)}.

## Content rules

- \`learningPhases\`, \`projects\`, and \`resources\` MUST each contain at least one item
- \`timeline.milestones\` MUST contain at least one milestone with valid \`startMonth\` and \`endMonth\`
- Resource \`title\` values MUST be names only — no URLs (URLs are reserved for a future schema version)
- \`responsibleAI\` MUST clearly state that the roadmap is guidance, not guaranteed advice
- \`confidence.score\` reflects personalisation quality based on supplied user input — not model correctness
- \`confidence.reason\` MUST explain why the score was assigned
- Use enum values exactly as defined in the schema (e.g. difficulty levels, resource types, education levels)

## Validation

Before responding, verify that the JSON parses successfully and satisfies all required fields and array minimums defined in \`roadmap.schema.json\`.

## Critical response constraints

- Return **ONLY** a single raw JSON object
- Do **NOT** include Markdown formatting of any kind
- Do **NOT** include explanations, commentary, or notes outside the JSON
- Do **NOT** wrap the response in code fences (no \`\`\`json blocks)
- Do **NOT** include introductory text such as "Here is your roadmap"
- Do **NOT** include trailing notes after the closing brace
- The first character of your response MUST be \`{\`
- The last character of your response MUST be \`}\`
- The response must strictly conform to \`roadmap.schema.json\` with no extra properties`
}

/** Pre-built output instructions for direct import. */
export const OUTPUT_INSTRUCTIONS = buildOutputInstructions()
