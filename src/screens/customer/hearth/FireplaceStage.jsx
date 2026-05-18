import React from 'react'
import { V4 } from './tokens.js'
import { useAppMode, isInternal } from './AppModeContext.jsx'

export function FireplaceV4({
  width = 1000, height = 620,
  stoneId = 'cliffstone', mantelId = 'rusticOak', hearthId = 'bluestone',
  moodId = 'warmEvening',
  showHint = false,
  showLabel = true,
  showFurniture = true,
  showParticles = true,
  showFloorReflection = true,
  disclosure = false,
  livePreviewLabel = 'LIVE PREVIEW',
}) {
  const mode = useAppMode()
  // Dev/internal-only disclosure never appears in customer or presentation modes.
  const showDisclosure = disclosure && isInternal(mode)
  const uid = React.useId()
  const warm = moodId === 'warmEvening'

  const stoneTone = {
    cliffstone: { base: '#6B5A47', dark: '#322618', light: '#9C8870', mortar: '#2A1F14' },
    fieldledge: { base: '#83725E', dark: '#3F3324', light: '#AD9C80', mortar: '#332817' },
  }[stoneId] || { base: '#6B5A47', dark: '#322618', light: '#9C8870', mortar: '#2A1F14' }

  const mantelTone = {
    rusticOak:    { base: '#6C4622', dark: '#3D2613', light: '#9C6E40' },
    paintedWhite: { base: '#EAE0CD', dark: '#A89C82', light: '#F6EFE0' },
  }[mantelId] || { base: '#6C4622', dark: '#3D2613', light: '#9C6E40' }

  const hearthTone = {
    bluestone: { base: '#3F4A5A', dark: '#252B36', light: '#5E6A7C' },
  }[hearthId] || { base: '#3F4A5A', dark: '#252B36', light: '#5E6A7C' }

  const wallHi   = warm ? '#3A2418' : '#F0E6CE'
  const wall     = warm ? '#1A0F08' : '#D6C7A8'
  const wallLo   = warm ? '#080503' : '#A89876'
  const beamCol  = warm ? '#1F1308' : '#3A2818'
  const beamHi   = warm ? '#3A2415' : '#7A5732'
  const emberCol = warm ? '#F4A85B' : '#FFD9A0'
  const fireCore = warm ? '#FFE9A8' : '#FFE9B8'
  const fireBack = warm ? '#D9591E' : '#D88A4E'
  const floorCol = warm ? '#2A1A0E' : '#A48867'
  const floorDark = warm ? '#100805' : '#604832'

  const W = width, H = height
  const cx = W / 2

  const beamH = H * 0.05
  const stoneTop = beamH
  const mantelY = H * 0.46
  const mantelH = H * 0.055
  const stoneBottom = H * 0.82
  const fbW = W * 0.30, fbH = H * 0.30
  const fbX = cx - fbW / 2, fbY = mantelY + mantelH + H * 0.015
  const hearthY = stoneBottom
  const hearthH = H * 0.05
  const floorY = hearthY + hearthH

  return (
    <svg width={width} height={height} viewBox={`0 0 ${W} ${H}`}
         style={{ display: 'block' }} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`wall${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={wallHi}/>
          <stop offset="50%"  stopColor={wall}/>
          <stop offset="100%" stopColor={wallLo}/>
        </linearGradient>
        <pattern id={`stone${uid}`} width="56" height="22" patternUnits="userSpaceOnUse">
          <rect width="56" height="22" fill={stoneTone.mortar}/>
          <rect x="0.6"  y="0.6"  width="26" height="9.5"  fill={stoneTone.dark}  rx="1"/>
          <rect x="27.6" y="0.6"  width="27.8" height="9.5" fill={stoneTone.base}  rx="1"/>
          <rect x="0.6"  y="11.2" width="32" height="9.5"  fill={stoneTone.light} opacity="0.95" rx="1"/>
          <rect x="33"   y="11.2" width="22.4" height="9.5" fill={stoneTone.dark} rx="1"/>
          <rect x="2"    y="1.4"  width="22" height="1"   fill={stoneTone.light} opacity="0.25"/>
          <rect x="28.6" y="1.4"  width="24" height="1"   fill={stoneTone.light} opacity="0.18"/>
          <rect x="2"    y="11.8" width="28" height="0.8" fill={stoneTone.base}  opacity="0.5"/>
          <circle cx="14" cy="6"   r="0.4" fill={stoneTone.dark}/>
          <circle cx="40" cy="4.5" r="0.5" fill={stoneTone.light} opacity="0.5"/>
          <circle cx="22" cy="16"  r="0.4" fill={stoneTone.dark}/>
        </pattern>
        <pattern id={`mantel${uid}`} width="28" height={mantelH} patternUnits="userSpaceOnUse">
          <rect width="28" height={mantelH} fill={mantelTone.base}/>
          <path d={`M0 ${mantelH*0.22} Q14 ${mantelH*0.5} 28 ${mantelH*0.25}`}
                stroke={mantelTone.dark} strokeWidth="0.7" fill="none" opacity="0.55"/>
          <path d={`M0 ${mantelH*0.58} Q14 ${mantelH*0.85} 28 ${mantelH*0.65}`}
                stroke={mantelTone.light} strokeWidth="0.5" fill="none" opacity="0.55"/>
          <path d={`M0 ${mantelH*0.42} Q14 ${mantelH*0.25} 28 ${mantelH*0.45}`}
                stroke={mantelTone.dark} strokeWidth="0.3" fill="none" opacity="0.4"/>
        </pattern>
        <pattern id={`hearth${uid}`} width="80" height={hearthH} patternUnits="userSpaceOnUse">
          <rect width="80" height={hearthH} fill={hearthTone.base}/>
          <path d={`M0 ${hearthH*0.4} Q40 ${hearthH*0.55} 80 ${hearthH*0.3}`}
                stroke={hearthTone.light} strokeWidth="0.6" fill="none" opacity="0.65"/>
          <path d={`M0 ${hearthH*0.7} Q40 ${hearthH*0.6} 80 ${hearthH*0.8}`}
                stroke={hearthTone.dark} strokeWidth="0.6" fill="none" opacity="0.7"/>
        </pattern>
        <pattern id={`floor${uid}`} width="120" height="36" patternUnits="userSpaceOnUse">
          <rect width="120" height="36" fill={floorCol}/>
          <rect x="0"  y="0"  width="64" height="17" fill={floorDark} opacity="0.55"/>
          <rect x="65" y="0"  width="55" height="17" fill={floorCol}/>
          <rect x="0"  y="18" width="40" height="17" fill={floorDark} opacity="0.4"/>
          <rect x="41" y="18" width="79" height="17" fill={floorCol}/>
          <line x1="0"   y1="17.5" x2="120" y2="17.5" stroke="#000" strokeOpacity="0.5" strokeWidth="0.4"/>
          <line x1="64.5" y1="0"   x2="64.5" y2="17"   stroke="#000" strokeOpacity="0.4" strokeWidth="0.3"/>
          <line x1="40.5" y1="18"  x2="40.5" y2="35"   stroke="#000" strokeOpacity="0.4" strokeWidth="0.3"/>
          <path d="M5 4 L60 5 M5 12 L55 13 M70 4 L115 5 M68 12 L115 13" stroke={floorDark} strokeWidth="0.3" opacity="0.4"/>
        </pattern>
        <radialGradient id={`ember${uid}`} cx="50%" cy="65%" r="60%">
          <stop offset="0%"   stopColor={fireCore} stopOpacity="1"/>
          <stop offset="25%"  stopColor={V4.emberSpark} stopOpacity="0.95"/>
          <stop offset="55%"  stopColor={emberCol} stopOpacity="0.85"/>
          <stop offset="80%"  stopColor={fireBack} stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#1A0A03" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id={`spill${uid}`} cx="50%" cy="62%" r="70%">
          <stop offset="0%"  stopColor={emberCol} stopOpacity={warm ? 0.50 : 0.25}/>
          <stop offset="40%" stopColor={emberCol} stopOpacity={warm ? 0.20 : 0.10}/>
          <stop offset="80%" stopColor={emberCol} stopOpacity="0"/>
        </radialGradient>
        <radialGradient id={`flspill${uid}`} cx="50%" cy="0%" r="60%">
          <stop offset="0%"  stopColor={emberCol} stopOpacity={warm ? 0.55 : 0.30}/>
          <stop offset="60%" stopColor={emberCol} stopOpacity="0.05"/>
          <stop offset="100%" stopColor={emberCol} stopOpacity="0"/>
        </radialGradient>
        <radialGradient id={`fb${uid}`} cx="50%" cy="85%" r="100%">
          <stop offset="0%" stopColor="#4A1F08"/>
          <stop offset="60%" stopColor="#1F0A03"/>
          <stop offset="100%" stopColor="#000"/>
        </radialGradient>
        <radialGradient id={`smoke${uid}`} cx="50%" cy="100%" r="70%">
          <stop offset="0%" stopColor="#5A3624" stopOpacity={warm ? 0.55 : 0.25}/>
          <stop offset="60%" stopColor="#5A3624" stopOpacity="0"/>
        </radialGradient>
        <pattern id={`beam${uid}`} width="48" height={beamH} patternUnits="userSpaceOnUse">
          <rect width="48" height={beamH} fill={beamCol}/>
          <path d={`M0 ${beamH*0.3} Q24 ${beamH*0.55} 48 ${beamH*0.35}`} stroke={beamHi} strokeWidth="0.5" fill="none" opacity="0.5"/>
          <path d={`M0 ${beamH*0.7} Q24 ${beamH*0.5}  48 ${beamH*0.75}`} stroke={beamHi} strokeWidth="0.4" fill="none" opacity="0.4"/>
        </pattern>
        <radialGradient id={`vig${uid}`} cx="50%" cy="50%" r="80%">
          <stop offset="55%" stopColor="#000" stopOpacity="0"/>
          <stop offset="100%" stopColor="#000" stopOpacity={warm ? 0.65 : 0.30}/>
        </radialGradient>
        <linearGradient id={`brass${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={V4.brassHi}/>
          <stop offset="50%" stopColor={V4.brass}/>
          <stop offset="100%" stopColor={V4.brassLo}/>
        </linearGradient>
      </defs>

      <rect x="0" y="0" width={W} height={H} fill={`url(#wall${uid})`}/>
      <rect x="0" y="0" width={W} height={H} fill={`url(#spill${uid})`}/>

      <g>
        <rect x="0" y="0" width={W} height={beamH} fill={`url(#beam${uid})`}/>
        <rect x="0" y={beamH - 2} width={W} height="4" fill="#000" opacity="0.55"/>
        {[0.15, 0.45, 0.75].map((p, i) => (
          <rect key={i} x={W * p} y={beamH * 0.6} width="18" height={beamH * 0.4 + 2}
                fill={beamCol} stroke="#000" strokeOpacity="0.6" strokeWidth="0.6"/>
        ))}
      </g>

      <g>
        <rect x={W*0.03} y={stoneTop} width={W*0.94} height={stoneBottom - stoneTop} fill={`url(#stone${uid})`}/>
        <rect x={W*0.03} y={stoneTop} width={W*0.94} height="14" fill="black" opacity="0.4"/>
        <rect x={W*0.03} y={stoneTop} width="30" height={stoneBottom - stoneTop} fill="black" opacity="0.30"/>
        <rect x={W*0.97 - 30} y={stoneTop} width="30" height={stoneBottom - stoneTop} fill="black" opacity="0.30"/>
        <rect x={cx - 32} y={mantelY - 22} width="64" height="22" fill={stoneTone.dark} stroke="#000" strokeOpacity="0.45" strokeWidth="0.6"/>
        <rect x={cx - 32} y={mantelY - 22} width="64" height="3" fill={stoneTone.light} opacity="0.25"/>
      </g>

      <g>
        <path d={`M${W*0.18} ${mantelY + mantelH} L${W*0.18+18} ${mantelY + mantelH}
                 L${W*0.18+10} ${mantelY + mantelH + 18} L${W*0.18+2} ${mantelY + mantelH + 18} Z`}
              fill={mantelTone.dark}/>
        <path d={`M${W*0.82} ${mantelY + mantelH} L${W*0.82-18} ${mantelY + mantelH}
                 L${W*0.82-10} ${mantelY + mantelH + 18} L${W*0.82-2} ${mantelY + mantelH + 18} Z`}
              fill={mantelTone.dark}/>
        <rect x={W*0.10} y={mantelY} width={W*0.80} height={mantelH} fill={`url(#mantel${uid})`}/>
        <rect x={W*0.10} y={mantelY} width={W*0.80} height="1.5" fill={mantelTone.light} opacity="0.6"/>
        <rect x={W*0.10} y={mantelY + mantelH - 4} width={W*0.80} height="8" fill="black" opacity="0.40"/>
        <rect x={W*0.10} y={mantelY} width={W*0.80} height="3" fill={emberCol} opacity={warm ? 0.42 : 0.20}/>
      </g>

      <g>
        <rect x={fbX-6} y={fbY-6} width={fbW+12} height={fbH+12} fill={`url(#brass${uid})`} rx="2"/>
        <rect x={fbX-4} y={fbY-4} width={fbW+8}  height={fbH+8}  fill="#000" rx="1"/>
        <rect x={fbX} y={fbY} width={fbW} height={fbH} fill={`url(#fb${uid})`}/>

        <ellipse cx={cx} cy={fbY + fbH * 0.83} rx={fbW * 0.40} ry={fbH * 0.18}
                 fill={V4.emberDeep}/>
        <g>
          <rect x={cx - fbW*0.28} y={fbY + fbH*0.73} width={fbW*0.56} height="6" rx="2"
                fill="#2A1409"/>
          <rect x={cx - fbW*0.22} y={fbY + fbH*0.76} width={fbW*0.44} height="3" rx="1"
                fill={V4.emberDeep} opacity="0.7"/>
        </g>

        <g className="flicker" opacity={warm ? 1 : 0.55}>
          <ellipse cx={cx} cy={fbY + fbH * 0.62} rx={fbW * 0.45} ry={fbH * 0.50}
                   fill={`url(#ember${uid})`}/>
          <path d={`M${cx-fbW*0.20} ${fbY+fbH*0.92}
                    C${cx-fbW*0.26} ${fbY+fbH*0.62} ${cx-fbW*0.05} ${fbY+fbH*0.50} ${cx-fbW*0.10} ${fbY+fbH*0.30}
                    C${cx-fbW*0.05} ${fbY+fbH*0.45} ${cx} ${fbY+fbH*0.30} ${cx} ${fbY+fbH*0.18}
                    C${cx+fbW*0.04} ${fbY+fbH*0.38} ${cx+fbW*0.10} ${fbY+fbH*0.32} ${cx+fbW*0.12} ${fbY+fbH*0.45}
                    C${cx+fbW*0.22} ${fbY+fbH*0.58} ${cx+fbW*0.28} ${fbY+fbH*0.68} ${cx+fbW*0.22} ${fbY+fbH*0.92} Z`}
                fill={fireBack} opacity="0.85"/>
          <path d={`M${cx-fbW*0.12} ${fbY+fbH*0.94}
                    C${cx-fbW*0.16} ${fbY+fbH*0.70} ${cx-fbW*0.03} ${fbY+fbH*0.62} ${cx-fbW*0.05} ${fbY+fbH*0.45}
                    C${cx} ${fbY+fbH*0.55} ${cx+fbW*0.01} ${fbY+fbH*0.45} ${cx+fbW*0.02} ${fbY+fbH*0.32}
                    C${cx+fbW*0.06} ${fbY+fbH*0.50} ${cx+fbW*0.10} ${fbY+fbH*0.55} ${cx+fbW*0.13} ${fbY+fbH*0.94} Z`}
                fill={emberCol} opacity="0.95"/>
          <path d={`M${cx-fbW*0.05} ${fbY+fbH*0.95}
                    C${cx-fbW*0.07} ${fbY+fbH*0.80} ${cx-fbW*0.01} ${fbY+fbH*0.72} ${cx-fbW*0.02} ${fbY+fbH*0.58}
                    C${cx+fbW*0.01} ${fbY+fbH*0.65} ${cx+fbW*0.03} ${fbY+fbH*0.55} ${cx+fbW*0.04} ${fbY+fbH*0.95} Z`}
                fill={fireCore}/>
        </g>

        <g fill={emberCol}>
          <circle cx={cx - 50} cy={fbY + fbH - 22} r="1.6" opacity="0.85"/>
          <circle cx={cx - 20} cy={fbY + fbH - 12} r="2"  />
          <circle cx={cx + 14} cy={fbY + fbH - 18} r="1.4" opacity="0.9"/>
          <circle cx={cx + 48} cy={fbY + fbH - 14} r="1.8" opacity="0.8"/>
          <circle cx={cx - 35} cy={fbY + fbH - 8}  r="1"  opacity="0.7"/>
          <circle cx={cx + 30} cy={fbY + fbH - 6}  r="1.2"/>
        </g>

        {showParticles && warm && [
          { x: cx - 30, d: 0,    o: 0.9 },
          { x: cx,      d: 1.3, o: 0.7 },
          { x: cx + 40, d: 0.6, o: 0.85 },
          { x: cx - 50, d: 2.4, o: 0.6 },
          { x: cx + 14, d: 1.9, o: 0.75 },
        ].map((p, i) => (
          <circle key={i}
            cx={p.x} cy={fbY + fbH * 0.55} r="0.9" fill={V4.emberSpark}
            className="ember-particle"
            style={{ animationDelay: `${p.d}s`, opacity: 0 }}/>
        ))}

        <ellipse cx={cx} cy={fbY + fbH * 0.18} rx={fbW * 0.40} ry={fbH * 0.20}
                 fill={`url(#smoke${uid})`} opacity="0.6"/>

        <g opacity="0.18">
          {Array.from({ length: 18 }).map((_, i) => (
            <line key={i}
              x1={fbX} y1={fbY + (fbH / 18) * i + 2}
              x2={fbX + fbW} y2={fbY + (fbH / 18) * i + 2}
              stroke="#000" strokeWidth="0.3"/>
          ))}
        </g>

        <rect x={fbX} y={fbY} width={fbW} height="6" fill="black" opacity="0.65"/>
        {[0.05, 0.5, 0.95].map((p, i) => (
          <circle key={`top${i}`} cx={fbX + fbW * p} cy={fbY - 3} r="1.6" fill={V4.brassHi}/>
        ))}
        {[0.05, 0.5, 0.95].map((p, i) => (
          <circle key={`bot${i}`} cx={fbX + fbW * p} cy={fbY + fbH + 3} r="1.6" fill={V4.brassHi}/>
        ))}
      </g>

      <g>
        <rect x={W*0.04} y={hearthY} width={W*0.92} height={hearthH} fill={`url(#hearth${uid})`} rx="1"/>
        <rect x={W*0.04} y={hearthY + hearthH - 3} width={W*0.92} height="4" fill="black" opacity="0.40"/>
        <rect x={W*0.04} y={hearthY} width={W*0.92} height="3" fill={emberCol} opacity={warm ? 0.55 : 0.22}/>
      </g>

      <rect x="0" y={floorY} width={W} height={H - floorY} fill={`url(#floor${uid})`}/>
      <rect x="0" y={floorY} width={W} height={H - floorY} fill={`url(#flspill${uid})`}/>

      {showFloorReflection && (
        <g opacity={warm ? 0.75 : 0.45}>
          <ellipse cx={cx} cy={floorY + (H - floorY) * 0.45}
                   rx={fbW * 0.65} ry={(H - floorY) * 0.35}
                   fill={`url(#ember${uid})`} opacity={warm ? 0.6 : 0.30}
                   className="flicker"/>
          <rect x={W*0.10} y={floorY} width={W*0.80} height="1.5"
                fill={emberCol} opacity={warm ? 0.55 : 0.25}/>
        </g>
      )}

      {showFurniture && (
        <g>
          <path d={`M0 ${H} L0 ${H*0.82} Q${W*0.04} ${H*0.78} ${W*0.10} ${H*0.85}
                    Q${W*0.13} ${H*0.90} ${W*0.14} ${H} Z`}
                fill="#000" opacity={warm ? 0.85 : 0.65}/>
          <path d={`M${W} ${H} L${W} ${H*0.80} Q${W*0.96} ${H*0.76} ${W*0.90} ${H*0.84}
                    Q${W*0.87} ${H*0.92} ${W*0.86} ${H} Z`}
                fill="#000" opacity={warm ? 0.85 : 0.65}/>
        </g>
      )}

      <rect x="0" y="0" width={W} height={H} fill={`url(#vig${uid})`}/>

      {showHint && (
        <g>
          <rect x="18" y="18" width="170" height="28" rx="14" fill="rgba(15,10,6,0.62)"
                stroke="rgba(201,162,88,0.40)"/>
          <circle cx="34" cy="32" r="4" fill={V4.emberHot} className="ember-pulse"/>
          <text x="48" y="36" fontFamily="DM Sans" fontSize="10.5" fill={V4.paperInk}
                letterSpacing="2.2" fontWeight="600">
            {livePreviewLabel}
          </text>
        </g>
      )}

      {showDisclosure && (
        <g>
          <rect x={W - 240} y="18" width="222" height="26" rx="4" fill="rgba(15,10,6,0.55)"
                stroke="rgba(201,162,88,0.30)"/>
          <text x={W - 228} y="34" fontFamily="JetBrains Mono" fontSize="9" fill={V4.brass}
                letterSpacing="1.2" fontWeight="500">
            INTERNAL · SPECIMEN RENDER
          </text>
        </g>
      )}

      {showLabel && (
        <g>
          <rect x="18" y={H - 40} width="180" height="24" rx="12" fill="rgba(15,10,6,0.62)"
                stroke="rgba(201,162,88,0.30)"/>
          <circle cx="32" cy={H - 28} r="3.5" fill={emberCol}/>
          <text x="44" y={H - 24} fontFamily="DM Sans" fontSize="10" fill={V4.paperInk}
                letterSpacing="2" fontWeight="600">
            {(warm ? 'WARM EVENING · 7:42 PM' : 'CLEAN DAYLIGHT · 11:05 AM')}
          </text>
        </g>
      )}
    </svg>
  )
}
