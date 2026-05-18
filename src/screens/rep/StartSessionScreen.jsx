import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PrimaryButton from '../../components/PrimaryButton.jsx'
import { useSession } from '../../state/SessionContext.jsx'

export default function StartSessionScreen() {
  const navigate = useNavigate()
  const { session, setCustomer, setProjectName, setMode, resetSession } = useSession()
  const [first, setFirst] = useState(session.customer.firstName)
  const [last, setLast] = useState(session.customer.lastName)
  const [projectName, setProjectNameLocal] = useState(session.project?.name || '')

  function start() {
    resetSession()
    setMode('rep')
    setCustomer({ firstName: first.trim(), lastName: last.trim() })
    setProjectName(projectName)
    navigate('/build')
  }

  const projectSuggestion = first.trim() ? `${first.trim()}'s Hearth` : 'The Anderson Hearth'

  return (
    <section className="max-w-md mx-auto">
      <h1 className="font-display text-3xl text-hearth-ink">Start a session</h1>
      <p className="text-hearth-muted mt-2">
        First name and project name appear on the customer screens. Last name is internal
        only — the folio shows just the initial.
      </p>

      <div className="mt-8 space-y-4">
        <label className="block">
          <span className="text-sm text-hearth-muted">First name</span>
          <input
            value={first}
            onChange={(e) => setFirst(e.target.value)}
            className="mt-1 block w-full rounded-md border border-hearth-line bg-hearth-surface px-3 py-2"
            autoComplete="off"
          />
        </label>
        <label className="block">
          <span className="text-sm text-hearth-muted">
            Last name <span className="text-hearth-muted/70">(internal — initial shown on folio)</span>
          </span>
          <input
            value={last}
            onChange={(e) => setLast(e.target.value)}
            className="mt-1 block w-full rounded-md border border-hearth-line bg-hearth-surface px-3 py-2"
            autoComplete="off"
          />
        </label>
        <label className="block">
          <span className="text-sm text-hearth-muted">
            Project name <span className="text-hearth-muted/70">(optional — defaults to "Today's design")</span>
          </span>
          <input
            value={projectName}
            onChange={(e) => setProjectNameLocal(e.target.value)}
            placeholder={projectSuggestion}
            className="mt-1 block w-full rounded-md border border-hearth-line bg-hearth-surface px-3 py-2"
            autoComplete="off"
          />
        </label>
      </div>

      <div className="mt-8">
        <PrimaryButton onClick={start} disabled={!first.trim() || !last.trim()}>
          Start session
        </PrimaryButton>
      </div>
    </section>
  )
}
