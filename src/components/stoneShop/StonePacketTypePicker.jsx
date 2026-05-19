import { PACKET_TYPES } from '../../data/stoneShop/stoneShopRates.js'

export default function StonePacketTypePicker({ value, onChange }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {PACKET_TYPES.map((type) => (
        <button
          key={type.id}
          type="button"
          aria-pressed={value === type.id}
          onClick={() => onChange(type.id)}
          className={
            'rounded-lg border px-4 py-4 text-left transition-colors ' +
            (value === type.id
              ? 'border-hearth-ember bg-white shadow-sm'
              : 'border-hearth-line bg-hearth-surface/80 hover:border-hearth-muted')
          }
        >
          <span className="block font-display text-xl text-hearth-ink">{type.label}</span>
          <span className="mt-1 block text-sm leading-5 text-hearth-muted">{type.description}</span>
        </button>
      ))}
    </div>
  )
}
