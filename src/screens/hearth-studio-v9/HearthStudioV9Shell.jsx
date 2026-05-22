import { useMemo, useState } from 'react'
import './HearthStudioV9Shell.css'
import {
  HEARTH_STUDIO_V9_CONTEXT_OPTIONS,
  HEARTH_STUDIO_V9_FIRE_EXPERIENCE_OPTIONS,
  HEARTH_STUDIO_V9_GOAL_OPTIONS,
  buildHearthStudioV9ContextCopy,
  buildHearthStudioV9CustomerCopy,
  buildHearthStudioV9FireExperienceCopy,
  createInitialHearthStudioV9Session,
  selectHearthStudioV9Context,
  selectHearthStudioV9FireExperience,
  selectHearthStudioV9Goal,
} from '../../lib/hearthStudioV9/hearthStudioV9Session.js'
import { buildHearthStudioV9DirectionBridge } from '../../lib/hearthStudioV9/hearthStudioV9DirectionBridge.js'

const bannedShellTerms = [
  'cost',
  'margin',
  'spiff',
  'OCR',
  'confidence',
  'source confidence',
  'Needs Verification',
  'needs verification',
  'needs review',
  'BisTrack',
  'shop readiness',
  'shop ready',
  'internal notes',
  'needs_review',
]

