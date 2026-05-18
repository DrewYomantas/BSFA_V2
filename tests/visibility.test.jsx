import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import SlotCustomerView from '../src/components/v8/SlotCustomerView.jsx'
import { manifests, registerRecords } from '../src/lib/v8LoadData.js'

const forbiddenFieldNames = [
  'recommendableStatus',
  'recommendableStatusReason',
  'spiffAmount',
  'spiffNotes',
  'marginBand',
  'marginNotes',
  'recommendableOverride',
  'recommendableOverrideReason',
  'recommendableOverrideBy',
  'recommendableOverrideDate',
  'recommendableOverrideReviewDate',
  'replacementCandidate',
  'businessFlags',
  'bisTrackRef',
  'auditTrail',
  'coachingNotes',
]

describe('V8 customer visibility', () => {
  it.each(registerRecords)('does not leak backstage fields for $displaySlotId', (slot) => {
    const manifest = manifests.find((record) => record.unitId === slot.currentUnitRef)
    render(<SlotCustomerView manifest={manifest} slot={slot} />)

    const text = screen.getByRole('main').textContent
    for (const token of forbiddenFieldNames) {
      expect(text).not.toContain(token)
    }

    const forbiddenValues = [
      manifest.rep.salesNotes,
      manifest.rep.verificationNotes,
      manifest.rep.crossSellNotes,
      slot.rep.coachingNotes,
      slot.rep.dailyConditionNotes,
    ].filter(Boolean)

    for (const value of forbiddenValues) {
      expect(text).not.toContain(value)
    }
  })
})
