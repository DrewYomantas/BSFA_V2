import { useMemo } from 'react'
import { getNextHearthVisualTarget, buildStoneShopShapeModel, packetTypeForHearthShape } from '../../../lib/stoneShop/stoneShopShapeModel.js'
import { snapToIncrement } from '../../../lib/stoneShop/dimensionSnap.js'
import DimensionControls from './DimensionControls.jsx'
import HearthShapeControls from './HearthShapeControls.jsx'
import HearthSvgModel from './HearthSvgModel.jsx'
import './hearthVisual.css'

export default function HearthVisualBuilder({
  packet,
  activeTarget,
  onTarget,
  onShapeChange,
  snapEnabled = true,
  onSnapEnabledChange = () => {},
  snapIncrement = 1,
  onSnapChange = () => {},
  unit = 'inches',
  onUnitChange = () => {},
  onDimensionUpdate = () => {},
}) {
  const model = useMemo(() => buildStoneShopShapeModel(packet), [packet])
  const next = getNextHearthVisualTarget(packet)

  function changeDimension(target, value, options = {}) {
    const field = target === 'width' ? 'widthInches' : target === 'depth' ? 'depthInches' : null
    if (!field || value === null) return
    onDimensionUpdate(field, options.commit && snapEnabled ? snapToIncrement(value, snapIncrement) : value)
  }

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
      <DimensionControls
        snapEnabled={snapEnabled}
        onSnapEnabledChange={onSnapEnabledChange}
        snapIncrement={snapIncrement}
        onSnapChange={onSnapChange}
        unit={unit}
        onUnitChange={onUnitChange}
        activeTarget={activeTarget || next.target}
        packet={packet}
        onExactDimension={(field, value) => onDimensionUpdate(field, snapEnabled ? snapToIncrement(value, snapIncrement) : value)}
      />
      <div className="hearth-visual-builder__body">
        <HearthSvgModel
          model={model}
          activeTarget={activeTarget || next.target}
          onTarget={onTarget}
          unit={unit}
          snapEnabled={snapEnabled}
          snapIncrement={snapIncrement}
          onDimensionChange={changeDimension}
        />
        <div className="hearth-visual-builder__cue">
          <p>Next</p>
          <strong>{next.copy}</strong>
          <span>Click a dimension, corner, front edge, or the slab surface to edit that part of the packet.</span>
        </div>
      </div>
    </section>
  )
}
