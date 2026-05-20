import { useMemo, useState } from 'react'
import HearthDimensionPanel from '../../components/v9/controls/HearthDimensionPanel.jsx'
import HearthLightingSelector from '../../components/v9/controls/HearthLightingSelector.jsx'
import HearthMaterialTray from '../../components/v9/controls/HearthMaterialTray.jsx'
import HearthRoomScene from '../../components/v9/three/HearthRoomScene.jsx'
import {
  HEARTH_STUDIO_V9_CAMERAS,
  HEARTH_STUDIO_V9_DEFAULT_STATE,
  buildHearthStudioV9CustomerSummary,
  getV9Lighting,
  getV9Material,
  updateHearthStudioV9Dimension,
} from '../../data/v9/hearthStudioSeed.js'
import './HearthStudioV9Screen.css'

export default function HearthStudioV9Screen({ renderCanvas = true }) {
  const [state, setState] = useState(HEARTH_STUDIO_V9_DEFAULT_STATE)
  const summary = useMemo(() => buildHearthStudioV9CustomerSummary(state), [state])
  const material = getV9Material(state.materialId)
  const lighting = getV9Lighting(state.lightingId)

  function setDimension(field, value) {
    setState((current) => updateHearthStudioV9Dimension(current, field, value))
  }

  function setMaterial(materialId) {
    setState((current) => ({ ...current, materialId }))
  }

  function setLighting(lightingId) {
    setState((current) => ({ ...current, lightingId }))
  }

  function setCamera(cameraId) {
    setState((current) => ({ ...current, cameraId }))
  }

  function toggleRepOverlay() {
    setState((current) => ({ ...current, repOverlayOpen: !current.repOverlayOpen }))
  }

  return (
    <main className="v9-studio" aria-label="V9 Hearth Studio 3D proof">
      <section className="v9-studio__stage" aria-label="3D fireplace room stage">
        <HearthRoomScene state={state} renderCanvas={renderCanvas} />

        <div className="v9-studio__brand">
          <p>Benson Stone</p>
          <h1>Hearth Studio V9</h1>
          <span>{material.label} · {lighting.label}</span>
        </div>

        <div className="v9-studio__camera" aria-label="V9 camera controls">
          {HEARTH_STUDIO_V9_CAMERAS.map((camera) => (
            <button key={camera.id} type="button" aria-pressed={state.cameraId === camera.id} onClick={() => setCamera(camera.id)}>
              {camera.label}
            </button>
          ))}
        </div>

        {state.repOverlayOpen && (
          <aside className="v9-rep-overlay" aria-label="V9 rep fit overlay">
            <p className="v9-kicker">Rep Fit Overlay</p>
            <strong>Dimension grid / labels</strong>
            <span>Fit notes: opening, hearth projection, mantel height, and stone mass are planning studies.</span>
            <span>Verify field measurements before quote/fabrication.</span>
          </aside>
        )}
      </section>

      <aside className="v9-studio__drawer" aria-label="V9 hearth planning drawer">
        <div className="v9-studio__drawer-header">
          <p className="v9-kicker">Customer Planning Study</p>
          <h2>Shape the fireplace wall in dimensional space.</h2>
        </div>

        <section className="v9-summary" aria-label="V9 customer-safe summary">
          <p>This is a visual planning study, not a final construction drawing.</p>
          <ul>
            {summary.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <HearthDimensionPanel dimensions={state.dimensions} onChange={setDimension} />
        <HearthLightingSelector selectedId={state.lightingId} onSelect={setLighting} />

        <button className="v9-overlay-toggle" type="button" aria-pressed={state.repOverlayOpen} onClick={toggleRepOverlay}>
          {state.repOverlayOpen ? 'Hide rep overlay' : 'Show rep overlay'}
        </button>
      </aside>

      <HearthMaterialTray selectedId={state.materialId} onSelect={setMaterial} />
    </main>
  )
}
