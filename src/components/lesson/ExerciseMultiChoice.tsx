'use client'

import type { Exercise } from '@/types/lesson'
import { RakauArrangement } from '@/components/rakau/RakauArrangement'
import type { FeedbackState } from './LessonFlow'
import { isCorrectAnswer } from '@/lib/lesson'

interface ExerciseMultiChoiceProps {
  exercise: Exercise
  onAnswer: (answer: string) => void
  feedback: FeedbackState
  disabled: boolean
}

/**
 * Multi-choice exercise with gentle immersive feedback.
 *
 * Feedback design (no "correct" / "wrong" text — ever):
 * - Correct answer selected:  soft green glow on the button
 * - Incorrect (1st attempt):  button shakes subtly, then resets
 * - Incorrect (2nd attempt):  incorrect shakes, correct option glows green (reveal)
 *
 * All text is in te reo Māori. Min 44px touch targets (WCAG 2.5.5).
 */
export function ExerciseMultiChoice({
  exercise,
  onAnswer,
  feedback,
  disabled,
}: ExerciseMultiChoiceProps) {
  const options = exercise.options ?? []

  return (
    <div className="space-y-6">
      {/* Rākau arrangement — shown silently */}
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
        {options.map((option) => {
          const style = getOptionStyle(option, feedback, exercise)
          return (
            <button
              key={option}
              type="button"
              lang="mi"
              disabled={disabled}
              onClick={() => onAnswer(option)}
              className={[
                'min-h-[44px] px-5 py-3 rounded-xl border font-medium text-base transition-all duration-200 text-left',
                'focus-visible:outline-2 focus-visible:outline-accent',
                'disabled:cursor-default',
                style,
              ].join(' ')}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Returns Tailwind class string for a given option based on current feedback state.
 */
function getOptionStyle(
  option: string,
  feedback: FeedbackState,
  exercise: Exercise,
): string {
  // No feedback active — default idle style
  if (!feedback) {
    return 'bg-surface border-border text-text-primary hover:bg-border/40 hover:border-border-strong'
  }

  const isSelected = feedback.selectedOption === option
  const isReveal = feedback.revealOption === option

  // This option is being revealed as the correct answer (2nd incorrect attempt)
  if (isReveal && !isSelected) {
    return 'bg-green-50 border-green-400 text-green-900 scale-[1.01]'
  }

  // This is the option the learner chose
  if (isSelected) {
    if (feedback.result === 'correct') {
      return 'bg-green-50 border-green-400 text-green-900 scale-[1.01]'
    }
    if (feedback.result === 'incorrect') {
      return 'bg-amber-50 border-amber-300 text-amber-900 animate-shake'
    }
  }

  // All other unselected options — dim slightly during feedback
  return 'bg-surface border-border text-text-muted opacity-50'
}
