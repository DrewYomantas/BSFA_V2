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

const OPTION_ICONS = {
  more_heat: 'H',
  less_mess: 'M',
  better_looking_fireplace: 'B',
  real_wood_feel: 'W',
  easier_to_use: 'E',
  existing_masonry_fireplace: 'M',
  factory_built_fireplace: 'F',
  wood_stove: 'S',
  new_construction_or_remodel: 'N',
  outdoor_fireplace_area: 'O',
  gas_convenience: 'G',
  electric_simplicity: 'E',
  outdoor_flame: 'O',
  best_looking_flame: 'F',
  not_sure_yet: '?',
}

export default function HearthStudioV9Shell() {
  const [session, setSession] = useState(() => createInitialHearthStudioV9Session())
  const customerCopy = useMemo(() => buildHearthStudioV9CustomerCopy(session), [session])
  const contextCopy = useMemo(() => buildHearthStudioV9ContextCopy(session), [session])
  const fireExperienceCopy = useMemo(() => buildHearthStudioV9FireExperienceCopy(session), [session])
  const directionBridge = useMemo(() => buildHearthStudioV9DirectionBridge(session), [session])
  const summary = session.customerSummary
  const currentStep = !session.selectedGoalId ? 1 : !session.selectedContextId ? 2 : 3
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
            <div className="v9-shell__brand-text">
              <span className="v9-shell__brand-name">Benson Stone</span>
              <span className="v9-shell__brand-est">EST. 1930</span>
            </div>
          </div>
          <div className="v9-shell__title">
            <span>Hearth Studio V9</span>
            <strong>Cinematic Showroom Builder</strong>
          </div>
          <nav className="v9-shell__rhythm" aria-label="Hearth Studio preview stages">
            <span className="v9-shell__rhythm-step v9-shell__rhythm-step--active">
              <svg className="v9-icon" aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="6" width="12" height="5" rx="1" stroke="currentColor" strokeWidth="1.25" />
                <rect x="3" y="3.5" width="8" height="3.5" rx="0.75" stroke="currentColor" strokeWidth="1.25" />
                <line x1="4" y1="11" x2="4" y2="13.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                <line x1="10" y1="11" x2="10" y2="13.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              </svg>
              Sit
            </span>
            <span className="v9-shell__rhythm-step">
              <svg className="v9-icon" aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="2.5" r="1.4" stroke="currentColor" strokeWidth="1.2" />
                <path d="M7 3.9 L5.5 8 L4.5 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                <path d="M7 3.9 L8.5 8 L9.5 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                <path d="M5.5 8 L3 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M8.5 8 L11 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Walk
            </span>
            <span className="v9-shell__rhythm-step">
              <svg className="v9-icon" aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <polyline points="2,7 6,11 12,3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Confirm
            </span>
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

              {/* Stage caption: DOM-preserved for tests and a11y, not customer-visible */}
              <div className="v9-shell__stage-caption v9-shell__sr-only">
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
                <div className="v9-shell__strip-meta">
                  <span className="v9-shell__strip-icon" aria-hidden="true">*</span>
                  <span className="v9-shell__strip-label">Goal</span>
                </div>
                <strong>{summary.goalDirection}</strong>
              </div>
              <div>
                <div className="v9-shell__strip-meta">
                  <span className="v9-shell__strip-icon" aria-hidden="true">*</span>
                  <span className="v9-shell__strip-label">Setup</span>
                </div>
                <strong>{summary.projectContext}</strong>
              </div>
              <div>
                <div className="v9-shell__strip-meta">
                  <span className="v9-shell__strip-icon" aria-hidden="true">*</span>
                  <span className="v9-shell__strip-label">Fire Feel</span>
                </div>
                <strong>{summary.fireExperience}</strong>
              </div>
              <div>
                <div className="v9-shell__strip-meta">
                  <span className="v9-shell__strip-icon" aria-hidden="true">*</span>
                  <span className="v9-shell__strip-label">Status</span>
                </div>
                <p>{summary.finalSelectionState}</p>
              </div>
            </aside>
          </section>

          <aside className="v9-shell__conversation" aria-label="Hearth Cafe conversation tray">
            {/* Progress: DOM-preserved for test accessibility, not customer-visible */}
            <div className="v9-shell__progress v9-shell__sr-only" aria-label="Hearth Cafe Sit progress">
              <span className={session.selectedGoalId ? 'v9-shell__progress-step v9-shell__progress-step--complete' : 'v9-shell__progress-step v9-shell__progress-step--active'}>Goal</span>
              <span className={session.selectedContextId ? 'v9-shell__progress-step v9-shell__progress-step--complete' : session.selectedGoalId ? 'v9-shell__progress-step v9-shell__progress-step--active' : 'v9-shell__progress-step'}>Setup</span>
              <span className={session.selectedFireExperienceId ? 'v9-shell__progress-step v9-shell__progress-step--complete' : session.selectedContextId ? 'v9-shell__progress-step v9-shell__progress-step--active' : 'v9-shell__progress-step'}>Fire Feel</span>
            </div>

            <div className="v9-shell__tray-header">
              <span className="v9-shell__tray-label">Hearth Cafe</span>
              <span className="v9-shell__tray-step">Step {currentStep} of 3</span>
            </div>

            <section className="v9-shell__prompt-card" aria-label={activePrompt.promptLabel}>
              <p className="v9-shell__eyebrow v9-shell__sr-only">{activePrompt.eyebrow}</p>
              <h2>{activePrompt.title}</h2>
              <p>{activePrompt.copy}</p>

              <div className="v9-shell__answer-grid" role="list" aria-label={activePrompt.optionsLabel}>
                {activePrompt.options.map((option) => {
                  const isSelected = activePrompt.selectedId === option.id
                  const icon = OPTION_ICONS[option.id] || '*'

                  return (
                    <button
                      key={option.id}
                      type="button"
                      className={isSelected ? 'v9-shell__answer-card v9-shell__answer-card--selected' : 'v9-shell__answer-card'}
                      aria-pressed={isSelected}
                      onClick={() => activePrompt.onSelect(option.id)}
                    >
                      <span className="v9-shell__card-icon" aria-hidden="true">{icon}</span>
                      <div className="v9-shell__card-body">
                        <span>{option.label}</span>
                        <small>{option.nextPromptPreview}</small>
                      </div>
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
          <span className="v9-shell__fine-print-scale" aria-hidden="true">Not to scale.</span>
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
