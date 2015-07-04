/// <reference path="bloom.ts"/>
/// <reference path="wind.ts"/>

module Bulb_Loader {
  var templates = {}

  export interface Source {
    name:string
    template?:string
    initialize?:{(elements, args):void}
  }

  interface Extended_Flower extends Bloom.Flower {
    elements?
  }

  export function load_templates(url):Promise<void> {
    return Wind.get(url)
      .then((response) => {
        var parser = new DOMParser()
        var lib = <any>parser.parseFromString(response.data, "text/html")
        var additions = lib.children[0].children[1].children
        for (var i = 0; i < additions.length; ++i) {
          load_template(additions[i])
        }
      })
  }

  export function load_template(node) {
    var name = node.getAttribute('name')
    if (!name)
      throw new Error('Loaded template is missing required name attribute.')

    templates[name] = node
  }

  export function create_bulb(data:Source):Bloom.Bulb {
    if (!data.template)
      data.template = data.name

    var bulb = {
      name: data.name,
      children: [],
      instantiate: (element, args)=> create_flower(element, data, args)
    }

    return bulb
  }

  function render(template_name) {
    return templates[template_name].cloneNode(true)
  }

  function create_flower(element, data:Source, args = {}):Bloom.Flower {
    element = element || render(data.template)
    var flower:Extended_Flower = {
      element: element,
      children: [],
      elements: {
        root: element
      }
    }

    process_tree(element, data, flower.elements)

    if (data.initialize)
      data.initialize.call(flower, flower.elements, args)

    return flower
  }

  function process_tree(element, data, result) {
    for (var i = 0; i < element.children.length; ++i) {
      var child = element.children[i]
      var name = child.getAttribute('name')
      if (name) {
        result[name] = child
      }

      var bulb = Bloom.get_bulb(child.nodeName.toLowerCase())
      if (bulb) {
        bulb.instantiate(child)
      }
      process_tree(child, data, result)
    }

    return result
  }
}