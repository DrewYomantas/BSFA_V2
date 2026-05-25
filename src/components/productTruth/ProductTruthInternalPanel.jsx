export default function ProductTruthInternalPanel({ item }) {
  if (!item) return null
  return (
    <div className="space-y-3 rounded border border-hearth-ember/40 bg-hearth-ember/5 p-3 text-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-hearth-ember">
        Internal QA — rep only
      </div>

      <div>
        <div className="text-xs font-semibold text-hearth-ink">Next action</div>
        <div className="text-sm text-hearth-ink">{item.nextAction}</div>
      </div>

      {item.openQuestions.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-hearth-ink">Open questions</div>
          <ul className="list-disc pl-5 text-xs text-hearth-ink">
            {item.openQuestions.map((q) => <li key={q}>{q}</li>)}
          </ul>
        </div>
      )}

      {item.guardrails.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-hearth-ink">Guardrails</div>
          <ul className="space-y-1 text-xs">
            {item.guardrails.map((g) => (
              <li key={g.label}>
                <span className="rounded bg-hearth-ember/15 px-1.5 py-0.5 font-semibold text-hearth-ember">{g.label}</span>
                <span className="ml-2 text-hearth-ink">{g.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.internalNotes && (
        <div>
          <div className="text-xs font-semibold text-hearth-ink">Internal notes</div>
          <p className="whitespace-pre-wrap text-xs text-hearth-ink">{item.internalNotes}</p>
        </div>
      )}

      {item.sourceEvidence.length > 0 && (
        <div>
          <div className="text-xs font-semibold text-hearth-ink">
            Source evidence ({item.sourceEvidenceCount})
          </div>
          <div className="text-xs italic text-hearth-muted">
            {item.sourceDocumentTitle}
            {item.sourcePageOrSection ? ` · ${item.sourcePageOrSection}` : ''}
          </div>
          <ul className="mt-1 space-y-2 text-xs text-hearth-ink">
            {item.sourceEvidence.map((ev, i) => (
              <li key={i} className="rounded border border-hearth-line bg-white/60 p-2">
                <div><span className="font-semibold">{ev.sourceType}</span> · {ev.confidence}</div>
                {ev.packagePath && <div className="break-all text-hearth-muted">{ev.packagePath}{ev.innerFile ? ` :: ${ev.innerFile}` : ''}</div>}
                {ev.notes && <div className="mt-1 whitespace-pre-wrap">{ev.notes}</div>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!item.validation.valid && (
        <div role="alert" className="rounded border border-red-300 bg-red-50 p-2 text-xs text-red-800">
          Validation errors: {item.validation.errors.join('; ')}
        </div>
      )}
    </div>
  )
}
