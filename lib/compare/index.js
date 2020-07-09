'use strict'

// returns true if data1 contains data2, by id
exports.contains = (data_a, data_b) => {
  let contains = true

  for (var i = 0; i < data_b.length; i++) {
    const zone_b = data_b[i]
    const zone_a = data_a.find((zone) => {
      return zone.id === zone_b.id
    })
    if (!zone_a) {
      console.log('ZONE NOT FOUND: ' + zone_b.id)
      contains = false
      break
    }

    for (var j = 0; j < zone_b.areas.length; j++) {
      const area_b = zone_b.areas[j]
      const area_a = zone_a.areas.find((area) => {
        return area.id === area_b.id
      })
      if (!area_a) {
        console.log('AREA NOT FOUND: ' + area_b.id)
        contains = false
        break
      }

      for (var k = 0; k < area_b.villages.length; k++) {
        const village_b = area_b.villages[k]
        const village_a = area_a.villages.find((village) => {
          return village.id === village_b.id
        })
        if (!village_a) {
          console.log('VILLAGE NOT FOUND: ' + area_b.id + '/' + village_b.id)
          contains = false
          break
        }
      }
    }
  }

  return contains
}
