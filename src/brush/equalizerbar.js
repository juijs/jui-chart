import jui from '../main.js';
import StackBarBrush from './stackbar';

jui.use(StackBarBrush);

export default {
    name: "chart.brush.equalizerbar",
    extend: "chart.brush.stackbar",
    component: function () {
        var EqualizerBarBrush = function() {
            var g, zeroX, bar_height, is_reverse;

            this.drawBefore = function() {
                g = this.svg.group();
                zeroX = this.axis.x(0);
                bar_height = this.getTargetSize();
                is_reverse = this.axis.get("x").reverse;
            }

            this.draw = function() {
                var targets = this.brush.target,
                    padding = this.brush.innerPadding,
                    band = this.axis.x.rangeBand(),
                    unit = band / (this.brush.unit * padding),
                    width = unit + padding;

                this.eachData(function(data, i) {
                    var startY = this.offset("y", i) - bar_height / 2,
                        startX = this.axis.x(0),
                        x = startX,
                        value = 0;

                    for (var j = 0; j < targets.length; j++) {
                        var barGroup = this.svg.group(),
                            xValue = data[targets[j]] + value,
                            endX = this.axis.x(xValue),
                            targetWidth = Math.abs(startX - endX),
                            targetX = targetWidth;

                        while (targetX >= width) {
                            var r = this.getBarElement(i, j);

                            r.attr({
                                x : x,
                                y : startY,
                                width : unit,
                                height : bar_height
                            });

                            targetX -= width;
                            x -= (is_reverse) ? width : -width;

                            barGroup.append(r);
                        }

                        barGroup.translate((is_reverse) ? -unit : 0, 0);
                        this.addEvent(barGroup, i, j);
                        g.append(barGroup);

                        startX = endX;
                        value = xValue;
                    }
                });

                return g;
            }
        }

        EqualizerBarBrush.setup = function() {
            return {
                /** @cfg {Number} [unit=5] Determines the reference value that represents the color.*/
                unit: 1
            };
        }

        return EqualizerBarBrush;
    }
}