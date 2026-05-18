import { createContext, useContext } from 'react'

export const V4 = {
  stone:      '#E8DDC9',
  cream:      '#F4EBD5',
  parchment:  '#EFE1C2',
  surfaceHi:  '#FBF3DE',

  walnut:     '#2E1F13',
  walnutHi:   '#3E2A1A',
  walnutLo:   '#1B1108',
  iron:       '#16110C',
  charcoal:   '#0C0805',

  ink:        '#1E1610',
  ink2:       '#3A2F23',
  muted:      '#7A6D5C',
  mutedHi:    '#9E9079',

  paperInk:   '#F6EBD2',
  paperMuted: 'rgba(246,235,210,0.78)',  // bumped from 0.62 for tablet contrast
  paperLine:  'rgba(246,235,210,0.18)',

  line:       '#D6C7A8',
  lineSoft:   '#E5D9BD',

  ember:      '#D9591E',
  emberHot:   '#F4A85B',
  emberSpark: '#FFCF8A',
  emberDeep:  '#6E2A10',
  brass:      '#C9A258',
  brassHi:    '#E8C783',
  brassLo:    '#7A5F2E',
  copper:     '#B45A2A',
}

export const AtmosphereCtx = createContext({
  mood: 'warmEvening',
  stone: 'cliffstone',
  mantel: 'rusticOak',
  hearth: 'bluestone',
  accent: 'ember',
})

export const useAtmosphere = () => useContext(AtmosphereCtx)
