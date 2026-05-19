// Build (V6) — stage-first console.
//
//   • 56px top bar: brand, project name, step counter (left/center), guide, CTA-when-done (right)
//   • Full-bleed fireplace stage under the bar
//   • NowChoosingPill floats bottom-center on the stage; tapping opens MaterialTray
//   • MaterialTray is a bottom drawer; closed by default; opens for the focused step
//   • DesignStackBadge bottom-right; collapsed by default; expands into a column
//   • "See your hearth" CTA appears top-right ONLY when all 6 are chosen
//   • No 3-column grid, no Compare/Fit-to-wall ghost buttons, no disabled CTA placeholder

import React, { Suspense, lazy, useState, useMemo } from 'react'
import { V4 } from './tokens.js'
import {
  G, Eye, MonogramV4, Swatch, AssetCard, SpecimenCard, SpecimenTag, EtchedPlate,
} from './atoms.jsx'
import { useAppMode } from './AppModeContext.jsx'
import { getAsset, assetIdFor } from './assets.js'
import {
  AssetSlot, GuideAttribution, ProjectName, DesignStackBadge, MaterialTray,
  PresentationGuard,
} from './v6Atoms.jsx'
import {
  projectTypes, fireExperiences, stones, mantels, hearths, lightingMoods, findOption,
} from '../../../lib/buildOptions.js'

const CustomerHearthBuild3D = lazy(() => import('../../../components/build3d/CustomerHearthBuild3D.jsx'))

const STEP_ORDER = ['projectType', 'fireExperience', 'stoneId', 'mantelId', 'hearthId', 'lightingMoodId']
const STEP_META = {
  projectType:    { label: 'the project', short: 'Project', hint: 'Where shall we begin?',     options: projectTypes,    kind: 'text'     },
  fireExperience: { label: 'the flame',   short: 'Fire',    hint: 'Real fire, or on-demand?',  options: fireExperiences, kind: 'text'     },
  stoneId:        { label: 'the stone',   short: 'Stone',   hint: 'Choose your surround.',     options: stones,          kind: 'material', assetPrefix: 'stone'  },
  mantelId:       { label: 'the mantel',  short: 'Mantel',  hint: 'Choose your beam.',         options: mantels,         kind: 'material', assetPrefix: 'mantel' },
  hearthId:       { label: 'the hearth',  short: 'Hearth',  hint: 'Choose the base slab.',     options: hearths,         kind: 'material', assetPrefix: 'hearth' },
  lightingMoodId: { label: 'the light',   short: 'Light',   hint: 'How will the room read?',   options: lightingMoods,   kind: 'mood',     assetPrefix: 'lighting' },
}

// V6 stage requires production renders for every snapTier × mood — for the
// presentation guard we declare the two base hero renders.
const REQUIRED_PRESENTATION_ASSETS = [
  { kind: 'stage', id: 'warmEvening' },
  { kind: 'stage', id: 'cleanDaylight' },
]

