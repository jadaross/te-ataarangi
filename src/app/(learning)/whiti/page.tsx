import type { Metadata } from 'next'
import { getAllWhiti } from '@/lib/content'
import { WhitiGrid } from '@/components/lesson/WhitiGrid'

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
        <WhitiGrid whiti={whiti} />
      )}
    </div>
  )
}
