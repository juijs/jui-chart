jui.define("util.scale.time", [ "util.math", "util.time", "util.scale.linear" ], function(math, _time, linear) {

    /**
     * @class util.scale.time
     * Scale for the time
     *
     * @singleton
     * @requires util.math
     * @requires util.time
     * @requires util.scale.linear
     */
    var time = function () {

        var _domain = [];
        var _rangeBand;
        var func = linear();
        var df = func.domain;

        func.domain = function (domain) {
            if (!arguments.length)
                return df.call(func);

            for (var i = 0; i < domain.length; i++) {
                _domain[i] = +domain[i];
            }

            return df.call(func, _domain);
        }

        func.min = function () {
            return Math.min(_domain[0], _domain[_domain.length - 1]);
        }

        func.max = function () {
            return Math.max(_domain[0], _domain[_domain.length - 1]);
        }

        func.rate = function (value, max) {
            return func(func.max() * (value / max));
        }

        func.ticks = function (type, interval) {
            var start = _domain[0];
            var end = _domain[1];

            var times = [];
            while (start < end) {
                times.push(new Date(+start));

                start = _time.add(start, type, interval);

            }

            times.push(new Date(+start));

            var first = func(times[1]);
            var second = func(times[2]);

            _rangeBand = second - first;

            return times;

        }

        func.realTicks = function (type, interval) {
            var start = _domain[0];
            var end = _domain[1];

            var times = [];
            var date = new Date(+start)
            var realStart = null;

            if (type == _time.years) {
                realStart = new Date(date.getFullYear(), 0, 1);
            } else if (type == _time.months) {
                realStart = new Date(date.getFullYear(), date.getMonth(), 1);
            } else if (type == _time.days || type == _time.weeks) {
                realStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            } else if (type == _time.hours) {
                realStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), 0, 0, 0);
            } else if (type == _time.minutes) {
                realStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), 0, 0);
            } else if (type == _time.seconds) {
                realStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), 0);
            } else if (type == _time.milliseconds) {
                realStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());

            }
            realStart = _time.add(realStart, type, interval);

            while (+realStart < +end) {
                times.push(new Date(+realStart));
                realStart = _time.add(realStart, type, interval);
            }

            var first = func(times[1]);
            var second = func(times[2]);

            _rangeBand = second - first;

            return times;
        }

        func.rangeBand = function () {
            return _rangeBand;
        }

        func.invert = function (y) {
            var f = linear().domain(func.range()).range(func.domain());
            return new Date(f(y));
        }

        return func;

    };

    return time;
});