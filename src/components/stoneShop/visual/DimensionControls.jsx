import { useEffect, useRef } from 'react'
import { SNAP_PRESETS } from '../../../lib/stoneShop/dimensionSnap.js'
import { UNIT_OPTIONS, formatDimensionForUnit, parseDimensionInputToInches } from '../../../lib/stoneShop/unitConversion.js'

const WIDTH_PRESETS = [48, 60, 72, 84, 96]
const DEPTH_PRESETS = [12, 16, 18, 20, 24]
const THICKNESS_PRESETS = [
  ['2-1/4"', '2-1/4 inch'],
  ['3"', '3 inch'],
  ['4"', '4 inch'],
]

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
  onThicknessPreset,
}) {
  const activeField = activeTarget === 'width' ? 'widthInches' : activeTarget === 'depth' ? 'depthInches' : null
  const activeValue = activeField ? packet.dimensions[activeField] : null
  const exactInputRef = useRef(null)

  useEffect(() => {
    if (activeField) exactInputRef.current?.focus()
  }, [activeField])

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
              ref={exactInputRef}
              name="exactDimension"
              aria-label={`Exact ${activeTarget}`}
              placeholder={formatDimensionForUnit(activeValue, unit, activeTarget)}
            />
          </label>
          <button type="submit">Set</button>
        </form>
      )}
      <div className="dimension-presets" aria-label="Standard hearth presets">
        <PresetGroup label="Width" presets={WIDTH_PRESETS} onPick={(value) => onExactDimension('widthInches', value)} />
        <PresetGroup label="Depth" presets={DEPTH_PRESETS} onPick={(value) => onExactDimension('depthInches', value)} />
        <div className="dimension-presets__group">
          <span>Thickness</span>
          <div>
            {THICKNESS_PRESETS.map(([label, value]) => (
              <button
                key={value}
                type="button"
                aria-label={`Set thickness ${label.replace('"', ' inches')}`}
                aria-pressed={packet.material.thickness === value}
                onClick={() => onThicknessPreset(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PresetGroup({ label, presets, onPick }) {
  return (
    <div className="dimension-presets__group">
      <span>{label}</span>
      <div>
        {presets.map((value) => (
          <button
            key={value}
            type="button"
            aria-label={`Set ${label.toLowerCase()} ${value} inches`}
            onClick={() => onPick(value)}
          >
            {value}"
          </button>
        ))}
      </div>
    </div>
  )
}
