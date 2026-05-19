import { getPacketType } from '../../data/stoneShop/stoneShopRates.js'
import { calculateStoneShopPricing, formatMoney } from '../../lib/stoneShop/stoneShopCalculations.js'
import { deriveStoneShopStatus } from '../../lib/stoneShop/stoneShopStatus.js'

export default function ModernPacketPreview({ packet }) {
  const type = getPacketType(packet.packetType)
  const pricing = calculateStoneShopPricing(packet)
  const status = deriveStoneShopStatus(packet)

  return (
    <section className="rounded-lg border border-hearth-line bg-[#fffdf9] p-6 shadow-sm" aria-label="Modern packet preview">
      <div className="flex flex-col gap-3 border-b border-hearth-line pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-hearth-ember">Stone + Shop Packet</p>
          <h2 className="mt-1 font-display text-3xl text-hearth-ink">{type.formLabel}</h2>
          <p className="mt-1 text-sm text-hearth-muted">{packet.customer.name || 'Customer name pending'}</p>
        </div>
        <div className="text-sm text-hearth-muted sm:text-right">
          <p>{status.label}</p>
          <p>{new Date(packet.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <PreviewBlock title="Customer / Job">
          <PreviewLine label="Phone" value={packet.customer.phone} />
          <PreviewLine label="Address" value={packet.customer.address} />
          <PreviewLine label="Builder" value={packet.customer.builder} />
          <PreviewLine label="Mason" value={packet.customer.mason} />
        </PreviewBlock>
        <PreviewBlock title="Material Direction">
          <PreviewLine label="Material" value={`${packet.material.name} ${packet.material.thickness}`} />
          <PreviewLine label="Finish" value={packet.material.finish} />
          <PreviewLine label="Edge" value={packet.material.edge} />
          <PreviewLine label="Source" value={packet.material.source.replaceAll('_', ' ')} />
        </PreviewBlock>
        <PreviewBlock title="Shop Notes">
          <p className="text-sm leading-6 text-hearth-muted">{packet.dimensions.notes || packet.fabrication.customNotes || 'No shop notes entered yet.'}</p>
        </PreviewBlock>
        <PreviewBlock title="Rep Estimate">
          <PreviewLine label="Sq ft" value={pricing.sqFt ?? '-'} />
          <PreviewLine label="Estimated total" value={formatMoney(pricing.estimatedTotal)} />
          <p className="mt-2 text-xs text-hearth-muted">Rep-only. Final quote/order remains tied to the official Benson Stone quote/order system.</p>
        </PreviewBlock>
      </div>

      <div className="mt-5 rounded-md border border-hearth-line bg-white p-4 text-sm leading-6 text-hearth-muted">
        Material samples are representative and natural variation is expected. Final field measurements and shop review may affect final details. This packet records selected material and fabrication direction.
      </div>
    </section>
  )
}

function PreviewBlock({ title, children }) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-widest text-hearth-muted">{title}</h3>
      <div className="mt-2 space-y-1">{children}</div>
    </div>
  )
}

function PreviewLine({ label, value }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-hearth-muted">{label}</span>
      <span className="text-right text-hearth-ink">{value || '-'}</span>
    </div>
  )
}
