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
    hearthColor: '#a99778',
    mantelColor: '#7a5133',
  },
  {
    id: 'rustic-fieldstone-placeholder',
    label: 'Rustic Fieldstone Placeholder',
    note: 'Mixed lodge stone study',
    stoneColor: '#817667',
    hearthColor: '#5f554d',
    mantelColor: '#6c4429',
  },
  {
    id: 'cream-cast-stone-placeholder',
    label: 'Cream Cast Stone Placeholder',
    note: 'Quiet formal stone study',
    stoneColor: '#ded1b7',
    hearthColor: '#c8b99c',
    mantelColor: '#8a6947',
  },
  {
    id: 'dark-honed-hearth-placeholder',
    label: 'Dark Honed Hearth Placeholder',
    note: 'Darker hearth contrast study',
    stoneColor: '#a8997d',
    hearthColor: '#34312c',
    mantelColor: '#735033',
  },
]

export const HEARTH_STUDIO_V9_LIGHTING = [
  {
    id: 'showroom-warm',
    label: 'Showroom Warm',
    ambient: 0.55,
    key: 1.8,
    fill: 0.65,
    fire: 1.35,
    background: '#130f0b',
  },
  {
    id: 'morning-natural',
    label: 'Morning Natural',
    ambient: 0.78,
    key: 2.2,
    fill: 1.05,
    fire: 0.85,
    background: '#1b1712',
  },
  {
    id: 'golden-hour',
    label: 'Golden Hour',
    ambient: 0.48,
    key: 2.45,
    fill: 0.55,
    fire: 1.15,
    background: '#160d08',
  },
  {
    id: 'evening-firelight',
    label: 'Evening Firelight',
    ambient: 0.28,
    key: 0.95,
    fill: 0.35,
    fire: 2.25,
    background: '#090706',
  },
]

export const HEARTH_STUDIO_V9_CAMERAS = [
  { id: 'seated-view', label: 'Seated View', position: [5.2, 2.55, 7.4], target: [0, 2.35, -0.45], fov: 42 },
  { id: 'straight-on', label: 'Straight-On', position: [0, 2.65, 8.3], target: [0, 2.45, -0.55], fov: 38 },
  { id: 'side-depth', label: 'Side Depth', position: [7.3, 2.85, 4.8], target: [0, 2.0, -0.3], fov: 43 },
  { id: 'detail-view', label: 'Detail View', position: [2.8, 1.7, 4.35], target: [0, 1.55, -0.3], fov: 34 },
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
