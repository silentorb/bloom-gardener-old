/// <reference path="bloom.ts"/>
var Garden = (function () {
    function Garden() {
    }
    Garden.start = function () {
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
            .then(function (response) {
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
        Bloom.remove(document.querySelector('.current-page'));
        var new_page = document.querySelector('<' + name + '/>');
        new_page.classList.add('current-page');
        Bloom.insert_after(document.querySelector('header'), new_page);
    };
    Garden.query = function (data) {
        return Garden.post(this.vineyard_url + 'vineyard/query', data);
    };
    Garden.post = function (path, data) {
        return Garden.http('POST', path, data);
    };
    Garden.get = function (path) {
        return Garden.http('GET', path);
    };
    Garden.http = function (method, path, data) {
        if (data === void 0) { data = null; }
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            request.open(method, path, true);
            if (data)
                request.setRequestHeader('Content-Type', 'application/json');
            request.onload = function () {
                if (request.status >= 200 && request.status < 400) {
                    resolve({
                        status: request,
                        data: request.responseText
                    });
                }
                else {
                    reject(request);
                }
            };
            request.onerror = function (error) {
                reject(error);
            };
            request.send(JSON.stringify(data));
        });
    };
    Garden.vineyard_url = 'http://localhost:3000/';
    return Garden;
})();
document.addEventListener('DOMContentLoaded', function () {
    //Garden.start()
    Garden.get('elements/elements.html')
        .then(function (response) {
        var parser = new DOMParser();
        var lib = parser.parseFromString(response.data, "text/html");
        console.log(response);
    });
});
//# sourceMappingURL=garden.js.map