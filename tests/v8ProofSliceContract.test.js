import { describe, expect, it } from 'vitest'
import kingsman from '../src/data/v8/manifest/kingsman_bentley_39.json'
import p14 from '../src/data/v8/displayRegister/front_showroom_p14.json'
import { deriveCustomerBadges } from '../src/lib/v8DeriveCustomerBadges.js'
import { manifests, registerRecords, gapList } from '../src/lib/v8LoadData.js'
import {
  buildV8ProofSliceHealth,
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

    const synced = syncRegisterToManifest(staleManifest, [p14])

    expect(synced.rep.displayCallback).toBe(p14.rep.displayCallbackLanguage)
    expect(synced.internal.displayDisposition).toBe(p14.internal.displayDisposition)
    expect(synced.internal.displayPosition).toBe(p14.location.position)
    expect(synced.internal.displaySection).toBe(p14.location.zone)
  })

  it('proves the sample data has active recommendable and discontinued displayed records', () => {
    const health = buildV8ProofSliceHealth({ manifests, registerRecords, gapList })

    expect(health.totalManifestRecords).toBe(2)
    expect(health.totalDisplayRegisterRecords).toBe(2)
    expect(health.recordsSyncedFromDisplayRegister).toBe(2)
    expect(health.activeRecommendableDisplayedCount).toBeGreaterThanOrEqual(1)
    expect(health.discontinuedDisplayedCount).toBeGreaterThanOrEqual(1)
  })

  it('triggers Needs Verification for all proof slice trigger families', () => {
    const activeSlot = registerRecords.find((record) => record.displaySlotId === 'front_showroom_p14')
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
