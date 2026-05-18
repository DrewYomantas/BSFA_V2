export function syncRegisterToManifest(manifest, registerRecords) {
  const slot = registerRecords.find((record) => record.currentUnitRef === manifest.unitId)

  return {
    ...manifest,
    rep: {
      ...manifest.rep,
      displayCallback: slot?.rep?.displayCallbackLanguage ?? null,
    },
    internal: {
      ...manifest.internal,
      displayDisposition: slot?.internal?.displayDisposition ?? null,
      displayPosition: slot?.location?.position ?? null,
      displaySection: slot?.location?.zone ?? null,
    },
  }
}
