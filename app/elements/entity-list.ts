/// <reference path="../code/garden.ts"/>
/// <reference path="../code/vineyard.ts"/>

declare var Traveler:any
declare var goto_entity:any

(function () {
  Bulb_Loader.register_many_bulbs({
    "entity-list": {
      initialize: function (elements, args) {
        var trellis = args.trellis
        elements.title.innerHTML = trellis.name
        var properties = Vineyard.Trellis.prepare_properties(trellis)
        this.flowers.table.inputs.header.set_value(properties.map((p)=>p.name))
        //populate_row(elements.header, properties, function(property, i) {
        //  return i
        //})

        Wind.vineyard.query({
          "trellis": trellis.name,
          "version": "1.0.0.browser"
        })
          .then(function (response) {
            MetaHub.sequence([
              new MetaHub.Variable(response.objects),
              new MetaHub.List_Map(function (item, name) {
                var link = Bloom.create_flower('entity-row', {
                  seed: item,
                  trellis: trellis
                })
                return link.element
              }),
              new Graft.Element_List_Input(elements.list)
            ])
          })
      }
    },

    "entity-row": {
      initialize: function (elements, args) {
        var trellis = args.trellis
        var properties = Vineyard.Trellis.prepare_properties(trellis)

        populate_row(elements.root, properties, function (property, i) {
          return format_property_value(args.seed, property, i)
        })

        elements.root.addEventListener('click', function (e) {
          e.preventDefault()
          goto_entity(args.trellis, args.seed)
        })
      }
    },

    "entity-edit": {
      initialize: function (elements, args) {
        var trellis = args.trellis, seed = args.seed
        elements.title.innerHTML = trellis.name
      }
    },

    "bloom-table": {
      //inputs: {
      //  header: {}
      //},
      initialize: function (elements, args) {
        this.inputs = {
          header: new MetaHub.Variable<any[]>(null)
        }
        MetaHub.sequence([
          this.inputs.header,
          new MetaHub.List_Map(function (item) {
            var cell = document.createElement('bloom-cell')
            cell.innerHTML = item
            return cell
          }),
          new Graft.Element_List_Input(elements.header)
        ])
      }
    }
  })

  function format_property_value(seed, property, i) {
    var value = seed[property.name]
    if (value) {
      if (property.type == 'text') {
        value = value.substr(0, 50)
      }
    }
    else {
      value = ''
    }

    return value
  }

  function populate_row(element, list, mapper) {
    var cells = Traveler.map(list, function (item, i) {
      var cell = document.createElement('bloom-cell')
      cell.innerHTML = mapper(item, i)
      var top = document.createElement('bloom-cell-top')
      var bottom = document.createElement('bloom-cell-bottom')
      cell.insertBefore(top, cell.firstChild)
      cell.insertBefore(bottom, cell.firstChild)
      return cell
    })

    Spade.append_list(element, cells)
  }

})()