import { Canvas, useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'
import ParametricFireplaceWall from './ParametricFireplaceWall.jsx'
import { getV9Camera, getV9Lighting, getV9Material } from '../../../data/v9/hearthStudioSeed.js'

export default function HearthRoomScene({ state, renderCanvas = true }) {
  const material = getV9Material(state.materialId)
  const lighting = getV9Lighting(state.lightingId)
  const camera = getV9Camera(state.cameraId)

  if (!renderCanvas) {
    return (
      <div
        className="v9-studio-scene v9-studio-scene--fallback"
        data-testid="v9-hearth-scene"
        data-material={material.label}
        data-lighting={lighting.label}
        data-camera={camera.label}
      >
        <div className="v9-studio-scene__fallback-wall">
          <span />
          <strong />
          <em />
        </div>
      </div>
    )
  }

  return (
    <div
      className="v9-studio-scene"
      data-testid="v9-hearth-scene"
      data-material={material.label}
      data-lighting={lighting.label}
      data-camera={camera.label}
    >
      <Canvas shadows camera={{ position: camera.position, fov: camera.fov }} gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={[lighting.background]} />
        <fog attach="fog" args={[lighting.background, 9, 18]} />
        <ambientLight intensity={lighting.ambient} />
        <directionalLight position={[-3, 6, 5]} intensity={lighting.key} castShadow shadow-mapSize={[1024, 1024]} />
        <pointLight position={[0, 1.2, 1.25]} color="#ff8a2f" intensity={lighting.fire} distance={5} />
        <pointLight position={[4.2, 2.8, 2.6]} color="#f6d49a" intensity={lighting.fill} distance={8} />
        <CameraPose cameraPreset={camera} />
        <ParametricFireplaceWall state={state} material={material} repOverlayOpen={state.repOverlayOpen} />
      </Canvas>
    </div>
  )
}

function CameraPose({ cameraPreset }) {
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(...cameraPreset.position)
    camera.fov = cameraPreset.fov
    camera.lookAt(new THREE.Vector3(...cameraPreset.target))
    camera.updateProjectionMatrix()
  }, [camera, cameraPreset])

  return null
}
