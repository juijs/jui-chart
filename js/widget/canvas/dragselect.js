jui.define("chart.widget.canvas.dragselect", [ "util.base" ], function(_) {

    /**
     * @class chart.widget.canvas.dragselect
     * @extends chart.widget.canvas.core
     * @alias CanvasDragSelectWidget
     * @requires util.base
     *
     */
    var CanvasDragSelectWidget = function() {
        var self = this;

        function setDragEvent(brush) {
            var axis = self.chart.axis(brush.axis),
                isMove = false,
                mouseStartX = 0,
                mouseStartY = 0,
                thumbWidth = 0,
                thumbHeight = 0,
                startValueX = 0,
                startValueY = 0;

            self.on("axis.mousedown", function(e) {
                if(isMove) return;

                isMove = true;
                mouseStartX = e.bgX;
                mouseStartY = e.bgY;
                startValueX = axis.x.invert(e.chartX);
                startValueY = axis.y.invert(e.chartY);

                self.chart.emit("dragselect.start");
            }, brush.axis);

            self.on("axis.mousemove", function(e) {
                if(!isMove) return;

                thumbWidth = e.bgX - mouseStartX;
                thumbHeight = e.bgY - mouseStartY

                self.drawSection(
                    (thumbWidth >= 0) ? thumbWidth : Math.abs(thumbWidth),
                    (thumbHeight >= 0) ? thumbHeight : Math.abs(thumbHeight),
                    (thumbWidth >= 0) ? mouseStartX : mouseStartX + thumbWidth,
                    (thumbHeight >= 0) ? mouseStartY : mouseStartY + thumbHeight
                );
            }, brush.axis);

            self.on("axis.mouseup", endZoomAction, brush.axis);
            self.on("chart.mouseup", endZoomAction);
            self.on("bg.mouseup", endZoomAction);

            function endZoomAction(e) {
                isMove = false;
                if(thumbWidth == 0 || thumbHeight == 0) return;

                searchDataInDrag(axis.x.invert(e.chartX), axis.y.invert(e.chartY));
                resetDragStatus();
            }

            function searchDataInDrag(endValueX, endValueY) {
                // x축 값 순서 정하기
                if(startValueX > endValueX) {
                    var temp = startValueX;
                    startValueX = endValueX;
                    endValueX = temp;
                }

                // y축 값 순서 정하기
                if(startValueY > endValueY) {
                    var temp = startValueY;
                    startValueY = endValueY;
                    endValueY = temp;
                }

                if(self.widget.dataType == "area") {
                    emitDragArea(startValueX, startValueY, endValueX, endValueY);
                } else {
                    emitDataList(startValueX, startValueY, endValueX, endValueY);
                }
            }

            function emitDataList(startValueX, startValueY, endValueX, endValueY) {
                var xType = axis.x.type,
                    yType = axis.y.type,
                    datas = axis.data,
                    targets = brush.target,
                    dataInDrag = [];

                // 해당 브러쉬의 데이터 검색
                for(var i = 0; i < datas.length; i++) {
                    var d = datas[i];

                    for(var j = 0; j < targets.length; j++) {
                        var v = d[targets[j]];

                        // Date + Range
                        if(xType == "date" && yType == "range") {
                            var date = d[axis.get("x").key];

                            if(_.typeCheck("date", date)) {
                                if( (date.getTime() >= startValueX.getTime() && date.getTime() <= endValueX.getTime()) &&
                                    (v >= startValueY && v <= endValueY) ) {
                                    dataInDrag.push(getTargetData(i, targets[j], d));
                                }
                            }
                        } else if(xType == "range" && yType == "date") {
                            var date = d[axis.get("y").key];

                            if(_.typeCheck("date", date)) {
                                if( (date.getTime() >= startValueY.getTime() && date.getTime() <= endValueY.getTime()) &&
                                    (v >= startValueX && v <= endValueX) ) {
                                    dataInDrag.push(getTargetData(i, targets[j], d));
                                }
                            }
                        }

                        // Block + Range
                        if(xType == "block" && yType == "range") {
                            if( (i >= startValueX - 1 && i <= endValueX - 1) &&
                                (v >= startValueY && v <= endValueY)) {
                                dataInDrag.push(getTargetData(i, targets[j], d));
                            }
                        } else if(xType == "range" && yType == "block") {
                            if( (i >= startValueY - 1 && i <= endValueY - 1) &&
                                (v >= startValueX && v <= endValueX) ) {
                                dataInDrag.push(getTargetData(i, targets[j], d));
                            }
                        }
                    }
                }

                function getTargetData(index, key, data) {
                    return {
                        brush: brush,
                        dataIndex: index,
                        dataKey: key,
                        data: data
                    };
                }

                self.chart.emit("dragselect.end", [ dataInDrag ]);
            }

            function emitDragArea(startValueX, startValueY, endValueX, endValueY) {
                self.chart.emit("dragselect.end", [ {
                    x1: startValueX,
                    y1: startValueY,
                    x2: endValueX,
                    y2: endValueY
                } ]);
            }

            function resetDragStatus() { // 엘리먼트 및 데이터 초기화
                isMove = false;
                mouseStartX = 0;
                mouseStartY = 0;
                thumbWidth = 0;
                thumbHeight = 0;
                startValueX = 0;
                startValueY = 0;

                clearCanvas();
            }
        }

        function clearCanvas() {
            var area1 = self.chart.area(),
                area2 = self.axis.area();

            self.canvas.clearRect(area1.x + area2.x, area1.y + area2.y, area2.width, area2.height);
        }

        this.drawSection = function(width, height, x, y) {
            clearCanvas();

            this.canvas.lineWidth  = this.chart.theme("dragSelectBorderWidth");
            this.canvas.strokeStyle = this.chart.theme("dragSelectBorderColor");
            this.canvas.fillStyle = this.chart.theme("dragSelectBackgroundColor");
            this.canvas.globalAlpha = this.chart.theme("dragSelectBackgroundOpacity");
            this.canvas.fillRect(x, y, width, height);
        }

        this.draw = function() {
            var bIndex = this.widget.brush,
                bIndexes = (_.typeCheck("array", bIndex) ? bIndex : [ bIndex ]);

            for(var i = 0; i < bIndexes.length; i++) {
                var brush = this.chart.get("brush", bIndexes[i]);
                setDragEvent(brush);
            }
        }
    }

    CanvasDragSelectWidget.setup = function() {
        return {
            brush: [ 0 ],
            dataType: "list" // or area
        }
    }

    return CanvasDragSelectWidget;
}, "chart.widget.canvas.core");