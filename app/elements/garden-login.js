Bloom.add_bulb(Bulb_Loader.create_bulb({
    name: "garden-login",
    initialize: function (elements) {
        elements.form.addEventListener("submit", function (e) {
            e.preventDefault();
            var data = {
                name: elements.name.value,
                pass: elements.password.value
            };
            Wind.vineyard.post('vineyard/login', data).then(function (response) {
                Garden.goto('garden-hub');
            });
        });
    }
}));
//# sourceMappingURL=garden-login.js.map