export default function HearthStudioV9Shell() {
  const [session, setSession] = useState(() => createInitialHearthStudioV9Session())
  const customerCopy = useMemo(() => buildHearthStudioV9CustomerCopy(session), [session])
  const contextCopy = useMemo(() => buildHearthStudioV9ContextCopy(session), [session])
  const fireExperienceCopy = useMemo(() => buildHearthStudioV9FireExperienceCopy(session), [session])
  const directionBridge = useMemo(() => buildHearthStudioV9DirectionBridge(session), [session])
  const summary = session.customerSummary
  const activePrompt = buildActivePrompt({
    session,
    customerCopy,
    contextCopy,
    fireExperienceCopy,
    handleGoalSelection,
    handleContextSelection,
    handleFireExperienceSelection,
  })
  const stageMoodClass = buildStageMoodClass(session)
  const primaryUnknowns = [
    summary.stillUnknown[0],
    summary.contextUnknowns[0],
    summary.fireExperienceUnknowns[0],
  ].filter(Boolean)

  function handleGoalSelection(goalId) {
    setSession((currentSession) => selectHearthStudioV9Goal(currentSession, goalId))
  }

  function handleContextSelection(contextId) {
    setSession((currentSession) => selectHearthStudioV9Context(currentSession, contextId))
  }

  function handleFireExperienceSelection(fireExperienceId) {
    setSession((currentSession) => selectHearthStudioV9FireExperience(currentSession, fireExperienceId))
  }

  return (
    <main className="v9-shell" aria-label="Hearth Studio V9 customer preview">
      <section className="v9-shell__tablet" aria-label="Stage-first Hearth Studio tablet">
        <header className="v9-shell__topbar">
          <div className="v9-shell__brand" aria-label="Benson Stone Hearth Studio">
            <span className="v9-shell__monogram" aria-hidden="true">B</span>
            <span>Benson Stone</span>
          </div>
          <div className="v9-shell__title">
            <span>Hearth Studio V9</span>
            <strong>Hearth Cafe Sit</strong>
          </div>
          <nav className="v9-shell__rhythm" aria-label="Hearth Studio preview stages">
            <span className="v9-shell__rhythm-step v9-shell__rhythm-step--active">Sit</span>
            <span className="v9-shell__rhythm-step">Walk</span>
            <span className="v9-shell__rhythm-step">Confirm</span>
          </nav>
        </header>

        <div className="v9-shell__workspace">
          <section className="v9-shell__stage-column">
            <div className={stageMoodClass} aria-label="Fireplace room stage">
              <div className="v9-shell__room-glow" aria-hidden="true" />
              <div className="v9-shell__back-wall" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="v9-shell__fireplace-mass" aria-hidden="true">
                <div className="v9-shell__stone-course v9-shell__stone-course--top" />
                <div className="v9-shell__mantel" />
                <div className="v9-shell__firebox">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="v9-shell__hearth" />
              </div>
              <div className="v9-shell__floor-plane" aria-hidden="true" />
              <div className="v9-shell__seat-shadow" aria-hidden="true" />

              <div className="v9-shell__stage-caption">
                <p>Seated showroom preview</p>
                <h1>Start with the room. Narrow the fire together.</h1>
                <div className="v9-shell__stage-chips" aria-label="Current seated choices">
                  <span>{summary.goalDirection}</span>
                  <span>{summary.projectContext}</span>
                  <span>{summary.fireExperience}</span>
                </div>
              </div>
            </div>

            <aside className="v9-shell__summary-strip" aria-label="Customer-safe session summary">
              <div>
                <span>Goal</span>
                <strong>{summary.goalDirection}</strong>
              </div>
              <div>
                <span>Setup</span>
                <strong>{summary.projectContext}</strong>
              </div>
              <div>
                <span>Fire feel</span>
                <strong>{summary.fireExperience}</strong>
              </div>
              <p>{summary.finalSelectionState}</p>
            </aside>
          </section>

          <aside className="v9-shell__conversation" aria-label="Hearth Cafe conversation tray">
            <div className="v9-shell__progress" aria-label="Hearth Cafe Sit progress">
              <span className={session.selectedGoalId ? 'v9-shell__progress-step v9-shell__progress-step--complete' : 'v9-shell__progress-step v9-shell__progress-step--active'}>Goal</span>
              <span className={session.selectedContextId ? 'v9-shell__progress-step v9-shell__progress-step--complete' : session.selectedGoalId ? 'v9-shell__progress-step v9-shell__progress-step--active' : 'v9-shell__progress-step'}>Setup</span>
              <span className={session.selectedFireExperienceId ? 'v9-shell__progress-step v9-shell__progress-step--complete' : session.selectedContextId ? 'v9-shell__progress-step v9-shell__progress-step--active' : 'v9-shell__progress-step'}>Fire Feel</span>
            </div>

            <section className="v9-shell__prompt-card" aria-label={activePrompt.promptLabel}>
              <p className="v9-shell__eyebrow">{activePrompt.eyebrow}</p>
              <h2>{activePrompt.title}</h2>
              <p>{activePrompt.copy}</p>

              <div className="v9-shell__answer-grid" role="list" aria-label={activePrompt.optionsLabel}>
                {activePrompt.options.map((option) => {
                  const isSelected = activePrompt.selectedId === option.id

                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={isSelected ? 'v9-shell__answer-card v9-shell__answer-card--selected' : 'v9-shell__answer-card'}
                      aria-pressed={isSelected}
                      onClick={() => activePrompt.onSelect(option.id)}
                    >
                      <span>{option.label}</span>
                      <small>{option.nextPromptPreview}</small>
                    </button>
                  )
                })}
              </div>
            </section>

            <div className="v9-shell__response-card" aria-label="Selected response preview">
              <span>{activePrompt.responseLabel}</span>
              <p>{activePrompt.response}</p>
              <strong>{activePrompt.nextPromptPreview}</strong>
            </div>

            <div className="v9-shell__unknowns-card">
              <span>Still open</span>
              <p>{primaryUnknowns.join(' / ')}</p>
            </div>

            <details className="v9-shell__diagnostic" aria-label="Backstage direction bridge diagnostic">
              <summary>Backstage preview - direction bridge only</summary>
              <div className="v9-shell__diagnostic-grid">
                <div>
                  <span>Bridge status</span>
                  <strong>{directionBridge.canRunDirectionFinder ? 'Ready for headless check' : 'Waiting for seated inputs'}</strong>
                  <p>
                    {directionBridge.canRunDirectionFinder
                      ? 'The seated choices can be mapped into the headless input shape.'
                      : `Still needed: ${directionBridge.missingInputs.join(', ') || 'None'}.`}
                  </p>
                </div>
                <div>
                  <span>Mapped input</span>
                  <pre>{JSON.stringify(directionBridge.mappedInput, null, 2)}</pre>
                </div>
              </div>
              <p className="v9-shell__diagnostic-note">
                Diagnostic only. Product direction output is not shown in this customer preview.
              </p>
            </details>
          </aside>
        </div>

        <p className="v9-shell__fine-print">
          Concept visualization only. Final fireplace, venting, dimensions, hearth, mantel, stone, and installation details are confirmed before quote or order.
        </p>
      </section>
    </main>
  )
}

