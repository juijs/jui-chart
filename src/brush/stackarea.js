import jui from '../main.js';

export default {
    name: "chart.brush.stackarea",
    extend: "chart.brush.area",
    component: function() {
        var StackAreaBrush = function() {
            this.draw = function() {
                return this.drawArea(this.getStackXY());
            }
        }

        return StackAreaBrush;
    }
}