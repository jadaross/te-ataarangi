'use client'

import { useEffect, useState, useCallback } from 'react'

const STORAGE_KEY = 'te-ataarangi-progress'

/**
 * Tracks which whiti the learner has completed across sessions.
 * Persists a set of whiti IDs to localStorage.
 * No scores or attempt counts — only "completed or not".
 */
export function useProgress() {
  const [completedIds, setCompletedIds] = useState<Set<number>>(new Set())

  // Hydrate from localStorage after mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setCompletedIds(new Set(JSON.parse(stored) as number[]))
      }
    } catch {
      // localStorage not available — stay with empty set
    }
  }, [])

  const markComplete = useCallback((id: number) => {
    setCompletedIds((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      } catch {
        // ignore
      }
      return next
    })
  }, [])

  return { completedIds, markComplete }
}
