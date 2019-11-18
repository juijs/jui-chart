import jui from '../main.js';

export default {
    name: "chart.brush.ratebar",
    extend: "chart.brush.core",
    component: function() {
        const _ = jui.include("util.base");

        const RateBarBrush = function() {
            this.getBarStyle = function() {
                return {
                    fontColor: this.chart.theme("rateBarFontColor"),
                    fontSize: this.chart.theme("rateBarFontSize"),
                    borderColor: this.chart.theme("rateBarBorderColor"),
                    borderWidth: this.chart.theme("rateBarBorderWidth"),
                    borderRadius: this.chart.theme("rateBarBorderRadius"),
                    disableOpacity: this.chart.theme("rateBarDisableBackgroundOpacity"),
                    tooltipFontColor: this.chart.theme("rateBarTooltipFontColor"),
                    tooltipFontSize: this.chart.theme("rateBarTooltipFontSize"),
                    tooltipBackgroundColor: this.chart.theme("rateBarTooltipBackgroundColor"),
                    tooltipBorderColor: this.chart.theme("rateBarTooltipBorderColor"),
                    disableBackgroundOpacity: this.chart.theme("rateBarDisableBackgroundOpacity"),
                }
            }

            this.createTextElement = function(width, height, text) {
                const style = this.getBarStyle();

                const t = this.svg.text({
                    "font-size": style.fontSize,
                    "font-weight": "bold",
                    fill: style.fontColor,
                    dx: width/2,
                    dy: height/2 + style.fontSize/3,
                    "text-anchor": "middle"
                }).text(text);

                return t;
            }

            this.createTooltipElement = function(width, tooltip) {
                const style = this.getBarStyle();
                const tooltipSize = this.brush.tooltipSize;
                const textSize = this.svg.getTextSize(tooltip);

                const t = this.svg.group();

                const l = this.svg.path({
                    stroke: style.tooltipBorderColor,
                    "stroke-dasharray": "2,2",
                    fill: "transparent"
                });
                l.MoveTo(1, tooltipSize);
                l.VLineTo(tooltipSize/2);
                l.HLineTo(width - 1);
                l.VLineTo(tooltipSize);

                const r = this.svg.rect({
                    fill: style.tooltipBackgroundColor,
                    width: textSize.width,
                    height: tooltipSize - 2,
                    x: width/2 - textSize.width/2,
                    y: 1
                });

                const b = this.svg.text({
                    "font-size": style.tooltipFontSize,
                    fill: style.tooltipFontColor,
                    x: width/2,
                    y: tooltipSize/2,
                    "text-anchor": "middle",
                    "alignment-baseline": "middle"
                }).text(tooltip);

                t.append(l);
                t.append(r);
                t.append(b);
                t.translate(0, -tooltipSize);

                return t;
            }

            this.createBarElement = function(dataIndex, target, width, height,
                                             leftRadius=0, rightRadius=0,
                                             text="", tooltip="") {
                const g = this.svg.group();
                const style = this.getBarStyle();
                const targetIndex = this.brush.target.indexOf(target);
                const color = this.color(dataIndex, targetIndex);
                const activeEvent = this.brush.activeEvent;

                const r = this.svg.path({
                    fill : color,
                    stroke : style.borderColor,
                    "stroke-width" : style.borderWidth
                });
                r.MoveTo(leftRadius, 0);
                r.LineTo(width - rightRadius, 0);
                r.Arc(rightRadius, rightRadius, 0, 0, 1, width, rightRadius);
                r.LineTo(width, height - rightRadius);
                r.Arc(rightRadius, rightRadius, 0, 0, 1, width - rightRadius, height);
                r.LineTo(leftRadius, height);
                r.Arc(leftRadius, leftRadius, 0, 0, 1, 0, height - leftRadius);
                r.LineTo(0, leftRadius);
                r.Arc(leftRadius, leftRadius, 0, 0, 1, leftRadius, 0);
                r.ClosePath();

                g.append(r);
                g.append(this.createTextElement(width, height, text));

                if(this.svg.getTextSize(tooltip).width < width) {
                    g.append(this.createTooltipElement(width, tooltip));
                }

                this.addEvent(g, dataIndex, targetIndex);

                // 컬럼 및 기본 브러쉬 이벤트 설정
                if(activeEvent != null) {
                    const self = this;

                    (function(bar, index, target) {
                        bar.on(activeEvent, function(e) {
                            self.setActiveBarElement(index, target);
                        });

                        bar.attr({ cursor: "pointer" });
                    })(g, dataIndex, target);
                }

                return g;
            }

            this.setActiveBarElement = function(activeIndex, activeTarget) {
                const style = this.getBarStyle();

                this.barList.forEach((bar, index) => {
                    for(const key in bar) {
                        if(activeIndex != null && activeIndex == index && activeTarget != null && activeTarget != key) {
                            bar[key].attr({
                                "fill-opacity": style.disableBackgroundOpacity
                            });
                        } else {
                            bar[key].attr({
                                "fill-opacity": 1
                            });
                        }
                    }
                });
            }

            this.drawBefore = function() {
                this.barList = [];
            }

            this.draw = function() {
                const style = this.getBarStyle();
                const keys = this.brush.target;
                const tooltipSize = this.brush.tooltipSize;
                const padding = this.brush.padding;
                const g = this.chart.svg.group();
                const height = this.axis.y.rangeBand() - tooltipSize - padding/2;

                this.eachData((data, i) => {
                    const nonZeroKeys = keys.filter(k => data[k] > 0);
                    const sumValues = nonZeroKeys.reduce((acc, cur) => acc + data[cur], 0);
                    let startX = 0;
                    let startY = this.offset("y", i) - height/2 + tooltipSize/2;

                    nonZeroKeys.forEach((key, j) => {
                        const width = this.axis.x.rate(data[key], sumValues);
                        const percent = Math.round((data[key] / sumValues) * this.axis.x.max());

                        const text = _.typeCheck("function", this.brush.showText) ?
                            this.brush.showText.call(this, data[key], percent, key) : `${percent}%`;
                        const tooltip = _.typeCheck("function", this.brush.showTooltip) ?
                            this.brush.showTooltip.call(this, data[key], percent, key) : data[key];
                        const r = this.createBarElement(i, key, width, height,
                            j == 0 || nonZeroKeys.length == 1 ? style.borderRadius : 0,
                            j == nonZeroKeys.length-1 || keys.length == 1 ? style.borderRadius : 0,
                            text, tooltip);

                        r.translate(startX, startY);
                        g.append(r);

                        startX += width;

                        if(!this.barList[i])
                            this.barList[i] = {};
                        this.barList[i][key] = r;
                    });
                });

                this.setActiveBarElement(this.brush.activeIndex, this.brush.activeTarget);

                return g;
            }
        }

        RateBarBrush.setup = function() {
            return {
                activeIndex: null,
                activeTarget: null,
                activeEvent: null,
                showText: null,
                showTooltip: null,
                tooltipSize: 14,
                padding: 0
            };
        }

        return RateBarBrush;
    }
}