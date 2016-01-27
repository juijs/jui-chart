jui.define("chart.widget.polygon.rotate3d", [ "util.base" ], function (_) {
    var DEGREE_LIMIT = 180;

    /**
     * @class chart.widget.polygon.rotate3d
     * @extends chart.widget.polygon.core
     * @alias ScrollWidget
     * @requires util.base
     */
    var PolygonRotate3DWidget = function() {
        var self = this;

        function setScrollEvent(axisIndex) {
            var axis = self.chart.axis(axisIndex),
                isMove = false,
                mouseStartX = 0,
                mouseStartY = 0,
                sdx = 0,
                sdy = 0,
                cacheXY = null,
                unit = self.widget.unit,
                w = axis.area("width"),
                h = axis.area("height");

            self.on("axis.mousedown", mousedown, axisIndex);
            self.on("axis.mousemove", mousemove, axisIndex);
            self.on("axis.mouseup", mouseup, axisIndex);
            self.on("bg.mouseup", mouseup);
            self.on("chart.mouseup", mouseup);

            function mousedown(e) {
                if(isMove) return;

                isMove = true;
                mouseStartX = e.chartX;
                mouseStartY = e.chartY;
                sdx = axis.degree.x;
                sdy = axis.degree.y;
            }

            function mousemove(e) {
                if(!isMove) return;

                var gapX = e.chartX - mouseStartX,
                    gapY = e.chartY - mouseStartY,
                    dx = sdx + Math.floor((gapY / h) * DEGREE_LIMIT),
                    dy = sdy - Math.floor((gapX / w) * DEGREE_LIMIT);

                // 각도 Interval이 맞을 경우, 렌더링하지 않음
                if(dx % unit != 0 && dy % unit != 0) return;

                // 이전 각도와 동일할 경우, 렌더링하지 않음
                var newCacheXY = dx + ":" + dy;
                if(cacheXY == newCacheXY) return;

                axis.set("degree", {
                    x: dx,
                    y: dy
                });

                self.chart.render();
                cacheXY = newCacheXY;
            }

            function mouseup(e) {
                if(!isMove) return;

                isMove = false;
                mouseStartX = 0;
                mouseStartY = 0;
            }
        }

        this.draw = function() {
            var indexes = (_.typeCheck("array", this.widget.axis) ? this.widget.axis : [ this.widget.axis ]);

            for(var i = 0; i < indexes.length; i++) {
                setScrollEvent(indexes[i]);
            }
        }
    }

    PolygonRotate3DWidget.setup = function() {
        return {
            unit: 5, // 회전 최소 각도
            axis: [ 0 ]
        }
    }

    return PolygonRotate3DWidget;
}, "chart.widget.polygon.core");