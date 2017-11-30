jui.redefine("util.dom", [ "util.base" ], function(_) {

    /**
     * @class util.dom
     *
     * pure dom utility
     *
     * @singleton
     */
    return {
        find: function() {
            var args = arguments;

            if(args.length == 1) {
                if(_.typeCheck("string", args[0])) {
                    return document.querySelectorAll(args[0]);
                }
            } else if(args.length == 2) {
                if(_.typeCheck("object", args[0]) && _.typeCheck("string", args[1])) {
                    return args[0].querySelectorAll(args[1]);
                }
            }

            return [];
        },

        each: function(selectorOrElements, callback) {
            if(!_.typeCheck("function", callback)) return;

            var elements = null;

            if(_.typeCheck("string", selectorOrElements)) {
                elements = document.querySelectorAll(selectorOrElements);
            } else if(_.typeCheck("array", selectorOrElements)) {
                elements = selectorOrElements;
            }

            if(elements != null) {
                Array.prototype.forEach.call(elements, function(el, i) {
                    callback.apply(el, [ i, el ]);
                });
            }
        },

        attr: function(selectorOrElements, keyOrAttributes) {
            if(!_.typeCheck([ "string", "array" ], selectorOrElements))
                return;

            var elements = document.querySelectorAll(selectorOrElements);

            if(_.typeCheck("object", keyOrAttributes)) { // set
                for(var i = 0; i < elements.length; i++) {
                    for(var key in keyOrAttributes) {
                        elements[i].setAttribute(key, keyOrAttributes[key]);
                    }
                }
            } else if(_.typeCheck("string", keyOrAttributes)) { // get
                if(elements.length > 0) {
                    return elements[0].getAttribute(keyOrAttributes);
                }
            }
        },

        remove: function(selectorOrElements) {
            this.each(selectorOrElements, function() {
                this.parentNode.removeChild(this);
            });
        },

        offset: function(elem) {
            function isWindow(obj) {
                /* jshint eqeqeq: false */
                return obj != null && obj == obj.window;
            }

            function getWindow(elem) {
                return isWindow(elem) ?
                    elem :
                    elem.nodeType === 9 ?
                    elem.defaultView || elem.parentWindow :
                        false;
            }

            var docElem, win,
                box = { top: 0, left: 0 },
                doc = elem && elem.ownerDocument;

            if ( !doc ) {
                return;
            }

            docElem = doc.documentElement;

            // Make sure it's not a disconnected DOM node
            /*/
             if ( !global.jquery.contains( docElem, elem ) ) {
             return box;
             }
             /**/

            // If we don't have gBCR, just use 0,0 rather than error
            // BlackBerry 5, iOS 3 (original iPhone)
            var strundefined = typeof undefined;
            if ( typeof elem.getBoundingClientRect !== strundefined ) {
                box = elem.getBoundingClientRect();
            }
            win = getWindow( doc );

            return {
                top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
                left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
            };
        }
    }
}, null, true);