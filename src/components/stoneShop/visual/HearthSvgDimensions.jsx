import { formatDimensionForUnit } from '../../../lib/stoneShop/unitConversion.js'
import DimensionHandle from './DimensionHandle.jsx'

export default function HearthSvgDimensions({ geometry, model, activeTarget, onTarget, unit, snapEnabled, snapIncrement, onDimensionChange }) {
  const { x, y, width, depth, scale } = geometry.bounds
  const widthLabel = formatDimensionForUnit(model.dimensions.widthInches, unit, 'Width')
  const depthLabel = formatDimensionForUnit(model.dimensions.depthInches, unit, 'Depth')
  const radiusLabel = formatDimensionForUnit(model.dimensions.radiusDepthInches, unit, 'Radius depth')
  const clipLabel = formatDimensionForUnit(model.dimensions.leftClipInches || model.dimensions.rightClipInches, unit, 'Clip')

  return (
    <g className="hearth-svg-dimensions">
      <DimensionLine
        target="width"
        activeTarget={activeTarget}
        onTarget={onTarget}
        x1={x}
        y1={y - 28}
        x2={x + width}
        y2={y - 28}
        label={widthLabel}
        labelX={x + width / 2}
        labelY={y - 38}
        valueInches={model.dimensions.widthInches}
        fallbackInches={96}
        pixelsPerInch={scale}
        snapEnabled={snapEnabled}
        snapIncrement={snapIncrement}
        onDimensionChange={onDimensionChange}
      />
      <DimensionLine
        target="depth"
        activeTarget={activeTarget}
        onTarget={onTarget}
        x1={x + width + 30}
        y1={y}
        x2={x + width + 30}
        y2={y + depth}
        label={depthLabel}
        labelX={x + width + 54}
        labelY={y + depth / 2}
        valueInches={model.dimensions.depthInches}
        fallbackInches={18}
        pixelsPerInch={scale}
        snapEnabled={snapEnabled}
        snapIncrement={snapIncrement}
        onDimensionChange={onDimensionChange}
      />
      {model.hearthShape === 'radius_front' && (
        <DimensionLine
          target="front-edge"
          activeTarget={activeTarget}
          onTarget={onTarget}
          x1={x + width / 2}
          y1={y + depth - geometry.markers.radiusDepth}
          x2={x + width / 2}
          y2={y + depth}
          label={radiusLabel}
          labelX={x + width / 2 + 56}
          labelY={y + depth - geometry.markers.radiusDepth / 2}
          valueInches={model.dimensions.radiusDepthInches}
          fallbackInches={6}
          pixelsPerInch={scale}
          snapEnabled={snapEnabled}
          snapIncrement={snapIncrement}
          onDimensionChange={onDimensionChange}
        />
      )}
      {model.hearthShape === 'clipped_corners' && (
        <text className={activeTarget === 'corner' ? 'is-active' : ''} x={x + 18} y={y + depth + 32} onClick={() => onTarget('corner')}>
          {clipLabel}
        </text>
      )}
      {model.hearthShape === 'angle_cuts' && (
        <text className={activeTarget === 'corner' ? 'is-active' : ''} x={x + 18} y={y + depth + 32} onClick={() => onTarget('corner')}>
          Angle cuts
        </text>
      )}
    </g>
  )
}

function DimensionLine({
  target,
  activeTarget,
  onTarget,
  x1,
  y1,
  x2,
  y2,
  label,
  labelX,
  labelY,
  valueInches,
  fallbackInches,
  pixelsPerInch,
  snapEnabled,
  snapIncrement,
  onDimensionChange,
}) {
  const active = activeTarget === target
  const axis = target === 'width' ? 'x' : 'y'
  return (
    <g
      className={active ? 'hearth-dimension is-active' : 'hearth-dimension'}
      role="button"
      tabIndex="0"
      aria-label={`Edit ${target}`}
      onClick={() => onTarget(target)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onTarget(target)
      }}
    >
      <line x1={x1} y1={y1} x2={x2} y2={y2} />
      <circle cx={x1} cy={y1} r="3" />
      <circle cx={x2} cy={y2} r="3" />
      <text x={labelX} y={labelY}>{label}</text>
      {onDimensionChange && (
        <>
          <DimensionHandle
            target={target}
            x={x1}
            y={y1}
            axis={axis}
            valueInches={valueInches}
            fallbackInches={fallbackInches}
            pixelsPerInch={pixelsPerInch}
            snapEnabled={snapEnabled}
            snapIncrement={snapIncrement}
            onTarget={onTarget}
            onChange={onDimensionChange}
          />
          <DimensionHandle
            target={target}
            x={(x1 + x2) / 2}
            y={(y1 + y2) / 2}
            axis={axis}
            valueInches={valueInches}
            fallbackInches={fallbackInches}
            pixelsPerInch={pixelsPerInch}
            snapEnabled={snapEnabled}
            snapIncrement={snapIncrement}
            onTarget={onTarget}
            onChange={onDimensionChange}
          />
          <DimensionHandle
            target={target}
            x={x2}
            y={y2}
            axis={axis}
            valueInches={valueInches}
            fallbackInches={fallbackInches}
            pixelsPerInch={pixelsPerInch}
            snapEnabled={snapEnabled}
            snapIncrement={snapIncrement}
            onTarget={onTarget}
            onChange={onDimensionChange}
          />
        </>
      )}
    </g>
  )
}
