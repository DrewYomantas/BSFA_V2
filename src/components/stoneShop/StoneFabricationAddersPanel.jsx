import { FABRICATION_ADDERS, getPacketType } from '../../data/stoneShop/stoneShopRates.js'

export default function StoneFabricationAddersPanel({ packet, updateSection, activeTarget }) {
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
          <label className={activeTarget === 'front-edge' ? 'block rounded-md bg-hearth-bg p-3' : 'block'}>
            <span className="text-sm text-hearth-muted">Front edge treatment</span>
            <select
              value={packet.edgeTreatments?.front || ''}
              onChange={(e) => updateSection('edgeTreatments', { front: e.target.value })}
              className="mt-1 w-full rounded-md border border-hearth-line bg-white px-3 py-2"
            >
              <option value="">Select front edge</option>
              <option value="Polished">Polished</option>
              <option value="Radius">Radius</option>
              <option value="Eased">Eased</option>
              <option value="Sawn">Sawn</option>
            </select>
          </label>
          {visibleAdders.map((field) => (
            <label key={field} className="block">
              <span className="text-sm text-hearth-muted">
                {FABRICATION_ADDERS[field].label} ({FABRICATION_ADDERS[field].unit})
              </span>
              {field === 'radiusFrontEdge' ? (
                <span className="mt-2 flex items-center gap-2 rounded-md border border-hearth-line bg-white px-3 py-2">
                  <input
                    type="checkbox"
                    checked={!!packet.fabrication[field]}
                    onChange={(e) => updateSection('fabrication', { [field]: e.target.checked })}
                    className="h-4 w-4 accent-hearth-ember"
                  />
                  <span className="text-sm text-hearth-ink">Apply flat radius-front adder</span>
                </span>
              ) : (
                <input
                  type="number"
                  min="0"
                  value={packet.fabrication[field] ?? 0}
                  onChange={(e) => updateSection('fabrication', { [field]: Number(e.target.value) || 0 })}
                  className="mt-1 w-full rounded-md border border-hearth-line bg-white px-3 py-2"
                />
              )}
            </label>
          ))}
          {type.calculatorEnabled !== false && (
            <label className="block">
              <span className="text-sm text-hearth-muted">Polish linear feet (note only)</span>
              <input
                type="number"
                min="0"
                value={packet.fabrication.polishLinearFeet ?? ''}
                onChange={(e) => updateSection('fabrication', { polishLinearFeet: e.target.value === '' ? null : Number(e.target.value) })}
                className="mt-1 w-full rounded-md border border-hearth-line bg-white px-3 py-2"
              />
            </label>
          )}
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
