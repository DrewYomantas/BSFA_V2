export default function BuildModeToggle({ value, onChange }) {
  return (
    <div className="build-mode-toggle" aria-label="Build view mode">
      <button type="button" aria-pressed={value === 'hearth3d'} onClick={() => onChange('hearth3d')}>
        3D hearth
      </button>
      <button type="button" aria-pressed={value === 'selection'} onClick={() => onChange('selection')}>
        Materials
      </button>
    </div>
  )
}
