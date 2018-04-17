jui.defineUI("chart.plane", [ "chart.builder", "util.base" ], function(builder, _) {
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
                    step : opts.step,
                    line : opts.line
                };

            baseAxis.x = _.extend({ domain: opts.x }, defAxis);
            baseAxis.y = _.extend({ domain: opts.y }, defAxis);
            baseAxis.x.orient = "bottom";
            baseAxis.y.orient = "left";
            baseAxis.z = _.extend({ domain: opts.z }, defAxis);
            baseAxis.depth = opts.depth - (opts.padding * 2);
            baseAxis.degree = { x: opts.dx, y: opts.dy, z: opts.dz };
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

        this.commit = function(symbol, r) {
            var opts = this.options;

            brush.push({
                type: "canvas.dot3d",
                color: axisIndex,
                axis: axisIndex,
                symbol: symbol || opts.symbol,
                size: (r || opts.r) * 2
            });

            axisIndex++;
        }

        this.append = function(datas, symbol, r) {
            var opts = this.options;

            axis.push(_.extend({}, (axisIndex == 0) ? baseAxis : etcAxis));
            axis[axisIndex].data = datas;

            brush.push({
                type: "canvas.dot3d",
                color: axisIndex,
                axis: axisIndex,
                symbol: symbol || opts.symbol,
                size: (r || opts.r) * 2
            });

            axisIndex++;
        }

        this.render = function() {
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

            if(axis.length == 0) {
                axis.push(baseAxis);
            }

            chart = builder(this.root, {
                padding: opts.padding,
                width : opts.width,
                height : opts.height,
                axis : axis,
                brush : brush,
                widget : widget,
                canvas : true,
                render : false,
                style : {
                    gridFaceBackgroundOpacity: 0.1
                }
            });

            if(_.typeCheck("array", opts.colors)) {
                var colors = [];

                for(var i = 0; i < opts.colors.length; i++) {
                    colors.push(chart.color(opts.colors[i]));
                }

                chart.setTheme({ colors: colors });
            }

            axis = [];
            brush = [];
            widget = [];
            axisIndex = 0;

            chart.render();
        }
    }

    UI.setup = function() {
        return {
            dimension: "2d",
            width: 500,
            height: 500,
            depth: 500,
            padding: 50,
            x: [ -100, 100 ],
            y: [ -100, 100 ],
            z: [ -100, 100 ],
            step: 4,
            line: true,
            symbol: "dot",
            r: 2,
            perspective: 0.9,
            dx: 10,
            dy: 5,
            dz: 0,
            colors: null
        }
    }

    return UI;
}, "core");
