import { useMemo, useState } from 'react'
import { hearthVisualAssetSeed } from '../../data/hearthVisualAssets/hearthVisualAssetSeed.js'
import {
  getAssetsWithSourceBlockers,
  getReferenceReadyVisualAssets,
} from '../../lib/hearthVisualAssets/hearthVisualAssetFilters.js'
import {
  buildVisualAssetSummary,
  getVisualAssetSourceBlockers,
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
  product_truth: 'Product truth',
  needs_review: 'Review pending',
}

export default function HearthVisualAssetsScreen() {
  const assets = useMemo(() =>
    hearthVisualAssetSeed.map(normalizeHearthVisualAsset).sort((a, b) => a.title.localeCompare(b.title)),
  [])
  const [selectedType, setSelectedType] = useState('all')
  const [selectedReviewStatus, setSelectedReviewStatus] = useState('all')
  const types = ['all', ...new Set(assets.map((asset) => asset.assetType))]
  const reviewStatuses = ['all', ...new Set(assets.map((asset) => asset.reviewStatus))]
  const visibleAssets = assets.filter((asset) => (
    (selectedType === 'all' || asset.assetType === selectedType) &&
    (selectedReviewStatus === 'all' || asset.reviewStatus === selectedReviewStatus)
  ))
  const groupedAssets = groupByType(visibleAssets)
  const customerSafeCount = assets.filter(isCustomerSafeVisualAsset).length
  const referenceReadyCount = getReferenceReadyVisualAssets(assets).length
  const sourceBlockerCount = getAssetsWithSourceBlockers(assets).length

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
        <div className="grid grid-cols-2 gap-3 text-sm xl:grid-cols-4">
          <StatusTile label="Seed records" value={assets.length} />
          <StatusTile label="Reference-ready" value={referenceReadyCount} />
          <StatusTile label="Customer-safe" value={customerSafeCount} />
          <StatusTile label="Source blockers" value={sourceBlockerCount} />
        </div>
      </header>

      <div className="space-y-3 border-b border-hearth-line pb-6">
        <FilterRow
          label="Category"
          options={types}
          selected={selectedType}
          onSelect={setSelectedType}
          formatLabel={(type) => (type === 'all' ? 'All' : typeLabels[type])}
        />
        <FilterRow
          label="Review"
          options={reviewStatuses}
          selected={selectedReviewStatus}
          onSelect={setSelectedReviewStatus}
          formatLabel={formatReviewStatus}
        />
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

function FilterRow({ label, options, selected, onSelect, formatLabel }) {
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label={`${label} filters`}>
      <span className="mr-1 text-xs font-semibold uppercase tracking-[0.18em] text-hearth-muted">{label}</span>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(option)}
          className={`rounded border px-3 py-2 text-sm transition ${
            selected === option
              ? 'border-hearth-ember bg-hearth-ember text-white'
              : 'border-hearth-line bg-white/70 text-hearth-muted hover:border-hearth-ember hover:text-hearth-ink'
          }`}
        >
          {formatLabel(option)}
        </button>
      ))}
    </div>
  )
}

