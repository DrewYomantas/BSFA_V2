import {
  buildRepStartingDirectionHandoff,
  getDisplayOnlyManifestItems,
  getRecommendableManifestItems,
  getVerificationRequiredManifestItems,
} from './v8ProofSliceContract.js'

const setupSignals = {
  existing_fireplace: ['remodel_replace_existing', 'retrofit_existing_open_face', 'retrofit_existing_open_face_wood'],
  new_fireplace_wall: ['new_construction', 'new_construction_open_face'],
  insert_upgrade: ['retrofit_existing_open_face', 'retrofit_existing_open_face_wood'],
  not_sure: [],
}

const goalSignals = {
  more_heat: ['heat', 'some_heat', 'efficiency'],
  easier_fire: ['convenience'],
  better_looking_room: ['design', 'ambiance'],
  real_wood_feel: ['wood_authenticity', 'realism'],
  not_sure: [],
}

const styleSignals = {
  traditional: ['traditional', 'transitional'],
  modern: ['modern', 'linear'],
  rustic_lodge: ['rustic', 'traditional'],
  premium_showpiece: ['premium', 'luxury', 'designer'],
  not_sure: [],
}

const goalReason = {
  more_heat: 'because it supports a stronger heat conversation without locking in a quote yet.',
  easier_fire: 'because it keeps the conversation focused on simple, convenient use.',
  better_looking_room: 'because it gives the room a clear fireplace direction to react to.',
  real_wood_feel: 'because it keeps the real-fire look and feel in the conversation.',
  not_sure: 'because it is a useful starting point while the room direction is still open.',
}

const styleReason = {
  traditional: 'It leans traditional without making the room feel locked in.',
  modern: 'It gives the customer a cleaner modern direction to compare in person.',
  rustic_lodge: 'It keeps a warmer lodge-like direction in play.',
  premium_showpiece: 'It works as a higher-presence direction without promising final fit.',
  not_sure: 'It is broad enough to help the customer react from the showroom floor.',
}

export function buildHearthCafeDirections(input = {}, data = {}) {
  const manifests = data.manifests || []
  const registerRecords = data.registerRecords || []
  const normalized = normalizeInput(input)
  const slotsByUnit = new Map(registerRecords.map((slot) => [slot.currentUnitRef, slot]))

  return getRecommendableManifestItems(manifests, registerRecords)
    .map((manifest) => {
      const slot = slotsByUnit.get(manifest.unitId) ?? null
      const score = scoreManifest(manifest, normalized)
      return {
        manifest,
        slot,
        score,
        direction: buildDirection(manifest, slot, normalized, score),
      }
    })
    .sort((a, b) => b.score.total - a.score.total || a.direction.displayName.localeCompare(b.direction.displayName))
    .slice(0, 3)
    .map((item) => item.direction)
}

export function getHearthCafeSkippedRecords(data = {}) {
  const manifests = data.manifests || []
  const registerRecords = data.registerRecords || []
  const gapEntries = data.gapList?.entries || []

  return {
    displayOnly: getDisplayOnlyManifestItems(manifests, registerRecords).map(toSkippedRecord),
    verificationRequired: getVerificationRequiredManifestItems(manifests, registerRecords).map(toSkippedRecord),
    pendingReview: gapEntries
      .filter((entry) => entry.status === 'pending_review')
      .map((entry) => ({
        encounteredAtSlot: entry.encounteredAtSlot,
        displayedUnitGuess: entry.displayedUnitGuess,
      })),
  }
}

function normalizeInput(input) {
  return {
    currentSetup: setupSignals[input.currentSetup] ? input.currentSetup : 'not_sure',
    mainGoal: goalSignals[input.mainGoal] ? input.mainGoal : 'not_sure',
    styleDirection: styleSignals[input.styleDirection] ? input.styleDirection : 'not_sure',
  }
}

