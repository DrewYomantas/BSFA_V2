const REQUIRED_STRING_FIELDS = ['id', 'vendor', 'productName', 'sourceDocumentTitle']
const VALID_DIMENSION_STATUSES = ['confirmed', 'partial', 'missing']

export function validateProductTruthRecord(record) {
  if (!record || typeof record !== 'object') {
    return { valid: false, errors: ['record must be a non-null object'], warnings: [] }
  }

  const errors = []
  const warnings = []

  for (const field of REQUIRED_STRING_FIELDS) {
    if (!record[field] || typeof record[field] !== 'string' || !record[field].trim()) {
      errors.push(`missing required field: ${field}`)
    }
  }

  if (!Array.isArray(record.modelCodes) || record.modelCodes.length === 0) {
    errors.push('modelCodes must be a non-empty array')
  }

  if (!Array.isArray(record.sourceEvidence) || record.sourceEvidence.length === 0) {
    errors.push('sourceEvidence must be a non-empty array')
  }

  if (record.customerSafe === true) {
    errors.push('customerSafe must be false for product_truth records')
  }

  if (!VALID_DIMENSION_STATUSES.includes(record.dimensionStatus)) {
    errors.push(`dimensionStatus must be one of: ${VALID_DIMENSION_STATUSES.join(', ')}`)
  }

  const dims = record.seriesDimensions
  if (dims && typeof dims === 'object') {
    for (const [key, val] of Object.entries(dims)) {
      if (val !== null && val !== undefined && (typeof val !== 'number' || val <= 0)) {
        errors.push(`seriesDimensions.${key} must be a positive number or null — got ${JSON.stringify(val)}`)
      }
    }
    if (Object.values(dims).every(v => v == null) && record.dimensionStatus === 'confirmed') {
      warnings.push('all seriesDimensions are null but dimensionStatus is confirmed')
    }
  }

  const va = record.viewingArea
  if (va && typeof va === 'object') {
    for (const [key, val] of Object.entries(va)) {
      if (val !== null && val !== undefined && (typeof val !== 'number' || val <= 0)) {
        errors.push(`viewingArea.${key} must be a positive number or null — got ${JSON.stringify(val)}`)
      }
    }
  }

  if (
    record.sourceConflict === true &&
    Array.isArray(record.sourceEvidence) &&
    record.sourceEvidence.length < 2
  ) {
    errors.push('sourceConflict is true but sourceEvidence has fewer than 2 entries — both readings must be documented')
  }

  return { valid: errors.length === 0, errors, warnings }
}

export function validateProductTruthBatch(records) {
  if (!Array.isArray(records)) {
    return { allValid: false, results: [], summary: { valid: 0, invalid: 0, warnings: 0 } }
  }

  const results = records
    .filter(r => r.assetType === 'product_truth')
    .map(record => ({
      id: record.id ?? '(unknown)',
      ...validateProductTruthRecord(record),
    }))

  return {
    allValid: results.every(r => r.valid),
    results,
    summary: {
      valid: results.filter(r => r.valid).length,
      invalid: results.filter(r => !r.valid).length,
      warnings: results.filter(r => r.warnings.length > 0).length,
    },
  }
}

export function buildProductTruthQASummary(records) {
  if (!Array.isArray(records)) return null

  const pt = records.filter(r => r.assetType === 'product_truth')

  const missingKeyDimensions = pt.filter(r => {
    const d = r.seriesDimensions
    if (!d) return true
    return d.widthIn == null || d.heightIn == null || d.depthIn == null
  })

  return {
    total: pt.length,
    confirmed: pt.filter(r => r.dimensionStatus === 'confirmed').length,
    partial: pt.filter(r => r.dimensionStatus === 'partial').length,
    missing: pt.filter(r => r.dimensionStatus === 'missing').length,
    conflicts: pt.filter(r => r.sourceConflict === true).map(r => r.id),
    missingKeyDimensions: missingKeyDimensions.map(r => ({
      id: r.id,
      dimensionStatus: r.dimensionStatus,
      missingFields: ['widthIn', 'heightIn', 'depthIn'].filter(
        f => !r.seriesDimensions || r.seriesDimensions[f] == null
      ),
    })),
  }
}
