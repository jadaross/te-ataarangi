/**
 * Types for rākau (Cuisenaire rod) configurations.
 * Rod colours match the canonical table in CLAUDE.md.
 */

export type RodColour =
  | 'ma'            // white       — length 1
  | 'whero'         // red         — length 2
  | 'kakariki'      // light green — length 3
  | 'wateri'        // purple      — length 4
  | 'kowhai'        // yellow      — length 5
  | 'kakariki-nui'  // dark green  — length 6
  | 'mangu'         // black       — length 7
  | 'parauri'       // brown       — length 8
  | 'kahurangi'     // blue        — length 9
  | 'karaka'        // orange      — length 10

export interface Rod {
  id?: string
  colour: RodColour
  orientation: 'horizontal' | 'vertical'
  position: {
    x: number // Grid units from left
    y: number // Grid units from top
  }
  label?: string // Optional ARIA label override
}

export interface RakauConfiguration {
  id: string
  rods: Rod[]
  matSize: {
    width: number  // Grid units
    height: number // Grid units
  }
  description: string          // Māori description of the arrangement
  descriptionEnglish?: string  // English (for content authoring only)
  focusRodIds?: string[]       // Highlight specific rods for attention
}

/**
 * Canonical rod data: name (with macrons), length, and hex colour.
 */
export const ROD_DATA: Record<RodColour, { nameMaori: string; length: number; hex: string }> = {
  ma:            { nameMaori: 'Mā',           length: 1,  hex: '#FFFFFF' },
  whero:         { nameMaori: 'Whero',         length: 2,  hex: '#E63946' },
  kakariki:      { nameMaori: 'Kākāriki',      length: 3,  hex: '#57CC99' },
  wateri:        { nameMaori: 'Wāteri',        length: 4,  hex: '#9B5DE5' },
  kowhai:        { nameMaori: 'Kōwhai',        length: 5,  hex: '#FFD166' },
  'kakariki-nui': { nameMaori: 'Kākāriki nui', length: 6,  hex: '#2D6A4F' },
  mangu:         { nameMaori: 'Mangu',         length: 7,  hex: '#212529' },
  parauri:       { nameMaori: 'Parauri',       length: 8,  hex: '#8B5E3C' },
  kahurangi:     { nameMaori: 'Kahurangi',     length: 9,  hex: '#118AB2' },
  karaka:        { nameMaori: 'Karaka',        length: 10, hex: '#F77F00' },
}
