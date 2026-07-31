import roadmapSchema from "../schemas/roadmap.schema.json";

type JsonSchema = Record<string, unknown>;

/**
 * Prepares the roadmap JSON Schema for Gemini structured output.
 * Strips validation-only metadata and converts unsupported keywords.
 */
export function prepareRoadmapSchemaForGemini(): JsonSchema {
  const { examples, $schema, title, description, ...schema } =
    roadmapSchema as JsonSchema & {
      examples?: unknown;
      $schema?: unknown;
      title?: unknown;
      description?: unknown;
    };

  return transformSchemaNode(schema) as JsonSchema;
}

function transformSchemaNode(node: unknown): unknown {
  if (node === null || typeof node !== "object") {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map(transformSchemaNode);
  }

  const obj = { ...(node as JsonSchema) };

  if ("const" in obj) {
    obj.enum = [obj.const];
    delete obj.const;
  }

  if ("default" in obj) {
    delete obj.default;
  }

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object" && value !== null) {
      obj[key] = transformSchemaNode(value);
    }
  }

  return obj;
}
