/// <reference path="bloom.ts"/>
/// <reference path="wind.ts"/>
var Bulb_Loader;
(function (Bulb_Loader) {
    var templates = {};
    function load_templates(url) {
        return Wind.get(url).then(function (response) {
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
    function register_many_bulbs(bulbs) {
        for (var i in bulbs) {
            var bulb = bulbs[i];
            bulb.name = i;
            Bloom.add_bulb(Bulb_Loader.create_bulb(bulb));
        }
    }
    Bulb_Loader.register_many_bulbs = register_many_bulbs;
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
        if (!templates[template_name])
            throw new Error('There is no template named ' + template_name + '.');
        return templates[template_name].cloneNode(true);
    }
    function create_flower(element, data, args) {
        if (args === void 0) { args = {}; }
        if (!element) {
            element = render(data.template);
        }
        else {
            var source = render(data.template);
            for (var j in source.attributes) {
                var attribute = source.attributes[j];
                if (attribute.name == 'name')
                    continue;
                element.setAttribute(attribute.name, attribute.value);
            }
            var length = source.children.length;
            for (var i = 0; i < length; ++i) {
                element.appendChild(source.children[0]);
            }
        }
        var flower = {
            element: element,
            children: [],
            elements: {
                root: element
            },
            flowers: {
                self: flower
            }
        };
        element.flower = flower;
        process_tree(element, data, flower.elements, flower.flowers);
        //if (data.inputs) {
        //  for (var j in data.inputs) {
        //    var input_info = data.inputs[j]
        //    new MetaHub.Variable<any>(null)
        //  }
        //}
        if (data.initialize)
            data.initialize.call(flower, flower.elements, args);
        return flower;
    }
    function process_tree(element, data, result, flowers) {
        for (var i = 0; i < element.children.length; ++i) {
            var child = element.children[i];
            var bulb = Bloom.get_bulb(child.nodeName.toLowerCase());
            if (bulb) {
                var flower = bulb.instantiate(child, {});
                child = flower.element; // instantiate can replace the element
            }
            var name = child.getAttribute('name');
            if (name) {
                result[name] = child;
                if (child.flower)
                    flowers[name] = child.flower;
            }
            process_tree(child, data, result, flowers);
        }
        return result;
    }
})(Bulb_Loader || (Bulb_Loader = {}));
