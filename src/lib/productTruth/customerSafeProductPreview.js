// Pure transformer: takes a product_truth record and returns ONLY the fields
// safe to surface in any customer-facing or guided-sales context. Anything that
// reveals internal uncertainty, sales guardrails, source/OCR notes, confidence,
// margin/cost, or rep-only context is dropped.
//
// The contract is enforcement-by-allowlist: if a new field is added to the
// product_truth shape, it must be explicitly added here to leak through.

export const CUSTOMER_SAFE_BANNED_TERMS = [
  'internalNotes',
  'Whisper Flex',
  'whisper flex',
  'unresolved',
  'UNRESOLVED',
  'OCR',
  'confidence',
  'margin',
  'cost',
  'guardrail',
  'GUARDRAIL',
  'figure diagram',
  'best interpretation',
  'best-effort',
  'binary .doc',
  'partially garbled',
  'not cleanly extracted',
]

function pickDimensions(d) {
  if (!d || typeof d !== 'object') return null
  const out = {}
  for (const k of ['widthIn', 'heightIn', 'depthIn']) {
    if (typeof d[k] === 'number' && d[k] > 0) out[k] = d[k]
  }
  return Object.keys(out).length ? out : null
}

function pickViewingArea(va) {
  if (!va || typeof va !== 'object') return null
  const out = {}
  for (const k of ['widthIn', 'heightIn']) {
    if (typeof va[k] === 'number' && va[k] > 0) out[k] = va[k]
  }
  return Object.keys(out).length ? out : null
}

// Returns null when the record is not safe to preview at all (anything not yet
// dimensionStatus=confirmed must not be customer-previewed).
export function buildCustomerSafeProductPreview(record) {
  if (!record || record.assetType !== 'product_truth') return null
  if (record.dimensionStatus !== 'confirmed') return null

  return {
    productName: record.productName || null,
    vendor: record.vendor || null,
    profileOrSeries: record.profileOrSeries || null,
    category: record.category || null,
    fuelType: record.fuelType || null,
    ignitionType: record.ignitionType || null,
    seriesDimensions: pickDimensions(record.seriesDimensions),
    framingDimensions: pickDimensions(record.framingDimensions),
    viewingArea: pickViewingArea(record.viewingArea),
    ventingNotes: record.ventingNotes || null,
    disclaimer:
      'Concept reference only. Final dimensions, venting, and product availability are confirmed with a Benson Stone rep before quote or order.',
  }
}

// Defensive scan used by tests and the QA panel — verifies no banned term
// snuck into a preview's serialized output.
export function findBannedTermsInPreview(preview) {
  if (!preview) return []
  const text = JSON.stringify(preview)
  return CUSTOMER_SAFE_BANNED_TERMS.filter((term) => text.includes(term))
}
