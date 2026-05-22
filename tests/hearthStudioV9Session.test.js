import { describe, expect, it } from 'vitest'
import {
  HEARTH_STUDIO_V9_CONTEXT_OPTIONS,
  HEARTH_STUDIO_V9_FIRE_EXPERIENCE_OPTIONS,
  HEARTH_STUDIO_V9_GOAL_OPTIONS,
  buildHearthStudioV9ContextCopy,
  buildHearthStudioV9CustomerCopy,
  buildHearthStudioV9FireExperienceCopy,
  buildHearthStudioV9SessionSummary,
  createInitialHearthStudioV9Session,
  selectHearthStudioV9Context,
  selectHearthStudioV9FireExperience,
  selectHearthStudioV9Goal,
} from '../src/lib/hearthStudioV9/hearthStudioV9Session.js'
import { scanHearthStudioV9ShellCopy } from '../src/screens/hearth-studio-v9/HearthStudioV9Shell.jsx'

describe('Hearth Studio V9 session helper', () => {
  it('builds a deterministic empty session', () => {
    const session = createInitialHearthStudioV9Session()

    expect(session.selectedGoalId).toBeNull()
    expect(session.selectedContextId).toBeNull()
    expect(session.selectedFireExperienceId).toBeNull()
    expect(session.customerSummary).toEqual({
      goalDirection: 'Not selected yet',
      projectContext: 'Not selected yet',
      fireExperience: 'Not selected yet',
      stillUnknown: [
        'Fireplace type',
        'Room fit',
        'Venting and measurements',
        'Hearth, mantel, and finish direction',
      ],
      contextUnknowns: [
        'Current setup details',
        'Room or outdoor area conditions',
        'What can stay or change',
      ],
      fireExperienceUnknowns: [
        'Preferred fire feel',
        'How often the fire will be used',
        'Flame look and daily ease',
      ],
      finalSelectionState: 'No final selections yet.',
    })
  })

  it('keeps project context out of the opening goal choices', () => {
    expect(HEARTH_STUDIO_V9_GOAL_OPTIONS.map((option) => option.label)).not.toContain('New construction or remodel')
    expect(HEARTH_STUDIO_V9_GOAL_OPTIONS.map((option) => option.label)).toContain('Easier to use')
    expect(HEARTH_STUDIO_V9_CONTEXT_OPTIONS.map((option) => option.label)).toContain('New construction or remodel')
  })

  it('selects every known goal into the customer summary', () => {
    const initialSession = createInitialHearthStudioV9Session()

    HEARTH_STUDIO_V9_GOAL_OPTIONS.forEach((option) => {
      const session = selectHearthStudioV9Goal(initialSession, option.id)
      const summary = buildHearthStudioV9SessionSummary(session)

      expect(session.selectedGoalId).toBe(option.id)
      expect(summary.goalDirection).toBe(option.shortLabel)
      expect(session.directionFinderSeed).toEqual(option.directionFinderSeed)
    })
  })

  it('selects every known context into the customer summary', () => {
    const sessionWithGoal = selectHearthStudioV9Goal(createInitialHearthStudioV9Session(), 'more_heat')

    HEARTH_STUDIO_V9_CONTEXT_OPTIONS.forEach((option) => {
      const session = selectHearthStudioV9Context(sessionWithGoal, option.id)
      const summary = buildHearthStudioV9SessionSummary(session)

      expect(session.selectedContextId).toBe(option.id)
      expect(summary.goalDirection).toBe('More heat')
      expect(summary.projectContext).toBe(option.shortLabel)
      expect(session.directionFinderSeed).toEqual({
        openingGoal: 'more_heat',
        ...option.directionFinderSeed,
      })
    })
  })

  it('selects every known fire experience into the customer summary', () => {
    const sessionWithContext = selectHearthStudioV9Context(
      selectHearthStudioV9Goal(createInitialHearthStudioV9Session(), 'more_heat'),
      'existing_masonry_fireplace',
    )

    HEARTH_STUDIO_V9_FIRE_EXPERIENCE_OPTIONS.forEach((option) => {
      const session = selectHearthStudioV9FireExperience(sessionWithContext, option.id)
      const summary = buildHearthStudioV9SessionSummary(session)

      expect(session.selectedFireExperienceId).toBe(option.id)
      expect(summary.goalDirection).toBe('More heat')
      expect(summary.projectContext).toBe('Existing masonry fireplace')
      expect(summary.fireExperience).toBe(option.shortLabel)
      expect(session.directionFinderSeed).toEqual({
        openingGoal: 'more_heat',
        projectContext: 'existing_masonry_fireplace',
        ...option.directionFinderSeed,
      })
    })
  })

  it('handles missing or unknown selections safely', () => {
    const initialSession = createInitialHearthStudioV9Session()
    const session = selectHearthStudioV9Goal(initialSession, 'unknown')
    const contextSession = selectHearthStudioV9Context(initialSession, 'unknown')
    const fireExperienceSession = selectHearthStudioV9FireExperience(initialSession, 'unknown')

    expect(session.selectedGoalId).toBeNull()
    expect(session.selectedGoal).toBeNull()
    expect(session.customerSummary.goalDirection).toBe('Not selected yet')
    expect(contextSession.selectedContextId).toBeNull()
    expect(contextSession.customerSummary.projectContext).toBe('Not selected yet')
    expect(fireExperienceSession.selectedFireExperienceId).toBeNull()
    expect(fireExperienceSession.customerSummary.fireExperience).toBe('Not selected yet')
    expect(buildHearthStudioV9CustomerCopy(session).response).toContain('Choose the first reason')
    expect(buildHearthStudioV9ContextCopy(contextSession).response).toContain('plain language')
    expect(buildHearthStudioV9FireExperienceCopy(fireExperienceSession).response).toContain('kind of fire')
  })

  it('keeps the not-sure path reassuring and non-final', () => {
    const session = selectHearthStudioV9Goal(createInitialHearthStudioV9Session(), 'not_sure_yet')
    const copy = buildHearthStudioV9CustomerCopy(session)

    expect(copy.response).toContain('That is completely normal')
    expect(copy.response).toContain('narrowing the type of fireplace direction')
    expect(session.customerSummary.finalSelectionState).toBe('No final selections yet.')
  })

  it('keeps the not-sure context path reassuring and non-technical', () => {
    const session = selectHearthStudioV9Context(createInitialHearthStudioV9Session(), 'not_sure_yet')
    const copy = buildHearthStudioV9ContextCopy(session)

    expect(copy.response).toContain('Identifying the current setup is part of the visit')
    expect(copy.nextPromptPreview).toContain('simple clues together')
    expect(session.customerSummary.finalSelectionState).toBe('No final selections yet.')
  })

  it('keeps the not-sure fire experience path reassuring', () => {
    const session = selectHearthStudioV9FireExperience(createInitialHearthStudioV9Session(), 'not_sure_yet')
    const copy = buildHearthStudioV9FireExperienceCopy(session)

    expect(copy.response).toContain('That is normal')
    expect(copy.response).toContain('You do not need to know')
    expect(session.customerSummary.finalSelectionState).toBe('No final selections yet.')
  })

  it('does not produce banned customer-facing terms', () => {
    const sessions = [
      createInitialHearthStudioV9Session(),
      ...HEARTH_STUDIO_V9_GOAL_OPTIONS.map((option) => selectHearthStudioV9Goal(createInitialHearthStudioV9Session(), option.id)),
      ...HEARTH_STUDIO_V9_CONTEXT_OPTIONS.map((option) => selectHearthStudioV9Context(createInitialHearthStudioV9Session(), option.id)),
      ...HEARTH_STUDIO_V9_FIRE_EXPERIENCE_OPTIONS.map((option) => selectHearthStudioV9FireExperience(createInitialHearthStudioV9Session(), option.id)),
    ]

    sessions.forEach((session) => {
      const copy = [
        buildHearthStudioV9CustomerCopy(session).response,
        buildHearthStudioV9CustomerCopy(session).nextPromptPreview,
        buildHearthStudioV9ContextCopy(session).response,
        buildHearthStudioV9ContextCopy(session).nextPromptPreview,
        buildHearthStudioV9FireExperienceCopy(session).response,
        buildHearthStudioV9FireExperienceCopy(session).nextPromptPreview,
        buildHearthStudioV9SessionSummary(session).goalDirection,
        buildHearthStudioV9SessionSummary(session).projectContext,
        buildHearthStudioV9SessionSummary(session).fireExperience,
        buildHearthStudioV9SessionSummary(session).finalSelectionState,
      ].join(' ')

      expect(scanHearthStudioV9ShellCopy(copy)).toEqual([])
    })
  })
})
