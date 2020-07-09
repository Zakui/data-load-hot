const test = require('tap').test

const compare = require('../../lib/compare')

test('compare', t => {
  t.test('contains', st => {
    const mock1 = [
      {
        id: 'zone1',
        areas: [
          {
            id: 'area1',
            villages: [
              {
                id: 'village1'
              }
            ]
          }
        ]
      }
    ]
    const mock2 = [
      {
        id: 'zone1',
        areas: [
          {
            id: 'area1',
            villages: [
              {
                id: 'village1'
              },
              {
                id: 'village2'
              }
            ]
          }
        ]
      }
    ]

    const mock1ContainsMock2 = compare.contains(mock1, mock2)
    st.equal(mock1ContainsMock2, false, 'mock1 contains mock2')

    const mock2ContainsMock1 = compare.contains(mock2, mock1)
    st.equal(mock2ContainsMock1, true, 'mock2 contains mock1')

    st.end()
  })
  t.end()
})
