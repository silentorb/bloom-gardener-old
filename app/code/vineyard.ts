module Vineyard {

  module Trellis {
    export function get_identity(trellis, seed) {
      return seed[trellis.primary_key]
    }
  }
}