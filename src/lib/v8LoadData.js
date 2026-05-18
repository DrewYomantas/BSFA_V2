import kingsmanManifest from '../data/v8/manifest/kingsman_bentley_39.json'
import discontinuedManifest from '../data/v8/manifest/discontinued_example_unit.json'
import frontShowroomP14 from '../data/v8/displayRegister/front_showroom_p14.json'
import frontShowroomP7 from '../data/v8/displayRegister/front_showroom_p7.json'
import manifestGapList from '../data/v8/manifestGapList.json'
import { syncRegisterToManifest } from './v8SyncRegisterToManifest.js'

export const registerRecords = [frontShowroomP14, frontShowroomP7]
export const manifests = [kingsmanManifest, discontinuedManifest].map((manifest) =>
  syncRegisterToManifest(manifest, registerRecords),
)
export const gapList = manifestGapList

export function findSlotBundle(slotId) {
  const slot = registerRecords.find((record) => record.displaySlotId === slotId)
  const manifest = slot ? manifests.find((record) => record.unitId === slot.currentUnitRef) : null
  return { slot, manifest }
}
