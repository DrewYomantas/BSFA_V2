// Summary (V6) — the keepsake folio. Print-friendly via .hearth-folio class
// (see src/index.css @media print rules).
//
//   • BrassEmboss replaces the V5 wax-seal monogram.
//   • FolioQR points at a future read-only revisit URL keyed by sessionId.
//   • Masthead pulls customer first name + last initial + project + guide from session.
//   • Stage hero is wrapped in AssetSlot so a UE5 render can replace the specimen.
//   • PresentationGuard refuses to render with missing production assets.
import React from 'react'
import { V4, useAtmosphere } from './tokens.js'
import {
  G, Eye, BrassCorner, MonogramV4, HeaderV4, GhostBtn, Swatch, SpecimenTag, EtchedPlate,
  BrassEmboss, QRPlaceholder,
} from './atoms.jsx'
import { FireplaceV4 } from './FireplaceStage.jsx'
import { AssetSlot, PresentationGuard } from './v6Atoms.jsx'
import { useAppMode } from './AppModeContext.jsx'
import {
  projectTypes, fireExperiences, stones, mantels, hearths, lightingMoods, findOption,
} from '../../../lib/buildOptions.js'

const REQUIRED_PRESENTATION_ASSETS = [
  { kind: 'stage', id: 'warmEvening' },
  { kind: 'stage', id: 'cleanDaylight' },
]

function SummaryRow({ eyebrow, label, sub, swatchId, glyph }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '44px 1fr auto',
      gap: 12, alignItems: 'center',
      padding: '10px 0',
      borderBottom: `1px dashed ${V4.line}`,
    }}>
      {swatchId
        ? <Swatch id={swatchId} w={44} h={44} radius={6}/>
        : <div style={{
            width: 44, height: 44, borderRadius: 6, background: V4.surfaceHi,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: V4.walnut, border: `1px solid ${V4.line}`,
          }}>
            <G kind={glyph || 'home'} size={18} stroke={1.5}/>
          </div>
      }
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Eye color={V4.muted} style={{ marginBottom: 0 }}>{eyebrow}</Eye>
        <div className="serif" style={{ fontSize: 18, color: V4.ink, lineHeight: 1.05, fontWeight: 500, marginTop: 3 }}>
          {label}
        </div>
        {sub && (
          <div style={{ fontFamily: 'DM Sans', fontSize: 11.5, color: V4.muted, marginTop: 2 }}>{sub}</div>
        )}
      </div>
      <G kind="check-c" size={16} color={V4.copper} stroke={1.6} aria-hidden="true"/>
    </div>
  )
}

function NextStep({ n, title, body, icon }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '8px 0' }}>
      <div aria-hidden="true" style={{
        width: 36, height: 36, borderRadius: 999,
        background: V4.cream, border: `1px solid ${V4.line}`,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: V4.walnut, flexShrink: 0, position: 'relative',
        boxShadow: '0 1px 1px rgba(60,42,30,0.05), 0 2px 6px rgba(60,42,30,0.06)',
      }}>
        <G kind={icon} size={15} stroke={1.5}/>
        <span style={{
          position: 'absolute', top: -5, right: -5,
          width: 18, height: 18, borderRadius: 999,
          background: V4.ember, color: V4.cream,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'DM Sans', fontSize: 10, fontWeight: 700,
          boxShadow: '0 2px 6px rgba(217,89,30,0.45)',
        }}>{n}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="serif" style={{ fontSize: 16, color: V4.ink, fontWeight: 500, lineHeight: 1.2 }}>
          {title}
        </div>
        <div style={{ fontFamily: 'DM Sans', fontSize: 12, color: V4.ink2, marginTop: 2, lineHeight: 1.5 }}>
          {body}
        </div>
      </div>
    </div>
  )
}

