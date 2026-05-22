import { useMemo, useState } from 'react'
import { hearthVisualAssetSeed } from '../../data/hearthVisualAssets/hearthVisualAssetSeed.js'
import {
  buildVisualAssetSummary,
  isCustomerSafeVisualAsset,
  normalizeHearthVisualAsset,
} from '../../lib/hearthVisualAssets/hearthVisualAssetModel.js'

const typeLabels = {
  stone_sample: 'Stone samples',
  fireplace_face_reference: 'Fireplace faces',
  mantel_reference: 'Mantels',
  hearth_slab_reference: 'Hearths & slabs',
  customer_room_photo: 'Customer rooms',
  premade_room_reference: 'Premade rooms',
  brochure_image_candidate: 'Brochure candidates',
  processed_cropped_asset: 'Processed assets',
  customer_safe_concept_output: 'Concept outputs',
  needs_review: 'Review pending',
}

export default function HearthVisualAssetsScreen() {
  const assets = useMemo(() =>
    hearthVisualAssetSeed.map(normalizeHearthVisualAsset).sort((a, b) => a.title.localeCompare(b.title)),
  [])
  const [selectedType, setSelectedType] = useState('all')
  const types = ['all', ...new Set(assets.map((asset) => asset.assetType))]
  const visibleAssets = selectedType === 'all'
    ? assets
    : assets.filter((asset) => asset.assetType === selectedType)
  const groupedAssets = groupByType(visibleAssets)
  const customerSafeCount = assets.filter(isCustomerSafeVisualAsset).length

  return (
    <section className="space-y-8" aria-label="Hearth visual asset library">
      <header className="grid gap-5 border-b border-hearth-line pb-7 lg:grid-cols-[1fr_auto] lg:items-end">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-hearth-ember">
            Internal prototype - visual asset library only
          </p>
          <h1 className="font-display text-4xl text-hearth-ink md:text-5xl">Hearth Visual Asset Library</h1>
          <p className="text-base leading-7 text-hearth-muted">
            Source-backed showroom, brochure, room, mantel, hearth, and concept references for the next Hearth Studio visual workflow.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <StatusTile label="Seed records" value={assets.length} />
          <StatusTile label="Customer-safe" value={customerSafeCount} />
        </div>
      </header>

      <div className="flex flex-wrap gap-2" aria-label="Asset category filters">
        {types.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setSelectedType(type)}
            className={`rounded border px-3 py-2 text-sm transition ${
              selectedType === type
                ? 'border-hearth-ember bg-hearth-ember text-white'
                : 'border-hearth-line bg-white/70 text-hearth-muted hover:border-hearth-ember hover:text-hearth-ink'
            }`}
          >
            {type === 'all' ? 'All' : typeLabels[type]}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {Object.entries(groupedAssets).map(([assetType, typeAssets]) => (
          <section key={assetType} className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-hearth-ink">{typeLabels[assetType]}</h2>
              <p className="text-sm text-hearth-muted">{typeAssets.length} records</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {typeAssets.map((asset) => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}

function StatusTile({ label, value }) {
  return (
    <div className="border border-hearth-line bg-white/75 px-4 py-3">
      <p className="text-xs uppercase tracking-[0.18em] text-hearth-muted">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-hearth-ink">{value}</p>
    </div>
  )
}

function AssetCard({ asset }) {
  const summary = buildVisualAssetSummary(asset)
  const customerSafe = isCustomerSafeVisualAsset(asset)

  return (
    <article className="border border-hearth-line bg-white/80 p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-hearth-ink">{asset.title}</h3>
          <p className="mt-1 text-sm text-hearth-muted">
            {[asset.vendor, asset.productName, asset.profileOrSeries].filter(Boolean).join(' / ') || summary.sourceLabel}
          </p>
        </div>
        <span className={`border px-2 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${
          customerSafe
            ? 'border-emerald-700 bg-emerald-50 text-emerald-800'
            : 'border-amber-700 bg-amber-50 text-amber-800'
        }`}
        >
          {customerSafe ? 'Customer-safe' : 'Review pending'}
        </span>
      </div>

      <div className="mt-4 grid gap-4 text-sm text-hearth-muted md:grid-cols-2">
        <UseList title="Allowed" items={asset.allowedUses} />
        <UseList title="Prohibited" items={asset.prohibitedUses} />
      </div>

      <p className="mt-4 border-t border-hearth-line pt-4 text-sm leading-6 text-hearth-muted">
        {summary.customerDisclaimer}
      </p>
    </article>
  )
}

function UseList({ title, items }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-hearth-ink">{title}</p>
      <ul className="mt-2 space-y-1">
        {items.slice(0, 4).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

function groupByType(assets) {
  return assets.reduce((groups, asset) => {
    groups[asset.assetType] = groups[asset.assetType] || []
    groups[asset.assetType].push(asset)
    return groups
  }, {})
}
