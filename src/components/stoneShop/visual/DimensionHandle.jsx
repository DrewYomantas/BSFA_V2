import { useState } from 'react'
import { snapToIncrement } from '../../../lib/stoneShop/dimensionSnap.js'

export default function DimensionHandle({
  target,
  x,
  y,
  axis,
  valueInches,
  fallbackInches,
  pixelsPerInch,
  snapEnabled,
  snapIncrement,
  onTarget,
  onChange,
}) {
  const [dragValue, setDragValue] = useState(null)
  const [dragging, setDragging] = useState(false)

  function startDrag(e) {
    e.preventDefault()
    e.stopPropagation()
    onTarget(target)
    setDragging(true)
    const startClient = axis === 'x' ? e.clientX : e.clientY
    const startValue = Number(valueInches) > 0 ? Number(valueInches) : fallbackInches
    const scale = pixelsPerInch || 1

    function move(moveEvent) {
      const currentClient = axis === 'x' ? moveEvent.clientX : moveEvent.clientY
      const delta = (currentClient - startClient) / scale
      const nextValue = Math.max(1, startValue + delta)
      const displayedValue = snapEnabled ? snapToIncrement(nextValue, snapIncrement) : nextValue
      setDragValue(displayedValue)
      onChange(target, displayedValue)
    }

    function stop(upEvent) {
      const currentClient = axis === 'x' ? upEvent.clientX : upEvent.clientY
      const delta = (currentClient - startClient) / scale
      const nextValue = Math.max(1, startValue + delta)
      onChange(target, snapEnabled ? snapToIncrement(nextValue, snapIncrement) : nextValue, { commit: true })
      setDragging(false)
      setDragValue(null)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', stop)
    }

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', stop)
  }

  return (
    <g
      className={dragging ? 'hearth-dimension-handle is-dragging' : 'hearth-dimension-handle'}
      role="slider"
      tabIndex="0"
      aria-label={`Drag ${target}`}
      title={`Drag to resize ${target}`}
      onPointerDown={startDrag}
    >
      <circle cx={x} cy={y} r="9" />
      <circle cx={x} cy={y} r="3" />
      {dragging && dragValue !== null && (
        <g className="hearth-dimension-drag-label">
          <text x={x + 18} y={y - 24}>{snapEnabled ? `Snap ${snapIncrement}"` : 'Freeform'}</text>
          <text x={x + 18} y={y - 10}>{formatInches(dragValue)}</text>
        </g>
      )}
    </g>
  )
}

function formatInches(value) {
  const rounded = Math.round(Number(value) * 100) / 100
  return `${rounded}"`
}
