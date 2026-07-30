/**
 * Extracts and parses JSON from a raw AI text response.
 * Handles common formatting issues such as markdown code fences and surrounding prose.
 */
export function parseAiJson(text: string): unknown {
  let cleaned = text.trim();

  const fencedMatch = cleaned.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  if (fencedMatch) {
    cleaned = fencedMatch[1].trim();
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();
  }

  const jsonStart = cleaned.indexOf("{");
  const jsonEnd = cleaned.lastIndexOf("}");

  if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
    throw new SyntaxError("No JSON object found in AI response");
  }

  cleaned = cleaned.slice(jsonStart, jsonEnd + 1);

  return JSON.parse(cleaned);
}
