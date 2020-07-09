const readFile = require('fs').readFile
const pathJoin = require('path').join

const test = require('tap').test
const uniq = require('lodash.uniq')
const keyBy = require('lodash.keyby')

const find = require('../../lib')

test('integration location', t => {
  const zones = [
    'yasa bonga',
    'mosango'
  ]

  const zoneTest = (test, index) => {
    t.test(test.name, st => {
      const zone = index[test.id]
      st.equal(zone.areas.length, test.areas, `found ${test.areas} areas`)

      const villages = zone.areas.reduce((a, b) => a.concat(b.villages), [])
      st.equal(villages.length, test.villages, `found ${test.villages} villages`)

      const areaIds = zone.areas.map(area => area.id)
      const areaUuids = uniq(areaIds)
      st.equal(areaUuids.length, areaIds.length, 'has unique area IDs')

      zone.areas.forEach(area => {
        const ids = area.villages.map(village => village.id)
        const uuids = uniq(ids)
        const message = `Area "${area.name}" has unique village IDs`
        st.equal(uuids.length, ids.length, message)
      })

      st.end()
    })
  }

  const csvlocationPath = pathJoin(__dirname, '..', '..', 'data', 'new-pilot-locations_mixed-case.csv')

  readFile(csvlocationPath, (err, file) => {
    t.error(err, 'read CSV file')
    find.location(file, zones, (err, matches) => {
      t.error(err, 'find did not throw')
      t.equal(matches.length, zones.length, 'found all zones')

      const index = keyBy(matches, 'id')
      const tests = [
        {
          name: 'Mosango',
          id: 'mosango',
          areas: 16,
          villages: 235
        },
        {
          name: 'Yasa Bonga',
          id: 'yasa-bonga',
          areas: 22,
          villages: 305
        }
      ]

      tests.forEach(test => zoneTest(test, index))

      t.end()
    })
  })
})

test('integration province', t => {
  const provinceTest = (test, index) => {
    t.test(test.name, st => {
      const province = index[test.id]
      st.equal(province.zones.length, test.zones, `found ${test.zones} zones`)

      const areas = province.zones.reduce((a, b) => a.concat(b.areas), [])
      st.equal(areas.length, test.areas, `found ${test.areas} areas`)

      const zoneIds = province.zones.map(zone => zone.id)
      const zoneUuids = uniq(zoneIds)
      st.equal(zoneUuids.length, zoneIds.length, 'has unique zone IDs')

      province.zones.forEach(zone => {
        const ids = zone.areas.map(area => area.id)
        const uuids = uniq(ids)
        const message = `Zone "${zone.name}" has unique area IDs`
        st.equal(uuids.length, ids.length, message)
      })

      st.end()
    })
  }

  const csvtravellerPath = pathJoin(__dirname, '..', '..', 'data', 'new_pilot_province_zone_area_mixed_case.csv')

  readFile(csvtravellerPath, (err, file) => {
    t.error(err, 'read CSV file')
    find.travellerLocation(file, (err, matches) => {
      t.error(err, 'find did not throw')

      const index = keyBy(matches, 'id')
      const tests = [
        {
          name: 'Bas Uele',
          id: 'bas-uele',
          zones: 10,
          areas: 145
        },
        {
          name: 'Equateur',
          id: 'equateur',
          zones: 18,
          areas: 260
        }
      ]

      tests.forEach(test => provinceTest(test, index))

      t.end()
    })
  })
})
