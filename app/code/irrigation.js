var Irrigation;
(function (Irrigation) {
    function set_query_arguments(args) {
        var arg_strings = Functional.map_to_array(args, function (arg, i) {
            return i + '=' + arg;
        });
        var query = arg_strings.length > 0 ? '?' + arg_strings.join('&') : '';
        var url = window.location.protocol + "//" + window.location.host + window.location.pathname + query;
        history.pushState({}, '', url);
    }
    Irrigation.set_query_arguments = set_query_arguments;
    var Location_Node = (function () {
        function Location_Node() {
            this.value = Location_Node.load_from_browser();
        }
        Location_Node.prototype.get_value = function () {
            return this.value;
        };
        Location_Node.get_query_arguments = function () {
            var result = {};
            var text = window.location.search;
            var items = text.slice(1).split(/[\&=]/);
            if (items.length < 2)
                return {};
            for (var x = 0; x < items.length; x += 2) {
                result[items[x]] = decodeURIComponent(items[x + 1].replace(/\+/g, ' '));
            }
            return result;
        };
        Location_Node.load_from_browser = function () {
            return {
                path: [],
                args: Location_Node.get_query_arguments()
            };
        };
        return Location_Node;
    })();
    Irrigation.Location_Node = Location_Node;
})(Irrigation || (Irrigation = {}));
