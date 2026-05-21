# Voice Notes — Structured Insights
*Companion to `liam-transcript-insights.md`. Both Apr 22 and Apr 25 voice notes extracted and structured.*

## Files

| File | Date | Size | Drive ID | What it is |
|---|---|---|---|---|
| `Apr 22 at 3_49 PM (dup of Voice Notes copy).txt` | 2026-04-22 | 24 KB | `168dPJ_ncc4uwDcRCQEQH7ntqfeQF38ZC` | Drew teaching new hire BisTrack quote workflow on a Lopi Endeavor stove (Christina Okasan via Aaron) |
| `Apr 25 at 11_31 AM (dup of Voice Notes copy).txt` | 2026-04-25 | 60 KB | `1Gj7PoHYByxm97wM77dp6GChdMJcVO5a0` | Drew giving showroom walkthrough — display-by-display sales commentary, brand profiles, sell/don't-sell preferences |
| `LiamAudioTranscriptBisTrackQuote+Math.txt` | 2026-05-18 | 22 KB | `1kNKiekGoxh-MPmr5jNI1Sc8hI89xuN4F` | (Already structured separately in `liam-transcript-insights.md`) Liam teaching Drew limestone pricing math + BisTrack mechanics on Freeman job |

Drew uses sales-call voice recordings as a learning loop. These are real operational training, not staged demos. **High value for BSFA brand voice + agent answer templates** — they capture how Drew actually talks about products.

---

## Apr 22 Voice Note — BisTrack Quote Workflow (Lopi Endeavor for Christina Okasan)

### Context
Drew teaching a new hire (likely brand new) the BisTrack quote workflow. Customer is Christina Okasan, an Ambassador Homes builder customer (Darko = project manager). Quote request came through **Aaron** — an internal contact (cabinet dept / 2nd floor) who funnels quote requests to fireplace.

### 1. Aaron-as-funnel pattern
- Aaron is "very bossy" but earned her position — "she's at the type position for a reason"
- "She only deals with me. Once you get trained up potentially, there can be a partnership there"
- Aaron typically does most of the work and just needs Drew to "put it on paper"
- Quote-request email pattern: "Can you put together some retail pricing for the stove they mentioned below please with install on exterior wall and ranch home?"
- She gives Drew "50% of those jobs" (i.e., a big share of his quote volume)

### 2. BisTrack quote workflow (mechanics)
- Create new quote — first **search for customer in system**, copy/paste contact info if exists
- For builder jobs: builder's name goes on quote (e.g., "Ambassador" = Darko's company), not end-customer
- Build line items **from the unit UP** (Jonathan taught Drew this):
  1. Unit
  2. Black pipe to cathedral support
  3. Insulated stainless steel pipe past cathedral support
  4. Fire stop
  5. Roof flashing
  6. Cap
  7. Spark arrestor
- **76 seed silicone caulk on EVERY venting order** (every job)
- Item naming convention: **`inst-[unit name]`** for installs (e.g., `inst-Lopi Endeavor`)
- Labor line: `labor to install [unit type], [story], [city, state]` (e.g., "labor to install good stove, one story Rockford Illinois")
- Default city is Rockford ("our minimum price") — adjust later if changes

### 3. Discount policy — clarified again (matches Drew's morning note)
- **"there's not really like a policy on discounts. It really isn't up to the sales person. I mean, well, it is — it is up to the salesperson"**
- The salesperson owns the discount because "that's your sale"
- "if you really want the sale, but they're just pinching on it, you can give a little bit more of a discount, but then it's you that's losing the margin"
- **Two things NEVER discount:**
  1. **Labor** — "Labor were pretty hard set, and once we figure out a labor price, that's a labor price"
  2. **Custom orders** — "people understand that, yeah, something's custom ordered. They don't really expect a discount"
