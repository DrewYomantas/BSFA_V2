// V6 atoms — components introduced in the Hearth Studio V6 design direction.
// Kept in a separate file so the V5 atoms surface stays readable during the port.

import React from 'react'
import { V4 } from './tokens.js'
import { G, Eye, Swatch, BrassCorner, EtchedPlate, SpecimenCard, SpecimenTag } from './atoms.jsx'
import { useAppMode } from './AppModeContext.jsx'
import { productionImageFor, findMissingProductionAssets } from './assets.js'

// ── AssetSlot ────────────────────────────────────────────────────────────
// The single seam between a real production asset and the specimen fallback.
// Wrap every customer-facing visual in this:
//   <AssetSlot kind="stone" id="cliffstone" alt="Cliffstone macro">
//     {/* specimen fallback rendered when no production image exists */}
//     <Swatch id="cliffstone" w={120} h={120}/>
//   </AssetSlot>
//
// Routing:
//   - production image exists  → render <img>
//   - customer / internal mode → render children (specimen)
//   - presentation mode        → render an internal-only refusal sentinel
//     (PresentationGuard at the screen root should have blocked us earlier;
//     this is belt-and-braces so a missing asset can never leak as polished).
export function AssetSlot({ kind, id, alt = '', children, className, style }) {
  const mode = useAppMode()
  const url = productionImageFor(kind, id)
  if (url) {
    return (
      <img src={url} alt={alt} className={className}
           style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', ...style }}/>
    )
  }
  if (mode === 'presentation') {
    if (typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn(`[AssetSlot] missing required asset for presentation mode: ${kind}/${id}`)
    }
    return (
      <div role="img" aria-label={`Missing asset ${kind}/${id}`} style={{
        width: '100%', height: '100%', background: '#000',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: V4.brassLo, fontFamily: 'JetBrains Mono', fontSize: 11, letterSpacing: 1.5,
      }}>— asset missing —</div>
    )
  }
  return children
}

// ── PresentationGuard ────────────────────────────────────────────────────
// Pre-flight check used at the top of customer screens. If presentation mode
// is active and any required production asset is missing, the screen is
// replaced with an internal-only blocking notice. Nothing else renders, so a
// missing asset cannot leak inside a customer/presentation artboard.
//
// `required` is an array of { kind, id } refs. Refs whose manifest entry is
// 'production' with a real imageSrc pass; anything else (specimen, missing,
// unknown) is reported.
export function PresentationGuard({ required = [], screen = 'screen', children }) {
  const mode = useAppMode()
  if (mode !== 'presentation') return children
  const missing = findMissingProductionAssets(required)
  if (missing.length === 0) return children
  return <PresentationBlockedNotice screen={screen} missing={missing}/>
}

