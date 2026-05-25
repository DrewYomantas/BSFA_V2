// Strict customer-safe candidate card. Allowlist of fields suitable for the
// Hearth Café Sit narrowing flow. Source/internal fields are never propagated.
//
// Two layers of defense:
//  1) Allowlist — only listed fields are returned.
//  2) Banned-term scan reuses CUSTOMER_SAFE_BANNED_TERMS from the product-truth
//     QA helper so a single source of truth governs both surfaces.

import {
  CUSTOMER_SAFE_BANNED_TERMS,
  findBannedTermsInPreview,
} from '../productTruth/customerSafeProductPreview.js'

export { CUSTOMER_SAFE_BANNED_TERMS }

// Map a vendor source type to plain customer-facing language.
function plainSourceLabel(sourceType) {
  switch (sourceType) {
    case 'install_manual':
      return 'Manufacturer install manual'
    case 'vendor_spec_sheet':
      return 'Manufacturer spec sheet'
    case 'cad_details_pdf':
      return 'Manufacturer dimensional drawing'
    case 'vendor_sku_file':
      return 'Manufacturer SKU list'
    case 'vendor_brochure':
      return 'Manufacturer brochure'
    default:
      return 'Manufacturer reference'
  }
}

function pickDim(d) {
  if (!d || typeof d !== 'object') return null
  const out = {}
  for (const k of ['widthIn', 'heightIn', 'depthIn']) {
    if (typeof d[k] === 'number' && d[k] > 0) out[k] = d[k]
  }
  return Object.keys(out).length ? out : null
}

function pickViewing(v) {
  if (!v || typeof v !== 'object') return null
  const out = {}
  for (const k of ['widthIn', 'heightIn']) {
    if (typeof v[k] === 'number' && v[k] > 0) out[k] = v[k]
  }
  return Object.keys(out).length ? out : null
}

function buildSourceSummary(sourceEvidence) {
  if (!Array.isArray(sourceEvidence) || sourceEvidence.length === 0) return null
  const types = sourceEvidence.map((e) => plainSourceLabel(e.sourceType))
  const unique = Array.from(new Set(types))
  return {
    referenceCount: sourceEvidence.length,
    primaryLabel: unique[0],
    labels: unique,
  }
}

// Returns null if the record is not a confirmed product_truth record, OR if
// scrubbing produced any banned-term leak. Callers should treat null as
// "not eligible for customer-facing surface."
export function buildCustomerCandidateCard(record) {
  if (!record || record.assetType !== 'product_truth') return null
  if (record.dimensionStatus !== 'confirmed') return null

  const card = {
    id: record.id,
    displayName: record.productName || null,
    vendor: record.vendor || null,
    productClass: record.category || null,
    fuelType: record.fuelType || null,
    ignitionType: record.ignitionType || null,
    keyDimensions: pickDim(record.seriesDimensions),
    framingDimensions: pickDim(record.framingDimensions),
    viewingArea: pickViewing(record.viewingArea),
    ventingNotes: record.ventingNotes || null,
    sourceSummary: buildSourceSummary(record.sourceEvidence),
    disclaimer:
      'Concept reference only. Final dimensions, venting, and product availability are confirmed with a Benson Stone rep before quote or order.',
  }

  // Defensive: scan the serialized card for any banned term.
  if (findBannedTermsInPreview(card).length > 0) return null
  return card
}

export { findBannedTermsInPreview }
