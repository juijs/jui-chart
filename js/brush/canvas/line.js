jui.define("chart.brush.canvas.line.tooltip", [], function() {
    var Tooltip = function(text, x, y) {
        this.text = text || '';
        this.x = x || 0;
        this.y = y || 0;
        this.textAlign = "center";
        this.fontStyle = "600 10px sans-serif";

        this.render = function(ctx, color) {
            ctx.save();
            ctx.font = this.fontStyle;
            ctx.textAlign = this.textAlign;
            ctx.fillText(this.text, this.x, this.y);
            ctx.restore();
        }
    };

    Tooltip.setup = function() {
        return {
            /** @cfg {String} [text=""]  Sets the value of tooltip*/
            text: "",
            /** @cfg {Number} [x=0] Sets the X coordinate of tooltip. */
            x: 0,
            /** @cfg {Number} [y=0] Sets the Y coordinate of tooltip. */
            y: 0,
            /** @cfg {"start"/"end"/"left"/"center"/"right"} [textAlign="center"] Determines the align type of a (start, end, left, center, right).  */
            textAlign: "center",
            /** @cfg {String} [fontStyle="600 10px sans-serif"] Sets the font style of tooltip */
            fontStyle: "600 10px sans-serif"
        }
    }

    return Tooltip;
});

jui.define("chart.brush.canvas.line.pathpoint", ["chart.brush.canvas.line.tooltip"], function(Tooltip) {
    var PathPoint = function(value, x, y, isMax, isMin) {
        this.value = value || '';
        this.x = x || 0;
        this.y = y || 0;
        this.isMax = isMax || false;
        this.isMin = isMin || false;

        this.render = function(ctx, color) {
            if (!this.tooltip) {
                this.tooltip = new Tooltip(this.value, this.x, this.y - 5);
            }

            ctx.save();
            ctx.arc(this.x, this.y, 4, 0, 2 * Math.PI, false);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.restore();

            this.tooltip.render(ctx, color);
        };
    }

    PathPoint.setup = function() {

    }

    return PathPoint;
});

jui.define("chart.brush.canvas.line",
    ["chart.brush.canvas.line.tooltip", "chart.brush.canvas.line.pathpoint"],
    function(Tooltip, PathPoint) {
    /**
     * @class chart.brush.canvas.line
     * @extends chart.brush.canvas.core
     */

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
            }

            return points;
        };

        this.renderPoints = function(points, index) {
            var prevPoint = null;
            var symbol = this.brush.symbol;

            this.canvas.lineWidth = 2;

            for (var i = 0; i < points.length; i++) {
                var currentPoint = points[i];
                var currentColor = this.color(i, index);
                if (prevPoint) {
                    this.canvas.strokeStyle = currentColor;

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
                    currentPoint.render(this.canvas, currentColor);
                }

                prevPoint = points[i];
            };
        };

        this.drawLine = function(prevPoint, point) {
            this.canvas.beginPath();
            this.canvas.moveTo(prevPoint.x, prevPoint.y);
            this.canvas.lineTo(point.x, point.y);
            this.canvas.stroke();
            this.canvas.closePath();
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