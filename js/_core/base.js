// core.js가 로드되지 않았을 경우
if (typeof(window.jui) != "object") {
    (function (window, nodeGlobal) {
        var global = {
                jquery: (typeof(jQuery) != "undefined") ? jQuery : null
            },
            globalFunc = {},
            globalClass = {};

        /**
         * @class util.base
         *
         * jui 에서 공통적으로 사용하는 유틸리티 함수 모음
         *
         * ```
         * var _ = jui.include("util.base");
         *
         * console.log(_.browser.webkit);
         * ```
         *
         * @singleton
         */
        var utility = global["util.base"] = {

            /**
             * @property browser check browser agent
             * @property {Boolean} browser.webkit  Webkit 브라우저 체크
             * @property {Boolean} browser.mozilla  Mozilla 브라우저 체크
             * @property {Boolean} browser.msie  IE 브라우저 체크 */
            browser: {
                webkit: ('WebkitAppearance' in document.documentElement.style) ? true : false,
                mozilla: (typeof window.mozInnerScreenX != "undefined") ? true : false,
                msie: (window.navigator.userAgent.indexOf("Trident") != -1) ? true : false
            },

            /**
             * @property {Boolean} isTouch
             * check touch device
             */
            isTouch: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent),

            /**
             * @method inherit
             *
             * 프로토타입 기반의 상속 제공
             *
             * @param {Function} ctor base Class
             * @param {Function} superCtor super Class
             */
            inherit: function (ctor, superCtor) {
                if (!this.typeCheck("function", ctor) || !this.typeCheck("function", superCtor)) return;

                ctor.parent = superCtor;
                ctor.prototype = new superCtor;
                ctor.prototype.constructor = ctor;
                ctor.prototype.parent = ctor.prototype;

                /**
                 * @method super
                 * call parent method
                 * @param {String} method  parent method name
                 * @param {Array} args
                 * @returns {Mixed}
                 */
                ctor.prototype.super = function (method, args) {
                    return this.constructor.prototype[method].apply(this, args);
                }
            },

            /**
             * @method extend
             *
             * implements object extend
             *
             * @param {Object|Function} origin
             * @param {Object|Function} add
             * @param {Boolean} skip
             * @return {Object}
             */
            extend: function (origin, add, skip) {
                if (!this.typeCheck(["object", "function"], origin)) origin = {};
                if (!this.typeCheck(["object", "function"], add)) return origin;

                for (var key in add) {
                    if (skip === true) {
                        if (isRecursive(origin[key])) {
                            this.extend(origin[key], add[key], skip);
                        } else if (this.typeCheck("undefined", origin[key])) {
                            origin[key] = add[key];
                        }
                    } else {
                        if (isRecursive(origin[key])) {
                            this.extend(origin[key], add[key], skip);
                        } else {
                            origin[key] = add[key];
                        }
                    }
                }

                function isRecursive(value) {
                    return utility.typeCheck("object", value);
                }

                return origin;
            },

            /**
             * convert px to integer
             * @param {String or Number} px
             * @return {Number}
             */
            pxToInt: function (px) {
                if (this.typeCheck("string", px) && px.indexOf("px") != -1) {
                    return parseInt(px.split("px").join(""));
                }

                return px;
            },

            /**
             * @method clone
             * implements object clone
             * @param {Array/Object} obj 복사할 객체
             * @return {Array}
             */
            clone: function (obj) {
                var clone = (this.typeCheck("array", obj)) ? [] : {};

                for (var i in obj) {
                    if (this.typeCheck("object", obj[i]))
                        clone[i] = this.clone(obj[i]);
                    else
                        clone[i] = obj[i];
                }

                return clone;
            },

            /**
             * @method deepClone
             * implements object deep clone
             * @param obj
             * @param emit
             * @return {*}
             */
            deepClone: function (obj, emit) {
                var value = null;
                emit = emit || {};

                if (this.typeCheck("array", obj)) {
                    value = new Array(obj.length);

                    for (var i = 0, len = obj.length; i < len; i++) {
                        value[i] = this.deepClone(obj[i], emit);
                    }
                } else if (this.typeCheck("date", obj)) {
                    value = obj;
                } else if (this.typeCheck("object", obj)) {
                    value = {};

                    for (var key in obj) {
                        if (emit[key]) {
                            value[key] = obj[key];
                        } else {
                            value[key] = this.deepClone(obj[key], emit);
                        }
                    }
                } else {
                    value = obj;
                }

                return value;
            },

            /**
             * @method sort
             * use QuickSort
             * @param {Array} array
             * @return {QuickSort}
             */
            sort: function (array) {
                var QuickSort = jui.include("util.sort");
                return new QuickSort(array);
            },

            /**
             * @method runtime
             *
             * caculate callback runtime
             *
             * @param {String} name
             * @param {Function} callback
             */
            runtime: function (name, callback) {
                var nStart = new Date().getTime();
                callback();
                var nEnd = new Date().getTime();

                console.log(name + " : " + (nEnd - nStart) + "ms");
            },

            /**
             * @method template
             * parsing template string
             * @param html
             * @param obj
             */
            template: function (html, obj) {
                var tpl = jui.include("util.template");

                var opts = {
                    evaluate: /<\!([\s\S]+?)\!>/g,
                    interpolate: /<\!=([\s\S]+?)\!>/g,
                    escape: /<\!-([\s\S]+?)\!>/g
                };

                if (!obj) return tpl(html, null, opts);
                else return tpl(html, obj, opts);
            },

            /**
             * @method resize
             * add event in window resize event
             * @param {Function} callback
             * @param {Number} ms delay time
             */
            resize: function (callback, ms) {
                var after_resize = (function () {
                    var timer = 0;

                    return function () {
                        clearTimeout(timer);
                        timer = setTimeout(callback, ms);
                    }
                })();

                if (window.addEventListener) {
                    window.addEventListener("resize", after_resize);
                } else if (object.attachEvent) {
                    window.attachEvent("onresize", after_resize);
                } else {
                    window["onresize"] = after_resize;
                }
            },

            /**
             * @method index
             *
             * IndexParser 객체 생성
             *
             * @return {IndexParser}
             */
            index: function () {
                var KeyParser = jui.include("util.keyparser");
                return new KeyParser();
            },

            /**
             * @method chunk
             * split array by length
             * @param {Array} arr
             * @param {Number} len
             * @return {Array}
             */
            chunk: function (arr, len) {
                var chunks = [],
                    i = 0,
                    n = arr.length;

                while (i < n) {
                    chunks.push(arr.slice(i, i += len));
                }

                return chunks;
            },

            /**
             * @method typeCheck
             * check data  type
             * @param {String} t  type string
             * @param {Object} v value object
             * @return {Boolean}
             */
            typeCheck: function (t, v) {
                function check(type, value) {
                    if (typeof(type) != "string") return false;

                    if (type == "string") {
                        return (typeof(value) == "string");
                    }
                    else if (type == "integer") {
                        return (typeof(value) == "number" && value % 1 == 0);
                    }
                    else if (type == "float") {
                        return (typeof(value) == "number" && value % 1 != 0);
                    }
                    else if (type == "number") {
                        return (typeof(value) == "number");
                    }
                    else if (type == "boolean") {
                        return (typeof(value) == "boolean");
                    }
                    else if (type == "undefined") {
                        return (typeof(value) == "undefined");
                    }
                    else if (type == "null") {
                        return (value === null);
                    }
                    else if (type == "array") {
                        return (value instanceof Array);
                    }
                    else if (type == "date") {
                        return (value instanceof Date);
                    }
                    else if (type == "function") {
                        return (typeof(value) == "function");
                    }
                    else if (type == "object") {
                        // typeCheck에 정의된 타입일 경우에는 object 체크시 false를 반환 (date, array, null)
                        return (
                            typeof(value) == "object" &&
                            value !== null && !(value instanceof Array) && !(value instanceof Date) && !(value instanceof RegExp)
                        );
                    }

                    return false;
                }

                if (typeof(t) == "object" && t.length) {
                    var typeList = t;

                    for (var i = 0; i < typeList.length; i++) {
                        if (check(typeList[i], v)) return true;
                    }

                    return false;
                } else {
                    return check(t, v);
                }
            },
            typeCheckObj: function (uiObj, list) {
                if (typeof(uiObj) != "object") return;
                var self = this;

                for (var key in uiObj) {
                    var func = uiObj[key];

                    if (typeof(func) == "function") {
                        (function (funcName, funcObj) {
                            uiObj[funcName] = function () {
                                var args = arguments,
                                    params = list[funcName];

                                for (var i = 0; i < args.length; i++) {
                                    if (!self.typeCheck(params[i], args[i])) {
                                        throw new Error("JUI_CRITICAL_ERR: the " + i + "th parameter is not a " + params[i] + " (" + name + ")");
                                    }
                                }

                                return funcObj.apply(this, args);
                            }
                        })(key, func);
                    }
                }
            },

            /**
             * @method svgToBase64
             *
             * xml 문자열로 svg datauri 생성
             *
             * @param {String} xml
             * @return {String} 변환된 data uri 링크
             */
            svgToBase64: function (xml) {
                var Base64 = jui.include("util.base64");
                return "data:image/svg+xml;base64," + Base64.encode(xml);
            },

            /**
             * @method dateFormat
             *
             * implements date format function
             *
             * yyyy : 4 digits year
             * yy : 2 digits year
             * y : 1 digit year
             *
             * @param {Date} date
             * @param {String} format   date format string
             * @param utc
             * @return {string}
             */
            dateFormat: function (date, format, utc) {
                var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

                function ii(i, len) {
                    var s = i + "";
                    len = len || 2;
                    while (s.length < len) s = "0" + s;
                    return s;
                }

                var y = utc ? date.getUTCFullYear() : date.getFullYear();
                format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
                format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
                format = format.replace(/(^|[^\\])y/g, "$1" + y);

                var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
                format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
                format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
                format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
                format = format.replace(/(^|[^\\])M/g, "$1" + M);

                var d = utc ? date.getUTCDate() : date.getDate();
                format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
                format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
                format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
                format = format.replace(/(^|[^\\])d/g, "$1" + d);

                var H = utc ? date.getUTCHours() : date.getHours();
                format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
                format = format.replace(/(^|[^\\])H/g, "$1" + H);

                var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
                format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
                format = format.replace(/(^|[^\\])h/g, "$1" + h);

                var m = utc ? date.getUTCMinutes() : date.getMinutes();
                format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
                format = format.replace(/(^|[^\\])m/g, "$1" + m);

                var s = utc ? date.getUTCSeconds() : date.getSeconds();
                format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
                format = format.replace(/(^|[^\\])s/g, "$1" + s);

                var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
                format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
                f = Math.round(f / 10);
                format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
                f = Math.round(f / 10);
                format = format.replace(/(^|[^\\])f/g, "$1" + f);

                var T = H < 12 ? "AM" : "PM";
                format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
                format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

                var t = T.toLowerCase();
                format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
                format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

                var tz = -date.getTimezoneOffset();
                var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
                if (!utc) {
                    tz = Math.abs(tz);
                    var tzHrs = Math.floor(tz / 60);
                    var tzMin = tz % 60;
                    K += ii(tzHrs) + ":" + ii(tzMin);
                }
                format = format.replace(/(^|[^\\])K/g, "$1" + K);

                var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
                format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
                format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

                format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
                format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

                format = format.replace(/\\(.)/g, "$1");

                return format;
            },
            /**
             * @method createId
             *
             * 유니크 아이디 생성
             *
             * @param {String} key  prefix string
             * @return {String} 생성된 아이디 문자열
             */
            createId: function (key) {
                return [key || "id", (+new Date), Math.round(Math.random() * 100) % 100].join("-");
            },
            /**
             * @method btoa
             *
             * Base64 인코딩
             *
             * @return {String}
             */
            btoa: function (input) {
                var Base64 = jui.include("util.base64");
                return Base64.encode(input);
            },
            /**
             * @method atob
             *
             * Base64 디코딩
             *
             * @return {String}
             */
            atob: function (input) {
                var Base64 = jui.include("util.base64");
                return Base64.decode(input);
            },

            /**
             * implement async loop without blocking ui
             *
             * @param total
             * @param context
             * @returns {Function}
             */
            timeLoop: function (total, context) {

                return function (callback, lastCallback) {
                    function TimeLoopCallback(i) {

                        if (i < 1) return;

                        if (i == 1) {
                            callback.call(context, i)
                            lastCallback.call(context);
                        } else {
                            setTimeout(function () {
                                if (i > -1) callback.call(context, i--);
                                if (i > -1) TimeLoopCallback(i);
                            }, 1);
                        }
                    }

                    TimeLoopCallback(total);
                };
            },
            /**
             * @method loop
             *
             * 최적화된 루프 생성 (5단계로 나눔)
             *
             * @param {Number} total
             * @param {Object} [context=null]
             * @return {Function} 최적화된 루프 콜백 (index, groupIndex 2가지 파라미터를 받는다.)
             */
            loop: function (total, context) {
                var start = 0,
                    end = total,
                    unit = Math.ceil(total / 5);

                return function (callback) {
                    var first = start, second = unit * 1, third = unit * 2, fourth = unit * 3, fifth = unit * 4,
                        firstMax = second, secondMax = third, thirdMax = fourth, fourthMax = fifth, fifthMax = end;

                    while (first < firstMax && first < end) {
                        callback.call(context, first, 1);
                        first++;

                        if (second < secondMax && second < end) {
                            callback.call(context, second, 2);
                            second++;
                        }
                        if (third < thirdMax && third < end) {
                            callback.call(context, third, 3);
                            third++;
                        }
                        if (fourth < fourthMax && fourth < end) {
                            callback.call(context, fourth, 4);
                            fourth++;
                        }
                        if (fifth < fifthMax && fifth < end) {
                            callback.call(context, fifth, 5);
                            fifth++;
                        }
                    }
                };
            },

            /**
             * @method loopArray
             *
             * 배열을 사용해서 최적화된 루프로 생성한다.
             *
             *
             * @param {Array} data 루프로 생성될 배열
             * @param {Object} [context=null]
             * @return {Function} 최적화된 루프 콜백 (data, index, groupIndex 3가지 파라미터를 받는다.)
             */
            loopArray: function (data, context) {
                var total = data.length,
                    start = 0,
                    end = total,
                    unit = Math.ceil(total / 5);

                return function (callback) {
                    var first = start, second = unit * 1, third = unit * 2, fourth = unit * 3, fifth = unit * 4,
                        firstMax = second, secondMax = third, thirdMax = fourth, fourthMax = fifth, fifthMax = end;

                    while (first < firstMax && first < end) {
                        callback.call(context, data[first], first, 1);
                        first++;
                        if (second < secondMax && second < end) {
                            callback.call(context, data[second], second, 2);
                            second++;
                        }
                        if (third < thirdMax && third < end) {
                            callback.call(context, data[third], third, 3);
                            third++;
                        }
                        if (fourth < fourthMax && fourth < end) {
                            callback.call(context, data[fourth], fourth, 4);
                            fourth++;
                        }
                        if (fifth < fifthMax && fifth < end) {
                            callback.call(context, data[fifth], fifth, 5);
                            fifth++;
                        }
                    }
                };

            },

            /**
             * @method makeIndex
             *
             * 배열의 키 기반 인덱스를 생성한다.
             *
             * 개별 값 별로 멀티 인덱스를 생성한다.
             *
             * @param {Array} data
             * @param {String} keyField
             * @return {Object} 생성된 인덱스
             */
            makeIndex: function (data, keyField) {
                var list = {},
                    func = this.loopArray(data);

                func(function (d, i) {
                    var value = d[keyField];

                    if (typeof list[value] == 'undefined') {
                        list[value] = [];
                    }

                    list[value].push(i);
                });

                return list;
            },

            /**
             * @method startsWith
             * Check that it matches the starting string search string.
             *
             * @param {String} string
             * @param {String} searchString
             * @return {Integer} position
             */
            startsWith: function (string, searchString, position) {
                position = position || 0;

                return string.lastIndexOf(searchString, position) === position;
            },

            /**
             * @method endsWith
             * Check that it matches the end of a string search string.
             *
             * @param {String} string
             * @param {String} searchString
             * @return {Integer} position
             */
            endsWith: function (string, searchString, position) {
                var subjectString = string;

                if (position === undefined || position > subjectString.length) {
                    position = subjectString.length;
                }

                position -= searchString.length;
                var lastIndex = subjectString.indexOf(searchString, position);

                return lastIndex !== -1 && lastIndex === position;
            },

            inArray: function (target, list) {
                if (this.typeCheck(["undefined", "null"], target) || !this.typeCheck("array", list)) return -1;

                for (var i = 0, len = list.length; i < len; i++) {
                    if (list[i] == target)
                        return i;
                }

                return -1;
            },

            trim: function (text) {
                var whitespace = "[\\x20\\t\\r\\n\\f]",
                    rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g");

                return text == null ?
                    "" :
                    ( text + "" ).replace(rtrim, "");
            },

            ready: (function () {
                var readyList,
                    DOMContentLoaded,
                    class2type = {};

                class2type["[object Boolean]"] = "boolean";
                class2type["[object Number]"] = "number";
                class2type["[object String]"] = "string";
                class2type["[object Function]"] = "function";
                class2type["[object Array]"] = "array";
                class2type["[object Date]"] = "date";
                class2type["[object RegExp]"] = "regexp";
                class2type["[object Object]"] = "object";

                var ReadyObj = {
                    // Is the DOM ready to be used? Set to true once it occurs.
                    isReady: false,
                    // A counter to track how many items to wait for before
                    // the ready event fires. See #6781
                    readyWait: 1,
                    // Hold (or release) the ready event
                    holdReady: function (hold) {
                        if (hold) {
                            ReadyObj.readyWait++;
                        } else {
                            ReadyObj.ready(true);
                        }
                    },
                    // Handle when the DOM is ready
                    ready: function (wait) {
                        // Either a released hold or an DOMready/load event and not yet ready
                        if ((wait === true && !--ReadyObj.readyWait) || (wait !== true && !ReadyObj.isReady)) {
                            // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
                            if (!document.body) {
                                return setTimeout(ReadyObj.ready, 1);
                            }

                            // Remember that the DOM is ready
                            ReadyObj.isReady = true;
                            // If a normal DOM Ready event fired, decrement, and wait if need be
                            if (wait !== true && --ReadyObj.readyWait > 0) {
                                return;
                            }
                            // If there are functions bound, to execute
                            readyList.resolveWith(document, [ReadyObj]);

                            // Trigger any bound ready events
                            //if ( ReadyObj.fn.trigger ) {
                            //  ReadyObj( document ).trigger( "ready" ).unbind( "ready" );
                            //}
                        }
                    },
                    bindReady: function () {
                        if (readyList) {
                            return;
                        }
                        readyList = ReadyObj._Deferred();

                        // Catch cases where $(document).ready() is called after the
                        // browser event has already occurred.
                        if (document.readyState === "complete") {
                            // Handle it asynchronously to allow scripts the opportunity to delay ready
                            return setTimeout(ReadyObj.ready, 1);
                        }

                        // Mozilla, Opera and webkit nightlies currently support this event
                        if (document.addEventListener) {
                            // Use the handy event callback
                            document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
                            // A fallback to window.onload, that will always work
                            window.addEventListener("load", ReadyObj.ready, false);

                            // If IE event model is used
                        } else if (document.attachEvent) {
                            // ensure firing before onload,
                            // maybe late but safe also for iframes
                            document.attachEvent("onreadystatechange", DOMContentLoaded);

                            // A fallback to window.onload, that will always work
                            window.attachEvent("onload", ReadyObj.ready);

                            // If IE and not a frame
                            // continually check to see if the document is ready
                            var toplevel = false;

                            try {
                                toplevel = window.frameElement == null;
                            } catch (e) {
                            }

                            if (document.documentElement.doScroll && toplevel) {
                                doScrollCheck();
                            }
                        }
                    },
                    _Deferred: function () {
                        var // callbacks list
                            callbacks = [],
                            // stored [ context , args ]
                            fired,
                            // to avoid firing when already doing so
                            firing,
                            // flag to know if the deferred has been cancelled
                            cancelled,
                            // the deferred itself
                            deferred = {

                                // done( f1, f2, ...)
                                done: function () {
                                    if (!cancelled) {
                                        var args = arguments,
                                            i,
                                            length,
                                            elem,
                                            type,
                                            _fired;
                                        if (fired) {
                                            _fired = fired;
                                            fired = 0;
                                        }
                                        for (i = 0, length = args.length; i < length; i++) {
                                            elem = args[i];
                                            type = ReadyObj.type(elem);
                                            if (type === "array") {
                                                deferred.done.apply(deferred, elem);
                                            } else if (type === "function") {
                                                callbacks.push(elem);
                                            }
                                        }
                                        if (_fired) {
                                            deferred.resolveWith(_fired[0], _fired[1]);
                                        }
                                    }
                                    return this;
                                },

                                // resolve with given context and args
                                resolveWith: function (context, args) {
                                    if (!cancelled && !fired && !firing) {
                                        // make sure args are available (#8421)
                                        args = args || [];
                                        firing = 1;
                                        try {
                                            while (callbacks[0]) {
                                                callbacks.shift().apply(context, args);//shifts a callback, and applies it to document
                                            }
                                        }
                                        finally {
                                            fired = [context, args];
                                            firing = 0;
                                        }
                                    }
                                    return this;
                                },

                                // resolve with this as context and given arguments
                                resolve: function () {
                                    deferred.resolveWith(this, arguments);
                                    return this;
                                },

                                // Has this deferred been resolved?
                                isResolved: function () {
                                    return !!( firing || fired );
                                },

                                // Cancel
                                cancel: function () {
                                    cancelled = 1;
                                    callbacks = [];
                                    return this;
                                }
                            };

                        return deferred;
                    },
                    type: function (obj) {
                        return obj == null ?
                            String(obj) :
                            class2type[Object.prototype.toString.call(obj)] || "object";
                    }
                }
                // The DOM ready check for Internet Explorer
                function doScrollCheck() {
                    if (ReadyObj.isReady) {
                        return;
                    }

                    try {
                        // If IE is used, use the trick by Diego Perini
                        // http://javascript.nwbox.com/IEContentLoaded/
                        document.documentElement.doScroll("left");
                    } catch (e) {
                        setTimeout(doScrollCheck, 1);
                        return;
                    }

                    // and execute any waiting functions
                    ReadyObj.ready();
                }

                // Cleanup functions for the document ready method
                if (document.addEventListener) {
                    DOMContentLoaded = function () {
                        document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
                        ReadyObj.ready();
                    };

                } else if (document.attachEvent) {
                    DOMContentLoaded = function () {
                        // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
                        if (document.readyState === "complete") {
                            document.detachEvent("onreadystatechange", DOMContentLoaded);
                            ReadyObj.ready();
                        }
                    };
                }
                function ready(fn) {
                    // Attach the listeners
                    ReadyObj.bindReady();

                    var type = ReadyObj.type(fn);

                    // Add the callback
                    readyList.done(fn);//readyList is result of _Deferred()
                }

                return ready;
            })(),

            param: function (data) {
                var r20 = /%20/g,
                    s = [],
                    add = function (key, value) {
                        // If value is a function, invoke it and return its value
                        value = utility.typeCheck("function", value) ? value() : (value == null ? "" : value);
                        s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
                    };

                for (var key in data) {
                    add(key, data[key]);
                }

                return s.join("&").replace(r20, "+");
            },

            ajax: function (data) {
                var xhr = null, paramStr = "", callback = null;

                var opts = utility.extend({
                    url: null,
                    type: "GET",
                    data: null,
                    async: true,
                    success: null,
                    fail: null
                }, data);

                if (!this.typeCheck("string", opts.url) || !this.typeCheck("function", opts.success))
                    return;

                if (this.typeCheck("object", opts.data))
                    paramStr = this.param(opts.data);

                if (!this.typeCheck("undefined", XMLHttpRequest)) {
                    xhr = new XMLHttpRequest();
                } else {
                    var versions = [
                        "MSXML2.XmlHttp.5.0",
                        "MSXML2.XmlHttp.4.0",
                        "MSXML2.XmlHttp.3.0",
                        "MSXML2.XmlHttp.2.0",
                        "Microsoft.XmlHttp"
                    ];

                    for (var i = 0, len = versions.length; i < len; i++) {
                        try {
                            xhr = new ActiveXObject(versions[i]);
                            break;
                        }
                        catch (e) {
                        }
                    }
                }

                if (xhr != null) {
                    xhr.open(opts.type, opts.url, opts.async);
                    xhr.send(paramStr);

                    callback = function () {
                        if (xhr.readyState === 4 && xhr.status == 200) {
                            opts.success(xhr);
                        } else {
                            if (utility.typeCheck("function", opts.fail)) {
                                opts.fail(xhr);
                            }
                        }
                    }

                    if (!opts.async) {
                        callback();
                    } else {
                        xhr.onreadystatechange = callback;
                    }
                }
            },

            scrollWidth: function () {
                var inner = document.createElement("p");
                inner.style.width = "100%";
                inner.style.height = "200px";

                var outer = document.createElement("div");
                outer.style.position = "absolute";
                outer.style.top = "0px";
                outer.style.left = "0px";
                outer.style.visibility = "hidden";
                outer.style.width = "200px";
                outer.style.height = "150px";
                outer.style.overflow = "hidden";
                outer.appendChild(inner);

                document.body.appendChild(outer);
                var w1 = inner.offsetWidth;
                outer.style.overflow = "scroll";
                var w2 = inner.offsetWidth;
                if (w1 == w2) w2 = outer.clientWidth;
                document.body.removeChild(outer);

                return (w1 - w2);
            }
        }


		/*
		 * Module related functions
		 *
		 */
        var getDepends = function (depends) {
            var args = [];

            for (var i = 0; i < depends.length; i++) {
                var module = global[depends[i]];

                if (!utility.typeCheck(["function", "object"], module)) {
                    var modules = getModules(depends[i]);

                    if (modules == null) {
                        console.log("JUI_WARNING_MSG: '" + depends[i] + "' is not loaded");
                        args.push(null);
                    } else {
                        args.push(modules);
                    }

                } else {
                    args.push(module);
                }
            }

            return args;
        }

        var getModules = function (parent) {
            var modules = null,
                parent = parent + ".";

            for (var key in global) {
                if (key.indexOf(parent) != -1) {
                    if (utility.typeCheck(["function", "object"], global[key])) {
                        var child = key.split(parent).join("");

                        if (child.indexOf(".") == -1) {
                            if (modules == null) {
                                modules = {};
                            }

                            modules[child] = global[key];
                        }
                    }
                }
            }

            return modules;
        }

        /**
         * @class jui
         *
         * Global Object
         *
         * @singleton
         */
        window.jui = nodeGlobal.jui = {
            /**
             * @method ready
             *
             * ready 타임에 실행될 callback 정의
             *
             * @param {Function} callback
             */
            ready: function () {
                var args = [],
                    callback = (arguments.length == 2) ? arguments[1] : arguments[0],
                    depends = (arguments.length == 2) ? arguments[0] : null;

                if (!utility.typeCheck(["array", "null"], depends) || !utility.typeCheck("function", callback)) {
                    throw new Error("JUI_CRITICAL_ERR: Invalid parameter type of the function");
                }

                utility.ready(function () {
                    if (depends) {
                        args = getDepends(depends);
                    } else {
                        // @Deprecated 기존의 레거시를 위한 코드
                        var ui = getModules("ui"),
                            uix = {};

                        utility.extend(uix, ui);
                        utility.extend(uix, getModules("grid"));

                        args = [ui, uix, utility];
                    }

                    callback.apply(null, args);
                });
            },

            /**
             * @method defineUI
             *
             * 사용자가 실제로 사용할 수 있는 UI 클래스를 정의
             *
             * @param {String} name 모듈 로드와 상속에 사용될 이름을 정한다.
             * @param {Array} depends 'define'이나 'defineUI'로 정의된 클래스나 객체를 인자로 받을 수 있다.
             * @param {Function} callback UI 클래스를 해당 콜백 함수 내에서 클래스 형태로 구현하고 리턴해야 한다.
             */
            defineUI: function (name, depends, callback, parent) {
                if (!utility.typeCheck("string", name) || !utility.typeCheck("array", depends) || !utility.typeCheck("function", callback) || !utility.typeCheck(["string", "undefined"], parent)) {
                    throw new Error("JUI_CRITICAL_ERR: Invalid parameter type of the function");
                }

                if (utility.typeCheck("function", globalClass[name])) {
                    throw new Error("JUI_CRITICAL_ERR: '" + name + "' is already exist");
                }

                if (utility.typeCheck("undefined", parent)) { // 기본적으로 'event' 클래스를 상속함
                    parent = "event";
                }

                if (!utility.typeCheck("function", globalClass[parent])) {
                    throw new Error("JUI_CRITICAL_ERR: Parents are the only function");
                } else {
                    if (globalFunc[parent] !== true) {
                        throw new Error("JUI_CRITICAL_ERR: UI function can not be inherited");
                    }
                }

                var args = getDepends(depends),
                    uiFunc = callback.apply(null, args);

                // 상속
                utility.inherit(uiFunc, globalClass[parent]);

                // TODO: 차트 빌더를 제외하고, 무조건 event 클래스에 정의된 init 메소드를 호출함
                global[name] = globalClass[parent != "core" ? "event" : "core"].init({
                    type: name,
                    "class": uiFunc
                });

                globalClass[name] = uiFunc;
                globalFunc[name] = true;

                /**
                 * @deprecated
                 // support AMD module
                 if (typeof define == "function" && define.amd) {
			define(name, function () {
				return global[name]
			});
		}
                 */
            },

            createUIObject: function (UI, selector, index, elem, options, afterHook) {
                var mainObj = new UI["class"]();

                // Check Options
                var opts = jui.defineOptions(UI["class"], options || {});

                // Public Properties
                mainObj.init.prototype = mainObj;
                /** @property {String/HTMLElement} selector */
                mainObj.init.prototype.selector = selector;
                /** @property {HTMLElement} root */
                mainObj.init.prototype.root = elem;
                /** @property {Object} options */
                mainObj.init.prototype.options = opts;
                /** @property {Object} tpl Templates */
                mainObj.init.prototype.tpl = {};
                /** @property {Array} event Custom events */
                mainObj.init.prototype.event = new Array(); // Custom Event
                /** @property {Integer} timestamp UI Instance creation time*/
                mainObj.init.prototype.timestamp = new Date().getTime();
                /** @property {Integer} index Index of UI instance*/
                mainObj.init.prototype.index = index;
                /** @property {Class} module Module class */
                mainObj.init.prototype.module = UI;

                // UI 객체 프로퍼티를 외부에서 정의할 수 있음 (jQuery 의존성 제거를 위한 코드)
                if (utility.typeCheck("function", afterHook)) {
                    afterHook(mainObj, opts);
                }

                // Script-based Template Settings
                for (var name in opts.tpl) {
                    var tplHtml = opts.tpl[name];

                    if (utility.typeCheck("string", tplHtml) && tplHtml != "") {
                        mainObj.init.prototype.tpl[name] = utility.template(tplHtml);
                    }
                }

                var uiObj = new mainObj.init();

                // Custom Event Setting
                for (var key in opts.event) {
                    uiObj.on(key, opts.event[key]);
                }

                // 엘리먼트 객체에 jui 속성 추가
                elem.jui = uiObj;

                return uiObj;
            },

            /**
             * @method define
             *
             * UI 클래스에서 사용될 클래스를 정의하고, 자유롭게 상속할 수 있는 클래스를 정의
             *
             * @param {String} name 모듈 로드와 상속에 사용될 이름을 정한다.
             * @param {Array} depends 'define'이나 'defineUI'로 정의된 클래스나 객체를 인자로 받을 수 있다.
             * @param {Function} callback UI 클래스를 해당 콜백 함수 내에서 클래스 형태로 구현하고 리턴해야 한다.
             * @param {String} parent 상속받을 클래스
             */
            define: function (name, depends, callback, parent) {
                if (!utility.typeCheck("string", name) || !utility.typeCheck("array", depends) ||
                    !utility.typeCheck("function", callback) || !utility.typeCheck([ "string", "undefined", "null" ], parent)) {
                    throw new Error("JUI_CRITICAL_ERR: Invalid parameter type of the function");
                }

                if (utility.typeCheck("function", globalClass[name])) {
                    throw new Error("JUI_CRITICAL_ERR: '" + name + "' is already exist");
                }

                var args = getDepends(depends),
                    uiFunc = callback.apply(null, args);

                if (utility.typeCheck("function", globalClass[parent])) {
                    if (globalFunc[parent] !== true) {
                        throw new Error("JUI_CRITICAL_ERR: UI function can not be inherited");
                    } else {
                        utility.inherit(uiFunc, globalClass[parent]);
                    }
                }

                // 함수 고유 설정
                global[name] = uiFunc;
                globalClass[name] = uiFunc; // original function
                globalFunc[name] = true;

                // support AMD module
                // @deprecated
				/*
				 if (typeof define == "function" && define.amd) {
				 define(name, function () {
				 return global[name]
				 });
				 }*/
            },

            /**
             * @method redefine
             *
             * UI 클래스에서 사용될 클래스를 정의하고, 자유롭게 상속할 수 있는 클래스를 정의
             *
             * @param {String} name 모듈 로드와 상속에 사용될 이름을 정한다.
             * @param {Array} depends 'define'이나 'defineUI'로 정의된 클래스나 객체를 인자로 받을 수 있다.
             * @param {Function} callback UI 클래스를 해당 콜백 함수 내에서 클래스 형태로 구현하고 리턴해야 한다.
             * @param {String} parent 상속받을 클래스
             * @param {Boolean} 이미 정의되어 있으면 무시하기
             */
            redefine: function (name, depends, callback, parent, skip) {
                if (!skip && globalFunc[name] === true) {
                    global[name] = null;
                    globalClass[name] = null;
                    globalFunc[name] = false;
                }

                if (!skip || (skip && globalFunc[name] !== true)) {
                    this.define(name, depends, callback, parent);
                }
            },

            /**
             * @method defineOptions
             *
             * 모듈 기본 옵션 정의
             *
             * @param {Object} Module
             * @param {Object} options
             * @param {Object} exceptOpts
             * @return {Object}
             */
            defineOptions: function (Module, options, exceptOpts) {
                var defOpts = getOptions(Module, {});
                var defOptKeys = Object.keys(defOpts),
                    optKeys = Object.keys(options);

                // 정의되지 않은 옵션 사용 유무 체크
                for (var i = 0; i < optKeys.length; i++) {
                    var name = optKeys[i];

                    if (utility.inArray(name, defOptKeys) == -1 && utility.inArray(name, exceptOpts) == -1) {
                        throw new Error("JUI_CRITICAL_ERR: '" + name + "' is not an option");
                    }
                }

                // 사용자 옵션 + 기본 옵션
                utility.extend(options, defOpts, true);

                // 상위 모듈의 옵션까지 모두 얻어오는 함수
                function getOptions(Module, options) {
                    if (utility.typeCheck("function", Module)) {
                        if (utility.typeCheck("function", Module.setup)) {
                            var opts = Module.setup();

                            for (var key in opts) {
                                if (utility.typeCheck("undefined", options[key])) {
                                    options[key] = opts[key];
                                }
                            }
                        }

                        getOptions(Module.parent, options);
                    }

                    return options;
                }

                return options;
            },

            /**
             * define과 defineUI로 정의된 클래스 또는 객체를 가져온다.
             *
             * @param name 가져온 클래스 또는 객체의 이름
             * @return {*}
             */
            include: function (name) {
                if (!utility.typeCheck("string", name)) {
                    throw new Error("JUI_CRITICAL_ERR: Invalid parameter type of the function");
                }

                var module = global[name];

                if (utility.typeCheck(["function", "object"], module)) {
                    return module;
                } else {
                    var modules = getModules(name);

                    if (modules == null) {
                        console.log("JUI_WARNING_MSG: '" + name + "' is not loaded");
                        return null;
                    } else {
                        return modules;
                    }
                }
            },

            /**
             * define과 defineUI로 정의된 모든 클래스와 객체를 가져온다.
             *
             * @return {Array}
             */
            includeAll: function () {
                var result = [];

                for (var key in global) {
                    result.push(global[key]);
                }

                return result;
            }
        };


        if (typeof module == 'object' && module.exports) {
            module.exports = window.jui || global.jui;
        }

    })(window, (typeof(global) !== "undefined") ? global : window);
}
