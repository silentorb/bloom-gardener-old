/// <reference path="../../defs/es6-promise.d.ts"/>
var Bloom;
(function (Bloom) {
    var bulbs = {};
    function initialize_function() {
    }
    Bloom.initialize_function = initialize_function;
    function create_flower(bulb_name, args) {
        if (args === void 0) { args = null; }
        var bulb = bulbs[bulb_name];
        if (!bulb)
            throw new Error('Could not find bulb ' + bulb_name + '.');
        if (typeof bulb.instantiate != 'function')
            throw new Error('Bulb ' + bulb_name + ' is static and cannot be instantiated.');
        return bulb.instantiate(args);
    }
    Bloom.create_flower = create_flower;
    function add_bulb(bulb) {
        bulbs[bulb.name] = bulb;
    }
    Bloom.add_bulb = add_bulb;
    function add_bulbs(bulbs) {
        for (var i in bulbs) {
            add_bulb(bulbs[i]);
        }
    }
    Bloom.add_bulbs = add_bulbs;
})(Bloom || (Bloom = {}));
//# sourceMappingURL=bloom.js.map