function PresentationBlockedNotice({ screen, missing }) {
  return (
    <div role="alert" style={{
      width: '100vw', height: '100vh', background: V4.iron, color: V4.paperInk,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48,
      fontFamily: 'DM Sans, system-ui, sans-serif',
    }}>
      <div style={{
        maxWidth: 640, padding: '32px 36px', background: 'rgba(15,10,6,0.78)',
        border: `1px solid ${V4.brass}66`, borderRadius: 12,
        boxShadow: '0 24px 60px rgba(0,0,0,0.55)',
      }}>
        <Eye color={V4.brassHi} tracking={3}>Internal · Presentation mode</Eye>
        <h2 className="serif" style={{
          margin: '10px 0 6px', color: V4.cream, fontSize: 32, fontWeight: 500, letterSpacing: -0.2,
        }}>
          Presentation assets incomplete.
        </h2>
        <p style={{ margin: '8px 0 16px', color: V4.paperMuted, fontSize: 14, lineHeight: 1.55 }}>
          The {screen} screen is missing production-grade visuals. Presentation
          mode refuses to render with specimen fallbacks. Drop the assets into
          the manifest, or use the customer/internal mode for review.
        </p>
        <div style={{
          padding: '12px 14px', background: 'rgba(8,5,3,0.5)',
          border: `1px solid ${V4.paperLine}`, borderRadius: 8,
        }}>
          <Eye color={V4.brassHi} tracking={2}>Missing</Eye>
          <ul style={{
            margin: '8px 0 0', padding: 0, listStyle: 'none',
            fontFamily: 'JetBrains Mono, ui-monospace, monospace',
            fontSize: 12, color: V4.cream, lineHeight: 1.8,
          }}>
            {missing.map((m) => <li key={m}>· {m}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}

// ── GuideAttribution — quiet "Your guide today · Drew" pill ──────────────
export function GuideAttribution({ guide, dark = true }) {
  const name = guide?.name || 'Drew Hendrickson'
  const initial = name.charAt(0).toUpperCase()
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '6px 12px 6px 7px',
      background: dark ? 'rgba(246,235,210,0.06)' : 'rgba(46,31,19,0.05)',
      border: `1px solid ${dark ? V4.paperLine : V4.line}`,
      borderRadius: 999,
    }}>
      <span aria-hidden="true" style={{
        width: 22, height: 22, borderRadius: 999,
        background: dark ? V4.walnutHi : V4.parchment,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Cormorant Garamond, Georgia, serif', fontStyle: 'italic',
        color: V4.brass, fontSize: 13, fontWeight: 600,
      }}>{initial}</span>
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <span style={{
          fontFamily: 'DM Sans', fontSize: 10, color: dark ? V4.paperMuted : V4.muted,
          letterSpacing: 1.6, textTransform: 'uppercase', fontWeight: 600,
        }}>Your guide</span>
        <span className="serif" style={{
          fontSize: 13, color: dark ? V4.cream : V4.ink, marginTop: 3, fontWeight: 500,
        }}>{name}</span>
      </span>
    </div>
  )
}

// ── ProjectName — display-only; falls back to "Today's design" ───────────
export function ProjectName({ name, fallback = "Today's design", dark = true }) {
  const color = dark ? V4.cream : V4.ink
  return (
    <span className="serif" style={{ fontSize: 17, color, fontWeight: 500, letterSpacing: 0.2 }}>
      {name || (
        <em className="serif-it" style={{ color: dark ? V4.paperMuted : V4.muted }}>{fallback}</em>
      )}
    </span>
  )
}

// ── NowChoosingPill — bottom-center floating prompt over the stage ───────
export function NowChoosingPill({ step, hint, onTap }) {
  return (
    <button onClick={onTap} style={{
      display: 'inline-flex', alignItems: 'center', gap: 14,
      padding: '12px 20px 12px 14px',
      background: 'rgba(15,10,6,0.62)', backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      border: `1px solid ${V4.brass}66`,
      borderRadius: 999, cursor: 'pointer',
      boxShadow: '0 12px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)',
    }}>
      <span aria-hidden="true" className="brass-shimmer" style={{
        width: 30, height: 30, borderRadius: 999, background: V4.brass,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: V4.walnut, flexShrink: 0,
      }}>
        <G kind="arrow" size={14} stroke={2}/>
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1 }}>
        <span style={{
          fontFamily: 'DM Sans', fontSize: 10.5, fontWeight: 600,
          letterSpacing: 1.8, textTransform: 'uppercase', color: V4.brassHi,
        }}>Now choosing</span>
        <span className="serif" style={{ fontSize: 18, color: V4.cream, fontWeight: 500, marginTop: 5 }}>
          {step}
        </span>
      </span>
      {hint && (
        <span className="serif-it" style={{
          fontSize: 14, color: V4.paperMuted, marginLeft: 4, fontWeight: 500,
        }}>· {hint}</span>
      )}
    </button>
  )
}

