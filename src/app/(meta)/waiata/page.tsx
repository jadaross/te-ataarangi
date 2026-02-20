import type { Metadata } from 'next'
import { Header } from '@/components/layout/Header'

export const metadata: Metadata = {
  title: 'Waiata — Songs',
}

const waiata = [
  {
    id: 'te-aroha',
    title: 'Te Aroha',
    subtitle: 'Love, Faith, and Peace',
    difficulty: 'Tīmata · Beginner',
    difficultyColour: '#57CC99',
    intro:
      'The most widely used waiata in Te Ataarangi classrooms. Short, simple, and deeply meaningful — it is traditionally sung to open or close a gathering. Four lines, four big concepts. Perfect first waiata.',
    culturalNote:
      'This waiata is a modern composition that has become a cornerstone of contemporary Māori gatherings (hui). It expresses the three values of love (aroha), faith (whakapono) and peace (rangimārie) — values central to how the Te Ataarangi whānau learn together.',
    lyrics: [
      { maori: 'Te Aroha', english: 'Love' },
      { maori: 'Te Whakapono', english: 'Faith' },
      { maori: 'Me te Rangimārie', english: 'And peace' },
      { maori: 'Tātou, tātou e', english: 'All of us, together' },
    ],
    vocabHighlights: [
      { word: 'Aroha', meaning: 'love, compassion' },
      { word: 'Whakapono', meaning: 'faith, belief, to affirm' },
      { word: 'Rangimārie', meaning: 'peace, tranquility' },
      { word: 'Tātou', meaning: 'all of us (three or more, inclusive)' },
    ],
    searchTip: 'Search "Te Aroha waiata" on YouTube for many versions — from children\'s classrooms to marae gatherings.',
  },
  {
    id: 'tutira-mai',
    title: 'Tūtira Mai Ngā Iwi',
    subtitle: 'Stand Together, All Peoples',
    difficulty: 'Waenganui · Intermediate',
    difficultyColour: '#FFD166',
    intro:
      'One of the most recognised Māori songs in Aotearoa. Originally composed by Tāhūrangi and Āraiteuru, it calls all peoples to stand together and seek wisdom, light, and love. Sung at schools, sports events, and national occasions.',
    culturalNote:
      'Written in the early 20th century, this song transcended its original context to become a national anthem of unity and aspiration. The imagery of standing in rows (tūtira) draws on the idea of solidarity — standing shoulder to shoulder as one people.',
    lyrics: [
      { maori: 'Tūtira mai ngā iwi', english: 'Stand in rows, O peoples' },
      { maori: 'Tātou, tātou e', english: 'All of us together' },
      { maori: 'Whaia te māramatanga', english: 'Seek the light / enlightenment' },
      { maori: 'Me te aroha e', english: 'And love' },
      { maori: 'Ngā iwi e', english: 'O peoples' },
    ],
    vocabHighlights: [
      { word: 'Tūtira', meaning: 'to stand in a line or row' },
      { word: 'Iwi', meaning: 'people, tribe, nation' },
      { word: 'Māramatanga', meaning: 'enlightenment, clarity, understanding' },
      { word: 'Whaia', meaning: 'seek, pursue (imperative)' },
    ],
    searchTip: 'Search "Tūtira Mai Ngā Iwi" — versions by Māori Television, school choirs, and the NZ Army Band are all online.',
  },
  {
    id: 'po-atarau',
    title: 'Pō Atarau',
    subtitle: 'Now Is the Hour — A Farewell Song',
    difficulty: 'Waenganui · Intermediate',
    difficultyColour: '#FFD166',
    intro:
      'A traditional farewell waiata. Known internationally as "Now Is the Hour," the Māori version speaks of the gentle night, of parting, and of love that remains across distance. Often sung at the end of a lesson, hui, or gathering.',
    culturalNote:
      'The melody has both Māori and European origins and became famous when sung by Gracie Fields and Bing Crosby. The Māori lyrics are deeply poetic, evoking the soft moonlit night (pō atarau) and a heartfelt farewell. It is sung at many significant partings — end of school term, graduation, tangi.',
    lyrics: [
      { maori: 'Pō atarau', english: 'Moonlit night' },
      { maori: 'E hine e', english: 'O young woman' },
      { maori: 'Hoki mai rā', english: 'Please return' },
      { maori: 'Ka ngaro ake nei', english: 'Now disappearing from sight' },
      { maori: 'Tō āroha', english: 'Your love' },
    ],
    vocabHighlights: [
      { word: 'Pō', meaning: 'night' },
      { word: 'Atarau', meaning: 'moonlit, gentle moonlight' },
      { word: 'Hoki mai', meaning: 'return, come back' },
      { word: 'Ngaro', meaning: 'lost, gone, disappeared' },
    ],
    searchTip: 'Search "Pō Atarau" or "Now is the Hour Māori" — Māori Television has beautiful archival performances.',
  },
  {
    id: 'e-toru-nga-mea',
    title: 'E Toru Ngā Mea',
    subtitle: 'Three Things',
    difficulty: 'Tīmata · Beginner',
    difficultyColour: '#57CC99',
    intro:
      'Short, memorable, and musically simple — E Toru Ngā Mea lists three great things: faith, hope, and love. Great for beginners because it uses repetitive structure and vocabulary that overlaps with other lessons.',
    culturalNote:
      'Based on 1 Corinthians 13:13, this waiata shows the deep connection between te reo Māori and the Christian faith that spread through Aotearoa in the 19th century. Many treasured waiata draw on this tradition.',
    lyrics: [
      { maori: 'E toru ngā mea nui', english: 'There are three great things' },
      { maori: 'Ko te whakapono', english: 'Faith' },
      { maori: 'Ko te tūmanako', english: 'Hope' },
      { maori: 'Ko te aroha', english: 'Love' },
      { maori: 'Ēnei mea e toru', english: 'These three things' },
      { maori: 'Ko te aroha te mea nui', english: 'Love is the greatest' },
    ],
    vocabHighlights: [
      { word: 'E toru', meaning: 'three (of something)' },
      { word: 'Mea', meaning: 'thing, something' },
      { word: 'Nui', meaning: 'great, large, important' },
      { word: 'Tūmanako', meaning: 'hope, expectation' },
    ],
    searchTip: 'Search "E Toru Ngā Mea waiata" — commonly taught in schools and Te Ataarangi classes.',
  },
]

