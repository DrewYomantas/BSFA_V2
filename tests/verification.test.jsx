import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SlotCustomerView from '../src/components/v8/SlotCustomerView.jsx'
import { manifests, registerRecords } from '../src/lib/v8LoadData.js'

describe('V8 verification behavior', () => {
  it('shows Needs Verification for at-home measure requirements', () => {
    const slot = registerRecords.find((record) => record.displaySlotId === 'front_showroom_p14')
    const manifest = manifests.find((record) => record.unitId === slot.currentUnitRef)

    render(<SlotCustomerView manifest={manifest} slot={slot} />)

    expect(screen.getByText('Needs Verification')).toBeInTheDocument()
    expect(screen.getByText('Wall context (interior vs exterior)')).toBeInTheDocument()
    expect(screen.getByText('Vent routing')).toBeInTheDocument()
  })

  it('hides Needs Verification when no trigger exists', () => {
    const slot = registerRecords.find((record) => record.displaySlotId === 'front_showroom_p14')
    const manifest = manifests.find((record) => record.unitId === slot.currentUnitRef)
    const readyManifest = {
      ...manifest,
      customer: {
        ...manifest.customer,
        verifyAtHomeMeasure: [],
      },
      internal: {
        ...manifest.internal,
        recommendableStatus: 'recommendable',
      },
    }

    render(<SlotCustomerView manifest={readyManifest} slot={slot} />)

    expect(screen.queryByText('Needs Verification')).not.toBeInTheDocument()
  })

  it('shows Needs Verification when a recommendable override exists', () => {
    const slot = registerRecords.find((record) => record.displaySlotId === 'front_showroom_p7')
    const manifest = manifests.find((record) => record.unitId === slot.currentUnitRef)

    render(<SlotCustomerView manifest={manifest} slot={slot} />)

    expect(screen.getByText('Needs Verification')).toBeInTheDocument()
    expect(screen.getByText('Showroom reference needs rep guidance')).toBeInTheDocument()
  })
})
