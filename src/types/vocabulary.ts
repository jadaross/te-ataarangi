import type { RodColour } from './rakau'
import type { AudioRef } from './lesson'

export interface VocabularyItem {
  id: string               // Unique slug, e.g., "whero"
  word: string             // Māori word with macrons
  wordRomanised?: string   // Simplified for search/indexing
  english: string          // English gloss (meta only)
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'particle' | 'phrase'
  audio: AudioRef          // Pronunciation audio
  exampleSentence?: string // Māori example sentence
  exampleAudio?: AudioRef
  rodColour?: RodColour    // If this word relates to a rod colour
  lessonFirstAppearance: number  // Whiti ID where this word first appears
}

export interface Tauira {
  id: string
  pattern: string         // Template with slots, e.g., "He {colour} te rākau"
  patternEnglish: string  // English gloss (meta only)
  slots: PatternSlot[]
  exampleInstances: {
    filled: string  // Fully filled example in Māori
    audio: AudioRef
  }[]
  lessonId: number  // Which whiti introduces this pattern
}

export interface PatternSlot {
  name: string              // e.g., "colour"
  acceptedValues: string[]  // Vocabulary IDs that can fill this slot
}
