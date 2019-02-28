import jui from "../main.js";

export default {
    name: "chart.widget.raycast",
    extend: "chart.widget.core",
    component: function() {
        const _ = jui.include("util.base");

        const DragSelectWidget = function() {
            this.emitBlockAndRangeEvent = function(eventType, datas, brush, blockAxis, rangeAxis, e) {
                const blockValue = blockAxis.invert(e.chartX) - 1;
                const area = this.chart.getCache(`raycast_area_${blockValue}`);

                if(area != null) {
                    if(e.chartX >= area.x1 && e.chartX <= area.x2 && e.chartY >= area.y1 && e.chartY <= area.y2) {
                        this.chart.emit(eventType, [{
                            brush: brush,
                            data: datas[blockValue],
                            dataIndex: blockValue
                        }, e]);
                    }
                }
            }

            this.setRayCastEvent = function(brush) {
                const axis = this.chart.axis(brush.axis);
                const xType = axis.x.type;
                const yType = axis.y.type;
                const blockAxis = (xType == "block") ? axis.x : ((yType == "block") ? axis.y : null);
                const rangeAxis = (xType == "range") ? axis.x : ((yType == "range") ? axis.y : null);

                if(blockAxis != null && rangeAxis != null) {
                    this.on("axis.click", function(e) {
                        this.emitBlockAndRangeEvent("raycast.click", axis.data, brush, blockAxis, rangeAxis, e);
                    }, brush.axis);

                    this.on("axis.dblclick", function(e) {
                        this.emitBlockAndRangeEvent("raycast.dblclick", axis.data, brush, blockAxis, rangeAxis, e);
                    }, brush.axis);

                    this.on("axis.rclick", function(e) {
                        this.emitBlockAndRangeEvent("raycast.rclick", axis.data, brush, blockAxis, rangeAxis, e);
                    }, brush.axis);
                }
            }

            this.draw = function() {
                let g = this.chart.svg.group(),
                    bIndex = this.widget.brush,
                    bIndexes = (_.typeCheck("array", bIndex) ? bIndex : [ bIndex ]);

                for(let i = 0; i < bIndexes.length; i++) {
                    let brush = this.chart.get("brush", bIndexes[i]);
                    this.setRayCastEvent(brush);
                }

                return g;
            }
        }

        DragSelectWidget.setup = function() {
            return {
                brush: [ 0 ]
            }
        }

        return DragSelectWidget;
    }
}