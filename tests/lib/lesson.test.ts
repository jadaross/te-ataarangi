import { describe, it, expect } from 'vitest'
import { isCorrectAnswer, normaliseMaori } from '@/lib/lesson'
import type { Exercise } from '@/types/lesson'

/** Helper to build a minimal Exercise for testing */
function makeExercise(overrides: Partial<Exercise> = {}): Exercise {
  return {
    id: 'test-01',
    type: 'multi_choice',
    correctAnswer: 'He whero',
    audioAnswer: { file: 'vocabulary/whero.mp3' },
    ...overrides,
  }
}

describe('normaliseMaori', () => {
  it('strips lowercase macronised vowels', () => {
    expect(normaliseMaori('āēīōū')).toBe('aeiou')
  })

  it('strips uppercase macronised vowels preserving case (Ā→A, Ē→E, etc.)', () => {
    expect(normaliseMaori('ĀĒĪŌŪ')).toBe('AEIOU')
  })

  it('leaves non-macronised characters unchanged', () => {
    expect(normaliseMaori('He whero')).toBe('He whero')
  })

  it('normalises mixed macron/non-macron text', () => {
    expect(normaliseMaori('He wāteri')).toBe('He wateri')
    expect(normaliseMaori('He kākāriki')).toBe('He kakariki')
    expect(normaliseMaori('He kōwhai')).toBe('He kowhai')
  })
})

describe('isCorrectAnswer', () => {
  describe('exact matching (case-insensitive)', () => {
    it('returns true for an exact match of correctAnswer', () => {
      const exercise = makeExercise({ correctAnswer: 'He whero' })
      expect(isCorrectAnswer('He whero', exercise)).toBe(true)
    })

    it('is case-insensitive', () => {
      const exercise = makeExercise({ correctAnswer: 'He whero' })
      expect(isCorrectAnswer('he whero', exercise)).toBe(true)
      expect(isCorrectAnswer('HE WHERO', exercise)).toBe(true)
      expect(isCorrectAnswer('He Whero', exercise)).toBe(true)
    })

    it('trims leading/trailing whitespace', () => {
      const exercise = makeExercise({ correctAnswer: 'He whero' })
      expect(isCorrectAnswer('  He whero  ', exercise)).toBe(true)
      expect(isCorrectAnswer('\tHe whero\n', exercise)).toBe(true)
    })

    it('returns false for a wrong answer', () => {
      const exercise = makeExercise({ correctAnswer: 'He whero' })
      expect(isCorrectAnswer('He mā', exercise)).toBe(false)
    })
  })

  describe('acceptedVariants matching', () => {
    it('returns true when input matches an acceptedVariant', () => {
      const exercise = makeExercise({
        correctAnswer: 'He whero',
        acceptedVariants: ['He rākau whero', 'He whero tēnā rākau'],
      })
      expect(isCorrectAnswer('He rākau whero', exercise)).toBe(true)
      expect(isCorrectAnswer('He whero tēnā rākau', exercise)).toBe(true)
    })

    it('is case-insensitive for variants', () => {
      const exercise = makeExercise({
        correctAnswer: 'He whero',
        acceptedVariants: ['He rākau whero'],
      })
      expect(isCorrectAnswer('he rākau whero', exercise)).toBe(true)
      expect(isCorrectAnswer('HE RĀKAU WHERO', exercise)).toBe(true)
    })

    it('trims whitespace for variants', () => {
      const exercise = makeExercise({
        correctAnswer: 'He whero',
        acceptedVariants: ['He rākau whero'],
      })
      expect(isCorrectAnswer('  He rākau whero  ', exercise)).toBe(true)
    })

    it('returns false when input matches neither correctAnswer nor any variant', () => {
      const exercise = makeExercise({
        correctAnswer: 'He whero',
        acceptedVariants: ['He rākau whero'],
      })
      expect(isCorrectAnswer('He kākāriki', exercise)).toBe(false)
    })
  })

  describe('macron-normalised fallback', () => {
    it('matches when input is missing macrons but otherwise correct', () => {
      const exercise = makeExercise({ correctAnswer: 'He wāteri' })
      // "a" matches "ā"
      expect(isCorrectAnswer('He wateri', exercise)).toBe(true)
    })

    it('matches when input has macrons and correct answer does not', () => {
      // Edge case: correctAnswer without macron, input with macron
      const exercise = makeExercise({ correctAnswer: 'He wateri' })
      expect(isCorrectAnswer('He wāteri', exercise)).toBe(true)
    })

    it('matches kōwhai without macron', () => {
      const exercise = makeExercise({ correctAnswer: 'He kōwhai' })
      expect(isCorrectAnswer('He kowhai', exercise)).toBe(true)
    })

    it('matches kākāriki without macrons', () => {
      const exercise = makeExercise({ correctAnswer: 'He kākāriki' })
      expect(isCorrectAnswer('He kakariki', exercise)).toBe(true)
    })

    it('does not false-positive on completely wrong answer', () => {
      const exercise = makeExercise({
        correctAnswer: 'He wāteri',
        acceptedVariants: ['He rākau wāteri'],
      })
      expect(isCorrectAnswer('He mangu', exercise)).toBe(false)
    })

    it('macron fallback works for acceptedVariants too', () => {
      const exercise = makeExercise({
        correctAnswer: 'He whero',
        acceptedVariants: ['He rākau whero'],
      })
      // rakau without macron on a
      expect(isCorrectAnswer('He rakau whero', exercise)).toBe(true)
    })
  })

  describe('multi-colour answers', () => {
    it('matches complex multi-colour correct answer', () => {
      const exercise = makeExercise({
        correctAnswer: 'He whero, he mā, he kākāriki',
        acceptedVariants: ['He rākau whero, he rākau mā, he rākau kākāriki'],
      })
      expect(isCorrectAnswer('He whero, he mā, he kākāriki', exercise)).toBe(true)
    })

    it('macron fallback for multi-colour answer', () => {
      const exercise = makeExercise({
        correctAnswer: 'He wāteri, he kōwhai, he kākāriki nui',
      })
      expect(isCorrectAnswer('He wateri, he kowhai, he kakariki nui', exercise)).toBe(true)
    })
  })
})
