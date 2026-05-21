import { fireEvent, render, screen, within } from '@testing-library/react'
import { createElement } from 'react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import CustomerRecommendationPreview from '../src/components/v8/CustomerRecommendationPreview.jsx'
import V8SliceIndex from '../src/screens/v8-slice/V8SliceIndex.jsx'
import kingsman from '../src/data/v8/manifest/kingsman_bentley_39.json'
import p11 from '../src/data/v8/displayRegister/front_showroom_p11.json'
import p7 from '../src/data/v8/displayRegister/front_showroom_p7.json'
import { deriveCustomerBadges } from '../src/lib/v8DeriveCustomerBadges.js'
import { manifests, registerRecords, gapList } from '../src/lib/v8LoadData.js'
import {
  buildCustomerRecommendationPreviews,
  buildRepStartingDirectionHandoff,
  buildV8ProofSliceHealth,
  deriveManifestRecommendationStatus,
  getDisplayOnlyManifestItems,
  getRecommendableManifestItems,
  getVerificationRequiredManifestItems,
  projectV8CustomerSafe,
  projectV8RepBackstage,
  scanCustomerSafeProjection,
} from '../src/lib/v8ProofSliceContract.js'
import { syncRegisterToManifest } from '../src/lib/v8SyncRegisterToManifest.js'

