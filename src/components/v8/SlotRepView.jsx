export default function SlotRepView({ manifest, slot }) {
  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">Rep backstage</p>
        <h1 className="text-3xl font-semibold">{manifest.customer.displayName}</h1>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <Panel title="Customer-safe">
          <JsonBlock value={{ manifest: manifest.customer, slot: slot.customer }} />
        </Panel>
        <Panel title="Rep-only">
          <JsonBlock value={{ manifest: manifest.rep, slot: slot.rep }} />
        </Panel>
        <Panel title="Internal">
          <JsonBlock value={{ manifest: manifest.internal, slot: slot.internal }} />
        </Panel>
        <Panel title="Display">
          <p>Section: {manifest.internal.displaySection || 'none'}</p>
          <p>Position: {manifest.internal.displayPosition ?? 'none'}</p>
          <p>Disposition: {manifest.internal.displayDisposition || 'none'}</p>
        </Panel>
      </section>

      <details className="rounded border border-stone-300 bg-white p-4">
        <summary className="cursor-pointer font-semibold">Sources</summary>
        <JsonBlock value={{ manifest: manifest.sources, slot: slot.sources }} />
      </details>
    </main>
  )
}

function Panel({ title, children }) {
  return (
    <section className="rounded border border-stone-300 bg-white p-4">
      <h2 className="mb-3 font-semibold">{title}</h2>
      {children}
    </section>
  )
}

function JsonBlock({ value }) {
  return <pre className="overflow-auto whitespace-pre-wrap text-xs text-stone-700">{JSON.stringify(value, null, 2)}</pre>
}
