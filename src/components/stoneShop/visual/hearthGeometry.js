const VIEWBOX = { x: 0, y: 0, width: 520, height: 360 }
const DRAWING = { x: 92, y: 62, width: 330, height: 210 }

export function getHearthDrawingBounds() {
  return DRAWING
}

export function buildHearthGeometry(model) {
  const bounds = DRAWING
  const width = normalizeDimension(model?.dimensions?.widthInches, 96)
  const depth = normalizeDimension(model?.dimensions?.depthInches, 18)
  const scale = Math.min(bounds.width / width, bounds.height / depth)
  const shapeWidth = Math.max(150, width * scale)
  const shapeDepth = Math.max(80, depth * scale)
  const x = bounds.x + (bounds.width - shapeWidth) / 2
  const y = bounds.y + (bounds.height - shapeDepth) / 2
  const clipLeft = clampVisual(model?.dimensions?.leftClipInches, 18, shapeWidth / 3, scale)
  const clipRight = clampVisual(model?.dimensions?.rightClipInches, 18, shapeWidth / 3, scale)
  const angleLeft = clampVisual(model?.dimensions?.leftAngleInches, 24, shapeWidth / 3, scale)
  const angleRight = clampVisual(model?.dimensions?.rightAngleInches, 24, shapeWidth / 3, scale)
  const radiusDepth = clampVisual(model?.dimensions?.radiusDepthInches, 34, shapeDepth / 2, scale)

  if (model?.hearthShape === 'radius_front') {
    return {
      viewBox: VIEWBOX,
      bounds: { x, y, width: shapeWidth, depth: shapeDepth, scale },
      path: [
        `M ${x} ${y}`,
        `L ${x + shapeWidth} ${y}`,
        `L ${x + shapeWidth} ${y + shapeDepth - radiusDepth}`,
        `Q ${x + shapeWidth / 2} ${y + shapeDepth + radiusDepth} ${x} ${y + shapeDepth - radiusDepth}`,
        'Z',
      ].join(' '),
      markers: { radiusDepth },
    }
  }

  if (model?.hearthShape === 'clipped_corners') {
    return {
      viewBox: VIEWBOX,
      bounds: { x, y, width: shapeWidth, depth: shapeDepth, scale },
      points: [
        [x, y],
        [x + shapeWidth, y],
        [x + shapeWidth, y + shapeDepth - clipRight],
        [x + shapeWidth - clipRight, y + shapeDepth],
        [x + clipLeft, y + shapeDepth],
        [x, y + shapeDepth - clipLeft],
      ],
      markers: { clipLeft, clipRight },
    }
  }

  if (model?.hearthShape === 'angle_cuts') {
    return {
      viewBox: VIEWBOX,
      bounds: { x, y, width: shapeWidth, depth: shapeDepth, scale },
      points: [
        [x, y],
        [x + shapeWidth, y],
        [x + shapeWidth, y + shapeDepth - angleRight],
        [x + shapeWidth - angleRight, y + shapeDepth],
        [x + angleLeft, y + shapeDepth],
        [x, y + shapeDepth - angleLeft],
      ],
      markers: { angleLeft, angleRight },
    }
  }

  return {
    viewBox: VIEWBOX,
    bounds: { x, y, width: shapeWidth, depth: shapeDepth, scale },
    points: [
      [x, y],
      [x + shapeWidth, y],
      [x + shapeWidth, y + shapeDepth],
      [x, y + shapeDepth],
    ],
    markers: {},
  }
}

export function pointsToString(points) {
  return points.map(([x, y]) => `${round(x)},${round(y)}`).join(' ')
}

function normalizeDimension(value, fallback) {
  const n = Number(value)
  return Number.isFinite(n) && n > 0 ? n : fallback
}

function clampVisual(value, fallback, max, scale) {
  const n = Number(value)
  const raw = Number.isFinite(n) && n > 0 ? n * scale : fallback
  return Math.min(Math.max(raw, 14), max)
}

function round(value) {
  return Math.round(value * 10) / 10
}
