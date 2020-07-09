const filters = require('./filterProvince')

module.exports = (data) => (
  filters.byKnownProvince(data)
)
