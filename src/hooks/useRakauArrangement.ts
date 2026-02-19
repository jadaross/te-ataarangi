'use client'

import { useCallback, useState } from 'react'
import type { Rod, RakauConfiguration } from '@/types/rakau'

/**
 * Manages an editable RakauConfiguration state for the sandbox.
 *
 * Provides actions to add, remove, move, and clear rods.
 * Rod IDs are auto-generated if not supplied.
 */
export function useRakauArrangement(initial?: Partial<RakauConfiguration>) {
  const [rods, setRods] = useState<Rod[]>(initial?.rods ?? [])
  const [matSize, setMatSize] = useState(initial?.matSize ?? { width: 20, height: 14 })

  let _idCounter = 0

  /** Add a rod to the arrangement. Auto-assigns an id if not provided. */
  const addRod = useCallback((rod: Rod) => {
    setRods((prev) => {
      const id = rod.id ?? `rod-${Date.now()}-${++_idCounter}`
      return [...prev, { ...rod, id }]
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /** Remove a rod by id. */
  const removeRod = useCallback((id: string) => {
    setRods((prev) => prev.filter((r) => r.id !== id))
  }, [])

  /** Move a rod to a new grid position. */
  const moveRod = useCallback((id: string, newPosition: { x: number; y: number }) => {
    setRods((prev) =>
      prev.map((r) => (r.id === id ? { ...r, position: newPosition } : r)),
    )
  }, [])

  /** Remove all rods from the arrangement. */
  const clearAll = useCallback(() => {
    setRods([])
  }, [])

  /** Update the mat size. */
  const updateMatSize = useCallback((width: number, height: number) => {
    setMatSize({ width, height })
  }, [])

  const configuration: RakauConfiguration = {
    id: initial?.id ?? 'sandbox',
    rods,
    matSize,
    description: initial?.description ?? 'He rākau kōpae',
  }

  return {
    configuration,
    rods,
    matSize,
    addRod,
    removeRod,
    moveRod,
    clearAll,
    updateMatSize,
  }
}
