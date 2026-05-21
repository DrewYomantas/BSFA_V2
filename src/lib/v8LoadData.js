// Existing manifests (proof slice)
import kingsmanManifest from '../data/v8/manifest/kingsman_bentley_39.json'
import discontinuedManifest from '../data/v8/manifest/discontinued_example_unit.json'
import verificationRequiredManifest from '../data/v8/manifest/verification_required_example_unit.json'

// Audit-content sync pass: 10 new manifests for showroom positions 1-31 (subset).
// Source: src/data/showroom/first-floor-displays.json (positions match showroom register).
import travisFpx564Manifest from '../data/v8/manifest/travis_fpx_564tv_35k_deluxe.json'
import travisFpx4237Manifest from '../data/v8/manifest/travis_fpx_4237_cf_gsr2.json'
import kozyHeatNordik41Manifest from '../data/v8/manifest/kozy_heat_nordik_41dv.json'
import kingsmanHbzdv3628Manifest from '../data/v8/manifest/kingsman_hbzdv3628n.json'
import travisFpx864Manifest from '../data/v8/manifest/travis_fpx_864tv_40k_deluxe.json'
import kozyHeatNordik48Manifest from '../data/v8/manifest/kozy_heat_nordik_48tl.json'
import davinci6030Manifest from '../data/v8/manifest/davinci_6030.json'
import heatilatorIcon60Manifest from '../data/v8/manifest/heatilator_icon60_hargrove_woodland_timbers.json'
import mendotaFv44iManifest from '../data/v8/manifest/mendota_fv44i.json'
import lopiLargeFlushWoodManifest from '../data/v8/manifest/lopi_large_flush_wood_nexgen.json'

// Display register records
import frontShowroomP1 from '../data/v8/displayRegister/front_showroom_p1.json'
import frontShowroomP2 from '../data/v8/displayRegister/front_showroom_p2.json'
import frontShowroomP3 from '../data/v8/displayRegister/front_showroom_p3.json'
import frontShowroomP4 from '../data/v8/displayRegister/front_showroom_p4.json'
import frontShowroomP6 from '../data/v8/displayRegister/front_showroom_p6.json'
import frontShowroomP7 from '../data/v8/displayRegister/front_showroom_p7.json'
import frontShowroomP10 from '../data/v8/displayRegister/front_showroom_p10.json'
import frontShowroomP11 from '../data/v8/displayRegister/front_showroom_p11.json'
import frontShowroomP12 from '../data/v8/displayRegister/front_showroom_p12.json'
import frontShowroomP14 from '../data/v8/displayRegister/front_showroom_p14.json'
import frontShowroomP25 from '../data/v8/displayRegister/front_showroom_p25.json'
import frontShowroomP31 from '../data/v8/displayRegister/front_showroom_p31.json'

import manifestGapList from '../data/v8/manifestGapList.json'
import { syncRegisterToManifest } from './v8SyncRegisterToManifest.js'

export const registerRecords = [
  frontShowroomP1,
  frontShowroomP2,
  frontShowroomP3,
  frontShowroomP4,
  frontShowroomP6,
  frontShowroomP7,
  frontShowroomP10,
  frontShowroomP11,
  frontShowroomP12,
  frontShowroomP14,
  frontShowroomP25,
  frontShowroomP31,
]

export const manifests = [
  kingsmanManifest,
  discontinuedManifest,
  verificationRequiredManifest,
  travisFpx564Manifest,
  travisFpx4237Manifest,
  kozyHeatNordik41Manifest,
  kingsmanHbzdv3628Manifest,
  travisFpx864Manifest,
  kozyHeatNordik48Manifest,
  davinci6030Manifest,
  heatilatorIcon60Manifest,
  mendotaFv44iManifest,
  lopiLargeFlushWoodManifest,
].map((manifest) => syncRegisterToManifest(manifest, registerRecords))

export const gapList = manifestGapList

export function findSlotBundle(slotId) {
  const slot = registerRecords.find((record) => record.displaySlotId === slotId)
  const manifest = slot ? manifests.find((record) => record.unitId === slot.currentUnitRef) : null
  return { slot, manifest }
}
