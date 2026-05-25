import { describe, expect, it } from 'vitest'
import { buildCandidateManifest, REASON_CODES } from '../../src/lib/candidateManifest/candidateManifestModel.js'
import { hearthVisualAssetSeed } from '../../src/data/hearthVisualAssets/hearthVisualAssetSeed.js'

const manifest = buildCandidateManifest(hearthVisualAssetSeed)

describe('buildCandidateManifest — bucket separation', () => {
  it('exposes customer/rep/internal/sources buckets', () => {
    expect(Array.isArray(manifest.customer)).toBe(true)
    expect(Array.isArray(manifest.rep)).toBe(true)
    expect(Array.isArray(manifest.internal)).toBe(true)
    expect(Array.isArray(manifest.sources)).toBe(true)
  })

  it('customer bucket length equals eligible count', () => {
    expect(manifest.customer.length).toBe(manifest.summary.eligibleCount)
  })

  it('rep and internal buckets cover ALL product_truth records (eligible + blocked)', () => {
    expect(manifest.rep.length).toBe(manifest.summary.totalSourceRecords)
    expect(manifest.internal.length).toBe(manifest.summary.totalSourceRecords)
  })

  it('customer bucket contains zero internalNotes/Whisper Flex/banned terms', () => {
    const text = JSON.stringify(manifest.customer)
    for (const banned of ['internalNotes', 'Whisper Flex', 'unresolved', 'OCR', 'confidence', 'margin', 'cost']) {
      expect(text).not.toMatch(new RegExp(banned, 'i'))
    }
  })

  it('internal bucket retains Whisper Flex rationale for VFSR records', () => {
    const vfsr = manifest.internal.find((i) => i.id === 'empire-vfsr18-logset-product-truth')
    expect(vfsr).toBeTruthy()
    expect(JSON.stringify(vfsr)).toMatch(/whisper flex/i)
  })

  it('sources bucket carries source evidence for confirmed Empire records', () => {
    const vfp = manifest.sources.find((s) => s.id === 'empire-vfp20in-product-truth')
    expect(vfp.sourceEvidence.length).toBeGreaterThan(0)
    expect(vfp.sourcePageOrSection).toBeTruthy()
  })

  it('rep bucket marks empire-vfs42fb blocked with needs_paired_pdf_spec', () => {
    const row = manifest.rep.find((r) => r.id === 'empire-vfs42fb-product-truth')
    expect(row.eligible).toBe(false)
    expect(row.blockedReasonCode).toBe(REASON_CODES.NEEDS_PAIRED_PDF_SPEC)
  })

  it('REASON_CODES is re-exported from the model module', () => {
    expect(REASON_CODES.CONFIRMED_SOURCE_TRUTH).toBe('confirmed_source_truth')
    expect(REASON_CODES.NEEDS_PAIRED_PDF_SPEC).toBe('needs_paired_pdf_spec')
  })
})
