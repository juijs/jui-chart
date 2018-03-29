jui.defineUI("chart.plane", [ "chart.builder", "util.math", "util.base" ], function(builder, math, _) {
    var UI = function() {
        var chart = null,
            axis = [],
            brush = [],
            widget = [];

        var axisIndex = 0,
            baseAxis = {},
            etcAxis = {};

        this.init = function() {
            var opts = this.options,
                defAxis = {
                type : "range",
                domain : [ opts.min, opts.max ],
                step : opts.step,
                line : opts.line
            };

            baseAxis.x = _.extend({}, defAxis);
            baseAxis.y = _.extend({}, defAxis);
            baseAxis.x.orient = "bottom";
            baseAxis.y.orient = "left";
            baseAxis.z = _.extend({}, defAxis);
            baseAxis.depth = opts.size - (opts.padding * 2);
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

        this.add = function(data) {
            axis.push(_.extend({}, (axisIndex == 0) ? baseAxis : etcAxis));
            axis[axisIndex].data = data;

            brush.push({
                type: "canvas.dot3d",
                color: axisIndex,
                axis: axisIndex,
                size: this.options.dot.r
            });

            axisIndex++;
        }

        this.end = function() {
            var opts = this.options;

            if(opts.dimension == "3d") {
                widget.push({
                    type: "polygon.rotate3d"
                });
            }

            if(chart != null) {
                chart.root.innerHTML = "";
                chart = null;
            }

            chart = builder(this.root, {
                padding: opts.padding,
                width : opts.size,
                height : opts.size,
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
            dot: {
                r: 5
            },
            style: {}
        }
    }

    return UI;
}, "core");
