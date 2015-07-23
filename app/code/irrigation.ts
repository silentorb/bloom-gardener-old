declare var Functional

module Irrigation {

  export function set_query_arguments(args) {
    var arg_strings = Functional.map_to_array(args, function (arg, i) {
      return i + '=' + arg
    })

    var query = arg_strings.length > 0
      ? '?' + arg_strings.join('&')
      : ''

    var url = window.location.protocol + "//" + window.location.host
      + window.location.pathname + query

    history.pushState({}, '', url)
  }

  export interface Location {
    path:string[]
    args
  }

  export class Location_Node<Location> implements Traveler.Output<Location> {
    value:Location
    targets

    constructor() {
      this.value = Location_Node.load_from_browser()
    }

    get_value() {
      return this.value
    }


    static get_query_arguments():any {
      var result = {};
      var text = window.location.search;

      var items = text.slice(1).split(/[\&=]/);
      if (items.length < 2)
        return {};

      for (var x = 0; x < items.length; x += 2) {
        result[items[x]] = decodeURIComponent(items[x + 1].replace(/\+/g, ' '));
      }
      return result;
    }

    static load_from_browser() {
      return {
        path: [],
        args: Location_Node.get_query_arguments()
      }
    }
  }
}