# Benson Fireplace Sales OS — App Intelligence Register

**Generated:** 2026-05-08
**Scope:** Read-only intelligence sweep of \`G:\My Drive\Benson Stone Company\Fireplace Department\`
**Output type:** App Intelligence Register — what department knowledge should eventually influence the Sales OS app
**Authority hierarchy honored:** BisTrack remains source of truth. This register cites Drive as a source library only; nothing in here promotes a Drive file above BisTrack, current price books, or Liam approval.

---

## How to read this register

Each row identifies a Drive source, what knowledge it carries, where in the Sales OS it should land, the safest implementation form, currentness, sensitivity, and priority. Customer records are referenced as folder shapes only — no individual customer details are reproduced. Cost, margin, supplier totals, raw OCR, BisTrack confidence, fuzzy match language, and internal rankings are deliberately kept out of customer-facing implementation suggestions.

App areas referenced: **Start Visit**, **Customer File**, **Setup + Goal Lens**, **Quote Review**, **Proposal Prep**, **Follow-Up**, **Smart Context**, **Backstage/Admin**, **Training/Help**.

Implementation forms: quick-fill chip, smart default, warning/blocker rule, checklist item, customer-safe explainer, internal-only note, source badge/fact, proposal category, follow-up phrase, do not use.

---

## A. Sources from \`00 - START HERE - Benson Fireplace Workspace\`

### A1. README - START HERE.md
- **Source path:** \`00 - START HERE - Benson Fireplace Workspace\README - START HERE.md\`
- **Knowledge:** Canonical operating model — Drive is file/source library; Notion is dashboard and decision log; GitHub/local is app code; M365 is final customer-facing copy. Defines the entire 00–99 folder taxonomy and what belongs where. Names the active app project paths (Sales Consultation App, Quote Proposal Workbench, Sales Agent KB, Project Inventory).
- **App area:** Backstage/Admin, Smart Context.
- **Implementation:** internal-only note (Operating Model panel in admin), source badge/fact ("Drive file lives at: …"). Use to anchor in-app help links to canonical Drive folders.
- **Currentness:** current (2026-05-07).
- **Sensitivity:** rep-only.
- **Priority:** use now.

### A2. Cowork Workflow V1.md
- **Source path:** \`00 - START HERE - Benson Fireplace Workspace\Cowork Workflow V1.md\`
- **Knowledge:** First 30 days are Old-Quote Recovery + Follow-Up Ladder. Defines weekly cadence (Mon brief, Wed pulse, Fri decision log, Sat intake routing). Defines the customer follow-up ladder (Touch 1 = 3-5 days phone/text; Touch 2 = 2 weeks email with something useful; Touch 3 = 4-6 weeks last check-in; builder = 1 week phone). Names **Liam's May 2026 Field Rules** (Whisper Flex, ZC gas insert acknowledgement, Millivolt banned in Rockford, IRTAX header). Names the Cowork "does/does not" boundary: no automatic customer email, no git pushes without approval, never expose cost/margin/supplier/rank/OCR.
- **App area:** Follow-Up, Quote Review, Proposal Prep, Backstage/Admin, Smart Context.
- **Implementation:** **warning/blocker rule** for all four Field Rules; smart default (follow-up cadence timer per opportunity); proposal category (set order header to IRTAX on installs); checklist item (Whisper Flex line on Empire VF logs; ZC gas-insert acknowledgement before final order); internal-only note (cost/margin/OCR exclusion list).
- **Currentness:** current (V1, May 2026).
- **Sensitivity:** rep-only (the Field Rules themselves are customer-safe in their *consequence*, but their internal logic stays rep-only).
- **Priority:** **use now** — these are the highest-value app intelligence items in the entire register.

---

## B. Sources from \`01 - Active Department Systems\`

### B1. Closing Duties.doc
- **Source path:** \`01 - Active Department Systems\Closing Duties.doc\`
- **Knowledge:** End-of-day closing checklist for the department.
- **App area:** Backstage/Admin, Training/Help.
- **Implementation:** checklist item (admin-only daily close routine), reference only.
- **Currentness:** likely current.
- **Sensitivity:** rep-only.
- **Priority:** later.

### B2. Benson Fireplace Operating Systems Tracker.xlsx
- **Source path:** \`01 - Active Department Systems\Trackers\Benson Fireplace Operating Systems Tracker.xlsx\`
- **Knowledge:** Live system inventory of department operations. Referenced by the Master Knowledge file as a primary source for app-relevant fields.
- **App area:** Backstage/Admin, Smart Context.
- **Implementation:** internal-only note (system map for admin); seed list for app's Backstage admin index.
- **Currentness:** likely current.
- **Sensitivity:** manager/internal-only.
- **Priority:** use soon.

### B3. fireplace\_department\_systems\_starter.xlsx
- **Source path:** \`00 - START HERE - Benson Fireplace Workspace\fireplace\_department\_systems\_starter.xlsx\`
- **Knowledge:** Starter workbook tied to the Operating Systems Tracker.
- **App area:** Backstage/Admin.
- **Implementation:** internal-only note.
- **Currentness:** likely current.
- **Sensitivity:** manager/internal-only.
- **Priority:** use soon.

---

## C. Sources from \`02 - Training & Fireplaces 101\`

### C1. Benson\_Fireplace\_Sales\_Agent\_Master\_Knowledge\_v2.md ← spine of the register
- **Source path:** \`02 - Training & Fireplaces 101\Work Computer Intake - 2026-05-07\Benson\_Fireplace\_Sales\_Agent\_Master\_Knowledge\_v2.md\`
- **Knowledge:** The most app-ready document in the department. Contains:
 - 5-question discovery starter script (Start Visit).
 - Masonry vs prefab/zero-clearance setup mental model with fast visual clues.
 - Wood / gas / electric path identification and active gas paths (Direct Vent, Vent-Free, Gas Logs, B-vent banned as active).
 - Customer goal map (more heat / more convenience / less mess / better appearance / keep real-wood feel / budgeting only).
 - Inserts overview, common upgrade paths.
 - Benson public brand map (Dimplex, Empire, Heatilator, Kingsman, Lopi, Marquis, Mendota Hearth, Stûv; gas logs Hargrove primary; freestanding Lopi/Jøtul/Stûv/Empire; doors/screens Stoll/Design Specialties/Iron Haus).
 - Current floor emphasis matrix (Kingsman/Marquis/Marquee bread-and-butter DV; Travis/Lopi/FPX/DaVinci premium; Kozy Heat linear; Enviro/Urbana specialty; Hargrove primary logs; Empire/WMH vent-free; Napoleon freestanding/Summerset built-in grills).
 - Showroom watchouts (display age, discontinued mantels via Curtis Woodworking, relays before assuming a unit is broken).
 - Key showroom anchor displays (Heatilator I-80/Icon 80 with Hargrove VF + custom door; Kingsman Bentley 39; Lopi Berkshire; Travis HE wood-burning; Urbana DV linear; open-face with Hargrove vented + custom door).
 - Quote workflow: ballpark vs verified language; capture-before-quote checklist; quote-from-the-unit-upward 12-step structure.
 - Pricing/discounting/margin awareness rules (internal-only) and customer-safe discount language ("$\_\_\_ off the fireplace and venting package").
 - Follow-up discipline + 5 follow-up email templates (recent, photos/info needed, dormant reactivation, measurement reminder, revised quote).
 - Red flags table (vague language, unclear venting, prefab clues, just-wants-number, discount pressure early, B-vent, code/local rules, install timing, exact fit from photo).
 - Six agent modes (Sales Floor, Quote Prep, Follow-Up, Training, Product/Vendor, Showroom, Backstage Ops).
 - Drive system priorities (Old Quote Recovery → Showroom Display Register → Current Price Book Finder → Fireplaces 101 Hub → Vendor/Manual Lookup → Warranty Tracker → Customer Outreach Calendar).
 - Default response patterns and "agent north star."
- **App area:** every area — this file is the spine.
- **Implementation:** quick-fill chip (5 discovery questions, fuel type, masonry vs prefab, customer goal); smart default (default brand emphasis per customer goal); warning/blocker rule (B-vent → route to Liam; vent-free address question → route to Liam; promise-by-date install timing → block); checklist item (capture-before-quote, quote-from-unit-upward, photos to request); customer-safe explainer (every rule has approved language); follow-up phrase (5 templates, verbatim).
- **Currentness:** current (v2, May 2026).
- **Sensitivity:** rep-only as a whole; many sections are customer-safe explainers.
- **Priority:** **use now**.

### C2. Benson\_Stone\_Fireplace\_Sales\_Training\_Packet\_v1.0 CURRENT UNDER MANAGEMENT REVIEW.pdf
- **Source path:** \`02 - Training & Fireplaces 101\Work Computer Intake - 2026-05-07\Benson\_Stone\_Fireplace\_Sales\_Training\_Packet\_v1.0 CURRENT UNDER MANAGEMENT REVIEW.pdf\` (also mirrored in \`BSC Root Intake - 2026-05-07\Training\\` and \`Training v2.1\\`)
- **Knowledge:** Current management-reviewed training packet. Per Master Knowledge file, this is the top of the source hierarchy.
- **App area:** Training/Help, Setup + Goal Lens, Smart Context.
- **Implementation:** customer-safe explainer (Help drawer "What this means" content); source badge/fact ("Per current Benson training packet, May 2026").
- **Currentness:** current (under management review — treat as current authoritative training).
- **Sensitivity:** customer-safe (training material).
- **Priority:** use now.

