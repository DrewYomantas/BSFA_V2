import { describe, expect, it } from 'vitest'
import { manifests, registerRecords } from '../src/lib/v8LoadData.js'
import {
  buildHearthStudioV9DirectionBridge,
  buildHearthStudioV9DirectionCompatibility,
} from '../src/lib/hearthStudioV9/hearthStudioV9DirectionBridge.js'
import {
  createInitialHearthStudioV9Session,
  selectHearthStudioV9Context,
  selectHearthStudioV9FireExperience,
  selectHearthStudioV9Goal,
} from '../src/lib/hearthStudioV9/hearthStudioV9Session.js'
import { scanHearthStudioV9ShellCopy } from '../src/screens/hearth-studio-v9/HearthStudioV9Shell.jsx'

describe('Hearth Studio V9 direction bridge', () => {
  it('returns missing inputs before required selections exist', () => {
    const bridge = buildHearthStudioV9DirectionBridge(createInitialHearthStudioV9Session())

    expect(bridge.canRunDirectionFinder).toBe(false)
    expect(bridge.missingInputs).toEqual(['Goal direction', 'Project setup', 'Fire experience'])
    expect(bridge.mappedInput).toEqual({
      currentSetup: 'not_sure',
      mainGoal: 'not_sure',
      fireExperience: 'not_sure',
    })
  })

  it('maps selected goal, context, and fire experience deterministically', () => {
    const session = buildCompleteSession('more_heat', 'existing_masonry_fireplace', 'gas_convenience')
    const bridge = buildHearthStudioV9DirectionBridge(session)

    expect(bridge.canRunDirectionFinder).toBe(true)
    expect(bridge.missingInputs).toEqual([])
    expect(bridge.mappedInput).toEqual({
      currentSetup: 'existing_fireplace',
      mainGoal: 'more_heat',
      fireExperience: 'gas_convenience',
    })
    expect(bridge.mappedInput).not.toHaveProperty('styleDirection')
    expect(bridge.seed).toEqual({
      openingGoal: 'more_heat',
      projectContext: 'existing_masonry_fireplace',
      fireExperience: 'gas_convenience',
    })
    expect(bridge.customerSafeSummary).toMatchObject({
      goalDirection: 'More heat',
      projectContext: 'Existing masonry fireplace',
      fireExperience: 'Gas convenience',
    })
  })

  it('only reports ready after goal, context, and fire experience are selected', () => {
    const goalOnly = selectHearthStudioV9Goal(createInitialHearthStudioV9Session(), 'more_heat')
    const goalAndContext = selectHearthStudioV9Context(goalOnly, 'existing_masonry_fireplace')
    const complete = selectHearthStudioV9FireExperience(goalAndContext, 'gas_convenience')

    expect(buildHearthStudioV9DirectionBridge(goalOnly).canRunDirectionFinder).toBe(false)
    expect(buildHearthStudioV9DirectionBridge(goalAndContext).canRunDirectionFinder).toBe(false)
    expect(buildHearthStudioV9DirectionBridge(complete).canRunDirectionFinder).toBe(true)
  })

  it('can call the headless direction finder in a pure compatibility path without returning directions', () => {
    const session = buildCompleteSession('better_looking_fireplace', 'new_construction_or_remodel', 'best_looking_flame')
    const compatibility = buildHearthStudioV9DirectionCompatibility(session, { manifests, registerRecords })

    expect(compatibility.canRunDirectionFinder).toBe(true)
    expect(compatibility.directionCount).toBeGreaterThan(0)
    expect(compatibility).not.toHaveProperty('directions')
    expect(compatibility.mappedInput).toEqual({
      currentSetup: 'new_fireplace_wall',
      mainGoal: 'better_looking_room',
      fireExperience: 'best_looking_flame',
    })
    expect(compatibility.mappedInput).not.toHaveProperty('styleDirection')
  })

  it('keeps bridge summaries and mapped input clear of banned customer-facing terms', () => {
    const bridge = buildHearthStudioV9DirectionBridge(buildCompleteSession('less_mess', 'factory_built_fireplace', 'electric_simplicity'))
    const visibleDiagnosticText = JSON.stringify({
      canRunDirectionFinder: bridge.canRunDirectionFinder,
      missingInputs: bridge.missingInputs,
      mappedInput: bridge.mappedInput,
      customerSafeSummary: bridge.customerSafeSummary,
    })

    expect(scanHearthStudioV9ShellCopy(visibleDiagnosticText)).toEqual([])
  })
})

function buildCompleteSession(goalId, contextId, fireExperienceId) {
  return selectHearthStudioV9FireExperience(
    selectHearthStudioV9Context(
      selectHearthStudioV9Goal(createInitialHearthStudioV9Session(), goalId),
      contextId,
    ),
    fireExperienceId,
  )
}
