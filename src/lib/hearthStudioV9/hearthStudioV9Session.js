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

export const HEARTH_STUDIO_V9_FIRE_EXPERIENCE_OPTIONS = [
  {
    id: 'gas_convenience',
    label: 'Gas convenience',
    shortLabel: 'Gas convenience',
    response: 'That points us toward simple start-up, steady heat, and an easy daily fire experience.',
    nextPromptPreview: 'Next we will narrow how convenient the fire should feel and what kind of flame presence you like.',
    directionFinderSeed: { fireExperience: 'gas_convenience' },
  },
  {
    id: 'real_wood_feel',
    label: 'Real wood feel',
    shortLabel: 'Real wood feel',
    response: 'That keeps the conversation close to sound, smell, and the ritual of building a real wood fire.',
    nextPromptPreview: 'Next we will narrow which parts of the wood-fire feeling matter most to you.',
    directionFinderSeed: { fireExperience: 'real_wood_feel' },
  },
  {
    id: 'electric_simplicity',
    label: 'Electric simplicity',
    shortLabel: 'Electric simplicity',
    response: 'That can be a good fit when visual warmth matters more than a full fireplace project.',
    nextPromptPreview: 'Next we will narrow where visual warmth belongs and how simple the installation conversation should stay.',
    directionFinderSeed: { fireExperience: 'electric_simplicity' },
  },
  {
    id: 'outdoor_flame',
    label: 'Outdoor flame',
    shortLabel: 'Outdoor flame',
    response: 'That keeps the focus on the outdoor setting, how people gather, and what kind of flame feels inviting there.',
    nextPromptPreview: 'Next we will narrow how the outdoor area is used and what the flame should add to that space.',
    directionFinderSeed: { fireExperience: 'outdoor_flame' },
  },
  {
    id: 'best_looking_flame',
    label: 'Best-looking flame',
    shortLabel: 'Best-looking flame',
    response: 'That is a perfectly valid lead. We will focus on appearance first, then keep the practical details honest.',
    nextPromptPreview: 'Next we will narrow the flame look: quiet, dramatic, traditional, modern, or somewhere between.',
    directionFinderSeed: { fireExperience: 'best_looking_flame' },
  },
  {
    id: 'not_sure_yet',
    label: "I'm not sure yet",
    shortLabel: "I'm not sure yet",
    response: 'That is normal. You do not need to know the fuel answer before seeing and talking through the options.',
    nextPromptPreview: 'Next we will compare the feeling of the fire in plain language before narrowing the technical path.',
    directionFinderSeed: { fireExperience: 'not_sure_yet' },
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

const DEFAULT_FIRE_EXPERIENCE_UNKNOWNS = [
  'Preferred fire feel',
  'How often the fire will be used',
  'Flame look and daily ease',
]

export function createInitialHearthStudioV9Session() {
  return buildHearthStudioV9Session(null, null, null)
}

export function selectHearthStudioV9Goal(session, goalId) {
  const goal = HEARTH_STUDIO_V9_GOAL_OPTIONS.find((option) => option.id === goalId) ?? null

  return {
    ...buildHearthStudioV9Session(goal, session?.selectedContext, session?.selectedFireExperience),
    startedAt: session?.startedAt ?? null,
  }
}

export function selectHearthStudioV9Context(session, contextId) {
  const context = HEARTH_STUDIO_V9_CONTEXT_OPTIONS.find((option) => option.id === contextId) ?? null

  return {
    ...buildHearthStudioV9Session(session?.selectedGoal, context, session?.selectedFireExperience),
    startedAt: session?.startedAt ?? null,
  }
}

export function selectHearthStudioV9FireExperience(session, fireExperienceId) {
  const fireExperience = HEARTH_STUDIO_V9_FIRE_EXPERIENCE_OPTIONS.find((option) => option.id === fireExperienceId) ?? null

  return {
    ...buildHearthStudioV9Session(session?.selectedGoal, session?.selectedContext, fireExperience),
    startedAt: session?.startedAt ?? null,
  }
}

export function buildHearthStudioV9SessionSummary(session) {
  const goal = normalizeOption(session?.selectedGoal)
  const context = normalizeOption(session?.selectedContext)
  const fireExperience = normalizeOption(session?.selectedFireExperience)

  return {
    goalDirection: goal?.shortLabel ?? 'Not selected yet',
    projectContext: context?.shortLabel ?? 'Not selected yet',
    fireExperience: fireExperience?.shortLabel ?? 'Not selected yet',
    stillUnknown: [...DEFAULT_UNKNOWNS],
    contextUnknowns: [...DEFAULT_CONTEXT_UNKNOWNS],
    fireExperienceUnknowns: [...DEFAULT_FIRE_EXPERIENCE_UNKNOWNS],
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

export function buildHearthStudioV9FireExperienceCopy(session) {
  const fireExperience = normalizeOption(session?.selectedFireExperience)

  if (!fireExperience) {
    return {
      response: 'After the setup is named, we will talk about the kind of fire you picture living with.',
      nextPromptPreview: 'Next we will narrow convenience, wood feeling, visual warmth, or flame appearance.',
    }
  }

  return {
    response: fireExperience.response,
    nextPromptPreview: fireExperience.nextPromptPreview,
  }
}

function buildHearthStudioV9Session(goal, context, fireExperience) {
  const selectedGoal = normalizeOption(goal)
  const selectedContext = normalizeOption(context)
  const selectedFireExperience = normalizeOption(fireExperience)

  return {
    selectedGoalId: selectedGoal?.id ?? null,
    selectedGoal,
    selectedContextId: selectedContext?.id ?? null,
    selectedContext,
    selectedFireExperienceId: selectedFireExperience?.id ?? null,
    selectedFireExperience,
    unknowns: [...DEFAULT_UNKNOWNS],
    contextUnknowns: [...DEFAULT_CONTEXT_UNKNOWNS],
    fireExperienceUnknowns: [...DEFAULT_FIRE_EXPERIENCE_UNKNOWNS],
    directionFinderSeed: {
      ...(selectedGoal?.directionFinderSeed ?? {}),
      ...(selectedContext?.directionFinderSeed ?? {}),
      ...(selectedFireExperience?.directionFinderSeed ?? {}),
    },
    customerSummary: {
      goalDirection: selectedGoal?.shortLabel ?? 'Not selected yet',
      projectContext: selectedContext?.shortLabel ?? 'Not selected yet',
      fireExperience: selectedFireExperience?.shortLabel ?? 'Not selected yet',
      stillUnknown: [...DEFAULT_UNKNOWNS],
      contextUnknowns: [...DEFAULT_CONTEXT_UNKNOWNS],
      fireExperienceUnknowns: [...DEFAULT_FIRE_EXPERIENCE_UNKNOWNS],
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
