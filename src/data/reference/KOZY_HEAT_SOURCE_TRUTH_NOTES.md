# Kozy Heat — Source Truth Notes

_Last updated: 2026-05-24_

Running log of Kozy Heat product-truth ingests against the App Source Intake
CADdetails packages. New entries appended as the pattern is repeated.
For the recipe, see `PRODUCT_TRUTH_PATTERN.md`.

## Chaska 25 / Chaska 29 — Source Truth Follow-up

_Date: 2026-05-24_

This section records the second-pass source-truth review for the two Kozy Heat Chaska
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

## Chaska 335S — Pilot of the Product-Truth Pattern

_Date: 2026-05-24_

First ingest after the pattern (`PRODUCT_TRUTH_PATTERN.md`) and checklist
(`SOURCE_EVIDENCE_CHECKLIST.md`) were written. Chose the next numeric sibling
after Chaska 29 in the Kozy Heat vendor folder. 5178-004 turned out to be the
Chaska 335S (Chaska series, millivolt budget variant) — a clean follow-on to
the Chaska 25/29 records.

### Source package

- `C:/Users/beyon/OneDrive - Benson Stone Company/Hearth Studio Source Packets/00 - App Source Intake/03 - Product Lists, Manuals & Vendor References/Vendors/Kozy Heat/5178-004 - Kozy Heat Fireplaces - All.zip` — Chaska 335S

Extracted to `%TEMP%\bsfa-kozy-pilot\5178-004\` with `tar -xf`. Inner files:
`PDF Plus 5178-004.pdf`, `DXF Plus 5178-004.dxf`, `DWG Plus 5178-004.dwg`,
`DWF Plus 5178-004.dwf`, `SketchUp 5178-004.skp`, `Printable CAD Plus 5178-004.gif`,
`Revit Family 5178-004.zip` (not parsed). PDF used as source of truth.

### Chaska 335S — CADdetails 5178-004 (rev 06/12/2017)

| Field | Value |
|---|---|
| Front width | 33 3/8" (33.375) |
| Front height | 23" |
| Body depth (left view) | 17 1/4" (17.25) |
| Viewing area | 32" W × 18 1/8" H |
| Top deck | 24 3/8" W × 16" D |
| Top overhang above top deck | 5" |
| Right view vent collar offset | 9 1/2" from right edge |
| Venting | Top, twin collars on top deck |

### Notes on the SKU vs CAD reading

- Price book SKU JSON lists depth 16". CADdetails left view shows body depth 17 1/4".
  These measure different parts of the same unit: 16" is the top-deck depth, 17 1/4"
  is the body depth including the 5" forward overhang. Both are correct, so
  `sourceConflict` is **not** set. The distinction is recorded in `sourceEvidence[2].notes`
  and the record's `internalNotes`. Plan rough-opening around 17 1/4".
- SKU JSON labels ignition as `IPI`; the Kozy Heat Quick Reference Chaska Series table
  lists CSK-335S as the millivolt budget variant at $3,075. The Quick Reference is the
  more recent / more trusted source for ignition type here. Reconfirm against the live
  price book on next pass.

### Did the existing schema hold?

Mostly yes. One small extension: framing/top dimensions on this unit needed a
`topOverhangIn` value (the 5" forward extension above the top deck), and the
right-side view contributed a collar-position figure (`rightCollarOffsetIn`).
Both fit naturally inside the existing `framingDimensions` object — no schema or
normalizer change required. The model already accepts arbitrary keys under
`framingDimensions` because it is normalized as a plain object.

The pattern doc was updated to call out the "different measurements vs conflict"
distinction surfaced by this pilot.

### What was NOT done

- No stone-veneer bundles opened.
- DWG/DXF/Revit/SketchUp/GIF were noted but not parsed.
- customerSafe / customerFacingAllowed remain false.
- No batch ingest — this is a single-unit pilot.
