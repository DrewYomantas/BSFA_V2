import { describe, expect, it } from 'vitest'
import {
  classifyCandidate,
  buildCandidatePool,
  REASON_CODES,
} from '../../src/lib/candidateManifest/candidatePool.js'
import { hearthVisualAssetSeed } from '../../src/data/hearthVisualAssets/hearthVisualAssetSeed.js'

const empire = hearthVisualAssetSeed.filter(
  (a) => a.assetType === 'product_truth' && a.vendor === 'Empire Comfort Systems',
)
const empireById = Object.fromEntries(empire.map((r) => [r.id, r]))

describe('classifyCandidate — Empire records', () => {
  it('confirmed VFP20IN is eligible with confirmed_source_truth reason', () => {
    const c = classifyCandidate(empireById['empire-vfp20in-product-truth'])
    expect(c.eligible).toBe(true)
    expect(c.status).toMatch(/^recommendable/)
    expect(c.customerCard).toBeTruthy()
    expect(c.internalReasons.some((r) => r.code === REASON_CODES.CONFIRMED_SOURCE_TRUTH)).toBe(true)
    expect(c.customerCard.sourceSummary?.referenceCount).toBeGreaterThan(0)
  })

  it('confirmed VFLL38FP customer card carries no internal/source language', () => {
    const c = classifyCandidate(empireById['empire-vfll38fp-product-truth'])
    expect(c.eligible).toBe(true)
    const json = JSON.stringify(c.customerCard)
    for (const banned of ['internalNotes', 'Whisper Flex', 'unresolved', 'OCR', 'confidence', 'margin', 'cost']) {
      expect(json).not.toMatch(new RegExp(banned, 'i'))
    }
  })

  it('VFSR-18 log set is eligible with rep-verification badge but no Whisper Flex in customer card', () => {
    const c = classifyCandidate(empireById['empire-vfsr18-logset-product-truth'])
    expect(c.eligible).toBe(true)
    expect(c.status).toBe('recommendable_with_verification')
    expect(c.verificationBadges).toContain('Rep verification required')
    // Internal reasons keep the guardrail rationale
    const guardrail = c.internalReasons.find((r) => r.code === REASON_CODES.INTERNAL_GUARDRAIL_PRESENT)
    expect(guardrail).toBeTruthy()
    expect(guardrail.internalDetail).toMatch(/Whisper Flex/i)
    // Customer card must NOT mention Whisper Flex
    expect(JSON.stringify(c.customerCard)).not.toMatch(/whisper flex/i)
  })

  it('empire-vfs42fb is blocked with needs_paired_pdf_spec', () => {
    const c = classifyCandidate(empireById['empire-vfs42fb-product-truth'])
    expect(c.eligible).toBe(false)
    expect(c.blockedReason.code).toBe(REASON_CODES.NEEDS_PAIRED_PDF_SPEC)
    expect(c.customerCard).toBeNull()
  })

  it('all confirmed Empire records have at least 1 source evidence (required for eligibility)', () => {
    const confirmed = empire.filter((r) => r.dimensionStatus === 'confirmed')
    for (const r of confirmed) {
      expect(r.sourceEvidence.length).toBeGreaterThan(0)
      const c = classifyCandidate(r)
      expect(c.eligible).toBe(true)
    }
  })
})

describe('classifyCandidate — synthetic edges', () => {
  function fakeConfirmed(overrides = {}) {
    return {
      assetType: 'product_truth',
      id: 'fake-confirmed',
      vendor: 'Fake',
      productName: 'Fake Pro',
      sourceDocumentTitle: 'Fake Manual',
      modelCodes: ['FAKE'],
      customerSafe: false,
      dimensionStatus: 'confirmed',
      seriesDimensions: { widthIn: 30, heightIn: 24, depthIn: 14 },
      sourceEvidence: [{ sourceType: 'install_manual', notes: 'p.1 dims confirmed' }],
      sourceConflict: false,
      sourceConfidence: 'high_vendor_spec',
      internalNotes: null,
      ...overrides,
    }
  }

  it('confirmed record with sourceConflict is blocked source_conflict_review_needed', () => {
    const c = classifyCandidate(fakeConfirmed({
      sourceConflict: true,
      sourceEvidence: [
        { sourceType: 'install_manual', notes: 'p.1 says 30' },
        { sourceType: 'vendor_sku_file', notes: 'sku says 28' },
      ],
    }))
    expect(c.eligible).toBe(false)
    expect(c.blockedReason.code).toBe(REASON_CODES.SOURCE_CONFLICT_REVIEW_NEEDED)
  })

  it('confirmed record with no source evidence is blocked missing_source_evidence', () => {
    const c = classifyCandidate(fakeConfirmed({ sourceEvidence: [] }))
    expect(c.eligible).toBe(false)
    // validation will fire first (empty sourceEvidence is a validation error); accept either code
    expect([
      REASON_CODES.MISSING_SOURCE_EVIDENCE,
      REASON_CODES.INVALID_RECORD_SHAPE,
    ]).toContain(c.blockedReason.code)
  })

  it('confirmed record with secondary source confidence gets pricebook verification badge', () => {
    const c = classifyCandidate(fakeConfirmed({ sourceConfidence: 'medium_secondary' }))
    expect(c.eligible).toBe(true)
    expect(c.verificationBadges).toContain('Current pricebook check')
    expect(c.status).toBe('recommendable_with_verification')
  })

  it('non-product_truth assets are not_product_truth', () => {
    const c = classifyCandidate({ assetType: 'stone_sample', id: 'rock-1' })
    expect(c.eligible).toBe(false)
    expect(c.blockedReason.code).toBe(REASON_CODES.NOT_PRODUCT_TRUTH)
  })

  it('missing dimensionStatus records are blocked', () => {
    const r = fakeConfirmed({ dimensionStatus: 'missing', seriesDimensions: null })
    const c = classifyCandidate(r)
    expect(c.eligible).toBe(false)
    expect(c.blockedReason.code).toBe(REASON_CODES.PARTIAL_DIMENSIONS_BLOCKED)
  })
})

describe('buildCandidatePool — full seed', () => {
  const pool = buildCandidatePool(hearthVisualAssetSeed)

  it('summarizes eligible vs blocked', () => {
    expect(pool.totalSourceRecords).toBeGreaterThan(0)
    expect(pool.eligibleCount + pool.blockedCount).toBe(pool.totalSourceRecords)
  })

  it('all 6 confirmed Empire records appear as eligible', () => {
    const empireEligible = pool.eligible.filter((c) => c.record.vendor === 'Empire Comfort Systems')
    expect(empireEligible.length).toBe(6)
  })

  it('empire-vfs42fb appears in blocked with needs_paired_pdf_spec', () => {
    const blocked = pool.blocked.find((c) => c.id === 'empire-vfs42fb-product-truth')
    expect(blocked).toBeTruthy()
    expect(blocked.blockedReason.code).toBe(REASON_CODES.NEEDS_PAIRED_PDF_SPEC)
  })

  it('no eligible customer card contains banned terms', () => {
    for (const c of pool.eligible) {
      const json = JSON.stringify(c.customerCard)
      for (const banned of ['internalNotes', 'Whisper Flex', 'unresolved', 'OCR', 'confidence', 'margin', 'cost']) {
        expect(json, `${c.id} leaked ${banned}`).not.toMatch(new RegExp(banned, 'i'))
      }
    }
  })

  it('blocked counts contain expected reason codes', () => {
    expect(pool.blockedReasonCounts[REASON_CODES.NEEDS_PAIRED_PDF_SPEC]).toBeGreaterThanOrEqual(1)
  })
})
