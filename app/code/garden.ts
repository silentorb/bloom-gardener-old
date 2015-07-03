/// <reference path="bloom.ts"/>

interface Query_Response {
  objects: any[]
}

class Garden {
  static vineyard_url:string = 'http://localhost:3000/'
  static instance:Garden

  static start() {
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
    Bloom.remove(document.querySelector('.current-page'))
    var new_page = document.querySelector('<' + name + '/>')
    new_page.classList.add('current-page')
    Bloom.insert_after(document.querySelector('header'), new_page)
  }

  static query(data):Promise<Query_Response> {
    return Garden.post(this.vineyard_url + 'vineyard/query', data)
  }

  static post(path, data):Promise<any> {
    return Garden.http('POST', path, data)
  }

  static get(path):Promise<any> {
    return Garden.http('GET', path)
  }

  static http(method, path, data = null):Promise<any> {
    return new Promise((resolve, reject)=> {
      var request = new XMLHttpRequest()
      request.open(method, path, true)
      if (data)
        request.setRequestHeader('Content-Type', 'application/json');

      request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
          resolve({
            status: request,
            data: request.responseText
          })
        } else {
          reject(request)
        }
      }

      request.onerror = function (error) {
        reject(error)
      }

      request.send(JSON.stringify(data))
    })
  }
}

document.addEventListener('DOMContentLoaded', function () {
  //Garden.start()
  Garden.get('elements/elements.html')
  .then((response) => {
      var parser = new DOMParser()
      var lib = parser.parseFromString(response.data, "text/html")
      console.log(response)
    })
})