describe('V8 proof slice contract', () => {
  it('keeps Display Register as the source of truth for display-derived fields', () => {
    const staleManifest = {
      ...kingsman,
      rep: {
        ...kingsman.rep,
        displayCallback: 'stale callback',
      },
      internal: {
        ...kingsman.internal,
        displayDisposition: 'stale_display',
        displayPosition: 999,
        displaySection: 'stale_showroom',
      },
    }

    const synced = syncRegisterToManifest(staleManifest, [p11])

    expect(synced.rep.displayCallback).toBe(p11.rep.displayCallbackLanguage)
    expect(synced.internal.displayDisposition).toBe(p11.internal.displayDisposition)
    expect(synced.internal.displayPosition).toBe(p11.location.position)
    expect(synced.internal.displaySection).toBe(p11.location.zone)
  })

  it('proves the sample data has active recommendable and discontinued displayed records', () => {
    const health = buildV8ProofSliceHealth({ manifests, registerRecords, gapList })

    // 13 manifests = 3 original (kingsman + 2 example fixtures) + 10 audit-sync additions
    expect(health.totalManifestRecords).toBe(13)
    // 12 register slots = p7 (discontinued example) + 11 active positions (p1-p31 subset)
    expect(health.totalDisplayRegisterRecords).toBe(12)
    // Every manifest in the 12-slot register set must sync cleanly
    expect(health.recordsSyncedFromDisplayRegister).toBe(12)
    expect(health.activeRecommendableDisplayedCount).toBeGreaterThanOrEqual(1)
    expect(health.discontinuedDisplayedCount).toBeGreaterThanOrEqual(1)
  })

  it('builds the customer recommendation set from manifest-backed active recommendable items only', () => {
    const items = getRecommendableManifestItems(manifests, registerRecords)

    // 10 recommendable items: kingsman_bentley_39 (existing) + 9 new (davinci_6030 is excluded
    // because it carries recommendable_with_verification, which is verification-required, not active).
    expect(items.map((item) => item.unitId)).toEqual(
      expect.arrayContaining([
        'kingsman_bentley_39',
        'travis_fpx_564tv_35k_deluxe',
        'travis_fpx_4237_cf_gsr2',
        'kozy_heat_nordik_41dv',
        'kingsman_hbzdv3628n',
        'travis_fpx_864tv_40k_deluxe',
        'kozy_heat_nordik_48tl',
        'heatilator_icon60_hargrove_woodland_timbers',
        'mendota_fv44i',
        'lopi_large_flush_wood_nexgen',
      ]),
    )
    expect(items).toHaveLength(10)
    expect(items).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ unitId: 'discontinued_example_unit' }),
        expect.objectContaining({ unitId: 'verification_required_example_unit' }),
        expect.objectContaining({ unitId: 'davinci_6030' }),
      ]),
    )
  })

  it('does not treat physical display as automatic customer recommendation eligibility', () => {
    const slot = registerRecords.find((record) => record.displaySlotId === 'front_showroom_p7')
    const manifest = manifests.find((record) => record.unitId === slot.currentUnitRef)
    const status = deriveManifestRecommendationStatus(manifest, slot)

    expect(status.displayed).toBe(true)
    expect(status.displayOnly).toBe(true)
    expect(status.activelyRecommendable).toBe(false)
    expect(status.blockedFromCustomerRecommendation).toBe(true)
  })

  it('keeps soft at-home measure badges customer-safe without blocking an active recommendable item', () => {
    // Kingsman Bentley 39 now lives at position 11 (per audit showroom register).
    // p14 is now the Heatilator + Hargrove Woodland Timbers teaching display.
    const slot = registerRecords.find((record) => record.displaySlotId === 'front_showroom_p11')
    const manifest = manifests.find((record) => record.unitId === slot.currentUnitRef)
    const status = deriveManifestRecommendationStatus(manifest, slot)
    const projection = projectV8CustomerSafe(manifest, slot)

    expect(status.activelyRecommendable).toBe(true)
    expect(projection.badges).toEqual(['Confirm details'])
    expect(projection.verificationItems).toEqual(
      expect.arrayContaining(['Wall context (interior vs exterior)', 'Vent routing']),
    )
    expect(scanCustomerSafeProjection(projection)).toEqual([])
  })

  it('separates display-only and verification-required records from active recommendations', () => {
    expect(getDisplayOnlyManifestItems(manifests, registerRecords).map((item) => item.unitId)).toEqual([
      'discontinued_example_unit',
    ])
    // verification-required now includes davinci_6030 (recommendable_with_verification status)
    // in addition to the two original example fixtures.
    expect(getVerificationRequiredManifestItems(manifests, registerRecords).map((item) => item.unitId)).toEqual(
      expect.arrayContaining([
        'discontinued_example_unit',
        'verification_required_example_unit',
        'davinci_6030',
      ]),
    )
    expect(getVerificationRequiredManifestItems(manifests, registerRecords)).toHaveLength(3)
  })

  it('triggers Needs Verification for all proof slice trigger families', () => {
    // Kingsman is the canonical "active recommendable" exemplar; it now lives at p11.
    const activeSlot = registerRecords.find((record) => record.displaySlotId === 'front_showroom_p11')
    const activeManifest = manifests.find((record) => record.unitId === activeSlot.currentUnitRef)
    const discontinuedSlot = registerRecords.find((record) => record.displaySlotId === 'front_showroom_p7')
    const discontinuedManifest = manifests.find((record) => record.unitId === discontinuedSlot.currentUnitRef)
    const missingFieldManifest = {
      ...activeManifest,
      customer: {
        ...activeManifest.customer,
        verifyAtHomeMeasure: [],
        shortDescription: undefined,
      },
    }

    expect(deriveCustomerBadges(activeManifest, activeSlot).verificationItems).toEqual(
      expect.arrayContaining(['Wall context (interior vs exterior)', 'Vent routing']),
    )
    expect(deriveCustomerBadges(discontinuedManifest, discontinuedSlot).verificationItems).toContain(
      'Showroom reference needs rep guidance',
    )
    expect(deriveCustomerBadges(missingFieldManifest, activeSlot).verificationItems).toContain(
      'Incomplete customer-facing product details',
    )
  })

  it('keeps banned internal terms out of the customer-safe projection', () => {
    for (const slot of registerRecords) {
      const manifest = manifests.find((record) => record.unitId === slot.currentUnitRef)
      const projection = projectV8CustomerSafe(manifest, slot)

      expect(scanCustomerSafeProjection(projection)).toEqual([])
    }
  })

  it('keeps banned terms out of customer-safe recommendable output', () => {
    const recommendableOutput = getRecommendableManifestItems(manifests, registerRecords).map((manifest) => {
      const slot = registerRecords.find((record) => record.currentUnitRef === manifest.unitId)
      return projectV8CustomerSafe(manifest, slot)
    })

    expect(scanCustomerSafeProjection(recommendableOutput)).toEqual([])
  })

  it('builds customer recommendation previews from the recommendable set only', () => {
    const previews = buildCustomerRecommendationPreviews(manifests, registerRecords)

    // 10 active-recommendable previews
    expect(previews).toHaveLength(10)
    expect(previews).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'kingsman_bentley_39',
          displayName: 'Kingsman Bentley 39',
          category: 'Fireplace',
          type: 'Gas',
          description: 'A practical traditional gas fireplace path.',
          showroomCue: 'Shown in the Front Showroom',
          badges: ['Confirm measurements'],
          measureNote: 'Confirm fit and vent path with your rep.',
        }),
      ]),
    )
    expect(JSON.stringify(previews)).not.toContain('discontinued_example_unit')
    expect(JSON.stringify(previews)).not.toContain('verification_required_example_unit')
    expect(JSON.stringify(previews)).not.toContain('davinci_6030')
    expect(JSON.stringify(previews)).not.toContain('Needs Verification')
    expect(scanCustomerSafeProjection(previews)).toEqual([])
  })

  it('builds a rep starting direction handoff from a selected customer-safe preview', () => {
    // First preview reflects load order in v8LoadData.js; kingsman_bentley_39 is imported first.
    const [preview] = buildCustomerRecommendationPreviews(manifests, registerRecords)
    const handoff = buildRepStartingDirectionHandoff(preview)

    expect(handoff).toEqual(
      expect.objectContaining({
        id: 'kingsman_bentley_39',
        displayName: 'Kingsman Bentley 39',
        category: 'Fireplace',
        type: 'Gas',
        customerSummary: 'A practical traditional gas fireplace path.',
        displayContext: 'Shown in the Front Showroom',
        recommendationNote: 'Use as starting direction.',
      }),
    )
    expect(handoff.verificationReminders).toEqual(
      expect.arrayContaining(['Measurements and site conditions need confirmation.', 'Product/model details need verification before quote.']),
    )
    expect(handoff.nextSteps).toEqual([
      'Confirm measurements and site conditions.',
      'Verify product/model details.',
      'Build official quote in BisTrack.',
    ])
    expect(scanCustomerSafeProjection(handoff)).toEqual([])
  })

  it('renders customer-safe recommendation cards without blocked items', () => {
    render(
      createElement(MemoryRouter, null, createElement(V8SliceIndex)),
    )

    expect(screen.getByText('Customer Recommendation Preview')).toBeInTheDocument()
    expect(screen.getByText('Kingsman Bentley 39')).toBeInTheDocument()
    // First-card details are still Kingsman-specific (it's first in load order)
    expect(screen.getAllByText('Confirm measurements').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Confirm fit and vent path with your rep.').length).toBeGreaterThan(0)
    // Blocked items must never appear
    expect(screen.queryByText('Legacy Traditional Gas Display')).not.toBeInTheDocument()
    expect(screen.queryByText('Verification Required Gas Fireplace')).not.toBeInTheDocument()
    expect(screen.queryByText('DaVinci 6030')).not.toBeInTheDocument()
    expect(screen.queryByText('Needs Verification')).not.toBeInTheDocument()
  })

  it('renders the rep handoff only after a starting direction is selected', () => {
    render(
      createElement(MemoryRouter, null, createElement(V8SliceIndex)),
    )

    expect(screen.queryByText('Rep handoff')).not.toBeInTheDocument()

    // First "Start with this direction" maps to the first preview = Kingsman (load order)
    const startButtons = screen.getAllByRole('button', { name: 'Start with this direction' })
    fireEvent.click(startButtons[0])

    const handoff = screen.getByText('Rep handoff').closest('section')
    expect(within(handoff).getByText('Kingsman Bentley 39')).toBeInTheDocument()
    expect(within(handoff).getByText('Use as starting direction.')).toBeInTheDocument()
    expect(within(handoff).getByText('Measurements and site conditions need confirmation.')).toBeInTheDocument()
    expect(within(handoff).getByText('Confirm measurements and site conditions.')).toBeInTheDocument()
    expect(within(handoff).getByText('Verify product/model details.')).toBeInTheDocument()
    expect(within(handoff).getByText('Build official quote in BisTrack.')).toBeInTheDocument()
    expect(scanCustomerSafeProjection(handoff.textContent)).toEqual([])
  })

  it('selects a customer-safe starting direction from preview cards', () => {
    render(
      createElement(MemoryRouter, null, createElement(V8SliceIndex)),
    )

    const startButtons = screen.getAllByRole('button', { name: 'Start with this direction' })
    fireEvent.click(startButtons[0])

    const panel = screen.getByText('Selected starting direction').closest('section')
    expect(within(panel).getByText('Kingsman Bentley 39')).toBeInTheDocument()
    expect(within(panel).getByText('Fireplace / Gas')).toBeInTheDocument()
    expect(within(panel).getByText("We'll use this as the starting direction and confirm fit/details with your rep.")).toBeInTheDocument()
    expect(within(panel).getByText('Confirm measurements')).toBeInTheDocument()
    expect(within(panel).queryByText('Rep handoff')).not.toBeInTheDocument()
    expect(within(panel).queryByText('Build official quote in BisTrack.')).not.toBeInTheDocument()
    expect(panel.textContent).not.toContain('Needs Verification')
    expect(scanCustomerSafeProjection(panel.textContent)).toEqual([])
  })

  it('changes the selected starting direction when another card is selected', () => {
    const fixturePreviews = [
      {
        id: 'first_safe_direction',
        displayName: 'First Safe Direction',
        category: 'Fireplace',
        type: 'Gas',
        description: 'A safe first path.',
        showroomCue: 'Shown in the Front Showroom',
        badges: ['Confirm measurements'],
        measureNote: 'Confirm fit and vent path with your rep.',
      },
      {
        id: 'second_safe_direction',
        displayName: 'Second Safe Direction',
        category: 'Fireplace',
        type: 'Wood',
        description: 'Another safe path.',
        showroomCue: null,
        badges: ['Confirm details'],
        measureNote: null,
      },
    ]

    render(createElement(CustomerRecommendationPreview, { previews: fixturePreviews }))

    const buttons = screen.getAllByRole('button', { name: 'Start with this direction' })
    fireEvent.click(buttons[0])
    expect(within(screen.getByText('Selected starting direction').closest('section')).getByText('First Safe Direction')).toBeInTheDocument()

    fireEvent.click(buttons[1])
    const panel = screen.getByText('Selected starting direction').closest('section')
    expect(within(panel).getByText('Second Safe Direction')).toBeInTheDocument()
    expect(within(panel).queryByText('First Safe Direction')).not.toBeInTheDocument()
    expect(within(panel).getByText('Fireplace / Wood')).toBeInTheDocument()
    expect(scanCustomerSafeProjection(panel.textContent)).toEqual([])

    const handoff = screen.getByText('Rep handoff').closest('section')
    expect(within(handoff).getByText('Second Safe Direction')).toBeInTheDocument()
    expect(within(handoff).queryByText('First Safe Direction')).not.toBeInTheDocument()
    expect(within(handoff).getByText('Confirm fit/details before quote.')).toBeInTheDocument()
    expect(scanCustomerSafeProjection(handoff.textContent)).toEqual([])
  })

  it('allows rep/backstage verification context without contaminating the customer projection', () => {
    const slot = registerRecords.find((record) => record.displaySlotId === 'front_showroom_p7')
    const manifest = manifests.find((record) => record.unitId === slot.currentUnitRef)
    const repProjection = projectV8RepBackstage(manifest, slot)
    const customerProjection = projectV8CustomerSafe(manifest, slot)

    expect(repProjection.internal.slot.recommendableOverrideReason).toContain('Discontinued line')
    expect(repProjection.verificationItems).toContain('Showroom reference needs rep guidance')
    expect(JSON.stringify(customerProjection)).not.toContain('Discontinued line')
  })

  it('reports manifest gap conditions that need review', () => {
    const health = buildV8ProofSliceHealth({ manifests, registerRecords, gapList })

    expect(health.gapListIssueCount).toBe(2)
    expect(health.missingCriticalFieldItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          unitId: 'discontinued_example_unit',
          missingFields: expect.arrayContaining(['shortDescription', 'sizeHuman', 'pricingBand']),
        }),
        expect.objectContaining({
          unitId: 'verification_required_example_unit',
          missingFields: ['shortDescription'],
        }),
      ]),
    )
    // 3 blocked = discontinued_example_unit + verification_required_example_unit + davinci_6030
    expect(health.blockedFromCustomerRecommendationCount).toBe(3)
    expect(gapList.entries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          encounteredAtSlot: 'back_showroom_p33',
          status: 'pending_review',
        }),
        expect.objectContaining({
          encounteredAtSlot: 'upstairs_p2',
          status: 'pending_review',
        }),
      ]),
    )
    expect(gapList.entries.every((entry) => entry.notes.length > 0)).toBe(true)
  })
})
