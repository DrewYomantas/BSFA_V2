# Strategic Context — September Deadline, Liam Exit, Drew Inherits Pipeline

*Distilled from Apr 22 11:02 AM voice note (Liam orientation session with Drew). These are the most consequential findings of the entire audit — they reframe BSFA from "useful tool" to "production-grade replacement under hard deadline."*

---

## The September 2026 deadline

**Liam Skoryi (Fireplace Department Manager) is pivoting OUT of active sales over the next ~2 months.** Direct quote from the Apr 22 transcript:

> "I'm trying to get out of sales and have everything go through you and Jonathan because that makes my job easier… I will be kind of pivoting to you over the next two months."

**What this means:**
- By **September 2026** (~3 months from now), Liam stops handling sales conversations
- Drew + Jonathan inherit Liam's entire active pipeline + customer relationships
- Drew loses his daily safety net (Liam's review of quotes before they go out)
- Drew also picks up cleanup of "Jar's" (former salesperson) abandoned opportunities

**Implication for BSFA timeline:**
The September 2026 date is **BSFA's real production deadline**. By then, BSFA needs to be:
- Reliable enough to replace Zach's manual Word-doc proposal workflow (explicit Liam mandate, see below)
- Robust enough that Drew can lean on it instead of bouncing to Liam for every spec call
- Comprehensive enough to handle Liam's existing complex projects (Freeman, Donna Nixon, Christina Okasan, Dennis & Cynthia Richards, others)
- Equipped with reliable follow-up automation (Liam's stated #1 priority — see below)

---

## Liam's explicit BSFA mandate

> "We're coming to a point where the tech matches, not exceeds, what we personally know — we don't need this [Zach manually building a proposal upstairs in 30 minutes]."

**Liam wants BSFA to replace:**
- Zach's hand-built customer-facing proposals (the upstairs round-trip — currently takes 30 minutes per quote)
- Liam's own personal Excel-spreadsheet follow-up tracking (currently ad-hoc, not scalable to Drew+Jonathan combined volume)
- The "leave them alone, don't bug them" status quo (Liam's prior manager's advice, which Liam ignored to his benefit)

**Liam's flattery + benchmark:**
> "It actually kind of looked like yours [Drew's BSFA]" — Liam comparing Tim Reed's $10K + monthly fireplace sales tool to BSFA.

This is a strategic anchor. Reed's tool sells for $10K + monthly to dealers; BSFA has comparable-product market value beyond just internal Benson use. Worth flagging for Drew's pricing/IP/positioning thinking.

---

## Follow-up automation = #1 revenue lever

**Liam's own data:** he started tracking follow-ups in an Excel spreadsheet against his prior manager's explicit advice ("leave them alone, don't bug them"). His sales jumped **~33%**. His direct quote:

> "It was ridiculous."

**Liam's stated product requirement for BSFA:**

> "Automatically scheduled to send a week from now a follow-up email that's a little bit more information. A third one and the fourth one, and then you're done. It's all automatic."

**4-touch automated email drip in drafts** is the canonical pattern. Drew's BSFA already has follow-up cadence logic per the CLAUDE.md (`recommendFollowUpCadence` helper), so the foundation exists. What's needed:
- Multi-touch sequence templates (not just single-touch reminders)
- Auto-draft generation tied to opportunity stage / quote age
- Customer-specific personalization (the proven Hot/Warm/Cold/Closed-lost ladder from the Master Knowledge file)
- Send-from-drafts queue Drew (and eventually Jonathan) can review + approve

This is the highest-value BSFA feature gap currently. Build before September.

---

## Liam's preferred direct-vent recommendation

When customers ask "what would you do?" (Liam says this happens on **8 out of 10 closes**), his default is:

**Kozy Heat (Travis Industries family).**

Liam triangulates 3 visually-similar direct-vent units (Travis 36", Enviro 36", Kozy Heat 3060) — all American-made, same gauge steel, same BTUs — and steers customers toward **Kozy Heat**.

**Verification flag:** the transcript also shows Liam saying "I'm a big fan of the [unclear-ASR brand] brand" with ASR garble. Likely Kozy Heat consistently, but **confirm with Liam directly** before encoding as a hard rule in BSFA.

**Apr 30 transcript reinforces this:** Drew himself uses Kozy Heat Nordic 60 TL as the workhorse for the Freeman job. Drew quote on Kozy Heat: *"Cozy heat protects their pricing — they don't sell online anywhere."* (Margin protection makes Kozy Heat the preferred default vendor.)

**Update needed in `vendor-cards.json`:** add `liam_recommendation_default: true` and `recommendation_quote: "Kozy Heat is what Liam steers toward when customers ask 'what would you do?'"` to the kozy_heat entry.

---

## Tim Reed (Reed Marketing LLC) — external mentor

Liam's authoritative external source on fireplace sales:

- **Tim Reed's framework:** "There's no progress without a process"
- **Reed's flagship deck:** "The Psychology of the Sale" (tailored to fireplace showrooms — NOT generic Wolf-of-Wall-Street content)
- **Reed's tool:** ~$10K + monthly maintenance per dealer (a sales-process software product)
- **Speaks at:**
  - **Dealer Days, Rogers MN** (May, annual — Travis Industries factory)
  - **C Bennett distributor event, Missouri** (one-night drive, hotels covered by Benson)
- **Liam wants:** Drew + Jonathan attending these events
- **Liam offered to forward:** Tim Reed materials — Drew should explicitly request these. They likely contain the canonical sales-process Liam wants encoded in BSFA.

**Verification flag:** the company URL is garbled in ASR ("wifi.com" / "Wi-Fi.com"). Probably **hifi.com** or **reedmarketing.com** or **hearthnhome.com**. Confirm with Liam before adding to references.

**Action items:**
1. Drew should request the Tim Reed deck + framework docs from Liam
2. Drew + Jonathan should plan to attend Dealer Days 2027 + Reed's C Bennett MO event
3. Once Reed materials land, integrate into BSFA's Smart Context and the Master Knowledge spine

---

## Kevin Obie (mythic predecessor) — bias warning

**Background:**
- Worked at Benson Stone for 40 years (age 16 → 55)
- First and only job
- Hired Liam directly
- Predecessor of Rick Sutton (who was Liam's manager; now retired)
- Physically built: the showroom, the cabinet, the desk, the training manual, the file structure
- Liam gestured around the office: "everything in here is Kevin's"
- Now **national sales manager at a major distributor** (likely Hearth & Home Tech / HHT — Liam slurs the name)
- Lives in Rockford — visits the showroom occasionally
- "KO era" = pre-2022 (his Benson tenure)

**Liam's bias warning, verbatim:**
> "Kevin is gonna be telling you HIS units… those are the best units. Take it with a grain of salt. All the info is factual, but that doesn't mean you have to sell just his units."

**Implication for BSFA:**
When Kevin Obie visits and walks Drew through products, his recommendations skew toward HHT family (Heatilator / Heat & Glo / Quadra-Fire / Monessen / Majestic). Drew should:
- Listen to the technical info (factual, decades of expertise)
- NOT default-recommend HHT to customers without testing against Benson's current preference order (Kingsman / Travis / Kozy Heat / Urbana)
- Flag in BSFA's Smart Context: when current quote vendor = HHT family, surface "verify with Liam — Kevin Obie bias?" as a soft note

---

## Manager succession chain

```
Kevin Obie (40 yrs, retired ~2022, now at HHT distributor)
    ↓
Rick Sutton (CA fireplace store 15 yrs, then Benson; now retired)
    ↓
Liam Skoryi (current — pivoting OUT by September 2026)
    ↓
Drew Yomantas + Jonathan (target end-state)
```

Drew should be aware: **he's the third generation of fireplace department leadership.** The systems he's building (BSFA + this audit + the AI-facing reference library) are explicitly the foundation for whatever comes after Liam. Worth treating BSFA as a multi-generation knowledge-transfer artifact, not just a personal tool.

---

## Mike Wallin (Brick & Stone manager) — escalation context

- Runs Brick & Stone sales
- Non-commissioned (manager)
- Happy to help with stone-match questions
- Drew's escalation path for stone questions: **Liam first → Mike Wallin (x175 forwards to cell)**
- **Gordon** = legacy stone SME who taught Liam; now retired or rolled up to Mike

**Brick & Stone historical context:**
- Benson Stone used to have a second location on **Material Avenue / Riverside** (~20-25 years; billboard still stands)
- That location was "Benson Stone Masonry" — brick, stone, limestone only
- The building previously belonged to **Rock Valley Brick** (owned by Mike Wallen — note: same surname as current Mike, possible relation TBD)
- Sold to the Bensons sometime after 2008
- Mike now runs consolidated brick/stone sales out of the main Rockford location

**Implication for BSFA:**
Stone-match questions in the customer file should route to Mike Wallin (x175) when Liam unavailable. Encode in the escalation map.

---

## Operational notes from the transcript

- **Drew's orientation status (as of Apr 22):** photo taken; email signature, voicemail, help.benson{stone}.com walkthrough, HR docs all pending. Liam wanted orientation wrapped within 3 days.
- **Drew's Disney/Imagineer background** comes up — Drew offers a visualizer concept: customer clicks on a wall area in a photo, sees the unit morphed in next to their own couch (AR / interactive proposal). Liam was receptive. Worth capturing in BSFA's Hearth Studio backlog as a customer-facing feature.
- **Rep visit season = summer.** All manufacturer reps come through the showroom summer months. Drew will meet several in coming weeks.
- **Conference policy:** Benson pays. Dealer Days Rogers MN (May, annual) + C Bennett MO (one-night). Colorado event (Denver/Aurora) explicitly NOT covered.
- **Jar (former salesperson) status:** "checked out, wasn't doing anything." Liam still cleaning up Jar's old deals. **Risk:** Drew may inherit some stale Jar-era opportunities with bad data hygiene. Worth a focused review when Drew formally takes over.

---

## Cross-references to update

| Insight | File(s) to update |
|---|---|
| September 2026 deadline | `_state.md` (add as project deadline), `LIBRARY-CATALOG.md` (add to executive summary) |
| Follow-up automation = #1 lever | BSFA `salesOsStorage` schema (4-touch drip sequence model), `vendor-cards.json` behavior_rules section |
| Kozy Heat = Liam's default rec | `vendor-cards.json` (kozy_heat entry, add liam_recommendation_default flag) |
| Tim Reed reference | New `external-references.md` or add to `App-Intelligence-Register-clean.md` |
| Kevin Obie HHT bias | `vendor-cards.json` (heatilator entry, add bias warning) |
| Mike Wallin escalation | `vendor-cards.json` behavior_rules.escalation_map (add stone questions → Mike Wallin x175) |
| Jar's stale opportunities | BSFA pipeline cleanup TODO |
| 33% sales lift data point | Marketing / strategic case study material — possibly external pitch deck if Drew ever positions BSFA externally |
| BSFA visualizer feature | Hearth Studio backlog (AR / interactive proposal) |
| September production deadline | Drew's project planning + BSFA milestone definitions |

---

## Bottom line

The audit started as "tidy the Drive + build a knowledge library." The Apr 22 11:02 AM transcript reframes it as: **Drew has ~3 months to make BSFA production-grade because Liam's exit is real and dated.** Every BSFA architectural decision after today should be evaluated against the question: "does this help me take over Liam's pipeline by September?"

Specifically, the BSFA features that became P0 after reading this transcript:
1. **Multi-touch follow-up automation** (4-email drip per opportunity, with smart drafts) — the single biggest revenue lever Liam has identified
2. **Customer-facing proposal generator** that matches/exceeds Zach's manual Word-doc workflow — Liam's explicit replacement target
3. **Vendor recommendation engine** with Kozy Heat as the default for "what would you do?" + Kingsman as bread-and-butter + tiered escalation
4. **Discount governance** — codify the categorical rules (never stone/labor/mantels/limestone) and the salesperson-owns-the-discount principle, so Drew can confidently apply discounts without bouncing every one to Liam
5. **Stone escalation to Mike Wallin** (x175) when Liam unavailable — bake into BSFA's escalation map
6. **HHT-bias soft warning** — when quote vendor = HHT family, surface Kevin Obie bias note for Drew's situational awareness

These six features, by September 2026, are the BSFA acceptance criteria.
