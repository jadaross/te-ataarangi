import type { RakauConfiguration } from './rakau'

export interface AudioRef {
  file: string       // Path relative to /public/audio/
  duration?: number  // Seconds (for UI timing)
  speaker?: string   // Attribution for native speaker recordings
}

export interface KarakiaRef {
  id: string
  text: string   // Māori text
  audio: AudioRef
}

export interface WaiataRef {
  id: string
  title: string  // Māori title
  audio: AudioRef
}

export type ExerciseType =
  | 'multi_choice'      // Select the correct Māori description
  | 'typed_input'       // Type the Māori description
  | 'sentence_builder'  // Drag words into correct order
  | 'pattern_drill'     // Rapid pattern substitution
  | 'listen_identify'   // Hear audio, identify the rod arrangement
  | 'karakia'           // Recite/follow along with karakia
  | 'waiata'            // Song practice

export interface Exercise {
  id: string
  type: ExerciseType
  rakauConfig?: RakauConfiguration // The rod arrangement shown
  prompt?: AudioRef                // Audio prompt (kaiako "question")
  correctAnswer: string            // Māori text of correct answer
  acceptedVariants?: string[]      // Alternative correct forms
  audioAnswer: AudioRef            // Audio of the correct answer
  options?: string[]               // For multi_choice only
  words?: string[]                 // For sentence_builder only
  hint?: string                    // Māori-language hint (used sparingly)
}

export type LessonTheme =
  | 'nga-tae'   // Colours
  | 'rahi-iti'  // Sizes
  | 'waahi'     // Positions
  | 'mahi'      // Actions/verbs
  | 'tangata'   // People
  | 'nama'      // Numbers
  | 'patai'     // Questions
  | 'tikanga'   // Cultural content
  | 'waiata'    // Song

export interface Whiti {
  id: number
  slug: string       // e.g., "nga-tae"
  title: string      // Māori title, e.g., "Ngā Tae"
  titleEnglish: string  // English title (meta only)
  phase: 1 | 2 | 3 | 4
  theme: LessonTheme
  vocabularyIds: string[]  // References to core-vocab.json
  patternIds: string[]     // References to tauira.json
  karakia?: KarakiaRef     // Opening karakia for this lesson
  exercises: Exercise[]
  waiata?: WaiataRef       // Optional closing waiata
  tikangaNote?: {
    text: string         // In Māori
    textEnglish: string  // In English (shown in meta mode)
  }
  prerequisites: number[]  // Whiti IDs that should be completed first
}
