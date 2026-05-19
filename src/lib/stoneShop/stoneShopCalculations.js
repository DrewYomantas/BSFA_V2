import { FABRICATION_ADDERS, MATERIAL_RATES, STONE_SHOP_RATE_SOURCE, getPacketType, isPricingEnabled } from '../../data/stoneShop/stoneShopRates.js'

export function calculateSqFt(widthInches, depthInches) {
  const width = Number(widthInches)
  const depth = Number(depthInches)
  if (!Number.isFinite(width) || !Number.isFinite(depth) || width <= 0 || depth <= 0) return null
  return Math.round(((width * depth) / 144) * 100) / 100
}

export function lookupMaterialRate(name, thickness) {
  if (!name || !thickness) return null
  return MATERIAL_RATES.find((rate) => rate.name === name && rate.thickness === thickness) || null
}

export function calculateAddersSubtotal(fabrication = {}) {
  return Object.entries(FABRICATION_ADDERS).reduce((sum, [key, rule]) => {
    if (key === 'radiusFrontEdge') return sum + (fabrication[key] ? rule.amount : 0)
    const count = Number(fabrication[key] || 0)
    return sum + (Number.isFinite(count) && count > 0 ? count * rule.amount : 0)
  }, 0)
}

export function calculateStoneShopPricing(packet) {
  const type = getPacketType(packet?.packetType)
  if (!isPricingEnabled(packet?.packetType)) {
    return {
      sqFt: null,
      materialRate: null,
      materialSubtotal: null,
      addersSubtotal: null,
      estimatedTotal: null,
      sourceLabel: 'Internal usage log - pricing calculator disabled',
      formula: null,
      activeAdders: [],
    }
  }

  const widthField = type.dimensions.includes('pieceWidthInches') && !type.dimensions.includes('widthInches')
    ? 'pieceWidthInches'
    : 'widthInches'
  const depthField = type.dimensions.includes('pieceDepthInches') && !type.dimensions.includes('depthInches')
    ? 'pieceDepthInches'
    : 'depthInches'
  const width = packet?.dimensions?.[widthField]
  const depth = packet?.dimensions?.[depthField]
  const sqFt = calculateSqFt(width, depth)
  const rate = lookupMaterialRate(packet?.material?.name, packet?.material?.thickness)
  const materialRate = rate?.ratePerSqFt ?? null
  const materialSubtotal = sqFt !== null && materialRate !== null
    ? Math.round(sqFt * materialRate * 100) / 100
    : null
  const addersSubtotal = calculateAddersSubtotal(packet?.fabrication)
  const estimatedTotal = materialSubtotal !== null
    ? Math.round((materialSubtotal + addersSubtotal) * 100) / 100
    : null

  return {
    sqFt,
    materialRate,
    materialSubtotal,
    addersSubtotal,
    estimatedTotal,
    sourceLabel: `${STONE_SHOP_RATE_SOURCE.label} - reviewed ${STONE_SHOP_RATE_SOURCE.lastReviewed}`,
    formula: Number(width) > 0 && Number(depth) > 0 ? `${width} x ${depth} / 144` : null,
    activeAdders: Object.entries(FABRICATION_ADDERS)
      .map(([key, rule]) => {
        const value = packet?.fabrication?.[key]
        const total = key === 'radiusFrontEdge'
          ? (value ? rule.amount : 0)
          : (Number(value || 0) > 0 ? Number(value) * rule.amount : 0)
        return { key, ...rule, value, total }
      })
      .filter((adder) => adder.total > 0),
  }
}

export function formatMoney(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return '-'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}
