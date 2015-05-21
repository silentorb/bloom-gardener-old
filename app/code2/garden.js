/// <reference path="../code/bloom.ts"/>
var Garden = (function () {
    function Garden() {
    }
    Garden.start = function () {
        var $injector = angular.injector(['ng']);
        window['$q'] = $injector.get('$q');
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
        }).then(function (response) {
            var user = response.objects[0];
            if (user.username == 'anonymous') {
                Garden.goto('garden-login');
            }
            else {
                Garden.goto('garden-hub');
            }
        });
    };
    Garden.goto = function (name) {
        $('.current-page').remove();
        var new_page = $('<' + name + '/>');
        new_page.addClass('current-page');
        new_page.insertAfter($('header'));
    };
    Garden.query = function (data) {
        return Garden.post('vineyard/query', data);
    };
    Garden.post = function (path, data) {
        return Garden.http('POST', path, data);
    };
    Garden.get = function (path) {
        return Garden.http('GET', path);
    };
    Garden.http = function (method, path, data) {
        if (data === void 0) { data = null; }
        var def = $q.defer();
        var options = {
            method: method,
            contentType: 'application/json',
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (response) {
                def.resolve(response);
            }
        };
        jQuery.ajax(this.vineyard_url + path, options);
        return def.promise;
    };
    Garden.vineyard_url = 'http://localhost:3000/';
    return Garden;
})();
$(function () {
    Garden.start();
});
Bloom.grow();
//# sourceMappingURL=garden.js.map