# Product Truth Ingest Pattern

How to add a vendor product as a `product_truth` record in `hearthVisualAssetSeed.js`,
sourced from CADdetails packages and the price book SKU JSON. Rep-only.

This is the recipe. The field schema lives in
`src/lib/hearthVisualAssets/hearthVisualAssetModel.js` — read that for shape rules.
The Chaska 25/29 and 335S records are the working examples to copy.

## 1. Where to look

Vendor source packets live under the App Source Intake tree (read-only — never edit):

```
C:\Users\beyon\OneDrive - Benson Stone Company\Hearth Studio Source Packets\
  00 - App Source Intake\
    03 - Product Lists, Manuals & Vendor References\
      Vendors\<Vendor>\
```

Each vendor folder contains numbered CADdetails zip packages
(`<id> - <Vendor> Fireplaces - All.zip`), brochure PDFs, and a `<Vendor>_Quick_Reference.md`.

## 2. Extract to a scratch dir

Never extract into the repo. Use `%TEMP%`:

```powershell
$src = "C:\Users\beyon\OneDrive - Benson Stone Company\...\<id> - <Vendor> Fireplaces - All.zip"
$dest = "$env:TEMP\bsfa-<vendor>-source\<id>"
New-Item -ItemType Directory -Force $dest | Out-Null
tar -xf $src -C $dest
```

Use `tar -xf`, NOT `Expand-Archive`. `Expand-Archive` chokes on the nested Revit zip
inside the package; `tar` extracts everything else cleanly and only warns on the inner zip.

**OneDrive stub gotcha:** if the file errors with "End of Central Directory record could
not be found", the zip is still an online-only placeholder. Force hydration by reading a
few bytes (`[System.IO.File]::Open(..., 'Open', 'Read')` + a small `Read`) and retry.

A CADdetails package typically contains:

| File | Use |
|---|---|
| `PDF Plus <id>.pdf` | **Primary source** — dimensioned drawing (front, top, left, right views). Parse this. |
| `DXF Plus <id>.dxf`, `DWG Plus <id>.dwg`, `DWF Plus <id>.dwf` | CAD layout files. Note as evidence; do not parse unless dimensions disagree. |
| `SketchUp <id>.skp` | 3D model. Do not parse. |
| `Revit Family <id>.zip` | Revit family. Do not parse. |
| `Printable CAD Plus <id>.gif` | Preview image. Skip. |
| `Media <id>.zip` (some packages) | Marketing media. Do not open. |

## 3. What to extract

Fill the fields defined on the `product_truth` record in `hearthVisualAssetModel.js`.
Don't restate the schema here — read it once, then mirror the existing Chaska records
in `src/data/hearthVisualAssets/hearthVisualAssetSeed.js`.

Required reads from the PDF: front W × H, body depth (left or right view), viewing area
(W × H of the visible glass/opening), top deck (W × D), venting style (top vs rear, single
vs twin collar). Record the CADdetails revision date in `sourceDocumentTitle`.

## 4. Source hierarchy

When sources disagree, prefer in this order:

1. `vendor_spec_sheet` (install manual, official cut sheet)
2. `cad_details_pdf` (the PDF Plus dimensioned drawing)
3. `cad_drawing` (DXF/DWG — evidence-only unless explicitly parsed)
4. `vendor_sku_file` (price book extract)

Two rules:

- **Preserve both readings.** When the PDF and the SKU file disagree, set
  `sourceConflict: true` and list both in `sourceEvidence[]` with `notes` describing
  the disagreement. Don't silently overwrite.
- **Distinguish disagreement from different measurements.** Different views can show
  different things (e.g., body depth vs top-deck depth, total depth including overhang
  vs body alone). If both values are correct but measure different parts, do NOT flag
  `sourceConflict`. Explain the distinction in evidence `notes` and `internalNotes`.

## 5. Rules

- **No fabrication.** If a dimension isn't in the source, leave the field `null` and set
  `dimensionStatus: 'partial'` or `'missing'`. Don't infer from related models.
- **customerSafe stays false** for every new product_truth ingest. They are rep-only.
  `customerFacingAllowed` (where present) also stays false.
- **No stone veneer.** Skip stone-veneer CAD bundles entirely.
- **One or two units per pass.** This pattern is for adding units carefully, not batch
  ingest. Update the vendor-specific notes doc as you go.
- **No edits to source packets.** The intake tree is read-only.

## 6. Verification

After adding a record:

```powershell
npm test
npm run build
git diff --check
git status -sb
```

Commit with a concise imperative subject. Do not push without rep confirmation.
