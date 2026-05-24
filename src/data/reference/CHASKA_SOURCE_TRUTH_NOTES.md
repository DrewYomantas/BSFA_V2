# Chaska 25 / Chaska 29 — Source Truth Follow-up

_Date: 2026-05-24_

This note records the second-pass source-truth review for the two Kozy Heat Chaska
gas inserts. The first pass (commit b823ac0) used only the June 2025 price book SKU
JSON, which left Chaska 25 with null dimensions and Chaska 29 with a depth that
turned out to disagree with the vendor CADdetails drawing.

This pass inspected the actual CADdetails packages bundled in the source intake.

## Source packages inspected

Both files live under the canonical source-intake tree (read-only, never edited):

- `C:/Users/beyon/OneDrive - Benson Stone Company/Hearth Studio Source Packets/00 - App Source Intake/03 - Product Lists, Manuals & Vendor References/Vendors/Kozy Heat/5178-002 - Kozy Heat Fireplaces - All.zip` — Chaska 25
- `C:/Users/beyon/OneDrive - Benson Stone Company/Hearth Studio Source Packets/00 - App Source Intake/03 - Product Lists, Manuals & Vendor References/Vendors/Kozy Heat/5178-003 - Kozy Heat Fireplaces - All.zip` — Chaska 29

Each CADdetails zip contains: a `PDF Plus *.pdf` dimensioned drawing, a `DXF Plus *.dxf`,
a `DWG Plus *.dwg`, a `DWF Plus *.dwf`, a SketchUp `.skp`, a `Media *.zip` (Chaska 25
only), and a Revit family zip.

The dimensioned PDF is the source of truth for this record. DWG/DXF/Revit/SketchUp
files are available if a CAD layout is needed later and are noted in `sourceEvidence`.
Media zips and stone-veneer bundles were intentionally **not** opened.

## Chaska 25 — CADdetails 5178-002 (rev 06/12/2017)

Previously: all dimensions null in price book → record flagged `dimensions missing`.

Now confirmed from `PDF Plus 5178-002.pdf`:

| Field | Value |
|---|---|
| Front width | 25 3/8" (25.375) |
| Front height | 17 1/2" (17.5) |
| Depth (left view) | 12 1/4" (12.25) |
| Viewing area | 22 1/8" W × 12 1/4" H |
| Top | 20 3/8" W × 15" D |
| Venting | Top, twin collars |

Price book MSRP $3,125 for CSK-25 still holds.

## Chaska 29 — CADdetails 5178-003 (rev 06/12/2017)

Previously: 29.5 × 19.25 × 14.5 from price book → record flagged `confirmed`.

Now confirmed from `PDF Plus 5178-003.pdf`:

| Field | Value |
|---|---|
| Front width | 29 1/2" (29.5) |
| Front height | 19 1/4" (19.25) |
| Depth (left view) | **14 1/8" (14.125)** |
| Viewing area | 29" W × 15 5/16" H |
| Top | 18 7/8" W × 14 1/2" D |
| Venting | Top, twin collars |

### Conflict

| Source | Depth |
|---|---|
| June 2025 price book SKU JSON | 14.5" |
| CADdetails 5178-003 | 14 1/8" (14.125") |

The record is marked `sourceConflict: true`. Width and height agree across both
sources; only depth disagrees by 3/8". Per the source hierarchy, the vendor
dimensioned drawing wins — `seriesDimensions.depthIn` is 14.125 and the SKU
variants table matches. The price book value is preserved in `sourceEvidence` so
the rep can see both numbers.

## What was NOT done

- No stone-veneer CAD bundles opened.
- DWG/DXF/Revit/SketchUp files were noted but not parsed (PDF was sufficient).
- No changes to customer-facing surfaces — both records remain `customerSafe: false`,
  `reviewStatus: needs_review`.
- No reorganization of the vendor folder layout.

## Where the data lives

- Records: `src/data/hearthVisualAssets/hearthVisualAssetSeed.js`
- Model + normalization: `src/lib/hearthVisualAssets/hearthVisualAssetModel.js`
  - New source types: `vendor_spec_sheet`, `cad_details_pdf`, `cad_drawing`
  - New confidence: `high_vendor_spec`
  - New fields on product_truth: `sourceEvidence[]`, `sourceConflict`, `framingDimensions`, `viewingArea`, `ventingNotes`
- Rep review surface: `src/screens/hearth-visual-assets/HearthVisualAssetsScreen.jsx`
  (`ProductTruthPanel` now shows the conflict badge, viewing area / framing,
  venting notes, and the per-source evidence list).
