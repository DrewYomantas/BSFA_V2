import { buildHearthCafeDirections } from '../hearthCafeDirectionFinder.js'

const requiredSelections = [
  { key: 'selectedGoalId', label: 'Goal direction' },
  { key: 'selectedContextId', label: 'Project setup' },
  { key: 'selectedFireExperienceId', label: 'Fire experience' },
]

const goalToMainGoal = {
  more_heat: 'more_heat',
  less_mess: 'easier_fire',
  better_looking_fireplace: 'better_looking_room',
  real_wood_feel: 'real_wood_feel',
  easier_to_use: 'easier_fire',
  not_sure_yet: 'not_sure',
}

const contextToCurrentSetup = {
  existing_masonry_fireplace: 'existing_fireplace',
  factory_built_fireplace: 'existing_fireplace',
  wood_stove: 'insert_upgrade',
  new_construction_or_remodel: 'new_fireplace_wall',
  outdoor_fireplace_area: 'not_sure',
  not_sure_yet: 'not_sure',
}

const fireExperienceToNativeInput = {
  gas_convenience: 'gas_convenience',
  real_wood_feel: 'real_wood_feel',
  electric_simplicity: 'electric_simplicity',
  outdoor_flame: 'outdoor_flame',
  best_looking_flame: 'best_looking_flame',
  not_sure_yet: 'not_sure',
}

export function buildHearthStudioV9DirectionBridge(session = {}) {
  const missingInputs = requiredSelections
    .filter((selection) => !session?.[selection.key])
    .map((selection) => selection.label)

  const mappedInput = {
    currentSetup: mapValue(contextToCurrentSetup, session.selectedContextId),
    mainGoal: mapValue(goalToMainGoal, session.selectedGoalId),
    fireExperience: mapValue(fireExperienceToNativeInput, session.selectedFireExperienceId),
  }

  return {
    canRunDirectionFinder: missingInputs.length === 0,
    missingInputs,
    mappedInput,
    sourceSelections: {
      selectedGoalId: session.selectedGoalId ?? null,
      selectedContextId: session.selectedContextId ?? null,
      selectedFireExperienceId: session.selectedFireExperienceId ?? null,
    },
    seed: {
      ...(session.directionFinderSeed ?? {}),
    },
    unknownPaths: buildUnknownPaths(session),
    customerSafeSummary: {
      goalDirection: session.customerSummary?.goalDirection ?? 'Not selected yet',
      projectContext: session.customerSummary?.projectContext ?? 'Not selected yet',
      fireExperience: session.customerSummary?.fireExperience ?? 'Not selected yet',
      finalSelectionState: session.customerSummary?.finalSelectionState ?? 'No final selections yet.',
    },
    internalNotes: [
      'Bridge maps V9 seated prompt state into the headless input shape.',
      'Fire experience is passed through as a native input.',
      'Direction output is intentionally not rendered in the V9 shell.',
    ],
  }
}

export function buildHearthStudioV9DirectionCompatibility(session = {}, data = {}) {
  const bridge = buildHearthStudioV9DirectionBridge(session)

  if (!bridge.canRunDirectionFinder) {
    return {
      canRunDirectionFinder: false,
      directionCount: 0,
      mappedInput: bridge.mappedInput,
      missingInputs: bridge.missingInputs,
    }
  }

  const directions = buildHearthCafeDirections(bridge.mappedInput, data)

  return {
    canRunDirectionFinder: true,
    directionCount: directions.length,
    mappedInput: bridge.mappedInput,
    missingInputs: [],
  }
}

function mapValue(map, key) {
  if (!key) {
    return 'not_sure'
  }

  return map[key] ?? 'not_sure'
}

function buildUnknownPaths(session) {
  return [
    ...(session.unknowns ?? []),
    ...(session.contextUnknowns ?? []),
    ...(session.fireExperienceUnknowns ?? []),
  ]
}
