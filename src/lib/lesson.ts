import type { Exercise } from '@/types/lesson'

/**
 * Strip macrons from a Māori string for fuzzy comparison.
 * Preserves case: ā→a, Ā→A, ē→e, Ē→E, etc.
 */
export function normaliseMaori(text: string): string {
  return text
    .replace(/ā/g, 'a')
    .replace(/Ā/g, 'A')
    .replace(/ē/g, 'e')
    .replace(/Ē/g, 'E')
    .replace(/ī/g, 'i')
    .replace(/Ī/g, 'I')
    .replace(/ō/g, 'o')
    .replace(/Ō/g, 'O')
    .replace(/ū/g, 'u')
    .replace(/Ū/g, 'U')
}

/**
 * Normalise text for comparison: lowercase, trimmed, remove extra whitespace.
 */
function normalise(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, ' ')
}

/**
 * Check whether a learner's input matches the correct answer for an exercise.
 *
 * Matching rules (in order):
 * 1. Exact match (case-insensitive, trimmed) against correctAnswer
 * 2. Exact match against any acceptedVariants
 * 3. Macron-normalised fallback: strip macrons from both sides and compare
 *
 * The app never tells the learner they are wrong — this function is only used
 * to decide whether to advance vs wait silently.
 */
export function isCorrectAnswer(input: string, exercise: Exercise): boolean {
  const normInput = normalise(input)
  const normCorrect = normalise(exercise.correctAnswer)

  // 1. Direct match against correctAnswer
  if (normInput === normCorrect) return true

  // 2. Match against acceptedVariants
  if (exercise.acceptedVariants) {
    for (const variant of exercise.acceptedVariants) {
      if (normInput === normalise(variant)) return true
    }
  }

  // 3. Macron-normalised fallback
  const macronNormInput = normaliseMaori(normInput)
  if (macronNormInput === normaliseMaori(normCorrect)) return true

  if (exercise.acceptedVariants) {
    for (const variant of exercise.acceptedVariants) {
      if (macronNormInput === normaliseMaori(normalise(variant))) return true
    }
  }

  return false
}
