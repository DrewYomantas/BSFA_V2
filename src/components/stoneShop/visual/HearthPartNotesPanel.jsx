const PART_CONFIG = {
  'front-edge': {
    title: 'Front edge notes',
    part: 'frontEdge',
    fields: [
      ['edgeProfileNote', 'Front edge profile note'],
      ['polishNote', 'Front polish note'],
      ['radiusFrontNote', 'Radius front note'],
    ],
  },
  corner: {
    title: 'Corner notes',
    part: 'corner',
    fields: [
      ['clippedCornerNote', 'Clipped corner note'],
      ['angleCutNote', 'Angle cut note'],
    ],
  },
  surface: {
    title: 'Surface feature notes',
    part: 'surface',
    fields: [
      ['cutoutNote', 'Cutout note'],
      ['holeNote', 'Hole note'],
      ['notchNote', 'Notch note'],
      ['customNote', 'Surface custom note'],
    ],
  },
}

export default function HearthPartNotesPanel({ activeTarget, partNotes = {}, onChange }) {
  const config = PART_CONFIG[activeTarget] || PART_CONFIG.surface
  const values = partNotes[config.part] || {}

  return (
    <section className="hearth-part-notes" aria-label="Model part shop notes">
      <div>
        <p>Part notes</p>
        <h3>{config.title}</h3>
      </div>
      <div className="hearth-part-notes__grid">
        {config.fields.map(([field, label]) => (
          <label key={field}>
            <span>{label}</span>
            <textarea
              aria-label={label}
              value={values[field] || ''}
              onChange={(e) => onChange(config.part, field, e.target.value)}
              rows="2"
            />
          </label>
        ))}
      </div>
    </section>
  )
}
