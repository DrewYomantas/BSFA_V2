import { describe, expect, it } from 'vitest'
import { buildHearthDimensionSummary, buildHearthShapePoints } from '../../src/lib/hearthGeometry3d.js'
import {
  CUSTOMER_HEARTH_SHAPE_OPTIONS,
  DEFAULT_CUSTOMER_HEARTH_MODEL,
  HEARTH_SHAPES,
  hearthShapeForPacketType,
  packetTypeForHearthShape,
  updateHearthDimension,
  updateHearthShape,
} from '../../src/lib/sharedHearthModel.js'
import { buildStoneShopShapeModel } from '../../src/lib/stoneShop/stoneShopShapeModel.js'
import { createStoneShopPacket } from '../../src/lib/stoneShop/stoneShopPersistence.js'

describe('3D hearth shared model and geometry', () => {
  it('updates width depth and thickness on the shared model', () => {
    let model = updateHearthDimension(DEFAULT_CUSTOMER_HEARTH_MODEL, 'widthInches', 96)
    model = updateHearthDimension(model, 'depthInches', 20)
    model = updateHearthDimension(model, 'thicknessInches', 3)

    expect(buildHearthDimensionSummary(model)).toMatchObject({
      width: 96,
      depth: 20,
      thickness: 3,
    })
  })

  it('changes point geometry for each front shape', () => {
    const straight = buildHearthShapePoints(DEFAULT_CUSTOMER_HEARTH_MODEL)
    const clipped = buildHearthShapePoints(updateHearthShape(DEFAULT_CUSTOMER_HEARTH_MODEL, 'clipped_corners'))
    const angle = buildHearthShapePoints(updateHearthShape(DEFAULT_CUSTOMER_HEARTH_MODEL, 'angle_cuts'))
    const radius = buildHearthShapePoints(updateHearthShape(DEFAULT_CUSTOMER_HEARTH_MODEL, 'radius_front'))

    expect(straight).toHaveLength(4)
    expect(clipped).toHaveLength(6)
    expect(angle).toHaveLength(6)
    expect(radius.length).toBeGreaterThan(10)
    expect(radius).not.toEqual(straight)
  })

  it('keeps customer and backstage front shape mappings stable through the shared model', () => {
    expect(CUSTOMER_HEARTH_SHAPE_OPTIONS.map((option) => option.shape)).toEqual([
      HEARTH_SHAPES.BASIC,
      HEARTH_SHAPES.CLIPPED_CORNERS,
      HEARTH_SHAPES.ANGLE_CUTS,
      HEARTH_SHAPES.RADIUS_FRONT,
    ])

    expect(CUSTOMER_HEARTH_SHAPE_OPTIONS.map((option) => option.label)).toEqual([
      'Straight',
      'Clipped corners',
      'Angle cuts',
      'Radius front',
    ])

    expect(hearthShapeForPacketType('hearth_clipped_corners')).toBe(HEARTH_SHAPES.CLIPPED_CORNERS)
    expect(packetTypeForHearthShape(HEARTH_SHAPES.RADIUS_FRONT)).toBe('hearth_radius_front')
    expect(buildStoneShopShapeModel(createStoneShopPacket({ packetType: 'hearth_angle_cuts' })).hearthShape).toBe(HEARTH_SHAPES.ANGLE_CUTS)
  })
})