export default function BuildV5({ build, customer = {}, project = {}, guide, onSelect, onContinue }) {
  const mode = useAppMode()
  const sel = build
  const decidedCount = STEP_ORDER.filter((s) => !!sel[s]).length
  const allDone = decidedCount === STEP_ORDER.length

  // Auto-derive the next focus step.
  const focusStep = useMemo(() => {
    for (const k of STEP_ORDER) { if (!sel[k]) return k }
    return null
  }, [sel.projectType, sel.fireExperience, sel.stoneId, sel.mantelId, sel.hearthId, sel.lightingMoodId])

  const [trayKey, setTrayKey]   = useState(null)
  const [stackOpen, setStackOpen] = useState(false)

  const openTray = (key) => { setStackOpen(false); setTrayKey(key) }
  const dismissTray = () => setTrayKey(null)
  const handleSelect = (key) => (id) => {
    onSelect(key, id)
    // Hold briefly so the customer sees their choice land on the stage.
    setTimeout(() => setTrayKey(null), 600)
  }

  const stepIndex = focusStep ? STEP_ORDER.indexOf(focusStep) + 1 : STEP_ORDER.length

  return (
    <PresentationGuard required={REQUIRED_PRESENTATION_ASSETS} screen="Build">
      <div style={{
        width: '100vw', height: '100vh', background: V4.iron, color: V4.paperInk,
        display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden',
      }}>
        {/* ── 56px TOP BAR ────────────────────────────── */}
        <header style={{
          position: 'relative', zIndex: 20, height: 56, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 28px',
          background: 'linear-gradient(180deg, rgba(8,5,3,0.95), rgba(8,5,3,0.78))',
          borderBottom: '1px solid rgba(232,199,131,0.16)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
            <MonogramV4 size={30} color={V4.brass}/>
            <span className="serif" style={{
              fontSize: 17, color: V4.cream, fontWeight: 500, letterSpacing: 0.3,
            }}>Benson Stone</span>
            <span aria-hidden="true" style={{ width: 1, height: 20, background: 'rgba(232,199,131,0.20)' }}/>
            <ProjectName name={project?.name} fallback="Today's design"/>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {!allDone && (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '5px 12px',
                background: 'rgba(232,199,131,0.08)',
                border: '1px solid rgba(232,199,131,0.24)',
                borderRadius: 999,
              }}>
                <span aria-hidden="true" style={{ display: 'inline-flex', gap: 3 }}>
                  {STEP_ORDER.map((k) => (
                    <span key={k} style={{
                      width: 12, height: 4, borderRadius: 2,
                      background: sel[k] ? V4.ember : 'rgba(246,235,210,0.18)',
                      boxShadow: sel[k] ? '0 0 6px rgba(217,89,30,0.5)' : 'none',
                    }}/>
                  ))}
                </span>
                <span style={{
                  fontFamily: 'DM Sans', fontSize: 11, color: V4.paperMuted, fontWeight: 600,
                  letterSpacing: 1.4, textTransform: 'uppercase',
                }}>Step {stepIndex} of 6</span>
              </div>
            )}

            <GuideAttribution guide={guide} dark/>

            {allDone && (
              <button onClick={onContinue} style={{
                display: 'inline-flex', alignItems: 'center', gap: 12,
                padding: '8px 12px 8px 18px',
                background: `linear-gradient(180deg, ${V4.ember}, ${V4.copper})`,
                color: V4.cream,
                border: '1px solid rgba(0,0,0,0.25)', borderRadius: 999, cursor: 'pointer',
                fontFamily: 'DM Sans', fontWeight: 500, fontSize: 13.5, letterSpacing: 0.3,
                boxShadow: '0 0 0 1px rgba(232,199,131,0.30) inset, 0 8px 20px rgba(217,89,30,0.35)',
              }}>
                <span>See your hearth</span>
                <span aria-hidden="true" style={{
                  width: 26, height: 26, borderRadius: 999,
                  background: 'rgba(15,9,4,0.85)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: 'inset 0 0 0 1px rgba(232,199,131,0.5)',
                }}>
                  <G kind="arrow" size={13} color={V4.emberSpark} stroke={1.9}/>
                </span>
              </button>
            )}
          </div>
        </header>

        {/* ── STAGE (full-bleed under top bar) ────────── */}
        <div style={{
          position: 'relative', flex: 1, minHeight: 0, overflow: 'hidden', background: '#000',
        }}>
          <Suspense fallback={<HearthBuildLoading />}>
            <CustomerHearthBuild3D
              build={sel}
              focusStep={focusStep}
              onOpenMaterialTray={openTray}
            />
          </Suspense>
          {/* All-done celebration pill */}
          {allDone && !trayKey && (
            <div style={{
              position: 'absolute', left: 0, right: 0, bottom: 110,
              display: 'flex', justifyContent: 'center', zIndex: 25,
            }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 14,
                padding: '12px 22px 12px 16px',
                background: 'rgba(15,10,6,0.62)', backdropFilter: 'blur(10px)',
                border: `1px solid rgba(232,199,131,0.40)`,
                borderRadius: 999,
                boxShadow: '0 12px 32px rgba(0,0,0,0.45)',
              }}>
                <span aria-hidden="true" style={{
                  width: 26, height: 26, borderRadius: 999,
                  background: V4.brass, color: V4.walnut,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <G kind="check" size={14} stroke={2.4}/>
                </span>
                <span className="serif-it" style={{ fontSize: 18, color: V4.cream, fontWeight: 500 }}>
                  Your hearth is ready to take home.
                </span>
              </div>
            </div>
          )}

          {/* DesignStackBadge — bottom right */}
          <div style={{ position: 'absolute', right: 24, bottom: 24, zIndex: 26 }}>
            <DesignStackBadge
              decidedCount={decidedCount} total={6}
              expanded={stackOpen}
              onToggle={() => setStackOpen((s) => !s)}>
              <StackContent sel={sel} onJump={(k) => { setStackOpen(false); openTray(k) }}/>
              <div style={{ marginTop: 12 }}>
                <EtchedPlate dark>
                  <span style={{ color: V4.brassHi, flexShrink: 0 }}>
                    <G kind="note" size={12} stroke={1.7}/>
                  </span>
                  Final selections confirmed with you in person.
                </EtchedPlate>
              </div>
            </DesignStackBadge>
          </div>

          {/* MaterialTray — slides up from bottom */}
          {trayKey && (
            <MaterialTray
              open={!!trayKey}
              stepLabel={STEP_META[trayKey].label}
              hint={STEP_META[trayKey].hint}
              options={STEP_META[trayKey].options}
              selectedId={sel[trayKey]}
              onSelect={handleSelect(trayKey)}
              onDismiss={dismissTray}
              renderOption={(o, selected, onSelectOne) => {
                const meta = STEP_META[trayKey]
                if (meta.kind === 'text') {
                  return (
                    <TextOptionCard key={o.id} option={o} selected={selected} onSelect={onSelectOne}/>
                  )
                }
                if (meta.kind === 'mood') {
                  return (
                    <SpecimenCard key={o.id} id={o.id} code={o.code}
                                  title={o.label} sub={o.note} glyph={o.glyph}
                                  height={120} selected={selected} onSelect={onSelectOne}/>
                  )
                }
                const aid = assetIdFor(meta.assetPrefix, o.id)
                const asset = getAsset(aid) || { id: aid, label: o.label, assetStatus: 'specimen', sampleCode: o.code }
                // Wrap each card in an AssetSlot to keep the seam consistent.
                return (
                  <div key={o.id}>
                    <AssetSlot kind={meta.assetPrefix} id={o.id} alt={o.label}>
                      <AssetCard asset={asset}
                                 title={o.label} sub={o.origin}
                                 height={120} selected={selected} onSelect={onSelectOne}/>
                    </AssetSlot>
                  </div>
                )
              }}/>
          )}

          {/* Dim backdrop when tray is open */}
          {trayKey && (
            <div onClick={dismissTray} aria-hidden="true" style={{
              position: 'absolute', inset: 0, zIndex: 25,
              background: 'rgba(8,5,3,0.32)',
              transition: 'opacity 220ms ease',
            }}/>
          )}
        </div>

        {/* Internal-mode indicator */}
        {mode === 'internal' && (
          <div style={{ position: 'absolute', top: 64, left: 24, zIndex: 50 }}>
            <SpecimenTag code="MODE · INTERNAL"/>
          </div>
        )}
      </div>
    </PresentationGuard>
  )
}

function HearthBuildLoading() {
  return (
    <div className="build3d-loading" role="status" aria-live="polite">
      <div className="build3d-loading__sketch" aria-hidden="true">
        <span />
      </div>
      <div>
        <p>Build Your Fireplace / Room</p>
        <h1>Preparing the 3D room view.</h1>
        <span>A simple planning view is loading so you can judge hearth size in the room.</span>
      </div>
    </div>
  )
}

// ── A text-only option card (Project type & Fire experience) ────────────
function TextOptionCard({ option, selected, onSelect }) {
  return (
    <button onClick={onSelect} aria-pressed={selected} style={{
      width: '100%', height: 108,
      display: 'flex', alignItems: 'center', textAlign: 'left',
      padding: '14px 16px', gap: 14,
      background: V4.walnut,
      border: `1px solid ${selected ? V4.brass : 'rgba(246,235,210,0.08)'}`,
      borderRadius: 8, cursor: 'pointer',
      transition: 'all 160ms cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: selected
        ? '0 0 0 1px rgba(232,199,131,0.40) inset, 0 14px 30px rgba(217,89,30,0.28), 0 1px 2px rgba(0,0,0,0.45)'
        : '0 6px 18px rgba(0,0,0,0.40), 0 1px 1px rgba(0,0,0,0.4)',
      transform: selected ? 'translateY(-1px)' : 'translateY(0)',
      boxSizing: 'border-box',
    }}>
      <span aria-hidden="true" style={{
        width: 44, height: 44, borderRadius: 10, flexShrink: 0,
        background: selected ? V4.ember : 'rgba(246,235,210,0.06)',
        border: `1px solid ${selected ? 'rgba(0,0,0,0.20)' : 'rgba(246,235,210,0.12)'}`,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: selected ? V4.cream : V4.brassHi,
      }}>
        <G kind={option.glyph} size={20} stroke={1.6}/>
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="serif" style={{
          fontSize: 18, color: selected ? V4.brassHi : V4.cream, fontWeight: 500, lineHeight: 1.1,
        }}>{option.label}</div>
        <div style={{
          fontFamily: 'DM Sans', fontSize: 12, color: V4.paperMuted,
          marginTop: 4, lineHeight: 1.35,
        }}>{option.hint}</div>
      </div>
      {selected && (
        <span aria-hidden="true" style={{
          width: 22, height: 22, borderRadius: 999, background: V4.ember,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <G kind="check" size={12} color={V4.cream} stroke={2.4}/>
        </span>
      )}
    </button>
  )
}

// ── Stack expanded content ──────────────────────────────────────────────
function StackContent({ sel, onJump }) {
  const proj   = findOption(projectTypes,    sel.projectType)
  const fire   = findOption(fireExperiences, sel.fireExperience)
  const stone  = findOption(stones,          sel.stoneId)
  const mantel = findOption(mantels,         sel.mantelId)
  const hearth = findOption(hearths,         sel.hearthId)
  const light  = findOption(lightingMoods,   sel.lightingMoodId)

  const rows = [
    { key: 'projectType',    eyebrow: 'Project', swatchId: null,           glyph: proj?.glyph || 'home',  label: proj?.label,   code: proj?.code },
    { key: 'fireExperience', eyebrow: 'Fire',    swatchId: null,           glyph: 'flame',                label: fire?.label,   code: fire?.code },
    { key: 'stoneId',        eyebrow: 'Stone',   swatchId: sel.stoneId,                                   label: stone?.label,  code: stone?.code },
    { key: 'mantelId',       eyebrow: 'Mantel',  swatchId: sel.mantelId,                                  label: mantel?.label, code: mantel?.code },
    { key: 'hearthId',       eyebrow: 'Hearth',  swatchId: sel.hearthId,                                  label: hearth?.label, code: hearth?.code },
    { key: 'lightingMoodId', eyebrow: 'Light',   swatchId: sel.lightingMoodId,                            label: light?.label,  code: light?.code },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {rows.map((r, i) => {
        const decided = !!r.label
        return (
          <button key={r.key} onClick={() => onJump(r.key)} style={{
            display: 'grid', gridTemplateColumns: '36px 1fr auto',
            gap: 12, alignItems: 'center', textAlign: 'left',
            padding: '10px 0',
            borderBottom: i < rows.length - 1 ? '1px solid rgba(232,199,131,0.10)' : 'none',
            background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit',
          }}>
            {r.swatchId
              ? <Swatch id={r.swatchId} w={36} h={36} radius={6}/>
              : <span style={{
                  width: 36, height: 36, borderRadius: 6,
                  background: decided ? 'rgba(232,199,131,0.12)' : 'rgba(246,235,210,0.04)',
                  border: `1px solid ${decided ? 'rgba(232,199,131,0.30)' : 'rgba(246,235,210,0.08)'}`,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  color: decided ? V4.brassHi : V4.paperMuted, flexShrink: 0,
                }}>
                  <G kind={r.glyph} size={15} stroke={1.6}/>
                </span>
            }
            <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <Eye color={decided ? V4.brassHi : V4.paperMuted} style={{ marginBottom: 0 }}>
                {r.eyebrow}
              </Eye>
              {decided ? (
                <span className="serif" style={{
                  fontSize: 15, color: V4.cream, lineHeight: 1.1, fontWeight: 500, marginTop: 2,
                }}>{r.label}</span>
              ) : (
                <span className="serif-it" style={{
                  fontSize: 13, color: V4.paperMuted, lineHeight: 1.1, fontWeight: 400, marginTop: 2,
                }}>— to choose —</span>
              )}
            </div>
            {decided
              ? <span aria-hidden="true" style={{ color: V4.brassHi }}><G kind="check-c" size={15} stroke={1.6}/></span>
              : <G kind="arrow" size={13} color={V4.paperMuted} stroke={1.6}/>}
          </button>
        )
      })}
    </div>
  )
}
