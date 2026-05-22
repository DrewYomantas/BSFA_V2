const assetTypes = new Set([
  'library_root',
  'reference_index',
  'stone_sample',
  'fireplace_face_reference',
  'mantel_reference',
  'hearth_slab_reference',
  'customer_room_photo',
  'premade_room_reference',
  'brochure_image_candidate',
  'processed_cropped_asset',
  'customer_safe_concept_output',
  'needs_review',
])

const sourceTypes = new Set([
  'drive_folder',
  'drive_file',
  'markdown_index',
  'brochure_group',
  'candidate_group',
  'unknown',
])

const reviewStatuses = new Set([
  'reference_ready',
  'needs_review',
  'intake_only',
  'do_not_use',
])

const sourceKinds = new Set([
  'drew_showroom_photo',
  'vendor_brochure',
  'benson_drive_existing_photo',
  'customer_photo',
  'ai_concept_output',
  'processed_derivative',
  'unknown',
])

const sourceConfidenceValues = new Set([
  'high_visual_reference',
  'medium_visual_reference',
  'low_pending_review',
  'do_not_use',
])

export const visualAssetCustomerDisclaimer = 'Concept visualization only. Final fireplace, venting, dimensions, hearth, mantel, stone, and installation details are confirmed before quote/order.'

export const visualAssetCustomerBannedTerms = [
  'cost',
  'pricing',
  'margin',
  'spiff',
  'OCR',
  'confidence',
  'source uncertainty',
  'Needs Verification',
  'internal notes',
]

export function normalizeHearthVisualAsset(asset = {}) {
  const assetType = assetTypes.has(asset.assetType) ? asset.assetType : 'needs_review'
  const sourceKind = sourceKinds.has(asset.sourceKind) ? asset.sourceKind : 'unknown'
  const sourceConfidence = sourceConfidenceValues.has(asset.sourceConfidence)
    ? asset.sourceConfidence
    : 'low_pending_review'
  const reviewStatus = reviewStatuses.has(asset.reviewStatus) ? asset.reviewStatus : 'needs_review'

  return {
    id: stringOrFallback(asset.id, 'untracked-visual-asset'),
    title: stringOrFallback(asset.title, 'Untitled visual asset'),
    assetType,
    vendor: nullableString(asset.vendor),
    productName: nullableString(asset.productName),
    profileOrSeries: nullableString(asset.profileOrSeries),
    sourceKind,
    driveFolderUrl: nullableString(asset.driveFolderUrl),
    driveFileUrl: nullableString(asset.driveFileUrl),
    sourceDocumentTitle: nullableString(asset.sourceDocumentTitle),
    sourcePageOrSection: nullableString(asset.sourcePageOrSection),
    sourceType: sourceTypes.has(asset.sourceType) ? asset.sourceType : 'unknown',
    sourceConfidence,
    lastReviewedDate: nullableString(asset.lastReviewedDate),
    reviewedBy: nullableString(asset.reviewedBy),
    reviewStatus,
    customerSafeUse: nullableString(asset.customerSafeUse),
    customerSafe: (
      Boolean(asset.customerSafe) &&
      assetType !== 'needs_review' &&
      sourceConfidence !== 'do_not_use' &&
      reviewStatus === 'reference_ready'
    ),
    allowedUses: normalizeList(asset.allowedUses, []),
    prohibitedUses: normalizeList(asset.prohibitedUses, ['product truth without review']),
    customerDisclaimer: stringOrFallback(asset.customerDisclaimer, buildCustomerSafeDisclaimer(asset)),
    internalNotes: nullableString(asset.internalNotes),
    createdAt: stringOrFallback(asset.createdAt, null),
    updatedAt: stringOrFallback(asset.updatedAt, null),
  }
}

export function buildCustomerSafeDisclaimer(asset = {}) {
  const normalizedType = assetTypes.has(asset.assetType) ? asset.assetType : 'needs_review'
  if (normalizedType === 'customer_safe_concept_output' || asset.customerSafe) {
    return visualAssetCustomerDisclaimer
  }

  return 'Internal visual reference only. Review source, customer-safe use, and product context before showing to a customer.'
}

