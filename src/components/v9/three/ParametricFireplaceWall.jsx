import { useMemo } from 'react'

const INCHES_TO_FEET = 1 / 12

export default function ParametricFireplaceWall({ state, material, repOverlayOpen }) {
  const scene = useMemo(() => buildSceneDimensions(state.dimensions), [state.dimensions])

  return (
    <group>
      <RoomShell />
      <FireplaceAssembly scene={scene} material={material} />
      {repOverlayOpen && <RepScaleOverlay scene={scene} />}
    </group>
  )
}

function RoomShell() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 1.75]} receiveShadow>
        <planeGeometry args={[14, 13]} />
        <meshStandardMaterial color="#2c2118" roughness={0.76} />
      </mesh>
      <mesh position={[0, 3.25, -1.08]} receiveShadow>
        <boxGeometry args={[11.5, 6.5, 0.2]} />
        <meshStandardMaterial color="#4e4032" roughness={0.92} />
      </mesh>
      <mesh position={[-5.75, 3.1, 1.45]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[5.6, 6.2]} />
        <meshStandardMaterial color="#332820" roughness={0.88} />
      </mesh>
      <mesh position={[5.75, 3.1, 1.45]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[5.6, 6.2]} />
        <meshStandardMaterial color="#332820" roughness={0.88} />
      </mesh>
      <WindowHint x={-4.15} />
      <WindowHint x={4.15} />
      <Beam position={[0, 5.65, -0.7]} scale={[0.35, 0.38, 6.8]} />
      <Beam position={[-3.2, 5.35, 1.2]} rotation={[0.52, 0, 0]} scale={[0.28, 0.34, 6.8]} />
      <Beam position={[3.2, 5.35, 1.2]} rotation={[0.52, 0, 0]} scale={[0.28, 0.34, 6.8]} />
    </group>
  )
}