const resources = [
  {
    name: 'Te Aka Māori Dictionary',
    description: 'The most comprehensive online Māori–English dictionary. Look up any word you encounter in a waiata.',
    url: 'https://maoridictionary.co.nz',
    urlDisplay: 'maoridictionary.co.nz',
  },
  {
    name: 'Māori Television',
    description: 'A rich archive of waiata performances, language programming, and cultural content — all free to watch.',
    url: 'https://www.maoritelevision.com',
    urlDisplay: 'maoritelevision.com',
  },
  {
    name: 'Te Taura Whiri i te Reo Māori',
    description: "The Māori Language Commission — resources, pronunciation guides, and language planning for learners.",
    url: 'https://www.tetaurawhiri.govt.nz',
    urlDisplay: 'tetaurawhiri.govt.nz',
  },
  {
    name: 'Te Ara — The Encyclopedia of New Zealand',
    description: 'In-depth articles on waiata, Māori music traditions, and the cultural history behind the songs.',
    url: 'https://teara.govt.nz',
    urlDisplay: 'teara.govt.nz',
  },
]

export default function WaiataPage() {
  return (
    <>
      <Header variant="meta" />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">

        {/* Page heading */}
        <h1 className="text-heading-1 font-semibold text-text-primary mb-2">
          <span lang="mi">Waiata</span>
          <span className="text-text-muted font-normal text-heading-3 ml-3">· Songs</span>
        </h1>
        <p className="text-text-secondary mb-10 max-w-xl">
          Waiata are one of the most powerful ways to absorb te reo Māori. A melody carries words
          into memory differently from a textbook. Here are four essential songs with lyrics,
          translations, and tips for learning them.
        </p>

        {/* Why waiata */}
        <section className="mb-12 p-6 rounded-2xl bg-surface border border-border" aria-labelledby="why-heading">
          <h2 id="why-heading" className="text-heading-3 font-semibold text-text-primary mb-4">
            Why waiata works for language learning
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: '🎵',
                title: 'Melody locks in vocabulary',
                body: 'Rhythm and melody create stronger memory traces than reading alone. Words you sing are words you remember — even years later.',
              },
              {
                icon: '🔁',
                title: 'Repetition without boredom',
                body: "Most waiata have a simple structure that repeats. You'll hear the same patterns many times, which is exactly how language acquisition works.",
              },
              {
                icon: '🤝',
                title: 'Community and connection',
                body: "Waiata are rarely sung alone. Learning a song you can sing with others connects you to the living community of reo Māori speakers.",
              },
              {
                icon: '🌿',
                title: 'Cultural grounding',
                body: "Every waiata carries tikanga — values, history, relationships. Learning the song means learning what it means to its people, not just the words.",
              },
            ].map((point) => (
              <div key={point.title} className="flex gap-3">
                <span className="text-xl shrink-0 mt-0.5" aria-hidden="true">{point.icon}</span>
                <div>
                  <p className="font-semibold text-text-primary text-sm mb-1">{point.title}</p>
                  <p className="text-text-secondary text-sm">{point.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How to use this page */}
        <section className="mb-12" aria-labelledby="how-heading">
          <h2 id="how-heading" className="text-heading-3 font-semibold text-text-primary mb-3">
            How to learn a waiata
          </h2>
          <ol className="space-y-2 text-text-secondary">
            {[
              'Read the lyrics aloud slowly — say each Māori word before worrying about the tune.',
              'Look at the English alongside. Don\'t memorise the translation — just use it to understand the meaning.',
              "Listen to a recording (links are in each card below). Hear the rhythm and melody.",
              'Sing along, even quietly, even badly. Especially badly.',
              'Focus on one line at a time until it feels natural, then add the next.',
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className="shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center bg-surface border border-border text-text-muted"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <span className="text-sm">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Waiata cards */}
        <section aria-labelledby="waiata-heading">
          <h2 id="waiata-heading" className="text-heading-3 font-semibold text-text-primary mb-6">
            Featured waiata
          </h2>
          <div className="space-y-8">
            {waiata.map((song) => (
              <article
                key={song.id}
                className="rounded-2xl border border-border overflow-hidden"
                aria-labelledby={`${song.id}-heading`}
              >
                {/* Card header */}
                <div className="px-6 pt-6 pb-4 border-b border-border">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h3 id={`${song.id}-heading`} className="text-lg font-semibold text-text-primary" lang="mi">
                        {song.title}
                      </h3>
                      <p className="text-text-secondary text-sm mt-0.5">{song.subtitle}</p>
                    </div>
                    <span
                      className="shrink-0 px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{ backgroundColor: song.difficultyColour + '22', color: song.difficultyColour === '#57CC99' ? '#1a7a4a' : '#7a5800' }}
                      lang="mi"
                    >
                      {song.difficulty}
                    </span>
                  </div>
                  <p className="text-text-secondary text-sm mt-3">{song.intro}</p>
                </div>

                <div className="px-6 py-5 grid sm:grid-cols-2 gap-6">
                  {/* Lyrics */}
                  <div>
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">Kupu · Lyrics</p>
                    <div className="space-y-1">
                      {song.lyrics.map((line, i) => (
                        <div key={i} className="flex gap-4 text-sm">
                          <span lang="mi" className="text-text-primary font-medium min-w-0 flex-1">{line.maori}</span>
                          <span className="text-text-muted shrink-0 text-right">{line.english}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Vocabulary */}
                  <div>
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">Kupu hou · Key words</p>
                    <div className="space-y-2">
                      {song.vocabHighlights.map((v) => (
                        <div key={v.word} className="flex items-baseline gap-2 text-sm">
                          <span lang="mi" className="font-semibold text-text-primary shrink-0">{v.word}</span>
                          <span className="text-text-muted">—</span>
                          <span className="text-text-secondary">{v.meaning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Cultural note */}
                <div className="px-6 pb-4">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">He kōrero — Context</p>
                  <p className="text-text-secondary text-sm">{song.culturalNote}</p>
                </div>

                {/* Search tip */}
                <div className="px-6 py-3 bg-surface border-t border-border rounded-b-2xl">
                  <p className="text-text-muted text-xs">
                    <strong className="text-text-secondary">Find it online: </strong>
                    {song.searchTip}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="mt-12 mb-12" aria-labelledby="tips-heading">
          <h2 id="tips-heading" className="text-heading-3 font-semibold text-text-primary mb-4">
            Tips for singing in te reo Māori
          </h2>
          <div className="space-y-3 text-text-secondary text-sm">
            <p>
              <strong className="text-text-primary">Vowels are pure.</strong> Every vowel in Māori sounds the same every
              time: <span lang="mi">a</span> = "ah", <span lang="mi">e</span> = "eh", <span lang="mi">i</span> = "ee",{' '}
              <span lang="mi">o</span> = "oh", <span lang="mi">u</span> = "oo". In song, these ring out clearly — which
              makes waiata a great way to train your ear for Māori pronunciation.
            </p>
            <p>
              <strong className="text-text-primary">Macrons stretch the vowel.</strong> A tohutō (macron) over a vowel —
              like <span lang="mi">ā</span>, <span lang="mi">ō</span>, <span lang="mi">ū</span> — means it is held for
              longer. In a melody this happens naturally: the macron syllable usually lands on a longer or
              higher note.
            </p>
            <p>
              <strong className="text-text-primary">Don&apos;t rush.</strong> Waiata are rarely fast. Let each syllable
              have its full space. Rushing leads to swallowed vowels — the most common pronunciation mistake.
            </p>
            <p>
              <strong className="text-text-primary">Sing it in the shower.</strong> Seriously. Repetition in a low-stakes
              environment is exactly how language embeds itself. No one is listening. Commit.
            </p>
          </div>
        </section>

        {/* Resources */}
        <section aria-labelledby="resources-heading">
          <h2 id="resources-heading" className="text-heading-3 font-semibold text-text-primary mb-4">
            Resources to go deeper
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {resources.map((r) => (
              <a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-xl border border-border hover:border-accent hover:bg-surface transition-colors group"
              >
                <p className="font-semibold text-text-primary text-sm group-hover:text-accent transition-colors mb-1">
                  {r.name} ↗
                </p>
                <p className="text-text-muted text-xs mb-2">{r.urlDisplay}</p>
                <p className="text-text-secondary text-sm">{r.description}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Footer note */}
        <p className="mt-12 text-text-muted text-sm border-t border-border pt-6">
          Waiata lyrics shown here are excerpts used for educational purposes. Recordings are owned by
          their respective artists and rights holders — please support them by streaming through official
          channels.
        </p>
      </main>
    </>
  )
}
