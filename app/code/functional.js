var Functional = {
    to_array: function (input, primary_key) {
        var result = [];
        for (var i in input) {
            var item = input[i];
            item[primary_key] = input;
            result.push(item);
        }
        return result;
    },
    filter: function (list, condition) {
        var result = Array.isArray(list) ? [] : {};
        for (var i in list) {
            var item = list[i];
            if (condition(item, i))
                result[i] = item;
        }
        return result;
    },
    map: function (list, mapper) {
        var result = Array.isArray(list) ? [] : {};
        for (var i in list) {
            result[i] = mapper(list[i], i);
        }
        return result;
    },
    map_to_array: function (list, mapper) {
        var result = [];
        for (var i in list) {
            result.push(mapper(list[i], i));
        }
        return result;
    }
};
