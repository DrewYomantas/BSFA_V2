export const HEARTH_SHAPES = {
  BASIC: 'basic',
  CLIPPED_CORNERS: 'clipped_corners',
  ANGLE_CUTS: 'angle_cuts',
  RADIUS_FRONT: 'radius_front',
}

export const HEARTH_PACKET_TO_SHAPE = {
  hearth: HEARTH_SHAPES.BASIC,
  hearth_clipped_corners: HEARTH_SHAPES.CLIPPED_CORNERS,
  hearth_angle_cuts: HEARTH_SHAPES.ANGLE_CUTS,
  hearth_radius_front: HEARTH_SHAPES.RADIUS_FRONT,
}

export const HEARTH_SHAPE_TO_PACKET = {
  [HEARTH_SHAPES.BASIC]: 'hearth',
  [HEARTH_SHAPES.CLIPPED_CORNERS]: 'hearth_clipped_corners',
  [HEARTH_SHAPES.ANGLE_CUTS]: 'hearth_angle_cuts',
  [HEARTH_SHAPES.RADIUS_FRONT]: 'hearth_radius_front',
}

export const DEFAULT_CUSTOMER_HEARTH_MODEL = {
  pieceType: 'hearth',
  hearthShape: HEARTH_SHAPES.BASIC,
  dimensions: {
    widthInches: 72,
    depthInches: 18,
    thicknessInches: 2.25,
    leftClipInches: 6,
    rightClipInches: 6,
    leftAngleInches: 8,
    rightAngleInches: 8,
    radiusDepthInches: 6,
  },
  edgeTreatments: {
    front: '',
    back: '',
    left: '',
    right: '',
  },
  fabrication: {
    angleCuts: 0,
    notches: 0,
    holes: 0,
    cutouts: 0,
    radiusCorners: 0,
    radiusFrontEdge: false,
    polishLinearFeet: 0,
    customNotes: '',
  },
}

export function isHearthShape(shape) {
  return Object.values(HEARTH_SHAPES).includes(shape)
}

export function hearthShapeForPacketType(packetType) {
  return HEARTH_PACKET_TO_SHAPE[packetType] || HEARTH_SHAPES.BASIC
}

export function packetTypeForHearthShape(hearthShape) {
  return HEARTH_SHAPE_TO_PACKET[hearthShape] || 'hearth'
}

export function normalizeHearthModel(model = {}) {
  const base = DEFAULT_CUSTOMER_HEARTH_MODEL
  return {
    ...base,
    ...model,
    pieceType: 'hearth',
    hearthShape: isHearthShape(model.hearthShape) ? model.hearthShape : base.hearthShape,
    dimensions: {
      ...base.dimensions,
      ...(model.dimensions || {}),
    },
    edgeTreatments: {
      ...base.edgeTreatments,
      ...(model.edgeTreatments || {}),
    },
    fabrication: {
      ...base.fabrication,
      ...(model.fabrication || {}),
    },
  }
}

export function updateHearthDimension(model, field, value) {
  const nextValue = Number(value)
  return normalizeHearthModel({
    ...model,
    dimensions: {
      ...(model?.dimensions || {}),
      [field]: Number.isFinite(nextValue) ? Math.max(0, nextValue) : null,
    },
  })
}

export function updateHearthShape(model, hearthShape) {
  return normalizeHearthModel({
    ...model,
    hearthShape: isHearthShape(hearthShape) ? hearthShape : HEARTH_SHAPES.BASIC,
  })
}

export function buildStoneShopHearthModel(packet) {
  return normalizeHearthModel({
    hearthShape: hearthShapeForPacketType(packet?.packetType),
    dimensions: {
      widthInches: packet?.dimensions?.widthInches ?? null,
      depthInches: packet?.dimensions?.depthInches ?? null,
      thicknessInches: parseThickness(packet?.material?.thickness),
      leftClipInches: packet?.dimensions?.leftReturnInches ?? null,
      rightClipInches: packet?.dimensions?.rightReturnInches ?? null,
      leftAngleInches: packet?.dimensions?.leftAngleCutInches ?? null,
      rightAngleInches: packet?.dimensions?.rightAngleCutInches ?? null,
      radiusDepthInches: packet?.dimensions?.radiusDepthInches ?? null,
      frontRadiusInches: packet?.dimensions?.frontRadiusInches ?? null,
    },
    edgeTreatments: {
      front: packet?.edgeTreatments?.front || '',
      back: packet?.edgeTreatments?.back || '',
      left: packet?.edgeTreatments?.left || '',
      right: packet?.edgeTreatments?.right || '',
    },
    fabrication: {
      ...packet?.fabrication,
    },
  })
}

function parseThickness(thickness) {
  if (!thickness) return null
  const match = String(thickness).match(/(\d+(?:-\d+\/\d+|\.\d+)?|\d+\/\d+)/)
  return match ? match[0] : null
}
