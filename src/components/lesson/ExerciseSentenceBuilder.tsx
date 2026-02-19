'use client'

import { useMemo, useRef, useState } from 'react'
import type { Exercise } from '@/types/lesson'
import { RakauArrangement } from '@/components/rakau/RakauArrangement'

interface ExerciseSentenceBuilderProps {
  exercise: Exercise
  /** Called with the completed sentence once all slots are filled correctly */
  onAnswer: (answer: string) => void
  disabled: boolean
}

type SlotFeedback = 'idle' | 'correct' | 'incorrect'

/**
 * Sentence builder exercise — word by word.
 *
 * The learner builds the sentence one word at a time. Each slot presents
 * the correct word plus 2–3 distractors. The learner picks one:
 * - Correct: word locks into the slot (green), next slot opens
 * - Incorrect: option shakes gently, try again (silence principle)
 * - After 2 incorrect guesses on a slot: correct word is revealed, slot
 *   auto-fills, and the next slot opens (modelling, not correction)
 *
 * When all slots are filled, onAnswer is called with the complete sentence.
 */
export function ExerciseSentenceBuilder({
  exercise,
  onAnswer,
  disabled,
}: ExerciseSentenceBuilderProps) {
  // Split the correct answer into individual word tokens
  const targetWords = useMemo(
    () => exercise.correctAnswer.split(' ').filter(Boolean),
    [exercise.correctAnswer],
  )

  const wordPool = exercise.words ?? []

  // Words the learner has placed so far
  const [builtWords, setBuiltWords] = useState<string[]>([])
  // Which option button was last tapped (for shake animation)
  const [shakingOption, setShakingOption] = useState<string | null>(null)
  // Slot-level locked state during animations
  const [slotLocked, setSlotLocked] = useState(false)
  // Attempt count for current slot
  const slotAttemptsRef = useRef(0)

  const currentSlotIndex = builtWords.length
  const isComplete = currentSlotIndex >= targetWords.length

  // Options for the current open slot: correct word + shuffled distractors
  const currentOptions = useMemo(() => {
    if (isComplete) return []
    const correct = targetWords[currentSlotIndex]
    const distractors = shuffle(wordPool.filter((w) => w !== correct)).slice(0, 3)
    return shuffle([correct, ...distractors])
  // Recompute only when the slot changes (not on every render)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlotIndex, isComplete])

  function handleWordPick(word: string) {
    if (slotLocked || disabled || isComplete) return
    const correct = targetWords[currentSlotIndex]

    if (word === correct) {
      // Lock in — correct
      slotAttemptsRef.current = 0
      setSlotLocked(true)
      const newBuilt = [...builtWords, word]
      setBuiltWords(newBuilt)
      setTimeout(() => {
        setSlotLocked(false)
        if (newBuilt.length >= targetWords.length) {
          onAnswer(newBuilt.join(' '))
        }
      }, 400)
    } else {
      // Incorrect — shake and record attempt
      slotAttemptsRef.current += 1
      setShakingOption(word)
      setSlotLocked(true)

      if (slotAttemptsRef.current >= 2) {
        // Reveal the correct word and auto-advance after a pause
        setTimeout(() => {
          setShakingOption(null)
          slotAttemptsRef.current = 0
          const newBuilt = [...builtWords, correct]
          setBuiltWords(newBuilt)
          setSlotLocked(false)
          if (newBuilt.length >= targetWords.length) {
            onAnswer(newBuilt.join(' '))
          }
        }, 1200)
      } else {
        setTimeout(() => {
          setShakingOption(null)
          setSlotLocked(false)
        }, 500)
      }
    }
  }

  return (
    <div className="space-y-8">
      {/* Rākau arrangement — shown silently */}
      {exercise.rakauConfig && (
        <div className="flex justify-center">
          <RakauArrangement config={exercise.rakauConfig} />
        </div>
      )}

      {/* Sentence so far — word chips in a row */}
      <div
        className="flex flex-wrap gap-2 min-h-[44px] items-center"
        aria-label="Rerenga kōrero kei te hanga"
        lang="mi"
      >
        {targetWords.map((_, i) => {
          const filled = i < builtWords.length
          const isCurrent = i === currentSlotIndex

          return (
            <span
              key={i}
              className={[
                'inline-block px-3 py-1.5 rounded-lg border text-sm font-medium transition-all duration-300',
                filled
                  ? 'bg-green-50 border-green-400 text-green-900'
                  : isCurrent
                    ? 'bg-surface border-accent border-dashed text-text-muted min-w-[48px] text-center animate-pulse-slot'
                    : 'bg-surface border-border text-text-muted min-w-[48px] text-center opacity-40',
              ].join(' ')}
              lang="mi"
            >
              {filled ? builtWords[i] : '\u00A0\u00A0\u00A0'}
            </span>
          )
        })}
      </div>

      {/* Word options for the current slot */}
      {!isComplete && (
        <div
          role="group"
          aria-label={`Tīpakohia te kupu ${currentSlotIndex + 1}`}
          className="flex flex-wrap gap-3"
          lang="mi"
        >
          {currentOptions.map((option) => {
            const isShaking = shakingOption === option

            return (
              <button
                key={option}
                type="button"
                lang="mi"
                disabled={slotLocked || disabled}
                onClick={() => handleWordPick(option)}
                className={[
                  'min-h-[44px] px-5 py-2.5 rounded-xl border font-medium text-base transition-all duration-200',
                  'focus-visible:outline-2 focus-visible:outline-accent',
                  'disabled:cursor-default',
                  isShaking
                    ? 'bg-amber-50 border-amber-300 text-amber-900 animate-shake'
                    : 'bg-surface border-border text-text-primary hover:bg-border/40 hover:border-border-strong',
                ].join(' ')}
              >
                {option}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

/** Fisher-Yates shuffle — returns a new shuffled array */
function shuffle<T>(arr: T[]): T[] {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}
