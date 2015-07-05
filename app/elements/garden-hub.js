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
                    var page_args = Spade.get_query_arguments();
                    if (page_args.trellis) {
                        var trellis = trellises.filter(function (t) {
                            return t.name == page_args.trellis;
                        })[0];
                        if (trellis)
                            change_content(Bloom.create_flower('entity-list', { trellis: trellis }));
                    }
                });
                var change_content = Graft.bind_to_element(elements.content_placeholder, new Graft.Literal_Output(null), function (page) {
                    return page.element;
                });
                function click_trellis(trellis) {
                    change_content(Bloom.create_flower('entity-list', { trellis: trellis }));
                }
            }
        },
        "entity-list": {
            initialize: function (elements, args) {
                var trellis = args.trellis;
                elements.title.innerHTML = trellis.name;
                var properties = Traveler.filter(trellis.properties, property_filter);
                //populate_row(elements.header, properties, function(property, i) {
                //  return i
                //})
                Wind.vineyard.query({
                    "trellis": trellis.name,
                    "version": "1.0.0.browser"
                })
                    .then(function (response) {
                    Graft.bind_list_to_element(elements.table, new Graft.Literal_Output(response.objects), function (item, name) {
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
                var properties = Traveler.filter(trellis.properties, property_filter);
                populate_row(elements.root, properties, function (property, i) {
                    return format_property_value(args.seed, property, i);
                });
            }
        },
        "bloom-table": {
            initialize: function (elements, args) {
                Graft.bind_list_to_element(elements.header, args.header, function (item) {
                    var cell = document.createElement('bloom-cell');
                    cell.innerHTML = 'Hello';
                    return cell;
                });
            }
        }
    };
    function property_filter(property) {
        return property.type != 'list' && property.type != 'reference';
    }
    function format_property_value(seed, property, i) {
        var value = seed[i];
        if (value) {
            if (property.type == 'text') {
                value = value.substr(0, 50);
            }
        }
        else {
            value = '';
        }
        return value;
    }
    function populate_row(element, list, mapper) {
        var cells = Traveler.map(list, function (item, i) {
            var cell = document.createElement('bloom-cell');
            cell.innerHTML = mapper(item, i);
            return cell;
        });
        Spade.append_list(element, cells);
    }
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