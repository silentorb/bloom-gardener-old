/// <reference path="../code/garden.ts"/>

Bloom.flower({
  "name": "garden-login",
  "template": "garden-login"
})
class Garden_Login {

  initialize() {
    this.element.find('form').submit((e)=> {
      e.preventDefault()
      var data = {
        name: this.element.find('#name').val(),
        pass: this.element.find('#pass').val()
      }
      Garden.post('vineyard/login', data)
        .then((response)=> {
          Garden.goto('garden-hub')
        })
    })
  }
}