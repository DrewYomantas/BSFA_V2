export const STONE_SHOP_RATE_SOURCE = {
  label: 'Current hearth pricing sheet',
  lastReviewed: '2026-05-18',
}

export const MATERIAL_RATES = [
  { id: 'limestone_2_25', name: 'Limestone', thickness: '2-1/4 inch', ratePerSqFt: 48 },
  { id: 'limestone_3', name: 'Limestone', thickness: '3 inch', ratePerSqFt: 64 },
  { id: 'limestone_4', name: 'Limestone', thickness: '4 inch', ratePerSqFt: 82 },
  { id: 'bluestone_2', name: 'Bluestone', thickness: '2 inch', ratePerSqFt: 60 },
]

export const FABRICATION_ADDERS = {
  angleCuts: { label: 'Angle cut', unit: 'each', amount: 40 },
  notches: { label: 'Notch', unit: 'each', amount: 40 },
  holes: { label: 'Hole', unit: 'each', amount: 50 },
  cutouts: { label: 'Cutout', unit: 'each', amount: 150 },
  radiusCorners: { label: 'Radius corner', unit: 'each', amount: 90 },
  radiusFrontEdge: { label: 'Radius front edge', unit: 'flat', amount: 225 },
}

export const PACKET_TYPES = [
  {
    id: 'hearth',
    label: 'Basic Hearth',
    formLabel: 'Hearth Order Form',
    description: 'Flat hearth slab with standard width and depth.',
    dimensions: ['widthInches', 'depthInches'],
    adders: ['notches', 'holes', 'cutouts'],
  },
  {
    id: 'hearth_clipped_corners',
    label: 'Hearth with Clipped Corners',
    formLabel: 'Hearth with Clipped Corners Form',
    description: 'Hearth slab with clipped front corners and shop notes.',
    dimensions: ['widthInches', 'depthInches', 'leftReturnInches', 'rightReturnInches'],
    adders: ['angleCuts', 'notches', 'holes', 'cutouts'],
  },
  {
    id: 'material_approval',
    label: 'Material Selection / Approval',
    formLabel: 'Material Selection / Approval Form',
    description: 'Material, finish, edge, and customer approval record.',
    dimensions: [],
    adders: [],
  },
]

export function getPacketType(typeId) {
  return PACKET_TYPES.find((type) => type.id === typeId) || PACKET_TYPES[0]
}
