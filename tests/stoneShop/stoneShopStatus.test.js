import { describe, expect, it } from 'vitest'
import { createStoneShopPacket } from '../../src/lib/stoneShop/stoneShopPersistence.js'
import { deriveStoneShopStatus } from '../../src/lib/stoneShop/stoneShopStatus.js'

function readyBase(overrides = {}) {
  const base = createStoneShopPacket()
  const packet = {
    ...base,
    ...overrides,
    dimensions: {
      ...base.dimensions,
      widthInches: 60,
      depthInches: 24,
      ...(overrides.dimensions || {}),
    },
    verification: {
      ...base.verification,
      ...{
        fieldMeasureConfirmed: true,
        materialApproved: true,
        customerSignatureCaptured: true,
        managerReviewedPricing: true,
        shopReadyApproved: false,
      },
      ...(overrides.verification || {}),
    },
  }

  return packet
}

describe('stone shop status', () => {
  it('returns missing dimensions status', () => {
    const packet = readyBase({ dimensions: { widthInches: null } })
    expect(deriveStoneShopStatus(packet).label).toBe('Needs Dimensions')
  })

  it('returns missing field measure status', () => {
    const packet = readyBase({ verification: { fieldMeasureConfirmed: false } })
    expect(deriveStoneShopStatus(packet)).toEqual(expect.objectContaining({
      label: 'Needs Field Verification',
      next: 'Next: confirm field measure before releasing this to shop.',
    }))
  })

  it('returns missing material approval status', () => {
    const packet = readyBase({ verification: { materialApproved: false } })
    expect(deriveStoneShopStatus(packet).label).toBe('Needs Material Approval')
  })

  it('returns ready for shop review before final internal approval', () => {
    expect(deriveStoneShopStatus(readyBase()).label).toBe('Ready for Shop Review')
  })

  it('returns shop ready after final internal approval', () => {
    const packet = readyBase({ verification: { shopReadyApproved: true } })
    expect(deriveStoneShopStatus(packet).label).toBe('Shop Ready')
  })
})
