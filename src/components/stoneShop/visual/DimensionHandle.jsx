import { snapToIncrement } from '../../../lib/stoneShop/dimensionSnap.js'

export default function DimensionHandle({
  target,
  x,
  y,
  axis,
  valueInches,
  fallbackInches,
  pixelsPerInch,
  snapIncrement,
  onTarget,
  onChange,
}) {
  function startDrag(e) {
    e.preventDefault()
    e.stopPropagation()
    onTarget(target)
    const startClient = axis === 'x' ? e.clientX : e.clientY
    const startValue = Number(valueInches) > 0 ? Number(valueInches) : fallbackInches
    const scale = pixelsPerInch || 1

    function move(moveEvent) {
      const currentClient = axis === 'x' ? moveEvent.clientX : moveEvent.clientY
      const delta = (currentClient - startClient) / scale
      onChange(target, Math.max(1, startValue + delta))
    }

    function stop(upEvent) {
      const currentClient = axis === 'x' ? upEvent.clientX : upEvent.clientY
      const delta = (currentClient - startClient) / scale
      onChange(target, snapToIncrement(startValue + delta, snapIncrement), { commit: true })
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', stop)
    }

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', stop)
  }

  return (
    <g
      className="hearth-dimension-handle"
      role="slider"
      tabIndex="0"
      aria-label={`Drag ${target}`}
      onPointerDown={startDrag}
    >
      <circle cx={x} cy={y} r="9" />
      <circle cx={x} cy={y} r="3" />
    </g>
  )
}
