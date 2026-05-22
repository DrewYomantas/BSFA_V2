import { describe, expect, it } from 'vitest'
import { hearthVisualAssetSeed } from '../../src/data/hearthVisualAssets/hearthVisualAssetSeed.js'
import {
  assertNoCustomerUnsafeTerms,
  buildCustomerSafeDisclaimer,
  buildVisualAssetSummary,
  getVisualAssetSourceBlockers,
  isCustomerSafeVisualAsset,
  isReferenceReadyVisualAsset,
  normalizeHearthVisualAsset,
  visualAssetCustomerDisclaimer,
} from '../../src/lib/hearthVisualAssets/hearthVisualAssetModel.js'

describe('hearth visual asset model', () => {
  it('requires the customer-safe disclaimer for customer-safe material references', () => {
    const nantucket = hearthVisualAssetSeed.find((asset) => asset.id === 'eldorado-nantucket-stacked-stone')
    const normalized = normalizeHearthVisualAsset(nantucket)

    expect(isCustomerSafeVisualAsset(normalized)).toBe(true)
    expect(normalized.customerDisclaimer).toBe(visualAssetCustomerDisclaimer)
    expect(buildCustomerSafeDisclaimer(normalized)).toBe(visualAssetCustomerDisclaimer)
  })

  it('keeps customer-safe summaries clear of banned internal terms', () => {
    const summary = buildVisualAssetSummary(
      hearthVisualAssetSeed.find((asset) => asset.id === 'eldorado-nantucket-stacked-stone'),
    )

    expect(summary).not.toHaveProperty('internalNotes')
    expect(summary).not.toHaveProperty('sourceConfidence')
    expect(summary).not.toHaveProperty('prohibitedUses')
    expect(() => assertNoCustomerUnsafeTerms(summary)).not.toThrow()
  })

  it('categorizes Nantucket as a visual stone sample without exact-product claims', () => {
    const nantucket = normalizeHearthVisualAsset(
      hearthVisualAssetSeed.find((asset) => asset.id === 'eldorado-nantucket-stacked-stone'),
    )

    expect(nantucket.assetType).toBe('stone_sample')
    expect(nantucket.vendor).toBe('Eldorado Stone')
    expect(nantucket.productName).toBe('Nantucket')
    expect(nantucket.profileOrSeries).toBe('Stacked Stone')
    expect(nantucket.reviewStatus).toBe('reference_ready')
    expect(nantucket.customerSafeUse).toBe('customer material reference')
    expect(isReferenceReadyVisualAsset(nantucket)).toBe(true)
    expect(nantucket.allowedUses).toEqual(expect.arrayContaining(['customer material reference']))
    expect(nantucket.prohibitedUses).toEqual(
      expect.arrayContaining(['exact color guarantee', 'exact dimensions', 'install layout', 'pricing']),
    )
  })

  it('keeps brochure records as candidates instead of final product truth', () => {
    const brochureRecords = hearthVisualAssetSeed
      .filter((asset) => asset.assetType === 'brochure_image_candidate')
      .map(normalizeHearthVisualAsset)

    expect(brochureRecords).toHaveLength(5)
    expect(brochureRecords.every((asset) => asset.customerSafe === false)).toBe(true)
    expect(brochureRecords.every((asset) => asset.prohibitedUses.includes('customer-final product truth'))).toBe(true)
  })

  it('handles missing fields safely', () => {
    const normalized = normalizeHearthVisualAsset({
      id: 'partial-record',
      title: 'Partial record',
      customerSafe: true,
    })

    expect(normalized.assetType).toBe('needs_review')
    expect(normalized.sourceKind).toBe('unknown')
    expect(normalized.driveFolderUrl).toBeNull()
    expect(normalized.driveFileUrl).toBeNull()
    expect(normalized.sourceConfidence).toBe('low_pending_review')
    expect(normalized.reviewStatus).toBe('needs_review')
    expect(normalized.customerSafe).toBe(false)
  })

  it('throws when a customer summary contains unsafe language', () => {
    expect(() => assertNoCustomerUnsafeTerms({ title: 'cost and margin leak' })).toThrow(/cost/)
  })

  it('flags missing exact source locations without blocking safe summary projection', () => {
    const nantucket = normalizeHearthVisualAsset(
      hearthVisualAssetSeed.find((asset) => asset.id === 'eldorado-nantucket-stacked-stone'),
    )
    const blockers = getVisualAssetSourceBlockers(nantucket)

    expect(blockers).toEqual(['missing exact Drive folder URL'])
    expect(() => assertNoCustomerUnsafeTerms(buildVisualAssetSummary(nantucket))).not.toThrow()
  })
})
