export const HEARTH_STUDIO_V9_DIMENSION_RANGES = {
  hearthWidth: { label: 'Hearth width', min: 48, max: 132, step: 1, unit: 'in' },
  hearthDepth: { label: 'Hearth depth', min: 12, max: 36, step: 1, unit: 'in' },
  hearthHeight: { label: 'Hearth height', min: 2, max: 12, step: 0.5, unit: 'in' },
  openingWidth: { label: 'Fireplace opening width', min: 28, max: 72, step: 1, unit: 'in' },
  openingHeight: { label: 'Fireplace opening height', min: 20, max: 56, step: 1, unit: 'in' },
  mantelHeight: { label: 'Mantel height', min: 48, max: 84, step: 1, unit: 'in' },
  stoneHeight: { label: 'Stone height', min: 72, max: 156, step: 1, unit: 'in' },
}

export const HEARTH_STUDIO_V9_DEFAULT_STATE = {
  dimensions: {
    hearthWidth: 84,
    hearthDepth: 20,
    hearthHeight: 5,
    openingWidth: 42,
    openingHeight: 32,
    mantelHeight: 61,
    stoneHeight: 112,
  },
  materialId: 'warm-limestone-placeholder',
  lightingId: 'showroom-warm',
  cameraId: 'seated-view',
  repOverlayOpen: false,
}

export const HEARTH_STUDIO_V9_MATERIALS = [
  {
    id: 'warm-limestone-placeholder',
    label: 'Warm Limestone Placeholder',
    note: 'Soft cream stone study',
    stoneColor: '#c7b48f',
    stoneColorDark: '#9d8c70',
    stoneColorLight: '#e0d0ad',
    hearthColor: '#a99778',
    mantelColor: '#7a5133',
  },
  {
    id: 'rustic-fieldstone-placeholder',
    label: 'Rustic Fieldstone Placeholder',
    note: 'Mixed lodge stone study',
    stoneColor: '#817667',
    stoneColorDark: '#5e554b',
    stoneColorLight: '#a6967f',
    hearthColor: '#5f554d',
    mantelColor: '#6c4429',
  },
  {
    id: 'cream-cast-stone-placeholder',
    label: 'Cream Cast Stone Placeholder',
    note: 'Quiet formal stone study',
    stoneColor: '#ded1b7',
    stoneColorDark: '#b9ab90',
    stoneColorLight: '#f0e4ca',
    hearthColor: '#c8b99c',
    mantelColor: '#8a6947',
  },
  {
    id: 'dark-honed-hearth-placeholder',
    label: 'Dark Honed Hearth Placeholder',
    note: 'Darker hearth contrast study',
    stoneColor: '#a8997d',
    stoneColorDark: '#7d715e',
    stoneColorLight: '#cabc9d',
    hearthColor: '#34312c',
    mantelColor: '#735033',
  },
]

export const HEARTH_STUDIO_V9_LIGHTING = [
  {
    id: 'showroom-warm',
    label: 'Showroom Warm',
    ambient: 0.55,
    key: 1.55,
    fill: 0.72,
    fire: 1.05,
    background: '#130f0b',
  },
  {
    id: 'morning-natural',
    label: 'Morning Natural',
    ambient: 0.86,
    key: 2.05,
    fill: 1.12,
    fire: 0.48,
    background: '#191713',
  },
  {
    id: 'golden-hour',
    label: 'Golden Hour',
    ambient: 0.44,
    key: 2.08,
    fill: 0.5,
    fire: 0.88,
    background: '#170e09',
  },
  {
    id: 'evening-firelight',
    label: 'Evening Firelight',
    ambient: 0.31,
    key: 0.72,
    fill: 0.26,
    fire: 1.7,
    background: '#090706',
  },
]

export const HEARTH_STUDIO_V9_CAMERAS = [
  { id: 'seated-view', label: 'Seated View', position: [5.0, 2.25, 11.4], target: [0, 2.28, -0.55], fov: 40 },
  { id: 'straight-on', label: 'Straight-On', position: [0, 2.7, 9.8], target: [0, 2.55, -0.62], fov: 36 },
  { id: 'side-depth', label: 'Side Depth', position: [7.35, 2.8, 6.45], target: [0, 2.28, -0.38], fov: 40 },
  { id: 'detail-view', label: 'Detail View', position: [2.95, 1.88, 5.75], target: [0, 1.68, -0.35], fov: 32 },
]

const CUSTOMER_COPY_BANNED_TERMS = [
  'Needs Verification',
  'internal',
  'cost',
  'margin',
  'SKU',
  'BisTrack',
  'vendor',
  'compatibility',
  'fabrication',
]

export function getV9Material(materialId) {
  return HEARTH_STUDIO_V9_MATERIALS.find((material) => material.id === materialId) ?? HEARTH_STUDIO_V9_MATERIALS[0]
}

export function getV9Lighting(lightingId) {
  return HEARTH_STUDIO_V9_LIGHTING.find((lighting) => lighting.id === lightingId) ?? HEARTH_STUDIO_V9_LIGHTING[0]
}

export function getV9Camera(cameraId) {
  return HEARTH_STUDIO_V9_CAMERAS.find((camera) => camera.id === cameraId) ?? HEARTH_STUDIO_V9_CAMERAS[0]
}

export function updateHearthStudioV9Dimension(state, field, value) {
  const range = HEARTH_STUDIO_V9_DIMENSION_RANGES[field]
  if (!range) return state

  const numeric = Number(value)
  const next = Number.isFinite(numeric) ? numeric : state.dimensions[field]
  const clamped = Math.min(Math.max(next, range.min), range.max)
  const stepped = Math.round(clamped / range.step) * range.step

  return {
    ...state,
    dimensions: {
      ...state.dimensions,
      [field]: Number(stepped.toFixed(2)),
    },
  }
}

export function buildHearthStudioV9CustomerSummary(state) {
  const dimensions = state.dimensions
  return [
    `Hearth study: ${formatInches(dimensions.hearthWidth)} wide, ${formatInches(dimensions.hearthDepth)} deep, ${formatInches(dimensions.hearthHeight)} high.`,
    `Opening study: ${formatInches(dimensions.openingWidth)} wide by ${formatInches(dimensions.openingHeight)} high.`,
    `Mantel height is shown at ${formatInches(dimensions.mantelHeight)} with stone mass rising to ${formatInches(dimensions.stoneHeight)}.`,
  ]
}

export function scanV9CustomerSummaryCopy(text) {
  const copy = Array.isArray(text) ? text.join(' ') : String(text ?? '')
  return CUSTOMER_COPY_BANNED_TERMS.filter((term) => copy.toLowerCase().includes(term.toLowerCase()))
}

export function formatInches(value) {
  return `${Number(value).toLocaleString(undefined, { maximumFractionDigits: 1 })} in`
}
