/// <reference path="../code/garden.ts"/>
/// <reference path="../code/vineyard.ts"/>
(function () {
    var bulbs = {
        "trellis-link": {
            initialize: function (elements, args) {
                elements.link.innerHTML = args.trellis.name;
                elements.link.addEventListener('click', function (e) {
                    e.preventDefault();
                    goto_trellis(args.trellis);
                });
            }
        },
        "garden-hub": {
            initialize: function (elements, args) {
                Wind.vineyard.post('vineyard/gardener/schema', {}).then(function (response) {
                    console.log(response);
                    var trellises = response.data.objects.sort(Graft.sort('name')).map(prepare_trellis);
                    var list = elements.trellises;
                    MetaHub.sequence([
                        new MetaHub.Variable(trellises),
                        new MetaHub.List_Map(function (item, name) {
                            var link = Bloom.create_flower('trellis-link', {
                                trellis: item
                            });
                            return link.element;
                        }),
                        new Graft.Element_List_Input(list)
                    ]);
                    var page_args = Spade.get_query_arguments();
                    if (page_args.trellis) {
                        var trellis = trellises.filter(function (t) {
                            return t.name == page_args.trellis;
                        })[0];
                        if (trellis) {
                            var id = page_args[trellis.primary_key];
                            if (!id) {
                                content.set_value(Bloom.create_flower('entity-list', { trellis: trellis }));
                            }
                            else {
                                var query = {
                                    "trellis": trellis.name,
                                    "filters": [
                                        {
                                            "path": trellis.primary_key,
                                            "value": id
                                        }
                                    ],
                                    "version": "browser"
                                };
                                var seed = {};
                                seed[trellis.primary_key] = id;
                                Wind.vineyard.query(query).then(function (response) {
                                    content.set_value(Bloom.create_flower('entity-edit', {
                                        trellis: trellis,
                                        seed: response.objects[0]
                                    }));
                                });
                            }
                        }
                    }
                });
                var content = new MetaHub.Variable(null);
                MetaHub.sequence([
                    content,
                    new MetaHub.Map(function (page) {
                        return page ? page.element : null;
                    }),
                    new Graft.Element_Input(elements.content_placeholder)
                ]);
                goto_trellis = function (trellis) {
                    content.set_value(Bloom.create_flower('entity-list', { trellis: trellis }));
                    Spade.set_query_arguments({ trellis: trellis.name });
                };
                goto_entity = function (trellis, seed) {
                    content.set_value(Bloom.create_flower('entity-edit', { trellis: trellis, seed: seed }));
                    var args = {
                        trellis: trellis.name
                    };
                    args[trellis.primary_key] = seed[trellis.primary_key];
                    Spade.set_query_arguments(args);
                };
            }
        }
    };
    Bulb_Loader.register_many_bulbs(bulbs);
    function prepare_trellis(trellis) {
        trellis.primary_key = trellis.primary_key || 'id';
        trellis.is_virtual = trellis.is_virtual || false;
        return trellis;
    }
})();
var goto_trellis;
var goto_entity;
