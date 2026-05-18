export default function CustomerRecommendationPreview({ previews }) {
  if (!previews.length) return null

  return (
    <section className="mt-8 border-t border-stone-300 pt-6">
      <h2 className="text-xl font-semibold">Customer Recommendation Preview</h2>
      <div className="mt-4 grid gap-4">
        {previews.map((preview) => (
          <article key={preview.id} className="rounded border border-stone-300 bg-white p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-sm text-stone-500">{preview.category} · {preview.type}</p>
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
          </article>
        ))}
      </div>
    </section>
  )
}
