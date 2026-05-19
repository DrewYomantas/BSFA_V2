import HearthSvgDimensions from './HearthSvgDimensions.jsx'
import { buildHearthGeometry, pointsToString } from './hearthGeometry.js'

export default function HearthSvgModel({ model, activeTarget, onTarget = () => {}, unit, snapEnabled, snapIncrement, onDimensionChange, printMode = false }) {
  const geometry = buildHearthGeometry(model)
  const { x, y, width, depth } = geometry.bounds
  const shapeProps = {
    className: printMode ? 'hearth-shape is-print' : activeTarget === 'surface' ? 'hearth-shape is-active' : 'hearth-shape',
    onClick: printMode ? undefined : () => onTarget('surface'),
  }

  return (
    <svg className={printMode ? 'hearth-svg-model hearth-svg-model--print' : 'hearth-svg-model'} viewBox="0 0 520 360" role="img" aria-label={`${model.hearthShape.replaceAll('_', ' ')} hearth technical diagram`}>
      <defs>
        <pattern id="hearth-grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#e7ddd0" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="520" height="360" fill="url(#hearth-grid)" />
      {geometry.path ? (
        <path d={geometry.path} {...shapeProps} />
      ) : (
        <polygon points={pointsToString(geometry.points)} {...shapeProps} />
      )}
      <g
        className={activeTarget === 'front-edge' ? 'hearth-edge is-active' : 'hearth-edge'}
        role={printMode ? undefined : 'button'}
        tabIndex={printMode ? undefined : '0'}
        aria-label={printMode ? undefined : 'Edit front edge'}
        onClick={printMode ? undefined : () => onTarget('front-edge')}
      >
        <line x1={x + 18} y1={y + depth} x2={x + width - 18} y2={y + depth} />
        <text x={x + width / 2} y={y + depth - 13}>{model.edgeTreatments.front || 'Front edge'}</text>
      </g>
      <g
        className={activeTarget === 'corner' ? 'hearth-corners is-active' : 'hearth-corners'}
        role={printMode ? undefined : 'button'}
        tabIndex={printMode ? undefined : '0'}
        aria-label={printMode ? undefined : 'Edit front corners'}
        onClick={printMode ? undefined : () => onTarget('corner')}
      >
        <circle cx={x + 12} cy={y + depth - 12} r="12" />
        <circle cx={x + width - 12} cy={y + depth - 12} r="12" />
      </g>
      {model.hearthShape === 'angle_cuts' && (
        <g className="hearth-angle-markers">
          <path d={`M ${x + 22} ${y + depth - 36} L ${x + 38} ${y + depth - 20} L ${x + 22} ${y + depth - 20}`} />
          <path d={`M ${x + width - 22} ${y + depth - 36} L ${x + width - 38} ${y + depth - 20} L ${x + width - 22} ${y + depth - 20}`} />
        </g>
      )}
      <HearthSvgDimensions
        geometry={geometry}
        model={model}
        activeTarget={activeTarget}
        onTarget={onTarget}
        unit={unit}
        snapEnabled={snapEnabled}
        snapIncrement={snapIncrement}
        onDimensionChange={onDimensionChange}
        printMode={printMode}
      />
    </svg>
  )
}
