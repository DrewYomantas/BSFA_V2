import { describe, expect, it } from 'vitest'
import { buildHearthGeometry } from '../../src/components/stoneShop/visual/hearthGeometry.js'
import { buildStoneShopShapeModel, hearthShapeForPacketType, packetTypeForHearthShape } from '../../src/lib/stoneShop/stoneShopShapeModel.js'
import { createStoneShopPacket } from '../../src/lib/stoneShop/stoneShopPersistence.js'

describe('hearth visual geometry', () => {
  it('renders basic hearth as a rectangle polygon', () => {
    const model = buildStoneShopShapeModel(createStoneShopPacket({ packetType: 'hearth' }))
    const geometry = buildHearthGeometry(model)

    expect(geometry.points).toHaveLength(4)
    expect(geometry.path).toBeUndefined()
  })

  it('renders clipped corner hearth as a clipped polygon', () => {
    const model = buildStoneShopShapeModel(createStoneShopPacket({ packetType: 'hearth_clipped_corners' }))
    const geometry = buildHearthGeometry(model)

    expect(geometry.points).toHaveLength(6)
    expect(geometry.markers.clipLeft).toBeGreaterThan(0)
  })

  it('renders angle cut hearth as a polygon with angle markers', () => {
    const model = buildStoneShopShapeModel(createStoneShopPacket({ packetType: 'hearth_angle_cuts' }))
    const geometry = buildHearthGeometry(model)

    expect(geometry.points).toHaveLength(6)
    expect(geometry.markers.angleLeft).toBeGreaterThan(0)
  })

  it('renders radius front hearth as a curved path', () => {
    const model = buildStoneShopShapeModel(createStoneShopPacket({ packetType: 'hearth_radius_front' }))
    const geometry = buildHearthGeometry(model)

    expect(geometry.path).toContain('Q')
    expect(geometry.markers.radiusDepth).toBeGreaterThan(0)
  })

  it('maps hearth packet types to visual shapes and back', () => {
    expect(hearthShapeForPacketType('hearth_radius_front')).toBe('radius_front')
    expect(packetTypeForHearthShape('angle_cuts')).toBe('hearth_angle_cuts')
  })
})
