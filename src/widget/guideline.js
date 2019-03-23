import jui from '../main.js';

export default {
    name: "chart.widget.guideline",
    extend: "chart.widget.core",
    component: function() {
        const _ = jui.include("util.base");

        const GuideLineWidget = function(chart, axis, widget) {
            const self = this;
            const tw = 50, th = 18, ta = tw / 10; // x축 툴팁 넓이, 높이, 앵커 크기
            const cp = 5, lh = 3; // 본문 툴팁 패딩
            let pl = 0, pt = 0; // 엑시스까지의 여백
            let g, line, xTooltip, contentTooltip, points = {};
            let tspan = [];

            function printXAxisTooltip(index, text, message) {
                if(!tspan[index]) {
                    const elem = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
                    text.element.appendChild(elem);
                    tspan[index] = elem;
                }

                tspan[index].textContent = message;
            }

            function getTextWidth(text, font) {
                // re-use canvas object for better performance
                var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
                var context = canvas.getContext("2d");
                context.font = font;
                var metrics = context.measureText(text);
                return metrics.width * 1.5;
            }

            this.drawBefore = function() {
                const brush = this.chart.get('brush', widget.brush);

                // 위젯 옵션에 따라 엑시스 변경
                axis = this.chart.axis(brush.axis);

                // 엑시스 여백 값 가져오기
                pl = chart.padding("left") + axis.area("x");
                pt = chart.padding("top") + axis.area("y");

                // 가이드라인 그리기
                g = chart.svg.group({
                    visibility: "hidden"
                }, function() {
                    if(_.typeCheck("function", widget.xFormat)) {
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

                        xTooltip = chart.svg.group({}, function() {
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

                        // 포인트 그리기
                        brush.target.forEach((target, index) => {
                            points[target] = chart.svg.circle({
                                fill: chart.color(index),
                                stroke: chart.theme("crossPointBorderColor"),
                                "stroke-width": chart.theme("crossPointBorderWidth"),
                                r: chart.theme("crossPointRadius")
                            });
                        });

                        // 본문 툴팁 그리기
                        contentTooltip = chart.svg.group({}, function () {
                            chart.svg.rect({
                                fill: chart.theme("tooltipBackgroundColor"),
                                "fill-opacity": chart.theme("tooltipBackgroundOpacity"),
                                "stroke": chart.theme("tooltipBorderColor"),
                                "stroke-width": chart.theme("tooltipBorderWidth")
                            });

                            chart.svg.group({}, function () {
                                brush.target.forEach((key, i) => {
                                    let text = chart.svg.text({
                                        "font-size": chart.theme("tooltipFontSize"),
                                        fill: chart.theme("tooltipFontColor"),
                                        y: (chart.theme("tooltipFontSize") * 1.2) * (i + 1)
                                    });

                                    text.append(chart.svg.tspan({"text-anchor": "start", "font-weight": "bold"}));
                                    text.append(chart.svg.tspan({"text-anchor": "end"}));
                                });
                            }).translate(cp, cp);
                        });
                    }
                }).translate(pl, pt);
            }

            this.drawGuildLine = function(left, value) {
                if(line) {
                    line.attr({
                        x1: left,
                        x2: left
                    });
                }

                if(xTooltip) {
                    xTooltip.translate(left - (tw / 2), axis.area("height") + ta);
                    const message = widget.xFormat.call(self.chart, value);
                    printXAxisTooltip(1, xTooltip.get(1), message);
                }
            }

            this.drawContentTooltip = function(left, data) {
                if(contentTooltip == null) return;

                const rect = contentTooltip.children[0];
                const texts = contentTooltip.children[1];
                const keys = Object.keys(data);
                let width = 0;
                let height = (chart.theme("tooltipFontSize") * 1.2) * (keys.length + 1);

                keys.forEach((key, index) => {
                    if(_.typeCheck("function", widget.tooltipFormat)) {
                        let ret = widget.tooltipFormat.apply(this, [ data, key ]);

                        width = Math.max(width, getTextWidth(`${ret.key} ${ret.value}`,
                            `bold ${chart.theme("tooltipFontSize")}px ${chart.theme("fontFamily")}`));

                        texts.get(index).get(0).text(ret.key);
                        texts.get(index).get(1).text(ret.value);
                    }

                    points[key].translate(left, axis.y(data[key]));
                });

                rect.attr({
                    width: width + cp,
                    height: height
                });

                for(let i = 0; i < texts.children.length; i++) {
                    texts.children[i].get(1).attr({ x: width - cp });
                }

                contentTooltip.translate(
                    left + width > axis.area("width") ? left - width - cp : left,
                    axis.area("height")/2 - height/2
                );
            }

            this.draw = function() {
                const self = this;

                chart.on("guideline.show", function(time) {
                    if(axis.data.length == 0) return;

                    g.attr({ visibility: "visible" });

                    const domain = axis.get('x').domain;
                    const range = +domain[1] - +domain[0];
                    const interval = range / axis.data.length;
                    const index = Math.floor((+time - +domain[0]) / interval);
                    const left = axis.x(index)

                    self.drawGuildLine(left, time);
                    self.drawContentTooltip(left, axis.data[index]);
                });

                chart.on("guideline.hide", function() {
                    if(axis.data.length == 0) return;

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
                xFormat: null,
                tooltipFormat: null
            };
        }

        return GuideLineWidget;
    }
}