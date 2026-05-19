import { SNAP_PRESETS } from '../../../lib/stoneShop/dimensionSnap.js'
import { UNIT_OPTIONS, formatDimensionForUnit, parseDimensionInputToInches } from '../../../lib/stoneShop/unitConversion.js'

export default function DimensionControls({
  snapEnabled,
  onSnapEnabledChange,
  snapIncrement,
  onSnapChange,
  unit,
  onUnitChange,
  activeTarget,
  packet,
  onExactDimension,
}) {
  const activeField = activeTarget === 'width' ? 'widthInches' : activeTarget === 'depth' ? 'depthInches' : null
  const activeValue = activeField ? packet.dimensions[activeField] : null

  function submitExact(e) {
    e.preventDefault()
    if (!activeField) return
    const input = e.currentTarget.elements.exactDimension.value
    const inches = parseDimensionInputToInches(input, unit)
    if (inches !== null) onExactDimension(activeField, inches)
  }

  return (
    <div className="dimension-controls">
      <label>
        <span>Snap</span>
        <select aria-label="Snap increment" value={snapIncrement} onChange={(e) => onSnapChange(Number(e.target.value))}>
          {SNAP_PRESETS.map((preset) => (
            <option key={preset.label} value={preset.value}>{preset.label}</option>
          ))}
        </select>
      </label>
      <label className="dimension-controls__toggle">
        <span>Mode</span>
        <span className="dimension-controls__toggle-row">
          <input
            type="checkbox"
            checked={snapEnabled}
            onChange={(e) => onSnapEnabledChange(e.target.checked)}
            aria-label="Snap to points"
          />
          Snap to points
        </span>
      </label>
      <label>
        <span>Units</span>
        <select value={unit} onChange={(e) => onUnitChange(e.target.value)}>
          {UNIT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
      {activeField && (
        <form onSubmit={submitExact}>
          <label>
            <span>Exact {activeTarget}</span>
            <input
              name="exactDimension"
              aria-label={`Exact ${activeTarget}`}
              placeholder={formatDimensionForUnit(activeValue, unit, activeTarget)}
            />
          </label>
          <button type="submit">Set</button>
        </form>
      )}
    </div>
  )
}
