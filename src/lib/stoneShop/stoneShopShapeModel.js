import {
  HEARTH_PACKET_TO_SHAPE,
  buildStoneShopHearthModel,
  hearthShapeForPacketType,
  packetTypeForHearthShape,
} from '../sharedHearthModel.js'

export function isHearthVisualPacket(packetType) {
  return Object.prototype.hasOwnProperty.call(HEARTH_PACKET_TO_SHAPE, packetType)
}

export { hearthShapeForPacketType, packetTypeForHearthShape }

export function buildStoneShopShapeModel(packet) {
  return buildStoneShopHearthModel(packet)
}

export function getNextHearthVisualTarget(packet) {
  const model = buildStoneShopShapeModel(packet)
  const dimensions = model.dimensions
  if (!dimensions.widthInches) return { target: 'width', copy: 'Start with overall width.' }
  if (!dimensions.depthInches) return { target: 'depth', copy: 'Now enter hearth depth.' }
  if (!packet?.visualWorkflow?.frontStyleConfirmed) {
    return { target: 'front-style', copy: 'Choose the front shape, or confirm Straight.' }
  }
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
