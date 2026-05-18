export const projectTypes = [
  { id: 'new-build', label: 'New build', hint: 'A blank wall', glyph: 'home',    code: 'PJ·01' },
  { id: 'remodel',   label: 'Remodel',   hint: 'Replacing an existing hearth', glyph: 'pencil',  code: 'PJ·02' },
  { id: 'refresh',   label: 'Refresh',   hint: 'Updating finishes', glyph: 'sparkle', code: 'PJ·03' },
]

export const fireExperiences = [
  { id: 'wood',      label: 'Wood',      hint: 'Real flame, real warmth', glyph: 'flame',   code: 'FR·01' },
  { id: 'gas',       label: 'Gas',       hint: 'On-demand, clean',        glyph: 'flame',   code: 'FR·02' },
  { id: 'electric',  label: 'Electric',  hint: 'Plug-in, ventless',       glyph: 'flame',   code: 'FR·03' },
  { id: 'undecided', label: 'Not sure',  hint: 'Show me options',         glyph: 'compass', code: 'FR·00' },
]

export const stones = [
  { id: 'cliffstone', label: 'Cliffstone',  origin: 'Northern quarry · ledger course', code: 'ST·04', renderSlug: 'stone.cliffstone' },
  { id: 'fieldledge', label: 'Field Ledge', origin: 'Iowa fieldstone · warm coursing', code: 'ST·11', renderSlug: 'stone.fieldledge' },
]

export const mantels = [
  { id: 'rusticOak',    label: 'Rustic Oak',    origin: 'Reclaimed beam · hand-finished', code: 'MT·03', renderSlug: 'mantel.rusticOak' },
  { id: 'paintedWhite', label: 'Painted White', origin: 'Hardwood · cream finish',        code: 'MT·08', renderSlug: 'mantel.paintedWhite' },
]

export const hearths = [
  { id: 'bluestone', label: 'Bluestone Slab', origin: 'Honed full-depth · 18" projection', code: 'HR·02', renderSlug: 'hearth.bluestone' },
]

export const lightingMoods = [
  { id: 'warmEvening',   label: 'Warm Evening',   note: 'Lamps lit, amber',     glyph: 'moon', code: 'LT·01', renderSlug: 'mood.warmEvening' },
  { id: 'cleanDaylight', label: 'Clean Daylight', note: 'Open shades, neutral', glyph: 'sun',  code: 'LT·02', renderSlug: 'mood.cleanDaylight' },
]

export function findOption(list, id) {
  return list.find((o) => o.id === id) ?? null
}
