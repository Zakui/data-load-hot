const test = require('tap').test

const filters = require('../../lib/filterProvince')

test('filter province', t => {
  t.test('is officiel', st => {
    const mock = [
      {
        PROVINCE: 'p',
        ZS: 'a',
        AS_: 'b',
        OFFICIEL: 'oui'
      },
      {
        PROVINCE: 'p',
        ZS: 'a',
        AS_: 'b',
        OFFICIEL: '1'
      },
      {
        PROVINCE: 'p',
        ZS: 'a',
        AS_: 'b',
        OFFICIEL: 'non'
      }
    ]

    const expected = [
      {
        PROVINCE: 'p',
        ZS: 'a',
        AS_: 'b'
      }
    ]

    const actual = filters.byKnownProvince(mock)

    st.deepEqual(actual, expected, 'filters non-officiel')
    st.end()
  })

  t.test('hasRequiredColumns', st => {
    const mock = [
      {
        ZS: 'a',
        AS_: 'b',
        PROVINCE: 'p',
        OFFICIEL: 'oui'
      },
      {
        test: 'a'
      },
      {
        zs: 'a',
        PROVINCE: 'p',
        lon: 'c',
        DEF_TYPE: 'village'
      }
    ]

    const expected = [
      {
        ZS: 'a',
        AS_: 'b',
        PROVINCE: 'p'
      }
    ]

    const actual = filters.byKnownProvince(mock)

    t.deepEqual(actual, expected, 'removes rows without required columns')
    st.end()
  })

  t.test('pickRequiredColumns', st => {
    const mock = [
      {
        ZS: 'a',
        AS_: 'b',
        PROVINCE: 'p',
        OFFICIEL: 'oui'
      },
      {
        ZS: 'aa',
        AS_: 'bb',
        PROVINCE: 'pp',
        not_this: 'o',
        OFFICIEL: 'oui'
      }
    ]

    const expected = [
      {
        ZS: 'a',
        AS_: 'b',
        PROVINCE: 'p'
      },
      {
        ZS: 'aa',
        AS_: 'bb',
        PROVINCE: 'pp'
      }
    ]

    const actual = filters.byKnownProvince(mock)

    t.deepEqual(actual, expected, 'removes unknown columns')
    st.end()
  })

  t.end()
})
