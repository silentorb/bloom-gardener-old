/// <reference path="../code/garden.ts"/>
(function () {
    var bulbs = {
        "trellis-link": {
            initialize: function (elements, args) {
                elements.root.innerHTML = args.trellis.name;
                elements.root.addEventListener('click', function (e) {
                    e.preventDefault();
                    args.click(args.trellis);
                });
            }
        },
        "garden-hub": {
            initialize: function (elements, args) {
                Wind.vineyard.get('vineyard/schema')
                    .then(function (response) {
                    console.log(response);
                    var trellises = response.data.objects.sort(Graft.sort('name'));
                    var list = elements.trellises;
                    Graft.bind_list_to_element(list, trellises, function (item, name) {
                        var link = Bloom.create_flower('trellis-link', {
                            trellis: item,
                            click: click_trellis
                        });
                        return link.element;
                    });
                });
                var change_content = Graft.bind_to_element(elements.content_placeholder, null, function (page) { return page.element; });
                function click_trellis(trellis) {
                    change_content(Bloom.create_flower('seed-list', { trellis: trellis }));
                }
            }
        },
        "seed-list": {
            initialize: function (elements, args) {
                var trellis = args.trellis;
                elements.title.innerHTML = trellis.name;
                Wind.vineyard.query({
                    "trellis": trellis.name,
                    "version": "1.0.0.browser"
                })
                    .then(function (response) {
                    Graft.bind_list_to_element(elements.list, response.objects, function (item, name) {
                        var link = Bloom.create_flower('entity-row', {
                            seed: item,
                            trellis: trellis
                        });
                        return link.element;
                    });
                });
            }
        },
        "entity-row": {
            initialize: function (elements, args) {
                var trellis = args.trellis;
                if (trellis.properties.name) {
                    elements.name.innerHTML = name;
                }
            }
        }
    };
    function load_bulbs(bulbs) {
        for (var i in bulbs) {
            var bulb = bulbs[i];
            bulb.name = i;
            Bloom.add_bulb(Bulb_Loader.create_bulb(bulb));
        }
    }
    load_bulbs(bulbs);
    function prepare_trellis(trellis) {
        trellis.primary_key = trellis.primary_key || 'id';
        trellis.is_virtual = trellis.is_virtual || false;
        return trellis;
    }
})();
//# sourceMappingURL=garden-hub.js.map