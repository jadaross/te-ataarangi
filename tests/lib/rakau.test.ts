import { describe, it, expect } from 'vitest'
import {
  getRodPixelLength,
  getRodSvgRect,
  getRodAriaLabel,
  getMatPixelSize,
  ROD_BASE_UNIT,
  ROD_WIDTH,
} from '@/lib/rakau'
import type { Rod } from '@/types/rakau'

describe('getRodPixelLength', () => {
  it('returns 20 for white (mā, length 1)', () => {
    expect(getRodPixelLength('ma')).toBe(20)
  })

  it('returns 40 for red (whero, length 2)', () => {
    expect(getRodPixelLength('whero')).toBe(40)
  })

  it('returns 200 for orange (karaka, length 10)', () => {
    expect(getRodPixelLength('karaka')).toBe(200)
  })

  it('returns correct length for each rod colour', () => {
    const cases: Array<[import('@/types/rakau').RodColour, number]> = [
      ['ma', 1 * ROD_BASE_UNIT],
      ['whero', 2 * ROD_BASE_UNIT],
      ['kakariki', 3 * ROD_BASE_UNIT],
      ['wateri', 4 * ROD_BASE_UNIT],
      ['kowhai', 5 * ROD_BASE_UNIT],
      ['kakariki-nui', 6 * ROD_BASE_UNIT],
      ['mangu', 7 * ROD_BASE_UNIT],
      ['parauri', 8 * ROD_BASE_UNIT],
      ['kahurangi', 9 * ROD_BASE_UNIT],
      ['karaka', 10 * ROD_BASE_UNIT],
    ]
    for (const [colour, expected] of cases) {
      expect(getRodPixelLength(colour)).toBe(expected)
    }
  })
})

describe('getRodSvgRect', () => {
  it('horizontal rod has width=length*20 and height=16', () => {
    const rod: Rod = {
      colour: 'whero',
      orientation: 'horizontal',
      position: { x: 0, y: 0 },
    }
    const rect = getRodSvgRect(rod)
    // whero = length 2 → 2 * 20 = 40
    expect(rect.width).toBe(40)
    expect(rect.height).toBe(ROD_WIDTH)
    expect(rect.height).toBe(16)
  })

  it('vertical rod has width=16 and height=length*20', () => {
    const rod: Rod = {
      colour: 'kakariki',
      orientation: 'vertical',
      position: { x: 0, y: 0 },
    }
    const rect = getRodSvgRect(rod)
    // kakariki = length 3 → 3 * 20 = 60
    expect(rect.width).toBe(ROD_WIDTH)
    expect(rect.width).toBe(16)
    expect(rect.height).toBe(60)
  })

  it('computes correct x and y from grid position', () => {
    const rod: Rod = {
      colour: 'ma',
      orientation: 'horizontal',
      position: { x: 3, y: 5 },
    }
    const rect = getRodSvgRect(rod)
    expect(rect.x).toBe(3 * ROD_BASE_UNIT)
    expect(rect.y).toBe(5 * ROD_BASE_UNIT)
  })

  it('orange rod horizontal: width=200, height=16', () => {
    const rod: Rod = {
      colour: 'karaka',
      orientation: 'horizontal',
      position: { x: 0, y: 0 },
    }
    const rect = getRodSvgRect(rod)
    expect(rect.width).toBe(200)
    expect(rect.height).toBe(16)
  })
})

describe('getRodAriaLabel', () => {
  it('returns a string containing the Māori name', () => {
    const label = getRodAriaLabel('whero')
    expect(label).toContain('Whero')
  })

  it('returns a string containing the length', () => {
    const label = getRodAriaLabel('karaka')
    expect(label).toContain('10')
  })

  it('contains rākau for white rod', () => {
    const label = getRodAriaLabel('ma')
    expect(label).toContain('Mā')
    expect(label).toContain('1')
  })

  it('contains Māori name and length for each colour', () => {
    const cases: Array<[import('@/types/rakau').RodColour, string, number]> = [
      ['ma', 'Mā', 1],
      ['whero', 'Whero', 2],
      ['kakariki', 'Kākāriki', 3],
      ['wateri', 'Wāteri', 4],
      ['kowhai', 'Kōwhai', 5],
      ['kakariki-nui', 'Kākāriki nui', 6],
      ['mangu', 'Mangu', 7],
      ['parauri', 'Parauri', 8],
      ['kahurangi', 'Kahurangi', 9],
      ['karaka', 'Karaka', 10],
    ]
    for (const [colour, maoriName, length] of cases) {
      const label = getRodAriaLabel(colour)
      expect(label).toContain(maoriName)
      expect(label).toContain(String(length))
    }
  })
})

describe('getMatPixelSize', () => {
  it('returns correct pixel dimensions for a 10x8 grid', () => {
    const { width, height } = getMatPixelSize(10, 8)
    expect(width).toBe(10 * ROD_BASE_UNIT)
    expect(width).toBe(200)
    expect(height).toBe(8 * ROD_BASE_UNIT)
    expect(height).toBe(160)
  })

  it('returns correct pixel dimensions for a 1x1 grid', () => {
    const { width, height } = getMatPixelSize(1, 1)
    expect(width).toBe(ROD_BASE_UNIT)
    expect(height).toBe(ROD_BASE_UNIT)
  })

  it('scales proportionally', () => {
    const { width, height } = getMatPixelSize(5, 3)
    expect(width).toBe(100)
    expect(height).toBe(60)
  })
})
