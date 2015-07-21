var Vineyard;
(function (Vineyard) {
    var Trellis;
    (function (Trellis) {
        function get_identity(trellis, seed) {
            return seed[trellis.primary_key];
        }
        Trellis.get_identity = get_identity;
        function prepare_properties(trellis) {
            return Traveler.map_to_array(trellis.properties, function (p, i) {
                p.name = i;
                return p;
            }).filter(property_filter).sort(create_property_sort(trellis));
        }
        Trellis.prepare_properties = prepare_properties;
        function property_filter(property) {
            return property.type != 'list' && property.type != 'reference';
        }
        function create_property_sort(trellis) {
            return function (a, b) {
                if (a.name == trellis.primary_key)
                    return -1;
                if (b.name == trellis.primary_key)
                    return 1;
                return 0;
            };
        }
    })(Trellis = Vineyard.Trellis || (Vineyard.Trellis = {}));
})(Vineyard || (Vineyard = {}));
