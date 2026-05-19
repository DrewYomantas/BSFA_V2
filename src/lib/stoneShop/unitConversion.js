const CM_PER_INCH = 2.54
const MM_PER_INCH = 25.4

export const UNIT_OPTIONS = [
  { label: 'inches', value: 'inches' },
  { label: 'feet/inches', value: 'feet_inches' },
  { label: 'centimeters', value: 'centimeters' },
  { label: 'millimeters', value: 'millimeters' },
]

export function inchesToCentimeters(inches) {
  return round(Number(inches) * CM_PER_INCH, 1)
}

export function inchesToMillimeters(inches) {
  return Math.round(Number(inches) * MM_PER_INCH)
}

export function centimetersToInches(cm) {
  return round(Number(cm) / CM_PER_INCH, 4)
}

export function millimetersToInches(mm) {
  return round(Number(mm) / MM_PER_INCH, 4)
}

export function formatDimensionForUnit(inches, unit = 'inches', fallback = 'Dimension') {
  const value = Number(inches)
  if (!Number.isFinite(value) || value <= 0) return fallback
  if (unit === 'feet_inches') return formatFeetInches(value)
  if (unit === 'centimeters') return `${inchesToCentimeters(value)} cm`
  if (unit === 'millimeters') return `${inchesToMillimeters(value)} mm`
  return `${round(value, 3)}"`
}

export function parseDimensionInputToInches(input, unit = 'inches') {
  if (input === null || input === undefined || input === '') return null
  const text = String(input).trim()
  if (!text) return null

  if (unit === 'centimeters') return centimetersToInches(parseFloat(text))
  if (unit === 'millimeters') return millimetersToInches(parseFloat(text))
  if (unit === 'feet_inches') return parseFeetInches(text)
  return round(parseFloat(text), 4)
}

export function formatFeetInches(inches) {
  const total = Math.round(Number(inches) * 16) / 16
  const feet = Math.floor(total / 12)
  const remaining = round(total - feet * 12, 3)
  return `${feet}' ${remaining}"`
}

function parseFeetInches(text) {
  const feetMatch = text.match(/(-?\d+(?:\.\d+)?)\s*'/)
  const inchMatch = text.match(/(?:'|\s)(-?\d+(?:\.\d+)?)\s*(?:"|in)?$/)
  if (feetMatch) {
    const feet = parseFloat(feetMatch[1])
    const inches = inchMatch ? parseFloat(inchMatch[1]) : 0
    return round(feet * 12 + inches, 4)
  }
  return round(parseFloat(text), 4)
}

function round(value, places = 2) {
  if (!Number.isFinite(value)) return null
  const factor = 10 ** places
  return Math.round(value * factor) / factor
}
