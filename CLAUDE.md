# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A free, web-based Māori language learning tool built on the **Te Ataarangi** methodology — immersive learning through visual rākau (Cuisenaire rod) arrangements, silence, and discovery. No translation, no gamification, no error corrections. See `PLAN.md` for the full project plan.

## Tech Stack (Planned — Project Not Yet Scaffolded)

- **Next.js 14 (App Router)** + **TypeScript** (strict mode) + **Tailwind CSS**
- **Framer Motion** — rod placement animations
- **SVG** — rākau simulator rendering (not canvas)
- **Vitest + Testing Library** — unit tests
- **ESLint + Prettier** — linting
- **Vercel** — deployment
- **Content**: Typed JSON files in `/content/` (no database for MVP)

## Commands (Once Scaffolded)

```bash
npm run dev          # Start dev server
npm run build        # Production build (also runs content validation)
npm run lint         # ESLint
npm run test         # Vitest
npm run test -- path/to/test.ts   # Run a single test file
npm run validate-content          # Validate all JSON content files against TypeScript types
```

## Architecture

### Route Structure

Two route groups with different immersion rules:

- **`(learning)/`** — Māori-only; no English in UI. Contains `/whiti/[id]` (lessons), `/rakau` (sandbox), `/waiata`.
- **`(meta)/`** — English allowed. Contains `/about`, `/help`, `/nga-ture` (the 5 rules onboarding).

### Content System

All lesson content lives as versioned JSON in `/content/`:
- `/content/whiti/` — Individual lesson files (`01-nga-tae.json`, etc.)
- `/content/vocabulary/core-vocab.json` — Canonical source of macronised spellings
- `/content/patterns/tauira.json` — Sentence pattern library

`src/lib/content.ts` loads and validates this content. A `scripts/validate-content.ts` script runs at build time to catch malformed JSON.

### Key TypeScript Types (in `src/types/`)

- **`Whiti`** — A lesson unit. Has `exercises[]`, optional `karakia`, optional `waiata`, `prerequisites[]`.
- **`Exercise`** — Types: `multi_choice`, `typed_input`, `sentence_builder`, `pattern_drill`, `listen_identify`, `karakia`, `waiata`.
- **`RakauConfiguration`** — Rod arrangement: array of `Rod` objects with `colour`, `orientation`, grid `position`.
- **`RodColour`** — Union type of 10 colours (mā/white through kura/orange), each with a fixed Cuisenaire length (1–10).
- **`VocabularyItem`** — Māori word with audio reference, English gloss (meta only), optional rod colour link.

### Rākau Component Hierarchy

```
RakauMat (SVG viewport, woven mat texture)
  └── RakauArrangement (renders a RakauConfiguration; animates rods one at a time, ~150ms apart)
        └── RakauRod (individual SVG rect; proportional length = base 20px × rod length value; all rods 16px wide)
RakauSandbox (drag-and-drop variant for free play and kaiako mode)
```

### Lesson Flow

The core learning loop (no "wrong answer" feedback — silence, then modelling):

```
Karakia → Exercise: [show rods silently] → [wait] → [learner responds]
  → Correct: play audio answer → next exercise
  → Incorrect: arrangement stays → learner tries again → after 2nd attempt, audio models the correct answer → move on
→ Lesson Complete → Karakia whakamutunga
```

### State

- `useLessonSession.ts` — in-memory only; clears on page refresh (intentional, per methodology)
- `useImmersionMode.ts` — toggle for Māori-only mode
- `useRakauArrangement.ts` — interactive rod placement state
- No server-side persistence until Phase 4

## Domain Rules — Read Before Writing Any Code

### Macrons / Tohutō Are Mandatory

Macrons change meaning (`ana` vs `āna`). All Māori text in source, JSON, and UI **must** use correct macrons. File names and JSON keys may use un-macronised forms for filesystem safety, but all display values must use macrons. `core-vocab.json` is the canonical spelling reference.

### No "Wrong Answer" UX

The app never tells a learner they are wrong. After 2 failed attempts, it plays the correct answer as a model and moves on. Never add "incorrect", "wrong", "try again" messaging to the learning flow.

### Immersion: English Only in `(meta)/` Routes

Learning-mode pages (`(learning)/` route group) must contain zero English UI text. Error messages, navigation labels, and prompts are all in te reo Māori (e.g., `Kāore e taea` for "not available").

### Audio File Naming

Audio files use un-macronised names for filesystem safety (e.g., `maori.mp3`), but the display name comes from JSON. Format: MP3 + WebM Opus. Stored under `public/audio/` organised by `vocabulary/`, `phrases/`, `patterns/`, `karakia/`, `waiata/`.

### Rod Colours and Lengths

| Length | English | Māori Name | Hex |
|--------|---------|------------|-----|
| 1 | White | Mā | #FFFFFF |
| 2 | Red | Whero | #E63946 |
| 3 | Light Green | Kākāriki | #57CC99 |
| 4 | Purple | Wāteri | #9B5DE5 |
| 5 | Yellow | Kōwhai | #FFD166 |
| 6 | Dark Green | Kākāriki nui | #2D6A4F |
| 7 | Black | Mangu | #212529 |
| 8 | Brown | Parauri | #8B5E3C |
| 9 | Blue | Kahurangi | #118AB2 |
| 10 | Orange | Karaka | #F77F00 |

### Accessibility Requirements

- `role="img"` with `aria-label` (in Māori) on the entire rod arrangement; individual rods also have ARIA labels
- `lang="mi"` on all Māori text spans
- `prefers-reduced-motion` must disable rod placement animation
- No auto-playing audio — always user-initiated or with visible indicator
- WCAG 2.1 AA target

### Cultural Sensitivity

This site is **not** an official Te Ataarangi Trust product. The `/about` page and footer must include the appropriate attribution disclaimer (see `PLAN.md` §8.1). Do not claim to teach "the Te Ataarangi method" without trust permission. All Māori content requires review by a fluent reo Māori speaker before release.

## Path Aliases (tsconfig)

`@/components`, `@/lib`, `@/types`, `@/content` — configure in `tsconfig.json` on scaffolding.