function buildActivePrompt({
  session,
  customerCopy,
  contextCopy,
  fireExperienceCopy,
  handleGoalSelection,
  handleContextSelection,
  handleFireExperienceSelection,
}) {
  if (!session.selectedGoalId) {
    return {
      eyebrow: 'First seated prompt',
      title: 'What brought you in today?',
      copy: 'Choose the answer that feels closest. This only shapes the showroom conversation.',
      options: HEARTH_STUDIO_V9_GOAL_OPTIONS,
      selectedId: session.selectedGoalId,
      onSelect: handleGoalSelection,
      promptLabel: 'Opening Hearth Cafe prompt',
      optionsLabel: 'Opening goal options',
      responseLabel: 'Before we narrow',
      response: customerCopy.response,
      nextPromptPreview: customerCopy.nextPromptPreview,
    }
  }

  if (!session.selectedContextId) {
    return {
      eyebrow: 'Second seated prompt',
      title: 'What kind of fireplace situation are we working with?',
      copy: 'A best guess is enough for now. The showroom visit can help name the current setup in plain language.',
      options: HEARTH_STUDIO_V9_CONTEXT_OPTIONS,
      selectedId: session.selectedContextId,
      onSelect: handleContextSelection,
      promptLabel: 'Current setup prompt',
      optionsLabel: 'Current setup options',
      responseLabel: 'Selected goal response',
      response: customerCopy.response,
      nextPromptPreview: contextCopy.nextPromptPreview,
    }
  }

  return {
    eyebrow: 'Third seated prompt',
    title: 'What kind of fire experience sounds right?',
    copy: 'This is about the feeling you want to live with, not choosing a final fuel or product today.',
    options: HEARTH_STUDIO_V9_FIRE_EXPERIENCE_OPTIONS,
    selectedId: session.selectedFireExperienceId,
    onSelect: handleFireExperienceSelection,
    promptLabel: 'Fire experience prompt',
    optionsLabel: 'Fire experience options',
    responseLabel: session.selectedFireExperienceId ? 'Selected fire-feel response' : 'Selected setup response',
    response: session.selectedFireExperienceId ? fireExperienceCopy.response : contextCopy.response,
    nextPromptPreview: fireExperienceCopy.nextPromptPreview,
  }
}

function buildStageMoodClass(session) {
  const moods = ['v9-shell__stage']

  if (session.selectedGoalId === 'more_heat' || session.selectedFireExperienceId === 'gas_convenience') {
    moods.push('v9-shell__stage--warm')
  }

  if (session.selectedGoalId === 'better_looking_fireplace' || session.selectedFireExperienceId === 'best_looking_flame') {
    moods.push('v9-shell__stage--polished')
  }

  if (session.selectedGoalId === 'real_wood_feel' || session.selectedFireExperienceId === 'real_wood_feel') {
    moods.push('v9-shell__stage--wood')
  }

  if (session.selectedContextId === 'outdoor_fireplace_area' || session.selectedFireExperienceId === 'outdoor_flame') {
    moods.push('v9-shell__stage--outdoor')
  }

  return moods.join(' ')
}

export function scanHearthStudioV9ShellCopy(text, bannedTerms = bannedShellTerms) {
  return bannedTerms.filter((term) => text.toLowerCase().includes(term.toLowerCase()))
}
