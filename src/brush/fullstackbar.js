import jui from '../main.js';
import StackBarBrush from './stackbar';

jui.use(StackBarBrush);

export default {
    name: "chart.brush.fullstackbar",
    extend: "chart.brush.stackbar",
    component: function() {
        var _ = jui.include("util.base");

        var FullStackBarBrush = function(chart, axis, brush) {
            var g, zeroX, height, bar_height;

            this.drawBefore = function() {
                g = chart.svg.group();
                zeroX = axis.x(0);
                height = axis.y.rangeBand();
                bar_height = this.getTargetSize();
            }

            this.drawText = function(percent, x, y) {
                if(percent === 0 || isNaN(percent)) return null;

                let result = _.typeCheck("function", this.brush.showText) ?
                    this.brush.showText.call(this, percent) : percent + "%";

                let text = this.chart.text({
                    "font-size": this.chart.theme("barFontSize"),
                    fill: this.chart.theme("barFontColor"),
                    x: x,
                    y: y,
                    "text-anchor": "middle"
                }, result);

                return text;
            }

            this.draw = function() {
                this.eachData(function(data, i) {
                    var group = chart.svg.group();

                    var startY = this.offset("y", i) - bar_height / 2,
                        sum = 0,
                        list = [];

                    for(var j = 0; j < brush.target.length; j++) {
                        var width = data[brush.target[j]];

                        sum += width;
                        list.push(width);
                    }

                    var startX = 0,
                        max = axis.x.max();

                    for(var j = 0; j < list.length; j++) {
                        var width = axis.x.rate(list[j], sum),
                            r = this.getBarElement(i, j);

                        if(isNaN(width)) continue;

                        r.attr({
                            x : startX,
                            y : startY,
                            width: width,
                            height: bar_height
                        });

                        group.append(r);

                        // 퍼센트 노출 옵션 설정
                        if(brush.showText !== false) {
                            var p = Math.round((list[j] / sum) * max),
                                x = startX + width / 2,
                                y = startY + bar_height / 2 + 5,
                                text = this.drawText(p, x, y);

                            if(text != null)
                                group.append(text);
                        }

                        // 액티브 엘리먼트 이벤트 설정
                        this.setActiveEventOption(group);

                        startX += width;
                    }

                    this.addBarElement(group);
                    g.append(group);
                });

                // 액티브 엘리먼트 설정
                this.setActiveEffectOption();

                return g;
            }
        }

        FullStackBarBrush.setup = function() {
            return {
                /** @cfg {Number} [outerPadding=15] */
                outerPadding: 15,
                /** @cfg {Boolean} [showText=false] Configures settings to let the percent text of a full stack bar revealed. */
                showText: false
            };
        }

        return FullStackBarBrush;
    }
}