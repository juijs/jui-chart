jui.define("chart.brush.equalizerbar", [], function() {

    /**
     * @class chart.brush.equalizerbar
     * @extends chart.brush.stackbar
     */
    var EqualizerBarBrush = function() {
        var g, zeroX, bar_height;

        this.drawBefore = function() {
            g = this.svg.group();
            zeroX = this.axis.x(0);
            bar_height = this.getTargetSize();
        }

        this.draw = function() {
            var targets = this.brush.target,
                padding = this.brush.innerPadding,
                band = this.axis.x.rangeBand(),
                unit = band / (this.brush.unit * padding);

            this.eachData(function(i, data) {
                var startY = this.offset("y", i) - bar_height / 2,
                    startX = this.axis.x(0),
                    value = 0;

                for (var j = 0; j < targets.length; j++) {
                    var barGroup = this.svg.group(),
                        xValue = data[targets[j]] + value,
                        endX = this.axis.x(xValue),
                        targetWidth = Math.abs(startX - endX),
                        targetX = targetWidth;

                    while (targetX > 0) {
                        var r = this.getBarElement(i, j);

                        r.attr({
                            x : endX - targetX,
                            y : startY,
                            width : unit,
                            height : bar_height
                        });

                        targetX -= unit + padding;

                        if(targetX < 0) {
                            var th = Math.ceil(unit + targetX);

                            r.attr({
                                width : (th < 0) ? 0 : th
                            });
                        }

                        barGroup.append(r);
                    }

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
}, "chart.brush.stackbar");
