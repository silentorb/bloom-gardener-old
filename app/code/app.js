window.bloom = window.bloom || {}
bloom.Flower = function() {}
bloom.Flower.prototype = {
	element: null
}
window.bloom = window.bloom || {}
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
			bloom.Garden.goto('garden-login')
		else
			bloom.Garden.goto('garden-hub')

	})
}
bloom.Garden.goto = function(name) {
	$('.current-page').remove()
	var new_page = $('<' + name + '/>')
	new_page.addClass('current-page')
	new_page.insertAfter($('header'))
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
window.bloom = window.bloom || {}
bloom.Garden_Hub = function() {}
bloom.Garden_Hub.prototype = {
initialize: function() {
		bloom.Garden_Hub.get('vineyard/schema').then(function(response) {
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
}
window.bloom = window.bloom || {}
bloom.Garden_Login = function() {}
bloom.Garden_Login.prototype = {
initialize: function() {
		this.element.find('form').submit(function(e) {
			e.preventDefault()
			var data = {
				name: this.element.find('#name').val(),
				pass: this.element.find('#pass').val()
			}
			bloom.Garden_Login.post('vineyard/login', data).then(function(response) {
				bloom.Garden_Login.goto('garden-hub')
			})
		})
	}
}
