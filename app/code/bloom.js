/// <reference path="../../defs/es6-promise.d.ts"/>
var Bloom;
(function (Bloom) {
    var definitions;
    function remove(node) {
        node.parentNode.removeChild(node);
    }
    Bloom.remove = remove;
    function insert_after(first, second) {
        first.parentNode.insertBefore(second, first.nextSibling);
    }
    Bloom.insert_after = insert_after;
    function create_from_string(input) {
        var div = document.createElement('div');
        div.innerHTML = input;
        return div.childNodes;
    }
    Bloom.create_from_string = create_from_string;
    function initialize_function() {
    }
    Bloom.initialize_function = initialize_function;
    //export function create(name, attributes = undefined, children = undefined) {
    //  var result = document.createElement(name)
    //  if (attributes) {
    //    for (var i = 0; i < attributes.length; ++i) {
    //      result.setAttribute(i, attributes[i])
    //    }
    //  }
    //
    //  if (children) {
    //    for (var i = 0; i < children.length; ++i) {
    //      result.appendChild(children[i])
    //    }
    //  }
    //}
    function flower(data) {
    }
    Bloom.flower = flower;
})(Bloom || (Bloom = {}));
//# sourceMappingURL=bloom.js.map