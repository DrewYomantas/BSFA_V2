import { getPacketType, isPricingEnabled } from '../../data/stoneShop/stoneShopRates.js'
import { DIMENSION_LABELS } from './stoneShopTemplates.js'
import { calculateStoneShopPricing } from './stoneShopCalculations.js'

const MANUAL_STATUSES = {
  in_fabrication: {
    label: 'In Fabrication',
    next: 'Next: track shop progress and keep customer/order notes current.',
  },
  complete: {
    label: 'Complete',
    next: 'Next: file the completed packet with the customer record.',
  },
}

export function getMissingRequiredDimensions(packet) {
  const type = getPacketType(packet?.packetType)
  return type.dimensions.filter((field) => {
    const value = packet?.dimensions?.[field]
    return value === null || value === undefined || value === '' || Number(value) <= 0
  })
}

export function getMissingInfoItems(packet) {
  const type = getPacketType(packet?.packetType)
  const missingDimensions = getMissingRequiredDimensions(packet).map((field) => ({
    key: `dimension:${field}`,
    label: `${DIMENSION_LABELS[field] || field}${field.endsWith('Inches') ? ' inches' : ''}`,
    group: 'Dimensions',
  }))
  const missing = [...missingDimensions]

  if (!packet?.material?.name || !packet?.material?.thickness) {
    missing.push({ key: 'material', label: 'Material and thickness', group: 'Material' })
  }
  if (type.materialFields?.includes('finish') && !packet?.material?.finish) {
    missing.push({ key: 'finish', label: 'Finish', group: 'Material' })
  }
  if (type.materialFields?.includes('edge') && !packet?.material?.edge) {
    missing.push({ key: 'edge', label: 'Edge profile', group: 'Material' })
  }
  if (type.materialFields?.includes('application') && !packet?.material?.application) {
    missing.push({ key: 'application', label: 'Application', group: 'Material' })
  }
  if (!type.internalOnly && packet?.packetType !== 'material_approval' && !packet?.verification?.fieldMeasureConfirmed) {
    missing.push({ key: 'fieldMeasureConfirmed', label: 'Field measure confirmation', group: 'Verification' })
  }
  if (!type.internalOnly && !packet?.verification?.materialApproved) {
    missing.push({ key: 'materialApproved', label: 'Material approval', group: 'Verification' })
  }
  if (!type.internalOnly && !packet?.verification?.customerSignatureCaptured) {
    missing.push({ key: 'customerSignatureCaptured', label: 'Customer signature', group: 'Verification' })
  }
  if (!type.internalOnly && isPricingEnabled(packet?.packetType) && !packet?.verification?.managerReviewedPricing) {
    missing.push({ key: 'managerReviewedPricing', label: 'Pricing review', group: 'Verification' })
  }

  return missing
}

export function deriveStoneShopStatus(packet) {
  if (packet?.manualStatus && MANUAL_STATUSES[packet.manualStatus]) {
    return MANUAL_STATUSES[packet.manualStatus]
  }

  const type = getPacketType(packet?.packetType)
  const missingDimensions = getMissingRequiredDimensions(packet)

  if (!packet?.packetType || !packet?.material?.name || !packet?.material?.thickness) {
    return {
      label: 'Draft',
      next: 'Next: choose the packet type and material direction.',
      why: 'A packet cannot guide the shop until it knows what kind of work this is.',
    }
  }

  if (missingDimensions.length > 0) {
    return {
      label: 'Needs Dimensions',
      next: `Next: enter ${DIMENSION_LABELS[missingDimensions[0]] || 'the missing dimension'}.`,
      why: type.assistantWhy,
    }
  }

  if (!type.internalOnly && packet.packetType !== 'material_approval' && !packet.verification?.fieldMeasureConfirmed) {
    return {
      label: 'Needs Field Verification',
      next: 'Next: confirm field measure before releasing this to shop.',
      why: 'Dimensions can drive the estimate, but shop release needs a field-measure checkpoint.',
    }
  }

  if (!type.internalOnly && !packet.verification?.materialApproved) {
    return {
      label: 'Needs Material Approval',
      next: 'Next: get customer approval on material selection.',
      why: 'Material, finish, and edge choices should be acknowledged before fabrication direction hardens.',
    }
  }

  if (!type.internalOnly && !packet.verification?.customerSignatureCaptured) {
    return {
      label: 'Needs Customer Signature',
      next: 'Next: capture customer approval before shop handoff.',
      why: 'The packet can be reviewed internally, but customer approval still needs a clear signoff trail.',
    }
  }

  const pricing = calculateStoneShopPricing(packet)
  if (!type.internalOnly && pricing.estimatedTotal !== null && !packet.verification?.managerReviewedPricing) {
    return {
      label: 'Pricing Needs Review',
      next: 'Next: review price source/date before this is treated as final.',
      why: 'The calculator is preliminary rep math until pricing has been reviewed.',
    }
  }

  if (type.internalOnly) {
    return {
      label: 'Ready for Shop Review',
      next: 'Next: save the usage details for internal inventory review.',
      why: type.assistantWhy,
    }
  }

  if (!packet.verification?.shopReadyApproved) {
    return {
      label: 'Ready for Shop Review',
      next: 'Next: complete internal shop review and mark ready for shop.',
      why: 'Customer and pricing checkpoints are complete; Liam/shop review is the remaining gate.',
    }
  }

  return {
    label: 'Shop Ready',
    next: 'Next: hand this packet to production with the current print form.',
    why: 'Required fields and approvals are complete for the selected packet type.',
  }
}
