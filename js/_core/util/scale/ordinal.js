jui.define("util.scale.ordinal", [], function() {

    /**
     * @class util.scale.singleton
     * Scale for the list, which has the sequence
     *
     * @singleton
     */
    var ordinal = function () {
        var _domain = [];
        var _range = [];
        var _rangeBand = 0;
        var _cache = {};
        var _isRangePoints = false;

        function func(t) {
            var key = "" + t;
            if (typeof _cache[key] != 'undefined') {
                return _cache[key];
            }

            var index = -1;
            for (var i = 0; i < _domain.length; i++) {
                if (typeof t == 'string' && _domain[i] === t) {
                    index = i;
                    break;
                }
            }

            if (index > -1) {
                _cache[key] = _range[index];
                return _range[index];
            } else {
                if ( typeof _range[t] != 'undefined') {
                    //_domain[t] = t;               // FIXME: 이건 나중에 따로 연산해야할 듯
                    _cache[key] = _range[t];
                    return _range[t];
                }

                return null;
            }
        }

        /**
         * @method domain
         * @static
         *
         * @param values
         * @returns {*}
         */
        func.domain = function(values) {

            if ( typeof values == 'undefined') {
                return _domain;
            }

            for (var i = 0; i < values.length; i++) {
                _domain[i] = values[i];
            }

            return this;
        }

        func.range = function(values) {
            if ( typeof values == 'undefined') {
                return _range;
            }

            for (var i = 0; i < values.length; i++) {
                _range[i] = values[i];
            }

            return this;
        }

        func.rangePoints = function(interval, padding) {
            padding = padding || 0;

            var step = _domain.length;
            var unit = (interval[1] - interval[0] - padding) / step;

            var range = [];
            for (var i = 0; i < _domain.length; i++) {
                if (i == 0) {
                    range[i] = interval[0] + padding / 2 + unit / 2;
                } else {
                    range[i] = range[i - 1] + unit;
                }
            }

            _range = range;
            _rangeBand = unit;
            _isRangePoints = true;

            return func;
        }

        func.rangeBands = function(interval, padding, outerPadding) {
            padding = padding || 0;
            outerPadding = outerPadding || 0;

            var count = _domain.length;
            var step = count - 1;
            var band = (interval[1] - interval[0]) / step;

            var range = [];
            for (var i = 0; i < _domain.length; i++) {
                if (i == 0) {
                    range[i] = interval[0];
                } else {
                    range[i] = band + range[i - 1];
                }
            }

            _rangeBand = band;
            _range = range;
            _isRangePoints = false;

            return func;
        }

        func.rangeBand = function() {
            return _rangeBand;
        }

        func.invert = function(x) {
            var min = Math.min(_range[0], _range[1]);

            if (_isRangePoints) {
                min -= _rangeBand/2;

                var tempX = x;
                if (tempX < min) {
                    tempX = min;
                }
                var result = Math.abs(tempX - min) / _rangeBand ;
                return Math.floor(result);
            } else {
                var result = Math.abs(x - min) / _rangeBand ;
                return Math.ceil(result);
            }


        }

        return func;

    }

    return ordinal;
});