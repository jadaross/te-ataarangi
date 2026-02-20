import { Header } from '@/components/layout/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kupu o ia rā — Te Ataarangi',
  description: 'Everyday Māori phrases you can start using today — greetings, farewells, feelings, and more.',
}

interface Phrase {
  maori: string
  english: string
  notes?: string
  pronunciation?: string
}

interface Group {
  title: string
  titleEnglish: string
  icon: string
  phrases: Phrase[]
}

const PHRASE_GROUPS: Group[] = [
  {
    title: 'Ngā Mihi',
    titleEnglish: 'Greetings',
    icon: '👋',
    phrases: [
      {
        maori: 'Kia ora',
        english: 'Hello / Thank you',
        notes: 'The most versatile greeting in te reo Māori. Works any time of day, for one or many people.',
        pronunciation: 'kee-ah OH-rah',
      },
      {
        maori: 'Kia ora kōrua',
        english: 'Hello (to two people)',
        pronunciation: 'kee-ah OH-rah KOH-roo-ah',
      },
      {
        maori: 'Kia ora koutou',
        english: 'Hello (to three or more people)',
        pronunciation: 'kee-ah OH-rah KOH-toh',
      },
      {
        maori: 'Mōrena',
        english: 'Good morning',
        notes: 'Used specifically in the morning. Often heard at the start of school days and hui.',
        pronunciation: 'moh-REH-nah',
      },
      {
        maori: 'Tēnā koe',
        english: 'Greetings to you (formal)',
        notes: 'More formal than "Kia ora". Often used in written correspondence.',
        pronunciation: 'TEH-nah KOH-eh',
      },
      {
        maori: 'Tēnā kōrua',
        english: 'Greetings to you two (formal)',
        pronunciation: 'TEH-nah KOH-roo-ah',
      },
      {
        maori: 'Tēnā koutou',
        english: 'Greetings to you all (formal)',
        pronunciation: 'TEH-nah KOH-toh',
      },
      {
        maori: 'Nau mai, haere mai',
        english: 'Welcome, come here',
        notes: 'Traditional welcoming phrase — you\'ll hear this at the start of any gathering.',
        pronunciation: 'nah-OO my, hah-EH-reh my',
      },
    ],
  },
  {
    title: 'Ngā Poroporoākī',
    titleEnglish: 'Farewells',
    icon: '✌️',
    phrases: [
      {
        maori: 'Ka kite anō',
        english: 'See you again',
        notes: 'The everyday farewell. Can be shortened to "Ka kite".',
        pronunciation: 'kah KEE-teh ah-NOH',
      },
      {
        maori: 'Ka kite āpōpō',
        english: 'See you tomorrow',
        pronunciation: 'kah KEE-teh AH-poh-poh',
      },
      {
        maori: 'Haere rā',
        english: 'Farewell (to the person leaving)',
        notes: 'Said by those who stay to those who leave. The person leaving says "E noho rā".',
        pronunciation: 'hah-EH-reh RAH',
      },
      {
        maori: 'E noho rā',
        english: 'Farewell (to those staying)',
        notes: 'Said by the person leaving to those who remain.',
        pronunciation: 'eh NOH-hoh RAH',
      },
      {
        maori: 'Pō mārie',
        english: 'Good night / peaceful night',
        pronunciation: 'poh MAH-ree-eh',
      },
      {
        maori: 'Ā tōna wā',
        english: 'In due time / see you around',
        notes: 'A relaxed, open-ended farewell. No pressure on when you\'ll meet again.',
        pronunciation: 'ah TOH-nah WAH',
      },
    ],
  },
  {
    title: 'He Kōrero Whakautu',
    titleEnglish: 'Responses & Agreement',
    icon: '🗣️',
    phrases: [
      {
        maori: 'Āe',
        english: 'Yes',
        pronunciation: 'AH-eh',
      },
      {
        maori: 'Kāo',
        english: 'No',
        pronunciation: 'KAH-oh',
      },
      {
        maori: 'Ka pai',
        english: 'Good / well done',
        notes: 'Everyday expression of approval. Works as a standalone or in a sentence.',
        pronunciation: 'kah PY',
      },
      {
        maori: 'Tino pai',
        english: 'Very good / excellent',
        pronunciation: 'TEE-noh PY',
      },
      {
        maori: 'Āe, tino pai!',
        english: 'Yes, very good!',
        pronunciation: 'AH-eh, TEE-noh PY',
      },
      {
        maori: 'E hoa',
        english: 'Friend / mate (as a form of address)',
        notes: 'Friendly, casual way to address someone. "E hoa mā" means "friends" (plural).',
        pronunciation: 'eh HOH-ah',
      },
      {
        maori: 'Kāore he tikanga',
        english: 'It doesn\'t matter / no worries',
        pronunciation: 'KAH-oh-reh heh TEE-kah-ngah',
      },
      {
        maori: 'He aha tō ingoa?',
        english: 'What is your name?',
        pronunciation: 'heh AH-hah toh ee-NGOH-ah',
      },
      {
        maori: 'Ko [ingoa] tōku ingoa',
        english: 'My name is [name]',
        notes: 'Replace [ingoa] with your own name.',
        pronunciation: 'koh ... TOH-koo ee-NGOH-ah',
      },
    ],
  },
  {
    title: 'I Tō Kāinga',
    titleEnglish: 'At Home',
    icon: '🏡',
    phrases: [
      {
        maori: 'Haere mai',
        english: 'Come here / come in',
        notes: 'An invitation to approach or enter. Frequently used to welcome people.',
        pronunciation: 'hah-EH-reh MY',
      },
      {
        maori: 'Noho mai',
        english: 'Stay / sit down / remain',
        pronunciation: 'NOH-hoh MY',
      },
      {
        maori: 'Tūturu',
        english: 'Sit still / stay put',
        notes: 'Often said to children who need to settle.',
        pronunciation: 'TOO-too-roo',
      },
      {
        maori: 'Inu!',
        english: 'Drink!',
        pronunciation: 'EE-noo',
      },
      {
        maori: 'Kai!',
        english: 'Eat! / Food',
        notes: '"Kai" means both "eat" and "food" depending on context.',
        pronunciation: 'KY',
      },
      {
        maori: 'Me kai tāua',
        english: 'Let\'s eat (just the two of us)',
        pronunciation: 'meh KY TAH-oo-ah',
      },
      {
        maori: 'Me moe',
        english: 'Time to sleep',
        pronunciation: 'meh MOH-eh',
      },
      {
        maori: 'Rite ana',
        english: 'Ready / done',
        pronunciation: 'REE-teh AH-nah',
      },
    ],
  },
  {
    title: 'He Kupu Whakamāui',
    titleEnglish: 'Encouragement & Strength',
    icon: '💪',
    phrases: [
      {
        maori: 'Kia kaha',
        english: 'Be strong / stay strong',
        notes: 'One of the most widely known phrases. Used as encouragement in difficult times and as a rallying call.',
        pronunciation: 'kee-ah KAH-hah',
      },
      {
        maori: 'Kia māia',
        english: 'Be brave / be bold',
        pronunciation: 'kee-ah MAH-ee-ah',
      },
      {
        maori: 'Kia tūpato',
        english: 'Be careful / take care',
        pronunciation: 'kee-ah TOO-pah-toh',
      },
      {
        maori: 'Āku mihi ki a koe',
        english: 'My regards to you',
        pronunciation: 'AH-koo MEE-hee kee ah KOH-eh',
      },
      {
        maori: 'Mā te wā',
        english: 'In time / it will come in time',
        notes: 'A gentle reminder that good things take time. No rush.',
        pronunciation: 'mah teh WAH',
      },
      {
        maori: 'He aha te mea nui?',
        english: 'What is the most important thing?',
        notes: 'The start of a famous whakataukī (proverb): the answer is "he tangata" — the people.',
        pronunciation: 'heh AH-hah teh MEH-ah NOO-ee',
      },
    ],
  },
]

