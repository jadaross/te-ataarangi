'use client'

import { useState } from 'react'
import type { RodColour } from '@/types/rakau'
import type { Rod } from '@/types/rakau'
import { ROD_DATA } from '@/types/rakau'
import { ALL_ROD_COLOURS, ROD_BASE_UNIT, ROD_WIDTH, getRodHex, getRodMaoriName } from '@/lib/rakau'
import { useRakauArrangement } from '@/hooks/useRakauArrangement'
import { RakauMat } from './RakauMat'
import { RakauRod } from './RakauRod'

/**
 * Interactive drag-and-drop (click-to-place) rākau sandbox.
 *
 * Interaction model:
 * 1. Click a rod in the palette → it becomes "selected" (highlighted)
 * 2. Click a position on the mat → place the selected rod there
 * 3. Click a placed rod on the mat → remove it
 *
 * The mat is fixed at 20×16 grid units.
 * Uses useRakauArrangement for state management.
 *
 * All UI text is in te reo Māori (learning route).
 */

const SANDBOX_MAT_WIDTH = 20
const SANDBOX_MAT_HEIGHT = 16
const MAT_PADDING = 20 // Must match RakauMat.tsx padding value

export function RakauSandbox() {
  const { configuration, addRod, removeRod, clearAll } = useRakauArrangement({
    matSize: { width: SANDBOX_MAT_WIDTH, height: SANDBOX_MAT_HEIGHT },
    description: 'He kōpae rākau',
  })

  const [selectedColour, setSelectedColour] = useState<RodColour | null>(null)
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal')

  function handleMatClick(e: React.MouseEvent<SVGSVGElement>) {
    if (!selectedColour) return

    const svg = e.currentTarget
    const rect = svg.getBoundingClientRect()

    // viewBox dimensions: totalWidth × totalHeight
    const matPixelWidth = SANDBOX_MAT_WIDTH * ROD_BASE_UNIT
    const matPixelHeight = SANDBOX_MAT_HEIGHT * ROD_BASE_UNIT
    const totalWidth = matPixelWidth + MAT_PADDING * 2
    const totalHeight = matPixelHeight + MAT_PADDING * 2

    // Scale from rendered pixels to viewBox coordinates
    const scaleX = totalWidth / rect.width
    const scaleY = totalHeight / rect.height

    const svgX = (e.clientX - rect.left) * scaleX
    const svgY = (e.clientY - rect.top) * scaleY

    // Subtract mat padding offset (rod content starts at padding, padding)
    const contentX = svgX - MAT_PADDING
    const contentY = svgY - MAT_PADDING

    // Snap to nearest grid unit
    const gridX = Math.round(contentX / ROD_BASE_UNIT)
    const gridY = Math.round(contentY / ROD_BASE_UNIT)

    // Clamp within mat bounds
    const rodLength = ROD_DATA[selectedColour].length
    const maxX = orientation === 'horizontal' ? SANDBOX_MAT_WIDTH - rodLength : SANDBOX_MAT_WIDTH - 1
    const maxY = orientation === 'vertical' ? SANDBOX_MAT_HEIGHT - rodLength : SANDBOX_MAT_HEIGHT - 1

    const clampedX = Math.max(0, Math.min(gridX, maxX))
    const clampedY = Math.max(0, Math.min(gridY, maxY))

    const newRod: Rod = {
      colour: selectedColour,
      orientation,
      position: { x: clampedX, y: clampedY },
    }
    addRod(newRod)
  }

  function handleRodClick(e: React.MouseEvent, rodId: string | undefined) {
    e.stopPropagation()
    if (rodId) removeRod(rodId)
  }

  function toggleOrientation() {
    setOrientation((prev) => (prev === 'horizontal' ? 'vertical' : 'horizontal'))
  }

  const matPixelWidth = SANDBOX_MAT_WIDTH * ROD_BASE_UNIT
  const matPixelHeight = SANDBOX_MAT_HEIGHT * ROD_BASE_UNIT
  const totalWidth = matPixelWidth + MAT_PADDING * 2
  const totalHeight = matPixelHeight + MAT_PADDING * 2

  return (
    <div className="space-y-4" lang="mi">
      {/* Rod palette */}
      <section aria-labelledby="palette-heading">
        <h2
          id="palette-heading"
          className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3"
          lang="mi"
        >
          Tīpakohia he rākau
        </h2>
        <div
          role="group"
          aria-label="Ngā rākau — tīpakohia tētahi"
          className="flex flex-wrap gap-2"
        >
          {ALL_ROD_COLOURS.map((colour) => {
            const hex = getRodHex(colour)
            const name = getRodMaoriName(colour)
            const isLight = colour === 'ma' || colour === 'kowhai'
            const isSelected = selectedColour === colour
            const rodLength = ROD_DATA[colour].length

            return (
              <button
                key={colour}
                type="button"
                lang="mi"
                aria-label={`Tīpakohia he rākau ${name}`}
                aria-pressed={isSelected}
                onClick={() => setSelectedColour((prev) => (prev === colour ? null : colour))}
                className={[
                  'relative flex flex-col items-center gap-1 p-2 rounded-lg border transition-all duration-150',
                  'min-h-[44px] min-w-[44px] focus-visible:outline-2 focus-visible:outline-accent',
                  isSelected
                    ? 'border-accent bg-accent/10 shadow-md scale-105'
                    : 'border-border bg-surface hover:border-border-strong hover:bg-border/30',
                ].join(' ')}
              >
                {/* Rod swatch — proportional width */}
                <div
                  aria-hidden="true"
                  style={{
                    backgroundColor: hex,
                    width: Math.max(rodLength * 4, 8),
                    height: ROD_WIDTH,
                    borderRadius: 3,
                    border: isLight ? '1px solid #C8C0B0' : '1px solid rgba(0,0,0,0.15)',
                    boxShadow: '1px 2px 3px rgba(0,0,0,0.2)',
                    flexShrink: 0,
                  }}
                />
                <span className="text-xs text-text-secondary leading-tight text-center" lang="mi">
                  {name}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Controls */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Orientation toggle */}
        <button
          type="button"
          lang="mi"
          aria-label={
            orientation === 'horizontal'
              ? 'Huri ki te tū — rākau tū'
              : 'Huri ki te takoto — rākau takoto'
          }
          onClick={toggleOrientation}
          className="min-h-[44px] px-4 py-2 rounded-lg border border-border bg-surface text-sm font-medium text-text-secondary hover:bg-border/30 hover:border-border-strong transition-colors focus-visible:outline-2 focus-visible:outline-accent"
        >
          {orientation === 'horizontal' ? 'Takoto → Tū' : 'Tū → Takoto'}
        </button>

        {/* Clear all */}
        <button
          type="button"
          lang="mi"
          aria-label="Tīkina katoa — whakakore ngā rākau katoa"
          onClick={clearAll}
          disabled={configuration.rods.length === 0}
          className="min-h-[44px] px-4 py-2 rounded-lg border border-border bg-surface text-sm font-medium text-text-secondary hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-40 disabled:cursor-default"
        >
          Tīkina katoa
        </button>

        {/* Orientation indicator */}
        {selectedColour && (
          <span className="text-sm text-text-muted" lang="mi" aria-live="polite">
            {orientation === 'horizontal' ? 'Takoto' : 'Tū'} —{' '}
            <span
              style={{
                color: getRodHex(selectedColour),
                textShadow:
                  selectedColour === 'ma' || selectedColour === 'kowhai'
                    ? '0 0 1px rgba(0,0,0,0.5)'
                    : 'none',
                fontWeight: 600,
              }}
            >
              {getRodMaoriName(selectedColour)}
            </span>
          </span>
        )}
      </div>

      {/* Mat area */}
      <section aria-labelledby="mat-heading">
        <h2
          id="mat-heading"
          className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3"
          lang="mi"
        >
          {selectedColour
            ? 'Pāwhiria te āpure hei whakatū rākau'
            : 'Tīpakohia he rākau i runga ake'}
        </h2>

        <svg
          role="img"
          aria-label={configuration.description}
          width={totalWidth}
          height={totalHeight}
          viewBox={`0 0 ${totalWidth} ${totalHeight}`}
          xmlns="http://www.w3.org/2000/svg"
          className="block cursor-crosshair"
          style={{
            maxWidth: '100%',
            height: 'auto',
            cursor: selectedColour ? 'crosshair' : 'default',
          }}
          onClick={handleMatClick}
        >
          <defs>
            <pattern id="sandbox-mat-weave" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <line x1="0" y1="10" x2="20" y2="10" stroke="#8B7355" strokeWidth="0.5" opacity={0.06} />
              <line x1="10" y1="0" x2="10" y2="20" stroke="#8B7355" strokeWidth="0.5" opacity={0.06} />
            </pattern>
            <filter id="sandbox-mat-shadow" x="-5%" y="-5%" width="110%" height="115%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#5C4A2A" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Mat background */}
          <rect
            x={2}
            y={2}
            width={totalWidth - 4}
            height={totalHeight - 4}
            rx={8}
            fill="#EDE5D4"
            stroke="#C4B59A"
            strokeWidth={1.5}
            filter="url(#sandbox-mat-shadow)"
          />
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
          <rect
            x={MAT_PADDING}
            y={MAT_PADDING}
            width={matPixelWidth}
            height={matPixelHeight}
            rx={4}
            fill="#FAF7F0"
          />
          <rect
            x={MAT_PADDING}
            y={MAT_PADDING}
            width={matPixelWidth}
            height={matPixelHeight}
            rx={4}
            fill="url(#sandbox-mat-weave)"
          />

          {/* Clickable hit area for placing rods */}
          <rect
            x={MAT_PADDING}
            y={MAT_PADDING}
            width={matPixelWidth}
            height={matPixelHeight}
            fill="transparent"
            aria-hidden="true"
          />

          {/* Placed rods — offset by padding */}
          <g transform={`translate(${MAT_PADDING}, ${MAT_PADDING})`}>
            {configuration.rods.map((rod, index) => (
              <g
                key={rod.id ?? `rod-${index}`}
                onClick={(e) => handleRodClick(e, rod.id)}
                style={{ cursor: 'pointer' }}
                role="button"
                aria-label={`Tango rākau ${getRodMaoriName(rod.colour)}`}
              >
                <RakauRod
                  rod={rod}
                  skipAnimation={false}
                  delayIndex={0}
                />
              </g>
            ))}
          </g>
        </svg>
      </section>

      {/* Rod count */}
      {configuration.rods.length > 0 && (
        <p className="text-sm text-text-muted" lang="mi" aria-live="polite">
          {configuration.rods.length}{' '}
          {configuration.rods.length === 1 ? 'rākau' : 'ngā rākau'} i runga i te āpure
        </p>
      )}
    </div>
  )
}
