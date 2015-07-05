/// <reference path="../code/garden.ts"/>

declare var Traveler:any

(function () {
  var bulbs = {
    "trellis-link": {
      initialize: function (elements, args) {
        elements.root.innerHTML = args.trellis.name
        elements.root.addEventListener('click', function (e) {
          e.preventDefault()
          args.click(args.trellis)
        })
      }
    },

    "garden-hub": {
      initialize: function (elements, args) {

        Wind.vineyard.get('vineyard/schema')
          .then(function (response) {
            console.log(response)
            var trellises = response.data.objects.sort(Graft.sort('name'))
            var list = elements.trellises

            MetaHub.sequence([
              new MetaHub.Variable<any[]>(trellises),
              new MetaHub.List_Map(function (item, name) {
                var link = Bloom.create_flower('trellis-link', {
                  trellis: item,
                  click: click_trellis
                })
                return link.element
              }),
              new Graft.Element_List_Input(list)
            ])

            var page_args = Spade.get_query_arguments()
            if (page_args.trellis) {
              var trellis = trellises.filter(function (t) {
                return t.name == page_args.trellis
              })[0]
              if (trellis)
                content.set_value(Bloom.create_flower('entity-list', {trellis: trellis}))
            }
          })

        var content = new MetaHub.Variable<Node>(null)
        MetaHub.sequence([
          content,
          new MetaHub.Map(function (page) {
            return page ? page.element : null
          }),
          new Graft.Element_Input(elements.content_placeholder)
        ])

        //var change_content = Graft.bind_to_element(elements.content_placeholder,
        //  new Graft.Literal_Output<Node>(null),
        //  function (page) {
        //    return page.element
        //  })

        function click_trellis(trellis) {
          content.set_value(Bloom.create_flower('entity-list', {trellis: trellis}))
        }
      }
    },

    "entity-list": {
      initialize: function (elements, args) {
        var trellis = args.trellis
        elements.title.innerHTML = trellis.name
        var properties = Traveler.filter(trellis.properties, property_filter)

        this.flowers.table.inputs.header.set_value(Traveler.map_to_array(properties, function(p, i) {
          return i
        }))
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
        var properties = Traveler.filter(trellis.properties, property_filter)

        populate_row(elements.root, properties, function (property, i) {
          return format_property_value(args.seed, property, i)
        })
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
  }

  function property_filter(property) {
    return property.type != 'list' && property.type != 'reference'
  }

  function format_property_value(seed, property, i) {
    var value = seed[i]
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
      return cell
    })

    Spade.append_list(element, cells)
  }

  function load_bulbs(bulbs) {
    for (var i in bulbs) {
      var bulb = bulbs[i]
      bulb.name = i
      Bloom.add_bulb(Bulb_Loader.create_bulb(bulb))
    }
  }

  load_bulbs(bulbs)

  function prepare_trellis(trellis) {
    trellis.primary_key = trellis.primary_key || 'id'
    trellis.is_virtual = trellis.is_virtual || false
    return trellis
  }
})
()
