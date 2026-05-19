import { useMemo } from 'react'
import { getNextHearthVisualTarget, buildStoneShopShapeModel, packetTypeForHearthShape } from '../../../lib/stoneShop/stoneShopShapeModel.js'
import HearthShapeControls from './HearthShapeControls.jsx'
import HearthSvgModel from './HearthSvgModel.jsx'
import './hearthVisual.css'

export default function HearthVisualBuilder({ packet, activeTarget, onTarget, onShapeChange }) {
  const model = useMemo(() => buildStoneShopShapeModel(packet), [packet])
  const next = getNextHearthVisualTarget(packet)

  return (
    <section className="hearth-visual-builder" aria-label="Interactive hearth visual builder">
      <div className="hearth-visual-builder__header">
        <div>
          <p>Visual fabrication builder</p>
          <h2>Hearth top-view model</h2>
        </div>
        <HearthShapeControls
          value={model.hearthShape}
          onChange={(shape) => onShapeChange(packetTypeForHearthShape(shape))}
        />
      </div>
      <div className="hearth-visual-builder__body">
        <HearthSvgModel model={model} activeTarget={activeTarget || next.target} onTarget={onTarget} />
        <div className="hearth-visual-builder__cue">
          <p>Next</p>
          <strong>{next.copy}</strong>
          <span>Click a dimension, corner, front edge, or the slab surface to edit that part of the packet.</span>
        </div>
      </div>
    </section>
  )
}
