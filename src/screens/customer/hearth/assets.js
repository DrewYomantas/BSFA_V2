// Hearth Studio asset registry.
//
// The manifest lives at /public/assets/hearth-studio/asset-manifest.json so it
// ships with the app and can be edited without rebuilding. See that folder's
// README.md for the schema, status semantics, and how to promote an asset
// from 'specimen' → 'production'.

import manifest from '../../../../public/assets/hearth-studio/asset-manifest.json'

// Index by id for O(1) lookup.
const byId = Object.fromEntries(manifest.assets.map((a) => [a.id, a]))

export const assetManifest = manifest

export function getAsset(id) {
  return byId[id] || null
}

export function assetsByCategory(category) {
  return manifest.assets.filter((a) => a.category === category)
}

// Build an option id (e.g. 'stoneId' → 'stone-cliffstone') from the
// category prefix used in BuildV5.
export function assetIdFor(prefix, optionId) {
  return `${prefix}-${optionId}`
}

// Resolve a (kind, id) pair to a manifest entry. The V6 AssetSlot uses these
// to decide whether a real production image exists or the specimen treatment
// should be rendered. Kind maps onto manifest `category`; id is the slug after
// the prefix (e.g. category=stone, id=cliffstone → manifest id "stone-cliffstone").
export function resolveAsset(kind, id) {
  const direct = byId[`${kind}-${id}`]
  if (direct) return direct
  return byId[id] || null
}

// Returns the production image URL if (and only if) the entry is fully
// production-ready. Specimen/missing returns null — the caller renders fallback.
export function productionImageFor(kind, id) {
  const a = resolveAsset(kind, id)
  if (a && a.assetStatus === 'production' && a.imageSrc) return a.imageSrc
  return null
}

// For a list of required (kind, id) refs, return the ones whose manifest entry
// is NOT 'production'. Used by the presentation-mode guard.
export function findMissingProductionAssets(refs) {
  const missing = []
  for (const ref of refs) {
    const a = resolveAsset(ref.kind, ref.id)
    if (!a || a.assetStatus !== 'production' || !a.imageSrc) {
      missing.push(`${ref.kind}/${ref.id}`)
    }
  }
  return missing
}
