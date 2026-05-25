import { useState } from 'react'
import ProductTruthCustomerPreview from './ProductTruthCustomerPreview.jsx'
import ProductTruthInternalPanel from './ProductTruthInternalPanel.jsx'

const statusBadge = {
  confirmed: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  partial: 'bg-amber-100 text-amber-800 border-amber-300',
  missing: 'bg-red-100 text-red-800 border-red-300',
}

function dimSummary(d) {
  if (!d) return '—'
  const parts = []
  if (d.widthIn) parts.push(`${d.widthIn}"W`)
  if (d.heightIn) parts.push(`${d.heightIn}"H`)
  if (d.depthIn) parts.push(`${d.depthIn}"D`)
  return parts.length ? parts.join(' × ') : '—'
}

export default function ProductTruthCard({ item }) {
  const [open, setOpen] = useState(false)
  const badge = statusBadge[item.dimensionStatus] || 'bg-gray-100 text-gray-800 border-gray-300'

  return (
    <article className="space-y-3 rounded-lg border border-hearth-line bg-white p-4 shadow-sm" data-testid={`product-truth-card-${item.id}`}>
      <header className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold text-hearth-ink">{item.productName}</h3>
          <div className="text-xs text-hearth-muted">
            {item.vendor}
            {item.profileOrSeries ? ` · ${item.profileOrSeries}` : ''}
            {item.category ? ` · ${item.category}` : ''}
          </div>
          <code className="text-[10px] text-hearth-muted">{item.id}</code>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={`rounded border px-2 py-0.5 text-xs font-semibold uppercase ${badge}`}>
            {item.dimensionStatus}
          </span>
          {item.sourceConflict && (
            <span className="rounded border border-orange-300 bg-orange-50 px-2 py-0.5 text-[10px] font-semibold uppercase text-orange-800">
              conflict
            </span>
          )}
        </div>
      </header>

      <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
        <dt className="text-hearth-muted">Unit dims</dt>
        <dd>{dimSummary(item.keyDimensions)}</dd>
        <dt className="text-hearth-muted">Framing</dt>
        <dd>{dimSummary(item.framingDimensions)}</dd>
        <dt className="text-hearth-muted">Evidence</dt>
        <dd>{item.sourceEvidenceCount} source{item.sourceEvidenceCount === 1 ? '' : 's'}</dd>
        <dt className="text-hearth-muted">Customer-safe</dt>
        <dd>{item.hasCustomerSafePreview ? 'Yes' : 'No'}</dd>
        <dt className="text-hearth-muted">Internal notes</dt>
        <dd>{item.hasInternalNotes ? 'Yes' : 'No'}</dd>
        <dt className="text-hearth-muted">Open questions</dt>
        <dd>{item.openQuestions.length}</dd>
      </dl>

      <div className="text-xs">
        <span className="font-semibold text-hearth-ink">Next action:</span>{' '}
        <span className="text-hearth-ink">{item.nextAction}</span>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-xs font-semibold text-hearth-ember hover:underline"
        aria-expanded={open}
      >
        {open ? 'Hide details' : 'Show details'}
      </button>

      {open && (
        <div className="grid gap-3 lg:grid-cols-2">
          <ProductTruthCustomerPreview preview={item.customerPreview} leaks={item.customerPreviewLeaks} />
          <ProductTruthInternalPanel item={item} />
        </div>
      )}
    </article>
  )
}
