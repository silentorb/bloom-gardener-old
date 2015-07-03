/// <reference path="../code/garden.ts"/>
Bloom.flower({
    "name": "garden-login",
    "template": "garden-login"
});
var Garden_Login = (function () {
    function Garden_Login() {
    }
    Garden_Login.prototype.initialize = function () {
        var _this = this;
        this.element.find('form').submit(function (e) {
            e.preventDefault();
            var data = {
                name: _this.element.find('#name').val(),
                pass: _this.element.find('#pass').val()
            };
            Garden.post('vineyard/login', data)
                .then(function (response) {
                Garden.goto('garden-hub');
            });
        });
    };
    return Garden_Login;
})();
//# sourceMappingURL=garden-login.js.map