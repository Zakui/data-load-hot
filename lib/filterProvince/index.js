'use strict'

const requiredColumns = [
  'ZS',
  'AS_',
  'PROVINCE',
  'OFFICIEL'
]

// Only interested in villages
const filteredColumns = requiredColumns.filter(col => col !== 'OFFICIEL')

exports.byKnownProvince = (rows) => {
  const hasRequiredColumns = row => (
    requiredColumns.every(key => Object.keys(row).indexOf(key) !== -1)
  )

  const isOfficiel = row => (
    row.OFFICIEL && row.OFFICIEL.toLowerCase().trim() === 'oui'
  )

  const pickRequiredColumns = row => (
    filteredColumns.reduce((index, col) => {
      index[col] = row[col]
      return index
    }, {})
  )

  return rows
    .filter(hasRequiredColumns)
    .filter(isOfficiel)
    .map(pickRequiredColumns)
}
