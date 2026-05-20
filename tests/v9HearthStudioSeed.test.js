import { describe, expect, it } from 'vitest'
import {
  HEARTH_STUDIO_V9_CAMERAS,
  HEARTH_STUDIO_V9_DEFAULT_STATE,
  HEARTH_STUDIO_V9_LIGHTING,
  HEARTH_STUDIO_V9_MATERIALS,
  buildHearthStudioV9CustomerSummary,
  scanV9CustomerSummaryCopy,
  updateHearthStudioV9Dimension,
} from '../src/data/v9/hearthStudioSeed.js'

describe('V9 Hearth Studio seed data', () => {
  it('defines the default customer-safe proof state', () => {
    expect(HEARTH_STUDIO_V9_DEFAULT_STATE).toMatchObject({
      materialId: 'warm-limestone-placeholder',
      lightingId: 'showroom-warm',
      cameraId: 'seated-view',
      repOverlayOpen: false,
    })
    expect(HEARTH_STUDIO_V9_DEFAULT_STATE.dimensions).toEqual(
      expect.objectContaining({
        hearthWidth: expect.any(Number),
        hearthDepth: expect.any(Number),
        hearthHeight: expect.any(Number),
        openingWidth: expect.any(Number),
        openingHeight: expect.any(Number),
        mantelHeight: expect.any(Number),
        stoneHeight: expect.any(Number),
      }),
    )
  })

  it('contains the requested material lighting and camera presets', () => {
    expect(HEARTH_STUDIO_V9_MATERIALS.map((material) => material.label)).toEqual([
      'Warm Limestone Placeholder',
      'Rustic Fieldstone Placeholder',
      'Cream Cast Stone Placeholder',
      'Dark Honed Hearth Placeholder',
    ])
    expect(HEARTH_STUDIO_V9_LIGHTING.map((lighting) => lighting.label)).toEqual([
      'Showroom Warm',
      'Morning Natural',
      'Golden Hour',
      'Evening Firelight',
    ])
    expect(HEARTH_STUDIO_V9_CAMERAS.map((camera) => camera.label)).toEqual([
      'Seated View',
      'Straight-On',
      'Side Depth',
      'Detail View',
    ])
  })

  it('keeps dimension updates within sane ranges', () => {
    const narrow = updateHearthStudioV9Dimension(HEARTH_STUDIO_V9_DEFAULT_STATE, 'hearthWidth', 12)
    const tall = updateHearthStudioV9Dimension(HEARTH_STUDIO_V9_DEFAULT_STATE, 'stoneHeight', 999)
    const ignored = updateHearthStudioV9Dimension(HEARTH_STUDIO_V9_DEFAULT_STATE, 'unknown', 50)

    expect(narrow.dimensions.hearthWidth).toBe(48)
    expect(tall.dimensions.stoneHeight).toBe(156)
    expect(ignored).toBe(HEARTH_STUDIO_V9_DEFAULT_STATE)
  })

  it('keeps customer summary copy free of banned internal language', () => {
    const summary = buildHearthStudioV9CustomerSummary(HEARTH_STUDIO_V9_DEFAULT_STATE)

    expect(summary.join(' ')).toContain('Hearth study')
    expect(scanV9CustomerSummaryCopy(summary)).toEqual([])
  })
})
