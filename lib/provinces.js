'use strict'

const transformProvince = require('./transformProvince')

module.exports = (data) => {
  const normalised = transformProvince.normaliseKeys(data)
  const byProvince = transformProvince.indexByProvince(normalised)
  const byZoneArea = transformProvince.indexByZone(byProvince)
  const formatted = transformProvince.formatProvinces(byZoneArea)
  return formatted
}