export default function KupuPage() {
  return (
    <>
      <Header variant="meta" />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Page header */}
        <header className="mb-10 text-center">
          <h1 className="text-display font-semibold text-text-primary mb-2" lang="mi">
            Kupu o ia rā
          </h1>
          <p className="text-text-secondary text-lg mb-4">Everyday phrases to use right now</p>
          <p className="text-text-muted text-sm max-w-lg mx-auto">
            You don't need to wait until you're fluent. These phrases can go straight into your
            daily life — greetings, farewells, at home, at work. Every word you use is a step
            toward the language.
          </p>
        </header>

        {/* Tip banner */}
        <div className="bg-accent/5 border border-accent/20 rounded-xl px-5 py-4 mb-10">
          <p className="text-sm text-text-secondary">
            <span className="font-semibold text-text-primary">Say it out loud.</span>{' '}
            Reading is not enough — your mouth needs to learn these sounds. Even if it feels
            awkward at first, speaking out loud is the fastest path to fluency.
          </p>
        </div>

        {/* Phrase groups */}
        <div className="space-y-12">
          {PHRASE_GROUPS.map((group) => (
            <section key={group.title} aria-labelledby={`group-${group.title}`}>
              <h2
                id={`group-${group.title}`}
                className="flex items-center gap-3 text-heading-2 font-semibold text-text-primary mb-5"
              >
                <span aria-hidden="true">{group.icon}</span>
                <span lang="mi">{group.title}</span>
                <span className="text-text-muted font-normal text-base">{group.titleEnglish}</span>
              </h2>

              <div className="space-y-3">
                {group.phrases.map((phrase, i) => (
                  <div
                    key={i}
                    className="border border-border rounded-lg p-4 hover:bg-surface/50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-1">
                      <p
                        className="font-semibold text-text-primary text-lg"
                        lang="mi"
                      >
                        {phrase.maori}
                      </p>
                      <p className="text-text-secondary text-sm">{phrase.english}</p>
                    </div>
                    {phrase.pronunciation && (
                      <p className="text-xs text-accent font-mono mb-1">
                        {phrase.pronunciation}
                      </p>
                    )}
                    {phrase.notes && (
                      <p className="text-text-muted text-xs mt-1">{phrase.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Pronunciation guide */}
        <section
          className="mt-14 bg-surface border border-border rounded-xl p-6"
          aria-labelledby="pronunciation-heading"
        >
          <h2
            id="pronunciation-heading"
            className="font-semibold text-text-primary mb-4"
          >
            A quick note on pronunciation
          </h2>
          <div className="space-y-2 text-sm text-text-secondary">
            <p>
              Māori vowels are pure and consistent — they never change sound:
            </p>
            <ul className="space-y-1 ml-4">
              <li><strong lang="mi">a</strong> — like "ah" in "father"</li>
              <li><strong lang="mi">e</strong> — like "eh" in "bed"</li>
              <li><strong lang="mi">i</strong> — like "ee" in "feet"</li>
              <li><strong lang="mi">o</strong> — like "o" in "more"</li>
              <li><strong lang="mi">u</strong> — like "oo" in "food"</li>
            </ul>
            <p className="mt-3">
              A macron (e.g., ā, ē, ī, ō, ū) simply means the vowel is held for longer. It
              changes meaning, so it matters — but the sound is the same vowel, just extended.
            </p>
            <p>
              The <strong>wh</strong> in Māori is pronounced like an English "f" in most
              dialects. So "whai" sounds like "fy", and "whero" sounds like "feh-roh".
            </p>
          </div>
        </section>

        {/* Next step */}
        <section className="mt-10 text-center">
          <p className="text-text-muted text-sm mb-4">
            Ready to go deeper? Try the lessons — they build these words into full sentences.
          </p>
          <a
            href="/whiti"
            className="inline-block px-6 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent/90 transition-colors"
          >
            Tīmata ngā Whiti
            <span className="ml-2 opacity-75 text-xs">Start the lessons</span>
          </a>
        </section>
      </main>
    </>
  )
}
