import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SlotCustomerView from '../src/components/v8/SlotCustomerView.jsx'
import { manifests, registerRecords } from '../src/lib/v8LoadData.js'

describe('V8 verification behavior', () => {
  it('shows customer-safe confirm details for at-home measure requirements', () => {
    // Kingsman Bentley 39 now sits at p11 (per audit showroom register).
    // Its verifyAtHomeMeasure list ['Wall context (interior vs exterior)', 'Vent routing']
    // is the canonical example.
    const slot = registerRecords.find((record) => record.displaySlotId === 'front_showroom_p11')
    const manifest = manifests.find((record) => record.unitId === slot.currentUnitRef)

    render(<SlotCustomerView manifest={manifest} slot={slot} />)

    expect(screen.getByText('Confirm details')).toBeInTheDocument()
    expect(screen.getByText('Wall context (interior vs exterior)')).toBeInTheDocument()
    expect(screen.getByText('Vent routing')).toBeInTheDocument()
  })

  it('hides confirm details when no trigger exists', () => {
    const slot = registerRecords.find((record) => record.displaySlotId === 'front_showroom_p11')
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

    expect(screen.queryByText('Confirm details')).not.toBeInTheDocument()
  })

  it('shows customer-safe confirm details when a recommendable override exists', () => {
    const slot = registerRecords.find((record) => record.displaySlotId === 'front_showroom_p7')
    const manifest = manifests.find((record) => record.unitId === slot.currentUnitRef)

    render(<SlotCustomerView manifest={manifest} slot={slot} />)

    expect(screen.getByText('Confirm details')).toBeInTheDocument()
    expect(screen.getByText('Confirm details with your rep.')).toBeInTheDocument()
    expect(screen.queryByText('Showroom reference needs rep guidance')).not.toBeInTheDocument()
  })
})
