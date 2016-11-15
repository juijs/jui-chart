jui.define("chart.brush.arcgauge", [ "util.base", "util.math" ], function(_, math) {

    /**
     * @class chart.brush.arcgauge
     */
    var ArcGaugeBrush = function() {
        var g = null;

        this.calculateArea = function() {
            var area = this.axis.c(0),
                dist = Math.abs(area.width - area.height),
                r = Math.min(area.width, area.height) / 2;

            return {
                radius: r - this.brush.size,
                width: this.brush.size,
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

        this.drawStroke = function(p, radius, width, startAngle, endAngle) {
            var area = this.calculateArea(),
                arc1 = this.describeArc(area.centerX, area.centerY, radius, startAngle, endAngle),
                arc2 = this.describeArc(area.centerX, area.centerY, radius + width, startAngle, endAngle);

            p.MoveTo(arc1.sx, arc1.sy);
            p.Arc(radius, radius, 0, arc1.sweep, 1, arc1.ex, arc1.ey);
            p.LineTo(arc2.ex, arc2.ey);
            p.Arc(radius + width, radius + width, 0, arc2.sweep, 0, arc2.sx, arc2.sy);
            p.LineTo(arc1.sx, arc1.sy);
            p.ClosePath();
        }

        this.drawUnit = function(index, data) {
            var startAngle = this.brush.startAngle,
                endAngle = this.brush.endAngle;

            var title = this.getValue(data, "title"),
                value = this.getValue(data, "value", 0),
                max = this.getValue(data, "max", 100),
                min = this.getValue(data, "min", 0),
                rate = (value - min) / (max - min),
                currentAngle = (endAngle - startAngle) * rate;

            var area = this.calculateArea(),
                textScale = math.scaleValue(area.radius, 40, 400, 1, 1.5),
                stackSize = this.brush.size;

            // 도트 그리기
            for(var i = startAngle; i < endAngle; i+=5) {
                var rad = math.radian(i - 89),
                    sx = Math.cos(rad) * (area.radius - stackSize),
                    sy = Math.sin(rad) * (area.radius - stackSize),
                    ex = Math.cos(rad) * (area.radius - stackSize*3),
                    ey = Math.sin(rad) * (area.radius - stackSize*3);

                g.append(this.svg.line({
                    x1: area.centerX + sx,
                    y1: area.centerY + sy,
                    x2: area.centerX + ex,
                    y2: area.centerY + ey,
                    stroke: this.chart.theme("gaugeArrowColor")
                }));
            }

            // 바 그리기
            var stack = this.svg.path({
                fill: this.color(index)
            });

            this.drawStroke(stack, area.radius, area.width, startAngle, startAngle + currentAngle);
            g.append(stack);

            // 텍스트 그리기
            if(this.brush.showText) {
                g.append(this.createText(value, index, area.centerX, area.centerY - (area.radius * 0.2), textScale));
            }

            // 타이틀 그리기
            if(title != "") {
                g.append(this.createTitle(title, index, area.centerX, area.centerY - (area.radius * 0.2), this.brush.titleX, this.brush.titleY, textScale));
            }
        }

        this.draw = function() {
            g = this.chart.svg.group();

            this.eachData(function(data, i) {
                this.drawUnit(i, data);
            });

            return g;
        }
    }

    ArcGaugeBrush.setup = function() {
        return {
            /** @cfg {Number} [size=30] Determines the stroke width of a gauge.  */
            size: 5,
            /** @cfg {Number} [startAngle=0] Determines the start angle(as start point) of a gauge. */
            startAngle: 245,
            /** @cfg {Number} [endAngle=360] Determines the end angle(as draw point) of a gauge. */
            endAngle: 475,
            /** @cfg {Boolean} [showText=true] */
            showText: true,
            /** @cfg {Number} [titleX=0] */
            titleX: 0,
            /** @cfg {Number} [titleY=0]  */
            titleY: 0,
            /** @cfg {Function} [format=null] */
            format: null
        };
    }

    return ArcGaugeBrush;
}, "chart.brush.fullgauge");
