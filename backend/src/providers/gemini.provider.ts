const GEMINI_MODEL = "gemini-3.6-flash";

export interface GenerateContentOptions {
  responseJsonSchema?: unknown;
}

interface GeminiClient {
  models: {
    generateContent: (params: {
      model: string;
      contents: string;
      config?: {
        responseMimeType?: string;
        responseJsonSchema?: unknown;
      };
    }) => Promise<{ text?: string }>;
  };
}

let client: GeminiClient | null = null;

async function getClient(): Promise<GeminiClient> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  if (!client) {
    const { GoogleGenAI } = await import("@google/genai");
    client = new GoogleGenAI({ apiKey }) as GeminiClient;
  }

  return client;
}

export async function generateContent(
  prompt: string,
  options?: GenerateContentOptions,
): Promise<string> {
  const ai = await getClient();

  const config = options?.responseJsonSchema
    ? {
        responseMimeType: "application/json",
        responseJsonSchema: options.responseJsonSchema,
      }
    : undefined;

  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: prompt,
    config,
  });

  const text = response.text;

  if (!text) {
    throw new Error("Gemini returned an empty response");
  }

  return text;
}
