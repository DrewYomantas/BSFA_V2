import { Link } from 'react-router-dom'

export default function V8SliceIndex() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-semibold">Hearth Studio V8 Slice</h1>
      <ul className="mt-6 list-disc space-y-2 pl-5">
        <li><Link className="underline" to="/customer/front_showroom_p14">Customer: front_showroom_p14</Link></li>
        <li><Link className="underline" to="/customer/front_showroom_p7">Customer: front_showroom_p7</Link></li>
        <li><Link className="underline" to="/rep/front_showroom_p14">Rep: front_showroom_p14</Link></li>
        <li><Link className="underline" to="/rep/front_showroom_p7">Rep: front_showroom_p7</Link></li>
        <li><Link className="underline" to="/backstage/gap-list">Backstage gap list</Link></li>
      </ul>
    </main>
  )
}