export default function SummaryV5({
  build, customer = {}, project = {}, guide, sessionId = 'preview',
  onBack, onSend,
}) {
  const atm = useAtmosphere()
  const mode = useAppMode()

  const proj   = findOption(projectTypes, build.projectType)
  const fire   = findOption(fireExperiences, build.fireExperience)
  const stone  = findOption(stones, build.stoneId)
  const mantel = findOption(mantels, build.mantelId)
  const hearth = findOption(hearths, build.hearthId)
  const light  = findOption(lightingMoods, build.lightingMoodId)

  const firstName = (customer.firstName || '').trim()
  const lastInitial = (customer.lastInitial || (customer.lastName || '').trim().charAt(0) || '').toUpperCase()
  const customerLine = firstName
    ? (lastInitial ? `${firstName} ${lastInitial}.` : firstName)
    : null
  const projectName = (project?.name || '').trim()
  const projectTitle = projectName || (firstName ? `${firstName}'s Hearth` : 'Your Hearth Design')
  const guideName = (guide?.name || 'Drew Hendrickson').trim()
  const guideFirst = guideName.split(' ')[0]

  // Folio number is internal-only — customer mode keeps the masthead quiet.
  const folioRef = sessionId.slice(0, 6).toUpperCase()
  const folioUrl = `/folio/${sessionId}`

  return (
    <PresentationGuard required={REQUIRED_PRESENTATION_ASSETS} screen="Folio">
    <div className="hearth-folio" style={{
      width: '100vw', minHeight: '100vh', position: 'relative',
      background: V4.iron, color: V4.paperInk,
      display: 'flex', flexDirection: 'column',
    }}>
      <div className="wood-grain hearth-folio__chrome" style={{ position: 'relative' }}>
        <HeaderV4 current="Your hearth" dark/>
      </div>

      <div style={{
        flex: 1, display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 460px',
        gap: 22, padding: '18px 24px 22px', minHeight: 0,
      }}>

        {/* ── LEFT: folio ─────────────────── */}
        <div style={{ position: 'relative', minHeight: 0 }}>
          <div className="grain hearth-folio__sheet" style={{
            position: 'relative', height: '100%',
            background: `linear-gradient(180deg, ${V4.surfaceHi}, ${V4.parchment})`,
            borderRadius: 6,
            boxShadow: '0 4px 4px rgba(0,0,0,0.30), 0 30px 70px rgba(0,0,0,0.40), inset 0 0 0 1px rgba(110,73,40,0.10)',
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 10,    left: 10,    zIndex: 4 }}><BrassCorner corner="tl" size={22}/></div>
            <div style={{ position: 'absolute', top: 10,    right: 10,   zIndex: 4 }}><BrassCorner corner="tr" size={22}/></div>
            <div style={{ position: 'absolute', bottom: 10, left: 10,    zIndex: 4 }}><BrassCorner corner="bl" size={22}/></div>
            <div style={{ position: 'absolute', bottom: 10, right: 10,   zIndex: 4 }}><BrassCorner corner="br" size={22}/></div>

            {/* Masthead */}
            <div style={{
              padding: '20px 32px 14px', position: 'relative', zIndex: 2,
              borderBottom: `1px solid ${V4.line}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <MonogramV4 size={44} color={V4.copper}/>
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                  <span className="serif" style={{ fontSize: 24, color: V4.walnut, letterSpacing: 0.5, fontWeight: 500 }}>
                    Benson Stone
                  </span>
                  <span style={{
                    fontSize: 11, color: V4.ink2, marginTop: 5,
                    letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600,
                  }}>Hearth Studio · Rockford</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {mode === 'internal' && (
                  <>
                    <div style={{ textAlign: 'right' }}>
                      <Eye color={V4.muted}>Folio</Eye>
                      <div className="serif-it" style={{ fontSize: 16, color: V4.ink, marginTop: 3 }}>
                        {folioRef}
                      </div>
                    </div>
                    <span aria-hidden="true" style={{ width: 1, height: 28, background: V4.line }}/>
                  </>
                )}
                <div style={{ textAlign: 'right' }}>
                  <Eye color={V4.muted}>Date</Eye>
                  <div className="serif-it" style={{ fontSize: 16, color: V4.ink, marginTop: 3 }}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </div>

            {/* Project / customer identity strip */}
            <div style={{
              padding: '10px 32px 14px', position: 'relative', zIndex: 2,
              borderBottom: `1px solid ${V4.line}`,
              display: 'flex', alignItems: 'baseline', gap: 18, flexWrap: 'wrap',
            }}>
              <div>
                <Eye color={V4.copper}>For</Eye>
                <div className="serif" style={{
                  fontSize: 22, color: V4.ink, fontWeight: 500, lineHeight: 1, marginTop: 4,
                }}>
                  {customerLine || <em className="serif-it">Today's guest</em>}
                </div>
              </div>
              {projectName && (
                <>
                  <span aria-hidden="true" style={{ width: 1, height: 24, background: V4.line, alignSelf: 'flex-end' }}/>
                  <div>
                    <Eye color={V4.copper}>Project</Eye>
                    <div className="serif-it" style={{
                      fontSize: 20, color: V4.ink, fontWeight: 500, lineHeight: 1, marginTop: 4,
                    }}>{projectName}</div>
                  </div>
                </>
              )}
            </div>

            {/* Title */}
            <div style={{
              padding: '16px 32px 0', position: 'relative', zIndex: 2,
              display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24,
            }}>
              <div>
                <Eye color={V4.copper}>The hearth, designed today</Eye>
                <h2 className="serif" style={{
                  margin: '6px 0 0', fontSize: 40, color: V4.ink, fontWeight: 500, lineHeight: 1,
                  letterSpacing: -0.3,
                }}>
                  {projectTitle}
                </h2>
                <p className="serif-it" style={{
                  margin: '8px 0 0', fontSize: 18, color: V4.copper, fontWeight: 500, lineHeight: 1.3,
                }}>
                  A warm gathering place — for years to come.
                </p>
              </div>
              {mode === 'internal' && (
                <SpecimenTag dark={false}
                             code={atm.mood === 'warmEvening' ? 'INTERNAL · WARM EVENING' : 'INTERNAL · CLEAN DAYLIGHT'}/>
              )}
            </div>

            {/* Hero stage */}
            <div style={{
              padding: '16px 32px 0', position: 'relative', zIndex: 2,
              flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0,
            }}>
              <div style={{
                position: 'relative', borderRadius: 8, overflow: 'hidden',
                border: `2px solid ${V4.walnut}`, flex: 1, minHeight: 280,
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04), 0 18px 50px rgba(0,0,0,0.30)',
              }}>
                <AssetSlot kind="stage" id={atm.mood}
                           alt={atm.mood === 'warmEvening' ? 'Hearth at warm evening' : 'Hearth at clean daylight'}>
                  <FireplaceV4 width={760} height={420}
                               stoneId={atm.stone} mantelId={atm.mantel}
                               hearthId={atm.hearth} moodId={atm.mood}
                               showLabel showHint={false}
                               showFurniture showParticles showFloorReflection/>
                </AssetSlot>
                <div style={{ position: 'absolute', top: 8,    left: 8  }}><BrassCorner corner="tl" size={14}/></div>
                <div style={{ position: 'absolute', top: 8,    right: 8 }}><BrassCorner corner="tr" size={14}/></div>
                <div style={{ position: 'absolute', bottom: 8, left: 8  }}><BrassCorner corner="bl" size={14}/></div>
                <div style={{ position: 'absolute', bottom: 8, right: 8 }}><BrassCorner corner="br" size={14}/></div>
              </div>

              {/* Signature row */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                margin: '16px 0 14px', gap: 16,
              }}>
                <EtchedPlate dark={false} style={{ maxWidth: 380 }}>
                  <span aria-hidden="true" style={{ color: V4.copper, flexShrink: 0 }}>
                    <G kind="note" size={12} stroke={1.7}/>
                  </span>
                  Pricing, availability, and install timing are confirmed
                  on the written proposal.
                </EtchedPlate>

                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
                  <div style={{ textAlign: 'right' }}>
                    <div className="serif-it" style={{ fontSize: 16, color: V4.ink2, lineHeight: 1.1 }}>
                      With care,
                    </div>
                    <div className="serif" style={{
                      fontSize: 18, color: V4.walnut, fontWeight: 500, marginTop: 4,
                      borderTop: `1px solid ${V4.line}`, paddingTop: 5, minWidth: 180,
                    }}>
                      {guideFirst} &amp; the Benson Stone team
                    </div>
                  </div>
                  <BrassEmboss size={58}/>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: details ───────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>

          <div className="grain" style={{
            background: V4.surfaceHi, borderRadius: 6,
            padding: '14px 20px', position: 'relative',
            boxShadow: '0 2px 2px rgba(0,0,0,0.25), 0 18px 40px rgba(0,0,0,0.22), inset 0 0 0 1px rgba(110,73,40,0.10)',
            color: V4.ink,
          }}>
            <div style={{ position: 'absolute', top: 8, left: 8  }}><BrassCorner corner="tl" size={14}/></div>
            <div style={{ position: 'absolute', top: 8, right: 8 }}><BrassCorner corner="tr" size={14}/></div>
            <div style={{ position: 'absolute', bottom: 8, left: 8  }}><BrassCorner corner="bl" size={14}/></div>
            <div style={{ position: 'absolute', bottom: 8, right: 8 }}><BrassCorner corner="br" size={14}/></div>

            <div style={{ position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <Eye color={V4.copper}>Your selections</Eye>
              <button onClick={onBack} className="hearth-folio__no-print" style={{
                fontFamily: 'DM Sans', fontSize: 12, color: V4.ink2, fontWeight: 500,
                background: 'transparent', border: 'none', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 4, letterSpacing: 0.4,
                padding: 6,
              }}>
                <G kind="pencil" size={11} stroke={1.6}/> Edit selections
              </button>
            </div>

            <SummaryRow eyebrow="Project type" label={proj?.label || '—'}
                        sub={proj?.hint} glyph={proj?.glyph || 'home'}/>
            <SummaryRow eyebrow="Fire" label={fire?.label || '—'}
                        sub={fire?.hint} glyph="flame"/>
            <SummaryRow eyebrow="Stone" label={stone?.label || '—'}
                        sub={stone?.origin} swatchId={build.stoneId}/>
            <SummaryRow eyebrow="Mantel" label={mantel?.label || '—'}
                        sub={mantel?.origin} swatchId={build.mantelId}/>
            <SummaryRow eyebrow="Hearth" label={hearth?.label || '—'}
                        sub={hearth?.origin} swatchId={build.hearthId}/>
            <SummaryRow eyebrow="Light" label={light?.label || '—'}
                        sub={light?.note} swatchId={build.lightingMoodId}/>
          </div>

          <div className="grain" style={{
            background: V4.surfaceHi, borderRadius: 6,
            padding: '12px 20px 10px', position: 'relative',
            boxShadow: '0 2px 2px rgba(0,0,0,0.25), 0 14px 28px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(110,73,40,0.10)',
            color: V4.ink,
          }}>
            <div style={{ position: 'absolute', top: 8, left: 8  }}><BrassCorner corner="tl" size={12}/></div>
            <div style={{ position: 'absolute', top: 8, right: 8 }}><BrassCorner corner="tr" size={12}/></div>

            <Eye color={V4.copper} style={{ marginBottom: 2 }}>What we'll do together</Eye>
            <div style={{ marginTop: 4 }}>
              <NextStep n="1" icon="ruler"
                        title="Confirm measurements"
                        body="We'll verify wall dimensions and chimney conditions on-site."/>
              <NextStep n="2" icon="note"
                        title="Prepare your written proposal"
                        body={`${guideFirst} will email a clear, itemized plan.`}/>
              <NextStep n="3" icon="calendar"
                        title="Review timing together"
                        body="We'll confirm availability and install timing once you approve."/>
            </div>
          </div>

          {/* QR keepsake — premium placeholder */}
          <div className="grain hearth-folio__qr" style={{
            background: V4.surfaceHi, borderRadius: 6,
            padding: '14px 20px', position: 'relative',
            boxShadow: '0 2px 2px rgba(0,0,0,0.25), 0 10px 22px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(110,73,40,0.10)',
            color: V4.ink,
            display: 'flex', alignItems: 'center', gap: 18,
          }}>
            <QRPlaceholder size={88} label={null}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Eye color={V4.copper}>Take it home</Eye>
              <div className="serif" style={{
                fontSize: 18, color: V4.ink, fontWeight: 500, lineHeight: 1.15, marginTop: 4,
              }}>
                Scan to revisit at home.
              </div>
              <div style={{ fontFamily: 'DM Sans', fontSize: 11.5, color: V4.ink2, marginTop: 4, lineHeight: 1.45 }}>
                We'll send the same folio to your email when you confirm the address with your guide.
              </div>
              {mode === 'internal' && (
                <div style={{
                  marginTop: 6, fontFamily: 'JetBrains Mono', fontSize: 10, color: V4.muted,
                  letterSpacing: 0.5, wordBreak: 'break-all',
                }}>{folioUrl}</div>
              )}
            </div>
          </div>

          <div className="hearth-folio__no-print" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button onClick={onSend} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '15px 16px 15px 22px',
              background: `linear-gradient(180deg, ${V4.ember}, ${V4.copper})`,
              color: V4.cream,
              border: '1px solid rgba(0,0,0,0.25)', borderRadius: 12, cursor: 'pointer',
              fontFamily: 'DM Sans', fontWeight: 500, fontSize: 16, letterSpacing: 0.3,
              boxShadow: '0 0 0 1px rgba(232,199,131,0.30) inset, 0 14px 28px rgba(217,89,30,0.30), 0 1px 1px rgba(0,0,0,0.4)',
              minHeight: 56,
            }}>
              <span>Send my folio home</span>
              <span aria-hidden="true" style={{
                width: 34, height: 34, borderRadius: 999,
                background: 'rgba(15,9,4,0.85)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: 'inset 0 0 0 1px rgba(232,199,131,0.5)',
              }}>
                <G kind="send" size={15} color={V4.emberSpark} stroke={1.9}/>
              </span>
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <GhostBtn dark icon="heart" style={{ padding: '12px 16px', minHeight: 44 }}>
                Keep this folio
              </GhostBtn>
              <GhostBtn dark icon="print" onClick={() => window.print()}
                       style={{ padding: '12px 16px', minHeight: 44 }}>
                Print a keepsake
              </GhostBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
    </PresentationGuard>
  )
}
