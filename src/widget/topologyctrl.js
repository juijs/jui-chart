import jui from "../main.js"

export default {
    name: "chart.widget.topologyctrl",
    extend: "chart.widget.core",
    component: function () {
        const _ = jui.include("util.base");

        const TopologyControlWidget = function() {
            var self = this, axis = null;
            var targetKey, startX, startY;
            var renderWait = false;
            var scale = 1, boxX = 0, boxY = 0;
            var nodeIndex = 0;

            function renderChart() {
                if(renderWait === false) {
                    setTimeout(function () {
                        self.chart.render();
                        setBrushEvent();

                        renderWait = false;
                    }, 70);

                    renderWait = true;
                }
            }

            function initDragEvent() {
                self.on("axis.mousemove", function(e) {
                    axis.root.attr({ cursor: "move" });
                    if(!_.typeCheck("string", targetKey)) return;

                    var xy = axis.c(targetKey),
                        dragX = e.chartX / xy.scale,
                        dragY = e.chartY / xy.scale;

                    xy.setX(startX + (dragX - startX));
                    xy.setY(startY + (dragY - startY));

                    renderChart();
                }, axis.index);

                self.on("axis.mouseup", endDragAction, axis.index);
                self.on("bg.mouseup", endDragAction);
                self.on("bg.mouseout", endDragAction);

                function endDragAction(e) {
                    if(!_.typeCheck("string", targetKey)) return;
                    targetKey = null;
                }
            }

            function initZoomEvent() {
                self.on("axis.mousewheel", function(e) {
                    var e = window.event || e,
                        delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))),
                        xy = axis.c(targetKey);

                    if(delta > 0) {
                        if(scale < 2) {
                            scale += 0.1;
                        }
                    } else {
                        if(scale > 0.6) {
                            scale -= 0.1;
                        }
                    }

                    xy.setScale(scale);
                    renderChart();
                }, axis.index);
            }

            function initMoveEvent() {
                var startX = null, startY = null;

                self.on("axis.mousedown", function(e) {
                    if(_.typeCheck("string", targetKey)) return;
                    if(startX != null || startY != null) return;

                    startX = boxX + e.x;
                    startY = boxY + e.y;
                }, axis.index);

                self.on("axis.mousemove", function(e) {
                    if(startX == null || startY == null) return;

                    var xy = axis.c(targetKey);
                    boxX = startX - e.x;
                    boxY = startY - e.y

                    xy.setView(-boxX, -boxY);
                    renderChart();
                }, axis.index);

                self.on("chart.mouseup", endMoveAction);
                self.on("chart.mouseout", endMoveAction);
                self.on("bg.mouseup", endMoveAction);
                self.on("bg.mouseout", endMoveAction);

                function endMoveAction(e) {
                    if(startX == null || startY == null) return;

                    startX = null;
                    startY = null;
                }
            }

            function getBrushElement() {
                var children = self.svg.root.get(0).children,
                    index = 0,
                    element = null;

                for(var i = 0; i < children.length; i++) {
                    var cls = children[i].attr("class");

                    if(cls && cls.indexOf("topologynode") != -1) {
                        if(index == self.widget.brush) {
                            element = children[i];
                            break;
                        }

                        index++;
                    }
                }

                return element;
            }

            function setBrushEvent() {
                var element = getBrushElement();
                if(element == null) return;

                element.each(function (i, node) {
                    (function (index) {
                        if (isNaN(index)) return;

                        node.on("mousedown", function (e) {
                            if (_.typeCheck("string", targetKey)) return;

                            var key = axis.getValue(axis.data[index], "key"),
                                xy = axis.c(key);

                            targetKey = key;
                            startX = xy.x / xy.scale;
                            startY = xy.y / xy.scale;

                            axis.cache.activeNodeKey = targetKey;

                            // 선택한 노드 맨 마지막으로 이동
                            //xy.moveLast();
                        });
                    })(parseInt(node.attr("index")));
                });
            }

            this.draw = function() {
                var brush = this.chart.get("brush", this.widget.brush);

                // axis 글로벌 변수에 설정
                axis = this.chart.axis(brush.axis);

                if(this.widget.zoom) {
                    initZoomEvent(axis);
                }

                if(this.widget.move) {
                    initMoveEvent(axis);
                }

                initDragEvent(axis);
                setBrushEvent(axis);

                return this.chart.svg.group();
            }
        }

        TopologyControlWidget.setup = function() {
            return {
                /** @cfg {Boolean} [move=false] Set to be moved to see the point of view of the topology map. */
                move: false,
                /** @cfg {Boolean} [zoom=false] Set the zoom-in / zoom-out features of the topology map. */
                zoom: false,
                /** @cfg {Number} [brush=0] Specifies a brush index for which a widget is used. */
                brush: 0
            }
        }

        return TopologyControlWidget;
    }
}