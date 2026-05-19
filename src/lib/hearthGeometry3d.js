import * as THREE from 'three'
import { HEARTH_SHAPES, normalizeHearthModel } from './sharedHearthModel.js'

const INCH_TO_SCENE = 1 / 12

export function inchesToSceneUnits(inches) {
  return Number(inches || 0) * INCH_TO_SCENE
}

export function buildHearthShapePoints(model) {
  const normalized = normalizeHearthModel(model)
  const width = Math.max(Number(normalized.dimensions.widthInches) || 72, 1)
  const depth = Math.max(Number(normalized.dimensions.depthInches) || 18, 1)
  const halfWidth = width / 2
  const back = -depth / 2
  const front = depth / 2
  const leftClip = clampInset(normalized.dimensions.leftClipInches, width, depth)
  const rightClip = clampInset(normalized.dimensions.rightClipInches, width, depth)
  const leftAngle = clampInset(normalized.dimensions.leftAngleInches, width, depth)
  const rightAngle = clampInset(normalized.dimensions.rightAngleInches, width, depth)
  const radiusDepth = Math.min(Math.max(Number(normalized.dimensions.radiusDepthInches) || 6, 1), depth * 0.65)

  if (normalized.hearthShape === HEARTH_SHAPES.CLIPPED_CORNERS) {
    return [
      [-halfWidth, back],
      [halfWidth, back],
      [halfWidth, front - rightClip],
      [halfWidth - rightClip, front],
      [-halfWidth + leftClip, front],
      [-halfWidth, front - leftClip],
    ]
  }

  if (normalized.hearthShape === HEARTH_SHAPES.ANGLE_CUTS) {
    return [
      [-halfWidth, back],
      [halfWidth, back],
      [halfWidth, front - rightAngle],
      [halfWidth - rightAngle, front],
      [-halfWidth + leftAngle, front],
      [-halfWidth, front - leftAngle],
    ]
  }

  if (normalized.hearthShape === HEARTH_SHAPES.RADIUS_FRONT) {
    const points = [
      [-halfWidth, back],
      [halfWidth, back],
      [halfWidth, front - radiusDepth],
    ]
    const steps = 14
    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps
      const x = halfWidth - width * t
      const curve = Math.sin(Math.PI * t) * radiusDepth
      points.push([x, front - radiusDepth + curve])
    }
    points.push([-halfWidth, back])
    return points
  }

  return [
    [-halfWidth, back],
    [halfWidth, back],
    [halfWidth, front],
    [-halfWidth, front],
  ]
}

export function createHearthExtrudeGeometry(model) {
  const normalized = normalizeHearthModel(model)
  const points = buildHearthShapePoints(normalized)
  const shape = new THREE.Shape()
  points.forEach(([x, z], index) => {
    const sx = inchesToSceneUnits(x)
    const sz = inchesToSceneUnits(z)
    if (index === 0) shape.moveTo(sx, sz)
    else shape.lineTo(sx, sz)
  })
  shape.closePath()
  const thickness = Math.max(Number(normalized.dimensions.thicknessInches) || 2.25, 0.5)
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: inchesToSceneUnits(thickness),
    bevelEnabled: false,
  })
  geometry.rotateX(-Math.PI / 2)
  geometry.center()
  geometry.computeVertexNormals()
  return geometry
}

export function buildHearthDimensionSummary(model) {
  const normalized = normalizeHearthModel(model)
  return {
    width: Number(normalized.dimensions.widthInches) || 0,
    depth: Number(normalized.dimensions.depthInches) || 0,
    thickness: Number(normalized.dimensions.thicknessInches) || 0,
    shape: normalized.hearthShape,
  }
}

function clampInset(value, width, depth) {
  const n = Number(value)
  const fallback = 6
  return Math.min(Math.max(Number.isFinite(n) && n > 0 ? n : fallback, 1), Math.min(width, depth) * 0.45)
}
