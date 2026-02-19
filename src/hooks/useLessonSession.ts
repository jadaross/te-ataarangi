'use client'

import { useCallback, useReducer } from 'react'

/** Maximum number of attempts before auto-advancing (silence principle). */
const MAX_ATTEMPTS = 2

interface LessonSessionState {
  currentExerciseIndex: number
  /** Map of exerciseId -> number of attempts */
  attempts: Map<string, number>
  completed: boolean
}

type LessonSessionAction =
  | { type: 'RECORD_ATTEMPT'; exerciseId: string }
  | { type: 'ADVANCE_EXERCISE'; totalExercises: number }
  | { type: 'COMPLETE_LESSON' }

function reducer(state: LessonSessionState, action: LessonSessionAction): LessonSessionState {
  switch (action.type) {
    case 'RECORD_ATTEMPT': {
      const prev = state.attempts.get(action.exerciseId) ?? 0
      const updated = new Map(state.attempts)
      updated.set(action.exerciseId, prev + 1)
      return { ...state, attempts: updated }
    }
    case 'ADVANCE_EXERCISE': {
      const next = state.currentExerciseIndex + 1
      if (next >= action.totalExercises) {
        return { ...state, currentExerciseIndex: next, completed: true }
      }
      return { ...state, currentExerciseIndex: next }
    }
    case 'COMPLETE_LESSON': {
      return { ...state, completed: true }
    }
    default:
      return state
  }
}

const initialState: LessonSessionState = {
  currentExerciseIndex: 0,
  attempts: new Map(),
  completed: false,
}

/**
 * Manages in-memory lesson progress.
 *
 * Intentionally NOT persisted — clears on page refresh per Te Ataarangi
 * methodology (no score-keeping, no pressure).
 *
 * After MAX_ATTEMPTS (2) on the same exercise, advanceExercise() is called
 * automatically. The app never tells the learner they are wrong.
 */
export function useLessonSession(totalExercises: number) {
  const [state, dispatch] = useReducer(reducer, initialState)

  /**
   * Record an attempt for the given exercise.
   * If this is the second attempt, automatically advance to the next exercise.
   */
  const recordAttempt = useCallback(
    (exerciseId: string) => {
      dispatch({ type: 'RECORD_ATTEMPT', exerciseId })
      const prevAttempts = state.attempts.get(exerciseId) ?? 0
      // After recording, if we've now hit MAX_ATTEMPTS, advance
      if (prevAttempts + 1 >= MAX_ATTEMPTS) {
        dispatch({ type: 'ADVANCE_EXERCISE', totalExercises })
      }
    },
    [state.attempts, totalExercises],
  )

  /** Move to the next exercise (or mark lesson complete). */
  const advanceExercise = useCallback(() => {
    dispatch({ type: 'ADVANCE_EXERCISE', totalExercises })
  }, [totalExercises])

  /** Mark the lesson as complete. */
  const completeLesson = useCallback(() => {
    dispatch({ type: 'COMPLETE_LESSON' })
  }, [])

  /**
   * Get the current attempt count for an exercise.
   */
  const getAttempts = useCallback(
    (exerciseId: string): number => {
      return state.attempts.get(exerciseId) ?? 0
    },
    [state.attempts],
  )

  return {
    currentExerciseIndex: state.currentExerciseIndex,
    attempts: state.attempts,
    completed: state.completed,
    recordAttempt,
    advanceExercise,
    completeLesson,
    getAttempts,
  }
}
