import { useEffect, useState } from 'react'
import { loadManifest, getRenderSync } from '../lib/renderManifest.js'

export default function RenderImage({ slug, alt = '', className = '' }) {
  const [entry, setEntry] = useState(() => getRenderSync(slug))

  useEffect(() => {
    let alive = true
    loadManifest().then(() => {
      if (alive) setEntry(getRenderSync(slug))
    })
    return () => { alive = false }
  }, [slug])

  if (!entry) {
    return (
      <div
        className={'bg-hearth-line/60 rounded-md flex items-center justify-center text-xs text-hearth-muted ' + className}
        aria-label={alt}
      >
        no render
      </div>
    )
  }

  if (entry.type === 'video') {
    return (
      <video
        className={'rounded-md object-cover ' + className}
        src={entry.src}
        muted
        loop
        playsInline
        autoPlay
      />
    )
  }

  return (
    <img
      className={'rounded-md object-cover ' + className}
      src={entry.src}
      alt={alt}
      loading="lazy"
    />
  )
}
