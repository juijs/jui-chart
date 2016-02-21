jui.define("chart.widget.canvas.dragselect", [ "util.base" ], function(_) {

    /**
     * @class chart.widget.canvas.dragselect
     * @extends chart.widget.dragselect
     * @alias CanvasDragSelectWidget
     * @requires util.base
     *
     */
    var CanvasDragSelectWidget = function() {
        this.onDrawStart = function(x, y, w, h) {
            this.onDrawEnd();

            this.canvas.lineWidth  = this.chart.theme("dragSelectBorderWidth");
            this.canvas.strokeStyle = this.chart.theme("dragSelectBorderColor");
            this.canvas.fillStyle = this.chart.theme("dragSelectBackgroundColor");
            this.canvas.globalAlpha = this.chart.theme("dragSelectBackgroundOpacity");

            this.canvas.fillRect(
                (w >= 0) ? x : x + w,
                (h >= 0) ? y : y + h,
                (w >= 0) ? w : Math.abs(w),
                (h >= 0) ? h : Math.abs(h)
            );
            this.canvas.strokeRect(
                (w >= 0) ? x : x + w,
                (h >= 0) ? y : y + h,
                (w >= 0) ? w : Math.abs(w),
                (h >= 0) ? h : Math.abs(h)
            );
        }

        this.onDrawEnd = function() {
            var x = this.chart.area("x") + this.axis.area("x"),
                y = this.chart.area("y") + this.axis.area("y");

            this.canvas.clearRect(x, y, this.axis.area("width"), this.axis.area("height"));
        }

        this.draw = function() {
            var bIndex = this.widget.brush,
                bIndexes = (_.typeCheck("array", bIndex) ? bIndex : [ bIndex ]);

            for(var i = 0; i < bIndexes.length; i++) {
                var brush = this.chart.get("brush", bIndexes[i]);
                this.setDragEvent(brush);
            }
        }
    }

    CanvasDragSelectWidget.setup = function() {
        return {
            brush: [ 0 ],
            dataType: "list" // or area
        }
    }

    return CanvasDragSelectWidget;
}, "chart.widget.dragselect");