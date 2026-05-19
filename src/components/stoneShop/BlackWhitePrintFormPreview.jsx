import { getPacketType } from '../../data/stoneShop/stoneShopRates.js'
import { DIMENSION_LABELS, FUTURE_PRINT_FORM_LABELS, REQUIRED_CHECKBOXES, SIGNATURE_LINES } from '../../lib/stoneShop/stoneShopTemplates.js'

export default function BlackWhitePrintFormPreview({ packet }) {
  const type = getPacketType(packet.packetType)
  const formLabel = FUTURE_PRINT_FORM_LABELS[type.futureFormType] || type.formLabel

  return (
    <section className="stone-print-form bg-white text-black" aria-label="Black and white production form">
      <header className="stone-print-form__header">
        <div>
          <p>BENSON STONE COMPANY</p>
          <h2>STONE FABRICATION ORDER</h2>
          <strong>DRAFT - INTERNAL REVIEW ONLY</strong>
        </div>
        <div className="stone-print-form__date">Date: ____________</div>
      </header>

      <div className="stone-print-form__type">
        Form type: {formLabel}
        <br />
        Selected packet: {type.label}
      </div>

      <PrintBlock title="Customer / Job">
        <PrintLine label="Customer" value={packet.customer.name} />
        <PrintLine label="Phone" value={packet.customer.phone} />
        <PrintLine label="Address" value={packet.customer.address} wide />
        <PrintLine label="Builder" value={packet.customer.builder} />
        <PrintLine label="Mason" value={packet.customer.mason} />
      </PrintBlock>

      <PrintBlock title="Material">
        <PrintLine label="Material" value={`${packet.material.name} ${packet.material.thickness}`} />
        <PrintLine label="Finish" value={packet.material.finish} />
        <PrintLine label="Edge" value={packet.material.edge} />
      </PrintBlock>

      <div className="stone-print-form__grid">
        <PrintBlock title="Dimensions">
          {type.dimensions.length > 0 ? type.dimensions.slice(0, 8).map((field) => (
            <PrintLine key={field} label={DIMENSION_LABELS[field] || field} value={formatPrintValue(field, packet.dimensions[field])} />
          )) : (
            <PrintLine label="Approval packet" value="No hearth dimensions required" wide />
          )}
        </PrintBlock>
        <PrintBlock title="Sketch">
          <div className="stone-print-form__sketch">Shop sketch / field notes</div>
        </PrintBlock>
      </div>

      <PrintBlock title="Fabrication Details">
        <PrintLine label="Angle cuts" value={packet.fabrication.angleCuts || ''} />
        <PrintLine label="Notches" value={packet.fabrication.notches || ''} />
        <PrintLine label="Holes" value={packet.fabrication.holes || ''} />
        <PrintLine label="Cutouts" value={packet.fabrication.cutouts || ''} />
        <PrintLine label="Notes" value={packet.fabrication.customNotes || packet.dimensions.notes} wide />
      </PrintBlock>

      <PrintBlock title="Approval / Internal Shop">
        <div className="stone-print-form__checks">
          {REQUIRED_CHECKBOXES.map((label) => (
            <label key={label}><span /> {label}</label>
          ))}
        </div>
        <div className="stone-print-form__signatures">
          {SIGNATURE_LINES.map((label) => (
            <div key={label}>{label}: ______________________________</div>
          ))}
        </div>
      </PrintBlock>
    </section>
  )
}

function formatPrintValue(field, value) {
  if (value === null || value === undefined || value === '') return ''
  if (field.endsWith('Inches')) return `${value} in`
  return String(value)
}

function PrintBlock({ title, children }) {
  return (
    <div className="stone-print-form__block">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  )
}

function PrintLine({ label, value, wide = false }) {
  return (
    <div className={wide ? 'stone-print-form__line stone-print-form__line--wide' : 'stone-print-form__line'}>
      <strong>{label}:</strong>
      <span>{value || '________________________________'}</span>
    </div>
  )
}
