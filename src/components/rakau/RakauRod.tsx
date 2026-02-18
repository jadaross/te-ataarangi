'use client'

import type { Rod } from '@/types/rakau'
import { getRodSvgRect, getRodHex, getRodAriaLabel, getRodMaoriName } from '@/lib/rakau'

interface RakauRodProps {
  rod: Rod
  /** Whether to highlight this rod (focus state) */
  focused?: boolean
  /** Animation delay index (for staggered appearance) */
  delayIndex?: number
  /** Skip animation entirely */
  skipAnimation?: boolean
}

/**
 * Renders a single Cuisenaire rod as an SVG <rect>.
 *
 * Proportional lengths: base 20px × rod length value.
 * All rods are 16px wide.
 * ARIA label in te reo Māori: "He rākau {colour}, {length} ōrau te roa".
 */
export function RakauRod({ rod, focused = false, delayIndex = 0, skipAnimation = false }: RakauRodProps) {
  const rect = getRodSvgRect(rod)
  const hex = getRodHex(rod.colour)
  const ariaLabel = rod.label ?? getRodAriaLabel(rod.colour)
  const maoriName = getRodMaoriName(rod.colour)

  // Derive a lighter tint for the highlight stripe (top edge)
  const isLight = rod.colour === 'ma' || rod.colour === 'kowhai'

  const animationStyle = skipAnimation
    ? {}
    : {
        animation: `rodPlace 0.2s ease-out ${delayIndex * 0.15}s both`,
      }

  return (
    <g
      role="img"
      aria-label={ariaLabel}
      style={animationStyle}
    >
      {/* Rod shadow */}
      <rect
        x={rect.x + 1}
        y={rect.y + 2}
        width={rect.width}
        height={rect.height}
        rx={3}
        ry={3}
        fill="rgba(0,0,0,0.20)"
      />

      {/* Rod body */}
      <rect
        x={rect.x}
        y={rect.y}
        width={rect.width}
        height={rect.height}
        rx={3}
        ry={3}
        fill={hex}
        stroke={isLight ? '#C8C0B0' : 'rgba(0,0,0,0.15)'}
        strokeWidth={0.5}
        className="transition-opacity duration-150"
        style={{ opacity: focused ? 1 : 0.92 }}
      />

      {/* Highlight stripe — top/left edge for depth */}
      <rect
        x={rect.x + 1}
        y={rect.y + 1}
        width={rod.orientation === 'horizontal' ? rect.width - 2 : 4}
        height={rod.orientation === 'horizontal' ? 4 : rect.height - 2}
        rx={2}
        fill="rgba(255,255,255,0.25)"
        aria-hidden="true"
      />

      {/* Hidden accessible text for screen readers */}
      <title lang="mi">{maoriName}</title>
    </g>
  )
}

// Attach orientation to props so SVG consumers can read it
RakauRod.displayName = 'RakauRod'
