/// <reference path="bloom.ts"/>
/// <reference path="wind.ts"/>
var Bulb_Loader;
(function (Bulb_Loader) {
    var templates = {};
    function load_templates(url) {
        return Wind.get(url)
            .then(function (response) {
            var parser = new DOMParser();
            var lib = parser.parseFromString(response.data, "text/html");
            var additions = lib.children[0].children[1].children;
            for (var i = 0; i < additions.length; ++i) {
                load_template(additions[i]);
            }
        });
    }
    Bulb_Loader.load_templates = load_templates;
    function load_template(node) {
        var name = node.getAttribute('name');
        if (!name)
            throw new Error('Loaded template is missing required name attribute.');
        templates[name] = node;
    }
    Bulb_Loader.load_template = load_template;
    function create_bulb(data) {
        if (!data.template)
            data.template = data.name;
        var bulb = {
            name: data.name,
            children: [],
            instantiate: function (element, args) { return create_flower(element, data, args); }
        };
        return bulb;
    }
    Bulb_Loader.create_bulb = create_bulb;
    function render(template_name) {
        return templates[template_name].cloneNode(true);
    }
    function create_flower(element, data, args) {
        if (args === void 0) { args = {}; }
        element = element || render(data.template);
        var flower = {
            element: element,
            children: [],
            elements: {
                root: element
            }
        };
        process_tree(element, data, flower.elements);
        if (data.initialize)
            data.initialize.call(flower, flower.elements, args);
        return flower;
    }
    function process_tree(element, data, result) {
        for (var i = 0; i < element.children.length; ++i) {
            var child = element.children[i];
            var name = child.getAttribute('name');
            if (name) {
                result[name] = child;
            }
            var bulb = Bloom.get_bulb(child.nodeName.toLowerCase());
            if (bulb) {
                bulb.instantiate(child);
            }
            process_tree(child, data, result);
        }
        return result;
    }
})(Bulb_Loader || (Bulb_Loader = {}));
//# sourceMappingURL=bulb_loader.js.map