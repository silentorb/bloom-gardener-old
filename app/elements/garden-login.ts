/// <reference path="../code2/garden.ts"/>

Bloom.flower("garden-login", {
  initialize: function () {
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
})