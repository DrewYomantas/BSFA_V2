function fmtDim(d) {
  if (!d) return null
  const parts = []
  if (d.widthIn) parts.push(`${d.widthIn}"W`)
  if (d.heightIn) parts.push(`${d.heightIn}"H`)
  if (d.depthIn) parts.push(`${d.depthIn}"D`)
  return parts.length ? parts.join(' × ') : null
}

function CustomerCard({ card }) {
  return (
    <article className="space-y-2 rounded border border-hearth-line bg-white p-3 text-sm" data-testid={`candidate-card-${card.id}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-base font-semibold text-hearth-ink">{card.displayName}</div>
          <div className="text-xs text-hearth-muted">
            {card.vendor}{card.productClass ? ` · ${card.productClass}` : ''}
          </div>
        </div>
        {card.verificationBadges?.length > 0 && (
          <div className="flex flex-col items-end gap-1">
            {card.verificationBadges.map((b) => (
              <span key={b} className="rounded border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase text-amber-800">
                {b}
              </span>
            ))}
          </div>
        )}
      </div>
      <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
        {card.fuelType && <><dt className="text-hearth-muted">Fuel</dt><dd>{card.fuelType}</dd></>}
        {card.ignitionType && <><dt className="text-hearth-muted">Ignition</dt><dd>{card.ignitionType}</dd></>}
        {fmtDim(card.keyDimensions) && <><dt className="text-hearth-muted">Unit</dt><dd>{fmtDim(card.keyDimensions)}</dd></>}
        {fmtDim(card.framingDimensions) && <><dt className="text-hearth-muted">Rough opening</dt><dd>{fmtDim(card.framingDimensions)}</dd></>}
        {card.viewingArea && <><dt className="text-hearth-muted">Viewing</dt><dd>{card.viewingArea.widthIn}"W × {card.viewingArea.heightIn}"H</dd></>}
        {card.sourceSummary && (
          <><dt className="text-hearth-muted">Reference</dt>
          <dd>{card.sourceSummary.primaryLabel} ({card.sourceSummary.referenceCount})</dd></>
        )}
      </dl>
      <p className="border-t border-hearth-line pt-2 text-[11px] italic text-hearth-muted">{card.disclaimer}</p>
    </article>
  )
}

function BlockedRow({ item }) {
  return (
    <li className="space-y-1 rounded border border-hearth-line bg-hearth-cream/30 p-3 text-sm" data-testid={`blocked-row-${item.id}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-semibold text-hearth-ink">{item.record?.productName || item.id}</div>
          <div className="text-xs text-hearth-muted">{item.record?.vendor}</div>
          <code className="text-[10px] text-hearth-muted">{item.id}</code>
        </div>
        <span className="rounded border border-red-300 bg-red-50 px-2 py-0.5 text-[10px] font-semibold uppercase text-red-800">
          {item.blockedReason?.code}
        </span>
      </div>
      {item.blockedReason?.internalDetail && (
        <p className="text-xs text-hearth-ink">{item.blockedReason.internalDetail}</p>
      )}
    </li>
  )
}

export default function CandidatePoolPreview({ pool }) {
  if (!pool) return null
  const reasonEntries = Object.entries(pool.blockedReasonCounts || {})

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-2 gap-3 text-xs sm:grid-cols-3 lg:grid-cols-5">
        <Tile label="Source records" value={pool.totalSourceRecords} />
        <Tile label="Eligible" value={pool.eligibleCount} tone="ok" />
        <Tile label="Recommendable" value={pool.recommendableCount} />
        <Tile label="Needs verification" value={pool.needsVerificationCount} />
        <Tile label="Blocked" value={pool.blockedCount} tone={pool.blockedCount > 0 ? 'warn' : 'normal'} />
      </section>

      {reasonEntries.length > 0 && (
        <section>
          <h3 className="mb-2 text-sm font-semibold text-hearth-ink">Blocked reason counts</h3>
          <ul className="flex flex-wrap gap-2 text-xs">
            {reasonEntries.map(([code, count]) => (
              <li key={code} className="rounded border border-hearth-line bg-white px-2 py-1">
                <span className="font-semibold text-hearth-ink">{code}</span>
                <span className="ml-2 text-hearth-muted">{count}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="mb-3 text-base font-semibold text-hearth-ink">Eligible — customer cards</h2>
        {pool.eligible.length === 0 ? (
          <div className="rounded border border-dashed border-hearth-line bg-white/60 p-4 text-center text-sm text-hearth-muted">
            No eligible candidates yet.
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {pool.eligible.map((c) => <CustomerCard key={c.id} card={c.customerCard} />)}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-base font-semibold text-hearth-ink">Blocked — internal reason panel</h2>
        {pool.blocked.length === 0 ? (
          <div className="rounded border border-dashed border-hearth-line bg-white/60 p-4 text-center text-sm text-hearth-muted">
            No blocked candidates.
          </div>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2">
            {pool.blocked.map((c) => <BlockedRow key={c.id} item={c} />)}
          </ul>
        )}
      </section>
    </div>
  )
}

function Tile({ label, value, tone = 'normal' }) {
  const toneClass = tone === 'ok'
    ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
    : tone === 'warn' && value > 0
      ? 'border-amber-300 bg-amber-50 text-amber-800'
      : 'border-hearth-line bg-hearth-cream/40 text-hearth-ink'
  return (
    <div className={`flex flex-col rounded border px-2 py-1.5 ${toneClass}`}>
      <span className="text-[10px] uppercase tracking-wide text-hearth-muted">{label}</span>
      <span className="text-lg font-semibold">{value}</span>
    </div>
  )
}
