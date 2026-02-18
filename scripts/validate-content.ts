/**
 * Content Validation Script
 *
 * Validates all JSON files in /content/ against their TypeScript types.
 * Run with: npm run validate-content
 *
 * Uses manual type-checking (no runtime Zod dependency) to keep the
 * validation script lightweight and dependency-free.
 */

import { readFileSync, readdirSync, statSync } from 'fs'
import { join, resolve } from 'path'

const CONTENT_DIR = resolve(process.cwd(), 'content')
const VALID_ROD_COLOURS = [
  'ma', 'whero', 'kakariki', 'wateri', 'kowhai',
  'kakariki-nui', 'mangu', 'parauri', 'kahurangi', 'karaka',
]
const VALID_EXERCISE_TYPES = [
  'multi_choice', 'typed_input', 'sentence_builder',
  'pattern_drill', 'listen_identify', 'karakia', 'waiata',
]
const VALID_THEMES = [
  'nga-tae', 'rahi-iti', 'waahi', 'mahi', 'tangata',
  'nama', 'patai', 'tikanga', 'waiata',
]
const VALID_PARTS_OF_SPEECH = ['noun', 'verb', 'adjective', 'particle', 'phrase']

// ─────────────────────────────────────────────────────────────────
// Validation helpers
// ─────────────────────────────────────────────────────────────────

type ValidationError = { path: string; message: string }
const errors: ValidationError[] = []

function err(path: string, message: string) {
  errors.push({ path, message })
}

function requireString(obj: Record<string, unknown>, key: string, path: string): boolean {
  if (typeof obj[key] !== 'string' || (obj[key] as string).trim() === '') {
    err(path, `"${key}" must be a non-empty string`)
    return false
  }
  return true
}

function requireNumber(obj: Record<string, unknown>, key: string, path: string): boolean {
  if (typeof obj[key] !== 'number') {
    err(path, `"${key}" must be a number`)
    return false
  }
  return true
}

function requireArray(obj: Record<string, unknown>, key: string, path: string): boolean {
  if (!Array.isArray(obj[key])) {
    err(path, `"${key}" must be an array`)
    return false
  }
  return true
}

function requireOneOf(obj: Record<string, unknown>, key: string, allowed: string[], path: string): boolean {
  if (!allowed.includes(obj[key] as string)) {
    err(path, `"${key}" must be one of: ${allowed.join(', ')} (got "${obj[key]}")`)
    return false
  }
  return true
}

// ─────────────────────────────────────────────────────────────────
// Lesson (Whiti) validation
// ─────────────────────────────────────────────────────────────────

function validateAudioRef(obj: unknown, path: string) {
  if (typeof obj !== 'object' || obj === null) {
    err(path, 'AudioRef must be an object')
    return
  }
  const a = obj as Record<string, unknown>
  requireString(a, 'file', path)
  if (a.duration !== undefined && typeof a.duration !== 'number') {
    err(path, '"duration" must be a number if present')
  }
}

function validateRakauConfig(obj: unknown, path: string) {
  if (typeof obj !== 'object' || obj === null) return
  const c = obj as Record<string, unknown>
  requireString(c, 'id', path)
  requireString(c, 'description', path)
  if (!requireArray(c, 'rods', path)) return
  ;(c.rods as unknown[]).forEach((rod, i) => {
    const rpath = `${path}.rods[${i}]`
    if (typeof rod !== 'object' || rod === null) {
      err(rpath, 'Rod must be an object')
      return
    }
    const r = rod as Record<string, unknown>
    requireOneOf(r, 'colour', VALID_ROD_COLOURS, rpath)
    requireOneOf(r, 'orientation', ['horizontal', 'vertical'], rpath)
    if (typeof r.position !== 'object' || r.position === null) {
      err(rpath, '"position" must be an object with x and y')
    } else {
      const pos = r.position as Record<string, unknown>
      requireNumber(pos, 'x', `${rpath}.position`)
      requireNumber(pos, 'y', `${rpath}.position`)
    }
  })
  if (typeof c.matSize !== 'object' || c.matSize === null) {
    err(path, '"matSize" must be an object with width and height')
  } else {
    const ms = c.matSize as Record<string, unknown>
    requireNumber(ms, 'width', `${path}.matSize`)
    requireNumber(ms, 'height', `${path}.matSize`)
  }
}

