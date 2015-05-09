/// <reference path="bloom.ts"/>

declare var $q

interface Query_Response {
  objects: any[]
}

class Garden {

  static vineyard_url:string = 'http://localhost:3000/'
  static instance:Garden

  static start() {
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
          Garden.goto('garden-login')
        }
        else {
          Garden.goto('garden-hub')
        }
      })
  }

  static goto(name) {
    $('.current-page').remove()
    var new_page = $('<'+ name + '/>')
    new_page.addClass('current-page')
    new_page.insertAfter($('header'))
  }

  static query(data):angular.IPromise<Query_Response> {
    return Garden.post('vineyard/query', data)
  }

  static post(path, data):angular.IPromise<Query_Response> {
    return Garden.http('POST', path, data)
  }

  static get(path):angular.IPromise<Query_Response> {
    return Garden.http('GET', path)
  }

  static http(method, path, data = null):angular.IPromise<Query_Response> {
    var def = $q.defer()
    var options = {
      method: method,
      contentType: 'application/json',
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      },
      data: JSON.stringify(data),
      dataType: 'json',
      success: (response)=> {
        def.resolve(response)
      }
    }

    jQuery.ajax(this.vineyard_url + path, options)

    return def.promise
  }
}

$(function () {
  Garden.start()
})

Bloom.grow()