jui.define("chart.brush.timeline", [ "util.base" ], function(_) {

    /**
     * @class chart.brush.timeline
     * @extends chart.brush.core
     */
    var TimelineBrush = function() {
        var g;

        this.drawBefore = function() {
            g = this.svg.group();
        }

        this.draw = function() {
            console.log(this.axis.y.min(), this.axis.y.max(), this.axis.y.ticks(10));
            return g;
        }
    }

    TimelineBrush.setup = function() {
        return {
        };
    }

    return TimelineBrush;
}, "chart.brush.core");