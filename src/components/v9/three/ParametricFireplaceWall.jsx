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
        <meshStandardMaterial color="#2a2119" roughness={0.82} />
      </mesh>
      <FloorPlanks />
      <mesh position={[0, 3.25, -1.08]} receiveShadow>
        <boxGeometry args={[11.5, 6.5, 0.2]} />
        <meshStandardMaterial color="#4b4035" roughness={0.94} />
      </mesh>
      <mesh position={[-5.78, 2.75, 1.35]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[5.1, 5.5]} />
        <meshStandardMaterial color="#2f251e" roughness={0.9} />
      </mesh>
      <mesh position={[5.78, 2.75, 1.35]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[5.1, 5.5]} />
        <meshStandardMaterial color="#2f251e" roughness={0.9} />
      </mesh>
      <WindowHint x={-4.35} />
      <WindowHint x={4.35} />
      <Beam position={[0, 5.75, -0.45]} scale={[0.3, 0.34, 6.2]} />
      <Beam position={[-2.7, 5.42, -0.28]} scale={[0.2, 0.28, 5.2]} />
      <Beam position={[2.7, 5.42, -0.28]} scale={[0.2, 0.28, 5.2]} />
    </group>
  )
}

function FireplaceAssembly({ scene, material }) {
  return (
    <group>
      <mesh position={[0, scene.stoneCenterY, -0.88]} castShadow receiveShadow>
        <boxGeometry args={[scene.chimneyWidth, scene.stoneHeight, 0.64]} />
        <meshStandardMaterial color={material.stoneColorDark} roughness={0.9} metalness={0.015} />
      </mesh>
      <mesh position={[0, scene.stoneHeight - 0.08, -0.5]} castShadow>
        <boxGeometry args={[scene.chimneyWidth + 0.18, 0.16, 0.38]} />
        <meshStandardMaterial color={material.stoneColorLight} roughness={0.86} />
      </mesh>
      <mesh position={[0, scene.surroundCenterY, -0.7]} castShadow receiveShadow>
        <boxGeometry args={[scene.surroundWidth, scene.surroundHeight, 0.78]} />
        <meshStandardMaterial color={material.stoneColor} roughness={0.88} metalness={0.015} />
      </mesh>
      <StoneCourses scene={scene} material={material} />
      <mesh position={[0, scene.openingCenterY, -0.31]} castShadow>
        <boxGeometry args={[scene.openingWidth + 0.42, scene.openingHeight + 0.44, 0.34]} />
        <meshStandardMaterial color="#2a221b" roughness={0.8} />
      </mesh>
      <mesh position={[0, scene.openingCenterY, -0.12]} castShadow>
        <boxGeometry args={[scene.openingWidth, scene.openingHeight, 0.22]} />
        <meshStandardMaterial color="#0d0b09" roughness={0.74} />
      </mesh>
      <FireboxLining scene={scene} />
      <FireGlow scene={scene} />
      <mesh position={[0, scene.hearthCenterY, scene.hearthCenterZ + 0.05]} castShadow receiveShadow>
        <boxGeometry args={[scene.hearthWidth, scene.hearthHeight, scene.hearthDepth]} />
        <meshStandardMaterial color={material.hearthColor} roughness={0.8} metalness={0.03} />
      </mesh>
      <mesh position={[0, scene.hearthHeight + 0.08, scene.hearthCenterZ + 0.11]} castShadow>
        <boxGeometry args={[scene.hearthWidth * 0.98, 0.035, scene.hearthDepth * 0.94]} />
        <meshStandardMaterial color={material.stoneColorLight} roughness={0.74} />
      </mesh>
      <mesh position={[0, scene.mantelCenterY, -0.16]} castShadow receiveShadow>
        <boxGeometry args={[scene.surroundWidth + 0.64, 0.23, 0.64]} />
        <meshStandardMaterial color={material.mantelColor} roughness={0.62} />
      </mesh>
      <MantelDetails scene={scene} material={material} />
      <OpeningTrim scene={scene} material={material} />
    </group>
  )
}

