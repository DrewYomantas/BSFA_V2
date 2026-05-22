import { describe, expect, it } from 'vitest'
import { hearthVisualAssetSeed } from '../../src/data/hearthVisualAssets/hearthVisualAssetSeed.js'
import {
  getAssetsAllowedForUse,
  getAssetsByReviewStatus,
  getAssetsByType,
  getAssetsByVendor,
  getAssetsNeedingReview,
  getAssetsWithSourceBlockers,
  getCustomerSafeVisualAssets,
  getReferenceReadyVisualAssets,
} from '../../src/lib/hearthVisualAssets/hearthVisualAssetFilters.js'

describe('hearth visual asset filters', () => {
  it('excludes needs-review records from customer-safe lists', () => {
    const customerSafeAssets = getCustomerSafeVisualAssets(hearthVisualAssetSeed)

    expect(customerSafeAssets.map((asset) => asset.id)).toEqual(['eldorado-nantucket-stacked-stone'])
    expect(customerSafeAssets.every((asset) => asset.assetType !== 'needs_review')).toBe(true)
  })

  it('includes reviewed assets in reference-ready lists', () => {
    const referenceReadyAssets = getReferenceReadyVisualAssets(hearthVisualAssetSeed)

    expect(referenceReadyAssets.map((asset) => asset.id)).toEqual(['eldorado-nantucket-stacked-stone'])
  })

  it('filters by type deterministically', () => {
    const brochureRecords = getAssetsByType(hearthVisualAssetSeed, 'brochure_image_candidate')

    expect(brochureRecords.map((asset) => asset.id)).toEqual([
      'brochureguide-lopi-candidate',
      'fpx-premium-traditional-gas-fireplaces-brochure',
      'kinsgman-solace-brochure-candidate',
      'napoleon-gas-burning-inserts-vented-logsets-brochure',
      'stoll-fireplace-doors-brochure-candidate',
    ])
  })

  it('filters by vendor deterministically', () => {
    const dutchQualityRecords = getAssetsByVendor(hearthVisualAssetSeed, 'Dutch Quality')

    expect(dutchQualityRecords.map((asset) => asset.id)).toEqual([
      'dutch-quality-coal-crest-weatherledge-candidate',
      'dutch-quality-greystone-rough-ashlar-candidate',
      'dutch-quality-winter-point-weatherledge-candidate',
    ])
  })

  it('filters by allowed use deterministically', () => {
    const conceptReferences = getAssetsAllowedForUse(hearthVisualAssetSeed, 'AI concept reference')

    expect(conceptReferences.map((asset) => asset.id)).toEqual(['eldorado-nantucket-stacked-stone'])
  })

  it('returns records still needing review', () => {
    const needingReview = getAssetsNeedingReview(hearthVisualAssetSeed)

    expect(needingReview.length).toBeGreaterThan(1)
    expect(needingReview.map((asset) => asset.id)).toEqual(
      expect.arrayContaining([
        'hearth-visual-asset-library-root',
        'stage-v1b-existing-material-image-inventory',
        'eldorado-cliffstone-ecl-candidate',
      ]),
    )
  })

  it('flags records with missing required source fields', () => {
    const sourceBlockers = getAssetsWithSourceBlockers(hearthVisualAssetSeed)
    const nantucket = sourceBlockers.find((item) => item.asset.id === 'eldorado-nantucket-stacked-stone')

    expect(nantucket.blockers).toEqual(['missing exact Drive folder URL'])
    expect(sourceBlockers.map((item) => item.asset.id)).toEqual(
      expect.arrayContaining(['fpx-premium-traditional-gas-fireplaces-brochure']),
    )
  })

  it('filters by review status and asset type deterministically', () => {
    const needsReviewAssets = getAssetsByReviewStatus(hearthVisualAssetSeed, 'needs_review')
    const needsReviewMantels = needsReviewAssets.filter((asset) => asset.assetType === 'mantel_reference')

    expect(needsReviewMantels.map((asset) => asset.id)).toEqual([
      'collinswood-mantel-display-candidate',
      'log-style-mantels-beam-photo-candidates',
    ])
  })
})
