import JUI from '../../../main.js';
import CanvasBase from "base";
import KineticObject from "./kinetic";

JUI.use(CanvasBase, KineticObject);

export default {
    name: "util.canvas.base.bubble",
    extend: "util.canvas.kinetic",
    component: function () {
        const CanvasUtil = JUI.include("util.canvas.base");

        const Bubble = function(radius, responseTime, text) {
            this.dim = false;
            this.radius = radius;
            this.setResponseTime(responseTime);
            this.text = text;

            this.setResponseTime = function(time) {
                this.responseTime = time;
                if (time <= 1000) {
                    this.color = '#497eff';
                    this.shadowColor = 'rgba(16,116,252,0.2)';
                    this.textColor = '#fff';
                } else if (time <= 3000) {
                    this.color = '#ffdd26';
                    this.shadowColor = 'rgba(255,221,38,0.2)';
                    this.textColor = '#3d3d45';
                } else {
                    this.color = '#ff4f55';
                    this.shadowColor = 'rgba(255,79,85,0.2)';
                    this.textColor = '#fff';
                }
            }

            this.draw = function(context, now) {
                if (this.dim)
                    context.globalAlpha = 0.5;

                context.shadowColor = this.shadowColor;
                context.shadowBlur = 10;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 10;

                const util = new CanvasUtil(context);
                util.drawCircle(context, this.pos[0], this.pos[1], this.radius, this.color);
                context.fillStyle = this.textColor;
                context.textAlign = 'center';
                context.font = 'bold 11px Noto Sans KR';
                context.fillText(this.text, this.pos[0], this.pos[1] + 5);
                context.globalAlpha = 1.0;

            }
        }

        return Bubble;
    }
}