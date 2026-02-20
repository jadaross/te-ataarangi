import { Header } from '@/components/layout/Header'
import { PepehaBuilder } from '@/components/pepeha/PepehaBuilder'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pepeha — Te Ataarangi',
  description: 'Build your own pepeha — the traditional Māori way of introducing yourself by connecting to land, waterways, and people.',
}

export default function PepehaPage() {
  return (
    <>
      <Header variant="meta" />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Page header */}
        <header className="mb-10">
          <h1 className="text-display font-semibold text-text-primary mb-3" lang="mi">
            Pepeha
          </h1>
          <p className="text-text-secondary text-lg mb-4">
            Your connection to land, water, and people
          </p>
          <p className="text-text-muted text-sm max-w-2xl">
            A pepeha is a traditional Māori way of introducing yourself — not by what you do, but
            by where you come from. It connects you to your mountain, your river, your canoe, your
            people. Fill in the fields below to see your pepeha take shape.
          </p>
        </header>

        {/* Cultural note */}
        <div className="bg-surface border border-border rounded-xl p-5 mb-10">
          <h2 className="font-semibold text-text-primary mb-2">A note for non-Māori learners</h2>
          <p className="text-sm text-text-secondary mb-2">
            If you are not Māori, you can still build a pepeha — but it is important to approach it
            with care. A pepeha is not a one-size-fits-all introduction. For tangata whenua (people
            of the land), each line carries deep genealogical meaning tied to specific ancestors and
            tribal lands.
          </p>
          <p className="text-sm text-text-secondary mb-2">
            As a learner, you might use your geographical connections (the mountain you grew up
            near, the river of your hometown) and adapt lines where your heritage differs. Some
            people note which lines are not applicable to their background — that honesty is
            respected.
          </p>
          <p className="text-sm text-text-secondary">
            The best approach: if you have Māori colleagues, friends, or whānau, ask them to
            help you build and practise your pepeha. It becomes much more meaningful through
            relationship.
          </p>
        </div>

        {/* What each line means */}
        <section className="mb-10" aria-labelledby="structure-heading">
          <h2
            id="structure-heading"
            className="text-heading-2 font-semibold text-text-primary mb-5"
          >
            The structure of a pepeha
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              {
                maori: 'Ko [maunga] tōku maunga',
                english: '[Mountain] is my mountain',
                why: 'Mountains are the first landmark — ancestral sentinels that watch over the land.',
              },
              {
                maori: 'Ko [awa] tōku awa',
                english: '[River] is my river',
                why: 'Rivers connect mountains to the sea and sustain life — a symbol of continuity.',
              },
              {
                maori: 'Ko [waka] tōku waka',
                english: '[Waka] is my canoe',
                why: 'The ancestral vessel that brought your people to Aotearoa — your origin voyage.',
              },
              {
                maori: 'Ko [iwi] tōku iwi',
                english: '[Iwi] is my tribe',
                why: 'Your broader tribal group — the largest people-group you belong to.',
              },
              {
                maori: 'Ko [hapū] tōku hapū',
                english: '[Hapū] is my sub-tribe',
                why: 'A smaller, closer grouping within the iwi — your more immediate community.',
              },
              {
                maori: 'Ko [marae] tōku marae',
                english: '[Marae] is my marae',
                why: 'The gathering place — the heart of your community\'s life and traditions.',
              },
              {
                maori: 'Ko [tūpuna] tōku tūpuna',
                english: '[Ancestor] is my ancestor',
                why: 'An important founding ancestor who represents your genealogical line.',
              },
              {
                maori: 'Ko [ingoa] tōku ingoa',
                english: '[Name] is my name',
                why: 'Finally — you identify yourself. The pepeha establishes where you come from before who you are.',
              },
            ].map((line, i) => (
              <div key={i} className="border border-border rounded-lg p-4">
                <p className="font-medium text-text-primary text-sm mb-0.5" lang="mi">
                  {line.maori}
                </p>
                <p className="text-xs text-text-muted italic mb-2">{line.english}</p>
                <p className="text-xs text-text-secondary">{line.why}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The builder */}
        <section aria-labelledby="builder-heading">
          <h2
            id="builder-heading"
            className="text-heading-2 font-semibold text-text-primary mb-6"
          >
            Build your pepeha
          </h2>
          <PepehaBuilder />
        </section>

        {/* What to do with it */}
        <section
          className="mt-14 bg-surface border border-border rounded-xl p-6"
          aria-labelledby="next-heading"
        >
          <h2 id="next-heading" className="font-semibold text-text-primary mb-3">
            What to do with your pepeha
          </h2>
          <ol className="space-y-3">
            {[
              'Say it out loud. Slowly. Pause between each line.',
              'Record yourself saying it — hearing your own voice is powerful.',
              'Practise until you can say it from memory, without looking.',
              'Use it. Introduce yourself with your pepeha at the next meeting, hui, or gathering you attend.',
              'If you\'re not sure of some lines, ask someone who knows your whakapapa — this is a living document, not a form to fill in.',
            ].map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-text-secondary">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        {/* Attribution */}
        <footer className="mt-10 text-center">
          <p className="text-text-muted text-xs max-w-md mx-auto">
            Pepeha belong to their people. The structure shown here is a common form —
            regional and whānau variations exist. If in doubt, consult with someone who
            knows your whakapapa.
          </p>
        </footer>
      </main>
    </>
  )
}
