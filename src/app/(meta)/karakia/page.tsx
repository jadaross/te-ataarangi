import { Header } from '@/components/layout/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Karakia — Te Ataarangi',
  description: 'Opening and closing karakia used in Te Ataarangi learning, with translations and cultural context.',
}

interface KarakiaEntry {
  slug: string
  title: string
  subtitle: string
  when: string
  lines: { maori: string; english: string }[]
  context: string
}

const KARAKIA: KarakiaEntry[] = [
  {
    slug: 'whakataka-te-hau',
    title: 'Whakataka te hau',
    subtitle: 'Opening karakia — used to begin a gathering or learning session',
    when: 'Recited at the start of a hui, class, or any significant undertaking. It calls for calm, clarity, and unity before learning begins.',
    lines: [
      { maori: 'Whakataka te hau ki uta,', english: 'Cease the winds from the west,' },
      { maori: 'Whakataka te hau ki tai.', english: 'Cease the winds from the sea.' },
      { maori: 'Kia mākinakina ki uta,', english: 'Let the breeze blow over the land,' },
      { maori: 'Kia mātaratara ki tai.', english: 'Let the breeze blow over the ocean.' },
      { maori: 'E hī ake ana te atakura.', english: 'Let the red-tipped dawn come with a sharpened air.' },
      { maori: 'He tio, he huka, he hau hū!', english: 'A touch of frost, a touch of snow,' },
      { maori: 'Tūturu o whiti whakamaua', english: 'Let it materialise and be firmly fixed' },
      { maori: 'Kia tīna! Hui e! Tāiki e!', english: 'as the heavens above are firmly fixed.' },
    ],
    context:
      'Whakataka te hau is one of the most widely known karakia in Aotearoa. It draws on natural imagery — wind, sea, frost, and dawn — to invite a state of stillness and readiness. The closing phrase "Tūturu o whiti" grounds the gathering in purpose.',
  },
  {
    slug: 'unuhia',
    title: 'Unuhia, unuhia',
    subtitle: 'Closing karakia — used to end a session or gathering',
    when: 'Said at the end of a class, hui, or meal. It releases the tapu (sacred state) of the gathering and returns participants to everyday life.',
    lines: [
      { maori: 'Unuhia, unuhia,', english: 'Remove, remove,' },
      { maori: 'Unuhia ki uta rā,', english: 'Remove to the distant shore,' },
      { maori: 'Āe rā.', english: 'Yes indeed.' },
      { maori: 'Hui e, hui e, hui e,', english: 'Bind together,' },
      { maori: 'Tāiki e!', english: 'Be firmly fixed!' },
    ],
    context:
      'A shorter, widely used closing karakia. "Unuhia" means to lift or remove — it lifts the sacred state of the gathering. "Tāiki e" is a collective affirmation that binds participants together before they part.',
  },
  {
    slug: 'nau-mai-e-nga-hua',
    title: 'Nau mai, e ngā hua',
    subtitle: 'Kai karakia — said before eating',
    when: 'Recited before a meal, especially at a shared table (hākari). Giving thanks before eating is an expression of gratitude and humility.',
    lines: [
      { maori: 'Nau mai, e ngā hua o Papatūānuku,', english: 'Welcome, the fruits of Papatūānuku,' },
      { maori: 'E ngā hua o Ranginui,', english: 'The fruits of Ranginui,' },
      { maori: 'E ngā hua o ō tātou māra,', english: 'The fruits of our gardens,' },
      { maori: 'Nau mai, nau mai, nau mai.', english: 'Welcome, welcome, welcome.' },
    ],
    context:
      'Papatūānuku is the earth mother; Ranginui is the sky father. This karakia acknowledges the earth and sky as the ultimate source of all food. It is a reminder that eating is a gift, not a right.',
  },
  {
    slug: 'ka-tuku-iho',
    title: 'Ka tuku iho',
    subtitle: 'Short opening karakia — good for beginners',
    when: 'A brief karakia appropriate for daily use, small gatherings, or as a first karakia to learn. Its simplicity makes it easy to memorise.',
    lines: [
      { maori: 'Ka tuku iho, ka tuku iho.', english: 'It descends, it descends.' },
      { maori: 'Ko te mana,', english: 'The mana,' },
      { maori: 'Ko te tapu,', english: 'The tapu,' },
      { maori: 'Ko te wehi o tēnei hui.', english: 'The reverence of this gathering.' },
      { maori: 'Tūturu o whiti!', english: 'Let it be firmly established!' },
    ],
    context:
      'A gentle, accessible opening. "Ka tuku iho" invokes the qualities of mana and tapu descending upon the gathering. A good starting karakia for learners new to karakia practice.',
  },
]

