import { HEARTH_STUDIO_V9_MATERIALS } from '../../../data/v9/hearthStudioSeed.js'

export default function HearthMaterialTray({ selectedId, onSelect }) {
  return (
    <section className="v9-material-tray" aria-label="V9 placeholder material presets">
      <div>
        <p className="v9-kicker">Material Study</p>
        <h2>Placeholder finishes</h2>
      </div>
      <div className="v9-material-tray__options">
        {HEARTH_STUDIO_V9_MATERIALS.map((material) => (
          <button
            key={material.id}
            type="button"
            aria-pressed={selectedId === material.id}
            onClick={() => onSelect(material.id)}
          >
            <span className="v9-material-swatch" style={{ '--stone': material.stoneColor, '--hearth': material.hearthColor }} />
            <strong>{material.label}</strong>
            <small>{material.note}</small>
          </button>
        ))}
      </div>
    </section>
  )
}
