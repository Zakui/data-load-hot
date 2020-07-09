const test = require('tap').test

const transformers = require('../../lib/transformers')

test('transformers', t => {
  t.test('camelCaseKeys', st => {
    const mock = {
      camelCase: 0,
      ALLCAPS: 'something',
      SNAKE_CASE_THING: 'another',
      TRAILING_: 'trailing'
    }

    const expected = {
      camelCase: 0,
      allcaps: 'something',
      snakeCaseThing: 'another',
      trailing: 'trailing'
    }

    const actual = transformers.camelCaseKeys(mock)

    st.deepEqual(actual, expected, 'camelCase object keys')
    st.end()
  })

  t.test('sorting', st => {
    const mock = [
      {
        name: 'zz'
      },
      {
        name: 'A'
      },
      {
        name: 'f'
      }
    ]

    const expected = [
      {
        name: 'A'
      },
      {
        name: 'f'
      },
      {
        name: 'zz'
      }
    ]

    const actual = mock.sort(transformers.sortByName)

    st.deepEqual(actual, expected, 'sorts by name')
    st.end()
  })

  t.test('normaliseVillage', st => {
    const mock = [
      {
        zs: 'NOT',
        lat: '1',
        lon: '1',
        village: 'HEY THIS'
      },
      {
        lat: '1',
        lon: '1',
        village: 'THIS/MOD THAT'
      },
      {
        lat: '1',
        lon: '1',
        village: 'FOO BAR BAZ'
      },
      {
        lat: '1',
        lon: '1',
        village: 'EDWARD II'
      }
    ]

    const expected = [
      {
        lat: '1',
        lon: '1',
        name: 'Hey This',
        id: 'hey-this'
      },
      {
        lat: '1',
        lon: '1',
        name: 'This/Mod That',
        id: 'this-mod-that'
      },
      {
        lat: '1',
        lon: '1',
        name: 'Foo Bar Baz',
        id: 'foo-bar-baz'
      },
      {
        lat: '1',
        lon: '1',
        name: 'Edward II',
        id: 'edward-ii'
      }
    ]

    const actual = mock.map(transformers.normaliseVillage)

    st.deepEqual(actual, expected, 'normalises villages')
    st.end()
  })

  t.test('indexing', st => {
    const mock = [
      {
        zs: 'a',
        as: 'b',
        village: 'c'
      },
      {
        zs: 'a',
        as: 'd',
        village: 'c'
      },
      {
        zs: 'b',
        as: 'b',
        village: 'c'
      }
    ]

    const expected = {
      a: {
        b: [
          {
            zs: 'a',
            as: 'b',
            village: 'c'
          }
        ],
        d: [
          {
            zs: 'a',
            as: 'd',
            village: 'c'
          }
        ]
      },
      b: {
        b: [
          {
            zs: 'b',
            as: 'b',
            village: 'c'
          }
        ]
      }
    }

    const byZone = transformers.indexByZone(mock)
    const byZoneArea = transformers.indexByArea(byZone)

    st.deepEqual(byZoneArea, expected, 'indexes by zone and area')

    st.end()
  })

  t.end()
})
