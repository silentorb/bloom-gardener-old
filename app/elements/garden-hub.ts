/// <reference path="../code/garden.ts"/>
/// <reference path="../code/vineyard.ts"/>
/// <reference path="../code/irrigation.ts"/>

declare var Functional:any

(function () {
  var bulbs = {
    "trellis-link": {
      initialize: function (elements, args) {
        elements.link.innerHTML = args.trellis.name
        elements.link.addEventListener('click', function (e) {
          e.preventDefault()
          goto_trellis(args.trellis)
        })
      }
    },

    "garden-hub": {
      initialize: function (elements, args) {

        Wind.vineyard.post('vineyard/gardener/schema', {})
          .then(function (response) {
            console.log(response)
            var trellises = response.data.objects.sort(Graft.sort('name')).map(prepare_trellis)
            var list = elements.trellises

            Traveler.sequence([
              new Traveler.Variable<any[]>(trellises),
              new Traveler.List_Map(function (item, name) {
                var link = Bloom.create_flower('trellis-link', {
                  trellis: item
                  //,
                  //goto_trellis: goto_trellis
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
              if (trellis) {
                var id = page_args[trellis.primary_key]
                if (!id) {
                  content.set_value(Bloom.create_flower('entity-list', {trellis: trellis}))
                }
                else {
                  var query = {
                    "trellis": trellis.name,
                    "filters": [
                      {
                        "path": trellis.primary_key,
                        "value": id
                      }
                    ],
                    "version": "browser"
                  }
                  var seed:any = {}
                  seed[trellis.primary_key] = id
                  Wind.vineyard.query(query)
                    .then(function (response) {
                      content.set_value(Bloom.create_flower('entity-edit', {
                        trellis: trellis,
                        seed: response.objects[0]
                      }))
                    })
                }
              }
            }
          })

        var content = new Traveler.Variable<Node>(null)
        Traveler.sequence([
          content,
          new Traveler.Map(function (page) {
            return page ? page.element : null
          }),
          new Graft.Element_Input(elements.content_placeholder)
        ])

        goto_trellis = function (trellis) {
          content.set_value(Bloom.create_flower('entity-list', {trellis: trellis}))
          Irrigation.set_query_arguments({trellis: trellis.name})
        }

        goto_entity = function (trellis, seed) {
          content.set_value(Bloom.create_flower('entity-edit', {trellis: trellis, seed: seed}))
          var args:any = {
            trellis: trellis.name
          }
          args[trellis.primary_key] = seed[trellis.primary_key]
          Irrigation.set_query_arguments(args)
          window.scrollTo(0, 0)
        }
      }
    }
  }

  Bulb_Loader.register_many_bulbs(bulbs)

  function prepare_trellis(trellis) {
    trellis.primary_key = trellis.primary_key || 'id'
    trellis.is_virtual = trellis.is_virtual || false
    return trellis
  }

})()

var goto_trellis
var goto_entity