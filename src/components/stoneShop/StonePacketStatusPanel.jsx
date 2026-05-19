import { calculateStoneShopPricing, formatMoney } from '../../lib/stoneShop/stoneShopCalculations.js'
import { getPacketType, isPricingEnabled } from '../../data/stoneShop/stoneShopRates.js'
import { deriveStoneShopStatus, getMissingInfoItems } from '../../lib/stoneShop/stoneShopStatus.js'

const MEASUREMENT_CONFIDENCE_LABELS = {
  rough_customer: 'Rough customer measurement',
  showroom_estimate: 'Showroom estimate',
  field_measured: 'Field measured',
  shop_verified: 'Shop verified',
}

export default function StonePacketStatusPanel({ packet, updateSection, visualNext }) {
  const type = getPacketType(packet.packetType)
  const status = deriveStoneShopStatus(packet)
  const pricing = calculateStoneShopPricing(packet)
  const missingInfo = getMissingInfoItems(packet)
  const pricingReviewed = !!packet.verification.managerReviewedPricing
  const releaseChecklist = buildReleaseChecklist(packet)

  return (
    <aside className="space-y-5 rounded-lg border border-hearth-line bg-white p-5">
      <div>
        <p className="text-xs uppercase tracking-widest text-hearth-muted">Current packet</p>
        <p className="mt-1 text-sm font-medium text-hearth-ink">{type.label}</p>
        <p className="mt-1 text-xs text-hearth-muted">Print form: {type.formLabel}</p>
        <p className="mt-2 w-fit rounded-full border border-hearth-line px-2 py-1 text-xs text-hearth-muted">
          {MEASUREMENT_CONFIDENCE_LABELS[packet.dimensions?.measurementConfidence] || 'Rough customer measurement'}
        </p>
      </div>

      <div className="border-t border-hearth-line pt-4">
        <p className="text-xs uppercase tracking-widest text-hearth-muted">Next best move</p>
        <h2 className="mt-1 font-display text-3xl text-hearth-ink">{status.label}</h2>
        <p className="mt-2 text-sm leading-5 text-hearth-muted">{status.next}</p>
        {visualNext?.copy && <p className="mt-2 text-sm leading-5 text-hearth-ink">{visualNext.copy}</p>}
        {status.why && <p className="mt-2 rounded-md bg-hearth-bg px-3 py-2 text-xs leading-5 text-hearth-muted">{status.why}</p>}
      </div>

      <div className="border-t border-hearth-line pt-4">
        <p className="text-xs uppercase tracking-widest text-hearth-muted">Liam-style math</p>
        <p className="mt-1 text-xs leading-5 text-hearth-muted">
          Preliminary rep-only math{pricingReviewed ? ' - pricing reviewed' : ' until price review is checked'}.
        </p>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between gap-4"><dt>Formula</dt><dd>{pricing.formula || (isPricingEnabled(packet.packetType) ? 'width x depth / 144' : 'not a pricing packet')}</dd></div>
          <div className="flex justify-between gap-4"><dt>Sq ft</dt><dd>{pricing.sqFt ?? '-'}</dd></div>
          <div className="flex justify-between gap-4"><dt>Rate</dt><dd>{pricing.materialRate ? `${formatMoney(pricing.materialRate)} / sq ft` : '-'}</dd></div>
          <div className="flex justify-between gap-4"><dt>Material</dt><dd>{formatMoney(pricing.materialSubtotal)}</dd></div>
          <div className="flex justify-between gap-4"><dt>Fabrication adders</dt><dd>{formatMoney(pricing.addersSubtotal)}</dd></div>
          <div className="flex justify-between gap-4 border-t border-hearth-line pt-2 font-semibold"><dt>Estimate</dt><dd>{formatMoney(pricing.estimatedTotal)}</dd></div>
        </dl>
        {pricing.activeAdders?.length > 0 && (
          <ul className="mt-3 space-y-1 text-xs text-hearth-muted">
            {pricing.activeAdders.map((adder) => (
              <li key={adder.key}>
                {adder.label}: {adder.unit === 'flat' ? 'flat' : `${adder.value} x ${formatMoney(adder.amount)}`} = {formatMoney(adder.total)}
              </li>
            ))}
          </ul>
        )}
        {pricing.geometryNote && <p className="mt-3 rounded-md border border-hearth-line px-3 py-2 text-xs leading-5 text-hearth-muted">{pricing.geometryNote}</p>}
        <p className="mt-3 text-xs leading-5 text-hearth-muted">{pricing.sourceLabel}</p>
      </div>

      <div className="border-t border-hearth-line pt-4">
        <p className="text-xs uppercase tracking-widest text-hearth-muted">Missing info</p>
        <ul className="mt-3 space-y-2 text-sm text-hearth-muted">
          {missingInfo.map((item) => <li key={item.key}>- {item.label}</li>)}
          {missingInfo.length === 0 && <li>Checklist is ready for shop review.</li>}
        </ul>
      </div>

      <div className="border-t border-hearth-line pt-4">
        <p className="text-xs uppercase tracking-widest text-hearth-muted">Approvals</p>
        <div className="mt-3 space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input
              aria-label="Shape confirmed"
              type="checkbox"
              checked={!!packet.visualWorkflow?.frontStyleConfirmed}
              onChange={(e) => updateSection('visualWorkflow', { frontStyleConfirmed: e.target.checked })}
              className="h-4 w-4 accent-hearth-ember"
            />
            <span>Shape confirmed</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              aria-label="Edge/fabrication details confirmed"
              type="checkbox"
              checked={!!packet.visualWorkflow?.fabricationDetailsConfirmed}
              onChange={(e) => updateSection('visualWorkflow', { fabricationDetailsConfirmed: e.target.checked })}
              className="h-4 w-4 accent-hearth-ember"
            />
            <span>Edge/fabrication details confirmed</span>
          </label>
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

      <div className="border-t border-hearth-line pt-4">
        <p className="text-xs uppercase tracking-widest text-hearth-muted">Shop release checklist</p>
        <ul className="mt-3 space-y-2 text-sm">
          {releaseChecklist.map((item) => (
            <li key={item.label} className={item.done ? 'text-hearth-ink' : 'text-hearth-muted'}>
              {item.done ? '✓' : '-'} {item.label}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

function buildReleaseChecklist(packet) {
  const dimensionsEntered = Number(packet.dimensions?.widthInches) > 0 && Number(packet.dimensions?.depthInches) > 0
  return [
    { label: 'Dimensions entered', done: dimensionsEntered },
    { label: 'Material selected', done: !!packet.material?.name },
    { label: 'Thickness selected', done: !!packet.material?.thickness },
    { label: 'Shape confirmed', done: !!packet.visualWorkflow?.frontStyleConfirmed },
    { label: 'Edge/fabrication details confirmed', done: !!packet.visualWorkflow?.fabricationDetailsConfirmed },
    { label: 'Field measure confirmed', done: !!packet.verification?.fieldMeasureConfirmed },
    { label: 'Material approved', done: !!packet.verification?.materialApproved },
    { label: 'Pricing reviewed', done: !!packet.verification?.managerReviewedPricing },
    { label: 'Customer signed', done: !!packet.verification?.customerSignatureCaptured },
  ]
}