function scoreManifest(manifest, input) {
  const setupMatches = intersect(manifest.compatibleSetups, setupSignals[input.currentSetup])
  const goalMatches = intersect(manifest.customer?.experiencePillars, goalSignals[input.mainGoal])
  const styleMatches = intersect(manifest.styleAffinity, styleSignals[input.styleDirection])
  const bestForMatches = scoreBestFor(manifest.customer?.bestFor, input)
  const displayBoost = manifest.internal?.displayPosition != null ? 1 : 0

  return {
    setupMatches,
    goalMatches,
    styleMatches,
    bestForMatches,
    displayBoost,
    total: setupMatches.length * 4 + goalMatches.length * 3 + styleMatches.length * 3 + bestForMatches + displayBoost,
  }
}

function buildDirection(manifest, slot, input, score) {
  const displayName = manifest.customer.displayName
  const preview = {
    id: manifest.unitId,
    displayName,
    category: formatCustomerCategory(manifest.productClass),
    type: manifest.customer.fuelTypeHuman,
    description: manifest.customer.shortDescription,
    showroomCue: buildShowroomCue(slot),
    badges: manifest.customer.verifyAtHomeMeasure?.length > 0 ? ['Confirm measurements'] : [],
  }

  return {
    unitId: manifest.unitId,
    displayName,
    reason: buildReason(manifest, input, score),
    matchedSignals: buildMatchedSignals(input, score),
    showroomCue: preview.showroomCue,
    nextActionText: preview.showroomCue ? 'Worth seeing in the front showroom.' : 'Worth reviewing with your rep.',
    internalHandoff: buildInternalHandoff(buildRepStartingDirectionHandoff(preview), score),
  }
}

function buildReason(manifest, input, score) {
  if (score.goalMatches.length > 0) {
    return `${manifest.customer.shortDescription} ${goalReason[input.mainGoal]}`
  }

  if (score.styleMatches.length > 0) {
    return `${manifest.customer.shortDescription} ${styleReason[input.styleDirection]}`
  }

  return `${manifest.customer.shortDescription} ${goalReason.not_sure}`
}

function buildMatchedSignals(input, score) {
  const signals = []
  if (score.setupMatches.length > 0) signals.push(`setup:${input.currentSetup}`)
  if (score.goalMatches.length > 0) signals.push(`goal:${input.mainGoal}`)
  if (score.styleMatches.length > 0) signals.push(`style:${input.styleDirection}`)
  if (signals.length === 0) signals.push('starting-point')
  return signals
}

function buildInternalHandoff(handoff, score) {
  if (!handoff) return null

  return {
    unitId: handoff.id,
    displayName: handoff.displayName,
    customerSummary: handoff.customerSummary,
    displayContext: handoff.displayContext,
    matchedSignals: {
      setup: score.setupMatches,
      goal: score.goalMatches,
      style: score.styleMatches,
    },
    nextSteps: [
      'Confirm measurements and site conditions.',
      'Confirm product details before quote.',
      'Build official quote in BisTrack.',
    ],
  }
}

function buildShowroomCue(slot) {
  if (!slot?.customer?.showroomZoneFriendly) return null
  return `Shown in the ${slot.customer.showroomZoneFriendly}`
}

function toSkippedRecord(manifest) {
  return {
    unitId: manifest.unitId,
    displayName: manifest.customer?.displayName ?? manifest.unitId,
  }
}

function scoreBestFor(bestFor = [], input) {
  const text = bestFor.join(' ').toLowerCase()
  let score = 0
  if (input.mainGoal === 'more_heat' && text.includes('heat')) score += 1
  if (input.mainGoal === 'easier_fire' && text.includes('convenience')) score += 1
  if (input.mainGoal === 'real_wood_feel' && text.includes('wood')) score += 1
  if (input.styleDirection === 'modern' && text.includes('modern')) score += 1
  if (input.styleDirection === 'premium_showpiece' && text.includes('premium')) score += 1
  return score
}

function intersect(values = [], targets = []) {
  return values.filter((value) => targets.includes(value))
}

function formatCustomerCategory(value) {
  if (!value) return 'Product'
  return value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}
