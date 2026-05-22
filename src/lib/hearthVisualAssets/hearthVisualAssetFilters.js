import {
  buildVisualAssetSummary,
  getVisualAssetSourceBlockers,
  isCustomerSafeVisualAsset,
  isReferenceReadyVisualAsset,
  normalizeHearthVisualAsset,
} from './hearthVisualAssetModel.js'

export function getAssetsByType(assets = [], assetType) {
  return normalizeAssets(assets).filter((asset) => asset.assetType === assetType)
}

export function getAssetsByVendor(assets = [], vendor) {
  const target = normalizeText(vendor)
  if (!target) return []

  return normalizeAssets(assets).filter((asset) => normalizeText(asset.vendor) === target)
}

export function getAssetsAllowedForUse(assets = [], useKey) {
  const target = normalizeText(useKey)
  if (!target) return []

  return normalizeAssets(assets).filter((asset) =>
    asset.allowedUses.some((allowedUse) => normalizeText(allowedUse) === target),
  )
}

export function getAssetsNeedingReview(assets = []) {
  return normalizeAssets(assets).filter((asset) =>
    asset.reviewStatus === 'needs_review' ||
    asset.assetType === 'needs_review' ||
    asset.sourceConfidence === 'low_pending_review' ||
    asset.sourceConfidence === 'do_not_use',
  )
}

export function getCustomerSafeVisualAssets(assets = []) {
  return normalizeAssets(assets).filter(isCustomerSafeVisualAsset).map(buildVisualAssetSummary)
}

export function getReferenceReadyVisualAssets(assets = []) {
  return normalizeAssets(assets).filter(isReferenceReadyVisualAsset)
}

export function getAssetsByReviewStatus(assets = [], reviewStatus) {
  const target = normalizeText(reviewStatus)
  if (!target) return []

  return normalizeAssets(assets).filter((asset) => normalizeText(asset.reviewStatus) === target)
}

export function getAssetsWithSourceBlockers(assets = []) {
  return normalizeAssets(assets)
    .map((asset) => ({
      asset,
      blockers: getVisualAssetSourceBlockers(asset),
    }))
    .filter((item) => item.blockers.length > 0)
}

function normalizeAssets(assets) {
  return assets.map(normalizeHearthVisualAsset).sort((a, b) => a.id.localeCompare(b.id))
}

function normalizeText(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : ''
}
