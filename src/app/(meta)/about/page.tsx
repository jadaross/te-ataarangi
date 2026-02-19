import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'

export const metadata: Metadata = {
  title: 'Mō Mātou — About',
}

/**
 * About page — English allowed (meta route).
 * Must include the Te Ataarangi attribution disclaimer.
 */
export default function AboutPage() {
  return (
    <>
      <Header variant="meta" />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-heading-1 font-semibold text-text-primary mb-6">
          <span lang="mi">Mō Mātou</span>
          <span className="text-text-muted font-normal text-heading-3 ml-3">· About</span>
        </h1>

        {/* About Te Ataarangi */}
        <section className="prose prose-sm max-w-none space-y-4 mb-10">
          <p className="text-text-secondary">
            Te Ataarangi is a Māori language learning methodology developed in Aotearoa New Zealand
            in the 1970s, built on the principles of immersive learning through silence,
            visual discovery, and community.
          </p>
          <p className="text-text-secondary">
            At its heart are the <span lang="mi" className="font-medium">rākau</span> — Cuisenaire rods
            of different colours and lengths. A <span lang="mi">kaiako</span> (teacher) arranges the
            rods on a mat without speaking. The learner observes, reflects, and responds in te reo
            Māori. No translation. No error corrections. Only discovery.
          </p>
          <p className="text-text-secondary">
            This web app brings that spirit to a digital format: rods appear one at a time on screen,
            the app waits in silence, and the learner responds. If a response is not quite right,
            the correct form is modelled through audio — never labelled as wrong.
          </p>
          <p className="text-text-secondary">
            To learn more about the official Te Ataarangi programme, including in-person courses
            and the kaiako training programme, visit{' '}
            <a
              href="https://teataarangi.org.nz"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-accent hover:text-accent/80"
            >
              teataarangi.org.nz
            </a>
            .
          </p>
        </section>

        {/* Attribution disclaimer — required per CLAUDE.md */}
        <section
          className="p-5 rounded-xl bg-surface border border-border text-sm text-text-secondary space-y-2"
          aria-label="Attribution disclaimer"
        >
          <p>
            <strong className="text-text-primary">Attribution notice:</strong> This is an
            independent community project inspired by the Te Ataarangi methodology. It is not
            an official product of the{' '}
            <a
              href="https://teataarangi.org.nz"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-text-primary"
            >
              Te Ataarangi Trust
            </a>
            .
          </p>
          <p>
            All Māori content on this site requires review by a fluent reo Māori speaker before
            use in teaching or study contexts.
          </p>
        </section>

        {/* Reo Māori section */}
        <section className="mt-10 space-y-4" aria-labelledby="maori-about-heading">
          <h2 id="maori-about-heading" className="text-heading-3 font-semibold text-text-primary" lang="mi">
            He kōrero mō tēnei kaupeka
          </h2>
          <p className="text-text-secondary" lang="mi">
            He taonga kore utu tēnei, mā te katoa. Ko te kaupeka nei i hangaia ai hei āwhina
            i ngā ākonga e hiahia ana ki te ako i te reo Māori mā ngā ara o Te Ataarangi —
            mā ngā rākau, mā te ātea, mā te kimi.
          </p>
        </section>
      </main>
    </>
  )
}