function validateExercise(obj: unknown, path: string) {
  if (typeof obj !== 'object' || obj === null) {
    err(path, 'Exercise must be an object')
    return
  }
  const e = obj as Record<string, unknown>
  requireString(e, 'id', path)
  requireOneOf(e, 'type', VALID_EXERCISE_TYPES, path)
  requireString(e, 'correctAnswer', path)
  validateAudioRef(e.audioAnswer, `${path}.audioAnswer`)
  if (e.rakauConfig) validateRakauConfig(e.rakauConfig, `${path}.rakauConfig`)
  if (e.type === 'multi_choice') {
    if (!Array.isArray(e.options) || e.options.length < 2) {
      err(path, 'multi_choice exercise must have at least 2 options')
    }
  }
}

function validateWhiti(data: unknown, filePath: string) {
  if (typeof data !== 'object' || data === null) {
    err(filePath, 'Whiti must be an object')
    return
  }
  const w = data as Record<string, unknown>
  const p = filePath

  requireNumber(w, 'id', p)
  requireString(w, 'slug', p)
  requireString(w, 'title', p)
  requireString(w, 'titleEnglish', p)
  if (![1, 2, 3, 4].includes(w.phase as number)) err(p, '"phase" must be 1, 2, 3, or 4')
  requireOneOf(w, 'theme', VALID_THEMES, p)
  requireArray(w, 'vocabularyIds', p)
  requireArray(w, 'patternIds', p)
  requireArray(w, 'prerequisites', p)

  if (!requireArray(w, 'exercises', p)) return
  if ((w.exercises as unknown[]).length === 0) {
    err(p, '"exercises" must not be empty')
  }
  ;(w.exercises as unknown[]).forEach((ex, i) => {
    validateExercise(ex, `${p}.exercises[${i}]`)
  })

  // Check title uses macrons (basic check — 'a' character without macron in Māori names)
  const title = w.title as string
  if (title.includes('Nga ') || title.includes('nga ')) {
    err(p, `"title" may be missing macrons — expected "Ngā" not "nga" or "Nga"`)
  }
}

// ─────────────────────────────────────────────────────────────────
// Vocabulary validation
// ─────────────────────────────────────────────────────────────────

function validateVocabItem(obj: unknown, path: string) {
  if (typeof obj !== 'object' || obj === null) {
    err(path, 'VocabularyItem must be an object')
    return
  }
  const v = obj as Record<string, unknown>
  requireString(v, 'id', path)
  requireString(v, 'word', path)
  requireString(v, 'english', path)
  requireOneOf(v, 'partOfSpeech', VALID_PARTS_OF_SPEECH, path)
  validateAudioRef(v.audio, `${path}.audio`)
  requireNumber(v, 'lessonFirstAppearance', path)
  if (v.rodColour !== undefined) {
    requireOneOf(v, 'rodColour', VALID_ROD_COLOURS, path)
  }
}

// ─────────────────────────────────────────────────────────────────
// File walker
// ─────────────────────────────────────────────────────────────────

function readJson(filePath: string): unknown {
  try {
    const raw = readFileSync(filePath, 'utf-8')
    return JSON.parse(raw)
  } catch (e) {
    err(filePath, `Failed to parse JSON: ${(e as Error).message}`)
    return null
  }
}

function walkDir(dir: string, ext: string): string[] {
  if (!statSync(dir, { throwIfNoEntry: false })) return []
  return readdirSync(dir)
    .filter((f) => f.endsWith(ext))
    .map((f) => join(dir, f))
}

// ─────────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────────

function main() {
  console.log('Validating content files…\n')

  // Validate whiti lesson files
  const whitiDir = join(CONTENT_DIR, 'whiti')
  const whitiFiles = walkDir(whitiDir, '.json')
  console.log(`Whiti files found: ${whitiFiles.length}`)
  for (const file of whitiFiles) {
    const data = readJson(file)
    if (data !== null) validateWhiti(data, file)
  }

  // Validate core vocabulary
  const vocabFile = join(CONTENT_DIR, 'vocabulary', 'core-vocab.json')
  const vocabData = readJson(vocabFile)
  if (vocabData !== null) {
    if (!Array.isArray(vocabData)) {
      err(vocabFile, 'core-vocab.json must be an array')
    } else {
      console.log(`Vocabulary items found: ${vocabData.length}`)
      vocabData.forEach((item, i) => validateVocabItem(item, `${vocabFile}[${i}]`))
    }
  }

  // Report
  console.log()
  if (errors.length === 0) {
    console.log('✓ All content files are valid.\n')
    process.exit(0)
  } else {
    console.error(`✗ Found ${errors.length} validation error(s):\n`)
    for (const e of errors) {
      console.error(`  [${e.path}]`)
      console.error(`    ${e.message}\n`)
    }
    process.exit(1)
  }
}

main()
