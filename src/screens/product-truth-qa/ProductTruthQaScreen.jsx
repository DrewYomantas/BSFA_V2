import { useMemo, useState } from 'react'
import { hearthVisualAssetSeed } from '../../data/hearthVisualAssets/hearthVisualAssetSeed.js'
import {
  buildProductTruthQaModel,
  filterQaItems,
} from '../../lib/productTruth/productTruthQaModel.js'
import ProductTruthFilters from '../../components/productTruth/ProductTruthFilters.jsx'
import ProductTruthCard from '../../components/productTruth/ProductTruthCard.jsx'

export default function ProductTruthQaScreen() {
  const model = useMemo(() => buildProductTruthQaModel(hearthVisualAssetSeed), [])
  const [vendor, setVendor] = useState('all')
  const [status, setStatus] = useState('all')
  const [search, setSearch] = useState('')

  const visible = useMemo(
    () => filterQaItems(model.items, { vendor, status, search }),
    [model.items, vendor, status, search],
  )

  const s = model.summary

  return (
    <section className="space-y-6" aria-label="Product Truth QA">
      <header className="space-y-2 border-b border-hearth-line pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-hearth-ember">
          Internal rep tool — not for customer view
        </p>
        <h1 className="font-display text-3xl text-hearth-ink md:text-4xl">Product Truth QA</h1>
        <p className="max-w-3xl text-sm text-hearth-muted">
          Inspect ingested product-truth records: status, source evidence, internal notes,
          guardrails, and customer-safe preview side-by-side. Use this before publishing a
          record to any customer-facing surface.
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4 lg:grid-cols-7">
          <Tile label="Total" value={s.total} />
          <Tile label="Confirmed" value={s.confirmed} />
          <Tile label="Partial" value={s.partial} />
          <Tile label="Missing" value={s.missing} />
          <Tile label="Guardrails" value={s.withGuardrails} />
          <Tile label="Open Qs" value={s.withOpenQuestions} />
          <Tile label="Preview leaks" value={s.withLeaks} tone={s.withLeaks > 0 ? 'alert' : 'normal'} />
        </div>
      </header>

      <ProductTruthFilters
        vendors={model.vendors}
        statuses={model.statuses}
        vendor={vendor}
        status={status}
        search={search}
        onVendorChange={setVendor}
        onStatusChange={setStatus}
        onSearchChange={setSearch}
      />

      <div className="text-xs text-hearth-muted">
        Showing {visible.length} of {model.items.length} product-truth records
      </div>

      <div className="grid gap-4">
        {visible.length === 0 ? (
          <div className="rounded border border-dashed border-hearth-line bg-white/60 p-6 text-center text-sm text-hearth-muted">
            No product-truth records match the current filters.
          </div>
        ) : (
          visible.map((item) => <ProductTruthCard key={item.id} item={item} />)
        )}
      </div>
    </section>
  )
}

function Tile({ label, value, tone = 'normal' }) {
  const toneClass = tone === 'alert' && value > 0
    ? 'border-red-300 bg-red-50 text-red-800'
    : 'border-hearth-line bg-hearth-cream/40 text-hearth-ink'
  return (
    <div className={`flex flex-col rounded border px-2 py-1.5 ${toneClass}`}>
      <span className="text-[10px] uppercase tracking-wide text-hearth-muted">{label}</span>
      <span className="text-lg font-semibold">{value}</span>
    </div>
  )
}
