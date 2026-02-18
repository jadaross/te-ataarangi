'use client'

import type { ReactNode } from 'react'
import { getMatPixelSize } from '@/lib/rakau'

interface RakauMatProps {
  /** Width in grid units */
  gridWidth: number
  /** Height in grid units */
  gridHeight: number
  /** Māori ARIA label for the whole arrangement */
  ariaLabel: string
  children?: ReactNode
}

/**
 * SVG viewport representing the woven harakeke mat on which rods are placed.
 *
 * - Warm linen background (#FAF7F0)
 * - Subtle grid lines to suggest weave
 * - role="img" with Māori aria-label
 */
export function RakauMat({ gridWidth, gridHeight, ariaLabel, children }: RakauMatProps) {
  const { width, height } = getMatPixelSize(gridWidth, gridHeight)
  const gridLineOpacity = 0.06

  // Padding around the mat content
  const padding = 20
  const totalWidth = width + padding * 2
  const totalHeight = height + padding * 2

  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      width={totalWidth}
      height={totalHeight}
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      className="block"
      style={{ maxWidth: '100%', height: 'auto' }}
    >
      <defs>
        {/* Mat texture pattern — subtle woven lines */}
        <pattern id="mat-weave" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          {/* Horizontal warp */}
          <line x1="0" y1="10" x2="20" y2="10" stroke="#8B7355" strokeWidth="0.5" opacity={gridLineOpacity} />
          {/* Vertical weft */}
          <line x1="10" y1="0" x2="10" y2="20" stroke="#8B7355" strokeWidth="0.5" opacity={gridLineOpacity} />
        </pattern>

        {/* Subtle inner shadow on mat edges */}
        <filter id="mat-inset">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feOffset dx="1" dy="1" />
          <feComposite in2="SourceGraphic" operator="arithmetic" k2="-1" k3="1" />
        </filter>

        {/* Drop shadow for the mat itself */}
        <filter id="mat-shadow" x="-5%" y="-5%" width="110%" height="115%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#5C4A2A" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Outer mat area — kōwhaiwhai-inspired border */}
      <rect
        x={2}
        y={2}
        width={totalWidth - 4}
        height={totalHeight - 4}
        rx={8}
        fill="#EDE5D4"
        stroke="#C4B59A"
        strokeWidth={1.5}
        filter="url(#mat-shadow)"
      />

      {/* Decorative border stripe (kōwhaiwhai-inspired) */}
      <rect
        x={6}
        y={6}
        width={totalWidth - 12}
        height={totalHeight - 12}
        rx={5}
        fill="none"
        stroke="#2D6A4F"
        strokeWidth={1}
        strokeDasharray="4 4"
        opacity={0.3}
      />

      {/* Inner mat surface */}
      <rect
        x={padding}
        y={padding}
        width={width}
        height={height}
        rx={4}
        fill="#FAF7F0"
      />

      {/* Woven texture overlay */}
      <rect
        x={padding}
        y={padding}
        width={width}
        height={height}
        rx={4}
        fill="url(#mat-weave)"
      />

      {/* Rod content — offset by padding */}
      <g transform={`translate(${padding}, ${padding})`}>
        {children}
      </g>
    </svg>
  )
}
