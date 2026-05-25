import { describe, expect, it } from 'vitest'
import {
  buildCustomerSafeProductPreview,
  findBannedTermsInPreview,
  CUSTOMER_SAFE_BANNED_TERMS,
} from '../../src/lib/productTruth/customerSafeProductPreview.js'
import {
  buildProductTruthQaItem,
  buildProductTruthQaModel,
  filterQaItems,
} from '../../src/lib/productTruth/productTruthQaModel.js'
import { hearthVisualAssetSeed } from '../../src/data/hearthVisualAssets/hearthVisualAssetSeed.js'

const empire = hearthVisualAssetSeed.filter(
  (a) => a.assetType === 'product_truth' && a.vendor === 'Empire Comfort Systems',
)
const empireById = Object.fromEntries(empire.map((r) => [r.id, r]))

describe('buildCustomerSafeProductPreview', () => {
  it('returns null for non-product_truth records', () => {
    expect(buildCustomerSafeProductPreview({ assetType: 'stone_sample' })).toBeNull()
  })

  it('returns null when the record is partial (not ready for customer preview)', () => {
    const partial = empireById['empire-vfs42fb-product-truth']
    expect(partial.dimensionStatus).toBe('partial')
    expect(buildCustomerSafeProductPreview(partial)).toBeNull()
  })

  it('returns a preview for a confirmed Empire record', () => {
    const r = empireById['empire-vfp20in-product-truth']
    const preview = buildCustomerSafeProductPreview(r)
    expect(preview).not.toBeNull()
    expect(preview.productName).toBe('Empire VFP20IN')
    expect(preview.vendor).toBe('Empire Comfort Systems')
    expect(preview.seriesDimensions).toEqual({ widthIn: 28, heightIn: 19.75, depthIn: 12.75 })
    expect(preview.disclaimer).toMatch(/Concept reference only/i)
  })

  it('preview omits internalNotes and source uncertainty fields', () => {
    const r = empireById['empire-vfp28in-product-truth']
    const preview = buildCustomerSafeProductPreview(r)
    expect(preview).not.toHaveProperty('internalNotes')
    expect(preview).not.toHaveProperty('sourceEvidence')
    expect(preview).not.toHaveProperty('sourceConfidence')
    expect(preview).not.toHaveProperty('customerSafe')
  })

  it('confirmed Empire previews are free of all banned terms', () => {
    const confirmedEmpire = empire.filter((r) => r.dimensionStatus === 'confirmed')
    expect(confirmedEmpire.length).toBeGreaterThan(0)
    for (const r of confirmedEmpire) {
      const preview = buildCustomerSafeProductPreview(r)
      const leaks = findBannedTermsInPreview(preview)
      expect(leaks, `leaks in ${r.id}: ${leaks.join(',')}`).toEqual([])
    }
  })

  it('Whisper Flex specifically does not appear in any confirmed log-set preview', () => {
    const logSets = empire.filter(
      (r) => r.dimensionStatus === 'confirmed' && r.category === 'vf_log_set',
    )
    expect(logSets.length).toBe(3)
    for (const r of logSets) {
      const preview = buildCustomerSafeProductPreview(r)
      const serialized = JSON.stringify(preview)
      expect(serialized).not.toMatch(/whisper flex/i)
    }
  })

  it('banned-term list contains the rep-only / uncertainty terms named in the QA spec', () => {
    for (const term of ['internalNotes', 'Whisper Flex', 'unresolved', 'OCR', 'confidence', 'margin', 'cost']) {
      expect(CUSTOMER_SAFE_BANNED_TERMS).toContain(term)
    }
  })
})

describe('buildProductTruthQaItem — Empire records', () => {
  it('produces nextAction "Ready for internal recommendation" for a confirmed Empire insert', () => {
    const item = buildProductTruthQaItem(empireById['empire-vfp20in-product-truth'])
    expect(item.dimensionStatus).toBe('confirmed')
    expect(item.nextAction).toMatch(/Ready for internal recommendation/i)
    expect(item.hasCustomerSafePreview).toBe(true)
  })

  it('produces "Needs paired PDF/spec sheet" next action for empire-vfs42fb', () => {
    const item = buildProductTruthQaItem(empireById['empire-vfs42fb-product-truth'])
    expect(item.dimensionStatus).toBe('partial')
    expect(item.nextAction).toMatch(/paired PDF|spec sheet|not inspectable/i)
    expect(item.hasCustomerSafePreview).toBe(false)
    expect(item.openQuestions.length).toBeGreaterThan(0)
  })

  it('confirmed Empire records expose source evidence with page/figure references', () => {
    const item = buildProductTruthQaItem(empireById['empire-vfll38fp-product-truth'])
    expect(item.sourceEvidenceCount).toBeGreaterThan(0)
    expect(item.sourceDocumentTitle).toBeTruthy()
    expect(item.sourcePageOrSection).toMatch(/p\.\d+|Figure/i)
    expect(item.sourceEvidence[0].notes).toMatch(/Figure|p\.\d+/)
  })

  it('Whisper Flex appears in internal panel data (guardrails + internalNotes) for vf_log_set records', () => {
    const item = buildProductTruthQaItem(empireById['empire-vfsr18-logset-product-truth'])
    expect(item.guardrails.some((g) => g.label === 'Whisper Flex')).toBe(true)
    expect(item.internalNotes).toMatch(/Whisper Flex/i)
    // but Whisper Flex must NOT leak to the customer preview
    const preview = JSON.stringify(item.customerPreview)
    expect(preview).not.toMatch(/whisper flex/i)
  })
})

describe('buildProductTruthQaModel + filterQaItems', () => {
  it('builds a model from the full seed and reports totals', () => {
    const model = buildProductTruthQaModel(hearthVisualAssetSeed)
    expect(model.items.length).toBeGreaterThan(0)
    expect(model.vendors).toContain('Empire Comfort Systems')
    expect(model.summary.total).toBe(model.items.length)
    expect(model.summary.confirmed + model.summary.partial + model.summary.missing)
      .toBe(model.items.length)
    expect(model.summary.withLeaks).toBe(0)
  })

  it('filters by vendor', () => {
    const model = buildProductTruthQaModel(hearthVisualAssetSeed)
    const onlyEmpire = filterQaItems(model.items, { vendor: 'Empire Comfort Systems', status: 'all', search: '' })
    expect(onlyEmpire.length).toBe(7)
    expect(onlyEmpire.every((i) => i.vendor === 'Empire Comfort Systems')).toBe(true)
  })

  it('filters by status', () => {
    const model = buildProductTruthQaModel(hearthVisualAssetSeed)
    const onlyPartial = filterQaItems(model.items, {
      vendor: 'Empire Comfort Systems',
      status: 'partial',
      search: '',
    })
    expect(onlyPartial.map((i) => i.id)).toEqual(['empire-vfs42fb-product-truth'])
  })

  it('search matches product name, id, and series (case-insensitive)', () => {
    const model = buildProductTruthQaModel(hearthVisualAssetSeed)
    const hits = filterQaItems(model.items, { vendor: 'all', status: 'all', search: 'vfsr' })
    expect(hits.length).toBe(3)
    expect(hits.every((i) => /vfsr/i.test(`${i.productName} ${i.id} ${i.profileOrSeries || ''}`))).toBe(true)
  })
})
