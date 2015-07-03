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
      instantiate: (args)=> create_flower(data, args)
    }

    return bulb
  }

  function render(template_name) {
    return templates[template_name].cloneNode(true)
  }

  function create_flower(data:Source, args):Bloom.Flower {
    var element = render(data.template)
    var flower:Extended_Flower = {
      element: element,
      children: []
    }

    var elements = {
      root: element
    }

    flower.elements =  aggregate_properties(element, data, elements)

    if (data.initialize)
      data.initialize(flower.elements, args)

    return flower
  }

  function aggregate_properties(element, data, result = {}) {
    for (var i = 0; i < element.children.length; ++i) {
      var child = element.children[i]
      var name = child.getAttribute('name')
      if (name) {
        result[name] = child
      }
      aggregate_properties(child, data, result)
    }

    return result
  }
}