'use client'

import { useState } from 'react'

interface MacronKeyboardProps {
  /** Called with the character to insert when a key is pressed */
  onInsert: (char: string) => void
}

const VOWELS = ['a', 'e', 'i', 'o', 'u'] as const
const MACRON_MAP: Record<string, string> = {
  a: 'ā',
  e: 'ē',
  i: 'ī',
  o: 'ō',
  u: 'ū',
  A: 'Ā',
  E: 'Ē',
  I: 'Ī',
  O: 'Ō',
  U: 'Ū',
}

/**
 * A compact row of buttons for inserting macronised vowels into a text input.
 *
 * Essential for mobile users who may not have a Māori keyboard.
 * Supports uppercase/lowercase toggle via a shift button.
 * All labels are in te reo Māori.
 */
export function MacronKeyboard({ onInsert }: MacronKeyboardProps) {
  const [uppercase, setUppercase] = useState(false)

  return (
    <div
      lang="mi"
      className="flex items-center gap-1.5 flex-wrap"
      aria-label="Pātene tohutō"
      role="group"
    >
      {/* Macron vowel buttons */}
      {VOWELS.map((vowel) => {
        const base = uppercase ? vowel.toUpperCase() : vowel
        const macronChar = MACRON_MAP[base]
        return (
          <button
            key={vowel}
            type="button"
            lang="mi"
            aria-label={`Pātene ${macronChar}`}
            onClick={() => onInsert(macronChar)}
            className="min-h-[44px] min-w-[44px] px-3 py-2 bg-surface border border-border rounded-lg text-base font-medium text-text-primary hover:bg-border/40 hover:border-border-strong transition-colors focus-visible:outline-2 focus-visible:outline-accent"
          >
            {macronChar}
          </button>
        )
      })}

      {/* Uppercase / lowercase shift toggle */}
      <button
        type="button"
        lang="mi"
        aria-label={uppercase ? 'Huri ki ngā reta iti' : 'Huri ki ngā reta nui'}
        aria-pressed={uppercase}
        onClick={() => setUppercase((prev) => !prev)}
        className={[
          'min-h-[44px] px-3 py-2 border rounded-lg text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-accent',
          uppercase
            ? 'bg-accent text-white border-accent hover:bg-accent/90'
            : 'bg-surface border-border text-text-secondary hover:bg-border/40 hover:border-border-strong',
        ].join(' ')}
      >
        {uppercase ? '↑ NUI' : '↑ iti'}
      </button>
    </div>
  )
}
