import React from 'react'
import { V4 } from './tokens.js'

export function MonogramV4({ size = 40, color = V4.brass, ring = true, ink = V4.cream }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{ display: 'block' }}>
      <defs>
        <radialGradient id={`mg${size}`} cx="35%" cy="30%" r="80%">
          <stop offset="0%"  stopColor={V4.brassHi}/>
          <stop offset="60%" stopColor={color}/>
          <stop offset="100%" stopColor={V4.brassLo}/>
        </radialGradient>
      </defs>
      {ring && (
        <>
          <circle cx="20" cy="20" r="19" fill="none" stroke={`url(#mg${size})`} strokeWidth="1.2"/>
          <circle cx="20" cy="20" r="16" fill="none" stroke={color} strokeWidth="0.5" opacity="0.55"/>
        </>
      )}
      <text x="20" y="27.5" textAnchor="middle"
            fontFamily="Cormorant Garamond, Georgia, serif"
            fontStyle="italic" fontWeight="500" fontSize="22"
            fill={ring ? `url(#mg${size})` : ink}>B</text>
    </svg>
  )
}

export function G({ kind, size = 16, color = 'currentColor', stroke = 1.6 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (kind) {
    case 'wifi':    return <svg {...p}><path d="M5 12.5a10 10 0 0114 0M8 15.5a6 6 0 018 0M11 18.5a2 2 0 012 0"/></svg>
    case 'battery': return <svg {...p}><rect x="2" y="8" width="18" height="8" rx="1.5"/><path d="M21 11v2"/><rect x="4" y="10" width="11" height="4" fill={color} stroke="none"/></svg>
    case 'flame':   return <svg {...p}><path d="M12 3c1 3 4 4 4 8a4 4 0 11-8 0c0-2 1-3 2-4-1 4 3 4 2-4z"/></svg>
    case 'stone':   return <svg {...p}><path d="M4 16c0-3 3-5 4-7 1-2 4-3 6-1s4 3 5 5-1 6-6 6-9-1-9-3z"/></svg>
    case 'mantel':  return <svg {...p}><rect x="3" y="9" width="18" height="3" rx="0.5"/><path d="M5 12v7M19 12v7"/></svg>
    case 'hearth':  return <svg {...p}><rect x="3" y="14" width="18" height="4" rx="0.5"/><path d="M3 18l1 2M21 18l-1 2"/></svg>
    case 'light':   return <svg {...p}><circle cx="12" cy="11" r="4"/><path d="M12 3v2M3 11h2M19 11h2M5 5l1.5 1.5M19 5l-1.5 1.5M9 19h6"/></svg>
    case 'home':    return <svg {...p}><path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-4v-7h-8v7H4a1 1 0 01-1-1z"/></svg>
    case 'arrow':   return <svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    case 'check':   return <svg {...p}><path d="M5 12.5l4 4 10-10"/></svg>
    case 'check-c': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/></svg>
    case 'sun':     return <svg {...p}><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.5 5.5l1.5 1.5M17 17l1.5 1.5M5.5 18.5L7 17M17 7l1.5-1.5"/></svg>
    case 'moon':    return <svg {...p}><path d="M19 14a7 7 0 11-9-9 6 6 0 009 9z"/></svg>
    case 'pencil':  return <svg {...p}><path d="M4 20l4-1 11-11-3-3L5 16l-1 4z"/></svg>
    case 'note':    return <svg {...p}><path d="M5 4h10l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1z"/><path d="M14 4v5h5"/></svg>
    case 'sparkle': return <svg {...p}><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z"/></svg>
    case 'ruler':   return <svg {...p}><rect x="3" y="9" width="18" height="6" rx="1"/><path d="M7 9v3M11 9v4M15 9v3M19 9v4"/></svg>
    case 'calendar':return <svg {...p}><rect x="4" y="5" width="16" height="15" rx="1.5"/><path d="M4 10h16M8 3v4M16 3v4"/></svg>
    case 'truck':   return <svg {...p}><rect x="2" y="8" width="11" height="8" rx="1"/><path d="M13 10h5l3 3v3h-8M6 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z"/></svg>
    case 'compass': return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M15 9l-2 5-5 2 2-5 5-2z"/></svg>
    case 'shrink':  return <svg {...p}><path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/></svg>
    case 'compare': return <svg {...p}><rect x="3" y="5" width="8" height="14" rx="1"/><rect x="13" y="5" width="8" height="14" rx="1" fill={color} fillOpacity="0.15"/></svg>
    case 'play':    return <svg {...p}><path d="M7 4l13 8-13 8V4z" fill={color}/></svg>
    case 'pause':   return <svg {...p}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
    case 'send':    return <svg {...p}><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
    case 'print':   return <svg {...p}><path d="M7 9V3h10v6M7 18H4v-7a2 2 0 012-2h12a2 2 0 012 2v7h-3M7 14h10v7H7z"/></svg>
    case 'heart':   return <svg {...p}><path d="M12 21s-7-5-7-11a4 4 0 017-2 4 4 0 017 2c0 6-7 11-7 11z"/></svg>
    default:        return <span/>
  }
}

export function Eye({ children, color = V4.muted, size = 11, tracking = 2.4, style, weight = 600 }) {
  return (
    <div style={{
      fontFamily: 'DM Sans', fontSize: size, fontWeight: weight, color,
      letterSpacing: tracking, textTransform: 'uppercase', ...style,
    }}>{children}</div>
  )
}

export function BrassCorner({ size = 16, color = V4.brass, corner = 'tl' }) {
  const rot = { tl: 0, tr: 90, br: 180, bl: 270 }[corner] || 0
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={{
      transform: `rotate(${rot}deg)`, display: 'block',
    }}>
      <defs>
        <linearGradient id={`bc${corner}${size}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={V4.brassHi}/>
          <stop offset="55%" stopColor={color}/>
          <stop offset="100%" stopColor={V4.brassLo}/>
        </linearGradient>
      </defs>
      <path d="M1 1 L9 1 L9 3 L3 3 L3 9 L1 9 Z" fill={`url(#bc${corner}${size})`}/>
      <circle cx="2" cy="2" r="0.7" fill={V4.walnutLo}/>
    </svg>
  )
}

export function StepRail({ current, dark = false }) {
  const steps = ['Welcome', 'Build', 'Your hearth']
  const ink   = dark ? V4.paperInk : V4.ink
  const mute  = dark ? V4.paperMuted : V4.muted
  const line  = dark ? V4.paperLine : V4.line
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 0,
      fontFamily: 'DM Sans', fontSize: 11.5, letterSpacing: 1.8,
      textTransform: 'uppercase', fontWeight: 600,
    }}>
      {steps.map((s, i) => {
        const active = current === s
        const done = steps.indexOf(current) > i
        return (
          <React.Fragment key={s}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                width: 22, height: 22, borderRadius: 999,
                border: `1px solid ${active ? V4.brass : done ? mute : line}`,
                background: active ? V4.brass : done ? mute : 'transparent',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: active ? V4.walnut : done ? (dark ? V4.walnut : V4.cream) : mute,
                fontFamily: 'Cormorant Garamond', fontStyle: 'italic',
                fontSize: 14, fontWeight: 600, paddingTop: 1,
              }}>{done ? <G kind="check" size={11} stroke={2.4}/> : (i+1)}</span>
              <span style={{ color: active ? ink : mute }}>{s}</span>
            </span>
            {i < steps.length - 1 && (
              <span style={{
                width: 26, height: 1,
                background: done ? mute : line,
                margin: '0 14px',
              }}/>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export function HeaderV4({ current, dark = false, transparent = false }) {
  const ink  = dark ? V4.paperInk : V4.walnut
  const mute = dark ? V4.paperMuted : V4.muted
  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 36px', position: 'relative', zIndex: 10,
      background: transparent ? 'transparent' : (dark ? V4.iron : 'rgba(232,221,201,0.65)'),
      borderBottom: transparent ? 'none' : `1px solid ${dark ? V4.paperLine : V4.line}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <MonogramV4 size={42} color={V4.brass}/>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span className="serif" style={{
            fontSize: 22, color: ink, letterSpacing: 0.5, fontWeight: 500,
          }}>Benson Stone</span>
          <span style={{
            fontSize: 10.5, color: mute, marginTop: 5, fontWeight: 600,
            letterSpacing: 3, textTransform: 'uppercase',
          }}>Hearth Studio · est. 1971</span>
        </div>
      </div>

      {current && (
        <div style={{ color: ink }}>
          <StepRail current={current} dark={dark}/>
        </div>
      )}

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        padding: '6px 12px 6px 8px',
        background: dark ? 'rgba(246,235,210,0.06)' : 'rgba(46,31,19,0.05)',
        border: `1px solid ${dark ? V4.paperLine : V4.line}`,
        borderRadius: 999,
      }}>
        <span style={{
          width: 22, height: 22, borderRadius: 999,
          background: dark ? V4.walnutHi : V4.parchment,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Cormorant Garamond', fontStyle: 'italic',
          color: V4.brass, fontSize: 13, fontWeight: 600,
        }}>D</span>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{ fontFamily: 'DM Sans', fontSize: 10, color: mute,
            letterSpacing: 1.6, textTransform: 'uppercase', fontWeight: 600 }}>
            Your guide
          </span>
          <span className="serif" style={{ fontSize: 14, color: ink, marginTop: 3, fontWeight: 500 }}>
            Drew Hendrickson
          </span>
        </div>
      </div>
    </header>
  )
}

export function CTA({ children, size = 'lg', icon = 'arrow', accent = V4.ember, fg = V4.cream, bg = V4.walnut, onClick, style }) {
  const big = size === 'lg'
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: big ? 16 : 12,
      padding: big ? '17px 18px 17px 32px' : '11px 14px 11px 20px',
      background: bg, color: fg,
      border: 'none', borderRadius: 999, cursor: 'pointer',
      fontFamily: 'DM Sans', fontWeight: 500,
      fontSize: big ? 17 : 14, letterSpacing: 0.2,
      boxShadow: '0 1px 1px rgba(0,0,0,0.25), 0 16px 36px rgba(14,9,5,0.30)',
      ...style,
    }}>
      <span>{children}</span>
      <span style={{
        width: big ? 38 : 28, height: big ? 38 : 28, borderRadius: 999,
        background: accent, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 0 0 1px rgba(0,0,0,0.15) inset, 0 0 ${big ? 22 : 12}px ${accent}55`,
      }}>
        <G kind={icon} size={big ? 18 : 14} color="#fff" stroke={1.9}/>
      </span>
    </button>
  )
}

export function GhostBtn({ children, dark = false, icon, onClick, style }) {
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '11px 18px',
      background: dark ? 'rgba(246,235,210,0.04)' : 'transparent',
      color: dark ? V4.paperInk : V4.ink,
      border: `1px solid ${dark ? V4.paperLine : V4.line}`,
      borderRadius: 999, cursor: 'pointer',
      fontFamily: 'DM Sans', fontWeight: 500, fontSize: 13, letterSpacing: 0.2,
      ...style,
    }}>
      {icon && <G kind={icon} size={14} stroke={1.6}/>}
      {children}
    </button>
  )
}

