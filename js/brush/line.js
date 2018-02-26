jui.define("chart.brush.line", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.line
     * @extends chart.brush.core
     */
	var LineBrush = function() {
        var g;
        var circleColor, disableOpacity, lineBorderWidth, lineBorderDashArray, lineBorderOpacity;

        this.setActiveEffect = function(elem) {
            var lines = this.lineList;

            for(var i = 0; i < lines.length; i++) {
                var opacity = (elem == lines[i].element) ? lineBorderOpacity : disableOpacity,
                    color = lines[i].element.get(0).attr("stroke");

                if(lines[i].tooltip != null) {
                    lines[i].tooltip.style(color, circleColor, opacity);
                }

                lines[i].element.attr({ opacity: opacity });
            }
        }

        this.addLineElement = function(elem) {
            if(!this.lineList) {
                this.lineList = [];
            }

            this.lineList.push(elem);
        }

        this.createLine = function(pos, tIndex) {
            var x = pos.x,
                y = pos.y,
                v = pos.value,
                px = (this.brush.symbol == "curve") ? this.curvePoints(x) : null,
                py = (this.brush.symbol == "curve") ? this.curvePoints(y) : null,
                color = null,
                opacity = null,
                opts = {
                    "stroke-width" : lineBorderWidth,
                    "stroke-dasharray" : lineBorderDashArray,
                    fill : "transparent",
                    "cursor" : (this.brush.activeEvent != null) ? "pointer" : "normal"
                };

            var g = this.svg.group(),
                p = null;

            if(pos.length > 0) {
                var start = null, end = null;

                for (var i = 0; i < x.length - 1; i++) {
                    if(!_.typeCheck([ "undefined", "null" ], v[i]))
                        start = i;
                    if(!_.typeCheck([ "undefined", "null" ], v[i + 1]))
                        end = i + 1;

                    if(start == null || end == null || start == end)
                        continue;

                    var newColor = this.color(i, tIndex),
                        newOpacity = this.getOpacity(i);

                    if(color != newColor || opacity != newOpacity) {
                        p = this.svg.path(_.extend({
                            "stroke-opacity": newOpacity,
                            stroke: newColor,
                            x1: x[start] // Start coordinates of area brush
                        }, opts));

                        p.css({
                            "pointer-events": "stroke"
                        });

                        p.MoveTo(x[start], y[start]);
                        g.append(p);

                        color = newColor;
                        opacity = newOpacity;
                    } else {
                        p.attr({
                            x2: x[end] // End coordinates of area brush
                        });
                    }

                    if (this.brush.symbol == "curve") {
                        p.CurveTo(px.p1[start], py.p1[start], px.p2[start], py.p2[start], x[end], y[end]);
                    } else {
                        if (this.brush.symbol == "step") {
                            var sx = x[start] + ((x[end] - x[start]) / 2);

                            p.LineTo(sx, y[start]);
                            p.LineTo(sx, y[end]);
                        }

                        p.LineTo(x[end], y[end]);
                    }
                }
            }

            return g;
        }

        this.createTooltip = function(g, pos, index) {
            var display = this.brush.display;

            for (var i = 0; i < pos.x.length; i++) {
                if((display == "max" && pos.max[i]) || (display == "min" && pos.min[i]) || display == "all") {
                    var orient = (display == "max" && pos.max[i]) ? "top" : "bottom",
                        tooltip = this.lineList[index].tooltip;

                    // 최소/최대 값은 무조건 한개만 보여야 함.
                    if(display == "all" || tooltip == null) {
                        var minmax = this.drawTooltip(this.color(index), circleColor, lineBorderOpacity);
                        minmax.control(orient, +pos.x[i], +pos.y[i], this.format(pos.value[i]));

                        g.append(minmax.tooltip);
                        this.lineList[index].tooltip = minmax;
                    }
                }
            }
        }

        this.getOpacity = function(rowIndex) {
            var opacity = this.brush.opacity,
                defOpacity = this.chart.theme("lineBorderOpacity");

            if(_.typeCheck("function", opacity) && _.typeCheck("number", rowIndex)) {
                return opacity.call(this.chart, this.getData(rowIndex), rowIndex);
            } else if(_.typeCheck("number", opacity)) {
                return opacity;
            }

            return defOpacity;
        }

        this.drawLine = function(path) {
            var self = this;

            for(var k = 0; k < path.length; k++) {
                var p = this.createLine(path[k], k);

                this.addEvent(p, null, k);
                g.append(p);

                // 컬럼 상태 설정
                this.addLineElement({
                    element: p,
                    tooltip: null
                });

                // Max & Min 툴팁 추가
                if(this.brush.display != null) {
                    this.createTooltip(g, path[k], k);
                }

                // 액티브 이벤트 설정
                if(this.brush.activeEvent != null) {
                    (function(elem) {
                        elem.on(self.brush.activeEvent, function(e) {
                            self.setActiveEffect(elem);
                        });
                    })(p);
                }
            }

            // 액티브 라인 설정
            for(var k = 0; k < path.length; k++) {
                if(this.brush.active == this.brush.target[k]) {
                    this.setActiveEffect(this.lineList[k].element);
                }
            }

            return g;
        }

        this.drawBefore = function() {
            g = this.chart.svg.group();
            circleColor = this.chart.theme("linePointBorderColor");
            disableOpacity = this.chart.theme("lineDisableBorderOpacity");
            lineBorderWidth = this.chart.theme("lineBorderWidth");
            lineBorderDashArray = this.chart.theme("lineBorderDashArray");
            lineBorderOpacity = this.getOpacity(null);
        }

        this.draw = function() {
            return this.drawLine(this.getXY());
        }

        this.drawAnimate = function(root) {
            var svg = this.chart.svg;

            root.each(function(i, elem) {
                if(elem.is("util.svg.element.path")) {
                    var dash = elem.attributes["stroke-dasharray"],
                        len = elem.length();

                    if(dash == "none") {
                        elem.attr({
                            "stroke-dasharray": len
                        });

                        elem.append(svg.animate({
                            attributeName: "stroke-dashoffset",
                            from: len,
                            to: "0",
                            begin: "0s",
                            dur: "1s",
                            repeatCount: "1"
                        }));
                    } else {
                        elem.append(svg.animate({
                            attributeName: "opacity",
                            from: "0",
                            to: "1",
                            begin: "0s" ,
                            dur: "1.5s",
                            repeatCount: "1",
                            fill: "freeze"
                        }));
                    }
                }
            });
        }
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
            /** @cfg {Number} [opacity=null]  Stroke opacity.  */
            opacity: null
        };
    }

	return LineBrush;
}, "chart.brush.core");