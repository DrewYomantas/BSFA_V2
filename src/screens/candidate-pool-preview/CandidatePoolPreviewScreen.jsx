import { useMemo } from 'react'
import { hearthVisualAssetSeed } from '../../data/hearthVisualAssets/hearthVisualAssetSeed.js'
import { buildCandidateManifest } from '../../lib/candidateManifest/candidateManifestModel.js'
import CandidatePoolPreview from '../../components/candidateManifest/CandidatePoolPreview.jsx'

export default function CandidatePoolPreviewScreen() {
  const manifest = useMemo(() => buildCandidateManifest(hearthVisualAssetSeed), [])

  return (
    <section className="space-y-6" aria-label="Candidate Pool Preview">
      <header className="space-y-2 border-b border-hearth-line pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-hearth-ember">
          Internal rep tool — not for customer view
        </p>
        <h1 className="font-display text-3xl text-hearth-ink md:text-4xl">Candidate Pool Preview</h1>
        <p className="max-w-3xl text-sm text-hearth-muted">
          V1 bridge from verified product truth into the Hearth Café Sit candidate pool.
          Eligible records render as the customer-safe cards Drew/Liam will see. Blocked
          records show the rep-only reason they did not enter the pool.
        </p>
      </header>
      <CandidatePoolPreview pool={manifest.pool} />
    </section>
  )
}
