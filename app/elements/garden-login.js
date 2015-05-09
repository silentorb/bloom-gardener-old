/// <reference path="../code/garden.ts"/>
Bloom.flower("garden-login", {
    initialize: function () {
        var _this = this;
        this.element.find('form').submit(function (e) {
            e.preventDefault();
            var data = {
                name: _this.element.find('#name').val(),
                pass: _this.element.find('#pass').val()
            };
            Garden.post('vineyard/login', data).then(function (response) {
                Garden.goto('garden-hub');
            });
        });
    }
});
//# sourceMappingURL=garden-login.js.map