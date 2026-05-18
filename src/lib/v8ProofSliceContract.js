import {
  deriveCustomerBadges,
  deriveCustomerSafeBadges,
  getMissingCriticalCustomerFields,
} from './v8DeriveCustomerBadges.js'

export const customerBannedTerms = [
  'cost',
  'margin',
  'supplier total',
  'supplier history',
  'inventory turn',
  'product rank',
  'sales rank',
  'sales',
  'OCR',
  'confidence',
  'raw PDF',
  'BisTrack confidence',
  'fuzzy-match confidence',
  'private catalog',
  'ready to send',
  'proposal ready',
  'customer ready',
  'approved',
  'discontinued status',
  'display-only status',
  'reference-only status',
  'internal verification',
  'needs verification',
  'rep verification required',
  'showroom reference needs rep guidance',
  'incomplete customer-facing product details',
]

export function projectV8CustomerSafe(manifest, slot) {
  const { badges, verificationItems } = deriveCustomerSafeBadges(manifest, slot)

  return {
    customer: manifest.customer,
    slot: slot.customer,
    badges,
    verificationItems,
  }
}

export function deriveManifestRecommendationStatus(manifest, slot = null) {
  const missingCriticalFields = getMissingCriticalCustomerFields(manifest)
  const recommendableStatus = manifest.internal.recommendableStatus
  const displayDisposition = manifest.internal.displayDisposition
  const displayed = displayDisposition != null
  const displayOnly = (
    recommendableStatus === 'discontinued' ||
    recommendableStatus === 'display_only' ||
    recommendableStatus === 'reference_only' ||
    displayDisposition === 'discontinued_display' ||
    slot?.internal?.recommendableOverride === 'showroom_reference_only'
  )
  const verificationRequired = (
    recommendableStatus === 'recommendable_with_verification' ||
    Boolean(slot?.internal?.recommendableOverride) ||
    missingCriticalFields.length > 0
  )
  const blockedFromCustomerRecommendation = displayOnly || verificationRequired

  return {
    canDiscussGenerally: true,
    displayed,
    activelyRecommendable: recommendableStatus === 'recommendable' && !blockedFromCustomerRecommendation,
    displayOnly,
    discontinuedOrReferenceOnly: displayOnly,
    verificationRequired,
    blockedFromCustomerRecommendation,
    missingCriticalFields,
  }
}

export function getRecommendableManifestItems(manifests, registerRecords = []) {
  return manifests.filter((manifest) => {
    const slot = findRegisterSlotForManifest(manifest, registerRecords)
    return deriveManifestRecommendationStatus(manifest, slot).activelyRecommendable
  })
}

export function getDisplayOnlyManifestItems(manifests, registerRecords = []) {
  return manifests.filter((manifest) => {
    const slot = findRegisterSlotForManifest(manifest, registerRecords)
    return deriveManifestRecommendationStatus(manifest, slot).displayOnly
  })
}

export function getVerificationRequiredManifestItems(manifests, registerRecords = []) {
  return manifests.filter((manifest) => {
    const slot = findRegisterSlotForManifest(manifest, registerRecords)
    return deriveManifestRecommendationStatus(manifest, slot).verificationRequired
  })
}

export function buildCustomerRecommendationPreview(manifest, slot = null) {
  const safeCustomer = manifest.customer
  const badges = [
    ...(safeCustomer.customerSafeBadges || []),
    ...(slot?.customer?.customerSafeBadges || []),
  ]
  const measureConfirmItems = safeCustomer.verifyAtHomeMeasure || []

  if (measureConfirmItems.length > 0) {
    badges.push('Confirm measurements')
  }

  return {
    id: manifest.unitId,
    displayName: safeCustomer.displayName,
    category: formatCustomerCategory(manifest.productClass),
    type: safeCustomer.fuelTypeHuman,
    description: safeCustomer.shortDescription,
    showroomCue: slot?.customer?.showroomZoneFriendly ? `Shown in the ${slot.customer.showroomZoneFriendly}` : null,
    badges: [...new Set(badges)],
    measureNote: measureConfirmItems.length > 0 ? 'Confirm fit and vent path with your rep.' : null,
  }
}

