import { describe, expect, it } from 'vitest'
import {
  centimetersToInches,
  formatDimensionForUnit,
  formatFeetInches,
  inchesToCentimeters,
  inchesToMillimeters,
  millimetersToInches,
  parseDimensionInputToInches,
} from '../../src/lib/stoneShop/unitConversion.js'

describe('stone shop unit conversion', () => {
  it('converts inches to centimeters and millimeters', () => {
    expect(inchesToCentimeters(96)).toBe(243.8)
    expect(inchesToMillimeters(96)).toBe(2438)
  })

  it('converts centimeters and millimeters to inches', () => {
    expect(centimetersToInches(243.84)).toBe(96)
    expect(millimetersToInches(2438.4)).toBe(96)
  })

  it('formats feet and inches display', () => {
    expect(formatFeetInches(96)).toBe('8\' 0"')
    expect(formatDimensionForUnit(16, 'feet_inches')).toBe('1\' 4"')
  })

  it('parses display input back to internal inches', () => {
    expect(parseDimensionInputToInches('243.84', 'centimeters')).toBe(96)
    expect(parseDimensionInputToInches('2438.4', 'millimeters')).toBe(96)
    expect(parseDimensionInputToInches('8\' 0"', 'feet_inches')).toBe(96)
  })
})
