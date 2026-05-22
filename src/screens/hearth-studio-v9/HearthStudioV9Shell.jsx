import { useMemo, useState } from 'react'
import './HearthStudioV9Shell.css'
import {
  HEARTH_STUDIO_V9_GOAL_OPTIONS,
  buildHearthStudioV9CustomerCopy,
  createInitialHearthStudioV9Session,
  selectHearthStudioV9Goal,
} from '../../lib/hearthStudioV9/hearthStudioV9Session.js'

const cafeSteps = [
  {
    label: 'Sit',
    title: 'Start from the room you want.',
    copy: 'A few calm prompts help your rep understand the current fireplace, the room, and the feeling you want from the fire.',
  },
  {
    label: 'Walk',
    title: 'See fewer, better directions.',
    copy: 'The showroom walk becomes focused on real displays, real materials, and the options worth reacting to in person.',
  },
  {
    label: 'Confirm',
    title: 'Return with a clearer path.',
    copy: 'Final fireplace, venting, dimensions, hearth, mantel, stone, and installation details are confirmed before quote or order.',
  },
]

const futureDirectionPlaceholders = [
  'Current fireplace or wall',
  'Main goal for the room',
  'Style and warmth direction',
]

const bannedShellTerms = [
  'cost',
  'margin',
  'spiff',
  'OCR',
  'confidence',
  'Needs Verification',
  'BisTrack',
  'shop readiness',
  'internal notes',
  'needs_review',
]

export default function HearthStudioV9Shell() {
  const [session, setSession] = useState(() => createInitialHearthStudioV9Session())
  const customerCopy = useMemo(() => buildHearthStudioV9CustomerCopy(session), [session])
  const summary = session.customerSummary

  function handleGoalSelection(goalId) {
    setSession((currentSession) => selectHearthStudioV9Goal(currentSession, goalId))
  }

  return (
    <main className="v9-shell" aria-label="Hearth Studio V9 customer preview">
      <section className="v9-shell__hero" aria-label="Hearth Cafe seated start">
        <div className="v9-shell__ambient" aria-hidden="true">
          <div className="v9-shell__fireplace">
            <span className="v9-shell__mantel" />
            <span className="v9-shell__opening">
              <i />
              <i />
              <i />
            </span>
            <span className="v9-shell__hearth" />
          </div>
        </div>

        <header className="v9-shell__topbar">
          <a className="v9-shell__brand" href="#cafe-flow" aria-label="Benson Stone Hearth Studio">
            <span className="v9-shell__monogram" aria-hidden="true">B</span>
            <span>Benson Stone</span>
          </a>
          <nav aria-label="Hearth Studio preview stages">
            <a href="#cafe-flow">Hearth Cafe</a>
            <a href="#direction-preview">Preview</a>
          </nav>
        </header>

        <div className="v9-shell__hero-copy">
          <p className="v9-shell__eyebrow">Hearth Studio V9</p>
          <h1>Begin seated. Walk the showroom with purpose.</h1>
          <p>
            A premium customer preview for narrowing fireplace direction before anyone starts comparing products.
          </p>
          <a className="v9-shell__primary-action" href="#cafe-flow">Start the Hearth Cafe sit</a>
        </div>

        <aside className="v9-shell__session" aria-label="Customer mode boundary">
          <p>Showroom conversation mode</p>
          <strong>No final selections yet.</strong>
          <span>Real displays and reviewed materials guide the next conversation.</span>
        </aside>
      </section>

      <section id="cafe-flow" className="v9-shell__band" aria-label="Hearth Cafe flow">
        <div className="v9-shell__section-heading">
          <p className="v9-shell__eyebrow">Hearth Cafe Sit</p>
          <h2>Three calm moves before the showroom walk.</h2>
        </div>
        <div className="v9-shell__steps">
          {cafeSteps.map((step) => (
            <article key={step.label}>
              <span>{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>

        <div className="v9-shell__opening-prompt" aria-label="Opening Hearth Cafe prompt">
          <span className="v9-shell__corner v9-shell__corner--top-left" aria-hidden="true" />
          <span className="v9-shell__corner v9-shell__corner--top-right" aria-hidden="true" />
          <span className="v9-shell__corner v9-shell__corner--bottom-left" aria-hidden="true" />
          <span className="v9-shell__corner v9-shell__corner--bottom-right" aria-hidden="true" />

          <div className="v9-shell__question">
            <p className="v9-shell__eyebrow">First seated prompt</p>
            <h2>What brought you in today?</h2>
            <p>
              Pick the answer that feels closest. This only shapes the showroom conversation; it is not a product choice.
            </p>

            <div className="v9-shell__answer-grid" role="list" aria-label="Opening goal options">
              {HEARTH_STUDIO_V9_GOAL_OPTIONS.map((option) => {
                const isSelected = session.selectedGoalId === option.id

                return (
                  <button
                    key={option.id}
                    type="button"
                    className={isSelected ? 'v9-shell__answer-card v9-shell__answer-card--selected' : 'v9-shell__answer-card'}
                    aria-pressed={isSelected}
                    onClick={() => handleGoalSelection(option.id)}
                  >
                    <span>{option.label}</span>
                    <small>{option.nextPromptPreview}</small>
                    {isSelected ? (
                      <svg aria-hidden="true" className="v9-shell__selected-mark" viewBox="0 0 24 24">
                        <path d="M5.5 12.4 10 16.9 18.8 7.6" />
                      </svg>
                    ) : null}
                  </button>
                )
              })}
            </div>
          </div>

          <aside className="v9-shell__customer-summary" aria-label="Customer-safe session summary">
            <p className="v9-shell__eyebrow">Session-safe summary</p>
            <div className="v9-shell__selected-response">
              <span>Goal direction selected</span>
              <strong>{summary.goalDirection}</strong>
              <p>{customerCopy.response}</p>
            </div>

            <div className="v9-shell__summary-block">
              <span>What is still unknown</span>
              <ul>
                {summary.stillUnknown.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="v9-shell__next-preview">
              <span>Next we will narrow</span>
              <p>{customerCopy.nextPromptPreview}</p>
            </div>

            <p className="v9-shell__summary-boundary">{summary.finalSelectionState}</p>
          </aside>
        </div>
      </section>

      <section id="direction-preview" className="v9-shell__preview" aria-label="Future direction preview placeholders">
        <div className="v9-shell__section-heading">
          <p className="v9-shell__eyebrow">Future Direction Preview</p>
          <h2>Reserved space for the narrowing engine.</h2>
          <p>
            This screen does not choose products yet. It shows where reviewed, source-backed directions will appear once the customer flow is ready.
          </p>
        </div>

        <div className="v9-shell__direction-surface">
          <div className="v9-shell__prompt-stack">
            {futureDirectionPlaceholders.map((item, index) => (
              <div key={item} className="v9-shell__prompt-row">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>

          <div className="v9-shell__direction-placeholder" aria-label="Preview-only direction placeholders">
            <p>Direction cards will appear here after the seated prompts.</p>
            <div>
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>

        <p className="v9-shell__fine-print">
          Concept visualization only. Final fireplace, venting, dimensions, hearth, mantel, stone, and installation details are confirmed before quote or order.
        </p>
      </section>
    </main>
  )
}

export function scanHearthStudioV9ShellCopy(text, bannedTerms = bannedShellTerms) {
  return bannedTerms.filter((term) => text.toLowerCase().includes(term.toLowerCase()))
}
