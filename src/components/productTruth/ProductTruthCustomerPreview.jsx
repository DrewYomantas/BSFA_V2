function fmtDim(d) {
  if (!d) return null
  const parts = []
  if (d.widthIn) parts.push(`${d.widthIn}"W`)
  if (d.heightIn) parts.push(`${d.heightIn}"H`)
  if (d.depthIn) parts.push(`${d.depthIn}"D`)
  return parts.length ? parts.join(' × ') : null
}

export default function ProductTruthCustomerPreview({ preview, leaks = [] }) {
  if (!preview) {
    return (
      <div className="rounded border border-dashed border-hearth-line bg-white/60 p-3 text-sm text-hearth-muted">
        No customer-safe preview — record is not yet <code>confirmed</code>.
      </div>
    )
  }
  return (
    <div className="space-y-2 rounded border border-hearth-line bg-white p-3 text-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-hearth-ember">
        Customer-safe preview
      </div>
      <div className="text-base font-semibold text-hearth-ink">{preview.productName}</div>
      <div className="text-xs text-hearth-muted">
        {preview.vendor}
        {preview.profileOrSeries ? ` · ${preview.profileOrSeries}` : ''}
      </div>
      <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
        {preview.category && <><dt className="text-hearth-muted">Type</dt><dd>{preview.category}</dd></>}
        {preview.fuelType && <><dt className="text-hearth-muted">Fuel</dt><dd>{preview.fuelType}</dd></>}
        {preview.ignitionType && <><dt className="text-hearth-muted">Ignition</dt><dd>{preview.ignitionType}</dd></>}
        {fmtDim(preview.seriesDimensions) && (
          <><dt className="text-hearth-muted">Unit</dt><dd>{fmtDim(preview.seriesDimensions)}</dd></>
        )}
        {fmtDim(preview.framingDimensions) && (
          <><dt className="text-hearth-muted">Rough opening</dt><dd>{fmtDim(preview.framingDimensions)}</dd></>
        )}
        {preview.viewingArea && (
          <><dt className="text-hearth-muted">Viewing area</dt>
          <dd>{preview.viewingArea.widthIn}"W × {preview.viewingArea.heightIn}"H</dd></>
        )}
        {preview.ventingNotes && (
          <><dt className="text-hearth-muted">Venting</dt><dd className="col-span-1">{preview.ventingNotes}</dd></>
        )}
      </dl>
      <p className="border-t border-hearth-line pt-2 text-xs italic text-hearth-muted">
        {preview.disclaimer}
      </p>
      {leaks.length > 0 && (
        <div role="alert" className="mt-2 rounded border border-red-300 bg-red-50 p-2 text-xs text-red-800">
          QA leak detected — banned terms in preview: {leaks.join(', ')}
        </div>
      )}
    </div>
  )
}
