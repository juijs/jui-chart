jui.define("chart.brush.heatmapscatter", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.heatmapscatter
     * @extends chart.brush.core
     */
    var HeatmapScatterBrush = function() {
        var g = null, map = [];
        var yValue, yDist, ySize, xValue, xDist, xSize;
        var count = 0;

        // TODO: 아주 무식한 방법이므로 개선해야 함.
        function getTableData(self, xValue, yValue) {
            var xIndex = Math.floor((xValue - self.axis.x.min()) / self.brush.xInterval),
                yIndex = Math.floor((yValue - self.axis.y.min()) / self.brush.yInterval);

            if(xIndex >= xDist) xIndex = xDist - 1;
            if(yIndex >= yDist) yIndex = yDist - 1;
            if(xIndex < 0) xIndex = 0;
            if(yIndex < 0) yIndex = 0;

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
            var tableInfo = getTableData(this, this.axis.x.invert(pos.x), this.axis.y.invert(pos.y)),
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

            if(tableObj.draw == false) {
                //console.log(dataIndex, count++, tableObj);
            }

            return {
                data: tableObj.data,
                element: tableObj.element,
                draw: tableObj.draw,
                rowIndex: tableInfo.rowIndex,
                columnIndex: tableInfo.columnIndex
            };
        }

        this.drawScatter = function(g) {
            var self = this,
                data = this.axis.data,
                target = this.brush.target;

            for(var i = 0; i < data.length; i++) {
                var xValue = this.axis.x(i);

                for(var j = 0; j < target.length; j++) {
                    var yValue = this.axis.y(data[i][target[j]]);

                    var obj = this.createScatter({
                        x: xValue,
                        y: yValue
                    }, i, j);

                    if(obj.draw == false) {
                        var activeEvent = this.brush.activeEvent;

                        if(activeEvent != null) {
                            obj.element.attr({
                                cursor: "pointer"
                            });
                        }

                        (function(ii, jj) {
                            obj.element.on(activeEvent, function (e) {
                                setActiveNodeData(self, ii, jj);
                                self.chart.emit("heatmapscatter.select", [ map[ii][jj].data, e ]);
                            });
                        }(obj.rowIndex, obj.columnIndex));

                        this.addEvent(obj.element, i, j);
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
            for(var i = 0; i < yDist; i++) {
                if(!map[i]) {
                    map[i] = [];
                }

                var yVal = yMin + ((yValue / yDist) * i),
                    yPos = this.axis.y(this.axis.y.type == "date" ? new Date(yVal) : yVal);

                for(var j = 0; j < xDist; j++) {
                    var xVal = xMin + ((xValue / xDist) * j),
                        xPos = this.axis.x(this.axis.x.type == "date" ? new Date(xVal) : xVal);

                    map[i][j] = {
                        data: [],
                        element: null,
                        draw: false,
                        color: null,
                        x: xPos,
                        y: yPos - ySize,
                        xValue: xVal,
                        yValue: yVal
                    };
                }
            }

            this.drawScatter(g);

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