import { HEARTH_STUDIO_V9_LIGHTING } from '../../../data/v9/hearthStudioSeed.js'

export default function HearthLightingSelector({ selectedId, onSelect }) {
  return (
    <section className="v9-lighting" aria-label="V9 lighting modes">
      <p className="v9-kicker">Lighting</p>
      <div className="v9-lighting__options">
        {HEARTH_STUDIO_V9_LIGHTING.map((lighting) => (
          <button
            key={lighting.id}
            type="button"
            aria-pressed={selectedId === lighting.id}
            onClick={() => onSelect(lighting.id)}
          >
            {lighting.label}
          </button>
        ))}
      </div>
    </section>
  )
}
