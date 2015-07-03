/// <reference path="../code/garden.ts"/>

Bloom.add_bulb(Bulb_Loader.create_bulb({
  name: "trellis-link",
  initialize: function (elements, args) {
    elements.root.innerHTML = args.trellis.name
    elements.root.addEventListener('click', function (e) {
      e.preventDefault()
      args.click(args.trellis)
    })
  }
}))

Bloom.add_bulb(Bulb_Loader.create_bulb({
  name: "garden-hub",
  initialize: function (elements, args) {
    Wind.vineyard.get('vineyard/schema')
      .then(function (response) {
        console.log(response)
        var objects = response.data.objects || response.data.trellises
        var list = elements.left_bar
        var trellises = cleanup_trellis_list(objects)

        Graft.bind_list_to_element(list, trellises, function (item, name) {
          var link = Bloom.create_flower('trellis-link', {
            trellis: item,
            click: click_trellis
          })
          return link.element
        })
      })

    var change_content = Graft.bind_to_element(elements.content_placeholder, null, (page) => page.element)

    function click_trellis(trellis) {
      change_content(Bloom.create_flower('seed-list', { trellis: trellis }))
    }
  }
}))

Bloom.add_bulb(Bulb_Loader.create_bulb({
  name: "seed-list",
  initialize: function (elements, args) {
    var trellis = args.trellis
    elements.title.innerHTML = trellis.name

    Wind.vineyard.query({
      "trellis": trellis.name,
      "version": "1.0.0.browser"
    })
      .then((response) => {
        Graft.bind_list_to_element(elements.list, response.objects, function (item, name) {
          var link = Bloom.create_flower('entity-row', {
            seed: item,
            trellis: trellis
          })
          return link.element
        })
      })
  }
}))

Bloom.add_bulb(Bulb_Loader.create_bulb({
  name: "entity-row",
  initialize: function (elements, args) {
    var trellis = args.trellis
    if (trellis.properties.name) {
      elements.name.innerHTML = name
    }
  }
}))

function cleanup_trellis_list(trellises) {
  var result = []
  for (var i in trellises) {
    var trellis = trellises[i]
    trellis.name = i
    result.push(trellis)
  }
  result.sort(function (a, b) {
    if (a.name == b.name)
      return 0

    return a.name < b.name ? -1 : 1
  })

  return result
}
