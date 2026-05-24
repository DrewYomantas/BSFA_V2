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

---

## Batch Source Truth V1 — All Available Kozy Heat CADdetails Packages

_Date: 2026-05-24_

Full pass over all 24 available Kozy Heat CADdetails "Fireplaces - All.zip" packages in the
App Source Intake. 23 new `product_truth` records written (21 products, some covering multiple
SKU variants). Added to `src/data/hearthVisualAssets/hearthVisualAssetSeed.js` in addition to
the 3 existing Chaska records.

### Packages inspected

| Package | Product | CAD format | Rev date | Result |
|---|---|---|---|---|
| 5178-001 | Alpha 36S | PDF Plus | — | ✓ record written |
| 5178-002 | Chaska 25 | PDF Plus | 06/12/2017 | existing record |
| 5178-003 | Chaska 29 | PDF Plus | 06/12/2017 | existing record |
| 5178-004 | Chaska 335S | PDF Plus | 06/12/2017 | existing record |
| 5178-005 | Chaska 34 | PDF Plus | — | ✓ record written (partial — opening H unlabeled) |
| 5178-010 | Bayport 36 | PDF Plus | 01/04/2024 | ✓ record written |
| 5178-011 | Bayport 41 | PDF Plus | 01/04/2024 | ✓ record written |
| 5178-019 | SP34 | PDF Plus | — | ✓ record written (conflict: H) |
| 5178-020 | SP41 | PDF Plus | — | ✓ record written (SKU dims null — CAD only) |
| 5178-021 | Springfield 36 | PDF Plus | — | ✓ record written (conflict: W and H) |
| 5178-024 | Oakport 18 | PDF Plus | — | ✓ record written (all confirmed) |
| 5178-026 | Callaway 50 | PDF Plus | — | ✓ record written |
| 5178-028 | Callaway 40 | PDF Plus | — | ✓ record written |
| 5178-029 | Callaway 72 | PDF Plus | — | ✓ record written |
| 5178-030 | Bellingham 52 | PDF Plus | — | ✓ record written |
| 5178-031 | Bellingham 44 | PDF Plus | — | ✓ record written |
| 5178-033 | Bellingham 38 | PDF Plus | — | ✓ record written |
| 5178-034 | Callaway See-Thru | PDF Plus | — | ✓ record written |
| 5178-040 | Nordik 29i | PDF Plus | — | ✓ record written |
| 5178-041 | Nordik 34i | PDF Plus | — | ✓ record written |
| 5178-042 | Nordik 36DV | PDF Plus | 01/04/2024 | ✓ record written |
| 5178-043 | Nordik 41DV | PDF Plus | 01/04/2024 | ✓ record written |
| 5178-044 | Nordik 48DV | PDF Plus | 01/04/2024 | ✓ record written |
| 5178-045 | Nordik 60TL | PDF Plus | 19/02/2025 | ✓ record written |
| 5178-049 | Nordik 48TL | MFG PDF | — | ✓ record written (ID by SKU dim match) |
| 5178-050 | Lakefield XL Log (IPI) | MFG PDF | — | ✓ record written (partial — ID by elimination) |
| 5178-051 | Lakefield XL MV | MFG PDF | — | ✓ record written (partial — ID by elimination) |

_Packages 5178-006 through 5178-009, 5178-012 through 5178-018, 5178-022, 5178-023, 5178-025,
5178-027, 5178-032, 5178-035 through 5178-039, 5178-046 through 5178-048 were not present in
the intake folder (may represent retired products, alternate bundles, or not yet ingested)._

### Dimension summary

