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
    id: 'easier_to_use',
    label: 'Easier to use',
    shortLabel: 'Easier to use',
    response: 'That gives us a practical direction. We will focus on what should feel simpler, calmer, and easier to enjoy.',
    nextPromptPreview: 'Next we will narrow what would make the fireplace easier: starting, controlling, cleaning, or living with it day to day.',
    directionFinderSeed: { openingGoal: 'easier_to_use' },
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

export const HEARTH_STUDIO_V9_CONTEXT_OPTIONS = [
  {
    id: 'existing_masonry_fireplace',
    label: 'Existing masonry fireplace',
    shortLabel: 'Existing masonry fireplace',
    response: 'That gives us a helpful starting point. We will still confirm the opening, the room, and the right path before anything is final.',
    nextPromptPreview: 'Next we will narrow what is staying, what may change, and what should be confirmed in person.',
    directionFinderSeed: { projectContext: 'existing_masonry_fireplace' },
  },
  {
    id: 'factory_built_fireplace',
    label: 'Factory-built fireplace',
    shortLabel: 'Factory-built fireplace',
    response: 'Good to know. We will keep the conversation broad until the current unit and room details are understood.',
    nextPromptPreview: 'Next we will narrow what is there now and what kind of change the room can support.',
    directionFinderSeed: { projectContext: 'factory_built_fireplace' },
  },
  {
    id: 'wood_stove',
    label: 'Wood stove',
    shortLabel: 'Wood stove',
    response: 'That helps us frame the visit around how the fire lives in the room, not just what it looks like.',
    nextPromptPreview: 'Next we will narrow comfort, placement, daily use, and what you want to keep or change.',
    directionFinderSeed: { projectContext: 'wood_stove' },
  },
  {
    id: 'new_construction_or_remodel',
    label: 'New construction or remodel',
    shortLabel: 'New construction or remodel',
    response: 'That sets the project frame. We will keep this conversational until the room, wall, and timeline are clearer.',
    nextPromptPreview: 'Next we will narrow whether this is a new opening, an existing fireplace, or a room being redesigned.',
    directionFinderSeed: { projectContext: 'new_construction_or_remodel' },
  },
  {
    id: 'outdoor_fireplace_area',
    label: 'Outdoor fireplace area',
    shortLabel: 'Outdoor fireplace area',
    response: 'That gives the conversation a different setting. We will keep the first pass focused on the space and how you want to use it.',
    nextPromptPreview: 'Next we will narrow where the fire sits, how the area is used, and what should feel comfortable outside.',
    directionFinderSeed: { projectContext: 'outdoor_fireplace_area' },
  },
  {
    id: 'not_sure_yet',
    label: "I'm not sure yet",
    shortLabel: "I'm not sure yet",
    response: 'That is okay. Identifying the current setup is part of the visit, and we can start with plain observations.',
    nextPromptPreview: 'Next we will look for simple clues together: where the fire is, what surrounds it, and what you want to change.',
    directionFinderSeed: { projectContext: 'not_sure_yet' },
  },
]

const DEFAULT_UNKNOWNS = [
  'Fireplace type',
  'Room fit',
  'Venting and measurements',
  'Hearth, mantel, and finish direction',
]

const DEFAULT_CONTEXT_UNKNOWNS = [
  'Current setup details',
  'Room or outdoor area conditions',
  'What can stay or change',
]

export function createInitialHearthStudioV9Session() {
  return buildHearthStudioV9Session(null, null)
}

export function selectHearthStudioV9Goal(session, goalId) {
  const goal = HEARTH_STUDIO_V9_GOAL_OPTIONS.find((option) => option.id === goalId) ?? null

  return {
    ...buildHearthStudioV9Session(goal, session?.selectedContext),
    startedAt: session?.startedAt ?? null,
  }
}

export function selectHearthStudioV9Context(session, contextId) {
  const context = HEARTH_STUDIO_V9_CONTEXT_OPTIONS.find((option) => option.id === contextId) ?? null

  return {
    ...buildHearthStudioV9Session(session?.selectedGoal, context),
    startedAt: session?.startedAt ?? null,
  }
}

export function buildHearthStudioV9SessionSummary(session) {
  const goal = normalizeOption(session?.selectedGoal)
  const context = normalizeOption(session?.selectedContext)

  return {
    goalDirection: goal?.shortLabel ?? 'Not selected yet',
    projectContext: context?.shortLabel ?? 'Not selected yet',
    stillUnknown: [...DEFAULT_UNKNOWNS],
    contextUnknowns: [...DEFAULT_CONTEXT_UNKNOWNS],
    finalSelectionState: 'No final selections yet.',
  }
}

export function buildHearthStudioV9CustomerCopy(session) {
  const goal = normalizeOption(session?.selectedGoal)

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

export function buildHearthStudioV9ContextCopy(session) {
  const context = normalizeOption(session?.selectedContext)

  if (!context) {
    return {
      response: 'Once the first direction is chosen, we will name the setup in plain language.',
      nextPromptPreview: 'Next we will narrow what kind of fireplace situation we are starting with.',
    }
  }

  return {
    response: context.response,
    nextPromptPreview: context.nextPromptPreview,
  }
}

function buildHearthStudioV9Session(goal, context) {
  const selectedGoal = normalizeOption(goal)
  const selectedContext = normalizeOption(context)

  return {
    selectedGoalId: selectedGoal?.id ?? null,
    selectedGoal,
    selectedContextId: selectedContext?.id ?? null,
    selectedContext,
    unknowns: [...DEFAULT_UNKNOWNS],
    contextUnknowns: [...DEFAULT_CONTEXT_UNKNOWNS],
    directionFinderSeed: {
      ...(selectedGoal?.directionFinderSeed ?? {}),
      ...(selectedContext?.directionFinderSeed ?? {}),
    },
    customerSummary: {
      goalDirection: selectedGoal?.shortLabel ?? 'Not selected yet',
      projectContext: selectedContext?.shortLabel ?? 'Not selected yet',
      stillUnknown: [...DEFAULT_UNKNOWNS],
      contextUnknowns: [...DEFAULT_CONTEXT_UNKNOWNS],
      finalSelectionState: 'No final selections yet.',
    },
  }
}

function normalizeOption(option) {
  if (!option) {
    return null
  }

  return {
    id: option.id,
    label: option.label,
    shortLabel: option.shortLabel,
    response: option.response,
    nextPromptPreview: option.nextPromptPreview,
    directionFinderSeed: { ...option.directionFinderSeed },
  }
}
