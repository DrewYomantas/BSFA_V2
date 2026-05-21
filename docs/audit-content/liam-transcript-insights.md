# Liam Audio Transcript — BisTrack Quote + Math Insights
*Extracted from `LiamAudioTranscriptBisTrackQuote+Math` (Drive ID 1kNKiekGoxh-MPmr5jNI1Sc8hI89xuN4F, ~22 KB plain text)*

**Context:** Real-time recording of Liam (Speaker 1) walking Drew (Speaker 2) through building a BisTrack quote for the Freeman job (Carol Freeman, the 71-year-old customer mentioned in conversation; matches the `Freeman_Presentation_Assets` folder in your synced workspace). Third speaker is a colleague (Speaker 3). Includes both BisTrack quote mechanics AND stone/limestone pricing math.

**This is potentially the single most valuable knowledge document in the entire Drive.** It captures the *actual* pricing formulas + discount policy + BisTrack workflow that aren't written down anywhere else as plainly. Below is the structured extraction.

---

## 1. BisTrack Quote Workflow (mechanics)

### Building from a previous quote
- Start by **removing** parts the customer no longer wants (Liam's pattern: remove first, then add)
- Example from transcript: removed Komfort Zone Kit when customer downgraded
- **Don't backspace** to delete pricing — adjust labor lines explicitly ("brought paper down to 2070, not 20,000")
- Removing the Komfort Zone Kit also reduced labor by $200 — labor adjusts with scope

### Part number discipline
- **CRITICAL:** When pulling parts into a quote, watch for the **-D suffix** = display version
  - "It kept pulling up after our number, ending with a D, meaning the display"
  - "You have to put in the exact part number. That way, it doesn't pull the display"
  - "Sometimes if you're selling the same item display the D at the end is that part number specifically for that"
- Use exact part numbers, not display-version codes
- For custom-fabricated items, name them with prefix like `BSFP-` (e.g., `BSFP-CozyHeatNordic48TL-LedgeStonePanels-7`) and put unit/markup transparently

### Liner panels
- Almost always need to be ordered
- Custom-named in BisTrack with descriptive prefix
- Example: Cozy Heat Nordik 48 TL Ledge Stone Panels
- Source list price + small markup, then apply customer discount = your line price

### Quote-to-order finalization
- **Once a quote is edited, don't "accept" it inadvertently** — accepting converts to an order
- Save BisTrack quote as PDF (Microsoft Print to PDF) for emailing the customer
- Keep the original physical printout in folder for tracking
- Send PDF + any shop order forms (e.g., hearth/mantel drawings) as a packet
- "Send them this. Keep this all together, just so you have it all. Just kind of packet."

### Shop order forms
- Hearth and mantel work uses **shop order forms** (not BisTrack line items alone)
- Form captures: dimensions, thickness, angle cuts, mantel attachment style, photos
- Filled in at time of measure by Rodney's team
- Lives separately from BisTrack but pinned to the quote

---

## 2. Pricing Math — Limestone Mantel

**Update 2026-05-19:** Canonical Hearth Pricing PDF found (Drew uploaded). See `hearth-pricing.json` for the full structured table. Transcript values match PDF exactly: 2-1/4" limestone = $48/sqft, angle cuts = $40 each. PDF additionally covers 3" limestone ($64/sqft), 4" limestone ($82/sqft), 2" bluestone ($60/sqft), and option pricing for radius corners, notches, holes, cutouts, radius edges (all option prices apply ONLY to 2-1/4" limestone; thicker/bluestone option pricing → see Paul).

### Base formula
**Width (in) × Depth (in) ÷ 144 = square feet**

Then: **square feet × $48/sqft = base fabrication price** (for 2.25" thick limestone)

### Angle cuts add-on
**+ $40 per angle cut** (e.g., 2 cuts = +$80)

### Safety buffer
**+ ~$18-20 buffer** to round up (Liam: "I always like to just add a little bit of buffering")

### Worked example from transcript — Freeman hearth
- 96" wide × 16" deep × 2.25" thick limestone
- Math: (96 × 16) ÷ 144 = 10.67 sq ft → round to 10.67 × $48 = $512
- +2 angle cuts × $40 = $80 → subtotal $592
- +buffer to $610 → final price $610

### Worked example #2 — Freeman mantel
- 96" wide × 14" deep × 2.25" thick limestone (built up 4" since FP recesses 4", "build at 14 inches deep so they have 10 inches projecting on the wall")
- Math: (96 × 14) ÷ 144 = 9.33 sq ft × $48 = $448 → "Make sure your buffers a little bit"
- Notes captured: "Indiana, Buffalo and Stone mantle 96 inches wide, 2.25 inches thick, rather than just being [straight]. I'm gonna make an executive decision around the corners."

### Drawing/specs required on the shop order form
- Width × Depth × Thickness
- Angle cuts at which corners
- Material (Indiana Limestone, etc.)
- Whether "all this information will be written here on the time of measure" — captured at measure, not at quote
- Mantel-vs-hearth distinction
- Mantel must be installed via frame pocket / corbels (heavy — supports weight)
- Customer photos/sketches attached

---

## 3. Pricing Math — Natural Stone Veneer

### Base rate
**Natural stone labor: $45 per square foot** (linear feet of corners + sq ft of flats)

### Square footage calculation
**Each face: Height (in) × Width (in) ÷ 144 = sq ft**
- Sum all faces
- Round UP always ("we're going to always round up")
- "Even if it was 41.1, still call it 42"

### Linear feet of corners
- Calculated separately from flats
- Example: 5 ft × 5 ft fireplace face has 10 ft of corners (2 corners × 5 ft height)
- Plus side returns if recessed: 62" tall × 2 sides → 11 linear feet of corners

### Stone purchase units
- **Flats come in boxes of 5 sq ft each**
- **Corners come in boxes of 8 linear feet each**
- Always round UP to whole boxes

### Worked example — Freeman stone
- 96" × 62" front face = 41.3 sq ft → 42 sq ft
- 2 sides × (18" × 14") = 4 sq ft total
- 18" raised return = 18 sq ft (built-out 14" deep, 18" tall)
- Total sq ft: 42 + 4 + 18 = 64 sq ft
- 11 linear feet of corners
- Subtract corner coverage: corner covers 8.25 sq ft → 11 ÷ 8.25 ≈ need 11 boxes
- Flats: 54 sq ft remaining ÷ 5 sq ft/box = 11 boxes
- Corner boxes: 11 lf needed ÷ 8 lf/box = 2 boxes

### Stone labor calculation
- 11 lf corners + 4 sq ft flats = 65 lf equivalent of work
- 65 × $45 = $2,925
- + travel buffer (e.g., for Dixon trip): bump to $3,450

### Mortar/water materials
- ~15 sq ft per gallon of water for mortar
- 4 bags of mortar for small spray
- (Add mortar/water as separate line items)

### Stone delivery
- "If you're ordering in this kind of sized job, you should add hundred dollars for freight"
- "If the full pallet they won't charge us freight"
- Threshold: smaller orders pay freight; full pallets don't
- Verify pallet count before quoting freight

---

## 4. Discount Policy — CORRECTED PER DREW (2026-05-19)

### IMPORTANT CORRECTION
My initial read suggested 7% was a **standard customer discount**. **Drew clarified: that's wrong.** The 7% in the transcript was **Freeman-specific** — a one-off discount applied because:
- It was a **large order**
- Drew believes (not 100% certain) it was because **everything was in stock**

So 7% is NOT a generally-applicable discount. It's a context-specific decision. Other transcripts may shed more light on when discounts get applied and at what rate — flag as something to extract when other voice notes are processed.

### What Liam said about discounting (still applies categorically)
Regardless of whether the discount was 7% or some other percent, the **categorical rule** still holds:

**What can be discounted (when a discount is approved):**
- Fireplace unit prices
- Venting components

**What is NEVER discounted (regardless of order size / customer / situation):**
- **Stone** ("I never discount Stone")
- **Labor** ("never discount labor")
- **Mantels / Limestone** ("Never discount mantels Limestone")
- Anything custom-ordered

### Explanation language to customer
- **"It's a custom order"** — true, because freight + back-and-forth makes margin too tight
- Alt language: **"We don't do this entire pieces"** (i.e., we don't discount stone work)
- **"Every stone — this stone is custom ordered — so we're a lot of back and involved with the freighting and everything, so we don't get any discounts"**

### Application in BisTrack
- When applying any customer discount, exclude stone/labor/mantel/limestone lines manually
- "Ctrl+A or apply discount to everything you have selected" — DON'T do this, it'll discount stone too
- Apply discount line-by-line, or by selecting only the fireplace + venting groups

### Open question for BSFA
- What triggers a discount in the first place? (large order? stock availability? customer relationship? manager call?)
- When a discount IS approved, who approves it? (Liam per existing escalation map)
- Is there a typical discount range, or is each case individual?
- TODO: extract these answers from other voice-note transcripts as they're processed

---

## 5. Quote Output / Send Workflow

### Final packet for customer email
1. BisTrack quote PDF (saved as `[CustomerLastName] estimate.pdf`)
2. Hearth/mantel shop order form scan
3. Any drawings or design references
4. All sent together in one packet

### Internal physical copies
1. Print BisTrack quote (2 copies — one for customer, one for internal tracking)
2. Keep all related forms together

### Saving the PDF
- File → Print → "Microsoft Print to PDF" → save to Desktop or Documents
- Naming: descriptive customer name + "estimate" (e.g., "Freeman estimate")
- Cannot use slashes in filename — use spaces or dashes

### Avoiding accepting the quote
- Once you've edited it, navigate AWAY from the "accept" button
- Accepting converts quote to order — major no-go before customer signs

---

## 6. Coaching / Workflow Notes from Liam

### Tone
- "I should — there should be some idea, and I know the idea is 12"
- Teaching pattern: walk through real example, narrate math out loud, explain WHY at each step

### Field-of-view notes
- Watch what the customer focuses on vs. what you need
- "They kept trying to talk about toys, and this and everything. But before, I always try to make sure, because these Dimensions, like how hard it is to the top of the mantle, right? What's going on with this? What's going on with this? How high is that mantle off the floor? How deep is the mantle?"
- **Get dimensions even when the customer is talking about something else**

### Sales floor cadence
- Save quote in BisTrack ("Now it's saved under yours")
- Print physical copy for self
- Plan to email customer same day
- Have someone (Drew here) review before sending

### Cross-department learning
- Visit other departments to understand operations
- Example in transcript: visiting Stone-Cutting Machine Company (St Louis vendor rep)
- The customer (Carol Freeman) was a delight — "kicking [Drew] way more like just life to her than most people"
- Builds rapport + cross-team knowledge

---

## 7. Cross-Reference Notes (for BSFA + Brand Voice work)

### Brand Voice exemplars from this transcript
**Customer-facing wording Liam modeled:**
- "I always like to just add a little bit of buffering" → in customer-safe form: "small buffer in pricing to keep the install scope clean"
- "It's a custom order" (discount-explanation)
- "We don't do this entire pieces" (alt explanation)
- Hard discount-no language: just say "every stone is custom-ordered, freight is involved, we can't apply standard discounts here"

### BSFA quote-line-creation patterns
- When BSFA suggests adding a line, the part number must be the **exact part number, no -D suffix**
- BSFA can flag: "this part number has a -D suffix, may be display-only — verify before adding to order"
- BSFA can compute limestone pricing from `width × depth × thickness × angle_cuts → fabrication subtotal`
- BSFA can compute stone-veneer pricing from `face_sqft + corner_lf → install_sqft × $45 + travel_buffer + freight_threshold_check`

### BSFA discount-application rules (categorical — independent of discount %)
- When a discount IS applied, it can apply to: `fireplace_unit`, `venting_components`, `installation_pipe_and_terminations`
- Discount NEVER applies to: `stone`, `mantel`, `limestone`, `labor`, `freight`, `custom_order_items`
- Override: only Liam can approve discount on a normally-non-discountable category
- The discount % itself (e.g., 7% in the Freeman case) is **case-by-case**, not a standard rate — needs manager input per order

### High-priority gaps revealed by transcript
1. **Pricing constants** aren't in any structured file yet:
   - $48/sqft for 2.25" limestone fabrication
   - $40 per angle cut
   - $45/sqft for natural stone labor
   - $20 default safety buffer
   - $100 freight for small stone orders
   - Pallet threshold for free freight
2. **Stone unit packs** (5 sqft flats, 8 lf corners) — should be in product cards
3. **Whisper Flex part numbers** (T1009898-12, T1009898-16) — now captured in field-rules JSON, but should also be in vendor cards
4. **Shop order form templates** — referenced as "in the shop order forms" — should be located + indexed
5. **Other transcripts likely exist** — search Drive for more voice notes from May 7 → June

## 8. Verification needed before BSFA encodes these formulas

- [ ] Confirm $48/sqft is current limestone rate (transcript timing unclear — May 2026?)
- [ ] Confirm $45/sqft is current natural stone labor rate
- [ ] Confirm $40 angle-cut rate
- [ ] Confirm flat box = 5 sqft, corner box = 8 lf for the specific stone brand discussed (Indiana? Buffalo? "desert blend"?)
- [ ] Confirm freight threshold (when "full pallet")
- [x] CONFIRMED: 7% is NOT a standard discount (Freeman-specific, large-order + in-stock context). Standard discount rate per order is case-by-case / manager-determined.
- [ ] Confirm IL Energy Code R403.13(1) date and Rockford applicability

These should be the FIRST questions to Liam in your next conversation, so BSFA can encode them.
