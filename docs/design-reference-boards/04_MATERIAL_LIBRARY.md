# Board 04 — Material Library

## Purpose
A truthful reference of every material the app can choose between — stone, mantel wood, hearth slab, finish — captured the way a craftsman would photograph it. This is the source-of-truth board for UE5 texturing and for selection-tile imagery alike. Customers select against this language; UE5 renders against this language.

## What images to include
- Stone (per SKU): full panel, edge profile, single representative block, two lighting conditions (raking side light + soft overcast)
- Mantel wood (per species/finish): face grain, end grain, finished + raw if applicable
- Hearth slab (per material): top surface, edge thickness, cut/honed/flamed finish variants
- Mortar / grout: dry joint, wet joint, raked joint where relevant
- Adjacent finishes: matching trim paint chips, drywall texture, floor transitions
- Real-world scale references: hand on stone, ruler at edge, sample board in showroom
- Color truth shots: each material photographed against a neutral grey card

## What Claude Design should learn
- Material is read through texture, edge, and light direction — not flat color swatches
- Stone has a dominant orientation; rotate it wrong and it dies
- Wood needs end-grain to read as solid, not veneer
- Honed vs polished vs flamed are completely different products — never collapse them
- Two stones can share a color name and read totally different under raking light
- Mortar joint width and shadow do as much visual work as the stone face

## What Claude Design should avoid
- Manufacturer marketing shots — over-lit, color-shifted to flatter
- Stock texture libraries (cgtrader, textures.com) — they look like games
- Single front-lit "swatch" photos with no edge or shadow
- Pulling color from a website screenshot — always color-check against a physical sample
- Generic "wood" or "stone" labels — every entry must map to a real SKU or be tagged `__moodonly__`
- Photoshop tile-stamping that reveals repeat patterns

## Suggested file naming convention
```
04-material__<category>__<sku-or-slug>__<view>__<lighting>__<id>.<ext>
```
Categories: `stone`, `mantel`, `hearth`, `mortar`, `trim`, `floor`
Views: `panel`, `edge`, `block`, `face`, `endgrain`, `top`, `joint`, `scale`
Examples:
- `04-material__stone__cliffstone__panel__raking-side__001.jpg`
- `04-material__stone__cliffstone__edge__overcast__002.jpg`
- `04-material__mantel__rusticoak__endgrain__north-window__001.jpg`
- `04-material__hearth__bluestone__top__raking-side__003.jpg`
- `04-material__mortar__cliffstone-drystack__joint__detail__001.jpg`

## Notes for Drew while gathering images
- For every Benson SKU you intend to ship in V2, you need at minimum: 1 panel shot + 1 edge shot + 1 raking-light detail. Three images, three angles. Less is not enough.
- Use a neutral grey card in at least one shot per SKU. We'll color-correct against it.
- If you can shoot a hand or a ruler against the stone, do — scale references make the difference between "render" and "real."
- Note the SKU code in the filename. If we lose the SKU, we lose the source.
- Keep raw EXIF — we'll use timestamp and lighting metadata later.
- Stone panels in the showroom: shoot them in their installed location AND as isolated samples if possible. The pair tells UE5 how to texture and how to compose.
- Avoid shooting through glass display cases.
