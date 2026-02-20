'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import type { Whiti } from '@/types/lesson'
import { useLessonSession } from '@/hooks/useLessonSession'
import { isCorrectAnswer } from '@/lib/lesson'
import { ExerciseMultiChoice } from './ExerciseMultiChoice'
import { ExerciseTypedInput } from './ExerciseTypedInput'
import { ExerciseSentenceBuilder } from './ExerciseSentenceBuilder'
import { LessonComplete } from './LessonComplete'

interface LessonFlowProps {
  whiti: Whiti
}

export type FeedbackState = {
  selectedOption: string
  result: 'correct' | 'incorrect'
  /** Option to gently reveal as correct on 2nd failed attempt */
  revealOption: string | null
} | null

/**
 * Orchestrates the full lesson loop for a single whiti.
 *
 * Feedback is gentle and immersive — no text says "correct" or "wrong":
 * - Correct:          selected option glows green → auto-advances after 700ms
 * - Incorrect (1st):  selected option shakes softly → resets after 650ms (silence)
 * - Incorrect (2nd):  correct option is gently revealed in green → advances after 1600ms
 */
/** Fisher-Yates shuffle — returns a new shuffled array */
function shuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function LessonFlow({ whiti }: LessonFlowProps) {
  // Shuffle exercises once per session mount so repeated lessons feel different
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const exercises = useMemo(() => shuffle(whiti.exercises), [whiti.id])
  const totalExercises = exercises.length
  const session = useLessonSession(totalExercises)

  // Feedback display state
  const [feedback, setFeedback] = useState<FeedbackState>(null)
  // Locked prevents double-clicks during animation
  const [locked, setLocked] = useState(false)
  // Track attempts per exercise locally so we can read the new value synchronously
  const attemptsRef = useRef<Record<string, number>>({})

  const handleAnswer = useCallback(
    (answer: string) => {
      if (locked) return
      const exercise = exercises[session.currentExerciseIndex]
      if (!exercise) return

      const correct = isCorrectAnswer(answer, exercise)
      setLocked(true)

      if (correct) {
        setFeedback({ selectedOption: answer, result: 'correct', revealOption: null })
        setTimeout(() => {
          setFeedback(null)
          setLocked(false)
          session.advanceExercise()
        }, 700)
      } else {
        // Increment local attempt count
        const prev = attemptsRef.current[exercise.id] ?? 0
        const newCount = prev + 1
        attemptsRef.current[exercise.id] = newCount
        session.recordAttempt(exercise.id)

        if (newCount >= 2) {
          // For multi_choice: reveal the correct option from the options array
          // For typed_input: reveal the correctAnswer text directly
          const correctOption =
            exercise.type === 'multi_choice'
              ? (exercise.options?.find((opt) => isCorrectAnswer(opt, exercise)) ?? null)
              : exercise.correctAnswer
          setFeedback({ selectedOption: answer, result: 'incorrect', revealOption: correctOption })
          setTimeout(() => {
            setFeedback(null)
            setLocked(false)
            session.advanceExercise()
          }, 1600)
        } else {
          // First miss — shake and reset silently
          setFeedback({ selectedOption: answer, result: 'incorrect', revealOption: null })
          setTimeout(() => {
            setFeedback(null)
            setLocked(false)
          }, 650)
        }
      }
    },
    [locked, exercises, session],
  )

  if (session.completed) return <LessonComplete />

  const exercise = exercises[session.currentExerciseIndex]
  if (!exercise) return <LessonComplete />

  const current = session.currentExerciseIndex + 1

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Progress indicator + speak-aloud reminder — Māori only */}
      <div
        className="flex items-center gap-3"
        aria-label={`Pātai ${current} o ${totalExercises}`}
        lang="mi"
      >
        <span className="text-sm text-text-muted tabular-nums">
          {current} / {totalExercises}
        </span>
        <div className="flex-1 h-1.5 rounded-full bg-surface overflow-hidden" aria-hidden="true">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${(current / totalExercises) * 100}%` }}
          />
        </div>
        {/* Gentle reminder to speak each word aloud */}
        <span
          className="shrink-0 flex items-center gap-1 text-xs text-text-muted select-none"
          lang="mi"
          title="Say the words aloud"
          aria-label="Kōrerotia ngā kupu — say the words aloud"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
          Kōrerotia
        </span>
      </div>

      {/* Exercise */}
      <div>
        {exercise.type === 'multi_choice' && (
          <ExerciseMultiChoice
            key={`${exercise.id}-${session.currentExerciseIndex}`}
            exercise={exercise}
            onAnswer={handleAnswer}
            feedback={feedback}
            disabled={locked}
          />
        )}
        {exercise.type === 'typed_input' && (
          <ExerciseTypedInput
            key={`${exercise.id}-${session.currentExerciseIndex}`}
            exercise={exercise}
            onAnswer={handleAnswer}
            feedback={feedback}
            disabled={locked}
          />
        )}
        {exercise.type === 'sentence_builder' && (
          <ExerciseSentenceBuilder
            key={`${exercise.id}-${session.currentExerciseIndex}`}
            exercise={exercise}
            onAnswer={handleAnswer}
            disabled={locked}
          />
        )}
        {exercise.type !== 'multi_choice' &&
          exercise.type !== 'typed_input' &&
          exercise.type !== 'sentence_builder' && (
            <p className="text-text-muted text-sm" lang="mi">
              Kāore anō tēnei momo pātai kia rite — e haere ana ki tērā.
            </p>
          )}
      </div>
    </div>
  )
}