- Items CAN be manipulated (discounted)
- Note: Drew is ending the 2 grandfathered contractor labor discounts as of June 2026 (from Rick's era)

### 4. Travis Fire Builder — the back-office sales tool
- Drew uses this for Travis Industries quotes
- URL: Travis "back office" — login required (Drew has automatic login)
- Has full installation manuals, specs, all product photos
- Can design a fire visually: "let's just say you have a customer that's looking for a 72 inch linear Deluxe Gas fireplace. You could click this..."
- Customer-facing — Drew turns the screen so customer can pick options live
- Generates SKU numbers BSFA could ingest
- Travis Fire Builder has pricing — Benson's BisTrack has the same pricing (Michelle keeps it updated)
- For ambassador/builder customers, Travis Fire Builder shows automatic discount

### 5. Security pipe — the discount sweet spot
- "we're one of the first people to carry [Security pipe], so we still have a really good buying rate from them"
- **Margins on Security pipe: 63%**
- "if for whatever reason you have a customer who's just like, I really have this number in mind... if you did a 20% discount on the pipe form, you're at a 53% margin"
- "$100 off each pipe, which to the customer is like damn that's a big deal. It is a substantial discount, but it really doesn't hurt you"
- **Implication for BSFA:** when rep needs discount room, Security pipe lines have 20% room before hitting 50% margin

### 6. BisTrack margins
- "Pay attention to **per-item margin**" — not grand margin at the bottom
- Special-ordered items show 100% margin in the system, which confuses the grand total
- BSFA can compute "true" margin by filtering out special-order line items

### 7. Department structure
- Fireplace dept is **protected** — only dept that can sell fireplaces
- Fireplace dept can sell anything: granite, stone, landscaping, etc.
- Other depts can't sell fireplaces (a 2nd-floor designer got in trouble trying)
- **Commission vs dept-sales distinction:** cross-dept sale counts for rep commission but NOT the department's sales numbers
- Aaron's quote-funnel relationship still credits dept sales numbers ✓

### 8. People mentioned (Apr 22 voice note)
- **Drew** (Speaker 1) — explaining
- **New hire** (Speaker 2) — being trained, name not stated
- **Aaron** — 2nd floor designer / cabinet, "honest", funnels quotes to fireplace
- **Christina Okasan** — customer being quoted
- **Darko** — Ambassador Homes project manager
- **Jonathan** — Drew's mentor, taught "build from the unit up"
- **Andy Benson** — President, "on vacation"
- **Rick (Sutton)** — predecessor who set up the discounted-labor contractor agreements
- **Dupree** — Drew's collaborator on automation/AI ("Me and Dupree can improve things")

### 9. Future-system anticipation
- "the new system is going to have some sort of AI, autofill, and all that stuff, so that'll be really nice"
- Drew is explicitly building BSFA to replace the BisTrack-as-only-tool pain point
- Aaron's quote-template Word doc shows how customer-facing proposals are currently built (with manual edit)

---

## Apr 25 Voice Note — Showroom Walkthrough

### Context
Drew giving showroom walkthrough — display-by-display sales commentary. Speakers include Drew (Speaker 3), Jonathan (Speaker 2), and one or more new hires. Walkthrough covers wood fireplaces, gas inserts, gas freestanding stoves, vent-free, grills, glass doors, and linear/specialty fireplaces.

### 10. Per-display sales commentary (additions to showroom-displays JSON)

#### Wood + log displays
- **ICON 80 / I-80 (Heatilator)** with Hargrove vent-free log + custom glass door: "one of our most popular wood burning fireplaces"... but Drew DOESN'T LIKE selling off this display: "doesn't look that great"... "I don't sell off of this display very often at all"
- **Hargrove vent-free logs (display #1)**: "I'm not a big fan of these, but I do sell these"
- **Hargrove vent-free logs (display #2 — different model)**: "I don't like that one at all"
- **Hargrove vented logs**: "this is from Hargrove, which is our main vented gas log supplier"

#### Vent-free
- **White Mountain Hearth vent-free** (Empire): Drew's PREFERRED vent-free display: "this just looks so much better than the [other one]. I really sell off of this one a lot"
- General rule: "vent-frees aren't going to look good. They're not made to look good. They're made to heat"

#### Stoves (Lopi)
- **Lopi gas direct vent stoves (standard + premium)**: "**these two stoves right here are money makers**"

#### Wood fireplace efficiency
- Open-face wood burning fireplaces "are pretty much zero to five percent efficient. You'll see that on your notes on the training manual"
- Can be converted to gas via: gas insert, gas log set, or gas log lighter (still burn wood)
- "Unless you're putting in a gas insert or a vented gas log set, you're not going to get any heat from burning over there"

#### Gas inserts
- "Average about $8K-9K. They're high ticket items. You can move a gas insert. Margins are good"
- Cross-brand display: "These are all Travis Industries models here. Travis industry, Mendota. You got some Enviro units here. Cozy heating unit up here"
- Customer separator: "this is gas. That's wood. Some people might come in like, I want the heat, but I don't want to deal with logs"

#### Linear / specialty fireplaces
- **Linear gas direct from Travis Industries**: "we do this unit quite a bit"
- **DaVinci specialty fireplace**: "DaVinci is owned by Travis Industries. Same company makes this completely different fireplace. Still a direct vent. This is designed to heat. Designer fireplace — custom burners, custom glass. **Very high ticket. Very high margin. Very hard sell, because you just don't sell too often**"

#### Mendota gas direct fireplace
- "I'm trying to sell this off display. I got it on a couple quotes. I think I might sell it this year. We'll see because I'm only — I want to get rid of this this way"

#### Kingsman
- **"highest margin in fireplaces is Kingsman"** ← KEY DATA POINT FOR BSFA
- Kingsman pricing/margin position confirmed
- Drew quote: "we have a deal with or like, yes, grandfather, we have a very good discount on them"

#### Travis Industries family
- "Travis Industries has sister Brands. They have Lopi. They have DaVinci. They have Fireplace Xtrordinair."
- "We have a good relationship with them for 40+ years. So we get good margins"
- Their log sets are model-specific: "you can't put any log set on it. It needs to be theirs because it has a special stand"
- Upsell math: "that log set 600 bucks. But the stones are 100 bucks, you know, extra 500 on the sale right there. The little upsells for everything"

#### Glass doors area
- **"about 5-65% of what you're looking at is discontinued"** — major inventory note
- This is a real sales-floor friction: most door displays customers see can't be ordered

### 11. Grills
- **Napoleon**: "**bread and butter** for gas grills that are freestanding"
- **Summerset**: "**bread and butter for built-in kitchen islands**"
  - Lifetime warranty
  - Made of 3 or 4 stainless
  - Built to be outside forever (no cover needed)
  - Very premium
  - **Good margins** — "long lasting partnership with them. So if you can sell Summerset, you're making money OK"
  - Cart feature available (Summerset can be freestanding too)
  - Jonathan owns one — Drew's social proof
  - "20K sale with better margins and just looks freaking sick" for full kitchen-island Summerset + granite countertop
- **Napoleon Prestige Pro Series**: Napoleon's premium series (entered as comparison to Summerset)
- **Fire Magic**: Drew's bias — "I'm not a big fan of finer magic... they're made incredibly well but to justify between 10 grand? It's a complete opinion. I am gonna really cut the price on it"
  - Currently $200 SPIFF on Fire Magic to incentivize sale-floor adoption
  - "I've never had finer magic training before"

### 12. Customers mentioned (Apr 25 voice note)
- **Donna Nixon** — customer (separate from Freemans)
- **The Freemans** — same Freeman customer from Liam transcript; ongoing job; Drew mentions "we've got the Freemans looking at it"
- Same job from Liam transcript (the limestone hearth/mantel + Kozy Heat Nordik 48 TL) is ACTIVELY in progress per this transcript

### 13. Brand voice patterns (for BSFA's brand voice + agent answer templates)
Drew's language tells:
- **Confidence + transparency** with customer: explains margin philosophy, when discounts are okay
- **Honest preference** statements — won't pretend to love a product he doesn't ("Fire Magic", certain Hargrove models)
- **Customer-centric upsell** — "20K sale with better margins and just looks freaking sick" (paints the picture)
- **Cross-product comparison** — "I would sell a customer this over that, okay, a thousand dollars difference"
- **Brand-loyalty + ownership story** — Jonathan owns a Summerset; Drew uses this as social proof
- **Doesn't apologize for premium pricing on quality items** — frames it as the customer's choice
- **Avoids overselling** — explicitly tells customer when a less-expensive option is better for them

---

## Implications for BSFA + Brand Voice work

### Updates to make in `vendor-cards.json`:
1. **Kingsman**: Add note: "highest margin in fireplaces" (per Apr 25 walkthrough)
2. **Travis Industries**: Add note: "40+ year relationship — Benson gets good margins"
3. **Summerset**: Add `relationship_strength: "long_partnership"`, `margin_quality: "good"`, `agent_answer_template` for grill island upsell
4. **Napoleon**: Add `role: "bread-and-butter freestanding grill"`
5. **DaVinci**: Add `sell_difficulty: "very_hard"`, `margin_quality: "very_high"`, `customer_fit: "customer who values custom design + heating performance + high investment"`
6. **Mendota**: Add `display_status: "stuck on display"` — Drew trying to move this
7. **Fire Magic**: Add `drew_bias: "not_a_fan"`, `spiff_active: 200`

### Updates to `showroom-displays-first-floor.json`:
- Add `agent_commentary` field per position
- ICON 80 / I-80 → `drew_sales_pref: "rarely sells off, doesn't like the look"`
- White Mountain Hearth vent-free → `drew_sales_pref: "primary vent-free display, sells often"`
- Hargrove vent-free model A → `drew_sales_pref: "neutral"`
- Hargrove vent-free model B → `drew_sales_pref: "dislikes"`
- Lopi DV stoves → `drew_sales_pref: "money makers"`
- Mendota gas direct → `display_status: "trying to move", drew_sales_pref: "stuck"`
- Glass doors → `inventory_alert: "65% of displays discontinued, verify before quoting"`

### New BSFA field-rule candidate
- **Field Rule 5 — Glass door currency check**: When a quote includes a glass door from showroom display, BSFA flags: "65% of glass door displays are discontinued — verify with current Stoll/Design Specialties/Iron Haus orderbook before quoting."

### Discount Policy — FINAL CONSOLIDATED VIEW
Three transcripts now all say the same:
- **There is no fixed discount policy at Benson Fireplace**
- The salesperson owns the discount decision (it comes from their commission/margin)
- **Always-discountable**: Fireplaces (unit), Venting components (especially Security pipe = 63% margin sweet spot)
- **Never-discountable**: Labor, Stone, Mantels, Limestone, Custom-order items
- The 7% on Freeman was Drew's call (large order + suspected in-stock)
- Liam-set rule: 2 grandfathered contractor labor discounts being ended June 2026

### Open questions still
- How much room does Drew typically allow himself on a customer discount before checking with Liam?
- Are there per-vendor margin policies (some vendors have negotiated margin minimums for the dept)?
- For Travis Fire Builder discounts — does the auto-discount apply ONLY for Ambassador or any builder customer?
- What's the cellar display register equivalent of the first-floor doc? Still needed for full showroom intelligence.
