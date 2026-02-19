'use client'

import type { Whiti } from '@/types/lesson'
import { useLessonSession } from '@/hooks/useLessonSession'
import { isCorrectAnswer } from '@/lib/lesson'
import { ExerciseMultiChoice } from './ExerciseMultiChoice'
import { LessonComplete } from './LessonComplete'

interface LessonFlowProps {
  whiti: Whiti
}

/**
 * Orchestrates the full lesson loop for a single whiti.
 *
 * Silence principle:
 * - Correct answer (case-insensitive, macron-tolerant): advance immediately
 * - 1st incorrect attempt: do nothing visible — arrangement stays, learner tries again
 * - 2nd incorrect attempt: advance anyway (audio would model the answer, but since
 *   audio files may be absent at this stage, just advance silently)
 *
 * The app NEVER shows "incorrect", "wrong", or "try again" text.
 */
export function LessonFlow({ whiti }: LessonFlowProps) {
  const totalExercises = whiti.exercises.length
  const session = useLessonSession(totalExercises)

  if (session.completed) {
    return <LessonComplete />
  }

  const exercise = whiti.exercises[session.currentExerciseIndex]
  if (!exercise) {
    return <LessonComplete />
  }

  const handleAnswer = (answer: string) => {
    const correct = isCorrectAnswer(answer, exercise)

    if (correct) {
      // Advance immediately on correct answer
      session.advanceExercise()
    } else {
      // Record the attempt — useLessonSession auto-advances after 2 attempts
      session.recordAttempt(exercise.id)
    }
  }

  const current = session.currentExerciseIndex + 1

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Progress indicator — Māori only */}
      <div
        className="flex items-center gap-3"
        aria-label={`Pātai ${current} o ${totalExercises}`}
        lang="mi"
      >
        <span className="text-sm text-text-muted">
          {current} / {totalExercises}
        </span>
        <div
          className="flex-1 h-1.5 rounded-full bg-surface overflow-hidden"
          aria-hidden="true"
        >
          <div
            className="h-full bg-accent rounded-full transition-all duration-300"
            style={{ width: `${(current / totalExercises) * 100}%` }}
          />
        </div>
      </div>

      {/* Exercise */}
      <div>
        {exercise.type === 'multi_choice' && (
          <ExerciseMultiChoice exercise={exercise} onAnswer={handleAnswer} />
        )}

        {/* Fallback for other exercise types not yet implemented */}
        {exercise.type !== 'multi_choice' && (
          <div className="text-text-muted text-sm" lang="mi">
            Kāore anō tēnei momo pātai kia rite — e haere ana ki tērā.
          </div>
        )}
      </div>
    </div>
  )
}
