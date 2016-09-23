jui.define("chart.widget.zoomscroll", [ "util.base", "chart.builder" ], function (_, builder) {

    /**
     * @class chart.widget.zoomscroll
     * @extends chart.widget.core
     * @alias ScrollWidget
     * @requires util.base
     */
    var ZoomScrollWidget = function() {
        var self = this,
            axis = null;

        var w = null, // width
            h = null, // height
            b = null, // area border width
            size = 0, // button size
            radius = null, // button round
            tick = 0,
            start = null,
            end = null,
            count = null;

        var l_rect = null,
            l_ctrl = null,
            r_rect = null,
            r_ctrl = null,
            c_rect = null;

        function setDragEvent(bg, ctrl, isLeft) {
            var isMove = false,
                isCenter = false,
                mouseStart = 0,
                centerStart = 0,
                bgWidth = 0;

            ctrl.on("mousedown", function(e) {
                if(isMove) return;

                isCenter = (bg == null) ? true : false;
                isMove = true;

                if(isCenter) {
                    bgWidth = ctrl.size().width;
                    centerStart = l_rect.size().width;
                    mouseStart = e.clientX;
                } else {
                    bgWidth = bg.size().width;
                    mouseStart = e.clientX;
                }

                // 커스텀 이벤트 발생
                self.chart.emit("zoomscroll.dragstart");
            });

            self.on("chart.mousemove", dragZoomAction);
            self.on("bg.mousemove", dragZoomAction);
            self.on("chart.mouseup", endZoomAction);
            self.on("bg.mouseup", endZoomAction);

            function dragZoomAction(e) {
                if(!isMove) return;
                var dis = e.clientX - mouseStart;

                if(isCenter) {
                    var tw = centerStart + dis,
                        rw = tw + bgWidth,
                        val = Math.floor(tw / tick) - start;

                    if(tw > 0 && tw + bgWidth < w) {
                        l_rect.round(tw, h, radius, 0, 0, radius);
                        l_ctrl.attr({ x: tw - size / 2 });
                        r_rect.round(w - rw, h, 0, radius, radius, 0);
                        r_rect.translate(rw, 0);
                        r_ctrl.attr({ x: rw - size / 2 });
                        c_rect.translate(tw, 0);

                        start += val;
                        end += val;
                    }
                } else {
                    if(isLeft) {
                        var tw = bgWidth + dis;

                        if(tw < 0) return;
                        if(!preventDragAction(tw) && dis > 0) return;

                        bg.round(tw, h, radius, 0, 0, radius);
                        ctrl.attr({ x: tw - size/2 });

                        // 가운데 영역
                        c_rect.attr({ width: w - l_rect.size().width - r_rect.size().width });
                        c_rect.translate(tw, 0);

                        start = Math.floor(tw / tick);
                    } else {
                        var tw = bgWidth - dis;

                        if(tw < 0) return;
                        if(!preventDragAction(tw) && dis < 0) return;

                        bg.round(tw, h, 0, radius, radius, 0);
                        bg.translate(w - tw, 0);
                        ctrl.attr({ x: w - tw - size/2 });

                        // 가운데 영역
                        c_rect.attr({ width: w - l_rect.size().width - r_rect.size().width });

                        end = count - Math.floor(tw / tick);
                    }
                }
            }

            function endZoomAction() {
                if(!isMove) return;

                isMove = false;
                var axes = self.chart.axis();

                // 차트 렌더링 이전에 커스텀 이벤트 발생
                self.chart.emit("zoomscroll.dragend", [ start, end - 1 ]);

                for(var i = 0; i < axes.length; i++) {
                    axes[i].zoom(start, end);
                }

                // 차트 렌더링이 활성화되지 않았을 경우
                if(!self.chart.isRender()) {
                    self.chart.render();
                }

                // 차트 렌더링 이후에 커스텀 이벤트 발생
                self.chart.emit("zoomscroll.render", [ start, end - 1 ]);
            }

            function preventDragAction() {
                var t = r_rect.data("translate"),
                    l = l_rect.size().width,
                    r = parseInt(t.split(",")[0]),
                    max = r - tick/2;

                // 좌/우 버튼 교차 방지
                if (l < max) {
                    return true;
                }

                return false;
            }
        }

        function createChartImage() {
            var size = self.chart.theme("zoomScrollGridFontSize");

            var image = builder(null, {
                width: w,
                height: h,
                padding: {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: size + 8
                },
                axis: {
                    x: _.extend({
                        hide: false,
                        line: "solid",
                        format: self.widget.format
                    }, axis.get("x"), true),
                    y: _.extend({
                        hide: true,
                        line: false
                    }, axis.get("y"), true),
                    data: axis.origin
                },
                brush: [{
                    type: self.widget.symbol,
                    target: [ self.widget.key ],
                    colors: [ self.widget.color ]
                }],
                style: {
                    backgroundColor: "transparent",
                    gridXFontSize : size,
                    gridTickPadding : self.chart.theme("zoomScrollGridTickPadding"),
                    areaBackgroundOpacity: self.chart.theme("zoomScrollBrushAreaBackgroundOpacity"),
                    lineBorderWidth: self.chart.theme("zoomScrollBrushLineBorderWidth")
                }
            });

            return image.svg.toDataURI();
        }

        this.drawBefore = function() {
            axis = this.chart.axis(this.widget.axis);
            count = axis.origin.length;
            start = axis.start;
            end = axis.end;
            b = this.chart.theme("zoomScrollAreaBorderWidth");
            w = this.chart.area("width") - b*2;
            h = this.chart.theme("zoomScrollBackgroundSize") - b*2;
            size = this.chart.theme("zoomScrollButtonSize");
            radius = this.chart.theme("zoomScrollAreaBorderRadius");
            tick = w / count;
        }

        this.draw = function() {
            var btnImage = this.chart.theme("zoomScrollButtonImage");

            var areaStyle = {
                fill: this.chart.theme("zoomScrollAreaBackgroundColor"),
                "fill-opacity": this.chart.theme("zoomScrollAreaBackgroundOpacity"),
                stroke: this.chart.theme("zoomScrollAreaBorderColor"),
                "stroke-width": b
            };

            return this.svg.group({}, function() {
                var lw = start * tick,
                    rw = (count - end) * tick;

                if(isNaN(lw) || isNaN(rw)) {
                    return;
                }

                self.svg.image({
                    width: w,
                    height: h,
                    "xlink:href": createChartImage()
                });

                l_rect = self.svg.pathRect(areaStyle);
                l_rect.round(lw, h, radius, 0, 0, radius);

                r_rect = self.svg.pathRect(areaStyle);
                r_rect.round(rw, h, 0, radius, radius, 0);
                r_rect.translate(w - rw, 0);

                c_rect = self.svg.rect({
                    width: w - lw - rw,
                    height: h,
                    fill: "transparent",
                    "fill-opacity": 0,
                    stroke: self.chart.color(self.widget.color),
                    "stroke-width": b,
                    cursor: "move"
                }).translate(lw, 0);

                l_ctrl = self.svg.rect({
                    x: lw - size/2,
                    y: h / 2 - size/2,
                    width: size,
                    height: size,
                    fill:"#e0e0e0",
                    cursor: "e-resize",
					rx:size/2,
					"stroke-linecap":"round",
					"stroke":"#616161"
                });
                r_ctrl = self.svg.rect({
                    x: w - rw - size/2,
                    y: h / 2 - size/2,
                    width: size,
                    height: size,
					fill:"#e0e0e0",
                    cursor: "e-resize",
					rx:size/2,
					"stroke-linecap":"round",
					"stroke":"#616161"
                });

                setDragEvent(l_rect, l_ctrl, true);
                setDragEvent(r_rect, r_ctrl, false);
                setDragEvent(null, c_rect);

            }).translate(
                this.widget.dx + this.chart.area("x"),
                this.widget.dy + this.chart.area("y2") - b
            );
        }
    }

    ZoomScrollWidget.setup = function() {
        return {
            symbol : "area",
            key : null,
            color : 0,
            format : null,
            axis : 0,
            dx : 0,
            dy : 0
        }
    }

    return ZoomScrollWidget;
}, "chart.widget.core");