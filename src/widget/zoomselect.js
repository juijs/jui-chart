import jui from "../main.js";

export default {
    name: "chart.widget.zoomselect",
    extend: "chart.widget.core",
    component: function() {
        const _ = jui.include("util.base");
        const r = 12;

        const ZoomSelectWidget = function() {
            let self = this,
                top = 0,
                left = 0;

            function setDragEvent(axisIndex, thumb, bg) {
                let axis = self.chart.axis(axisIndex),
                    xtype = axis.get("x").type,
                    startDate = null, // only date
                    isMove = false,
                    mouseStart = 0,
                    thumbWidth = 0;

                self.on("axis.mousedown", function(e) {
                    if(isMove) return;

                    isMove = true;
                    mouseStart = e.bgX;

                    if(xtype == "date" || xtype == "dateblock") { // x축이 date일 때
                        startDate = axis.x.invert(e.chartX);
                    }

                    self.chart.emit("zoomselect.start");
                }, axisIndex);

                self.on("axis.mousemove", function(e) {
                    if(!isMove) return;

                    thumbWidth = e.bgX - mouseStart;

                    if(thumb != null) {
                        if (thumbWidth > 0) {
                            thumb.attr({
                                width: thumbWidth
                            }).translate(mouseStart, top + axis.area("y"));

                            bg.get(1).get(0).attr({
                                cx: thumbWidth
                            });
                            bg.translate(mouseStart, top + axis.area("y"));
                        } else {
                            thumb.attr({
                                width: Math.abs(thumbWidth)
                            }).translate(mouseStart + thumbWidth, top + axis.area("y"));

                            bg.get(1).get(0).attr({
                                cx: Math.abs(thumbWidth)
                            });
                            bg.translate(mouseStart + thumbWidth, top + axis.area("y"));
                        }
                    }
                }, axisIndex);

                self.on("axis.mouseup", endZoomAction, axisIndex);
                self.on("chart.mouseup", endZoomAction);
                self.on("bg.mouseup", endZoomAction);
                self.on("bg.mouseout", endZoomAction);

                function endZoomAction(e) {
                    let args = [];

                    isMove = false;
                    if(thumbWidth == 0) return;

                    if(xtype == "block") {
                        args = updateBlockGrid();
                    } else {
                        if(startDate != null) {
                            args = updateDateObj(axis.x.invert(e.chartX));

                            if(xtype == "dateblock") {
                                args = args.concat(updateBlockGrid());
                            }
                        }
                    }

                    renderChart();
                    resetDragStatus();

                    self.chart.emit("zoomselect.end", args);
                }

                function updateBlockGrid() {
                    let range = axis.end - axis.start,
                        tick = axis.area("width") / (range > 0 ? range : axis.data.length),
                        x = ((thumbWidth > 0) ? mouseStart : mouseStart + thumbWidth) - left,
                        start = Math.floor(x / tick) + axis.start,
                        end = Math.ceil((x + Math.abs(thumbWidth)) / tick) + axis.start;

                    if(start >= end)
                        return [ start, end ];

                    return [ start, end ];
                }

                function updateDateObj(endDate) {
                    let stime = startDate.getTime(),
                        etime = endDate.getTime();

                    if(stime >= etime)
                        return [ etime, stime ];

                    return [ stime, etime ];
                }

                function renderChart() {
                    if(bg != null) {
                        const w = thumb.attributes.width;

                        bg.attr({ "visibility": "visible" });
                        bg.get(0).attr({ width: w });
                        bg.get(1).get(0).attr({ width: w });
                        bg.get(1).get(1).translate(w - r, -r);
                    }
                }

                function resetDragStatus() { // 엘리먼트 및 데이터 초기화
                    isMove = false;
                    mouseStart = 0;
                    thumbWidth = 0;
                    startDate = null;

                    if(thumb != null) {
                        thumb.attr({
                            width: 0
                        });
                    }
                }
            }

            this.drawSection = function(axisIndex) {
                let axis = this.chart.axis(axisIndex),
                    cw = axis.area("width"),
                    ch = axis.area("height")

                return this.chart.svg.group({}, function() {
                    let thumb = self.chart.svg.rect({
                        height: ch,
                        fill: self.chart.theme("zoomBackgroundColor"),
                        opacity: 0.3
                    });

                    let bg = self.chart.svg.group({
                        visibility: "hidden"
                    }, function() {
                        self.chart.svg.rect({
                            width: cw,
                            height: ch,
                            fill: self.chart.theme("zoomFocusColor"),
                            opacity: 0.2
                        });

                        self.chart.svg.group({
                            cursor: "pointer"
                        }, function() {
                            self.chart.svg.circle({
                                r: r,
                                opacity: 0
                            });

                            self.chart.svg.path({
                                d: "M12,2C6.5,2,2,6.5,2,12c0,5.5,4.5,10,10,10s10-4.5,10-10C22,6.5,17.5,2,12,2z M16.9,15.5l-1.4,1.4L12,13.4l-3.5,3.5 l-1.4-1.4l3.5-3.5L7.1,8.5l1.4-1.4l3.5,3.5l3.5-3.5l1.4,1.4L13.4,12L16.9,15.5z",
                                fill: self.chart.theme("zoomFocusColor")
                            }).translate(cw - r, -r);
                        }).on("click", function(e) {
                            bg.attr({ visibility: "hidden" });

                            // 줌을 멀티 축에서 겹쳐서 사용할 때
                            self.rollbackZoom(axisIndex);
                        });

                    }).translate(left + axis.area("x"), top + axis.area("y"));

                    setDragEvent(axisIndex, thumb, bg);
                });
            }

            this.rollbackZoom = function() {
                this.chart.emit("zoomselect.close");
            }

            this.getAxisList = function() {
                return (_.typeCheck("array", this.widget.axis)) ? this.widget.axis : [ this.widget.axis ];
            }

            this.drawBefore = function() {
                top = this.chart.padding("top");
                left = this.chart.padding("left");
            }

            this.draw = function() {
                let g = this.chart.svg.group(),
                    axisList = this.getAxisList();

                for(let i = 0; i < axisList.length; i++) {
                    g.append(this.drawSection(axisList[i], i));
                }

                return g;
            }
        }

        ZoomSelectWidget.setup = function() {
            return {
                axis: 0
            }
        }

        return ZoomSelectWidget;
    }
}