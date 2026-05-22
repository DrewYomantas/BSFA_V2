import { describe, expect, it } from 'vitest'
import {
  HEARTH_STUDIO_V9_GOAL_OPTIONS,
  buildHearthStudioV9CustomerCopy,
  buildHearthStudioV9SessionSummary,
  createInitialHearthStudioV9Session,
  selectHearthStudioV9Goal,
} from '../src/lib/hearthStudioV9/hearthStudioV9Session.js'
import { scanHearthStudioV9ShellCopy } from '../src/screens/hearth-studio-v9/HearthStudioV9Shell.jsx'

describe('Hearth Studio V9 session helper', () => {
  it('builds a deterministic empty session', () => {
    const session = createInitialHearthStudioV9Session()

    expect(session.selectedGoalId).toBeNull()
    expect(session.customerSummary).toEqual({
      goalDirection: 'Not selected yet',
      stillUnknown: [
        'Fireplace type',
        'Room fit',
        'Venting and measurements',
        'Hearth, mantel, and finish direction',
      ],
      finalSelectionState: 'No final selections yet.',
    })
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

  it('handles missing or unknown selections safely', () => {
    const initialSession = createInitialHearthStudioV9Session()
    const session = selectHearthStudioV9Goal(initialSession, 'unknown')

    expect(session.selectedGoalId).toBeNull()
    expect(session.selectedGoal).toBeNull()
    expect(session.customerSummary.goalDirection).toBe('Not selected yet')
    expect(buildHearthStudioV9CustomerCopy(session).response).toContain('Choose the first reason')
  })

  it('keeps the not-sure path reassuring and non-final', () => {
    const session = selectHearthStudioV9Goal(createInitialHearthStudioV9Session(), 'not_sure_yet')
    const copy = buildHearthStudioV9CustomerCopy(session)

    expect(copy.response).toContain('That is completely normal')
    expect(copy.response).toContain('narrowing the type of fireplace direction')
    expect(session.customerSummary.finalSelectionState).toBe('No final selections yet.')
  })

  it('does not produce banned customer-facing terms', () => {
    const sessions = [
      createInitialHearthStudioV9Session(),
      ...HEARTH_STUDIO_V9_GOAL_OPTIONS.map((option) => selectHearthStudioV9Goal(createInitialHearthStudioV9Session(), option.id)),
    ]

    sessions.forEach((session) => {
      const copy = [
        buildHearthStudioV9CustomerCopy(session).response,
        buildHearthStudioV9CustomerCopy(session).nextPromptPreview,
        buildHearthStudioV9SessionSummary(session).goalDirection,
        buildHearthStudioV9SessionSummary(session).finalSelectionState,
      ].join(' ')

      expect(scanHearthStudioV9ShellCopy(copy)).toEqual([])
    })
  })
})
