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
})(Spade || (Spade = {}));
//# sourceMappingURL=spade.js.map