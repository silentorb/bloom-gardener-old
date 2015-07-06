var Spade;
(function (Spade) {
    function remove(node) {
        node.parentNode.removeChild(node);
    }
    Spade.remove = remove;
    function insert_after(first, second) {
        first.parentNode.insertBefore(second, first.nextSibling);
    }
    Spade.insert_after = insert_after;
    function create_from_string(input) {
        var div = document.createElement('div');
        div.innerHTML = input;
        return div.childNodes[0];
    }
    Spade.create_from_string = create_from_string;
    function get_query_arguments() {
        var result = {};
        var text = window.location.search;
        var items = text.slice(1).split(/[\&=]/);
        if (items.length < 2)
            return {};
        for (var x = 0; x < items.length; x += 2) {
            result[items[x]] = decodeURIComponent(items[x + 1].replace(/\+/g, ' '));
        }
        return result;
    }
    Spade.get_query_arguments = get_query_arguments;
    function append_list(element, list) {
        for (var i in list) {
            element.appendChild(list[i]);
        }
    }
    Spade.append_list = append_list;
    function set_query_arguments(args) {
        var arg_strings = Traveler.map_to_array(args, function (arg, i) {
            return i + '=' + arg;
        });
        var query = arg_strings.length > 0 ? '?' + arg_strings.join('&') : '';
        var url = window.location.protocol + "//" + window.location.host + window.location.pathname + query;
        history.pushState({}, '', url);
    }
    Spade.set_query_arguments = set_query_arguments;
})(Spade || (Spade = {}));
