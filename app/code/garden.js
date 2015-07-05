/// <reference path="bloom.ts"/>
/// <reference path="spade.ts"/>
/// <reference path="bulb_loader.ts"/>
/// <reference path="graft.ts"/>
var Garden;
(function (Garden) {
    var change_page;
    function start() {
        var placeholder = document.getElementsByTagName('page-placeholder')[0];
        change_page = new MetaHub.Literal(null);
        MetaHub.sequence([
            change_page,
            new MetaHub.Map(function (page) { return page ? page.element : null; }),
            new Graft.Element_Input(placeholder)
        ]);
        Wind.vineyard.query({
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
                goto('garden-login');
            }
            else {
                goto('garden-hub');
            }
        });
    }
    Garden.start = start;
    function goto(name) {
        var new_page = Bloom.create_flower(name);
        change_page.set_value(new_page);
    }
    Garden.goto = goto;
})(Garden || (Garden = {}));
document.addEventListener('DOMContentLoaded', function () {
    Bulb_Loader.load_templates('elements/elements.html')
        .then(function () {
        Garden.start();
    });
});
//# sourceMappingURL=garden.js.map