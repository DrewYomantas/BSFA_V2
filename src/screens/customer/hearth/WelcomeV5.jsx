// Welcome (V6) — personalized arrival, no in-screen name capture.
// Rep sets first name + project name in Start Session; Welcome reflects them.
// Falls back gracefully when nothing is set:
//   "Design your hearth." / "Today's design"
//
// V6 motion: no reveal stagger, no CTA breathe. The screen is a still.

import { V4, useAtmosphere } from './tokens.js'
import { MonogramV4, BrassCorner, Eye, HairlineRule, G, SpecimenTag } from './atoms.jsx'
import { FireplaceV4 } from './FireplaceStage.jsx'
import { AssetSlot, GuideAttribution, PresentationGuard } from './v6Atoms.jsx'
import { useAppMode } from './AppModeContext.jsx'

const REQUIRED_PRESENTATION_ASSETS = [
  { kind: 'showroom', id: 'opener' },
  { kind: 'stage',    id: 'warmEvening' },
]

export default function WelcomeV5({ onBegin, customer = {}, project = {}, guide }) {
  const atm = useAtmosphere()
  const mode = useAppMode()
  const fn = (customer.firstName || '').trim()
  const projectName = (project?.name || '').trim()

  return (
    <PresentationGuard required={REQUIRED_PRESENTATION_ASSETS} screen="Welcome">
      <div style={{
        position: 'relative', width: '100vw', height: '100vh',
        background: V4.iron, overflow: 'hidden', color: V4.paperInk,
      }}>
        {/* Full-bleed room. AssetSlot lets a production hero replace the
            specimen stage without code changes. */}
        <div style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
          <AssetSlot kind="showroom" id="opener" alt="Benson Stone showroom">
            <FireplaceV4 width={1920} height={1080}
                         stoneId={atm.stone} mantelId={atm.mantel}
                         hearthId={atm.hearth} moodId={atm.mood}
                         showLabel={false} showHint={false}
                         showFurniture showParticles showFloorReflection/>
          </AssetSlot>
        </div>

        {/* Scrims for legibility */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: '0 0 auto 0', height: 280, zIndex: 2,
          background: 'linear-gradient(180deg, rgba(8,5,3,0.82) 0%, rgba(8,5,3,0.45) 60%, rgba(8,5,3,0) 100%)',
        }}/>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 'auto 0 0 0', height: 380, zIndex: 2,
          background: 'linear-gradient(0deg, rgba(8,5,3,0.92) 0%, rgba(8,5,3,0.30) 70%, rgba(8,5,3,0) 100%)',
        }}/>

        {/* Top strip: brand + guide */}
        <div style={{
          position: 'relative', zIndex: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '28px 44px 0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <MonogramV4 size={52} color={V4.brass}/>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span className="serif" style={{
                fontSize: 26, color: V4.cream, letterSpacing: 0.6, fontWeight: 500,
              }}>Benson Stone</span>
              <span style={{
                fontSize: 11, color: 'rgba(246,235,210,0.72)', marginTop: 6, fontWeight: 600,
                letterSpacing: 3.4, textTransform: 'uppercase',
              }}>Hearth Studio · Est. 1971</span>
            </div>
          </div>

          <GuideAttribution guide={guide} dark/>
        </div>

        {/* Title placard */}
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 218,
          display: 'flex', justifyContent: 'center', zIndex: 5,
        }}>
          <div style={{
            position: 'relative',
            padding: '36px 72px 38px',
            minWidth: 640, maxWidth: 880, textAlign: 'center',
            background: 'rgba(20,12,6,0.50)',
            border: `1px solid rgba(232,199,131,0.30)`,
            boxShadow: 'inset 0 0 36px rgba(0,0,0,0.55), 0 28px 80px rgba(0,0,0,0.6)',
          }}>
            <div style={{ position: 'absolute', top: 8,    left: 8    }}><BrassCorner corner="tl"/></div>
            <div style={{ position: 'absolute', top: 8,    right: 8   }}><BrassCorner corner="tr"/></div>
            <div style={{ position: 'absolute', bottom: 8, left: 8    }}><BrassCorner corner="bl"/></div>
            <div style={{ position: 'absolute', bottom: 8, right: 8   }}><BrassCorner corner="br"/></div>

            <Eye color={V4.brassHi} tracking={4.2} style={{ marginBottom: 18 }}>
              Welcome to Benson Stone
            </Eye>

            {fn ? (
              <>
                <h1 className="serif-it" style={{
                  margin: 0, color: V4.cream, fontSize: 60, lineHeight: 1.0,
                  fontWeight: 400, letterSpacing: -0.4,
                  textShadow: '0 3px 30px rgba(0,0,0,0.55)',
                }}>
                  Welcome, {fn}.
                </h1>
                <h2 className="serif" style={{
                  margin: '10px 0 0', color: V4.cream, fontSize: 72, lineHeight: 0.98,
                  fontWeight: 400, letterSpacing: -0.7,
                  textShadow: '0 3px 30px rgba(0,0,0,0.55)',
                }}>
                  Let's design your{' '}
                  <em className="serif-it" style={{ color: V4.emberHot, fontWeight: 500 }}>hearth.</em>
                </h2>
              </>
            ) : (
              <h1 className="serif" style={{
                margin: 0, color: V4.cream, fontSize: 100, lineHeight: 0.96,
                fontWeight: 400, letterSpacing: -1,
                textShadow: '0 3px 30px rgba(0,0,0,0.55)',
              }}>
                Design your{' '}
                <em className="serif-it" style={{ color: V4.emberHot, fontWeight: 500 }}>hearth.</em>
              </h1>
            )}

            <div style={{ margin: '24px auto 0', display: 'flex', justifyContent: 'center' }}>
              <HairlineRule width={220}/>
            </div>

            <p style={{
              margin: '20px auto 0', maxWidth: 540,
              color: 'rgba(246,235,210,0.84)', fontSize: 16, lineHeight: 1.65,
              fontWeight: 300, letterSpacing: 0.15,
            }}>
              A quiet moment at the center of your home. Together we'll choose your
              stone, mantel, hearth, and light — then you'll take the picture home.
            </p>

            {/* Project identity pill */}
            {projectName && (
              <div style={{
                marginTop: 18, display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '6px 14px',
                background: 'rgba(232,199,131,0.10)',
                border: `1px solid rgba(232,199,131,0.30)`,
                borderRadius: 999,
              }}>
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
                  <path d="M5 0 L10 5 L5 10 L0 5 Z" fill={V4.brassHi}/>
                </svg>
                <span style={{
                  fontFamily: 'DM Sans', fontSize: 11, color: V4.brassHi,
                  letterSpacing: 2.4, textTransform: 'uppercase', fontWeight: 600,
                }}>{projectName}</span>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 134, zIndex: 6,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22,
        }}>
          <button onClick={onBegin} style={{
            display: 'inline-flex', alignItems: 'center', gap: 20,
            padding: '22px 26px 22px 44px',
            background: 'linear-gradient(180deg, #221408, #0E0905)',
            color: V4.cream,
            border: `1px solid rgba(232,199,131,0.30)`,
            borderRadius: 999, cursor: 'pointer',
            fontFamily: 'DM Sans', fontWeight: 500, fontSize: 22, letterSpacing: 0.4,
            boxShadow: '0 4px 20px rgba(0,0,0,0.45), 0 26px 70px rgba(217,89,30,0.18), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}>
            <span>Step inside</span>
            <span aria-hidden="true" style={{
              width: 50, height: 50, borderRadius: 999,
              background: `radial-gradient(circle at 35% 30%, ${V4.emberSpark}, ${V4.ember} 55%, ${V4.emberDeep})`,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.30) inset, 0 0 28px rgba(244,168,91,0.55)',
            }}>
              <G kind="arrow" size={22} color="#fff" stroke={1.9}/>
            </span>
          </button>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 14,
            color: 'rgba(246,235,210,0.55)', fontSize: 11.5,
            letterSpacing: 2.6, textTransform: 'uppercase', fontWeight: 600,
          }}>
            <span aria-hidden="true" style={{ width: 32, height: 1, background: 'rgba(246,235,210,0.22)' }}/>
            About fifteen quiet minutes together
            <span aria-hidden="true" style={{ width: 32, height: 1, background: 'rgba(246,235,210,0.22)' }}/>
          </div>
        </div>

        {/* Bottom — quiet location detail */}
        <div style={{
          position: 'absolute', bottom: 32, left: 44, right: 44, zIndex: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Eye color="rgba(246,235,210,0.42)" tracking={3.2}>
            Rockford, IL · Showroom
          </Eye>
        </div>

        {/* Internal-mode indicator — never customer-facing */}
        {mode === 'internal' && (
          <div style={{
            position: 'absolute', top: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 50,
          }}>
            <SpecimenTag code="MODE · INTERNAL"/>
          </div>
        )}
      </div>
    </PresentationGuard>
  )
}
