#!/usr/bin/env node

const readFileSync = require('fs').readFileSync
const pathJoin = require('path').join

const find = require('./lib')

const zones = [
  'bagata',
  'bandundu',
  'banzow-moke',
  'boko',
  'bokoro',
  'bolobo',
  'bosobe',
  'bulungu',
  'djuma',
  'idiofa',
  'inongo',
  'ipamu',
  'kenge',
  'kikongo',
  'kimbau',
  'kimputu',
  'kwamouth',
  'lusanga',
  'masi',
  'moanza',
  'mokala',
  'mosango',
  'mungindu',
  'mushie',
  'nioki',
  'ntandembelo',
  'sia',
  'vanga',
  'yasa bonga',
  'yumbi'
]

// Join multiple lists:
// This assumes you have already checked for duplicates
const locationPaths = [
  pathJoin(__dirname, 'data', 'new_pilot_zone_area_villages.csv')
]

const travellerpaths = [
  pathJoin(__dirname, 'data', 'new_pilot_province_zone_area.csv')
]

const locationFile = readFileSync(locationPaths[0])
const travellerFile = readFileSync(travellerpaths[0])

const location = new Promise((resolve, reject) => {
  find.location(locationFile, zones, (err, matches) => {
    if (err) return reject(err)
    resolve(matches)
  })
})

const travellerLocation = new Promise((resolve, reject) => {
  find.travellerLocation(travellerFile, (err, matches) => {
    if (err) return reject(err)
    resolve(matches)
  })
})

Promise.all([location, travellerLocation])
  .then((locations) => {
    // const all = Array.prototype.concat.apply([], locations)
    var output = JSON.stringify(locations)
    // This is a special case and startCase doesn't handle it
    output = output.replace('Tolo 123', 'Tolo 1,2,3')

    console.log(output)
  }).catch((err) => {
    throw err
  })
