# Te Ataarangi — Ako i te reo Māori

A free, web-based Māori language learning tool built on the **Te Ataarangi** methodology — immersive learning through visual rākau (Cuisenaire rod) arrangements, silence, and discovery. No translation, no gamification, no error corrections.

> He aha te mea nui o te ao? He tangata, he tangata, he tangata.

## About Te Ataarangi

Te Ataarangi ("the guiding star") was founded in the late 1970s by **Dr. Katerina Mataira** and **Ngoingoi Pewhairangi** to revitalise te reo Māori. Grounded in Caleb Gattegno's Silent Way method, it uses small coloured rods (rākau) as the primary teaching tool. The teacher remains silent — arranging rods, gesturing, waiting — while learners construct and describe arrangements in Māori.

This project is an independent community effort inspired by that methodology. It is **not** an official product of the [Te Ataarangi Trust](https://teataarangi.org.nz).

## Features (Phase 1 MVP)

- **10 lessons** across two themes — Ngā Tae (colours) and Rahi-iti (sizes)
- **Virtual rākau** — proportional SVG rod simulator with staggered placement animation
- **Rākau sandbox** — click-to-place free-play rod builder
- **Gentle feedback** — correct answers glow green; incorrect shakes softly; no "wrong" messaging
- **Macron keyboard** — tap-to-insert ā ē ī ō ū, essential on mobile
- **Immersion mode** — all learning pages in te reo Māori only
- **Accessible** — ARIA labels in Māori, `prefers-reduced-motion` support, 44px touch targets

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, static export) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS with custom design tokens |
| Animation | CSS keyframes (rod placement, feedback) |
| Content | Typed JSON files in `/content/` |
| Testing | Vitest (35 unit tests) |
| Deployment | Vercel |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev        # → http://localhost:3000

# Run tests
npm test

# Validate lesson content JSON
npm run validate-content

# Production build
npm run build
```

## Project Structure

```
te-ataarangi/
├── content/
│   ├── whiti/          # 10 lesson JSON files
│   └── vocabulary/     # core-vocab.json (16 items)
├── src/
│   ├── app/
│   │   ├── (learning)/ # Māori-only routes: /whiti, /rakau
│   │   └── (meta)/     # English-allowed: /nga-ture, /about, /help
│   ├── components/
│   │   ├── rakau/      # RakauRod, RakauMat, RakauArrangement, RakauSandbox
│   │   ├── lesson/     # LessonFlow, ExerciseMultiChoice, ExerciseTypedInput
│   │   ├── audio/      # AudioPlayer, useAudio
│   │   └── ui/         # MacronKeyboard
│   ├── hooks/          # useLessonSession, useImmersionMode, useRakauArrangement
│   ├── lib/            # content.ts, rakau.ts, lesson.ts
│   └── types/          # lesson.ts, rakau.ts, vocabulary.ts
├── scripts/
│   └── validate-content.ts
└── public/
    └── audio/          # vocabulary/, phrases/, karakia/, waiata/
```

## Domain Rules

- **Macrons are mandatory** — `ā ē ī ō ū` in all Māori display text
- **No "wrong answer" UX** — the app never tells a learner they are incorrect
- **Immersion** — `(learning)/` routes contain zero English
- **Audio naming** — un-macronised filenames (e.g. `kakariki.mp3`), display name from JSON

## Rod Colour Reference

| Māori | English | Length | Hex |
|---|---|---|---|
| Mā | White | 1 | `#FFFFFF` |
| Whero | Red | 2 | `#E63946` |
| Kākāriki | Light green | 3 | `#57CC99` |
| Wāteri | Purple | 4 | `#9B5DE5` |
| Kōwhai | Yellow | 5 | `#FFD166` |
| Kākāriki nui | Dark green | 6 | `#2D6A4F` |
| Mangu | Black | 7 | `#212529` |
| Parauri | Brown | 8 | `#8B5E3C` |
| Kahurangi | Blue | 9 | `#118AB2` |
| Karaka | Orange | 10 | `#F77F00` |

## Attribution

All Māori content requires review by a fluent reo Māori speaker before use in a teaching context. The Te Ataarangi methodology is the intellectual heritage of **Dr. Katerina Mataira**, **Ngoingoi Pewhairangi**, and the Te Ataarangi Trust.

## Roadmap

- **Phase 2** — Full 49-whiti curriculum, sentence builder exercises, waiata section, kaiako mode
- **Phase 3** — Spaced repetition, pronunciation guide, PWA (offline support)
- **Phase 4** — User accounts, community features, real-time kaiako dashboard

## Licence

MIT — see `LICENSE` for details. Māori content is culturally sensitive and should be used with respect for its origins.
