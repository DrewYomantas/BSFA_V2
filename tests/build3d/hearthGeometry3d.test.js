import { describe, expect, it } from 'vitest'
import { buildHearthDimensionSummary, buildHearthShapePoints } from '../../src/lib/hearthGeometry3d.js'
import { DEFAULT_CUSTOMER_HEARTH_MODEL, updateHearthDimension, updateHearthShape } from '../../src/lib/sharedHearthModel.js'

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
})
