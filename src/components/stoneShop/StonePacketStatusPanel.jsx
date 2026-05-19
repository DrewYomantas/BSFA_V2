import { calculateStoneShopPricing, formatMoney } from '../../lib/stoneShop/stoneShopCalculations.js'
import { deriveStoneShopStatus, getMissingRequiredDimensions } from '../../lib/stoneShop/stoneShopStatus.js'
import { DIMENSION_LABELS } from '../../lib/stoneShop/stoneShopTemplates.js'

export default function StonePacketStatusPanel({ packet, updateSection }) {
  const status = deriveStoneShopStatus(packet)
  const pricing = calculateStoneShopPricing(packet)
  const missingDimensions = getMissingRequiredDimensions(packet)

  return (
    <aside className="space-y-5 rounded-lg border border-hearth-line bg-white p-5">
      <div>
        <p className="text-xs uppercase tracking-widest text-hearth-muted">Packet status</p>
        <h2 className="mt-1 font-display text-3xl text-hearth-ink">{status.label}</h2>
        <p className="mt-2 text-sm leading-5 text-hearth-muted">{status.next}</p>
      </div>

      <div className="border-t border-hearth-line pt-4">
        <p className="text-xs uppercase tracking-widest text-hearth-muted">Rep-only estimate</p>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between gap-4"><dt>Sq ft</dt><dd>{pricing.sqFt ?? '-'}</dd></div>
          <div className="flex justify-between gap-4"><dt>Material</dt><dd>{formatMoney(pricing.materialSubtotal)}</dd></div>
          <div className="flex justify-between gap-4"><dt>Adders</dt><dd>{formatMoney(pricing.addersSubtotal)}</dd></div>
          <div className="flex justify-between gap-4 border-t border-hearth-line pt-2 font-semibold"><dt>Estimate</dt><dd>{formatMoney(pricing.estimatedTotal)}</dd></div>
        </dl>
        <p className="mt-3 text-xs leading-5 text-hearth-muted">{pricing.sourceLabel}</p>
      </div>

      <div className="border-t border-hearth-line pt-4">
        <p className="text-xs uppercase tracking-widest text-hearth-muted">Missing info</p>
        <ul className="mt-3 space-y-2 text-sm text-hearth-muted">
          {missingDimensions.map((field) => <li key={field}>- {DIMENSION_LABELS[field]} inches</li>)}
          {!packet.verification.fieldMeasureConfirmed && packet.packetType !== 'material_approval' && <li>- Field measure confirmation</li>}
          {!packet.verification.materialApproved && <li>- Material approval</li>}
          {!packet.verification.customerSignatureCaptured && <li>- Customer signature</li>}
          {!packet.verification.managerReviewedPricing && <li>- Pricing review</li>}
          {missingDimensions.length === 0
            && (packet.packetType === 'material_approval' || packet.verification.fieldMeasureConfirmed)
            && packet.verification.materialApproved
            && packet.verification.customerSignatureCaptured
            && packet.verification.managerReviewedPricing
            && <li>Checklist is ready for shop review.</li>}
        </ul>
      </div>

      <div className="border-t border-hearth-line pt-4">
        <p className="text-xs uppercase tracking-widest text-hearth-muted">Approvals</p>
        <div className="mt-3 space-y-2 text-sm">
          {[
            ['fieldMeasureConfirmed', 'Field measure confirmed'],
            ['materialApproved', 'Material sample approved'],
            ['customerSignatureCaptured', 'Customer signed'],
            ['managerReviewedPricing', 'Price reviewed'],
            ['shopReadyApproved', 'Ready for shop'],
          ].map(([field, label]) => (
            <label key={field} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={packet.verification[field]}
                onChange={(e) => updateSection('verification', { [field]: e.target.checked })}
                className="h-4 w-4 accent-hearth-ember"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  )
}
