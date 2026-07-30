# ALTAIR Backend

Express + TypeScript API for the ALTAIR learning roadmap application.

This backend is currently in **Phase 1** — infrastructure only. It provides a running server, versioned API routes, and frontend communication. AI integration, schema validation, and roadmap generation are not implemented yet.

---

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (comes with Node.js)

---

## Getting Started

### 1. Install dependencies

From the `backend` directory:

```bash
npm install
```

### 2. Set up environment variables

Copy the example env file and adjust if needed:

```bash
cp .env.example .env
```

### 3. Start the server

**Development** (hot reload with `tsx`):

```bash
npm run dev
```

**Production build:**

```bash
npm run build
npm start
```

When the server starts successfully, you should see:

```text
ALTAIR backend running on http://localhost:5000
```

---

## Environment Variables

| Variable | Default | Description        |
| -------- | ------- | ------------------ |
| `PORT`   | `5000`  | Port the server listens on |

Example `.env`:

```env
PORT=5000
```

If port 5000 is already in use, change `PORT` in your `.env` file.

---

## Available Scripts

| Command         | Description                                      |
| --------------- | ------------------------------------------------ |
| `npm run dev`   | Start development server with hot reload         |
| `npm run build` | Compile TypeScript to JavaScript in `dist/`      |
| `npm start`     | Run the compiled production server (`dist/`)     |

---

## Project Structure

```text
backend/
├── src/
│   ├── app.ts                 # Express app setup (middleware, routes)
│   ├── server.ts              # Server startup and PORT binding
│   ├── config/                # Configuration (future use)
│   ├── controllers/           # Request handlers
│   ├── middleware/            # Express middleware
│   ├── routes/                # Route definitions
│   ├── services/              # Business logic (future use)
│   ├── utils/                 # Shared utilities (future use)
│   ├── types/                 # Shared TypeScript types (future use)
│   ├── domain/                # Career/education domain knowledge
│   ├── prompts/               # AI prompt templates
│   └── schemas/               # JSON schemas for roadmap output
├── .env.example               # Environment variable template
├── package.json
└── tsconfig.json
```

### Architecture

- **`app.ts`** — Creates the Express app, enables CORS and JSON parsing, registers routes, and attaches the global error handler. Exported separately so it can be tested without starting the server.
- **`server.ts`** — Loads environment variables and starts listening on `PORT`.
- **Routes** — Define HTTP paths only; logic lives in controllers.
- **Controllers** — Handle incoming requests and send responses.
- **Middleware** — Cross-cutting concerns such as error handling.

---

## API

All endpoints are prefixed with `/api/v1`.

Base URL (local): `http://localhost:5000`

### Health Check

Verify the server is running.

```http
GET /api/v1/health
```

**Response** `200 OK`

```json
{
  "status": "OK"
}
```

**Example:**

```bash
curl http://localhost:5000/api/v1/health
```

---

### Submit Questionnaire

Accept a questionnaire payload from the frontend. Currently logs the body to the console and returns a success message. No AI or roadmap generation yet.

```http
POST /api/v1/roadmap
Content-Type: application/json
```

**Request body:** any JSON object.

**Response** `200 OK`

```json
{
  "success": true,
  "message": "Questionnaire received successfully."
}
```

**Example:**

```bash
curl -X POST http://localhost:5000/api/v1/roadmap \
  -H "Content-Type: application/json" \
  -d '{
    "careerGoal": "Software Engineer",
    "currentLevel": "Beginner",
    "hoursPerWeek": 10
  }'
```

The received payload is logged in the server console:

```text
Received questionnaire: { careerGoal: 'Software Engineer', ... }
```

---

## Error Handling

Unexpected server errors are caught by the global error handler and return:

```http
HTTP/1.1 500 Internal Server Error
```

```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Language:** TypeScript
- **Dev tooling:** tsx (development), tsc (production build)

### Dependencies

| Package  | Purpose                          |
| -------- | -------------------------------- |
| `express`| HTTP server and routing          |
| `cors`   | Cross-origin requests from client|
| `dotenv` | Load environment variables       |

---

## What's Not Implemented Yet

The following are planned for later phases and are intentionally out of scope for Phase 1:

- OpenAI / Gemini / Claude integration
- Prompt builder usage
- Journey mapping and roadmap generation
- JSON schema validation
- MongoDB / database
- Authentication
- Rate limiting
- Structured logging libraries

The `domain/`, `prompts/`, and `schemas/` folders contain future-phase assets and are not wired into the server yet.

---

## Troubleshooting

### Port already in use

```text
Error: listen EADDRINUSE: address already in use :::5000
```

Either stop the process using port 5000, or set a different port in `.env`:

```env
PORT=5050
```

### Server not responding

1. Confirm the server is running (`npm run dev` or `npm start`).
2. Hit the health endpoint: `curl http://localhost:5000/api/v1/health`
3. Check that your `.env` file exists and `PORT` matches the URL you are calling.

---

## Connecting the Frontend

Point the React client at the backend base URL, for example:

```text
http://localhost:5000/api/v1
```

Ensure CORS is enabled (it is by default in `app.ts`) so browser requests from the Vite dev server are allowed.

---

## Phase 5 — Gemini AI Integration

The backend now integrates Google's Gemini API for roadmap generation.

### Request flow

```text
Questionnaire
        ↓
Express Route
        ↓
Controller
        ↓
Roadmap Service
        ↓
Journey Mapping
        ↓
Prompt Builder
        ↓
Gemini Provider
        ↓
Raw AI Response
        ↓
Return Response
```

### Environment variables

Add your Gemini API key to `.env`:

```env
GEMINI_API_KEY=your_api_key_here
```

### API response

`POST /api/v1/roadmap` now returns:

```json
{
  "success": true,
  "journeyMap": { ... },
  "aiResponse": "Raw response returned by Gemini"
}
```

### Gemini configuration

- **SDK:** `@google/genai` (official Google Gen AI SDK)
- **Model:** `gemini-2.5-flash`
- **Provider:** `src/providers/gemini.provider.ts` — the only file that communicates with Gemini

### Error handling

If the Gemini API call fails, the error is logged and passed to the global error handler, which returns HTTP 500:

```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

### Not yet implemented

- JSON parsing of AI response
- Response schema validation
- MongoDB
- Retry logic, streaming, caching, rate limiting
