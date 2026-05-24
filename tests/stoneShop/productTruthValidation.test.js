import { describe, expect, it } from 'vitest'
import {
  validateProductTruthRecord,
  validateProductTruthBatch,
  buildProductTruthQASummary,
} from '../../src/lib/hearthVisualAssets/productTruthValidation.js'
import { hearthVisualAssetSeed } from '../../src/data/hearthVisualAssets/hearthVisualAssetSeed.js'

// --- fixtures ---

function confirmedRecord(overrides = {}) {
  return {
    assetType: 'product_truth',
    id: 'test-vendor-widget-pro-product-truth',
    vendor: 'Test Vendor',
    productName: 'Widget Pro',
    profileOrSeries: 'Widget series',
    sourceDocumentTitle: 'CADdetails 0000-001 — Test Widget Pro (rev 01/01/2024)',
    modelCodes: ['WGT-PRO'],
    customerSafe: false,
    dimensionStatus: 'confirmed',
    seriesDimensions: { widthIn: 36, heightIn: 28, depthIn: 14 },
    viewingArea: { widthIn: 30, heightIn: 22 },
    sourceEvidence: [
      {
        sourceType: 'cad_details_pdf',
        packagePath: '/tmp/0000-001.zip',
        innerFile: 'PDF Plus 0000-001.pdf',
        confidence: 'high_vendor_spec',
        notes: 'Dimensioned drawing. Front 36" W × 28" H, depth 14".',
      },
    ],
    sourceConflict: false,
    ...overrides,
  }
}

function partialRecord(overrides = {}) {
  return confirmedRecord({
    id: 'test-vendor-widget-lite-product-truth',
    productName: 'Widget Lite',
    dimensionStatus: 'partial',
    seriesDimensions: { widthIn: 34, heightIn: null, depthIn: 13 },
    internalNotes: 'Opening height not visible in CAD front view — needs second pass.',
    ...overrides,
  })
}

function conflictRecord(overrides = {}) {
  return confirmedRecord({
    id: 'test-vendor-widget-xl-product-truth',
    productName: 'Widget XL',
    dimensionStatus: 'confirmed',
    sourceConflict: true,
    seriesDimensions: { widthIn: 40, heightIn: 32, depthIn: 16 },
    sourceEvidence: [
      {
        sourceType: 'cad_details_pdf',
        packagePath: '/tmp/0000-002.zip',
        innerFile: 'PDF Plus 0000-002.pdf',
        confidence: 'high_vendor_spec',
        notes: 'CAD front 40" W × 32" H.',
      },
      {
        sourceType: 'vendor_sku_file',
        packagePath: 'src/data/vendors/test-june-2025-skus.json',
        innerFile: null,
        confidence: 'medium_sku_source',
        notes: 'SKU lists height 30" — differs from CAD 32". CAD is authoritative.',
      },
    ],
    ...overrides,
  })
}

// Demonstrates the different-measurement pattern: body depth and top-deck depth are distinct
// measurements of different parts. This is NOT a sourceConflict.
function differentMeasurementRecord(overrides = {}) {
  return confirmedRecord({
    id: 'test-vendor-widget-335s-product-truth',
    productName: 'Widget 335S',
    dimensionStatus: 'confirmed',
    sourceConflict: false,
    seriesDimensions: { widthIn: 33.375, heightIn: 23, depthIn: 17.25 },
    framingDimensions: { topDepthIn: 16 },
    internalNotes:
      'Body depth 17.25" and top-deck depth 16" are different parts. Both correct. No sourceConflict.',
    ...overrides,
  })
}

// --- unit tests ---

