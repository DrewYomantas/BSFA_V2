import { Link } from 'react-router-dom'
import CustomerRecommendationPreview from '../../components/v8/CustomerRecommendationPreview.jsx'
import { manifests, registerRecords } from '../../lib/v8LoadData.js'
import { buildCustomerRecommendationPreviews } from '../../lib/v8ProofSliceContract.js'

export default function V8SliceIndex() {
  const previews = buildCustomerRecommendationPreviews(manifests, registerRecords)

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-semibold">Hearth Studio V8 Slice</h1>
      <ul className="mt-6 list-disc space-y-2 pl-5">
        <li><Link className="underline" to="/customer/front_showroom_p14">Customer: front_showroom_p14</Link></li>
        <li><Link className="underline" to="/customer/front_showroom_p7">Customer: front_showroom_p7</Link></li>
        <li><Link className="underline" to="/rep/front_showroom_p14">Rep: front_showroom_p14</Link></li>
        <li><Link className="underline" to="/rep/front_showroom_p7">Rep: front_showroom_p7</Link></li>
        <li><Link className="underline" to="/backstage/gap-list">Backstage gap list</Link></li>
        <li><Link className="underline" to="/v9-hearth-studio-3d">Open V9 Hearth Studio proof</Link></li>
      </ul>
      <CustomerRecommendationPreview previews={previews} />
    </main>
  )
}
