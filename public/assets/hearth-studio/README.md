# Hearth Studio · Asset Pipeline

Single source of truth for every customer-facing visual in the Hearth Studio V2
app — the 3-screen React/Vite/Tailwind flow (Welcome → Build → Summary).

UE5 is **not** the runtime. UE5 is the render studio. The React app consumes
UE5-rendered PNG layers, material swatches, brand stills, and transition clips
that this manifest catalogs. Every visual asset in the customer flow — whether
it exists yet or not — gets an entry here.

## How the manifest is loaded (V1 vs. future)

**Current V1 behavior — bundled JSON.** `src/screens/customer/hearth/assets.js`
imports `asset-manifest.json` through Vite, so the manifest is inlined into the
JS bundle at build time. **Editing the manifest requires a rebuild** for the
change to appear in a deployed app. During `npm run dev` Vite's HMR picks up
edits, but production builds freeze the manifest into the bundle.

**Future no-rebuild behavior — runtime fetch.** `assets.js` can be changed to
`fetch('/assets/hearth-studio/asset-manifest.json')` at runtime. Because the
file lives under `public/` it ships as a static asset alongside the bundle, so
updating the JSON (and any newly-dropped image/video files) becomes a deploy
of static files only — no JS rebuild, no version bump. Plan to flip to this
once the manifest stops changing shape and a runtime loader makes sense.

## Folder layout

```
/public/assets/hearth-studio/
  asset-manifest.json          ← edit this when assets change
  README.md                    ← this file
  /stage-renders/
    /warm-evening/             ← UE5 base hero render(s), warm-evening mood
    /clean-daylight/           ← UE5 base hero render(s), clean-daylight mood
  /render-layers/              ← UE5 PNG layers with alpha, composited in-app
    /units/
    /stone/
    /mantel/
    /hearth/
    /logs/
    /overlays/
  /transitions/                ← UE5 short clips between snap tiers / moods
    /warm-evening/
    /clean-daylight/
  /materials/
    /stone/                    ← cliffstone.jpg, fieldledge.jpg, …
    /mantel/                   ← rustic-oak.jpg, painted-white.jpg, …
    /hearth/                   ← bluestone.jpg, …
    /lighting/                 ← warm-evening.jpg, clean-daylight.jpg
  /brand/
    /showroom-stills/          ← wide showroom photography
    /brass-details/            ← close-up brand accents
```

Vite serves `/public/` at the site root, so a file at
`/public/assets/hearth-studio/materials/stone/cliffstone.jpg` is reachable at
`/assets/hearth-studio/materials/stone/cliffstone.jpg`. The manifest stores
that public URL in `imageSrc` (or `videoSrc` for clips).

## Manifest entry shape

Minimum required fields — what every entry must have:

```json
{
  "id": "stone-cliffstone",
  "label": "Cliffstone",
  "sampleCode": "ST-04",
  "category": "stone",
  "assetStatus": "specimen",
  "imageSrc": "/assets/hearth-studio/materials/stone/cliffstone.jpg",
  "customerStory": "Northern quarry texture with a ledgestone profile.",
  "internalNote": "Replace with real macro photography before showroom launch."
}
```

### Required fields

| Field           | Notes |
|-----------------|-------|
| `id`            | Kebab-case, unique. `<category>-<slug>`. |
| `label`         | Customer-visible name. |
| `category`      | See category list below. |
| `assetStatus`   | `production` \| `specimen` \| `missing`. Drives UI treatment. |
| `imageSrc`      | Public URL. May point at a file that doesn't exist yet — that's what `assetStatus: "missing"` is for. For video assets, this is the poster frame. |

### Optional fields

`sampleCode`, `customerStory`, `internalNote` — as before. Plus the following,
added for UE5 stage renders, layers, and transition clips. Use only when they
apply; older entries do not need to backfill them.

| Field            | Applies to | Notes |
|------------------|------------|-------|
| `unitId`         | stage-render, render-layer, transition-clip | Which fireplace unit/SKU the asset depicts (e.g. `base`, `mt-44`). |
| `snapTier`       | stage-render, render-layer | Footprint tier rendered (e.g. `compact`, `standard`, `expanded`). |
| `mood`           | stage-render, render-layer, transition-clip | `warm-evening` \| `clean-daylight` \| future moods. |
| `layer`          | render-layer, transition-clip | Which composite layer this image is: `units`, `stone`, `mantel`, `hearth`, `logs`, `overlays`. |
| `hasAlpha`       | render-layer, transition-clip | `true` if the file uses transparency (PNG / alpha-mp4). |
| `width`, `height`| any image asset | Pixel dimensions of the source file. Lets the UI reserve layout space without a load. |
| `videoSrc`       | transition-clip | Public URL to the mp4/webm. `imageSrc` should point at a poster frame. |
| `durationMs`     | transition-clip | Clip length in ms — used to schedule snap transitions. |
| `fromSnapTier`, `toSnapTier` | transition-clip | The two tiers this clip transitions between. |
| `modeVisibility` | any | `customer` \| `internal` \| `presentation` \| `all`. Hides showroom-internal overlays (clearance bands, dimensions) from the customer-facing flow. Defaults to `all` when omitted. |