function StoneCourses({ scene, material }) {
  const courses = []
  const rows = 16
  for (let row = 0; row < rows; row += 1) {
    const y = scene.stoneCenterY - scene.stoneHeight / 2 + (row + 0.55) * (scene.stoneHeight / rows)
    const pieces = row % 3 === 0 ? 5 : 6
    for (let piece = 0; piece < pieces; piece += 1) {
      const onLowerMass = y < scene.surroundHeight
      const wallWidth = onLowerMass ? scene.surroundWidth : scene.chimneyWidth
      const width = wallWidth / pieces
      const x = -wallWidth / 2 + width * piece + width / 2
      const shade = stoneShade(material, row, piece)
      const depth = 0.065 + ((row + piece) % 3) * 0.018
      const z = onLowerMass ? -0.255 : -0.515
      courses.push(
        <mesh key={`${row}-${piece}`} position={[x, y, z]} castShadow receiveShadow>
          <boxGeometry args={[width * 0.84, 0.075, depth]} />
          <meshStandardMaterial color={shade} roughness={0.96} />
        </mesh>,
      )
    }
  }
  return <group>{courses}</group>
}

function FireboxLining({ scene }) {
  const lines = []
  for (let i = 0; i < 7; i += 1) {
    lines.push(
      <mesh key={`firebox-line-${i}`} position={[0, scene.openingCenterY - scene.openingHeight / 2 + 0.18 + i * (scene.openingHeight / 7), 0.015]}>
        <boxGeometry args={[scene.openingWidth * 0.78, 0.018, 0.03]} />
        <meshStandardMaterial color="#4c3322" roughness={0.82} />
      </mesh>,
    )
  }

  return (
    <group>
      <mesh position={[0, scene.openingCenterY, 0.01]}>
        <boxGeometry args={[scene.openingWidth * 0.84, scene.openingHeight * 0.82, 0.045]} />
        <meshStandardMaterial color="#221713" roughness={0.86} emissive="#3d1b0f" emissiveIntensity={0.12} />
      </mesh>
      {lines}
    </group>
  )
}

function FireGlow({ scene }) {
  return (
    <group position={[0, scene.openingCenterY - scene.openingHeight * 0.27, 0.08]}>
      <mesh>
        <boxGeometry args={[scene.openingWidth * 0.48, scene.openingHeight * 0.18, 0.035]} />
        <meshStandardMaterial color="#f5a14d" emissive="#df5c18" emissiveIntensity={0.82} transparent opacity={0.84} roughness={0.5} />
      </mesh>
      <mesh position={[0, -scene.openingHeight * 0.06, 0.04]}>
        <boxGeometry args={[scene.openingWidth * 0.62, 0.05, 0.07]} />
        <meshStandardMaterial color="#2b170d" roughness={0.78} />
      </mesh>
      <mesh position={[-scene.openingWidth * 0.16, -scene.openingHeight * 0.08, 0.08]} rotation={[0, 0, 0.16]}>
        <boxGeometry args={[scene.openingWidth * 0.32, 0.055, 0.09]} />
        <meshStandardMaterial color="#2b160c" roughness={0.72} />
      </mesh>
      <mesh position={[scene.openingWidth * 0.16, -scene.openingHeight * 0.08, 0.08]} rotation={[0, 0, -0.16]}>
        <boxGeometry args={[scene.openingWidth * 0.32, 0.055, 0.09]} />
        <meshStandardMaterial color="#2b160c" roughness={0.72} />
      </mesh>
    </group>
  )
}

function MantelDetails({ scene, material }) {
  return (
    <group>
      <mesh position={[-scene.surroundWidth * 0.32, scene.mantelCenterY - 0.27, -0.18]} castShadow>
        <boxGeometry args={[0.24, 0.28, 0.42]} />
        <meshStandardMaterial color={material.mantelColor} roughness={0.66} />
      </mesh>
      <mesh position={[scene.surroundWidth * 0.32, scene.mantelCenterY - 0.27, -0.18]} castShadow>
        <boxGeometry args={[0.24, 0.28, 0.42]} />
        <meshStandardMaterial color={material.mantelColor} roughness={0.66} />
      </mesh>
      <mesh position={[0, scene.mantelCenterY + 0.03, 0.18]} castShadow>
        <boxGeometry args={[scene.surroundWidth + 0.52, 0.035, 0.04]} />
        <meshStandardMaterial color="#c28b55" roughness={0.7} />
      </mesh>
    </group>
  )
}

