import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'

export const metadata: Metadata = {
  title: 'Āwhina — Help',
}

/**
 * Help page — English allowed (meta route).
 * Explains how the rods work, how to navigate, and the silence principle.
 */
export default function HelpPage() {
  return (
    <>
      <Header variant="meta" />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-heading-1 font-semibold text-text-primary mb-6">
          <span lang="mi">Āwhina</span>
          <span className="text-text-muted font-normal text-heading-3 ml-3">· Help</span>
        </h1>

        <div className="space-y-10">
          {/* What are the rods */}
          <section aria-labelledby="rakau-heading">
            <h2 id="rakau-heading" className="text-heading-3 font-semibold text-text-primary mb-3">
              <span lang="mi">Ngā rākau</span> — What are the rods?
            </h2>
            <p className="text-text-secondary mb-3">
              The <span lang="mi">rākau</span> (Cuisenaire rods) are coloured rods of different
              lengths. Each colour has a Māori name and a fixed length — from{' '}
              <span lang="mi" className="font-medium">mā</span> (white, length 1) to{' '}
              <span lang="mi" className="font-medium">karaka</span> (orange, length 10).
            </p>
            <p className="text-text-secondary">
              In the Te Ataarangi methodology, a <span lang="mi">kaiako</span> (teacher) places rods
              on a woven mat silently to convey meaning. You observe, reflect, then respond in Māori.
              No dictionaries, no translations — meaning emerges through context.
            </p>
          </section>

          {/* How to navigate */}
          <section aria-labelledby="navigate-heading">
            <h2 id="navigate-heading" className="text-heading-3 font-semibold text-text-primary mb-3">
              How to navigate
            </h2>
            <ul className="space-y-3 text-text-secondary">
              <li className="flex gap-3">
                <span className="font-semibold text-accent mt-0.5">→</span>
                <span>
                  <strong className="text-text-primary" lang="mi">Ngā Whiti</strong> — lessons.
                  Each whiti introduces new vocabulary and patterns through rod arrangements.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-accent mt-0.5">→</span>
                <span>
                  <strong className="text-text-primary" lang="mi">Rākau</strong> — explore the rods
                  freely. See all colours and their Māori names.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-accent mt-0.5">→</span>
                <span>
                  <strong className="text-text-primary" lang="mi">Ngā Ture</strong> — the five
                  guiding principles of the learning approach. Read these before beginning.
                </span>
              </li>
            </ul>
          </section>

          {/* The silence principle */}
          <section aria-labelledby="silence-heading">
            <h2 id="silence-heading" className="text-heading-3 font-semibold text-text-primary mb-3">
              The silence principle
            </h2>
            <p className="text-text-secondary mb-3">
              When rods appear on the mat, the app waits silently. This is intentional. There is no
              timer, no rush. Sit with what you see and let understanding come naturally.
            </p>
            <p className="text-text-secondary mb-3">
              When you select an answer in a lesson:
            </p>
            <ul className="space-y-2 text-text-secondary ml-4">
              <li>
                <strong className="text-text-primary">Correct</strong> — the lesson advances to the
                next exercise. Audio (when available) confirms the correct form.
              </li>
              <li>
                <strong className="text-text-primary">Not quite right</strong> — the rods stay on the
                mat. The app waits silently for you to try again.
              </li>
              <li>
                <strong className="text-text-primary">After a second attempt</strong> — the lesson
                moves on. The correct form is modelled through audio. You are never told you are wrong.
              </li>
            </ul>
          </section>

          {/* Say it aloud */}
          <section aria-labelledby="speakaloud-heading">
            <h2 id="speakaloud-heading" className="text-heading-3 font-semibold text-text-primary mb-3">
              Say the words aloud
            </h2>
            <p className="text-text-secondary mb-3">
              The small microphone icon (<span lang="mi" className="font-medium">Kōrerotia</span>) at
              the top of each lesson is a reminder to say each word out loud as you practice.
            </p>
            <p className="text-text-secondary">
              Speaking aloud is central to the Te Ataarangi approach. Even when you are selecting words
              from a list, say each word as you pick it, and say the full sentence once you have built
              it. The mouth needs to learn the shape of the language, not just the eyes.
            </p>
          </section>

          {/* Audio */}
          <section aria-labelledby="audio-heading">
            <h2 id="audio-heading" className="text-heading-3 font-semibold text-text-primary mb-3">
              Audio
            </h2>
            <p className="text-text-secondary">
              Audio is never auto-played. Tap the{' '}
              <span lang="mi" className="font-medium">Whakarongo</span> (listen) button to hear
              pronunciation. Audio files are recorded by native speakers where available.
            </p>
          </section>

          {/* Bilingual note */}
          <section aria-labelledby="bilingual-heading">
            <h2 id="bilingual-heading" className="text-heading-3 font-semibold text-text-primary mb-3">
              <span lang="mi">He māramatanga</span> — A note on language
            </h2>
            <p className="text-text-secondary mb-2">
              The <strong>lesson pages</strong> (<span lang="mi">ngā whiti</span>) are entirely in
              te reo Māori — no English appears there. This immersion is intentional.
            </p>
            <p className="text-text-secondary">
              Pages outside the lessons (like this help page and the about page) use English
              where helpful. The{' '}
              <span lang="mi" className="font-medium">Ngā Ture</span> page explains the principles
              in both languages.
            </p>
          </section>
        </div>
      </main>
    </>
  )
}
