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
            size = 0, // button size
            radius = null, // button round
            tick = 0,
            start = null,
            end = null,
            count = null,
            l_rect = null,
            r_rect = null,
            c_rect = null;

        function setDragEvent(bg, ctrl, isLeft) {
            var isMove = false,
                mouseStart = 0,
                bgWidth = 0;

            ctrl.on("mousedown", function(e) {
                if(isMove) return;

                isMove = true
                bgWidth = bg.size().width;
                mouseStart = e.x;
            });

            self.on("chart.mousemove", function(e) {
                if(!isMove) return;
                var dis = e.x - mouseStart;

                if(isLeft) {
                    if(dis > 0 && !preventDragAction()) return;

                    var tw = bgWidth + dis;

                    bg.round(tw, h, radius, 0, 0, radius);
                    ctrl.attr({ x: tw - size/2 });

                    // 가운데 영역
                    c_rect.attr({ width: w - l_rect.size().width - r_rect.size().width });
                    c_rect.translate(tw, 0);

                    start = Math.floor(tw / tick);
                } else {
                    if(dis < 0 && !preventDragAction()) return;

                    var tw = bgWidth - dis;

                    bg.round(tw, h, 0, radius, radius, 0);
                    bg.translate(w - tw, 0);
                    ctrl.attr({ x: w - tw - size/2 });

                    // 가운데 영역
                    c_rect.attr({ width: w - l_rect.size().width - r_rect.size().width });

                    end = count - Math.floor(tw / tick);
                }
            });

            self.on("chart.mouseup", endZoomAction);
            self.on("bg.mouseup", endZoomAction);

            function endZoomAction() {
                if(!isMove) return;

                isMove = false;
                var axes = self.chart.axis();

                for(var i = 0; i < axes.length; i++) {
                    axes[i].zoom(start, end);
                }
            }

            function preventDragAction() {
                var t = r_rect.data("translate"),
                    l = l_rect.size().width,
                    r = parseInt(t.split(",")[0]);

                if(l <= r - tick) return true;
                return false;
            }
        }

        function createChartImage() {
            var c = builder(null, {
                width: w,
                height: h,
                padding: {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 20
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
                    gridXFontSize : self.chart.theme("zoomScrollGridFontSize"),
                    gridTickPadding : self.chart.theme("zoomScrollGridTickPadding"),
                    areaBackgroundOpacity: self.chart.theme("zoomScrollBrushAreaBackgroundOpacity"),
                    lineBorderWidth: self.chart.theme("zoomScrollBrushLineBorderWidth")
                }
            });

            return c.svg.toDataURI();
        }

        this.drawBefore = function() {
            axis = this.chart.axis(this.widget.axis);
            count = axis.origin.length;
            start = axis.start;
            end = axis.end;
            w = this.chart.area("width");
            h = this.chart.theme("zoomScrollBackgroundSize");
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
                "stroke-width": this.chart.theme("zoomScrollAreaBorderWidth")
            };

            return this.svg.group({}, function() {
                var lw = start * tick,
                    rw = (count - end) * tick;

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
                    "stroke-width": self.chart.theme("zoomScrollAreaBorderWidth")
                }).translate(lw, 0);

                var l_img = self.svg.image({
                    x: lw - size/2,
                    y: h / 2 - size/2,
                    width: size,
                    height: size,
                    "xmlns:xlink": "http://www.w3.org/1999/xlink",
                    "xlink:href": btnImage,
                    cursor: "e-resize"
                }),
                r_img = self.svg.image({
                    x: w - rw - size/2,
                    y: h / 2 - size/2,
                    width: size,
                    height: size,
                    "xmlns:xlink": "http://www.w3.org/1999/xlink",
                    "xlink:href": btnImage,
                    cursor: "e-resize"
                });

                setDragEvent(l_rect, l_img, true);
                setDragEvent(r_rect, r_img, false);

            }).translate(self.chart.area("x"), self.chart.area("y2") - h);
        }
    }

    ZoomScrollWidget.setup = function() {
        return {
            symbol : "area",
            key : null,
            color : 0,
            format : null,
            axis : 0
        }
    }

    return ZoomScrollWidget;
}, "chart.widget.core");