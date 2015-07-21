/// <reference path="bloom.ts"/>
/// <reference path="spade.ts"/>
/// <reference path="bulb_loader.ts"/>
/// <reference path="graft.ts"/>

module Garden {
  declare var Gardener_Config

  interface Config {
    servers:Server_Config[]
  }

  interface Server_Config {
    name:string
    url:string
    views:{ [id: string]: View_Config }
  }

  interface View_Config {
    properties:{ [id: string]: View_Property_Config }
  }

  interface View_Property_Config{
    vine
  }

  var change_page:MetaHub.Variable<Node>
  var config:Config

  export var vines = []
  export var views = {}

  export function start() {
    this.config = Gardener_Config
    var server = this.config.servers[0]
    this.views = server.views || {}

    var placeholder = document.getElementsByTagName('page-placeholder')[0]
    change_page = new MetaHub.Variable<Node>(null)
    MetaHub.sequence([
      change_page,
      new MetaHub.Map((page) => page ? page.element : null),
      new Graft.Element_Input(placeholder)
    ])

    Wind.vineyard.query({
      "trellis": "user",
      "filters": [
        {
          "path": "id",
          "value": "user",
          "type": "parameter"
        }
      ],
      "version": "1.0.0.browser"
    })
      .then((response) => {
        var user = response.objects[0]
        if (user.username == 'anonymous') {
          goto('garden-login')
        }
        else {
          goto('garden-hub')
        }
      })
  }

  export function goto(name) {
    var new_page = Bloom.create_flower(name)
    change_page.set_value(new_page)
  }

  export function fertilize(bulbs) {
    for (var i in bulbs) {
      var bulb = bulbs[i]
      if (bulb.type == 'vine') {
        vines[bulb.name] = bulb
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  Bulb_Loader.load_templates('elements/elements.html')
    .then(() => {
      Garden.start()
    })
})