export default {
    name: "chart.widget.scroll",
    extend: "chart.widget.core",
    component: function() {
        var ScrollWidget = function(chart, axis, widget) {
            var self = this;
            var thumbWidth = 0,
                thumbLeft = 0,
                bufferCount = 0,
                dataLength = 0,
                totalWidth = 0,
                piece = 0,
                rate = 0 ;

            function setScrollEvent(thumb) {
                var isMove = false,
                    mouseStart = 0,
                    thumbStart = 0,
                    axies = chart.axis();

                self.on("bg.mousedown", mousedown);
                self.on("chart.mousedown", mousedown);
                self.on("bg.mousemove", mousemove);
                self.on("bg.mouseup", mouseup);
                self.on("chart.mousemove", mousemove);
                self.on("chart.mouseup", mouseup);

                function mousedown(e) {
                    if(isMove && thumb.element != e.target) return;

                    isMove = true;
                    mouseStart = e.bgX;
                    thumbStart = thumbLeft;
                }

                function mousemove(e) {
                    if(!isMove) return;

                    var gap = thumbStart + e.bgX - mouseStart;

                    if(gap < 0) {
                        gap = 0;
                    } else {
                        if(gap + thumbWidth > chart.area("width")) {
                            gap = chart.area("width") - thumbWidth;
                        }
                    }

                    thumb.translate(gap, 1);
                    thumbLeft = gap;

                    var startgap = gap * rate,
                        start = startgap == 0 ? 0 : Math.floor(startgap / piece);

                    if(gap + thumbWidth == chart.area("width")) {
                        start += 1;
                    }

                    for(var i = 0; i < axies.length; i++) {
                        axies[i].zoom(start, start + bufferCount);
                    }

                    // 차트 렌더링이 활성화되지 않았을 경우
                    if(!chart.isRender()) {
                        chart.render();
                    }
                }

                function mouseup(e) {
                    if(!isMove) return;

                    isMove = false;
                    mouseStart = 0;
                    thumbStart = 0;
                }
            }

            this.drawBefore = function() {
                dataLength =  axis.origin.length;
                bufferCount = axis.buffer;
                piece = chart.area("width") / bufferCount;
                totalWidth = piece * (dataLength || 1);
                rate = totalWidth / chart.area("width");
                thumbWidth = chart.area("width") * (bufferCount / (dataLength || 1)) + 2;
            }

            this.draw = function() {
                var bgSize = chart.theme("scrollBackgroundSize"),
                    bgY = (widget.orient == "top") ? chart.area("y") - bgSize : chart.area("y2");

                if(dataLength == 0) {
                    return chart.svg.group();
                }

                return chart.svg.group({}, function() {
                    chart.svg.rect({
                        width: chart.area("width"),
                        height: bgSize,
                        fill: chart.theme("scrollBackgroundColor")
                    });

                    var thumb = chart.svg.rect({
                        width: thumbWidth,
                        height: bgSize - 2,
                        fill: chart.theme("scrollThumbBackgroundColor"),
                        stroke: chart.theme("scrollThumbBorderColor"),
                        cursor: "pointer",
                        "stroke-width": 1
                    }).translate(thumbLeft, 1);

                    // 차트 스크롤 이벤트
                    setScrollEvent(thumb);

                }).translate(chart.area("x"), bgY);
            }
        }

        ScrollWidget.setup = function() {
            return {
                orient : "bottom"
            }
        }

        return ScrollWidget;
    }
}