export function Swatch({ id, w = 88, h = 88, radius = 8, hi = false }) {
  const themes = {
    cliffstone:    { base: '#6B5A47', dark: '#3A2E22', light: '#9C8870', pattern: 'ledger' },
    fieldledge:    { base: '#83725E', dark: '#4D4031', light: '#AD9C80', pattern: 'rough' },
    rusticOak:     { base: '#6C4622', dark: '#3D2613', light: '#9C6E40', pattern: 'wood' },
    paintedWhite:  { base: '#EAE0CD', dark: '#BFB39A', light: '#F6EFE0', pattern: 'wood' },
    bluestone:     { base: '#3F4A5A', dark: '#252B36', light: '#5E6A7C', pattern: 'slab' },
    warmEvening:   { base: '#321B0C', dark: '#0F0805', light: V4.emberHot, pattern: 'glow-warm' },
    cleanDaylight: { base: '#D5CBB5', dark: '#9F947D', light: '#F4EBD5', pattern: 'glow-cool' },
  }
  const t = themes[id] || { base: '#83725E', dark: '#4D4031', light: '#AD9C80', pattern: 'rough' }
  const uid = React.useId()
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      <defs>
        <clipPath id={`c${uid}`}><rect x="0" y="0" width={w} height={h} rx={radius}/></clipPath>
        {t.pattern === 'wood' && (
          <pattern id={`p${uid}`} width="14" height={h} patternUnits="userSpaceOnUse">
            <rect width="14" height={h} fill={t.base}/>
            <path d="M0 0 Q7 30 0 60 T0 120 T0 180" stroke={t.dark} strokeWidth="0.6" fill="none" opacity="0.6"/>
            <path d="M5 0 Q12 25 5 55 T5 110 T5 170" stroke={t.light} strokeWidth="0.4" fill="none" opacity="0.6"/>
            <path d="M9 0 Q3 40 9 80 T9 160" stroke={t.dark} strokeWidth="0.35" fill="none" opacity="0.4"/>
          </pattern>
        )}
        {t.pattern === 'ledger' && (
          <pattern id={`p${uid}`} width="22" height="14" patternUnits="userSpaceOnUse">
            <rect width="22" height="14" fill={t.base}/>
            <rect x="0"  y="0"  width="10" height="6.5" fill={t.dark}  opacity="0.6" rx="0.6"/>
            <rect x="11" y="0"  width="11" height="6.5" fill={t.light} opacity="0.45" rx="0.6"/>
            <rect x="0"  y="7.5" width="13" height="6"  fill={t.light} opacity="0.4"  rx="0.6"/>
            <rect x="14" y="7.5" width="8"  height="6"  fill={t.dark}  opacity="0.55" rx="0.6"/>
          </pattern>
        )}
        {t.pattern === 'rough' && (
          <pattern id={`p${uid}`} width="18" height="18" patternUnits="userSpaceOnUse">
            <rect width="18" height="18" fill={t.base}/>
            <circle cx="4"  cy="4"  r="3.4" fill={t.dark}  opacity="0.5"/>
            <circle cx="13" cy="6"  r="2.6" fill={t.light} opacity="0.5"/>
            <circle cx="7"  cy="13" r="3"   fill={t.light} opacity="0.4"/>
            <circle cx="14" cy="14" r="3.2" fill={t.dark}  opacity="0.45"/>
          </pattern>
        )}
        {t.pattern === 'slab' && (
          <pattern id={`p${uid}`} width={w} height={h} patternUnits="userSpaceOnUse">
            <rect width={w} height={h} fill={t.base}/>
            <path d={`M0 ${h*0.3} Q${w*0.4} ${h*0.5} ${w} ${h*0.25}`} stroke={t.light} strokeWidth="0.6" fill="none" opacity="0.6"/>
            <path d={`M0 ${h*0.65} Q${w*0.6} ${h*0.55} ${w} ${h*0.8}`} stroke={t.dark}  strokeWidth="0.6" fill="none" opacity="0.7"/>
            <path d={`M${w*0.2} 0 Q${w*0.3} ${h*0.4} ${w*0.1} ${h}`} stroke={t.light} strokeWidth="0.5" fill="none" opacity="0.4"/>
          </pattern>
        )}
        {t.pattern === 'glow-warm' && (
          <radialGradient id={`p${uid}`} cx="50%" cy="65%" r="65%">
            <stop offset="0%"   stopColor={V4.emberSpark}/>
            <stop offset="35%"  stopColor={t.light}/>
            <stop offset="75%"  stopColor={V4.ember}/>
            <stop offset="100%" stopColor={t.dark}/>
          </radialGradient>
        )}
        {t.pattern === 'glow-cool' && (
          <radialGradient id={`p${uid}`} cx="50%" cy="40%" r="70%">
            <stop offset="0%"   stopColor="#FFFDF1"/>
            <stop offset="50%"  stopColor={t.light}/>
            <stop offset="100%" stopColor={t.base}/>
          </radialGradient>
        )}
        <radialGradient id={`vig${uid}`} cx="50%" cy="100%" r="100%">
          <stop offset="60%" stopColor="#000" stopOpacity="0"/>
          <stop offset="100%" stopColor="#000" stopOpacity="0.25"/>
        </radialGradient>
      </defs>
      <g clipPath={`url(#c${uid})`}>
        <rect width={w} height={h} fill={`url(#p${uid})`}/>
        <rect width={w} height={h} fill={`url(#vig${uid})`}/>
      </g>
      <rect x="0.5" y="0.5" width={w-1} height={h-1} rx={radius-0.5} fill="none"
            stroke={hi ? V4.brass : 'rgba(0,0,0,0.18)'} strokeWidth={hi ? 1.2 : 1}/>
    </svg>
  )
}

