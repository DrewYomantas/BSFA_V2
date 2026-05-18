import { useNavigate } from 'react-router-dom'
import PrimaryButton from '../../components/PrimaryButton.jsx'
import { useSession } from '../../state/SessionContext.jsx'

export default function SessionCloseScreen() {
  const navigate = useNavigate()
  const { session, setRepNotes, closeSession } = useSession()

  function close() {
    closeSession()
    navigate('/')
  }

  return (
    <section className="max-w-2xl mx-auto">
      <h1 className="font-display text-3xl text-hearth-ink">Close session</h1>
      <p className="text-hearth-muted mt-2">
        Customer: {session.customer.firstName} {session.customer.lastName || '(unnamed)'}
      </p>

      <label className="mt-8 block">
        <span className="text-sm text-hearth-muted">Internal notes</span>
        <textarea
          value={session.rep.notes}
          onChange={(e) => setRepNotes(e.target.value)}
          rows={6}
          className="mt-1 block w-full rounded-md border border-hearth-line bg-hearth-surface px-3 py-2"
        />
      </label>

      <div className="mt-6 flex gap-3">
        <PrimaryButton onClick={close}>Close session</PrimaryButton>
        <button
          type="button"
          onClick={() => navigate('/rep/send')}
          className="px-6 py-3 rounded-full border border-hearth-ink text-hearth-ink hover:bg-hearth-ink hover:text-hearth-surface transition-colors"
        >
          Send summary
        </button>
      </div>
    </section>
  )
}
