# Empire Dimension Diagram Verification Pass

_Date: 2026-05-24_

Follow-up to commit 54e4a97 (Empire source truth batch v1). All 7 Empire records were
committed with `dimensionStatus: partial` because the A–K dimension letters were extracted
from tables without confirmation of the figure diagrams. This pass renders the source PDF
diagram pages at high DPI and visually confirms the letter-to-axis mapping for each record.

Source manuals inspected:
- `Empire Inserts.pdf` (2011, p.9) — VFP20IN, VFP28IN
- `VF Loft Fireplace.pdf` (2012, p.8 Figure 1, p.9 Figure 4) — VFLL38FP
- `VFSR Burners.pdf` (2009, p.8 Figure 2) — VFSR-18 / 24 / 30
- `VFS42FB Firebox Specs for Lawson.doc` — VFS42FB (no figure inspectable; remains partial)

All manual paths are read-only under
`C:/Users/beyon/OneDrive - Benson Stone Company/Hearth Studio Source Packets/00 - App Source Intake/03 - Product Lists, Manuals & Vendor References/Manuals/Empire/`.

---

## Empire Inserts.pdf — Figure 1 (VFP20IN, VFP28IN)

Three orthographic views (top, front, side). Letter mapping visually confirmed:

| Letter | Physical axis |
|--------|---------------|
| A | Inner firebox/insert FRONT HEIGHT |
| B | Inner firebox WIDTH (bottom, front) |
| C | Decorative surround WIDTH (overall bottom) |
| D | Glass viewing area HEIGHT |
| E | Glass viewing area WIDTH |
| F | Decorative surround HEIGHT (right vertical) |
| G | Top width at rear (narrower) |
| H | Unit depth (front-to-back, top + side views) |
| I | Top width at front |
| J | Side overall HEIGHT (from side view) |
| K | Base DEPTH (side view bottom) |

Figure 2 (minimum fireplace opening) uses a separate A–D set:

| Letter | Physical axis |
|--------|---------------|
| A | Opening HEIGHT |
| B | Opening FRONT WIDTH |
| C | Opening DEPTH |
| D | Opening REAR WIDTH |

### empire-vfp20in
- **seriesDimensions** (A=H, B=W, H=D): 19-3/4" × 28" × 12-3/4" — confirmed
- **viewingArea** (E=W, D=H): 25-1/2" × 11-3/8" — **new, was null**
- **framingDimensions** (Fig 2 B=W, A=H, C=D): 26-1/2" × 18-1/2" × 12-3/4" — confirmed
- Decorative surround: C=40" W × F=25-5/8" H (captured in internalNotes only)
- **Upgrade:** partial → **confirmed**

### empire-vfp28in
- **seriesDimensions**: 22-1/2" × 30-1/2" × 14-1/4" — confirmed
- **viewingArea** (E=W, D=H): 28-1/2" × 14-1/2" — **new, was null**
- **framingDimensions**: 30-1/2" × 21-1/2" × 14-1/4" — confirmed
- Decorative surround: C=43" W × F=28-3/4" H
- **Upgrade:** partial → **confirmed**

---

## VF Loft Fireplace.pdf — Figure 1 (VFLL38FP)

