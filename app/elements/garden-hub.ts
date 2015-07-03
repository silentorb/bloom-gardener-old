/// <reference path="../code/garden.ts"/>

class Garden_Hub implements Bloom.Flower {

  render() {
    return Bloom.create('left-bar', null, [
      Bloom.create('content')
    ])
  }

  initialize() {
    Garden.get('vineyard/schema')
      .then((response) => {
        console.log(response)
        var objects = response.objects
        var list = document.querySelector('left-bar')
        list.innerHTML = ''
        for (var name in objects) {
          var trellis = objects[name]
          var link = Bloom.create_from_string('<a href="' + '">' + name + '</a>')
          link.click((e)=> {
            e.preventDefault()
          })
          list.appendChild(link)
        }

      })
  }
}
