const exec = require('child_process').exec
const pathJoin = require('path').join

const test = require('tap').test
const keyBy = require('lodash.keyby')

test('build location', t => {
  exec('npm run build', err => {
    t.error(err, 'build exited cleanly')

    const distPath = pathJoin(
      __dirname, '..', '..', 'dist', 'sense-hat-locations.json'
    )
    const dist = require(distPath)

    t.ok(dist[0], 'can require dist')

    const index = keyBy(dist[0], 'id')
    t.ok(index.mosango.areas.length, 'has Mosango areas')
    t.ok(index.mosango.areas[0].villages.length, 'has Mosango villages')

    t.end()
  })
})

test('build traveller location', t => {
  exec('npm run build', err => {
    t.error(err, 'build exited cleanly')

    const distPath = pathJoin(
      __dirname, '..', '..', 'dist', 'sense-hat-locations.json'
    )
    const dist = require(distPath)

    t.ok(dist[1], 'can require dist')

    const index = keyBy(dist[1], 'id')
    t.ok(index.kwilu.zones.length, 'has Kwilu zones')
    t.ok(index.kwilu.zones[0].areas.length, 'has Kwilu areas')

    t.end()
  })
})
