import jui from '../main.js';
import FullStackBarBrush from './fullstackbar';

jui.use(FullStackBarBrush);

export default {
    name: "chart.brush.fullstackcolumn",
    extend: "chart.brush.fullstackbar",
    component: function() {
        var FullStackColumnBrush = function(chart, axis, brush) {
            var g, zeroY, bar_width;

            this.getTargetSize = function() {
                var width = this.axis.x.rangeBand(),
                    r_width = 0;

                if(this.brush.size > 0) {
                    r_width = this.brush.size;
                } else {
                    r_width = width - this.brush.outerPadding * 2;
                }

                return (r_width < 0) ? 0 : r_width;
            }

            this.drawBefore = function() {
                g = chart.svg.group();
                zeroY = axis.y(0);
                bar_width = this.getTargetSize();
            }

            this.draw = function() {
                var chart_height = axis.area("height");

                this.eachData(function(data, i) {
                    var group = chart.svg.group();

                    var startX = this.offset("x", i) - bar_width / 2,
                        sum = 0,
                        list = [];

                    for(var j = 0; j < brush.target.length; j++) {
                        var height = data[brush.target[j]];

                        sum += height;
                        list.push(height);
                    }

                    var startY = 0,
                        max = axis.y.max();

                    for(var j = list.length - 1; j >= 0; j--) {
                        var height = chart_height - axis.y.rate(list[j], sum),
                            r = this.getBarElement(i, j);

                        if (isNaN(startX) || isNaN(startY) || isNaN(height) ) {
                            // 정상적인 숫자가 아니면 element 를 설정하지 않음.
                        } else {
                            // 값의 범위가 정상일때 오류가 안나도록 함.
                            r.attr({
                                x: startX,
                                y: startY,
                                width: bar_width,
                                height: height
                            });
                        }


                        group.append(r);

                        // 퍼센트 노출 옵션 설정
                        if(brush.showText) {
                            var p = Math.round((list[j] / sum) * max),
                                x = startX + bar_width / 2,
                                y = startY + height / 2 + 8,
                                text = this.drawText(p, x, y);

                            if(text != null)
                                group.append(text);

                        }

                        // 액티브 엘리먼트 이벤트 설정
                        this.setActiveEventOption(group);

                        startY += height;
                    }

                    this.addBarElement(group);
                    g.append(group);
                });

                // 액티브 엘리먼트 설정
                this.setActiveEffectOption();

                return g;
            }
        }

        return FullStackColumnBrush;
    }
}