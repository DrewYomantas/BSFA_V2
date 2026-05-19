const HEARTH_PACKET_TO_SHAPE = {
  hearth: 'basic',
  hearth_clipped_corners: 'clipped_corners',
  hearth_angle_cuts: 'angle_cuts',
  hearth_radius_front: 'radius_front',
}

const HEARTH_SHAPE_TO_PACKET = {
  basic: 'hearth',
  clipped_corners: 'hearth_clipped_corners',
  angle_cuts: 'hearth_angle_cuts',
  radius_front: 'hearth_radius_front',
}

export function isHearthVisualPacket(packetType) {
  return Object.prototype.hasOwnProperty.call(HEARTH_PACKET_TO_SHAPE, packetType)
}

export function hearthShapeForPacketType(packetType) {
  return HEARTH_PACKET_TO_SHAPE[packetType] || 'basic'
}

export function packetTypeForHearthShape(hearthShape) {
  return HEARTH_SHAPE_TO_PACKET[hearthShape] || 'hearth'
}

export function buildStoneShopShapeModel(packet) {
  const hearthShape = hearthShapeForPacketType(packet?.packetType)
  return {
    pieceType: 'hearth',
    hearthShape,
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
  }
}

export function getNextHearthVisualTarget(packet) {
  const model = buildStoneShopShapeModel(packet)
  const dimensions = model.dimensions
  if (!dimensions.widthInches) return { target: 'width', copy: 'Start with overall width.' }
  if (!dimensions.depthInches) return { target: 'depth', copy: 'Now enter hearth depth.' }
  if (model.hearthShape === 'clipped_corners' && (!dimensions.leftClipInches || !dimensions.rightClipInches)) {
    return { target: 'corner', copy: 'Confirm left and right clipped corner dimensions.' }
  }
  if (model.hearthShape === 'angle_cuts' && (!dimensions.leftAngleInches || !dimensions.rightAngleInches)) {
    return { target: 'corner', copy: 'Confirm the left and right angle cut dimensions.' }
  }
  if (model.hearthShape === 'radius_front' && !dimensions.radiusDepthInches) {
    return { target: 'front-edge', copy: 'Enter the radius depth for the curved front.' }
  }
  if (!model.edgeTreatments.front) {
    return { target: 'front-edge', copy: 'Confirm whether the front edge is polished, radius, or eased.' }
  }
  if (!packet?.verification?.fieldMeasureConfirmed) {
    return { target: 'field-measure', copy: 'Confirm field measure before releasing to shop.' }
  }
  return { target: 'surface', copy: 'Review surface features, notes, and shop handoff.' }
}

export function isShapedHearth(packetType) {
  return ['hearth_clipped_corners', 'hearth_angle_cuts', 'hearth_radius_front'].includes(packetType)
}

function parseThickness(thickness) {
  if (!thickness) return null
  const match = String(thickness).match(/(\d+(?:-\d+\/\d+|\.\d+)?|\d+\/\d+)/)
  return match ? match[0] : null
}