### Categories

- `stone`, `mantel`, `hearth`, `lighting` — material swatches (today's
  specimen cards).
- `material` — generic catch-all when a swatch doesn't fit one of the four
  material categories above (e.g. trim, surround paint).
- `stage-render` — full-room UE5 hero render. One per unit × snapTier × mood
  combination, typically.
- `render-layer` — single UE5 layer with alpha, composited in-app over a base
  stage render (e.g. just the stone, just the mantel clearance overlay).
- `transition-clip` — short UE5 video used when snapping between tiers or
  moods.
- `brand-still` — wide showroom photography.
- `brand-detail` — close-up brand accents (brass, hardware, finish details).
- `qr/share-preview` — reserved for the customer-facing Summary / Send-Home
  share thumbnail. Add when that flow lands.

## `assetStatus` semantics

- **`production`** — Real photography or final UE5 render. UI displays the
  image as-is.
- **`specimen`** — Honest showroom sample treatment. UI displays the archival
  SpecimenCard frame (sample number, brass corners) instead of pretending the
  image is final.
- **`missing`** — No file yet. UI renders an intentional premium placeholder
  card. **Never** falls back to fake texture. Entries can sit at `missing`
  indefinitely — that's the point of cataloging assets we plan to render in
  UE5 before the files exist.

To promote an asset from `specimen` or `missing` → `production`:

1. Drop the final image/clip into the correct folder (e.g.
   `/materials/stone/cliffstone.jpg`).
2. Open `asset-manifest.json`.
3. Change `assetStatus` to `production`. Verify `imageSrc` (and `videoSrc` if
   applicable) match the new file. Clear or update `customerStory` /
   `internalNote` as needed.
4. Rebuild and reload — `AssetCard` switches treatment automatically. (Once
   `assets.js` is moved to runtime fetch, step 4 becomes just "reload.")

## Asset specs (target)

| Category          | Aspect | Min resolution | Format        | Notes |
|-------------------|--------|----------------|---------------|-------|
| stage-render      | 3:2    | 2400×1600      | JPEG (q85+)   | No UI overlay. Room context. |
| render-layer      | 3:2    | 2400×1600      | PNG (alpha)   | Aligned to its matching stage-render. |
| transition-clip   | 3:2    | 1920×1280      | MP4 (h.264) + JPEG poster | Loopable or pinned-on-last-frame. Keep under ~1.5s. |
| materials/stone   | 1:1    | 1200×1200      | JPEG (q85+)   | Macro of representative sample. Even lighting. |
| materials/mantel  | 1:1    | 1200×1200      | JPEG (q85+)   | Macro showing wood grain or finish. |
| materials/hearth  | 1:1    | 1200×1200      | JPEG (q85+)   | Macro of the slab face. |
| materials/lighting| 3:2    | 1600×1067      | JPEG (q85+)   | Room mood reference, not abstract gradient. |
| brand             | varies | 2000px long edge | JPEG (q85+) | Showroom or detail photography. |

## What the app does with this

`src/screens/customer/hearth/assets.js` imports this JSON, indexes it by `id`,
and exposes `getAsset(id)` / `assetsByCategory(category)`. The `AssetCard`
component branches on `assetStatus`. The Build screen passes the right `id`
per option (e.g. `stone-cliffstone`); the `customerStory` line appears under
the material name when present.

## Rules

- Do **not** invent provenance, quarry sources, supplier claims, or installed
  locations in `customerStory`. If the team doesn't know it, leave it `null`.
- `internalNote` is engineering- and showroom-team-facing. Anything that hints
  at "work in progress" or "fake render" belongs there, **never** in
  `customerStory`.
- Don't commit muddy or AI-looking final photography. If the image isn't ready,
  leave `assetStatus` at `specimen` or `missing` and ship the placeholder.
- Customer-facing UI must not depend on `missing` assets resolving — every
  consumer of `getAsset()` must handle the `missing` status gracefully.