export function SpecimenTag({ code, color = V4.brass, dark = true, style }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 7px',
      background: dark ? 'rgba(15,10,6,0.45)' : 'rgba(238,225,194,0.7)',
      border: `1px solid ${color}55`,
      borderRadius: 3,
      fontFamily: 'JetBrains Mono', fontSize: 9.5, fontWeight: 500,
      color, letterSpacing: 1.3, ...style,
    }}>
      <svg width="6" height="6" viewBox="0 0 6 6" style={{ flexShrink: 0 }}>
        <circle cx="3" cy="3" r="2.4" fill="none" stroke={color} strokeWidth="0.6"/>
        <circle cx="3" cy="3" r="0.9" fill={color}/>
      </svg>
      {code}
    </div>
  )
}

export function SpecimenCard({
  id, code, title, sub, selected = false, onSelect,
  height = 120, dark = true, glyph,
  rightAccessory,
}) {
  const swatchSide = height - 4
  const bg = dark ? V4.walnut : V4.surfaceHi
  const mute = dark ? V4.paperMuted : V4.muted
  const accent = selected ? V4.brassHi : (dark ? V4.cream : V4.ink)
  return (
    <button onClick={onSelect} style={{
      display: 'flex', alignItems: 'stretch', textAlign: 'left',
      width: '100%', height, padding: 0,
      background: bg,
      border: `1px solid ${selected ? V4.brass : (dark ? 'rgba(246,235,210,0.08)' : V4.line)}`,
      borderRadius: 8, cursor: 'pointer', overflow: 'hidden',
      boxShadow: selected
        ? '0 0 0 1px rgba(232,199,131,0.40) inset, 0 14px 30px rgba(217,89,30,0.28), 0 1px 2px rgba(0,0,0,0.45)'
        : (dark
            ? '0 6px 18px rgba(0,0,0,0.40), 0 1px 1px rgba(0,0,0,0.4)'
            : '0 1px 1px rgba(60,42,30,0.05), 0 6px 16px rgba(60,42,30,0.10)'),
      transition: 'all 160ms cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative', boxSizing: 'border-box', flex: '0 0 auto', minWidth: 0,
      transform: selected ? 'translateY(-1px)' : 'translateY(0)',
    }}>
      <div style={{ position: 'relative', width: swatchSide, height: '100%', flexShrink: 0 }}>
        <Swatch id={id} w={swatchSide} h={height - 2} radius={0}/>
        <div style={{ position: 'absolute', top: 4, left: 4, opacity: 0.85 }}>
          <BrassCorner corner="tl" size={9}/>
        </div>
        <div style={{ position: 'absolute', bottom: 4, right: 4, opacity: 0.85 }}>
          <BrassCorner corner="br" size={9}/>
        </div>
        {selected && (
          <span style={{
            position: 'absolute', top: 6, right: 6,
            width: 20, height: 20, borderRadius: 999,
            background: V4.ember, color: V4.cream,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 3px 8px rgba(0,0,0,0.45)',
          }}>
            <G kind="check" size={11} color={V4.cream} stroke={2.4}/>
          </span>
        )}
        {code && (
          <div style={{ position: 'absolute', left: 8, bottom: 8 }}>
            <SpecimenTag code={code} dark/>
          </div>
        )}
        {glyph && (
          <span style={{
            position: 'absolute', left: 10, top: 10,
            width: 22, height: 22, borderRadius: 999,
            background: 'rgba(15,10,6,0.5)', backdropFilter: 'blur(4px)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: V4.cream, border: `1px solid rgba(232,199,131,0.45)`,
          }}>
            <G kind={glyph} size={12} stroke={1.7}/>
          </span>
        )}
      </div>
      <div style={{
        flex: 1, padding: '10px 14px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0,
        backgroundImage: dark
          ? 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.18))'
          : 'linear-gradient(180deg, rgba(255,255,255,0.4), rgba(110,73,40,0.04))',
        position: 'relative',
      }}>
        <span className="serif" style={{
          fontSize: 17, color: accent, fontWeight: 500, lineHeight: 1.1,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          letterSpacing: 0.1,
        }}>{title}</span>
        {sub && (
          <span style={{
            fontFamily: 'DM Sans', fontSize: 11, color: mute, marginTop: 3, lineHeight: 1.35,
            overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box',
            WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          }}>{sub}</span>
        )}
        {rightAccessory && (
          <span style={{ position: 'absolute', right: 12, top: '50%',
            transform: 'translateY(-50%)' }}>
            {rightAccessory}
          </span>
        )}
      </div>
    </button>
  )
}

