import { useMemo, useState } from 'react'
import HearthScene3D from './HearthScene3D.jsx'
import { SNAP_PRESETS, snapToIncrement } from '../../lib/stoneShop/dimensionSnap.js'
import {
  DEFAULT_CUSTOMER_HEARTH_MODEL,
  CUSTOMER_HEARTH_SHAPE_OPTIONS,
  HEARTH_SHAPES,
  updateHearthDimension,
  updateHearthShape,
} from '../../lib/sharedHearthModel.js'

const CAMERA_OPTIONS = [
  ['perspective', 'Perspective'],
  ['front', 'Front'],
  ['top', 'Top'],
  ['seated', 'Seated'],
]

export default function CustomerHearthBuild3D({ renderCanvas = true }) {
  const [model, setModel] = useState(DEFAULT_CUSTOMER_HEARTH_MODEL)
  const [snapIncrement, setSnapIncrement] = useState(1)
  const [cameraPreset, setCameraPreset] = useState('perspective')
  const summary = useMemo(() => `${model.dimensions.widthInches}" x ${model.dimensions.depthInches}" x ${model.dimensions.thicknessInches}"`, [model])

  function setDimension(field, value) {
    const snapped = snapToIncrement(Number(value), snapIncrement)
    if (snapped !== null) setModel((current) => updateHearthDimension(current, field, snapped))
  }

  function nudge(field, amount) {
    const current = Number(model.dimensions[field]) || 0
    setDimension(field, current + amount)
  }

  return (
    <section className="build3d" aria-label="3D hearth build proof slice">
      <div className="build3d__stage">
        <HearthScene3D model={model} cameraPreset={cameraPreset} renderCanvas={renderCanvas} />
        <div className="build3d__intro">
          <p>Build Your Fireplace / Room</p>
          <h1>See how the hearth feels in the room.</h1>
          <span>{summary}</span>
        </div>
        <div className="build3d__camera" aria-label="Camera presets">
          {CAMERA_OPTIONS.map(([value, label]) => (
            <button key={value} type="button" aria-pressed={cameraPreset === value} onClick={() => setCameraPreset(value)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="build3d__controls" aria-label="Hearth 3D controls">
        <div>
          <p className="build3d__eyebrow">Hearth size</p>
          <p className="build3d__safe-note">A visual planning aid for scale and proportion. Your Benson Stone guide will confirm final measurements with you.</p>
        </div>

        <label>
          <span>Snap</span>
          <select aria-label="3D snap increment" value={snapIncrement} onChange={(event) => setSnapIncrement(Number(event.target.value))}>
            {SNAP_PRESETS.map((snap) => (
              <option key={snap.value} value={snap.value}>{snap.label}</option>
            ))}
          </select>
        </label>

        <DimensionSlider label="Width" field="widthInches" min={48} max={120} model={model} snapIncrement={snapIncrement} onChange={setDimension} onNudge={nudge} />
        <DimensionSlider label="Depth" field="depthInches" min={10} max={36} model={model} snapIncrement={snapIncrement} onChange={setDimension} onNudge={nudge} />
        <DimensionSlider label="Thickness" field="thicknessInches" min={1.5} max={6} model={model} snapIncrement={snapIncrement} onChange={setDimension} onNudge={nudge} />

        <div className="build3d__shape-controls" aria-label="3D hearth front shape">
          {CUSTOMER_HEARTH_SHAPE_OPTIONS.map(({ shape, label }) => (
            <button
              key={shape}
              type="button"
              aria-pressed={model.hearthShape === shape}
              onClick={() => setModel((current) => updateHearthShape(current, shape))}
            >
              {label}
            </button>
          ))}
        </div>

        {model.hearthShape !== HEARTH_SHAPES.BASIC && (
          <p className="build3d__shape-note">Shaped fronts are shown to help you compare the look. Final shape details are confirmed together.</p>
        )}
      </div>
    </section>
  )
}

function DimensionSlider({ label, field, min, max, model, snapIncrement, onChange, onNudge }) {
  const value = Number(model.dimensions[field]) || 0
  return (
    <div className="build3d-slider">
      <div>
        <label htmlFor={`build3d-${field}`}>{label}</label>
        <output>{value}"</output>
      </div>
      <div className="build3d-slider__row">
        <button type="button" aria-label={`Decrease ${label.toLowerCase()}`} onClick={() => onNudge(field, -snapIncrement)}>-</button>
        <input
          id={`build3d-${field}`}
          aria-label={`3D hearth ${label.toLowerCase()}`}
          type="range"
          min={min}
          max={max}
          step={snapIncrement}
          value={value}
          onChange={(event) => onChange(field, event.target.value)}
        />
        <button type="button" aria-label={`Increase ${label.toLowerCase()}`} onClick={() => onNudge(field, snapIncrement)}>+</button>
      </div>
    </div>
  )
}
