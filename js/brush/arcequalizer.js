jui.define("chart.brush.arcequalizer", [], function() {

    /**
     * @class chart.brush.arcequalizer
     */
    var ArcEqualizerBrush = function() {
        var g, r = 0, cx = 0, cy = 0;
        var innerRadius = 50, stackSize = 0;

        function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
            var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

            return {
                x: centerX + (radius * Math.cos(angleInRadians)),
                y: centerY + (radius * Math.sin(angleInRadians))
            };
        }

        function describeArc(p, x, y, radius, startAngle, endAngle){
            var endAngleOriginal = endAngle;
            if(endAngleOriginal - startAngle === 360){
                endAngle = 359;
            }

            var start = polarToCartesian(x, y, radius, endAngle),
                end = polarToCartesian(x, y, radius, startAngle),
                arcSweep = endAngle - startAngle <= 180 ? false : true;

            if(endAngleOriginal - startAngle === 360) {
                p.MoveTo(start.x, start.y);
                p.Arc(radius, radius, 0, arcSweep, 0, end.x, end.y);
                p.ClosePath();
            } else {
                p.MoveTo(start.x, start.y);
                p.Arc(radius, radius, 0, arcSweep, 0, end.x, end.y);
            }
        }

        this.drawBefore = function() {
            g = this.svg.group();

            var area = this.axis.c(0),
                dist = Math.abs(area.width - area.height);

            r = Math.min(area.width, area.height) / 2;
            cx = r + ((area.width > area.height) ? dist / 2 : 0);
            cy = r + ((area.width < area.height) ? dist / 2 : 0);

            stackSize = (r - innerRadius) / this.brush.stackCount;
        }

        this.draw = function() {
            var p = this.svg.path({
                fill: "transparent",
                stroke: "red",
                "stroke-width": 1,
            });

            describeArc(p, cx, cy, r, 0, 90);
            g.append(p);

            return g;
        }
    }

    ArcEqualizerBrush.setup = function() {
        return {
            clip: false,
            stackCount: 25
        };
    }

    return ArcEqualizerBrush;
}, "chart.brush.stackcolumn");
