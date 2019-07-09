import jui from '../main.js';
import ScatterBrush from './scatter.js'

jui.use(ScatterBrush);

export default {
    name: "chart.brush.stackscatter",
    extend: "chart.brush.scatter",
    component: function() {
        var StackScatterBrush = function() {
            this.draw = function() {
                return this.drawScatter(this.getStackXY());
            }
        }

        return StackScatterBrush;
    }
}