'use client'

import { useRef, useState } from 'react'
import type { Exercise } from '@/types/lesson'
import { RakauArrangement } from '@/components/rakau/RakauArrangement'
import { MacronKeyboard } from '@/components/ui/MacronKeyboard'
import type { FeedbackState } from './LessonFlow'

interface ExerciseTypedInputProps {
  exercise: Exercise
  onAnswer: (answer: string) => void
  feedback: FeedbackState
  disabled: boolean
}

/**
 * Free-text input exercise where the learner types the Māori answer.
 *
 * Feedback design (no "correct" / "wrong" text — ever):
 * - Correct: input border turns green
 * - Incorrect (1st attempt): input shakes, then resets
 * - Incorrect (2nd attempt): correct answer shown in green text below input
 *
 * Includes a MacronKeyboard for inserting macronised vowels.
 * All text is in te reo Māori.
 */
export function ExerciseTypedInput({
  exercise,
  onAnswer,
  feedback,
  disabled,
}: ExerciseTypedInputProps) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleInsert(char: string) {
    const el = inputRef.current
    if (!el) return
    const start = el.selectionStart ?? value.length
    const end = el.selectionEnd ?? value.length
    const next = value.slice(0, start) + char + value.slice(end)
    setValue(next)
    // Restore focus and cursor position after state update
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(start + char.length, start + char.length)
    })
  }

  function handleSubmit() {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onAnswer(trimmed)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const inputBorderClass = getInputBorderClass(feedback)

  return (
    <div className="space-y-6">
      {/* Rākau arrangement — shown silently */}
      {exercise.rakauConfig && (
        <div className="flex justify-center">
          <RakauArrangement config={exercise.rakauConfig} />
        </div>
      )}

      {/* Input area */}
      <div className="space-y-3">
        <input
          ref={inputRef}
          type="text"
          lang="mi"
          placeholder="Tuhia tō whakautu…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          className={[
            'w-full min-h-[44px] px-4 py-3 rounded-xl border text-base text-text-primary bg-surface',
            'placeholder:text-text-muted',
            'transition-all duration-200',
            'focus-visible:outline-2 focus-visible:outline-accent',
            'disabled:cursor-default',
            inputBorderClass,
          ].join(' ')}
          aria-label="Tuhia tō whakautu"
        />

        {/* MacronKeyboard */}
        <MacronKeyboard onInsert={handleInsert} />

        {/* Submit button */}
        <button
          type="button"
          lang="mi"
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className="min-h-[44px] px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent/90 transition-colors focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-50 disabled:cursor-default"
          aria-label="Tuku whakautu"
        >
          Tuku
        </button>
      </div>

      {/* Reveal correct answer on 2nd failed attempt — no label, just the text */}
      {feedback?.revealOption && (
        <p
          lang="mi"
          className="text-green-700 font-medium text-base"
          aria-live="polite"
        >
          {feedback.revealOption}
        </p>
      )}
    </div>
  )
}

/**
 * Returns a Tailwind border class based on the current feedback state.
 */
function getInputBorderClass(feedback: FeedbackState): string {
  if (!feedback) {
    return 'border-border'
  }
  if (feedback.result === 'correct') {
    return 'border-green-400 bg-green-50'
  }
  if (feedback.result === 'incorrect') {
    return 'border-amber-300 animate-shake'
  }
  return 'border-border'
}
