jui.redefine("manager", [ "util.base" ], function (_) {

    /**
     * @class manager
     * @alias UIManager
     * @private
     * @singleton
     */
    var UIManager = new function () {
        var instances = [], classes = [];


        /**
         * @method add
         * Adds a component object created
         *
         * @param {Object} ui UI instance
         */
        this.add = function (uiIns) {
            instances.push(uiIns);
        }

        /**
         * @method emit
         * Generates a custom event to an applicable component
         *
         * @param {String} key Selector or UI type
         * @param {String} type Event type
         * @param {Array} args Event arguments
         */
        this.emit = function (key, type, args) {
            var targets = [];

            for (var i = 0; i < instances.length; i++) {
                var uiSet = instances[i];

                if (key == uiSet.selector || key == uiSet.type) {
                    targets.push(uiSet);
                }
            }

            for (var i = 0; i < targets.length; i++) {
                var uiSet = targets[i];

                for (var j = 0; j < uiSet.length; j++) {
                    uiSet[j].emit(type, args);
                }
            }
        }

        /**
         * @method get
         * Gets a component currently created
         *
         * @param {Integer/String} key
         * @returns {Object/Array} UI instance
         */
        this.get = function (key) {
            if (_.typeCheck("integer", key)) {
                return instances[key];
            } else if (_.typeCheck("string", key)) {
                // 셀렉터 객체 검색
                for (var i = 0; i < instances.length; i++) {
                    var uiSet = instances[i];

                    if (key == uiSet.selector) {
                        return (uiSet.length == 1) ? uiSet[0] : uiSet;
                    }
                }

                // 모듈 객체 검색
                var result = [];
                for (var i = 0; i < instances.length; i++) {
                    var uiSet = instances[i];

                    if (key == uiSet.type) {
                        result.push(uiSet);
                    }
                }

                return result;
            }
        }

        /**
         * @method getAll
         * Gets all components currently created
         *
         * @return {Array} UI instances
         */
        this.getAll = function () {
            return instances;
        }

        /**
         * @method remove
         * Removes a component object in an applicable index from the list
         *
         * @param {Integer} index
         * @return {Object} Removed instance
         */
        this.remove = function (index) {
            if (_.typeCheck("integer", index)) { // UI 객체 인덱스
                return instances.splice(index, 1)[0];
            }
        }

        /**
         * @method shift
         * Removes the last component object from the list
         *
         * @return {Object} Removed instance
         */
        this.shift = function () {
            return instances.shift();
        }

        /**
         * @method pop
         * Removes the first component object from the list
         *
         * @return {Object} Removed instance
         */
        this.pop = function () {
            return instances.pop();
        }

        /**
         * @method size
         * Gets the number of objects currently created
         *
         * @return {Number}
         */
        this.size = function () {
            return instances.length;
        }

        /**
         * @method debug
         *
         * @param {Object} uiObj UI instance
         * @param {Number} i
         * @param {Number} j
         * @param {Function} callback
         */
        this.debug = function (uiObj, i, j, callback) {
            if (!uiObj.__proto__) return;
            var exFuncList = ["emit", "on", "addEvent", "addValid", "callBefore",
                "callAfter", "callDelay", "setTpl", "setVo", "setOption"];

            for (var key in uiObj) {
                var func = uiObj[key];

                if (typeof(func) == "function" && _.inArray(key, exFuncList) == -1) {
                    (function (funcName, funcObj, funcIndex, funcChildIndex) {
                        uiObj.__proto__[funcName] = function () {
                            var nStart = Date.now();
                            var resultObj = funcObj.apply(this, arguments);
                            var nEnd = Date.now();

                            if (typeof(callback) == "function") {
                                callback({
                                    type: jui.get(i).type,
                                    name: funcName,
                                    c_index: funcIndex,
                                    u_index: funcChildIndex,
                                    time: nEnd - nStart
                                }, arguments);
                            } else {
                                if (!isNaN(funcIndex) && !isNaN(funcChildIndex)) {
                                    console.log(
                                        "TYPE(" + jui.get(i).type + "), " +
                                        "NAME(" + funcName + "), " +
                                        "INDEX(" + funcIndex + ":" + funcChildIndex + "), " +
                                        "TIME(" + (nEnd - nStart) + "ms), " +
                                        "ARGUMENTS..."
                                    );
                                } else {
                                    console.log(
                                        "NAME(" + funcName + "), " +
                                        "TIME(" + (nEnd - nStart) + "ms), " +
                                        "ARGUMENTS..."
                                    );
                                }

                                console.log(arguments);
                                console.log("");
                            }


                            return resultObj;
                        }
                    })(key, func, i, j);
                }
            }
        }

        /**
         * @method debugAll
         * debugs all component objects currently existing
         *
         * @param {Function} callback
         */
        this.debugAll = function (callback) {
            for (var i = 0; i < instances.length; i++) {
                var uiList = instances[i];

                for (var j = 0; j < uiList.length; j++) {
                    this.debug(uiList[j], i, j, callback);
                }
            }
        }

        /**
         * @method addClass
         * Adds a component class
         *
         * @param {Object} uiCls UI Class
         */
        this.addClass = function (uiCls) {
            classes.push(uiCls);
        }

        /**
         * @method getClass
         * Gets a component class
         *
         * @param {String/Integer} key
         * @return {Object}
         */
        this.getClass = function (key) {
            if (_.typeCheck("integer", key)) {
                return classes[key];
            } else if (_.typeCheck("string", key)) {
                for (var i = 0; i < classes.length; i++) {
                    if (key == classes[i].type) {
                        return classes[i];
                    }
                }
            }

            return null;
        }

        /**
         * @method getClassAll
         * Gets all component classes
         *
         * @return {Array}
         */
        this.getClassAll = function () {
            return classes;
        }

        /**
         * @method create
         * It is possible to create a component dynamically after the ready point
         *
         * @param {String} type UI type
         * @param {String/DOMElement} selector
         * @param {Object} options
         * @return {Object}
         */
        this.create = function (type, selector, options) {
            var cls = UIManager.getClass(type);

            if (_.typeCheck("null", cls)) {
                throw new Error("JUI_CRITICAL_ERR: '" + type + "' does not exist");
            }

            return cls["class"](selector, options);
        }
    };

    return UIManager;
}, null, true);