// Deterministic candidate-pool eligibility. Pure logic, no React. Decides
// which product-truth records may enter the V8 Hearth Café Sit candidate
// pool and, when blocked, why.
//
// Default rules:
//  - confirmed + leak-free customer card + ≥1 source evidence  → eligible
//  - partial/missing                                            → blocked
//  - leaks in customer-safe preview                             → blocked
//  - sourceConflict on a confirmed record                       → blocked, needs review
//  - guardrails (e.g. Whisper Flex) do NOT block; they attach an
//    internal-only verification badge and a verification badge on the
//    customer card indicating "rep verification required"

import { validateProductTruthRecord } from '../hearthVisualAssets/productTruthValidation.js'
import { buildCustomerCandidateCard } from './customerCandidateCard.js'

export const REASON_CODES = Object.freeze({
  CONFIRMED_SOURCE_TRUTH: 'confirmed_source_truth',
  PARTIAL_DIMENSIONS_BLOCKED: 'partial_dimensions_blocked',
  NEEDS_PAIRED_PDF_SPEC: 'needs_paired_pdf_spec',
  CUSTOMER_SAFE_PREVIEW_MISSING: 'customer_safe_preview_missing',
  SOURCE_CONFLICT_REVIEW_NEEDED: 'source_conflict_review_needed',
  INTERNAL_GUARDRAIL_PRESENT: 'internal_guardrail_present',
  CURRENT_MANUAL_OR_PRICEBOOK_REVIEW_RECOMMENDED:
    'current_manual_or_pricebook_review_recommended',
  MISSING_SOURCE_EVIDENCE: 'missing_source_evidence',
  INVALID_RECORD_SHAPE: 'invalid_record_shape',
  NOT_PRODUCT_TRUTH: 'not_product_truth',
})

// Verification badges are visible on both the internal panel AND a sanitized
// label on the customer card. They never carry rationale text customer-side.
const GUARDRAIL_BADGE_LABEL = 'Rep verification required'
const PRICEBOOK_BADGE_LABEL = 'Current pricebook check'

function detectGuardrails(record) {
  const notes = record.internalNotes || ''
  const out = []
  if (/whisper flex/i.test(notes)) {
    out.push({
      code: REASON_CODES.INTERNAL_GUARDRAIL_PRESENT,
      internalDetail:
        'Whisper Flex add-on required by internal Benson Stone field rule for vent-free log sets. Confirm with rep before quote.',
      customerBadgeLabel: GUARDRAIL_BADGE_LABEL,
    })
  }
  return out
}

function detectFreshnessFlag(record) {
  if (
    record.sourceConfidence === 'medium_secondary' ||
    record.sourceConfidence === 'medium_sku_source'
  ) {
    return {
      code: REASON_CODES.CURRENT_MANUAL_OR_PRICEBOOK_REVIEW_RECOMMENDED,
      internalDetail:
        'Source is a secondary or SKU-derived reference. Confirm current manual or pricebook before customer quote.',
      customerBadgeLabel: PRICEBOOK_BADGE_LABEL,
    }
  }
  return null
}

function blocked(record, customerCard, reasonCode, internalDetail) {
  return {
    id: record?.id ?? null,
    record,
    customerCard,
    status: 'blocked',
    eligible: false,
    blockedReason: {
      code: reasonCode,
      internalDetail,
    },
    verificationBadges: [],
    internalReasons: [{ code: reasonCode, internalDetail }],
  }
}

function isPartialNeedingPairedSpec(record) {
  const notes = (record.internalNotes || '').toLowerCase()
  return (
    notes.includes('binary .doc') ||
    notes.includes('not inspectable') ||
    notes.includes('unresolved')
  )
}

