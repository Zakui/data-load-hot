#!/usr/bin/env node

const readFile = require('fs').readFile
const pathJoin = require('path').join

const find = require('./lib')
const compare = require('./lib/compare')
const zones = [
  'yasa bonga',
  'mosango'
]

const oldPath = pathJoin(__dirname, 'data', 'SouthBDD.csv')
const newPath = pathJoin(__dirname, 'data', 'new-pilot-locations_mixed-case.csv')

readFile(oldPath, (err, file) => {
  if (err) throw err
  find(file, zones, (err, oldData) => {
    if (err) throw err

    readFile(newPath, (err, file) => {
      if (err) throw err
      find(file, zones, (err, newData) => {
        if (err) throw err

        // contains function writes list of areas/villages that are not contained in the second dataset
        compare.contains(newData, oldData)
      })
    })
  })
})
