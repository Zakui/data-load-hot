'use strict'

const transformers = require('./transformers')

module.exports = (data, zones) => {
  const normalised = transformers.normaliseKeys(data)
  const byZone = transformers.indexByZone(normalised)
  const byZoneArea = transformers.indexByArea(byZone)
  const formatted = transformers.formatZones(byZoneArea)
  return formatted
}
