module Spade {

  export function remove(node) {
    node.parentNode.removeChild(node)
  }

  export function insert_after(first, second) {
    first.parentNode.insertBefore(second, first.nextSibling);
  }

  export function create_from_string(input) {
    var div = document.createElement('div')
    div.innerHTML = input
    return div.childNodes[0]
  }


  export function get_query_arguments() {
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

  export function append_list(element, list) {
    for (var i in list) {
      element.appendChild(list[i])
    }
  }

}