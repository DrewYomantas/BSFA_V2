let cache = null
let inflight = null

export async function loadManifest() {
  if (cache) return cache
  if (inflight) return inflight
  inflight = fetch('/assets/renders/manifest.json')
    .then((r) => (r.ok ? r.json() : { version: 1, renders: {} }))
    .then((data) => {
      cache = data
      inflight = null
      return data
    })
    .catch(() => {
      cache = { version: 1, renders: {} }
      inflight = null
      return cache
    })
  return inflight
}

export function getRenderSync(slug) {
  if (!cache || !slug) return null
  return cache.renders?.[slug] ?? null
}
