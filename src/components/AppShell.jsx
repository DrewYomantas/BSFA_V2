import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { loadManifest } from '../lib/renderManifest.js'

export default function AppShell({ children }) {
  const { pathname } = useLocation()
  const isRep = pathname.startsWith('/rep')

  useEffect(() => {
    loadManifest()
  }, [])

  return (
    <div className="min-h-full flex flex-col">
      <header className="border-b border-hearth-line/70 bg-hearth-surface/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-baseline justify-between">
          <Link to="/" className="font-display text-2xl tracking-wide text-hearth-ink">
            Benson Stone <span className="text-hearth-muted">· Hearth Studio</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-hearth-muted">
            <Link to="/stone-shop-packet" className="hover:text-hearth-ink">Stone + Shop</Link>
            {isRep ? (
              <span className="uppercase tracking-widest text-xs text-hearth-ember">Rep Workbench</span>
            ) : (
              <Link to="/rep/start" className="hover:text-hearth-ink">Rep</Link>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-6 py-10">{children}</div>
      </main>
      <footer className="border-t border-hearth-line/70 text-center text-xs text-hearth-muted py-4">
        Benson Stone — Hearth Studio
      </footer>
    </div>
  )
}