function FireplaceAssembly({ scene, material }) {
  return (
    <group>
      <mesh position={[0, scene.stoneCenterY, -0.82]} castShadow receiveShadow>
        <boxGeometry args={[scene.stoneWidth, scene.stoneHeight, 0.72]} />
        <meshStandardMaterial color={material.stoneColor} roughness={0.86} metalness={0.02} />
      </mesh>
      <StoneCourses scene={scene} color={material.stoneColor} />
      <mesh position={[0, scene.openingCenterY, -0.42]} castShadow>
        <boxGeometry args={[scene.openingWidth, scene.openingHeight, 0.18]} />
        <meshStandardMaterial color="#090806" roughness={0.68} />
      </mesh>
      <mesh position={[0, scene.openingCenterY - 0.06, -0.28]} castShadow>
        <boxGeometry args={[scene.openingWidth * 0.76, scene.openingHeight * 0.72, 0.08]} />
        <meshStandardMaterial color="#2b1308" emissive="#d65c17" emissiveIntensity={0.32} roughness={0.7} />
      </mesh>
      <FireGlow scene={scene} />
      <mesh position={[0, scene.hearthCenterY, scene.hearthCenterZ]} castShadow receiveShadow>
        <boxGeometry args={[scene.hearthWidth, scene.hearthHeight, scene.hearthDepth]} />
        <meshStandardMaterial color={material.hearthColor} roughness={0.8} metalness={0.03} />
      </mesh>
      <mesh position={[0, scene.mantelCenterY, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[scene.stoneWidth + 0.58, 0.28, 0.56]} />
        <meshStandardMaterial color={material.mantelColor} roughness={0.62} />
      </mesh>
      <mesh position={[-scene.stoneWidth / 2 - 0.02, scene.openingCenterY, -0.35]} castShadow>
        <boxGeometry args={[0.16, scene.openingHeight + 0.45, 0.28]} />
        <meshStandardMaterial color={material.stoneColor} roughness={0.8} />
      </mesh>
      <mesh position={[scene.stoneWidth / 2 + 0.02, scene.openingCenterY, -0.35]} castShadow>
        <boxGeometry args={[0.16, scene.openingHeight + 0.45, 0.28]} />
        <meshStandardMaterial color={material.stoneColor} roughness={0.8} />
      </mesh>
    </group>
  )
}

function StoneCourses({ scene, color }) {
  const courses = []
  const rows = 13
  for (let row = 0; row < rows; row += 1) {
    const y = scene.stoneCenterY - scene.stoneHeight / 2 + (row + 0.55) * (scene.stoneHeight / rows)
    const pieces = row % 2 === 0 ? 5 : 6
    for (let piece = 0; piece < pieces; piece += 1) {
      const width = scene.stoneWidth / pieces
      const x = -scene.stoneWidth / 2 + width * piece + width / 2
      courses.push(
        <mesh key={`${row}-${piece}`} position={[x, y, -0.435]}>
          <boxGeometry args={[width * 0.92, 0.045, 0.035]} />
          <meshStandardMaterial color={color} roughness={0.95} />
        </mesh>,
      )
    }
  }
  return <group>{courses}</group>
}

function FireGlow({ scene }) {
  return (
    <group position={[0, scene.openingCenterY - scene.openingHeight * 0.18, -0.19]}>
      <mesh>
        <coneGeometry args={[0.34, 0.9, 5]} />
        <meshStandardMaterial color="#ffb23d" emissive="#ff6a16" emissiveIntensity={1.15} roughness={0.42} />
      </mesh>
      <mesh position={[-0.28, -0.13, 0.02]} rotation={[0, 0, 0.55]}>
        <boxGeometry args={[0.52, 0.08, 0.1]} />
        <meshStandardMaterial color="#2b160c" roughness={0.72} />
      </mesh>
      <mesh position={[0.28, -0.13, 0.02]} rotation={[0, 0, -0.55]}>
        <boxGeometry args={[0.52, 0.08, 0.1]} />
        <meshStandardMaterial color="#2b160c" roughness={0.72} />
      </mesh>
    </group>
  )
}

function RepScaleOverlay({ scene }) {
  return (
    <group>
      <mesh position={[0, scene.stoneHeight + 0.12, -0.37]}>
        <boxGeometry args={[scene.stoneWidth + 0.65, 0.025, 0.025]} />
        <meshBasicMaterial color="#f2d38d" />
      </mesh>
      <mesh position={[scene.hearthWidth / 2 + 0.12, scene.hearthHeight + 0.02, scene.hearthDepth / 2 - 0.15]}>
        <boxGeometry args={[0.025, 0.025, scene.hearthDepth]} />
        <meshBasicMaterial color="#f2d38d" />
      </mesh>
      <mesh position={[-scene.openingWidth / 2, scene.openingCenterY, -0.24]}>
        <boxGeometry args={[0.025, scene.openingHeight, 0.025]} />
        <meshBasicMaterial color="#f2d38d" />
      </mesh>
      <mesh position={[scene.openingWidth / 2, scene.openingCenterY, -0.24]}>
        <boxGeometry args={[0.025, scene.openingHeight, 0.025]} />
        <meshBasicMaterial color="#f2d38d" />
      </mesh>
    </group>
  )
}

function WindowHint({ x }) {
  return (
    <group position={[x, 2.7, -0.92]}>
      <mesh>
        <boxGeometry args={[1.08, 2.6, 0.08]} />
        <meshStandardMaterial color="#18201f" roughness={0.45} />
      </mesh>
      <mesh position={[0, 0, 0.055]}>
        <boxGeometry args={[0.88, 2.34, 0.035]} />
        <meshStandardMaterial color="#aebcaf" emissive="#8fa38d" emissiveIntensity={0.12} roughness={0.32} />
      </mesh>
      <mesh position={[0, 0, 0.09]}>
        <boxGeometry args={[0.05, 2.34, 0.04]} />
        <meshStandardMaterial color="#3b2a1e" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0, 0.09]}>
        <boxGeometry args={[0.88, 0.05, 0.04]} />
        <meshStandardMaterial color="#3b2a1e" roughness={0.7} />
      </mesh>
    </group>
  )
}

function Beam({ position, rotation = [0, 0, 0], scale }) {
  return (
    <mesh position={position} rotation={rotation} castShadow>
      <boxGeometry args={scale} />
      <meshStandardMaterial color="#4b2f1d" roughness={0.72} />
    </mesh>
  )
}

function buildSceneDimensions(dimensions) {
  const hearthWidth = dimensions.hearthWidth * INCHES_TO_FEET
  const hearthDepth = dimensions.hearthDepth * INCHES_TO_FEET
  const hearthHeight = dimensions.hearthHeight * INCHES_TO_FEET
  const openingWidth = dimensions.openingWidth * INCHES_TO_FEET
  const openingHeight = dimensions.openingHeight * INCHES_TO_FEET
  const mantelHeight = dimensions.mantelHeight * INCHES_TO_FEET
  const stoneHeight = dimensions.stoneHeight * INCHES_TO_FEET
  const stoneWidth = Math.max(hearthWidth * 0.72, openingWidth + 1.15)

  return {
    hearthWidth,
    hearthDepth,
    hearthHeight,
    openingWidth,
    openingHeight,
    mantelHeight,
    stoneHeight,
    stoneWidth,
    stoneCenterY: stoneHeight / 2,
    hearthCenterY: hearthHeight / 2,
    hearthCenterZ: hearthDepth / 2 - 0.18,
    openingCenterY: hearthHeight + openingHeight / 2 + 0.32,
    mantelCenterY: mantelHeight,
  }
}
