/// <reference path="metahub.ts"/>
var Graft;
(function (Graft) {
    var Element_List_Input = (function () {
        function Element_List_Input(element) {
            this.element = element;
        }
        Element_List_Input.prototype.set_value = function (value) {
            this.element.innerHTML = '';
            for (var i in value) {
                this.element.appendChild(value[i]);
            }
        };
        return Element_List_Input;
    })();
    Graft.Element_List_Input = Element_List_Input;
    var Element_Input = (function () {
        function Element_Input(element) {
            this.element = element;
        }
        Element_Input.prototype.set_value = function (value) {
            if (!value) {
                value = document.createElement('div');
            }
            this.element.parentNode.replaceChild(value, this.element);
            this.element = value;
        };
        return Element_Input;
    })();
    Graft.Element_Input = Element_Input;
    function sort(key) {
        return function (a, b) {
            if (a[key] == b[key])
                return 0;
            return a[key] < b[key] ? -1 : 1;
        };
    }
    Graft.sort = sort;
})(Graft || (Graft = {}));
//# sourceMappingURL=graft.js.map