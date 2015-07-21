declare var Traveler

module Vineyard {

  export module Trellis {
    export function get_identity(trellis, seed) {
      return seed[trellis.primary_key]
    }

    export function prepare_properties(trellis) {
      return Traveler.map_to_array(trellis.properties, function (p, i) {
        p.name = i
        return p
      })
        .filter(property_filter)
        .sort(create_property_sort(trellis))
    }

    function property_filter(property) {
      return property.type != 'list' && property.type != 'reference'
    }

    function create_property_sort(trellis) {
      return function (a, b) {
        if (a.name == trellis.primary_key)
          return -1

        if (b.name == trellis.primary_key)
          return 1

        return 0
      }
    }

  }
}