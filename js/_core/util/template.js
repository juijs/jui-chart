jui.define("util.template", [], function() {
    var template = function (text, data, settings) {
        var _ = {},
            breaker = {};

        var ArrayProto = Array.prototype,
            slice = ArrayProto.slice,
            nativeForEach = ArrayProto.forEach;

        var escapes = {
            '\\': '\\',
            "'": "'",
            'r': '\r',
            'n': '\n',
            't': '\t',
            'u2028': '\u2028',
            'u2029': '\u2029'
        };

        for (var p in escapes)
            escapes[escapes[p]] = p;

        var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g,
            unescaper = /\\(\\|'|r|n|t|u2028|u2029)/g,
            noMatch = /.^/;

        var unescape = function (code) {
            return code.replace(unescaper, function (match, escape) {
                return escapes[escape];
            });
        };

        var each = _.each = _.forEach = function (obj, iterator, context) {
            if (obj == null)
                return;
            if (nativeForEach && obj.forEach === nativeForEach) {
                obj.forEach(iterator, context);
            } else if (obj.length === +obj.length) {
                for (var i = 0, l = obj.length; i < l; i++) {
                    if (i in obj && iterator.call(context, obj[i], i, obj) === breaker)
                        return;
                }
            } else {
                for (var key in obj) {
                    if (_.has(obj, key)) {
                        if (iterator.call(context, obj[key], key, obj) === breaker)
                            return;
                    }
                }
            }
        };

        _.has = function (obj, key) {
            return hasOwnProperty.call(obj, key);
        };

        _.defaults = function (obj) {
            each(slice.call(arguments, 1), function (source) {
                for (var prop in source) {
                    if (obj[prop] == null)
                        obj[prop] = source[prop];
                }
            });
            return obj;
        };

        _.template = function (text, data, settings) {
            settings = _.defaults(settings || {});

            var source = "__p+='" + text.replace(escaper, function (match) {
                    return '\\' + escapes[match];
                }).replace(settings.escape || noMatch, function (match, code) {
                    return "'+\n_.escape(" + unescape(code) + ")+\n'";
                }).replace(settings.interpolate || noMatch, function (match, code) {
                    return "'+\n(" + unescape(code) + ")+\n'";
                }).replace(settings.evaluate || noMatch, function (match, code) {
                    return "';\n" + unescape(code) + "\n;__p+='";
                }) + "';\n";

            if (!settings.variable)
                source = 'with(obj||{}){\n' + source + '}\n';

            source = "var __p='';" + "var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n" + source + "return __p;\n";

            var render = new Function(settings.variable || 'obj', '_', source);
            if (data)
                return render(data, _);
            var template = function (data) {
                return render.call(this, data, _);
            };

            template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

            return template;
        };

        return _.template(text, data, settings);
    }

    return template;
});