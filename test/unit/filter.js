const test = require('tap').test

const filters = require('../../lib/filters')

test('filters', t => {
  const zones = [
    'a'
  ]

  t.test('isVillage', st => {
    const mock = [
      {
        DEF_TYPE: 'village',
        ZS: 'a',
        AS_: 'b',
        LAT: '1',
        LON: '1',
        VILLAGE: 'a'
      },
      {
        DEF_TYPE: 'village',
        ZS: 'b',
        AS_: 'b',
        LAT: '1',
        LON: '1',
        VILLAGE: 'a'
      },
      {
        DEF_TYPE: 'no',
        ZS: 'a',
        AS_: 'b',
        LAT: '1',
        LON: '1',
        VILLAGE: 'a'
      }
    ]

    const expected = [
      {
        ZS: 'a',
        AS_: 'b',
        LAT: '1',
        LON: '1',
        VILLAGE: 'a'
      }
    ]

    const actual = filters.byKnownZones(mock, zones)

    st.deepEqual(actual, expected, 'filters non-villages')
    st.end()
  })

  t.test('hasRequiredColumns', st => {
    const mock = [
      {
        ZS: 'a',
        AS_: 'b',
        LAT: 'b',
        LON: 'c',
        DEF_TYPE: 'village',
        VILLAGE: 'a'
      },
      {
        test: 'a'
      },
      {
        zs: 'a',
        lat: 'b',
        lon: 'c',
        DEF_TYPE: 'village'
      }
    ]

    const expected = [
      {
        ZS: 'a',
        AS_: 'b',
        LAT: 'b',
        LON: 'c',
        VILLAGE: 'a'
      }
    ]

    const actual = filters.byKnownZones(mock, zones)

    t.deepEqual(actual, expected, 'removes rows without required columns')
    st.end()
  })

  t.test('pickRequiredColumns', st => {
    const mock = [
      {
        ZS: 'a',
        AS_: 'b',
        LAT: 'b',
        LON: 'c',
        DEF_TYPE: 'village',
        VILLAGE: 'a'
      },
      {
        ZS: 'a',
        AS_: 'b',
        LAT: 'b',
        LON: 'c',
        DEF_TYPE: 'village',
        not_this: 'd',
        VILLAGE: 'a'
      }
    ]

    const expected = [
      {
        ZS: 'a',
        AS_: 'b',
        LAT: 'b',
        LON: 'c',
        VILLAGE: 'a'
      },
      {
        ZS: 'a',
        AS_: 'b',
        LAT: 'b',
        LON: 'c',
        VILLAGE: 'a'
      }
    ]

    const actual = filters.byKnownZones(mock, zones)

    t.deepEqual(actual, expected, 'removes unknown columns')
    st.end()
  })

  t.end()
})
