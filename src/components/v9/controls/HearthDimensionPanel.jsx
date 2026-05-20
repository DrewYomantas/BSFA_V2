import { HEARTH_STUDIO_V9_DIMENSION_RANGES, formatInches } from '../../../data/v9/hearthStudioSeed.js'

const DIMENSION_FIELDS = [
  'hearthWidth',
  'hearthDepth',
  'hearthHeight',
  'openingWidth',
  'openingHeight',
  'mantelHeight',
  'stoneHeight',
]

export default function HearthDimensionPanel({ dimensions, onChange }) {
  return (
    <section className="v9-panel v9-dimensions" aria-label="V9 hearth dimension controls">
      <p className="v9-kicker">Dimensions</p>
      <div className="v9-dimensions__list">
        {DIMENSION_FIELDS.map((field) => {
          const range = HEARTH_STUDIO_V9_DIMENSION_RANGES[field]
          const value = dimensions[field]
          return (
            <label key={field} className="v9-dimension-control" htmlFor={`v9-${field}`}>
              <span>
                <strong>{range.label}</strong>
                <output>{formatInches(value)}</output>
              </span>
              <input
                id={`v9-${field}`}
                aria-label={range.label}
                type="range"
                min={range.min}
                max={range.max}
                step={range.step}
                value={value}
                onChange={(event) => onChange(field, event.target.value)}
              />
            </label>
          )
        })}
      </div>
    </section>
  )
}
