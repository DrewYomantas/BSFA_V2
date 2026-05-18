import { useParams } from 'react-router-dom'
import SlotCustomerView from '../../components/v8/SlotCustomerView.jsx'
import { findSlotBundle } from '../../lib/v8LoadData.js'

export default function CustomerRoute() {
  const { slotId } = useParams()
  const { slot, manifest } = findSlotBundle(slotId)

  if (!slot || !manifest) return <main className="p-6">Slot not found.</main>
  return <SlotCustomerView manifest={manifest} slot={slot} />
}
