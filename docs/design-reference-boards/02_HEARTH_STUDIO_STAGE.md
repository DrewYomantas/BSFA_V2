# Board 02 — Hearth Studio Stage

## Purpose
Define the look and feel of the staged hearth itself — the centerpiece the UE5 render studio will produce and the React app will display. This is the "hero shot" target. Every Build screen tile and Summary preview pulls from this visual language.

## What images to include
- Fireplaces in real homes (not showrooms) — full wall hearths, mantels, raised hearths
- Range of styles: rustic ledgestone, cliffstone, refined limestone, painted modern
- Mantel variety: rough-hewn oak, painted white, reclaimed beam, floating stone
- Hearth slabs: bluestone, limestone, soapstone, polished and natural finishes
- Fires: wood with real ember glow, gas at low and high settings, electric subtlety
- Mood/lighting variety: warm evening, clean daylight, dim winter morning, summer dusk
- Rooms with the hearth as anchor — show negative space and surrounding furniture for scale
- Close-ups: stone-to-mantel joint, hearth-to-floor transition, firebox shadow

## What Claude Design should learn
- The hearth is the room's gravity well — composition centers and slows around it
- Stone reads through shadow and side light, not front light
- Fire is warmth, not spectacle — embers and glow over flame height
- Materials must look pickup-able: weight, temperature, grain
- The same hearth must look believable in evening AND daylight (mood is a setting, not a filter)
- Scale comes from human-height cues (mantel ~54", hearth slab ~18" deep)

## What Claude Design should avoid
- CGI/render aesthetic that looks like CGI (over-perfect symmetry, plastic stone, ray-tracing showoff)
- Spec-sheet/product-shot framing on plain backgrounds
- Excessive flame — Yule-log loops, roaring fires, sparks
- Christmas / holiday staging — stockings, garland, seasonal dressing
- Tile-pattern stone that reads as veneer panel rather than real ledgestone
- HGTV reveal-shot symmetry and color grading
- Any "before/after" framing

## Suggested file naming convention
```
02-stage__<element>__<variant>__<lighting>__<id>.<ext>
```
Elements: `full`, `stone`, `mantel`, `hearth`, `fire`, `joint`, `room`
Examples:
- `02-stage__full__cliffstone-rusticoak-bluestone__warm-evening__001.jpg`
- `02-stage__stone__fieldledge__overcast__004.jpg`
- `02-stage__mantel__paintedwhite__morning-side-light__002.jpg`
- `02-stage__joint__stone-to-mantel__detail__001.jpg`

## Notes for Drew while gathering images
- Prioritize homes over showrooms. Showroom shots flatten the hearth.
- Pull at least 3 lighting variants per stone style — proves the material reads across moods.
- Capture the "ugly angles" too — oblique, low, off-center. UE5 will need these.
- Note approximate dimensions on the image filename or a sibling `.txt` if you know them — mantel height, hearth depth, stone width.
- If an image is gorgeous but the stone isn't a Benson SKU, keep it as mood reference and tag it `__moodonly__` in the filename.
- Avoid pulling anything with a competitor watermark or trademark visible.
