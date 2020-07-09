'use strict'

const neatCsv = require('neat-csv')

const filter = require('./filter')
const transform = require('./transform')
const provinces = require('./provinces')
const filterProvince = require('./filterProvinces')

module.exports = {
  location: (csv, zones, done) => {
    neatCsv(csv, (err, data) => {
      if (err) {
        return done(err)
      }
      const filtered = filter(data, zones)
      const transformed = transform(filtered, zones)

      done(null, transformed)
    })
  },
  travellerLocation: (csv, done) => {
    neatCsv(csv, (err, data) => {
      if (err) {
        return done(err)
      }
      const filteredProvince = filterProvince(data)
      const privinceData = provinces(filteredProvince)

      done(null, privinceData)
    })
  }
}
