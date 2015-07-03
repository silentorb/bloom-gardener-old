/// <reference path="../code/garden.ts"/>
/// <reference path="../code/bulb_loader.ts"/>


Bloom.add_bulb(Bulb_Loader.create_bulb({
  name: "garden-login",
  initialize: function (elements) {
    elements.form.addEventListener("submit", (e)=> {
      e.preventDefault()
      var data = {
        name: elements.name.value,
        pass: elements.password.value
      }

      Wind.vineyard.post('vineyard/login', data)
        .then((response)=> {
          Garden.goto('garden-hub')
        })
    })
  }
}))