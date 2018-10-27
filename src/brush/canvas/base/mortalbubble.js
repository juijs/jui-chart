import JUI from '../../../main.js';
import CanvasBase from 'juijs-graph/src/util/canvas/base.js';
import KineticObject from './kinetic';

JUI.use(CanvasBase, KineticObject);

export default {
    name: "util.canvas.base.mortalbubble",
    extend: "util.canvas.base.kinetic",
    component: function () {
        const CanvasUtil = JUI.include("util.canvas.base");

        const MortalBubble = function(birthtime, age, radius=20, color='#497eff', shadowColor='rgba(16,116,252,0.2)') {
            this.active = true;
            this.birthtime = birthtime;
            this.age = age;
            this.radius = radius;
            this.color = color;
            this.shadowColor = shadowColor;
            this.force([30, 0]);

            this.draw = function(context, now) {
                context.shadowColor = this.shadowColor;
                context.shadowBlur = 10;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 10;

                const util = new CanvasUtil(context);
                const d = this.age - (now - this.birthtime);
                let radius = this.radius;
                let animSpeed = 3;

                if (d <= 0) {
                    this.active = false;
                    return;
                }

                if (d <= 100 * animSpeed) {
                    radius *= (100 * animSpeed - d) / (100 * animSpeed) + 1;
                }

                if (d <= 80 * animSpeed) {
                    const x = (80 * animSpeed - d) / (80 * animSpeed);
                    const sd = (radius / 3 - 2) * x + 2;
                    const ed = (radius / 3 - 2) * Math.sin(Math.PI / 2 * x) + 2;
                    const stroke = 3 * x + 2;
                    context.lineCap = 'round';
                    util.drawLine(
                        this.pos[0] + sd, this.pos[1],
                        this.pos[0] + ed, this.pos[1],
                        this.color, stroke
                    );
                    util.drawLine(
                        this.pos[0] - sd, this.pos[1],
                        this.pos[0] - ed, this.pos[1],
                        this.color, stroke
                    );
                    util.drawLine(
                        this.pos[0], this.pos[1] + sd,
                        this.pos[0], this.pos[1] + ed,
                        this.color, stroke
                    );
                    util.drawLine(
                        this.pos[0], this.pos[1] - sd,
                        this.pos[0], this.pos[1] - ed,
                        this.color, stroke
                    );
                    context.lineCap = 'butt';
                } else {
                    util.drawCircle(this.pos[0], this.pos[1], radius, this.color);
                }
            }
        }

        return MortalBubble;
    }
}