export function buildCustomerRecommendationPreviews(manifests, registerRecords = []) {
  return getRecommendableManifestItems(manifests, registerRecords).map((manifest) =>
    buildCustomerRecommendationPreview(manifest, findRegisterSlotForManifest(manifest, registerRecords)),
  )
}

export function projectV8RepBackstage(manifest, slot) {
  const { verificationItems } = deriveCustomerBadges(manifest, slot)

  return {
    customer: manifest.customer,
    rep: {
      manifest: manifest.rep,
      slot: slot.rep,
    },
    internal: {
      manifest: manifest.internal,
      slot: slot.internal,
    },
    verificationItems,
  }
}

export function scanCustomerSafeProjection(projection, bannedTerms = customerBannedTerms) {
  const text = JSON.stringify(projection).toLowerCase()
  return bannedTerms.filter((term) => text.includes(term.toLowerCase()))
}

export function buildV8ProofSliceHealth({ manifests, registerRecords, gapList }) {
  const manifestByUnit = new Map(manifests.map((manifest) => [manifest.unitId, manifest]))
  const syncedSlots = registerRecords.filter((slot) => {
    const manifest = manifestByUnit.get(slot.currentUnitRef)
    return (
      manifest &&
      manifest.internal.displayDisposition === slot.internal.displayDisposition &&
      manifest.internal.displayPosition === slot.location.position &&
      manifest.internal.displaySection === slot.location.zone
    )
  })

  const displayedManifests = registerRecords
    .map((slot) => ({ slot, manifest: manifestByUnit.get(slot.currentUnitRef) }))
    .filter((bundle) => bundle.manifest)

  const needsVerificationCount = displayedManifests.filter(({ manifest, slot }) => (
    deriveCustomerBadges(manifest, slot).verificationItems.length > 0
  )).length

  const customerBoundaryLeaks = displayedManifests.flatMap(({ manifest, slot }) =>
    scanCustomerSafeProjection(projectV8CustomerSafe(manifest, slot)),
  )
  const recommendationStatuses = manifests.map((manifest) => {
    const slot = findRegisterSlotForManifest(manifest, registerRecords)
    return deriveManifestRecommendationStatus(manifest, slot)
  })
  const recommendableItems = getRecommendableManifestItems(manifests, registerRecords)
  const displayOnlyItems = getDisplayOnlyManifestItems(manifests, registerRecords)
  const verificationRequiredItems = getVerificationRequiredManifestItems(manifests, registerRecords)

  return {
    totalManifestRecords: manifests.length,
    totalManifestItems: manifests.length,
    totalDisplayRegisterRecords: registerRecords.length,
    displayedItemsCount: displayedManifests.length,
    recordsSyncedFromDisplayRegister: syncedSlots.length,
    needsVerificationCount,
    discontinuedDisplayedCount: displayedManifests.filter(({ manifest }) =>
      manifest.internal.displayDisposition === 'discontinued_display',
    ).length,
    activeRecommendableDisplayedCount: displayedManifests.filter(({ manifest }) =>
      manifest.internal.displayDisposition === 'active_display' &&
      manifest.internal.recommendableStatus === 'recommendable',
    ).length,
    activelyRecommendableItemsCount: recommendableItems.length,
    displayOnlyDiscontinuedItemsCount: displayOnlyItems.length,
    verificationRequiredItemsCount: verificationRequiredItems.length,
    blockedFromCustomerRecommendationCount: recommendationStatuses.filter((status) =>
      status.blockedFromCustomerRecommendation,
    ).length,
    missingCriticalFieldItems: manifests
      .map((manifest) => ({
        unitId: manifest.unitId,
        missingFields: getMissingCriticalCustomerFields(manifest),
      }))
      .filter((item) => item.missingFields.length > 0),
    gapListIssueCount: gapList.entries.length,
    customerSafeBoundaryStatus: customerBoundaryLeaks.length === 0 ? 'clean' : 'blocked',
    customerBoundaryLeaks: [...new Set(customerBoundaryLeaks)],
  }
}

function findRegisterSlotForManifest(manifest, registerRecords) {
  return registerRecords.find((record) => record.currentUnitRef === manifest.unitId) ?? null
}

function formatCustomerCategory(value) {
  if (!value) return 'Product'
  return value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}