function AssetCard({ asset }) {
  const summary = buildVisualAssetSummary(asset)
  const customerSafe = isCustomerSafeVisualAsset(asset)
  const blockers = getVisualAssetSourceBlockers(asset)

  return (
    <article className="border border-hearth-line bg-white/80 p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-hearth-ink">{asset.title}</h3>
          <p className="mt-1 text-sm text-hearth-muted">
            {[asset.vendor, asset.productName, asset.profileOrSeries].filter(Boolean).join(' / ') || summary.sourceLabel}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone={asset.reviewStatus === 'reference_ready' ? 'green' : 'amber'}>
            {formatReviewStatus(asset.reviewStatus)}
          </Badge>
          <Badge tone={customerSafe ? 'green' : 'amber'}>
            {customerSafe ? 'Customer-safe' : 'Internal only'}
          </Badge>
        </div>
      </div>

      <div className="mt-4 grid gap-3 border-y border-hearth-line py-4 text-sm text-hearth-muted md:grid-cols-2">
        <MetaLine label="Source" value={summary.sourceLabel} />
        <MetaLine label="Section" value={asset.sourcePageOrSection || 'Pending'} />
        <MetaLine label="Folder URL" value={asset.driveFolderUrl ? 'Recorded' : 'Missing'} />
        <MetaLine label="File URL" value={asset.driveFileUrl ? 'Recorded' : 'Missing'} />
        <MetaLine label="Reviewed" value={asset.lastReviewedDate || 'Pending'} />
        <MetaLine label="Safe use" value={asset.customerSafeUse || 'Not customer-safe'} />
      </div>

      {blockers.length > 0 && (
        <div className="mt-4 border border-amber-700 bg-amber-50 p-3 text-sm text-amber-900">
          <p className="font-semibold">Source blockers</p>
          <ul className="mt-2 space-y-1">
            {blockers.map((blocker) => (
              <li key={blocker}>{blocker}</li>
            ))}
          </ul>
        </div>
      )}

      {asset.assetType === 'product_truth' && <ProductTruthPanel asset={asset} />}

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

function ProductTruthPanel({ asset }) {
  const dimStatus = asset.dimensionStatus
  const dimTone = dimStatus === 'confirmed' ? 'green' : dimStatus === 'partial' ? 'amber' : 'red'
  const dimLabel = dimStatus === 'confirmed' ? 'Dimensions confirmed' : dimStatus === 'partial' ? 'Dimensions partial' : 'Dimensions missing'

  return (
    <div className="mt-4 space-y-4 border border-hearth-line bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-hearth-muted">Product truth</p>

      <div className="flex flex-wrap gap-2">
        {asset.modelCodes.map((code) => (
          <span key={code} className="border border-hearth-line bg-white px-2 py-1 font-mono text-xs text-hearth-ink">
            {code}
          </span>
        ))}
        <span className={`border px-2 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${
          dimTone === 'green' ? 'border-emerald-700 bg-emerald-50 text-emerald-800'
            : dimTone === 'amber' ? 'border-amber-700 bg-amber-50 text-amber-800'
            : 'border-red-700 bg-red-50 text-red-800'
        }`}>
          {dimLabel}
        </span>
      </div>

      {asset.seriesDimensions ? (
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="border border-hearth-line bg-white p-3 text-center">
            <p className="text-xs uppercase tracking-[0.14em] text-hearth-muted">Width</p>
            <p className="mt-1 text-lg font-semibold text-hearth-ink">{asset.seriesDimensions.widthIn}&Prime;</p>
          </div>
          <div className="border border-hearth-line bg-white p-3 text-center">
            <p className="text-xs uppercase tracking-[0.14em] text-hearth-muted">Height</p>
            <p className="mt-1 text-lg font-semibold text-hearth-ink">{asset.seriesDimensions.heightIn}&Prime;</p>
          </div>
          <div className="border border-hearth-line bg-white p-3 text-center">
            <p className="text-xs uppercase tracking-[0.14em] text-hearth-muted">Depth</p>
            <p className="mt-1 text-lg font-semibold text-hearth-ink">{asset.seriesDimensions.depthIn}&Prime;</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-red-700">No dimensions in source. Check install manual or vendor portal before use.</p>
      )}

      <div className="grid gap-2 text-sm text-hearth-muted md:grid-cols-2">
        {asset.fuelType && <MetaLine label="Fuel" value={asset.fuelType} />}
        {asset.ignitionType && <MetaLine label="Ignition" value={asset.ignitionType} />}
        {asset.msrpRange && (
          <MetaLine
            label="MSRP range"
            value={asset.msrpRange.min === asset.msrpRange.max
              ? `$${asset.msrpRange.min.toLocaleString()}`
              : `$${asset.msrpRange.min.toLocaleString()} – $${asset.msrpRange.max.toLocaleString()}`}
          />
        )}
        {asset.category && <MetaLine label="Category" value={asset.category.replace(/_/g, ' ')} />}
        {asset.sourceSkuFile && <MetaLine label="Source file" value={asset.sourceSkuFile} />}
        {asset.sourceSkuPage && <MetaLine label="Source page" value={String(asset.sourceSkuPage)} />}
      </div>

      {asset.skuVariants.length > 1 && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-hearth-line text-left">
                <th className="pb-2 pr-4 font-semibold text-hearth-ink">Model</th>
                <th className="pb-2 pr-4 font-semibold text-hearth-ink">Name</th>
                <th className="pb-2 pr-4 font-semibold text-hearth-ink">Ignition</th>
                <th className="pb-2 pr-4 font-semibold text-hearth-ink">MSRP</th>
                <th className="pb-2 font-semibold text-hearth-ink">W × H × D</th>
              </tr>
            </thead>
            <tbody>
              {asset.skuVariants.map((v) => (
                <tr key={v.modelCode} className="border-b border-hearth-line/50">
                  <td className="py-2 pr-4 font-mono text-hearth-ink">{v.modelCode}</td>
                  <td className="py-2 pr-4 text-hearth-muted">{v.name}</td>
                  <td className="py-2 pr-4 text-hearth-muted">{v.ignition}</td>
                  <td className="py-2 pr-4 text-hearth-muted">{v.msrp ? `$${v.msrp.toLocaleString()}` : '—'}</td>
                  <td className="py-2 text-hearth-muted">
                    {v.widthIn ? `${v.widthIn} × ${v.heightIn} × ${v.depthIn}` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function Badge({ tone, children }) {
  const styles = tone === 'green'
    ? 'border-emerald-700 bg-emerald-50 text-emerald-800'
    : 'border-amber-700 bg-amber-50 text-amber-800'

  return (
    <span className={`border px-2 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${styles}`}>
      {children}
    </span>
  )
}

function MetaLine({ label, value }) {
  return (
    <p>
      <span className="font-semibold text-hearth-ink">{label}: </span>
      {value}
    </p>
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

function formatReviewStatus(status) {
  if (status === 'all') return 'All'
  return status
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}
