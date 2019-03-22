import jui from '../main.js';

export default {
    name: "chart.widget.guideline",
    extend: "chart.widget.core",
    component: function() {
        const _ = jui.include("util.base");

        const GuideLineWidget = function(chart, axis, widget) {
            const self = this;
            const tw = 50, th = 18, ta = tw / 10; // 툴팁 넓이, 높이, 앵커 크기
            let pl = 0, pt = 0; // 엑시스까지의 여백
            let g, line, tooltip, points;
            let tspan = [];
            let brush;

            function printTooltip(index, text, message) {
                if(!tspan[index]) {
                    const elem = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
                    text.element.appendChild(elem);
                    tspan[index] = elem;
                }

                tspan[index].textContent = message;
            }

            this.drawBefore = function() {
                // 위젯 옵션에 따라 엑시스 변경
                brush = this.chart.get('brush', widget.brush);
                axis = this.chart.axis(brush.axis);

                // 엑시스 여백 값 가져오기
                pl = chart.padding("left") + axis.area("x");
                pt = chart.padding("top") + axis.area("y");

                g = chart.svg.group({
                    visibility: "hidden"
                }, function() {

                    if(_.typeCheck("function", widget.format)) {
                        line = chart.svg.line({
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: axis.area("height"),
                            stroke: chart.theme("crossBorderColor"),
                            "stroke-width": chart.theme("crossBorderWidth"),
                            "stroke-dasharray": chart.theme("crossBorderDashArray"),
                            opacity: chart.theme("crossBorderOpacity")
                        });

                        tooltip = chart.svg.group({}, function () {
                            chart.svg.polygon({
                                fill: chart.theme("crossBalloonBackgroundColor"),
                                "fill-opacity": chart.theme("crossBalloonBackgroundOpacity"),
                                points: self.balloonPoints("bottom", tw, th, ta)
                            });

                            chart.text({
                                "font-size": chart.theme("crossBalloonFontSize"),
                                "fill": chart.theme("crossBalloonFontColor"),
                                "text-anchor": "middle",
                                x: tw / 2,
                                y: 17
                            });
                        }).translate(0, axis.area("height") + ta);
                    }
                }).translate(pl, pt);
            }

            this.drawGuildLine = function(left, value) {
                g.attr({ visibility: "visible" });

                if(line) {
                    line.attr({
                        x1: left,
                        x2: left
                    });
                }

                if(tooltip) {
                    tooltip.translate(left - (tw / 2), axis.area("height") + ta);
                    const message = widget.format.call(self.chart, value);
                    printTooltip(1, tooltip.get(1), message);
                }
            }

            this.draw = function() {
                const self = this;

                chart.on("guideline.show", function(time) {
                    const domain = axis.get('x').domain;
                    const range = +domain[1] - +domain[0];
                    const interval = range / axis.data.length;
                    const index = Math.floor((+time - +domain[0]) / interval);

                    self.drawGuildLine(axis.x(index), time);
                });

                chart.on("guideline.hide", function() {
                    g.attr({ visibility: "hidden" });
                });

                this.on("axis.mouseout", function() {
                    chart.emit('guideline.hide');
                    chart.emit('guideline.active');
                }, widget.axis);

                this.on("axis.mousemove", function(e) {
                    const time = axis.x.invert(e.chartX);
                    chart.emit("guideline.show", time);
                    chart.emit('guideline.active', time);
                }, widget.axis);

                return g;
            }
        }

        GuideLineWidget.setup = function() {
            return {
                brush: 0,
                format: null
            };
        }

        return GuideLineWidget;
    }
}