'use client'

import type { Exercise } from '@/types/lesson'
import { RakauArrangement } from '@/components/rakau/RakauArrangement'

interface ExerciseMultiChoiceProps {
  exercise: Exercise
  onAnswer: (answer: string) => void
}

/**
 * Multi-choice exercise component.
 *
 * Displays the rākau arrangement (if present) then 4 option buttons.
 * All text is in te reo Māori. No correct/incorrect feedback is shown —
 * that is handled by the parent (LessonFlow).
 *
 * Accessibility:
 * - Each option is a <button> with min 44px height
 * - lang="mi" on all Māori text
 * - rākau arrangement has role="img" with Māori aria-label (via RakauArrangement)
 */
export function ExerciseMultiChoice({ exercise, onAnswer }: ExerciseMultiChoiceProps) {
  const options = exercise.options ?? []

  return (
    <div className="space-y-6">
      {/* Rākau arrangement — shown silently before answering */}
      {exercise.rakauConfig && (
        <div className="flex justify-center">
          <RakauArrangement config={exercise.rakauConfig} />
        </div>
      )}

      {/* Option buttons */}
      <div
        role="group"
        aria-label="Whakaaro — tīpakohia tētahi"
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {options.map((option) => (
          <button
            key={option}
            type="button"
            lang="mi"
            onClick={() => onAnswer(option)}
            className="min-h-[44px] px-5 py-3 rounded-xl bg-surface border border-border text-text-primary font-medium text-base hover:bg-border/40 hover:border-border-strong transition-colors focus-visible:outline-2 focus-visible:outline-accent text-left"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
