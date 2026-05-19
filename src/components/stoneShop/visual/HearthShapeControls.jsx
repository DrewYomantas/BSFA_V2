const SHAPES = [
  ['basic', 'Straight'],
  ['clipped_corners', 'Clipped corners'],
  ['angle_cuts', 'Angle cuts'],
  ['radius_front', 'Radius front'],
]

export default function HearthShapeControls({ value, onChange }) {
  return (
    <div className="hearth-shape-controls" aria-label="Front style">
      {SHAPES.map(([shape, label]) => (
        <button
          key={shape}
          type="button"
          aria-pressed={value === shape}
          onClick={() => onChange(shape)}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
