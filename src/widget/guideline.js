import jui from '../main.js';

export default {
    name: "chart.widget.guideline",
    extend: "chart.widget.core",
    component: function() {
        const _ = jui.include("util.base");

        const GuideLineWidget = function(chart, axis, widget) {
            const self = this;
            const tw = 50, th = 18, ta = tw / 10; // x축 툴팁 넓이, 높이, 앵커 크기
            const cp = 5, lrp = 5; // 본문 툴팁 패딩, 본물 툴팁 좌우 패딩
            let brush;
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
                brush = this.chart.get('brush', widget.brush);

                // 위젯 옵션에 따라 엑시스 변경
                axis = this.chart.axis(brush.axis);

                // 엑시스 여백 값 가져오기
                pl = chart.padding("left");
                pt = chart.padding("top");

                // 가이드라인 그리기
                g = chart.svg.group({
                    visibility: "hidden"
                }, function() {
                    if(_.typeCheck("function", widget.xFormat)) {
                        xTooltip = chart.svg.group({}, function () {
                            chart.svg.polygon({
                                fill: chart.theme("guidelineBalloonBackgroundColor"),
                                "fill-opacity": chart.theme("guidelineBalloonBackgroundOpacity"),
                                points: self.balloonPoints("bottom", tw, th, ta)
                            });

                            chart.text({
                                "font-size": chart.theme("guidelineBalloonFontSize"),
                                "fill": chart.theme("guidelineBalloonFontColor"),
                                "text-anchor": "middle",
                                x: tw / 2,
                                y: 17
                            });
                        }).translate(0, axis.area("height") + ta);
                    }

                    // 가이드라인 그리기
                    line = chart.svg.line({
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: axis.area("height"),
                        stroke: chart.theme("guidelineBorderColor"),
                        "stroke-width": chart.theme("guidelineBorderWidth"),
                        "stroke-dasharray": chart.theme("guidelineBorderDashArray"),
                        opacity: chart.theme("guidelineBorderOpacity")
                    });

                    // 포인트 그리기
                    brush.target.forEach((target, index) => {
                        points[target] = chart.svg.circle({
                            fill: chart.color(index),
                            stroke: chart.theme("guidelinePointBorderColor"),
                            "stroke-width": chart.theme("guidelinePointBorderWidth"),
                            r: chart.theme("guidelinePointRadius")
                        });
                    });

                    // 본문 툴팁 그리기
                    contentTooltip = chart.svg.group({}, function () {
                        chart.svg.rect({
                            fill: chart.theme("guidelineTooltipBackgroundColor"),
                            "fill-opacity": chart.theme("guidelineTooltipBackgroundOpacity"),
                            "stroke": chart.theme("guidelineTooltipBorderColor"),
                            "stroke-width": chart.theme("guidelineTooltipBorderWidth")
                        });

                        chart.svg.group({}, function () {
                            brush.target.forEach((key, i) => {
                                let text = chart.svg.text({
                                    "font-size": chart.theme("guidelineTooltipFontSize")
                                });

                                text.append(chart.svg.tspan({ "text-anchor": "start", "font-weight": "bold", x : cp * 1.5 }));
                                text.append(chart.svg.tspan({ "text-anchor": "end" }));
                            });
                        }).translate(cp, cp);

                        chart.svg.group({}, function() {
                            brush.target.forEach((key, i) => {
                                chart.svg.circle({
                                    r: chart.theme("guidelineTooltipPointRadius")
                                });
                            });
                        }).translate(cp * 1.5, 0);
                    });
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
                if(contentTooltip == null || data == null) return;

                const cacheTargets = chart.getCache("legend_target", brush.target);
                const rect = contentTooltip.children[0];
                const texts = contentTooltip.children[1];
                let width = 0;
                let height = (chart.theme("guidelineTooltipFontSize") * 1.2) * (cacheTargets.length + 1);
                let current = 0;

                brush.target.forEach((target, index) => {
                    const targetIndex = cacheTargets.indexOf(target);
                    const text = contentTooltip.get(1).get(index);
                    const point = contentTooltip.get(2).get(index);

                    if(targetIndex != -1) {
                        // 툴팁 그리기
                        const y = (chart.theme("guidelineTooltipFontSize") * 1.2) * (targetIndex + 1);
                        text.attr({ fill: chart.theme("guidelineTooltipFontColor"), y: y });
                        point.attr({ fill: chart.color(index), cy: y });
                        points[target].attr({ fill: chart.color(index) });

                        // 포인트 그리기
                        current = (widget.stackPoint) ? current + data[target] : data[target];
                        points[target].translate(left, axis.y(current));
                    } else {
                        text.attr({ fill: 'transparent' });
                        point.attr({ fill: 'transparent' });
                        points[target].attr({ fill: 'transparent' });
                    }
                });

                brush.target.forEach((key, index) => {
                    if(_.typeCheck("function", widget.tooltipFormat)) {
                        let ret = widget.tooltipFormat.apply(this, [ data, key ]);

                        width = Math.max(width, getTextWidth(`${ret.key} ${ret.value}`,
                            `bold ${chart.theme("guidelineTooltipFontSize")}px ${chart.theme("fontFamily")}`));

                        texts.get(index).get(0).text(ret.key);
                        texts.get(index).get(1).text(ret.value);
                    }
                });

                rect.attr({
                    width: width + cp,
                    height: height
                });

                for(let i = 0; i < texts.children.length; i++) {
                    texts.children[i].get(1).attr({ x: width - cp });
                }

                contentTooltip.translate(
                    left + width > axis.area("width") ? left - width - cp - lrp : left + lrp,
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
                    chart.setCache("guideline_time", time);
                });

                chart.on("guideline.hide", function() {
                    if(axis.data.length == 0) return;

                    g.attr({ visibility: "hidden" });
                    chart.setCache("guideline_time", null);
                });

                chart.on("render", function() {
                    const time = chart.getCache("guideline_time", null);

                    if(time != null)
                        chart.emit("guideline.show", time);
                });
                this.on("axis.mouseout", function() {
                    chart.emit('guideline.hide');
                    chart.emit('guideline.active');
                }, widget.axis);

                this.on("axis.mousemove", function(e) {
                    const time = axis.x.invert(e.chartX);

                    if(time != chart.getCache("guideline_time", null)) {
                        chart.emit("guideline.show", time);
                        chart.emit('guideline.active', time);
                    }
                }, widget.axis);

                return g;
            }
        }

        GuideLineWidget.setup = function() {
            return {
                brush: 0,
                xFormat: null,
                tooltipFormat: null,
                stackPoint: false
            };
        }

        return GuideLineWidget;
    }
}