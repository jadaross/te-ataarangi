import type { Whiti } from '@/types/lesson'
import type { VocabularyItem } from '@/types/vocabulary'
import type { RakauConfiguration } from '@/types/rakau'

/**
 * Load a single whiti (lesson) by ID.
 *
 * Uses dynamic JSON import — works at build time (Next.js server components)
 * and at runtime on the server. Content authors add numbered JSON files to
 * /content/whiti/.
 */
export async function getWhiti(id: number): Promise<Whiti> {
  const paddedId = String(id).padStart(2, '0')
  // Map of all whiti files — extend this array as lessons are added
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const whitiMap: Record<number, () => Promise<{ default: any }>> = {
    1: () => import(`../../content/whiti/01-nga-tae.json`),
    2: () => import(`../../content/whiti/02-nga-tae-2.json`),
    3: () => import(`../../content/whiti/03-nga-tae-3.json`),
    4: () => import(`../../content/whiti/04-nga-tae-4.json`),
    5: () => import(`../../content/whiti/05-nga-tae-arotake.json`),
    6: () => import(`../../content/whiti/06-rahi-iti.json`),
    7: () => import(`../../content/whiti/07-roa-poto.json`),
    8: () => import(`../../content/whiti/08-whakarite.json`),
    9: () => import(`../../content/whiti/09-tae-me-te-rahi.json`),
    10: () => import(`../../content/whiti/10-rahi-iti.json`),
    11: () => import(`../../content/whiti/11-kei-runga-kei-raro.json`),
    12: () => import(`../../content/whiti/12-kei-mua-kei-muri.json`),
    13: () => import(`../../content/whiti/13-kei-maui-kei-matau.json`),
  }

  const loader = whitiMap[id]
  if (!loader) throw new Error(`Whiti ${paddedId} not found`)
  const mod = await loader()
  return mod.default as Whiti
}

/**
 * Load all whiti files available. Sorted by id.
 */
export async function getAllWhiti(): Promise<Whiti[]> {
  const lessons: Whiti[] = []
  // Add each new lesson here as it is authored
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loaders: (() => Promise<{ default: any }>)[] = [
    () => import(`../../content/whiti/01-nga-tae.json`),
    () => import(`../../content/whiti/02-nga-tae-2.json`),
    () => import(`../../content/whiti/03-nga-tae-3.json`),
    () => import(`../../content/whiti/04-nga-tae-4.json`),
    () => import(`../../content/whiti/05-nga-tae-arotake.json`),
    () => import(`../../content/whiti/06-rahi-iti.json`),
    () => import(`../../content/whiti/07-roa-poto.json`),
    () => import(`../../content/whiti/08-whakarite.json`),
    () => import(`../../content/whiti/09-tae-me-te-rahi.json`),
    () => import(`../../content/whiti/10-rahi-iti.json`),
    () => import(`../../content/whiti/11-kei-runga-kei-raro.json`),
    () => import(`../../content/whiti/12-kei-mua-kei-muri.json`),
    () => import(`../../content/whiti/13-kei-maui-kei-matau.json`),
  ]
  for (const loader of loaders) {
    const mod = await loader()
    lessons.push(mod.default as Whiti)
  }
  return lessons.sort((a, b) => a.id - b.id)
}

/**
 * Load the core vocabulary list.
 */
export async function getCoreVocabulary(): Promise<VocabularyItem[]> {
  const vocab = await import('../../content/vocabulary/core-vocab.json')
  return vocab.default as VocabularyItem[]
}

/**
 * Find a vocabulary item by ID.
 */
export async function getVocabItem(id: string): Promise<VocabularyItem | undefined> {
  const vocab = await getCoreVocabulary()
  return vocab.find((v) => v.id === id)
}

/**
 * Extract a RakauConfiguration from a whiti by config id.
 */
export function getRakauConfig(whiti: Whiti, configId: string): RakauConfiguration | undefined {
  for (const exercise of whiti.exercises) {
    if (exercise.rakauConfig?.id === configId) {
      return exercise.rakauConfig
    }
  }
  return undefined
}
