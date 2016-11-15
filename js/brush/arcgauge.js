jui.define("chart.brush.arcgauge", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.arcgauge
     */
    var ArcGaugeBrush = function() {

        this.calculateArea = function() {
            var area = this.axis.c(0),
                dist = Math.abs(area.width - area.height),
                r = Math.min(area.width, area.height) / 2;

            return {
                radius: this.brush.textRadius,
                width: r - this.brush.textRadius,
                centerX: r + ((area.width > area.height) ? dist / 2 : 0),
                centerY: r + ((area.width < area.height) ? dist / 2 : 0)
            }
        }

        this.polarToCartesian = function(centerX, centerY, radius, angleInDegrees) {
            var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

            return {
                x: centerX + (radius * Math.cos(angleInRadians)),
                y: centerY + (radius * Math.sin(angleInRadians))
            };
        }

        this.describeArc = function(centerX, centerY, radius, startAngle, endAngle) {
            var endAngleOriginal = endAngle;

            if(endAngleOriginal - startAngle === 360){
                endAngle = 359.9;
            }

            var start = this.polarToCartesian(centerX, centerY, radius, endAngle),
                end = this.polarToCartesian(centerX, centerY, radius, startAngle),
                arcSweep = endAngle - startAngle <= 180 ? false : true;

            return {
                sx: end.x,
                sy: end.y,
                ex: start.x,
                ey: start.y,
                sweep: arcSweep
            }
        }

        this.drawStroke = function(p, radius, width, startAngle, endAngle, flag) {
            var area = this.calculateArea(),
                arc1 = this.describeArc(area.centerX, area.centerY, radius, startAngle, endAngle),
                arc2 = this.describeArc(area.centerX, area.centerY, radius + width, startAngle, endAngle);

            p.MoveTo(arc1.sx, arc1.sy);
            p.Arc(radius, radius, 0, arc1.sweep, (!flag) ? 1 : 0, arc1.ex, arc1.ey);
            p.LineTo(arc2.ex, arc2.ey);
            p.Arc(radius + width, radius + width, 0, arc2.sweep, (!flag) ? 0 : 1, arc2.sx, arc2.sy);
            p.LineTo(arc1.sx, arc1.sy);
            p.ClosePath();
        }

        this.draw = function() {
            var g = this.svg.group(),
                data = this.listData();

            if(data.length > 0) {
                var area = this.calculateArea(),
                    value = this.getValue(data[0], "value");

                var bg = this.svg.path({
                    fill: "#a9a9a9"
                });

                var stack = this.svg.path({
                    fill: this.color(0),
                    "stroke-linecap": "round"
                });

                var text = this.chart.text({
                    "font-size": 13,
                    "text-anchor": "middle",
                    fill: "#333",
                    x: area.centerX,
                    y: area.centerY,
                    dy: 13 / 3
                }).text(this.format(value));

                this.drawStroke(bg, area.radius, area.width, 0, 360);
                this.drawStroke(stack, area.radius, area.width, 0, 90);

                g.append(text);
                g.append(bg);
                g.append(stack);
            }

            return g;
        }
    }

    ArcGaugeBrush.setup = function() {
        return {
            clip: false,
            maxValue: 100,
            textRadius: 50,
            startAngle: 0,
            endAngle: 360,
            format: null
        };
    }

    return ArcGaugeBrush;
}, "chart.brush.core");