### C3. benson\_stone\_fireplace\_training\_packet\_flagship\_v4 NOT CURRENT.pdf
- **Source path:** \`02 - Training & Fireplaces 101\Work Computer Intake - 2026-05-07\benson\_stone\_fireplace\_training\_packet\_flagship\_v4 NOT CURRENT.pdf\` (and mirrors)
- **Knowledge:** Older flagship draft, explicitly labeled NOT CURRENT.
- **App area:** Training/Help.
- **Implementation:** **do not use** as authoritative; reference only for diff/history.
- **Currentness:** outdated.
- **Sensitivity:** rep-only.
- **Priority:** reference only.

### C4. Benson\_Stone\_Fireplace\_Training\_v2.1\_Tighter (Parts 1–4)
- **Source paths:** \`02 - Training & Fireplaces 101\Work Computer Intake - 2026-05-07\Benson\_Stone\_Fireplace\_Training\_v2.1\_Tighter\_Part\_1\_Overview\_Foundations\_pp1-5.pdf\` through \`Part\_4\_Job\_Aids\_Appendices\_pp16-19.pdf\`
- **Knowledge:** Tighter v2.1 training in four parts: Overview/Foundations, Fireplaces/Discovery, Showroom/Quote/Risk, Job Aids/Appendices.
- **App area:** Training/Help, Start Visit, Setup + Goal Lens, Quote Review.
- **Implementation:** customer-safe explainer; checklist item (job aids/appendices map directly to Quote Review checklist); training source for help drawer.
- **Currentness:** likely current.
- **Sensitivity:** customer-safe.
- **Priority:** use soon.

### C5. Rodney\_Job\_Site\_Ride\_Along\_Field\_Notes\_v2.pdf
- **Source path:** \`02 - Training & Fireplaces 101\Work Computer Intake - 2026-05-07\Rodney\_Job\_Site\_Ride\_Along\_Field\_Notes\_v2.pdf\`
- **Knowledge:** Field notes from job-site ride-alongs with Rodney (install team).
- **App area:** Setup + Goal Lens, Smart Context, Training/Help.
- **Implementation:** internal-only note (install-side observations to inform "what installers wish reps knew").
- **Currentness:** likely current.
- **Sensitivity:** rep-only.
- **Priority:** use soon.

### C6. Benson Fireplace 101 Quick Reference - Obee Cleaned Addendum.pdf
- **Source path:** \`02 - Training & Fireplaces 101\Work Computer Intake - 2026-05-07\Benson Fireplace 101 Quick Reference - Obee Cleaned Addendum.pdf\`
- **Knowledge:** Obee-era quick reference, cleaned and packaged as an addendum.
- **App area:** Training/Help.
- **Implementation:** customer-safe explainer; source badge/fact ("legacy quick-reference, retained as addendum").
- **Currentness:** historical/reference.
- **Sensitivity:** customer-safe.
- **Priority:** reference only.

### C7. Voice Notes (Apr 22 → May 7, multiple)
- **Source paths:** \`02 - Training & Fireplaces 101\Work Computer Intake - 2026-05-07\Voice Notes\*.txt\` (and BSC Root mirrors)
- **Knowledge:** Drew's voice-note transcripts capturing live training conversations and product reasoning. Source for tone, vocabulary, and edge-case examples.
- **App area:** Smart Context, Training/Help, Follow-Up.
- **Implementation:** internal-only note (tone reference for follow-up phrasing); do not surface raw transcripts to customers.
- **Currentness:** current.
- **Sensitivity:** rep-only.
- **Priority:** later (good Phase 2 training material).

### C8. Visuals (PNG)
- **Source paths:** \`02 - Training & Fireplaces 101\BSC Root Intake - 2026-05-07\Training\Visuals\*.png\` (Quote From Unit Upward, Masonry VS Prefab, Red Flags, Active Gas Paths, Ballpark VS Verified, Customer Goals and Solutions)
- **Knowledge:** Six core training visuals matching the Master Knowledge file's mental models.
- **App area:** Training/Help, Setup + Goal Lens, Quote Review.
- **Implementation:** customer-safe explainer (these visuals are usable customer-side); source badge/fact in proposal "About your fireplace project" sections.
- **Currentness:** current.
- **Sensitivity:** customer-safe.
- **Priority:** use now (high-leverage UI assets).

### C9. Legacy Training Reference (Fireplace Dimensions.xls, Prefab Fireplace Size Reference Chart.doc, Vent Free Guide.pdf, Vent-Free Fireplace Information.docx, EMPIRE.docx, Diameters for Wood Chimney.docx, R-value requirements for sample stoves.xls)
- **Source path:** \`02 - Training & Fireplaces 101\Legacy Training Reference\*\`
- **Knowledge:** Legacy dimensional and venting/clearance references.
- **App area:** Smart Context, Training/Help.
- **Implementation:** internal-only note (rough sanity-check ranges); never use as authoritative — manufacturer manual wins.
- **Currentness:** historical/reference (pre-Liam era).
- **Sensitivity:** rep-only.
- **Priority:** reference only.

---

## D. Sources from \`03 - Product Lists, Manuals & Vendor References\`

### D1. Vendor priority tiers (vendor\_findings\_summary.md)
- **Source path:** \`03 - Product Lists, Manuals & Vendor References\Work Computer Intake - 2026-05-07\Benson\_All\_Current\_Vendor\_References\\_findings\vendor\_findings\_summary.md\`
- **Knowledge:** Vendor priority tiering for Smart Binder ingestion.
 - **A-priority:** Travis / FPX / Lopi, Kingsman, Empire / American Hearth / White Mountain Hearth, Hargrove, Stone Age, Security Chimneys, Stoll.
 - **B-priority:** Firegear, Dimplex, Modern Flames, Vermont Castings / Forge & Flame.
 - **C-priority (confirm relevance):** Napoleon, Real Fyre / R.H. Peterson, Majestic / Monessen / HHT, DuraVent / Metal-Fab / ICC / Selkirk, Skytech / Dante / Dormont / TracPipe / HY-C / Rutland / Pilgrim / Minuteman.
- **App area:** Setup + Goal Lens, Quote Review, Proposal Prep, Smart Context.
- **Implementation:** **proposal category** (vendor sort order in chip menus); smart default (A-tier brands surface first in product picker); source badge/fact (vendor relevance tier).
- **Currentness:** current (May 2026).
- **Sensitivity:** rep-only (tiering reflects Benson's commercial relationships).
- **Priority:** use now.

### D2. Manuals tree (\`Manuals\\<brand\>\\<model\>.pdf\`)
- **Source path:** \`03 - Product Lists, Manuals & Vendor References\Manuals\…\` — Heatilator Wood, Heatilator Gas, Travis Gas, Travis Wood, Kingsman, Jotul, Vermont Castings, Empire, Energy King, Pellet and Corn, Pipe, Gas Logs, Outdoor Catalog, Kozy Heat (single 241zc PDF). \~120+ PDFs.
- **Knowledge:** Authoritative install/spec manuals per brand+model. Coverage skews toward Travis (gas + wood), Heatilator (wood + gas), Kingsman, Vermont Castings, Jotul, Pellet/Corn, and Pipe.
- **App area:** Smart Context, Quote Review, Setup + Goal Lens.
- **Implementation:** source badge/fact (link from product chip → manual file); checklist item (verify venting/clearance against manual before quote goes specific). **Internal verification reference only** unless explicitly customer-safe — install manuals are not customer-facing.
- **Currentness:** mixed (some 2008–2017 era, some current). Treat per-file.
- **Sensitivity:** rep-only as ingestion source. Customer-safe for trimmed extracts (clearances summarized in customer-safe language).
- **Priority:** use soon (Smart Context PDF index is the Drive priority #5 in the Master Knowledge file).

### D3. Vendor reference docs (Travis Odor Checklist, Travis Debris Burnoff Guide, Travis parts RMA, Kingsman Log and Grill chart, Security Panorama/Tradition, Tempest Torch brochure, Stone Age Mantel WS / Estimate Request)
- **Source paths:** \`03 - Product Lists, Manuals & Vendor References\Vendors\…\`
- **Knowledge:** Operational vendor reference: odor troubleshooting, debris burnoff, RMA process, log/grill cross-reference, mantel order/estimate forms.
- **App area:** Smart Context, Service follow-up (post-install), Backstage/Admin.
- **Implementation:** customer-safe explainer (Travis odor + debris burnoff are great post-install warm-up explainers); checklist item (RMA path); proposal category (Stone Age mantel quoting form).
- **Currentness:** likely current.
- **Sensitivity:** customer-safe (odor/debris); rep-only (RMA, mantel order forms).
- **Priority:** use soon.

### D4. R-Value comparison photo-5-13-08.pdf
- **Source path:** \`03 - Product Lists, Manuals & Vendor References\R-Value and Technical Reference\R-Value comparison photo-5-13-08.pdf\`
- **Knowledge:** R-value comparison reference, dated 2008.
- **App area:** Smart Context, Training/Help.
- **Implementation:** internal-only note (sanity check only).
- **Currentness:** historical/reference.
- **Sensitivity:** rep-only.
- **Priority:** reference only.

### D5. Outdoor Catalog (HPC Costs for blank firepits.doc, Unilock clearence discounted.doc, harmony\_product\_catalog\_2009.pdf)
- **Source path:** \`03 - Product Lists, Manuals & Vendor References\Manuals\Outdoor Catalog\*\`
- **Knowledge:** Outdoor product references — some clearly historical (2009 catalog).
- **App area:** Setup + Goal Lens (outdoor branch only).
- **Implementation:** **do not use** historical pricing; reference only for product naming.
- **Currentness:** outdated to historical/reference.
- **Sensitivity:** rep-only (HPC Costs for blank firepits.doc may contain cost language — keep internal).
- **Priority:** reference only.

---

## E. Sources from \`04 - Showroom, Cellar, Displays & Site Maps\`

### E1. Site Maps (Scanned\_20260422-0954.pdf, Scanned\_20260422-1248.pdf) and Benson Stone fireplace showroom.pdf
- **Source paths:** \`04 - Showroom, Cellar, Displays & Site Maps\Work Computer Intake - 2026-05-07\*\` and \`BSC Root Intake - 2026-05-07\Site Maps\*\`
- **Knowledge:** Current showroom/cellar site maps and floor diagrams.
- **App area:** Setup + Goal Lens (Showroom Mode), Smart Context.
- **Implementation:** customer-safe explainer ("here's the display I'd walk you to"); smart default (Showroom Mode anchor display per customer goal — pulls from Master Knowledge §19); proposal category (display reference photo on the proposal).
- **Currentness:** current (April 2026 scans).
- **Sensitivity:** customer-safe.
- **Priority:** use soon (this is Drive system priority #2 — Showroom Display Register).

### E2. Showroom display photos (Showroom Fireplaces, Pine Beam Mantels, Chimney King)
- **Source path:** \`04 - Showroom, Cellar, Displays & Site Maps\Showroom & Inventory\Pictures\…\`
- **Knowledge:** Photo library of showroom units (CFX-DA, Dracme, Direct Vents, FPX 44DVXXL, I80, Grand fireplace, Chilton FP, FPX CF36 Arch, ICON60DV Josef's, Eldorado Shadow Stone, Parmelle/Woodruff Surrounds, Pine Beam Mantels, Chimney King jobsite shots).
- **App area:** Setup + Goal Lens, Proposal Prep, Smart Context.
- **Implementation:** source badge/fact (display photo on proposal page); customer-safe explainer (Showroom Mode walks-to-display).
- **Currentness:** current.
- **Sensitivity:** customer-safe (showroom photos); customer-safe but identify-the-jobsite-owner before publishing Chimney King jobsite photos.
- **Priority:** use soon.

### E3. Layout docs (\`05 - Sales Tools…\Tags & Signs\TAGS\1st Floor Showroom\Showroom Inventory\Layout - 1st floor diagram.docx\`, \`Layout - Cellar diagram.docx\`, \`Layout - Grills.docx\`)
- **Source paths:** as above (note: cross-stored under \`05\` Tags & Signs).
- **Knowledge:** Diagrammed layouts of 1st floor, Cellar, Grills.
- **App area:** Setup + Goal Lens, Smart Context.
- **Implementation:** customer-safe explainer (orientation for in-app showroom register).
- **Currentness:** likely current.
- **Sensitivity:** customer-safe.
- **Priority:** use soon.

---

## F. Sources from \`05 - Sales Tools, Customer Education & Follow-Up\`

### F1. Customer Education trio
- **Source paths:** \`05 - Sales Tools, Customer Education & Follow-Up\Customer Education\01 Vocabulary Disambiguator.docx\`, \`02 Customer Intake Worksheet.docx\`, \`03 Fuel Type Comparison Card.docx\`
- **Knowledge:** Three customer-facing education docs:
 - Vocabulary Disambiguator (translation layer between customer language and trade language).
 - Customer Intake Worksheet (the worksheet behind the 5-question script).
 - Fuel Type Comparison Card (wood/gas/electric tradeoffs).
- **App area:** Start Visit, Customer File, Setup + Goal Lens.
- **Implementation:** **quick-fill chip** (worksheet field set is the Customer File baseline schema); customer-safe explainer (Vocabulary Disambiguator powers the "what does this term mean?" tooltips); customer-safe explainer (Fuel Type card is the comparison view in Setup + Goal Lens).
- **Currentness:** current.
- **Sensitivity:** customer-safe.
- **Priority:** use now.

### F2. Master Knowledge file (mirrored copy)
- **Source path:** \`05 - Sales Tools, Customer Education & Follow-Up\Work Computer Intake - 2026-05-07\Benson\_Stone\_Fireplace\_Sales\_Agent\_Master\_Knowledge.md\`
- **Knowledge:** Earlier copy of the Master Knowledge file (v1).
- **App area:** Training/Help.
- **Implementation:** **do not use** as authority — v2 in \`02 - Training\` is canonical (per Master Knowledge §3 source hierarchy).
- **Currentness:** outdated (superseded by v2).
- **Sensitivity:** rep-only.
- **Priority:** reference only.

### F3. Brochures library (\`Brochures\\<brand\>\*.pdf\`, \~150 PDFs)
- **Source path:** \`05 - Sales Tools, Customer Education & Follow-Up\Brochures\…\` — HTL & HNG, Travis, Kingsman, Empire, Town & Country, Jotul, Vermont Castings, Security, Firegear, Pipe, Electric, Pearl, etc.
- **Knowledge:** Customer-safe brochure PDFs by brand and model. Per Master Knowledge §6.6 of vendor\_findings\_summary, brochures are customer-safe.
- **App area:** Proposal Prep, Smart Context, Setup + Goal Lens.
- **Implementation:** source badge/fact (brochure attached or linked from product chip in proposal); proposal category (per-package "About this fireplace" insert).
- **Currentness:** mixed (many current, some legacy filenames).
- **Sensitivity:** customer-safe.
- **Priority:** use soon.

### F4. Tags & Signs (\`Tags & Signs\TAGS\…\*.docx\`, \~100+)
- **Source path:** \`05 - Sales Tools, Customer Education & Follow-Up\Tags & Signs\…\`
- **Knowledge:** Showroom price tags, sale tags, mantel tags (Mulvain, Pearl, LSM), door tags (Diamond W, David Kimberly, Design Specialty Legend ZC), promo tags, financing tag, Jotul tax credit tags, fan/remote 50%-off tags, Splash discount template family, Cellar inserts clearance.
- **App area:** Backstage/Admin, Proposal Prep (sale-eligible flag).
- **Implementation:** internal-only note (which units carry promo tags — feeds a "current promo" badge); proposal category (sale-eligible chip on proposal — but never auto-discount; per Field Rule, discounts go through Liam).
- **Currentness:** likely current; some are dated (Jotul $100 rebate, 4thofjulysale.doc are seasonal/historical).
- **Sensitivity:** rep-only (the catalog of promotions); customer-safe (the printed tag itself).
- **Priority:** later.

### F5. Job Sheet (Benson Stone Job Sheet\_Edit.docx)
- **Source path:** \`05 - Sales Tools, Customer Education & Follow-Up\Work Computer Intake - 2026-05-07\Benson Stone Job Sheet\_Edit.docx\`
- **Knowledge:** Editable Benson Stone Job Sheet template.
- **App area:** Customer File, Proposal Prep.
- **Implementation:** proposal category (job sheet rendering — fields likely overlap the Quote Template Field Map).
- **Currentness:** current.
- **Sensitivity:** customer-safe (when populated for a customer, becomes rep-only).
- **Priority:** use soon.

---

## G. Sources from \`06 - Quotes, Invoices & Customer Examples\`

\> Customer files referenced as folder shapes only — no individual customer details reproduced. Shapes:
\> - \`01 - Active Customer Quotes\\` (active quote PDFs)
\> - \`02 - Quote Examples and Proposal References\\` (the quote template references — see G1)
\> - \`03 - Invoices and Orders\\` (invoices)
\> - \`04 - Follow-Up and Customer Communication\\` (follow-up packets)
\> - \`06 - Photos and Scans\\` (job-site/opening scans)
\> - \`08 - BisTrack Exports and Screenshots\\` (BisTrack screenshots)
\> - \`10 - Needs Drew Review\\` (waitlist/queue)
\> - \`Quote-Invoice Examples\\` (anonymous/legacy templates)
\> - \`BSC Root Customer Intake - 2026-05-07\Quotes Invoices\Active\\<Last, First - City\>\` (canonical customer folder shape)

### G1. Benson\_Stone\_Quote\_Template\_Field\_Map.json ← canonical schema
- **Source path:** \`06 - Quotes, Invoices & Customer Examples\Work Computer Customer Intake - 2026-05-07\02 - Quote Examples and Proposal References\Benson\_Stone\_Quote\_Template\_Field\_Map.json\`
- **Knowledge:** Authoritative quote template field map. Sections:
 - **customer:** CUSTOMER\_NAME, CUSTOMER\_ID, CUSTOMER\_PHONE, INVOICE\_ADDRESS\_LINE\_1/CITY\_STATE\_ZIP, PROJECT\_ADDRESS\_LINE\_1/CITY\_STATE\_ZIP, PROJECT\_PHONE.
 - **quote\_meta:** QUOTE\_NO, QUOTE\_DATE, PROJECT\_TITLE, PROJECT\_CITY\_STATE, PAYMENT\_TERMS, PO\_NUMBER, QUOTE\_GOOD\_FOR, TAKEN\_BY, SALES\_REP.
 - **page\_1\_project:** PROJECT\_OVERVIEW, two PACKAGE blocks each with up to 4 ITEM/PRICE rows + LINER\_KIT + INSTALL\_NOTE/PRICE; INSTALLATION\_SCOPE/TOTAL.
 - **page\_2\_details:** Two DETAIL sections with up to 9 line items each (qty/unit/total).
 - **investment\_and\_acceptance:** PROJECT\_NOTES, TOTAL\_AMOUNT, IR\_TAX, QUOTATION\_TOTAL, AMOUNT\_PAID, BALANCE\_DUE, DEPOSIT\_TERMS, LEGAL\_TERMS.
- **App area:** Proposal Prep, Quote Review, Customer File.
- **Implementation:** **proposal category** (this IS the proposal data model); smart default (IR\_TAX field reflects the IRTAX install header rule from Field Rule 4; auto-set on installs); checklist item (every required field on this map → Quote Review pre-flight).
- **Currentness:** current.
- **Sensitivity:** rep-only as a schema; customer-safe in the rendered output.
- **Priority:** **use now**.

### G2. Benson Stone Fireplace Quote Proposal Generator.pdf (a/b variants) and Benson\_Stone\_Fireplace\_Quote\_Template\_Canva\_Upload.pdf
- **Source path:** \`06 - Quotes, Invoices & Customer Examples\Work Computer Customer Intake - 2026-05-07\02 - Quote Examples and Proposal References\…\`
- **Knowledge:** Reference renderings of the Benson Stone proposal template (Canva and generator outputs). Visual proposal style.
- **App area:** Proposal Prep.
- **Implementation:** source badge/fact (template fidelity reference); proposal category (visual style anchor for the rendered proposal).
- **Currentness:** current.
- **Sensitivity:** customer-safe (template), rep-only when populated with customer data.
- **Priority:** use soon.

### G3. Customer Consultation Summary.pdf
- **Source path:** \`06 - Quotes, Invoices & Customer Examples\Work Computer Customer Intake - 2026-05-07\02 - Quote Examples and Proposal References\Customer Consultation Summary.pdf\`
- **Knowledge:** Reference example of a polished consultation summary handed back to the customer.
- **App area:** Customer File, Follow-Up, Proposal Prep.
- **Implementation:** customer-safe explainer (consultation-summary template); proposal category (post-visit recap pattern).
- **Currentness:** current.
- **Sensitivity:** customer-safe (when sanitized).
- **Priority:** use soon.

### G4. Customer Waitlist.xlsx
- **Source path:** \`06 - Quotes, Invoices & Customer Examples\Work Computer Customer Intake - 2026-05-07\10 - Needs Drew Review\Customer Waitlist.xlsx\`
- **Knowledge:** Drew's pending-review queue.
- **App area:** Backstage/Admin, Follow-Up.
- **Implementation:** internal-only note (queue seed for the Opportunity Queue's "needs Drew review" lane); **do not expose customer rows** to customer-facing output.
- **Currentness:** current.
- **Sensitivity:** rep-only.
- **Priority:** use soon.

### G5. follow up quotes.pdf and TestFollowUp.pdf
- **Source paths:** \`06\…\04 - Follow-Up and Customer Communication\follow up quotes.pdf\`, \`TestFollowUp.pdf\`
- **Knowledge:** Real follow-up packet examples used as pattern references.
- **App area:** Follow-Up.
- **Implementation:** follow-up phrase (extract phrasing patterns only; do not reproduce customer text); pattern reference for Follow-Up composer.
- **Currentness:** current.
- **Sensitivity:** rep-only (treat as containing customer detail).
- **Priority:** use soon.

### G6. Customer folder shape (\`Active\\<Last, First - City\>\\`)
- **Source path:** \`06 - Quotes, Invoices & Customer Examples\BSC Root Customer Intake - 2026-05-07\Quotes Invoices\Active\…\`
- **Knowledge:** Per-customer Active folder convention: \`\<Last, First - City State\>\\<Last - {Quote|Estimate|Call Note} - {Number} - YYYY-MM-DD\>.{pdf|gdoc}\`.
- **App area:** Customer File, Backstage/Admin.
- **Implementation:** smart default (Customer File save-path convention follows this naming pattern for any artifact saved back to Drive); checklist item (always include city in folder name).
- **Currentness:** current.
- **Sensitivity:** rep-only (folder is the customer record).
- **Priority:** use soon.

### G7. BisTrack Exports and Screenshots (PNG + zip + processed bundle)
- **Source path:** \`06 - Quotes, Invoices & Customer Examples\Work Computer Customer Intake - 2026-05-07\08 - BisTrack Exports and Screenshots\…\` (incl. \`bistrack\_quote\_project\_processed\_bundle.zip\`)
- **Knowledge:** BisTrack workflow screenshots from late April 2026 — the live quote setup transcript material referenced by the Master Knowledge file §22.
- **App area:** Smart Context, Backstage/Admin.
- **Implementation:** internal-only note (training material for the app's BisTrack-aware Smart Context — but the app does not touch BisTrack directly per Cowork Workflow §6); **do not expose** raw screenshots to customers.
- **Currentness:** current.
- **Sensitivity:** rep-only (screenshots include customer/quote details).
- **Priority:** later.

---

## H. Sources from \`07 - Service, Install, Warranty & Claims\`

### H1. Benson Stone Installation Job Sheet.pdf and Service Order Sheet.pdf
- **Source paths:** \`07\…\02 - Install Records\Benson Stone Installation Job Sheet.pdf\`, \`01 - Service Records\Benson Stone Service Order Sheet.pdf\`
- **Knowledge:** Canonical install and service sheets used after a sale.
- **App area:** Customer File (post-quote handoff), Backstage/Admin.
- **Implementation:** checklist item (handoff pre-flight: scope, gas/electric/framing responsibility, IRTAX header, photos collected); proposal category (linked appendix when relevant).
- **Currentness:** current.
- **Sensitivity:** rep-only.
- **Priority:** use soon.

### H2. Benson Stone Fireplace Installation Letter.docx / .pdf
- **Source path:** \`07\…\02 - Install Records\Benson Stone Fireplace Installation Letter.{docx,pdf}\`
- **Knowledge:** Customer-facing post-sale install confirmation letter.
- **App area:** Follow-Up, Customer File.
- **Implementation:** customer-safe explainer; follow-up phrase (template for post-sale → install confirmation).
- **Currentness:** current.
- **Sensitivity:** customer-safe (template); rep-only when populated.
- **Priority:** use soon.

### H3. NFPA 211 section 6.html
- **Source path:** \`07\…\01 - Service Records\NFPA 211 section 6.html\`
- **Knowledge:** NFPA 211 chimney/venting code section 6 reference.
- **App area:** Smart Context, Training/Help.
- **Implementation:** internal-only note (code reference); **do not** quote NFPA verbatim to customers — route code questions to Liam per Master Knowledge §4.2.
- **Currentness:** current.
- **Sensitivity:** rep-only.
- **Priority:** reference only.

### H4. Stoll quality control issues.pdf
- **Source path:** \`07\…\01 - Service Records\Stoll quality control issues.pdf\`
- **Knowledge:** Documented Stoll QC issues — useful internal awareness when quoting Stoll doors.
- **App area:** Smart Context, Quote Review.
- **Implementation:** **internal-only note** (Stoll QC awareness when adding Stoll line items); checklist item (verify Stoll specs against QC issue list before order).
- **Currentness:** likely current.
- **Sensitivity:** manager/internal-only.
- **Priority:** use soon.

### H5. Service photo reference set (R5171 pilot assy, OD42 service call, Big Top Chase cover, Kingsman battery cover, Sigala pilot assembly, Coolwall instructions, Perfect temp cap, Arduino remote 2024.pdf)
- **Source path:** \`07\…\01 - Service Records\…\`
- **Knowledge:** Visual + procedural service references for common service questions.
- **App area:** Smart Context, Training/Help.
- **Implementation:** internal-only note (Service Smart Context for post-sale customer questions); customer-safe explainer (Cool-wall behavior, battery placement) only when explicitly safe.
- **Currentness:** likely current.
- **Sensitivity:** rep-only.
- **Priority:** later.

### H6. Existing customer-photo named files (e.g., Anderson Gardens service.pdf, Ticknor service orders.pdf, Gabler service order.pdf)
- **Source path:** \`07\…\01 - Service Records\…\`
- **Knowledge:** Customer-named service records.
- **App area:** Customer File.
- **Implementation:** **do not use** for customer-facing output. Treat as restricted records.
- **Currentness:** current.
- **Sensitivity:** **do-not-expose** (customer-named records).
- **Priority:** reference only.

---

## I. Sources from \`08 - Marketing & Outreach\`

### I1. Marketing Intake (Scanned\_20260425-1052.pdf, PXL\_20260501\_162243748.jpg)
- **Source path:** \`08 - Marketing & Outreach\Work Computer Intake - 2026-05-07\…\`
- **Knowledge:** Recent marketing intake — sparse folder; mostly waiting for content.
- **App area:** Backstage/Admin, Follow-Up.
- **Implementation:** internal-only note (when populated, becomes the source for the customer-outreach calendar — Drive priority #7 in the Master Knowledge file).
- **Currentness:** current.
- **Sensitivity:** rep-only.
- **Priority:** later.

---

## J. Sources from \`09 - Operations, HR & Internal Reference\`

### J1. Fireplace Commission Plan - 326 (1).pdf and (2).pdf
- **Source path:** \`09 - Operations, HR & Internal Reference\Work Computer Intake - 2026-05-07\Fireplace Commission Plan - 326 (1).pdf\` and \`(2).pdf\` (also mirrored in BSC Root Intake)
- **Knowledge:** Department commission plan.
- **App area:** Backstage/Admin only.
- **Implementation:** **do not expose** to customers or to AI tools per Master Knowledge §4.4 sensitive-material rules. Reference for internal commission\_calculator.html only.
- **Currentness:** current.
- **Sensitivity:** **do-not-expose**.
- **Priority:** reference only (admin-eyes only).

### J2. commission\_calculator.html
- **Source path:** \`09\…\Work Computer Intake - 2026-05-07\commission\_calculator.html\`
- **Knowledge:** Calculator implementing the Commission Plan.
- **App area:** Backstage/Admin.
- **Implementation:** internal-only note (admin tool — link, do not embed).
- **Currentness:** current.
- **Sensitivity:** **do-not-expose**.
- **Priority:** reference only.

### J3. Fireplace management duties.rtf
- **Source path:** \`09\…\Work Computer Intake - 2026-05-07\Fireplace management duties.rtf\`
- **Knowledge:** Internal management duties reference.
- **App area:** Backstage/Admin.
- **Implementation:** internal-only note.
- **Currentness:** likely current.
- **Sensitivity:** manager/internal-only.
- **Priority:** reference only.

### J4. Hold Checks for These Companies.docx, Service calls we need help with.pdf, Prioritized display changes.pdf, Incomplete supplier returns na incomplete transfers.pdf
- **Source path:** \`09\…\Work Computer Intake - 2026-05-07\…\`
- **Knowledge:** Operational issue lists.
- **App area:** Backstage/Admin.
- **Implementation:** internal-only note; "Prioritized display changes" feeds the Showroom Display Register backlog.
- **Currentness:** current.
- **Sensitivity:** manager/internal-only.
- **Priority:** later.

### J5. Weber Master Agreement.pdf, Weber Alliance agreement.pdf
- **Source path:** \`09\…\Work Computer Intake - 2026-05-07\…\`
- **Knowledge:** Vendor agreements.
- **App area:** Backstage/Admin.
- **Implementation:** internal-only note; **do not expose** vendor terms to customers.
- **Currentness:** likely current.
- **Sensitivity:** manager/internal-only.
- **Priority:** reference only.

### J6. Fischer 2026 Contractor Pricing (Final 1\_27) (1).xlsx
- **Source path:** \`09\…\Work Computer Intake - 2026-05-07\Fischer 2026 Contractor Pricing (Final 1\_27) (1).xlsx\`
- **Knowledge:** 2026 contractor pricing for Fischer (likely a stone vendor).
- **App area:** Smart Context (cost-aware internal estimates).
- **Implementation:** **do not use** in customer-facing output. Cost/margin language is internal only.
- **Currentness:** current.
- **Sensitivity:** **do-not-expose**.
- **Priority:** reference only.

### J7. 2022 Installation Prices.xls (mirrored here from older \`01\` folder)
- **Source path:** \`09\…\Work Computer Intake - 2026-05-07\2022 Installation Prices.xls\`
- **Knowledge:** 2022-era installation pricing.
- **App area:** Smart Context.
- **Implementation:** **do not use** as authoritative — current install pricing lives in \`01 - Price Lists\CURRENT (2024-2026)\Benson Stone Price Lists\Larry Lawson Masonry Install Pricing.xlsx\`.
- **Currentness:** outdated.
- **Sensitivity:** rep-only.
- **Priority:** reference only.

### J8. Internal Policies\Everest Job Info Requirements.doc
- **Source path:** \`09 - Operations, HR & Internal Reference\Internal Policies\Everest Job Info Requirements.doc\`
- **Knowledge:** Everest (a builder) job-info requirements.
- **App area:** Customer File (builder track), Setup + Goal Lens.
- **Implementation:** internal-only note (builder-specific requirements pattern); checklist item (builder-job intake).
- **Currentness:** likely current.
- **Sensitivity:** rep-only.
- **Priority:** later.

---

## K. Sources from \`10 - Apps, Code & AI Projects\`

### K1. (Folder is a pointer — canonical app code lives outside Drive)
- **Source path:** \`10 - Apps, Code & AI Projects\\` (currently empty in this snapshot)
- **Knowledge:** Reserved for app exports, AI project pointers, archived prototypes. Per README, canonical app source lives at:
 - \`G:\My Drive\Benson Stone Company\Fireplace Department App Project\01-CANONICAL-Sales-Consultation-App\`
 - \`G:\My Drive\Benson Stone Company\Fireplace Department App Project\04-Quote-Proposal-Workbench\`
 - \`G:\My Drive\Benson Stone Company\Fireplace Department App Project\02-Sales-Agent-Knowledge-Base (active GPT)\`
- **App area:** Backstage/Admin.
- **Implementation:** internal-only note (canonical app paths shown to admin only).
- **Currentness:** current (pointer is current; folder content is empty here).
- **Sensitivity:** rep-only.
- **Priority:** later.

---

## L. Older / parallel folders (review and triage)

### L1. \`01 - Price Lists\CURRENT (2024-2026)\Benson Stone Price Lists\\` (Larry Lawson Masonry Install Pricing.xlsx, Glass Door Pricing.doc, Diamond Hearth Boards.doc(x), Empire Log Sets.docx, Empire Loft Burners.docx, 2022 Vented Logs Add Remote Control Pricing.xlsx, 2022 Installation Prices.xls)
- **Knowledge:** Benson's own internal price docs. **Larry Lawson Masonry Install Pricing.xlsx** is the current install pricing reference; **2022 Installation Prices.xls** is its historical predecessor.
- **App area:** Smart Context (internal estimates), Quote Review.
- **Implementation:** internal-only note (current install pricing source); **do not** expose pricing logic to customers (use customer-safe discount language). Source badge/fact ("Source: current Benson Stone install price list").
- **Currentness:** current (Larry Lawson sheet); outdated (2022 Installation Prices, mirrored under \`09\`).
- **Sensitivity:** **do-not-expose** (raw cost/margin); rep-only (final retail prices).
- **Priority:** use now (current install sheet); reference only (2022 historical).

### L2. \`01 - Price Lists\CURRENT (2024-2026)\2022 Price Lists\\` and \`…\2023 Price Lists (1)\\`
- **Knowledge:** Vendor price books from 2022 and 2023 — Empire VF/Vented, Heatilator 2023, Hargrove Vented + VF, Travis 2023, Stûv Apr 2023, Modern Flames, Mendota, Stoll Order Book 2022, Marquis Jan 2022, Kingsman Replacement Parts Jan 2022, Astria, Aspen, Ironhaus, FireRock 2022 + 2023, Design Specialty 2023, Urbana Sept 2023, Enviro Aug 2023, David Kimberly 2023, Napoleon Grill 2024, etc.
- **App area:** Smart Context, Backstage/Admin.
- **Implementation:** **internal-only note**. Treat as **historical unless individually confirmed current** — most are 2+ years old, even though parent folder is named "CURRENT (2024-2026)". Do not auto-quote from these. Source badge/fact ("Pricing reference: current vendor price book (verify before quoting)").
- **Currentness:** historical/reference for most; some may still be current vendor pricing — case by case.
- **Sensitivity:** manager/internal-only (vendor net pricing); **do-not-expose** for files marked "Nets" or "Dealer".
- **Priority:** later (verify per-vendor before relying on any line).

### L3. \`02 - Vendors\\` (older parallel)
- **Knowledge:** Older vendor folder predating \`03 - Product Lists, Manuals & Vendor References\`. Contains Travis 3 yr usage, Travis DVL inv, AVALON08, FlushWoodInserts, LOPI08 (all 2008-era usage workbooks); Marquis Jan 2015 price list; Hearth and Home Tech Service and Parts Lookup Emails; Supplier Quick Contact List; Fireplace Vendors 2023; Hargrove Dating Confirmation; Vendor by Brand Name.
- **App area:** Smart Context, Backstage/Admin.
- **Implementation:** internal-only note. **Supplier Quick Contact List.xlsx** and **Fireplace Vendors 2023.xlsx** are the only likely-current items; treat the rest as legacy reference. **Hearth and Home Tech Service and Parts Lookup Emails.docx** is useful internal contact intel.
- **Currentness:** mostly historical; supplier contact list is likely current.
- **Sensitivity:** rep-only (contacts); manager/internal-only (Marquis 2015 pricing).
- **Priority:** reference only; supplier contact list use soon.

### L4. \`03 - Showroom & Inventory\Pictures\Women's Health Cnt\_e#10D514.jpg\`
- **Knowledge:** A single misfiled photo in a near-empty parallel showroom folder. Folder is effectively a husk.
- **App area:** none.
- **Implementation:** **do not use**.
- **Currentness:** outdated (folder shell).
- **Sensitivity:** customer-safe (photo content unknown but likely benign).
- **Priority:** reference only (cleanup candidate — not part of this read-only sweep).

### L5. \`04 - Service & Installations\\` (older parallel)
- **Knowledge:** Valves photo set (Empire New Valve, SIT Valve, MQ3636, Berkshire Dashboard, Sturbridge, 864HO/864TRV GS dashboards, Skytech Valve Training, Beeping Receivers, Pilot Assembly thermocouple replacement); Travis & Davinci Service Parts; Chimney Sweep - Service Call Pricing.xlsx; FIREPLACE\_SERVICE.ACCDB and FIREPLACE\_SERVICE\_BE.ACCDB (legacy Access database).
- **App area:** Smart Context, Training/Help.
- **Implementation:** internal-only note (valve photo set is great Service Smart Context); **Chimney Sweep - Service Call Pricing.xlsx** is a current service pricing reference. ACCDB files are legacy data; **do not** wire to app.
- **Currentness:** mixed — valve photos and Skytech Valve Training are current/likely-current; ACCDB files are legacy.
- **Sensitivity:** rep-only.
- **Priority:** use soon (valve photos + chimney sweep pricing); reference only (ACCDB).

### L6. \`07 - Warranty & Claims\\` (older parallel)
- **Knowledge:** Vendor warranty PDFs (Dimplex 2010, Heatilator, Jotul, DAVINCI, Weber 2023, F&C Warranty Request) and a large set of customer-named warranty image/PDF/email files (Mulligan, Rehberg, Sigala, Shaner, Talbott, Ticknor, Sabel, Reilly, Lawerence, Hills, Johnson, Anderson Gardens, etc.).
- **App area:** Smart Context (vendor warranty references), Customer File (per-customer claims — restricted).
- **Implementation:** customer-safe explainer (vendor warranty terms summarized — **never quote PDF verbatim** without verification); **do not use** customer-named warranty files for any customer-facing output. Per Master Knowledge §4.4, raw warranty/customer files are not allowed in AI knowledge.
- **Currentness:** vendor warranty PDFs mostly historical (2010, 2023); customer files mixed.
- **Sensitivity:** rep-only (vendor terms); **do-not-expose** (customer-named files).
- **Priority:** later.

### L7. \`08 - Glass Doors & Stoll Orders\\` (older parallel)
- **Knowledge:** door sheet.xls; Diamond W Custom + Standard order forms; Dracme website mirror (legacy HTM dump); thermoritedoors.xls; Design Specialties 5-1-21.pdf; heatilator doors.doc; per-PO Stoll door + mantel orders 2023 + 2024 (\~30 files, customer-named).
- **App area:** Proposal Prep (door + mantel proposal category), Smart Context (door order pattern).
- **Implementation:** proposal category (Doors / Stoll Mantels per-PO pattern); **do not use** customer-named PO files for customer-facing output. Diamond W and Stoll order form templates are useful as schemas.
- **Currentness:** likely current (template); customer files historical.
- **Sensitivity:** rep-only (templates); **do-not-expose** (per-customer POs).
- **Priority:** use soon (templates); reference only (per-customer POs).

### L8. \`09 - Permits & Compliance\\` (older parallel)
- **Knowledge:** City of Rockford Electrical Permit 2021.pdf; Apply for Permit Info.docx; **City of Rockford Permit User-Password.rtf** (credential — flagged in dashboard for password-manager extraction); Hargrove 2024.xml; TAX Credit\IRS TAX FORM 5695 Energy Credit.pdf; FPX Wood Tax Credit Certificate.pdf.
- **App area:** Smart Context, Customer File (tax credit chip), Backstage/Admin.
- **Implementation:** customer-safe explainer (IRS Form 5695 is a customer-friendly tax-credit reference); source badge/fact (FPX wood tax credit certificate when applicable); **do not use** the .rtf credential file for any in-app reference — it must be removed from Drive into a password manager.
- **Currentness:** mixed (2021 permit historical; tax credit forms current).
- **Sensitivity:** customer-safe (IRS form, FPX certificate); **do-not-expose** (.rtf credential).
- **Priority:** use now (tax credit chip); reference only (permit history); **immediate cleanup** (credential file — out of scope for this sweep but flagged).

### L9. \`10 - Helpful Info & Training\\` (older parallel)
- **Knowledge:** mileage.xlsx, mileage service fees 6-9-2017.xlsx, Steel Surcharges and Price Increases 2021 Public file.xlsx, Supplier Quick Contact List.xlsx (also in \`02 - Vendors\\`), Basic Purchasing Guidelines, Shipping & receiving detailed information, Vender info.xlsx.
- **App area:** Backstage/Admin, Smart Context.
- **Implementation:** internal-only note (mileage/service fee table is current useful internal data); **do not** auto-quote 2017 mileage or 2021 surcharges.
- **Currentness:** mostly historical; mileage table possibly current.
- **Sensitivity:** rep-only.
- **Priority:** later; verify mileage rate currency before use.

### L10. \`11 - Customer Quotes & Follow Ups\\` (older parallel — near-empty)
- **Knowledge:** \`Follow-Up Source Packets\follow up quotes.pdf\` (mirrors \`06\`); \`Customer Notes\May 6 at 1 56 PM\` (Drew note).
- **App area:** Follow-Up.
- **Implementation:** Treat the canonical follow-up content as living in \`06\`. This folder is a husk — reference only.
- **Currentness:** husk folder.
- **Sensitivity:** rep-only.
- **Priority:** reference only.

### L11. \`90 - Intake Review - Recently Uploaded and Unsorted\\`
- **Knowledge:** \`\_ARCHIVE\\` (Builder Specs.doc, Builder List for Mailings.doc, Damion Builder List 1-22-07.xls, Price Lists - Pre-2022 (Kevin Obee Era)\Older Price Lists\Install Pricing.doc); \`EMPLOYEE FORMS\PTO Request.doc\`.
- **App area:** Backstage/Admin.
- **Implementation:** **do not use** as live data. Builder specs/lists may be useful pattern references; Kevin Obee era pricing is explicitly historical.
- **Currentness:** historical; Kevin Obee era marked outdated.
- **Sensitivity:** rep-only.
- **Priority:** reference only.

### L12. \`98 - Duplicate Review\Work Computer App-Intake Review - 2026-05-07\Benson Stone Fireplace Sales - Planning Docs Duplicates\\` (\~26 markdown files)
- **Knowledge:** Phase-by-phase workspace migration plans (Phase 1 Safety/Pilot, 2 Skeleton/Move Map, 3A-3H, 4A-4B, 5A-5D), the BENSON-FIREPLACE-WORKSPACE-DASHBOARD.md, BENSON-FIREPLACE-WORKSPACE-ARCHITECTURE-PLAN.md, TASKS.md, CLEANUP-COMPLETE.md, PICTURE-DELETION-STAGING-MANIFEST-2026-05-07.md.
- **App area:** Backstage/Admin, Training/Help.
- **Implementation:** internal-only note (workspace governance reference for admin help drawer); source badge/fact (where to read the Drive map). **Dashboard is the most useful single doc** (folder taxonomy + status + open decisions).
- **Currentness:** current as a snapshot of the May 7, 2026 reorganization.
- **Sensitivity:** manager/internal-only.
- **Priority:** use soon (Dashboard + Architecture Plan); reference only (per-phase docs).

### L13. \`99 - Archive - Do Not Delete Yet\\`
- **Knowledge:** \`Old Warranty Files\Burn Credits.xls\`; \`Old Sales Tools and Signs\…\zprice tag small.doc\`; \`Pending Picture Deletion - 2026-05-07\Buda FP Stone Mfg\*.JPG\` (pending Drew review per README §59-61); \`PICTURE-DELETION-STAGING-MANIFEST-2026-05-07.md\`.
- **App area:** none.
- **Implementation:** **do not use**. Archive — staging only.
- **Currentness:** outdated.
- **Sensitivity:** rep-only.
- **Priority:** reference only.

---

## Final Report

### 1. Folders reviewed

**Active 00–10 (current taxonomy):**
- 00 - START HERE - Benson Fireplace Workspace
- 01 - Active Department Systems
- 02 - Training & Fireplaces 101
- 03 - Product Lists, Manuals & Vendor References
- 04 - Showroom, Cellar, Displays & Site Maps
- 05 - Sales Tools, Customer Education & Follow-Up
- 06 - Quotes, Invoices & Customer Examples
- 07 - Service, Install, Warranty & Claims
- 08 - Marketing & Outreach
- 09 - Operations, HR & Internal Reference
- 10 - Apps, Code & AI Projects (pointer-only; canonical app code lives outside this folder)

**Older / parallel:**
- 01 - Price Lists (sub-CURRENT 2024-2026 with 2022 + 2023 vendor price books and Benson's own price docs)
- 02 - Vendors (legacy — superseded by \`03\`)
- 03 - Showroom & Inventory (husk — superseded by \`04\`)
- 04 - Service & Installations (legacy — superseded by \`07\`)
- 07 - Warranty & Claims (legacy — superseded by \`07 - Service, Install, Warranty & Claims\`)
- 08 - Glass Doors & Stoll Orders (legacy doors/Stoll order data)
- 09 - Permits & Compliance (legacy — including credential file flagged for password-manager extraction)
- 10 - Helpful Info & Training (legacy mileage/shipping/purchasing notes)
- 11 - Customer Quotes & Follow Ups (husk — superseded by \`06\`)
- 90 - Intake Review - Recently Uploaded and Unsorted (intake)
- 98 - Duplicate Review (workspace migration plans — useful as governance reference)
- 99 - Archive - Do Not Delete Yet (staged deletion; do not use)

### 2. Most useful findings (rank-ordered)

1. **Master Knowledge file v2** (C1). The single richest app-intelligence source in the entire department. Spine of the register.
2. **Cowork Workflow V1** (A2). Operating cadence + Liam's four Field Rules + Cowork does/does-not boundary. All four Field Rules are immediate blocker/warning rule candidates.
3. **Quote Template Field Map JSON** (G1). Authoritative proposal data model — 8 sections, every field needed for the rendered proposal.
4. **Customer Education trio** (F1). The 5-question intake worksheet + Vocabulary Disambiguator + Fuel Type Comparison Card map directly to Start Visit / Customer File / Setup + Goal Lens.
5. **Vendor priority tiering** (D1). A/B/C tier list of vendors — direct input for product chip ordering.
6. **README - START HERE + Workspace Dashboard** (A1, L12). Canonical Drive map and sensitivity rules — anchor for Backstage/Admin.
7. **Six training visuals** (C8). Customer-safe diagrams that should appear in-app verbatim.
8. **Showroom anchor displays + site maps** (E1, E2, Master Knowledge §19). Showroom Mode foundation.
9. **Tighter v2.1 four-part training** (C4). Deep training source for the help drawer.
10. **Travis Odor Checklist + Travis Debris Burnoff Guide** (D3). Customer-safe post-install warm-up explainers.

### 3. Quick-fill chip candidates

- **Five discovery questions** (C1, F1): "What do you have now?", "Wood, gas, or electric?", "Masonry or prefab?", "What do you wish was better?", "Keep / convert / replace?"
- **Fireplace type chips:** Masonry, Prefab/Zero-clearance, Insert (existing fireplace).
- **Fuel type chips:** Wood, Gas, Electric, Pellet.
- **Gas-path chips:** Direct Vent, Vent-Free, Gas Logs (vented), Gas Logs (vent-free), B-vent (auto-flag → Liam).
- **Customer goal chips** (C1 §12): More heat / More convenience / Less mess / Better appearance / Keep real-wood feel / Budgeting only.
- **Anchor display chips** (C1 §19): Heatilator I-80, Kingsman Bentley 39, Lopi Berkshire, Travis HE wood-burning, Urbana DV linear, Open-face with Hargrove vented + custom door.
- **Brand chips ordered by tier** (D1): A-tier (Travis/FPX/Lopi, Kingsman, Empire/WMH, Hargrove, Stone Age, Security, Stoll) → B-tier (Firegear, Dimplex, Modern Flames, Vermont Castings) → C-tier (others).
- **Photo-request chips** (C1 §7): full opening, surrounding wall, hearth/mantel, chimney/termination, model tag, gas-line location.
- **IRTAX chip** (Field Rule 4): auto-set on install orders.

### 4. Blocker / warning rule candidates

- **Field Rule 1 — Whisper Flex required:** when a quote includes White Mountain Hearth (Empire) vent-free logs, app blocks finalization until Whisper Flex line \`T1009898-12\` (smaller) or \`T1009898-16\` (larger) is added. Hargrove already includes flex (no block).
- **Field Rule 2 — Gas insert into ZC fireplace:** when product = gas insert AND existing fireplace = ZC/prefab, **require explicit acknowledgement** that the wood-burner is being permanently disabled. Block order finalization until acknowledged.
- **Field Rule 3 — Millivolt banned in Rockford city limits:** when project address is Rockford (per 2024 IL Energy Code R403.13(1)) AND product variant = millivolt, block; offer IPI variant + run electric note. Outside Rockford: warn (Winnebago following — TBD). Customer-safe explainer phrasing required.
- **Field Rule 4 — IRTAX header on installs:** when order includes install scope, block proposal send unless order header is \`IRTAX\`. Smart default sets it ahead of time.
- **B-vent encountered:** any line item, vendor field, or customer language matching B-vent → block-soft → "Route to Liam" message (per Master Knowledge §4.2 and §11).
- **Vent-free in unknown jurisdiction:** when customer asks "is vent-free allowed at my address?" → block customer-safe answer; route to Liam.
- **Pricing exception or discount language without Liam approval:** block (per Master Knowledge §4.2 and §23).
- **Promise install date:** soft block on customer-facing date language; require "we'll check schedule" phrasing (per Master Knowledge §4.3 and §26).
- **Quote-from-the-unit-upward 12-step incomplete:** warn when proposal is missing required structural items (unit, appliance components, pipe, support box, chimney pipe, firestop, flashing, storm collar, cap, labor, finish work, exclusions/assumptions).
- **Setup unverified — ballpark only:** when measurements + venting are not captured, force ballpark language ("This is a useful planning number, but some details still need verification.").
- **Discontinued/unsourced display match:** when customer references a display that may be discontinued, soft warn → "capture photos and route to Liam" (per Master Knowledge §18).

### 5. Customer-safe explainer candidates

- **Masonry vs Prefab/ZC** (C1 §8, C8 visual "Masonary VS Prefab Visual.png").
- **Wood / Gas / Electric tradeoffs** (C1 §10, F1 Fuel Type Comparison Card).
- **Active gas paths: DV, vent-free, gas logs** (C1 §11; B-vent treated separately as "we'd route this to our manager Liam").
- **Inserts overview** (C1 §14).
- **Common upgrade paths** (C1 §15).
- **Ballpark vs verified** (C1 §20, C8 visual "Ballpark VS Verified Visual.png").
- **Why venting matters** (C1 §20).
- **The five follow-up email templates** (C1 §25.1–§25.5).
- **Customer-safe discount language** (C1 §23): "I was able to get roughly $\_\_\_ off the fireplace and venting package for you." (avoid "we took X% off across the board.")
- **Travis odor / debris burnoff post-install explainers** (D3).
- **IRS Form 5695 + FPX Wood Tax Credit Certificate** (L8) when applicable.
- **Fireplace Installation Letter template** (H2).
- **Customer Consultation Summary template** (G3).

### 6. Internal-only guidance

- **Cost / margin / supplier net pricing / vendor agreement terms / commission plan / dealer logins** — never to customer.
- **BisTrack screenshots and processed bundle** — internal training material only; never published.
- **Customer Waitlist** — internal queue only; rows never surfaced to other customers.
- **Stoll QC issues PDF** — internal awareness when adding Stoll lines; never quoted to customer.
- **Per-customer warranty/service files in legacy \`07 - Warranty & Claims\`** — restricted; not for AI ingestion.
- **Customer-named PO files in \`08 - Glass Doors & Stoll Orders\`** — pattern-only; never reproduced.
- **NFPA 211 section 6** — internal reference; route customer code questions to Liam.
- **Margin-aware pricing reasoning, item-level margin notes, dollar-vs-percent discount internal logic** — internal only.
- **Fischer 2026 Contractor Pricing** and **2022 Vended Logs Add Remote Control Pricing** — cost layer; internal only.
- **City of Rockford Permit User-Password.rtf** — must be removed from Drive into a password manager (open decision in dashboard); never referenced in app.

### 7. Outdated / duplicate / reference-only areas

**Outdated (do not use):**
- \`02 - Training\… benson\_stone\_fireplace\_training\_packet\_flagship\_v4 NOT CURRENT.pdf\`
- \`05 - Sales Tools\… Benson\_Stone\_Fireplace\_Sales\_Agent\_Master\_Knowledge.md\` (v1 — superseded by v2 in \`02\`)
- \`09 - Operations\… 2022 Installation Prices.xls\` (current install pricing is \`01\…\Larry Lawson Masonry Install Pricing.xlsx\`)
- \`90 - Intake Review\…\Price Lists - Pre-2022 (Kevin Obee Era)\…\`
- \`99 - Archive - Do Not Delete Yet\…\`

**Historical / reference-only (verify before any reuse):**
- \`01 - Price Lists\CURRENT (2024-2026)\2022 Price Lists\\` and \`2023 Price Lists (1)\\` — vendor price books typically 2+ years old despite the parent folder name.
- \`02 - Vendors\\` (older parallel — except Supplier Quick Contact List).
- \`04 - Service & Installations\\` (older parallel — except current valve set + Skytech training + chimney sweep pricing).
- \`07 - Warranty & Claims\\` (older parallel — vendor warranties dated; per-customer files restricted).
- \`09 - Permits & Compliance\\` (2021 Rockford permit historical; tax-credit forms current).
- \`10 - Helpful Info & Training\\` (mileage 2017, surcharges 2021).
- \`02 - Training & Fireplaces 101\Legacy Training Reference\\` (pre-Liam-era technical references).

**Husk folders / duplicates:**
- \`03 - Showroom & Inventory\\` — single misfiled photo; functionally empty.
- \`11 - Customer Quotes & Follow Ups\\` — superseded by \`06\`.
- \`06 - Quotes, Invoices & Customer Examples\Work Computer Customer Intake - 2026-05-07 (1)\\` (per README open item — duplicate folder pending Drew confirm-empty + delete).
- \`99 - Archive - Do Not Delete Yet\Pending Picture Deletion - 2026-05-07\Buda FP Stone Mfg\\` — pending Drew review.

### 8. Recommended PR 3 for Claude Code

**Working title:** \`feat(field-rules): Liam's May 2026 Field Rules safety layer + IRTAX default\`

**Scope (single PR):**
1. **Field Rules engine** — deterministic ruleset evaluated on every opportunity at three points: when a product line is added, when "Quote Review" is opened, and on "Send Proposal." Source of truth: \`00 - START HERE\Cowork Workflow V1.md\` §5 (mirror the four rules into a versioned \`field-rules.json\` in the app repo so the cadence of edits matches Drew's workflow).
2. **Rule 1 Whisper Flex check** — when an Empire/WMH vent-free log line is added, surface a non-dismissible warning until either \`T1009898-12\` or \`T1009898-16\` is added; show a customer-safe note line on the proposal explaining flex is included.
3. **Rule 2 ZC gas-insert acknowledgement** — when product family = gas insert and existing fireplace type = ZC/prefab (from Setup + Goal Lens), require Drew to tick an acknowledgement panel: "Customer has been told upfront the fireplace will no longer function as a wood-burner; this is permanent." Persist tick on the Customer File.
4. **Rule 3 Rockford millivolt block** — read project city/state from the Customer File. If \`Rockford, IL\` AND product variant contains "millivolt," block proposal finalization with customer-safe IPI-substitute messaging and an internal note pointing to 2024 IL Energy Code R403.13(1). Outside Rockford: surface a soft warning (Winnebago timeline TBD).
5. **Rule 4 IRTAX header default** — when an opportunity contains install scope, set the order header field to \`IRTAX\` by default (smart default + locked unless an admin override in Backstage). Map to \`IR\_TAX\` field in the Quote Template Field Map (G1).
6. **Backstage panel:** "Field Rules — Liam's May 2026" — read-only listing of the four rules + last-updated stamp + a one-line link/path back to \`00 - START HERE\Cowork Workflow V1.md\` (source of truth). Admin-only editing of the version pin.
7. **Smart Context badges** on opportunity cards: ⚠ Whisper Flex needed / ⚠ ZC ack pending / ⚠ Rockford millivolt / ✓ IRTAX set. Surface in the Opportunity Queue from the Cowork Workflow.
8. **Tests** — at least one test per rule covering the customer-safe phrasing surfaced to the rendered proposal, plus one test that verifies the rule engine never exposes cost/margin/internal language in the customer-facing path (regression guard for the Cowork Workflow §6 "Cowork does not" list).

**Explicitly out of scope for PR 3 (do not stack):**
- BisTrack integration (BisTrack remains source of truth — no app writes).
- Outlook send automation (drafts-only per Cowork Workflow §8).
- Vendor manual indexing (that becomes PR 4 — Smart Context PDF index).
- Showroom Display Register UI (that becomes PR 5 — Drive priority #2).
- Old quote OCR confidence surfacing (per Cowork Workflow §6, never expose).

**Risk and rollback:**
- All four rules pull from a single \`field-rules.json\` — toggle off any rule without code change if Liam revises.
- No customer-data migration; no schema migration on Customer File beyond two new boolean fields (\`zc\_acknowledgement\`, \`irtax\_locked\`).
- Easy revert: rules collapse to advisory-only by flipping a feature flag.

---

*End of register.*