export function EtchedPlate({ children, dark = true, style }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '8px 12px',
      background: dark ? 'rgba(232,199,131,0.06)' : 'rgba(232,199,131,0.10)',
      border: `1px solid ${dark ? 'rgba(232,199,131,0.28)' : 'rgba(180,90,42,0.30)'}`,
      borderRadius: 6,
      fontFamily: 'DM Sans', fontSize: 11, fontWeight: 500,
      color: dark ? 'rgba(246,235,210,0.75)' : V4.muted,
      letterSpacing: 0.3, lineHeight: 1.4, ...style,
    }}>
      {children}
    </div>
  )
}

export function HairlineRule({ width = 200, color = V4.brass, alpha = 0.45 }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      width, justifyContent: 'center',
    }}>
      <span style={{ flex: 1, height: 1, background: `${color}${Math.round(alpha*255).toString(16).padStart(2,'0')}` }}/>
      <svg width="10" height="10" viewBox="0 0 10 10" style={{ flexShrink: 0 }}>
        <path d="M5 0 L10 5 L5 10 L0 5 Z" fill={color} opacity={alpha + 0.15}/>
      </svg>
      <span style={{ flex: 1, height: 1, background: `${color}${Math.round(alpha*255).toString(16).padStart(2,'0')}` }}/>
    </div>
  )
}

