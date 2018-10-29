import JUI from '../../../main.js';
import CanvasBase from 'juijs-graph/src/util/canvas/base.js';
import KineticObject from './kinetic';

JUI.use(CanvasBase, KineticObject);

export default {
    name: "util.canvas.base.bubble",
    extend: "util.canvas.base.kinetic",
    component: function () {
        const CanvasUtil = JUI.include("util.canvas.base");

        const Bubble = function(radius, text, color='#497eff', shadowColor='rgba(16,116,252,0.2)', textColor='#fff', textStyle='bold 11px Noto Sans KR') {
            this.mark = false;
            this.dim = false;
            this.radius = radius;
            this.text = text;
            this.color = color;
            this.shadowColor = shadowColor;
            this.textColor = textColor;

            this.draw = function(context, now) {
                if (this.dim)
                    context.globalAlpha = 0.5;

                context.shadowColor = this.shadowColor;
                context.shadowBlur = 10;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 10;

                const util = new CanvasUtil(context);
                util.drawCircle(this.pos[0], this.pos[1], this.radius, this.color);
                context.fillStyle = this.textColor;
                context.textAlign = 'center';
                context.font = textStyle;
                context.fillText(this.text, this.pos[0], this.pos[1] + 5);
                context.globalAlpha = 1.0;

            }
        }

        return Bubble;
    }
}