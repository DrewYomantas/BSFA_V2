import { useMemo } from 'react'
import { createHearthExtrudeGeometry } from '../../lib/hearthGeometry3d.js'

export default function HearthMesh({ model }) {
  const geometry = useMemo(() => createHearthExtrudeGeometry(model), [model])

  return (
    <mesh geometry={geometry} position={[0, 0.08, 0.95]} castShadow receiveShadow>
      <meshStandardMaterial color="#b9b0a3" roughness={0.68} metalness={0.03} />
    </mesh>
  )
}
