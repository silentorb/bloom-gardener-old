/// <reference path="../../defs/es6-promise.d.ts"/>
var Wind;
(function (Wind) {
    Wind.vineyard_url = 'http://localhost:3000/';
    var vineyard;
    (function (vineyard) {
        function query(data) {
            return json('POST', Wind.vineyard_url + 'vineyard/query', data).then(function (response) { return response.data; });
        }
        vineyard.query = query;
        function post(path, data) {
            return json('POST', Wind.vineyard_url + path, data);
        }
        vineyard.post = post;
        function get(path) {
            return json('GET', Wind.vineyard_url + path);
        }
        vineyard.get = get;
    })(vineyard = Wind.vineyard || (Wind.vineyard = {}));
    function post(path, data) {
        return http('POST', path, data);
    }
    Wind.post = post;
    function get(path) {
        return http('GET', path);
    }
    Wind.get = get;
    function json(method, path, data) {
        if (data === void 0) { data = null; }
        return http(method, path, data).then(function (response) {
            response.data = JSON.parse(response.data);
            return response;
        });
    }
    Wind.json = json;
    function http(method, path, data) {
        if (data === void 0) { data = null; }
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, path, true);
            xhr.withCredentials = true;
            if (data)
                xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 400) {
                    resolve({
                        status: xhr,
                        data: xhr.responseText
                    });
                }
                else {
                    reject(xhr);
                }
            };
            xhr.onerror = function (error) {
                reject(error);
            };
            xhr.send(JSON.stringify(data));
        });
    }
    Wind.http = http;
})(Wind || (Wind = {}));
