import { validateProductTruthRecord } from '../hearthVisualAssets/productTruthValidation.js'
import {
  buildCustomerSafeProductPreview,
  findBannedTermsInPreview,
} from './customerSafeProductPreview.js'

// QA next-action copy by record state. Internal rep language only — never
// shown customer-facing.
function deriveNextAction(record, validation) {
  if (!record) return 'No record'
  if (!validation.valid) return 'Fix validation errors before any rep use'

  const status = record.dimensionStatus
  const notes = (record.internalNotes || '').toLowerCase()

  if (status === 'missing') {
    return 'Needs source manual / spec sheet ingest before any use'
  }
  if (status === 'partial') {
    if (notes.includes('binary .doc') || notes.includes('not inspectable') || notes.includes('unresolved')) {
      return 'Needs paired PDF/spec sheet — current source is not inspectable'
    }
    return 'Needs source diagram confirmation before customer-facing use'
  }
  if (status === 'confirmed') {
    if (record.sourceConflict) {
      return 'Confirmed but has source conflict — rep must reconcile before quote'
    }
    if (record.sourceConfidence === 'medium_secondary' || record.sourceConfidence === 'medium_sku_source') {
      return 'Ready for internal recommendation; confirm current pricebook/manual before customer quote'
    }
    return 'Ready for internal recommendation use'
  }
  return 'Unclassified — review record manually'
}

function deriveGuardrails(record) {
  const notes = record.internalNotes || ''
  const out = []
  if (/whisper flex/i.test(notes)) {
    out.push({
      label: 'Whisper Flex',
      detail:
        'Internal Benson Stone field rule — VF log sets installed by Benson Stone require Whisper Flex as a standard add-on. Confirm with rep before each quote. Not a manufacturer requirement.',
    })
  }
  if (record.sourceConflict) {
    out.push({
      label: 'Source conflict',
      detail: 'Two sources disagree on a measurement. See source evidence panel.',
    })
  }
  return out
}

function deriveOpenQuestions(record) {
  const out = []
  const dims = record.seriesDimensions
  if (record.dimensionStatus === 'partial') {
    if (!dims) {
      out.push('seriesDimensions missing entirely')
    } else {
      for (const k of ['widthIn', 'heightIn', 'depthIn']) {
        if (dims[k] == null) out.push(`seriesDimensions.${k} not yet confirmed`)
      }
    }
    if (!record.framingDimensions) {
      out.push('framingDimensions missing — needed for rough-opening')
    } else {
      for (const k of ['widthIn', 'heightIn', 'depthIn']) {
        if (record.framingDimensions[k] == null) {
          out.push(`framingDimensions.${k} not yet confirmed`)
        }
      }
    }
  }
  if (record.dimensionStatus === 'missing') {
    out.push('No dimensions captured yet')
  }
  return out
}

export function buildProductTruthQaItem(record) {
  if (!record || record.assetType !== 'product_truth') return null
  const validation = validateProductTruthRecord(record)
  const customerPreview = buildCustomerSafeProductPreview(record)
  const previewLeaks = findBannedTermsInPreview(customerPreview)

  return {
    id: record.id,
    productName: record.productName,
    vendor: record.vendor,
    profileOrSeries: record.profileOrSeries || null,
    category: record.category || null,
    dimensionStatus: record.dimensionStatus,
    sourceConflict: Boolean(record.sourceConflict),
    keyDimensions: record.seriesDimensions || null,
    framingDimensions: record.framingDimensions || null,
    viewingArea: record.viewingArea || null,
    modelCodes: record.modelCodes || [],
    sourceEvidenceCount: Array.isArray(record.sourceEvidence) ? record.sourceEvidence.length : 0,
    sourceEvidence: record.sourceEvidence || [],
    sourceDocumentTitle: record.sourceDocumentTitle || null,
    sourcePageOrSection: record.sourcePageOrSection || null,
    hasCustomerSafePreview: customerPreview !== null,
    customerPreview,
    customerPreviewLeaks: previewLeaks,
    hasInternalNotes: Boolean(record.internalNotes),
    internalNotes: record.internalNotes || null,
    guardrails: deriveGuardrails(record),
    openQuestions: deriveOpenQuestions(record),
    nextAction: deriveNextAction(record, validation),
    validation,
  }
}

export function buildProductTruthQaModel(records) {
  if (!Array.isArray(records)) {
    return { items: [], vendors: [], statuses: [], summary: emptySummary() }
  }
  const items = records
    .filter((r) => r && r.assetType === 'product_truth')
    .map(buildProductTruthQaItem)
    .filter(Boolean)

  const vendors = Array.from(new Set(items.map((i) => i.vendor))).sort()
  const statuses = Array.from(new Set(items.map((i) => i.dimensionStatus))).sort()

  return {
    items,
    vendors,
    statuses,
    summary: summarize(items),
  }
}

function emptySummary() {
  return { total: 0, confirmed: 0, partial: 0, missing: 0, withGuardrails: 0, withOpenQuestions: 0, withLeaks: 0 }
}

function summarize(items) {
  return {
    total: items.length,
    confirmed: items.filter((i) => i.dimensionStatus === 'confirmed').length,
    partial: items.filter((i) => i.dimensionStatus === 'partial').length,
    missing: items.filter((i) => i.dimensionStatus === 'missing').length,
    withGuardrails: items.filter((i) => i.guardrails.length > 0).length,
    withOpenQuestions: items.filter((i) => i.openQuestions.length > 0).length,
    withLeaks: items.filter((i) => i.customerPreviewLeaks.length > 0).length,
  }
}

export function filterQaItems(items, { vendor, status, search }) {
  if (!Array.isArray(items)) return []
  const q = (search || '').trim().toLowerCase()
  return items.filter((item) => {
    if (vendor && vendor !== 'all' && item.vendor !== vendor) return false
    if (status && status !== 'all' && item.dimensionStatus !== status) return false
    if (q) {
      const hay = `${item.productName} ${item.id} ${item.profileOrSeries || ''}`.toLowerCase()
      if (!hay.includes(q)) return false
    }
    return true
  })
}
