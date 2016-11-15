jui.define("chart.brush.arcgauge", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.arcgauge
     */
    var ArcGaugeBrush = function() {
        var g, r = 0, cx = 0, cy = 0;

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

        this.calculateArea = function() {
            var area = this.axis.c(0),
                dist = Math.abs(area.width - area.height),
                r = Math.min(area.width, area.height) / 2;

            return {
                radius: r,
                width: r - this.brush.textRadius,
                centerX: r + ((area.width > area.height) ? dist / 2 : 0),
                centerY: r + ((area.width < area.height) ? dist / 2 : 0)
            }
        }

        this.drawStroke = function(p, radius, width, startAngle, endAngle) {
            var arc1 = this.describeArc(radius, startAngle, endAngle),
                arc2 = this.describeArc(radius + width, startAngle, endAngle);

            p.MoveTo(arc1.sx, arc1.sy);
            p.Arc(radius, radius, 0, arc1.sweep, 1, arc1.ex, arc1.ey);
            p.LineTo(arc2.ex, arc2.ey);
            p.Arc(radius + width, radius + width, 0, arc2.sweep, 0, arc2.sx, arc2.sy);
            p.LineTo(arc1.sx, arc1.sy);
            p.ClosePath();
        }

        this.drawBefore = function() {
            g = this.svg.group();
        }

        this.draw = function() {
            var info = calculateData(),
                data = info.data,
                total = info.total;

            var stackBorderColor = this.chart.theme("arcEqualizerBorderColor"),
                stackBorderWidth = this.chart.theme("arcEqualizerBorderWidth"),
                textFontSize = this.chart.theme("arcEqualizerFontSize"),
                textFontColor = this.chart.theme("arcEqualizerFontColor");

            for(var i = 0; i < data.length; i++) {
                var start = 0;

                for(var j = 0; j < data[i].length; j++) {
                    var p = this.svg.path({
                        fill: (dataCount == 0) ? this.chart.theme("arcEqualizerBackgroundColor") : this.color(j),
                        stroke: stackBorderColor,
                        "stroke-width": stackBorderWidth
                    });

                    for(var k = start; k < start + data[i][j]; k++) {
                        drawPath(p, this.brush.textRadius + (k * stackSize), i * stackAngle, (i + 1) * stackAngle);
                    }

                    start += data[i][j];

                    this.addEvent(p, i, j);
                    g.append(p);
                }
            }

            var text = this.chart.text({
                "font-size": textFontSize,
                "text-anchor": "middle",
                fill: textFontColor,
                x: cx,
                y: cy,
                dy: textFontSize / 3
            }).text(this.format(total));
            g.append(text);

            return g;
        }
    }

    ArcGaugeBrush.setup = function() {
        return {
            clip: false,
            maxValue: 100,
            textRadius: 50,
            format: null
        };
    }

    return ArcGaugeBrush;
}, "chart.brush.core");
