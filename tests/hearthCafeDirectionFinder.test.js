import { describe, expect, it } from 'vitest'
import { gapList, manifests, registerRecords } from '../src/lib/v8LoadData.js'
import { customerBannedTerms } from '../src/lib/v8ProofSliceContract.js'
import {
  buildHearthCafeDirections,
  getHearthCafeSkippedRecords,
} from '../src/lib/hearthCafeDirectionFinder.js'

const defaultInput = {
  currentSetup: 'new_fireplace_wall',
  mainGoal: 'better_looking_room',
  styleDirection: 'traditional',
}

describe('Hearth Cafe direction finder', () => {
  it('returns 2-3 customer-safe directions when enough recommendable records exist', () => {
    const directions = buildHearthCafeDirections(defaultInput, { manifests, registerRecords })

    expect(directions.length).toBeGreaterThanOrEqual(2)
    expect(directions.length).toBeLessThanOrEqual(3)
    expect(directions[0]).toMatchObject({
      unitId: expect.any(String),
      displayName: expect.any(String),
      reason: expect.any(String),
      matchedSignals: expect.any(Array),
      nextActionText: expect.any(String),
      internalHandoff: expect.objectContaining({
        unitId: expect.any(String),
        displayName: expect.any(String),
      }),
    })
  })

  it('returns safe useful directions when the customer is not sure yet', () => {
    const directions = buildHearthCafeDirections({
      currentSetup: 'not_sure',
      mainGoal: 'not_sure',
      styleDirection: 'not_sure',
    }, { manifests, registerRecords })

    expect(directions).toHaveLength(3)
    expect(directions.every((direction) => direction.reason.length > 0)).toBe(true)
    expect(directions.every((direction) => direction.nextActionText.length > 0)).toBe(true)
  })

  it('excludes display-only records from primary customer recommendations', () => {
    const directions = buildHearthCafeDirections(defaultInput, { manifests, registerRecords })

    expect(directions.map((direction) => direction.unitId)).not.toContain('discontinued_example_unit')
  })

  it('excludes verification-required records from primary customer recommendations', () => {
    const directions = buildHearthCafeDirections({
      currentSetup: 'new_fireplace_wall',
      mainGoal: 'better_looking_room',
      styleDirection: 'premium_showpiece',
    }, { manifests, registerRecords })

    expect(directions.map((direction) => direction.unitId)).not.toContain('verification_required_example_unit')
    expect(directions.map((direction) => direction.unitId)).not.toContain('davinci_6030')
  })

  it('keeps the full output clear of customer-banned terms', () => {
    const directions = buildHearthCafeDirections(defaultInput, { manifests, registerRecords })
    const text = JSON.stringify(directions).toLowerCase()

    const leaks = customerBannedTerms.filter((term) => text.includes(term.toLowerCase()))
    expect(leaks).toEqual([])
  })

  it('includes a showroom cue when display data is available', () => {
    const directions = buildHearthCafeDirections(defaultInput, { manifests, registerRecords })

    expect(directions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          showroomCue: expect.stringContaining('Front Showroom'),
          nextActionText: expect.stringContaining('front showroom'),
        }),
      ]),
    )
  })

  it('is deterministic for the same inputs and data', () => {
    const first = buildHearthCafeDirections(defaultInput, { manifests, registerRecords })
    const second = buildHearthCafeDirections(defaultInput, { manifests, registerRecords })

    expect(second).toEqual(first)
  })

  it('reports records skipped by customer-safety filters', () => {
    const skipped = getHearthCafeSkippedRecords({ manifests, registerRecords, gapList })

    expect(skipped.displayOnly.map((item) => item.unitId)).toEqual(['discontinued_example_unit'])
    expect(skipped.verificationRequired.map((item) => item.unitId)).toEqual(
      expect.arrayContaining(['verification_required_example_unit', 'davinci_6030']),
    )
    expect(skipped.pendingReview.map((item) => item.encounteredAtSlot)).toEqual(['back_showroom_p33', 'upstairs_p2'])
  })
})
