function uuid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return 'sid-' + Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function defaultSession() {
  const now = new Date().toISOString()
  return {
    sessionId: uuid(),
    createdAt: now,
    updatedAt: now,
    mode: 'customer',
    customer: { firstName: '', lastName: '', lastInitial: '' },
    project: { name: '' },
    guide:   { id: 'drew', name: 'Drew Hendrickson' },
    build: {
      projectType: null,
      fireExperience: null,
      stoneId: null,
      mantelId: null,
      hearthId: null,
      lightingMoodId: null,
    },
    rep: { notes: '' },
  }
}

export function isValidSession(s) {
  return !!(s && typeof s === 'object' && s.sessionId && s.build && typeof s.build === 'object')
}
