# Empire Comfort Systems / American Hearth — Source Truth Notes

_Last updated: 2026-05-24_

Product-truth ingest for Empire Comfort Systems / American Hearth / White Mountain Hearth gas fireplaces,
inserts, and log sets. Primary sources: installation/owner's manuals and internal spec sheets from the
App Source Intake tree.

Empire Comfort Systems manufactures several brands:
- **Empire** / **American Hearth** — primary direct-vent and vent-free fireplace line
- **White Mountain Hearth** — specialty/premium insert line (Renegade, Franklin, Loft DV inserts)
- **Carol Rose** — outdoor coastal collection
- **Nexfire** — electric fireplaces

All records in this batch use `vendor: 'Empire Comfort Systems'` with brand/line noted in `productName`.

## Source Files Inspected

All files are read-only under the canonical source-intake tree. Never edited.

### Manuals/Empire/

| File | Type | Date | Result |
|------|------|------|--------|
| `Empire Inserts.pdf` | install_manual (40p) | 2011 | **Used** — VFP20IN and VFP28IN vent-free insert records |
| `VF Loft Fireplace.pdf` | install_manual (48p) | 2012 | **Used** — VFLL38FP vent-free linear fireplace record |
| `VFSR Burners.pdf` | install_manual (24p) | 2009 | **Used** — VFSR/VFSV/VFSM 18"/24"/30" log set records |
| `VFS42FB Firebox Specs for Lawson.doc` | vendor_spec_sheet (1p, binary .doc) | 2009 | **Used (partial)** — VFS42FB record; dimension table extracted from binary but framing table partially garbled |
| `Vail Specs.pdf` | spec_sheet (1p) | 2009 | **Image-only** — no extractable text; deferred |
| `Flint Hill VFDR18LBN.pdf` | install_manual (36p) | 2011 | Reviewed — VFDR/VFDT/VFDM log sets; minimum opening dims extracted but deferred (covered by VFSR batch) |
| `Mantis - Bay Window & Fireplace.pdf` | owner_manual (28p) | 2012 | Reviewed — BF/BP/BI/FF/FW28BM Power-Vent models; no dimension table found; deferred |
| `Mantis - G Class.pdf` | owner_manual (40p) | 2012 | Reviewed — FG28BM/IG28BM; BTU table found (5 flame levels, 10K–20K BTU) but no body dimensions; deferred |

### Vendors/Empire/ (DXF zips and image files)

| File | Type | Result |
|------|------|--------|
| `24DVI-Dimensions_DXF.zip` | CAD DXF only | Deferred — DXF-only without paired manual; model code "24DVI" not confirmed in on-file documentation |
| `34DVI-Dimensions_DXF.zip` | CAD DXF only | Deferred — same; 34DVI labels FRONT/LEFT SIDE/TOP views but no paired product doc |
| `42MVCP-CAD-Details.zip` | CAD DXF only | Deferred — no text layer in DXF; dimension data not readable |
| `42MVCST-CAD-Details.dxf_.zip` | CAD DXF only | Deferred — no text layer |
| `451FDV-Dimensions.dxf_.zip` | CAD DXF only | Deferred — inner file named `450FDV-Dimensions.dxf`; no paired product doc |
| `FDV200-Dimensions.DXF_.zip` | CAD DXF only | Deferred — FRONT/TOP VIEW/RIGHT SIDE labels present but no paired brochure/manual |
| `FDV350-2018-Dimensions.DXF_.zip` | CAD DXF only | Deferred — GAS INLET label found; no paired brochure |
| `Empire VF log 1.jpg`, `2.jpg`, `3.jpg` | product photos | Out of scope — image only, no dimension data |
| `American_Hearth_Brochures_page.txt` | URL stub | Status: needs_direct_pdf_pull from americanhearth.com |
| `Franklin__Loft_direct-vent_fireplace_inserts_brochure_page.txt` | URL stub | Status: needs_direct_pdf_pull — WMH Franklin/Loft DV insert brochure |
| `Renegade_clean-face_direct-vent_fireplace_insert_brochure_page.txt` | URL stub | Status: needs_direct_pdf_pull — WMH Renegade insert brochure |

## Records Added (2026-05-24)

7 records, vendor: Empire Comfort Systems

| ID | Product | dimensionStatus | Notes |
|----|---------|-----------------|-------|
| empire-vfp20in-product-truth | VFP20IN vent-free insert | partial | Dimension letter assignment requires Figure 1 diagram |
| empire-vfp28in-product-truth | VFP28IN vent-free insert | partial | Same manual as VFP20IN |
| empire-vfll38fp-product-truth | VFLL38FP vent-free linear | partial | Dimension letter assignment requires Figure 1 diagram |
| empire-vfs42fb-product-truth | VFS42FB vent-free select firebox | partial | From binary .doc; framing W/D not cleanly extracted |
| empire-vfsr18-logset-product-truth | VFSR-18 slope glaze log set | partial | Minimum opening known; no self-contained body dims |
| empire-vfsr24-logset-product-truth | VFSR-24 slope glaze log set | partial | Same |
| empire-vfsr30-logset-product-truth | VFSR-30 slope glaze log set | partial | Same |

