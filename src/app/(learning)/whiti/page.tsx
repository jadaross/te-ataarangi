import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllWhiti } from '@/lib/content'
import type { Whiti } from '@/types/lesson'

export const metadata: Metadata = {
  title: 'Ngā Whiti',
}

/**
 * Lesson index — lists all available whiti.
 * Learning route: Māori only, zero English text.
 */
export default async function WhitiIndexPage() {
  const whiti = await getAllWhiti()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <section aria-labelledby="whiti-heading">
        <h1
          id="whiti-heading"
          className="text-heading-1 font-semibold text-text-primary mb-2"
          lang="mi"
        >
          Ngā Whiti
        </h1>
        <p className="text-text-secondary" lang="mi">
          Tīpakoha tētahi whiti — tīmata ai ō ako.
        </p>
      </section>

      {whiti.length === 0 ? (
        <p className="text-text-muted" lang="mi">
          Kāore he whiti i ēnei wā.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {whiti.map((w) => (
            <WhitiCard key={w.id} whiti={w} />
          ))}
        </div>
      )}
    </div>
  )
}

function WhitiCard({ whiti }: { whiti: Whiti }) {
  return (
    <Link
      href={`/whiti/${whiti.id}`}
      className="block p-5 rounded-xl bg-surface border border-border hover:border-border-strong hover:bg-border/20 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
      lang="mi"
      aria-label={`Whiti ${whiti.id}: ${whiti.title}`}
    >
      {/* Phase badge */}
      <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-accent/10 text-accent mb-3">
        {`Taumata ${whiti.phase}`}
      </span>

      {/* Title */}
      <h2 className="text-lg font-semibold text-text-primary mb-1" lang="mi">
        {whiti.title}
      </h2>

      {/* Exercise count */}
      <p className="text-sm text-text-muted" lang="mi">
        {`${whiti.exercises.length} ngā pātai`}
      </p>

      {/* Prerequisites indicator */}
      {whiti.prerequisites.length > 0 && (
        <p className="text-xs text-text-muted mt-2" lang="mi">
          {`I muri i te Whiti ${whiti.prerequisites.join(', ')}`}
        </p>
      )}
    </Link>
  )
}
