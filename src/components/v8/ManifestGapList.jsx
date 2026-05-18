export default function ManifestGapList({ gapList }) {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-semibold">Manifest Gap List</h1>
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
