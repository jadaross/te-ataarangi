'use client'

import { useEffect, useRef, useState } from 'react'
import type { RakauConfiguration } from '@/types/rakau'
import { RakauMat } from './RakauMat'
import { RakauRod } from './RakauRod'

interface RakauArrangementProps {
  config: RakauConfiguration
  /** Override the Māori aria-label; defaults to config.description */
  ariaLabel?: string
  /** Whether to animate rods appearing (default: true) */
  animate?: boolean
  /** Focused rod IDs — rendered with higher opacity */
  focusedRodIds?: string[]
}

/**
 * Renders a complete RakauConfiguration on a RakauMat.
 *
 * Rods appear one at a time with a 150ms stagger (mimicking the kaiako
 * silently placing rods). Respects `prefers-reduced-motion`.
 *
 * Uses CSS animation (rodPlace keyframe defined in globals.css) so the
 * animation is GPU-accelerated and can be disabled via media query.
 */
export function RakauArrangement({
  config,
  ariaLabel,
  animate = true,
  focusedRodIds,
}: RakauArrangementProps) {
  const [reduceMotion, setReduceMotion] = useState(false)
  const checkedRef = useRef(false)

  useEffect(() => {
    if (checkedRef.current) return
    checkedRef.current = true
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const skipAnimation = !animate || reduceMotion
  const label = ariaLabel ?? config.description

  return (
    <div className="inline-block">
      <RakauMat
        gridWidth={config.matSize.width}
        gridHeight={config.matSize.height}
        ariaLabel={label}
      >
        {config.rods.map((rod, index) => (
          <RakauRod
            key={rod.id ?? `rod-${index}`}
            rod={rod}
            focused={focusedRodIds ? focusedRodIds.includes(rod.id ?? '') : false}
            delayIndex={index}
            skipAnimation={skipAnimation}
          />
        ))}
      </RakauMat>
    </div>
  )
}