describe('validateProductTruthRecord', () => {
  it('passes a fully confirmed record', () => {
    const result = validateProductTruthRecord(confirmedRecord())
    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('passes a partial record where one dimension is null', () => {
    const result = validateProductTruthRecord(partialRecord())
    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('passes a true sourceConflict record with 2 evidence entries', () => {
    const result = validateProductTruthRecord(conflictRecord())
    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
  })

  it('passes a different-measurement record without sourceConflict', () => {
    const result = validateProductTruthRecord(differentMeasurementRecord())
    expect(result.valid).toBe(true)
    expect(result.errors).toHaveLength(0)
    expect(result.errors).not.toContain(
      expect.stringContaining('sourceConflict')
    )
  })

  it('fails when id is missing', () => {
    const result = validateProductTruthRecord(confirmedRecord({ id: '' }))
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('missing required field: id')
  })

  it('fails when vendor is missing', () => {
    const result = validateProductTruthRecord(confirmedRecord({ vendor: null }))
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('missing required field: vendor')
  })

  it('fails when productName is missing', () => {
    const result = validateProductTruthRecord(confirmedRecord({ productName: '  ' }))
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('missing required field: productName')
  })

  it('fails when sourceDocumentTitle is missing', () => {
    const result = validateProductTruthRecord(confirmedRecord({ sourceDocumentTitle: null }))
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('missing required field: sourceDocumentTitle')
  })

  it('fails when modelCodes is empty', () => {
    const result = validateProductTruthRecord(confirmedRecord({ modelCodes: [] }))
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('modelCodes must be a non-empty array')
  })

  it('fails when sourceEvidence is empty', () => {
    const result = validateProductTruthRecord(confirmedRecord({ sourceEvidence: [] }))
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('sourceEvidence must be a non-empty array')
  })

  it('fails when customerSafe is true', () => {
    const result = validateProductTruthRecord(confirmedRecord({ customerSafe: true }))
    expect(result.valid).toBe(false)
    expect(result.errors).toContain('customerSafe must be false for product_truth records')
  })

  it('fails when dimensionStatus is invalid', () => {
    const result = validateProductTruthRecord(confirmedRecord({ dimensionStatus: 'unknown_status' }))
    expect(result.valid).toBe(false)
    expect(result.errors[0]).toMatch(/dimensionStatus must be one of/)
  })

  it('fails when a seriesDimensions value is negative', () => {
    const result = validateProductTruthRecord(
      confirmedRecord({ seriesDimensions: { widthIn: -5, heightIn: 28, depthIn: 14 } })
    )
    expect(result.valid).toBe(false)
    expect(result.errors.some(e => e.includes('seriesDimensions.widthIn'))).toBe(true)
  })

  it('fails when a seriesDimensions value is zero', () => {
    const result = validateProductTruthRecord(
      confirmedRecord({ seriesDimensions: { widthIn: 36, heightIn: 0, depthIn: 14 } })
    )
    expect(result.valid).toBe(false)
    expect(result.errors.some(e => e.includes('seriesDimensions.heightIn'))).toBe(true)
  })

  it('fails when a viewingArea value is negative', () => {
    const result = validateProductTruthRecord(
      confirmedRecord({ viewingArea: { widthIn: -1, heightIn: 22 } })
    )
    expect(result.valid).toBe(false)
    expect(result.errors.some(e => e.includes('viewingArea.widthIn'))).toBe(true)
  })

  it('fails when sourceConflict is true but only 1 evidence entry', () => {
    const result = validateProductTruthRecord(
      confirmedRecord({
        sourceConflict: true,
        sourceEvidence: [{ sourceType: 'cad_details_pdf', notes: 'only one' }],
      })
    )
    expect(result.valid).toBe(false)
    expect(result.errors.some(e => e.includes('sourceConflict'))).toBe(true)
  })

  it('warns when all seriesDimensions are null but dimensionStatus is confirmed', () => {
    const result = validateProductTruthRecord(
      confirmedRecord({
        dimensionStatus: 'confirmed',
        seriesDimensions: { widthIn: null, heightIn: null, depthIn: null },
      })
    )
    expect(result.warnings.some(w => w.includes('null'))).toBe(true)
  })

  it('does not warn when all dims null and dimensionStatus is partial', () => {
    const result = validateProductTruthRecord(
      partialRecord({
        dimensionStatus: 'partial',
        seriesDimensions: { widthIn: null, heightIn: null, depthIn: null },
      })
    )
    expect(result.warnings).toHaveLength(0)
  })

  it('returns an error for a non-object input', () => {
    const result = validateProductTruthRecord(null)
    expect(result.valid).toBe(false)
    expect(result.errors).toHaveLength(1)
  })
})

describe('validateProductTruthBatch', () => {
  it('returns allValid false for non-array input', () => {
    const result = validateProductTruthBatch(null)
    expect(result.allValid).toBe(false)
    expect(result.results).toHaveLength(0)
  })

  it('validates only product_truth records in the array', () => {
    const records = [
      confirmedRecord(),
      { assetType: 'stone_sample', id: 'not-a-pt' },
      partialRecord(),
    ]
    const result = validateProductTruthBatch(records)
    expect(result.results).toHaveLength(2)
  })

  it('reports summary counts correctly', () => {
    const records = [confirmedRecord(), partialRecord(), confirmedRecord({ id: 'test-bad', id: '', vendor: '' })]
    const result = validateProductTruthBatch(records)
    expect(result.summary.invalid).toBeGreaterThanOrEqual(1)
    expect(result.summary.valid).toBeGreaterThanOrEqual(1)
    expect(result.allValid).toBe(false)
  })
})

describe('buildProductTruthQASummary', () => {
  it('returns null for non-array input', () => {
    expect(buildProductTruthQASummary(null)).toBeNull()
  })

  it('counts by dimensionStatus correctly', () => {
    const records = [
      confirmedRecord(),
      partialRecord(),
      confirmedRecord({ id: 'test-missing', dimensionStatus: 'missing', seriesDimensions: null }),
    ]
    const summary = buildProductTruthQASummary(records)
    expect(summary.total).toBe(3)
    expect(summary.confirmed).toBe(1)
    expect(summary.partial).toBe(1)
    expect(summary.missing).toBe(1)
  })

  it('lists conflict record ids', () => {
    const records = [confirmedRecord(), conflictRecord()]
    const summary = buildProductTruthQASummary(records)
    expect(summary.conflicts).toContain('test-vendor-widget-xl-product-truth')
    expect(summary.conflicts).not.toContain('test-vendor-widget-pro-product-truth')
  })

  it('lists records missing key dimensions', () => {
    const records = [
      confirmedRecord(),
      partialRecord(),
    ]
    const summary = buildProductTruthQASummary(records)
    const missingEntry = summary.missingKeyDimensions.find(
      r => r.id === 'test-vendor-widget-lite-product-truth'
    )
    expect(missingEntry).toBeDefined()
    expect(missingEntry.missingFields).toContain('heightIn')
    expect(missingEntry.missingFields).not.toContain('widthIn')
    expect(missingEntry.missingFields).not.toContain('depthIn')
  })

  it('does not include fully-confirmed records in missingKeyDimensions', () => {
    const records = [confirmedRecord()]
    const summary = buildProductTruthQASummary(records)
    expect(summary.missingKeyDimensions).toHaveLength(0)
  })
})

describe('Kozy Heat seed — batch validation', () => {
  it('all Kozy Heat product_truth records pass validation', () => {
    const kozy = hearthVisualAssetSeed.filter(
      a => a.assetType === 'product_truth' && a.vendor === 'Kozy Heat'
    )
    expect(kozy.length).toBeGreaterThan(0)

    const failures = kozy
      .map(r => ({ id: r.id, ...validateProductTruthRecord(r) }))
      .filter(r => !r.valid)

    if (failures.length > 0) {
      const report = failures
        .map(f => `  ${f.id}: ${f.errors.join(', ')}`)
        .join('\n')
      throw new Error(`${failures.length} Kozy Heat records failed validation:\n${report}`)
    }

    expect(failures).toHaveLength(0)
  })

  it('no Kozy Heat product_truth records have customerSafe=true', () => {
    const kozy = hearthVisualAssetSeed.filter(
      a => a.assetType === 'product_truth' && a.vendor === 'Kozy Heat'
    )
    const leaks = kozy.filter(r => r.customerSafe === true)
    expect(leaks).toHaveLength(0)
  })

  it('QA summary shows expected conflict and partial counts', () => {
    const summary = buildProductTruthQASummary(
      hearthVisualAssetSeed.filter(
        a => a.assetType === 'product_truth' && a.vendor === 'Kozy Heat'
      )
    )
    expect(summary.conflicts.length).toBeGreaterThanOrEqual(3)
    expect(summary.partial).toBeGreaterThanOrEqual(3)
    expect(summary.confirmed).toBeGreaterThan(summary.partial)
  })
})
