
# Te Ataarangi — Māori Language Learning Website: Project Plan

> He aha te mea nui o te ao? He tangata, he tangata, he tangata.
> What is the greatest thing in the world? It is people, it is people, it is people.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Core Data Models](#3-core-data-models)
4. [Feature Roadmap](#4-feature-roadmap)
5. [Key UI/UX Design Decisions](#5-key-uiux-design-decisions)
6. [Content Plan](#6-content-plan)
7. [Development Milestones](#7-development-milestones)
8. [Important Considerations](#8-important-considerations)

---

## 1. Project Overview

### Vision Statement

A free, public, web-based Māori language learning tool built faithfully on the **Te Ataarangi** methodology — where the learner discovers language through visual cues, immersion, and silence rather than translation, memorisation drills, or correction. The website brings the physical rākau (Cuisenaire rod) experience into a digital space without sacrificing the cultural and pedagogical integrity of the method.

This is not a gamified vocabulary flashcard app. It is a structured, immersive learning environment rooted in tikanga Māori, where the learner is treated with dignity, their mana is protected, and language emerges naturally through observation and interaction.

### Background: Te Ataarangi

Te Ataarangi ("the guiding star") was founded in the late 1970s by **Dr. Katerina Mataira** and **Ngoingoi Pewhairangi** as a response to the critical decline of te reo Māori. Grounded in Swiss educator Caleb Gattegno's **Silent Way** method, it uses small coloured wooden rods called **rākau** (Cuisenaire rods) as the primary teaching tool. The teacher remains silent — arranging rods, gesturing, waiting — while learners are led to construct and describe the arrangements in Māori. No English is spoken. Mistakes are not directly corrected. The group becomes a whānau.

The method is now administered by the **Te Ataarangi Trust** and has helped revitalise te reo across Aotearoa New Zealand.

### Core Design Principles

These principles are derived directly from Te Ataarangi values and must guide every design and content decision:

| Principle | Te Ataarangi Source | How it Manifests in the App |
|---|---|---|
| **Immersion first** | Ngā Ture (Rule 1: no English) | Māori-only learning mode; English appears only in onboarding/help |
| **Protect mana** | No direct error correction | App never says "wrong" — it waits, offers another attempt, then models |
| **Silence as teacher** | Gattegno Silent Way | Minimal instructional text; visual cues do the teaching |
| **Discovery, not delivery** | Learner discovers through rods | App presents arrangements and waits; it does not explain |
| **Ako** | Teaching and learning are one | Learners can construct their own rod arrangements to share |
| **Ngākau māhaki** | Humility and kindness | Encouraging tone, no streaks-as-pressure, no failure screens |
| **Whanaungatanga** | Group becomes whānau | Community features (Phase 4); group kaiako mode (Phase 2) |
| **Cultural grounding** | Karakia, mihi, waiata, tikanga | Woven throughout every lesson, not siloed into a "culture tab" |

### What Makes This Different

| Other Language Apps | Te Ataarangi Approach |
|---|---|
| Translate to English | Never translate — describe in Māori |
| Correct errors immediately | Wait, model, let learner self-correct |
| Gamify with points/streaks | Honour the learning process itself |
| Introduce grammar rules explicitly | Grammar emerges from patterns |
| Written-first | Spoken/oral-first, writing follows |
| Decontextualised vocabulary | Vocabulary grounded in physical relationships (the rods) |

---

## 2. Tech Stack

### Recommended Stack

**Next.js 14 (App Router) + TypeScript + Tailwind CSS**

This is a full-stack frontend-first architecture. No database is required for the MVP — all lesson content lives as versioned JSON files.

#### Rationale

- **Next.js 14 App Router**: Server components for fast initial load; client components for interactive rākau exercises. Built-in routing maps cleanly to lesson structure (`/whiti/1`, `/whiti/2`, etc.).
- **TypeScript**: Enforces lesson JSON shape contracts — critical when content authors are adding whiti files. Catches malformed lesson data at build time.
- **Tailwind CSS**: Rapid, consistent styling. Custom design tokens can encode the colour palette and rod colours as Tailwind variables. No runtime CSS overhead.
- **SVG for rākau**: Rod arrangements are rendered as SVG — scalable, accessible (ARIA labels), lightweight, no canvas API complexity for MVP.
- **JSON lesson files**: Version-controlled alongside code. No CMS overhead for MVP. Easy for content contributors to edit with a text editor.
- **Vercel deployment**: Zero-config deployment for Next.js. Free tier is sufficient for MVP traffic.
- **Python FastAPI (Phase 4 extension)**: Pronunciation checking, AI feedback, and user analytics can be added as a separate microservice without changing the frontend architecture.

### Full Stack Breakdown

```
Layer           Technology              Purpose
─────────────── ─────────────────────── ─────────────────────────────────────────
Frontend        Next.js 14 App Router   Routing, SSR/SSG, React server components
UI Components   React + TypeScript      Rākau simulator, lesson flow, exercises
Styling         Tailwind CSS            Design system, responsive layout
Animations      Framer Motion           Rod placement animations, transitions
Audio           Web Audio API / HTML5   Pronunciation playback
Icons           Lucide React            UI icons (minimal use)
Content         JSON files (typed)      Lesson data, vocabulary, rod configs
State           React Context + useState Session progress, lesson state (no persistence)
Testing         Vitest + Testing Library Unit tests for lesson logic, rod configs
Linting         ESLint + Prettier       Code quality
Deployment      Vercel                  Hosting, edge functions
Future backend  Python FastAPI          AI features, user accounts (Phase 4)
Future DB       PostgreSQL (Supabase)   User progress, community (Phase 4)
```

### Project Directory Structure

```
te-ataarangi/
├── PLAN.md                          # This document
├── README.md
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
│
├── public/
│   ├── audio/                       # Audio files organised by lesson
│   │   ├── vocabulary/              # Individual word pronunciations
│   │   │   ├── whero.mp3            # "red"
│   │   │   ├── kakariki.mp3         # "green"
│   │   │   └── ...
│   │   ├── phrases/                 # Full phrase audio
│   │   ├── karakia/                 # Karakia recordings
│   │   └── waiata/                  # Song recordings
│   ├── images/
│   │   └── rakau/                   # Reference images for rod configurations
│   └── fonts/                       # Māori-friendly fonts with macron support
│
├── content/                         # All lesson/curriculum content (JSON)
│   ├── whiti/                       # Individual lesson files
│   │   ├── 01-nga-tae.json          # Lesson 1: Colours
│   │   ├── 02-nga-tae-2.json        # Lesson 2: More colours
│   │   ├── 03-rahi-iti.json         # Lesson 3: Big and small
│   │   └── ...
│   ├── vocabulary/
│   │   └── core-vocab.json          # Master vocabulary list
│   ├── patterns/
│   │   └── tauira.json              # Sentence pattern library
│   ├── karakia/
│   │   └── karakia.json             # Karakia texts and audio refs
│   └── waiata/
│       └── waiata.json              # Song lyrics and audio refs
│
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx               # Root layout (fonts, providers)
│   │   ├── page.tsx                 # Home / landing page
│   │   ├── globals.css
│   │   ├── (learning)/              # Route group: learning mode (Māori only)
│   │   │   ├── layout.tsx           # Learning layout (immersion mode active)
│   │   │   ├── whiti/
│   │   │   │   ├── page.tsx         # Lesson index / curriculum map
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx     # Individual lesson page
│   │   │   │       └── loading.tsx
│   │   │   ├── rakau/
│   │   │   │   └── page.tsx         # Free-play rākau sandbox
│   │   │   └── waiata/
│   │   │       └── page.tsx         # Waiata practice
│   │   ├── (meta)/                  # Route group: meta pages (English allowed)
│   │   │   ├── about/page.tsx       # About Te Ataarangi, attribution
│   │   │   ├── help/page.tsx        # How to use the site (English)
│   │   │   └── nga-ture/page.tsx    # The 5 rules (onboarding)
│   │   └── api/                     # API routes (minimal for MVP)
│   │       └── audio/route.ts       # Audio serving if needed
│   │
│   ├── components/
│   │   ├── rakau/
│   │   │   ├── RakauMat.tsx         # The virtual mat (SVG container)
│   │   │   ├── RakauRod.tsx         # Individual rod SVG component
│   │   │   ├── RakauArrangement.tsx # Renders a full rod configuration
│   │   │   └── RakauSandbox.tsx     # Free-play draggable rod tool
│   │   ├── lesson/
│   │   │   ├── LessonFlow.tsx       # Orchestrates exercise progression
│   │   │   ├── ExerciseMultiChoice.tsx
│   │   │   ├── ExerciseTypedInput.tsx
│   │   │   ├── ExerciseSentenceBuilder.tsx
│   │   │   ├── ExercisePatternDrill.tsx
│   │   │   └── LessonComplete.tsx
│   │   ├── audio/
│   │   │   ├── AudioPlayer.tsx      # Plays a single audio clip
│   │   │   └── useAudio.ts          # Audio playback hook
│   │   ├── ui/
│   │   │   ├── MacronKeyboard.tsx   # On-screen macron input helper
│   │   │   ├── KaraokeText.tsx      # Highlighted text for waiata
│   │   │   └── ProgressBar.tsx      # Session progress indicator
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── ImmersionBanner.tsx  # "Kia ora! Kōrero Māori" reminder
│   │
│   ├── lib/
│   │   ├── content.ts               # Functions to load and validate JSON content
│   │   ├── rakau.ts                 # Rākau geometry calculations
│   │   ├── audio.ts                 # Audio utilities
│   │   └── macrons.ts               # Macron input/normalisation helpers
│   │
│   ├── types/
│   │   ├── lesson.ts                # TypeScript types for lesson data
│   │   ├── rakau.ts                 # TypeScript types for rod configurations
│   │   └── vocabulary.ts            # TypeScript types for vocabulary items
│   │
│   └── hooks/
│       ├── useLessonSession.ts      # Session state for a lesson in progress
│       ├── useRakauArrangement.ts   # State for interactive rod placement
│       └── useImmersionMode.ts      # Māori-only mode toggle state
│
└── tests/
    ├── components/
    └── lib/
```

---

## 3. Core Data Models

All content is TypeScript-typed. The JSON files in `/content/` must conform to these types, enforced at build time via a content validation script.

### 3.1 Whiti (Lesson Unit)

```typescript
// src/types/lesson.ts

export type ExerciseType =
  | 'multi_choice'        // Select the correct Māori description
  | 'typed_input'         // Type the Māori description
  | 'sentence_builder'    // Drag words into correct order
  | 'pattern_drill'       // Rapid pattern substitution
  | 'listen_identify'     // Hear audio, identify the rod arrangement
  | 'karakia'             // Recite/follow along with karakia
  | 'waiata';             // Song practice

export interface Exercise {
  id: string;
  type: ExerciseType;
  rakauConfig?: RakauConfiguration;   // The rod arrangement shown
  prompt?: AudioRef;                   // Audio prompt (kaiako "question")
  correctAnswer: string;               // Māori text of correct answer
  acceptedVariants?: string[];         // Alternative correct forms
  audioAnswer: AudioRef;               // Audio of the correct answer
  options?: string[];                  // For multi_choice only
  words?: string[];                    // For sentence_builder only
  hint?: string;                       // Māori-language hint (used sparingly)
}

export interface Whiti {
  id: number;
  slug: string;                        // e.g., "nga-tae"
  title: string;                       // Māori title, e.g., "Ngā Tae"
  titleEnglish: string;                // English title (meta only)
  phase: 1 | 2 | 3 | 4;
  theme: LessonTheme;
  vocabularyIds: string[];             // References to core-vocab.json
  patternIds: string[];                // References to tauira.json
  karakia?: KarakiaRef;                // Opening karakia for this lesson
  exercises: Exercise[];
  waiata?: WaiataRef;                  // Optional closing waiata
  tikangaNote?: {                      // Optional cultural context
    text: string;                      // In Māori
    textEnglish: string;               // In English (shown in meta mode)
  };
  prerequisites: number[];             // Whiti IDs that should be completed first
}

export type LessonTheme =
  | 'nga-tae'             // Colours
  | 'rahi-iti'            // Sizes
  | 'waahi'               // Positions
  | 'mahi'                // Actions/verbs
  | 'tangata'             // People
  | 'nama'                // Numbers
  | 'patai'               // Questions
  | 'tikanga'             // Cultural content
  | 'waiata';             // Song
```

### 3.2 Rākau Configuration

The rākau set consists of 10 rod colours, each with a standard length (in Cuisenaire units, 1–10). The SVG renderer uses these lengths scaled to a base unit (e.g., 20px per unit).

```typescript
// src/types/rakau.ts

export type RodColour =
  | 'ma'          // white  — length 1
  | 'kākāriki'    // red    — length 2
  | 'kahurangi'   // light green — length 3
  | 'tūāuri'      // purple — length 4
  | 'kōwhai'      // yellow — length 5
  | 'mākutu'      // dark green — length 6
  | 'mangu'       // black  — length 7
  | 'parauri'     // brown  — length 8
  | 'hōhonu'      // blue   — length 9
  | 'kura'        // orange — length 10

// Note: Traditional Cuisenaire colours. The Māori names above are
// illustrative — content reviewers should confirm culturally appropriate names.

export interface Rod {
  colour: RodColour;
  orientation: 'horizontal' | 'vertical';
  position: {
    x: number;   // Grid units from left
    y: number;   // Grid units from top
  };
  label?: string;  // Optional ARIA label override
}

export interface RakauConfiguration {
  id: string;
  rods: Rod[];
  matSize: {
    width: number;   // Grid units
    height: number;  // Grid units
  };
  description: string;           // Māori description of the arrangement
  descriptionEnglish?: string;   // English (for content authoring only)
  focusRodIds?: string[];        // Highlight specific rods for attention
}
```

### 3.3 Rod Colour Reference Table

```
Colour Name (EN)  | Māori Working Name | Length | Hex Colour
──────────────────┼────────────────────┼────────┼────────────
White             | mā                 | 1      | #FFFFFF
Red               | whero              | 2      | #E63946
Light Green       | kākāriki           | 3      | #57CC99
Purple            | wāteri             | 4      | #9B5DE5
Yellow            | kōwhai             | 5      | #FFD166
Dark Green        | kākāriki nui       | 6      | #2D6A4F
Black             | mangu              | 7      | #212529
Brown             | parauri            | 8      | #8B5E3C
Blue              | kahurangi          | 9      | #118AB2
Orange            | karaka             | 10     | #F77F00
```

### 3.4 Vocabulary Item

```typescript
// src/types/vocabulary.ts

export interface VocabularyItem {
  id: string;                    // Unique slug, e.g., "whero"
  word: string;                  // Māori word with macrons
  wordRomanised?: string;        // Simplified for search/indexing
  english: string;               // English gloss (meta only)
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'particle' | 'phrase';
  audio: AudioRef;               // Pronunciation audio
  exampleSentence?: string;      // Māori example sentence
  exampleAudio?: AudioRef;
  rodColour?: RodColour;         // If this word relates to a rod colour
  lessonFirstAppearance: number; // Whiti ID where this word first appears
}

export interface AudioRef {
  file: string;         // Path relative to /public/audio/
  duration?: number;    // Seconds (for UI timing)
  speaker?: string;     // Attribution for native speaker recordings
}
```

### 3.5 Sentence Pattern (Tauira)

```typescript
export interface Tauira {
  id: string;
  pattern: string;            // Template with slots, e.g., "He {colour} te rākau"
  patternEnglish: string;     // English gloss (meta only)
  slots: PatternSlot[];
  exampleInstances: {
    filled: string;           // Fully filled example in Māori
    audio: AudioRef;
  }[];
  lessonId: number;           // Which whiti introduces this pattern
}

export interface PatternSlot {
  name: string;               // e.g., "colour"
  acceptedValues: string[];   // Vocabulary IDs that can fill this slot
}
```

### 3.6 Audio File Organisation

```
public/audio/
├── vocabulary/
│   ├── whero.mp3            # Individual word: "whero" (red)
│   ├── kākāriki.mp3
│   └── ...
├── phrases/
│   ├── he-whero-te-rakau.mp3
│   └── ...
├── patterns/
│   ├── he-X-te-rakau/       # Pattern audio fragments
│   └── ...
├── karakia/
│   ├── karakia-timatanga.mp3
│   └── karakia-whakamutunga.mp3
└── waiata/
    ├── tutira-mai.mp3
    └── ...
```

Audio files must be:
- Format: MP3 (universal) + WebM Opus (efficient, fallback)
- Sample rate: 44.1kHz
- Named using the Māori word/phrase, macrons replaced with doubled vowels for filesystem safety (e.g., `māori` → `maori`, served with correct display name from JSON)

---

## 4. Feature Roadmap

### Phase 1 — Tūāpapa (Foundation) MVP

**Goal**: A working, publicly accessible learning tool with 10 lessons and a functioning rākau simulator.

#### 4.1.1 Project Scaffolding

- [ ] Initialise Next.js 14 project with TypeScript and Tailwind CSS
- [ ] Configure `tsconfig.json` with strict mode and path aliases (`@/components`, `@/lib`, `@/types`, `@/content`)
- [ ] Set up ESLint and Prettier with Māori-friendly rules (allow macrons, long identifiers)
- [ ] Create Tailwind design tokens: rod colours, Māori-inspired palette, typography scale
- [ ] Set up content validation script (`scripts/validate-content.ts`) — run at build time to confirm all JSON conforms to TypeScript types
- [ ] Configure Vercel deployment with preview deployments per branch

#### 4.1.2 Virtual Rākau Component

The rākau simulator is the heart of the application. It must faithfully represent the physical rod experience.

- [ ] **RakauMat.tsx**: SVG viewport representing the woven mat. Neutral linen texture or kōwhaiwhai-inspired border.
- [ ] **RakauRod.tsx**: Individual rod rendered as an SVG rectangle.
  - Correct proportional length (base unit × rod length value)
  - Correct colour (from design token)
  - Subtle shadow/depth to suggest physical object
  - ARIA label: `He rākau {colour}, {length} ōrau te roa` ("A {colour} rod, {length} units long")
  - Hover state: gentle glow
- [ ] **RakauArrangement.tsx**: Renders a complete `RakauConfiguration` — positions all rods on the mat according to their grid coordinates
- [ ] **Animation**: Rods are placed one at a time with a short delay (100–200ms between rods), mimicking the kaiako silently laying rods. Not instant, not fast — deliberate.
- [ ] **RakauSandbox.tsx** (free play): Drag-and-drop rods from a palette onto the mat. Used in Phase 2 kaiako mode and the standalone sandbox page.

#### 4.1.3 Lesson Content System

- [ ] Define and lock the `Whiti` TypeScript interface
- [ ] Build `src/lib/content.ts` — functions to load, parse, and validate JSON lesson files at build time
- [ ] Author first 10 lesson JSON files (see Section 6 for lesson content plan)
- [ ] Author corresponding vocabulary entries in `core-vocab.json`
- [ ] Author sentence patterns in `tauira.json`

#### 4.1.4 Lesson Flow

The lesson flow respects the Silent Way: show, wait, respond.

```
Lesson Entry
    │
    ▼
Karakia (opening — audio plays, learner follows)
    │
    ▼
Exercise Loop ──────────────────────────────────────────────────────┐
    │                                                               │
    ▼                                                               │
Rākau arrangement animates onto mat (silently)                      │
    │                                                               │
    ▼                                                               │
App waits. No prompt text. (Silence principle.)                     │
    │                                                               │
    ▼                                                               │
Learner responds:                                                   │
  Phase 1a: Selects from multiple choice options (Māori only)       │
  Phase 1b: Types a Māori description                               │
    │                                                               │
    ▼                                                               │
If correct → audio plays the correct answer → brief pause → next   ─┘
    │
If incorrect → app does NOT say "wrong" → arrangement stays →
    learner tries again → after 2nd attempt, audio plays answer
    (modelling, not correction) → move on
    │
    ▼
Lesson Complete screen → Karakia whakamutunga (closing karakia)
```

- [ ] Implement `LessonFlow.tsx` orchestrator component
- [ ] Implement `ExerciseMultiChoice.tsx` — four Māori options, no English labels
- [ ] Implement `ExerciseTypedInput.tsx` — free text input with macron keyboard helper
- [ ] Implement answer evaluation (normalise macrons, trim whitespace, compare against `correctAnswer` and `acceptedVariants`)
- [ ] Implement "no wrong answer" feedback model — silence, then modelling

#### 4.1.5 Audio Playback

- [ ] `useAudio.ts` hook — loads and plays an `AudioRef`, returns `{ play, pause, isPlaying, duration }`
- [ ] `AudioPlayer.tsx` — minimal UI: a single play button (no scrubber for MVP). Visual pulse animation while playing.
- [ ] Preload audio for the next exercise while current one is active
- [ ] Fallback: if audio file missing, show Māori text only (no silent failure)
- [ ] Respect `prefers-reduced-motion` — disable rod animation if set

#### 4.1.6 Māori-First Interface

- [ ] All text visible in learning mode is in te reo Māori
- [ ] English appears only on `/about`, `/help`, and `/nga-ture` (meta pages) and in developer-facing content (JSON comments, TypeScript comments)
- [ ] Navigation labels: `Ngā Whiti` (Lessons), `Rākau`, `Waiata`, `Mō Mātou` (About)
- [ ] Error messages in Māori (e.g., `Kāore e taea` for "not available")

#### 4.1.7 Onboarding: Ngā Ture

Before a user's first lesson, they are shown the 5 rules of Te Ataarangi. This is the only point in the learning flow where English is shown alongside Māori.

| # | Te Reo Māori | English |
|---|---|---|
| 1 | Kōrero Māori anake | Speak Māori only |
| 2 | Kaua e whakahāwea | No disrespect |
| 3 | Kaua e āwhina i ō hoa | Do not prompt your peers |
| 4 | Ko ngā pātai noa iho māu, ko ērā anake | Answer only questions directed at you |
| 5 | Whakaaro māhaki | Cultivate humility |

- [ ] Ngā Ture screen shown once per browser session (localStorage flag)
- [ ] Learner must tap/click "Āe" (Yes) to confirm before entering first lesson
- [ ] Ngā Ture always accessible at `/nga-ture`

#### 4.1.8 Mobile Responsive

- [ ] Rākau mat scales correctly on mobile (SVG viewBox scales proportionally)
- [ ] Multiple choice options stack vertically on small screens
- [ ] Macron keyboard helper appears as a floating row of buttons on mobile (where keyboard macron input is difficult)
- [ ] Touch targets minimum 44×44px (WCAG 2.5.5)

---

### Phase 2 — Whakaaro Hōhonu (Deeper Learning)

**Goal**: Full 49-whiti curriculum, additional exercise types, kaiako mode, waiata section, cultural content integration.

#### 4.2.1 Full Curriculum (49 Whiti)

| Theme | Whiti Range | Topics |
|---|---|---|
| Ngā Tae (Colours) | 1–5 | All 10 rod colours, basic "He X te rākau" pattern |
| Rahi iti (Sizes) | 6–10 | iti, nui, roa, poto; comparison (he roa ake, he iti iho) |
| Wāhi (Positions) | 11–18 | runga, raro, mua, muri, mauī, matau, roto, waho, taha |
| Nama (Numbers) | 19–23 | tahi–tekau; counting rods; "e rua ngā rākau whero" |
| Mahi (Actions) | 24–30 | Basic verbs with rods as actors/objects |
| Tangata (People) | 31–36 | ia, au, māua, rāua, mātou, rātou; possessives |
| Pātai (Questions) | 37–41 | He aha? Ko wai? Kei hea? E hia? |
| Rerenga kōrero | 42–49 | Complex sentences combining all prior patterns |

#### 4.2.2 Sentence Builder Exercise

- [ ] `ExerciseSentenceBuilder.tsx` — word tiles that can be dragged into a sentence slot row
- [ ] Word tiles show Māori text only
- [ ] Tiles snap into position; mis-ordered tiles animate back, not rejected
- [ ] Accessible fallback: numbered list of words with "move up/down" buttons (keyboard navigation)

#### 4.2.3 Session-Based Progress

- [ ] `useLessonSession.ts` — tracks which exercises in a lesson are complete (in-memory only; clears on page refresh)
- [ ] Visual progress bar within lesson (shows position in exercise sequence)
- [ ] Curriculum map (`/whiti`) — shows all 49 whiti; completed ones highlighted for the session

No server-side persistence in Phase 2. This is intentional: each session begins fresh, reinforcing the idea that learning is ongoing, not a checkbox.

#### 4.2.4 Waiata Section

- [ ] `/waiata` page listing available songs
- [ ] `KaraokeText.tsx` — Māori lyrics highlighted word by word in sync with audio
- [ ] Full song audio + individual line audio
- [ ] Simple waiata: Tūtira Mai Ngā Iwi, Te Aroha, Pō Atarau (Where'd You Go / Now Is the Hour)
- [ ] Cultural note for each waiata (composer, occasion, meaning) — in Māori with English in meta mode

#### 4.2.5 Cultural Sidebar

- [ ] Tikanga notes embedded in lesson JSON, surfaced as expandable panel during lesson
- [ ] Karakia page (`/karakia`) with karakia timatanga and whakamutunga audio and text
- [ ] Mihi template builder — learner fills in their own details (name, iwi, maunga, awa, waka, marae)

#### 4.2.6 Kaiako Mode

For teachers running group sessions (e.g., a kura using the site on a projector).

- [ ] Toggle "Ārahina / Kaiako" mode from lesson or sandbox page
- [ ] In Kaiako mode: UI strips away all answer prompts, options, and progress indicators
- [ ] Kaiako can manually advance rod arrangements one by one (keyboard left/right, or tap)
- [ ] Rod palette always visible for adding rods to the mat manually
- [ ] Fullscreen mode
- [ ] Disable screen sleep (Wake Lock API)

---

### Phase 3 — Whakapakari (Strengthening)

**Goal**: Retention, depth, and accessibility features. Turn the site into a daily practice tool.

#### 4.3.1 Spaced Repetition

- [ ] Vocabulary review mode using a simplified SM-2 spaced repetition algorithm
- [ ] Stored in `localStorage` (no account required)
- [ ] Review queue surfaced on home page: "He {n} kupu māu āianei" (You have {n} words to review today)
- [ ] Rod-based review: show the rod for a colour, learner types the Māori name

#### 4.3.2 Pronunciation Guide

- [ ] `/pronunciation` page — interactive Māori vowel and consonant guide
- [ ] Each sound: IPA notation, Māori orthography explanation, audio example
- [ ] Tohutō (macron) explainer: what they are, why they matter, how to type them
- [ ] Vowel length contrastive pairs (e.g., `ana` vs `āna`) with audio

#### 4.3.3 Pattern Drill Mode

- [ ] `ExercisePatternDrill.tsx` — rapid substitution drills
- [ ] Pattern displayed: `He ___ te rākau` → flash a rod colour → learner responds immediately
- [ ] Timer-based (optional): 60-second drill session
- [ ] No "wrong" — just models the correct answer after each item and continues

#### 4.3.4 Progressive Web App (PWA)

- [ ] Add `manifest.json` and service worker via `next-pwa`
- [ ] Cache lesson JSON and audio files for offline use
- [ ] "Add to home screen" prompt
- [ ] Offline fallback page in Māori

#### 4.3.5 Pūrākau and Tikanga Pages

- [ ] Dedicated section for pūrākau (traditional stories) using learned vocabulary
- [ ] Stories presented with audio + rod-based illustration where applicable
- [ ] Tikanga pages: marae protocol, karakia contexts, whakapapa concepts — woven into relevant whiti

---

### Phase 4 — Whanaungatanga (Community)

**Goal**: Persistent accounts, community connection, teacher tools. Requires authentication.

> Phase 4 introduces a Python FastAPI backend. The Next.js frontend calls the API for auth, user data, and AI features.

#### 4.4.1 User Accounts

- [ ] Auth via email magic link or OAuth (no passwords for MVP of auth)
- [ ] Persistent progress tracking across devices
- [ ] User profile: name, iwi (optional), learning goals
- [ ] Privacy: users control what is visible to others

#### 4.4.2 Daily Practice Streaks

- [ ] Streak tracking (server-side) — but framed as `He ara tōu haerenga`, not a gamified pressure mechanic
- [ ] "Rest days" built in — streak forgives one missed day per week
- [ ] Celebration is quiet: a waiata snippet plays at certain milestones, not an animation explosion

#### 4.4.3 Community Features

- [ ] Practice partner matching (timezone-based)
- [ ] Shared vocabulary lists
- [ ] Community-submitted rod arrangements (moderated)

#### 4.4.4 Kaiako Dashboard

- [ ] Teacher creates a session room (shareable link)
- [ ] Students join; kaiako controls the rod arrangement displayed on all screens simultaneously
- [ ] Real-time via WebSockets (or Server-Sent Events for simpler implementation)
- [ ] Session analytics for kaiako: which patterns students struggled with

#### 4.4.5 AI Pronunciation Feedback (Stretch Goal)

- [ ] Python FastAPI endpoint accepts audio recording from browser
- [ ] Compares against reference pronunciations using a Māori-trained ASR model (or phoneme-level comparison)
- [ ] Returns feedback as a qualitative indicator (not a score — to protect mana)
- [ ] Does not store audio recordings

---

## 5. Key UI/UX Design Decisions

### 5.1 The Rākau Simulator

**Visual Design**

The mat background should evoke a physical woven flax (harakeke) mat — a subtle weave texture in neutral tones (cream, warm grey). The rods are rendered with slight drop shadows to suggest physical objects resting on the mat.

Rod dimensions follow the Cuisenaire proportions exactly:
- Base unit: 20px
- White rod (length 1): 20px × 16px
- Orange rod (length 10): 200px × 16px
- All rods same width (16px); only length varies

```
White  ▐█▌             (20px wide)
Red    ▐██▌            (40px wide)
...
Orange ▐██████████▌    (200px wide)
```

For vertical rods, the SVG rectangle is rotated 90°.

**Placement Animation**

Rods animate into position one at a time using Framer Motion's `layoutId` and `animate` props. Default: 150ms ease-in-out per rod. Respects `prefers-reduced-motion`.

**Accessibility**

The entire arrangement has a surrounding `role="img"` with `aria-label` describing the full arrangement in Māori. Each rod also has its own `aria-label`. Screen reader users hear a description of the arrangement before the exercise begins.

### 5.2 Immersion Enforcement

- A persistent but unobtrusive banner in the learning layout: `Kōrero Māori` (Speak Māori)
- No English labels, buttons, or instructions in the `/learning` route group
- Meta pages (`/about`, `/help`) can contain English — clearly visually distinct from the learning environment (different header colour, different typography)
- An "immersion mode" toggle allows advanced users to disable English meta-text (for those who want full immersion even in help pages)

### 5.3 The Silence Principle

The app should communicate primarily through:
1. The rod arrangement (visual)
2. Audio playback (sound)
3. Waiting (time)

Instructional text is kept to an absolute minimum. Where text is necessary, it is short, in Māori, and does not explain — it gestures.

Example: Instead of "Click the button that correctly describes the arrangement of rods," the interface shows:
- The arrangement
- Four options
- A subtle pulsing cursor
- Silence

After a pause, if no answer is given, a subtle audio cue (like the gentle tap of a rod on a table) plays to invite interaction.

### 5.4 Macron / Tohutō Input

Typing macrons on most keyboards requires effort. The app provides three input methods:

1. **Macron keyboard helper**: A row of buttons below the text input — `ā ē ī ō ū Ā Ē Ī Ō Ū`. Clicking inserts at cursor position.
2. **Compose key support**: Documents in `/help` how to enable compose key on Mac/Windows/Linux
3. **Normalisation in answer checking**: Answers typed without macrons are checked against a normalised version — the answer is not marked wrong for missing macrons in Phase 1, but the correct macronised form is always shown in the model answer.

### 5.5 Colour Palette

Inspired by kōwhaiwhai (Māori scroll patterns) — geometric, bold, grounded.

```
Token                  Value       Use
─────────────────────  ──────────  ─────────────────────────────────
--color-background     #FAF7F0     Warm off-white (mat/page bg)
--color-surface        #FFFFFF     Cards, panels
--color-border         #D4C9B0     Subtle warm border
--color-text-primary   #1A1A1A     Main text
--color-text-secondary #6B5E4E     Secondary/meta text
--color-accent-kura    #C0392B     Deep red — primary accent
--color-accent-kowhai  #F0C040     Gold/yellow — highlights
--color-accent-pounamu #2C6E49     Deep green — success states
--color-accent-rangi   #1B4F72     Deep blue — interactive elements
```

### 5.6 Typography

- **Headings**: A bold, clear sans-serif with good macron support (e.g., `Atkinson Hyperlegible` or `Source Sans 3`)
- **Body / Māori text**: Legible, generous line-height (1.7), macrons rendered clearly
- **Minimum body font size**: 16px
- **All Māori text**: Always displayed with correct macrons — no exceptions

### 5.7 Accessibility (WCAG 2.1 AA)

- [ ] Colour contrast ≥ 4.5:1 for all text (verify rod colours against backgrounds)
- [ ] All interactive elements keyboard-navigable
- [ ] Focus indicators visible at all times
- [ ] ARIA labels on all SVG rods and mat
- [ ] Audio player controls keyboard-accessible
- [ ] No auto-playing audio (audio plays only on user action or explicit lesson trigger with visual indicator)
- [ ] Macron keyboard helper usable via keyboard alone
- [ ] Skip-to-content link
- [ ] `lang="mi"` attribute on all Māori text spans (critical for screen reader pronunciation)

---

## 6. Content Plan

### 6.1 Lesson Authoring Process

Each lesson (`whiti`) is authored as a JSON file in `/content/whiti/`. The authoring workflow:

1. Draft the lesson in Māori (vocabulary, patterns, rod configurations, exercises)
2. Run `npm run validate-content` — checks JSON against TypeScript types
3. Submit for **reo Māori speaker review** (see Section 6.4)
4. Record or generate audio (see Section 6.3)
5. Link audio files in JSON
6. Final review and merge

### 6.2 First 10 Lessons — Detailed Plan

#### Whiti 1 — He Aha Tō Tae? (What Colour Are You?)
- **Vocabulary**: whero (red), mā (white), kākāriki (green)
- **Rods shown**: One rod at a time; each of the three colours
- **Pattern**: `He [tae] te rākau` (The rod is [colour])
- **Exercises**: Multi-choice (4 options, 3 colours + 1 distractor from later lessons)
- **Karakia**: Karakia timatanga

#### Whiti 2 — Ngā Tae Katoa (All the Colours)
- **Vocabulary**: kōwhai (yellow), kahurangi (blue), mangu (black), parauri (brown), karaka (orange), tūāuri (purple), pango (dark/black variation)
- **Pattern**: `He [tae] te rākau` — extended to all 10 colours
- **Exercises**: Multi-choice → typed input
- **Focus**: Distinguishing similar-sounding colour names

#### Whiti 3 — He Tae Aha? (Questions About Colour)
- **Vocabulary**: he aha (what), tae (colour), pātai (question)
- **Pattern**: `He tae aha te rākau?` / `He [tae] te rākau`
- **Exercises**: Audio prompt (question) → learner answers with rod colour
- **New exercise type**: Listen → identify → answer

#### Whiti 4 — He Nui, He Iti (Big and Small)
- **Vocabulary**: nui (big/large), iti (small), roa (long), poto (short)
- **Rods**: Two rods of contrasting lengths shown together
- **Pattern**: `He nui te rākau [tae]` / `He iti te rākau [tae]`
- **Exercises**: Multi-choice comparing two rods

#### Whiti 5 — He Roa Ake (Longer, Shorter — Comparison)
- **Vocabulary**: ake (more, comparative), iho (less), ōrite (same/equal)
- **Pattern**: `He roa ake te rākau [tae₁] i te rākau [tae₂]`
- **Exercises**: Three rods shown; identify relationships

#### Whiti 6 — Kei Runga, Kei Raro (Above and Below)
- **Vocabulary**: runga (above/top), raro (below/bottom), kei (at/located)
- **Pattern**: `Kei runga te rākau [tae₁]` / `Kei raro te rākau [tae₂]`
- **Rod configs**: Stacked arrangements (one rod on top of another)
- **Exercises**: Multi-choice → typed input

#### Whiti 7 — Kei Mua, Kei Muri (In Front, Behind)
- **Vocabulary**: mua (front/before), muri (behind/after)
- **Pattern**: `Kei mua te rākau [tae₁]` / `Kei muri te rākau [tae₂]`
- **Rod configs**: Linear horizontal arrangements

#### Whiti 8 — Kei Mauī, Kei Matau (Left and Right)
- **Vocabulary**: mauī (left), matau (right), waenganui (middle/centre)
- **Pattern**: `Kei mauī te rākau [tae]`
- **Exercises**: Sentence builder — arrange position words into correct order

#### Whiti 9 — E Hia Ngā Rākau? (How Many Rods?)
- **Vocabulary**: tahi (1), rua (2), toru (3), whā (4), rima (5), ono (6), whitu (7), waru (8), iwa (9), tekau (10), e hia (how many)
- **Pattern**: `E [nama] ngā rākau [tae]`
- **Rod configs**: Groups of same-colour rods in varying quantities

#### Whiti 10 — Whakarite Kōrero (Putting It Together)
- **Review lesson**: No new vocabulary
- **Exercises**: Mixed exercise types combining colour + size + position + number
- **Example**: `E rua ngā rākau whero kei runga i te rākau kōwhai` (Two red rods are above the yellow rod)
- **Closing**: Introduction of first waiata

### 6.3 Audio Sourcing Strategy

**Priority order:**

1. **Native speaker recordings** — The gold standard. Seek reo Māori speakers (ideally Te Ataarangi graduates or teachers) to record all vocabulary, phrases, and karakia. This is critical for cultural authenticity.

2. **Text-to-Speech (interim, MVP only)** — For initial development only: use a high-quality Māori TTS system such as:
   - [Kōrero Māori TTS](https://koreromaori.com) API
   - Mozilla TTS trained on Māori data
   TTS audio must be clearly marked as synthetic and replaced before any public promotion of the site.

3. **Existing licensed recordings** — Explore licensing from Te Māngai Pāho, Te Taura Whiri i te Reo Māori, or NZSL dictionary equivalents for te reo.

**Audio guidelines for native speaker recording sessions:**
- Quiet room, cardioid microphone
- Speaker records each word 3 times; best take selected
- Record both slow (deliberate) and natural-speed versions
- Session must include a kuia or kaumātua oversight for karakia recordings

### 6.4 Cultural Review Process

**This is not optional.** The Te Ataarangi method is a living, protected cultural practice. The website must be reviewed by:

1. A **fluent reo Māori speaker** for all Māori text content (lesson content, UI strings, error messages)
2. A **Te Ataarangi practitioner or graduate** for methodology faithfulness
3. A **representative of Te Ataarangi Trust** — ideally establish a formal relationship for permission to reference the methodology and use the name
4. An **iwi cultural advisor** for any tikanga content (karakia, waiata, pūrākau)

Review should happen before any public release of Phase 1, and periodically as new content is added.

---

## 7. Development Milestones

### Milestone 1 — Rākau Simulator + First 3 Lessons
**Target**: 3–4 weeks from project start
**Definition of done:**
- [ ] Next.js project scaffolded and deployed on Vercel
- [ ] `RakauMat`, `RakauRod`, and `RakauArrangement` components working
- [ ] Rod placement animation complete
- [ ] Whiti 1, 2, 3 authored as JSON and loading in lesson flow
- [ ] Multi-choice exercise type working
- [ ] Audio playback working for vocabulary in those 3 lessons
- [ ] Ngā Ture onboarding screen shown before first lesson
- [ ] Mobile responsive
- [ ] Site accessible at public Vercel URL

**Key risk**: Audio sourcing. If native recordings are not available, TTS fills in so that development is not blocked.

---

### Milestone 2 — Full Phase 1 MVP (10 Lessons)
**Target**: 6–8 weeks from project start
**Definition of done:**
- [ ] All 10 whiti (Lessons 1–10) authored and functional
- [ ] Typed input exercise type working (with macron helper)
- [ ] All vocabulary in lessons 1–10 has audio
- [ ] Answer evaluation with accepted variants working
- [ ] "Modelling" feedback (no wrong — play correct answer after 2 attempts)
- [ ] Curriculum map page showing all 10 lessons
- [ ] Lesson complete screen with closing karakia
- [ ] WCAG 2.1 AA audit passed
- [ ] Content validated by at least one reo Māori speaker

---

### Milestone 3 — Phase 2 Complete (49-Whiti Curriculum)
**Target**: 4–6 months from project start
**Definition of done:**
- [ ] All 49 whiti authored and functional
- [ ] Sentence builder exercise type working
- [ ] Waiata section live with 3 songs minimum
- [ ] Kaiako mode functional
- [ ] Cultural sidebar and tikanga notes integrated
- [ ] Mihi builder working
- [ ] Session progress tracking working
- [ ] Cultural review completed for all 49 lessons
- [ ] Native speaker audio for all core vocabulary

---

### Milestone 4 — Phase 3 (Enrichment Features)
**Target**: 8–12 months from project start
**Definition of done:**
- [ ] Spaced repetition vocabulary review working (localStorage)
- [ ] Pronunciation guide page live
- [ ] Pattern drill mode working
- [ ] PWA installable, lessons available offline
- [ ] At least 3 pūrākau pages with audio
- [ ] Performance audit: Core Web Vitals all green

---

## 8. Important Considerations

### 8.1 Cultural Sensitivity and Attribution

**Te Ataarangi Trust**

This website is built in the spirit of Te Ataarangi but is not an official product of the Te Ataarangi Trust. The following must be made clear on the `/about` page and in the site footer:

> Te Ataarangi was founded by **Dr. Katerina Mataira (Ngāti Porou)** and **Ngoingoi Pewhairangi (Ngāti Porou)** in the late 1970s, based on the Silent Way methodology of Caleb Gattegno. The Te Ataarangi method is administered by the [Te Ataarangi Trust](https://www.teataarangi.org.nz). This website draws inspiration from their methodology and seeks to honour their mahi. It is not affiliated with or endorsed by the Te Ataarangi Trust.

Seek explicit written permission from the Te Ataarangi Trust before:
- Using the name "Te Ataarangi" as the primary brand of the site
- Claiming to teach "the Te Ataarangi method"
- Reproducing copyrighted curriculum materials

**Founders' Whakapapa**

Dr. Katerina Mataira and Ngoingoi Pewhairangi were both of Ngāti Porou descent. Their contribution to reo revitalisation was immeasurable. Any memorial or attribution section should be written with appropriate tikanga and, ideally, reviewed by Ngāti Porou representatives.

### 8.2 Macron / Tohutō Policy

Macrons are not optional — they are part of the spelling of Māori words and change meaning:
- `ana` = a suffix indicating ongoing action
- `āna` = his/her/its (possession)
- `keke` = cake (loanword)
- `kēkē` = armpit

**Policy:**
- All Māori text in the codebase, JSON files, and UI must use correct macrons
- Git hooks (`pre-commit`) should warn if Māori text in content files lacks macrons where expected
- The `content/vocabulary/core-vocab.json` is the canonical source of macronised spellings
- File names and JSON keys may omit macrons for filesystem/technical safety, but display values must include them

### 8.3 Licensing

| Component | Recommended Licence |
|---|---|
| Source code | MIT (open source, community can contribute) |
| Lesson content (JSON) | Creative Commons BY-NC-SA 4.0 |
| Audio recordings | Negotiate with speakers; record licence grants |
| Kōwhaiwhai-inspired graphics | Ensure original creation or licensed source |

Consult with Te Ataarangi Trust about whether CC BY-SA or a more restrictive licence is more appropriate for the lesson content, given the cultural origins of the methodology.

### 8.4 WCAG Compliance Checklist

| Criterion | Requirement | Notes |
|---|---|---|
| 1.1.1 Non-text Content | A | All SVG rods have ARIA labels in Māori |
| 1.2.1 Audio-only | A | Transcripts for all audio (Māori text shown) |
| 1.4.3 Contrast (Minimum) | AA | All rod colours verified against backgrounds |
| 1.4.4 Resize Text | AA | Functional at 200% zoom |
| 2.1.1 Keyboard | A | All lesson interactions keyboard-navigable |
| 2.4.7 Focus Visible | AA | Focus rings always visible |
| 3.1.1 Language of Page | A | `lang="mi"` on root for learning pages |
| 3.1.2 Language of Parts | AA | `lang="mi"` on Māori text within English pages |
| 3.3.1 Error Identification | A | Not applicable — no "errors" shown to learner |

### 8.5 Performance Targets

- **Largest Contentful Paint (LCP)**: < 2.5s on 4G mobile
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Audio load time**: First audio clip ready within 1s of lesson page load (preloaded)
- **Bundle size**: < 100KB JS (gzipped) for initial page load; lesson JSON loaded on demand

### 8.6 Future Backend Integration Points

The Phase 1–3 frontend is designed to be backend-agnostic. When Phase 4 introduces a Python FastAPI backend:

- Auth headers are added via Next.js middleware — no component changes required
- API calls are abstracted behind `/src/lib/api.ts` — swap mock data for real API calls
- The `content/` directory can optionally be replaced by API-served content (for content management without deployments)
- Audio files can be served from a CDN bucket rather than `/public/` — only the `AudioRef.file` path changes

---

## Appendix A: Rod Colour / Length Reference (Quick Reference)

```
Length  Colour (English)  Māori Working Name  Hex
──────  ────────────────  ──────────────────  ───────
1       White             Mā                  #FFFFFF
2       Red               Whero               #E63946
3       Light Green       Kākāriki            #57CC99
4       Purple            Wāteri              #9B5DE5
5       Yellow            Kōwhai              #FFD166
6       Dark Green        Kākāriki nui        #2D6A4F
7       Black             Mangu               #212529
8       Brown             Parauri             #8B5E3C
9       Blue              Kahurangi           #118AB2
10      Orange            Karaka              #F77F00
```

## Appendix B: Key Māori Terms Used in the App

| Term | Meaning | Used in |
|---|---|---|
| whiti | lesson unit | Lesson naming |
| rākau | rod / stick | Simulator |
| kaiako | teacher | Kaiako mode |
| ākonga | learner/student | UI references |
| tae | colour | Lesson content |
| wāhi | place/position | Lesson content |
| ingoa | name | Profile |
| pātai | question | Exercise prompts |
| karakia | prayer/incantation | Opening/closing ritual |
| waiata | song | Song section |
| mihi | greeting/introduction | Cultural section |
| tikanga | correct way / protocol | Cultural notes |
| pūrākau | traditional story | Phase 3 content |
| tohutō | macron (the diacritic mark) | Input help |
| reo | language | "Te Reo Māori" |
| mana | prestige / authority | Design principle |
| whakamā | shame / embarrassment | Design principle (avoid this) |
| ako | to teach and to learn | Pedagogical principle |
| ngākau māhaki | humility and kindness | Rule 5 of Ngā Ture |
| whanaungatanga | relationships / kinship | Community principle |
| iwi | tribe / people | User profile |
| marae | communal gathering place | Cultural reference |

---

*Nō reira, tīmata tāua. Let us begin.*

*He mihi mahana ki a koutou o Te Ataarangi — Dr. Katerina Mataira, Ngoingoi Pewhairangi, me ngā ākonga katoa.*
*A warm tribute to all of Te Ataarangi — Dr. Katerina Mataira, Ngoingoi Pewhairangi, and all the learners.*
