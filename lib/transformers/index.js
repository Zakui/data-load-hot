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

exports.indexByZone = rows => indexBy(rows, 'zs')
exports.indexByArea = zones => {
  Object.keys(zones).map(zone => {
    zones[zone] = indexBy(zones[zone], 'as')
  })
  return zones
}

const formatLevel = level => ({
  id: kebabCase(level),
  name: startCase(level)
})

exports.normaliseVillage = village => (
  Object.assign(formatLevel(village.village), {
    lat: village.lat,
    lon: village.lon
  })
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

exports.formatVillages = villages => {
  return villages
    .map(exports.normaliseVillage)
    .sort(exports.sortByName)
}

const formatAreas = areas => (
  Object.keys(areas).map(area => (
    Object.assign(formatLevel(area), {
      villages: exports.formatVillages(areas[area])
    })
  ))
)

exports.formatZones = zones => (
  Object.keys(zones).map(zone => (
    Object.assign(formatLevel(zone), {
      areas: formatAreas(zones[zone])
    })
  ))
)
