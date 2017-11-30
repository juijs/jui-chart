jui.redefine("collection", [], function() {

    /**
     * @class collection
     * @alias UICollection
     * @private
     * @singleton
     */
    var UICollection = function (type, selector, options, list) {
        this.type = type;
        this.selector = selector;
        this.options = options;

        this.destroy = function () {
            for (var i = 0; i < list.length; i++) {
                list[i].destroy();
            }
        }

        for (var i = 0; i < list.length; i++) {
            this.push(list[i]);
        }
    }

    UICollection.prototype = Object.create(Array.prototype);

    return UICollection;
}, null, true);