export function isCustomerSafeVisualAsset(asset = {}) {
  const normalized = normalizeHearthVisualAsset(asset)
  return (
    normalized.customerSafe &&
    normalized.assetType !== 'needs_review' &&
    normalized.sourceConfidence !== 'do_not_use' &&
    normalized.reviewStatus === 'reference_ready' &&
    normalized.customerDisclaimer.includes('Concept visualization only.')
  )
}

export function isReferenceReadyVisualAsset(asset = {}) {
  const normalized = normalizeHearthVisualAsset(asset)
  return normalized.reviewStatus === 'reference_ready' && normalized.sourceConfidence !== 'do_not_use'
}

export function buildVisualAssetSummary(asset = {}) {
  const normalized = normalizeHearthVisualAsset(asset)

  return {
    id: normalized.id,
    title: normalized.title,
    assetType: normalized.assetType,
    vendor: normalized.vendor,
    productName: normalized.productName,
    profileOrSeries: normalized.profileOrSeries,
    sourceKind: normalized.sourceKind,
    customerSafe: isCustomerSafeVisualAsset(normalized),
    customerSafeUse: normalized.customerSafeUse,
    customerDisclaimer: normalized.customerDisclaimer,
    sourceLabel: buildSourceLabel(normalized),
  }
}

export function getVisualAssetSourceBlockers(asset = {}) {
  const normalized = normalizeHearthVisualAsset(asset)
  const blockers = []

  if (normalized.reviewStatus !== 'reference_ready') {
    blockers.push('review status is not reference-ready')
  }

  if (!normalized.sourceDocumentTitle && !normalized.driveFolderUrl && !normalized.driveFileUrl) {
    blockers.push('missing source document or Drive location')
  }

  if (
    normalized.sourceType === 'drive_folder' &&
    !normalized.driveFolderUrl &&
    normalized.reviewStatus === 'reference_ready'
  ) {
    blockers.push('missing exact Drive folder URL')
  }

  if (
    normalized.sourceType === 'drive_file' &&
    !normalized.driveFileUrl &&
    normalized.reviewStatus === 'reference_ready'
  ) {
    blockers.push('missing exact Drive file URL')
  }

  if (!normalized.sourcePageOrSection) {
    blockers.push('missing source page or section')
  }

  if (normalized.reviewStatus === 'reference_ready' && !normalized.lastReviewedDate) {
    blockers.push('missing last reviewed date')
  }

  if (normalized.reviewStatus === 'reference_ready' && !normalized.reviewedBy) {
    blockers.push('missing reviewer')
  }

  return blockers
}

export function assertNoCustomerUnsafeTerms(value, bannedTerms = visualAssetCustomerBannedTerms) {
  const text = JSON.stringify(value).toLowerCase()
  const leaks = bannedTerms.filter((term) => text.includes(term.toLowerCase()))

  if (leaks.length > 0) {
    throw new Error(`Customer-safe visual asset summary contains banned terms: ${leaks.join(', ')}`)
  }

  return true
}

function buildSourceLabel(asset) {
  if (asset.sourceKind === 'drew_showroom_photo') return 'Showroom photo reference'
  if (asset.sourceKind === 'vendor_brochure') return 'Brochure candidate'
  if (asset.sourceKind === 'benson_drive_existing_photo') return 'Existing Drive photo reference'
  if (asset.sourceKind === 'customer_photo') return 'Customer-provided photo reference'
  if (asset.sourceKind === 'ai_concept_output') return 'Concept output'
  if (asset.sourceKind === 'processed_derivative') return 'Processed derivative'
  return 'Source review pending'
}

function normalizeList(value, fallback) {
  if (!Array.isArray(value)) return [...fallback]
  return value.filter((item) => typeof item === 'string' && item.trim().length > 0)
}

function nullableString(value) {
  return typeof value === 'string' && value.trim().length > 0 ? value : null
}

function stringOrFallback(value, fallback) {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback
}
