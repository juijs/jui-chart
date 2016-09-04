jui.define("chart.brush.heatmapscatter", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.heatmapscatter
     * @extends chart.brush.core
     */
    var HeatmapScatterBrush = function() {
        var g = null, map = [];
        var yValue, yDist, ySize, xValue, xDist, xSize;

        // TODO: 아주 무식한 방법이므로 개선해야 함.
        function getTableData(x, y) {
            var xIndex = 0,
                yIndex = 0;

            for(var i = 0; i < yDist - 1; i++) {
                if(y <= map[i][0].y && y > map[i + 1][0].y) {
                    yIndex = i;
                    break;
                }
            }

            for(var j = 0; j < xDist - 1; j++) {
                if (x > map[0][j].x && x <= map[0][j + 1].x) {
                    xIndex = j;
                    break;
                }
            }

            return {
                map: map[yIndex][xIndex],
                rowIndex: yIndex,
                columnIndex: xIndex
            }
        }

        function setActiveNodeData(self, rowIndex, columnIndex) {
            var borderColor = self.chart.theme("heatmapscatterBorderColor"),
                activeBgColor = self.chart.theme("heatmapscatterActiveBackgroundColor");

            for(var i = 0; i < map.length; i++) {
                for(var j = 0; j < map[0].length; j++) {
                    var tableObj = map[i][j];

                    if(tableObj.element != null) {
                        if (i == rowIndex && j == columnIndex) {
                            tableObj.element.attr({
                                fill: activeBgColor,
                                stroke: map[i][j].color
                            });
                        } else {
                            tableObj.element.attr({
                                fill: map[i][j].color,
                                stroke: borderColor
                            });
                        }
                    }
                }
            }
        }

        this.createScatter = function(pos, dataIndex, targetIndex) {
            var tableInfo = getTableData(pos.x, pos.y),
                tableObj = tableInfo.map,
                color = this.color(dataIndex, targetIndex);

            // 테이블 셀에 데이터 추가하기
            tableObj.data.push(this.axis.data[dataIndex]);
            tableObj.color = color;

            // 테이블 셀 그리기
            if(tableObj.element == null) {
                tableObj.element = this.chart.svg.rect({
                    width: xSize,
                    height: ySize,
                    x: tableObj.x,
                    y: tableObj.y,
                    fill: color,
                    stroke: this.chart.theme("heatmapscatterBorderColor"),
                    "stroke-width": this.chart.theme("heatmapscatterBorderWidth")
                });
            } else {
                tableObj.draw = true;
            }

            return {
                data: tableObj.data,
                element: tableObj.element,
                draw: tableObj.draw,
                rowIndex: tableInfo.rowIndex,
                columnIndex: tableInfo.columnIndex
            };
        }

        this.drawScatter = function(g, points) {
            var self = this;

            for(var i = 0; i < points.length; i++) {
                for(var j = 0; j < points[i].length; j++) {
                    var data = {
                        x: points[i].x[j],
                        y: points[i].y[j],
                        max: points[i].max[j],
                        min: points[i].min[j],
                        value: points[i].value[j]
                    };

                    // 값이 null이나 undefined일 때, 그리지 않음
                    if(_.typeCheck([ "undefined", "null" ], data.value))
                        continue;

                    var obj = this.createScatter(data, j, i);

                    if(obj.draw == false) {
                        var activeEvent = this.brush.activeEvent;

                        if(activeEvent != null) {
                            obj.element.attr({
                                cursor: "pointer"
                            })
                        }

                        (function(i, j) {
                            obj.element.on(activeEvent, function (e) {
                                setActiveNodeData(self, i, j);
                                self.chart.emit("heatmapscatter.select", [ map[i][j].data, e ]);
                            });
                        }(obj.rowIndex, obj.columnIndex));
                    }

                    if(obj.element != null) {
                        this.addEvent(obj.element, j, i);
                        g.append(obj.element);
                    }
                }
            }
        }

        this.draw = function() {
            g = this.chart.svg.group();

            var yMin = this.axis.y.min(),
                xMin = this.axis.x.min();

            // 히트맵 생성
            for(var i = 1; i <= yDist; i++) {
                if(!map[i - 1]) {
                    map[i - 1] = [];
                }

                var yVal = yMin + ((yValue / yDist) * i),
                    yPos = this.axis.y(this.axis.y.type == "date" ? new Date(yVal) : yVal);

                for(var j = 1; j <= xDist; j++) {
                    var xVal = xMin + ((xValue / xDist) * j),
                        xPos = this.axis.x(this.axis.x.type == "date" ? new Date(xVal) : xVal);

                    map[i - 1][j - 1] = {
                        data: [],
                        element: null,
                        draw: false,
                        color: null,
                        x: xPos,
                        y: yPos
                    };
                }
            }

            this.drawScatter(g, this.getXY());

            return g;
        }

        this.drawBefore = function() {
            yValue = this.axis.y.max() - this.axis.y.min();
            yDist = yValue / this.brush.yInterval;
            ySize = this.axis.area("height") / yDist;

            xValue = this.axis.x.max() - this.axis.x.min();
            xDist = xValue / this.brush.xInterval;
            xSize = this.axis.area("width") / xDist;
        }
    }

    HeatmapScatterBrush.setup = function() {
        return {
            activeEvent: null,
            xInterval: 0,
            yInterval: 0,

            /** @cfg {Boolean} [clip=false] If the brush is drawn outside of the chart, cut the area. */
            clip: false
        };
    }

    return HeatmapScatterBrush;
}, "chart.brush.core");