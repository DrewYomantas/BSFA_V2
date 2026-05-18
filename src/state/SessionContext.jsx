import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { defaultSession } from './sessionSchema.js'
import { loadSession, saveSession, archiveAndClearSession } from './sessionStorage.js'

const SessionContext = createContext(null)

export function SessionProvider({ children }) {
  const [session, setSession] = useState(() => loadSession() ?? defaultSession())
  const saveTimer = useRef(null)

  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current)
    saveTimer.current = setTimeout(() => saveSession(session), 150)
    return () => clearTimeout(saveTimer.current)
  }, [session])

  const api = useMemo(() => ({
    session,
    setBuildField(field, value) {
      setSession((s) => ({
        ...s,
        updatedAt: new Date().toISOString(),
        build: { ...s.build, [field]: value },
      }))
    },
    setCustomer(partial) {
      setSession((s) => {
        const next = { ...s.customer, ...partial }
        if (partial && 'lastName' in partial && !('lastInitial' in partial)) {
          next.lastInitial = (partial.lastName || '').trim().charAt(0).toUpperCase()
        }
        return { ...s, updatedAt: new Date().toISOString(), customer: next }
      })
    },
    setProjectName(name) {
      setSession((s) => ({
        ...s,
        updatedAt: new Date().toISOString(),
        project: { ...(s.project || {}), name: (name || '').trim() },
      }))
    },
    setGuide(partial) {
      setSession((s) => ({
        ...s,
        updatedAt: new Date().toISOString(),
        guide: { ...(s.guide || { id: 'drew', name: 'Drew Hendrickson' }), ...partial },
      }))
    },
    setMode(mode) {
      setSession((s) => ({ ...s, mode, updatedAt: new Date().toISOString() }))
    },
    setRepNotes(notes) {
      setSession((s) => ({
        ...s,
        updatedAt: new Date().toISOString(),
        rep: { ...s.rep, notes },
      }))
    },
    closeSession() {
      archiveAndClearSession(session)
      setSession(defaultSession())
    },
    resetSession() {
      setSession(defaultSession())
    },
  }), [session])

  return <SessionContext.Provider value={api}>{children}</SessionContext.Provider>
}

export function useSession() {
  const ctx = useContext(SessionContext)
  if (!ctx) throw new Error('useSession must be used inside SessionProvider')
  return ctx
}
