const test = require('tap').test

const transformProvince = require('../../lib/transformProvince')

test('transformers province', t => {
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

    const actual = transformProvince.camelCaseKeys(mock)

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

    const actual = mock.sort(transformProvince.sortByName)

    st.deepEqual(actual, expected, 'sorts by name')
    st.end()
  })

  t.test('normaliseArea', st => {
    const mock = [
      {
        zs: 'NOT',
        province: 'p',
        officiel: 'oui',
        as: 'HEY THIS'
      },
      {
        zs: 'NOT',
        province: 'p',
        as: 'THIS/MOD THAT'
      },
      {
        zs: 'NOT',
        province: 'p',
        as: 'FOO BAR BAZ'
      },
      {
        zs: 'NOT',
        province: 'p',
        as: 'EDWARD II'
      }
    ]

    const expected = [
      {
        name: 'Hey This',
        id: 'hey-this'
      },
      {
        name: 'This/Mod That',
        id: 'this-mod-that'
      },
      {
        name: 'Foo Bar Baz',
        id: 'foo-bar-baz'
      },
      {
        name: 'Edward II',
        id: 'edward-ii'
      }
    ]

    const actual = mock.map(transformProvince.normaliseArea)

    st.deepEqual(actual, expected, 'normalises area')
    st.end()
  })

  t.test('indexing', st => {
    const mock = [
      {
        zs: 'a',
        as: 'b',
        province: 'p'
      },
      {
        zs: 'c',
        as: 'd',
        province: 'p'
      },
      {
        zs: 'b',
        as: 'b',
        province: 'pc'
      }
    ]

    const expected = {
      p: {
        a: [
          {
            zs: 'a',
            as: 'b',
            province: 'p'
          }
        ],
        c: [
          {
            zs: 'c',
            as: 'd',
            province: 'p'
          }
        ]
      },
      pc: {
        b: [
          {
            zs: 'b',
            as: 'b',
            province: 'pc'
          }
        ]
      }
    }

    const byProvince = transformProvince.indexByProvince(mock)
    const byProvinceZone = transformProvince.indexByZone(byProvince)

    st.deepEqual(byProvinceZone, expected, 'indexes by province and zone')

    st.end()
  })

  t.end()
})
