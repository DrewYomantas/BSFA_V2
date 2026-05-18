import { deriveCustomerSafeBadges } from '../../lib/v8DeriveCustomerBadges.js'
import NeedsVerificationBadge from './NeedsVerificationBadge.jsx'

export default function SlotCustomerView({ manifest, slot }) {
  const safeManifest = manifest.customer
  const safeSlot = slot.customer
  const { verificationItems } = deriveCustomerSafeBadges(manifest, slot)

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">Customer-visible</p>
        <h1 className="text-3xl font-semibold">{safeManifest.displayName}</h1>
        <p className="text-lg text-stone-700">{safeManifest.shortDescription || safeSlot.customerSafeDescription || 'Live preview'}</p>
      </section>

      <NeedsVerificationBadge items={verificationItems} />

      <section className="grid gap-4 sm:grid-cols-2">
        <div>
          <h2 className="font-semibold">Best for</h2>
          <ul className="mt-2 list-disc pl-5 text-stone-700">
            {safeManifest.bestFor.length > 0 ? safeManifest.bestFor.map((item) => <li key={item}>{item}</li>) : <li>Rep-guided showroom conversation</li>}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold">Showroom</h2>
          <p className="mt-2 text-stone-700">{safeSlot.showroomZoneFriendly}</p>
        </div>
      </section>

      <section className="grid gap-3 text-sm sm:grid-cols-3">
        <div><span className="font-semibold">Style:</span> {safeManifest.styleHuman || 'To verify'}</div>
        <div><span className="font-semibold">Size:</span> {safeManifest.sizeHuman || 'To verify'}</div>
        <div><span className="font-semibold">Fuel:</span> {safeManifest.fuelTypeHuman || 'To verify'}</div>
      </section>
    </main>
  )
}
