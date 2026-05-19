import { describe, expect, it } from 'vitest'
import { createStoneShopPacket } from '../../src/lib/stoneShop/stoneShopPersistence.js'
import {
  calculateAddersSubtotal,
  calculateSqFt,
  calculateStoneShopPricing,
  lookupMaterialRate,
} from '../../src/lib/stoneShop/stoneShopCalculations.js'

describe('stone shop calculations', () => {
  it('calculates square footage from width and depth in inches', () => {
    expect(calculateSqFt(60, 24)).toBe(10)
    expect(calculateSqFt(61, 25)).toBe(10.59)
  })

  it('looks up rate by material and thickness', () => {
    expect(lookupMaterialRate('Limestone', '3 inch').ratePerSqFt).toBe(64)
    expect(lookupMaterialRate('Bluestone', '2 inch').ratePerSqFt).toBe(60)
  })

  it('calculates each fabrication adder family', () => {
    expect(calculateAddersSubtotal({
      angleCuts: 2,
      notches: 1,
      holes: 1,
      cutouts: 1,
      radiusCorners: 2,
      radiusFrontEdge: true,
    })).toBe(725)
  })

  it('calculates estimated total from material subtotal and adders', () => {
    const packet = createStoneShopPacket({
      material: {
        name: 'Limestone',
        thickness: '3 inch',
        finish: '',
        edge: '',
        source: 'rep_selected',
      },
      dimensions: {
        widthInches: 60,
        depthInches: 24,
        heightInches: null,
        leftReturnInches: null,
        rightReturnInches: null,
        notes: '',
      },
      fabrication: {
        angleCuts: 2,
        notches: 0,
        holes: 0,
        cutouts: 0,
        radiusCorners: 0,
        radiusFrontEdge: false,
        polishLinearFeet: null,
        customNotes: '',
      },
    })

    expect(calculateStoneShopPricing(packet)).toEqual(expect.objectContaining({
      sqFt: 10,
      materialRate: 64,
      materialSubtotal: 640,
      addersSubtotal: 80,
      estimatedTotal: 720,
    }))
  })
})
