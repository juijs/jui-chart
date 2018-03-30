jui.defineUI("chart.plane", [ "chart.builder", "util.base" ], function(builder, _) {
    var UI = function() {
        var chart = null,
            axis = [],
            brush = [],
            widget = [];

        var axisIndex = 0,
            baseAxis = {},
            etcAxis = {};

        function getSize(size) {
            if(_.typeCheck("number", size)) {
                return {
                    width: size,
                    height: size
                }
            } else if(_.typeCheck("object", size)) {
                if(!size.width) size.width = size.height;
                if(!size.height) size.height = size.width;

                return size;
            }
        }

        function getMin(min) {
            if(_.typeCheck("number", min)) {
                return {
                    x: min,
                    y: min,
                    z: min
                }
            } else if(_.typeCheck("object", min)) {
                if(!min.z) min.z = (min.x + min.y) / 2;
                return min;
            }
        }

        function getMax(max) {
            if(_.typeCheck("number", max)) {
                return {
                    x: max,
                    y: max,
                    z: max
                }
            } else if(_.typeCheck("object", max)) {
                if(!max.z) max.z = (max.x + max.y) / 2;
                return max;
            }
        }

        function getDepth(opts) {
            var size = getSize(opts.size);
            return ((size.width + size.height) / 2) - (opts.padding * 2)
        }

        this.init = function() {
            var opts = this.options,
                min = getMin(opts.min),
                max = getMax(opts.max),
                defAxis = {
                    type : "range",
                    step : opts.step,
                    line : opts.line
                };

            baseAxis.x = _.extend({ domain: [ min.x, max.x ] }, defAxis);
            baseAxis.y = _.extend({ domain: [ min.y, max.y ] }, defAxis);
            baseAxis.x.orient = "bottom";
            baseAxis.y.orient = "left";
            baseAxis.z = _.extend({ domain: [ min.z, max.z ] }, defAxis);
            baseAxis.depth = getDepth(opts);
            baseAxis.degree = opts.degree;
            baseAxis.perspective = opts.perspective;

            etcAxis.extend = 0;
            etcAxis.x = { hide: true };
            etcAxis.y = { hide: true };
            etcAxis.z = { hide: true };

            if(opts.dimension == "2d") {
                baseAxis.perspective = 1;
                baseAxis.degree.x = 0;
                baseAxis.degree.y = 0;
                baseAxis.degree.z = 0;
                baseAxis.z.hideText = true;
            }
        }

        this.push = function(data) {
            if(!_.typeCheck("array", data)) return;

            if(!axis[axisIndex]) {
                axis.push(_.extend({}, (axisIndex == 0) ? baseAxis : etcAxis));
            }

            if(!axis[axisIndex].data) {
                axis[axisIndex].data = [];
            }

            axis[axisIndex].data.push(data);
        }

        this.commit = function(opts) {
            var newOpts = {};

            if(_.typeCheck("object", opts)) {
                newOpts = opts;
            }

            newOpts = _.extend(newOpts, {
                type: this.options.brush.type,
                r: this.options.brush.r
            }, true);

            brush.push({
                type: "canvas.dot3d",
                color: axisIndex,
                axis: axisIndex,
                size: newOpts.r * 2,
                symbol: newOpts.type
            });

            axisIndex++;
        }

        this.append = function(opts) {
            var newOpts = {};

            if(_.typeCheck("array", opts)) {
                newOpts.data = opts;
            } else if(_.typeCheck("array", opts.data)) {
                newOpts = opts;
            }

            newOpts = _.extend(newOpts, {
                type: this.options.brush.type,
                r: this.options.brush.r
            }, true);

            axis.push(_.extend({}, (axisIndex == 0) ? baseAxis : etcAxis));
            axis[axisIndex].data = newOpts.data;

            brush.push({
                type: "canvas.dot3d",
                color: axisIndex,
                axis: axisIndex,
                size: newOpts.r * 2,
                symbol: newOpts.type
            });

            axisIndex++;
        }

        this.render = function() {
            var opts = this.options,
                size = getSize(opts.size);

            if(opts.dimension == "3d") {
                widget.push({
                    type: "polygon.rotate3d"
                });
            }

            if(chart != null) {
                chart.root.innerHTML = "";
                chart = null;
            }

            if(axis.length == 0) {
                axis.push(baseAxis);
            }

            chart = builder(this.root, {
                padding: opts.padding,
                width : size.width,
                height : size.height,
                axis : axis,
                brush : brush,
                widget : widget,
                style : opts.style,
                canvas : true
            });

            axis = [];
            brush = [];
            widget = [];
            axisIndex = 0;
        }
    }

    UI.setup = function() {
        return {
            dimension: "2d",
            size: 500,
            padding: 50,
            min: -100,
            max: 100,
            step: 4,
            line: true,
            perspective: 0.9,
            degree: {
                x: 10,
                y: 5,
                z: 0
            },
            brush: {
                type: "dot",
                r: 2
            },
            style: {
                gridFaceBackgroundOpacity: 0.1
            }
        }
    }

    return UI;
}, "core");
