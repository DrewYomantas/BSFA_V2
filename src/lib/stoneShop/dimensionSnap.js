export const SNAP_PRESETS = [
  { label: '1/16"', value: 1 / 16 },
  { label: '1/8"', value: 1 / 8 },
  { label: '1/4"', value: 1 / 4 },
  { label: '1/2"', value: 1 / 2 },
  { label: '1"', value: 1 },
  { label: '3"', value: 3 },
  { label: '6"', value: 6 },
  { label: '12"', value: 12 },
]

export function snapToIncrement(value, increment = 1) {
  const n = Number(value)
  const step = Number(increment)
  if (!Number.isFinite(n) || !Number.isFinite(step) || step <= 0) return null
  return roundToSixths(Math.max(0, Math.round(n / step) * step))
}

function roundToSixths(value) {
  return Math.round(value * 10000) / 10000
}
