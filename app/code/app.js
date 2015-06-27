window.bloom = window.bloom || {}
bloom.Flower = function() {
  var temp = document.querySelector('#' + this.template)
  this.element = $(document.importNode(temp.content.childNodes[1], true))
}
bloom.Flower.prototype = {}
bloom.Flower.prototype.template = ''
bloom.Flower.prototype.element = null
bloom.Garden = function() {}
bloom.Garden.vineyard_url = 'http://localhost:3000/'
bloom.Garden.start = function() {
  var $injector = angular.injector(['ng'])
  window.$q = $injector.get('$q')
  bloom.Garden.query({
    trellis: 'user',
    filters: [
      {
        path: 'id',
        value: 'user',
        type: 'parameter'
      }
    ],
    version: '1.0.0.browser'
  }).then(function(response) {
    var user = response.objects[0]
    if (user.username == 'anonymous')
      bloom.Garden.goto(new bloom.Garden_Login())
    else
      bloom.Garden.goto(new bloom.Garden_Hub())
  })
}
bloom.Garden.goto = function(flower) {
  $('.current-page').remove()
  flower.element.insertAfter($('header'))
  flower.initialize()
}
bloom.Garden.query = function(data) {
  return bloom.Garden.post('vineyard/query', data)
}
bloom.Garden.post = function(path, data) {
  return bloom.Garden.http('POST', path, data)
}
bloom.Garden.get = function(path) {
  return bloom.Garden.http('GET', path)
}
bloom.Garden.http = function(method, path, data) {
  if (data === undefined)
    data = null
  
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
    success: function(response) {
      def.resolve(response)
    }
  }
  jQuery.ajax(bloom.Garden.vineyard_url + path, options)
  return def.promise
}
bloom.Garden_Hub = function() {bloom.Flower.apply(this)}
bloom.Garden_Hub.prototype = Object.create(bloom.Flower.prototype)
bloom.Garden_Hub.prototype.template = 'garden-hub'
bloom.Garden_Hub.prototype.initialize = function() {
  bloom.Garden.get('vineyard/schema').then(function(response) {
    var objects = response.objects
    var list = $('left-bar')
    list.empty()
    for (var name in objects) {
      var trellis = objects[name]
      var link = $('<a href="' + '">' + name + '</a>')
      link.click(function(e) {
        e.preventDefault()
      })
      list.append(link)
    }
  })
}
bloom.Garden_Login = function() {bloom.Flower.apply(this)}
bloom.Garden_Login.prototype = Object.create(bloom.Flower.prototype)
bloom.Garden_Login.prototype.template = 'garden-login'
bloom.Garden_Login.prototype.initialize = function() {
  var self = this
  this.element.submit(function(e) {
    e.preventDefault()
    var data = {
      name: self.element.find('#name').val(),
      pass: self.element.find('#pass').val()
    }
    bloom.Garden.post('vineyard/login', data).then(function(response) {
      bloom.Garden.goto('garden-hub')
    })
  })
}
//# sourceMappingURL=app.js.map