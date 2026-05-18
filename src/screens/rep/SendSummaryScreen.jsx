import { useSession } from '../../state/SessionContext.jsx'

export default function SendSummaryScreen() {
  const { session } = useSession()
  return (
    <section className="max-w-3xl mx-auto">
      <h1 className="font-display text-3xl text-hearth-ink">Send summary</h1>
      <p className="text-hearth-muted mt-2">Real send (email / SMS) is wired in a later milestone. Below is the serializable payload.</p>

      <pre className="mt-6 p-4 rounded bg-hearth-ink text-hearth-surface text-xs overflow-auto">
        {JSON.stringify(session, null, 2)}
      </pre>
    </section>
  )
}
