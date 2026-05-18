import { isValidSession } from './sessionSchema.js'

const CURRENT_KEY = 'bsfa_v2.session.current'
const LAST_CLOSED_KEY = 'bsfa_v2.session.lastClosed'

export function loadSession() {
  try {
    const raw = localStorage.getItem(CURRENT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return isValidSession(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function saveSession(session) {
  try {
    localStorage.setItem(CURRENT_KEY, JSON.stringify(session))
  } catch {
    /* quota errors ignored — session is in memory regardless */
  }
}

export function archiveAndClearSession(session) {
  try {
    localStorage.setItem(LAST_CLOSED_KEY, JSON.stringify(session))
    localStorage.removeItem(CURRENT_KEY)
  } catch {
    /* ignore */
  }
}
