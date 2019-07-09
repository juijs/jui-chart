import jui from '../main.js';
import LineBrush from './line.js'

jui.use(LineBrush);

export default {
    name: "chart.brush.stackline",
    extend: "chart.brush.line",
    component: function() {
        var StackLineBrush = function() {
            this.draw = function() {
                return this.drawLine(this.getStackXY());
            }
        }

        return StackLineBrush;
    }
}