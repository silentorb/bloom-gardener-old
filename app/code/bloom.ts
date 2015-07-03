/// <reference path="../../defs/es6-promise.d.ts"/>

module Bloom {
  declare var document

  var definitions:{ [id: string]: Flower_Definition; }

  export function remove(node) {
    node.parentNode.removeChild(node)
  }

  export function insert_after(first, second) {
    first.parentNode.insertBefore(second, first.nextSibling);
  }

  export function create_from_string(input) {
    var div = document.createElement('div')
    div.innerHTML = input
    return div.childNodes
  }

  export function initialize_function() {
    
  }

  //export function create(name, attributes = undefined, children = undefined) {
  //  var result = document.createElement(name)
  //  if (attributes) {
  //    for (var i = 0; i < attributes.length; ++i) {
  //      result.setAttribute(i, attributes[i])
  //    }
  //  }
  //
  //  if (children) {
  //    for (var i = 0; i < children.length; ++i) {
  //      result.appendChild(children[i])
  //    }
  //  }
  //}

  export function flower(data) {

  }

  export interface Flower_Definition {
    children:Flower_Definition[]
  }

  export interface Flower {
    children:Flower[]
  }
}