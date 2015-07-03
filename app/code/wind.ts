/// <reference path="../../defs/es6-promise.d.ts"/>

module Wind {
  export var vineyard_url = 'http://localhost:3000/'

  export interface Query_Response {
    objects?: any[]
    trellises?: any[]
  }

  export interface Response {
    status:string
    data
  }

  export module vineyard {
    export function query(data):Promise<Query_Response> {
      return json('POST', vineyard_url + 'vineyard/query', data)
        .then((response) => response.data)
    }

    export function post(path, data):Promise<Response> {
      return json('POST', vineyard_url + path, data)
    }

    export function get(path):Promise<Response> {
      return json('GET', vineyard_url + path)
    }
  }

  export function post(path, data):Promise<Response> {
    return http('POST', path, data)
  }

  export function get(path):Promise<Response> {
    return http('GET', path)
  }

  export function json(method, path, data = null):Promise<Response> {
    return http(method, path, data)
      .then((response) => {
        response.data = JSON.parse(response.data)
        return response
      })
  }

  export function http(method, path, data = null):Promise<Response> {
    return new Promise((resolve, reject)=> {
      var xhr = new XMLHttpRequest()
      xhr.open(method, path, true)
      xhr.withCredentials = true
      if (data)
        xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 400) {
          resolve({
            status: xhr,
            data: xhr.responseText
          })
        } else {
          reject(xhr)
        }
      }

      xhr.onerror = function (error) {
        reject(error)
      }

      xhr.send(JSON.stringify(data))
    })
  }
}