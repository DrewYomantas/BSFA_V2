import { MATERIAL_RATES, STONE_SHOP_RATE_SOURCE } from '../../data/stoneShop/stoneShopRates.js'

export default function StoneMaterialPanel({ packet, updateSection }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-display text-2xl text-hearth-ink">Material</h2>
        <p className="text-sm text-hearth-muted">Rep-only pricing uses the seeded hearth sheet. Keep final order truth in the official quote/order system.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-hearth-muted">Material and thickness</span>
          <select
            value={`${packet.material.name}|${packet.material.thickness}`}
            onChange={(e) => {
              const [name, thickness] = e.target.value.split('|')
              updateSection('material', { name, thickness })
            }}
            className="mt-1 w-full rounded-md border border-hearth-line bg-white px-3 py-2"
          >
            {MATERIAL_RATES.map((rate) => (
              <option key={rate.id} value={`${rate.name}|${rate.thickness}`}>
                {rate.name} {rate.thickness}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm text-hearth-muted">Selection source</span>
          <select
            value={packet.material.source}
            onChange={(e) => updateSection('material', { source: e.target.value })}
            className="mt-1 w-full rounded-md border border-hearth-line bg-white px-3 py-2"
          >
            <option value="customer_selected">Customer selected</option>
            <option value="rep_selected">Rep selected</option>
            <option value="field_verified">Field verified</option>
            <option value="unknown">Unknown</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm text-hearth-muted">Finish</span>
          <input
            value={packet.material.finish}
            onChange={(e) => updateSection('material', { finish: e.target.value })}
            className="mt-1 w-full rounded-md border border-hearth-line bg-white px-3 py-2"
          />
        </label>
        <label className="block">
          <span className="text-sm text-hearth-muted">Edge</span>
          <input
            value={packet.material.edge}
            onChange={(e) => updateSection('material', { edge: e.target.value })}
            className="mt-1 w-full rounded-md border border-hearth-line bg-white px-3 py-2"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm text-hearth-muted">Application</span>
          <input
            value={packet.material.application || ''}
            onChange={(e) => updateSection('material', { application: e.target.value })}
            placeholder="Hearth, surround, mantel, cap, shelf, or approval-only"
            className="mt-1 w-full rounded-md border border-hearth-line bg-white px-3 py-2"
          />
        </label>
      </div>
      <p className="text-xs uppercase tracking-widest text-hearth-muted">
        Source: {STONE_SHOP_RATE_SOURCE.label} / Last reviewed {STONE_SHOP_RATE_SOURCE.lastReviewed}
      </p>
    </section>
  )
}
