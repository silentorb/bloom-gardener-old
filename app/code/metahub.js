var MetaHub;
(function (MetaHub) {
    function changed(output, value) {
        if (!output.targets)
            return;
        for (var i = 0; i < output.targets.length; ++i) {
            output.targets[i].set_value(value);
        }
    }
    MetaHub.changed = changed;
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
        for (var i = 0; i < list.length - 1; ++i) {
            MetaHub.connect(list[i], list[i + 1]);
        }
    }
    MetaHub.sequence = sequence;
    var Map = (function () {
        function Map(mapper) {
            this.mapper = mapper;
        }
        Map.prototype.set_value = function (value) {
            MetaHub.changed(this, this.mapper(value));
        };
        Map.prototype.get_value = function () {
            var value = this.source ? this.source.get_value() : null;
            return this.mapper(value);
        };
        return Map;
    })();
    MetaHub.Map = Map;
    var List_Map = (function () {
        function List_Map(mapper) {
            this.mapper = mapper;
        }
        List_Map.prototype.set_value = function (value) {
            MetaHub.changed(this, this.map(value));
        };
        List_Map.prototype.get_value = function () {
            var value = this.source ? this.source.get_value() : null;
            return this.map(value);
        };
        List_Map.prototype.map = function (value) {
            if (!value)
                return [];
            return value.map(this.mapper);
        };
        return List_Map;
    })();
    MetaHub.List_Map = List_Map;
    var Variable = (function () {
        function Variable(value) {
            this.value = value;
        }
        Variable.prototype.get_value = function () {
            return this.value;
        };
        Variable.prototype.set_value = function (value) {
            if (this.value === value)
                return;
            this.value = value;
            MetaHub.changed(this, value);
        };
        return Variable;
    })();
    MetaHub.Variable = Variable;
})(MetaHub || (MetaHub = {}));
