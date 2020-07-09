const filters = require('./filters')

module.exports = (data, zones) => (
  filters.byKnownZones(data, zones)
)
