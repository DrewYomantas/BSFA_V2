import { useEffect, useMemo, useState } from 'react'
import StonePacketTypePicker from './StonePacketTypePicker.jsx'
import StoneDimensionPanel from './StoneDimensionPanel.jsx'
import StoneMaterialPanel from './StoneMaterialPanel.jsx'
import StoneFabricationAddersPanel from './StoneFabricationAddersPanel.jsx'
import StonePacketStatusPanel from './StonePacketStatusPanel.jsx'
import ModernPacketPreview from './ModernPacketPreview.jsx'
import BlackWhitePrintFormPreview from './BlackWhitePrintFormPreview.jsx'
import StoneShopExportActions from './StoneShopExportActions.jsx'
import { calculateStoneShopPricing } from '../../lib/stoneShop/stoneShopCalculations.js'
import {
  createStoneShopPacket,
  loadCurrentStoneShopPacketId,
  loadStoneShopPackets,
  saveCurrentStoneShopPacketId,
  saveStoneShopPackets,
} from '../../lib/stoneShop/stoneShopPersistence.js'

const STEPS = ['Customer', 'Type', 'Material', 'Dimensions', 'Fabrication', 'Review', 'Print / Export']

export default function StoneShopPacketBuilder() {
  const [packets, setPackets] = useState(() => {
    const existing = loadStoneShopPackets()
    return existing.length > 0 ? existing : [createStoneShopPacket()]
  })
  const [currentId, setCurrentId] = useState(() => loadCurrentStoneShopPacketId())
  const [activeStep, setActiveStep] = useState('Customer')

  const packet = useMemo(() => {
    return packets.find((item) => item.id === currentId) || packets[0]
  }, [packets, currentId])

  useEffect(() => {
    if (packet?.id && packet.id !== currentId) setCurrentId(packet.id)
  }, [packet, currentId])

  useEffect(() => {
    saveStoneShopPackets(packets)
    if (packet?.id) saveCurrentStoneShopPacketId(packet.id)
  }, [packets, packet?.id])

  function replacePacket(nextPacket) {
    const priced = {
      ...nextPacket,
      pricing: calculateStoneShopPricing(nextPacket),
      updatedAt: new Date().toISOString(),
    }
    setPackets((items) => items.map((item) => item.id === priced.id ? priced : item))
  }

  function updateSection(section, partial) {
    replacePacket({
      ...packet,
      [section]: {
        ...packet[section],
        ...partial,
      },
    })
  }

  function updatePacket(partial) {
    replacePacket({ ...packet, ...partial })
  }

  function newPacket() {
    const next = createStoneShopPacket()
    setPackets((items) => [next, ...items])
    setCurrentId(next.id)
    setActiveStep('Customer')
  }

  function markGenerated(field) {
    updateSection('outputs', { [field]: new Date().toISOString() })
  }

  return (
    <div className="stone-shop-workspace">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-hearth-ember">Quote / Proposal Prep</p>
          <h1 className="font-display text-4xl text-hearth-ink">Stone + Shop Packet</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-hearth-muted">
            Guided hearth and material-selection packets with rep-only estimates, missing-info checks, and production-safe print forms.
          </p>
        </div>
        <button type="button" onClick={newPacket} className="w-fit rounded-full border border-hearth-ink px-5 py-2 text-sm font-medium text-hearth-ink hover:bg-white">
          New packet
        </button>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto border-b border-hearth-line pb-3">
        {STEPS.map((step) => (
          <button
            key={step}
            type="button"
            onClick={() => setActiveStep(step)}
            className={
              'shrink-0 rounded-full px-4 py-2 text-sm transition-colors ' +
              (activeStep === step ? 'bg-hearth-ink text-white' : 'bg-white text-hearth-muted hover:text-hearth-ink')
            }
          >
            {step}
          </button>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <main className="space-y-6">
          <section className={activeStep === 'Customer' ? 'space-y-4' : 'hidden'}>
            <div>
              <h2 className="font-display text-2xl text-hearth-ink">Customer</h2>
              <p className="text-sm text-hearth-muted">Attach enough job context for a customer file or standalone shop packet.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ['name', 'Customer name'],
                ['phone', 'Phone'],
                ['address', 'Address'],
                ['builder', 'Builder'],
                ['mason', 'Mason'],
              ].map(([field, label]) => (
                <label key={field} className={field === 'address' ? 'block sm:col-span-2' : 'block'}>
                  <span className="text-sm text-hearth-muted">{label}</span>
                  <input
                    value={packet.customer[field]}
                    onChange={(e) => updateSection('customer', { [field]: e.target.value })}
                    className="mt-1 w-full rounded-md border border-hearth-line bg-white px-3 py-2"
                  />
                </label>
              ))}
            </div>
          </section>

          <section className={activeStep === 'Type' ? 'space-y-4' : 'hidden'}>
            <div>
              <h2 className="font-display text-2xl text-hearth-ink">Packet Type</h2>
              <p className="text-sm text-hearth-muted">The builder changes required dimensions and adders based on this choice.</p>
            </div>
            <StonePacketTypePicker value={packet.packetType} onChange={(packetType) => updatePacket({ packetType })} />
          </section>

          <div className={activeStep === 'Material' ? 'block' : 'hidden'}>
            <StoneMaterialPanel packet={packet} updateSection={updateSection} />
          </div>

          <div className={activeStep === 'Dimensions' ? 'block' : 'hidden'}>
            <StoneDimensionPanel packet={packet} updateSection={updateSection} />
          </div>

          <div className={activeStep === 'Fabrication' ? 'block' : 'hidden'}>
            <StoneFabricationAddersPanel packet={packet} updateSection={updateSection} />
          </div>

          <section className={activeStep === 'Review' ? 'space-y-6' : 'hidden'}>
            <ModernPacketPreview packet={packet} />
          </section>

          <section className={activeStep === 'Print / Export' ? 'space-y-5' : 'hidden'}>
            <StoneShopExportActions onMarkGenerated={markGenerated} />
            <BlackWhitePrintFormPreview packet={packet} />
          </section>
        </main>

        <StonePacketStatusPanel packet={packet} updateSection={updateSection} />
      </div>
    </div>
  )
}
