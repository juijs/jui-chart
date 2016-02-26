jui.define("chart.brush.canvas.line", ["util.base"], function(_) {

    /**
     * @class chart.brush.canvas.line
     * @extends chart.brush.canvas.core
     */

    var Tooltip = function(text, x, y) {
        this.text = text || '';
        this.x = x || 0;
        this.y = y || 0;
        this.textAlign = 'center';
        this.fontStyle = '600 10px sans-serif';
    };

    Tooltip.prototype.render = function(ctx) {
        ctx.save();
        ctx.font = this.fontStyle;
        ctx.strokeStyle = '#000000';
        ctx.textAlign = this.textAlign;
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    };

    var PathPoint = function(value, x, y, isMax, isMin) {
        this.value = value || '';
        this.x = x || 0;
        this.y = y || 0;
        this.isMax = isMax || false;
        this.isMin = isMin || false;
    }

    PathPoint.prototype.renderTooltip = function(ctx) {
        if (!this.tooltip) {
            this.tooltip = new Tooltip(this.value, this.x, this.y - 5);
        }

        this.tooltip.render(ctx);
    };

	var LineBrush = function() {
        this.getPoints = function(data) {
            var points = [];

            for (var i = 0; i < data.length; i++) {
                var value = data.value[i];
                var x = this.axis.x(i);
                var y = this.axis.y(value);
                var isMax = data.max[i];
                var isMin = data.min[i];
                var symbol = this.brush.symbol;

                points.push(new PathPoint(value, x, y, isMax, isMin));
                if (symbol == 'step') {

                }
            }

            return points;
        };

        this.renderPoints = function(points, index) {
            var prevPoint = null;
            var symbol = this.brush.symbol;

            this.canvas.beginPath();
            this.canvas.lineWidth = 2;

            for (var i = 0; i < points.length; i++) {
                var currentPoint = points[i];
                if (prevPoint) {
                    this.canvas.strokeStyle = this.color(i, index);

                    if (symbol == 'curve') {
                        this.drawCurvedLine(prevPoint, currentPoint);
                    }
                    else if (symbol == 'step') {
                        var halfPoint = prevPoint.x + (currentPoint.x - prevPoint.x) / 2;
                        this.drawLine(
                            { x: prevPoint.x, y: prevPoint.y },
                            { x: halfPoint, y: prevPoint.y }
                        );
                        this.drawLine(
                            { x: halfPoint, y: prevPoint.y },
                            { x: halfPoint, y: currentPoint.y }
                        );
                        this.drawLine(
                            { x: halfPoint, y: currentPoint.y },
                            { x: currentPoint.x, y: currentPoint.y }
                        );
                    }
                    else {
                        this.drawLine(prevPoint, currentPoint);
                    }
                }

                if ((this.brush.display == 'all') ||
                    (this.brush.display == 'max' && currentPoint.isMax) ||
                    (this.brush.display == 'min' && currentPoint.isMin)) {
                    currentPoint.renderTooltip(this.canvas);
                }

                prevPoint = points[i];
            };

            this.canvas.stroke();
            this.canvas.closePath();
        };

        this.drawLine = function(prevPoint, point) {
            this.canvas.moveTo(prevPoint.x, prevPoint.y);
            this.canvas.lineTo(point.x, point.y);
        };

        this.drawCurvedLine = function(prevPoint, point) {
            var curvePointX = (point.x - prevPoint.x) / 2;
            var curvePointY = Math.abs((point.y - prevPoint.y) / 6);

            if (point.y - prevPoint.y < 0) curvePointY = curvePointY * -1;

            this.canvas.moveTo(prevPoint.x, prevPoint.y);
            this.canvas.bezierCurveTo(
                prevPoint.x + curvePointX,
                prevPoint.y + curvePointY,
                point.x - curvePointX,
                point.y + (curvePointY * -1),
                point.x, point.y
            );
        }

        this.draw = function() {
            var data = this.getXY();
            var points = [];

            for (var i = 0; i < data.length; i++) {
                points[i] = this.getPoints(data[i]);
            }

            for (var i = 0; i < points.length; i++) {
                this.renderPoints(points[i], i);
            }
        };
	}

    LineBrush.setup = function() {
        return {
            /** @cfg {"normal"/"curve"/"step"} [symbol="normal"] Sets the shape of a line (normal, curve, step). */
            symbol: "normal", // normal, curve, step
            /** @cfg {Number} [active=null] Activates the bar of an applicable index. */
            active: null,
            /** @cfg {String} [activeEvent=null]  Activates the bar in question when a configured event occurs (click, mouseover, etc). */
            activeEvent: null,
            /** @cfg {"max"/"min"/"all"} [display=null]  Shows a tool tip on the bar for the minimum/maximum value.  */
            display: null,
            /** @cfg {"circle"/"triangle"/"rectangle"/"cross"/"callback"} [symbol="circle"] Determines the shape of a (circle, rectangle, cross, triangle).  */
            symbol: "circle",
            /** @cfg {Number} [size=7]  Determines the size of a starter. */
            size: 7,
        };
    }

	return LineBrush;
}, "chart.brush.canvas.core");