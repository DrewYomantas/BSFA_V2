export default function StoneShopExportActions({ onMarkGenerated }) {
  function printModern() {
    onMarkGenerated('modernPacketGeneratedAt')
    window.print()
  }

  function printBw() {
    onMarkGenerated('bwFormGeneratedAt')
    window.print()
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button type="button" onClick={printModern} className="rounded-full bg-hearth-ink px-5 py-2 text-sm font-medium text-white hover:bg-hearth-ember">
        Print modern packet
      </button>
      <button type="button" onClick={printBw} className="rounded-full border border-hearth-ink px-5 py-2 text-sm font-medium text-hearth-ink hover:bg-white">
        Print B/W form
      </button>
    </div>
  )
}
