'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { createElement } from 'react'

const STORAGE_KEY = 'te-ataarangi-immersion'

interface ImmersionModeContextValue {
  immersionMode: boolean
  toggleImmersionMode: () => void
}

const ImmersionModeContext = createContext<ImmersionModeContextValue | null>(null)

/**
 * Provider that tracks immersion mode (Māori-only UI toggle).
 * Persists to localStorage under 'te-ataarangi-immersion'.
 * Default: true (immersion on).
 */
export function ImmersionModeProvider({ children }: { children: ReactNode }) {
  const [immersionMode, setImmersionMode] = useState(true)

  // Hydrate from localStorage after mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored !== null) {
        setImmersionMode(stored === 'true')
      }
    } catch {
      // localStorage not available — stay with default
    }
  }, [])

  const toggleImmersionMode = useCallback(() => {
    setImmersionMode((prev) => {
      const next = !prev
      try {
        localStorage.setItem(STORAGE_KEY, String(next))
      } catch {
        // ignore
      }
      return next
    })
  }, [])

  return createElement(
    ImmersionModeContext.Provider,
    { value: { immersionMode, toggleImmersionMode } },
    children,
  )
}

/**
 * Returns the current immersion mode and a toggle function.
 * Must be used within an ImmersionModeProvider.
 */
export function useImmersionMode(): ImmersionModeContextValue {
  const ctx = useContext(ImmersionModeContext)
  if (!ctx) {
    throw new Error('useImmersionMode must be used within an ImmersionModeProvider')
  }
  return ctx
}
