import { useParams } from 'react-router-dom'
import SlotRepView from '../../components/v8/SlotRepView.jsx'
import { findSlotBundle } from '../../lib/v8LoadData.js'

export default function RepRoute() {
  const { slotId } = useParams()
  const { slot, manifest } = findSlotBundle(slotId)

  if (!slot || !manifest) return <main className="p-6">Slot not found.</main>
  return <SlotRepView manifest={manifest} slot={slot} />
}
