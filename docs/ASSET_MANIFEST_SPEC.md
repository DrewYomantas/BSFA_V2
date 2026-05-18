# Render Asset Manifest Spec

The React app consumes UE5 (and other) renders through a single manifest file. UE5 stays a render studio; React stays a consumer. This boundary is intentional.

## Location
- Manifest: `public/assets/renders/manifest.json`
- Assets: `public/assets/renders/<category>/<slug>.<ext>` (placeholders currently live under `public/assets/renders/placeholders/`)

## Schema
```json
{
  "version": 1,
  "renders": {
    "<slug>": {
      "type": "image" | "video",
      "src": "/assets/renders/...",
      "placeholder": true,
      "alt": "optional human label",
      "poster": "optional poster image for videos"
    }
  }
}
```

- `slug` format: `category.variant` (lowercase category, camelCase variant). Examples: `stone.cliffstone`, `mantel.rusticOak`, `mood.warmEvening`.
- `type`:
  - `image` — PNG, JPG, WEBP, SVG. Served via `<img>`.
  - `video` — MP4 or WEBM. Served via autoplay/muted/looped `<video>` (no controls; ambient only).
- `placeholder: true` is a soft hint that this is not the final art. The UI ignores it today; later milestones may stamp a "preview" badge.

## Adding a new render (UE5 → React)
1. Drop the file under `public/assets/renders/<category>/<slug>.<ext>` (e.g. `public/assets/renders/stone/cliffstone.png`).
2. Edit `public/assets/renders/manifest.json` and add or update the entry:
   ```json
   "stone.cliffstone": { "type": "image", "src": "/assets/renders/stone/cliffstone.png" }
   ```
3. No React code changes required. `src/components/RenderImage.jsx` resolves the slug at render time via `src/lib/renderManifest.js`.

## Replacing a placeholder
- Update the `src` and remove `"placeholder": true`. The slug stays the same. Anywhere the slug is referenced (via `src/lib/buildOptions.js` or directly in a screen) picks up the new art automatically.

## Slug naming conventions
- Stones: `stone.<variant>` — e.g. `stone.cliffstone`, `stone.fieldledge`
- Mantels: `mantel.<variant>` — e.g. `mantel.rusticOak`, `mantel.paintedWhite`
- Hearths: `hearth.<variant>` — e.g. `hearth.bluestone`
- Lighting moods: `mood.<variant>` — e.g. `mood.warmEvening`, `mood.cleanDaylight`
- Composite scenes (future): `scene.<variant>` — full-room renders driven by selection combos.

## What UE5 must NOT do
- Do not write to the React `src/` tree.
- Do not modify `package.json`, `index.html`, or any React component.
- Do not bake supplier names, SKUs, or internal codes into filenames or alt text (see `CUSTOMER_SAFE_BOUNDARY.md`).

## Fallback behavior
- Missing slug → `RenderImage` renders a neutral grey card labeled "no render". This is intentional and ships safely; it is not a failure state.
