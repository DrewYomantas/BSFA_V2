import { formatDimensionLabel } from './hearthGeometry.js'

export default function HearthSvgDimensions({ geometry, model, activeTarget, onTarget }) {
  const { x, y, width, depth } = geometry.bounds
  const widthLabel = formatDimensionLabel(model.dimensions.widthInches, 'Width')
  const depthLabel = formatDimensionLabel(model.dimensions.depthInches, 'Depth')
  const radiusLabel = formatDimensionLabel(model.dimensions.radiusDepthInches, 'Radius depth')
  const clipLabel = formatDimensionLabel(model.dimensions.leftClipInches || model.dimensions.rightClipInches, 'Clip')

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

function DimensionLine({ target, activeTarget, onTarget, x1, y1, x2, y2, label, labelX, labelY }) {
  const active = activeTarget === target
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
    </g>
  )
}