// Brass deboss — refined monogram stamp; replaces the wax-seal look.
export function BrassEmboss({ size = 64, letter = 'B' }) {
  const uid = React.useId()
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={{ display: 'block' }}
         role="img" aria-label="Benson Stone brass mark">
      <defs>
        <radialGradient id={`bemb-face${uid}`} cx="38%" cy="32%" r="80%">
          <stop offset="0%"   stopColor={V4.brassHi}/>
          <stop offset="55%"  stopColor={V4.brass}/>
          <stop offset="100%" stopColor={V4.brassLo}/>
        </radialGradient>
        <radialGradient id={`bemb-inset${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="60%"  stopColor="rgba(0,0,0,0)"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0.45)"/>
        </radialGradient>
        <filter id={`bemb-deboss${uid}`} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.6"/>
          <feOffset dx="0" dy="0.6" result="off"/>
          <feComponentTransfer><feFuncA type="linear" slope="0.55"/></feComponentTransfer>
        </filter>
      </defs>
      <circle cx="32" cy="32" r="29" fill={`url(#bemb-face${uid})`}
              stroke={V4.brassLo} strokeWidth="0.8"/>
      <circle cx="32" cy="32" r="26" fill="none"
              stroke={V4.brassHi} strokeWidth="0.4" opacity="0.65"/>
      <circle cx="32" cy="32" r="29" fill={`url(#bemb-inset${uid})`}/>
      <text x="32" y="44" textAnchor="middle"
            fontFamily="Cormorant Garamond, Georgia, serif"
            fontStyle="italic" fontWeight="600" fontSize="32"
            fill={V4.walnutLo} opacity="0.55"
            filter={`url(#bemb-deboss${uid})`}>{letter}</text>
      <text x="32" y="43.5" textAnchor="middle"
            fontFamily="Cormorant Garamond, Georgia, serif"
            fontStyle="italic" fontWeight="600" fontSize="32"
            fill={V4.brassHi} opacity="0.85">{letter}</text>
    </svg>
  )
}

// QR placeholder — honest "scan-to-revisit" frame, not a fake scannable code.
export function QRPlaceholder({ size = 110, label = 'Scan to revisit this folio at home' }) {
  return (
    <div style={{
      display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 8,
    }}>
      <div style={{
        width: size, height: size, position: 'relative',
        background: V4.cream, border: `1px solid ${V4.line}`, borderRadius: 6,
        padding: 8, boxShadow: '0 1px 1px rgba(60,42,30,0.06)',
      }} role="img" aria-label="QR code placeholder">
        <svg width="100%" height="100%" viewBox="0 0 30 30" style={{ display: 'block' }}>
          {/* three corner finder squares */}
          {[[1,1],[22,1],[1,22]].map(([x,y],i) => (
            <g key={i}>
              <rect x={x} y={y} width="7" height="7" fill={V4.ink}/>
              <rect x={x+1} y={y+1} width="5" height="5" fill={V4.cream}/>
              <rect x={x+2} y={y+2} width="3" height="3" fill={V4.ink}/>
            </g>
          ))}
          {/* sparse modules — visually QR-like, intentionally not scannable */}
          {[[11,2],[13,3],[15,2],[17,4],[19,2],[12,5],[14,6],[16,5],[18,6],
            [10,9],[12,10],[14,9],[16,10],[18,9],[20,11],[22,12],
            [3,11],[5,12],[7,11],[9,13],[5,14],[7,15],[9,16],
            [11,13],[13,15],[15,14],[17,16],[19,15],[21,16],
            [10,18],[12,19],[14,18],[16,20],[18,19],[20,20],[22,18],[24,21],
            [11,22],[13,24],[15,23],[17,25],[19,24],[21,25],[23,24],[25,23],
          ].map(([x,y],i) => (
            <rect key={i} x={x} y={y} width="1.6" height="1.6" fill={V4.ink}/>
          ))}
        </svg>
      </div>
      {label && (
        <span style={{
          fontFamily: 'DM Sans', fontSize: 10, color: V4.muted, fontWeight: 600,
          letterSpacing: 1.6, textTransform: 'uppercase', textAlign: 'center',
          maxWidth: size + 50, lineHeight: 1.35,
        }}>{label}</span>
      )}
    </div>
  )
}

// AssetCard — chooses presentation per assetStatus.
// production → real image; specimen → SpecimenCard with sample treatment; missing → quiet placeholder.
export function AssetCard({
  asset, title, sub, selected = false, onSelect, height = 120, glyph,
}) {
  const status = asset?.assetStatus || 'missing'
  if (status === 'production' && asset.imageSrc) {
    return (
      <button onClick={onSelect} aria-pressed={selected} style={{
        display: 'flex', alignItems: 'stretch', textAlign: 'left',
        width: '100%', height, padding: 0, background: V4.walnut,
        border: `1px solid ${selected ? V4.brass : 'rgba(246,235,210,0.10)'}`,
        borderRadius: 8, cursor: 'pointer', overflow: 'hidden',
        boxShadow: selected
          ? '0 0 0 1px rgba(232,199,131,0.40) inset, 0 14px 30px rgba(217,89,30,0.28)'
          : '0 6px 18px rgba(0,0,0,0.40)',
        position: 'relative', boxSizing: 'border-box', flex: '0 0 auto', minWidth: 0,
      }}>
        <div style={{ width: height - 4, height: '100%', flexShrink: 0, position: 'relative' }}>
          <img src={asset.imageSrc} alt={asset.label} style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          }}/>
          {selected && <SelectedBadge/>}
        </div>
        <CardLabel title={title || asset.label} sub={sub} selected={selected}/>
      </button>
    )
  }
  if (status === 'missing') {
    return (
      <button onClick={onSelect} aria-pressed={selected} style={{
        display: 'flex', alignItems: 'stretch', textAlign: 'left',
        width: '100%', height, padding: 0,
        background: 'linear-gradient(180deg, rgba(232,199,131,0.05), rgba(232,199,131,0.02))',
        border: `1px dashed ${selected ? V4.brass : 'rgba(232,199,131,0.30)'}`,
        borderRadius: 8, cursor: 'pointer', overflow: 'hidden',
        position: 'relative', boxSizing: 'border-box', flex: '0 0 auto', minWidth: 0,
      }}>
        <div style={{ width: height - 4, height: '100%', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: V4.brassHi, position: 'relative',
        }}>
          <G kind={glyph || 'sparkle'} size={20} stroke={1.5}/>
          {selected && <SelectedBadge/>}
        </div>
        <CardLabel title={title || asset.label} sub={sub} selected={selected}/>
      </button>
    )
  }
  // specimen — defer to the existing SpecimenCard styling, but use the asset's sampleCode.
  // asset.id is shaped '<category>-<optionId>'; the Swatch palette is keyed by optionId.
  const optionId = (asset.id || '').split('-').slice(1).join('-')
  return (
    <SpecimenCard
      id={optionId}
      code={asset.sampleCode}
      title={title || asset.label}
      sub={sub}
      selected={selected}
      onSelect={onSelect}
      height={height}
      glyph={glyph}
    />
  )
}

