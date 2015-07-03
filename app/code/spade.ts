
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

}