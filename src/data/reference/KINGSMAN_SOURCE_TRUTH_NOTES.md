# Kingsman — Source Truth Notes

_Last updated: 2026-05-24_

Product-truth ingest for Kingsman Fireplaces. Primary source: vendor brochures and install
manuals from the App Source Intake tree. Secondary reference: Kingsman Quick Reference
compiled from March 2026 price list (see `Kingsman_Quick_Reference.md` in source folder).

## Source Files Inspected

All files are read-only under the canonical source-intake tree. Never edited.

| File | Type | Date | Used For |
|------|------|------|----------|
| `21378-KM-B103-IDV24-34-44ENG-Dec2025-FNL1-Web.pdf` | brochure | Dec 2025 | IDV24, IDV34, IDV44 dimensions |
| `21379-KM-B076-IDV26ENG-Nov2025-FNL1-Web.pdf` | brochure | Nov 2025 | IDV26 minimum opening, clean view sizes |
| `IDV26 Installation Manual.pdf` | install manual | Oct 2025 | IDV26 body width, min opening |
| `21435-KM-B080-ZCV34-39-42ENG-Dec2025-FNL1-Web.pdf` | brochure | Dec 2025 | ZCV34, ZCV39, ZCV42 |
| `21056-KM-B102-ZCVRB47-60-72ENG-July2025-FNL1-Web.pdf` | brochure | Jul 2025 | ZCVRB47, ZCVRB60, ZCVRB72 |
| `19717-KI-B050-HBZDV3624-284224-28ENG-May2024-FNL-WEB.pdf` | brochure | May 2024 | HBZDV36 and HBZDV42 series |
| `19717-KM-B089-ZCV3622ENG-June2024-FNL1-Web.pdf` | brochure | Jun 2024 | ZCV3622 |
| `Kingsman_Quick_Reference.md` (both versions) | quick ref | May 2026 | MSRP ranges, model code cross-check |

**Not ingested this pass:**
- `Kingsman - 2025 Full Product Guide (Feb 2025).pdf` — 62MB, not fully extractable
- `HBZDV4736.DXF_.zip` — DXF only, no brochure on file; HBZDV4736 deferred
- `3622ZCVRB-CAD-Details.zip` — ZCVRB3622 deferred (no brochure on file with confirmed dimensions)
- All outdoor/fire pit products (OFP42, FP2085, FP2785) — deferred
- FDV freestanding stoves — deferred
- GLVF24 vent-free log sets, ZVFCV fireboxes — deferred (vent-free, USA-only)
- MCVP42 / MCVST42 peninsula/see-through — deferred (specialty installs, brochure not fully read)
- IDV24, IDV34, IDV44 DXF zips — noted in evidence, not parsed

## Records Added (2026-05-24)

13 records, vendor: Kingsman

| ID | Product | Status | Notes |
|----|---------|--------|-------|
| kingsman-idv24-product-truth | IDV24 | confirmed | Body A/F/G from brochure p.3 |
| kingsman-idv26-product-truth | IDV26 | **partial** | Body H/D not confirmed; viewing area not in brochure |
| kingsman-idv34-product-truth | IDV34 | confirmed | Body A/F/G from brochure p.3 |
| kingsman-idv44-product-truth | IDV44 | confirmed | Body A/F/G from brochure p.3 |
| kingsman-zcv3622-product-truth | ZCV3622 | confirmed | Brochure p.3 spec table |
| kingsman-zcv34-product-truth | ZCV34 | confirmed | Brochure p.6 spec table |
| kingsman-zcv39-product-truth | ZCV39 | confirmed | Brochure p.6 spec table |
| kingsman-zcv42-product-truth | ZCV42 | confirmed | Brochure p.6 spec table |
| kingsman-zcvrb47-product-truth | ZCVRB47 | confirmed | Brochure p.5/p.10 |
| kingsman-zcvrb60-product-truth | ZCVRB60 | confirmed | Brochure p.7/p.10 |
| kingsman-zcvrb72-product-truth | ZCVRB72 | confirmed | Brochure p.9/p.10 |
| kingsman-hbzdv36-product-truth | HBZDV36 series | confirmed | Brochure p.3 (louvered config) |
| kingsman-hbzdv42-product-truth | HBZDV42 series | confirmed | Brochure p.3 (louvered config) |

## Dimension Notes

### IDV Insert Convention

For all IDV inserts, `seriesDimensions` = insert body dimensions (physical unit size), NOT
the minimum fireplace opening. The dimension table in brochure B103 labels:
- A = body width (front face)
- F = body height (total unit height)
- G = body depth (front to back)

`framingDimensions.minOpening*` = minimum host fireplace opening required to accept the insert.

### IDV26 — Partial Record

The IDV26 brochure (B076) does not include a body dimension table equivalent to the IDV24/34/44
table in B103. The install manual (Oct 2025) p.12 provides minimum opening dimensions only;
p.13 top-view diagram shows body width ~30 7/8". Body height and depth remain unconfirmed.

**Next pass:** Read deeper into the IDV26 install manual dimension section to find the labeled
body dimension diagram (expected around p.12–13 in the full manual). Alternatively, the IDV26
DXF in `IDV26-CAD-Details.DXF_.zip` may contain precise body dimensions.

### ZCVRB72 — Framing Depth vs Body Depth

`seriesDimensions.depthIn` (19.375") is greater than `framingDimensions.depthIn` (19").
This is NOT a `sourceConflict`. The brochure footnote states framing depth is
"dependent of finishing material used." The body depth is the authoritative physical
measurement; the framing depth is a minimum/approximate value.

### HBZDV Series — Louver vs CVCK Config

`seriesDimensions` and `framingDimensions` use the **louvered configuration** (standard install).
The Designer Clean View Circulating Kit (CVCK) is an optional add-on that changes the
unit's exterior dimensions and framing requirements significantly:
- HBZDV36 CVCK: body 34 11/16" H × 38 1/16" W × 18 7/8" D; framing 38 7/16" W × 41" H × 19 1/2" D
- HBZDV42 CVCK: body 36 13/16" H × 42 1/16" W × 18 15/16" D; framing 42 7/16" W × 43" H × 19 1/2" D

Confirm with customer which facing they want before finalizing rough-opening dimensions.

## Pricing Notes

MSRP ranges cover MV (low) through IPI PF1 (high). PF2 (full remote system) adds ~$400–600
above the IPI price for IDV inserts but is not available on ZC fireplaces.
All pricing from March 2026 USA list (MSRP). Dealer cost not confirmed — verify with rep.

## Skipped / Deferred

- **HBZDV4736**: DXF on file (`HBZDV4736.DXF_.zip`) but no brochure with confirmed body dimensions.
  Quick reference gives $3,044–$3,387 pricing. Defer until brochure is available.
- **ZCVRB3622**: CAD zip on file but no brochure with confirmed body dimensions. Pricing from
  quick reference: $1,983–$2,329, 36" wide, 17,500 BTU. Defer.
- **OFP42, FP2085/FP2785**: Outdoor products. No outdoor records in scope for this pass.
- **FDV200S, FDV350, FDV451**: Freestanding stoves. Deferred — different placement context.
- **Vent-free (GLVF24, ZVFCV, FVF350)**: USA only; vent-free category deferred pending rep confirmation.
- **MCVP42 / MCVST42**: Multi-sided specialty installs. Brochure `19717-KM-B084-MCVP42` on file
  but not read in this pass. Deferred.
