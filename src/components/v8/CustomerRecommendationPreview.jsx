import { useState } from 'react'
import { buildRepStartingDirectionHandoff } from '../../lib/v8ProofSliceContract.js'

export default function CustomerRecommendationPreview({ previews }) {
  const [selectedId, setSelectedId] = useState(null)

  if (!previews.length) return null

  const selectedPreview = previews.find((preview) => preview.id === selectedId)
  const handoff = buildRepStartingDirectionHandoff(selectedPreview)

  return (
    <section className="mt-8 border-t border-stone-300 pt-6">
      <h2 className="text-xl font-semibold">Customer Recommendation Preview</h2>
      <div className="mt-4 grid gap-4">
        {previews.map((preview) => (
          <article key={preview.id} className="rounded border border-stone-300 bg-white p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm text-stone-500">{preview.category} / {preview.type}</p>
                <h3 className="mt-1 text-lg font-semibold">{preview.displayName}</h3>
              </div>
              {preview.showroomCue ? <p className="text-sm text-stone-600">{preview.showroomCue}</p> : null}
            </div>
            <p className="mt-3 text-stone-700">{preview.description}</p>
            {preview.badges.length > 0 ? (
              <ul className="mt-3 flex flex-wrap gap-2 text-sm">
                {preview.badges.map((badge) => (
                  <li key={badge} className="rounded border border-stone-300 px-2 py-1">{badge}</li>
                ))}
              </ul>
            ) : null}
            {preview.measureNote ? <p className="mt-3 text-sm text-stone-600">{preview.measureNote}</p> : null}
            <button
              className="mt-4 rounded border border-stone-800 px-3 py-2 text-sm font-semibold"
              type="button"
              onClick={() => setSelectedId(preview.id)}
            >
              Start with this direction
            </button>
          </article>
        ))}
      </div>
      {selectedPreview ? <SelectedDirectionPanel preview={selectedPreview} /> : null}
      {handoff ? <RepHandoffPanel handoff={handoff} /> : null}
    </section>
  )
}

function SelectedDirectionPanel({ preview }) {
  return (
    <section className="mt-4 rounded border border-stone-300 bg-stone-50 p-4">
      <p className="text-sm font-semibold text-stone-500">Selected starting direction</p>
      <h3 className="mt-1 text-lg font-semibold">{preview.displayName}</h3>
      <p className="mt-1 text-sm text-stone-700">{preview.category} / {preview.type}</p>
      <p className="mt-3 text-stone-700">We'll use this as the starting direction and confirm fit/details with your rep.</p>
      {preview.badges.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2 text-sm">
          {preview.badges.map((badge) => (
            <li key={badge} className="rounded border border-stone-300 bg-white px-2 py-1">{badge}</li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}

function RepHandoffPanel({ handoff }) {
  return (
    <section className="mt-4 rounded border border-stone-400 bg-white p-4">
      <p className="text-sm font-semibold text-stone-500">Rep handoff</p>
      <h3 className="mt-1 text-lg font-semibold">{handoff.displayName}</h3>
      <p className="mt-1 text-sm text-stone-700">{handoff.category} / {handoff.type}</p>
      <p className="mt-3 text-stone-700">{handoff.customerSummary}</p>
      {handoff.displayContext ? <p className="mt-2 text-sm text-stone-600">{handoff.displayContext}</p> : null}
      <p className="mt-3 text-sm font-semibold text-stone-700">{handoff.recommendationNote}</p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-stone-700">
        {handoff.verificationReminders.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-stone-700">
        {handoff.nextSteps.map((item) => <li key={item}>{item}</li>)}
      </ol>
    </section>
  )
}
