'use strict'

const transform = require('lodash.transform')
const camelCase = require('lodash.camelcase')
const startCase = require('startcase')
const kebabCase = require('lodash.kebabcase')

exports.camelCaseKeys = obj => {
  return transform(obj, (result, val, key) => result[camelCase(key)] = val)
}

exports.normaliseKeys = rows => rows.map(exports.camelCaseKeys)

const indexBy = (rows, key) => {
  const byValue = (index, row) => {
    const value = camelCase(row[key])
    if (!index[value]) {
      index[value] = []
    }
    index[value].push(row)
    return index
  }
  return rows.reduce(byValue, {})
}

exports.indexByProvince = rows => indexBy(rows, 'province')
exports.indexByZone = provinces => {
  Object.keys(provinces).map(province => {
    provinces[province] = indexBy(provinces[province], 'zs')
  })
  return provinces
}

const formatLevel = level => ({
  id: kebabCase(level),
  name: startCase(level)
})

exports.normaliseArea = area => (
  Object.assign(formatLevel(area.as))
)

exports.sortByName = (a, b) => {
  if (a.name > b.name) {
    return 1
  }
  if (a.name < b.name) {
    return -1
  }
  return 0
}

exports.formatAreas = areas => {
  return areas
    .map(exports.normaliseArea)
    .sort(exports.sortByName)
    // code from stackoverflow http://stackoverflow.com/questions/2218999/remove-duplicates-from-an-array-of-objects-in-javascript
    .filter((area, index, self) => self.findIndex((t) => {
      return t.id === area.id && t.name === area.name
    }) === index)
}

const formatZones = zones => (
  Object.keys(zones).map(zone => (
    Object.assign(formatLevel(zone), {
      areas: exports.formatAreas(zones[zone])
    })
  ))
  // copied from stackoverflow http://stackoverflow.com/questions/2218999/remove-duplicates-from-an-array-of-objects-in-javascript
  .filter((area, index, self) => self.findIndex((t) => {
    return t.id === area.id && t.name === area.name
  }) === index)
)

exports.formatProvinces = provinces => (
  Object.keys(provinces).map(province => (
    Object.assign(formatLevel(province), {
      zones: formatZones(provinces[province])
    })
  ))
)
