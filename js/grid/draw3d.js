jui.define("chart.grid.draw3d", [ "util.base", "chart.polygon.grid", "chart.polygon.line", "chart.polygon.point" ],
    function(_, GridPolygon, LinePolygon, PointPolygon) {

    /**
     * @class chart.grid.draw3d
     * @abstract
     */
    var Draw3DGrid = function() {

        this.createGridX = function(position, index, x, isActive, isLast) {
            var line = this.getLineOption(),
                axis = this.svg.group();

            if (line) {
                this.drawValueLine(position, axis, isActive, line, index, x, isLast);
            }

            return axis;
        }

        this.createGridY = function(position, index, y, isActive, isLast) {
            var line = this.getLineOption(),
                axis = this.svg.group();

            if (line) {
                this.drawValueLine(position, axis, isActive, line, index, y, isLast);
            }

            return axis;
        }

        /**
         * @method center
         *
         * draw center
         *
         * @param {chart.util.svg} g
         * @param {Array} ticks
         * @param {Array} values
         * @param {Number} min
         * @param {Function} checkActive
         */
        this.drawCenter = function(g, ticks, values, checkActive, moveZ) {
            var axis = this.svg.group(),
                line = this.getLineOption();

            if(line) {
                this.drawValueLineCenter(axis, ticks, line);
            }

            this.drawValueTextCenter(axis, ticks, values, checkActive, moveZ);

            g.append(axis);
        }

        this.drawBaseLine = function(position, g) {
            var axis = this.svg.group();
            this.drawAxisLine(position, axis);

            g.append(axis);
        }

        /**
         * @method axisLine
         * theme 이 적용된  axis line 리턴
         * @param {ChartBuilder} chart
         * @param {Object} attr
         */
        this.drawAxisLine = function(position, axis) {
            var isTopOrBottom = (position == "top" || position == "bottom"),
                borderColor = (isTopOrBottom) ? "gridXAxisBorderColor" : "gridYAxisBorderColor",
                borderWidth = (isTopOrBottom) ? "gridXAxisBorderWidth" : "gridYAxisBorderWidth";

            if(position == "center") {
                borderColor = "gridZAxisBorderColor";
                borderWidth = "gridZAxisBorderWidth";
            }

            var face = this.svg.polygon({
                stroke: this.chart.theme(borderColor),
                "stroke-width": this.chart.theme(borderWidth),
                "stroke-opacity" : 1,
                fill: this.chart.theme("gridFaceBackgroundColor"),
                "fill-opacity": this.chart.theme("gridFaceBackgroundOpacity")
            });

            var p = null,
                w = this.axis.area("width"),
                h = this.axis.area("height"),
                x = this.axis.area("x"),
                y = this.axis.area("y"),
                d = this.axis.depth;

            if(position == "center") {
                p = new GridPolygon("center", w, h, d, x, y);
            } else {
                if(isTopOrBottom) {
                    h = (position == "bottom") ? h : 0;
                    p = new GridPolygon("horizontal", w, h, d, x, y);
                } else {
                    w = (position == "right") ? w : 0;
                    p = new GridPolygon("vertical", w, h, d, x, y);
                }
            }

            // 사각면 위치 계산 및 추가
            this.calculate3d(p);
            for(var i = 0; i < p.vectors.length; i++) {
                face.point(p.vectors[i].x, p.vectors[i].y);
            }

            // Y축이 숨김 상태일 때
            if(position == "center") {
                if(this.axis.get("y").hide !== true) {
                    axis.append(face);
                }
            } else {
                axis.append(face);
            }
        }

        this.drawValueLine = function(position, axis, isActive, line, index, xy, isLast) {
            var isDrawLine = false,
                w = this.axis.area("width"),
                h = this.axis.area("height"),
                x = this.axis.area("x"),
                y = this.axis.area("y"),
                d = this.axis.depth,
                l1 = null,
                l2 = null;

            if (position == "top") {
                isDrawLine = this.checkDrawLineY(index, isLast);
                l1 = new LinePolygon(xy, y, 0, xy, y, d);
                l2 = new LinePolygon(xy, y, d, xy, y + h, d);
            } else if (position == "bottom" ) {
                isDrawLine = this.checkDrawLineY(index, isLast);
                l1 = new LinePolygon(xy, y + h, 0, xy, y + h, d);
                l2 = new LinePolygon(xy, y + h, d, xy, y, d);
            } else if (position == "left") {
                isDrawLine = this.checkDrawLineX(index, isLast);
                l1 = new LinePolygon(x, xy, 0, x, xy, d);
                l2 = new LinePolygon(x, xy, d, x + w, xy, d);
            } else if (position == "right" ) {
                isDrawLine = this.checkDrawLineX(index, isLast);
                l1 = new LinePolygon(x + w, xy, 0, x + w, xy, d);
                l2 = new LinePolygon(x + w, xy, d, x, xy, d);
            }

            if(isDrawLine) {
                // 폴리곤 계산
                this.calculate3d(l1, l2);

                var lo1 = this.line({
                    stroke: this.chart.theme("gridBorderColor"),
                    "stroke-width": this.chart.theme("gridBorderWidth"),
                    x1: l1.vectors[0].x,
                    y1: l1.vectors[0].y,
                    x2: l1.vectors[1].x,
                    y2: l1.vectors[1].y
                });

                var lo2 = this.line({
                    stroke: this.chart.theme("gridBorderColor"),
                    "stroke-width": this.chart.theme("gridBorderWidth"),
                    x1: l2.vectors[0].x,
                    y1: l2.vectors[0].y,
                    x2: l2.vectors[1].x,
                    y2: l2.vectors[1].y
                });

                if (line.type.indexOf("dashed") > -1) {
                    var dash = this.chart.theme("gridBorderDashArray"),
                        style = (dash == "none" || !dash) ? "3,3" : dash;

                    lo1.attr({ "stroke-dasharray": style });
                    lo2.attr({ "stroke-dasharray": style });
                }

                axis.append(lo1);

                // Y축이 숨김 상태가 아닐 때만 추가
                if(this.axis.get("y").hide !== true) {
                    axis.append(lo2);
                }
            }
        }

        this.drawValueLineCenter = function(axis, ticks, line) {
            var len = (this.grid.type != "block") ? ticks.length - 1 : ticks.length,
                w = this.axis.area("width"),
                h = this.axis.area("height"),
                x = this.axis.area("x"),
                y = this.axis.area("y"),
                d = this.axis.depth,
                dx = (this.axis.get("y").orient == "left") ? 0 : w,
                dy = (this.axis.get("x").orient == "top") ? 0 : h;

            // z축 라인 드로잉
            for(var i = 1; i < len; i++) {
                var t = i * (d / len),
                    p1 = new LinePolygon(x, y + dy, t, x + w, y + dy, t),
                    p2 = new LinePolygon(x + dx, y, t, x + dx, y + h, t);

                this.calculate3d(p1, p2);

                var lo1 = this.line({
                    stroke: this.chart.theme("gridBorderColor"),
                    "stroke-width": this.chart.theme("gridBorderWidth"),
                    x1: p1.vectors[0].x,
                    y1: p1.vectors[0].y,
                    x2: p1.vectors[1].x,
                    y2: p1.vectors[1].y
                });

                var lo2 = this.line({
                    stroke: this.chart.theme("gridBorderColor"),
                    "stroke-width": this.chart.theme("gridBorderWidth"),
                    x1: p2.vectors[0].x,
                    y1: p2.vectors[0].y,
                    x2: p2.vectors[1].x,
                    y2: p2.vectors[1].y
                });

                if (line.type.indexOf("dashed") > -1) {
                    var dash = this.chart.theme("gridBorderDashArray"),
                        style = (dash == "none" || !dash) ? "3,3" : dash;

                    lo1.attr({ "stroke-dasharray": style });
                    lo2.attr({ "stroke-dasharray": style });
                }

                axis.append(lo1);

                // Y축이 숨김 상태가 아닐 때만 추가
                if(this.axis.get("y").hide !== true) {
                    axis.append(lo2);
                }
            }
        }

        this.drawValueText = function(position, axis, index, xy, domain) {
            if (this.grid.hideText) return;

            var isVertical = (position == "left" || position == "right");

            var tickSize = this.chart.theme("gridTickBorderSize"),
                tickPadding = this.chart.theme("gridTickPadding"),
                w = this.axis.area("width"),
                h = this.axis.area("height"),
                dx = this.axis.area("x"),
                dy = this.axis.area("y"),
                x = 0,
                y = 0;

            if(position == "top") {
                x = xy;
                y = dy + (-(tickSize + tickPadding * 2));
            } else if(position == "bottom") {
                x = xy;
                y = dy + (h + tickSize + tickPadding * 2);
            } else if(position == "left") {
                x = dx + (-(tickSize + tickPadding));
                y = xy;
            } else if(position == "right") {
                x = dx + (w + tickSize + tickPadding);
                y = xy;
            }

            var p = new PointPolygon(x, y, 0);
            this.calculate3d(p);

            axis.append(this.getTextRotate(this.chart.text({
                x: p.vectors[0].x,
                y: p.vectors[0].y,
                dx: !isVertical ? this.chart.theme("gridXFontSize") / 3 : 0,
                dy: isVertical ? this.chart.theme("gridYFontSize") / 3 : 0,
                fill: this.chart.theme(isVertical ? "gridYFontColor" : "gridXFontColor"),
                "text-anchor": isVertical ? (position == "left" ? "end" : "start") : "middle",
                "font-size": this.chart.theme(isVertical ? "gridYFontSize" : "gridXFontSize"),
                "font-weight": this.chart.theme(isVertical ? "gridYFontWeight" : "gridXFontWeight")
            }, domain)));
        }

        this.drawValueTextCenter = function(axis, ticks, values, checkActive, moveZ) {
            if (this.grid.hideText) return;

            var margin = this.chart.theme("gridTickBorderSize") + this.chart.theme("gridTickPadding"),
                isLeft = (this.axis.get("y").orient == "left"),
                isTop = (this.axis.get("x").orient == "top"),
                len = (this.grid.type != "block") ? ticks.length - 1 : ticks.length,
                w = this.axis.area("width"),
                h = this.axis.area("height"),
                d = this.axis.depth,
                x = this.axis.area("x") + ((isLeft) ? w + margin : -margin),
                y = this.axis.area("y") + ((isTop) ? -margin : h + margin);

            // z축 라인 드로잉
            for(var i = 0; i < ticks.length; i++) {
                var domain = this.format(ticks[i], i),
                    t = i * (d / len) + moveZ,
                    p = new PointPolygon(x, y, t);

                this.calculate3d(p);

                axis.append(this.getTextRotate(this.chart.text({
                    x: p.vectors[0].x,
                    y: p.vectors[0].y,
                    fill: this.chart.theme("gridZFontColor"),
                    "text-anchor": (isLeft) ? "start" : "end",
                    "font-size": this.chart.theme("gridZFontSize"),
                    "font-weight": this.chart.theme("gridZFontWeight")
                }, domain)));
            }
        }

        this.drawPattern = function() {}
        this.drawImage = function() {}
    }

    return Draw3DGrid;
}, "chart.draw");