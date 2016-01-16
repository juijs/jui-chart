jui.define("chart.brush.pin", [ "util.base" ], function(_) {
    /**
     * @class chart.brush.pin  
     * @extends chart.brush.core
     */
    var PinBrush = function(chart, axis, brush) {
        var self = this;

        this.draw = function() {
            var size = brush.size,
                color = chart.theme("pinBorderColor"),
                width = chart.theme("pinBorderWidth"),
                fontSize = chart.theme("pinFontSize"),
                startY = axis.area("y"),
                showText = _.typeCheck("function", this.brush.format);

            var g = chart.svg.group({}, function() {
                var d = axis.x(brush.split),
                    x = d - (size / 2);

                if(showText) {
                    var value = self.format(axis.x.invert(d));

                    chart.text({
                        "text-anchor": "middle",
                        "font-size": fontSize,
                        "fill": chart.theme("pinFontColor")
                    }, value).translate(d, startY);
                }

                chart.svg.polygon({
                    fill: color
                })
                .point(size, 0)
                .point(size / 2, size)
                .point(0, 0)
                .translate(x, fontSize / 2);

                chart.svg.line({
                    stroke: color,
                    "stroke-width": width,
                    x1: size / 2,
                    y1: startY,
                    x2: size / 2,
                    y2: axis.area("height")
                }).translate(x, fontSize / 2);
            });

            return g;
        }
    }

    PinBrush.setup = function() {
        return {
            /** @cfg {Number} [size=6] */
            size: 6,
            /** @cfg {Number} [split=0] Determines a location where a pin is displayed (data index). */
            split: 0,
            /** @cfg {Function} [format=null] */
            format: null,
            /** @cfg {boolean} [clip=false] If the brush is drawn outside of the chart, cut the area. */
            clip : false
        };
    }

    return PinBrush;
}, "chart.brush.core");