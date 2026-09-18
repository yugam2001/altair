# ALTAIR Frontend

The frontend experience for **ALTAIR — Find your way forward**, an AI-powered product that turns learner context into structured, personalised education and career roadmaps.

The client is built with **React, TypeScript, Vite and Tailwind CSS**. It owns the guided questionnaire, roadmap-generation transition, personalised roadmap experience, refinement flow and roadmap export UI.

## Product Flow

```text
Landing
   ↓
Guided Questionnaire
   ↓
Roadmap Generation
   ↓
Personalised Roadmap
   ↓
Explore · Refine · Export
```

ALTAIR is intentionally designed as a product experience rather than a chat interface. The frontend collects structured context first and then renders the backend's validated roadmap as navigable sections.

## Tech Stack

| Area | Technology |
| --- | --- |
| UI | React 19 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Motion | Framer Motion |
| Icons | Lucide React |
| Export | jsPDF + docx |
| Deployment | Vercel |

## Routes

| Route | Experience |
| --- | --- |
| `/` | ALTAIR landing experience |
| `/questionnaire` | Guided learner questionnaire |
| `/launch` | Roadmap-generation transition |
| `/roadmap` | Personalised roadmap experience |

## Repository Structure

```text
client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── loading/          # Generation experience
│   │   ├── questionnaire/    # Multi-step questionnaire UI
│   │   └── roadmap/          # Roadmap presentation and interactions
│   ├── pages/                # Route-level screens
│   ├── services/             # Backend API communication
│   ├── types/                # TypeScript application contracts
│   ├── App.tsx               # Routes
│   └── main.tsx              # Client entry point
├── .env.example
├── package.json
└── vite.config.ts
```

## API Integration

The client communicates with the ALTAIR backend through `src/services/roadmapApi.ts`.

The API base URL is configured through:

```env
VITE_API_BASE_URL=http://localhost:5001/api/v1
```

Create a local environment file from the example:

```bash
cp .env.example .env
```

The local `.env` is ignored by Git and should not be committed.

## Running Locally

```bash
npm install
npm run dev
```

Create a production build with:

```bash
npm run build
```

Preview the production build locally with:

```bash
npm run preview
```

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create the production build |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production build |

## UI Architecture

The frontend separates the three most important product experiences into dedicated component groups:

- **Questionnaire** — collects learner context through a guided multi-step flow.
- **Loading experience** — communicates roadmap generation through a branded transition rather than a generic spinner.
- **Roadmap** — renders the generated roadmap with dedicated hero, sections, progress, refinement, guidance, error state and export interactions.

This keeps route-level pages relatively focused while allowing each experience to evolve independently.

## Roadmap Experience

The roadmap UI is designed to turn structured AI output into something users can actually navigate. It includes dedicated presentation for roadmap sections, progress through the experience, refinement controls and downloadable output.

The client does not call Gemini directly. AI credentials and model communication remain on the backend; the browser only communicates with the ALTAIR API.

## Related Documentation

See the repository-level [README](../README.md) for the complete product story, screenshots, backend architecture, Responsible AI principles and local setup.

---

**ALTAIR — Find your way forward.**
