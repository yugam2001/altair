# ALTAIR Backend

The backend service for **ALTAIR — Find your way forward**, an AI-powered product that transforms learner context into structured, personalised education and career roadmaps.

Built with **Node.js, Express and TypeScript**, the service enriches questionnaire responses with domain knowledge, constructs a constrained AI prompt, calls **Google Gemini**, normalises the structured response and validates the final roadmap against a JSON Schema before returning it to the client.

## Architecture

```text
Questionnaire
     ↓
Express Route
     ↓
Roadmap Controller
     ↓
Learner Context
     ↓
Journey Mapping + Domain Knowledge
     ↓
Prompt Builder
     ↓
Google Gemini
     ↓
Structured JSON
     ↓
Response Normalisation
     ↓
AJV Schema Validation
     ↓
Roadmap Response
```

The AI provider is deliberately isolated from the rest of the application. Domain knowledge, prompt construction, provider communication, parsing, normalisation and validation are separate layers so the generation pipeline remains understandable and maintainable.

## Engineering Decisions

- **Domain-aware generation** — learner responses are enriched using career domains, career pathways, education stages, country rules and journey mapping before the prompt is built.
- **Structured AI output** — Gemini is supplied with a response JSON schema instead of being used as an unconstrained text generator.
- **Validation before trust** — AI output is parsed, normalised and validated with AJV before it is returned as a successful roadmap.
- **Provider isolation** — Gemini communication lives in `src/providers/gemini.provider.ts`, keeping model-specific logic out of controllers and business logic.
- **Thin controllers** — HTTP handling remains small while the roadmap service owns orchestration.
- **Responsible AI prompting** — prompt principles are kept explicitly in the prompt layer rather than scattered through request handlers.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Runtime | Node.js |
| API | Express |
| Language | TypeScript |
| AI | Google Gemini via `@google/genai` |
| Validation | AJV + JSON Schema |
| Configuration | dotenv |
| Deployment | Render |

## Repository Structure

```text
backend/
├── src/
│   ├── controllers/     # HTTP request handlers
│   ├── domain/          # Career and education domain knowledge
│   ├── middleware/      # Global Express middleware
│   ├── prompts/         # Prompt principles, templates and builder
│   ├── providers/       # Gemini provider boundary
│   ├── routes/          # API routes
│   ├── schemas/         # Roadmap JSON Schema
│   ├── services/        # Roadmap generation orchestration
│   ├── utils/           # Parsing, normalisation and validation
│   ├── app.ts           # Express application
│   └── server.ts        # Server entry point
├── .env.example
├── package.json
└── tsconfig.json
```

## API

All endpoints are versioned under `/api/v1`.

### Health

```http
GET /api/v1/health
```

Used to verify that the service is running.

### Generate Roadmap

```http
POST /api/v1/roadmap
Content-Type: application/json
```

The endpoint accepts the questionnaire payload collected by the ALTAIR client. The service converts it into learner context, creates a journey map, builds the Gemini prompt and returns a validated roadmap.

Successful responses use this shape:

```json
{
  "success": true,
  "roadmap": {}
}
```

Generation, parsing or validation failures are not treated as valid roadmap data. Unexpected errors are passed to the global Express error handler.

## Environment Variables

Create a local `.env` from the committed example:

```bash
cp .env.example .env
```

Then configure:

```env
PORT=5001
GEMINI_API_KEY=your_key_here
```

Never commit the real `.env` file or API keys.

## Running Locally

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
npm start
```

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run the TypeScript server in watch mode |
| `npm run build` | Compile TypeScript |
| `npm start` | Run the compiled server |

## Roadmap Validation

Gemini output is not returned directly to the frontend. The generation pipeline:

1. requests structured JSON from Gemini,
2. parses the model response,
3. normalises the result,
4. validates it against `src/schemas/roadmap.schema.json`, and
5. returns the roadmap only when validation succeeds.

This boundary is important because model output is treated as untrusted application input until it satisfies the product's expected contract.

## Reliability

The current MVP surfaces provider failures through the backend error path. Retry/backoff, rate limiting, caching, structured observability and broader automated testing are natural reliability improvements as the project evolves; they are intentionally not presented here as already implemented.

## Related Documentation

The repository-level [README](../README.md) provides the full product overview, screenshots, local setup and Responsible AI context. Additional product and engineering documentation lives in the repository's `docs/` directory.

---

**ALTAIR — Software Engineering × Artificial Intelligence.**
