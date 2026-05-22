import {
  buildVisualAssetSummary,
  isCustomerSafeVisualAsset,
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
    asset.assetType === 'needs_review' ||
    asset.sourceConfidence === 'low_pending_review' ||
    asset.sourceConfidence === 'do_not_use' ||
    !asset.driveFileUrl,
  )
}

export function getCustomerSafeVisualAssets(assets = []) {
  return normalizeAssets(assets).filter(isCustomerSafeVisualAsset).map(buildVisualAssetSummary)
}

function normalizeAssets(assets) {
  return assets.map(normalizeHearthVisualAsset).sort((a, b) => a.id.localeCompare(b.id))
}

function normalizeText(value) {
  return typeof value === 'string' ? value.trim().toLowerCase() : ''
}
