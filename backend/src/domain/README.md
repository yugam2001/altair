# ALTAIR Domain Layer

The domain layer is ALTAIR's **domain model** for personalised educational and career journey mapping. It defines how ALTAIR understands where a learner is today and what logical steps remain before they reach any career — across technology, healthcare, finance, law, arts, trades, and every other field.

This layer is **not** AI knowledge and **not** prompt text. It is structured, provider-agnostic data and reasoning architecture that the prompt layer consumes downstream.

---

## Product Vision

ALTAIR is an AI-powered personalised educational and career roadmap generator for **any career domain** — not just software and technology.

Supported domains include (and extend beyond):

Technology · Healthcare · Business · Finance · Law · Education · Arts & Design · Science · Engineering · Architecture · Hospitality · Tourism · Government · Media & Communication · Sports · Defence · Research · Entrepreneurship · Skilled Trades · and many more.

The domain layer is intentionally **generic and scalable** so new careers and countries can be added without redesigning the system.

---

## How ALTAIR Works

Roadmap generation follows a logical sequence. The domain layer handles steps 1–5; step 6 belongs to the prompt and AI layers.

```
1. Understand the user's current educational stage
        ↓
2. Identify the target career
        ↓
3. Identify the relevant career domain
        ↓
4. Apply country-specific education rules
        ↓
5. Build a logical educational journey (missing milestones)
        ↓
6. Generate the personalised roadmap (prompt + AI layer)
```

A learner in Class 10 in India who wants to become a Registered Nurse should not receive "Learn anatomy" as the first step. They should see:

```
Complete Class 10
  ↓
Choose Science stream in Class 11–12
  ↓
Complete Class 12 board examinations
  ↓
Enrol in nursing diploma or B.Sc. Nursing programme
  ↓
Complete clinical placements
  ↓
Obtain nursing licence
  ↓
Registered Nurse
```

The same architecture applies whether the target career is a Software Engineer, Chartered Accountant, or Primary School Teacher.

---

## Module Overview

```
domain/
├── careerDomains.ts     # Broad career domains (Technology, Healthcare, …)
├── careerPathways.ts    # Career pathway model + example careers
├── educationStages.ts   # Country-specific generic education stages
├── countryRules.ts      # Country education system frameworks
├── journeyMapping.ts    # Reasoning architecture and function signatures
└── README.md            # This file
```

### Separation of concerns

| Module | Owns | Does NOT own |
|---|---|---|
| `careerDomains.ts` | Domain taxonomy | Individual careers |
| `careerPathways.ts` | Career pathway structure and registry | Country-specific rules |
| `educationStages.ts` | Generic education stages per country | Career requirements |
| `countryRules.ts` | How education progresses in a country | Career-specific pathways |
| `journeyMapping.ts` | Orchestration and journey map types | AI prompts or business logic (yet) |

---

## `careerDomains.ts`

Defines broad career domains only. Domains group careers for journey mapping and future filtering — they do not list every possible job title.

```typescript
getCareerDomain('healthcare')  // → { id: 'healthcare', name: 'Healthcare', ... }
listCareerDomainIds()          // → ['technology', 'healthcare', ...]
```

**Adding a domain:** append a new `CareerDomain` to `CAREER_DOMAINS`.

---

## `careerPathways.ts`

Defines the reusable `CareerPathway` interface and a small set of example careers across different domains:

| Career | Domain |
|---|---|
| Software Engineer | Technology |
| Registered Nurse | Healthcare |
| Chartered Accountant | Finance |
| Primary School Teacher | Education |

Each pathway includes:

- `typicalEducationStages` — required progression steps
- `optionalStages` — alternative or supplementary steps
- `recommendedCertifications` — licences and registrations
- `commonSkills` — transferable and domain-specific skills
- `notes` — free-form context for journey mapping

**Adding a career:** create a new `CareerPathway` object and append to `CAREER_PATHWAYS`. Do not change the interface.

---

## `educationStages.ts`

Country-aware, **career-agnostic** education stages mapped to ALTAIR questionnaire values.

| Country | Stages |
|---|---|
| India | Class 8–12, Diploma, Bachelor's, Master's, Working Professional, Career Changer |
| Australia | Year 10–12, TAFE, Bachelor's, Master's, Working Professional, Career Changer |

**Adding a country:** append a new `CountryEducationSystem` to `EDUCATION_SYSTEMS`.

---

## `countryRules.ts`

Describes how education generally progresses in a country — frameworks, not career paths.

Examples:

- **India:** Formal education system (Class 1–12 → stream selection → undergraduate → postgraduate); alternative vocational pathways
- **Australia:** Formal education (Year 10–12 → ATAR → university); VET/TAFE pathways

No career-specific logic lives here. Regulated profession requirements are noted generically; career pathways define field-specific qualifications.

**Adding a country:** append a new `CountryRules` object to `COUNTRY_RULES`.

---

## `journeyMapping.ts`

Defines the reasoning architecture. Functions are documented with placeholder implementations — business logic will be implemented incrementally.

| Function | Purpose |
|---|---|
| `identifyCurrentStage()` | Map questionnaire education level to a concrete stage |
| `identifyTargetCareer()` | Resolve career goal to a registered pathway |
| `identifyCareerDomain()` | Determine the domain for the target career |
| `calculateMissingMilestones()` | Compute remaining steps (placeholder — returns `[]`) |
| `generateJourneyMap()` | Assemble the complete journey map |
| `formatJourneyMapForPrompt()` | Serialise journey map for prompt layer consumption |

---

## Integration Pipeline

```
Questionnaire Responses
        ↓
generateJourneyMap()              ← domain layer
        ↓
formatJourneyMapForPrompt()         ← structured journey context
        ↓
buildRoadmapPrompt()                ← prompt layer (future integration)
        ↓
AI Generation → roadmap.schema.json validation
```

The prompt layer (`src/prompts/`) provides voice, principles, and output format. This domain layer provides **structure and logical progression** for any career.

---

## Extending the System

### New career (any domain)

1. Ensure the domain exists in `careerDomains.ts` (add if missing).
2. Define a `CareerPathway` in `careerPathways.ts`.
3. Append to `CAREER_PATHWAYS` registry.

### New country

1. Add stages to `educationStages.ts`.
2. Add frameworks to `countryRules.ts`.
3. Register country aliases in lookup maps.

### Implementing journey logic

Business logic belongs in `journeyMapping.ts` — specifically `calculateMissingMilestones()` and `generateJourneyMap()`. The function signatures and types are the stable contract; implementations can evolve without changing consumers.

---

## Design Principles

- **Domain-driven, not technology-driven** — architecture supports any career field
- **Scalable by addition** — registries grow without modifying existing entries
- **Career knowledge separate from country rules** — independent modules compose at journey mapping time
- **Separate from prompts** — no AI provider references; no prompt text in this layer
- **Architecture first** — placeholder implementations preserve clean contracts for future logic
- **Production-ready structure** — typed interfaces, documented functions, modular files
