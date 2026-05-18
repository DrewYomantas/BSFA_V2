// App mode — controls what dev/asset-status text appears.
//   customer     → no prototype disclaimers, only customer-safe labels
//   internal     → shows asset status, missing-asset warnings, dev disclosures
//   presentation → hides dev labels for screenshots; still does not fake production assets
//
// Mode is read from the ?mode= URL param. Default 'customer'.

import { createContext, useContext, useMemo } from 'react'

const AppModeCtx = createContext('customer')

export function AppModeProvider({ children }) {
  const mode = useMemo(() => {
    if (typeof window === 'undefined') return 'customer'
    const m = new URLSearchParams(window.location.search).get('mode')
    return m === 'internal' || m === 'presentation' ? m : 'customer'
  }, [])
  return <AppModeCtx.Provider value={mode}>{children}</AppModeCtx.Provider>
}

export const useAppMode = () => useContext(AppModeCtx)
export const isInternal = (mode) => mode === 'internal'
export const isCustomerFacing = (mode) => mode !== 'internal'
