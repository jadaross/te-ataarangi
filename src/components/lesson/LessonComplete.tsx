'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useProgress } from '@/hooks/useProgress'

/**
 * Shown when the learner has completed all exercises in a whiti.
 *
 * All text is in te reo Māori (learning route context).
 * Includes a link back to the lesson index (/whiti).
 */
export function LessonComplete({ whitiId }: { whitiId: number }) {
  const { markComplete } = useProgress()

  useEffect(() => {
    markComplete(whitiId)
  }, [whitiId, markComplete])
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 space-y-6">
      {/* Decorative rod bar */}
      <div aria-hidden="true" className="flex gap-1 mb-4">
        {[
          { colour: '#57CC99', h: 20 },
          { colour: '#FFD166', h: 30 },
          { colour: '#2D6A4F', h: 40 },
          { colour: '#FFD166', h: 30 },
          { colour: '#57CC99', h: 20 },
        ].map((r, i) => (
          <div
            key={i}
            style={{
              backgroundColor: r.colour,
              width: 12,
              height: r.h,
              borderRadius: 3,
              boxShadow: '1px 2px 4px rgba(0,0,0,0.15)',
            }}
          />
        ))}
      </div>

      <h2
        className="text-display font-semibold text-text-primary"
        lang="mi"
        style={{ animation: 'pulseSoft 2s ease-in-out 1' }}
      >
        Kua mutu!
      </h2>

      <p className="text-text-secondary text-lg" lang="mi">
        Ka rawe — kua oti te whiti nei.
      </p>

      <Link
        href="/whiti"
        lang="mi"
        className="mt-4 inline-block px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
      >
        Hoki atu ki ngā Whiti
      </Link>
    </div>
  )
}
