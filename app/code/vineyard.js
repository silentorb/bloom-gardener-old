var Vineyard;
(function (Vineyard) {
    var Trellis;
    (function (Trellis) {
        function get_identity(trellis, seed) {
            return seed[trellis.primary_key];
        }
        Trellis.get_identity = get_identity;
    })(Trellis || (Trellis = {}));
})(Vineyard || (Vineyard = {}));
