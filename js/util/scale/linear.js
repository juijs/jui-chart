jui.define("util.scale.linear", [ "util.math" ], function(math) {

    /**
     * @class util.scale.linear
     * Linear scale
     *
     * @singleton
     * @requires util.math
     */
    var linear = function() {
        var _domain = [0, 1];
        var _range = [0, 1];
        var _isRound = false;
        var _isClamp = false;
        var _cache = {};

        var roundFunction = null;
        var numberFunction = null;

        var domainMin = null;
        var domainMax = null;

        var rangeMin = null;
        var rangeMax = null;

        var distDomain = null;
        var distRange = null;
        var rate = 0;

        var callFunction = null;
        var _rangeBand = null;

        function func(x) {
            if (domainMax < x) {
                if (_isClamp) {
                    return func(domainMax);
                }

                return _range[0] + Math.abs(x - _domain[0]) * rate;
            } else if (domainMin > x) {
                if (_isClamp) {
                    return func(domainMin);
                }

                return _range[0] - Math.abs(x - _domain[0]) * rate;
            } else {
                var pos = (x - _domain[0]) / (distDomain);

                return callFunction(pos);
            }
        }

        func.cache = function () {
            return _cache;
        }

        /**
         * @method min
         * @static
         *
         * @returns {number}
         */
        func.min = function () {
            return Math.min.apply(Math, _domain);
        }

        func.max = function () {
            return Math.max.apply(Math, _domain);
        }

        func.rangeMin = function () {
            return Math.min.apply(Math, _range);
        }

        func.rangeMax = function () {
            return Math.max.apply(Math, _range);
        }

        func.rate = function (value, max) {
            return func(func.max() * (value / max));
        }

        func.clamp = function (isClamp) {
            _isClamp = isClamp || false;
        }

        func.domain = function (values) {

            if (!arguments.length) {
                return _domain;
            }

            for (var i = 0; i < values.length; i++) {
                _domain[i] = values[i];
            }

            domainMin = func.min();
            domainMax = func.max();

            distDomain = _domain[1] - _domain[0];

            return this;
        }

        func.range = function (values) {

            if (!arguments.length) {
                return _range;
            }

            for (var i = 0; i < values.length; i++) {
                _range[i] = values[i];
            }

            roundFunction = math.interpolateRound(_range[0], _range[1]);
            numberFunction = math.interpolateNumber(_range[0], _range[1]);

            rangeMin = func.rangeMin();
            rangeMax = func.rangeMax();

            distRange = Math.abs(rangeMax - rangeMin);

            rate = distRange / distDomain;

            callFunction = _isRound ? roundFunction : numberFunction;

            return this;
        }

        func.rangeRound = function (values) {
            _isRound = true;

            return func.range(values);
        }

        func.rangeBand = function () {
            return _rangeBand;
        }

        func.invert = function (y) {
            var f = linear().domain(_range).range(_domain);
            return f(y);
        }

        func.ticks = function (count, isNice, /** @deprecated */intNumber, reverse) {

            //intNumber = intNumber || 10000;
            reverse = reverse || false;
            var max = func.max();

            if (_domain[0] == 0 && _domain[1] == 0) {
                return [];
            }

            var obj = math.nice(_domain[0], _domain[1], count || 10, isNice || false);

            var arr = [];

            var start = (reverse ? obj.max : obj.min);
            var end = (reverse ? obj.min : obj.max);
            var unit = obj.spacing;
            var fixed = math.fixed(unit);

            while ((reverse ? end <= start : start <= end)) {
                arr.push(start/* / intNumber*/);

                if (reverse) {
                    start = fixed.minus(start, unit);
                } else {
                    start = fixed.plus(start, unit);
                }

            }

            if (reverse) {
                if (arr[0] != max) {
                    arr.unshift(max);
                }

                for (var i = 0, len = arr.length; i < len; i++) {
                    arr[i] = Math.abs(arr[i] - max);
                }
                //arr.reverse();

            } else {
                if (arr[arr.length - 1] != end && start > end) {
                    arr.push(end);
                }

                if (_domain[0] > _domain[1]) {
                    arr.reverse();
                }
            }

            var first = func(arr[0]);
            var second = func(arr[1]);

            _rangeBand = Math.abs(second - first);

            return arr;
        }

        return func;
    }

    return linear;
});