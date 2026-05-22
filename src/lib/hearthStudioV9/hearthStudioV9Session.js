export const HEARTH_STUDIO_V9_GOAL_OPTIONS = [
  {
    id: 'more_heat',
    label: 'More heat',
    shortLabel: 'More heat',
    response: 'Good. We will focus the showroom walk on comfort, control, and how the room should feel when the fire is on.',
    nextPromptPreview: 'Next we will narrow how much warmth the room needs and whether this is everyday heat or atmosphere.',
    directionFinderSeed: { openingGoal: 'more_heat' },
  },
  {
    id: 'less_mess',
    label: 'Less mess',
    shortLabel: 'Less mess',
    response: 'That is a clear starting point. We will talk through easier fire, simpler cleanup, and what you want to stop dealing with.',
    nextPromptPreview: 'Next we will narrow what feels messy today: wood handling, ash, smoke, upkeep, or starting the fire.',
    directionFinderSeed: { openingGoal: 'less_mess' },
  },
  {
    id: 'better_looking_fireplace',
    label: 'Better looking fireplace',
    shortLabel: 'Better looking fireplace',
    response: 'Great. We will use the sit to understand the room first, then the walk can focus on looks that feel right in person.',
    nextPromptPreview: 'Next we will narrow the room feeling: classic, cleaner, warmer, more dramatic, or quieter.',
    directionFinderSeed: { openingGoal: 'better_looking_fireplace' },
  },
  {
    id: 'real_wood_feel',
    label: 'Real wood feel',
    shortLabel: 'Real wood feel',
    response: 'Perfect starting point. We will keep the conversation centered on flame character, ritual, and what should feel real.',
    nextPromptPreview: 'Next we will narrow whether the priority is flame look, heat, sound, scent, or the whole fire-making ritual.',
    directionFinderSeed: { openingGoal: 'real_wood_feel' },
  },
  {
    id: 'new_construction_or_remodel',
    label: 'New construction or remodel',
    shortLabel: 'New construction or remodel',
    response: 'That helps set the frame. We will keep this broad until the room, wall, and project timing are clearer.',
    nextPromptPreview: 'Next we will narrow whether this is a new opening, an existing fireplace, or a room being redesigned.',
    directionFinderSeed: { openingGoal: 'new_construction_or_remodel' },
  },
  {
    id: 'not_sure_yet',
    label: "I'm not sure yet",
    shortLabel: "I'm not sure yet",
    response: 'That is completely normal. The first step is simply narrowing the type of fireplace direction together.',
    nextPromptPreview: 'Next we will start broad: what you have now, what bothers you, and what would make the room feel better.',
    directionFinderSeed: { openingGoal: 'not_sure_yet' },
  },
]

const DEFAULT_UNKNOWNS = [
  'Fireplace type',
  'Room fit',
  'Venting and measurements',
  'Hearth, mantel, and finish direction',
]

export function createInitialHearthStudioV9Session() {
  return buildHearthStudioV9Session(null)
}

export function selectHearthStudioV9Goal(session, goalId) {
  const goal = HEARTH_STUDIO_V9_GOAL_OPTIONS.find((option) => option.id === goalId) ?? null

  return {
    ...buildHearthStudioV9Session(goal),
    startedAt: session?.startedAt ?? null,
  }
}

export function buildHearthStudioV9SessionSummary(session) {
  const goal = normalizeGoal(session?.selectedGoal)

  return {
    goalDirection: goal?.shortLabel ?? 'Not selected yet',
    stillUnknown: [...DEFAULT_UNKNOWNS],
    finalSelectionState: 'No final selections yet.',
  }
}

export function buildHearthStudioV9CustomerCopy(session) {
  const goal = normalizeGoal(session?.selectedGoal)

  if (!goal) {
    return {
      response: 'Choose the first reason that feels closest. We can keep it broad.',
      nextPromptPreview: 'Next we will narrow the room, the current fireplace, and the feeling you want from the fire.',
    }
  }

  return {
    response: goal.response,
    nextPromptPreview: goal.nextPromptPreview,
  }
}

function buildHearthStudioV9Session(goal) {
  const selectedGoal = normalizeGoal(goal)

  return {
    selectedGoalId: selectedGoal?.id ?? null,
    selectedGoal,
    unknowns: [...DEFAULT_UNKNOWNS],
    directionFinderSeed: selectedGoal?.directionFinderSeed ?? null,
    customerSummary: {
      goalDirection: selectedGoal?.shortLabel ?? 'Not selected yet',
      stillUnknown: [...DEFAULT_UNKNOWNS],
      finalSelectionState: 'No final selections yet.',
    },
  }
}

function normalizeGoal(goal) {
  if (!goal) {
    return null
  }

  return {
    id: goal.id,
    label: goal.label,
    shortLabel: goal.shortLabel,
    response: goal.response,
    nextPromptPreview: goal.nextPromptPreview,
    directionFinderSeed: { ...goal.directionFinderSeed },
  }
}
