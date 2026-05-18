import { useMemo } from 'react'
import { AtmosphereCtx } from './tokens.js'
import { useSession } from '../../../state/SessionContext.jsx'

export default function AtmosphereProvider({ children }) {
  const { session } = useSession()
  const atm = useMemo(() => ({
    mood:   session.build.lightingMoodId || 'warmEvening',
    stone:  session.build.stoneId        || 'cliffstone',
    mantel: session.build.mantelId       || 'rusticOak',
    hearth: session.build.hearthId       || 'bluestone',
    accent: 'ember',
  }), [session.build.lightingMoodId, session.build.stoneId, session.build.mantelId, session.build.hearthId])

  return <AtmosphereCtx.Provider value={atm}>{children}</AtmosphereCtx.Provider>
}
