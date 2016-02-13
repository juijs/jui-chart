jui.define("chart.brush.equalizer2", [], function() {

    /**
     * @class chart.brush.equalizer 
     * @extends chart.brush.core
     */
    var EqualizerAnotherBrush = function() {
        var g, zeroY, bar_width;

        this.drawBefore = function() {
            g = this.svg.group();
            zeroY = this.axis.y(0);
            bar_width = this.getTargetSize();
        }

        this.draw = function() {
            var targets = this.brush.target,
                unit = this.brush.unit,
                padding = this.brush.innerPadding;

            this.eachData(function(i, data) {
                var startX = this.offset("x", i) - bar_width / 2,
                    startY = this.axis.y(0),
                    value = 0,
                    gap = 0;

                for (var j = 0; j < targets.length; j++) {
                    var barGroup = this.svg.group(),
                        yValue = data[targets[j]] + value,
                        endY = this.axis.y(yValue),
                        targetHeight = Math.abs(startY - endY),
                        targetY  = targetHeight;

                    while (targetY > 0) {
                        var r = this.getBarElement(i, j);

                        r.attr({
                            x : startX,
                            y : endY + targetY,
                            width : bar_width,
                            height : unit
                        });

                        targetY -= unit + padding;
                        barGroup.append(r);
                    }

                    barGroup.translate(0, gap);
                    this.addEvent(barGroup, i, j);
                    g.append(barGroup);

                    startY = endY;
                    value = yValue;
                    gap += targetY;
                }
            });

            return g;
        }
    }

    EqualizerAnotherBrush.setup = function() {
        return {
            /** @cfg {Number} [innerPadding=1.5] Determines the inner margin of an equalizer.*/
            innerPadding: 2,
            /** @cfg {Number} [outerPadding=15] Determines the outer margin of an equalizer. */
            outerPadding: 15,
            /** @cfg {Number} [unit=5] Determines the reference value that represents the color.*/
            unit: 5
        };
    }

    return EqualizerAnotherBrush;
}, "chart.brush.stackcolumn");
