jui.define("chart.brush.equalizercolumn", [], function() {

    /**
     * @class chart.brush.equalizercolumn
     * @extends chart.brush.stackcolumn
     */
    var EqualizerColumnBrush = function() {
        var g, zeroY, bar_width, is_reverse;

        this.drawBefore = function() {
            g = this.svg.group();
            zeroY = this.axis.y(0);
            bar_width = this.getTargetSize();
            is_reverse = this.axis.get("y").reverse;
        }

        this.draw = function() {
            var targets = this.brush.target,
                padding = this.brush.innerPadding,
                band = this.axis.y.rangeBand(),
                unit = band / (this.brush.unit * padding),
                height = unit + padding;

            this.eachData(function(data, i) {
                var startX = this.offset("x", i) - bar_width / 2,
                    startY = this.axis.y(0),
                    y = startY,
                    value = 0;

                for (var j = 0; j < targets.length; j++) {
                    var barGroup = this.svg.group(),
                        yValue = data[targets[j]] + value,
                        endY = this.axis.y(yValue),
                        targetHeight = Math.abs(startY - endY),
                        targetY = targetHeight;

                    while (targetY >= height) {
                        var r = this.getBarElement(i, j);

                        r.attr({
                            x : startX,
                            y : y,
                            width : bar_width,
                            height : unit
                        });

                        targetY -= height;
                        y += (is_reverse) ? height : -height;

                        barGroup.append(r);
                    }

                    barGroup.translate(0, (is_reverse) ? 0 : -unit);
                    this.addEvent(barGroup, i, j);
                    g.append(barGroup);

                    startY = endY;
                    value = yValue;
                }
            });

            return g;
        }
    }

    EqualizerColumnBrush.setup = function() {
        return {
            /** @cfg {Number} [unit=5] Determines the reference value that represents the color.*/
            unit: 1
        };
    }

    return EqualizerColumnBrush;
}, "chart.brush.stackcolumn");
