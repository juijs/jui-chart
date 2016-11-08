jui.define("chart.brush.arcequalizer", [], function() {

    /**
     * @class chart.brush.arcequalizer
     */
    var ArcEqualizerBrush = function() {
        var g;

        this.drawBefore = function() {
            g = this.svg.group();
        }

        this.draw = function() {
            return g;
        }
    }

    ArcEqualizerBrush.setup = function() {
        return {
            /** @cfg {Number} [unit=5] Determines the reference value that represents the color.*/
            unit: 1
        };
    }

    return ArcEqualizerBrush;
}, "chart.brush.stackcolumn");