| Letter | Physical axis |
|--------|---------------|
| A | Overall front WIDTH |
| B | Overall front HEIGHT |
| C | Viewing area HEIGHT |
| D | Viewing area WIDTH |
| E | Top WIDTH |
| F | Top DEPTH (front-to-back) — this is the true unit depth |
| G | Front lip thickness (1/2") |
| H | Bottom DEPTH (side view, base) |
| I | Front step height (15/16") |
| J | Lower side HEIGHT |
| K | Upper side HEIGHT (chimney/flue stack) |

Rough opening (Figure 4, p.9) uses a separate A–D set:

| Letter | Physical axis |
|--------|---------------|
| A | Rough opening DEPTH (front-to-back) — 13-3/4" |
| B | Rough opening WIDTH — 43-1/2" |
| C | Rough opening HEIGHT — 35-1/4" |
| D | Elevated installation height (top of opening to elevated header) — 48-13/16" |

### empire-vfll38fp
- **seriesDimensions** (A=W, B=H, F=D): 43-1/4" × 35-1/4" × **11-15/32"** (was 11-31/32", which was C = viewing height — corrected)
- **viewingArea** (D=W, C=H): 38-1/4" × 11-31/32" — **new, was null**
- **framingDimensions** (Fig 4 B=W, C=H, A=D): **43-1/2" × 35-1/4" × 13-3/4"**
  - Was 38-1/4" × 21-1/8" × 13" (D=viewing width / J=lower side / K=upper side) — corrected
- **Upgrade:** partial → **confirmed**

---

## VFSR Burners.pdf — Figure 2 (VFSR-18 / 24 / 30)

Minimum opening for solid-fuel fireplace, isometric box:

| Letter | Physical axis |
|--------|---------------|
| A | Opening REAR width |
| B | Opening DEPTH (front-to-back) |
| C | Opening FRONT width |
| D | Opening HEIGHT |

### empire-vfsr18-logset / empire-vfsr24-logset / empire-vfsr30-logset
Existing `framingDimensions` (using C=front-W, D=H, B=D) values match the table:
- VFSR-18: 28" × 17" × 14"
- VFSR-24: 30" × 23" × 14"
- VFSR-30: 34" × 26" × 14"

Log sets have no self-contained body, so `seriesDimensions` stays null. Rear-width A is
informational only and captured in internalNotes.

- **Upgrade:** partial → **confirmed** (the only dimension a log set has is its minimum
  fireplace opening, and that is now letter-mapped against Figure 2). Whisper Flex
  sales-guardrail note preserved in all three.

---

## VFS42FB Firebox Specs for Lawson.doc (VFS42FB)

The source is a 2009 binary Microsoft Word .doc file. The dimension table letters A–E
were extracted from raw bytes but **no figure diagram is inspectable** (Word binary, not a
PDF). Without a figure, the A–E to W/H/D assignment remains an interpretation. The framing
table row was partially garbled in the original extraction.

### empire-vfs42fb
- **No change.** dimensionStatus stays **partial**.
- Reason: figure not inspectable; framing width/depth not cleanly recoverable from the .doc.
- Action: defer upgrade until a paired PDF spec sheet or current install manual is obtained
  from Empire.

---

## Summary

| Record | Before | After | Reason |
|--------|--------|-------|--------|
| empire-vfp20in | partial | **confirmed** | Figure 1 + Figure 2 letter mapping visually verified |
| empire-vfp28in | partial | **confirmed** | Same manual as VFP20IN |
| empire-vfll38fp | partial | **confirmed** | Figure 1 mapping verified; seriesDimensions depth corrected; framingDimensions corrected via Figure 4 |
| empire-vfs42fb | partial | partial | Source is binary .doc with no inspectable figure |
| empire-vfsr18-logset | partial | **confirmed** | VFSR Figure 2 mapping verified |
| empire-vfsr24-logset | partial | **confirmed** | Same |
| empire-vfsr30-logset | partial | **confirmed** | Same |

6 of 7 records upgraded. Whisper Flex guardrail preserved in all 3 vf_log_set
internalNotes. No customer-safe surface is changed (these are all `customerSafe: false`
product_truth records — internal rep data only).

## Risks / Open Questions

- VFS42FB needs a current Empire-side spec sheet or install PDF to escape `partial`.
- Source manuals are 2009–2012; current product availability and BTU ratings should be
  re-confirmed with the Empire rep before publishing to a customer-facing surface.
- No other Empire models were added; Mantis, Flint Hill, White Mountain Hearth inserts,
  and DXF-only models all remain deferred per the prior pass.
