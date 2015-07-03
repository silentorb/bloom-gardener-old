/// <reference path="bloom.ts"/>
/// <reference path="spade.ts"/>
/// <reference path="bulb_loader.ts"/>
/// <reference path="graft.ts"/>

module Garden {

  var change_page

  export function start() {

    var placeholder = document.getElementsByTagName('page-placeholder')[0]
    change_page = Graft.bind_to_element(placeholder, null, (page) => page.element)

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
    change_page(new_page)
  }

}

document.addEventListener('DOMContentLoaded', function () {
  Bulb_Loader.load_templates('elements/elements.html')
    .then(() => {
      Garden.start()
    })
})