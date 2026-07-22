# Product Requirements Document (PRD)

# ALTAIR

**Tagline:** *Find your way forward.*

**Version:** 1.0

**Status:** Planning

---

# 1. Overview

ALTAIR is an AI-powered web application that generates personalized learning roadmaps for learners based on their career goals, current skill level, available study time, preferred learning style, and target completion timeline.

Rather than providing generic advice, ALTAIR creates structured and actionable learning plans that help users progress confidently toward their desired careers.

---

# 2. Problem Statement

Many learners struggle with questions such as:

- What should I learn first?
- Which skills are actually important?
- How long will it take?
- Which projects should I build?
- Which resources should I follow?

Although many online learning platforms offer courses, very few provide a personalized roadmap that connects a learner's current position with their career goal.

ALTAIR addresses this gap by generating tailored learning roadmaps using Artificial Intelligence.

---

# 3. Product Vision

To help learners navigate their educational journey through personalized AI-powered learning roadmaps that are structured, practical, transparent, and responsible.

---

# 4. Objectives

## Product Objectives

- Simplify learning path planning.
- Help learners focus on the right skills.
- Reduce research time.
- Encourage structured and consistent learning.

## Project Objectives

Demonstrate:

- Product Thinking
- Responsible AI
- Prompt Engineering
- AI Integration
- Software Engineering
- Modern UI/UX
- Clean Architecture

---

# 5. Target Audience

### Primary Users

- University Students
- Fresh Graduates
- Career Switchers
- Self-Learners

### Secondary Users

- Working Professionals
- Lifelong Learners

---

# 6. MVP Scope

## User Inputs

- Career Goal
- Current Skill Level
- Weekly Study Hours
- Preferred Learning Style
- Target Completion Time

---

## AI Output

- Learning Overview
- Learning Phases
- Weekly Timeline
- Skills to Learn
- Suggested Projects
- Learning Resources
- Common Mistakes
- Practical Tips
- Final Career Guidance

---

# 7. User Flow

```
Landing Page
      │
      ▼
Generate Roadmap
      │
      ▼
Complete Form
      │
      ▼
Generate AI Roadmap
      │
      ▼
View Results
      │
      ▼
Download / Save Roadmap (Future)
```

---

# 8. Functional Requirements

### Landing Page

- Introduce ALTAIR
- Explain product value
- Call-to-action button

---

### Roadmap Generator

Users can provide:

- Career Goal
- Skill Level
- Study Hours
- Learning Style
- Timeline

---

### AI Generation

The system should:

- Validate user inputs
- Send data to backend
- Generate personalized roadmap
- Return structured response

---

### Results Page

Display:

- Learning Overview
- Phases
- Weekly Plan
- Projects
- Resources
- Tips
- Responsible AI Notice

---

# 9. Non-Functional Requirements

- Responsive Design
- Mobile Friendly
- Fast Performance
- Accessibility
- Maintainable Code
- Scalable Architecture
- Error Handling

---

# 10. Out of Scope

The MVP intentionally excludes:

- User Authentication
- User Accounts
- Payments
- Chat Interface
- Progress Tracking
- Social Features
- Fine-tuned Models
- Vector Databases
- Multi-Agent Systems
- Analytics Dashboard

---

# 11. Responsible AI

ALTAIR provides AI-generated recommendations intended to assist learners.

Users should understand:

- Recommendations may not be perfect.
- Learning resources should be independently verified.
- AI-generated plans are suggestions rather than guaranteed pathways.
- Individual learning experiences may vary.

---

# 12. Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

## Backend

- Node.js
- Express.js

## AI

- OpenAI API

## Deployment

- Vercel
- Render

---

# 13. Success Metrics

The MVP will be considered successful if users can:

- Generate a personalized roadmap within a few seconds.
- Clearly understand the recommended learning path.
- Easily navigate the application.
- Receive practical and structured recommendations.

---

# 14. Future Enhancements

Potential future improvements include:

- User Accounts
- Save Roadmaps
- Progress Tracking
- AI Roadmap Updates
- Multiple Career Goals
- Calendar Integration
- Course Platform Integration
- Learning Reminders

---

# 15. Success Criteria

The completed MVP should demonstrate:

- AI Integration
- Product Thinking
- Responsible AI
- Prompt Engineering
- Software Engineering Best Practices
- Modern UI/UX Design
- Professional Documentation

---

# Project Status

- [x] Product Vision
- [x] Brand Identity
- [x] Logo
- [x] App Icon
- [x] Product Requirements Document
- [ ] User Personas
- [ ] User Journey
- [ ] Information Architecture
- [ ] Wireframes
- [ ] Design System
- [ ] Prompt Engineering
- [ ] API Design
- [ ] Frontend Development
- [ ] Backend Development
- [ ] AI Integration
- [ ] Testing
- [ ] Deployment