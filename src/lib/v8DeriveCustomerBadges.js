const criticalCustomerFields = ['displayName', 'shortDescription', 'styleHuman', 'sizeHuman', 'fuelTypeHuman', 'pricingBand']

export function getMissingCriticalCustomerFields(manifest) {
  return criticalCustomerFields.filter((field) => manifest.customer[field] == null)
}

export function deriveCustomerBadges(manifest, slot) {
  const verificationItems = []

  if (manifest.internal.recommendableStatus === 'recommendable_with_verification') {
    verificationItems.push('Rep verification required')
  }

  for (const item of manifest.customer.verifyAtHomeMeasure || []) {
    verificationItems.push(item)
  }

  if (slot?.internal?.recommendableOverride) {
    verificationItems.push('Showroom reference needs rep guidance')
  }

  const missingFields = getMissingCriticalCustomerFields(manifest)
  if (missingFields.length > 0) {
    verificationItems.push('Incomplete customer-facing product details')
  }

  return {
    badges: verificationItems.length > 0 ? ['Needs Verification'] : [],
    verificationItems,
  }
}
