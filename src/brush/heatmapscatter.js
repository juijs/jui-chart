import jui from '../main.js';

export default {
    name: "chart.brush.heatmapscatter",
    extend: "chart.brush.core",
    component: function() {
        var _ = jui.include("util.base");

        var HeatmapScatterBrush = function() {
            var g = null, map = [];
            var yValue, yDist, ySize, xValue, xDist, xSize;

            function getTableData(self, xValue, yValue) {
                var xIndex = ((xValue - self.axis.x.min()) / self.brush.xInterval).toFixed(0),
                    yIndex = ((yValue - self.axis.y.min()) / self.brush.yInterval).toFixed(0);

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

            this.createScatter = function(pos, dataIndex, targetIndex) {
                var result = null,
                    tableInfo = getTableData(this, this.axis.x.invert(pos.x), this.axis.y.invert(pos.y)),
                    tableObj = tableInfo.map,
                    color = this.color(dataIndex, targetIndex);

                try {
                    // 테이블 셀에 데이터 추가하기
                    tableObj.color = color;
                    tableObj.data.push(this.axis.data[dataIndex]);

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

                    result = {
                        data: tableObj.data,
                        element: tableObj.element,
                        draw: tableObj.draw,
                        rowIndex: tableInfo.rowIndex,
                        columnIndex: tableInfo.columnIndex
                    };
                } catch(e) {
                    result = null;
                }

                return result;
            }

            this.drawScatter = function(g) {
                var data = this.axis.data,
                    target = this.brush.target;

                for(var i = 0; i < data.length; i++) {
                    var xValue = this.axis.x(i);

                    for(var j = 0; j < target.length; j++) {
                        var yValue = this.axis.y(data[i][target[j]]);

                        var obj = this.createScatter({
                            x: xValue,
                            y: yValue
                        }, i, j);

                        if(obj != null && obj.draw == false) {
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
                //activeEvent: null,
                xInterval: 0,
                yInterval: 0,

                /** @cfg {Boolean} [clip=false] If the brush is drawn outside of the chart, cut the area. */
                clip: false
            };
        }

        return HeatmapScatterBrush;
    }
}