import Link from 'next/link'
import { Header } from '@/components/layout/Header'

export default function HomePage() {
  return (
    <>
      <Header variant="home" />
      <main>
        {/* Hero section */}
        <section
          className="relative px-4 sm:px-6 pt-20 pb-16 text-center overflow-hidden"
          aria-labelledby="hero-heading"
        >
          {/* Decorative kōwhaiwhai background element */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-accent-warm to-accent-gold"
          />

          {/* Whakataukī */}
          <p className="text-text-muted text-sm italic mb-8 max-w-lg mx-auto" lang="mi">
            He aha te mea nui o te ao?
            <br />
            <span className="font-medium text-text-secondary">
              He tangata, he tangata, he tangata.
            </span>
          </p>

          {/* Site name */}
          <h1
            id="hero-heading"
            className="text-display font-semibold text-text-primary mb-4"
            lang="mi"
          >
            Te Ataarangi
          </h1>

          {/* Tagline — bilingual */}
          <p className="text-heading-3 text-text-secondary mb-2" lang="mi">
            Ako i te reo Māori mā ngā rākau
          </p>
          <p className="text-text-muted text-sm mb-10">
            Learn Māori through rods, silence, and discovery — no translation, no error correction
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/nga-ture"
              className="px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors w-full sm:w-auto text-center"
            >
              Tīmata
              <span className="block text-xs font-normal opacity-80">Begin</span>
            </Link>
            <Link
              href="/rakau"
              className="px-8 py-3 bg-surface border border-border text-text-primary font-medium rounded-lg hover:bg-border/40 transition-colors w-full sm:w-auto text-center"
              lang="mi"
            >
              Tirohia ngā Rākau
              <span className="block text-xs text-text-muted">Explore the rods</span>
            </Link>
          </div>
        </section>

        {/* Rod colour preview strip */}
        <section aria-label="Ngā tae o ngā rākau — rod colour preview" className="py-6 overflow-hidden">
          <div
            className="flex gap-2 justify-center items-end px-4"
            aria-hidden="true"
          >
            {ROD_PREVIEW.map(({ colour, hex, height }) => (
              <div
                key={colour}
                style={{
                  backgroundColor: hex,
                  width: 24,
                  height,
                  borderRadius: 4,
                  border: colour === 'ma' ? '1px solid #C8C0B0' : '1px solid rgba(0,0,0,0.1)',
                  boxShadow: '1px 2px 6px rgba(0,0,0,0.15)',
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        </section>

        {/* How it works */}
        <section
          className="max-w-4xl mx-auto px-4 sm:px-6 py-14"
          aria-labelledby="how-heading"
        >
          <h2
            id="how-heading"
            className="text-heading-2 font-semibold text-text-primary mb-10 text-center"
          >
            Me pēhea e mahi ai?{' '}
            <span className="text-text-muted font-normal text-heading-3">
              · How does it work?
            </span>
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">
            <FeatureCard
              number="1"
              maori="Mātakitaki"
              english="Observe"
              description="Rods appear silently on the mat. The colour, number, and arrangement carry the meaning."
            />
            <FeatureCard
              number="2"
              maori="Whakaaro"
              english="Reflect"
              description="The app waits. No rushing. No hints. Sit with the silence and let understanding emerge."
            />
            <FeatureCard
              number="3"
              maori="Kōrero"
              english="Speak"
              description="Respond in Māori. The audio models the correct answer — you are never told you are wrong."
            />
          </div>
        </section>

        {/* Values strip */}
        <section
          className="bg-surface border-y border-border py-12 px-4 sm:px-6"
          aria-labelledby="values-heading"
        >
          <div className="max-w-4xl mx-auto">
            <h2
              id="values-heading"
              className="text-sm uppercase tracking-widest text-text-muted mb-6 text-center"
            >
              Built on Te Ataarangi values
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {VALUES.map((v) => (
                <span
                  key={v}
                  className="px-4 py-2 rounded-full bg-background border border-border text-sm text-text-secondary"
                  lang="mi"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Attribution footer note */}
        <footer className="max-w-4xl mx-auto px-4 sm:px-6 py-10 text-center">
          <p className="text-text-muted text-sm">
            This is an independent community project inspired by the Te Ataarangi methodology.
            It is not an official product of the{' '}
            <a
              href="https://teataarangi.org.nz"
              className="underline hover:text-text-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Te Ataarangi Trust
            </a>
            .
            <br />
            All Māori content should be reviewed by a fluent reo Māori speaker before use.
          </p>
          <nav className="flex justify-center gap-4 mt-6 text-sm" aria-label="Footer links">
            <Link href="/nga-ture" className="text-text-muted hover:text-text-secondary">
              Ngā Ture
            </Link>
            <Link href="/about" className="text-text-muted hover:text-text-secondary">
              Mō Mātou
            </Link>
            <Link href="/help" className="text-text-muted hover:text-text-secondary">
              Āwhina
            </Link>
          </nav>
        </footer>
      </main>
    </>
  )
}

function FeatureCard({
  number,
  maori,
  english,
  description,
}: {
  number: string
  maori: string
  english: string
  description: string
}) {
  return (
    <div className="p-6 rounded-xl bg-surface border border-border">
      <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center text-sm font-bold mb-4">
        {number}
      </div>
      <h3 className="font-semibold text-text-primary text-lg" lang="mi">
        {maori}
      </h3>
      <p className="text-sm text-text-muted italic mb-2">{english}</p>
      <p className="text-text-secondary text-sm">{description}</p>
    </div>
  )
}

const ROD_PREVIEW = [
  { colour: 'ma', hex: '#FFFFFF', height: 20 },
  { colour: 'whero', hex: '#E63946', height: 40 },
  { colour: 'kakariki', hex: '#57CC99', height: 60 },
  { colour: 'wateri', hex: '#9B5DE5', height: 80 },
  { colour: 'kowhai', hex: '#FFD166', height: 100 },
  { colour: 'kakariki-nui', hex: '#2D6A4F', height: 120 },
  { colour: 'mangu', hex: '#212529', height: 140 },
  { colour: 'parauri', hex: '#8B5E3C', height: 160 },
  { colour: 'kahurangi', hex: '#118AB2', height: 180 },
  { colour: 'karaka', hex: '#F77F00', height: 200 },
]

const VALUES = [
  'Mana tangata',
  'Āko',
  'Ngākau māhaki',
  'Whanaungatanga',
  'Immersion',
  'Silence as teacher',
  'Discovery',
  'Tikanga',
]
