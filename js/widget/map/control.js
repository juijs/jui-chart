jui.define("chart.widget.map.control", [ "util.base" ], function(_) {
    var SCROLL_MIN_Y = 21.5,
        SCROLL_MAX_Y = 149;

    /**
     * @class chart.widget.map.control
     * @extends chart.widget.map.core
     */
    var MapControlWidget = function(chart, axis, widget) {
        var self = this;
        var scale = 1,
            viewX = 0,
            viewY = 0,
            blockX = 0,
            blockY = 0,
            scrollY = 0,
            btn = { top: null, right: null, bottom: null, left: null, home: null, up: null, down: null, thumb: null };

        function createBtnGroup(type, opacity, x, y, url) {
            btn[type] = chart.svg.group({
                cursor: (url != null) ? "pointer" : "move"
            }, function() {
                chart.svg.rect({
                    x: 0.5,
                    y: 0.5,
                    width: 20,
                    height: 20,
                    rx: 2,
                    ry: 2,
                    stroke: 0,
                    fill: chart.theme("mapControlButtonColor"),
                    "fill-opacity": opacity
                });

                if(url != null) {
                    chart.svg.image({
                        x: 4.5,
                        y: 4.5,
                        width: 11,
                        height: 11,
                        "xmlns:xlink": "http://www.w3.org/1999/xlink",
                        "xlink:href": url,
                        opacity: 0.6
                    });
                }
            }).translate(x, y);

            return btn[type];
        }

        function createScrollThumbLines() {
            return chart.svg.group({}, function() {
                for(var i = 0; i < 6; i++) {
                    var y = 22 * i;

                    chart.svg.path({
                        fill: "none",
                        "stroke-width": 1,
                        "stroke-opacity": 0.6,
                        stroke: chart.theme("mapControlScrollLineColor")
                    }).MoveTo(1.5, 41.5 + y).LineTo(18.5, 41.5 + y);
                }
            });
        }

        function getScrollThumbY(scale) {
            return self.getScaleToValue(scale, widget.min, widget.max, SCROLL_MIN_Y, SCROLL_MAX_Y);
        }

        function getScrollScale(y) {
            return self.getValueToScale(y, SCROLL_MIN_Y, SCROLL_MAX_Y, widget.min, widget.max);
        }

        function setButtonEvents() {
            var originViewX = viewX,
                originViewY = viewY;

            btn.top.on("click", function(e) {
                viewY -= blockY;
                move();
            });
            btn.right.on("click", function(e) {
                viewX += blockX;
                move();
            });
            btn.bottom.on("click", function(e) {
                viewY += blockY;
                move();
            });
            btn.left.on("click", function(e) {
                viewX -= blockX;
                move();
            });
            btn.home.on("click", function(e) {
                viewX = originViewX;
                viewY = originViewY;
                move();
            });

            btn.up.on("click", function(e) {
                if(scale > widget.max) return;

                scale += 0.1;
                zoom();
            });
            btn.down.on("click", function(e) {
                if(scale - 0.09 < widget.min) return;

                scale -= 0.1;
                zoom();
            });

            function move() {
                axis.updateGrid("map", {
                    scale: scale,
                    viewX: viewX,
                    viewY: viewY
                });

                axis.map.view(viewX, viewY);

                // 차트 렌더링이 활성화되지 않았을 경우
                if(!chart.isRender()) {
                    chart.render();
                }
            }

            function zoom() {
                axis.updateGrid("map", {
                    scale: scale,
                    viewX: viewX,
                    viewY: viewY
                });

                scrollY = getScrollThumbY(scale);
                axis.map.scale(scale);
                btn.thumb.translate(0, scrollY);

                // 차트 렌더링이 활성화되지 않았을 경우
                if(!chart.isRender()) {
                    chart.render();
                }
            }
        }

        function setScrollEvent(bar) {
            var startY = 0,
                moveY = 0;

            btn.thumb.on("mousedown", function(e) {
                if(startY > 0) return;

                startY = e.y;
            });

            btn.thumb.on("mousemove", moveThumb);
            bar.on("mousemove", moveThumb);

            btn.thumb.on("mouseup", endMoveThumb);
            bar.on("mouseup", endMoveThumb);
            bar.on("mouseout", endMoveThumb);

            function moveThumb(e) {
                if(startY == 0) return;
                var sy = scrollY + e.y - startY;

                if(sy >= SCROLL_MIN_Y && sy <= SCROLL_MAX_Y) {
                    moveY = e.y - startY;
                    scale = getScrollScale(sy);

                    axis.updateGrid("map", {
                        scale: scale,
                        viewX: viewX,
                        viewY: viewY
                    });

                    axis.map.scale(scale);
                    btn.thumb.translate(0, getScrollThumbY(scale));

                    // 차트 렌더링이 활성화되지 않았을 경우
                    if(!chart.isRender()) {
                        chart.render();
                    }
                }
            }

            function endMoveThumb(e) {
                if(startY == 0) return;

                startY = 0;
                scrollY += moveY;
            }
        }

        this.drawBefore = function() {
            scale = axis.map.scale();
            viewX = axis.map.view().x;
            viewY = axis.map.view().y;
            blockX = axis.map.size().width / 10;
            blockY = axis.map.size().height / 10;
            scrollY = getScrollThumbY(scale);
        }

        this.draw = function() {
            var g = chart.svg.group({}, function() {
                var top = chart.svg.group(),
                    bottom = chart.svg.group().translate(20, 80),
                    bar = chart.svg.rect({
                        x: 0.5,
                        y: 0.5,
                        width: 26,
                        height: 196,
                        rx: 4,
                        ry: 4,
                        stroke: 0,
                        fill: chart.theme("mapControlScrollColor"),
                        "fill-opacity": 0.15
                    }).translate(-3, -3);

                top.append(createBtnGroup("left", 0.8, 0, 20, chart.theme("mapControlLeftButtonImage")));
                top.append(createBtnGroup("right", 0.8, 40, 20, chart.theme("mapControlRightButtonImage")));
                top.append(createBtnGroup("top", 0.8, 20, 0, chart.theme("mapControlTopButtonImage")));
                top.append(createBtnGroup("bottom", 0.8, 20, 40, chart.theme("mapControlBottomButtonImage")));
                top.append(createBtnGroup("home", 0, 20, 20, chart.theme("mapControlHomeButtonImage")));

                bottom.append(bar);
                bottom.append(createScrollThumbLines());
                bottom.append(createBtnGroup("up", 0.8, 0, 0, chart.theme("mapControlUpButtonImage")));
                bottom.append(createBtnGroup("down", 0.8, 0, 170, chart.theme("mapControlDownButtonImage")));
                bottom.append(createBtnGroup("thumb", 0.8, 0, scrollY));

                setButtonEvents();
                setScrollEvent(bar);
            });

            var ot = widget.orient,
                ag = widget.align,
                dx = widget.dx,
                dy = widget.dy,
                x2 = axis.area("x2"),
                y2 = axis.area("y2");

            if(ot == "bottom" && ag == "start") {
                g.translate(dx, y2 - (273 + dy));
            } else if(ot == "bottom" && ag == "end") {
                g.translate(x2 - (60 + dx), y2 - (273 + dy));
            } else if(ot == "top" && ag == "end") {
                g.translate(x2 - (60 + dx), dy);
            } else {
                g.translate(dx, dy);
            }

            return g;
        }
    }

    MapControlWidget.setup = function() {
        return {
            /** @cfg {"top"/"bottom" } Sets the location where the label is displayed (top, bottom). */
            orient: "top",
            /** @cfg {"start"/"end" } Aligns the label (center, start, end). */
            align: "start",

            min: 1,
            max: 3,

            dx: 5,
            dy: 5
        }
    }

    return MapControlWidget;
}, "chart.widget.map.core");