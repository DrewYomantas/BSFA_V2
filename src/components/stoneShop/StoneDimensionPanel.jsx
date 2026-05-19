import { getPacketType } from '../../data/stoneShop/stoneShopRates.js'
import { DIMENSION_FIELD_TYPES, DIMENSION_LABELS } from '../../lib/stoneShop/stoneShopTemplates.js'

export default function StoneDimensionPanel({ packet, updateSection }) {
  const type = getPacketType(packet.packetType)

  if (type.dimensions.length === 0) {
    return (
      <section className="space-y-3">
        <h2 className="font-display text-2xl text-hearth-ink">Dimensions</h2>
        <p className="text-sm text-hearth-muted">This approval packet records material selection first. Add field dimensions later if this becomes a shop order.</p>
      </section>
    )
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="font-display text-2xl text-hearth-ink">Dimensions</h2>
        <p className="text-sm text-hearth-muted">Enter the measurements the shop needs for this packet type.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {type.dimensions.map((field) => (
          <DimensionInput key={field} field={field} packet={packet} updateSection={updateSection} />
        ))}
      </div>
      <label className="block">
        <span className="text-sm text-hearth-muted">Shop dimension notes</span>
        <textarea
          value={packet.dimensions.notes}
          onChange={(e) => updateSection('dimensions', { notes: e.target.value })}
          rows="3"
          className="mt-1 w-full rounded-md border border-hearth-line bg-white px-3 py-2"
        />
      </label>
    </section>
  )
}

function DimensionInput({ field, packet, updateSection }) {
  const fieldType = DIMENSION_FIELD_TYPES[field] || 'number'
  const label = DIMENSION_LABELS[field] || field
  const value = packet.dimensions[field] ?? ''

  if (fieldType === 'textarea') {
    return (
      <label className="block sm:col-span-2">
        <span className="text-sm text-hearth-muted">{label}</span>
        <textarea
          value={value}
          onChange={(e) => updateSection('dimensions', { [field]: e.target.value })}
          rows="3"
          className="mt-1 w-full rounded-md border border-hearth-line bg-white px-3 py-2"
        />
      </label>
    )
  }

  if (fieldType === 'text') {
    return (
      <label className="block">
        <span className="text-sm text-hearth-muted">{label}</span>
        <input
          value={value}
          onChange={(e) => updateSection('dimensions', { [field]: e.target.value })}
          className="mt-1 w-full rounded-md border border-hearth-line bg-white px-3 py-2"
        />
      </label>
    )
  }

  return (
    <label className="block">
      <span className="text-sm text-hearth-muted">{label}{field.endsWith('Inches') ? ' inches' : ''}</span>
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => updateSection('dimensions', { [field]: e.target.value === '' ? null : Number(e.target.value) })}
        className="mt-1 w-full rounded-md border border-hearth-line bg-white px-3 py-2"
      />
    </label>
  )
}
