jui.define("util.scale.log", [ "util.base", "util.scale.linear" ], function(_, linear) {

    /**
     * @class util.scale.log
     * Log scale
     *
     * @singleton
     * @requires util.base
     * @requires util.scale.linear
     */
    var log = function(base) {
        var _base = base || 10;

        var func = linear();
        var _domain = [];
        var _domainMax = null;
        var _domainMin = null;

        function log(value) {
            if (value < 0) {
                return -(Math.log(Math.abs(value)) / Math.log(_base));
            } else if (value > 0) {
                return Math.log(value) / Math.log(_base);
            }

            return 0;
        }

        function pow(value) {
            if (value < 0) {
                return - Math.pow(_base, Math.abs(value));
            } else if (value > 0) {
                return Math.pow(_base, value);
            }

            return 0;
        }

        function checkMax(value) {
            return Math.pow(_base, (value+"").length-1) < value;
        }

        function getNextMax(value) {
            return Math.pow(_base, (value+"").length);
        }

        var newFunc = function(x) {
            var value = x;

            if (x > _domainMax) {
                value = _domainMax;
            } else if (x < _domainMin) {
                value = _domainMin;
            }

            return func(log(value));
        }

        _.extend(newFunc, func);

        newFunc.log = function() {
            var newDomain = [];
            for (var i = 0; i < _domain.length; i++) {
                newDomain[i] = log(_domain[i]);
            }

            return newDomain;
        }

        newFunc.domain = function(values) {
            if (!arguments.length) {
                return _domain;
            }

            for (var i = 0; i < values.length; i++) {
                _domain[i] = values[i];
            }

            _domainMax = Math.max.apply(Math, _domain);
            _domainMin = Math.min.apply(Math, _domain);

            if (checkMax(_domainMax)) {
                _domain[1] = _domainMax = getNextMax(_domainMax);
            }

            if (checkMax(Math.abs(_domainMin))) {

                var value = getNextMax(Math.abs(_domainMin));
                _domain[0] = _domainMin = _domainMin < 0  ? -value : value ;
            }

            func.domain(newFunc.log());

            return newFunc;
        }

        newFunc.base = function(base) {
            func.domain(newFunc.log());

            return newFunc;
        }

        newFunc.invert = function(y) {
            return pow(func.invert(y));
        }

        newFunc.ticks = function(count, isNice, intNumber) {
            var arr = func.ticks(count, isNice, intNumber || 100000000000000000000, true);

            if (arr[arr.length-1] < func.max()) {
                arr.push(func.max());
            }

            var newArr = [];
            for(var i = 0, len = arr.length; i < len; i++) {
                newArr[i] = pow(arr[i]);
            }

            return newArr;
        }

        return newFunc;
    }

    return log;
});