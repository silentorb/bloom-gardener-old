/// <reference path="../code2/garden.ts"/>
Bloom.flower("garden-hub", {
  initialize: function() {
    Garden.get('vineyard/schema')
      .then((response) => {
        console.log(response)
        var objects = response.objects
        var list = $('left-bar')
        list.empty()
        for (var name in objects) {
          var trellis = objects[name]
          var link = $('<a href="' + '">'+ name + '</a>')
          link.click((e)=> {
            e.preventDefault()
          })
          list.append(link)
        }

      })
  }
})
