/// <reference path="../../defs/es6-promise.d.ts"/>

module Bloom {
  declare var document

  var bulbs:{ [id: string]: Bulb; } = {}

  export interface Bulb {
    name:string
    children:Bulb[]
    instantiate:{(args?): Flower}
  }

  export interface Flower {
    element:HTMLElement
    children:Flower[]
  }

  export function initialize_function() {

  }

  export function create_flower(bulb_name:string, args = null) {
    var bulb = bulbs[bulb_name]
    if (!bulb)
      throw new Error('Could not find bulb ' + bulb_name + '.')

    if (typeof bulb.instantiate != 'function')
      throw new Error('Bulb ' + bulb_name + ' is static and cannot be instantiated.')

    return bulb.instantiate(args)
  }

  export function add_bulb(bulb:Bulb) {
    bulbs[bulb.name] = bulb
  }

  export function add_bulbs(bulbs:Bulb[]) {
    for (var i in bulbs) {
      add_bulb(bulbs[i])
    }
  }
}