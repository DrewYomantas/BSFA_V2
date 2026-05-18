import ManifestGapList from '../../components/v8/ManifestGapList.jsx'
import { gapList } from '../../lib/v8LoadData.js'

export default function GapListRoute() {
  return <ManifestGapList gapList={gapList} />
}
