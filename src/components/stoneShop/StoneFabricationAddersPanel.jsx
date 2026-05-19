import { FABRICATION_ADDERS, getPacketType } from '../../data/stoneShop/stoneShopRates.js'

export default function StoneFabricationAddersPanel({ packet, updateSection }) {
  const type = getPacketType(packet.packetType)
  const visibleAdders = type.adders

  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-display text-2xl text-hearth-ink">Fabrication</h2>
        <p className="text-sm text-hearth-muted">Only the adders that matter for this packet type are shown.</p>
      </div>
      {visibleAdders.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {visibleAdders.map((field) => (
            <label key={field} className="block">
              <span className="text-sm text-hearth-muted">
                {FABRICATION_ADDERS[field].label} ({FABRICATION_ADDERS[field].unit})
              </span>
              <input
                type="number"
                min="0"
                value={packet.fabrication[field] ?? 0}
                onChange={(e) => updateSection('fabrication', { [field]: Number(e.target.value) || 0 })}
                className="mt-1 w-full rounded-md border border-hearth-line bg-white px-3 py-2"
              />
            </label>
          ))}
        </div>
      ) : (
        <p className="rounded-md border border-hearth-line bg-white px-4 py-3 text-sm text-hearth-muted">
          No fabrication adders are needed for this approval-only flow.
        </p>
      )}
      <label className="block">
        <span className="text-sm text-hearth-muted">Custom shop notes</span>
        <textarea
          value={packet.fabrication.customNotes}
          onChange={(e) => updateSection('fabrication', { customNotes: e.target.value })}
          rows="3"
          className="mt-1 w-full rounded-md border border-hearth-line bg-white px-3 py-2"
        />
      </label>
    </section>
  )
}
