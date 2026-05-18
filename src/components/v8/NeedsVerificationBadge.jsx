export default function NeedsVerificationBadge({ items = [] }) {
  if (items.length === 0) return null

  return (
    <div className="rounded border border-amber-300 bg-amber-50 p-3 text-sm text-stone-900">
      <div className="font-semibold">Confirm details</div>
      <ul className="mt-2 list-disc pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
