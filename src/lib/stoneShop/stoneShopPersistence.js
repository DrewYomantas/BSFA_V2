const PACKETS_KEY = 'bsfa_v2.stoneShop.packets'
const CURRENT_PACKET_KEY = 'bsfa_v2.stoneShop.currentPacketId'

function uuid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return 'stone-' + Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export function createStoneShopPacket(overrides = {}) {
  const now = new Date().toISOString()
  return {
    id: uuid(),
    customerFileId: null,
    quoteId: null,
    packetType: 'hearth',
    manualStatus: null,
    customer: {
      name: '',
      phone: '',
      address: '',
      builder: '',
      mason: '',
    },
    material: {
      name: 'Limestone',
      thickness: '2-1/4 inch',
      finish: '',
      edge: '',
      application: '',
      source: 'rep_selected',
    },
    dimensions: {
      widthInches: null,
      depthInches: null,
      heightInches: null,
      leftReturnInches: null,
      rightReturnInches: null,
      leftAngleCutInches: null,
      rightAngleCutInches: null,
      frontRadiusInches: null,
      radiusDepthInches: null,
      mantelWidthInches: null,
      mantelDepthInches: null,
      mantelHeightInches: null,
      surroundFaceWidthInches: null,
      surroundFaceHeightInches: null,
      openingWidthInches: null,
      openingHeightInches: null,
      sideReturnInches: null,
      capShelfWidthInches: null,
      capShelfDepthInches: null,
      pieceDescription: '',
      pieceWidthInches: null,
      pieceDepthInches: null,
      quantity: null,
      installLocation: '',
      corbelQuantity: null,
      corbelWidthInches: null,
      corbelDepthInches: null,
      corbelHeightInches: null,
      angleNotes: '',
      radiusNotes: '',
      supportNotes: '',
      mantelEdgeNotes: '',
      seamNotes: '',
      spacingNotes: '',
      inventoryNotes: '',
      notes: '',
    },
    fabrication: {
      angleCuts: 0,
      notches: 0,
      holes: 0,
      cutouts: 0,
      radiusCorners: 0,
      radiusFrontEdge: false,
      polishLinearFeet: null,
      customNotes: '',
    },
    edgeTreatments: {
      front: '',
      back: '',
      left: '',
      right: '',
    },
    verification: {
      fieldMeasureConfirmed: false,
      materialApproved: false,
      customerSignatureCaptured: false,
      managerReviewedPricing: false,
      shopReadyApproved: false,
    },
    pricing: {
      sqFt: null,
      materialRate: null,
      materialSubtotal: null,
      addersSubtotal: null,
      estimatedTotal: null,
      sourceLabel: '',
    },
    outputs: {
      modernPacketGeneratedAt: null,
      bwFormGeneratedAt: null,
    },
    createdAt: now,
    updatedAt: now,
    ...overrides,
  }
}

export function loadStoneShopPackets() {
  try {
    const raw = localStorage.getItem(PACKETS_KEY)
    const packets = raw ? JSON.parse(raw) : []
    return Array.isArray(packets) ? packets : []
  } catch {
    return []
  }
}

export function saveStoneShopPackets(packets) {
  try {
    localStorage.setItem(PACKETS_KEY, JSON.stringify(packets))
  } catch {
    /* local persistence is best effort */
  }
}

export function loadCurrentStoneShopPacketId() {
  try {
    return localStorage.getItem(CURRENT_PACKET_KEY)
  } catch {
    return null
  }
}

export function saveCurrentStoneShopPacketId(id) {
  try {
    localStorage.setItem(CURRENT_PACKET_KEY, id)
  } catch {
    /* local persistence is best effort */
  }
}