function SelectedBadge() {
  return (
    <span style={{
      position: 'absolute', top: 6, right: 6,
      width: 22, height: 22, borderRadius: 999,
      background: V4.ember, color: V4.cream,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 3px 8px rgba(0,0,0,0.45)',
    }} aria-hidden="true">
      <G kind="check" size={12} color={V4.cream} stroke={2.4}/>
    </span>
  )
}

function CardLabel({ title, sub, selected }) {
  return (
    <div style={{
      flex: 1, padding: '10px 14px',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0,
      position: 'relative',
    }}>
      {selected && (
        <span style={{
          fontFamily: 'DM Sans', fontSize: 9.5, fontWeight: 700,
          color: V4.brassHi, letterSpacing: 1.8, textTransform: 'uppercase',
          marginBottom: 3,
        }}>✓ Chosen</span>
      )}
      <span className="serif" style={{
        fontSize: 17, color: selected ? V4.brassHi : V4.cream, fontWeight: 500, lineHeight: 1.1,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
      }}>{title}</span>
      {sub && (
        <span style={{
          fontFamily: 'DM Sans', fontSize: 11, color: V4.paperMuted, marginTop: 3, lineHeight: 1.35,
          overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
        }}>{sub}</span>
      )}
    </div>
  )
}

export function TapHint({ children, color = V4.brassHi, dark = true, style }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '5px 12px 5px 9px',
      background: dark ? 'rgba(232,199,131,0.10)' : 'rgba(180,90,42,0.08)',
      border: `1px solid ${color}40`,
      borderRadius: 999,
      fontFamily: 'DM Sans', fontSize: 10.5, fontWeight: 600,
      color, letterSpacing: 1.8, textTransform: 'uppercase',
      ...style,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: 999, background: color,
        boxShadow: `0 0 8px ${color}`,
      }} className="ember-pulse"/>
      {children}
    </div>
  )
}
