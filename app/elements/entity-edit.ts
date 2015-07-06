/// <reference path="../code/garden.ts"/>

declare var Traveler:any

(function () {
  var bulbs = {
    "entity-edit": {
      initialize: function (elements, args) {
        var trellis = args.trellis, seed = args.seed
        var properties = Traveler.filter(trellis.properties, property_filter)
        var title = trellis.name + ' ' + seed[trellis.primary_key]
        if (trellis.properties.name && seed.name) {
          title += ' ' + seed.name
        }

        elements.title.innerHTML = title

        for (var i in properties) {
          if (i == trellis.primary_key)
            continue

          var wrapper = document.createElement('div')
          var label = document.createElement('label')
          label.innerHTML = i
          wrapper.appendChild(label)
          wrapper.appendChild(document.createElement('br'))
          elements.fields.appendChild(wrapper)
          var field = create_field(i, trellis.properties[i], args.seed)
          wrapper.appendChild(field)
        }
      }
    }
  }

  Bulb_Loader.register_many_bulbs(bulbs)

  function create_field(name, property, seed) {
    if (methods[property.type]) {
      return methods[property.type](name, property, seed)
    }

    return create_string_field(name, property, seed)
  }

  function create_string_field(name, property, seed) {
    var field = document.createElement('input')
    field.type = 'text'
    field.value = seed[name]
    field.setAttribute('name', name)
    return field
  }

  function create_bool_field(name, property, seed) {
    var field = document.createElement('input')
    field.type = 'checkbox'
    field.checked = seed[name]
    field.setAttribute('name', name)
    return field
  }

  function property_filter(property) {
    return property.type != 'list' && property.type != 'reference'
  }

  var methods = {
    'bool': create_bool_field,
    'string': create_string_field
  }
})
()
