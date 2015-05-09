/// <reference path="bloom.ts"/>
/// <reference path="../../../DefinitelyTyped/angularjs/angular.d.ts"/>

declare var $q

interface Query_Response {
  objects: any[]
}

class Garden {

  vineyard_url:string = 'http://localhost:3000/'

  start() {
    var $injector = angular.injector(['ng'])
    window['$q'] = $injector.get('$q')

    this.query({
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
          this.goto_login()
        }
      })
  }

  goto_login() {
    var content = $('content')
    content.empty()
    content.append($('<garden-login/>'))
  }

  query(data):angular.IPromise<Query_Response> {
    var def = $q.defer()
    var options = {
      method: 'POST',
      contentType: 'application/json',
      crossDomain: true,
      data: JSON.stringify(data),
      dataType: 'json',
      success: (response)=> {
        def.resolve(response)
      }
    }

    jQuery.ajax(this.vineyard_url + 'vineyard/query', options)

    return def.promise
  }
}

$(function () {
  var garden = new Garden()
  garden.start()
})

Bloom.grow()