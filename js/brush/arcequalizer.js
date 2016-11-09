jui.define("chart.brush.arcequalizer", [], function() {

    /**
     * @class chart.brush.arcequalizer
     */
    var ArcEqualizerBrush = function() {
        var g, r = 0, cx = 0, cy = 0;

        function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
            var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

            return {
                x: centerX + (radius * Math.cos(angleInRadians)),
                y: centerY + (radius * Math.sin(angleInRadians))
            };
        }

        function describeArc(x, y, radius, startAngle, endAngle){

            var endAngleOriginal = endAngle;
            if(endAngleOriginal - startAngle === 360){
                endAngle = 359;
            }

            var start = polarToCartesian(x, y, radius, endAngle);
            var end = polarToCartesian(x, y, radius, startAngle);

            var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

            if(endAngleOriginal - startAngle === 360){
                var d = [
                    "M", start.x, start.y,
                    "A", radius, radius, 0, arcSweep, 0, end.x, end.y, "z"
                ].join(" ");
            }
            else{
                var d = [
                    "M", start.x, start.y,
                    "A", radius, radius, 0, arcSweep, 0, end.x, end.y
                ].join(" ");
            }

            return d;
        }

        this.drawBefore = function() {
            g = this.svg.group();

            var area = this.axis.c(0),
                dist = Math.abs(area.width - area.height);

            r = Math.min(area.width, area.height) / 2;
            cx = r + ((area.width > area.height) ? dist / 2 : 0);
            cy = r + ((area.width < area.height) ? dist / 2 : 0);
        }

        this.draw = function() {
            g.append(this.svg.path({
                d: describeArc(cx, cy, r, 0, 90),
                fill: "transparent",
                stroke: "red",
                "stroke-width": 10
            }));

            return g;
        }
    }

    ArcEqualizerBrush.setup = function() {
        return {
            clip: false
        };
    }

    return ArcEqualizerBrush;
}, "chart.brush.stackcolumn");
