import { describe, expect, it } from 'vitest'
import { gapList, manifests, registerRecords } from '../src/lib/v8LoadData.js'
import { customerBannedTerms } from '../src/lib/v8ProofSliceContract.js'
import {
  buildHearthCafeDirections,
  getHearthCafeInputDiagnostics,
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

  it('preserves backward compatibility when fire experience is omitted', () => {
    const directions = buildHearthCafeDirections(defaultInput, { manifests, registerRecords })
    const diagnostics = getHearthCafeInputDiagnostics(defaultInput)

    expect(directions).toHaveLength(3)
    expect(diagnostics.normalizedInput.fireExperience).toBe('not_sure')
  })

  it('uses native gas fire experience as a small matching signal', () => {
    const directions = buildHearthCafeDirections({
      currentSetup: 'new_fireplace_wall',
      mainGoal: 'not_sure',
      fireExperience: 'gas_convenience',
    }, { manifests, registerRecords })

    expect(directions).toHaveLength(3)
    expect(directions.some((direction) => direction.matchedSignals.includes('fire:gas_convenience'))).toBe(true)
  })

  it('uses native real wood fire experience without requiring a style direction', () => {
    const directions = buildHearthCafeDirections({
      currentSetup: 'insert_upgrade',
      mainGoal: 'not_sure',
      fireExperience: 'real_wood_feel',
    }, { manifests, registerRecords })

    expect(directions).toHaveLength(3)
    expect(directions.some((direction) => direction.matchedSignals.includes('fire:real_wood_feel'))).toBe(true)
  })

  it('does not over-constrain results when fire experience is not sure', () => {
    const directions = buildHearthCafeDirections({
      currentSetup: 'not_sure',
      mainGoal: 'not_sure',
      fireExperience: 'not_sure',
    }, { manifests, registerRecords })

    expect(directions).toHaveLength(3)
    expect(directions.flatMap((direction) => direction.matchedSignals)).not.toContain('fire:not_sure')
  })

  it('returns safe diagnostics for fire experiences not represented in the current direction set', () => {
    const electricDiagnostics = getHearthCafeInputDiagnostics({ fireExperience: 'electric_simplicity' })
    const outdoorDiagnostics = getHearthCafeInputDiagnostics({ fireExperience: 'outdoor_flame' })
    const electricDirections = buildHearthCafeDirections({
      currentSetup: 'not_sure',
      mainGoal: 'not_sure',
      fireExperience: 'electric_simplicity',
    }, { manifests, registerRecords })

    expect(electricDiagnostics.unsupportedFireExperience).toEqual({
      fireExperience: 'electric_simplicity',
      message: 'Electric simplicity is not represented in the current reviewed direction set yet.',
    })
    expect(outdoorDiagnostics.unsupportedFireExperience).toEqual({
      fireExperience: 'outdoor_flame',
      message: 'Outdoor flame is not represented in the current reviewed direction set yet.',
    })
    expect(electricDirections).toHaveLength(3)
    expect(electricDirections.flatMap((direction) => direction.matchedSignals)).not.toContain('fire:electric_simplicity')
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
