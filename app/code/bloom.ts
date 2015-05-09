declare var $

module Bloom {
  declare var jQuery
  declare var document
  //export function create_flower(name) {
  //  var content = document.querySelector('link[rel="import"]')['import']
  //  var t:any = content.querySelector('#' + name)
  //  return $(document.importNode(t.content, true))
  //}
  export var elements = {}

  export function grow() {
    register_element()
  }

  function register_element() {
    var proto = Object.create(HTMLElement.prototype)

    proto.createdCallback = function () {
      var name = this.attributes.name.value
      var template = this.querySelector('template')
      var content = template.content
      var children = content.childNodes
      for (var i = children.length - 1; i >= 0; --i) {
        var node = children[i]
        if (node.nodeType == 8)
          content.removeChild(node)
      }

      elements[name] = {
        name: name,
        template: template
      }
    }

    document.registerElement('bloom-flower', {prototype: proto})
  }

  export function flower(name, model, modules) {
    //console.log('Registering custom flower: ' + name)
    var proto = Object.create(HTMLElement.prototype)

    proto.createdCallback = function () {
      var element_type = Bloom.elements[name]
      var template = document.importNode(element_type.template.content, true)
      for (var j in element_type.template.attributes) {
        var attr = element_type.template.attributes[j]
        if (attr.value)
          this.setAttribute(attr.name, attr.value)
      }
      var content = template.querySelector('content')
      if (content) {
        var children = [], i
        for (i = this.children.length - 1; i >= 0; --i) {
          children.push(this.removeChild(this.children[i]))
        }

        this.appendChild(template)
        var parent = content.parentNode
        for (i = 0; i < children.length; ++i) {
          parent.insertBefore(children[i], content)
        }

        parent.removeChild(content)
      }
      else {
        if (this.childNodes.length > 0)
          this.insertBefore(template, this.firstChild)
        else
          this.appendChild(template)
      }

      this.setAttribute('ng-non-bindable', '')
    }

    proto.attachedCallback = function () {
      model.element = $(this)
      if (model.initialize)
        model.initialize()
    }

    document.registerElement(name, {prototype: proto})
  }

}