export default function KarakiaPage() {
  return (
    <>
      <Header variant="meta" />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Page header */}
        <header className="mb-12 text-center">
          <h1 className="text-display font-semibold text-text-primary mb-3" lang="mi">
            Karakia
          </h1>
          <p className="text-text-secondary text-lg mb-4">Opening and closing prayers</p>
          <p className="text-text-muted text-sm max-w-lg mx-auto">
            Karakia are invocations that mark the beginning and end of gatherings, meals, and any
            significant undertaking. They create a shared, focused space and connect participants
            to something larger than themselves.
          </p>
        </header>

        {/* What is a karakia */}
        <section
          className="bg-surface border border-border rounded-xl p-6 mb-10"
          aria-labelledby="what-heading"
        >
          <h2 id="what-heading" className="font-semibold text-text-primary mb-3">
            What is a karakia?
          </h2>
          <p className="text-text-secondary text-sm mb-3">
            A karakia is not a prayer in the religious sense — it is more of a focused incantation
            or invocation. Karakia mark transitions: from everyday life into a state of purpose,
            and back again. They acknowledge the spiritual dimensions of what we do and create a
            collective mindset for learning or gathering.
          </p>
          <p className="text-text-secondary text-sm mb-3">
            In a Te Ataarangi class, karakia are used to open and close each session. The opening
            karakia settles the group and signals the start of immersion. The closing karakia
            releases the tapu of the learning space.
          </p>
          <p className="text-text-secondary text-sm">
            Even if you are new to te reo Māori, saying a karakia aloud — imperfectly — is more
            respectful than not saying one at all. The effort is what matters.
          </p>
        </section>

        {/* How to use */}
        <section className="mb-10" aria-labelledby="how-heading">
          <h2 id="how-heading" className="text-heading-2 font-semibold text-text-primary mb-5">
            How to use these karakia
          </h2>
          <ol className="space-y-3">
            {[
              'Read through the full karakia slowly, line by line.',
              'Say each Māori line aloud before reading the English — let the sounds come first.',
              'Notice the imagery and the feeling each line creates.',
              'Practise until you can say it from memory — this is how karakia are traditionally passed on.',
              'Use it. Open your next learning session with "Whakataka te hau" and close with "Unuhia".',
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

        {/* Karakia cards */}
        <section aria-labelledby="karakia-heading" className="space-y-10">
          <h2 id="karakia-heading" className="sr-only">
            Karakia
          </h2>
          {KARAKIA.map((k) => (
            <article
              key={k.slug}
              className="border border-border rounded-xl overflow-hidden"
              aria-labelledby={`karakia-${k.slug}`}
            >
              {/* Card header */}
              <div className="bg-surface px-6 py-5 border-b border-border">
                <h3
                  id={`karakia-${k.slug}`}
                  className="text-heading-3 font-semibold text-text-primary mb-1"
                  lang="mi"
                >
                  {k.title}
                </h3>
                <p className="text-sm text-text-muted">{k.subtitle}</p>
              </div>

              {/* When to use */}
              <div className="px-6 py-4 bg-accent/5 border-b border-border">
                <p className="text-xs text-text-muted uppercase tracking-wide font-medium mb-1">
                  When to use
                </p>
                <p className="text-sm text-text-secondary">{k.when}</p>
              </div>

              {/* Lines */}
              <div className="px-6 py-5">
                <div className="space-y-3" role="list" lang="mi">
                  {k.lines.map((line, i) => (
                    <div key={i} role="listitem" className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 sm:gap-4">
                      <p className="font-medium text-text-primary text-sm">{line.maori}</p>
                      <p className="text-text-muted text-sm italic">{line.english}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cultural context */}
              <div className="px-6 py-4 bg-surface border-t border-border">
                <p className="text-xs text-text-muted uppercase tracking-wide font-medium mb-2">
                  Cultural context
                </p>
                <p className="text-sm text-text-secondary">{k.context}</p>
              </div>
            </article>
          ))}
        </section>

        {/* Attribution */}
        <footer className="mt-14 pt-6 border-t border-border text-center">
          <p className="text-text-muted text-xs max-w-md mx-auto">
            These karakia are part of the living tradition of te reo Māori and belong to the people
            who carry them. They are shared here for educational purposes. Please treat them with
            respect.
          </p>
        </footer>
      </main>
    </>
  )
}
