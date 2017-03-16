jui.define("chart.brush.selectbox", [], function() {
    var SelectBoxBrush = function() {
        var g, zeroY, width, height, ticks;

        this.drawBefore = function() {
            g = this.chart.svg.group();
            zeroY = this.axis.area("y2");
            width = this.axis.x.rangeBand();
            height = this.axis.area("height");
            ticks = this.axis.x.ticks("milliseconds", this.axis.get("x").interval);
        }

        this.draw = function() {
            var bgColor = this.chart.theme("selectBoxBackgroundColor"),
                bgOpacity = this.chart.theme("selectBoxBackgroundOpacity"),
                lineColor = this.chart.theme("selectBoxBorderColor"),
                lineOpacity = this.chart.theme("selectBoxBorderOpacity");

            for(var i = 0; i < ticks.length - 1; i++) {
                var startX = this.axis.x(ticks[i]);

                var r = this.svg.rect({
                    width: width,
                    height: height,
                    fill: bgColor,
                    "fill-opacity": 0,
                    stroke: lineColor,
                    "stroke-opacity": 0,
                    cursor: "pointer"
                }).translate(startX, zeroY - height);

                (function(elem) {
                    elem.hover(function() {
                        elem.attr({
                            "fill-opacity": bgOpacity,
                            "stroke-opacity": lineOpacity
                        });
                    }, function() {
                        elem.attr({
                            "fill-opacity": 0,
                            "stroke-opacity": 0
                        });
                    });
                })(r);

                this.addEvent(r, {
                    start: ticks[i],
                    end: ticks[i + 1]
                });

                g.append(r);
            }

            return g;
        }
    }

    SelectBoxBrush.setup = function() {
        return {
            clip: false
        }
    }

    return SelectBoxBrush;
}, "chart.brush.core");