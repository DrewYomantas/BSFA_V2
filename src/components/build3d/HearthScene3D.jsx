import { Canvas } from '@react-three/fiber'
import HearthMesh from './HearthMesh.jsx'
import HearthDimensionOverlay from './HearthDimensionOverlay.jsx'
import SceneCameraControls from './SceneCameraControls.jsx'

export default function HearthScene3D({ model, cameraPreset, renderCanvas = true }) {
  return (
    <div className="build3d-scene" data-testid="hearth-3d-scene" data-shape={model.hearthShape}>
      {renderCanvas ? (
        <Canvas
          shadows
          camera={{ position: [5.2, 3.6, 5.2], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
        >
          <color attach="background" args={['#14110d']} />
          <ambientLight intensity={0.75} />
          <directionalLight position={[2, 5, 4]} intensity={1.7} castShadow />
          <RoomContext />
          <HearthMesh model={model} />
          <SceneCameraControls preset={cameraPreset} />
        </Canvas>
      ) : (
        <div className="build3d-scene__test-canvas" aria-label={`${model.hearthShape} 3D hearth scene`} />
      )}
      <HearthDimensionOverlay model={model} cameraPreset={cameraPreset} />
    </div>
  )
}

function RoomContext() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 1.25]} receiveShadow>
        <planeGeometry args={[10, 8]} />
        <meshStandardMaterial color="#2d251e" roughness={0.82} />
      </mesh>
      <mesh position={[0, 1.65, -1.04]} receiveShadow>
        <boxGeometry args={[8.5, 3.3, 0.18]} />
        <meshStandardMaterial color="#76695d" roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.02, -0.9]}>
        <boxGeometry args={[1.55, 1.26, 0.16]} />
        <meshStandardMaterial color="#11100e" roughness={0.6} />
      </mesh>
      <mesh position={[-1.05, 1.02, -0.82]}>
        <boxGeometry args={[0.28, 1.34, 0.26]} />
        <meshStandardMaterial color="#5f554b" roughness={0.84} />
      </mesh>
      <mesh position={[1.05, 1.02, -0.82]}>
        <boxGeometry args={[0.28, 1.34, 0.26]} />
        <meshStandardMaterial color="#5f554b" roughness={0.84} />
      </mesh>
      <mesh position={[0, 1.72, -0.78]}>
        <boxGeometry args={[2.15, 0.24, 0.28]} />
        <meshStandardMaterial color="#9d8a74" roughness={0.72} />
      </mesh>
      <mesh position={[0, 0.34, -0.8]}>
        <boxGeometry args={[2.15, 0.22, 0.24]} />
        <meshStandardMaterial color="#8e806f" roughness={0.76} />
      </mesh>
      <mesh position={[0, 0.012, 3.05]}>
        <boxGeometry args={[2.9, 0.024, 1.05]} />
        <meshStandardMaterial color="#4f3b31" roughness={0.88} />
      </mesh>
      <mesh position={[-4.2, 1.55, 1.1]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[4.8, 3.1]} />
        <meshStandardMaterial color="#40362f" roughness={0.9} />
      </mesh>
      <mesh position={[4.2, 1.55, 1.1]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[4.8, 3.1]} />
        <meshStandardMaterial color="#40362f" roughness={0.9} />
      </mesh>
    </group>
  )
}