function OpeningTrim({ scene, material }) {
  const trimColor = material.stoneColorLight
  return (
    <group>
      <mesh position={[0, scene.openingCenterY + scene.openingHeight / 2 + 0.13, -0.04]} castShadow>
        <boxGeometry args={[scene.openingWidth + 0.52, 0.16, 0.22]} />
        <meshStandardMaterial color={trimColor} roughness={0.82} />
      </mesh>
      <mesh position={[0, scene.openingCenterY - scene.openingHeight / 2 - 0.13, -0.04]} castShadow>
        <boxGeometry args={[scene.openingWidth + 0.52, 0.16, 0.22]} />
        <meshStandardMaterial color={trimColor} roughness={0.82} />
      </mesh>
      <mesh position={[-scene.openingWidth / 2 - 0.14, scene.openingCenterY, -0.04]} castShadow>
        <boxGeometry args={[0.16, scene.openingHeight + 0.26, 0.22]} />
        <meshStandardMaterial color={trimColor} roughness={0.82} />
      </mesh>
      <mesh position={[scene.openingWidth / 2 + 0.14, scene.openingCenterY, -0.04]} castShadow>
        <boxGeometry args={[0.16, scene.openingHeight + 0.26, 0.22]} />
        <meshStandardMaterial color={trimColor} roughness={0.82} />
      </mesh>
    </group>
  )
}

function RepScaleOverlay({ scene }) {
  return (
    <group>
      <mesh position={[0, scene.stoneHeight + 0.12, -0.37]}>
        <boxGeometry args={[scene.chimneyWidth + 0.65, 0.025, 0.025]} />
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
    <group position={[x, 2.48, -0.92]}>
      <mesh>
        <boxGeometry args={[0.92, 2.18, 0.08]} />
        <meshStandardMaterial color="#18201f" roughness={0.45} />
      </mesh>
      <mesh position={[0, 0, 0.055]}>
        <boxGeometry args={[0.72, 1.94, 0.035]} />
        <meshStandardMaterial color="#a6b29e" emissive="#8fa38d" emissiveIntensity={0.08} roughness={0.36} />
      </mesh>
      <mesh position={[0, 0, 0.09]}>
        <boxGeometry args={[0.045, 1.94, 0.04]} />
        <meshStandardMaterial color="#3b2a1e" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0, 0.09]}>
        <boxGeometry args={[0.72, 0.045, 0.04]} />
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

function FloorPlanks() {
  const planks = []
  for (let i = 0; i < 12; i += 1) {
    const x = -6.4 + i * 1.16
    planks.push(
      <mesh key={i} position={[x, 0.012, 1.78]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1.04, 12.8]} />
        <meshStandardMaterial color={i % 2 === 0 ? '#332419' : '#2d2017'} roughness={0.84} />
      </mesh>,
    )
  }
  return <group>{planks}</group>
}

function buildSceneDimensions(dimensions) {
  const hearthWidth = dimensions.hearthWidth * INCHES_TO_FEET
  const hearthDepth = dimensions.hearthDepth * INCHES_TO_FEET
  const hearthHeight = dimensions.hearthHeight * INCHES_TO_FEET
  const openingWidth = dimensions.openingWidth * INCHES_TO_FEET
  const openingHeight = dimensions.openingHeight * INCHES_TO_FEET
  const mantelHeight = dimensions.mantelHeight * INCHES_TO_FEET
  const stoneHeight = dimensions.stoneHeight * INCHES_TO_FEET
  const surroundWidth = Math.max(hearthWidth * 0.72, openingWidth + 1.35)
  const chimneyWidth = Math.max(surroundWidth * 0.72, openingWidth + 0.86)
  const surroundHeight = Math.min(stoneHeight, Math.max(mantelHeight + 0.64, openingHeight + hearthHeight + 1.18))

  return {
    hearthWidth,
    hearthDepth,
    hearthHeight,
    openingWidth,
    openingHeight,
    mantelHeight,
    stoneHeight,
    surroundWidth,
    surroundHeight,
    chimneyWidth,
    stoneCenterY: stoneHeight / 2,
    surroundCenterY: surroundHeight / 2,
    hearthCenterY: hearthHeight / 2,
    hearthCenterZ: hearthDepth / 2 - 0.18,
    openingCenterY: hearthHeight + openingHeight / 2 + 0.32,
    mantelCenterY: mantelHeight,
  }
}

function stoneShade(material, row, piece) {
  const palette = [material.stoneColor, material.stoneColorDark, material.stoneColorLight]
  return palette[(row * 2 + piece) % palette.length]
}
