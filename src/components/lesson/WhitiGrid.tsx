'use client'

import Link from 'next/link'
import type { Whiti } from '@/types/lesson'
import { useProgress } from '@/hooks/useProgress'

/**
 * Client component — renders the lesson grid with completion indicators
 * read from localStorage via useProgress.
 */
export function WhitiGrid({ whiti }: { whiti: Whiti[] }) {
  const { completedIds } = useProgress()

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      {whiti.map((w) => (
        <WhitiCard key={w.id} whiti={w} completed={completedIds.has(w.id)} />
      ))}
    </div>
  )
}

function WhitiCard({ whiti, completed }: { whiti: Whiti; completed: boolean }) {
  return (
    <Link
      href={`/whiti/${whiti.id}`}
      className="relative block p-5 rounded-xl bg-surface border border-border hover:border-border-strong hover:bg-border/20 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
      lang="mi"
      aria-label={`Whiti ${whiti.id}: ${whiti.title}${completed ? ' — kua oti' : ''}`}
    >
      {/* Completion dot */}
      {completed && (
        <span
          className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-[#57CC99]"
          aria-hidden="true"
          title="Kua oti"
        />
      )}

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
