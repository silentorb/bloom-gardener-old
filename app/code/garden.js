/// <reference path="bloom.ts"/>
/// <reference path="../../../DefinitelyTyped/angularjs/angular.d.ts"/>
var Garden = (function () {
    function Garden() {
        this.vineyard_url = 'http://localhost:3000/';
    }
    Garden.prototype.start = function () {
        var _this = this;
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
                _this.goto('garden-login');
            }
        });
    };
    Garden.prototype.goto = function (name) {
        $('.current-page').remove();
        var new_page = $('<' + name + '/>');
        new_page.addClass('current-page');
        new_page.insertAfter($('header'));
    };
    Garden.prototype.query = function (data) {
        var def = $q.defer();
        var options = {
            method: 'POST',
            contentType: 'application/json',
            crossDomain: true,
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (response) {
                def.resolve(response);
            }
        };
        jQuery.ajax(this.vineyard_url + 'vineyard/query', options);
        return def.promise;
    };
    return Garden;
})();
$(function () {
    var garden = new Garden();
    garden.start();
});
Bloom.grow();
//# sourceMappingURL=garden.js.map