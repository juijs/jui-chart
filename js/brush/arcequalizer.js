jui.define("chart.brush.arcequalizer", [], function() {

    /**
     * @class chart.brush.arcequalizer
     */
    var ArcEqualizerBrush = function() {
        var g, r = 0, cx = 0, cy = 0;
        var innerRadius = 50, stackSize = 0, stackAngle = 0;

        function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
            var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

            return {
                x: centerX + (radius * Math.cos(angleInRadians)),
                y: centerY + (radius * Math.sin(angleInRadians))
            };
        }

        function describeArc(radius, startAngle, endAngle) {
            var endAngleOriginal = endAngle;
            if(endAngleOriginal - startAngle === 360){
                endAngle = 359;
            }

            var start = polarToCartesian(cx, cy, radius, endAngle),
                end = polarToCartesian(cx, cy, radius, startAngle),
                arcSweep = endAngle - startAngle <= 180 ? false : true;

            return {
                sx: end.x,
                sy: end.y,
                ex: start.x,
                ey: start.y,
                sweep: arcSweep
            }
        }

        function drawPath(p, radius, startAngle, endAngle) {
            var arc1 = describeArc(radius, startAngle, endAngle),
                arc2 = describeArc(radius + stackSize, startAngle, endAngle);

            p.MoveTo(arc1.sx, arc1.sy);
            p.Arc(radius, radius, 0, arc1.sweep, 1, arc1.ex, arc1.ey);
            p.LineTo(arc2.ex, arc2.ey);
            p.Arc(radius + stackSize, radius + stackSize, 0, arc2.sweep, 0, arc2.sx, arc2.sy);
            p.LineTo(arc1.sx, arc1.sy);
            p.ClosePath();
        }

        this.drawBefore = function() {
            g = this.svg.group();

            var area = this.axis.c(0),
                dist = Math.abs(area.width - area.height);

            r = Math.min(area.width, area.height) / 2;
            cx = r + ((area.width > area.height) ? dist / 2 : 0);
            cy = r + ((area.width < area.height) ? dist / 2 : 0);

            stackSize = (r - innerRadius) / this.brush.stackCount;
            stackAngle = 360 / this.listData().length;
        }

        this.draw = function() {
            this.eachData(function(data, index) {
                var p = this.svg.path({
                    fill: this.color(index),
                    stroke: "white",
                    "stroke-width": 0.5
                });

                var count = Math.floor((Math.random() * this.brush.stackCount) + 1);
                for(var i = 0; i < count; i++) {
                    drawPath(p, innerRadius + (i * stackSize), index * stackAngle, (index + 1) * stackAngle);
                }

                g.append(p);
            });

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
