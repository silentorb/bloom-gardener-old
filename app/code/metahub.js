var MetaHub;
(function (MetaHub) {
    function update(output) {
        if (!output.targets)
            return;
        var value = output.get_value();
        for (var i = 0; i < output.targets.length; ++i) {
            output.targets[i].set_value(value);
        }
    }
    MetaHub.update = update;
    function connect(output, input) {
        if (input.source == output)
            return;
        if (!output.targets)
            output.targets = [];
        input.source = output;
        output.targets.push(input);
        input.set_value(output.get_value());
    }
    MetaHub.connect = connect;
    function sequence(list) {
        for (var i = 0; i < list.length - 2; ++i) {
            MetaHub.connect(list[i], list[i + 1]);
        }
    }
    MetaHub.sequence = sequence;
    var Map = (function () {
        function Map(mapper) {
            this.mapper = mapper;
        }
        Map.prototype.set_value = function (value) {
            MetaHub.update(this);
        };
        Map.prototype.get_value = function () {
            var value = this.source ? this.source.get_value() : null;
            return this.mapper(value);
        };
        return Map;
    })();
    MetaHub.Map = Map;
    var Literal = (function () {
        function Literal(value) {
            this.value = value;
        }
        Literal.prototype.get_value = function () {
            return this.value;
        };
        Literal.prototype.set_value = function (value) {
            if (this.value === value)
                return;
            this.value = value;
            MetaHub.update(this);
        };
        return Literal;
    })();
    MetaHub.Literal = Literal;
})(MetaHub || (MetaHub = {}));
//# sourceMappingURL=metahub.js.map