// ── DesignStackBadge — bottom-right; collapsed pill / expanded column ────
export function DesignStackBadge({ decidedCount, total, expanded, onToggle, children }) {
  return (
    <div style={{ position: 'relative' }}>
      {!expanded && (
        <button onClick={onToggle} aria-expanded={false} style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          padding: '12px 18px 12px 14px',
          background: 'rgba(15,10,6,0.62)', backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: `1px solid rgba(232,199,131,0.30)`,
          borderRadius: 999, cursor: 'pointer',
          boxShadow: '0 10px 28px rgba(0,0,0,0.45)',
        }}>
          <span aria-hidden="true" style={{ display: 'inline-flex', gap: 3 }}>
            {Array.from({ length: total }).map((_, i) => (
              <span key={i} style={{
                width: 12, height: 4, borderRadius: 2,
                background: i < decidedCount ? V4.ember : 'rgba(246,235,210,0.18)',
                boxShadow: i < decidedCount ? '0 0 6px rgba(217,89,30,0.5)' : 'none',
              }}/>
            ))}
          </span>
          <span style={{
            fontFamily: 'DM Sans', fontSize: 12, color: V4.cream, fontWeight: 500,
            letterSpacing: 0.3,
          }}>
            Your hearth so far · {decidedCount}/{total}
          </span>
          <span aria-hidden="true" style={{ color: V4.paperMuted, display: 'inline-flex' }}>
            <G kind="arrow" size={12} stroke={1.7}/>
          </span>
        </button>
      )}
      {expanded && (
        <div style={{
          width: 320, padding: 18,
          background: 'rgba(15,10,6,0.82)', backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: `1px solid rgba(232,199,131,0.30)`,
          borderRadius: 14,
          boxShadow: '0 18px 50px rgba(0,0,0,0.55)',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10,
          }}>
            <Eye color={V4.brassHi}>Your hearth so far</Eye>
            <button onClick={onToggle} aria-expanded={true} style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: V4.paperMuted, padding: 0, display: 'inline-flex',
              transform: 'rotate(90deg)',
            }}>
              <G kind="arrow" size={14}/>
            </button>
          </div>
          {children}
        </div>
      )}
    </div>
  )
}

// ── MaterialTray — bottom-anchored drawer; slides up from below the stage
export function MaterialTray({ open, stepLabel, hint, options, selectedId, onSelect, onDismiss, renderOption }) {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      transform: open ? 'translateY(0)' : 'translateY(112%)',
      transition: 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)',
      zIndex: 30, pointerEvents: open ? 'auto' : 'none',
    }}>
      <div style={{
        margin: '0 24px 24px', padding: '18px 22px 22px',
        background: 'rgba(15,10,6,0.84)', backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid rgba(232,199,131,0.30)`,
        borderRadius: 16,
        boxShadow: '0 -2px 4px rgba(0,0,0,0.20), 0 22px 60px rgba(0,0,0,0.55)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span aria-hidden="true" style={{
              height: 4, width: 36, borderRadius: 2, background: 'rgba(246,235,210,0.22)',
            }}/>
            <Eye color={V4.brassHi}>Choosing · {stepLabel}</Eye>
            {hint && (
              <span className="serif-it" style={{
                fontSize: 14, color: V4.paperMuted, fontWeight: 500,
              }}>{hint}</span>
            )}
          </div>
          <button onClick={onDismiss} style={{
            background: 'transparent', border: '1px solid rgba(246,235,210,0.18)',
            color: V4.paperMuted, borderRadius: 999, padding: '6px 14px',
            fontFamily: 'DM Sans', fontSize: 11, fontWeight: 500,
            letterSpacing: 0.5, cursor: 'pointer',
          }}>Close</button>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: options.length === 1 ? '1fr'
                              : options.length === 2 ? '1fr 1fr'
                              : options.length === 3 ? '1fr 1fr 1fr'
                              : 'repeat(4, 1fr)',
          gap: 12,
        }}>
          {options.map((o) => renderOption(o, selectedId === o.id, () => onSelect(o.id)))}
        </div>
      </div>
    </div>
  )
}
