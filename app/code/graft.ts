/// <reference path="metahub.ts"/>

module Graft {

  export class Element_List_Input implements MetaHub.Input<Node> {
    element
    source

    constructor(element) {
      this.element = element
    }

    set_value(value){
      this.element.innerHTML = ''
      for (var i in value) {
        this.element.appendChild(value[i])
      }
    }
  }

  export class Element_Input implements MetaHub.Input<Node> {
    element
    source

    constructor(element) {
      this.element = element
    }

    set_value(value){
      if (!value) {
        value = document.createElement('div')
      }

      this.element.parentNode.replaceChild(value, this.element)

      this.element = value
    }
  }

  export function sort(key) {
    return function (a, b) {
      if (a[key] == b[key])
        return 0

      return a[key] < b[key] ? -1 : 1
    }
  }

}