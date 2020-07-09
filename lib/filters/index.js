'use strict'

const requiredColumns = [
  'ZS',
  'AS_',
  'LAT',
  'LON',
  'DEF_TYPE',
  'VILLAGE'
]

// Only interested in villages
const filteredColumns = requiredColumns.filter(col => col !== 'DEF_TYPE')

exports.byKnownZones = (rows, zones) => {
  const hasRequiredColumns = row => (
    requiredColumns.every(key => Object.keys(row).indexOf(key) !== -1)
  )

  const isVillage = row => (
    row.DEF_TYPE && row.DEF_TYPE.toLowerCase().trim() === 'village'
  )

  const isKnownZone = row => (
    row.ZS && zones.indexOf(row.ZS.toLowerCase().trim()) !== -1
  )

  const pickRequiredColumns = row => (
    filteredColumns.reduce((index, col) => {
      index[col] = row[col]
      return index
    }, {})
  )

  return rows
    .filter(hasRequiredColumns)
    .filter(isVillage)
    .filter(isKnownZone)
    .map(pickRequiredColumns)
}
