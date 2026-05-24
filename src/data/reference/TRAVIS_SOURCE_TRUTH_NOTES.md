# Travis Industries — Source Truth Notes

_Last updated: 2026-05-24_

Product-truth ingest for Travis Industries / Fireplace Xtrordinair (FPX) / Lopi gas fireplaces.
Primary source: FPX brochure and single-page flyers from the App Source Intake tree.

Travis Industries manufactures two premium gas fireplace brands sold through separate dealer channels:
- **Fireplace Xtrordinair / FPX** — sold through Fireplace Xtrordinair specialty dealers
- **Lopi** — sold through Lopi specialty dealers (same firebox, different facing options/model codes)

All records in this batch use `vendor: 'Travis Industries'` with brand noted in `productName`.

## Source Files Inspected

All files are read-only under the canonical source-intake tree. Never edited.

| File | Type | Result |
|------|------|--------|
| `FPX Premium Traditional Gas Fireplaces brochure.pdf` | brochure (40p) | **Used** — primary source for all 5 records |
| `FPX 564 TRV 25K Deluxe single-page flyer.pdf` | flyer (2p) | **Used** — secondary confirmation for 564 TRV 25K |
| `FPX 864 TV 40K Deluxe single-page flyer.pdf` | flyer (2p) | **Used** — secondary confirmation for 864 TV 40K |
| `FPX 864 TV 40K 31K GSR2 Operation Manual.pdf` | manual (40p) | On file — not read for dimensions (brochure pp.36-39 sufficient) |
| `Lopi 564 + 864 Series Gas.pdf` | brochure (35p) | **Image-only PDF** — no extractable text; deferred |
| `FPX Premium Linear Gas.pdf` | brochure (8p) | **Image-only PDF** — no extractable text; deferred |
| `564 Metalsmith.pdf` | brochure (?) | Image-based; deferred |
| `564 with Classic Arch.pdf` | brochure (?) | Image-based; deferred |
| `DaVinci owners manual.pdf` | manual (large) | Out of scope — DaVinci is a separate product line |
| `Fireplace Xtraordinair Firebacks.pdf` | accessory brochure | Out of scope — accessories only |
| `*.rfa files` (3615, 4415, 4415ST, 6015) | Revit models | Linear FireplaceX models — deferred (no brochure with text dimensions) |
| `*.dxf files` (d40, dxv35, dxv42, dxv45, dxv60) | CAD only | No brochure/manual on file with extracted text; deferred |

## Records Added (2026-05-24)

5 records, vendor: Travis Industries (FPX brand)

| ID | Product | Status | Notes |
|----|---------|--------|-------|
| travis-fpx-564trv25k-product-truth | FPX 564 TRV 25K | confirmed | Two sources (brochure + flyer) |
| travis-fpx-564tv35k-product-truth | FPX 564 TV 35K | confirmed | Brochure only |
| travis-fpx-864trv31k-product-truth | FPX 864 TRV 31K | confirmed | Brochure only |
| travis-fpx-864tv40k-product-truth | FPX 864 TV 40K | confirmed | Two sources (brochure + flyer) |
| travis-fpx-4237tv-product-truth | FPX 4237 TV | confirmed | Brochure only |

## Dimension Notes

### Source of Truth

Primary source: FPX Premium Traditional Gas Fireplaces brochure, pp.36–39:
- p.36: 564 Collection spec table (H, W, D, glass area, BTU, efficiency)
- p.37: 864 Collection + 4237 spec table (same fields)
- p.38: Dimensions and Framing diagrams for 564 TRV 25K / 864 TRV 31K / 864 TV 40K
- p.39: Dimensions and Framing diagrams for 564 TV 35K / 4237 TV

All brochure specs labeled "for reference only — refer to Owner's Manual prior to installation."
The spec tables are high confidence for planning purposes; installation manual is authoritative for final rough opening.

### Deluxe vs Clean Face Models

Every FPX 564 and 864 model is offered in two configurations:
- **Deluxe** — standard unit with decorative face options (grills, arched doors, etc.)
- **Clean Face (CF)** — integrated surround with minimal trim frame

The CF model is physically **larger** because it includes an integral surrounding frame. Body dimensions differ:

| Model | Deluxe W / H / D | Clean Face W / H / D |
|-------|------------------|----------------------|
| 564 TRV / TV | 37-1/4" / 37" / 17-1/4" | 38-1/4" / 37" / 19-1/8" |
| 864 TRV / TV | 41" / 38-1/4" / 20-3/4" | 42-3/4" / 44-3/4" / 22" |

`seriesDimensions` in all records uses the **Deluxe** body. CF dimensions are in `internalNotes`.
This is NOT a `sourceConflict` — they are different products with different physical footprints.

### 864 TRV 31K vs 864 TV 40K — Identical Body

The 864 TRV 31K and 864 TV 40K share the same physical firebox and framing dimensions.
Differences are BTU output (31K vs 40K) and vent location (top-or-rear vs top-only).

### 4237 TV — Tapered Firebox

The 4237 TV has a tapered firebox: front width 59-1/4", back width 37-1/4".
Framing is rectangular (59-1/2" wide). Framing depth: 29-1/4" flush / 28-3/4" extended.
NOT a sourceConflict — tapered unit in rectangular framing opening is expected.

### Model Codes

The FPX brochure does not list specific SKU model codes. Records use product name strings
(e.g., `'564 TRV 25K Deluxe'`) as modelCodes. These should be updated when a price list
with confirmed SKU codes is available. The 864 GSR2 operation manual on file refers to
the 864 TV 40K as "864 GSR2" — that designation may be the SKU family.

### Lopi Brand Note

Lopi 564 + 864 fireplaces use the same Travis Industries firebox as FPX models. The Lopi
brochure (35p, 12.4MB) is image-only — no extractable text. Lopi-brand records are deferred
until a text-based source (install manual, price list) is available with confirmed Lopi model codes.

### Pricing

No MSRP data available from these sources. FPX brochure and flyers do not include pricing.
`msrpRange: null` for all records in this batch. Contact Travis rep or check current price list.

## Skipped / Deferred

- **Lopi 564 / 864**: Same firebox as FPX, but image-only brochure — defer to install manual or price list with Lopi model codes
- **FPX Linear (3615, 4415, 6015 GSR2)**: Revit files on file but brochure is image-only; no extractable dimensions — defer
- **DaVinci**: Separate product line; owner manual on file (9MB). Defer pending scope decision
- **FPX / Lopi wood stoves**: Out of scope for this pass
- **Outdoor products**: Out of scope
- **564 Metalsmith, 564 with Classic Arch**: Image-only PDFs; facings only, no body dimensions
- **DXF files (dxv35, dxv42, dxv45, dxv60, d40)**: CAD-only, no corresponding text brochure on file — defer
