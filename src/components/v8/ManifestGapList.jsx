export default function ManifestGapList({ gapList }) {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-semibold">Manifest Gap List</h1>
      <ProofSliceHealth health={gapList.health} />
      <table className="mt-6 w-full border-collapse bg-white text-left text-sm">
        <thead>
          <tr className="border-b border-stone-300">
            <th className="p-3">Slot</th>
            <th className="p-3">Guess</th>
            <th className="p-3">Status</th>
            <th className="p-3">Notes</th>
          </tr>
        </thead>
        <tbody>
          {gapList.entries.map((entry) => (
            <tr key={`${entry.encounteredAtSlot}-${entry.displayedUnitGuess}`} className="border-b border-stone-200">
              <td className="p-3">{entry.encounteredAtSlot}</td>
              <td className="p-3">{entry.displayedUnitGuess}</td>
              <td className="p-3">{entry.status}</td>
              <td className="p-3">{entry.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

function ProofSliceHealth({ health }) {
  if (!health) return null

  const stats = [
    ['Manifest records', health.totalManifestRecords],
    ['Display register records', health.totalDisplayRegisterRecords],
    ['Synced from Display Register', health.recordsSyncedFromDisplayRegister],
    ['Needs Verification', health.needsVerificationCount],
    ['Discontinued but displayed', health.discontinuedDisplayedCount],
    ['Actively recommendable', health.activelyRecommendableItemsCount],
    ['Display-only / discontinued', health.displayOnlyDiscontinuedItemsCount],
    ['Verification-required', health.verificationRequiredItemsCount],
    ['Blocked from recommendation', health.blockedFromCustomerRecommendationCount],
    ['Customer-safe boundary', health.customerSafeBoundaryStatus],
  ]

  return (
    <section className="mt-6 rounded border border-stone-300 bg-stone-50 p-4">
      <h2 className="font-semibold">Proof Slice Health</h2>
      <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
        {stats.map(([label, value]) => (
          <div key={label}>
            <dt className="text-stone-500">{label}</dt>
            <dd className="font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
