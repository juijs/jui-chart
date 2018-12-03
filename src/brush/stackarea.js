import jui from '../main.js';
import AreaBrush from './area.js'

jui.use(AreaBrush);

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