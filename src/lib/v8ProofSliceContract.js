import { deriveCustomerBadges } from './v8DeriveCustomerBadges.js'

export const customerBannedTerms = [
  'cost',
  'margin',
  'supplier total',
  'supplier history',
  'inventory turn',
  'product rank',
  'sales rank',
  'OCR',
  'raw PDF',
  'BisTrack confidence',
  'fuzzy-match confidence',
  'private catalog',
  'ready to send',
  'proposal ready',
  'customer ready',
  'approved',
]

export function projectV8CustomerSafe(manifest, slot) {
  const { badges, verificationItems } = deriveCustomerBadges(manifest, slot)

  return {
    customer: manifest.customer,
    slot: slot.customer,
    badges,
    verificationItems,
  }
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

  return {
    totalManifestRecords: manifests.length,
    totalDisplayRegisterRecords: registerRecords.length,
    recordsSyncedFromDisplayRegister: syncedSlots.length,
    needsVerificationCount,
    discontinuedDisplayedCount: displayedManifests.filter(({ manifest }) =>
      manifest.internal.displayDisposition === 'discontinued_display',
    ).length,
    activeRecommendableDisplayedCount: displayedManifests.filter(({ manifest }) =>
      manifest.internal.displayDisposition === 'active_display' &&
      manifest.internal.recommendableStatus === 'recommendable',
    ).length,
    gapListIssueCount: gapList.entries.length,
    customerSafeBoundaryStatus: customerBoundaryLeaks.length === 0 ? 'clean' : 'blocked',
    customerBoundaryLeaks: [...new Set(customerBoundaryLeaks)],
  }
}
