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
    futureFormType: 'hearth_order',
    description: 'Flat hearth slab with standard width and depth.',
    dimensions: ['widthInches', 'depthInches'],
    adders: ['notches', 'holes', 'cutouts'],
    materialFields: ['thickness', 'finish', 'edge'],
    assistantWhy: 'The shop needs width and depth before any square-foot price or production form can be trusted.',
  },
  {
    id: 'hearth_clipped_corners',
    label: 'Hearth with Clipped Corners',
    formLabel: 'Hearth with Clipped Corners Form',
    futureFormType: 'hearth_clipped_corners',
    description: 'Hearth slab with clipped front corners and shop notes.',
    dimensions: ['widthInches', 'depthInches', 'leftReturnInches', 'rightReturnInches'],
    adders: ['angleCuts', 'notches', 'holes', 'cutouts'],
    materialFields: ['thickness', 'finish', 'edge'],
    assistantWhy: 'Clipped corners change the shop sketch and usually add angle-cut handling, so the corner dimensions need to be captured early.',
  },
  {
    id: 'hearth_angle_cuts',
    label: 'Angle Cut Hearth',
    formLabel: 'Hearth with Angle Cuts Form',
    futureFormType: 'hearth_angle_cuts',
    description: 'Hearth slab with left/right angle cuts and angle notes.',
    dimensions: ['widthInches', 'depthInches', 'leftAngleCutInches', 'rightAngleCutInches', 'angleNotes'],
    adders: ['angleCuts', 'notches', 'holes', 'cutouts'],
    materialFields: ['thickness', 'finish', 'edge'],
    assistantWhy: 'Angle cuts need both the slab size and the angle-cut notes so the adder count matches what the shop will fabricate.',
  },
  {
    id: 'hearth_radius_front',
    label: 'Radius Front Hearth',
    formLabel: 'Hearth with Radius Front Form',
    futureFormType: 'hearth_radius_front',
    description: 'Hearth slab with radius front measurements and flat radius-front adder.',
    dimensions: ['widthInches', 'depthInches', 'frontRadiusInches', 'radiusDepthInches', 'radiusNotes'],
    adders: ['radiusFrontEdge', 'radiusCorners', 'notches', 'holes'],
    materialFields: ['thickness', 'finish', 'edge'],
    assistantWhy: 'Radius fronts need arc notes before shop review because the V1 calculator does not deduct geometry.',
  },
  {
    id: 'hearth_mantel',
    label: 'Hearth + Mantel',
    formLabel: 'Hearth + Mantel Form',
    futureFormType: 'hearth_mantel',
    description: 'Separate hearth and mantel dimensions with support notes.',
    dimensions: ['widthInches', 'depthInches', 'mantelWidthInches', 'mantelDepthInches', 'mantelHeightInches', 'supportNotes', 'mantelEdgeNotes'],
    adders: ['notches', 'holes', 'cutouts'],
    materialFields: ['thickness', 'finish', 'edge'],
    assistantWhy: 'This packet has two pieces, so the shop needs hearth dimensions and mantel dimensions before handoff.',
  },
  {
    id: 'fp_hearth_surround',
    label: 'Fireplace Hearth + Surround',
    formLabel: 'Fireplace Hearth + Surround Form',
    futureFormType: 'fp_hearth_surround',
    description: 'Hearth, surround face, opening, returns, caps, shelves, and seam notes.',
    dimensions: ['widthInches', 'depthInches', 'surroundFaceWidthInches', 'surroundFaceHeightInches', 'openingWidthInches', 'openingHeightInches', 'leftReturnInches', 'rightReturnInches', 'sideReturnInches', 'capShelfWidthInches', 'capShelfDepthInches', 'seamNotes'],
    adders: ['notches', 'holes', 'cutouts', 'angleCuts'],
    materialFields: ['thickness', 'finish', 'edge'],
    assistantWhy: 'Surround packets need opening and return dimensions so the shop can catch fit issues before fabrication.',
  },
  {
    id: 'cap_shelf_slab',
    label: 'Cap / Shelf / Slab Piece',
    formLabel: 'Cap / Shelf / Slab Piece Form',
    futureFormType: 'cap_shelf_slab',
    description: 'Single or repeated slab pieces with quantity and install location.',
    dimensions: ['pieceDescription', 'pieceWidthInches', 'pieceDepthInches', 'quantity', 'installLocation'],
    adders: ['notches', 'holes', 'cutouts', 'radiusCorners'],
    materialFields: ['thickness', 'finish', 'edge'],
    assistantWhy: 'Piece description, quantity, and location keep one-off slab work from becoming vague shop notes.',
  },
  {
    id: 'corbels_mantel',
    label: 'Corbels & Mantel',
    formLabel: 'Corbels & Mantel Form',
    futureFormType: 'corbels_mantel',
    description: 'Mantel dimensions, corbel count/dimensions, centering, and support notes.',
    dimensions: ['mantelWidthInches', 'mantelDepthInches', 'mantelHeightInches', 'corbelQuantity', 'corbelWidthInches', 'corbelDepthInches', 'corbelHeightInches', 'spacingNotes', 'supportNotes'],
    adders: ['notches', 'holes', 'cutouts'],
    materialFields: ['thickness', 'finish', 'edge'],
    assistantWhy: 'Corbel spacing and support notes need to be confirmed before the mantel packet is treated as shop-ready.',
  },
  {
    id: 'material_approval',
    label: 'Material Selection / Approval',
    formLabel: 'Material Selection / Approval Form',
    futureFormType: 'material_selection_approval',
    description: 'Material, finish, edge, and customer approval record.',
    dimensions: [],
    adders: [],
    materialFields: ['finish', 'edge', 'application'],
    assistantWhy: 'This packet records approval only; hearth dimensions are not required unless it becomes a fabrication packet.',
  },
  {
    id: 'custom',
    label: 'Custom Stone Shop Form',
    formLabel: 'Generic Custom Stone Shop Form',
    futureFormType: 'custom_stone_shop',
    description: 'Flexible shop packet for unusual stone fabrication requests.',
    dimensions: ['pieceDescription', 'pieceWidthInches', 'pieceDepthInches', 'quantity', 'installLocation'],
    adders: ['angleCuts', 'notches', 'holes', 'cutouts', 'radiusCorners', 'radiusFrontEdge'],
    materialFields: ['thickness', 'finish', 'edge'],
    assistantWhy: 'Custom packets need a clear piece description and enough dimensions for Liam/shop review.',
  },
  {
    id: 'limestone_inventory_log',
    label: 'Limestone Inventory Usage Log',
    formLabel: 'Limestone Inventory Usage Log',
    futureFormType: 'limestone_inventory_usage_log',
    description: 'Internal usage reference for limestone inventory, not a customer pricing calculator.',
    dimensions: ['pieceDescription', 'quantity', 'inventoryNotes'],
    adders: [],
    materialFields: ['thickness'],
    calculatorEnabled: false,
    internalOnly: true,
    assistantWhy: 'This is a shop/internal log, so use it for material movement notes instead of quoting math.',
  },
]

export function getPacketType(typeId) {
  return PACKET_TYPES.find((type) => type.id === typeId) || PACKET_TYPES[0]
}

export function isPricingEnabled(typeId) {
  return getPacketType(typeId).calculatorEnabled !== false
}
