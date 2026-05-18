import RenderImage from './RenderImage.jsx'

export default function SelectableTile({ label, hint, renderSlug, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={
        'group text-left rounded-xl border transition-all overflow-hidden bg-hearth-surface ' +
        (selected
          ? 'border-hearth-ember ring-2 ring-hearth-ember/30 shadow-sm'
          : 'border-hearth-line hover:border-hearth-muted')
      }
    >
      {renderSlug && (
        <RenderImage slug={renderSlug} alt={label} className="w-full aspect-[4/3]" />
      )}
      <div className="p-4">
        <div className="font-display text-lg text-hearth-ink">{label}</div>
        {hint && <div className="text-sm text-hearth-muted mt-1">{hint}</div>}
      </div>
    </button>
  )
}
