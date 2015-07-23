/// <reference path="../code/garden.ts"/>

declare var Functional:any
declare var goto_trellis:any

interface Field {
  element:HTMLElement
}

(function () {
  var bulbs = {
    "entity-edit": {
      initialize: function (elements, args) {
        var trellis = args.trellis, seed = args.seed
        var properties = Functional.filter(trellis.properties, property_filter)
        var title = '<a href="?trellis=' + trellis.name + '">' + trellis.name + '</a>' + ' ' + seed[trellis.primary_key]
        if (trellis.properties.name && seed.name && trellis.primary_key != 'name') {
          title += ' ' + seed.name
        }

        elements.title.innerHTML = title

        var view = Garden.views[trellis.name] || {
            properties: {}
          }

        var fields = {}
        for (var i in properties) {
          if (i == trellis.primary_key)
            continue

          var wrapper = document.createElement('div')
          var label = document.createElement('label')
          label.innerHTML = i
          wrapper.appendChild(label)
          elements.fields.appendChild(wrapper)
          var field = create_field(i, trellis.properties[i], seed, view.properties[i])
          wrapper.appendChild(field.element)
          fields[i] = field
        }

        elements.form.addEventListener("submit", (e)=> {
          e.preventDefault()
          save(trellis, seed, fields)
          .then(function() {
              goto_trellis(trellis)
            })
        })

        elements.prune.addEventListener("click", (e)=> {
          e.preventDefault()
          prune(trellis, seed)
            .then(function() {
              goto_trellis(trellis)
            })
        })
      }
    }
  }

  Bulb_Loader.register_many_bulbs(bulbs)

  var methods = {
    bool: create_bool_field,
    datetime: create_datetime_field,
    date: create_date_field,
    float: create_number_field,
    int: create_int_field,
    string: create_string_field,
    text: create_text_field
  }

  function create_field(name, property, seed, view):Field {
    if (view && view.vine) {
      var vine = Garden.vines[view.vine.name]
      return vine.create(property, seed[name])
    }

    if (methods[property.type]) {
      return methods[property.type](name, property, seed)
    }

    return create_string_field(name, property, seed)
  }

  function create_standard_field(tag, type, name):any {
    var field = document.createElement(tag)
    if (type)
      field.type = type

    field.setAttribute('name', name)
    return field
  }

  function create_string_field(name, property, seed) {
    var field = create_standard_field('input', 'text', name)
    field.value = seed[name]
    return {
      element: field,
      get_value: function () {
        return field.value
      }
    }
  }

  function create_text_field(name, property, seed) {
    var field = create_standard_field('textarea', null, name)
    field.value = seed[name]
    return {
      element: field,
      get_value: function () {
        return field.value
      }
    }
  }

  function create_number_field(name, property, seed) {
    var field = create_standard_field('input', 'number', name)
    field.value = seed[name]
    return {
      element: field,
      get_value: function () {
        return field.value
      }
    }
  }

  function create_int_field(name, property, seed) {
    var field = create_number_field(name, property, seed)
    field.element.min = 0
    field.element.step = 1
    return field
  }

  function create_bool_field(name, property, seed) {
    var field = create_standard_field('input', 'checkbox', name)
    field.checked = seed[name]
    return {
      element: field,
      get_value: function () {
        return field.checked
      }
    }
  }

  function create_datetime_field(name, property, seed) {
    var field = create_standard_field('input', 'datetime', name)
    field.valueAsDate = new Date(seed[name])
    return {
      element: field,
      get_value: function () {
        return field.valueAsDate
      }
    }
  }

  function create_date_field(name, property, seed) {
    var field = create_standard_field('input', 'date', name)
    field.valueAsDate = new Date(seed[name])
    return {
      element: field,
      get_value: function () {
        return field.valueAsDate
      }
    }
  }

  function property_filter(property) {
    return property.type != 'list' && property.type != 'reference'
  }

  function save(trellis, original, fields) {
    var modified = Functional.map(fields, function (field) {
      return field.get_value()
    })
    var seed = {
      trellis: trellis.name
    }
    seed[trellis.primary_key] = original[trellis.primary_key]

    for (var i in modified) {
      if (modified[i] != original[i]) {
        seed[i] = modified[i]
      }
    }

    var update = {
      objects: [seed]
    }

    return Wind.vineyard.post('vineyard/update', update)
  }

  function prune(trellis, original) {
    var seed = {
      trellis: trellis.name
    }
    seed[trellis.primary_key] = original[trellis.primary_key]
    seed['__deleted__'] = true

    var update = {
      objects: [seed]
    }

    return Wind.vineyard.post('vineyard/update', update)
  }

})()
