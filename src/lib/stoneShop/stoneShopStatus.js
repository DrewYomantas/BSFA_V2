import { getPacketType } from '../../data/stoneShop/stoneShopRates.js'
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

export function deriveStoneShopStatus(packet) {
  if (packet?.manualStatus && MANUAL_STATUSES[packet.manualStatus]) {
    return MANUAL_STATUSES[packet.manualStatus]
  }

  if (!packet?.packetType || !packet?.material?.name || !packet?.material?.thickness) {
    return {
      label: 'Draft',
      next: 'Next: choose the packet type and material direction.',
    }
  }

  if (getMissingRequiredDimensions(packet).length > 0) {
    return {
      label: 'Needs Dimensions',
      next: 'Next: enter the required shop dimensions for this packet type.',
    }
  }

  if (packet.packetType !== 'material_approval' && !packet.verification?.fieldMeasureConfirmed) {
    return {
      label: 'Needs Field Verification',
      next: 'Next: confirm field measure before releasing this to shop.',
    }
  }

  if (!packet.verification?.materialApproved) {
    return {
      label: 'Needs Material Approval',
      next: 'Next: get customer approval on material selection.',
    }
  }

  if (!packet.verification?.customerSignatureCaptured) {
    return {
      label: 'Needs Customer Signature',
      next: 'Next: capture customer approval before shop handoff.',
    }
  }

  const pricing = calculateStoneShopPricing(packet)
  if (pricing.estimatedTotal !== null && !packet.verification?.managerReviewedPricing) {
    return {
      label: 'Pricing Needs Review',
      next: 'Next: review price source/date before this is treated as final.',
    }
  }

  if (!packet.verification?.shopReadyApproved) {
    return {
      label: 'Ready for Shop Review',
      next: 'Next: complete internal shop review and mark ready for shop.',
    }
  }

  return {
    label: 'Shop Ready',
    next: 'Next: hand this packet to production with the current print form.',
  }
}
