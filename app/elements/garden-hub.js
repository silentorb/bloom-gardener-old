/// <reference path="../code/garden.ts"/>
var Garden_Hub = (function () {
    function Garden_Hub() {
    }
    Garden_Hub.prototype.render = function () {
        return Bloom.create('left-bar', null, [
            Bloom.create('content')
        ]);
    };
    Garden_Hub.prototype.initialize = function () {
        Garden.get('vineyard/schema')
            .then(function (response) {
            console.log(response);
            var objects = response.objects;
            var list = document.querySelector('left-bar');
            list.innerHTML = '';
            for (var name in objects) {
                var trellis = objects[name];
                var link = Bloom.create_from_string('<a href="' + '">' + name + '</a>');
                link.click(function (e) {
                    e.preventDefault();
                });
                list.appendChild(link);
            }
        });
    };
    return Garden_Hub;
})();
//# sourceMappingURL=garden-hub.js.map