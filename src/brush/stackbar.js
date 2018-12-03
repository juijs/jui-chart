import jui from '../main.js';
import BarBrush from './bar.js'

jui.use(BarBrush);

export default {
    name: "chart.brush.stackbar",
    extend: "chart.brush.bar",
    component: function() {
        var _ = jui.include("util.base");

        var StackBarBrush = function(chart, axis, brush) {
            var g, height, bar_height;

            this.addBarElement = function(elem) {
                if(this.barList == null) {
                    this.barList = [];
                }

                this.barList.push(elem);
            }

            this.getBarElement = function(dataIndex, targetIndex) {
                var style = this.getBarStyle(),
                    color = this.color(targetIndex),
                    value = this.getData(dataIndex)[this.brush.target[targetIndex]];

                var r = this.chart.svg.rect({
                    fill : color,
                    stroke : style.borderColor,
                    "stroke-width" : style.borderWidth,
                    "stroke-opacity" : style.borderOpacity
                });

                // 데이타가 0이면 화면에 표시하지 않음.
                if (value == 0) {
                    r.attr({ display : 'none' });
                }

                if(value != 0) {
                    this.addEvent(r, dataIndex, targetIndex);
                }

                return r;
            }

            this.setActiveEffect = function(group) {
                var style = this.getBarStyle(),
                    columns = this.barList,
                    tooltips = this.stackTooltips;

                for(var i = 0; i < columns.length; i++) {
                    var opacity = (group == columns[i]) ? 1 : style.disableOpacity;

                    if (tooltips) {			// bar 가 그려지지 않으면 tooltips 객체가 없을 수 있음.
                        if(opacity == 1 || _.inArray(i, this.tooltipIndexes) != -1) {
                            tooltips[i].attr({ opacity: 1 });
                        } else {
                            tooltips[i].attr({ opacity: 0 });
                        }
                    }

                    columns[i].attr({ opacity: opacity });
                }
            }

            this.setActiveEffectOption = function() {
                var active = this.brush.active;

                if(this.barList && this.barList[active]) {
                    this.setActiveEffect(this.barList[active]);
                }
            }

            this.setActiveEvent = function(group) {
                var self = this;

                group.on(self.brush.activeEvent, function (e) {
                    self.setActiveEffect(group);
                });
            }

            this.setActiveEventOption = function(group) {
                if(this.brush.activeEvent != null) {
                    this.setActiveEvent(group);
                    group.attr({ cursor: "pointer" });
                }
            }

            this.getTargetSize = function() {
                var height = this.axis.y.rangeBand();

                if(this.brush.size > 0) {
                    return this.brush.size;
                } else {
                    var size = height - this.brush.outerPadding * 2;
                    return (size < this.brush.minSize) ? this.brush.minSize : size;
                }
            }

            this.setActiveTooltips = function(minIndex, maxIndex) {
                var type = this.brush.display,
                    activeIndex = (type == "min") ? minIndex : maxIndex;

                for(var i = 0; i < this.stackTooltips.length; i++) {
                    if(i == activeIndex || type == "all") {
                        this.stackTooltips[i].css({
                            opacity: 1
                        });

                        this.tooltipIndexes.push(i);
                    }
                }
            }

            this.drawStackTooltip = function(group, index, value, x, y, pos) {
                var fontSize = this.chart.theme("tooltipPointFontSize"),
                    orient = "middle",
                    dx = 0,
                    dy = 0;

                if(pos == "left") {
                    orient = "start";
                    dx = 3;
                    dy = fontSize / 3;
                } else if(pos == "right") {
                    orient = "end";
                    dx = -3;
                    dy = fontSize / 3;
                } else if(pos == "top") {
                    dy = -(fontSize / 3);
                } else {
                    dy = fontSize;
                }

                var tooltip = this.chart.text({
                    fill : this.chart.theme("tooltipPointFontColor"),
                    "font-size" : fontSize,
                    "font-weight" : this.chart.theme("tooltipPointFontWeight"),
                    "text-anchor" : orient,
                    dx: dx,
                    dy: dy,
                    opacity: 0
                }).text(this.format(value)).translate(x, y);

                this.stackTooltips[index] = tooltip;
                group.append(tooltip);
            }

            this.drawStackEdge = function(g) {
                var borderWidth = this.chart.theme("barStackEdgeBorderWidth");

                for(var i = 1; i < this.edgeData.length; i++) {
                    var pre = this.edgeData[i - 1],
                        now = this.edgeData[i];

                    for(var j = 0; j < this.brush.target.length; j++) {
                        if(now[j].width > 0 && now[j].height > 0) {
                            g.append(this.svg.line({
                                x1: pre[j].x + pre[j].width - pre[j].ex,
                                x2: now[j].x + now[j].dx - now[j].ex,
                                y1: pre[j].y + pre[j].height - pre[j].ey,
                                y2: now[j].y + now[j].dy,
                                stroke: now[j].color,
                                "stroke-width": borderWidth
                            }));
                        }
                    }
                }
            }

            this.drawBefore = function() {
                g = chart.svg.group();
                height = axis.y.rangeBand();
                bar_height = this.getTargetSize();

                this.stackTooltips = [];
                this.tooltipIndexes = [];
                this.edgeData = [];
            }

            this.draw = function() {
                var maxIndex = null,
                    maxValue = 0,
                    minIndex = null,
                    minValue = this.axis.x.max(),
                    isReverse = this.axis.get("x").reverse;

                this.eachData(function(data, i) {
                    var group = chart.svg.group();

                    var offsetY = this.offset("y", i),
                        startY = offsetY - bar_height / 2,
                        startX = axis.x(0),
                        value = 0,
                        sumValue = 0;

                    for(var j = 0; j < brush.target.length; j++) {
                        var xValue = data[brush.target[j]] + value,
                            endX = axis.x(xValue),
                            opts = {
                                x : (startX < endX) ? startX : endX,
                                y : startY,
                                width : Math.abs(startX - endX),
                                height : bar_height
                            },
                            r = this.getBarElement(i, j).attr(opts);

                        if(!this.edgeData[i]) {
                            this.edgeData[i] = {};
                        }

                        this.edgeData[i][j] = _.extend({
                            color: this.color(j),
                            dx: opts.width,
                            dy: 0,
                            ex: (isReverse) ? opts.width : 0,
                            ey: 0
                        }, opts);

                        startX = endX;
                        value = xValue;
                        sumValue += data[brush.target[j]];

                        group.append(r);
                    }

                    // min & max 인덱스 가져오기
                    if(sumValue > maxValue) {
                        maxValue = sumValue;
                        maxIndex = i;
                    }
                    if(sumValue < minValue) {
                        minValue = sumValue;
                        minIndex = i;
                    }

                    this.drawStackTooltip(group, i, sumValue, startX, offsetY, (isReverse) ? "right" : "left");
                    this.setActiveEventOption(group); // 액티브 엘리먼트 이벤트 설정
                    this.addBarElement(group);
                    g.append(group);
                });

                // 스탭 연결선 그리기
                if(this.brush.edge) {
                    this.drawStackEdge(g);
                }

                // 최소/최대/전체 값 표시하기
                if(this.brush.display != null) {
                    this.setActiveTooltips(minIndex, maxIndex);
                }

                // 액티브 엘리먼트 설정
                this.setActiveEffectOption();

                return g;
            }
        }

        StackBarBrush.setup = function() {
            return {
                /** @cfg {Number} [outerPadding=15] Determines the outer margin of a stack bar. */
                outerPadding: 15,
                /** @cfg {Boolean} [edge=false] */
                edge: false
            };
        }

        return StackBarBrush;
    }
}