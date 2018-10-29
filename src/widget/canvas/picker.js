import jui from "../../main";

export default {
    name: "chart.widget.canvas.picker",
    extend: "chart.widget.core",
    component: function() {
        const _ = jui.include("util.base");

        const CanvasPickerWidget = function() {
            this.emitActiveEvent = function(brush, eventType) {
                this.on(`axis.${eventType}`, function(e) {
                    let checker = this.chart.getCache('picker');

                    if(checker != null) {
                        let data = checker.func.call(checker.obj, e.chartX, e.chartY);

                        if(data != null) {
                            this.chart.emit(`picker.${eventType}`, [{
                                brush: brush,
                                data: data
                            }, e]);
                        }
                    }
                }, brush.axis);
            }

            this.setCanvasEvents = function(brush) {
                if(this.widget.hover) {
                    this.on('axis.mousemove', function (e) {
                        let checker = this.chart.getCache('picker');

                        if (checker != null) {
                            checker.func.call(checker.obj, e.chartX, e.chartY);
                        }
                    }, brush.axis);
                }

                this.emitActiveEvent(brush, 'click');
                this.emitActiveEvent(brush, 'dblclick');
            }

            this.draw = function() {
                let g = this.chart.svg.group(),
                    bIndex = this.widget.brush,
                    bIndexes = (_.typeCheck("array", bIndex) ? bIndex : [ bIndex ]);

                for(let i = 0; i < bIndexes.length; i++) {
                    let brush = this.chart.get("brush", bIndexes[i]);
                    this.setCanvasEvents(brush);
                }

                return g;
            }
        }

        CanvasPickerWidget.setup = function() {
            return {
                hover: false,
                brush: [ 0 ]
            }
        }

        return CanvasPickerWidget;
    }
}