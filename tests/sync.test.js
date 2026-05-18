import { describe, expect, it } from 'vitest'
import kingsman from '../src/data/v8/manifest/kingsman_bentley_39.json'
import discontinued from '../src/data/v8/manifest/discontinued_example_unit.json'
import p14 from '../src/data/v8/displayRegister/front_showroom_p14.json'
import p7 from '../src/data/v8/displayRegister/front_showroom_p7.json'
import { syncRegisterToManifest } from '../src/lib/v8SyncRegisterToManifest.js'

describe('V8 register sync', () => {
  it('derives active display fields from the matching register record', () => {
    const synced = syncRegisterToManifest(kingsman, [p14])

    expect(synced.internal.displayDisposition).toBe('active_display')
    expect(synced.internal.displayPosition).toBe(14)
    expect(synced.internal.displaySection).toBe('front_showroom')
    expect(synced.rep.displayCallback).toBe(p14.rep.displayCallbackLanguage)
  })

  it('derives discontinued display fields independently of recommendable status', () => {
    const synced = syncRegisterToManifest(discontinued, [p7])

    expect(synced.internal.displayDisposition).toBe('discontinued_display')
    expect(synced.internal.displayPosition).toBe(7)
    expect(synced.internal.displaySection).toBe('front_showroom')
  })

  it('returns null derived fields when there is no display', () => {
    const synced = syncRegisterToManifest(kingsman, [])

    expect(synced.internal.displayDisposition).toBeNull()
    expect(synced.internal.displayPosition).toBeNull()
    expect(synced.internal.displaySection).toBeNull()
    expect(synced.rep.displayCallback).toBeNull()
  })

  it('does not sync from a mismatched slot', () => {
    const synced = syncRegisterToManifest(kingsman, [p7])

    expect(synced.internal.displayDisposition).toBeNull()
    expect(synced.internal.displayPosition).toBeNull()
    expect(synced.internal.displaySection).toBeNull()
    expect(synced.rep.displayCallback).toBeNull()
  })
})
