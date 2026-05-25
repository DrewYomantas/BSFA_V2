// V8-style candidate-manifest adapter. Produces a single manifest object with
// four explicitly-separated buckets:
//   customer:   what may be shown on a customer-facing surface (sanitized cards)
//   rep:        rep-facing summary (display name, status, badges, blocked reason)
//   internal:   internal reasons, validation status, guardrail rationale
//   sources:    source evidence per record, never customer-facing
//
// Consumers should NEVER reach across buckets — the Hearth Café Sit narrowing
// flow reads only `customer`. The rep QA layer reads `rep` + `internal` +
// `sources`. The manifest is deterministic given the same input seed.

import { buildCandidatePool, REASON_CODES } from './candidatePool.js'

export { REASON_CODES }

export function buildCandidateManifest(records) {
  const pool = buildCandidatePool(records)

  const customer = pool.eligible.map((c) => c.customerCard)

  const rep = [...pool.eligible, ...pool.blocked].map((c) => ({
    id: c.id,
    displayName: c.record?.productName ?? null,
    vendor: c.record?.vendor ?? null,
    status: c.status,
    eligible: c.eligible,
    verificationBadges: c.verificationBadges,
    blockedReasonCode: c.blockedReason?.code ?? null,
  }))

  const internal = [...pool.eligible, ...pool.blocked].map((c) => ({
    id: c.id,
    reasons: c.internalReasons,
    blockedReason: c.blockedReason,
    internalNotes: c.record?.internalNotes ?? null,
  }))

  const sources = [...pool.eligible, ...pool.blocked].map((c) => ({
    id: c.id,
    sourceDocumentTitle: c.record?.sourceDocumentTitle ?? null,
    sourcePageOrSection: c.record?.sourcePageOrSection ?? null,
    sourceEvidence: c.record?.sourceEvidence ?? [],
  }))

  return {
    summary: {
      totalSourceRecords: pool.totalSourceRecords,
      eligibleCount: pool.eligibleCount,
      blockedCount: pool.blockedCount,
      recommendableCount: pool.recommendableCount,
      needsVerificationCount: pool.needsVerificationCount,
      blockedReasonCounts: pool.blockedReasonCounts,
    },
    customer,
    rep,
    internal,
    sources,
    pool,
  }
}