export function classifyCandidate(record) {
  if (!record || record.assetType !== 'product_truth') {
    return blocked(record, null, REASON_CODES.NOT_PRODUCT_TRUTH, 'Asset is not a product_truth record.')
  }

  const validation = validateProductTruthRecord(record)
  if (!validation.valid) {
    return blocked(
      record,
      null,
      REASON_CODES.INVALID_RECORD_SHAPE,
      `Record fails validation: ${validation.errors.join('; ')}`,
    )
  }

  if (record.dimensionStatus === 'missing') {
    return blocked(record, null, REASON_CODES.PARTIAL_DIMENSIONS_BLOCKED, 'No dimensions captured yet.')
  }

  if (record.dimensionStatus === 'partial') {
    if (isPartialNeedingPairedSpec(record)) {
      return blocked(
        record,
        null,
        REASON_CODES.NEEDS_PAIRED_PDF_SPEC,
        'Source not inspectable (binary .doc or unresolved). Needs paired PDF/spec sheet from vendor.',
      )
    }
    return blocked(
      record,
      null,
      REASON_CODES.PARTIAL_DIMENSIONS_BLOCKED,
      'dimensionStatus is partial — diagram or framing confirmation outstanding.',
    )
  }

  // dimensionStatus === 'confirmed' from here on.
  const customerCard = buildCustomerCandidateCard(record)
  if (!customerCard) {
    return blocked(
      record,
      null,
      REASON_CODES.CUSTOMER_SAFE_PREVIEW_MISSING,
      'Customer-safe preview could not be produced (allowlist returned null or banned term detected).',
    )
  }

  if (!Array.isArray(record.sourceEvidence) || record.sourceEvidence.length === 0) {
    return blocked(
      record,
      null,
      REASON_CODES.MISSING_SOURCE_EVIDENCE,
      'Confirmed record has no source evidence — every customer-facing claim must be traceable.',
    )
  }

  if (record.sourceConflict) {
    return blocked(
      record,
      customerCard,
      REASON_CODES.SOURCE_CONFLICT_REVIEW_NEEDED,
      'Sources disagree on a measurement. Rep must reconcile before this record enters the customer pool.',
    )
  }

  // Eligible — attach any non-blocking verification badges.
  const internalReasons = [{
    code: REASON_CODES.CONFIRMED_SOURCE_TRUTH,
    internalDetail: 'Source-truth confirmed with figure-mapped evidence.',
  }]
  const verificationBadges = []

  for (const g of detectGuardrails(record)) {
    internalReasons.push(g)
    if (g.customerBadgeLabel) verificationBadges.push(g.customerBadgeLabel)
  }
  const fresh = detectFreshnessFlag(record)
  if (fresh) {
    internalReasons.push(fresh)
    if (fresh.customerBadgeLabel) verificationBadges.push(fresh.customerBadgeLabel)
  }

  const dedupedBadges = Array.from(new Set(verificationBadges))
  const cardWithBadges = { ...customerCard, verificationBadges: dedupedBadges }

  return {
    id: record.id,
    record,
    customerCard: cardWithBadges,
    status: dedupedBadges.length > 0 ? 'recommendable_with_verification' : 'recommendable',
    eligible: true,
    blockedReason: null,
    verificationBadges: dedupedBadges,
    internalReasons,
  }
}

export function buildCandidatePool(records) {
  if (!Array.isArray(records)) {
    return emptyPool()
  }
  const productTruthRecords = records.filter((r) => r && r.assetType === 'product_truth')
  const classifications = productTruthRecords.map(classifyCandidate)

  const eligible = classifications.filter((c) => c.eligible)
  const blockedItems = classifications.filter((c) => !c.eligible)

  const blockedReasonCounts = {}
  for (const c of blockedItems) {
    const code = c.blockedReason?.code ?? 'unknown'
    blockedReasonCounts[code] = (blockedReasonCounts[code] || 0) + 1
  }

  return {
    totalSourceRecords: productTruthRecords.length,
    eligibleCount: eligible.length,
    blockedCount: blockedItems.length,
    recommendableCount: eligible.filter((c) => c.status === 'recommendable').length,
    needsVerificationCount: eligible.filter((c) => c.status === 'recommendable_with_verification').length,
    blockedReasonCounts,
    eligible,
    blocked: blockedItems,
  }
}

function emptyPool() {
  return {
    totalSourceRecords: 0,
    eligibleCount: 0,
    blockedCount: 0,
    recommendableCount: 0,
    needsVerificationCount: 0,
    blockedReasonCounts: {},
    eligible: [],
    blocked: [],
  }
}