## Dimension Notes

### Why All Records Are Partial

Empire's install manuals use lettered dimension diagrams (Figure 1 with labels A through K). The
dimension tables give values for each letter but the figure diagrams are embedded images — not
extractable text. Without the figure, letter-to-axis assignment (which letter = width, height, depth)
requires interpretation.

Convention used for VFP20IN/VFP28IN insert records:
- **A** = unit height (19-3/4" for VFP20IN / 22-1/2" for VFP28IN)
- **B** = unit width at firebox (28" / 30-1/2")
- **H** = unit overall depth (12-3/4" / 14-1/4") — confirmed against minimum opening depth
- **C** = decorative face/surround width (40" / 43")
- **D** = firebox interior depth (11-3/8" / 14-1/2")

Convention used for VFLL38FP linear record:
- **A** = overall unit width (43-1/4")
- **B** = overall unit height (35-1/4")
- **C** = overall unit depth (11-31/32")
- **D** = framing/rough opening width (38-1/4")
- **J** = framing/rough opening height (21-1/8")
- **K** = framing/rough opening depth (13")

All dimension letter assignments should be verified against the actual figure diagrams in the
source PDFs before using for rough-opening or stone shop specifications.

### Log Set Minimum Opening Convention

For log sets (VFSR series), `framingDimensions` stores the **minimum masonry fireplace opening**
required for the log set (not a self-contained body). `seriesDimensions` is null — log sets do not
have a self-contained firebox body.

The VFSM variants of the VFSR series have wider burner pans and require larger openings:
- VFSM-18: 32"W × 21"H (vs VFSR-18: 28"W × 17"H)
- VFSM-24: 34"W × 27"H (vs VFSR-24: 30"W × 23"H)
- VFSM-30: 38"W × 30"H (vs VFSR-30: 34"W × 26"H)

`framingDimensions` in all log set records uses the VFSR/VFSV standard (smaller) variant.

### VFS42FB — Binary .doc Extraction

The `VFS42FB Firebox Specs for Lawson.doc` is a 2009 Microsoft Word binary file. Text was extracted
via raw byte reading. The A–E dimension table came through cleanly. The framing table row
(Frame H / Frame W / Frame D) was partially garbled — Frame H=41-5/8" was captured but Frame W
and Frame D values were not reliably extracted. The record reflects only what was confirmed.

### VFSR vs Flint Hill (VFDR) Log Sets

Two manual sources cover Empire vent-free log sets:
- `VFSR Burners.pdf` (2009) — VFSR/VFSV/VFSM Slope Glaze Burner series; used for this batch
- `Flint Hill VFDR18LBN.pdf` (2011) — VFDR/VFDT/VFDM series (Flint Hill product name); similar
  minimum opening dimensions but slightly different (depth B=12" vs VFSR B=14")

The Flint Hill manual records were reviewed but not added to this batch to avoid duplication.
If Benson Stone actively sells Flint Hill log sets, add separate records from that manual.

## Sales-Guardrail Notes (Internal Only)

> **Whisper Flex requirement** — Per internal field rule, all Empire / White Mountain Hearth
> vent-free log sets installed through Benson Stone require Whisper Flex as a standard add-on.
> This rule is captured in `internalNotes` of all three VFSR log set records. Do NOT make
> customer-facing claims about this requirement — confirm with rep before each quote.

This is an internal sales guardrail, not a manufacturer requirement stated in the manual.

## Skipped / Deferred

- **Mantis Power-Vent Fireplaces** (BF/BP/BI/FF/FW28BM, FG28BM, IG28BM): Power-vent sealed
  combustion — unique product not found in current price list; no body dimensions in on-file manuals;
  deferred pending confirmation of current availability with Empire rep
- **Vail Specs.pdf**: Image-only 1-page spec sheet; deferred
- **DXF files (24DVI, 34DVI, 42MVCP, 42MVCST, 450FDV, FDV200, FDV350)**: CAD-only with no paired
  text brochure or manual on file; model identity unconfirmed; deferred
- **Flint Hill (VFDR/VFDT/VFDM) log sets**: Reviewed; deferred to avoid duplication with VFSR batch
- **White Mountain Hearth inserts (Renegade, Franklin, Loft DV)**: Stubs only — brochures need
  direct PDF pull from americanhearth.com; deferred
- **Rushmore, Innsbrook, Boulevard, Tahoe, Breckenridge**: In price list with model codes but no
  dimension brochure/manual on file for these specific product lines; deferred until install manual
  or brochure with confirmed dimensions is available
- **Carol Rose Outdoor**: Out of scope
- **Nexfire Electric**: Out of scope (electric, no gas)
- **Empire B-Vent (Keystone)**: Lower priority; deferred
