export default function ProductTruthFilters({
  vendors,
  statuses,
  vendor,
  status,
  search,
  onVendorChange,
  onStatusChange,
  onSearchChange,
}) {
  return (
    <div className="grid gap-4 rounded-lg border border-hearth-line bg-hearth-cream/30 p-4 md:grid-cols-[1fr_1fr_2fr]">
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-semibold text-hearth-ink">Vendor</span>
        <select
          value={vendor}
          onChange={(e) => onVendorChange(e.target.value)}
          className="rounded border border-hearth-line bg-white px-2 py-1.5"
        >
          <option value="all">All vendors</option>
          {vendors.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-semibold text-hearth-ink">Status</span>
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded border border-hearth-line bg-white px-2 py-1.5"
        >
          <option value="all">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-semibold text-hearth-ink">Search</span>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Product name, id, or series"
          className="rounded border border-hearth-line bg-white px-2 py-1.5"
        />
      </label>
    </div>
  )
}
