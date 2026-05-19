import { FABRICATION_ADDERS, MATERIAL_RATES, STONE_SHOP_RATE_SOURCE } from '../../data/stoneShop/stoneShopRates.js'

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
  const sqFt = calculateSqFt(packet?.dimensions?.widthInches, packet?.dimensions?.depthInches)
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
  }
}

export function formatMoney(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return '-'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}
