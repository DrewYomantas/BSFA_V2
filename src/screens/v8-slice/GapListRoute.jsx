import ManifestGapList from '../../components/v8/ManifestGapList.jsx'
import { gapList, manifests, registerRecords } from '../../lib/v8LoadData.js'
import { buildV8ProofSliceHealth } from '../../lib/v8ProofSliceContract.js'

export default function GapListRoute() {
  const health = buildV8ProofSliceHealth({ manifests, registerRecords, gapList })
  return <ManifestGapList gapList={{ ...gapList, health }} />
}
