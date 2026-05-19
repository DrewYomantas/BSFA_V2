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
import {
  projectTypes,
  fireExperiences,
  stones,
  mantels,
  hearths,
  lightingMoods,
  findOption,
} from '../../lib/buildOptions.js'

const CAMERA_OPTIONS = [
  ['perspective', 'Perspective'],
  ['front', 'Front'],
  ['top', 'Top'],
  ['seated', 'Seated'],
]

const ROOM_CONTEXT_OPTIONS = [
  { id: 'great_room', label: 'Great room', note: 'Open room with longer sight lines.' },
  { id: 'living_room', label: 'Living room', note: 'Everyday seating and TV-scale planning.' },
  { id: 'basement', label: 'Basement', note: 'Lower ceiling and closer viewing distance.' },
  { id: 'lodge_cabin', label: 'Lodge / cabin', note: 'Warmer, heavier fireplace presence.' },
  { id: 'new_construction', label: 'New construction', note: 'Early wall and finish direction.' },
]

const FOCUS_AREAS = [
  ['room', 'Room context'],
  ['size', 'Hearth size'],
  ['shape', 'Hearth shape'],
  ['fireplace', 'Mantel / fireplace'],
  ['materials', 'Materials / direction'],
]

const DESIGN_FIELDS = [
  ['projectType', 'Project', projectTypes],
  ['fireExperience', 'Fireplace', fireExperiences],
  ['stoneId', 'Stone', stones],
  ['mantelId', 'Mantel', mantels],
  ['hearthId', 'Hearth', hearths],
  ['lightingMoodId', 'Light', lightingMoods],
]

export default function CustomerHearthBuild3D({
  renderCanvas = true,
  build = {},
  focusStep = null,
  onOpenMaterialTray = () => {},
}) {
  const [model, setModel] = useState(DEFAULT_CUSTOMER_HEARTH_MODEL)
  const [roomContext, setRoomContext] = useState('great_room')
  const [activeArea, setActiveArea] = useState(focusStep ? focusForStep(focusStep) : 'room')
  const [snapIncrement, setSnapIncrement] = useState(1)
  const [cameraPreset, setCameraPreset] = useState('perspective')
  const summary = useMemo(() => `${model.dimensions.widthInches}" x ${model.dimensions.depthInches}" x ${model.dimensions.thicknessInches}"`, [model])
  const selectedRoom = ROOM_CONTEXT_OPTIONS.find((room) => room.id === roomContext) ?? ROOM_CONTEXT_OPTIONS[0]

  function setDimension(field, value) {
    const snapped = snapToIncrement(Number(value), snapIncrement)
    if (snapped !== null) setModel((current) => updateHearthDimension(current, field, snapped))
  }

  function nudge(field, amount) {
    const current = Number(model.dimensions[field]) || 0
    setDimension(field, current + amount)
  }

  function openDesignField(key) {
    setActiveArea(key === 'fireExperience' || key === 'projectType' ? 'fireplace' : 'materials')
    onOpenMaterialTray(key)
  }

  return (
    <section className="build3d" aria-label="Integrated fireplace room builder">
      <div className="build3d__stage">
        <HearthScene3D model={model} cameraPreset={cameraPreset} renderCanvas={renderCanvas} />
        <div className="build3d__intro">
          <p>Build Your Fireplace / Room</p>
          <h1>Shape the fireplace in the room.</h1>
          <span>{selectedRoom.label} · {summary}</span>
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
          <p className="build3d__eyebrow">Design stage</p>
          <p className="build3d__safe-note">A visual planning aid for scale, proportion, and early material direction. Benson will verify measurements and selections before anything is ordered.</p>
        </div>

        <div className="build3d__focus-rail" aria-label="Builder focus areas">
          {FOCUS_AREAS.map(([value, label]) => (
            <button key={value} type="button" aria-pressed={activeArea === value} onClick={() => setActiveArea(value)}>
              {label}
            </button>
          ))}
        </div>

        <div className="build3d__room-panel" aria-label="Room context choices">
          <div>
            <p className="build3d__section-title">Room context</p>
            <p className="build3d__safe-note">Choose the closest scene for scale and proportion. A guide can use room photos later to understand the real space.</p>
          </div>
          <div className="build3d__choice-grid">
            {ROOM_CONTEXT_OPTIONS.map((room) => (
              <button
                key={room.id}
                type="button"
                aria-pressed={roomContext === room.id}
                onClick={() => { setRoomContext(room.id); setActiveArea('room') }}
              >
                <strong>{room.label}</strong>
                <span>{room.note}</span>
              </button>
            ))}
          </div>
        </div>

        <label>
          <span>Snap</span>
          <select aria-label="3D snap increment" value={snapIncrement} onChange={(event) => setSnapIncrement(Number(event.target.value))}>
            {SNAP_PRESETS.map((snap) => (
              <option key={snap.value} value={snap.value}>{snap.label}</option>
            ))}
          </select>
        </label>

        <p className="build3d__section-title">Hearth size</p>
        <DimensionSlider label="Width" field="widthInches" min={48} max={120} model={model} snapIncrement={snapIncrement} onChange={setDimension} onNudge={nudge} />
        <DimensionSlider label="Depth" field="depthInches" min={10} max={36} model={model} snapIncrement={snapIncrement} onChange={setDimension} onNudge={nudge} />
        <DimensionSlider label="Thickness" field="thicknessInches" min={1.5} max={6} model={model} snapIncrement={snapIncrement} onChange={setDimension} onNudge={nudge} />

        <p className="build3d__section-title">Hearth shape</p>
        <div className="build3d__shape-controls" aria-label="3D hearth front shape">
          {CUSTOMER_HEARTH_SHAPE_OPTIONS.map(({ shape, label }) => (
            <button
              key={shape}
              type="button"
              aria-pressed={model.hearthShape === shape}
              onClick={() => { setModel((current) => updateHearthShape(current, shape)); setActiveArea('shape') }}
            >
              {label}
            </button>
          ))}
        </div>

        {model.hearthShape !== HEARTH_SHAPES.BASIC && (
          <p className="build3d__shape-note">Shaped fronts are shown to compare the look. Benson will verify the exact shape details with you.</p>
        )}

        <div className="build3d__direction-panel" aria-label="Design direction choices">
          <div>
            <p className="build3d__section-title">Mantel, fireplace, and materials</p>
            <p className="build3d__safe-note">Keep the hearth, fireplace, mantel, and finish direction connected while you compare proportions.</p>
          </div>
          <div className="build3d__direction-grid">
            {DESIGN_FIELDS.map(([key, label, options]) => {
              const selected = findOption(options, build[key])
              return (
                <button
                  key={key}
                  type="button"
                  aria-label={`${label}: ${selected?.label ?? 'Choose'}`}
                  onClick={() => openDesignField(key)}
                >
                  <span>{label}</span>
                  <strong>{selected?.label ?? 'Choose'}</strong>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

function focusForStep(step) {
  if (step === 'projectType' || step === 'fireExperience') return 'fireplace'
  if (step === 'stoneId' || step === 'mantelId' || step === 'hearthId' || step === 'lightingMoodId') return 'materials'
  return 'room'
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
