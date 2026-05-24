# Source Evidence Checklist

Run through this before committing a new `product_truth` record.
Companion to `PRODUCT_TRUTH_PATTERN.md`.

## Per-record checklist

- [ ] Primary source path recorded (absolute path to the CADdetails zip)
- [ ] Inner file name recorded (e.g., `PDF Plus 5178-004.pdf`)
- [ ] Secondary source path recorded if any (SKU JSON file + page)
- [ ] CADdetails revision date captured in `sourceDocumentTitle`
- [ ] Front W × H extracted
- [ ] Body depth extracted (note which view — left or right)
- [ ] Viewing area (W × H) extracted
- [ ] Framing / top deck dimensions extracted
- [ ] Venting style noted (top vs rear, single vs twin collar)
- [ ] Conflicts: both values preserved in `sourceEvidence[]`, `sourceConflict: true` set
- [ ] Different-measurement cases (body vs total, top vs body) explained in `notes`, NOT flagged as conflict
- [ ] Fields without source data are explicitly `null` (no fabrication)
- [ ] `customerSafe: false` confirmed
- [ ] `reviewStatus: 'needs_review'` confirmed
- [ ] No stone-veneer bundle was opened
- [ ] `npm test` passes
- [ ] `npm run build` passes
- [ ] `git diff --check` clean
- [ ] Vendor notes doc updated with package path + inner files used
