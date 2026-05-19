import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

const CAMERA_PRESETS = {
  perspective: { position: [5.2, 3.6, 5.2], zoom: 1 },
  front: { position: [0, 2.2, 7.4], zoom: 1.15 },
  top: { position: [0, 8.2, 0.02], zoom: 1.05 },
}

export default function SceneCameraControls({ preset }) {
  const { camera } = useThree()

  useEffect(() => {
    const next = CAMERA_PRESETS[preset] || CAMERA_PRESETS.perspective
    camera.position.set(...next.position)
    camera.zoom = next.zoom
    camera.lookAt(0, 0.45, 0.6)
    camera.updateProjectionMatrix()
  }, [camera, preset])

  return null
}
