import type { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'

export const metadata: Metadata = {
  title: 'Ngā Ture',
}

const NGA_TURE = [
  {
    number: 1,
    maori: 'Kōrero Māori anake',
    english: 'Speak only in te reo Māori',
    detail:
      'Within the learning environment, only Māori is spoken. This is the heart of the immersive method.',
  },
  {
    number: 2,
    maori: 'Kaua e whakamāori',
    english: 'Do not translate',
    detail:
      'Meaning is discovered through context and the rods — not through English equivalents. Trust the process.',
  },
  {
    number: 3,
    maori: 'Kaua e whakaaro nui ki ngā hapa',
    english: 'Do not dwell on mistakes',
    detail:
      'Errors are a natural part of discovery. The group models the correct form — there is no failure here.',
  },
  {
    number: 4,
    maori: 'Ārahina ōu hoa',
    english: 'Support your fellow learners',
    detail:
      'The group learns together as a whānau. Encourage and support one another through the journey.',
  },
  {
    number: 5,
    maori: 'He ngākau māhaki — aroha ana',
    english: 'Approach with humility and love',
    detail:
      'Come with an open heart. The reo is a taonga — treat it with the respect and gentleness it deserves.',
  },
]

export default function NgaTurePage() {
  return (
    <>
      <Header variant="meta" />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        {/* Heading */}
        <div className="text-center mb-10">
          <p className="text-sm uppercase tracking-widest text-text-muted mb-2">
            Before you begin
          </p>
          <h1 className="text-display font-semibold text-text-primary" lang="mi">
            Ngā Ture
          </h1>
          <p className="text-text-secondary mt-3">
            The five guiding principles of Te Ataarangi learning.
          </p>
        </div>

        {/* Rules list */}
        <ol className="space-y-6 mb-12" aria-label="Ngā ture e rima">
          {NGA_TURE.map((ture) => (
            <li
              key={ture.number}
              className="flex gap-4 p-5 rounded-xl bg-surface border border-border"
            >
              <span
                className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold"
                aria-hidden="true"
              >
                {ture.number}
              </span>
              <div>
                <p className="font-semibold text-text-primary text-lg" lang="mi">
                  {ture.maori}
                </p>
                <p className="text-text-secondary text-sm italic mb-2">{ture.english}</p>
                <p className="text-text-secondary text-sm">{ture.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/whiti"
            className="inline-block px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            lang="mi"
          >
            Āe — Tīmata ana
          </Link>
          <p className="text-text-muted text-sm mt-3">Start learning · Tīmata te ako</p>
        </div>
      </main>
    </>
  )
}