| Product | Outer W | Outer H | Depth (used) | Opening W × H | Conflicts / flags |
|---|---|---|---|---|---|
| Alpha 36S | 46.5" | 47" | 23.375" | 41.69" × 33.56" | sourceConflict: SKU H 41.69" = opening W (likely data entry error) |
| Chaska 34 | 33.375" | 23" | 17.25" | 32.375" × null | partial: opening H unlabeled |
| Bayport 36 | 35.75" | 32" | 25.875" | 32.625" × 26.81" | confirmed |
| Bayport 41 | 40.75" | 34.5" | 28.375" | 37.625" × 29.31" | confirmed |
| SP34 | 34" | 33.375" | 13.5" | 28" × 20.5" | sourceConflict: H — CAD 33.375" vs SKU 30" |
| SP41 | 40.75" | 37" | 15" | 34.375" × 24.125" | SKU dims null — CAD only |
| Springfield 36 | 35.75" | 33.44" | 19.75" | 29.625" × 21.81" | sourceConflict: W (CAD 35.75 vs SKU 36.75) and H |
| Oakport 18 | 22.44" | 26.75" | 13.81" | 16.56" × 11.125" | confirmed, all sources agree |
| Callaway 40 | 49.5" | 39.25" | 22" | 43.375" × 16.75" | confirmed |
| Callaway 50 | 59.5" | 39" | 22" | 53.5" × 16.75" | confirmed |
| Callaway 72 | 81.5" | 40.75" | 22" | 75.5" × 18.375" | confirmed |
| Callaway See-Thru | 59.5" | 39.125" | 17" | 53.5" × 16.75" | confirmed |
| Bellingham 38 | 44.625" | 35.25" | 20" | 38.44" × 24.875" | confirmed |
| Bellingham 44 | 50.625" | 35.25" | 20" | 44.44" × 24.875" | confirmed |
| Bellingham 52 | 58.625" | 41.25" | 26.5625" | 52.44" × 30.875" | confirmed |
| Nordik 29i | 29.625" | 19.875" | 14" (body) | 27.69" × 17.31" | confirmed |
| Nordik 34i | 33.875" | 23.75" | 14.0625" (body) | 30.69" × 22.25" | confirmed |
| Nordik 36DV | 35.75" | 32" | 19.5" | 32.625" × 26.875" | confirmed |
| Nordik 41DV | 40.75" | 34.5" | 20" | 37.625" × 29.375" | confirmed |
| Nordik 48DV | 47.625" | 41" | 21.375" | 44.5" × 35.375" | confirmed |
| Nordik 60TL | 69.5" | 46.125" | 19.5" | 63.375" × 23.75" | confirmed |
| Nordik 48TL | 57.5" | 46.125" | 19.5" | 51.375" × 23.75" | confirmed (ID by SKU dim match) |
| Lakefield XL | 60.25" | null | 21.5" | 47.25" × 20" (Log) / 18.5" (MV) | partial — H unlabeled; product ID by elimination |

### Conflicts found

1. **Alpha 36S**: SKU height field 41.6875" exactly equals CAD opening width — likely data entry
   error. CAD outer H 47" used.
2. **SP34**: Outer height CAD 33 3/8" vs SKU 30". Width and depth agree.
3. **Springfield 36**: Outer width CAD 35 3/4" vs SKU 36 3/4" (1" difference) and height
   CAD 33 7/16" vs SKU 30".

### Newer MFG PDF packages (5178-049 through 5178-051)

These packages use a newer CADdetails format (`MFG PDF *.pdf`, `Specs *.pdf`) and contain no
product title text in the drawing. Products were identified by:
- **5178-049**: Exact dimensional match with SKU `NDK-48-TL` (57.5 × 46.125 × 19.5 in).
- **5178-050/051**: SKU elimination — only remaining Kozy Heat gas products without confirmed
  CAD packages were `LXL-22-L` and `LXL-22-MV` (Lakefield XL). Both packages share the same
  outer shell (60 1/4" wide, 21 1/2" deep) with different opening heights (20" vs 18 1/2").
  Rep should confirm product IDs against Lakefield XL install manual before quoting.

### Products NOT in this pass

- Osseo Electric series (OSO-E29/E34/E50/E64/E80): electric fireplaces, not relevant for
  stone work planning.
- Roosevelt: no CADdetails package found in intake folder.
- Z42 Albany (wood burning): no CADdetails package found in intake folder.
- Stone-veneer bundles: skipped per pattern rule.

### What was NOT done

- No stone-veneer bundles opened.
- MFG DXF/DWG/Specs/Revit files noted but not parsed.
- customerSafe / customerFacingAllowed remain false on all new records.
- No UI changes — ProductTruthPanel surfaces these records same as Chaska records.
